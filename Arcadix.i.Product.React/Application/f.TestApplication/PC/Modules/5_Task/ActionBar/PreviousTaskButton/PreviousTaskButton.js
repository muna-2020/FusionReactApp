//react Related Import
import React from 'react';

//Handle's on click event
import NextTaskButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/NextTaskButton/NextTaskButton_ModuleProcessor';
import TestApplicationTask_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_ModuleProcessor';


/**
 * @name PreviousTaskButton
 * @summary Previous Task load on click of button
 * @param {any} props
 * @returns {object} 
 * 
 */
const PreviousTaskButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, NextTaskButton_ModuleProcessor: new NextTaskButton_ModuleProcessor(), objTestApplicationTask_ModuleProcessor: new TestApplicationTask_ModuleProcessor() };

    /**
     * @name PreviousClick
     * @summary For Previous Click and sending Answer Json
     * @returns {[]} state and dispatch
     */
    const PreviousClick = (event) => {

        /**
         * @name ClearTimeTakenforTask
         * @summary Calculating
         */
        event.preventDefault();
        ApplicationState.SetProperty("blnShowAnimation", true);
        let ProgressComponent = objContext.props.TestState.LinearTestProperties ? objContext.props.TestState.LinearTestProperties.ProgressComponent ? objContext.props.TestState.LinearTestProperties.ProgressComponent : "" : ""
        if (ProgressComponent === "GroupTimeCountDownDisplay") {
            clearInterval(objInterval);
        }
        objContext.objTestApplicationTask_ModuleProcessor.ClearTimeTakenforTask(objContext);
        let AnswerJson = objContext.props.TaskLayoutRef.current.GetUserResponse();
        var objParams = {
            "AnswerJson": AnswerJson["Containers"],
            "PageJson": objContext.props.TestState.TaskPageProperties.PageJson,
            "SaveAndClose": false,
            "NextTaskIndex": objContext.props.TestState.LinearTestProperties.CurrentTaskIndex - 1
        };
        objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams)
    }

    return (
        objContext.props.TestState.LinearTestProperties && objContext.props.TestState.LinearTestProperties.IsShowLinearIndex === "Y" && objContext.props.TestState.LinearTestProperties.IsPreviousTaskButton ?
            <WrapperComponent
                ComponentName={"Button"}
                Meta={{ "ClassName": "" }}
                ParentProps={props}
                Events={{ "OnClickEventHandler": PreviousClick }}
                Resource={{ "ButtonText": objContext.props.TestState.LinearTestProperties ? objContext.props.TestState.LinearTestProperties.BackButtonText ? objContext.props.TestState.LinearTestProperties.BackButtonText : Localization.TextFormatter(props.TextResources, "PreviousTaskButtonText") : Localization.TextFormatter(props.objTextResource, "PreviousTaskButtonText"), "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }} /> : ""
    );
}

export default PreviousTaskButton;

