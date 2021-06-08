//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TimeTableSchedulePopUp_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedulePopUp/TimeTableSchedulePopUp_Hook';
import TimeTableSchedulePopUp_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedulePopUp/TimeTableSchedulePopUp_ModuleProcessor';

//Inline Images import
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
* @name TimeTableSchedulePopup
* @param {object} props props
* @summary This component displays the TimeTableSchedulePopup data.
* @returns {object} div that encapsulated the TimeTableSchedulePopup div with its details.
*/
const TimeTableSchedulePopup = props => {
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [popUpState, pdispatch] = useReducer(ExtranetBase_Hook.Reducer, TimeTableSchedulePopUp_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objPopUpContext = { popUpState, props, pdispatch, ["TimeTableSchedulePopUp_ModuleProcessor"]: new TimeTableSchedulePopUp_ModuleProcessor() };

    var dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    let objTextResource = popUpState.objTextResource;

    if (!popUpState.blnInitialLoadComplete) {
        let arrData = objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetTimeTableData(objPopUpContext);
        pdispatch({ type: "SET_STATE", payload: { "arrTimeTableForDisplay": arrData, "blnInitialLoadComplete": true } });
    }

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in LearningJournal_Hook, that contains all the custom hooks.
    * @returns null
    */
    TimeTableSchedulePopUp_Hook.Initialize(objPopUpContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.Initialize(objPopUpContext, objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor);

    return (
        <div className="light-brown-bg tts-popup">
            <div className="tts-popup-header" id="TTSHeader">
                <div className="tts-popup-header-left">
                    <h2>{Localization.TextFormatter(objTextResource, 'CaptureLessons')} {popUpState.selClass.vClassName}</h2>
                    <p>
                        {
                            popUpState.selSchoolYearPeriod.t_TestDrive_Member_Class_SchoolYearPeriod_Data[0].vSchoolYearName
                        }
                        {" ( " +
                            new Date(popUpState.selSchoolYearPeriod.dtFromDate).toLocaleDateString("de-DE", dateOptions) +
                            " - " +
                            new Date(popUpState.selSchoolYearPeriod.dtToDate).toLocaleDateString("de-DE", dateOptions) +
                            " )"}
                    </p>
                </div>
                <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                    {Localization.TextFormatter(objTextResource, 'ShutDownText')}
                    <img src={CloseImage} alt="" />
                </span>
            </div>
            <WrapperComponent
                ComponentName={"FillHeight"}
                id="TimeTableSchedule_Popup"
                Meta={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetFillHeightMetaData(objPopUpContext)}
                ParentReference={`EditorPopupParent${props.id}`}
                className="bgStyle" scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <div className="tts-wrapper">
                    <div className="tts-flex">
                        <div className="tts-left">
                            <h2>{Localization.TextFormatter(objTextResource, 'Popup_1_Text')}</h2>
                            <div className="subject-teamwork">
                                <div className="subject-teamwork-block">
                                    <span>{Localization.TextFormatter(objTextResource, 'Class')}</span> <b>{popUpState.selClass.vClassName}</b>
                                </div>
                                <div className="subject-teamwork-block">
                                    <span>{Localization.TextFormatter(objTextResource, 'Subject')}</span>
                                    <div className="content-dropdown">
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"TimeTableSchedule_Popup_Subject"}
                                            Meta={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetSubjectDropdownMetaData()}
                                            Data={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetSubjectDropdownData(objPopUpContext)}
                                            Resource={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetResourceData()}
                                            Events={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetSubjectDropdownEvents(objPopUpContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </div>
                                </div>
                                <div className="subject-teamwork-block">
                                    <span>{Localization.TextFormatter(objTextResource, 'ColorLabel')}</span>
                                    <div className="color-dropdown">
                                        <button
                                            className="color-dropdown-trigger"
                                            onClick={() => {
                                                objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.ToggleColorPicker(objPopUpContext);
                                            }}
                                        >
                                            <div className="color-picker-flex">
                                                <div className="color-picker" style={{ backgroundColor: popUpState.selColor.vColorCode }} />
                                                <span>{popUpState.selColor.t_LearnCoacher_TimeTable_Color_Data[0].vColorName}</span>
                                            </div>
                                            <img src={AngleDownImage} alt="" />
                                        </button>
                                        {popUpState.blnShowColorPicker ?
                                            <ul className="color-dropdown-list show">
                                                {GetColorList()}
                                            </ul>
                                            : ""}
                                    </div>
                                </div>
                                <div className="subject-teamwork-block">
                                    <span>{Localization.TextFormatter(objTextResource, 'Teacher')}</span>
                                    <div className="content-dropdown">
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"TimeTableSchedule_Popup_Pupil"}
                                            Meta={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetTeacherDropdownMetaData()}
                                            Data={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetTeacherDropdownData(objPopUpContext)}
                                            Resource={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetResourceData()}
                                            Events={objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.GetTeacherDropdownEvents(objPopUpContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tts-right">
                            <h2>{Localization.TextFormatter(objTextResource, 'Popup_2_Text')}</h2>
                            <div className="lesson-table">
                                <table className="lesson-table">
                                    <tr>
                                        <th />
                                        {GetDays()}
                                    </tr>
                                    {GetTimeTableData()}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </WrapperComponent>
            <div className="wrap tts-footer" id="TTSFooter">
                <button onClick={e => Popup.ClosePopup(props.Id)} className="button brown-button">
                    {Localization.TextFormatter(objTextResource, 'Close')}
                </button>
                <div className="footer-right">
                    <div className="button yellow-button" onClick={() => { objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.SaveData(objPopUpContext); }}>
                        {Localization.TextFormatter(objTextResource, 'SaveAndContinue')}
                    </div>
                    <div onClick={() => { OnClickSaveAndClose(); }} className="button yellow-button">
                        {Localization.TextFormatter(objTextResource, 'SaveAndClose')}
                    </div>
                </div>
            </div>
        </div>
    );

    function GetColorList() {
        let arrColorElements = popUpState.arrColor.map(c => {
            return (
                <li onClick={() => { objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.UpdateSelectedColor(objPopUpContext, c); }}>
                    <label style={{ backgroundColor: c.vColorCode }}>
                        <input type="radio" name="colors" />
                        {c.uColorId == popUpState.selColor.uColorId ? <span className="checkmark">&#10003;</span> : ''}
                    </label>
                </li>
            );
        });
        return arrColorElements;
    }

    function GetDays() {
        let arrDayData = popUpState.arrDay.map(clsDay => {
            return (
                <th>
                    {clsDay.t_LearnCoacher_Planner_TimeTable_Day_Data[0].vTimeTableDayShortName}
                </th>
            );
        });
        return arrDayData;
    }

    function GetTimeTableData() {
        let arrRowElements = popUpState.arrTimeTableForDisplay.map(clsTime => {
            return (
                clsTime.cIsBreak === "N" || !clsTime.cIsBreak === "Y" ?
                    <tr>
                        <td className="timeTd">
                            {clsTime.vClassTimeFrom + "-" + clsTime.vClassTimeTo}
                        </td>
                        {clsTime.arrDay.map(clsDay => {
                            return (
                                <td
                                    className={clsTime.uClassTimeId == popUpState.selTimeForEdit.uClassTimeId &&
                                        clsDay.uTimeTableDayId == popUpState.selDayForEdit.uTimeTableDayId &&
                                        !popUpState.blnClickedSegment ? "cell-border" : ""}
                                >
                                    <table className="level-2">
                                        <tr>
                                            <td>
                                                <table className="level-3">
                                                    {clsDay.arrSegments.map(clsSeg => {
                                                        return (
                                                            clsSeg.isSelectedAll == false || clsSeg.selectedSubject == undefined ?
                                                                <React.Fragment>
                                                                    <tr onClick={e => { OnClickAll(e, clsTime, clsDay, !clsSeg.isSelectedAll); }}>
                                                                        <td colspan="2">{clsSeg.vClassGroupName}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        {clsSeg.arrGroups.map(clsGrp => {
                                                                            return clsGrp.isSelected == false ?
                                                                                <td onClick={e => { OnClickGroup(e, clsTime, clsDay, clsGrp, !clsGrp.isSelected); }}>
                                                                                    {clsGrp.t_TestDrive_Member_Class_Group_Data[0].vGroupName}
                                                                                </td>
                                                                                :
                                                                                <td onClick={e => { OnClickGroup(e, clsTime, clsDay, clsGrp, !clsGrp.isSelected); }}
                                                                                    style={{ backgroundColor: clsGrp.vColorCode }}
                                                                                >
                                                                                    {clsGrp.selectedSubject.t_TestDrive_Subject_Data[0].vSubjectShortName ?
                                                                                        clsGrp.selectedSubject.t_TestDrive_Subject_Data[0].vSubjectShortName
                                                                                        : <React.Fragment>&nbsp;</React.Fragment>}
                                                                                </td>;

                                                                        })}
                                                                    </tr>
                                                                </React.Fragment> :
                                                                <tr onClick={e => { OnClickAll(e, clsTime, clsDay, !clsSeg.isSelectedAll); }}>
                                                                    <td style={{ backgroundColor: clsSeg.vColorCode, height: "53px" }}>
                                                                        {clsSeg.selectedSubject ? clsSeg.selectedSubject.t_TestDrive_Subject_Data[0].vSubjectShortName : ""}
                                                                    </td>
                                                                </tr>
                                                        );
                                                    })}
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            );
                        })}
                    </tr>
                    :
                    <tr className="break-row">
                        <td className="timeTd" />
                        <td>
                            <table className="breaktime-table">
                                <tr>
                                    <td />
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table className="breaktime-table">
                                <tr>
                                    <td />
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table className="breaktime-table">
                                <tr>
                                    <td />
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table className="breaktime-table">
                                <tr>
                                    <td />
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table className="breaktime-table">
                                <tr>
                                    <td />
                                </tr>
                            </table>
                        </td>
                    </tr>
            );
        });
        return arrRowElements;
    }

    function OnClickAll(event, clsTime, clsDay, value) {
        if (objPopUpContext.popUpState.selTeacher.uTeacherId == "00000000-0000-0000-0000-000000000000" || objPopUpContext.popUpState.selSubject.iSubjectId == -1) {

        } else {
            objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.UpdateSegmentAll(objPopUpContext, clsTime, clsDay, value);
        }
    }

    function OnClickGroup(event, clsTime, clsDay, clsGrp, value) {
        event.stopPropagation();
        if (objPopUpContext.popUpState.selTeacher.uTeacherId == "00000000-0000-0000-0000-000000000000" || objPopUpContext.popUpState.selSubject.iSubjectId == -1) {

        } else {
            objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.UpdateGroupSegment(objPopUpContext, clsTime, clsDay, clsGrp, value);
        }
    }

    function OnClickSaveAndClose() {
        objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.SaveData(objPopUpContext);
        Popup.ClosePopup(props.Id);
    }

};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TimeTableSchedulePopUp_ModuleProcessor.StoreMapList()))(TimeTableSchedulePopup);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TimeTableSchedulePopUp_ModuleProcessor; 