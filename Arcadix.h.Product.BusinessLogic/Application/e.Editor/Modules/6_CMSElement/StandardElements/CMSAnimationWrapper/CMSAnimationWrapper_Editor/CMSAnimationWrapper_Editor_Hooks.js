//React Imports
import { useEffect, useImperativeHandle, useLayoutEffect } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props, fnGetElementJsonCallback) {
    let strIframelessAnimation = props.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsIframelessAnimation"] &&
        props.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsIframelessAnimation"] == "Y" ? "Y" : "N";
    let objElementJson = { ...props.ElementJson };
    objElementJson = fnGetElementJsonCallback(props);
    return UndoRedoInitialize({
        "ElementJson": objElementJson,
        "cIsIframelessAnimation": strIframelessAnimation,
        "LoadViewType": "Initial",
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "blnToggleLoadInitialize": false,
        "isLoadComplete": props.IsForServerRenderHtml ? false : true,
        "isScriptLoadComplete": false,
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLaoded(objContext);
    useUndoRedo(objContext);
    useStaticFileLoader(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLaoded
 * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLaoded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": objContext.state.ElementJson,
                    "blnToggleLoadInitialize": false
                }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
 * @summary Undo redo hooks.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.PreserveElementState) {
            objContext.props.PreserveElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);

    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        UndoRedo: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSAnimationWrapper_Editor_ModuleProcessor}
 * @summary Imperative handle.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            if (objContext.state.cIsIframelessAnimation && objContext.state.cIsIframelessAnimation.toLowerCase() === "y") {
                return await objContext.CMSAnimationWrapper_Editor_ModuleProcessor.GetElementJsonForIFramelessAnimation(objContext);
            } else {
                let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
                let arrNewTextElements = [];
                for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
                    let objTextElementJson = { ...arrTextElements[intCount] };
                    if (arrTextElements[intCount].Ref.current && arrTextElements[intCount].Ref.current.GetElementJson) {
                        objTextElementJson = await arrTextElements[intCount].Ref.current.GetElementJson(blnRemoveRef = true, strDataFor = null);
                    }
                    arrNewTextElements = [
                        ...arrNewTextElements,
                        objTextElementJson
                    ];
                }
                let objInitialAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"] };
                let objResourceAttributeValue = objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"];
                let objAnswerAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"] };
                if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInlineEditable"] === "Y") {
                    let objAnimationData;
                    if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                        objAnimationData = objContext.iFrameRef.current.contentWindow.stage.children[0].GetData(true);
                    }
                    else {
                        objAnimationData = objContext.iFrameRef.current.contentWindow.GetData(true);
                    }
                    if (objContext.state.ElementJson["vAnimationElementJson"]["cIsFusionVersion"] === "Y") {
                        Object.keys(objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                            objInitialAttributeValue[strKey] = objAnimationData[strKey];
                        });
                        if (objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]) {
                            Object.keys(objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                                objResourceAttributeValue[strKey] = objAnimationData[strKey];
                            });
                        }
                        Object.keys(objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                            objAnswerAttributeValue[strKey] = objAnimationData[strKey];
                        });
                    }
                    else {
                        Object.keys(objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                            objInitialAttributeValue[strKey]["vValue"] = objAnimationData[strKey];
                        });
                        if (objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]) {
                            Object.keys(objContext.state.ElementJson["vElementJson"]["ResourceAttributeValue"]).map(strKey => {
                                objResourceAttributeValue[strKey]["vValue"] = objAnimationData[strKey];
                            });
                        }
                        Object.keys(objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                            objAnswerAttributeValue[strKey]["Min"]["vValue"] = objAnimationData[strKey];
                            objAnswerAttributeValue[strKey]["Max"]["vValue"] = objAnimationData[strKey];
                        });
                    }
                }
                let { vAnimationElementJson, cIsFirstLoad, ...objElementJson } = objContext.state.ElementJson;
                objElementJson = {
                    ...objElementJson,
                    ["vElementJson"]: {
                        ...objElementJson["vElementJson"],
                        ["InitialAttributeValue"]: objInitialAttributeValue,
                        ["ResourceAttributeValue"]: objResourceAttributeValue,
                        ["AnswerAttributeValue"]: objAnswerAttributeValue,
                        ["TextElements"]: arrTextElements
                    },
                    ["vAnimationElementJson"]: {
                        ...vAnimationElementJson
                    }
                };
                objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
                return objElementJson;
            }
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetContextMenuOptions": () => {
            return objContext.CMSAnimationWrapper_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "GetElementJsonForCopy": async () => {
            let arrHeaderValues = [];
            let arrTextElements = [];
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["HeaderValues"].length; intCount++) {
                if (objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"] !== null) {
                    let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"]);
                    let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                    arrTextElements = [
                        ...arrTextElements,
                        objNewTextElementJson
                    ];
                    arrHeaderValues = [
                        ...arrHeaderValues,
                        {
                            ...objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount],
                            ["iElementTextId"]: objNewTextElementJson["iElementId"]
                        }
                    ];
                }
                else {
                    arrHeaderValues = [
                        ...arrHeaderValues,
                        objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]
                    ];
                }
            }
            let objInitialAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"] };
            let objAnswerAttributeValue = { ...objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"] };
            if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsInlineEditable"] === "Y") {
                let objAnimationData;
                if (objContext.state.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsAnimateCC"] === "Y") {
                    objAnimationData = objContext.iFrameRef.current.contentWindow.stage.children[0].GetData(true);
                }
                else {
                    objAnimationData = objContext.iFrameRef.current.contentWindow.GetData(true);
                }
                Object.keys(objContext.state.ElementJson["vElementJson"]["InitialAttributeValue"]).map(strKey => {
                    objInitialAttributeValue[strKey] = objAnimationData[strKey];
                });
                Object.keys(objContext.state.ElementJson["vElementJson"]["AnswerAttributeValue"]).map(strKey => {
                    objAnswerAttributeValue[strKey] = objAnimationData[strKey];
                });
            }
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["InitialAttributeValue"]: objInitialAttributeValue,
                    ["AnswerAttributeValue"]: objAnswerAttributeValue,
                    ["TextElements"]: arrTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetPointOverride": () => {
            return objContext.CMSAnimationWrapper_Editor_ModuleProcessor.GetPointOverride(objContext)
        },
        "SetPointOverride": (objPoints) => {
            objContext.CMSAnimationWrapper_Editor_ModuleProcessor.SetPointOverride(objContext, objPoints);
        },
        "RemovePointOverride": (objPoints) => {
            objContext.CMSAnimationWrapper_Editor_ModuleProcessor.RemovePointOverride(objContext);
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSAnimationWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}

