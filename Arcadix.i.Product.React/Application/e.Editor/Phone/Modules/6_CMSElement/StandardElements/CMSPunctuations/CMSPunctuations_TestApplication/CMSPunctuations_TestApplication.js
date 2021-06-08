//React Imports
import React, { useEffect, useReducer, useImperativeHandle, useRef } from 'react';

import { connect } from 'react-redux';

//Base classes/hooks
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related Imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Common/CMSPunctuations_Common';
import * as CMSPunctuations_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_TestApplication/CMSPunctuations_TestApplication_Hooks';
import * as CMSPunctuations_Common_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Common/CMSPunctuations_Common_Hooks';
import CMSPunctuations_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_TestApplication/CMSPunctuations_TestApplication_ModuleProcessor';
import CMSPunctuations_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Common/CMSPunctuations_Common_ModuleProcessor';
import * as CMSPunctuations_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Editor/CMSPunctuations_Editor_MetaData';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSPunctuations_TestApplication
 * @param {object} props pratent props
 * @param {Ref} ref forwaded ref
 * @summary CMSPunctuations's test application version.
 * @returns {Component} CMSPunctuations_TestApplication
 */
const CMSPunctuations_TestApplication = (props) => {

    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSPunctuations_TestApplication_Hooks.GetInitialState(props));

    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSPunctuations_TestApplication_" + props.ElementJson.iElementId,
        "Element_UndoRedoDataRef": useRef((props.PreservedState && props.PreservedState.Text_TestApplicationState) ? { [props.ElementJson.iElementId]: props.PreservedState.Text_TestApplicationState } : {}),
        "PunctuationRef": useRef(null),
        "PunctuationSymbolRef": useRef(null),
        "TextAreaRef": useRef(null),
        "ContentEditableRef": useRef(null),
        "ContentEditableInnerText": useRef(""),
        "CMSPunctuations_Common_ModuleProcessor": new CMSPunctuations_Common_ModuleProcessor,
        "CMSPunctuations_TestApplication_ModuleProcessor": new CMSPunctuations_TestApplication_ModuleProcessor(),
        "PunctuationMarks": CMSPunctuations_Editor_MetaData.GetPunctuationsMarks(),
        "blnRandomDisplayed": useRef(false)
    };

    /**
   * @name CMSPunctuations_Editor_Hooks.Initialize
   * @summary Initialize method call in CMSPunctuations_Editor_Hooks, that contains all the custom hooks.
   */
    CMSPunctuations_Common_Hooks.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.CMSPunctuations_Common_ModuleProcessor.Initialize(objContext, objContext.CMSPunctuations_Common_ModuleProcessor);

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
        });
        return div.innerHTML;
    }

    /**
     *@name useEffect
     * @summary used for data loading and get text nodes for displaying in punctuation.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            let objLoadSolutionType = objContext.CMSPunctuations_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext);
            let objElementjson = objContext.CMSPunctuations_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, objContext.state.ElementJsonWithAnswer, objContext.state.UserAnswerJson);
            var arrTextNodes = GetTextNodes(objElementjson);
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    ...objLoadSolutionType,
                    "arrPunctuationTextNodes": arrTextNodes,
                    "ElementJson": { ...objElementjson }
                }
            });

            //displays punctuation buttons after initial render/ SSR
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnInitialRender": false } });
        }
    }, [objContext.props.ElementJson]);

    /**
    * @name useImperativeMethods
    * @summary Contain imperative methods.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetUserResponse": () => {
            let arrResponse = [];
            arrResponse = [
                {
                    ["iElementId"]: objContext.props.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.props.ElementJson["vElementTypeName"],
                    ["Answers"]: objContext.state.ElementJson.vElementJson.vSentence, //GetRawHtml(),
                    ["cIsAnswered"]: objContext.state.ElementJson.vElementJson.vSentence.length > 0 ? "Y" : "N"
                }
            ];
            return arrResponse;
        },
        "LoadSolution": (ElementJsonWithAnswer = null, UserAnswerJson = null, ElementEvaluationResult = null) => {
            objContext.CMSPunctuations_TestApplication_ModuleProcessor.LoadSolution(objContext, ElementJsonWithAnswer, UserAnswerJson, ElementEvaluationResult);
            let objLoadSolutionType = objContext.CMSPunctuations_TestApplication_ModuleProcessor.GetLoadSolutionType(objContext, ElementJsonWithAnswer, UserAnswerJson);
            let objElementJson = objContext.CMSPunctuations_TestApplication_ModuleProcessor.GetElementJsonForComponent(objContext, objLoadSolutionType, ElementJsonWithAnswer, UserAnswerJson);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    ...objLoadSolutionType,
                    "ElementJson": objElementJson,
                    "ElementJsonWithAnswer": ElementJsonWithAnswer,
                    "UserAnswerJson": UserAnswerJson,
                    "ElementStatus": ElementEvaluationResult && ElementEvaluationResult["iElementStatus"] ? ElementEvaluationResult["iElementStatus"] : null
                }
            });
        },
        "ResetAnswer": () => {
            objContext.CMSPunctuations_TestApplication_ModuleProcessor.ResetAnswer(objContext);
        }
    }), [objContext.state, objContext.props]);

    /**
     * @name GetTextNodes
     * @param {object} objElementJson
     * @returns {array} returns text nodes to be displayed 
     */
    const GetTextNodes = (objElementJson) => {
        var arrChildTextNodes = [];
        const div = document.createElement("div");
        div.innerHTML = objElementJson.vElementJson.vText.replace(/[/?/,/./'/!/:/«/»/-]/g, " "); // replace added only for preview.
        var childNodes = div.childNodes;
        for (var intCount = 0; intCount < childNodes.length; intCount++) {
            if (childNodes[intCount].nodeType === 3) {
                arrChildTextNodes = childNodes[intCount].textContent.split(" ");
                if (objElementJson.vElementJson.cIsRandomDisplay === "Y") {
                    arrChildTextNodes = BaseCMSElement.ShuffleArray(arrChildTextNodes);
                }
            }
        }
        if (objElementJson.vElementJson.cIsRandomDisplay === "Y") {
            arrChildTextNodes = BaseCMSElement.ShuffleArray(arrChildTextNodes);
        }
        return arrChildTextNodes;
    }

    /**
    * @name GetPunctuationButtons
    * */
    const GetPunctuationButtons = () => {
        var arrTextNodes = [];
        if (objContext.state.arrPunctuationTextNodes.length > 0) {
            objContext.state.arrPunctuationTextNodes.forEach((text, intCount) => {
                text = text.replace(/\s/g, "");
                text = text.replace(/[/?/,/./'/!/:/«/»/-]/g, "");
                if (text) {
                    arrTextNodes = [...arrTextNodes,
                    <div key={`punctuations-button-${objContext.state.ElementJson.iElementId}-${intCount}`} className="punctuations-button-wrapper" onClick={() => { objContext.CMSPunctuations_Common_ModuleProcessor.HandlePunctuationsClick(objContext, " " + text, false); }}>
                        <div className="punctuations-button">
                            {text}
                        </div>
                    </div>
                    ];
                }
            });
        }
        return arrTextNodes;
    };

    /**
     * @name HandleKeyPress
     * @param {any} event
     */
    const HandleKeyPress = (event) => {
        if (event.keyCode === 8) {
            objContext.CMSPunctuations_TestApplication_ModuleProcessor.HandlePunctuationBackButton(objContext);
        }
        else {
            event.preventDefault();
        }
    }

    /**
    * @name GetContent
    * @summary Calls the RenderPunctuationsBody() from the Common with passed events.
    * @returns {any} JSX
    */
    const GetContent = () => {
        var strSolutionClassName = "";
        if (objContext.state.ViewSolution) {
            strSolutionClassName = "punctuation-wrong-answer";
        }
        if (objContext.state.ViewComparison) {
            strSolutionClassName = objContext.state.ElementStatus === 1 ? "punctuation-right-answer" : "punctuation-wrong-answer";
        }
        let objTextElementProps = {};
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = objContext.CMSPunctuations_TestApplication_ModuleProcessor.GetTextElementProps(objContext, objElementHeader["iElementTextId"]);
        }
        var objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSPunctuations", objContext.props);
        return (
            <React.Fragment>
                <div id={`cms-punctuations_wrapper_${objContext.state.ElementJson["iElementId"]}`}
                    ielementid={objContext.state.ElementJson["iElementId"]}
                    ielementtypeid={objContext.state.ElementJson["iElementTypeId"]}
                    className={strSolutionClassName}>
                    {
                        objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                            <CMSText_TestApplication {...objTextElementProps} /> : ""
                    }
                    {
                        (objContext.state.ViewSolution || (objContext.state.ViewComparison && objContext.state.ElementStatus !== 1)) &&
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashWrong.gif"} />
                    }
                    {
                        objContext.state.ViewComparison && objContext.state.ElementStatus === 1 &&
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashRight.gif"} />
                    }
                    <div className="punctuation-outer-wrapper">
                        <div>
                            <textarea ref={objContext.TextAreaRef}
                                className="punctuations-textarea"
                                rows="4"
                                value={objContext.state.ElementJson.vElementJson.vSentence}
                                onKeyDown={(event) => { HandleKeyPress(event); }}>
                            </textarea>
                            {/* 3
                                <div className="punctuations-textarea"
                                    ref={objContext.ContentEditableRef}
                                    contentEditable={AppType.toLowerCase() === "editor" ? true : false}
                                    onInput={(event) => { Events.HandleSolutionOnChange(event); }}
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
                        <div className="punctuations-action-button-wrapper">
                            <div className="punctuation-action-buttons-wrapper">
                                <div className="punctuations-button punctuation-action-buttons" onClick={() => { objContext.CMSPunctuations_TestApplication_ModuleProcessor.HandlePunctuationBackButton(objContext) }}>
                                    {Localization.TextFormatter(objTextResource, "Back")}
                                </div>
                                <div className="punctuations-button punctuation-action-buttons" onClick={() => { objContext.CMSPunctuations_TestApplication_ModuleProcessor.HandlePunctuationClear(objContext) }}>
                                    {Localization.TextFormatter(objTextResource, "Clear")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    (objContext.state.ViewSolution || (objContext.state.ViewComparison && objContext.state.ElementStatus !== 1)) &&
                    <div className="punctuation-view-solution">
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashRight.gif"} />
                        <span>{objContext.state.ElementJson.vElementJson.vText}</span>
                    </div>
                }
            </React.Fragment>
        );
    }
    /**
    * @summary Checks if the state is fully loaded and then call the GetContent().
    * @returns {any} JSX
    * */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
    }

export default connect(Base_Hook.MapStoreToProps(CMSPunctuations_Common_ModuleProcessor.StoreMapList()))(CMSPunctuations_TestApplication);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSPunctuations_Common_ModuleProcessor; 