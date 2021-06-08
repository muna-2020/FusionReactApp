//React Related Imports 
import React, { useImperativeHandle } from 'react';

// Module Imports
import NextTaskButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/NextTaskButton/NextTaskButton';
import EvaluationButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/EvaluationButton/EvaluationButton';
import HintButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/HintButton/HintButton';
import GroupEndButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/GroupEndButton/GroupEndButton';
import TestEndButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/TestEndButton/TestEndButton';
import TryAgainButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/TryAgainButton/TryAgainButton';
import Content from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/Content';
import Hint from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/Hint/Hint';
import AdditionalInformation from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/AdditionalInformation/AdditionalInformation';
import StandardProgressBar from '@root/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/ProgressBar';
import Index from '../../../Modules/5_Task/Index/Index';
import LoadSolutionButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/LoadSolutionButton/LoadSolutionButton';
import ResultResponse from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/ResultResponse/ResultResponse';
import SaveAndCloseButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/SaveAndCloseButton/SaveAndCloseButton';
import PreviousTaskButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/PreviousTaskButton/PreviousTaskButton';

/**
 * @name StandardTaskLayout
 * @param {object} props props object
 * @summary Standard Task Layout 
 * @returns {Component} StandardTaskLayout
 */
const StandardTaskLayout = (props) => {

    let ContentRef = React.createRef();

    useImperativeHandle(props.TaskLayoutRef, () => ({
        ...props.TaskLayoutRef.current,
        "OnClickTryAgainTask": () => {
            ContentRef.current.TryAgainTask();
        },
        "GetUserResponse": () => {
            return ContentRef.current.GetUserResponse();
        },
        "LoadSolution": (objLoadSolutionResult) => {
            ContentRef.current.LoadSolution(objLoadSolutionResult);
        },
        "ExecuteAction": (strActionType, objData) => {
            ContentRef.current.ExecuteAction(strActionType, objData);
        }

    }), [props]);

    /**
     * @name GetJXSForButton
     * @param {object} props props object
     * @summary Get Buttons for Test
     * @returns {Component} JSX for Buttons
     */
    const GetJXSForButton = (props) => {
        let jsxModulesToRender = [];
        let arrButtons = props.TestState.ButtonState;
        if (props.IsTaskPreview) {
            arrButtons = ["EvaluationButton", "LoadSolutionButton", "TryAgainButton","HintButton"];
        }
        if (arrButtons !== undefined) {
            arrButtons.forEach(ButtonName => {
                switch (ButtonName) {
                    case "SaveAndCloseButton":
                        jsxModulesToRender = [...jsxModulesToRender, (<SaveAndCloseButton {...props} />)]
                        break;
                    case "TestEndButton":
                        jsxModulesToRender = [...jsxModulesToRender, (<TestEndButton {...props} />)]
                        break;
                    case "TryAgainButton":
                        jsxModulesToRender = [...jsxModulesToRender, (<TryAgainButton {...props} />)]
                        break;
                    case "EvaluationButton":
                        let objButtonRequired = props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.IsShowLinearIndex === "Y" ? "yousty" : "standard" : "standard"
                        jsxModulesToRender = objButtonRequired === "standard" ? [...jsxModulesToRender, (<EvaluationButton {...props} />)] : ""
                        break;
                    case "LoadSolutionButton":
                        jsxModulesToRender = [...jsxModulesToRender, (<LoadSolutionButton {...props} />)]
                        break;
                    case "HintButton":
                        jsxModulesToRender = [...jsxModulesToRender, (<HintButton {...props} />)]
                        break;
                    case "PreviousTaskButton":
                        jsxModulesToRender = [...jsxModulesToRender, (<PreviousTaskButton {...props} />)]
                        break;
                    case "NextTaskButton":
                        jsxModulesToRender = [...jsxModulesToRender, (<NextTaskButton {...props} />)]
                        break;
                    case "GroupEndButton":
                        jsxModulesToRender = [...jsxModulesToRender, (<GroupEndButton {...props} />)]
                        break;
                }
            });
        }
        return jsxModulesToRender;
    }

    const GetContent = () => {
        return (
            <div className={props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.IsShowLinearIndex === "Y" ? "yousty-task-layout" : "standard-task-layout" : "standard-task-layout"}>
                <div className="task-layout-header">
                    <div className="left-block">
                        <div>
                            {props.TestState.TestDetails}
                        </div>
                        <div className="task-id">
                            {props.TestState.TaskPageProperties.PageJson.iPageId}
                        </div>
                        <div className="text-left">{props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.TopLeftTitle : ""}</div>
                    </div>
                    <div className="logo-block">
                        <div className="logo-image">
                            <img src={props.TestState.TestLogo ? props.TestState.TestLogo  : props.TestState.Logo} alt="" title={props.TestState.TaskPageProperties.PageJson.iPageId} />
                        </div>

                    </div>
                    <div className="right-block">
                        <StandardProgressBar {...props} />
                        <div className="reload-image">
                            {
                                props.TestState.IsInline
                                    ? <img alt="" src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/Icons/Reload.svg'}  onClick={() => { props.TaskLayoutRef.current.OnClickTryAgainTask(); }} />
                                    :
                                    <img src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/Icons/Reload.svg'} onClick={() => { location.reload() }} />
                            }
                        </div>
                    </div>
                </div>
                <div className="task-content">
                    <Content
                        {...props}
                        ContentRef={ContentRef}
                        ClientUserDetails={props.ClientUserDetails}
                        ComponentController={props.ComponentController}
                        JConfiguration={props.JConfiguration}
                    />
                    <AdditionalInformation {...props} />
                    <Hint {...props} />
                    <ResultResponse {...props} />
                </div>
                {
                    props.TestState.ButtonState ? props.TestState.ButtonState.length === 1 ?
                        <div className="task-footer" style={{ "justifyContent": "flex-end" }} >
                            {GetJXSForButton(props)}
                        </div>
                        :
                        <div className="task-footer">
                            {GetJXSForButton(props)}
                        </div> :
                        <div className="task-footer">
                            {GetJXSForButton(props)}
                        </div>
                }
                {<Index {...props} />}
            </div>
        );
    };

    return GetContent();
};

export default StandardTaskLayout;
