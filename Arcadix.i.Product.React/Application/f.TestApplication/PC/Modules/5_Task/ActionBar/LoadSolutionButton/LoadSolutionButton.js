//React Related Imports 
import React, { useImperativeHandle, useRef } from 'react';
import { connect } from "react-redux";

//LoadSolutionClick_ModuleProcessor  where Api is get called and Returning Popup
import LoadSolution_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/LoadSolution/LoadSolution_ModuleProcessor';

/**
 * @name  LoadSolutionButton
 * @summary  For returning Task Solution
 * @param {any} props
 * @returns {object} 
 * 
 */
const LoadSolutionButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary  which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, "LoadSolutionButton_Ref": useRef(null), LoadSolution_ModuleProcessor: new LoadSolution_ModuleProcessor() };

    useImperativeHandle(objContext.LoadSolutionButton_Ref, () => ({
        "GetLatestContext": () => {
            return objContext;
        }
    }), [props]);

    /**
     * @name LoadSolutionClick
     * @summary where AnswerJson and PageJson is sending as arguments to LoadSolutionClick Method
     */
    const LoadSolutionClick = (event) => {
        ApplicationState.SetProperty("blnShowAnimation", true);
        event.preventDefault();
        let AnswerJson = objContext.props.TaskLayoutRef.current.GetUserResponse();
        var objParams = {
            "AnswerJson": AnswerJson["Containers"],
            "iPageId": objContext.props.TestState.TaskPageProperties.PageJson["iPageId"],
            "PageJson": objContext.props.TestState.TaskPageProperties["IsEditorPreview"] === "Y" ? objContext.props.TestState.TaskPageProperties.PageJson : null
        };
        ApplicationState.SetProperty('IsShowAdditionalInformation', true);
        objContext.LoadSolution_ModuleProcessor.LoadSolutionClick(objContext, objParams)
    }

    return (
        props.ShowLoadSolutiontButton || props.TestState.Mode === "TaskPreview" || props.IsTaskPreview ?
            <WrapperComponent
                ComponentName={"Button"}
                Meta={{ "ClassName": "button" }}
                ParentProps={props}
                Events={{ "OnClickEventHandler": LoadSolutionClick }}
                Resource={{ "ButtonText": Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "LoadSolutionButtonText") ? Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "LoadSolutionButtonText") : "Load Solution", "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }} /> : <React.Fragment />
    );
};

export default connect(TestApplicationBase_Hook.MapStoreToProps(LoadSolution_ModuleProcessor.StoreMapList()))(LoadSolutionButton);