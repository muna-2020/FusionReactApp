//React Imports
import React, { useEffect, useReducer, useImperativeHandle, useRef, createRef } from 'react';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module Related Imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_Common/CMSTextHighlight_Common';
import * as CMSTextHighlight_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_Editor/CMSTextHighlight_Editor_Hooks';
import CMSTextHighlight_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_Editor/CMSTextHighlight_Editor_ModuleProcessor';
import CMSTextHighlight_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_Common/CMSTextHighlight_Common_ModuleProcessor';

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

const CMSTextHighlight_Editor = (props) => {

    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSTextHighlight_Editor_Hooks.GetInitialState(props));

    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSTextHighlight_Editor_" + props.ElementJson.iElementId,
        "Element_UndoRedoDataRef": useRef((props.PreservedState && props.PreservedState.Text_EditorState) ? { [props.ElementJson.iElementId]: props.PreservedState.Text_EditorState } : {}),
        "textHighlightRef": useRef(null),
        "ElementCurrentRef": useRef(null),
        "CMSTextHighlight_Common_ModuleProcessor": new CMSTextHighlight_Common_ModuleProcessor,
        "CMSTextHighlight_Editor_ModuleProcessor": new CMSTextHighlight_Editor_ModuleProcessor()
    };

    /**
    * @name CMSTextHighlight_Editor_Hooks.Initialize
    * @summary Initialize method call in CMSTextHighlight_Editor_Hooks, that contains all the custom hooks.
    */
    CMSTextHighlight_Editor_Hooks.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.CMSTextHighlight_Common_ModuleProcessor.Initialize(objContext, objContext.CMSTextHighlight_Common_ModuleProcessor);

    /**
     * @name useEffect
     * @summary adds texthighlight tab to office ribbon
     * */
    useEffect(() => {
        var ref = EditorState.GetReference("AddElementTabRef");
        if (ref && ref.current && ref.current.AddElementTab) {
            ref.current.AddElementTab("TextHighlight", "ADD");
            EditorState.SetProperty(`CurrentTextHighlightId`, objContext.state.ElementJson.iElementId);
        }
        return () => {
            if (ref && ref.current && ref.current.AddElementTab) {
                ref.current.AddElementTab("TextHighlight", "REMOVE");
                if (EditorState.GetProperty(`CurrentTextHighlightId`)) {
                    EditorState.RemoveProperty(`CurrentTextHighlightId`);
                }
            }
        }
    }, [])

    /**
    *@name useEffect
    *@summary adds tab reference
    */
    useEffect(() => {
        if (objContext.ElementCurrentRef && objContext.ElementCurrentRef.current) {
            objContext.ElementCurrentRef.current.addEventListener("click", function () {
                Events.AddElementTabReference()
            });
        }
        return () => {
            if (objContext.ElementCurrentRef && objContext.ElementCurrentRef.current) {
                objContext.ElementCurrentRef.current.removeEventListener("click", function () {
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
            EditorState.SetReference(`TextHighlightRef-${objContext.state.ElementJson.iElementId}`, objContext.textHighlightRef);
            let arrElementValues = [...objContext.state.ElementJson.vElementJson.Values];
            let strInnerHtml = objContext.state.ElementJson.vElementJson.vText;
            let objElement = document.createElement('div');
            objElement.innerHTML = strInnerHtml;
            let arrNodes = objElement.querySelectorAll('[actualtype="TextHighlight"]');
            arrNodes.forEach(objTempNode => {
                let strSelectedColor = arrElementValues.filter(e => e.iElementTextHighlightValueId.toString() === objTempNode.getAttribute("id").toString())[0]["iElementTextHighlightValueColor"];
                objTempNode.style.backgroundColor = strSelectedColor;
                objTempNode.setAttribute("color", strSelectedColor);
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
            EditorState.RemoveReference(`TextHighlightRef-${objContext.state.ElementJson.iElementId}`);
        }
    }, []);

    /**
     * @summary Gets the Element Json.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        ["GetElementJson"]: async () => {
            let objElementJsonFromText_Editor = await objContext.state.ElementJson.TextRef.current.GetElementJson();
            let arrAnswerTextHighlight = [];
            let strInnerHtml = objContext.state.ElementJson.TextRef.current.GetInnerHtml();
            let objElement = document.createElement('div');
            objElement.innerHTML = strInnerHtml;
            let arrNodes = objElement.querySelectorAll('[actualtype="TextHighlight"]');
            arrNodes.forEach(objTempNode => {
                objTempNode.removeAttribute("style");
                let strSelectedColor = objTempNode.getAttribute("color");
                arrAnswerTextHighlight = [
                    ...arrAnswerTextHighlight,
                    {
                        "iElementTextHighlightValueId": parseInt(objTempNode.id),
                        "iElementTextHighlightValueColor": strSelectedColor
                    }
                ];
                objTempNode.removeAttribute("color");
            });
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Colors"]: objContext.state.Colors,
                    ["vText"]: objElement.innerHTML, //objContext.state.ElementJson.TextRef.current.GetInnerHtml(),
                    ["Values"]: [...arrAnswerTextHighlight],
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
            return objContext.CMSTextHighlight_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "GetElementJsonForCopy": async () => {
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
        "UpdateTaskEditStatus": () => {
            objContext.CMSTextHighlight_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props])

    /**
     * @name RemoveSelectionIfExits
     * @param {any} parentElement
     */
    const RemoveSelectionIfExits = (parentElement) => {
        if (parentElement) {
            if (parentElement.getAttribute("actualtype")) {
                parentElement.remove();
            }
        }
    }

    /**
    * @name GetContent
    * @summary Calls the RenderTextHighlightBody() from the Common with passed events.
    * @returns {any} JSX
    */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSTextHighlight_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                },
                "AddElementTabReference": () => {
                    EditorState.SetProperty(`CurrentTextHighlightId`, objContext.state.ElementJson.iElementId);
                }
            },
            "Callbacks": {
                "ChangeTextSelectionColor": (color) => {
                    var spanId = UniqueId.GetUniqueId();
                    var objSelection = Selection.GetSelection(objContext.state.ElementJson.TextRef);
                    if (objSelection && objSelection.SourceElement && (objSelection.SourceElement.getAttribute("type") === "TextHighlight" || objSelection.SourceElement.getAttribute("actualtype") === "TextHighlight")) {
                        var strSelectedText = objSelection.Range.toString();
                        if (strSelectedText) {
                            let objRange = objSelection.Range;
                            RemoveSelectionIfExits(objSelection.SourceElement);
                            objRange.deleteContents();
                            if (color !== "#fff") {
                                let spanNode = document.createElement('span');
                                spanNode.contentEditable = false;
                                spanNode.setAttribute('actualtype', `TextHighlight`);
                                spanNode.setAttribute('color', color);
                                spanNode.id = spanId;
                                spanNode.style.backgroundColor = color;
                                var textnode = document.createTextNode(strSelectedText);
                                spanNode.appendChild(textnode);
                                objRange.insertNode(spanNode);
                            }
                            else {
                                objRange.insertNode(document.createTextNode(strSelectedText));
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedColor": null } })
                            }
                            objSelection.RemoveAllRanges();
                            objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedColor": color } })
                        }
                        objContext.CMSTextHighlight_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    }
                }
            },
            "TextElement": TextElement,
            "AppType": "Editor"
        };
        return <Common {...objCommonProps} />;
    }
    /**
    * @summary Checks if the state is fully loaded and then call the GetContent().
    * @returns {any} JSX
    * */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default CMSTextHighlight_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSTextHighlight_Editor_ModuleProcessor; 