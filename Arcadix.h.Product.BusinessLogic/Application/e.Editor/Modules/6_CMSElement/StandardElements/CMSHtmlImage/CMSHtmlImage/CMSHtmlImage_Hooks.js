//React Imports
import React, { useLayoutEffect, useEffect, useImperativeHandle } from 'react';

//Module related imports
import * as CMSHtmlImage_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHtmlImage/CMSHtmlImage/CMSHtmlImage_MetaData";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState() {
    return {
        "ElementJson": {},
        "isTextResourceLoaded": false,
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLaoded(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
 * @summary Data loaded hook
 */
function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSHtmlImage", objContext.props)) {
            objContext.CMSHtmlImage_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

/**
 * @name useDataLaoded
 * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
 * @summary Data loader hook
 */
function useDataLaoded(objContext) {
    useEffect(() => {
        if (Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSHtmlImage", objContext.props)) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "isTextResourceLoaded": true
                }
            });
        }
    }, [Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSHtmlImage", objContext.props)]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
 * @summary Imperative methods
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ComponentRef, () => ({
        "UpdateComponentState": async (objHtmlImageProps = null) => {
            let objElementJson;
            if (objHtmlImageProps["iElementId"] && objHtmlImageProps["iElementId"] !== null) {
                objElementJson = await objContext.CMSHtmlImage_ModuleProcessor.GetHtmlImageDetails(objHtmlImageProps["iElementId"]);
                if (objElementJson !== null) {
                    objElementJson = CMSHtmlImage_MetaData.GetDefaultElementJson();
                    objElementJson = {
                        ...objElementJson,
                        "iElementId": objHtmlImageProps["iElementId"],
                        "cIsNew": "Y"
                    };
                }
                else {
                    objElementJson = {
                        ...objElementJson,
                        "cIsNew": "N"
                    };
                }
            }
            else {
                objElementJson = CMSHtmlImage_MetaData.GetDefaultElementJson();
                objElementJson = {
                    ...objElementJson,
                    "cIsNew": "Y"
                };
            }
            objElementJson = {
                ...objElementJson,
                ["vElementJson"]: {
                    ...objElementJson["vElementJson"],
                    ["TextElements"]: [
                        {
                            ...objElementJson["vElementJson"]["TextElements"][0],
                            ["Ref"]: React.createRef()
                        }
                    ]
                }
            };
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": objElementJson,
                    "Callback": objHtmlImageProps["PassedEvents"],
                    "isLoadComplete": objContext.state.isTextResourceLoaded
                }
            });
        }
    }), [objContext.state, objContext.props]);
}
