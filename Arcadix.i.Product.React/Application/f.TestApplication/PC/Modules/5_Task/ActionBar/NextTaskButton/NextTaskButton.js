//react Related Import
import React from 'react';

//Handle's on click event
import NextTaskButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/NextTaskButton/NextTaskButton_ModuleProcessor';
import TestApplicationTask_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_ModuleProcessor';
import GroupEndButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/GroupEndButton/GroupEndButton_ModuleProcessor';


/**
 * @name NextTaskButton
 * @summary Next Task load on click of button
 * @param {any} props
 * @returns {object} 
 * 
 */
const NextTaskButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, NextTaskButton_ModuleProcessor: new NextTaskButton_ModuleProcessor(), objGroupEndButton_ModuleProcessor: new GroupEndButton_ModuleProcessor, objTestApplicationTask_ModuleProcessor: new TestApplicationTask_ModuleProcessor() };

    /**
     * @name NextClick
     * @summary For Next Click and sending Answer Json
     * @returns {[]} state and dispatch
     */
    const NextClick = (event) => {
        ApplicationState.SetProperty("blnShowAnimation", true);
        /**
         * @name ClearTimeTakenforTask
         * @summary Calculating
         */
        event.preventDefault();
        objContext.objTestApplicationTask_ModuleProcessor.ClearTimeTakenforTask(objContext);
        let AnswerJson = objContext.props.TaskLayoutRef.current.GetUserResponse();
        var objParams = {
            "AnswerJson": AnswerJson["Containers"],
            "PageJson": objContext.props.TestState.TaskPageProperties.PageJson,
            "SaveAndClose": false,
            "NextTaskIndex": objContext.props.TestState.LinearTestProperties ? objContext.props.TestState.LinearTestProperties.CurrentTaskIndex + 1 : 0
        };
        let IsDirectLoginResponse = ApplicationState.GetProperty('IsDirectLoginResponse');
        if (props.TestState.IsDirectLogin === "Y" && IsDirectLoginResponse !== undefined) {
            objContext.NextTaskButton_ModuleProcessor.NextTaskClickDirectLogin(objContext, objParams)
        }
        else if (objContext.props.TestState.cShowTaskNotAnswered === "Y") {
            if (AnswerJson["cIsAnswered"] === "N") {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.NextTaskButton_ModuleProcessor.ShowTaskConfirmationAutoLoginPopup(objContext, objParams)
            }
            else {
                objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams)
            }
        }
        else {
            if (objContext.props.TestState.LinearTestProperties) {
                let ProgressComponent = props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.ProgressComponent ? props.TestState.LinearTestProperties.ProgressComponent : "" : ""
                if (objContext.props.TestState.LinearTestProperties.CurrentTaskIndex == objContext.props.TestState.LinearTestProperties.GroupEndIndex) {
                    if (ProgressComponent === "GroupTimeCountDownDisplay") {
                        clearInterval(objInterval);
                    }
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.objGroupEndButton_ModuleProcessor.GroupEndConfirmationPopup(objContext);
                }
                else {
                    if (ProgressComponent === "GroupTimeCountDownDisplay") {
                        clearInterval(objInterval);
                    }
                    if (props.TestState.cIsAnswerMandatory === "Y") {
                        if (AnswerJson["cIsAnswered"] === "N") {
                            if (props.TestState.TaskPageProperties.IsLikert) {
                                objContext.props.TaskLayoutRef.current.ExecuteAction("change_container_backgroud", AnswerJson)
                            }
                            ApplicationState.SetProperty("blnShowAnimation", false);
                            objContext.NextTaskButton_ModuleProcessor.ShowTaskConfirmationPopup(objContext, objParams)
                        }
                        else {
                            objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams)

                        }
                    }
                    else {
                        objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams)
                    }
                }
            }
            else {
                objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams)
            }
        }
    }

    return (
        <WrapperComponent
            ComponentName={"Button"}
            Meta={{ "ClassName": "" }}
            ParentProps={props}
            Events={{ "OnClickEventHandler": NextClick }}
            Resource={{ "ButtonText": objContext.props.TestState.LinearTestProperties ? objContext.props.TestState.LinearTestProperties.NextButtonText ? objContext.props.TestState.LinearTestProperties.NextButtonText : Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "NextClickButtonText") : Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "NextClickButtonText"), "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }} />
    );
}

export default NextTaskButton;

