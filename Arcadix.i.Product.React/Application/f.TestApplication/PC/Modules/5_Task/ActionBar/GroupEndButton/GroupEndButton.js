//react Related Import
import React from 'react';

//Module related imports
import GroupEndButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/GroupEndButton/GroupEndButton_ModuleProcessor';
import TestApplicationTask_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_ModuleProcessor';
import NextTaskButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/NextTaskButton/NextTaskButton_ModuleProcessor';


/**
 * @name GroupEndButton
 * @summary Group End Button
 * @param {any} props
 * @returns {object} 
 * 
 */
const GroupEndButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, NextTaskButton_ModuleProcessor: new NextTaskButton_ModuleProcessor(), objTestApplicationTask_ModuleProcessor: new TestApplicationTask_ModuleProcessor(), GroupEndButton_ModuleProcessor: new GroupEndButton_ModuleProcessor() };

    /**
     * @name GroupEndClick
     * @summary For Group End Click
     * @returns {[]} state and dispatch
     */
    const GroupEndClick = (event) => {
        if (typeof objInterval !== "undefined") {
            clearInterval(objInterval);
        }
        objContext.GroupEndButton_ModuleProcessor.GroupEndConfirmationPopup(objContext)
    }

    return (
        objContext.props.TestState.LinearTestProperties && objContext.props.TestState.LinearTestProperties.IsShowLinearIndex === "Y" ?
            <WrapperComponent
                ComponentName={"Button"}
                Events={{ "OnClickEventHandler": GroupEndClick }}
                Meta={{ "ClassName": "" }}
                ParentProps={props}
                Resource={{ "ButtonText": Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "GroupEndButtonText"), "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }} /> : <React.Fragment />
    );
}

export default GroupEndButton;

