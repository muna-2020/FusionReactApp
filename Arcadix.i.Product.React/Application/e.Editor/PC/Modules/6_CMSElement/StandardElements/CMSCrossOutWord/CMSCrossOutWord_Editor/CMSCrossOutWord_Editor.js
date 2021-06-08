//React Imports
import React, { useEffect, useReducer, useImperativeHandle, useRef, createRef } from 'react';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module Related Imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_Common/CMSCrossOutWord_Common';
import * as CMSCrossOutWord_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_Editor/CMSCrossOutWord_Editor_Hooks';
import CMSCrossOutWord_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_Editor/CMSCrossOutWord_Editor_ModuleProcessor';
import CMSCrossOutWord_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_Common/CMSCrossOutWord_Common_ModuleProcessor';

//Components used.
import Text_Editor from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Text_Editor";

//UndoRedo imports
import { UndoRedo } from "@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Application State classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

// wrapping text editor with memo to prevent re-render when local state changes.
const TextElement = React.memo(Text_Editor);

const CMSCrossOutWord_Editor = (props) => {

    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSCrossOutWord_Editor_Hooks.GetInitialState(props));

    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSCrossOutWord_Editor_" + props.ElementJson.iElementId,
        "Element_UndoRedoDataRef": useRef((props.PreservedState && props.PreservedState.Text_EditorState) ? { [props.ElementJson.iElementId]: props.PreservedState.Text_EditorState } : {}),
        "CrossOutWordRef": useRef(null),
        "ElementSelectedRef": useRef(null),
        "CMSCrossOutWord_Common_ModuleProcessor": new CMSCrossOutWord_Common_ModuleProcessor,
        "CMSCrossOutWord_Editor_ModuleProcessor": new CMSCrossOutWord_Editor_ModuleProcessor()
    };

    /**
    * @name CMSCrossOutWord_Editor_Hooks.Initialize
    * @summary Initialize method call in CMSCrossOutWord_Editor_Hooks, that contains all the custom hooks.
    */
    CMSCrossOutWord_Editor_Hooks.Initialize(objContext);

    /**
   * @name  InitializeDataForSSR
   * @param {object} objContext context object
   * @summary Initializing API and DynamicStyles
   * @returns Setting ApplicationState
   */
    objContext.CMSCrossOutWord_Common_ModuleProcessor.Initialize(objContext, objContext.CMSCrossOutWord_Common_ModuleProcessor);

    /**
     * @name useEffect
     * @summary adds texthighlight tab to office ribbon
     * */
    useEffect(() => {
        var ref = EditorState.GetReference("AddElementTabRef");
        if (ref && ref.current && ref.current.AddElementTab) {
            ref.current.AddElementTab("CrossOutWord", "ADD");
            EditorState.SetProperty(`CurrentCrossOutWordId`, objContext.state.ElementJson.iElementId);
        }
        return () => {
            if (ref && ref.current && ref.current.AddElementTab) {
                ref.current.AddElementTab("CrossOutWord", "REMOVE");
                if (EditorState.GetProperty(`CurrentCrossOutWordId`)) {
                    EditorState.RemoveProperty(`CurrentCrossOutWordId`);
                }
            }
        }
    }, [])

    /**
     *@name useEffect
     *@summary adds tab reference
     */
    useEffect(() => {
        if (objContext.ElementSelectedRef && objContext.ElementSelectedRef.current) {
            objContext.ElementSelectedRef.current.addEventListener("click", function () {
                Events.AddElementTabReference()
            });
        }
        return () => {
            if (objContext.ElementSelectedRef && objContext.ElementSelectedRef.current) {
                objContext.ElementSelectedRef.current.removeEventListener("click", function () {
                    Events.AddElementTabReference()
                });
            }
        }
    }, [])

    /**
     * @name useEffect
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            EditorState.SetReference(`CrossOutWordRef-${objContext.state.ElementJson.iElementId}`, objContext.CrossOutWordRef);
            let arrElementValues = [...objContext.state.ElementJson.vElementJson.Values];
            let strInnerHtml = objContext.state.ElementJson.vElementJson.vText;
            let objElement = document.createElement('div');
            objElement.innerHTML = strInnerHtml;
            let arrNodes = objElement.querySelectorAll('[actualtype="CrossOutWord"]');
            arrNodes.forEach(objTempNode => {
                objTempNode.setAttribute("type", "CrossOutWordWrong");
            });
            arrElementValues.forEach((e) => {
                var element = objElement.querySelector(`[id='${e["iElementCrossOutWordValueId"]}']`);
                element.classList.add("cross-out-word-text-decoration");
                element.setAttribute("type", "CrossOutWordCorrect");
            });
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "isLoadComplete": true,
                    "ElementJson": {
                        ...objContext.props.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.props.ElementJson["vElementJson"],
                            ["vText"]: objElement.innerHTML
                        },
                        ["TextRef"]: createRef()
                    }
                }
            });
        }
        return () => {
            EditorState.RemoveReference(`CrossOutWordRef-${objContext.state.ElementJson.iElementId}`);
        }
    }, []);

    /**
     * @summary Gets the Element Json.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        ["GetElementJson"]: async (blnRemoveRef = true, strDataFor = null) => {
            let objElementJsonFromText_Editor = await objContext.state.ElementJson.TextRef.current.GetElementJson(blnRemoveRef = true, strDataFor = null);
            let arrAnswerCrossOutWord = [];
            let strInnerHtml = objContext.state.ElementJson.TextRef.current.GetInnerHtml();
            let objElement = document.createElement('div');
            objElement.innerHTML = strInnerHtml;
            let arrNodes = objElement.querySelectorAll('[actualtype="CrossOutWord"]');
            arrNodes.forEach((objTempNode, intIndex) => {
                var strCrossWordType = objTempNode.getAttribute("type");
                var blnCrossOutWordType = true;
                if (objTempNode.innerHTML === "") {
                    objTempNode.remove();
                    blnCrossOutWordType = false;
                }
                if (strCrossWordType && blnCrossOutWordType) {
                    if (strCrossWordType.toUpperCase() === "CROSSOUTWORDCORRECT") {
                        objTempNode.classList.remove("cross-out-word-text-decoration");
                        arrAnswerCrossOutWord = [
                            ...arrAnswerCrossOutWord,
                            {
                                "iElementCrossOutWordValueId": parseInt(objTempNode.id),
                                "cIsCorrectValue": "Y", //objTempNode.getAttribute("type").toUpperCase() === "CROSSOUTWORDCORRECT" ? "Y" : "N",
                                "iDisplayOrder": intIndex + 1,
                                "dCorrectPoint": 0,
                                "dWrongPoint": 0,
                                "IsSaved": "N"
                            }
                        ];
                    }
                    objTempNode.removeAttribute("type");
                }
            });
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Colors"]: objContext.state.Colors,
                    ["vText"]: objElement.innerHTML, //objContext.state.ElementJson.TextRef.current.GetInnerHtml(),
                    ["iAnswerCount"]: arrAnswerCrossOutWord.length,
                    ["Values"]: [...arrAnswerCrossOutWord],
                    ["SubElements"]: [...objElementJsonFromText_Editor["vElementJson"]["SubElements"]]
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        ["GetLatestContext"]: () => {
            return objContext;
        },
        ["GetContextMenuOptions"]: () => {
            return objContext.CMSCrossOutWord_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        ["GetElementJsonForCopy"]: async () => {
            let arrHeaderValues = [];
            let arrValues = [];
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

            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["Values"].length; intCount++) {
                let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["Values"][intCount]["iElementTextId"]);
                let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                arrTextElements = [
                    ...arrTextElements,
                    objNewTextElementJson
                ];
                arrValues = [
                    ...arrValues,
                    {
                        ...objContext.state.ElementJson["vElementJson"]["Values"][intCount],
                        ["iElementTextId"]: objNewTextElementJson["iElementId"]
                    }
                ];
            }

            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["TextElements"]: arrTextElements,
                    ["Values"]: arrValues,
                }
            }
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        ["UpdateTaskEditStatus"]: () => {
            objContext.CMSCrossOutWord_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props])

    /**
    *@summary Gets selected cross out type from ribbon 
    */
    useImperativeHandle(objContext.CrossOutWordRef, () => ({
        GetCrossOutWordType: (strCrossOutWordType) => {
            if (strCrossOutWordType) {
                MarkTextSelection(strCrossOutWordType);
            }
        }
    }), [objContext.state]);

    /**
     * @name 
     * @param {any} strCrossOutWordType
     */
    const MarkTextSelection = (strCrossOutWordType) => {
        switch (strCrossOutWordType.toUpperCase()) {
            case "MARKALLTEXTINCORRECT":
                if (objContext.state.TextSelectionType !== strCrossOutWordType.toUpperCase()) {
                    let TextElement = objContext.ElementSelectedRef.current.querySelector('[texteditorid="' + state.ElementJson["iElementId"] + '"]');
                    SetEveryWordAsWrong(TextElement);
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "TextSelectionType": strCrossOutWordType.toUpperCase() } });
                }
                break;
            case "MARKSELECTIONTEXTINCORRECT":
                CrossOutTextSelection(strCrossOutWordType);
                break;
            case "CROSSOUTSELECTION":
                CrossOutTextSelection(strCrossOutWordType);
                break;
            case "REMOVE":
                CrossOutTextSelection(strCrossOutWordType);
                break;
        }
    };

    /**
     * @name textNodesUnder
     * @param {any} node
     * @returns {array} returns text node array
     */
    function textNodesUnder(node) {
        var all = [];
        for (node = node.firstChild; node; node = node.nextSibling) {
            if (node.nodeType == 3) all.push(node);
            else all = all.concat(textNodesUnder(node));
        }
        return all;
    }

    /**
     * @name SetEveryWordAsWrong
     * @summary Wraps every word in the text editor within a span.
     */
    const SetEveryWordAsWrong = (Element, blnMarkSelectedTextIncorrect = false) => {
        if (Element.nodeType !== 3) {
            RemoveHighlightAllSelection(Element, blnMarkSelectedTextIncorrect);
            let arrTextNodes = textNodesUnder(Element);
            for (var i = 0; i < arrTextNodes.length; i++) {
                var textNode = arrTextNodes[i];
                var arrNodes = textNode.textContent.split(" ");
                var html = "";
                arrNodes.forEach(node => {
                    if (node) {
                        let intId = UniqueId.GetUniqueId();
                        let newNode = document.createElement('span');
                        newNode.setAttribute("id", intId);
                        newNode.setAttribute("actualtype", "CrossOutWord");
                        newNode.setAttribute("type", "CrossOutWordWrong");
                        newNode.innerHTML = node;
                        newNode.classList.add("highlight-selection");
                        if (blnMarkSelectedTextIncorrect) {
                            newNode.setAttribute("selectiontype", "MarkSelection");
                            newNode.removeAttribute("type");
                        }
                        html = html + newNode.outerHTML + " ";
                    }
                });
                if (html) {
                    var span = document.createElement("span");
                    span.innerHTML = html;
                    textNode.parentElement.insertBefore(span, textNode);
                    textNode.parentElement.removeChild(textNode);
                }
            }
        }
    }

    /**
     * @name RemoveHighlightAllSelection
     * @param {any} Element
     */
    const RemoveHighlightAllSelection = (Element, blnMarkSelectedTextIncorrect = false) => {
        if (Element.nodeType !== 3) {
            var arrHighlightNodes = Element.querySelectorAll('span[type="CrossOutWordWrong"], span[type="CrossOutWordCorrect"]');
            arrHighlightNodes.forEach(node => {
                if (node) {
                    node.replaceWith(document.createTextNode(node.textContent));
                }
            });
            if (blnMarkSelectedTextIncorrect) {
                var arrMarkSelectionNodes = Element.querySelectorAll('span[selectiontype="MarkSelection"]');
                arrMarkSelectionNodes.forEach(node => {
                    if (node) {
                        node.setAttribute("type", "CrossOutWordWrong");
                        node.removeAttribute("selectiontype");
                    }
                });
            }
        }
    }

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
     * @name CrossOutTextSelection
     * @param {string} strCrossOutWordType 
     * @summary Set's the selected portion as correct by adding line through on the selected text
     */
    const CrossOutTextSelection = (strCrossOutWordType) => {
        var arrSplittedData;
        var objSelection = Selection.GetSelection(objContext.state.ElementJson.TextRef);
        if (objSelection && objSelection.SourceElement && (objSelection.SourceElement.getAttribute("type") === "CrossOutWord" || objSelection.SourceElement.getAttribute("actualtype") === "CrossOutWord" || objSelection.SourceElement.closest("div[type='CrossOutWord']"))) {
            var strSelectedText = objSelection.Range.toString();
            if (strSelectedText) {
                let objRange = objSelection.Range;
                var blnExits = false;
                var source = objSelection.SourceElement;
                var selectedObject = objSelection.MouseDownObject;
                if ((selectedObject && selectedObject.getAttribute("actualtype") === "CrossOutWord") || (source && source.getAttribute("actualtype") === "CrossOutWord")) {
                    blnExits = true;
                }
                switch (strCrossOutWordType.toUpperCase()) {
                    case "CROSSOUTSELECTION":
                        if (blnExits) {
                            objRange.deleteContents();
                            arrSplittedData = strSelectedText.split(' ');
                            var fragment = document.createDocumentFragment();
                            arrSplittedData.forEach((strText, i) => {
                                if (strText) {
                                    var spanNode = document.createElement('span');
                                    spanNode.id = UniqueId.GetUniqueId();
                                    spanNode.setAttribute('actualtype', `CrossOutWord`);
                                    spanNode.setAttribute("type", "CrossOutWordCorrect");
                                    spanNode.classList.add('cross-out-word-text-decoration');
                                    spanNode.classList.add('highlight-selection');
                                    if (i > 0 && arrSplittedData[i - 1] === "") {
                                        fragment.appendChild(document.createTextNode(" "));
                                    }
                                    var textnode = document.createTextNode(strText);
                                    spanNode.appendChild(textnode);
                                    fragment.appendChild(spanNode);
                                    fragment.appendChild(document.createTextNode(" "));
                                }
                            });
                            objRange.insertNode(fragment);
                            objContext.CMSCrossOutWord_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                        }
                        break;
                    case "MARKSELECTIONTEXTINCORRECT":
                        var fragment = document.createDocumentFragment();
                        let children = clonedContents.childNodes;
                        for (var i = 0; i < children.length; i++) {
                            if (children[i] && children[i].nodeType !== 3) {
                                var arrTextNodes = textNodesUnder(children[i]);
                                if (arrTextNodes.length > 0) {
                                    arrTextNodes.forEach(text => {
                                        if (text) {
                                            let TextNodes = text.textContent.split(" ");
                                            TextNodes.forEach(t => {
                                                let intId = UniqueId.GetUniqueId();
                                                let newNode = document.createElement('span');
                                                newNode.setAttribute("id", intId);
                                                newNode.setAttribute("actualtype", "CrossOutWord");
                                                newNode.setAttribute("selectiontype", "MarkSelection");
                                                newNode.classList.add("highlight-selection");
                                                newNode.innerHTML = t;
                                                fragment.appendChild(newNode);
                                                fragment.appendChild(document.createTextNode(" "));
                                            });
                                        }
                                    })
                                }
                                else {
                                    fragment.appendChild(children[i].cloneNode(true));
                                }
                            }
                            else {
                                if (!(children[i].textContent.length === 1 && /\s{1}/.test(children[i].textContent))) {
                                    arrSplittedData = children[i].textContent.split(' ');
                                    arrSplittedData.forEach(strText => {
                                        if (strText) {
                                            let intId = UniqueId.GetUniqueId();
                                            let newNode = document.createElement('span');
                                            newNode.setAttribute("id", intId);
                                            newNode.setAttribute("actualtype", "CrossOutWord");
                                            newNode.setAttribute("selectiontype", "MarkSelection");
                                            newNode.classList.add("highlight-selection");
                                            newNode.innerHTML = strText;
                                            fragment.appendChild(newNode);
                                            fragment.appendChild(document.createTextNode(" "));
                                        }
                                    });
                                }
                            }
                        }
                        objRange.deleteContents();
                        objRange.insertNode(fragment);
                        objContext.dispatch({ "type": "SET_STATE", "payload": { "TextSelectionType": strCrossOutWordType.toUpperCase() } });
                        objContext.CMSCrossOutWord_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                        RemoveHighlightAllSelection(objSelection.SourceElement.closest("div[type='CrossOutWord']"), true)
                        break;
                    case "REMOVE":
                        objRange.deleteContents();
                        arrSplittedData = strSelectedText.split(' ');
                        var fragment = document.createDocumentFragment();
                        arrSplittedData.forEach((strText, i) => {
                            if (strText) {
                                var spanNode = document.createElement('span');
                                spanNode.id = UniqueId.GetUniqueId();
                                spanNode.setAttribute('actualtype', `CrossOutWord`);
                                spanNode.setAttribute("type", "CrossOutWordWrong");
                                spanNode.classList.add('highlight-selection');
                                var textnode = document.createTextNode(strText);
                                spanNode.appendChild(textnode);
                                fragment.appendChild(spanNode);
                                fragment.appendChild(document.createTextNode(" "));
                            }
                        });
                        objRange.insertNode(fragment);
                        objContext.CMSCrossOutWord_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                        break;
                    default:
                        break;
                }
                objSelection.RemoveAllRanges();
            }
        }
    }

    /**
    * @name GetContent
    * @summary Calls the RenderCrossOutWordBody() from the Common with passed events.
    * @returns {any} JSX
    */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSCrossOutWord_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                },
                "AddElementTabReference": () => {
                    EditorState.SetProperty(`CurrentCrossOutWordId`, objContext.state.ElementJson.iElementId);
                }
            },
            "Callbacks": {},
            "TextElement": TextElement,
            "AppType": "Editor"
        };
        return <Common {...objCommonProps} />;
    }
    /**
    * @summary Checks if the state is fully loaded and then call the GetContent().
    * @returns {any} JSX
    * */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />
}

export default CMSCrossOutWord_Editor;