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

/**
 * @name CMSLineAssign_Editor
 * @param {object} props props from parent
 * @summary Editor component for LineAssign
 * @returns {any} CMSLineAssign_Editor
 */
const CMSLineAssign_Editor = (props) => {

    const [blnRerender, setBlnRerender] = useState(false);

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
        svgRef: useRef(null),
        canvasWrapperRef: useRef(null),
        QuestionRefs: state.ElementJson.vElementJson.Questions.map(e => { return createRef() }),
        AnswerRefs: state.ElementJson.vElementJson.Answers.map(e => { return createRef() }),
        blnRepositionSVG: useRef(false),
        objLineCoordinates: useRef({}),
        AnswerWrapperRef: useRef(null),
        QuestionWrapperRef: useRef(null)
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
        setBlnRerender(!objContext.blnRepositionSVG.current);
        objContext.blnRepositionSVG.current = !objContext.blnRepositionSVG.current;
    }, 1000);

    useEffect(() => {
        var arrBlnQuestions = [...objContext.state.arrBlnShowQuestionBorder];
        arrBlnQuestions[objContext.state.intSelectedQuestionNumber] = false;
        objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBlnShowQuestionBorder": [...arrBlnQuestions] } });
    }, [objContext.state.ElementJson.vElementJson.Answers.length])


    useEffect(() => {
        // triggering height re-calculation. 
        //setTimeout(function () {
        //    setBlnIntialRender(false);
        //}.bind(this), 0)

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true, attributeOldValue: true, attributeFilter: ["height"] };
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        //objContext.QuestionRefs.forEach((ref, i) => {
        //    // Start observing the target node for configured mutations
        //    observer.observe(ref.current, config);
        //});

        //objContext.AnswerRefs.forEach((ref, i) => {
        //    // Start observing the target node for configured mutations
        //    observer.observe(ref.current, config);
        //});

        observer.observe(objContext.QuestionWrapperRef.current, config);
        observer.observe(objContext.AnswerWrapperRef.current, config);

        return () => {
            console.log("Observer disconnected");
            // Later, you can stop observing
            observer.disconnect();
        }
    }, [])

    /**
     * @name HandleSVGRender
     * @summary Executed when question/answer block height is changed or a new block is added
     * */
    const HandleSVGRender = () => {
        var arrValues = [...objContext.state.ElementJson.vElementJson.Values];
        arrValues.forEach((objValue, i) => {
            const { x: x1, y: y1, width: width1, height: height1 } = GetRelativeToParentPosition(objContext.QuestionRefs[objValue["iElementQuestionNumber"]]);
            var objLineCoordinates = { x1, y1: y1 + height1 / 2, width1, height1 };
            objContext.objLineCoordinates.current[objValue["iElementQuestionNumber"]] = objLineCoordinates;
            const { x: x2, y: y2, width: width2, height: height2 } = GetRelativeToParentPosition(objContext.AnswerRefs[objValue["iElementAnswerNumber"]]);
            arrValues[i] = { ...arrValues[i], "points": { ...objLineCoordinates, x2, y2: y2 + height2 / 2 } }
        });
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson, "Values": arrValues
                    }
                }
            }
        })
    }

    /**
     * @name GetRelativeToParentPosition
     * @param {any} ref element reference
     */
    const GetRelativeToParentPosition = (ref) => {
        let { top: parentY, left: parentX } = objContext.outerDivRef.current.getBoundingClientRect();
        let { top: childY, left: childX, width, height } = ref.current.getBoundingClientRect();
        return { "x": childX - parentX, "y": childY - parentY, width, height };
    }

    useEffect(() => {
        if (!blnIntialRender) {
            //HandleCanvasRerender();
            HandleSVGRender();
        }
        else {
            setBlnIntialRender(false)
        }
    }, [
        blnRerender,
        //blnIntialRender,
        objContext.state.ElementJson.vElementJson.Questions,
        objContext.state.ElementJson.vElementJson.Answers,
        //objContext.state.isLoadComplete
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
                "HandleQuestionClick": (objSelectedQuestion, ref) => {
                    let { top: parentY, left: parentX } = objContext.outerDivRef.current.getBoundingClientRect();
                    let { top: childY, left: childX, width, height } = ref.current.getBoundingClientRect();
                    objContext.CMSLineAssign_Common_ModuleProcessor.HandleQuestionClick({ objContext, objSelectedQuestion, "objPoints": { "x": childX - parentX, "y": childY - parentY, width, height } });
                    objContext.CMSLineAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                },
                "HandleAnswerClick": (objSelectedAnswer, ref) => {
                    let { top: parentY, left: parentX } = objContext.outerDivRef.current.getBoundingClientRect();
                    let { top: childY, left: childX, width, height } = ref.current.getBoundingClientRect();
                    objContext.CMSLineAssign_Common_ModuleProcessor.HandleAnswerClick({ objContext, objSelectedAnswer, "objPoints": { "x": childX - parentX, "y": childY - parentY, width, height } }, false);
                    objContext.CMSLineAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
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