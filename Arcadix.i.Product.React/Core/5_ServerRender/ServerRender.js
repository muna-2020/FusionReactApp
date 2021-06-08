//React related imports
import React, { useRef } from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//Store related imports
import { createStore } from 'redux';
import reducer from '@shared/Framework/DataService/ArcadixCacheData/Redux/Reducer/Reducer';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Internal service class imports
import ImportedComponentController from '@appfolder/Controller/ComponentController/ComponentController';
//Component Controller.
import EditorComponentController from "@root/Application/e.Editor/PC/Controller/ComponentController/ComponentController";
import TestApplicationComponentController from "@root/Application/f.TestApplication/PC/Controller/ComponentController/ComponentController";
import ContainerTemplateController from "@root/Application/e.Editor/PC/Controller/ContainerTemplateController/ContainerTemplateController";
import ElementController_Editor from "@root/Application/e.Editor/PC/Controller/ElementController/Editor/ElementController_Editor.js"
import ElementController_TestApplication from "@root/Application/e.Editor/PC/Controller/ElementController/TestApplication/ElementController_TestApplication.js"
import LoggerClass from '@shared/Framework/Services/Logger/Logger';
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler"
import ApplicationLog from '@shared/Framework/Services/ApplicationLog/ApplicationLog';
import PerformanceClass from '@shared/Framework/Services/Performance/Performance';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";
import * as QueryString from '@root/Framework/Services/QueryString/QueryString';
import DevelopmentSideBarView from '@root/Core/7_DevelopmentSideBar/DevelopmentSideBarView/DevelopmentSideBarView';

import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchDataProvider from "@shared/Framework/DataService/ArcadixFetchData/ReactJS/ArcadixFetchDataProvider";
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Object_Framework_Services_DynamicStyleReactJs from '@shared/Object/a.Framework/Services/DynamicStyle/DynamicStyleReactJs/DynamicStyleReactJs';

//Component related imports 
import WrapperComponent from "@root/Framework/WrapperComponent/WrapperComponent";
import FillHeight from "@root/Framework/Controls/FillHeight/FillHeight";

//Loadable imports
import { ChunkExtractor } from '@loadable/server';


import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';
import Grid from "@root/Framework/Blocks/Grid/Grid";
import SplitPane from '@root/Framework/Controls/SplitPane/SplitPane';

const path = require('path');
const jsdom = require('jsdom');

//global variables
global.ReactVersionType = "ReactJs";
global.Logger = new LoggerClass(true);
global.ApplicationLog = new ApplicationLog();
global.PerformanceProfiler = PerformanceProfiler;
global.Performance = new PerformanceClass();
global.GetQueryStringValue = QueryString.GetQueryStringValue;
global.Localization = Localization;
global.QueryString = QueryString;
global["mode"] = "server";
global.ProviderController = {
    ArcadixFetchDataProvider: ArcadixFetchDataProvider
};
global.WrapperComponent = WrapperComponent;
global.FillHeight = FillHeight;
global.ApplicationState = ApplicationState;
global.ArcadixCacheData = ArcadixCacheData;
global.DataRef = DataRef;
global.ArcadixFetchData = ArcadixFetchData;
global.ObjectQueue = ObjectQueue;
global.Object_Framework_Services_TextResource = Object_Framework_Services_TextResource;
global.Object_Framework_Services_DynamicStyleReactJs = Object_Framework_Services_DynamicStyleReactJs;
global.FieldValidator = FieldValidator;

global.ExtranetBase_ModuleProcessor = ExtranetBase_ModuleProcessor;
global.ExtranetBase_Hook = ExtranetBase_Hook;
global.Grid = Grid;
global.SplitPane = SplitPane;

global.path = path;
global.ReactDomServer = ReactDomServer
global.ChunkExtractor = ChunkExtractor;
global.jsdom = jsdom;

