//React imports
import React, { useEffect, useReducer, useRef, createRef } from 'react';

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
        svgRef: useRef(null),
        QuestionRefs: state.ElementJson.vElementJson.Questions.map(e => { return createRef() }),
        AnswerRefs: state.ElementJson.vElementJson.Answers.map(e => { return createRef() }),
        objLineCoordinates: useRef({})
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
                "HandleQuestionClick": (objSelectedQuestion, ref) => {
                    let { top: parentY, left: parentX } = objContext.outerDivRef.current.getBoundingClientRect();
                    let { top: childY, left: childX, width, height } = ref.current.getBoundingClientRect();
                    objContext.CMSLineAssign_Common_ModuleProcessor.HandleQuestionClick({ objContext, objSelectedQuestion, "objPoints": { "x": childX - parentX, "y": childY - parentY, width, height } });
                    let arrBlnShowCorrect = [...objContext.state.blnShowCorrect];
                    arrBlnShowCorrect[objSelectedQuestion.iSelectedQuestionNumber] = null;
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "blnShowCorrect": arrBlnShowCorrect } });
                },
                "HandleAnswerClick": (objSelectedAnswer, ref) => {
                    let { top: parentY, left: parentX } = objContext.outerDivRef.current.getBoundingClientRect();
                    let { top: childY, left: childX, width, height } = ref.current.getBoundingClientRect();
                    objContext.CMSLineAssign_Common_ModuleProcessor.HandleAnswerClick({ objContext, objSelectedAnswer, "objPoints": { "x": childX - parentX, "y": childY - parentY, width, height } });
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