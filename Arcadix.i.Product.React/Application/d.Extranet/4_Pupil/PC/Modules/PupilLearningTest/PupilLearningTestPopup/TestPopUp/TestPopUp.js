//React imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Common imports
import DirectLogin from "@root/Application/f.TestApplication/PC/InlineStart/DirectLogin/DirectLogin";

//Module specific imports
import * as TestPopUp_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/TestPopUp/TestPopUp_Hook';
import TestPopUp_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/TestPopUp/TestPopUp_ModuleProcessor'

//Inline Images import
import imgClose from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/TestPopUp/close.svg?inline';

/**
* @name TestPopUp
* @param {object} props Passes props
* @summary Forms the whole jsx required for the popup.
* @returns {object} jsx, div
*/
const TestPopUp = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dispatch
   */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TestPopUp_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestPopUp", ["TestPopUp_ModuleProcessor"]: new TestPopUp_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TestPopUp_Hook, that contains all the custom hooks.
    * @returns null
    */
    TestPopUp_Hook.Initialize(objContext);

    let objLoginDetails = {
        "Username": props.Data.Username,
        "iCycleRepetition": props.Data.iCycleRepetition,
        "uCycleId": props.Data.uCycleId,
        "uTestId": props.Data.uTestId,
        "uClassId": props.Data.uClassId,
        "uPupilId": props.Data.uPupilId,
        "SchoolYearPeriodId": props.Data.uSchoolYearPeriodId,
        "TaskIdToInclude": objContext.props.Data.TaskToInclude
    };
    return (
        <div className="open-test-popup">
            <div className="header">
                <div className="close" onClick={() => { Popup.ClosePopup(props.Id); }}>
                    <span>{Localization.TextFormatter(props.Resource.Text, 'Close')}</span>
                    <img
                        src={imgClose}
                        alt=""
                        className="close-icon"
                    />
                </div>
            </div>
            <DirectLogin LoginDetails={objLoginDetails} JConfiguration={{ ...JConfiguration }} />
        </div>

    );
};

/**
* @name DynamicStyles
* @summary Required for css
* @returns {Array} arrStyles
*/
TestPopUp.DynamicStyles = () => {
    return [JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/WorkTest/ProgressReport/ProgressReport_SummaryPopup.css"];
};

/**
* @name MapStateToProps
* @param {object} objState State object
* @param {object} objOwnProps Props passed
        * @summary Returns list of objects used in the module
* @return {Array} Array of object list
        */
const MapStateToProps = () => {
    return ExtranetBase_Hook.MapStoreToProps([
        { "StoreKey": "ApplicationState", "DataKey": "PupilLearningTestPopupClose" },
    ]);
};
export default connect(ExtranetBase_Hook.MapStoreToProps(TestPopUp_ModuleProcessor.StoreMapList()))(TestPopUp);