/**
 * @name useStaticFileLoader
 * @param {any} objContext
 * @summary this loads the scripts and styles to the header.
 */
function useStaticFileLoader(objContext) {
    //if (objContext.state.isScriptLoadComplete) {
    //    objContext.props.ElementJson["vAnimationElementJson"]["WrapperContents"]["Styles"].forEach(objStyle => {
    //        CssLoader.LoadDynamicStyles(objStyle.Path);
    //    });

    //    let arrLibScripts = [];
    //    let arrScriptLoadPromises = [];
    //    objContext.props.ElementJson["vAnimationElementJson"]["WrapperContents"]["Scripts"].forEach(objScript => {
    //        if (objScript.cIsLibrary && objScript.cIsLibrary === "Y") {
    //            arrScriptLoadPromises.push(LoadScript(objScript.Path));
    //        }
    //    });

    //    if (arrLibScripts.length > 0) {
    //        Promise.all([...arrLibScripts.map(strScript => {
    //            return LoadScript(strScript);
    //        }),]).then(() => {
    //            objContext.dispatch({ type: "SET_STATE", payload: { ...objContext.state, "isScriptLoadComplete": true } });
    //        }).catch(() => {
    //            objContext.dispatch({ type: "SET_STATE", payload: { ...objContext.state, "isScriptLoadComplete": false } });
    //        });
    //    } else {
    //        objContext.dispatch({
    //            type: "SET_STATE",
    //            payload: {
    //                "isScriptLoadComplete": true
    //            }
    //        });
    //    }
    //}
}

