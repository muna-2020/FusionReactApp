//React related imports
import React, { useReducer } from 'react';
import { connect } from "react-redux";

//Module related import 
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as ModulePerformance_Hook from '@shared/Core/7_DevelopmentSideBar/ModulePerformance/ModulePerformance_Hook';
import ModulePerformance_ModuleProcessor from '@shared/Core/7_DevelopmentSideBar/ModulePerformance/ModulePerformance_ModuleProcessor';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

import loadable from '@loadable/component';

/**
 * @name ModulePerformance
 * @param {any} props
 */
const ModulePerformance = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ModulePerformance_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch, ModulePerformance_ModuleProcessor: new ModulePerformance_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize the ModulePerformance_Hook Preview properties which is required for render the page
     * @returns null
     */
    ModulePerformance_Hook.Initialize(objContext);

    /**
      * @name GetTabs
      * @summary Forms the jsx required for the Tabbed in the Top.
      * @returns {object} jsx
      */
    const GetTabs = () => {
        return <ul style={{ "display": "flex" }} className="peformance-navigation" id="FilterBlock">
            <li>
                <span id="JS" className="active" onClick={(event) => { objContext.ModulePerformance_ModuleProcessor.OnClickNavigation(objContext, "JS", event) }} >{"JS"}</span>
            </li>
            <li>
                <span id="CS" onClick={(event) => { objContext.ModulePerformance_ModuleProcessor.OnClickNavigation(objContext, "CS", event) }} >{"CS"}</span>
            </li>
            <li>
                <span id="PROCEDURES" onClick={(event) => { objContext.ModulePerformance_ModuleProcessor.OnClickNavigation(objContext, "PROCEDURES", event) }} >{"PROCEDURES"}</span>
            </li>
            <li>
                <span id="RESOURCES" onClick={(event) => { objContext.ModulePerformance_ModuleProcessor.OnClickNavigation(objContext, "RESOURCES", event) }} >{"RESOURCES"}</span>
            </li>
            <li>
                <span id="CSS" onClick={(event) => { objContext.ModulePerformance_ModuleProcessor.OnClickNavigation(objContext, "CSS", event) }} >{"CSS"}</span>
            </li>
        </ul>
    }

    /**
       * @name GetViews
       * @summary Forms the whole jsx required for the module.
       * @returns {object} jsx
       */
    const GetViews = () => {
        return (
            <div className="task-container">
                <div id="JS" className="" style={{ display: (state.strTabName == "JS" ? "block" : "none") }}>
                    {GetJSFiles()}
                </div>
                <div id="CS" className="" style={{ display: (state.strTabName == "CS" ? "block" : "none") }}>
                    {GetBackendObjects()}
                </div>
                <div id="PROCEDURES" className="" style={{ display: (state.strTabName == "PROCEDURES" ? "block" : "none") }}>
                    {GetPROCS()}
                </div>
                <div id="RESOURCES" className="" style={{ display: (state.strTabName == "RESOURCES" ? "block" : "none") }}>
                    {GetResporces()}
                </div>
                <div id="CSS" className="" style={{ display: (state.strTabName == "CSS" ? "block" : "none") }}>
                    {GetCSS()}
                </div>
            </div>);
    }

    /**
      * @name GetBackendObjects
      */
    const GetBackendObjects = () => {
        let objCsObjects = objContext.ModulePerformance_ModuleProcessor.GetCsObjectList(objContext);
        let arrObjects = [];
        let jsxCsObject = [];
        let jsxAPIs = [];
        let jsxCsModuleObject = [];
        if (state.arrPerformanceLogs && state.arrPerformanceLogs.length > 0) {

            objCsObjects.Object.length > 0 ?
                //Object
                objCsObjects.Object.map((strCsObject) => {
                    if (!arrObjects.includes(strCsObject)) {
                        let JsxObject = (<div className="p-log-line sub-heading">
                            <span style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strCsObject, "Cs") }}>
                                {
                                    strCsObject.split("_")[strCsObject.split("_").length - 1] + ".cs"
                                }
                            </span>
                        </div>);

                        let JsxAPI = (<div className="p-log-line sub-heading">
                            <span style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strCsObject, "CsController") }}>
                                {
                                    strCsObject.split("_")[strCsObject.split("_").length - 1] + "Controller.cs"
                                }
                            </span>
                        </div>);
                        arrObjects = [...arrObjects, strCsObject];
                        jsxCsObject = [...jsxCsObject, JsxObject];
                        jsxAPIs = [...jsxAPIs, JsxAPI];
                    }
                }) :
                //Module object
                objCsObjects.ModuleObject.length > 0 ?
                    objCsObjects.Object.map((objCsModuleObject) => {
                        if (!arrObjects.includes(objCsModuleObject)) {
                            let JsxObject = (<div className="p-log-line sub-heading">
                                <span style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, objCsModuleObject, "ModuleObjectCS") }}>
                                    {
                                        objCsModuleObject.split("_")[objCsModuleObject.split("_").length - 1] + ".cs"
                                    }
                                </span>
                            </div>);

                            let JsxAPI = (<div className="p-log-line sub-heading">
                                <span style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, objCsObject, "ModuleObjectCSController") }}>
                                    {
                                        objCsModuleObject.split("_")[objCsModuleObject.split("_").length - 1] + "Controller.cs"
                                    }
                                </span>
                            </div>);
                            arrObjects = [...arrObjects, objCsModuleObject];
                            jsxCsObject = [...jsxCsObject, JsxObject];
                            jsxAPIs = [...jsxAPIs, JsxAPI];
                        }
                    }) :
                    ""
        }
        return (
            <React.Fragment>
                <div>
                    {jsxCsObject.length > 0 ? <div className="p-log-line sub-heading">
                        <span className="key" >Objects</span>
                    </div> : <React.Fragment />}
                    <React.Fragment>
                        {jsxCsObject}
                    </React.Fragment>
                </div>
                {
                    jsxCsModuleObject.length > 0 ? <div>
                        <div className="p-log-line sub-heading">
                            <span className="key" >ModuleObjects</span>
                        </div>
                        <React.Fragment>
                            {jsxCsModuleObject}
                        </React.Fragment>
                    </div> : <React.Fragment />
                }
                <div>
                    {jsxAPIs.length > 0 ? <div className="p-log-line sub-heading">
                        <span className="key" > APIs </span>
                    </div> : <React.Fragment />}
                    <React.Fragment>
                        {jsxAPIs}
                    </React.Fragment>
                </div>
            </React.Fragment>
        )
    }


    /**
      * @name GetJSFiles
      * @summary to Get the Jsx , BusinessLogic and Objects
      */
    const GetJSFiles = () => {
        if (state.arrPerformanceLogs && state.arrPerformanceLogs.length > 0) {
            let arrFinalJsx = [];
            let arrJsModule = [];
            let arrJsObject = [];

            //Get Jsx and business Log
            if (props.Entity || (state.ModuleName)) {

                if ((state.FileList == undefined || state.FileList.length == 0) && (state.BusinessLogicFileList == undefined || state.BusinessLogicFileList.length == 0)) {

                    let strComponentLoader = JConfiguration.BasePhysicalPath + "/Arcadix.i.Product.React/" + JConfiguration.ApplicationFolderName + JConfiguration.DeviceType + "/Controller/ComponentController/ComponentController.js";

                    objContext.ModulePerformance_ModuleProcessor.GetFileContent(objContext, strComponentLoader, "ComponentController");
                }

                let arrFiles = state.BusinessLogicFileList ? state.BusinessLogicFileList : [];
                let arrModuleFiles = state.FileList ? state.FileList : [];

                arrFiles = arrFiles.filter(function (item, pos) {
                    return arrFiles.indexOf(item) == pos;
                })
                arrModuleFiles = arrModuleFiles.filter(function (item, pos) {
                    return arrModuleFiles.indexOf(item) == pos;
                })

                let jsxModule = [];
                let jsxSubModule = [];
                let jsxModuleBusincessLogic = [];
                let jsxSubModuleBusincessLogic = [];
                arrFiles.map((strFile) => {
                    strFile = strFile.replace(/\\/g, '/');
                    let strModuleBusinessLogicPath = state.ModuleBusninessLogicPath?state.ModuleBusninessLogicPath.replace(/\\/g, "/"):"";
                    if (strFile.includes("Arcadix.h.Product.BusinessLogic")) {
                        if (strFile.replace(strModuleBusinessLogicPath, "").split("/").length <= 2) {
                            let jsModule = (
                                <React.Fragment>
                                    <div className="p-log-line sub-heading">
                                        <span title={strFile} style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strFile, "JsModule") }}>
                                            {
                                                strFile.split("/")[strFile.split("/").length - 1]
                                            }
                                        </span>
                                    </div>
                                </React.Fragment>);
                            jsxModuleBusincessLogic = [...jsxModuleBusincessLogic, jsModule];
                        }
                        else if (strFile.replace(strModuleBusinessLogicPath, "").split("/").length > 2) {
                            let jsSubModule = (
                                <React.Fragment>
                                    <div className="p-log-line sub-heading">
                                        <span title={strFile} style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strFile, "JsModule") }}>
                                            {
                                                strFile.split("/")[strFile.split("/").length - 1]
                                            }
                                        </span>
                                    </div>
                                </React.Fragment>);
                            jsxSubModuleBusincessLogic = [...jsxSubModuleBusincessLogic, jsSubModule];
                        }
                    }
                })

                arrModuleFiles.map((strFile) => {
                    strFile = strFile.replace(/\\/g, '/');
                    let strModulePath = state.ModulePath?state.ModulePath.replace(/\\/g, "/"):"";
                    if (strFile.replace(strModulePath, "").split("/").length <= 2) {
                        let jsModule = (
                            <React.Fragment>
                                <div className="p-log-line sub-heading">
                                    <span title={strFile} style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strFile, "JsModule") }}>
                                        {
                                            strFile.split("/")[strFile.split("/").length - 1]
                                        }
                                    </span>
                                </div>
                            </React.Fragment>);
                        jsxModule = [...jsxModule, jsModule];
                    }
                    else if (strFile.replace(strModulePath, "").split("/").length > 2) {
                        let jsSubModule = (
                            <React.Fragment>
                                <div className="p-log-line sub-heading">
                                    <span title={strFile} style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strFile, "JsModule") }}>
                                        {
                                            strFile.split("/")[strFile.split("/").length - 1]
                                        }
                                    </span>
                                </div>
                            </React.Fragment>);
                        jsxSubModule = [...jsxSubModule, jsSubModule];
                    }
                })
                arrJsModule = [...arrJsModule, (
                    <React.Fragment>
                        {jsxModule.length > 0 ? < div className="p-log-line sub-heading">
                            <span className="key" >ModuleObject</span>
                        </div> : <React.Fragment />}
                        <div>
                            {jsxModule}
                        </div>
                        {jsxModuleBusincessLogic.length > 0 ? <div className="p-log-line sub-heading">
                            <span className="key" >Module BusinessLogic</span>
                        </div> : <React.Fragment />}
                        <div>
                            {jsxModuleBusincessLogic}
                        </div>
                        {jsxSubModule.length > 0 ? < div className="p-log-line sub-heading">
                            <span className="key" >Sub ModuleObject</span>
                        </div> : <React.Fragment />}
                        <div>
                            {jsxSubModule}
                        </div>                        
                        {jsxSubModuleBusincessLogic.length > 0 ? <div className="p-log-line sub-heading">
                            <span className="key" >SubModule BusinessLogic</span>
                        </div> : <React.Fragment />}
                        <div>
                            {jsxSubModuleBusincessLogic}
                        </div>
                    </React.Fragment>
                )];
            }

            //get Objects
            state.arrPerformanceLogs.map((objData) => {
                let jsxObjects = [];
                let strKey = Object.keys(objData)[0];
                if ((strKey == "Multi" || strKey == "Api Call") && objData[strKey].APICalls) {
                    let iCount = 0;
                    Object.keys(objData[strKey].APICalls).map((objKeys) => {
                        let strObjectName = objKeys.split(";")[0];
                        let jsxObject = (<React.Fragment>
                            <div className="p-log-line sub-heading">
                                <span style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strObjectName, "JsObject") }}>
                                    {
                                        strObjectName.split("_")[strObjectName.split("_").length - 1] + ".js"
                                    }
                                </span>
                            </div>
                        </React.Fragment>)
                        jsxObjects = [...jsxObjects, jsxObject];
                    });
                    iCount++;
                    arrJsObject = [...arrJsObject, (
                        <React.Fragment>
                            {jsxObjects.length > 0 && iCount == 1 ? <div className="p-log-line sub-heading">
                                <span className="key">Object</span>
                            </div> : <React.Fragment />}
                            <div>
                                {jsxObjects}
                            </div>
                        </React.Fragment>
                    )];
                }
            })

            arrFinalJsx = [...arrFinalJsx, arrJsModule];
            arrFinalJsx = [...arrFinalJsx, arrJsObject];
            return arrFinalJsx;
        }
    }

    /**
      * @name GetPROCS
      */
    const GetPROCS = () => {
        let objCsObjects = objContext.ModulePerformance_ModuleProcessor.GetCsObjectList(objContext);

        objContext.ModulePerformance_ModuleProcessor.GetProcedureList(objContext, objCsObjects);
        let arrProcs = ApplicationState.GetProperty("arrProcList");
        if (state.arrPerformanceLogs && state.arrPerformanceLogs.length > 0 && arrProcs) {
            let strObjectName = "";
            return (<React.Fragment>
                <div className="p-log-line sub-heading">
                    <span className="key" >Procedures</span>
                </div>
                {
                    arrProcs.length > 0 ?
                        arrProcs.map((objProcedures) => {
                            let IsDifferentObject = false;
                            let strObject = Object.keys(objProcedures)[0].split("_")[Object.keys(objProcedures)[0].split("_").length - 1];
                            if (strObjectName != strObject) {
                                strObjectName = strObject;
                                IsDifferentObject = true;
                            }
                            let strProcedureName = Object.values(objProcedures)[0].replace("\"", "");

                            //only Get procedre suffixed with "_New" .s
                            if (strProcedureName.includes("Get") && !strProcedureName.includes("_New")) {
                                strProcedureName += "_New";
                            }
                            return (<React.Fragment>
                                {
                                    IsDifferentObject ? <div className="p-log-line sub-heading">
                                        <span className="value">
                                            {strObjectName + ".cs"}
                                        </span>
                                    </div> : <React.Fragment />
                                }
                                <div className="p-log-line sub-heading">
                                    <span style={{ "color": "green", "cursor": "pointer" }} className="value" onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickProcedures(objContext, strProcedureName, objProcedures["DBName"]) }}>
                                        {strProcedureName}
                                    </span>
                                </div>
                            </React.Fragment>)
                        }) :
                        <React.Fragment />
                }
            </React.Fragment>);
        }
    }

    

    /**
     * @name GetResporces
     * @summary Get Module Css.
     */
    const GetResporces = () => {
        if (objContext.state.ResourceList) {
            let arrResourceList = objContext.state.ResourceList.split(",").filter(x => x.includes("TextResource"));
            let jsxResource = [];
            arrResourceList.map((strResource) => {
                let strTempResourcePath = strResource.split("+")[strResource.split("+").length - 1].trim().replace("\"", "").replace("\"", "");
                let strTempPath = JConfiguration.BasePhysicalPath + '/Arcadix.h.Product.Resources/Text/' + JConfiguration.LanguageCultureInfo + "/Common"
                    + strTempResourcePath + "/" + strTempResourcePath.split("/")[strTempResourcePath.split("/").length - 1] + ".json";

                let jsxView = (
                    <React.Fragment>
                        <div className="p-log-line sub-heading">
                            <span className="value" title={strTempPath} style={{ "cursor": "pointer" }} onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strTempPath, "Resource") }}>
                                {strTempResourcePath.split("/")[strTempResourcePath.split("/").length - 1] + ".json"}
                            </span>
                        </div>
                    </React.Fragment>);

                jsxResource = [...jsxResource, jsxView];
            })

            return (
                <React.Fragment>
                    <div className="p-log-line sub-heading">
                        <span className="key" >Resources</span>
                    </div>
                    {jsxResource}
                </React.Fragment>);
        }
    }

    /**
      * @name GetCSS
      * @summary Get Module Css.
      */
    const GetCSS = () => {
        let jsxCSS = [];
        if (objContext.state.CSSList) {
            objContext.state.CSSList.replace("[", "").replace("]", "").split(",").map(strCss => {
                let strCSSPath = eval(strCss);
                if (strCSSPath) {
                    strCSSPath = strCSSPath.substring(strCSSPath.indexOf("Themes"), strCSSPath.length);
                    let strCssTempPath = JConfiguration.BasePhysicalPath + "/Arcadix.h.Product.Resources/" + strCSSPath;

                    let jsxModule = (
                        <React.Fragment>
                            <div className="p-log-line sub-heading">
                                <span className="value" title={strCssTempPath} style={{ "cursor": "pointer" }} onClick={() => { objContext.ModulePerformance_ModuleProcessor.OnClickObject(objContext, strCssTempPath, "Css") }}>
                                    {strCSSPath.split("/")[strCSSPath.split("/").length - 1]}
                                </span>
                            </div>
                        </React.Fragment>);
                    jsxCSS = [...jsxCSS, jsxModule];
                }
            })
            return (
                <React.Fragment>
                    <div className="p-log-line sub-heading">
                        <span className="key" >CSS</span>
                    </div>
                    {jsxCSS}
                </React.Fragment>);
        }
    }

    /**
      * @name GetContent
      * 
      */
    const GetContent = () => {
        return (
            <div>
                <div className="clear-all">
                    <span onClick={() => {
                        Performance.SetProperty("PerformanceLog", [{ "IsRenderCSR": true }]);
                        Performance.Reset();
                    }}>Clear All <b>&#8856;</b></span>
                </div>
                <div>
                    {GetTabs()}
                </div>
                <div>
                    {GetViews()}
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {state.blnIsLoadComplete ? GetContent() : <React.Fragment />}
        </React.Fragment>);
}

export default connect(Base_Hook.MapStoreToProps(ModulePerformance_ModuleProcessor.StoreMapList()))(ModulePerformance);
