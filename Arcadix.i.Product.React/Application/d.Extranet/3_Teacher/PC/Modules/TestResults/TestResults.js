﻿//react imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module Specific imports.
import AllPdfTest from "@root/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResultsPopup/AllPdfTest/AllPdfTest";
import TestResults_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults_ModuleProcessor';
import * as TestResults_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults_Hook';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

//controls
import ClassDropDown from "@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown";
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";

//Inline Images import
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';
import ExcelIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Excel_icon.gif?inline';
import WasteBinImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/icon_wastebin.gif?inline';
import AssignToDiffPupilImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/AssignToDiffPupil.gif?inline';
import RecalculateImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/Recalculate.gif?inline';


const TestResults = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TestResults_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestResults", ["TestResults_ModuleProcessor"]: new TestResults_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestResults_ModuleProcessor.Initialize(objContext, objContext.TestResults_ModuleProcessor);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    TestResults_Hook.Initialize(objContext);

    /**
     * @name GetTableBodyDataForRepetiton
     * @summary returns the results data.
     * @param {any} objTestDetails
     * @param {any} objPupilDetails
     * @param {any} objTextResource
     */
    function GetTableBodyDataForRepetiton(objTestDetails, objPupilDetails, objTextResource, objCycleData) {
        let strCycleId = objCycleData["uCycleId"];
        let arrData = [];

        for (let intTempCount = 1; intTempCount <= parseInt(objCycleData["iCycleNumberOfRepetitions"]); intTempCount++) {
            let arrTestResultExists = objContext.TestResults_ModuleProcessor.GetCompletedAndInProgressTestResults(objContext, intTempCount, strCycleId, objPupilDetails["uPupilId"], objTestDetails["uTestId"]);
            let objCycleRepetitionIdAndUTestId = objContext.TestResults_ModuleProcessor.GetTestDetailsAndCycleRepitition(objContext, objTestDetails, intTempCount);
            if (arrTestResultExists.length > 0) {
                let objSelRslt = state.arrSelectedResults.find(objRslt => objRslt["uPupilId"] == objPupilDetails["uPupilId"] && objRslt["uTestId"] == objTestDetails["uTestId"] && objRslt["iCycleRepetition"] == intTempCount)
                let blnChecked = objSelRslt != undefined;
                var iTestStatusId = arrTestResultExists[0]["TestExecution"][0]["iTestStatusId"];
                let strBackGround = '';
                let strResult = 0;
                if (arrTestResultExists[0]["TestResultSummary"] && arrTestResultExists[0]["TestResultSummary"].length > 0 && arrTestResultExists[0]["TestResultSummary"][0]["vResultAttribute"]) {
                    strResult = JSON.parse(arrTestResultExists[0]["TestResultSummary"][0]["vResultAttribute"])["Result"];
                    strBackGround = '';
                    strResult < 400 && (strBackGround = '#ECE264');
                    strResult > 400 && strResult < 600 && (strBackGround = '#AED3FF');
                    strResult > 600 && (strBackGround = '#68D275');
                }
                arrData = [...arrData,
                <td>
                    <label className="checkContainer">
                        {
                            objCycleRepetitionIdAndUTestId && objCycleRepetitionIdAndUTestId.length > 0 &&
                                objCycleRepetitionIdAndUTestId[0]["intCycleRepetition"] === intTempCount &&
                                objTestDetails["uTestId"] === objCycleRepetitionIdAndUTestId[0]["objTestDetails"]["uTestId"] &&
                                iTestStatusId == 5 ?
                                <input type="checkbox" checked="true" /> :
                                <input type="checkbox" checked={blnChecked} onClick={(e) => { objContext.TestResults_ModuleProcessor.OnChangeCheckBox(objContext, objTestDetails, objPupilDetails, intTempCount, e.target.checked) }} />
                        }
                        <span className="checkmark" />
                        {
                            iTestStatusId == 5 ?
                                <React.Fragment>
                                    <span className="numCount">{strResult}</span>
                                    <div class="percentageBg fourty" style={{ backgroundColor: strBackGround, height: strResult / 10 + "%" }} ></div>
                                </React.Fragment> :
                                <span className="numCount">-</span>
                        }
                        {/*<div className="percentageBg" />*/}
                    </label>

                    {arrTestResultExists.length > 0 ?
                        <div className="showbetanavigation-buttons">
                            <img src={ExcelIconImage} alt="" onClick={() => { objContext.TestResults_ModuleProcessor.CreateExcelProgressBarPopup(objContext, objTestDetails, objPupilDetails, intTempCount, objTextResource); }} />
                            <img src={WasteBinImage} alt="" onClick={() => { objContext.TestResults_ModuleProcessor.ResetResult(objContext, objTestDetails, arrTestResultExists[0]) }} />
                            {iTestStatusId == 5 ?
                                <img src={AssignToDiffPupilImage} onClick={() => {
                                    objContext.TestResults_ModuleProcessor.OpenMoveResultsPopup(objContext, objTextResource, arrTestResultExists[0])
                                }} alt="" /> : ''}
                            <img src={RecalculateImage} alt="" onClick={() => { objContext.TestResults_ModuleProcessor.ReCalculateTestResult(objContext, objTestDetails, arrTestResultExists[0]) }} />
                        </div> : ''}
                </td>
                ];
            }
            else {
                arrData = [...arrData,
                <td><label className="checkContainer checkHidden">
                    <input type="checkbox" />
                    <span className="checkmark" />
                </label></td>
                ];
            }
        }
        return arrData;
    }

    /**
     * @name GetTableBodyDataForRepetitonPerSubject
     * @summary returns the repetion data.
     * @param {any} objPupilDetails
     * @param {any} objTextResource
     */
    function GetTableBodyDataForRepetitonPerSubject(objPupilDetails, objTextResource) {
        let arrTestData = objContext.TestResults_ModuleProcessor.GetTestData(objContext);
        let objCycleData = objContext.TestResults_ModuleProcessor.GetCycleObject(objContext);
        let arrReturnData = [];
        arrTestData.map((objTempTestDetails) => {
            arrReturnData = [...arrReturnData,
            <td>
                <table className="sub-table">
                    <tr>
                        {
                            GetTableBodyDataForRepetiton(objTempTestDetails, objPupilDetails, objTextResource, objCycleData).map(objTempData => { return objTempData })
                        }
                    </tr>
                </table>
            </td>
            ];
        });
        return arrReturnData;
    }

    /**
     * @name GetTableHeaderDataForRepetition
     * @summary returns the data for repetion header.
     * @param {any} objTestDetails
     */
    function GetTableHeaderDataForRepetition(objTestDetails, objCycleData) {
        let arrReturnData = [];
        for (let intTempCount = 1; intTempCount <= parseInt(objCycleData["iCycleNumberOfRepetitions"]); intTempCount++) {
            arrReturnData = [...arrReturnData,
            <td><label className="checkContainer">
                <span className="spanNum">{intTempCount}</span>
                <input type="checkbox" onChange={(event) => { objContext.TestResults_ModuleProcessor.OnClickAllCheckBox(objContext, objTestDetails, intTempCount, event.target.checked) }} />
                <span className="checkmark" />
            </label>
            </td>
            ];
        }
        return arrReturnData;
    }

    /**
     * @name GetTableHeaderDataForRepetitionPerSubject
     * @summary returns the data for repetion subject.
     * */
    function GetTableHeaderDataForRepetitionPerSubject() {
        let arrTestData = objContext.TestResults_ModuleProcessor.GetTestData(objContext);
        let objCycleData = objContext.TestResults_ModuleProcessor.GetCycleObject(objContext);
        let arrReturnData = [];
        arrTestData.map((objTempTestDetails) => {
            arrReturnData = [...arrReturnData,
            <td>
                <table className="sub-table">
                    <tr>
                        {
                            GetTableHeaderDataForRepetition(objTempTestDetails, objCycleData).map(objTempData => { return objTempData })
                        }
                    </tr>
                </table>
            </td>]
        });

        console.log("GetTableHeaderDataForRepetitionPerSubject", arrReturnData);
        return arrReturnData;
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestResults", props)
        let arrClassData = objContext.TestResults_ModuleProcessor.GetClassDropDownData(objContext, objTextResource);
        let arrSubjects = objContext.TestResults_ModuleProcessor.GetDefaultSubjects(objContext);
        let iSubjectId = objContext.TestResults_ModuleProcessor.GetSubjectId(objContext);
        let arrTestData = objContext.TestResults_ModuleProcessor.GetTestData(objContext);
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data
        let objOfflineProcessDefinitionId = "";
        if (DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback")) {
            objOfflineProcessDefinitionId = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback").Data[0]["uOfflineProcessDefinitionId"];
        }
        let arrPdfFilesInfo = [];
        if (objContext.TestResults_ModuleProcessor.GetOfflineExecutionLoaded(objContext)) {
            arrPdfFilesInfo = objContext.TestResults_ModuleProcessor.GetOfflineExecutionLoaded(objContext) ? DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + objOfflineProcessDefinitionId)["Data"] : [];
        }

        let blnEnableSchoolYearPerionArrowIcons = arrPupil && arrPupil.length > 0;
        return (
            <div className="WrpCvr TestResults">
                {state.showLearningTestGenerationPopup ?
                    //html for popup
                    <div className="learning-test-generation-popup-overlay">
                        <div className="learning-test-generation-popup">
                            <div className="ltg-content">
                                <h3>{Localization.TextFormatter(objTextResource, 'LearningTestGenerationPopupHeader')}</h3>
                                <p>{state.iExecutionCount + " " + Localization.TextFormatter(objTextResource, 'LearningTestGenerationPopupBody')}</p>
                            </div>
                            <div className="ltg-footer"><button className="button blue-button" onClick={() => { objContext.TestResults_ModuleProcessor.CloseLearningTestPopup(objContext) }}>{Localization.TextFormatter(objTextResource, 'LearningTestGenerationPopupOkay')}</button></div>
                        </div>
                    </div>
                    : <React.Fragment />
                }

                <div className="top-space" id="TopSpace" />
                {state.Open === true ? <AllPdfTest ComponentController={props.ComponentController} HandlePdfPopup={() => { objContext.TestResults_ModuleProcessor.HandlePdfPopup(objContext) }} JConfiguration={props.JConfiguration} Data={arrPdfFilesInfo} TextResource={objTextResource} /> : ""}
                <div style={state.Open === true ? { display: "none" } : { display: "block" }}>
                    <div className="top-head-padd" id="TestResultsHeader">
                        <div className="top-head">
                            <div className="top-head-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"TestResult_ClassDropDown"} JConfiguration={props.JConfiguration} >
                                        <ClassDropDown
                                            id="TestResult_ClassDropDown"
                                            Data={arrClassData}
                                            DisplayColumn="vClassName"
                                            ValueColumn="uClassId"
                                            SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                            JConfiguration={props.JConfiguration}
                                            ClientUserDetails={props.ClientUserDetails}
                                            OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.TestResults_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }} />
                                    </PerformanceProfiler>
                                </div>
                                <span>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"TestResult_SubjectDropdown"} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"TestResult_SubjectDropdown"}
                                            Meta={objContext.TestResults_ModuleProcessor.GetSubjectDropdownMetaData()}
                                            Data={objContext.TestResults_ModuleProcessor.GetSubjectDropdownData(arrSubjects, iSubjectId)}
                                            Resource={objContext.TestResults_ModuleProcessor.GetResourceData()}
                                            Events={objContext.TestResults_ModuleProcessor.GetSubjectDropdownEvents(objContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                                <button className="button blue-button" onClick={() => { objContext.TestResults_ModuleProcessor.LearningTestSettingsPopUp(objContext, arrTestData) }}>{Localization.TextFormatter(objTextResource, 'NewSeries')}</button>
                            </div>
                        </div>
                    </div>
                    <div className="p-15" id="LegendsControls" className="legends-controls">

                        <PerformanceProfiler ComponentName={"TestResultWeekDisplay"} JConfiguration={props.JConfiguration} >
                            <WeekDisplay
                                Id={"TestResultWeekDisplay"}
                                JConfiguration={props.JConfiguration}
                                OnChangeDisplay={(objItem) => { objContext.TestResults_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem) }}
                                DisableIcon={!blnEnableSchoolYearPerionArrowIcons}
                            />
                        </PerformanceProfiler>
                    </div>
                    <div className="tablePadd">

                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="TestResult_FillHeight" Meta={objContext.TestResults_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                            <table className="testResultsTable">
                                <tr>
                                    <td>{Localization.TextFormatter(objTextResource, 'PupilText')}</td>
                                    {
                                        arrTestData && arrTestData.map((objTempData) => {
                                            return (
                                                <td>
                                                    {objTempData["vTestName"]}
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                                <tr className="activeRow">
                                    <td>{Localization.TextFormatter(objTextResource, 'AllPupilText')} ({arrPupil ? arrPupil.length : ''})</td>
                                    {
                                        GetTableHeaderDataForRepetitionPerSubject().map(objTempData => { return objTempData })
                                    }
                                </tr>
                                {
                                    arrPupil && arrPupil.map(objTempPupilDetails => {
                                        return (
                                            <tr>
                                                <td>
                                                    {objTempPupilDetails["vName"]} {objTempPupilDetails["vFirstName"]}
                                                </td>
                                                {
                                                    GetTableBodyDataForRepetitonPerSubject(objTempPupilDetails, objTextResource).map(objTempData => { return objTempData })
                                                }
                                            </tr>
                                        );
                                    })
                                }
                                {
                                    arrPupil && arrPupil.length === 0 ?
                                        <tr>
                                            <td className="no-data" colSpan={arrTestData.length + 1}>
                                                No data found
                                             </td>
                                        </tr> : <React.Fragment></React.Fragment>
                                }
                            </table>
                        </WrapperComponent>
                    </div>
                </div>
                <div className="endPanel TstRst" id="FooterTestResults">
                    {
                        state.Open != true ?
                            <div>
                                <div className="leftFlex" onClick={() => { objContext.TestResults_ModuleProcessor.OnClickNavigationButton(objContext) }}>
                                    <span className="button yellBtn">{Localization.TextFormatter(objTextResource, 'Promote')}</span>
                                </div>

                                <div className="leftFlex centerFlex">
                                    <span className="button blue-button" onClick={() => {
                                        objContext.TestResults_ModuleProcessor.CreateCompetencyPdfProgressBarPopup(objContext, objTextResource)
                                    }}>{Localization.TextFormatter(objTextResource, 'CompetenceLevel')}</span>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    <div className="right-flex">
                        {
                            <div className="allPdf" onClick={() => { objContext.TestResults_ModuleProcessor.HandlePdfPopup(objContext) }}>
                                {Localization.TextFormatter(objTextResource, 'AllPdfPopButtonText')}
                                <img src={AngleDownImage} style={state.Open == true ? { transform: "rotate(180deg)" } : { transform: "inherit" }} alt="" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return state.isLoadComplete || props.isLoadComplete ? <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />;
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(TestResults_ModuleProcessor.StoreMapList()))(TestResults);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TestResults_ModuleProcessor; 