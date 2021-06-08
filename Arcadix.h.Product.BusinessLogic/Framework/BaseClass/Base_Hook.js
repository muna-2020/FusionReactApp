import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import { useEffect, useLayoutEffect } from 'react';
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name MapStoreToProps
 * @param {object} arrObjects keys to be mapped
 * @summary   maps redux store data (Entity/ApplicationState ) to the props of component.
 * @returns {object} mapping function that returns mapping object
 */
export function MapStoreToProps(arrObjects) {
    return (objStore) => {
        let objReturn = {};
        if (global["mode"] !== "server") {
            arrObjects.map(objObjectName => {
                if (typeof objObjectName === "string") {
                    if (objObjectName.split(';').length == 1)
                        objReturn = { ...objReturn, [objObjectName]: DataRef(objStore.Entity, objObjectName, true) };
                    else {
                        let strObjectKey = objObjectName.split(';')[0];
                        if (objStore.Entity[strObjectKey])
                            objReturn = { ...objReturn, [objObjectName]: DataRef(objStore.Entity[strObjectKey], objObjectName, true) };
                    }
                }
                else {
                    if (objObjectName["DataKey"].split(';').length == 1)
                        objReturn = { ...objReturn, [objObjectName["DataKey"]]: DataRef(objStore[objObjectName["StoreKey"]], objObjectName["DataKey"], true) };
                    else {
                        let strObjectKey = objObjectName["DataKey"].split(';')[0];
                        if (objStore[objObjectName["StoreKey"][strObjectKey]])
                            objReturn = { ...objReturn, [objObjectName["DataKey"]]: DataRef(objStore[objObjectName["StoreKey"][strObjectKey]], objObjectName["DataKey"], true) };
                    }
                }
            });
        }
        return objReturn;
    };
}

/**
* @name Reducer
* @param {object} objState  component state
* @param {object} objAction   action to be performed
* @summary Reducer
* @returns {object} new state after performing said action
*/
export const Reducer = (objState, objAction) => {
    switch (objAction.type.toUpperCase()) {
        case "SET_STATE":
            return {
                ...objState,
                ...objAction.payload
            };
        default: return { ...objState };
    }
};

/**
 * @name InitializeCss
 * @param {any} objContext
 * @param {any} objModuleProcessor
 * @summary get initial css for the module
 */
export function InitializeCss(objContext, objModuleProcessor) {
    useLayoutEffect(() => {
        let objProps = objContext.props ? objContext.props : objContext;
        if (!objProps.IsForServerRenderAPI && objModuleProcessor.GetDynamicStyles) {
            objModuleProcessor.GetDynamicStyles(objProps).map((objItem) => {
                LoadDynamicStyles(objItem);
            });
        }
    }, []);

    if (objContext.state != undefined && objContext.state.isLoadComplete != undefined) {
        useEffect(() => {
            if (ApplicationState.GetProperty("SSRedDivDetails") && objContext.state.isLoadComplete && !objContext.IsFrameworkComponent) {
                if (ApplicationState.GetProperty("SSRedDivDetails")["TotalDivCount"] != undefined &&
                    ApplicationState.GetProperty("SSRedDivDetails")["TotalDivCount"] != 0) {
                    if (ApplicationState.GetProperty("SSRedDivDetails")["TotalDivCount"] == ApplicationState.GetProperty("SSRedDivDetails")["CurrentDivCount"]) {
                        ApplicationState.GetProperty("SSRedDivDetails")["ServerRenderRef"]?.current?.HideDiv();
                    }
                }
                else
                    ApplicationState.GetProperty("SSRedDivDetails")["ServerRenderRef"]?.current?.HideDiv();
            }
            
        }, [objContext.state.isLoadComplete]);
    }
    let objProps = objContext.props ? objContext.props : objContext;
    if (objProps.IsForServerRenderHtml == undefined && objProps.IsForServerRenderAPI == undefined) {
        if (typeof FullSSRComponentCount != "undefined" && FullSSRComponentCount != -1) {
            // ApplicationState.SetProperty("FullCSRComponentCount", ApplicationState.GetProperty("FullCSRComponentCount") != undefined ? ApplicationState.GetProperty("FullCSRComponentCount") + 1 : 1);
            global.intFullCSRComponentCount = global.intFullCSRComponentCount + 1;
            console.log("CSRRender...", global.intFullCSRComponentCount);
            console.log("SSRRender...", FullSSRComponentCount);
            let blnHideServerDiv = JConfiguration.TargetApplicationTypeId == 2 ? (global.intFullCSRComponentCount >= FullSSRComponentCount) && objContext.state.isLoadComplete == true : global.intFullCSRComponentCount == FullSSRComponentCount;
            if (blnHideServerDiv) {
                // ApplicationState.SetProperty("FullCSRComponentCount", undefined);
                global.intFullCSRComponentCount = 0;
                window.setTimeout(() => {
                    window.HideMainServerDiv();
                }, 500);
            }
        }
    }

    if (objProps != undefined && objProps.IsForServerRenderHtml != undefined) {
        ApplicationState.SetProperty("FullSSRComponentCount", ApplicationState.GetProperty("FullSSRComponentCount") != undefined ? ApplicationState.GetProperty("FullSSRComponentCount") + 1 : 1);
    }
}

/**
 * @name APICallsForPerformanceLog
 * @param {any} objContext
 * @param {any} objModuleProcessor
 * @summary get API Calls For PerformanceLog
 */
export function APICallsForPerformanceLog(objContext, objModuleProcessor) {
    useLayoutEffect(() => {
        if (!objContext.props.IsForServerRenderAPI) {
            if (objModuleProcessor.InitialDataParams) {
                let InitialDataParams = new ObjectQueue().Queue(objModuleProcessor.InitialDataParams(objContext.props));
                let arrModuleAPICalls = ApplicationState.GetProperty('ModuleAPICalls') ? ApplicationState.GetProperty('ModuleAPICalls') : [];
                arrModuleAPICalls = [...arrModuleAPICalls, ...InitialDataParams.DataCalls];
                ApplicationState.SetProperty('ModuleAPICalls', arrModuleAPICalls);
            }
        }
    }, []);
}