/**
* @name ServerRender
* @param {function} fnCallback a fnCallback function
* @param {string} strModuleName strModuleName
* @param {object} props props
* @param {object} objTestState TestState
* @param {boolean} blnGetDataCallParams blnGetDataCallParams
* @summary for Server side rendering
*/
export async function ServerRender(fnCallback, strModuleName, props, strBundleFolderName, blnGetDataCallParams, TestState, cIsShowSideBar) {

    //global variables
    global.JConfiguration = props.JConfiguration;
    const objStore = createStore(reducer);
    ApplicationState.SetStore(objStore);
    ApplicationState.SetProperty("UndoRedoQueue", {});
    global.BundleFolderName = strBundleFolderName

    if (strModuleName.split('?').length > 1) {
        global.window = {
            location: {
                href: strModuleName.split('?')[1]
            }
        };
    }
    else {
        global.window = {
            location: {
                href: ""
            }
        };
    }

    global.document = null;

    if (props.ApplicationState) {
        ApplicationState.InitializeApplicationState({ ...props.ApplicationState });
        props = { ...props, ...props.ApplicationState };
    }

    var RenderComponent = null;

    var ComponentController = null;

    if (props.IsEditor != undefined && props.IsEditor == "Y") {
        ComponentController = EditorComponentController;
    }
    else if (props.IsTestApplication != undefined && props.IsTestApplication == "Y") {
        ComponentController = TestApplicationComponentController;
    }
    else {
        ComponentController = ImportedComponentController;
    }

    try {
        RenderComponent = ComponentController.GetComponent(strModuleName.split('?')[0]);
    }
    catch (e) {
        var errorResponse = { "Error": e.stack.toString() };
        fnCallback(null, JSON.stringify(errorResponse));
    }
    if (blnGetDataCallParams) { // get data calls.
        if (typeof RenderComponent.load !== "undefined") {
            await RenderComponent.load()
                .then((LoadedComponent) => {
                    if (typeof LoadedComponent.default.InitialDataParams != "undefined") {
                        fnCallback(null, LoadedComponent.default.InitialDataParams(props));
                    }
                    else {
                        try {
                            let objRouterContext = {};
                            if (props.routerContext === undefined) {
                                objRouterContext = { context: props.routerContext };
                            }
                            let objProps = { ...props, TestState };
                            // This is the stats file generated by webpack loadable plugin
                            const strStatsFile = path.join(props.JConfiguration.BasePhysicalPath, "/Arcadix.i.Product.React.Bundle/" + strBundleFolderName + "/" + props.JConfiguration.ApplicationFolderName + props.JConfiguration.DeviceType + "/ServerBuild/loadable-stats.json");
                            // We create an extractor from the strStatsFile
                            const objExtractor = new ChunkExtractor({ statsFile: strStatsFile });
                            let Jsx = objExtractor.collectChunks(<Provider store={objStore}>
                                <StaticRouter {...objRouterContext}>
                                    <RenderComponent {...objProps}
                                        IsForServerRenderAPI
                                        IsForServerRenderHtml
                                        isLoadComplete
                                        ComponentController={ComponentController}
                                    />
                                </StaticRouter>
                            </Provider>);
                            ReactDomServer.renderToString(Jsx);
                        }
                        catch (error) {
                            fnCallback(null, { Error: error.toString() + ":at:" + error.stack.toString() });
                        }
                        fnCallback(null, objStore.getState().ApplicationState);
                    }
                })
                .catch((err) => {
                    fnCallback(null, { Error: err.toString() + ":at:" + err.stack.toString() });
                })
        }
        else {
            fnCallback(null, {});
        }
    }
    else { // get html.
        var objReturnComponent = {
            "Html": ""
        };
        if (typeof RenderComponent.load !== "undefined") {
            await RenderComponent.load()
                .then((LoadedComponent) => {
                    if (typeof LoadedComponent.default != "undefined" && typeof LoadedComponent.default.DynamicStyles != "undefined") {
                        //objReturnComponent["DynamicStyles"] = [...global.arrDynamicStyles, ...LoadedComponent.default.DynamicStyles(props)];
                    }
                })
                .catch((err) => {
                    fnCallback(null, {
                        Error: err.toString(),
                        StackTrace: err.stack
                    });
                });
        }
        try {
            let objRouterContext = {};
            if (props.routerContext === undefined) {
                objRouterContext = { context: props.routerContext };
            }
            let objProps = { ...props, TestState };
            // This is the stats file generated by webpack loadable plugin
            const strStatsFile = path.join(props.JConfiguration.BasePhysicalPath, "/Arcadix.i.Product.React.Bundle/" + strBundleFolderName + "/" + props.JConfiguration.ApplicationFolderName + props.JConfiguration.DeviceType + "/ServerBuild/loadable-stats.json");
            // We create an extractor from the strStatsFile
            const objExtractor = new ChunkExtractor({ statsFile: strStatsFile });
            let Jsx = objExtractor.collectChunks(<Provider store={objStore}>
                <StaticRouter {...objRouterContext}>
                    <React.Fragment>
                        <div className="w-100 flex space-between">
                            <div className="flex h-100 w-100" id={props.ComponentName !== "Master" ? "ModuleContainer" : ""} style={props.ComponentName == "Master" ? { overflow: "hidden" } : { overflow: "hidden" }}>
                                {cIsShowSideBar ?
                                    <DevelopmentSideBarView JConfiguration={props.JConfiguration} /> :
                                    <React.Fragment />}
                                <div className="w-100">
                                    <RenderComponent
                                        {...objProps}
                                        IsForServerRenderHtml
                                        isLoadComplete
                                        ComponentController={ComponentController} />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </StaticRouter>
            </Provider>);
            objReturnComponent["Html"] = ReactDomServer.renderToString(Jsx);
            objReturnComponent["FullSSRComponentCount"] = ApplicationState.GetProperty("FullSSRComponentCount");
        }
        catch (error) {
            objReturnComponent["Error"] = error.toString() + ":at:" + error.stack.toString();
        }

        fnCallback(null, objReturnComponent);
    }
}

