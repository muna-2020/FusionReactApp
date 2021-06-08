//react Related Import
import React from 'react';

//Importing Onclick Handle imports
import SaveAndCloseButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/SaveAndCloseButton/SaveAndCloseButton_ModuleProcessor';
import TestApplicationTask_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_ModuleProcessor';


/**
 * @name SaveAndCloseButton
 * @summary Next Task load on click of button
 * @param {any} props
 * @returns {object} 
 * 
 */
const SaveAndCloseButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, SaveAndCloseButton_ModuleProcessor: new SaveAndCloseButton_ModuleProcessor(), objTestApplicationTask_ModuleProcessor: new TestApplicationTask_ModuleProcessor() };

    /**
     * @name NextClick
     * @summary For Next Click and sending Answer Json
     * @returns {[]} state and dispatch
     */
    const SaveAndClose = (event) => {
        event.preventDefault();
        let AnswerJson = objContext.props.TaskLayoutRef.current.GetUserResponse();
        var objParams = {
            "AnswerJson": AnswerJson["Containers"],
            "PageJson": objContext.props.TestState.TaskPageProperties.PageJson,
            "SaveAndClose": true
        };
        objContext.SaveAndCloseButton_ModuleProcessor.ShowTaskConfirmationPopup(objContext, objParams)
    }


    return (
        <WrapperComponent
            ComponentName={"Button"}
            Meta={{ "ClassName": "" }}
            ParentProps={props}
            Events={{ "OnClickEventHandler": SaveAndClose }}
            Resource={{ "ButtonText": Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "SaveAndCloseButton") ? Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "SaveAndCloseButton") : "Save and Close", "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }} />
    );
}

export default SaveAndCloseButton;

