//React Related Imports 
import React from 'react';
import { connect } from "react-redux";

//TryAgainTask_ModuleProcessor  where Api is get called and Returning Popup
import TryAgainButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/TryAgainButton/TryAgainButton_ModuleProcessor';

/**
 * @name ResultButton
 * @summary Result PopUp Button
 * @param {any} props
 * @returns {object}  
 */
const TryAgainButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary  which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, TryAgainButton_ModuleProcessor: new TryAgainButton_ModuleProcessor() };

    /**
     * @name TryAgainClick
     * @summary where AnswerJson  and PageJson is sending as arguments to TryAgainClickMethod 
     */
    const TryAgainClick = (event) => {
        event.preventDefault();
        objContext.TryAgainButton_ModuleProcessor.TryAgainButtonClick(objContext)
    }

    return (
        props.ShowTryAgainButton || props.TestState.Mode === "TaskPreview" || props.IsTaskPreview ?
            <WrapperComponent
                ComponentName={"Button"}
                ParentProps={props}
                Meta={{ "ClassName": "" }}
                Events={{ "OnClickEventHandler": TryAgainClick }}
                Resource={{ "ButtonText": Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "TryAgainButtonText"), "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }} /> :
            <React.Fragment />
    );
}

export default connect(TestApplicationBase_Hook.MapStoreToProps(TryAgainButton_ModuleProcessor.StoreMapList()))(TryAgainButton);
