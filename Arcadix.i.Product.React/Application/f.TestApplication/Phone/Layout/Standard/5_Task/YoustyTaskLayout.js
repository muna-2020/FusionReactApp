//React Related Imports 
import React, { useImperativeHandle } from 'react';

// Module Imports
import NextTaskButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/NextTaskButton/NextTaskButton';
import GroupEndButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/GroupEndButton/GroupEndButton';
import EvaluationButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/EvaluationButton/EvaluationButton';
import HintButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/HintButton/HintButton';
import TestEndButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/TestEndButton/TestEndButton';
import PreviousTaskButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/PreviousTaskButton/PreviousTaskButton';
import TryAgainButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/TryAgainButton/TryAgainButton';
import Content from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/Content';
import Hint from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/Hint/Hint';
import AdditionalInformation from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/AdditionalInformation/AdditionalInformation';
import StandardProgressBar from '@root/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/ProgressBar';
import Index from '@root/Application/f.TestApplication/PC/Modules/5_Task/Index/Index';
import LoadSolutionButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/LoadSolutionButton/LoadSolutionButton';
import ResultResponse from '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/ResultResponse/ResultResponse';
import SaveAndCloseButton from '@root/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/SaveAndCloseButton/SaveAndCloseButton';
import GroupTimeCountDownDisplay from '@root/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/GroupTimeCountDownDisplay/GroupTimeCountDownDisplay';

//Component Loader Import
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';

/**
 * @name YoustyTaskLayout
 * @param {object} props props object
 * @summary Standard Task Layout 
 * @returns {Component} YoustyTaskLayout
 */
const YoustyTaskLayout = (props) => {

    let ContentRef = React.createRef();

    useImperativeHandle(props.TaskLayoutRef, () => ({
       "OnClickTryAgainTask": () => {
           ContentRef.current.TryAgainTask();
       },
       "GetUserResponse": () => {
            return ContentRef.current.GetUserResponse();
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
            arrButtons = ["EvaluationButton","LoadSolutionButton0","TryAgainButton"];
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
        let Content = props.ComponentController.GetComponent("Content");
        return (
            <div style={{ padding: "0 30px" }}>
                <table className="taskHead">
                    <tbody>
                        <tr>
                            <td style={{ "padding-top": "22px;", "vertical-align": "top", "width": "39%"}}>{props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.TopLeftTitle : ""}</td>
                            <td />
                            <td className="Headerstart"> 
                                <div className="logo" />
                                <div className="task-id">
                                    {props.TestState.TaskPageProperties.PageJson.iPageId}
                                </div>
                            </td>
                            
                            <td />
                            <td>
                                <StandardProgressBar {...props} />
                            </td>
                        </tr>
                        <tr className="topClientTitle">
                            <td colSpan={5}>
                                <span>
                                    TESTAUFGABEN
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="taskWrapper yousty">
                    <Content 
                        {...props}
                        ContentRef={ContentRef}
                        ClientUserDetails={props.ClientUserDetails}
                        ComponentController={props.ComponentController}
                        JConfiguration={props.JConfiguration}        
                    />
                    <div>
                        <AdditionalInformation {...props} />
                    </div>
                    <div>
                        <Hint {...props} />
                    </div>
                </div>
                <div>
                    <ResultResponse {...props} />
                </div>
                <div className="taskFooter">
                    <div className="w100 tal footer-flex yousty">
                        {GetJXSForButton(props)}
                    </div>
                </div>
                {<Index {...props} />}
            </div>
        );
    };

    return GetContent();
};

export default YoustyTaskLayout;
