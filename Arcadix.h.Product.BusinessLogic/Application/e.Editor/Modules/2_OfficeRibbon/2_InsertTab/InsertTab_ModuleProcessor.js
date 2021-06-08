import React from 'react';

//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Application State files.
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//MetaData used.
import * as CMSContainer_Editor_MetaData from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_MetaData';

//overlay import
import * as CMSOverlay_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/CMSOverlay_Editor_MetaData";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Text action related imports.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

/**
 * @name InsertTab_ModuleProcessor
 * @summary module processor for Insert tab.
 */
class InsertTab_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList
     * @summary Contains an array which are then mapped to component as props.
     * @returns {Array} component props to be mapped.
     * */
    static StoreMapList() {
        return [{ "StoreKey": "EditorState", "DataKey": "InsertState" }];
    }

    /**
     * @name ShowImageAddEditPopup
     * @param {string} strElementType type of popup (image, audio, video).
     * @param {object} objContext {state, props, dispatch, InsertTab_ModuleProcessor}.
     * @param {function} callback callback to run after displaying the ImageAddEdit popup.
     * @summry Opens up Image add edit popup.
     */
    ShowImageAddEditPopup(strElementType, objContext, callback) {
        editorPopup.ShowPopup({
            "Data": {},
            "Meta": {
                "PopupName": strElementType,
                "Height": 'auto',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "CallBacks": {
                "GetElementJson": (objElementJson) => { callback(objContext, objElementJson); }
            }
        });
    }

    /**
     * @name ShowClipartPopup
     * @summary this show the clipart popup.
     * */
    ShowClipartPopup(objContext) {
        editorPopup.ShowPopup({
            "Data": {},
            "Meta": {
                "PopupName": "ClipartPopup",
                "Height": '573px',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "CallBacks": {
            }
        });
    }

    /**
     * @name ShowLinkPopup
     * @summary display the link popup.
     * */
    ShowLinkPopup(objContext) {
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": "Link",
                "ComponentController": objContext.props.ComponentController,
                "ShowMultiMediaAddEdit": false,
                "ShowMultiMediaManagement": true,
                "ShowContainerForExternalLink": true
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": '573px',
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
            "CallBacks": {
                "GetElementJson": (objElementJson) => {
                    if (objElementJson["iElementTypeId"]) {
                        TextActions.Link.AddElementLink(objElementJson);
                    }
                    else {
                        TextActions.Link.AddExternalLink(objElementJson.externalLink);
                    }
                }
            }
        });
    }

    /**
     * @name ShowMailToPopup
     * @summary display the mail popup.
     * */
    ShowMailToPopup() {
        editorPopup.ShowPopup({
            "Data": { email: "" },
            "Meta": {
                "PopupName": "MailPopup",
                "Height": "auto",
                "Width": "500px",
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Callbacks": { "MailTo": (mail) => { TextActions.Link.MailTo(mail) } },
            "Events": {}
        });
    }

    /**
     * @param {object} objContext {state, props, dispatch, InsertTab_ModuleProcessor}.
     * @param {object} objEvt Event Object.
     * @summary This method is responsible for showing or hiding emotion drop down.
     */
    ShowEmoticons(objContext, objEvt) {
        objEvt.nativeEvent.stopImmediatePropagation();
        let blnStatus = objContext.state.Font.blnShowEmoticons ? false : true;
        objContext.InsertTab_ModuleProcessor.SetState({ blnShowEmoticons: blnStatus }, objContext);
    }

    /** 
    * @param {object} objContext {state, props, dispatch, InsertTab_ModuleProcessor}.
    * @param {object} objEvt Event Object.
    * @summary This method is responsible for showing symbol popup.
    */
    ShowSymbol(objContext, objEvt) {
        objEvt.nativeEvent.stopImmediatePropagation();
        let blnStatus = objContext.state.Font.blnShowSymbol ? false : true;
        objContext.InsertTab_ModuleProcessor.SetState({ blnShowSymbol: blnStatus }, objContext);
    }

    /**
    * @name ShowImageSelectionPopUp
    * @summary display image selection popup.
    */
    ShowImageSelectionPopUp() {
        editorPopup.ShowPopup({
            Height: "582px",
            Width: "670px",
            PopUpName: "imageaddedit", //name of the component to be displayed inside the popup. must be present in ComponentController.
            HeaderTitle: "",
            showHeader: true,
            PopupProps: {
                Data: {},
                PassedEvents: {
                    HasCloseButton: "Y",
                    showHeader: true
                },
                Meta: {
                    "ShowHeader": false,
                    "ShowCloseIcon": true,
                    "ShowToggleMaximizeIcon": true,
                },
            }
        });
    }

    /**
     * @name RemoveLink
     * @summary Remove mail link.
     */
    RemoveLink() {
        TextActions.RemoveLink();
    }

    /**
     * @name ReplaceContainer
     * @param {number} intTemplateId container template id.
     * @summary this replace the selected container with a container with template id intTemplateId.
     */
    ReplaceContainer(intTemplateId) {
        let objNewContainerJson = CMSContainer_Editor_MetaData.GetDefaultContainerJson(intTemplateId);
        let EditorRef = EditorState.GetReference("EditorRef");
        if (EditorRef && EditorRef.current && EditorRef.current.ReplaceContainer) {
            EditorRef.current.ReplaceContainer({ ...objNewContainerJson, Ref: React.createRef() });
        }
    }

    /**
     * @name InserContainerAbove
     * @param {number} intTemplateId Container's template id.
     * @summary insert a new container above active container.
     */
    InsertContainerAbove(intTemplateId) {
        let ActivePageContentRef = EditorState.GetProperty("ActivePageContentRef");
        let objNewContainerJson = CMSContainer_Editor_MetaData.GetDefaultContainerJson(intTemplateId);
        ActivePageContentRef.current.InserContainerAbove(objNewContainerJson);
    }

    /**
     * @name InserContainerBelow
     * @param {number} intTemplateId Container's template id.
     * @summary insert a new container below active container.
     */
    InsertContainerBelow(intTemplateId) {
        let ActivePageContentRef = EditorState.GetProperty("ActivePageContentRef");
        let objNewContainerJson = CMSContainer_Editor_MetaData.GetDefaultContainerJson(intTemplateId);
        ActivePageContentRef.current.InserContainerBelow(objNewContainerJson);
    }

    /**
     * @name SetState
     * @param {object} objProps 
     * @param {object} objContext {state, dispatch, props, InsertTab_ModuleProcessor}
     * @summary entry method to change the state of Insert tab.
     */
    SetState(objProps, objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: { ...objProps }
        });
    }

    /**
     * @name ShowAudioAddEditPopup
     * @param {string} strElementType type of popup (image, audio, video).
     * @param {object} objContext {state, props, dispatch, InsertTab_ModuleProcessor}.
     * @param {any} fnCallback callback to run after displaying the MultiMediaAddEdit popup.
     * @summary Opens up the Image add edit popup.
     */
    ShowAudioAddEditPopup(strElementType, objContext, fnCallback) {
        editorPopup.ShowPopup({
            PopupName: "MultiMediaPopup",
            Height: '602px',
            Width: '800px',
            HeaderTitle: "",
            PopupProps: {
                "PassedEvents": {
                    GetElementJson: (objElementJson) => { fnCallback(objContext, objElementJson); }
                },
                "Data": {
                    "MediaType": strElementType
                },
                Meta: {
                    "ShowHeader": false,
                    "ShowCloseIcon": true,
                    "ShowToggleMaximizeIcon": true,
                },
            }
        });
    }

    /**
     * @name AddSubElement
     * @param {string} strType sub-element type (overlay,image).
     * @param {object} objContext {state, props, dispatch, InsertTab_ModuleProcessor}.
     * @summary add sub-element to the active text editor.
     */
    AddSubElement(strType, objContext) {
        switch (strType.toLowerCase()) {
            case "overlay":
                TextActions.AddSubElement(BaseCMSElement.AttachRef(CMSOverlay_Editor_MetaData.GetDefaultElementJson(false)));
                break;
            case "image":
                objContext.InsertTab_ModuleProcessor.ShowMultiMediaPopUp(objContext, "Image", (objElementJson) => {
                    TextActions.AddSubElement(BaseCMSElement.AttachRef(objElementJson));
                });
                break;
            case "smallaudio":
                objContext.InsertTab_ModuleProcessor.ShowMultiMediaPopUp(objContext, "Audio", (objElementJson) => {
                    TextActions.AddSubElement(BaseCMSElement.AttachRef(objElementJson));
                });
                break;
            default:
                break;
        }
    }

    /**
     * @name ShowMultiMediaPopUp
     * @param {object} objContext {state, props, dispatch, InsertTab_ModuleProcessor}.
     * @param {string} strMediaPopupType multi-media type (ex : Image, Audio, Video etc).
     * @param {function} callback call to return Element json.
     * @summary this open the multi-media popup.
     */
    ShowMultiMediaPopUp(objContext, strMediaPopupType, callback) {
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": strMediaPopupType
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
            "CallBacks": {
                "GetElementJson": (objElementJson) => {
                    callback(objElementJson);
                }
            }
        });
    }
}

export default InsertTab_ModuleProcessor;
