//React Imports
import React, { useEffect, useReducer, useImperativeHandle, useRef, createRef } from 'react';

import { connect } from 'react-redux';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module Related Imports
import * as CMSPunctuations_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Editor/CMSPunctuations_Editor_Hooks';
import * as CMSPunctuations_Common_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Common/CMSPunctuations_Common_Hooks';
import CMSPunctuations_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Editor/CMSPunctuations_Editor_ModuleProcessor';
import CMSPunctuations_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Common/CMSPunctuations_Common_ModuleProcessor';
import * as CMSPunctuations_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Editor/CMSPunctuations_Editor_MetaData';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSPunctuations_Editor
 * @param {object} props parent props
 * @param {Ref} ref forwaded ref
 * @summary CMSPunctuations's editor application version.
 * @returns {Component} CMSPunctuations_Editor
 */
const CMSPunctuations_Editor = (props) => {

    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSPunctuations_Editor_Hooks.GetInitialState(props));

    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSPunctuations_Editor_" + props.ElementJson.iElementId,
        "Element_UndoRedoDataRef": useRef((props.PreservedState && props.PreservedState.Text_EditorState) ? { [props.ElementJson.iElementId]: props.PreservedState.Text_EditorState } : {}),
        "PunctuationRef": useRef(null),
        "PunctuationSymbolRef": useRef(null),
        "TextAreaRef": useRef(null),
        "ContentEditableRef": useRef(null),
        "ContentEditableInnerText": useRef(""),
        "CMSPunctuations_Common_ModuleProcessor": new CMSPunctuations_Common_ModuleProcessor,
        "CMSPunctuations_Editor_ModuleProcessor": new CMSPunctuations_Editor_ModuleProcessor(),
        "PunctuationMarks": CMSPunctuations_Editor_MetaData.GetPunctuationsMarks(),
    };

    /**
   * @name CMSPunctuations_Editor_Hooks.Initialize
   * @summary Initialize method call in CMSPunctuations_Editor_Hooks, that contains all the custom hooks.
   */
    CMSPunctuations_Common_Hooks.Initialize(objContext);

    /**
    * @name CMSPunctuations_Editor_Hooks.Initialize
    * @summary Initialize method call in CMSPunctuations_Editor_Hooks, that contains all the custom hooks.
    */
    CMSPunctuations_Editor_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSPunctuations_Common_ModuleProcessor.Initialize(objContext, objContext.CMSPunctuations_Common_ModuleProcessor);

    /**
     * @name useEffect
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "ElementJson": {
                        ...objContext.props.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.props.ElementJson["vElementJson"],
                            ["vSentence"]: objContext.CMSPunctuations_Common_ModuleProcessor.RemoveEscapeCharacter(objContext.props.ElementJson.vElementJson.vSentence)
                        }
                    }
                }
            });
        }

        //displays punctuation buttons after initial render/ SSR
        objContext.dispatch({ "type": "SET_STATE", "payload": { "blnInitialRender": false } });

    }, []);

    /**
     @name Sets cursor position to end.
     */
    useEffect(() => {
        //1
        //SetCaretPositionToEnd(objContext.ContentEditableRef.current);
    }, [objContext.state.ElementJson.vElementJson.vSentence])

    /**
     * @name SetCaretPositionToEnd
     * @param {any} el element 
     */
    const SetCaretPositionToEnd = (el) => {
        if (el) {
            el.focus();
            if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }
    }

    /**
     * @name GetRawHtml
     * @returns {string} returns raw html 
     * */
    const GetRawHtml = () => {
        const div = document.createElement("div");
        div.innerHTML = objContext.state.ElementJson.vElementJson.vSentence.replace(/&nbsp;/g, " ")//.trim();
        var arrSpanNodes = div.querySelectorAll('[actualtype="punctuation-symbol"]');
        arrSpanNodes.forEach((ele) => {
            var htmlcode = ele.getAttribute("code");
            htmlcode = htmlcode.replace("&amp;", "&");
            ele.innerHTML = htmlcode.replace("&", "&amp;");
            console.log(ele);
        });
        return div.innerHTML;
    }

    /**
     * @summary Gets the Element Json.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        ["GetElementJson"]: async () => {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrNewTextElements = [];
            for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
                let objTextElementJson = { ...arrTextElements[intCount] };
                if (arrTextElements[intCount].Ref.current && arrTextElements[intCount].Ref.current.GetElementJson) {
                    objTextElementJson = await arrTextElements[intCount].Ref.current.GetElementJson();
                }
                arrNewTextElements = [
                    ...arrNewTextElements,
                    objTextElementJson
                ];
            }
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["vSentence"]: GetRawHtml(),
                    ["TextElements"]: arrNewTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        ["GetLatestContext"]: () => {
            return objContext;
        },
        ["GetContextMenuOptions"]: () => {
            return objContext.CMSPunctuations_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "GetElementJsonForCopy": async () => {
            let arrHeaderValues = [];
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
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["vSentence"]: GetRawHtml(),
                    ["HeaderValues"]: arrHeaderValues,
                    ["TextElements"]: arrTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        ["UpdateTaskEditStatus"]: () => {
            objContext.CMSPunctuation_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props])

    /**
     * @name GetPunctuationButtons
     * @returns {array} returns text buttons
     * */
    const GetPunctuationButtons = () => {
        var arrTextNodes = [];
        const div = document.createElement("div");
        div.innerHTML = objContext.state.ElementJson.vElementJson.vSentence.replace(/[/?/,/./'/!/:/«/»/-]/g, " ");
        var childNodes = div.childNodes;
        for (var intCount = 0; intCount < childNodes.length; intCount++) {
            if (childNodes[intCount].nodeType === 3) {
                var arrChildTextNodes = childNodes[intCount].textContent.split(" ");
                arrChildTextNodes.forEach((text) => {
                    text = text.replace(/\s/g, "");
                    text = text.replace(/[/?/,/./'/!/:/«/»/-]/g, "");
                    if (text) {
                        arrTextNodes = [...arrTextNodes,
                        <div key={`punctuations-button-${objContext.state.ElementJson.iElementId}-${intCount}`} className="punctuations-button-wrapper">
                            <div className="punctuations-button">
                                {text}
                            </div>
                        </div>
                        ];
                    }
                })
            }
        }
        return arrTextNodes;
    }

    /**
     * @name HandleAlternativeSolutionOnChange
     * @param {object} event
     */
    const HandleAlternativeSolutionOnChange = (event) => {
        var iSolutionId = parseInt(event.target.id);
        var arrSolutionValues = [...objContext.state.ElementJson.vElementJson.Values];
        var index = arrSolutionValues.findIndex((v) => { return v.iElementPunctuationAlternateSolutionId === iSolutionId });
        if (index > -1) {
            arrSolutionValues[index]["vElementPunctuationsAlternateSolution"] = event.target.value;
        }
        if (iSolutionId) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson.vElementJson,
                            "Values": [...arrSolutionValues]
                        }
                    }
                }
            });
        }
        objContext.CMSPunctuations_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name HandleSolutionOnChange
     * @param {object} event
     */
    const HandleSolutionOnChange = (event) => {
        if (event.target) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "blnTextChanged": false,
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson.vElementJson,
                            "vSentence": event.target.value // 2 event.target.innerHTML
                        }
                    }
                }
            });
        }
        objContext.CMSPunctuations_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
    * @name GetContent
    * @summary Calls the RenderPunctuationsBody() from the Common with passed events.
    * @returns {any} JSX
    */
    const GetContent = () => {
        let objTextElementProps = {};
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = objContext.CMSPunctuations_Editor_ModuleProcessor.GetTextElementProps(objContext, objElementHeader["iElementTextId"]);
        }
        var objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSPunctuations", objContext.props);
        return (
            <React.Fragment>
                <div id={`cms-punctuations_wrapper_${objContext.state.ElementJson["iElementId"]}`}
                    ielementid={objContext.state.ElementJson["iElementId"]}
                    ielementtypeid={objContext.state.ElementJson["iElementTypeId"]}
                    onContextMenu={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        objContext.CMSPunctuations_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                    }}>
                    {
                        objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                            <CMSText_Editor {...objTextElementProps} /> : ""
                    }
                    <div className="punctuation-outer-wrapper">
                        <div>
                            <textarea ref={objContext.TextAreaRef}
                                className="punctuations-textarea"
                                rows="4"
                                value={objContext.state.ElementJson.vElementJson.vSentence}
                                onChange={(event) => { HandleSolutionOnChange(event) }}>
                            </textarea>
                            {/* 3
                            <div className="punctuations-textarea"
                                ref={objContext.ContentEditableRef}
                                contentEditable={AppType.toLowerCase() === "editor" ? true : false}
                                onInput={(event) => { HandleSolutionOnChange(event)}}
                                dangerouslySetInnerHTML={{ __html: objContext.state.ElementJson.vElementJson.vSentence }}>
                            </div>
                        */}
                        </div>
                        <div className="punctuation-text-buttons-outer-wrapper">
                            {
                                !objContext.state.blnInitialRender && GetPunctuationButtons()
                            }
                        </div>
                        <div className="punctuation-buttons-outer-wrapper">
                            {
                                objContext.PunctuationMarks.map((p, i) => {
                                    return (
                                        <div ref={objContext.PunctuationSymbolRef} className="punctuations-button-wrapper">
                                            <div type="punctuations-symbols"
                                                name={p.type}
                                                className="punctuations-button"
                                                cpunctuationchar={p.symbol}
                                                onClick={() => {
                                                    objContext.CMSPunctuations_Common_ModuleProcessor.HandlePunctuationsClick(objContext, p.symbol + " ");
                                                    //SetCaretPositionToEnd(objContext.TextAreaRef.current);
                                                }}>
                                                {/* 4 <span dangerouslySetInnerHTML={{ __html: p.hexcode }}></span>*/}
                                                <span> {p.symbol} </span>
                                            </div>
                                            <span> {Localization.TextFormatter(objTextResource, [p.type])}</span>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="punctuations-alternative-solutions-wrapper">
                            {
                                objContext.state.ElementJson.vElementJson.Values.map(a => {
                                    return (
                                        <div key={`alternative-solution-text-${a.iElementPunctuationAlternateSolutionId}`} className="alternative-solution-div">
                                            <textarea id={a.iElementPunctuationAlternateSolutionId}
                                                className="punctuations-textarea"
                                                rows="4"
                                                value={a.vElementPunctuationsAlternateSolution}
                                                onChange={(event) => { HandleAlternativeSolutionOnChange(event) }}>
                                            </textarea>
                                            <img className="alternative-solution-cancel" src={JConfiguration.IntranetSkinPath + "/Images/editor/Delete.gif"}
                                                onClick={() => { objContext.CMSPunctuations_Editor_ModuleProcessor.RemoveAlternativeSolution(objContext, a.iElementPunctuationAlternateSolutionId) }} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="punctuations-action-button-wrapper">
                            <div className={"punctuations-button"} onClick={() => { objContext.CMSPunctuations_Editor_ModuleProcessor.AddAlternativeSolution(objContext) }}>
                                {Localization.TextFormatter(objTextResource, "AlternativeSolution")}
                            </div>
                            <div className="punctuation-action-buttons-wrapper">
                                <div className="punctuations-button punctuation-action-buttons">
                                    {Localization.TextFormatter(objTextResource, "Back")}
                                </div>
                                <div className="punctuations-button punctuation-action-buttons">
                                    {Localization.TextFormatter(objTextResource, "Clear")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
    /**
    * @summary Checks if the state is fully loaded and then call the GetContent().
    * @returns {any} JSX
    * */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default connect(EditorBase_Hook.MapStoreToProps(CMSPunctuations_Common_ModuleProcessor.StoreMapList()))(CMSPunctuations_Editor);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSPunctuations_Common_ModuleProcessor; 