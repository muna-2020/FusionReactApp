//React related imports.
import React, { useReducer, useRef } from "react";
import { connect } from 'react-redux';

//Module related files.
import * as TimeTableSettings_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSettings_Hook';
import TimeTableSettings_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSettings_ModuleProcessor';

//Components used in module.
import TimeTableClassTime from '@root/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableClassTime/TimeTableClassTime';
import TimeTableSubject from '@root/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSubject/TimeTableSubject';


/**
* @name TimeTableSettings
* @param {object} props props
* @summary This component displays the TimeTableSettings data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the components with TimeTableClassTime and TimeTableSubject.
*/
const TimeTableSettings = props => {

    const errorMsgRef = useRef(null);
    const labelErrorRef = useRef(null);

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
        return (
            <React.Fragment>
                <div className="time-table-setting-wrapper">
                    <div className="top-spacing" id="TopSpacing" />
                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="TimeTableSetting" Meta={objContext.TimeTableSettings_ModuleProcessor.GetTimeTableFillHeightMetaData()} ParentProps={{ ...props }}>
                        <div className="light-brown-bg" id="TimeTableSetting">
                            <div className="padding-20" id="ErrorMsg" ref={errorMsgRef} style={{ "display": "none" }}>
                                <div className="error-message-red">
                                    <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/exclamation.png"} alt="" />
                                    <span id="labelError" ref={labelErrorRef}/>
                                </div>
                            </div>
                            <div className="time-table-settings">
                                <div className="time-table-class-time">
                                    <PerformanceProfiler ComponentName={'ClassTimeComponent'} JConfiguration={props.JConfiguration} >
                                        <TimeTableClassTime ErrorMsgRef={errorMsgRef} LabelErrorRef={labelErrorRef} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} Object_Framework_Services_TextResource={Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableClassTime", objContext.props)} isLoadComplete={props.isLoadComplete} {...props} />
                                    </PerformanceProfiler>
                                </div>
                                <div className="subjects" id="SubjectTimeTableSetting">
                                    <PerformanceProfiler ComponentName={'SchoolSubjectComponent'} JConfiguration={props.JConfiguration} >
                                        <TimeTableSubject ErrorMsgRef={errorMsgRef} LabelErrorRef={labelErrorRef} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} Object_Framework_Services_TextResource={Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableSubject", objContext.props)} isLoadComplete={props.isLoadComplete} {...props} />
                                    </PerformanceProfiler>
                                </div>
                            </div>
                        </div>
                    </WrapperComponent>
                </div>
            </React.Fragment>
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