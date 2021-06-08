//React related imports
import React from 'react';

//TestApplicationIntroduction_ModuleProcessor for Events Method.
import StartButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/4_Introduction/StartButton/StartButton_ModuleProcessor';

/**
 * @name StartButton
 * @summary Onclick  of start method.It will load the task.
 * @param {any} props
 */
const StartButton = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TestApplicationIntroduction_ModuleProcessor object in to object, which can be passed across method in the module and used
     */
    const objContext = { props, StartButton_ModuleProcessor: new StartButton_ModuleProcessor() };

    /**
    * @name return
    * @returns {object} jsx 
    */
    return (
        <div className="introFooter tal">
            <WrapperComponent
                ComponentName={"Button"}
                Meta={{ "ClassName": "introBtn" }}
                Events={{ "OnClickEventHandler": () => objContext.StartButton_ModuleProcessor.HandleStartButtonClick(objContext) }}
                ParentProps={props}
                Resource={{ "ButtonText": Localization.TextFormatter(props.TextResources, 'TestApplicationIntroductionPage_TestStartButtonText'), "ButtonImagePath": props.JConfiguration.TestApplicationSkinPath }}
            />
        </div>
    );
};

export default StartButton;