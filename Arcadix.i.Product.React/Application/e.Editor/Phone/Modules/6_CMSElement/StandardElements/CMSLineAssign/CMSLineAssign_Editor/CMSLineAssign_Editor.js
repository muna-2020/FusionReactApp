//React imports
import React, { useEffect, useReducer, useRef, useState, createRef } from 'react';

// Throttle related import
import { throttle, debounce } from 'lodash';

//Module related files
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Common/CMSLineAssign_Common';
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';
import * as CMSLineAssign_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Editor/CMSLineAssign_Editor_Hooks';
import CMSLineAssign_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Common/CMSLineAssign_Common_ModuleProcessor';
import CMSLineAssign_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Editor/CMSLineAssign_Editor_ModuleProcessor';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

import loadable from '@loadable/component';

const createjs = loadable(() => import('createjs-module'), { ssr: false });

/**
 * @name CMSLineAssign_Editor
 * @param {object} props props from parent
 * @summary Editor component for LineAssign
 * @returns {any} CMSLineAssign_Editor
 */
const CMSLineAssign_Editor = (props) => {

    const [blnRedrawCanvas, setBlnRedrawCanvas] = useState(false);

    const [blnIntialRender, setBlnIntialRender] = useState(true);

    const [blnOutsideClick, setBlnOutsideClick] = useState(false);


    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSLineAssign_Editor_Hooks.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSLineAssign_Editor_" + props.ElementJson.iElementId,
        CMSLineAssign_Editor_ModuleProcessor: new CMSLineAssign_Editor_ModuleProcessor(),
        CMSLineAssign_Common_ModuleProcessor: new CMSLineAssign_Common_ModuleProcessor(),
        StageRef: useRef(null),
        LineDataRef: useRef(null),
        outerDivRef: useRef(null),
        canvasRef: useRef(null),
        canvasWrapperRef: useRef(null),
        QuestionRefs: state.ElementJson.vElementJson.Questions.map(e => { return createRef() }),
        AnswerRefs: state.ElementJson.vElementJson.Answers.map(e => { return createRef() }),
        blnRedrawCanvasRef: useRef(false),
        iLinePositionX: 0,
        iLineWidth: 200,
        iStrokeStyle: 3,
        iCanvasWidth: 200,
        iMarginBottomValue: 10,
        iTotalQuestionMargin: (state.ElementJson.vElementJson.Questions.length - 1) * 10,
        iTotalAnswerMargin: (state.ElementJson.vElementJson.Answers.length - 1) * 10
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSLineAssign_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSLineAssign_Editor_ModuleProcessor);

    /**
    * @name CMSLineAssign_Editor_Hooks.Initialize
    * @summary Initialize method call in CMSLineAssign_Editor_Hooks, that contains all the custom hooks.
    */
    CMSLineAssign_Editor_Hooks.Initialize(objContext);

    // Callback function to execute when mutations are observed
    const callback = debounce((mutationsList, observer) => {
        // Use traditional 'for loops' for IE 11
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
                setBlnRedrawCanvas(!objContext.blnRedrawCanvasRef.current);
                objContext.blnRedrawCanvasRef.current = !objContext.blnRedrawCanvasRef.current;
            }
            else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.', mutation, mutation.target);
                setBlnRedrawCanvas(!objContext.blnRedrawCanvasRef.current);
                objContext.blnRedrawCanvasRef.current = !objContext.blnRedrawCanvasRef.current;
            }
        }
    }, 1000);

    useEffect(() => {
        var arrBlnQuestions = [...objContext.state.arrBlnShowQuestionBorder];
        arrBlnQuestions[objContext.state.intSelectedQuestionNumber] = false;
        objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBlnShowQuestionBorder": [...arrBlnQuestions] } });
    }, [objContext.state.ElementJson.vElementJson.Answers.length])

    useEffect(() => {

        // triggering height re-calculation. 
        setTimeout(function () {
            setBlnIntialRender(false);
        }.bind(this), 0)

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);
        objContext.QuestionRefs.forEach((ref, i) => {
            // Start observing the target node for configured mutations
            observer.observe(ref.current, config);
        });

        objContext.AnswerRefs.forEach((ref, i) => {
            // Start observing the target node for configured mutations
            observer.observe(ref.current, config);
        });

        return () => {
            console.log("Observer disconnected");
            // Later, you can stop observing
            observer.disconnect();
        }
    }, [])


    const HandleCanvasRerender = async () => {
        if (objContext.state.ElementJson.vElementJson.Questions.length > 0 && objContext.state.ElementJson.vElementJson.Answers.length > 0) {

            var arrLinePositionY = []; var arrLinePositionX = [];
            var iPreviousPositionYValues = 0; var iPreviousPositionXValues = 0;
            var iQuestionBlockHeight = 0; var iAnswerBlockHeight = 0;
            objContext.QuestionRefs.forEach((ref, i) => {
                for (var j = i; j > 0; j--) {
                    iPreviousPositionYValues = iPreviousPositionYValues + objContext.QuestionRefs[j - 1].current.offsetHeight + objContext.iMarginBottomValue;
                }
                arrLinePositionY = [...arrLinePositionY, iPreviousPositionYValues + ref.current.offsetHeight / 2];
                iPreviousPositionYValues = 0;
                iQuestionBlockHeight = iQuestionBlockHeight + ref.current.offsetHeight;
            });

            objContext.AnswerRefs.forEach((ref, i) => {
                for (var j = i; j > 0; j--) {
                    iPreviousPositionXValues = iPreviousPositionXValues + objContext.AnswerRefs[j - 1].current.offsetHeight + objContext.iMarginBottomValue;
                }
                arrLinePositionX = [...arrLinePositionX, iPreviousPositionXValues + ref.current.offsetHeight / 2];
                iPreviousPositionXValues = 0;
                iAnswerBlockHeight = iAnswerBlockHeight + ref.current.offsetHeight;
            });

            //var outerDiv = objContext.outerDivRef.current;
            //var outerDivHeight = outerDiv.offsetHeight;
            //var outerDivWidth = outerDiv.offsetWidth;

            var canvas = objContext.canvasRef.current;
            canvas.height = iQuestionBlockHeight > iAnswerBlockHeight ? iQuestionBlockHeight + objContext.iTotalQuestionMargin : iAnswerBlockHeight + objContext.iTotalAnswerMargin; //outerDivHeight - 10; 
            canvas.width = objContext.iCanvasWidth;
            createjs.load().then((create) => {
                var stage = new create.Stage(objContext.canvasRef.current);
                stage.mouseMoveOutside = false;
                stage.enableMouseOver();
                stage.preventSelection = false;
                create.Touch.enable(stage /*, true, true*/);
                stage.removeAllChildren();
                var arrLines = [];
                var arrAnswers = [...objContext.state.ElementJson.vElementJson.Answers];
                var arrQuestions = [...objContext.state.ElementJson.vElementJson.Questions];
                for (var i = 0; i < objContext.state.ElementJson.vElementJson.Questions.length; i++) {
                    arrLines[i] = [];
                    var objElementQuestionJson = { ...arrQuestions[i] };
                    for (var j = 0; j < objContext.state.ElementJson.vElementJson.Answers.length; j++) {
                        var objElementAnswerJson = { ...arrAnswers[j] };
                        var arrFilterValues = objContext.state.ElementJson.vElementJson.Values.filter(ele => ele["iElementQuestionId"] === objElementQuestionJson["iElementQuestionId"] && ele["iElementAnswerId"] === objElementAnswerJson["iElementAnswerId"]);
                        var line = new create.Shape();
                        line.graphics.clear();
                        line.graphics.setStrokeStyle(objContext.iStrokeStyle).beginStroke("#4d4d4d");
                        line.graphics.moveTo(objContext.iLinePositionX, arrLinePositionY[i]);
                        line.graphics.lineTo(objContext.iLineWidth, arrLinePositionX[j]);
                        console.log(arrLinePositionY[i], arrLinePositionX[j])
                        if (arrFilterValues.length > 0) {
                            line.visible = true;
                        } else {
                            line.visible = false;
                        }
                        stage.addChild(line);
                        arrLines[i][j] = line;
                    }

                }
                objContext.StageRef.current = stage;
                objContext.LineDataRef.current = arrLines;
                stage.update();
            });
        }
    }

    useEffect(() => {
        if (!blnIntialRender) {
            HandleCanvasRerender();
        }
    }, [
        blnRedrawCanvas,
        blnIntialRender,
        objContext.state.ElementJson.vElementJson.Questions,
        objContext.state.ElementJson.vElementJson.Answers,
        objContext.state.isLoadComplete
    ])


    //useEffect(() => {
    //    window.addEventListener("mouseup", HandleMouseUpEvent)
    //    return () => {
    //        console.log("mouseup event removed");
    //        window.addEventListener("mouseup", HandleMouseUpEvent)
    //    }
    //}, []);

    //const HandleMouseUpEvent = debounce((e) => {
    //    var ele = document.getElementById(e.target.id);
    //    console.log(e.target.id)
    //    if (ele && !/(LineAssignQuestion|LineAssignAnswer)/i.test(ele.getAttribute('type'))) {
    //        setBlnOutsideClick(true);
    //    }
    //}, 500);


    //useEffect(() => {
    //    if (blnOutsideClick) {
    //        objContext.dispatch({
    //            "type": "SET_STATE", "payload": {
    //                "iSelectedQuestionNumber": -1,
    //                "iSelectedQuestionId": -1,
    //                "arrBlnShowQuestionBorder": objContext.state.arrBlnShowQuestionBorder.map((e) => { return false; })
    //            }
    //        });
    //        setBlnOutsideClick(false)
    //    }
    //}, [blnOutsideClick])

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objValue) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSLineAssign_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objValue);
                },
                "HandleMouseUp": (e) => {
                    console.log(e.target.id);

                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return { ...objContext.CMSLineAssign_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId) };
                },
                "HandleQuestionClick": (objSeledtedQuestion) => {
                    setBlnOutsideClick(false);
                    objContext.CMSLineAssign_Common_ModuleProcessor.HandleQuestionClick(objContext, objSeledtedQuestion);
                },
                "HandleAnswerClick": (objSelectedAnswer) => {
                    objContext.CMSLineAssign_Common_ModuleProcessor.HandleAnswerClick(objContext, objSelectedAnswer);
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return (
            <Common {...objCommonProps} />
        );
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
}

export default CMSLineAssign_Editor; 

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSLineAssign_Common_ModuleProcessor; 