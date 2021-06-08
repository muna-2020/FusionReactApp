//React Imports
import { useEffect, useImperativeHandle } from "react";

//Application imports.
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name GetInitialState
 * @param {object} props Component Props.
 * @summary Returns the initialized local states of the component.
 * @returns {object} Initial State Object.
 */
export const GetInitialState = (props) => {
    let arrPages = [];
    if (props.IsForServerRenderHtml) {
        let strKey = "Object_Editor_TaskContent_CMSPageContent";
        if (props[strKey] && props[strKey]["Data"]) {
            let objPageJson = props[strKey]["Data"][0];
            arrPages = [
                {
                    "PageJson": objPageJson
                }
            ];
        }
    }
    return {
        "PageDetails": arrPages,
        "isLoadComplete": false,
        "ActiveTaskId": -1,
        "blnCloseEditor": false,
        "blnCloseEditorToggle": false,
        "cIsFusionVersion": "Y",
        "PageIds": props.PageIds,
        "blnSidebarOpened": false,
        "strSidebarPosition" : "right"
    }
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
 * @summary Initialize the custom hooks.
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
};

/**
 * @name useDataLoader
 * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
 * @summary Data loader hook.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.EditorWorkArea_ModuleProcessor.GetPageJson(objContext, objContext.state.PageIds, objContext.props.IsFirstTask, objContext.props.IsLastTask, true, false, objContext.props.PageProperties, objContext.props.LanguageId);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
 * @summary Data loaded hook.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.blnCloseEditor) {
            objContext.EditorWorkArea_ModuleProcessor.RemoveTasksFromState(objContext, null, false);
        }
    }, [objContext.state.blnCloseEditor, objContext.state.blnCloseEditorToggle]);

    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        } else {
            ApplicationState.SetProperty("blnShowAnimation", true);
        }
    }, [objContext.state.isLoadComplete]);

    useEffect(() => {
        if (objContext.state.ActiveTaskId !== -1) {
            objContext.EditorWorkArea_ModuleProcessor.UpdateLanguageId(objContext);
        }
    }, [objContext.state.ActiveTaskId]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
 * @summary Imperative methods.
 */
 function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.EditorWorkArea_HandlerRef, () => ({
        "OpenTask": async (arrPageIds, blnIsFirstTask = false, blnIsLastTask = false, blnIsEditorVisible = false, blnIsTaskSwitch = false, arrPageProperties = null, intLangaugeId) => {
            let blnResponse = await objContext.EditorWorkArea_ModuleProcessor.GetPageJson(objContext, arrPageIds, blnIsFirstTask, blnIsLastTask, blnIsEditorVisible, blnIsTaskSwitch, arrPageProperties, intLangaugeId);
            return blnResponse;
        },
        "RemoveTasksFromState": async (intPageId, blnCloseSingleTask = true) => {
            let blnResponse;
            if (blnCloseSingleTask) {
                blnResponse = await objContext.EditorWorkArea_ModuleProcessor.RemoveTasksFromState(objContext, intPageId);
            }
            else {
                blnResponse = objContext.EditorWorkArea_ModuleProcessor.RemoveTasksFromState(objContext, null, false);
            }
            return blnResponse;
        },
        "GetActiveTaskId": () => {
            return objContext.state.ActiveTaskId;
        },
        "IsFusionVersion": () => {
            return objContext.EditorWorkArea_ModuleProcessor.IsFusionVersion(objContext);
        },
        "GetActiveTaskPageJson": () => {
            return objContext.EditorWorkArea_ModuleProcessor.GetActiveTaskPageJson(objContext)
        },
        "GetPageJsonForLanguage": async (intLanguageId) => {
            let blnResponse = await objContext.EditorWorkArea_ModuleProcessor.GetPageJsonForLanguage(objContext, intLanguageId);
            return blnResponse;
        },
        "GetActivePageLanguage": () => {
            return objContext.EditorWorkArea_ModuleProcessor.GetActivePageLanguage(objContext);
        },
        "GetActivePageProperties": () => {
            return objContext.EditorWorkArea_ModuleProcessor.GetActivePageProperties(objContext);
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "SaveTask": () => {
            let objPageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageJson"];
            if (objPageJson.Ref.current.GetTaskEditStatus()) {
                objPageJson.Ref.current.SaveTask();
            }
        },
        "SetTaskEditStatus": () => {
            let objPageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageJson"];
            objPageJson.Ref.current.SetTaskEditStatus();
        },
        "GetPointOverrideStatus": () => {
            let objPageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageJson"];
            let charPointOverrideStatus = objPageJson.Ref.current.GetPointOverrideStatus();
            if (!charPointOverrideStatus || charPointOverrideStatus === null || charPointOverrideStatus === "N") {
                return false;
            }
            else {
                return true;
            }
        },
        "GetPagePropertiesForPageId": (intPageId = null) => {
            let objPageProperties;
            if (intPageId !== null) {
                objPageProperties = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === intPageId)["PageProperties"];
            }
            else {
                objPageProperties = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageProperties"];
            }
            return objPageProperties;
        },
        "GetSubjectsForMainClient": () => {
            return objContext.props.SubjectForMainClient;
        },
        "GetUpdatedPageJson": async (strDataFor) => {
            let objPageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageJson"];
            let objNewPageJson = await objPageJson.Ref.current.GetUpdatedPageJson(strDataFor);
            return objNewPageJson;
        },
        "OpenAdditionalInformationSidebar": (strSidebarType) => {
            let objPageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageJson"];
            objPageJson.Ref.current.OpenAdditionalInformationSidebar(strSidebarType);
        },
        "SetActiveTaskeditStatus": () => {
            let objPageJson = objContext.state.PageDetails.find(objTempData => objTempData["iPageId"] === objContext.state.ActiveTaskId)["PageJson"];
            if (objPageJson.Ref.current.SetTaskEditStatus) {
                objPageJson.Ref.current.SetTaskEditStatus();
            }
        },
        "UpdatePageJsonForAudit": (objNewPageJson) => {
            objContext.EditorWorkArea_ModuleProcessor.UpdatePageJsonForAudit(objContext, objNewPageJson);
        },
        "UpdatePageProperties": (objNewPageProperties) => {
            objContext.EditorWorkArea_ModuleProcessor.UpdatePageProperties(objContext, objNewPageProperties);
        },
        "ReplaceContainer": (objContainerJson) => {
            let intActiveTaskId = objContext.state.ActiveTaskId;
            let objPageJson = objContext.state.PageDetails.find(objPageJson => objPageJson.iPageId == intActiveTaskId)
            if (objPageJson && objPageJson.PageJson.Ref && objPageJson.PageJson.Ref.current) {
                objPageJson.PageJson.Ref.current.ReplaceContainer(objContainerJson);
            }
        },
        "SetSidebarStatus": (strPosition, blnStatus) => {            
            if (strPosition === 'left') {
                if(blnStatus){ //open
                    objContext.LeftSplitPaneRef.current.splitPane.children[1].style.display = "block";
                    objContext.LeftSplitPaneRef.current.pane2.style.width= "80%";
                    objContext.LeftSplitPaneRef.current.pane1.style.width = "20%";
                }else{
                    objContext.LeftSplitPaneRef.current.splitPane.children[1].style.display = "none";
                    objContext.LeftSplitPaneRef.current.pane2.style.width= "100%";
                    objContext.LeftSplitPaneRef.current.pane1.style.width = "0%";
                }
            }
            else {
                if(blnStatus){
                    objContext.RightSplitPaneRef.current.splitPane.children[1].style.display = "block";
                    objContext.RightSplitPaneRef.current.pane1.style.width= "80%";
                    objContext.RightSplitPaneRef.current.pane2.style.width = "20%";
                }else{
                    objContext.RightSplitPaneRef.current.splitPane.children[1].style.display = "none";
                    objContext.RightSplitPaneRef.current.pane1.style.width= "100%";
                    objContext.RightSplitPaneRef.current.pane2.style.width = "0%";
                }
              
            }

            //let intSidebarPaneIndex = strPosition === 'left' ? 0 : 2;
            //   if (blnStatus) {
            //       objContext.LeftSidebarPaneRef.current.pane1.style.width = "25%";
            //  //objContext.SplitPaneRef.current.paneElements[intSidebarPaneIndex].style.width = "calc(25% - 2px)";
            //} else {
            //    objContext.LeftSidebarPaneRef.current.pane1.style.width = "25%";
            //   //objContext.SplitPaneRef.current.paneElements[intSidebarPaneIndex].style.width = "0%";
            //   //objContext.SplitPaneRef.current.paneElements[1].style.width = "calc(100% - 2px)";
            //}
        }
    }), [objContext.props, objContext.state]);
}
