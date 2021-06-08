//React Imports
import React, { useEffect, useImperativeHandle } from "react";

//UndoRedo Related Imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//Application state Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        "PageJson": GetPageJsonForComponent(props.PageJson),
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": false,
        "strDeviceType": "pc"
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        EditorState.SetProperty("GetUpdatedPageJson", () => { return objContext.CMSPageContent_Editor_ModuleProcessor.GetUpdatedPageJson(objContext); });
        if (objContext.PageContent_HandlerRef) {
            EditorState.SetReference("ActivePageContentRef", objContext.PageContent_HandlerRef);
        }
        EditorState.SetProperty("OpenAdditionalInformationSidebar", (strSidebar) => { objContext.CMSPageContent_Editor_ModuleProcessor.OpenAdditionalInformationSidebar(objContext, strSidebar); });
    }, [objContext.state, objContext.props]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, Ref, CMSPageContent_Editor_ModuleProcessor}
 * @summary Imperative methods.
 */
function useImperativeMethods(objContext) {
    if (objContext.PageContent_HandlerRef) {
        useImperativeHandle(objContext.PageContent_HandlerRef, () => ({
            "UndoRedo": (LastActivity, Action) => {
                UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
            },
            "SaveTask": () => {
                objContext.CMSPageContent_Editor_ModuleProcessor.SaveTask(objContext);
            },
            "GetUpdatedPageJson": async (strDataFor) => {
                let objNewPageJson = await objContext.CMSPageContent_Editor_ModuleProcessor.GetUpdatedPageJson(objContext, strDataFor);
                console.log("Updated PageJson", objNewPageJson);
                return objNewPageJson;
            },
            "GetCurrentPageJson": () => {
                return objContext.state.PageJson;
            },
            "SpellCheckUpdate": (objPageJson) => {
                objContext.CMSPageContent_Editor_ModuleProcessor.PageContentSpellCheckUpdate(objContext, objPageJson);
            },
            "GetLatestContext": () => {
                return objContext;
            },
            "ReplaceContainer": (objNewContainerJson) => {
                if (objContext.state.PageJson.Containers.length > 0) {
                    let objActiveContainer = objContext.CMSPageContent_Editor_ModuleProcessor.GetActiveContainerRef(objContext);
                    let objOldContainer = objContext.state.PageJson["Containers"].find(objContainerTemp => objContainerTemp["iContainerId"] === objActiveContainer.current.GetContainerId());
                    objContext.CMSPageContent_Editor_ModuleProcessor.ReplaceContainer(objContext, objOldContainer, objNewContainerJson);
                } else {
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: {
                            "PageJson": {
                                ...objContext.state.PageJson,
                                "Containers": [...objContext.state.PageJson.Containers, objNewContainerJson],
                                "ActiveContainerId": objNewContainerJson.iContainerId
                            }
                        }
                    });
                }
            },
            "InserContainerAbove": (objNewContainerJson) => {
                let objValue = objContext.state.PageJson["Containers"].find(objContainerTemp => objContainerTemp["iContainerId"] === objContext.CMSPageContent_Editor_ModuleProcessor.GetActiveContainerRef(objContext).current.GetContainerId());
                objContext.CMSPageContent_Editor_ModuleProcessor.AddContainerAbove(objContext, objValue, objNewContainerJson);
            },
            "InserContainerBelow": (objNewContainerJson) => {
                let objValue = objContext.state.PageJson["Containers"].find(objContainerTemp => objContainerTemp["iContainerId"] === objContext.CMSPageContent_Editor_ModuleProcessor.GetActiveContainerRef(objContext).current.GetContainerId());
                objContext.CMSPageContent_Editor_ModuleProcessor.AddContainerBelow(objContext, objValue, objNewContainerJson);
            },
            "AddElement": (objElementJson) => {
                objContext.CMSPageContent_Editor_ModuleProcessor.GetActiveContainerRef(objContext).current.AddElement(objElementJson);
            },
            "GetContextMenuOptions": (intContainerId, blnShowAsSubMenu = false) => {
                let objContainerJson = objContext.state.PageJson.Containers.find(objTemp => objTemp.iContainerId === intContainerId);
                return objContext.CMSPageContent_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objContainerJson, blnShowAsSubMenu);
            },
            "PreserveContainerState": (objContainer) => {
                objContext.CMSPageContent_Editor_ModuleProcessor.PreserveContainerState(objContext, objContainer);
            },
            "UpdateContainerJson": () => {
                (objJson) => { objContext.CMSPageContent_Editor_ModuleProcessor.UpdateContainerJson(objContext, objJson); };
            },
            "UpdateActiveContainer": (iContainerId) => {
                objContext.CMSPageContent_Editor_ModuleProcessor.UpdateActiveContainer(objContext, iContainerId);
            },
            "DeleteElement": (intElementId, intContainerId) => {
                objContext.CMSPageContent_Editor_ModuleProcessor.DeleteElement(objContext, intElementId, intContainerId);
            },
            "GetTaskEditStatus": () => {
                return objContext.PageContent_TaskEditStatusRef.current;
            },
            "UpdateTaskEditStatus": () => {
                objContext.CMSPageContent_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            },
            "OpenTaskClosePopup": async (blnShowCancelButton) => {
                let blnResponse = objContext.CMSPageContent_Editor_ModuleProcessor.OpenTaskClosePopup(objContext, blnShowCancelButton);
                return blnResponse;
            },
            "OpenAdditionalInformationSidebar": (strSidebarType) => {
                objContext.CMSPageContent_Editor_ModuleProcessor.OpenAdditionalInformationSidebar(objContext, strSidebarType);
            },
            "GetSavedPageJson": () => {
                return this.GetPageJsonForComponent(objContext.props.PageJson);
            },
            "GetPageJsonForCopy": async (intLanguageId) => {
                let arrNewContainers = [];
                for (let i = 0; i < objContext.state.PageJson["Containers"].length; i++) {
                    let objTempContainerForCopy = await objContext.state.PageJson["Containers"][i].Ref.current.GetContainerJsonForCopy();
                    arrNewContainers = [
                        ...arrNewContainers,
                        {
                            ...objTempContainerForCopy,
                        }
                    ];
                }
                let objPageJson = {
                    ...objContext.state.PageJson,
                    ["iLanguageId"]: intLanguageId,
                    ["Containers"]: arrNewContainers
                };
                return objPageJson;
            },
            "SetPointOverrideStatus": (strPointOverrideStatus) => {
                objContext.CMSPageContent_Editor_ModuleProcessor.SetPointOverrideStatus(objContext, strPointOverrideStatus);
            },
            "GetPointOverrideStatus": () => {
                return objContext.state.PageJson["cPointOverride"];
            },
            "TogglePhoneView": () => {
                let strDeviceType = objContext.state.strDeviceType.toLowerCase() === "pc" ? "phone" : "pc";
                if (JConfiguration) {
                    JConfiguration["DeviceType"] = strDeviceType;
                }
                objContext.dispatch({
                    type: "SET_STATE",
                    payload: {
                        "strDeviceType": strDeviceType
                    }
                });
            }
        }), [objContext.props, objContext.state, objContext.InitialPageJson, objContext.PageContent_TaskEditStatusRef]);
    }
}

/**
 * @name GetPageJsonForComponent
 * @param {object} objPageJson Page json for whose containers ref is to be attached
 * @summary Forms the Page json by attaching the ref to the containers.
 * @returns {object} PageJson
 */
export const GetPageJsonForComponent = (objPageJson) => {
    let objNewPageJson = {
        ...objPageJson,
        ["Containers"]: [...objPageJson.Containers.map(objTempContainer => {
            return {
                ...objTempContainer,
                ["Ref"]: React.createRef()// creating the container refs
            };
        })],
        ["ActiveContainerId"]: objPageJson.Containers[0] ? objPageJson.Containers[0].iPageId : undefined
    };
    return objNewPageJson;
};
