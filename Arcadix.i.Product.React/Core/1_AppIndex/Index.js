//Polyfill imports
import "isomorphic-fetch";

//React related imports
import React, { useEffect } from 'react';
import ReactDOM, { hydrate, render } from 'react-dom';
import { hot } from 'react-hot-loader';

//import { getState } from 'react-snap'
//Store related imports
import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';
import { Provider } from 'react-redux';

//Router related imports
import { BrowserRouter } from 'react-router-dom';

//Loadable import
import { loadableReady } from '@loadable/component';

//Internal service class imports

import PerformanceClass from '@shared/Framework/Services/Performance/Performance';
import ApplicationLog from '@shared/Framework/Services/ApplicationLog/ApplicationLog';
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';
import LoggerClass from '@shared/Framework/Services/Logger/Logger';
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler"
import * as FieldValidator from "@root/Framework/Services/Validator/Validator";
import { HandleError } from '@root/Framework/Services/FrameworkLogging/FrameworkLogging';
import * as QueryString from '@root/Framework/Services/QueryString/QueryString';

import * as Localization from '@root/Framework/Blocks/Localization/Localization';

import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchDataProvider from "@shared/Framework/DataService/ArcadixFetchData/ReactJS/ArcadixFetchDataProvider";
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Object_Framework_Services_DynamicStyleReactJs from '@shared/Object/a.Framework/Services/DynamicStyle/DynamicStyleReactJs/DynamicStyleReactJs';

//Component related imports 
import ComponentController from '@appfolder/Controller/ComponentController/ComponentController';
import DevelopmentSideBarView from '@root/Core/7_DevelopmentSideBar/DevelopmentSideBarView/DevelopmentSideBarView';
import DevelopmentSideBarContentView from '@root/Core/7_DevelopmentSideBar/DevelopmentSideBarContentView/DevelopmentSideBarContentView';
import Popup from "@root/Framework/Blocks/Popup/Popup";
import WrapperComponent from "@root/Framework/WrapperComponent/WrapperComponent";
import FillHeight from "@root/Framework/Controls/FillHeight/FillHeight";
import 'regenerator-runtime/runtime';

//ServiceWorker import.
import * as ServiceWorkerRegistration from '@root/Core/9_ServiceWorker/ServiceWorkerRegistration';

//------------------Global variable declaration--------
global.ReactVersionType = "ReactJs";
global.Performance = new PerformanceClass();
global.ApplicationLog = new ApplicationLog();
global.PerformanceProfiler = PerformanceProfiler;
global.Localization = Localization;
global.QueryString = QueryString;
global.ProviderController = {
    ArcadixFetchDataProvider: ArcadixFetchDataProvider
};
global.windowObject = window;
global.Logger = new LoggerClass(JConfiguration["IsDevelopment"]);
global.store = store;
global.WrapperComponent = WrapperComponent;
global.FillHeight = FillHeight;
global.ApplicationState = ApplicationState;
global.ArcadixCacheData = ArcadixCacheData;
global.DataRef = DataRef;
global.ArcadixFetchData = ArcadixFetchData;
global.ObjectQueue = ObjectQueue;
window.onerror = HandleError;
global.Object_Framework_Services_TextResource = Object_Framework_Services_TextResource;
global.Object_Framework_Services_DynamicStyleReactJs = Object_Framework_Services_DynamicStyleReactJs;
global.FieldValidator = FieldValidator;
//Global variable to keep the modules rendered.
global.arrModulesRendered = typeof (FullServerRenderedModules) !== "undefined" ? FullServerRenderedModules : [];
//------------------------------------------------------
global.intFullCSRComponentCount = 0;

//----------------------Fast Refresh Code.------------
if (process.env.NODE_ENV === "development" && JConfiguration["IsDevelopment"] !== false) {
    const RefreshRuntime = require("react-refresh/runtime");
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
        RefreshRuntime.injectIntoGlobalHook(window);
        window.$RefreshReg$ = (type, id) => { };
        window.$RefreshSig$ = () => type => type;
    }

    window.$RefreshReg$ = (type, id) => {
        const fullId = module.id + " " + id;
        RefreshRuntime.register(type, fullId);
    };
    window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
//---------------------------------------------------

/**
 * @name App
 * @summary Returns the Main Component to be rendered.
 * @returns {JSX} the Component to be rendered Editor or Main.
 */
const App = () => {

    if (typeof ClientUserDetails !== "undefined" && Object.keys(ClientUserDetails).length !== 0) {
        ApplicationState.SetProperty('ClientUserDetails', ClientUserDetails);
    }
    let AppMain = null;
    let IsShowSideBar = JConfiguration.Performance;
    let TestApplicationIsShowSideBar;
    let blnIsDirectEditor = false;
    if (typeof PreviewComponent !== "undefined") {
        AppMain = ComponentController.GetComponent("ModulePreviewMaster");
    }
    else {
        if (QueryString.GetQueryStringValue("PageId") !== "") {
            blnIsDirectEditor = true;
            AppMain = ComponentController.GetComponent("EditorWrapper");
        }
        else if (JConfiguration.ApplicationTypeId === "2" || JConfiguration.TargetApplicationTypeId === "2") {
            AppMain = ComponentController.GetComponent("TestApplicationMaster");
            TestApplicationIsShowSideBar = true;
        }
        else {
            AppMain = ComponentController.GetComponent("Main");
        }
    }
    let objStyle;
    if (blnIsDirectEditor && IsShowSideBar) {
        objStyle = {
            "justifyContent": "flex-start"
        };
    }

    return (
        <Provider store={store}>
            <BrowserRouter>
                {
                    <React.Fragment>
                        <div id="InspectorOverlay" />
                        <div className="w-100 flex space-between h-100 parent-root" style={objStyle}>
                            {
                                IsShowSideBar ?
                                    <React.Fragment>
                                        <DevelopmentSideBarView JConfiguration={JConfiguration} />
                                        <DevelopmentSideBarContentView JConfiguration={JConfiguration} />
                                    </React.Fragment> : <React.Fragment />
                            }
                            <AppMain ComponentController={ComponentController} JConfiguration={JConfiguration} TestApplicationIsShowSideBar />
                            <Popup Id="PopupId"
                                Meta={{ GroupName: "Popup" }}
                                Resource={{ SkinPath: JConfiguration.TestApplicationSkinPath }}
                                ParentProps={{ JConfiguration, ComponentController }} />
                            {
                                QueryString.GetQueryStringValue("PageId") !== "" ? <div id="IntranetEditorHolder" style={{ height: "100%", width: "100%" }} /> : ""
                            }
                        </div>
                    </React.Fragment>
                }
            </BrowserRouter>
        </Provider>
    );
};

//To Hydrate the App to DOM
let AppComponent = App;
if (process.env.NODE_ENV === "development" && JConfiguration["IsDevelopment"] !== false) {
    $RefreshReg$(App, "App");
    module.hot.accept(); 
}
else {
    if (__webpack_require__.p) {
        __webpack_require__.p = JConfiguration["BaseUrl"].substring(0, JConfiguration["BaseUrl"].length - 1) + __webpack_require__.p;
    }
}

loadableReady(() => {
    const RenderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
    RenderMethod(<AppComponent />, document.getElementById('divRootClient'), function () {
    });
});

window.HideMainServerDiv = function () {
    let objClientDom = document.getElementById('divRootClient');
    let objServerDom = document.getElementById('divRoot');
    objClientDom.style.visibility = "visible";
    objServerDom.style.display = "none";
    objServerDom.innerHTML = "<div></div>";
    FullSSRComponentCount = -1;
};

ServiceWorkerRegistration.Register();