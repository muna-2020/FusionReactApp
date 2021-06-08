//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TimeTableSchedule_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedule_Hook';
import TimeTableSchedule_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedule_ModuleProcessor';

//Components used in module.
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';

/**
* @name TimeTableSchedule
* @param {object} props props
* @summary This component displays the TimeTableSchedule data.
* @returns {object} div that encapsulated the TimeTableSchedule div with its details.
*/
const TimeTableSchedule = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TimeTableSchedule_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TimeTableSchedule", ["TimeTableSchedule_ModuleProcessor"]: new TimeTableSchedule_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TimeTableSchedule_ModuleProcessor.Initialize(objContext, objContext.TimeTableSchedule_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in LearningJournal_Hook, that contains all the custom hooks.
    * @returns null
    */
    TimeTableSchedule_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        let strClassId = state.objSelClass ? state.objSelClass["uClassId"] : state.strUserPreferenceClassId;
        let objData = objContext.TimeTableSchedule_ModuleProcessor.GetData(objContext);
        if (!state.blnInitialDataLoaded) {
            let arrFinaldata = objContext.TimeTableSchedule_ModuleProcessor.FormDataToDisplay(objContext, objData);
            objContext.dispatch({ type: 'SET_STATE', payload: { "arrDisplayData": arrFinaldata, "blnInitialDataLoaded": true} });
        }

        return (
            state.blnInitialDataLoaded ?
                <div className="WrpCvr time-table-schedule">
                    <div className="top-head-padd" id="TimeTableScheduleHeader">
                        <div className="top-head">
                            <div className="top-head-left">
                                <span>Schuljahr:</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"TimeTableSchedule_SchoolYear"} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"TimeTableSchedule_SchoolYear"}
                                            Meta={objContext.TimeTableSchedule_ModuleProcessor.GetSchoolYearDropdownMetaData()}
                                            Data={objContext.TimeTableSchedule_ModuleProcessor.GetSchoolYearDropdownData(objData, objContext)}
                                            Resource={objContext.TimeTableSchedule_ModuleProcessor.GetResourceData()}
                                            Events={objContext.TimeTableSchedule_ModuleProcessor.GetSchoolYearDropdownEvents(objContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                                <span>Klasse:</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"TimeTableSchedule_ClassDropDown"} JConfiguration={props.JConfiguration} >
                                        <ClassDropDown
                                            id="TimeTableSchedule_ClassDropDown"
                                            Data={objContext.TimeTableSchedule_ModuleProcessor.GetClassDropDownData(objData.arrClass, objData.objTextResource)}
                                            DisplayColumn="vClassName"
                                            ValueColumn="uClassId"
                                            SelectedValue={strClassId}
                                            JConfiguration={props.JConfiguration}
                                            ClientUserDetails={props.ClientUserDetails}
                                            OnChangeEventHandler={(objClass, p2) => { objContext.TimeTableSchedule_ModuleProcessor.OnClassDropDownChange(objContext, objClass, objData.arrTeacher, objData.arrSchoolYearPeriod); }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                                <span>Lehrperson:</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"TimeTableSchedule_Pupil"} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"TimeTableSchedule_Pupil"}
                                            Meta={objContext.TimeTableSchedule_ModuleProcessor.GetTeacherDropdownMetaData()}
                                            Data={objContext.TimeTableSchedule_ModuleProcessor.GetTeacherDropdownData(objContext)}
                                            Resource={objContext.TimeTableSchedule_ModuleProcessor.GetResourceData()}
                                            Events={objContext.TimeTableSchedule_ModuleProcessor.GetTeacherDropdownEvents(objContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                            </div>
                            <div className="top-head-right">
                                <div className="button brown-button" onClick={() => { objContext.TimeTableSchedule_ModuleProcessor.OnClickShow(objContext); }}>Anzeigen</div>
                            </div>
                        </div>
                    </div>

                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        id="TimeTableSchedule" Meta={objContext.TimeTableSchedule_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                        <table>
                            <tr>
                                <th />
                                {GetDaysElements(objData.arrDayData)}
                            </tr>
                            <tr>
                                <td />
                                {
                                    GetSubjectTeacherTextElements(objData.arrDayData, objData.objTextResource.SubjectAndTeacherText)
                                }
                            </tr>
                            {
                                GetSegmentElements()
                            }
                        </table>
                    </WrapperComponent>
                </div> : ''
        );

        /**
        * @name GetDaysElements
        * @param {Array} arrDayData DayData
        * @summary Forms the whole jsx required for day
        * @returns {Array} DaysElements
        */
        function GetDaysElements(arrDayData) {
            let arrDaysElements = arrDayData.map((day, indx) => {
                return (
                    <th>
                        {day.t_LearnCoacher_Planner_TimeTable_Day_Data[0].vTimeTableDayShortName}
                    </th>
                );
            });
            return arrDaysElements;
        }

        /**
        * @name GetSubjectTeacherTextElements
        * @param {Array} arrDayData DayData
        * @param {String} strText Text
        * @summary Forms the whole jsx required for SubjectTeacherText
        * @returns {Array} SubjectTeacherTextElements
        */
        function GetSubjectTeacherTextElements(arrDayData, strText) {
            let arrSubjectTeacherTextElements = arrDayData.map((day, indx) => {
                return (
                    <td>
                        {strText}
                    </td>
                );
            });
            return arrSubjectTeacherTextElements;
        }

        /**
        * @name GetSegmentElements
        * @summary Forms the whole jsx required for Segment
        * @returns {Array} TimeTableElements
        */
        function GetSegmentElements() {
            let arrTimeTableElements = state.arrDisplayData.map((clsTime, clsTIdx) => {
                return (
                    <tr>
                        <td>{clsTime.cIsBreak == "N" ? clsTime.vClassFrom + "-" + clsTime.vClassTo : ''}</td>
                        {
                            clsTime.arrDays.map((clsDay, clsDIdx) => {
                                return (
                                    <td onClick={() => { OpenPopUp(clsTime, clsDay); }}>
                                        {clsTime.cIsBreak == "N" ?
                                            <table>
                                                <tr>
                                                    {clsDay.arrSegments.sort((a, b) => { if (a.objClassGroup && b.objClassGroup) { return a.objClassGroup.iDisplayOrder - b.objClassGroup.iDisplayOrder; } }).map((seg, segIdx) => {
                                                        return (
                                                            <React.Fragment>
                                                                <td
                                                                    className="subject-name"
                                                                    style={{
                                                                        background: seg.objSubject ? seg.vColor : null,
                                                                        width: (90 - (clsDay.arrSegments.length * 30).toString() + "%")
                                                                    }}
                                                                >
                                                                    {seg.objSubject? seg.objSubject.t_TestDrive_Subject_Data[0].vSubjectShortName : ""}
                                                                    <span className="subject-assign-class">{
                                                                        seg.objSubject ? seg.objClassGroup ? seg.objClassGroup.t_TestDrive_Member_Class_Group_Data[0].vGroupName : '' : ""}
                                                                    </span>
                                                                    {" "}
                                                                </td>
                                                                <td
                                                                    className="subject-name"
                                                                    style={{
                                                                        width: (60 - (clsDay.arrSegments.length * 20).toString() + "%")
                                                                    }}
                                                                >
                                                                    {seg.objSubject ? seg.objTeacher.vShortCut : ""}
                                                                </td>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </tr>
                                            </table>
                                            :   <table>
                                                    <tr>
                                                        <td style={{ background: "#DCDCDC", width: "100%" }} />
                                                    </tr>
                                                </table>
                                        }
                                    </td>
                                );
                            })
                        }
                    </tr>
                );
            });
            return arrTimeTableElements;
        }

        /**
        * @name OpenPopUp
        * @param {object} selTimeForEdit TimeForEdit
        * @param {object} selDayForEdit DayForEdit
        * @summary Opens the time table schedule popup
        */
        function OpenPopUp(selTimeForEdit, selDayForEdit) {
            if (selTimeForEdit.cIsBreak == "N") {
                Popup.ShowPopup({
                    Data: {
                        objData: {
                            arrClass: () => { return GetClassDataForPopUp(); },
                            arrClassGroupData: () => { return GetClassGroupDataForPopUp(); },
                            arrColorData: () => { return GetColorDataForPopUp(); },
                            arrDayData: () => { return GetDayDataForPopUp(); },
                            arrSchoolYearPeriod: () => { return GetSchoolYearPeriodDataForPopUp(); },
                            arrSegmentData: () => { return GetSegmentDataForPopUp(); },
                            arrSubjectData: () => { return GetSubjectDataForPopUp(); },
                            arrTeacher: () => { return GetTeacherDataForPopUp(); },
                            arrTimeData: () => { return GetTimeDataForPopUp(); },
                            arrTimeTableData: () => { return GetTimeTableDataForPopUp(); },
                            selClass: state.objSelClass,
                            selSchoolYearPeriod: state.objSelSchoolYearPeriod,
                            selTimeForEdit: selTimeForEdit,
                            selDayForEdit: selDayForEdit,
                            Object_Extranet_Teacher_TimeTableSegment: objContext.props.Object_Extranet_Teacher_TimeTableSegment
                        }
                    },
                    Meta: {
                        PopupName: 'TimeTableSchedulePopUp',
                        ShowHeader: false,
                        ShowCloseIcon: false,
                        Height: '98%',
                        Width: '98%'
                    },
                    Resource: {
                        Text: objData.objTextResource,
                        SkinPath: JConfiguration.ExtranetSkinPath
                    },
                    Events: {
                    },
                    CallBacks: {
                    }
                });
            }
        }

        /**
        * @name GetClassDataForPopUp
        * @summary Returns class required for popup
        * @returns {Array} Class
        */
        function GetClassDataForPopUp() {
            return [...objData.arrClass];
        }

        /**
        * @name GetClassGroupDataForPopUp
        * @summary Returns ClassGroup required for popup
        * @returns {Array} ClassGroup
        */
        function GetClassGroupDataForPopUp() {
            return [...objData.arrClassGroupData];
        }

        /**
        * @name GetColorDataForPopUp
        * @summary Returns Color required for popup
        * @returns {Array} Color
        */
        function GetColorDataForPopUp() {
            return [...objData.arrColorData];
        }

        /**
        * @name GetSchoolYearPeriodDataForPopUp
        * @summary Returns SchoolYearPeriod required for popup
        * @returns {Array} SchoolYearPeriod
        */
        function GetSchoolYearPeriodDataForPopUp() {
            return [...objData.arrSchoolYearPeriod];
        }

        /**
        * @name GetDayDataForPopUp
        * @summary Returns Day required for popup
        * @returns {Array} Day
        */
        function GetDayDataForPopUp() {
            return [...objData.arrDayData];
        }

        /**
        * @name GetTimeDataForPopUp
        * @summary Returns Time required for popup
        * @returns {Array} Time
        */
        function GetTimeDataForPopUp() {
            return [...objData.arrTimeData];
        }

        /**
        * @name GetSubjectDataForPopUp
        * @summary Returns Subject required for popup
        * @returns {Array} Subject
        */
        function GetSubjectDataForPopUp() {
            return [...objData.arrSubjectData];
        }

        /**
        * @name GetSegmentDataForPopUp
        * @summary Returns Segment required for popup
        * @returns {Array} Segment
        */
        function GetSegmentDataForPopUp() {
            return [...objData.arrSegmentData];
        }

        /**
        * @name GetTeacherDataForPopUp
        * @summary Returns Teacher required for popup
        * @returns {Array} Teacher
        */
        function GetTeacherDataForPopUp() {
            return [...objData.arrTeacher];
        }

        /**
        * @name GetTimeTableDataForPopUp
        * @summary Returns TimeTable Display required for popup
        * @returns {Array} TimeTable Display
        */
        function GetTimeTableDataForPopUp() {
            return [...state.arrDisplayData];
        }
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TimeTableSchedule_ModuleProcessor.StoreMapList()))(TimeTableSchedule);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TimeTableSchedule_ModuleProcessor; 