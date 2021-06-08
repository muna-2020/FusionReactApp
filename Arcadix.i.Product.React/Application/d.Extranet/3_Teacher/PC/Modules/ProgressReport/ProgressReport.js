//React imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as ProgressReport_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport_Hook';
import ProgressReport_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport_ModuleProcessor';

//Components used in module.
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';


//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import TickImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/tick.png?inline';
import TestPreviewImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/TestPreview.svg?inline';
import PDFIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Icon_Pdf.gif?inline';
import DeleteImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/delete.svg?inline';
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';

/**
* @name ProgressReport
* @param {object} props props
* @summary This component displays the ProgressReport data.
* @returns {object} div that encapsulated the components with ProgressReport details.
*/
const ProgressReport = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, ProgressReport_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ProgressReport", ["ProgressReport_ModuleProcessor"]: new ProgressReport_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ProgressReport_ModuleProcessor.Initialize(objContext, objContext.ProgressReport_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in ProgressReport_Hook, that contains all the custom hooks.
    * @returns null
    */
    ProgressReport_Hook.Initialize(objContext);

    /**
    * @name GetParentSubjectElements
    * @param {Array} arrSubjectData Subject data
    * @param {object} objSelParentSubject Selected parent subject
    * @summary Forms the jsx buttons of the parent subject elements
    * @returns {object} jsx, button
    */
    function GetParentSubjectElements(arrSubjectData, objSelParentSubject) {
        let arrSubjectElements = arrSubjectData.map(sub => {
            return (
                <button className={sub["iSubjectId"] == objSelParentSubject["iSubjectId"] ? "button high-stake-button" : "button high-stake-button disabled"} onClick={() => { objContext.ProgressReport_ModuleProcessor.OnClickParentTest(objContext, sub, objSelParentSubject); }}>
                    {sub.t_TestDrive_Subject_Data[0]["vSubjectName"]}
                </button>
            );
        });

        return arrSubjectElements;
    }

    /**
    * @name GetSubSubjectElements
    * @param {Array} arrSubSubjectData SubSubject data
    * @summary Forms the jsx td with the sub subject names
    * @returns {object} jsx, td
    */
    function GetSubSubjectElements(arrSubSubjectData) {
        let arrElements = arrSubSubjectData.map(sub => {
            return (
                <td>{sub.t_TestDrive_Subject_Data[0]["vSubjectName"]}</td>
            );
        });
        return arrElements;
    }

    /**
    * @name GetPupilTestResultElements
    * @param {Array} arrPupilResultData PupilResult Data
    * @param {object} objTextResource Text resource object
    * @param {object} objSelectedClass Selected Class
    * @summary Forms the jsx for Pupil Result element
    * @returns {object} jsx, tr
    */
    function GetPupilTestResultElements(arrPupilResultData, objTextResource, objSelectedClass) {
        let strClassName = objContext.state.blnCompetencyModeOn ? "competency" : "results-cube"
        let arrResultElements = arrPupilResultData.map(ppl => {
            return (
                <tr>
                    <td>
                        {ppl.vName}
                    </td>

                    <td>
                        <table>
                            <tr>
                                {ppl.arrOrientationSubjectResult.map(subRes => {
                                    return (
                                        <td>{
                                            subRes.isResultExists
                                                ? <span id={'spn_' + subRes['uTestId'] + '_' + ppl['uPupilId']}
                                                    onClick={() => { objContext.ProgressReport_ModuleProcessor.NavigateToOrientationTest(objContext); }}
                                                    className={strClassName} style={{ cursor: "pointer", borderColor: subRes["vBackGroundColor"] }}>
                                                    <span>{subRes.vResultText}</span>
                                                    <div id={'spn_box_' + subRes['uTestId'] + '_' + ppl['uPupilId']}
                                                        className="inside" style={{ cursor: "pointer", backgroundColor: subRes["vBackGroundColor"], zIndex: 0, height: (subRes.vResultText / 10) + "%" }}>
                                                    </div>
                                                </span>
                                                : ''
                                        }</td>
                                    );
                                })}
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table>
                            <tr>
                                {
                                    ppl.arrLearningJournalSubjectData.map(ltRes => {
                                        return (
                                            <td className="tes-relative" style={{ "text-decoration": "underline" }}>
                                                {
                                                    ltRes
                                                        ? <React.Fragment>
                                                            <div id={"div_" + ltRes["uTestId"] + "_" + ppl["uPupilId"]} onClick={() => { objContext.ProgressReport_ModuleProcessor.ShowSummaryPopup(objContext, ppl, ltRes); }} onMouseLeave={() => { objContext.ProgressReport_ModuleProcessor.HideSummaryPopup(objContext); }}>{ltRes["TestResult"].iRepitionId + "." + ltRes["TestResult"].iRoundId}</div>
                                                            {(state.objSelPupilForSummaryPopup && state.objSelSubjectForSummaryPopup && state.objSelPupilForSummaryPopup["uPupilId"] == ppl["uPupilId"] && state.objSelSubjectForSummaryPopup["iSubjectId"] == ltRes["iSubjectId"]) ?
                                                                <div className="tts-baloon left ">
                                                                    <div className="row-flex">
                                                                        <span>{Localization.TextFormatter(objTextResource, 'Date')}</span>
                                                                        <b> {ltRes["TestResult"].dtLastTaskAnsweredOn} </b>
                                                                    </div>
                                                                    <div className="row-flex">
                                                                        <span>{Localization.TextFormatter(objTextResource, 'NumberOfTasks')}</span>
                                                                        <b> {ltRes["TestResult"].iTaskCountDisplayed} </b>
                                                                    </div>
                                                                    <div className="row-flex">
                                                                        <span>{Localization.TextFormatter(objTextResource, 'Duration')}</span><b> {ltRes["TestResult"].iTotalEffectiveTimeTaken} </b>
                                                                    </div>
                                                                </div> : <React.Fragment />}
                                                        </React.Fragment>
                                                        : <React.Fragment />
                                                }
                                            </td>
                                        );
                                    })}
                                <td>{ppl.arrLearningJournalSubjectData[0] ? ppl.arrLearningJournalSubjectData[0]["TestResult"].dtLastTaskAnsweredOn : ''}</td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        {ppl.isHighStakeResultCompleted ?
                            <img
                                src={TickImage}
                                onClick={() => { objContext.ProgressReport_ModuleProcessor.NavigateToHighStakeTest(objContext); }}
                            />
                            : ''}
                    </td>
                    <td>
                        <img
                            src={TestPreviewImage}
                            onClick={() => {
                                objContext.ProgressReport_ModuleProcessor.OpenPupilLearnProfilePopup(ppl, objTextResource, objSelectedClass);
                            }}

                        />
                    </td>
                </tr>
            );
        });
        return arrResultElements;
    }

    /**
    * @name GetPdfElementsList
    * @param  {object} objClass each class objects
    * @summary Forms the jsx li for Pdf elements of AllPdf
    * @returns {object} jsx, li
    */
    function GetPdfElementsList(objClass, arrOfflineProcessExecution) {
        let arrElements = [];
        arrOfflineProcessExecution.map(itm => {
            let objParameters = JSON.parse(itm.vParameters);
            let strFileName = itm.t_TestDrive_OfflineProcess_Execution_File[0].vFileName;
            let strCombinedFileName = itm["uOfflineProcessExecutionId"] + "/" + strFileName;
            let strStreamFileApiUrl = "API/Framework/Services/StreamFile?";
            let strFileDownloadUrl = JConfiguration.BaseUrl + strStreamFileApiUrl + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + strCombinedFileName + "&Type=Offline/ExtranetProgressReport&DisplayFileName=" + strFileName;
            if (objParameters.objData["uClassId"] === objClass["uClassId"]) {
                arrElements = [...arrElements,
                <li>
                    <img src={PDFIconImage} />
                    <a href={strFileDownloadUrl} className={itm["cIsViewed"] == "Y" ? "not-downloaded" : "downloaded"}> {/*className "not-downloaded" is working as "downloaded" and vice-versa */}
                        {" "}
                        {strFileName}
                    </a>
                    <img
                        src={DeleteImage}
                        onClick={() => { objContext.ProgressReport_ModuleProcessor.DeleteGeneratedOfflineProcessExecution(objContext, itm["uOfflineProcessExecutionId"]); }}
                    />
                </li>
                ];
            }
        });
        return arrElements;
    }

    /**
    * @name GetPdfElements
    * @summary Forms the jsx ul for Pdf elements of AllPdf by looping through each class objects and not showing that class name if it has no lists.
    * @returns {object} jsx, React.Fragment
    */
    function GetPdfElements(strType) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/ProgressReport", objContext.props);
        let arrClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"];
        let arrElements = [];
        let strOfflineProcessDefinitionId = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ProgressReportGeneration")["Data"][0]["uOfflineProcessDefinitionId"]
        let arrTempOfflineProcessExecution = DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + strOfflineProcessDefinitionId).Data;
        let arrOfflineProcessExecution = arrTempOfflineProcessExecution.filter(objTempOfflineProcessExecutionDetails => { return objTempOfflineProcessExecutionDetails["cIsDeleted"] === "N"; });
        if (arrOfflineProcessExecution && arrOfflineProcessExecution.length > 0) {
            arrClass.map(objClass => {
                let arrListElements = [...GetPdfElementsList(objClass, arrOfflineProcessExecution)];
                arrElements = [...arrElements,
                arrListElements.length !== 0 ? <React.Fragment>
                    <h4>{Localization.TextFormatter(objTextResource, 'Class')}: {objClass["vClassName"]}</h4>
                    <ul>
                        {arrListElements}
                    </ul>
                </React.Fragment> : <React.Fragment />
                ];
            });
            return arrElements;
        } else {
            return strType == 'PDF' ? <div class="no-data">{Localization.TextFormatter(objTextResource, 'NoDataForPdf')}</div> : <div class="no-data">{Localization.TextFormatter(objTextResource, 'NoDataForExcel')}</div>;
        }
    }

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, div
    */
    let GetContent = () => {
        let strOrientationCycleTypeId = objContext.ProgressReport_ModuleProcessor.GetOrienationCycleTypeId();
        let strLearningCycleTypeId = objContext.ProgressReport_ModuleProcessor.GetLearningCycleTypeId();
        let strHighStakeCycleTypeId = objContext.ProgressReport_ModuleProcessor.GetHighStakeCycleTypeId();
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrClassData = [];
        if (DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")) {
            arrClassData = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"];
        }

        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/ProgressReport", objContext.props);
        let arrClassDropDownData = objContext.ProgressReport_ModuleProcessor.GetClassDropDownData(objContext, arrClassData, objTextResource);
        let strClassId = state.objSelectedClass ? state.objSelectedClass["uClassId"] : state.strUserPreferenceClassId;
        let objSelectedClass = state.objSelectedClass ? state.objSelectedClass : arrClassData.find(cls => cls["uClassId"] == strClassId);
        let arrOrientationTestData = [];
        if (DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")) {
            arrOrientationTestData = DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N").Data
                .filter(x => x["iProviderId"] != "2");
        }

        //let arrOrientationTestLoginsAndResultData = DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"];
        //let arrHighStakeTestLoginsAndResultData = DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"];
        let arrOrientationTestLoginsAndResultData = [];
        if (DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + state.strSchoolYearPeriodId)) {
            arrOrientationTestLoginsAndResultData = DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + state.strSchoolYearPeriodId)["Data"];
        }
        let arrHighStakeTestLoginsAndResultData = [];
        if (DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + state.strSchoolYearPeriodId)) {
            arrHighStakeTestLoginsAndResultData = DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + state.strSchoolYearPeriodId)["Data"];
        }
        let arrPupilData = [];
        if (DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)) {
            arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        }
        let arrLearningJournalTestData = [];
        if (DataRef(objContext.props.Extranet_Teacher_ProgressReport, "Extranet_Teacher_ProgressReport;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)) {
            arrLearningJournalTestData = DataRef(objContext.props.Extranet_Teacher_ProgressReport, "Extranet_Teacher_ProgressReport;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"];
        }
        let arrHighStakeTestData = [];
        if (DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")) {
            arrHighStakeTestData = DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N").Data
                .filter(x => x["iProviderId"] != "2");
        }
        let arrFeedbackThreshold = [];
        if (DataRef(props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iMainClientId;" + props.ClientUserDetails.MainClientId)) {
            arrFeedbackThreshold = DataRef(props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iMainClientId;" + props.ClientUserDetails.MainClientId)["Data"];
        }
        let arrDisplayTestResultData = [];
        let arrAllPdfData = [];
        if (arrPupilData && arrOrientationTestData && arrOrientationTestLoginsAndResultData && arrLearningJournalTestData && arrHighStakeTestData && arrHighStakeTestLoginsAndResultData)
            arrDisplayTestResultData = objContext.ProgressReport_ModuleProcessor.GetDisplayTestResultData(objContext, arrPupilData, arrOrientationTestData, arrOrientationTestLoginsAndResultData, arrLearningJournalTestData, arrHighStakeTestData, arrHighStakeTestLoginsAndResultData, arrFeedbackThreshold);
        return (
            <div className="main-wrapper analysis">
                {state.blnShowAllPdf === true ?
                    <div className="all-pdf-popup-wrapper open">
                        <div className="all-pdf-popup">
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="ProgressReport_FillHeight_Pdf_Popup" Meta={{ HeaderIds: ["Header", "outletBand"], FooterIds: ["AnalysisFooter"] }} ParentProps={{ ...props }}>
                                <div className="all-pdf-popup-padd">
                                    <div className="all-pdf-popup-header">
                                        <h3>{Localization.TextFormatter(objTextResource, 'ExcelPopupHeader')}</h3>

                                        <div className="close" onClick={() => { objContext.ProgressReport_ModuleProcessor.ToggleAllPdf(objContext); }}>
                                            <span>{Localization.TextFormatter(objTextResource, 'Close')}</span>
                                            <img src={CloseImage} />
                                        </div>
                                    </div>
                                    <div className="pdf-list">
                                        {GetPdfElements('EXCEL')}
                                    </div>
                                    <div className="all-pdf-popup-header">
                                        <h3>{Localization.TextFormatter(objTextResource, 'PdfPopupHeader')}</h3>
                                    </div>
                                    <div className="pdf-list">
                                        {GetPdfElements('PDF')}
                                    </div>
                                </div>
                            </WrapperComponent>
                        </div>
                    </div> :
                    <div className="analysis">
                        <div className="analysis-header-wrap" id="AnalysisHeader">
                            <div className="analysis-header">
                                <div className="analysis-header-left">
                                    <span className="label"> {Localization.TextFormatter(objTextResource, 'Class')} </span>
                                    <div className="content-dropdown">
                                        <PerformanceProfiler ComponentName={"ProgressReportClassDropDown"} JConfiguration={props.JConfiguration} >
                                            <ClassDropDown
                                                id="ProgressReportClassDropDown"
                                                SelectedValue={strClassId}
                                                DisplayColumn="vClassName"
                                                ValueColumn="uClassId"
                                                Data={arrClassDropDownData}
                                                UserPreference={state.objUserPreference}
                                                JConfiguration={props.JConfiguration}
                                                ClientUserDetails={props.ClientUserDetails}
                                                OnChangeEventHandler={(objItem, dropdownProps) => { objContext.ProgressReport_ModuleProcessor.OnChangeClass(objContext, objItem); }}
                                            />
                                        </PerformanceProfiler>
                                    </div>
                                    <PerformanceProfiler ComponentName={"ProgressReportClassDropDown"} JConfiguration={props.JConfiguration} >
                                        <WeekDisplay Id="ProgressReportClassDropDown"
                                            JConfiguration={props.JConfiguration}
                                            OnChangeDisplay={(objItem) => { objContext.ProgressReport_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem); }} backgroundColor="#dcdcdc" />
                                    </PerformanceProfiler>
                                    <div className="radio-switch">
                                        <span>{Localization.TextFormatter(objTextResource, 'Competency')}</span>
                                        <label className="switch">
                                            <input id="chkShowRomanNumbers" type="checkbox" value={state.blnCompetencyModeOn} onChange={() => { objContext.ProgressReport_ModuleProcessor.ToggleCompetencyMode(objContext); }} />
                                            <span className="slider round" />
                                        </label>
                                        <span>{Localization.TextFormatter(objTextResource, 'Off')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="analysis-header second-header">
                                <div className="analysis-header-left">
                                    {GetParentSubjectElements(state.arrParentSubjectData, state.objSelParentSubject)}
                                </div>
                            </div>
                        </div>

                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="ProgressReport_FillHeight_Abalysis" Meta={{ HeaderIds: ["Header", "AnalysisHeader", "outletBand"], FooterIds: ["AnalysisFooter"] }} ParentProps={{ ...props }}>
                            <table className="analysis-table">
                                <tr className="table-header-row">
                                    <td>{Localization.TextFormatter(objTextResource, 'Pupil')}</td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td colspan="3">{Localization.TextFormatter(objTextResource, 'OrientationTest')}</td>
                                            </tr>
                                            <tr>
                                                {GetSubSubjectElements(state.arrOrientionSubSubjectData)}
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td colspan="4">{Localization.TextFormatter(objTextResource, 'LearningTest')}</td>
                                            </tr>
                                            <tr>
                                                {GetSubSubjectElements(state.arrLearningSubSubjectData)}
                                                <td>{Localization.TextFormatter(objTextResource, 'LastActivity')}</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>{Localization.TextFormatter(objTextResource, 'HighStakeTest')}</td>
                                    <td />
                                </tr>
                                {GetPupilTestResultElements(arrDisplayTestResultData, objTextResource, objSelectedClass)}
                            </table>
                        </WrapperComponent>
                    </div>}
                <div className="analysis-footer" id="AnalysisFooter">
                    {
                        state.blnShowAllPdf == false ?
                            <button className="button high-stake-button" onClick={() => { objContext.ProgressReport_ModuleProcessor.OpenConfirmationPopup(objContext, objTextResource, objSelectedClass); }}>{Localization.TextFormatter(objTextResource, 'ExportEvaluation')}</button>
                            : <React.Fragment />
                    }

                    <div className="all-pdf" onClick={() => { objContext.ProgressReport_ModuleProcessor.ToggleAllPdf(objContext); }}>
                        <span>{Localization.TextFormatter(objTextResource, 'AllPdf')}</span>
                        <img className={state.blnShowAllPdf === true ? "active" : ""} src={AngleDownImage} alt="" />
                    </div>
                </div>
            </div>
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(ProgressReport_ModuleProcessor.StoreMapList()))(ProgressReport);