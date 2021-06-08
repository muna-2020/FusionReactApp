//React related imports
import React, { useEffect, useReducer, useRef,useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';

//Store related imports
import { Provider } from 'react-redux';
import { StaticRouter, Router, BrowserRouter } from 'react-router-dom';

//Base Component related import
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Internal service class imports
import { LoadDynamicStyles, LoadDynamicStyles_API, GetLoadedDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';
import ArcadixCacheData, { ShouldAddFilters } from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import  ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

import { setTimeout } from 'timers';
import Logger from '@shared/Framework/Services/Logger/Logger';

/**
* @name ServerRenderedComponentLoader
* @param {object} props props
* @summary for Server side rendering
* @returns {JSX} returns the rendered component
*/
const ServerRenderedComponentLoader = (props) => {

    let objClientDivRef = useRef(null);
    let objServerDivRef = useRef(null);
    /**
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, InitializeState(props));

    function InitializeState(props) {
        let objReturn = { strComponentName: "", iReloadCount: "", strLocation: "", intRenderCount: 0 };
        if (props.ServerRenderedHTML != undefined && props.ServerRenderedHTML == "") {
            objReturn.strHtml = renderToString(
                <Provider store={store}>
                    <StaticRouter context={{}}>
                        <div />
                    </StaticRouter>
                </Provider>
            )
        }
        else {
            objReturn.strHtml = renderToString(
                <Provider store={store}>
                    <StaticRouter context={props.routerContext}>
                        <div dangerouslySetInnerHTML={{ __html: props.InitialHtml }}></div>
                    </StaticRouter>
                </Provider>
            )
        }
        return objReturn;
    }

    /**
    * @name useEffect
    * @summary on ComponentName update loads the Html
    */
    useEffect(() => {
        if (state.strComponentName !== props.ComponentName || state.iReloadCount !== props.iReloadCount) {
            //ReactDOM.unmountComponentAtNode(objClientDivRef.current);
            //ReactDOM.unmountComponentAtNode(document.getElementById("Client_" + props.DivName));
            //document.getElementById("Client_" + props.DivName)
            GetModuleHtml();
        }
    }, [props.ComponentName, props.iReloadCount]);

    useImperativeHandle(props.ServerRenderRef, () => ({
        "HideDiv": () => {
            objServerDivRef.current.style.display = "none";
            objServerDivRef.current.innerHTML = "<div></div>";
        },
        //"ServerDivRef": objServerDivRef,
        //"ClientDivRef": objClientDivRef
    }), [state, objClientDivRef, objServerDivRef]);

    /**
    * @name GetModuleHtml
    * @summary Get the component to render
    */
    function GetModuleHtml() {
        Performance.SetProperty("Entity", props.ComponentName);
        //PerformanceLog  here.
        Performance.LogPerformanceStart("SSR_" + props.ComponentName.split('?')[0].toUpperCase());
        let strSearchUrl = props.IsFromRouteLoader ? "" : window.location.search.toLowerCase();
        let objTestState = props.JConfiguration.ApplicationTypeId === 2 ? TestState : {};


        if (props.ServerRenderedHTML != undefined && props.ServerRenderedHTML != "") {
            SetHtmlForServerRender(props.ServerRenderedHTML);
        }
        else {
            let blnContinueRendering = true;
            var blnRenderComplete = false;
            var objHeaderData = {};
            var iTotalServerTime = 0;
            setTimeout(() => {
                if (blnRenderComplete === false) {
                    blnContinueRendering = false;
                    //Logger.LogError("Component could not render on server within 2 sec:", props.ComponentName);
                    SetHtmlForServerRender("Component could not render on server within 2 sec:", props.ComponentName);
                }
            }, 20000);

            var arrLoadedDynamicStyles = GetLoadedDynamicStyles();//contains list of loaded dynamic css styles.
            var arrLoadedEntity = GetLoadedEntityData();//contains list of loaded Entity Data(data of Modules in redux).
            var objModifiedProps = { ...props, ComponentName: props.ComponentName, ApplicationState: ApplicationState.GetApplicationStateData(), TestState: objTestState, LoadedDynamicStyles: arrLoadedDynamicStyles, LoadedEntity: arrLoadedEntity };
            if (objModifiedProps["ApplicationState"] && objModifiedProps["ApplicationState"]["ModuleProps"]) {
                delete objModifiedProps["ApplicationState"]["ModuleProps"];
            }            

            fetch(props.JConfiguration.BaseUrl + 'partialrender/' + props.ComponentName + strSearchUrl + (strSearchUrl.includes("?") ? "&" : "?") + "sessionkey=" + JConfiguration.SessionKey + "", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', "ExecutionTime": Date.now() },
                body: JSON.stringify(objModifiedProps),
                credentials: 'same-origin'
            })
                .then(objResponse => {
                    if (blnContinueRendering) {
                        blnRenderComplete = true;
                        
                        if (objResponse.status === 200) {                            
                            //PerformanceLog ends here.
                            Performance.LogPerformanceEnd("SSR_" + props.ComponentName.split('?')[0].toUpperCase());

                            for (var arrPair of objResponse.headers.entries()) {
                                objHeaderData[arrPair[0]] = arrPair[1];
                            }                           
                            iTotalServerTime = Date.now() - objHeaderData["executiontime"];
                            return objResponse.json();
                        } else if (objResponse.status === 403) {
                            let strBaseUrl = props.JConfiguration.BaseUrl.substring(0, props.JConfiguration.BaseUrl.length - 1);
                            windowObject.location.replace(strBaseUrl);
                        }
                        else {
                            //Logger.LogError(objResponse.status + ":", objResponse.statusText);
                        }
                    }
                })
                .then(objJSON => {                    
                    let objPerformance = {};
                    if (objHeaderData["performancelog"] !== undefined) {
                        var contentlength = objHeaderData["content-length"];
                        objPerformance = JSON.parse(objHeaderData["performancelog"]);
                        let compressiontime;
                        if (objHeaderData["compressiontime"]) {
                            compressiontime = JSON.parse(objHeaderData["compressiontime"]);
                        }
                        objPerformance = JSON.parse(objHeaderData["performancelog"]);

                        let dtDeCompressionStart = Date.now();
                        let objData = { "Data" : ArcadixFetchData.GetMappedColumns(objJSON.Data) };
                        let iDeCompressionTime = Date.now() - dtDeCompressionStart;

                        objPerformance = {
                            ["APICallType"]: Object.keys(objPerformance).length > 1 ? "Multi_SSR" : "Post (" + props.ComponentName + ")",
                            ["APICallsDetails"]: objPerformance,
                            ["ContentLength"]: contentlength,
                            ["ServerRederAPIListTime"]: objJSON.ServerRederAPIListTime,
                            ["ServerRenderHTMLTime"]: objJSON.ServerRenderHTMLTime,
                            ["ServerTime"]: iTotalServerTime,
                            ["CompressionTime"]: compressiontime,
                            ["UnCompressionTime"]: iDeCompressionTime,
                            ["Response"]: {
                                ["Data"]: objJSON.Data && Object.keys(objJSON.Data).length > 0 ? objJSON.Data : {},
                                ["Html"]: objJSON.Html ? objJSON.Html : "",
                                ["Header"]: objHeaderData
                            }
                        };
                        Performance.GetTotalPerformanceData(objPerformance)
                    }
                    if (objJSON.Error)
                        SetHtmlForServerRender(props.InitialHtml);
                    else
                        SetSSRData(objJSON, blnContinueRendering, objHeaderData);
                })
                .catch(error => {
                    //Logger.LogError(error);
                });
        }
    }


    function SetSSRData(objJSON, blnContinueRendering, objHeaderData) {
        
        if (blnContinueRendering && objJSON != undefined) {
            if (objJSON.state === 'session expired') {
                window.location.replace(props.JConfiguration.Baseurl);
            }
            else {
                if (objJSON.Data && JSON.stringify(objJSON.Data) !== "{}") {
                    let objReformattedData = ArcadixFetchData.GetMappedColumns(objJSON["Data"])
                    var arrDataKeys = Object.keys(objReformattedData);
                    arrDataKeys.forEach(strDataKey => {
                        let objValue = { Data: objReformattedData[strDataKey], TimeStamp: JSON.parse(objHeaderData["timestamp"])[strDataKey], PrimaryKeyName: JSON.parse(objHeaderData["primarykeyname"])[strDataKey], Count: JSON.parse(objHeaderData["count"])[strDataKey] };
                        let objAddJson = strDataKey.split(';').length > 1 ? { Filter: strDataKey, Value: objValue } : { Value: objValue  };
                        ArcadixCacheData.AddData(strDataKey.split(';')[0], objAddJson, (objResult) => { });
                    });
                }
                if (objJSON.DynamicStyles) {
                    LoadDynamicStyles_API(objJSON.DynamicStyles);
                }
                ReactDOM.unmountComponentAtNode(objClientDivRef.current);
                let strLocation = props.IsFromRouteLoader && props.routerContext ? props.routerContext.router.history.location.pathname : "";
                objServerDivRef.current.style.display = "block";
                dispatch({ type: 'SET_STATE', payload: { strHtml: objJSON.Html != "" ? objJSON.Html : props.InitialHtml, strComponentName: props.ComponentName, iReloadCount: props.iReloadCount, strLocation: strLocation, intRenderCount: state.intRenderCount + 1 } });
            }            
        }
    }

    function SetHtmlForServerRender(strHTML) {
        ApplicationState.SetProperty("SSRedDivDetails", { ...ApplicationState.GetProperty("SSRedDivDetails"), ["TotalDivCount"]: (strHTML.match(/type="RDiv"/g) || []).length });
        objServerDivRef.current.style.display = "block";
        dispatch({
            type: 'SET_STATE', payload: {
                strHtml: renderToString(
                    <Provider store={store}>
                        <StaticRouter context={props.routerContext}>
                            <div dangerouslySetInnerHTML={{ __html: strHTML }}></div>
                        </StaticRouter>
                    </Provider>
                ),
                strComponentName: props.ComponentName,
                strLocation: props.routerContext !== undefined ? props.routerContext.router.history.location.pathname : null,
                intRenderCount: state.intRenderCount+1
            }
        });
    }

    /**
     * @name GetLoadedEntityData
     * @summary To get the list of Loaded Entity data from Redux.
     */
    function GetLoadedEntityData() {
        let objEntity = store.getState().Entity;
        let arrEntitiy = Object.keys(objEntity);
        let arrLoadedEntity = [];
        arrEntitiy.forEach(strEntity => {
            if (objEntity[strEntity]["InitialDataCallParam"] && ShouldAddFilters(objEntity[strEntity]["InitialDataCallParam"])) {
                let strFilters = ArcadixCacheData.fnGetFilters(strEntity, objEntity[strEntity]["InitialDataCallParam"]);
                if (objEntity[strEntity][strFilters]?.["Data"]) {
                    arrLoadedEntity = [...arrLoadedEntity, strFilters];
                }
            }
            else if (objEntity[strEntity]["Data"])
                arrLoadedEntity = [...arrLoadedEntity, strEntity];
        });
        return arrLoadedEntity;
    }

    /**
    * @name useEffect
    * @summary Used to render the component if strComponentName changes
    */
    useEffect(() => {
        if (state.strComponentName !== "") {
            var RenderComponent = props.ComponentController.GetComponent(props.ComponentName);
            let objJConfiguration = { ...props.JConfiguration, "IsProfilerEnabled": true };
            let intCurrentDivCount = ApplicationState.GetProperty("SSRedDivDetails") ? ApplicationState.GetProperty("SSRedDivDetails").CurrentDivCount + 1 : 0;
            ApplicationState.SetProperty("SSRedDivDetails", { ...ApplicationState.GetProperty("SSRedDivDetails"), ["CurrentDivCount"]: intCurrentDivCount });
            if (props.routerContext === undefined) {
                ReactDOM.hydrate(
                    <Provider store={store}>
                        <BrowserRouter>
                            <PerformanceProfiler ComponentName={props.ComponentName} IsMainModule={true} JConfiguration={objJConfiguration} >
                                <RenderComponent {...props} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} />
                            </PerformanceProfiler>
                        </BrowserRouter>
                    </Provider>, objClientDivRef.current);
                
            }
            else {
                ReactDOM.hydrate(
                    <Provider store={store}>
                        <Router context={props.routerContext} history={props.routerContext.router.history}>
                            <PerformanceProfiler ComponentName={props.ComponentName} IsMainModule={true} JConfiguration={objJConfiguration} >
                                <RenderComponent {...props} history={props.routerContext.router.history} ComponentController={props.ComponentController} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} />
                            </PerformanceProfiler>
                        </Router>
                    </Provider>, objClientDivRef.current);
            }
        }

    }, [state.strComponentName, state.intRenderCount]);

    //sets the className here
    let strClassName;
    if (props.IsFromRouteLoader) {
        strClassName = "h-100";
    }

    //returns JSX
    return (
        <div className={strClassName}>
            <div ref={objClientDivRef} className={strClassName} id={"Client_" + props.DivName} style={{ height: "100%", width: "100%" }} />
            <div ref={objServerDivRef} className={strClassName} id={"Server_" + props.DivName} dangerouslySetInnerHTML={{ __html: state.strHtml }} style={{ position: "absolute", height: "100%", width: "100%", top:0 }} />
        </div>
    );
};

export default ServerRenderedComponentLoader;