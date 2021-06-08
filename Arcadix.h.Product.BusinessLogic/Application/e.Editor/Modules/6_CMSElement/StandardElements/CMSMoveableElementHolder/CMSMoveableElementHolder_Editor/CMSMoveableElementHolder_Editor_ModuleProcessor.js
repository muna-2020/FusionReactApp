//Module related fies.
import CMSMoveableElementHolder_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Editor/CMSMoveableElementHolder_Editor_ContextMenu";
import * as CMSMoveableElementHolder_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Editor/CMSMoveableElementHolder_Editor_MetaData";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSMoveableElementHolder_Editor_ModuleProcessor
 * @summary Contains the MoveableElementHolder's editor version module specific methods.
 * */
class CMSMoveableElementHolder_Editor_ModuleProcessor extends CMSMoveableElementHolder_Editor_ContextMenu {

    /**
     * @name PreserveTextState
     * @param {object} objContext {state, props, dispatch}.
     * @param {object} objState state to be preserved.
     * @summary Preserving text state for undo-redo purpose.
     */
    PreserveTextState(objContext, objState) {
        objContext.Element_UndoRedoDataRef.current = {
            ...objContext.Element_UndoRedoDataRef.current,
            [objState.ElementJson.iElementId]: { ...objState }
        };
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.PreserveElementState) {
            objContext.props.ParentRef.current.PreserveElementState({ ...objContext.state, TextState: objContext.Element_UndoRedoDataRef.current });
        }
    }

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name ShowPropertiesSidebar
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {object} objElementJson Element json to be sent to sidebar.
     * @summary Opens up the side bar.
     */
    ShowPropertiesSidebar(objParams) {
        let { objContext, objTextResource } = objParams;
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.CloseSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "ElementJson": { ...objContext.state.ElementJson },
            "TextResource": objTextResource,
            "PassedEvents": {
                "UpdateElementJson": (objNewElementJson) => {
                    objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: {
                            "ElementJson": objNewElementJson
                        }
                    });
                    objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "MoveableElementHolderPropertiesSidebar",
                "Header": "Moveable Element Holder",
                "Title": "Properties",
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name OpenInteractionTypeSidebar
     * @param {object} objParams { objContext: {state, dispatch, props, CMSMoveableElementHolder_Editor_ModuleProcessor}}.
     * @summary Opens up the side bar.
     */
    OpenInteractionTypeSidebar(objParams) {
        let { objContext } = objParams;
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.CloseSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "PassedEvents": {
                "CloseSidebar": () => {
                    objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.CloseSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "InteractionTypeSidebar",
                "Header": "Interaction Type",
                "Title": "Interaction Type",
                "Status": 1,
                "Position": "left",
                "AutoHide": false
            }
        });
    }

    /**
     * @name AddElement
     * @param {object} objParams {objContext, strElementTypeName, intLeft, intTop, objAdditionalProperties}
     * @summary Adds an element to the holder.
     */
    async AddElement(objParams) {
        let { objContext, strElementTypeName, intLeft, intTop, objAdditionalProperties, objElementJson } = objParams
        if (!objElementJson) {
            objElementJson = await CMSMoveableElementHolder_Editor_MetaData.GetElementJsonForElementType(strElementTypeName, objAdditionalProperties);
        }
        else {
            objElementJson = CMSMoveableElementHolder_Editor_MetaData.GetRefAttachedToElement(objElementJson);
        }
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: [
                            ...objContext.state.ElementJson["vElementJson"]["Values"],
                            {
                                ["iElement" + objElementJson["vElementTypeName"] + "Id"]: objElementJson["iElementId"],
                                ["vElementTypeName"]: objElementJson["vElementTypeName"],
                                ["Top"]: intTop,
                                ["Left"]: intLeft,
                                ["Height"]: null,
                                ["Width"]: null
                            }
                        ]
                    },
                    ["MappedElements"]: [
                        ...objContext.state.ElementJson["MappedElements"],
                        {
                            ...objElementJson
                        }
                    ]
                },
                "ElementFocused": objElementJson["iElementId"]
            }
        });
    }

    /**
     * @name OnDropFromSidebar
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {string} strElementTypeName Element Type Name.
     * @param {number} intOrder Element order.
     * @summary add the dropped element to container.
     */
    OnDropFromSidebar(objContext, strElementTypeName, intLeft, intTop) {
        switch (strElementTypeName.toLowerCase()) {
            case "inputformula_scientific":
                objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.AddElement({ objContext, strElementTypeName: "InputFormula", intLeft, intTop, objAdditionalProperties: { formulaType: "scientific" } });
                break;
            case "inputformula_simple":
                objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.AddElement({ objContext, strElementTypeName: "InputFormula", intLeft, intTop, objAdditionalProperties: { formulaType: "simple" } });
                break;
            case "hotspot":
                let EditorRef = EditorState.GetReference("EditorRef");
                let cIsFusionVersion = EditorRef.current.IsFusionVersion();
                if (cIsFusionVersion === "Y") {
                    objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, strElementTypeName: "Hotspot", intLeft, intTop, strPopupType: "Image" });
                }
                break;
            case "video":
                objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, strElementTypeName: "Video", intLeft, intTop });
                break;
            case "image":
                objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, strElementTypeName: "Image", intLeft, intTop });
                break;
            case "audio":
                objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, strElementTypeName: "Audio", intLeft, intTop });
                break;
            case "animation":
                objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, strElementTypeName: "Animation", intLeft, intTop });
                break;
            case "colorfill":
                objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, strElementTypeName: "ColorFill", intLeft, intTop });
                break;
            default:
                if (strElementTypeName.toLowerCase() !== "moveableelementholder") {
                    objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.AddElement({ objContext, strElementTypeName, intLeft, intTop });
                }
                break;
        }
    }

    /**
     * @name OpenMultiMediaPopUp
     * @param {object} objParams {objContext: { state, dispatch, props, CMSMoveableElementHolder_Editor_ModuleProcessor }}.
     * @summary Opens up the multimedia media add edit popup.
     * */
    OpenMultiMediaPopUp(objParams) {
        let { objContext, strElementTypeName, intLeft, intTop, strPopupType } = objParams;
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": strPopupType ? strPopupType : strElementTypeName,
                "FolderID": objContext.props.FolderID,
                "ComponentController": objContext.props.ComponentController
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": '602px',
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
                    if (!strElementTypeName) {
                        objParams = {
                            ...objParams,
                            ["strElementTypeName"]: strElementTypeName
                        };
                    }
                    switch (strElementTypeName.toLowerCase()) {
                        case "animation":
                            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.AddElement({ objContext, strElementTypeName: "AnimationWrapper", intLeft, intTop, objAdditionalProperties: { objElementJson } });
                            break;
                        case "hotspot":
                            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.AddElement({ objContext, strElementTypeName, intLeft, intTop, objAdditionalProperties: { objElementJson } });
                            break;
                        case "colorfill":
                            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.AddElement({ objContext, strElementTypeName: "ColorFillWrapper", intLeft, intTop, objAdditionalProperties: { ...objElementJson } });
                            break;
                        default:
                            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.AddElement({ objContext, strElementTypeName, intLeft, intTop, objAdditionalProperties: {}, objElementJson: { ...objElementJson, ["iOrder"]: 1 } });
                            break;
                    }
                }
            }
        });
    }

    /**
     * @name AddSubElement
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {string} objSubElementJson 
     * @param {number} intTop 
     * @param {number} intLeft 
     * @summary Adds an element to the holder.
     */
    AddSubElement(objContext, objSubElementJson, intLeft, intTop) {
        let objMappedElementJson = CMSMoveableElementHolder_Editor_MetaData.GetTextElementForSubElement(objSubElementJson);
        objContext.AddSubElementRef.current = objSubElementJson;
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: [
                            ...objContext.state.ElementJson["vElementJson"]["Values"],
                            {
                                ["iElement" + objMappedElementJson["vElementTypeName"] + "Id"]: objMappedElementJson["iElementId"],
                                ["vElementTypeName"]: objMappedElementJson["vElementTypeName"],
                                ["Top"]: intTop,
                                ["Left"]: intLeft,
                                ["Height"]: 100,
                                ["Width"]: 100
                            }
                        ]
                    },
                    ["MappedElements"]: [
                        ...objContext.state.ElementJson["MappedElements"],
                        {
                            ...objMappedElementJson
                        }
                    ]
                },
                "ElementFocused": objMappedElementJson["iElementId"]
            }
        });
    }

    /**
     * @name DeleteElement
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {number} intElementId iElementId of the element to be deleted
     * @summary Deletes the element from the holder
     */
    DeleteElement(objContext, intElementId, blnShowPopup = true) {
        let objMappedElementJson = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === intElementId);
        let objCommonTextResource = EditorState.GetProperty("CommonTextResource");
        if (blnShowPopup) {
            editorPopup.ShowConfirmationPopup({
                "Resource": {
                    "Text": {
                        "DELETE_Title": objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_Title").replace("{ElementTypeName}", objMappedElementJson["vElementTypeName"]),
                        "DELETE_SubTitle": objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_SubTitle").replace("{ElementTypeName}", objMappedElementJson["vElementTypeName"]),
                        "DELETE_ConfirmText": objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_Message").replace("{ElementTypeName}", objMappedElementJson["vElementTypeName"]),
                        "DELETE_ConfirmButtonText": objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_ConfirmButtonText"),
                        "DELETE_CloseButtonText": objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_CloseButtonText"),
                    },
                    "TextResourcesKey": "DELETE",
                    "Variables": {},
                    "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
                },
                "Meta": {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                    "Height": 'auto',
                    "Width": '390px'
                },
                "Data": {},
                "Events": {
                    "ConfirmEvent": (strPopupId) => {
                        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                        editorPopup.ClosePopup(strPopupId);
                        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.DeleteElement(objContext, intElementId, false);
                    }
                },
                "CallBacks": {}
            });
        }
        else {
            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["Values"]: objContext.state.ElementJson["vElementJson"]["Values"].filter(x => x["iElement" + objMappedElementJson["vElementTypeName"] + "Id"] !== intElementId)
                        },
                        ["MappedElements"]: objContext.state.ElementJson["MappedElements"].filter(x => x["iElementId"] !== intElementId)
                    },
                    "ElementFocused": objMappedElementJson["iElementId"] === objContext.state.ElementFocused ? null : objContext.state.ElementFocused

                }
            });
        }
    }

    /**
     * @name ActivateElement
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {number} intElementId ElementId of mapped element
     * @summary Activates the element.
     */
    ActivateElement(objContext, intElementId) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementFocused": intElementId,
            },
            blnUndoRedoUpdate: false
        });
    }

    /**
     * @name SaveElementPosition
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {number} intLeft X Coordinate
     * @param {number} intTop Y Coordinate
     * @summary Saves the element position.
     */
    SaveElementPosition(objContext, intLeft, intTop) {
        let objMappedElementJson = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === objContext.state.ElementFocused);
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: [
                            ...objContext.state.ElementJson["vElementJson"]["Values"].map(x => {
                                if (x["iElement" + objMappedElementJson["vElementTypeName"] + "Id"] === objContext.state.ElementFocused) {
                                    return {
                                        ...x,
                                        ["Top"]: intTop,
                                        ["Left"]: intLeft
                                    };
                                }
                                else {
                                    return {
                                        ...x
                                    };
                                }
                            })
                        ]
                    }
                }
            }
        });
    }

    /**
     * @name GetMappedElementProps
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {object} objElementJson Element json of mapped element.
     * @summary Returns props for mapped element.
     */
    GetMappedElementProps(objContext, objElementJson) {
        let objElementProps = {
            ...(objContext.props.IsForServerRenderHtml ? objContext.props : {}),
            "Mode": objContext.props.Mode,
            "ContainerId": objContext.props.ContainerId,
            "ParentRef": objContext.props.ElementRef,
            "PageId": objContext.props.PageId,
            "ElementRef": objElementJson.Ref,
            "ComponentController": objContext.props.ComponentController,
            "ElementJson": objElementJson,
            "JConfiguration": objContext.props.JConfiguration,
            "IsSubElement": "Y",
            // "PreservedState": Container_UndoRedoDataRef.current[ElementJson["iElementId"]]
        };
        return objElementProps;
    }

    /**
     * @name ResizeHolder
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {number} intHeight Height
     * @param {number} intWidth Width
     * @summary Resizes the main holder.
     */
    ResizeHolder(objContext, intHeight, intWidth) {
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["iHeight"]: intHeight,
                        ["iWidth"]: intWidth
                    }
                }
            }
        });
    }

    /**
     * @name ResizeElement
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {number} objMappedElementJson Mapped Element's Element json
     * @param {number} intHeight Height
     * @param {number} intWidth Width
     * @summary Resizes the element holder.
     */
    ResizeElement(objContext, objMappedElementJson, intHeight, intWidth) {
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: [
                            ...objContext.state.ElementJson["vElementJson"]["Values"].map(x => {
                                if (x["iElement" + objMappedElementJson["vElementTypeName"] + "Id"] === objMappedElementJson["iElementId"]) {
                                    return {
                                        ...x,
                                        ["Height"]: intHeight,
                                        ["Width"]: intWidth
                                    };
                                }
                                else {
                                    return {
                                        ...x
                                    };
                                }
                            })
                        ]
                    }
                },
                "ElementFocused": objMappedElementJson["iElementId"]
            }
        });
    }

    BringOnTop(objParams) {
        let { objContext, Value } = objParams;
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].filter(x => x["iElement" + x["vElementTypeName"] + "Id"] !== Value["iElement" + Value["vElementTypeName"] + "Id"]);
        arrValues = [
            ...arrValues,
            Value
        ];
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: BaseCMSElement.UpdateDisplayOrder(arrValues)
                    }
                }
            }
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMoveableElementHolder/CMSMoveableElementHolderStyles.css"
        ];
    }
}

export default CMSMoveableElementHolder_Editor_ModuleProcessor;
