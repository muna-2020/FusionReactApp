//Container context-menu base classes.
import CMSContainer_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_ContextMenu';

//Module Related Inputs
import * as CMSContainer_Editor_MetaData from "@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module Object
import Object_TaskContent_CMSElement_CMSAnimation from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSAnimation";

/**
 * @name CMSCheckbox_Editor_ModuleProcessor
 * @summary Contains the container's editor version module specific methods.
 */
class CMSContainer_Editor_ModuleProcessor extends CMSContainer_Editor_ContextMenu {

    /**
     * @name PreserveElementState
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @param {object} State state to be preserved.
     * @summary Preserving element state for undo-redo purpose.
     */
    PreserveElementState(objContext, State) {
        /* develblock:start */
        global.ApplicationLog.Log("PreserveElementState: Entered");
        /* develblock:end */
        objContext.Container_UndoRedoDataRef.current = {
            ...objContext.Container_UndoRedoDataRef.current,
            [State.ElementJson.iElementId]: { ...State }
        };
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current !== null && objContext.props.ParentRef.current.PreserveContainerState) {
            objContext.props.ParentRef.current.PreserveContainerState({ ...objContext.state, ElementState: objContext.Container_UndoRedoDataRef.current });
        }
        /* develblock:start */
        global.ApplicationLog.Log("PreserveElementState: Exiting");
        /* develblock:end */
    };

    /**
     * @name UpdateContainerJSON                    
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @param {object} objContainerJson Json to be updated.
     * @summary Update Json to parent.              
     */
    UpdateContainerJson(objContext, objContainerJson) {
        /* develblock:start */
        global.ApplicationLog.Log("UpdateContainerJson: Entered");
        /* develblock:end */
        objContext.props.UpdateContainerJson(objContainerJson);
        /* develblock:start */
        global.ApplicationLog.Log("UpdateContainerJson: Exiting");
        /* develblock:end */
    };

    /**
     * @name SpellCheckUpdate
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @param {object} objChekedContainer spell checked container json (if null remove all the markings else mark all the bad word).
     * @summray send spell checked element json to all the elements present.
     */
    ContainerSpellCheckUpdate(objContext, objChekedContainer = null) {
        /* develblock:start */
        global.ApplicationLog.Log("ContainerSpellCheckUpdate: Entered");
        /* develblock:end */
        objContext.state.ContainerJson && objContext.state.ContainerJson.Elements && objContext.state.ContainerJson.Elements.forEach(objElement => {
            if (objElement.Ref && objElement.Ref.current && objElement.Ref.current.SpellCheckUpdate) {
                let objCheckedElementJson = objChekedContainer !== null ? objChekedContainer["Elements"].find(objCheckedElement => objCheckedElement["iElementId"] === objElement["iElementId"]) : null;
                objElement.Ref.current.SpellCheckUpdate(objCheckedElementJson);
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("ContainerSpellCheckUpdate: Exiting");
        /* develblock:end */
    };

    /**
     * @name AddElement
     * @param {object} objParams { objContext, intOrder, objTextResource, strElementTypeName, objAdditionalProperties, objElementJson }.
     * @summary Add new element to task.
     */
    async AddElement(objParams) {
        /* develblock:start */
        global.ApplicationLog.Log("AddElement: Entered");
        /* develblock:end */
        let { objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, objTextResource, strElementTypeName, objAdditionalProperties, objElementJson } = objParams;
        if (!objElementJson) {
            objElementJson = await CMSContainer_Editor_MetaData.GetDefaultElementJson(objContext, intOrder, strElementTypeName, objAdditionalProperties);
        }
        objContext.CMSContainer_Editor_ModuleProcessor.CloseSidebar();
        switch (strElementTypeName.toLowerCase()) {
            case "text":
                objElementJson = {
                    ...objElementJson,
                    ["vElementJson"]: {
                        ...objElementJson["vElementJson"],
                        ["vText"]: objTextResource ? objTextResource["Default_Text"] : "Text"
                    }
                };
                break;
            case "hotspot":
                objElementJson = {
                    ...objElementJson,
                    ["vElementJson"]: {
                        ...objElementJson["vElementJson"],
                        ["iElementImageId"]: objAdditionalProperties["vImageElementJson"]["iElementId"]
                    },
                    ["vImageElementJson"]: objAdditionalProperties["vImageElementJson"]
                };
                break;
            default:
                break;
        }
        if (blnContainerPlaceholderDrop) {
            objContext.CMSContainer_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            let arrElements = objContext.state.ContainerJson.Elements.filter(objTempElement => objTempElement.iOrder !== intOrder);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    ["ContainerJson"]: {
                        ...objContext.state.ContainerJson,
                        ["Elements"]: [...arrElements, { ...BaseCMSElement.AttachRef(objElementJson) }]
                    }
                }
            });
        }
        else {
            fnCallBack(BaseCMSElement.AttachRef(objElementJson));
        }
        /* develblock:start */
        global.ApplicationLog.Log("AddElement: Exiting");
        /* develblock:end */
    };

    ShowCalculator(objContext) {
        objContext.CMSContainer_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                ["ContainerJson"]: {
                    ...objContext.state.ContainerJson,
                    ["cShowCalculator"]: objContext.state.ContainerJson.cShowCalculator === "Y" ? "N" : "Y"
                }
            }
        });
    }

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        /* develblock:start */
        global.ApplicationLog.Log("CloseSidebar: Entered");
        /* develblock:end */
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
        /* develblock:start */
        global.ApplicationLog.Log("CloseSidebar: Exiting");
        /* develblock:end */
    }

    /**
     * @name OpenInteractionTypeSidebar
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @summary Opens up the side bar.
     */
    OpenInteractionTypeSidebar(objContext) {
        /* develblock:start */
        global.ApplicationLog.Log("OpenInteractionTypeSidebar: Entered");
        /* develblock:end */
        //objContext.CMSContainer_Editor_ModuleProcessor.CloseSidebar();
        ApplicationState.GetProperty("hideLeftSidebar")();
        const fnShowSidebar = ApplicationState.GetProperty("showLeftSidebar");
        fnShowSidebar({
            "PassedEvents": {
                "CloseSidebar": () => {
                    const fnHideSidebar = ApplicationState.GetProperty("hideLeftSidebar");
                    fnHideSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "InteractionTypeSidebar",
                "Header": "Interaction Type",
                "Title": "Interaction Type",
                "Status": 1,
                "Position": "left",
                "AutoHide": true
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("OpenInteractionTypeSidebar: Exiting");
        /* develblock:end */
    }

    /**
     * @name AddQuestionOrAnswerTitle
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @param {int} intOrder order of the element. 
     * @param {string} strText vtext.
     * @summry this returns the text json for question or title.
     */
    AddQuestionOrAnswerTitle(objContext, intOrder, strText) {
        /* develblock:start */
        global.ApplicationLog.Log("AddQuestionOrAnswerTitle: Entered");
        /* develblock:end */
        let objTextJson = CMSText_Editor_MetaData.GetDefaultElementJson(intOrder);
        let arrElements = objContext.state.ContainerJson.Elements.filter(objTempElement => objTempElement.iOrder !== intOrder);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ContainerJson": {
                    ...objContext.state.ContainerJson,
                    "Elements": [...arrElements,
                    {
                        ...BaseCMSElement.AttachRef({
                            ...objTextJson,
                            "vElementJson": {
                                ...objTextJson.vElementJson,
                                "isQuestionOrAnswerType": "Y",
                                "vClassNames": "pink-heading grid-1",
                                "vText": strText,
                            },
                            "iOrder": intOrder
                        }),

                    }
                    ]
                }
            },
            "blnUndoRedoUpdate": false
        });
        /* develblock:start */
        global.ApplicationLog.Log("AddQuestionOrAnswerTitle: Exiting");
        /* develblock:end */
    }

    /**
     * @name DeleteElement
     * @param {object} objContext{ state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @param {number} iElementId ElementId of the element to be deleted.
     * @summary This method deletes the element whose ElementId is passed.
     */
    DeleteElement(objContext, iElementId) {
        /* develblock:start */
        global.ApplicationLog.Log("DeleteElement: Entered");
        /* develblock:end */
        objContext.CMSContainer_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                ["ContainerJson"]: {
                    ...objContext.state.ContainerJson,
                    ["Elements"]: [...objContext.state.ContainerJson.Elements.filter(objElementTemp => objElementTemp.iElementId !== iElementId)]
                }
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("DeleteElement: Exiting");
        /* develblock:end */
    }

    /**
     * @name ReplaceElement
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @param {number} iElementId ElementId of the old element to be replaced.
     * @param {object} objNewElementJson Element json of the new element.
     * @summary This method replaces an element whose ElementId is passed with the new Element.
     */
    ReplaceElement(objContext, iElementId, objNewElementJson) {
        /* develblock:start */
        global.ApplicationLog.Log("ReplaceElement: Entered");
        /* develblock:end */
        objContext.CMSContainer_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                ["ContainerJson"]: {
                    ...objContext.state.ContainerJson,
                    ["Elements"]: [...objContext.state.ContainerJson.Elements.map(objElementTemp => {
                        if (objElementTemp.iElementId === iElementId) {
                            return { ...BaseCMSElement.AttachRef(objNewElementJson) };
                        }
                        else {
                            return { ...objElementTemp };
                        }
                    })]
                }
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("ReplaceElement: Exiting");
        /* develblock:end */
    }

    /**
     * @name OpenMultiMediaPopUp
     * @param {object} objParams {objContext: { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"] }, intOrder}.
     * @summary Opens up the multimedia media add edit popup.
     * */
    OpenMultiMediaPopUp(objParams) {
        /* develblock:start */
        global.ApplicationLog.Log("OpenMultiMediaPopUp: Entered");
        /* develblock:end */
        let { objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName, strPopupType } = objParams;
        editorPopup.ShowPopup({
            "Data": {
                "iContainerId": objContext.state.ContainerJson ? objContext.state.ContainerJson.iContainerId : null,
                "intOrder": objContext.state.ContainerJson ? objContext.state.ContainerJson.intOrder : null,
                "MediaType": strPopupType ? strPopupType : strElementTypeName,
                "FolderID": objContext.props.FolderID,
                "ComponentController": objContext.props.ComponentController,
                "ModuleName": "image-add-mm-popup"
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
                    if (!strElementTypeName) {
                        objParams = {
                            ...objParams,
                            ["strElementTypeName"]: strElementTypeName
                        };
                    }
                    switch (strElementTypeName.toLowerCase()) {
                        case "animation":
                            objContext.CMSContainer_Editor_ModuleProcessor.AddElement({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "AnimationWrapper", objAdditionalProperties: { objElementJson } });
                            break;
                        case "hotspot":
                            objContext.CMSContainer_Editor_ModuleProcessor.AddElement({
                                objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName, objAdditionalProperties: {
                                    ["vImageElementJson"]: {
                                        ...objElementJson,
                                        ["vContainerElementProperties"]: {
                                            ["vElementVerticalAlignment"]: "middle",
                                            ["vElementHorizontalAlignment"]: "center",
                                            ["iElementWidth"]: null,
                                            ["iElementHeight"]: null
                                        }
                                    }
                                }
                            });
                            break;
                        case "image":
                            objContext.CMSContainer_Editor_ModuleProcessor.AddElement({
                                objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName, objAdditionalProperties: {}, objElementJson: {
                                    ...objElementJson,
                                    ["iOrder"]: intOrder,
                                    ["vContainerElementProperties"]: {
                                        ["vElementVerticalAlignment"]: "middle",
                                        ["vElementHorizontalAlignment"]: "center",
                                        ["iElementWidth"]: null,
                                        ["iElementHeight"]: null
                                    }
                                }
                            });
                            break;
                        case "mapelement":
                            objContext.CMSContainer_Editor_ModuleProcessor.AddElement({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName, objAdditionalProperties: { objElementJson } });
                            break;
                        case "colorfill":
                            objContext.CMSContainer_Editor_ModuleProcessor.AddElement({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "ColorFillWrapper", objAdditionalProperties: { ...objElementJson } });
                            break;
                        default:
                            objContext.CMSContainer_Editor_ModuleProcessor.AddElement({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName, objAdditionalProperties: {}, objElementJson: { ...objElementJson, ["iOrder"]: intOrder } });
                            break;
                    }
                }
            }
        });
        /* develblock:start */
        global.ApplicationLog.Log("OpenMultiMediaPopUp: Exiting");
        /* develblock:end */
    }

    /**
     * @name ShowDeleteElementPopup
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @param {object} intElementId Element Id of the element to be deleted.
     * @param {boolean} blnShowPopup true/false, whether to show popup or not.
     * @summary Opens up confirmation popup for deleting an element.
     */
    ShowDeleteElementPopup(objContext, intElementId, blnShowPopup = true) {
        /* develblock:start */
        global.ApplicationLog.Log("ShowDeleteElementPopup: Entered");
        /* develblock:end */
        if (blnShowPopup) {
            let objElementJson = objContext.state.ContainerJson["Elements"].filter(objTempData => objTempData["iElementId"] === intElementId)[0];
            let objCommonTextResource = EditorState.GetProperty("CommonTextResource");
            editorPopup.ShowConfirmationPopup({
                "Resource": {
                    "Text": {
                        "DELETE_Title": objContext.CMSContainer_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_Title").replace("{ElementTypeName}", objElementJson["vElementTypeName"]),
                        "DELETE_SubTitle": objContext.CMSContainer_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_SubTitle").replace("{ElementTypeName}", objElementJson["vElementTypeName"]),
                        "DELETE_ConfirmText": objContext.CMSContainer_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_Message").replace("{ElementTypeName}", objElementJson["vElementTypeName"]),
                        "DELETE_ConfirmButtonText": objContext.CMSContainer_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_ConfirmButtonText"),
                        "DELETE_CloseButtonText": objContext.CMSContainer_Editor_ModuleProcessor.TextFormatter(objCommonTextResource, "DeletePopup_CloseButtonText"),
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
                        objContext.CMSContainer_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                        editorPopup.ClosePopup(strPopupId);
                        objContext.CMSContainer_Editor_ModuleProcessor.DeleteElement(objContext, intElementId);
                    }
                },
                "CallBacks": {}
            });
        }
        else {
            objContext.CMSContainer_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            objContext.CMSContainer_Editor_ModuleProcessor.DeleteElement(objContext, intElementId);
        }
        /* develblock:start */
        global.ApplicationLog.Log("ShowDeleteElementPopup: Exiting");
        /* develblock:end */
    }

    /**
     * @name OnElementDrop
     * @param {object} objContext { state, dispatch, props, ["Ref"], ["ContainerComponentRef"], ["CMSContainer_Editor_ModuleProcessor"]}.
     * @param {string} strElementTypeName Element Type Name.
     * @param {number} intOrder Element order.
     * @param {boolean} blnContainerPlaceholderDrop
     * @param {any} fnCallBack callback function
     * @summary add the dropped element to container.
     */
    OnPlaceholderDrop(objContext, strElementTypeName, intOrder, blnContainerPlaceholderDrop = true, fnCallBack = () => { }) {
        /* develblock:start */
        global.ApplicationLog.Log("OnPlaceholderDrop: Entered");
        /* develblock:end */
        switch (strElementTypeName.toLowerCase()) {
            case "inputformula_scientific":
                objContext.CMSContainer_Editor_ModuleProcessor.AddElement({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "InputFormula", objAdditionalProperties: { formulaType: "scientific" } });
                break;
            case "inputformula_simple":
                objContext.CMSContainer_Editor_ModuleProcessor.AddElement({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "InputFormula", objAdditionalProperties: { formulaType: "simple" } });
                break;
            case "hotspot":
                objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "Hotspot", strPopupType: "Image" });
                break;
            case "video":
                objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "Video" });
                break;
            case "image":
                objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "Image" });
                break;
            case "audio":
                objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "Audio" });
                break;
            case "animation":
                objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "Animation" });
                break;
            case "colorfill":
                objContext.CMSContainer_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "ColorFill" });
                break;
            case "addition":
                objContext.CMSContainer_Editor_ModuleProcessor.AddMathAnimation({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, "iElementId": 513312, "MathAnimationType": "Addition" });
                break;
            case "subtraction":
                objContext.CMSContainer_Editor_ModuleProcessor.AddMathAnimation({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, "iElementId": 513753, "MathAnimationType": "Subtraction" });
                break;
            case "multiplication":
                objContext.CMSContainer_Editor_ModuleProcessor.AddMathAnimation({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, "iElementId": 514683, "MathAnimationType": "Multiplication" });
                break;
            case "division":
                objContext.CMSContainer_Editor_ModuleProcessor.AddMathAnimation({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, "iElementId": 516451, "MathAnimationType": "Division" });
                break;
            default:
                objContext.CMSContainer_Editor_ModuleProcessor.AddElement({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: strElementTypeName });
                break;
        }
        /* develblock:start */
        global.ApplicationLog.Log("OnPlaceholderDrop: Exiting");
        /* develblock:end */
    }

    /**
     * @name AddMathAnimation
     * @param {object} objParams 
     */
    async AddMathAnimation(objParams) {
        /* develblock:start */
        global.ApplicationLog.Log("AddMathAnimation: Entered");
        /* develblock:end */
        var { objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, iElementId, MathAnimationType } = objParams;
        var objAnimationElementJson = await Object_TaskContent_CMSElement_CMSAnimation.GetAnimationElementJson({ "iElementId": iElementId, "cIsFusionVersion": "N" });
        var objAdditionalProperties = { "objElementJson": { ...objAnimationElementJson } };
        var objElementJson = await CMSContainer_Editor_MetaData.GetDefaultElementJson(objContext, intOrder, "AnimationWrapper", objAdditionalProperties);
        objContext.CMSContainer_Editor_ModuleProcessor.AddElement({ objContext, blnContainerPlaceholderDrop, fnCallBack, intOrder, strElementTypeName: "AnimationWrapper", objAdditionalProperties: { "AnimationType": MathAnimationType }, objElementJson });
        /* develblock:start */
        global.ApplicationLog.Log("AddMathAnimation: Exiting");
        /* develblock:end */
    }

    /**
     * @name ShowCalculator
     * @param {any} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"] }.
     */
    ShowCalculatorPopup(objContext) {
        editorPopup.ShowPopup({
            "Data": {
                ...objContext.props,
                //["CalculatorType"]: "Scientific"
            },
            "Meta": {
                "PopupName": "Calculator",
                "Height": '472px',
                "Width": '265px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": false,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {}
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/5_CMSContainer/ContainerTemplates/ContainerTemplates.css"
        ];
    }
}

export default CMSContainer_Editor_ModuleProcessor;
