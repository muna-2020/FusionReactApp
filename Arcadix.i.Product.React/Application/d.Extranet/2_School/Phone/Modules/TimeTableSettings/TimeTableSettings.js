//React related imports.
import React, { useReducer, useRef, useState } from "react";
import { connect } from 'react-redux';

//Module related files.
import * as TimeTableSettings_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/TimeTableSettings/TimeTableSettings_Hook';
import TimeTableSettings_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/Modules/TimeTableSettings/TimeTableSettings_ModuleProcessor';

//Components used in module.
import TimeTableClassTime from '@root/Application/d.Extranet/2_School/Phone/Modules/TimeTableSettings/TimeTableClassTime/TimeTableClassTime';
import TimeTableSubject from '@root/Application/d.Extranet/2_School/Phone/Modules/TimeTableSettings/TimeTableSubject/TimeTableSubject';


/**
* @name TimeTableSettings
* @param {object} props props
* @summary This component displays the TimeTableSettings data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the components with TimeTableClassTime and TimeTableSubject.
*/
const TimeTableSettings = props => {
    const errorMsgRef = useRef(null);
    const labelErrorRef = useRef(null);
    const [classTimeVisible, setClassTimeVisible] = useState(true);
    const [subjectTimeVisible, setsubjectTimeVisible] = useState(false);
    const [removeHeight, setremoveHeight] = useState(false);

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TimeTableSettings_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TimeTableSettings", ["TimeTableSettings_ModuleProcessor"]: new TimeTableSettings_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TimeTableSettings_ModuleProcessor.Initialize(objContext, objContext.TimeTableSettings_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TimeTableSettings_Hook, that contains all the custom hooks.
    * @returns null
    */
    TimeTableSettings_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTimeTableClassTimeResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableClassTime", objContext.props);
        let objSubjectTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableSubject", objContext.props)
        return (
            <div className="time-table-settings">
                <div className="time-table-title">
                    <span>Studenplan</span>
                    <img
                        src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation_mark.svg"}

                    />
                </div>
                <div className="error-message-red-wrapper" id="ErrorMsg" ref={errorMsgRef} style={{ "display": "none" }}>
                    <div className="error-message-red">
                        <img
                            src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation.png"}

                        />
                        <span className="label-error" id="labelError" ref={labelErrorRef}>Ein Fehler ist aufgetreten. Bitte prüfen Sie die unten markierten Felder</span>

                    </div>
                </div>
                <div className={removeHeight ? "time-table-class-time remove-height" : "time-table-class-time"}>

                    <div className="time-table-settings-title">
                        <span>{Localization.TextFormatter(objTimeTableClassTimeResource, 'HeadingText')}</span>
                        <button onClick={() => setClassTimeVisible(!classTimeVisible) || setsubjectTimeVisible(!subjectTimeVisible) || setremoveHeight(!removeHeight)}>
                            {
                                classTimeVisible ?
                                    <img
                                        src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/minus.png"}
                                        className="accordian-icon"

                                    />
                                    :
                                    <img
                                        src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/plus-circle.png"}
                                        className="accordian-icon"

                                    />
                            }
                        </button>
                    </div>
                    {
                        classTimeVisible ?
                            <TimeTableClassTime ErrorMsgRef={errorMsgRef} LabelErrorRef={labelErrorRef} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} Object_Framework_Services_TextResource={objTimeTableClassTimeResource} isLoadComplete={props.isLoadComplete} {...props} />
                            : <React.Fragment />


                    }
                </div>

                <div className={removeHeight ? "subject-time-table-setting removeHeight addHeight" : "subject-time-table-setting"}>
                    <div className="subject-table-title">
                        <span>{Localization.TextFormatter(objSubjectTextResource, 'HeadingText')}</span>
                        <button onClick={() => setsubjectTimeVisible(!subjectTimeVisible) || setClassTimeVisible(!classTimeVisible) || setremoveHeight(!removeHeight)}>
                            {
                                subjectTimeVisible ?
                                    <img
                                        src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/minus.png"}
                                        className="accordian-icon"

                                    />
                                    :
                                    <img
                                        src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/plus-circle.png"}
                                        className="accordian-icon"

                                    />
                            }
                        </button>
                    </div>
                    {
                        subjectTimeVisible ?
                            <TimeTableSubject ErrorMsgRef={errorMsgRef} LabelErrorRef={labelErrorRef} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} Object_Framework_Services_TextResource={objSubjectTextResource} isLoadComplete={props.isLoadComplete} {...props} />
                            : <React.Fragment />
                    }
                </div>
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name connect
 * @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(TimeTableSettings_ModuleProcessor.StoreMapList()))(TimeTableSettings);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TimeTableSettings_ModuleProcessor; 