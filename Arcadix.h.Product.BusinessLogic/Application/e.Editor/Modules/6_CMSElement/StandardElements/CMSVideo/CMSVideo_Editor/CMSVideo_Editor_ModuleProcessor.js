//Module realted fies.
import CMSVideo_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor_ContextMenu";

import * as CMSVideo_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor_MetaData';

//Application State classes.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name CMSVideo_Common_ModuleProcessor
 * @summary Contains the Video's editor version module specific methods.
 * */
class CMSVideo_Editor_ModuleProcessor extends CMSVideo_Editor_ContextMenu {

    /**
     * @name UpdateElementJson
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objElementJson element json
     * @summary gets the selected element json 
     */
    UpdateElementJson(objContext, objElementJson) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objElementJson,
                    ["iOrder"]: objContext.state.ElementJson.iOrder,
                    ...CMSVideo_Editor_MetaData.GetDefaultContainerElementProperties()
                },
                "objVideoControl": { ...CMSVideo_Editor_MetaData.GetDefaultVideoControl(objElementJson), "boolMediaLoaded": false },
                "blnLoadPlayer": objElementJson.vElementJson.cIsVimeo === undefined || objElementJson.vElementJson.cIsVimeo === "N" || (objElementJson.vElementJson.cIsVimeo === "Y" && objElementJson.vElementJson.cIsTranscodingComplete === "Y") ? true : false,
                "blnVideoLoaded": false
            },
            "blnUndoRedoUpdate": false
        });
        if (objContext.Ref.current.load && objContext.Ref.current.pause) {
            objContext.Ref.current.load();
            objContext.Ref.current.pause();
        }
        objContext.CMSVideo_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name OpenAddPopup
     * @param {object} objContext {props, state, dispatch, PassedEvents, Data}
     * @summary opens video add edit popup
     */
    OpenAddPopup(objContext) {
        let objCallBacks;
        if (objContext.props.IsSubElement) {
            objCallBacks = {
                "GetElementJson": (objElementJson) => {
                    objContext.props.ParentRef.current.UpdateElementJson(objElementJson);
                }
            };
        }
        else {
            objCallBacks = {
                "GetElementJson": (objElementJson) => {
                    objContext.CMSVideo_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            };
        }
        editorPopup.ShowPopup({
            "Data": {
                ...objContext.props,
                "MediaType": "Video",
                "iContainerId": objContext.props.iContainerId,
                "ElementJson": { ...objContext.state.ElementJson },
                "ShowMultiMediaAddEdit": true,
                //"ShowMultiMediaManagement": true,
                "ActionType": "Add",
                "PreSelectNode": { ...objContext.state.ElementJson.iElementId }
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": 'auto',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": objCallBacks
        });
    }

    /**
     * @name HandleClearVideo
     * @param {object} objContext {props, state, dispatch, PassedEvents, Data}
     */
    HandleClearVideo(objContext) {
        let objTextResource = {
            "DELETE_ConfirmText": objContext.objTextResource["Delete_Video_Message"],
            "DELETE_ConfirmButtonText": objContext.objTextResource["Yes"],
            "DELETE_CloseButtonText": objContext.objTextResource["No"],
            "DELETE_Title": objContext.objTextResource["Title"],
            "DELETE_SubTitle": objContext.objTextResource["Subtitle"]
        };
        editorPopup.ShowConfirmationPopup({
            Resource: {
                Text: objTextResource,
                TextResourcesKey: "DELETE",
                Variables: {},
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath
            },
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
                Height: 'auto',
                Width: '390px'
            },
            Data: {},
            Events: {
                ConfirmEvent: (objModal) => {
                    editorPopup.ClosePopup(objModal);
                    objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
                }
            },
            CallBacks: {}
        });
    }

    /**
     * @name SetNumberOfReplays
     * @param {object} objParams {objContext, iNumberOfMediaReplay }
     */
    SetNumberOfReplays(objParams) {
        const { objContext, iNumberOfMediaReplay } = objParams;
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vContainerElementProperties"]: {
                        ...objContext.state.ElementJson.vContainerElementProperties,
                        ["iNumberOfMediaReplay"]: iNumberOfMediaReplay
                    }
                }
            }
        });
        objContext.CMSVideo_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name ShowVideoSidebar
     * @param {object} objContext {state, props, dispatch}
     * @summary Opens up the side bar.
     */
    ShowVideoPropertiesSidebar(objContext) {
        objContext.CMSVideo_Editor_ModuleProcessor.CloseSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            ...objContext.props,
            "ElementJson": objContext.state.ElementJson,
            "PassedEvents": {
                SetPlayerWidthHeight: (objParams) => { objContext.CMSVideo_Editor_ModuleProcessor.SetPlayerWidthHeight(objContext, objParams); }
            },
            "SidebarProps": {
                "SidebarName": "VideoProperties",
                "Header": objContext.objTextResource["Title"],
                "Title": objContext.objTextResource["Video_Properties"],
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name SetPlayerWidthHeight
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objParams
     */
    SetPlayerWidthHeight(objContext, objParams) {
        let { width, height } = objParams;
        var objElementJson = {
            ...objContext.state.ElementJson,
            ["vContainerElementProperties"]: {
                ...objContext.state.ElementJson.vElementJson.vContainerElementProperties,
                ["iElementWidth"]: width,
                ["iElementHeight"]: height
            }
        };
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "objVideoControl": {
                    ...CMSVideo_Editor_MetaData.GetDefaultVideoControl(objElementJson),
                    "boolMediaLoaded": objContext.state.objVideoControl.boolMediaLoaded
                },
                "ElementJson": { ...objElementJson }
            }
        });
        objContext.CMSVideo_Editor_ModuleProcessor.CloseSidebar();
        objContext.CMSVideo_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name CloseVideoSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }
}

export default CMSVideo_Editor_ModuleProcessor;
