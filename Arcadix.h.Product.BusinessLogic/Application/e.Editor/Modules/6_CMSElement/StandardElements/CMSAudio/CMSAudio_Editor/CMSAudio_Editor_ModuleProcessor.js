//Module Related
import CMSAudio_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_ContextMenu";

import * as CMSAudio_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_MetaData';

/**
 * @name CMSAudio_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSAudio_Editor
 * */
class CMSAudio_Editor_ModuleProcessor extends CMSAudio_Editor_ContextMenu {

    /**
     * @name UpdateElementJson
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objElementJson element json
     * @summary gets the selected element json 
     */
    UpdateElementJson(objContext, objElementJson) {
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objElementJson, ["iOrder"]: objContext.state.ElementJson.iOrder,
                    ...CMSAudio_Editor_MetaData.GetDefaultContainerElementProperties()
                },
                "objAudioControl": { ...CMSAudio_Editor_MetaData.GetDefaultAudioControl(objElementJson), "boolMediaLoaded": false }
            },
            "blnUndoRedoUpdate": false
        });
        objContext.AudioRef.current.pause();
        objContext.AudioRef.current.load();
    }

    /**
     * @name OpenAddPopup
     * @param {object} objParams {objTextResource, objContext }
     * @summary opens image add edit popup
     */
    OpenAddPopup(objParams) {
        let { objTextResource, objContext } = objParams;
        objContext.AudioRef.current.pause();
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
                    objContext.CMSAudio_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            };
        }
        editorPopup.ShowPopup({
            "Data": {
                ...objContext.props,
                "MediaType": "Audio",
                "iContainerId": objContext.props.iContainerId,
                "ElementJson": { ...objContext.state.ElementJson },
                "ShowMultiMediaAddEdit": true,
                //"ShowMultiMediaManagement": true,
                "ActionType": "Add",
                "PreSelectNode": { ...objContext.state.ElementJson }
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
     * @name HandleClearAudio
     * @param {object} objParams {objTextResource, objContext }
     */
    HandleClearAudio(objParams) {
        let { objTextResource, objContext } = objParams;
        let objTextResourceForPopup = {
            "DELETE_ConfirmText": objTextResource["Delete_Audio_Message"],
            "DELETE_ConfirmButtonText": objTextResource["Yes"],
            "DELETE_CloseButtonText": objTextResource["No"],
            "DELETE_Title": objTextResource["Title"],
            "DELETE_SubTitle": objTextResource["Subtitle"]
        };
        editorPopup.ShowConfirmationPopup({
            Resource: {
                Text: objTextResourceForPopup,
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
        objContext.CMSAudio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }
}

export default CMSAudio_Editor_ModuleProcessor;
