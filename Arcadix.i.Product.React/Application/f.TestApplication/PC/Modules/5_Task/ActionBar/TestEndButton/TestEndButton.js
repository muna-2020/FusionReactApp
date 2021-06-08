//react Related Import
import React from 'react';

//Handle's onclick event
import TestEndButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/TestEndButton/TestEndButton_ModuleProcessor';

/**
 * @name TestEndButton
 * @summary Next Task load on click of button
 * @param {any} props
 * @returns {object} 
 * 
 */
const TestEndButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, TestEndButton_ModuleProcessor: new TestEndButton_ModuleProcessor() };

    /**
     * @name NextClick
     * @summary For Next Click and sending Answer Json
     * @returns {[]} state and dispatch
     */
    const NextClick = (event) => {
        objContext.TestEndButton_ModuleProcessor.TestEndClick(objContext)
    }

    return (
        props.TestState.TestEndButtonRequired ?
            <WrapperComponent
                ComponentName={"Button"}
                ParentProps={props}
                Meta={{ "ClassName": "" }}
                Events={{ "OnClickEventHandler": NextClick }}
                Resource={{ "ButtonText": Localization.TextFormatter(props.TextResources, "TestEndButton"), "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }} /> : ""
    );
}

export default TestEndButton;

