//React Related import
import React,{ useReducer,useEffect } from 'react';

//Component Related import
import GroupTimeCountDownDisplay_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/GroupTimeCountDownDisplay/GroupTimeCountDownDisplay_ModuleProcessor';
import TestApplicationTask_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_ModuleProcessor';
import NextTaskButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/NextTaskButton/NextTaskButton_ModuleProcessor';


/**
 * @name GroupTimeCountDownDisplay
 * @param {object} props props
 * @summary This component displays the GroupTimeCountDownDisplay.
 * @returns {object} React.Fragement that encapsulated the bar
 * */
const GroupTimeCountDownDisplay = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dIspatch
    */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, {});

    /**
     * @name Assigning objContext
     * @summary Groups props and object of module processor which can be passed across method in the module and used 
     * */
    let objContext = { props, NextTaskButton_ModuleProcessor: new NextTaskButton_ModuleProcessor(), GroupTimeCountDownDisplay_ModuleProcessor: new GroupTimeCountDownDisplay_ModuleProcessor(), objTestApplicationTask_ModuleProcessor: new TestApplicationTask_ModuleProcessor() };

    /**
     * @name objContext
     * @summary Calling SetGroupTimeCountDownDisplay Method.
     * @returns {object} objContext
     * */
    useEffect(() => {
        GetTimer(objContext)
    }, [])

    const GetTimer = (objContext) => {
        if (objContext.props.TestState.CurrentRoute !== "Result") {
            if (objContext.props.TestState.LinearTestProperties) {
                var timeleft = objContext.props.TestState.LinearTestProperties.TaskTimeLimit - objContext.props.TestState.LinearTestProperties.TaskTimeElapsed;
                global.objInterval = setInterval(function () {
                    if (timeleft <= 0) {
                        clearInterval(objInterval);
                        TestApplicationPopup.ShowPopup({
                            Data: {
                                HeaderTitle: "Confirmation"
                            },
                            Meta: {
                                PopupName: "GroupEndConfirmationPopUp",
                                Type: "Display",
                                ShowHeader: false,
                                ShowCloseIcon: true,
                                ShowToggleMaximizeIcon: true,
                                Height: "auto",
                                Width: "auto"
                            },
                            Resource: {
                                Text: objContext.objTextResource,
                                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                            },
                            Events: {
                                NextTask: (strPopId) => {
                                    ApplicationState.SetProperty("blnShowAnimation", true);
                                    objContext.GroupTimeCountDownDisplay_ModuleProcessor.NextTask(objContext)
                                    TestApplicationPopup.ClosePopup(strPopId)
                                }
                            },
                            CallBacks: {}
                        });

                    } else {
                        dispatch({ type: "SET_STATE", payload: { "Timer": timeleft -= 1 } });
                    }
                }, 1000);
            }
        }
    }

    /**
     * @name GetContent
     * @summary required jsx for component.
     * @returns {object} jsx, React.Fragment
     * */
    function GetContent() {
        let m = Math.floor(state.Timer % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(state.Timer % 60).toString().padStart(2, '0');
        return (
            <div id="countdown">Gruppenzeit : {m}:{s} </div>
        );
    }

    return GetContent();
};

export default GroupTimeCountDownDisplay;
