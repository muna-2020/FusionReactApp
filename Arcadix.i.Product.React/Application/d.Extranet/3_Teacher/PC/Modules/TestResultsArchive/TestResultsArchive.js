import React, { useReducer } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as TestResultsBusinessLogic from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResultsBusinessLogic";
import ClassDropDown from "@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown";
import AllPdfTest from "@root/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResultsPopup/AllPdfTest/AllPdfTest_DesignTemplate";
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";

//Inline Images import
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';
import ExcelIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Excel_icon.gif?inline';
import WasteBinImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/icon_wastebin.gif?inline';
import AssignToDiffPupilImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/AssignToDiffPupil.gif?inline';
import RecalculateImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/Recalculate.gif?inline';

const TestResults = props => {

    /**
     * @summary Provides satate and dispatch.
     */
    const [state, dispatch] = useReducer(TestResultsBusinessLogic.Reducer, TestResultsBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    /**
     * @summary Custom hook that makes the request for the data.
     */
    TestResultsBusinessLogic.useDataLoader(objContext);

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    TestResultsBusinessLogic.useDataLoaded(objContext);

    /**
  * @summary Custom hook that makes the request for pupil data.
  */
    TestResultsBusinessLogic.useDataLoaderForPupil(objContext);

    const HandlePdfPopup = () => {

        if (state.Open == false) {
            dispatch({ type: "SET_STATE_VALUES", payload: { "Open": true } });
        }
        else {
            dispatch({ type: "SET_STATE_VALUES", payload: { "Open": false } });
        }
    };

    function OpenMoveResultsPopUp(objTextResource, objTextResult) {
        let objCycleData = TestResultsBusinessLogic.GetCycleObject(objContext);       
        props.showPopup({
            MaxHeight: "98%",
            MaxWidth: "98%",
            popUpMinHeight: "98%",
            popUpMinWidth: "98%",
            showHeader: false,
            popUpName: "moveresults", //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {},
            headerTitle: "",
            Data: {
                objTextResource: objTextResource,
                objCycleData: objCycleData,
                ClientUserDetails: props.ClientUserDetails,
                objTestResult: objTextResult
            }
        });
    }
    
    function GetTableBodyDataForRepetiton(objTestDetails, objPupilDetails, objTextResource) {
        let objCycleData = TestResultsBusinessLogic.GetCycleObject(objContext);
        let strCycleId = objCycleData["uCycleId"];
        let arrData = [];

        for (let intTempCount = 1; intTempCount <= parseInt(objCycleData["iCycleNumberOfRepetitions"]); intTempCount++) {
            let blnTextExists = TestResultsBusinessLogic.GetCompletedAndInProgressTestResults(objContext, intTempCount, strCycleId, objPupilDetails["uPupilId"], objTestDetails["uTestId"]);
            let objCycleRepetitionIdAndUTestId = TestResultsBusinessLogic.GetTestDetailsAndCycleRepitition(objContext, objTestDetails, intTempCount);
            if (blnTextExists.length > 0) {
                var iTestStatusId = blnTextExists[0]["TestExecution"][0]["iTestStatusId"];
                arrData = [...arrData,
                <td>
                    <label className="checkContainer">
                        {
                            objCycleRepetitionIdAndUTestId && objCycleRepetitionIdAndUTestId.length > 0 &&
                                objCycleRepetitionIdAndUTestId[0]["intCycleRepetition"] === intTempCount &&
                                objTestDetails["uTestId"] === objCycleRepetitionIdAndUTestId[0]["objTestDetails"]["uTestId"] &&
                                iTestStatusId == 5 ?
                                <input type="checkbox" checked /> :
                                <input type="checkbox" />
                        }
                        <span className="checkmark" />
                        {
                            iTestStatusId == 5 ?
                                <span className="numCount">{JSON.parse(blnTextExists[0]["TestResultSummary"][0]["vResultAttribute"])["Result"]}</span> :
                                <span className="numCount">-</span>
                        }
                        {/*<div className="percentageBg" />*/}
                    </label>

                    {blnTextExists.length > 0 ?
                        <div className="showbetanavigation-buttons">
                            <img src={ExcelIconImage} alt="" />
                            <img src={WasteBinImage} alt="" onClick={() => { TestResultsBusinessLogic.ResetResult(objContext, objTestDetails, blnTextExists[0]) }} />
                            {iTestStatusId == 5 ? <img src={AssignToDiffPupilImage} onClick={() => {
                                OpenMoveResultsPopUp(objTextResource, blnTextExists[0])
                            }} alt="" /> : ''}
                            <img src={RecalculateImage} alt="" onClick={() => { TestResultsBusinessLogic.ReCalculateTestResult(objContext, objTestDetails, blnTextExists[0]) }} />
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

    function GetTableBodyDataForRepetitonPerSubject(objPupilDetails, objTextResource) {
        let arrTestData = TestResultsBusinessLogic.GetTestData(objContext);
        let arrReturnData = [];
        arrTestData.map((objTempTestDetails) => {
            arrReturnData = [...arrReturnData,
            <td>
                <table className="sub-table">
                    <tr>
                        {
                            GetTableBodyDataForRepetiton(objTempTestDetails, objPupilDetails, objTextResource).map(objTempData => { return objTempData })
                        }
                    </tr>
                </table>
            </td>
            ];
        });
        return arrReturnData;
    }
    
    function GetTableHeaderDataForRepetition(objTestDetails) {
        let objCycleData = TestResultsBusinessLogic.GetCycleObject(objContext);       
        let arrReturnData = [];
        for (let intTempCount = 1; intTempCount <= parseInt(objCycleData["iCycleNumberOfRepetitions"]); intTempCount++) {
            arrReturnData = [...arrReturnData,
            <td><label className="checkContainer">
                <span className="spanNum">{intTempCount}</span>
                <input type="checkbox" onChange={(event) => { TestResultsBusinessLogic.OnChangeCheckBox(objContext, true, objTestDetails, null, intTempCount, event.target.checked) }} />
                <span className="checkmark" />
            </label>
            </td>
            ];
        }
        return arrReturnData;
    }

    function GetTableHeaderDataForRepetitionPerSubject() {
        let arrTestData = TestResultsBusinessLogic.GetTestData(objContext);
        let arrReturnData = [];
        arrTestData.map((objTempTestDetails) => {
            arrReturnData = [...arrReturnData,
            <td>
                <table className="sub-table">
                    <tr>
                        {
                            GetTableHeaderDataForRepetition(objTempTestDetails).map(objTempData => { return objTempData })
                        }
                    </tr>
                </table>
            </td>]
        });
        return arrReturnData;
    }

    /**
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = DataRef(props.textresource, "textresource;id;" + props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/testresults").Data[0]["TestResults"];
        let arrClassData = TestResultsBusinessLogic.GetClassDropDownData(objContext);
        let arrSubjects = TestResultsBusinessLogic.GetDefaultSubjects(objContext);
        let arrTestData = TestResultsBusinessLogic.GetTestData(objContext);
        return (
            <div className="WrpCvr TestResults">
                <div className="top-space" id="TopSpace" />
                {state.Open === true ? <AllPdfTest HandlePdfPopup={HandlePdfPopup} JConfiguration={props.JConfiguration} /> : ""}
                <div style={state.Open === true ? { display: "none" } : { display: "block" }}>
                    <div className="top-head-padd" id="TestResultsHeader">
                        <div className="top-head">
                            <div className="top-head-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</span>
                                <div className="content-dropdown">
                                    <ClassDropDown
                                        id="ClassDropDown"
                                        Data={arrClassData}
                                        DisplayColumn="vClassName"
                                        ValueColumn="uClassId"
                                        SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                        JConfiguration={props.JConfiguration}
                                        ClientUserDetails={props.ClientUserDetails}
                                        OnChangeEventHandler={(objItem, objDropdownProps) => { TestResultsBusinessLogic.OnChangeClassDropDown(objContext, objItem) }} />
                                </div>
                                <span>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}</span>
                                <div className="content-dropdown">
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        id="subjectDropDown"
                                        Data={arrSubjects}
                                        DependingTableName="t_TestDrive_Subject_Data"
                                        IsLanguageDependent="Y"
                                        DisplayColumn="vSubjectName"
                                        ValueColumn="iSubjectId"
                                        ParentProps={{ ...props }}
                                        SelectedValue={arrSubjects[0].iSubjectId}
                                        OnChangeEventHandler={(objItem, objDropdownProps) => { TestResultsBusinessLogic.OnChangeSubjectDropDown(objContext, objItem) }}
                                        JConfiguration={props.JConfiguration} />
                                </div>
                                <WeekDisplay JConfiguration={props.JConfiguration} OnChangeDisplay={(objItem) => { TestResultsBusinessLogic.OnChangeWeekDisplay(objContext, objItem) }} backgroundColor="rgb(229, 194, 205)" />
                            </div>
                        </div>
                    </div>
                    <div className="tablePadd">
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            ParentProps={{ ...props }}
                            id="ResultsArchiveFillHeight" HeaderIds={["Header", "LegendsControls", "TestResultsHeader", "TopSpace"]} FooterIds={["FooterTestResults"]} className="bgStyle" scrollStyle={{ overflow: "auto" }}>
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
                                    <td>{Localization.TextFormatter(objTextResource, 'AllPupilText')} ({state.arrPupil.length})</td>
                                    {
                                        GetTableHeaderDataForRepetitionPerSubject().map(objTempData => { return objTempData })
                                    }
                                </tr>
                                {
                                    state.arrPupil && state.arrPupil.map(objTempPupilDetails => {
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
                                    state.arrPupil && state.arrPupil.length === 0 ?
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
                    <div className="leftFlex">
                        <span className="yellBtn">{Localization.TextFormatter(objTextResource, 'Promote') }</span>
                    </div>

                    <div className="leftFlex centerFlex">
                        <span className="button blue-button" onClick={() => {
                            props.showPopup({
                                MaxHeight: "175px",
                                MaxWidth: "380px",
                                popUpMinHeight: "175px",
                                popUpMinWidth: "380px",
                                showHeader: false,
                                popUpName: "testresultscreatepdf", //name of the component to be displayed inside the popup. must be present in ComponentController
                                passedEvents: {},
                                headerTitle: "",
                                Data: {}
                            });
                        }}>{Localization.TextFormatter(objTextResource, 'CompetenceLevel') }</span>
                    </div>
                    <div className="right-flex">
                        <div className="allPdf" onClick={HandlePdfPopup}>
                            {Localization.TextFormatter(objTextResource, 'AllPdfPopButtonText')}
                            <img src={AngleDownImage} style={state.Open === true ? { transform: "rotate(180deg)" } : { transform: "inherit" }} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return (<React.Fragment>{state.isLoadComplete || props.isLoadComplete ? <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}</React.Fragment>);
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(TestResultsBusinessLogic.mapStateToProps)(TestResults);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestTeacher_ModuleProcessor; 
