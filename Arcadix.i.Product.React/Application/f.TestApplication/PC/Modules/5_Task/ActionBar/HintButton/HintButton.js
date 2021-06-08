//React related import
import React from 'react';

//Component related import
import HintButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/HintButton/HintButton_ModuleProcessor';

/**
 * @name  HintButton
 * @summary  Answer Hint Button 
 * @param {any} props
 * @returns {object} 
 * 
 */

const HintButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary  which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, HintButton_ModuleProcessor: new HintButton_ModuleProcessor() };

    /**
     * @name HintButtonClick
     * @summary  For send IsShowhint property as true
     */
    const HintButtonClick = (event) => {
        objContext.HintButton_ModuleProcessor.HintButtonClick()
    }

    return (
        props.TestState.TaskPageProperties.PageJson.TaskHint ?
            <WrapperComponent
                ComponentName={"Button"}
                Meta={{ "ClassName": "button" }}
                ParentProps={props}
                Events={{ "OnClickEventHandler": HintButtonClick }}
                Resource={{ "ButtonText": Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "HintButtonText") ? Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "HintButtonText") : "Hint" , "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }} /> :
            <React.Fragment />
    );

}
export default HintButton;