export async function GetPrefetchResources(fnCallback, props) {
    //global variables
    global.JConfiguration = props.JConfiguration;
    let RenderComponent = null;
    let arrDynamicStyles = [];
    let arrDataCallParams = [];
    var arrInitialDataParams = [];

    //Looping through all Components to Prefetch
    for await (let strComponent of props.PrefetchComponents) {
        try {
            if (EditorComponentController.CheckComponent(strComponent))
                RenderComponent = EditorComponentController.GetComponent(strComponent);
            else if (ContainerTemplateController.CheckTemplate(strComponent))
                RenderComponent = ContainerTemplateController.GetComponent(strComponent);
            else if (ElementController_Editor.CheckComponent(strComponent))
                RenderComponent = ElementController_Editor.GetComponent(strComponent);
            else if (ElementController_TestApplication.CheckComponent(strComponent))
                RenderComponent = ElementController_TestApplication.GetComponent(strComponent);
        }
        catch (e) {
            var errorResponse = { "Error": "e.stack.toString()", "Component": strComponent };
            fnCallback(null, JSON.stringify(errorResponse));
        }

        if (RenderComponent && typeof RenderComponent.load !== "undefined") {
            await RenderComponent.load()
                .then((objLoadedComponent) => {
                    if (objLoadedComponent && objLoadedComponent.ModuleProcessor) {
                        let objModuleProcessorInstance = new objLoadedComponent.ModuleProcessor();
                        //-------------------------Forming List of DynamicStyles to Prefetch--------------------------------
                        if (objModuleProcessorInstance.GetDynamicStyles) {
                            arrDynamicStyles = [...arrDynamicStyles, ...objModuleProcessorInstance.GetDynamicStyles(props)];
                        }
                        //--------------------------------------------------------------------------------------------------
                        //-----------------------------------------------Forming List of InitialDataCalls to Prefetch------------------------------------------------------------------
                        if (objModuleProcessorInstance.InitialDataParams) {
                            let arrObjectList = objModuleProcessorInstance.InitialDataParams(props);
                            arrObjectList.map(
                                objInitialDataParam => {
                                    if (Array.isArray(objInitialDataParam["InitialDataCallParam"])) {
                                        objInitialDataParam["InitialDataCallParam"].map(objDataCall => {
                                            arrDataCallParams = [...arrDataCallParams, { "URL": objInitialDataParam["URL"], "Params": objDataCall["SearchParams"] }];//?? objDataCall
                                        })
                                    }
                                    else
                                        arrDataCallParams = [...arrDataCallParams, { "URL": objInitialDataParam["URL"], "Params": objInitialDataParam["InitialDataCallParam"] }];
                                }
                            );
                            //arrInitialDataParams = [...arrInitialDataParams, ...objModuleProcessorInstance.InitialDataParams(props)];
                        }
                        //-------------------------------------------------------------------------------------------------------------------------------------------------------------
                    }
                })
                .catch((err) => {
                    fnCallback(null, {
                        "Error": err.toString(),
                        "Component": strComponent, 
                        "StackTrace": err.stack
                    });
                });
        }
    }  
    let objReturn = {
        //["InitialDataParams"]: arrInitialDataParams,
        ["DataCallParams"]: arrDataCallParams,//arrInitialDataParams,
        ["DynamicStyles"]: arrDynamicStyles
    };
    //Returning the PrefetchList details to server
    fnCallback(null, objReturn); 
}