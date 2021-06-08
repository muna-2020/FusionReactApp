//React Imports
import React, { useReducer, useImperativeHandle, useRef } from 'react';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module Related Imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_Common/CMSTextMark_Common';
import CMSTextMark_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_Editor/CMSTextMark_Editor_ModuleProcessor";
import * as CMSTextMark_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_Editor/CMSTextMark_Editor_Hooks';

//Components used.
import Text_Editor from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Text_Editor";

//UndoRedo imports
import { UndoRedoInitialize, UndoRedo } from "@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo";

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSTextMark_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary Edtiro version of CMSText Mark
 * @returns {any} CMSTextMark_Editor
 */
const CMSTextMark_Editor = (props, ref) => {

    /**
     * @name GetProperHtml
     * @param {object} objElementJson ElementJson
     * @summary Forms the html from the Text and wraps it inside a div and returns its inner html.
     * @returns {string} Inner Html
     */
    const GetProperHtml = () => {
        let objElementJson = props.ElementJson["vElementJson"];
        if (document !== null && document !== "undefined") {
            let objElement = document.createElement('div');
            objElement.innerHTML = objElementJson["vText"];
            let arrNodes = objElement.querySelectorAll('[actualtype="TextMark"]');
            arrNodes.forEach((objTempNode, intIndex) => {
                if (!objTempNode.id) {
                    objTempNode.id = UniqueId.GetUniqueId();
                }
                let objValue = props.ElementJson["vElementJson"]["Values"].find(x => x["iElementTextMarkValueId"] === parseInt(objTempNode.id));
                if (objValue["cIsCorrectValue"] === "Y") {
                    objTempNode.classList.add("CorrectTextBGColor");
                    objTempNode.setAttribute("type", "TextMarkCorrect");
                }
                else {
                    objTempNode.classList.add("WrongTextBGColor");
                    objTempNode.setAttribute("type", "TextMarkWrong");
                }
            });
            return objElement.innerHTML;
        }
        else {
            return objElementJson["vText"];
        }
    };

    /**
     * @name GetElementJsonForComponent
     * @param {object} props parent props
     * @summary Returns the element json object in the form it is used by componnet.
     * @returns {object} ElementJson
     */
    const GetElementJsonForComponent = () => {
        let objElementJson = {
            ...props.ElementJson,
            ["vElementJson"]: {
                ...props.ElementJson["vElementJson"],
                ["vText"]: GetProperHtml()
            },
            ["TextRef"]: React.createRef()
        };
        return objElementJson;
    };

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, UndoRedoInitialize({
        "ElementJson": GetElementJsonForComponent(),
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    }, props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        props,
        dispatch,
        "TextMarkRef": useRef(null),
        "ModuleName": "CMSTextMark_Editor_" + props.ElementJson.iElementId,
        "Html_DataRef": useRef(null),
        "Element_UndoRedoDataRef": useRef((props.PreservedState && props.PreservedState.Text_EditorState) ? { [props.ElementJson.iElementId]: props.PreservedState.Text_EditorState } : {}),
        "CMSTextMark_Editor_ModuleProcessor": new CMSTextMark_Editor_ModuleProcessor()
    };

    /**
     * @name CMSTextMark_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSTextMark_Editor_Hooks, that contains all the custom hooks.
     */
    CMSTextMark_Editor_Hooks.Initialize(objContext);

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    EditorBase_Hook.InitializeCss(props, objContext.CMSTextMark_Editor_ModuleProcessor);

    /**
     * @name useImperativeHandle
     * @summary Use to get element json for saving.
     */
    useImperativeHandle(props.ElementRef, () => ({
        "GetElementJson": async () => {
            let objElementJsonFromText_Editor = await state.ElementJson.TextRef.current.GetElementJson();
            let objElementJson = {
                ...state.ElementJson,
                ["vElementJson"]: {
                    ...state.ElementJson["vElementJson"],
                    "vText": GetHtmlForSave(objElementJsonFromText_Editor["vElementJson"]["vText"]),
                    "SubElements": [...objElementJsonFromText_Editor["vElementJson"]["SubElements"]]
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetElementJsonForCopy": async () => {
            let objElementJsonFromText_Editor = await state.ElementJson.TextRef.current.GetElementJson();
            let objElementJson = {
                ...state.ElementJson,
                "iElementId": UniqueId.GetUniqueId(),
                "vElementJson": {
                    ...state.ElementJson["vElementJson"],
                    "SubElements": [...objElementJsonFromText_Editor["vElementJson"]["SubElements"]]
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetLatestState": () => {
            return {
                ...objContext.state.ElementJson.TextRef.current.GetLatestState()
            };
        },
        "GetPointOverride": () => {
            return objContext.CMSTextMark_Editor_ModuleProcessor.GetPointOverride(objContext);
        },
        "SetPointOverride": (objPoints) => {
            objContext.CMSTextMark_Editor_ModuleProcessor.SetPointOverride(objContext, objPoints);
        },
        "RemovePointOverride": () => {
            objContext.CMSTextMark_Editor_ModuleProcessor.RemovePointOverride(objContext);
        },
        "ShowToolTip": () => {
            if (objContext.state.ElementJson["vElementJson"]["Values"].length > 0) {
                let objDomAppArea = document.getElementById("activeworkarea_" + props.Mode + "_" + props.PageId);
                let objTextMarkElement = objDomAppArea.querySelector('[ielementid="' + state.ElementJson["iElementId"] + '"]');
                objContext.Html_DataRef.current = objTextMarkElement.innerHTML;
                let ParentDivElement = objTextMarkElement.querySelector('[texteditorid="' + state.ElementJson["iElementId"] + '"]');
                let strData = "";
                ParentDivElement.childNodes.forEach((objNode) => {
                    if (objNode.tagName) {
                        if (objNode.getAttribute && objNode.getAttribute("actualtype") && objNode.getAttribute("actualtype").toUpperCase() === "TEXTMARK") {
                            let objValue = objContext.state.ElementJson["vElementJson"]["Values"].find(x => x["iElementTextMarkValueId"] == objNode.id);
                            let objPointOverrideContainerDiv = document.createElement('span');
                            objPointOverrideContainerDiv.setAttribute("class", "textmark-pointer-override-container");
                            let objPointOverrideTooltipDiv = document.createElement('span');
                            objPointOverrideTooltipDiv.setAttribute("class", "textmark-pointer-override-tooltip");
                            objPointOverrideTooltipDiv.setAttribute("style", "display: 'flex'");
                            objPointOverrideTooltipDiv.innerHTML = objValue["iDisplayOrder"];
                            objPointOverrideContainerDiv.appendChild(objPointOverrideTooltipDiv);
                            objPointOverrideContainerDiv.appendChild(objNode);
                            strData += objPointOverrideContainerDiv.outerHTML;
                        }
                        else {
                            strData += objNode.outerHTML;
                        }
                    }
                    else {
                        strData += objNode.textContent;
                    }
                });
                ParentDivElement.innerHTML = strData;
                // objContext.state.ElementJson["vElementJson"]["Values"].map(x => {
                //     let objNode = objTextMarkElement.querySelector('[id="' + x["iElementTextMarkValueId"] + '"]');
                //     objNode.replaceWith([objPointOverrideContainerDiv]);
                //     // objTextMarkElement.replaceChild(objPointOverrideContainerDiv, objNode);
                // });
            }
        },
        "GetContextMenuOptions": () => {
            return objContext.CMSTextMark_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "SetAnswer": (strOperationType) => {
            MarkAnswer(strOperationType);
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [state, props]);

    /**
     * @name GetValuesFromHtml
     * @summary Used by GetElementJson() to get the json for marked answers.
     * @returns {any} value array
     */
    const GetValuesFromHtml = (strInnerHtml) => {
        let arrAnswerTextMark = [];
        let objElement = document.createElement('div');
        objElement.innerHTML = strInnerHtml;
        let arrNodes = objElement.querySelectorAll('[actualtype="TextMark"]');
        arrNodes.forEach((objTempNode, intIndex) => {
            arrAnswerTextMark = [
                ...arrAnswerTextMark,
                {
                    "iElementTextMarkValueId": parseInt(objTempNode.id),
                    "cIsCorrectValue": objTempNode.getAttribute("type").toUpperCase() === "TEXTMARKCORRECT" ? "Y" : "N",
                    "iDisplayOrder": intIndex + 1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "IsSaved": "N"
                }
            ];
        });
        return arrAnswerTextMark;
    };

    const GetHtmlForSave = (strVText) => {
        let objElement = document.createElement('div');
        objElement.innerHTML = strVText;
        let arrNodes = objElement.querySelectorAll('[actualtype="TextMark"]');
        arrNodes.forEach((objTempNode, intIndex) => {
            if (objTempNode.getAttribute("type").toUpperCase() === "TEXTMARKCORRECT") {
                objTempNode.classList.remove("CorrectTextBGColor");
            }
            else {
                objTempNode.classList.remove("WrongTextBGColor");
            }
            objTempNode.removeAttribute("type");
        });
        return objElement.innerHTML;
    };

    /**
     * @name GetSelectedContentAsElement
     * @summary Gets the Selected content wraps it in a div and returns that div.
     * @returns {any} Element
     */
    const GetSelectedContentAsElement = () => {
        let objRange = window.getSelection().getRangeAt(0);
        let clonedSelection = objRange.cloneContents();
        let divElement = document.createElement('div');
        divElement.appendChild(clonedSelection);
        return divElement;
    };

    /**
     * @name GetSelectedContentHtml
     * @summary Gets the selected content and wraps that in a div and returns the inner html of that div.
     * @returns {string} Selected Content as Html
     */
    const GetSelectedContentHtml = () => {
        let divElement = GetSelectedContentAsElement();
        let strSelectedHtml = divElement.innerHTML;
        return strSelectedHtml;
    };

    /**
     * @name MarkAnswer
     * @param {string} strOperationType TEXTCORRECT/TEXTINCORRECT/REMOVE/WORDINCORRECT
     * @summary This is sent as an element prop to the office text editor(to its ref). It is invoked in the office ribbon by the text editor's ref.
     */
    const MarkAnswer = (strOperationType) => {
        switch (strOperationType.toUpperCase()) {
            case "TEXTCORRECT":
                SetSelectionAsCorerctOrIncorrect("TextMarkCorrect", "CorrectTextBGColor");
                objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                break;
            case "TEXTINCORRECT":
                SetSelectionAsCorerctOrIncorrect("TextMarkWrong", "WrongTextBGColor");
                objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                break;
            case "REMOVE":
                RemoveSelectionFromAnswer();
                objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                break;
            case "WORDINCORRECT":
                SetEveryWordAsWrong("WrongTextBGColor");
                objContext.CMSTextMark_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                break;
        }
    };

    /**
     * @name SetSelectionAsCorerctOrIncorrect
     * @param {string} strOperationType TextMarkCorrect/TextMarkWrong
     * @param {string} strClassName CorrectTextBGColor/WrongTextBGColor
     * @summary Set's the selected portion as Correct/Incorrect as per clicked in the office ribbon.
     */
    const SetSelectionAsCorerctOrIncorrect = async (strOperationType, strClassName) => {
        const objRef = EditorState.GetReference("ActiveTextMark");
        Selection.PreserveSelection(objRef);
        let objSelection = window.getSelection();
        let objRange = objSelection.getRangeAt(0);
        let strSelectedHtml = GetSelectedContentHtml();
        if (strSelectedHtml) {
            let blnFlag = false;
            let SelectedContentAsElement = GetSelectedContentAsElement();
            if (objSelection.anchorNode.parentNode.getAttribute("actualtype") && objSelection.anchorNode.parentNode.getAttribute("actualtype").toUpperCase() === "TEXTMARK") {
                objSelection.anchorNode.parentNode.outerHTML = objSelection.anchorNode.parentNode.innerHTML;
                blnFlag = true;
            }
            if (objSelection.focusNode.parentNode.getAttribute("actualtype") && objSelection.focusNode.parentNode.getAttribute("actualtype").toUpperCase() === "TEXTMARK") {
                objSelection.focusNode.parentNode.outerHTML = objSelection.focusNode.parentNode.innerHTML;
                blnFlag = true;
            }
            let strModifiedHtml = "";
            let blnContainsDiv = false;
            SelectedContentAsElement.childNodes.forEach(node => {
                if (node.tagName) {
                    if (node.getAttribute && node.getAttribute("actualtype") && node.getAttribute("actualtype").toUpperCase() === "TEXTMARK") {
                        strModifiedHtml += node.innerHTML;
                    }
                    else {
                        strModifiedHtml += node.outerHTML;
                    }
                    if (node.tagName.toLowerCase() === "div") {
                        blnContainsDiv = true;
                    }
                }
                else {
                    strModifiedHtml += node.textContent;
                }
            });
            if (strModifiedHtml === "") {
                strModifiedHtml = strSelectedHtml;
            }
            let newNode = document.createElement(blnContainsDiv ? "div" : "span");
            newNode.setAttribute("id", UniqueId.GetUniqueId());
            newNode.setAttribute("actualtype", "TextMark");
            newNode.setAttribute("type", strOperationType);
            newNode.setAttribute("class", strClassName);
            newNode.innerHTML = strModifiedHtml;
            if (blnFlag) {
                Selection.PreserveSelection(objRef);
                objRange = window.getSelection().getRangeAt(0);
            }
            objRange.deleteContents();
            objRange.insertNode(newNode);
            let objElementJsonFromText_Editor = await state.ElementJson.TextRef.current.GetElementJson();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: GetValuesFromHtml(objElementJsonFromText_Editor["vElementJson"]["vText"]),
                    ["vText"]: objElementJsonFromText_Editor["vElementJson"]["vText"],
                    ["SubElements"]: objElementJsonFromText_Editor["vElementJson"]["SubElements"]
                }
            };
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": objElementJson
                }
            });
        }
    };

    /**
     * @name RemoveSelectionFromAnswer
     * @summary Remove's the marked answer.
     */
    const RemoveSelectionFromAnswer = async () => {
        const objRef = EditorState.GetReference("ActiveTextMark");
        Selection.PreserveSelection(objRef);
        let objSelection = window.getSelection();
        if (objSelection.anchorNode.parentNode.getAttribute("actualtype") && objSelection.anchorNode.parentNode.getAttribute("actualtype").toUpperCase() === "TEXTMARK") {
            objSelection.anchorNode.parentNode.outerHTML = objSelection.anchorNode.parentNode.innerHTML;
        }
        if (objSelection.focusNode.parentNode.getAttribute("actualtype") && objSelection.focusNode.parentNode.getAttribute("actualtype").toUpperCase() === "TEXTMARK") {
            objSelection.focusNode.parentNode.outerHTML = objSelection.focusNode.parentNode.innerHTML;
        }
        let SelectedContentAsElement = GetSelectedContentAsElement();
        SelectedContentAsElement.childNodes.forEach((node, index) => {
            if (node.getAttribute && node.getAttribute("actualtype") && node.getAttribute("actualtype").toUpperCase() === "TEXTMARK") {
                let divElement = document.getElementById(node.id);
                divElement.outerHTML = divElement.innerHTML;
            }
        });
        let objElementJsonFromText_Editor = await state.ElementJson.TextRef.current.GetElementJson();
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: GetValuesFromHtml(objElementJsonFromText_Editor["vElementJson"]["vText"]),
                ["vText"]: objElementJsonFromText_Editor["vElementJson"]["vText"],
                ["SubElements"]: objElementJsonFromText_Editor["vElementJson"]["SubElements"]
            }
        };
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": objElementJson
            }
        });
    };

    /**
     * @name SetEveryWordAsWrong
     * @param {string} strClassName classname for span
     * @summary Wraps every word in the text editor within a span of color red.
     */
    const SetEveryWordAsWrong = async (strClassName) => {
        const objRef = EditorState.GetReference("ActiveTextMark");
        let objTextMarkElement = objContext.TextMarkRef.current;
        let ParentDivElement = objTextMarkElement.querySelector('[texteditorid="' + state.ElementJson["iElementId"] + '"]');
        let strData = "";
        ParentDivElement.childNodes.forEach((node) => {
            if (node.tagName) {
                if (node.getAttribute && node.getAttribute("actualtype") && node.getAttribute("actualtype").toUpperCase() === "TEXTMARK") {
                    strData += node.innerHTML;
                }
                else {
                    strData += node.outerHTML;
                }
            }
            else {
                strData += node.textContent;
            }
        });
        let objNewElement = document.createElement('div');
        objNewElement.innerHTML = strData;
        let strNewInnerHTML = "";
        objNewElement.childNodes.forEach(node => {
            if (typeof node.tagName === "undefined") {
                let arrSplittedData = node.textContent.split(' ');
                arrSplittedData.map(strText => {
                    let intId = UniqueId.GetUniqueId();
                    let newNode = document.createElement('span');
                    newNode.setAttribute("id", intId);
                    newNode.setAttribute("actualtype", "TextMark");
                    newNode.setAttribute("type", "TextMarkWrong");
                    newNode.setAttribute("class", strClassName);
                    newNode.innerHTML = strText;
                    strNewInnerHTML += newNode.outerHTML + " ";
                });
            }
            else {
                let intId = UniqueId.GetUniqueId();
                let newNode = document.createElement('div');
                newNode.setAttribute("id", intId);
                newNode.setAttribute("actualtype", "TextMark");
                newNode.setAttribute("type", "TextMarkWrong");
                newNode.setAttribute("class", strClassName);
                newNode.innerHTML = node.outerHTML;
                strNewInnerHTML += newNode.outerHTML + " ";
            }
        });
        strNewInnerHTML = strNewInnerHTML.trim();
        ParentDivElement.innerHTML = strNewInnerHTML;
        let objElementJsonFromText_Editor = await state.ElementJson.TextRef.current.GetElementJson();
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: GetValuesFromHtml(objElementJsonFromText_Editor["vElementJson"]["vText"]),
                ["vText"]: objElementJsonFromText_Editor["vElementJson"]["vText"],
                ["SubElements"]: objElementJsonFromText_Editor["vElementJson"]["SubElements"]
            }
        };
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": objElementJson
            }
        });
    };

    /**
     * @name GetContent
     * @summary Calls the RenderTextMarkBody() from the Common with passed events.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSTextMark_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                }
            },
            "Callbacks": {},
            "TextElement": UndoRedo(Text_Editor),
            "AppType": "Editor"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     * @returns {any} JSX
     */
    return GetContent();
};

export default CMSTextMark_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSTextMark_Editor_ModuleProcessor; 