//React imports
import React, { useEffect, useReducer, useRef, createRef } from 'react';

//Createjs imports
import * as createjs from 'createjs-module';

//Module related files
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Common/CMSLineAssign_Common';
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as CMSLineAssign_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_TestApplication/CMSLineAssign_TestApplication_Hooks';
import CMSLineAssign_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Common/CMSLineAssign_Common_ModuleProcessor';
import CMSLineAssign_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_TestApplication/CMSLineAssign_TestApplication_ModuleProcessor';

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSLineAssign_TestApplication
 * @param {object} props props from parent
 * @summary Editor component for LineAssign
 * @returns {any} CMSLineAssign_TestApplication
 */
const CMSLineAssign_TestApplication = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSLineAssign_TestApplication_Hooks.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSLineAssign_TestApplication_" + props.ElementJson.iElementId,
        CMSLineAssign_TestApplication_ModuleProcessor: new CMSLineAssign_TestApplication_ModuleProcessor(),
        CMSLineAssign_Common_ModuleProcessor: new CMSLineAssign_Common_ModuleProcessor(),
        StageRef: useRef(null),
        LineDataRef: useRef(null),
        outerDivRef: useRef(null),
        canvasRef: useRef(null),
        QuestionRefs: state.ElementJson.vElementJson.Questions.map(e => { return createRef() }),
        AnswerRefs: state.ElementJson.vElementJson.Answers.map(e => { return createRef() }),
        iLinePositionX: 0,
        iLineWidth: 200,
        iStrokeStyle: 3,
        iCanvasWidth: 200,
        iMarginBottomValue: 10
    };


    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSLineAssign_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSLineAssign_TestApplication_ModuleProcessor);

    /**
    * @name CMSLineAssign_TestApplication_Hooks.Initialize
    * @summary Initialize method call in CMSLineAssign_TestApplication_Hooks, that contains all the custom hooks.
    */
    CMSLineAssign_TestApplication_Hooks.Initialize(objContext);

    useEffect(() => {
        if (objContext.state.isLoadComplete || objContext.state.blnRerender) {
            var outerDivHeight = objContext.outerDivRef.current.offsetHeight;
            console.log(outerDivHeight)
            var outerDivWidth = objContext.outerDivRef.current.offsetWidth;
            var canvas = objContext.canvasRef.current
            const ctx = canvas.getContext("2d");
            ctx.canvas.height = outerDivHeight;
            ctx.canvas.width = objContext.iCanvasWidth;
            var stage = new createjs.Stage(objContext.canvasRef.current);
            stage.mouseMoveOutside = false;
            stage.enableMouseOver();
            stage.preventSelection = false;
            createjs.Touch.enable(stage /*, true, true*/);
            stage.removeAllChildren();
            var arrLinePositionY = []; var arrLinePositionX = [];
            var iPreviousPositionYValues = 0; var iPreviousPositionXValues = 0
            objContext.QuestionRefs.forEach((ref, i) => {
                for (var j = i; j > 0; j--) {
                    iPreviousPositionYValues = iPreviousPositionYValues + objContext.QuestionRefs[j - 1].current.offsetHeight + objContext.iMarginBottomValue;
                }
                arrLinePositionY = [...arrLinePositionY, iPreviousPositionYValues + ref.current.offsetHeight / 2];
                iPreviousPositionYValues = 0;
            });
            objContext.AnswerRefs.forEach((ref, i) => {
                for (var j = i; j > 0; j--) {
                    iPreviousPositionXValues = iPreviousPositionXValues + objContext.AnswerRefs[j - 1].current.offsetHeight + objContext.iMarginBottomValue;
                }
                arrLinePositionX = [...arrLinePositionX, iPreviousPositionXValues + ref.current.offsetHeight / 2];
                iPreviousPositionXValues = 0;
            });
            var arrLines = [];
            var arrElementJsonValues = [];
            var arrElementJsonWithAnswerValues = [];
            var arrSolutionValues = [];
            var arrCopyElementJsonWithAnswerValues = [];
            var blnShowCorrect = [...objContext.state.blnShowCorrect];
            var objWrongAnswerValues = {};
            if (objContext.state.ViewSolution || objContext.state.ViewComparison) {
                arrElementJsonValues = [...objContext.state.ElementJson.vElementJson.Values];
                arrSolutionValues = [...arrElementJsonValues];
                arrElementJsonWithAnswerValues = objContext.state.ElementJsonWithAnswer.vElementJson.Values;
                arrCopyElementJsonWithAnswerValues = [...arrElementJsonWithAnswerValues];
                if (arrElementJsonValues.length > 0) {
                    for (var p = 0; p < arrElementJsonValues.length; p++) {
                        for (var q = 0; q < arrElementJsonWithAnswerValues.length; q++) {
                            if (arrElementJsonWithAnswerValues[q]["iElementQuestionId"] === arrElementJsonValues[p]["iElementQuestionId"] && arrElementJsonWithAnswerValues[q]["iElementAnswerId"] === arrElementJsonValues[p]["iElementAnswerId"]) {
                                arrSolutionValues = arrSolutionValues.filter(e => e["iElementQuestionId"] !== arrElementJsonValues[p]["iElementQuestionId"] && e["iElementAnswerId"] !== arrElementJsonValues[p]["iElementAsnwerId"]);
                                blnShowCorrect[arrElementJsonValues[p]["iElementAnswerNumber"]] = true;
                                break;
                            }
                        }
                        for (var a = 0; a < arrCopyElementJsonWithAnswerValues.length; a++) {
                            if (arrCopyElementJsonWithAnswerValues[a]) {
                                if (arrCopyElementJsonWithAnswerValues[a]["iElementQuestionId"] === arrElementJsonValues[p]["iElementQuestionId"]) {
                                    arrCopyElementJsonWithAnswerValues = [...arrCopyElementJsonWithAnswerValues.slice(0, a), ...arrCopyElementJsonWithAnswerValues.slice(a + 1, arrCopyElementJsonWithAnswerValues.length)];
                                    break;
                                }
                            }
                        }
                    }
                    for (var z = 0; z < arrSolutionValues.length; z++) {
                        objWrongAnswerValues = {
                            ...objWrongAnswerValues,
                            [`${arrSolutionValues[z]["iElementQuestionNumber"]}${arrSolutionValues[z]["iElementAnswerNumber"]}`]: arrSolutionValues[z]
                        }
                        blnShowCorrect[arrSolutionValues[z]["iElementAnswerNumber"]] = false;
                    }
                }
            }
            for (var i = 0; i < objContext.state.ElementJson.vElementJson.Questions.length; i++) {
                arrLines[i] = [];
                //blnNoAnswersFound = false;
                for (var j = 0; j < objContext.state.ElementJson.vElementJson.Answers.length; j++) {
                    var line = new createjs.Shape();
                    line.graphics.clear();
                    if (objContext.state.ViewSolution || objContext.state.ViewComparison) {
                        if (objWrongAnswerValues[`${i}${j}`]) {
                            line.graphics.setStrokeStyle(objContext.iStrokeStyle).beginStroke("red");
                        }
                        else {
                            if (objContext.state.ViewComparison && arrCopyElementJsonWithAnswerValues.filter(e => e["iElementQuestionNumber"] === i && e["iElementAnswerNumber"] === j).length > 0) {
                                // not answered
                                line.graphics.setStrokeStyle(objContext.iStrokeStyle).beginStroke("#90ee90");
                            }
                            else {
                                line.graphics.setStrokeStyle(objContext.iStrokeStyle).beginStroke("#90ee90");
                            }
                        }
                    }
                    else {
                        line.graphics.setStrokeStyle(objContext.iStrokeStyle).beginStroke("#4d4d4d");
                    }
                    line.graphics.moveTo(objContext.iLinePositionX, arrLinePositionY[i]);
                    line.graphics.lineTo(objContext.iLineWidth, arrLinePositionX[j]);
                    line.visible = false;
                    stage.addChild(line);
                    arrLines[i][j] = line;
                }
            }
            if (objContext.state.ViewSolution || objContext.state.ViewComparison) {
                if (arrElementJsonValues.length === 0) {
                    arrElementJsonWithAnswerValues.forEach((objAnswerElementJson) => {
                        arrLines[objAnswerElementJson["iElementQuestionNumber"]][objAnswerElementJson["iElementAnswerNumber"]].visible = true;
                    });
                }
                else {
                    [...arrElementJsonWithAnswerValues, ...arrSolutionValues].forEach((e) => {
                        arrLines[e["iElementQuestionNumber"]][e["iElementAnswerNumber"]].visible = true;
                    });
                }
            }
            objContext.StageRef.current = stage;
            objContext.LineDataRef.current = arrLines;
            stage.update();
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "blnShowCorrect": blnShowCorrect
                }
            });
            if (objContext.state.blnRerender) {
                objContext.dispatch({
                    "type": "SET_STATE", "payload": {
                        "blnRerender": false
                    }
                });
            }
        }
    }, [
        objContext.state.isLoadComplete,
        //objContext.state.blnDisableLineHighlight,
        objContext.state.ViewSolution,
        objContext.state.ViewComparison,
        objContext.state.blnRerender
    ])


    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {},
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return { ...objContext.CMSLineAssign_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId) };
                },
                "HandleQuestionClick": (objSeledtedQuestion) => {
                    objContext.CMSLineAssign_Common_ModuleProcessor.HandleQuestionClick(objContext, objSeledtedQuestion);
                },
                "HandleAnswerClick": (objSelectedAnswer) => {
                    objContext.CMSLineAssign_Common_ModuleProcessor.HandleAnswerClick(objContext, objSelectedAnswer);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "Editor"
        };
        return (
            <Common {...objCommonProps} />
        );
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default CMSLineAssign_TestApplication; 

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSLineAssign_Common_ModuleProcessor; 