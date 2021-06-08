//react imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module Specific imports.
import * as HighStakeTestResults_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResults_Hook';
import HighStakeTestResults_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResults_ModuleProcessor';
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

//controls
import AllPdfTest from "@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResultsPopUp/AllPdfTest/AllPdfTest";
import ClassDropDown from "@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown";

//Inline Images import
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';
import AngleUpImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_up.svg?inline';
import ExcelIconImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Excel_icon.gif?inline';
import CloseTextImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/closeText.png?inline';
import WasteBinImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/icon_wastebin.gif?inline';
import AssignToDiffPupilImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/AssignToDiffPupil.gif?inline';
import RecalculateImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/Recalculate.gif?inline';


/**
 * @name HighStakeTestResults
 * @summary returns the required jsx for HighStakeTestResults module.
 * @param {any} props
 */
const HighStakeTestResults = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, HighStakeTestResults_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "HighStakeTestResults", ["HighStakeTestResults_ModuleProcessor"]: new HighStakeTestResults_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.HighStakeTestResults_ModuleProcessor.Initialize(objContext, objContext.HighStakeTestResults_ModuleProcessor);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    HighStakeTestResults_Hook.Initialize(objContext);

    /**
     * @name GetTableBodyDataForRepetiton
     * @param {any} objTestDetails
     * @param {any} objPupilDetails
     */
    function GetTableBodyDataForRepetiton(objTestDetails, objPupilDetails, objTextResource) {
        let arrData = [];
        let arrTestResultExists = objContext.HighStakeTestResults_ModuleProcessor.GetTestResults(objContext, objPupilDetails["uPupilId"], objTestDetails["uTestId"]);
        //let blnTestSelected = objContext.HighStakeTestResults_ModuleProcessor.GetSelectedTestResults(objContext, objTestDetails);
    
        if (arrTestResultExists.length > 0 && arrTestResultExists[0]["TestResultSummary"].length > 0) {
            var iTestStatusId = arrTestResultExists[0]["TestExecution"][0]["iTestStatusId"];
            let strResult = JSON.parse(arrTestResultExists[0]["TestResultSummary"][0]["vResultAttribute"])["Result"];
            let strBackGround = '';
            let iCombinedResult = 0;
            strResult < 400 && (strBackGround = '#ECE264');
            strResult > 400 && strResult < 600 && (strBackGround = '#AED3FF');
            strResult > 600 && (strBackGround = '#68D275');
            let objMoveEssayResults = undefined;
            let EssayPoints = 0;
            if (objTestDetails["uTestId"] == "785C9E43-14F3-4D3B-94D5-611E887C1857") { // for deutch testid
                let objEssayToken = objContext.HighStakeTestResults_ModuleProcessor.GetEssayToken(objContext, objPupilDetails["uPupilId"]);
                objMoveEssayResults = objEssayToken;
                if (objEssayToken && objEssayToken["TestResultSummary"].length > 0) {
                    EssayPoints = JSON.parse(objEssayToken["TestResultSummary"][0]["vResultAttribute"])["Result"];
                    if (EssayPoints > 0) {
                        if (objEssayToken && objEssayToken["TestResultSummarySubSubject"].length > 0) {
                            let arrSubSubjectIds = [6233, 6235, 6237];
                            let arrSubSubjectResults = objEssayToken["TestResultSummarySubSubject"].filter(x => arrSubSubjectIds.includes(x["iSubject"]))
                            if (arrSubSubjectResults.length > 0) {
                                let iDeutchResult = 0;
                                arrSubSubjectResults.forEach(x => {
                                    let objSubSubjectResult = JSON.parse(x["vResultAttribute"]);
                                    if (objSubSubjectResult != undefined && objSubSubjectResult["Result"] != undefined) {
                                        let intSubSubjectResult = parseInt(objSubSubjectResult["Result"]);
                                        iDeutchResult += intSubSubjectResult;
                                    }
                                })
                                iCombinedResult = Math.round((iDeutchResult + intEssayPoints) / 4);
                                iCombinedResult < 400 && (strBackGround = '#ECE264');
                                iCombinedResult > 400 && iCombinedResult < 600 && (strBackGround = '#AED3FF');
                                iCombinedResult > 600 && (strBackGround = '#68D275');
                            }
                        }
                    }
                }
            }
            let blnIsChecked = state.arrAllTestsForPupil.length > 0 && state.arrAllTestsForPupil.find(objTest => objTest["uTestId"] == objTestDetails["uTestId"] && objTest["uPupilId"] == objPupilDetails["uPupilId"]) ? true : false;
            arrData = [...arrData,
            <React.Fragment>
                <label className="checkContainer">
                    {
                        iTestStatusId == 5 ?
                            <React.Fragment>
                                <input type="checkbox"
                                    checked={blnIsChecked}
                                    onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.CheckAllTestsForPupil(objContext, objPupilDetails, blnIsChecked); }}
                                />
                                <span className="checkmark" />
                                {iCombinedResult > 0 ? < span className="numCount">{strResult}</span> : <span>{iCombinedResult}</span>}
                                <div class="percentageBg fourty" style={{ backgroundColor: strBackGround, height: strResult / 10 + "%" }} ></div>
                                {EssayPoints > 0 ? <div onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.OpenMoveResultsPopUp(objContext, objTextResource, objMoveEssayResults) }}>[S:{EssayPoints}]</div> : <React.Fragment />}
                            </React.Fragment> :
                            <span className="numCount">-</span>

                    }
                </label>
                {
                    arrTestResultExists.length > 0 ?
                        <div className="showbetanavigation-buttons">
                            <img src={ExcelIconImage} alt="" onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.CreateExcelProgressBarPopup(objContext, objTestDetails, objPupilDetails); }} />
                            <img src={WasteBinImage} alt="" onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.ResetResult(objContext, objTestDetails, arrTestResultExists[0]) }} />
                            {iTestStatusId == 5 ?
                                <img src={AssignToDiffPupilImage} onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.OpenMoveResultsPopUp(objContext, objTextResource, arrTestResultExists[0]) }} alt="" />
                                : ''}
                            <img src={RecalculateImage} alt="" onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.ReCalculateTestResult(objContext, objTestDetails, arrTestResultExists[0]) }} />
                        </div> : ''
                }
            </React.Fragment>
            ];
        }
        else {
            arrData = [...arrData,
            <label className="checkContainer checkHidden">
                <input type="checkbox" />
                <span className="checkmark" />
            </label>
            ];
        }
        return arrData;
    }

    /**
     * @name GetTableBodyDataForRepetitonPerSubject
     * @param {any} objPupilDetails
     */
    function GetTableBodyDataForRepetitonPerSubject(objPupilDetails, objTextResource) {
        let arrTestData = objContext.HighStakeTestResults_ModuleProcessor.GetTestData(objContext);
        let arrReturnData = [];
        if (arrTestData && arrTestData.length > 0) {
            arrTestData.map((objTempTestDetails) => {
                arrReturnData = [...arrReturnData,
                <td>
                    <div className="checkBoxFlex">
                        {
                            GetTableBodyDataForRepetiton(objTempTestDetails, objPupilDetails, objTextResource).map(objTempData => { return objTempData })
                        }
                    </div>
                </td>
                ];
            })
        }
        return arrReturnData;
    }

    /**
    * @name GetCertificateGenerationPopup
    * @returns {object} jsx for the certificate generation popup
    */
    function GetCertificateGenerationPopup(objTextResource) {
        return (
            <div>
                <div>
                    <span>
                        <div>
                            <h3>Leistungsprofil</h3>
                            <h5>Leistungsprofil erstellen</h5>
                        </div>
                        <div>
                            <span>
                                <img src={CloseTextImage} onClick={() => { dispatch({ type: "SET_STATE", payload: { "OpenCertifcateGenerationPopup": false } }); }} />
                            </span>
                        </div>
                    </span>
                    <div />
                </div>
                <div>
                    <div style={{ "margin-left": "20px" }}>
                        <div style={{ "display": "block", "margin": "20px 0 0 0" }}>
                            Wählen Sie, welches Leistungsprofil zu generieren ist.
                        </div>
                        <h5 style={{ "border-bottom": "1px solid #000", "margin": "20px 0 20px 0", "width": "98%" }}>Dokumentwahl</h5>
                        <div class="radiodark" style={{ "line-height": "40px", "position": "relative" }} onClick={() => { dispatch({ type: "SET_STATE", payload: { "strCertificateName": "MainCertificate" } }); }}>
                            <input id="ja" name="CertificatePopup" type="radio" checked={state.strCertificateName == "MainCertificate" ? true : false} />
                            <label for="yes"></label>
                            <span>Leistungsprofil Förderung: Gesamtwerte mit Ergebnissen in den Kompetenzbereichen </span>
                        </div>
                        <div style={{ "line-height": "40px", "position": "relative" }} onClick={() => { dispatch({ type: "SET_STATE", payload: { "strCertificateName": "FinalCertificate" } }); }}>
                            <input id="nein" name="CertificatePopup" type="radio" checked={state.strCertificateName == "FinalCertificate" ? true : false} />
                            <label for="no"></label>
                            <span class="align-middle" style={{ "paddingLeft": "25px" }}>Leistungsprofil Bewerbungsdossier: Nur Gesamtwerte mit Hinweis für die Berufsbildung </span>
                        </div>
                        <div style={{ "height": "30px", "position": "relative" }}></div>
                    </div>
                </div>
                <div>
                    <button class="yellowButton button btnIn" onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.GenerateCertificateConfirmationPopup(objContext, objTextResource) }}>Weiter</button>
                </div>
            </div>
        );
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for the component.
     * */
    function GetContent() {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrClasses = objContext.HighStakeTestResults_ModuleProcessor.GetAllClasses(objContext);
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/HighStakeTestResults", props)
        let arrClassData = objContext.HighStakeTestResults_ModuleProcessor.GetClassDropDownData(objContext, objTextResource);
        let blnArchive = objContext.HighStakeTestResults_ModuleProcessor.blnArchive;
        let arrDropDownCycles = [];
        let objCycleDropdownData = {};
        let objSchoolYearDropdownData = {};
        let arrDropDownSchoolYear = [];
        if (blnArchive) {
            arrDropDownCycles = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + objContext.HighStakeTestResults_ModuleProcessor.strCycleTypeId + ";cIsArchiveTeacher;Y;cIsActive;Y;cIsDeleted;N").Data;
            objCycleDropdownData = {
                DropdownData: arrDropDownCycles,
                SelectedValue: arrDropDownCycles[0].uCycleId
            };
            arrDropDownSchoolYear = DataRef(props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N").Data;
            objSchoolYearDropdownData = {
                DropdownData: arrDropDownSchoolYear,
                SelectedValue: arrDropDownSchoolYear[0].iSchoolYearId
            };
        }
        let arrTestDetails = [];
        let arrTestData = objContext.HighStakeTestResults_ModuleProcessor.GetTestData(objContext);
        let objFillHeightMeta = {
            HeaderIds: ["Header", "LegendsControls", "HighStakeTestResultsHeader", "TopSpace"],
            FooterIds: ["FooterHighStakeTestResults"]
        }
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId)["Data"];

        let arrPdfFilesInfo = objContext.HighStakeTestResults_ModuleProcessor.GetOfflineExecutionFiles(objContext, "HighStakeDataExport");
        let arrExcelFilesInfo = objContext.HighStakeTestResults_ModuleProcessor.GetOfflineExecutionFiles(objContext, "Certificate");
        let blnExternalUser = objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y" ? true : false;
        return (
            <div className="WrpCvr TestResults HighStakeTestResults">
                <div className="top-space" id="TopSpace" />
                {
                    blnExternalUser ? <div class="warning-text">{Localization.TextFormatter(objTextResource, 'KeyCloakText')}</div> : <React.Fragment />
                }
                {state.OpenCertifcateGenerationPopup ? GetCertificateGenerationPopup(objTextResource) : <React.Fragment />}
                {state.Open === true ?
                    <AllPdfTest
                        objContext={objContext}
                        objTextResource={objTextResource}
                        strClassId={strClassId}
                        arrClasses={arrClasses}
                        Data={{ PDFFiles: arrPdfFilesInfo, ExcelFiles: arrExcelFilesInfo }}
                        {...props}
                        HandlePdfPopup={() => { objContext.HighStakeTestResults_ModuleProcessor.HandlePdfPopup(objContext) }}
                        DeleteGeneratedOfflineProcessExecution={(strOfflinePropcessExecutionId) => { objContext.HighStakeTestResults_ModuleProcessor.DeleteGeneratedOfflineProcessExecution(objContext, strOfflinePropcessExecutionId); }}
                    /> : <div></div>}
                <div style={state.Open === true || state.OpenCertifcateGenerationPopup ? { display: "none" } : { display: "block" }}>
                    <div className="top-head-padd" id="HighStakeTestResultsHeader">
                        <div className="top-head">
                            <div className="top-head-left">
                                {blnArchive &&
                                    <div>
                                        <span>{Localization.TextFormatter(objTextResource, 'Cycle')}:</span>
                                        <div className="content-dropdown">
                                            <PerformanceProfiler ComponentName={"HighStakeTestResultsCycleDropDown"} JConfiguration={props.JConfiguration} >
                                                <WrapperComponent
                                                    ComponentName={"Dropdown"}
                                                    Id="HighStakeTestResultsCycleDropDown"
                                                    Meta={objContext.HighStakeTestResults_ModuleProcessor.GetMetaDataCycleDropDown(objContext)}
                                                    Data={objCycleDropdownData}
                                                    Resource={objContext.HighStakeTestResults_ModuleProcessor.GetResourceDataCycleDropDown()}
                                                    Events={objContext.HighStakeTestResults_ModuleProcessor.GetEventsCycleDropDown(objContext)}
                                                    ParentProps={{ ...props }}
                                                />
                                            </PerformanceProfiler>
                                        </div>
                                    </div>
                                }
                                <div>
                                    <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</span>
                                    <div className="content-dropdown">
                                        <PerformanceProfiler ComponentName={"HighStakeTestResultsClassDropDown"} JConfiguration={props.JConfiguration} >
                                            <ClassDropDown
                                                id="HighStakeTestResultsClassDropDown"
                                                Data={arrClassData}
                                                DisplayColumn="vClassName"
                                                ValueColumn="uClassId"
                                                SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                                JConfiguration={props.JConfiguration}
                                                ClientUserDetails={props.ClientUserDetails}
                                                OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.HighStakeTestResults_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }}
                                            />
                                        </PerformanceProfiler>
                                    </div>
                                </div>
                                {blnArchive &&
                                    <div>
                                        <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}:</span>
                                        <div className="content-dropdown">
                                            <PerformanceProfiler ComponentName={"HighStakeTestResultsClassDropDown"} JConfiguration={props.JConfiguration} >
                                                <WrapperComponent
                                                    ComponentName={"Dropdown"}
                                                    Id="HighStakeTestResultsClassDropDown"
                                                    Meta={objContext.HighStakeTestResults_ModuleProcessor.GetMetaDataSchoolYearDropDown(objContext)}
                                                    Data={objSchoolYearDropdownData}
                                                    Resource={objContext.HighStakeTestResults_ModuleProcessor.GetResourceDataCycleDropDown()}
                                                    Events={objContext.HighStakeTestResults_ModuleProcessor.GetEventsSchoolYearDropDown(objContext)}
                                                    ParentProps={{ ...props }}
                                                />
                                            </PerformanceProfiler>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="tablePadd">
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            id="HighStakeResultFillheight"
                            Meta={objFillHeightMeta}
                            ParentProps={{ ...props }} >
                            <table className="testResultsTable">
                                <tr className="border-0-td activeRow">
                                    <td>{Localization.TextFormatter(objTextResource, 'Learner')}</td>
                                    {
                                        arrTestData && arrTestData.length > 0 &&
                                        arrTestData.map((objSubjectData, index) => {
                                            return <td>{objSubjectData["vTestName"]}</td>
                                        })
                                    }
                                </tr>
                                <tr className="activeRow border-0-td">
                                    <td></td>
                                    {
                                        arrTestData && arrTestData.length > 4 ?
                                            arrTestData.map((objTestDetails, index) => {
                                                if (index > 3) {
                                                    return <td>
                                                        <div className="checkBoxFlex">
                                                            <label className="checkContainer RemoveCheckContainerHeight">
                                                                <input type="checkbox" onChange={(event) => { objContext.HighStakeTestResults_ModuleProcessor.OnChangeCheckBox(objContext, true, objTestDetails, null, event.target.checked) }} />
                                                                <span className="checkmark" />
                                                            </label>
                                                        </div>
                                                    </td>
                                                }
                                                else if (index === 3) {
                                                    arrTestDetails = [...arrTestDetails, objTestDetails];
                                                    return <td colSpan="4">
                                                        <div className="checkBoxFlex">
                                                            <label className="checkContainer RemoveCheckContainerHeight" style={{ "margin": "auto" }}>
                                                                <input type="checkbox" onChange={(event) => { objContext.HighStakeTestResults_ModuleProcessor.OnChangeCheckBox(objContext, true, arrTestDetails, null, event.target.checked) }} />
                                                                <span className="checkmark" />
                                                            </label>
                                                        </div>
                                                    </td>
                                                }
                                                else {
                                                    arrTestDetails = [...arrTestDetails, objTestDetails];
                                                }
                                            })
                                            : arrTestData && arrTestData.length > 0 && arrTestData.map((objTestDetails) => {
                                                return <td >
                                                    <div className="checkBoxFlex">
                                                        <label className="checkContainer RemoveCheckContainerHeight" style={{ "margin": "auto" }}>
                                                            <input type="checkbox" onChange={(event) => { objContext.HighStakeTestResults_ModuleProcessor.OnChangeCheckBox(objContext, true, objTestDetails, null, event.target.checked) }} />
                                                            <span className="checkmark" />
                                                        </label>
                                                    </div>
                                                </td>
                                            })
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
                                            <td class="no-data" colspan="4">
                                                No data found
                                            </td>
                                        </tr> : <React.Fragment></React.Fragment>
                                }
                            </table>
                        </WrapperComponent>
                    </div>
                </div>

                <div className="endPanel TstRst" id="FooterHighStakeTestResults">
                    <div className="leftFlex">
                    </div>
                    {
                        state.Open == false ?
                            <div className="leftFlex centerFlex">
                                {//!blnArchive &&
                                    <span
                                        className="button high-stake-button"
                                        onClick={() => {
                                            state.arrAllTestsForPupil.length > 0 || state.arrSelectedPupil.length > 0 || state.arrSelectedPupilForVV > 0 || state.arrSelectedPupilForTLV > 0 || state.arrSelectedPupilForPSM > 0 ?
                                                !state.blnIsClassEight ?
                                                    objContext.HighStakeTestResults_ModuleProcessor.HandleCertificateGenerationPopup(objContext)/*objContext.HighStakeTestResults_ModuleProcessor.OpenDetailPdfPopup(objContext,objTextResource)*/
                                                    : objContext.HighStakeTestResults_ModuleProcessor.GenerateCertificateConfirmationPopup(objContext, objTextResource)
                                                : objContext.HighStakeTestResults_ModuleProcessor.GenerateCertificateErrorPopup(objTextResource)
                                        }}
                                    >{Localization.TextFormatter(objTextResource, 'PerformanceProfiles')}</span>
                                }
                                <span
                                    className="button high-stake-button"
                                    onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.OpenProgressBarPopup(objContext, objTextResource) }}
                                >{Localization.TextFormatter(objTextResource, 'ValuesAsTable')}</span>
                                {
                                    !blnExternalUser ?
                                        <span
                                            className="button high-stake-button"
                                            onClick={() => { objContext.HighStakeTestResults_ModuleProcessor.OpenDataComparisonProgressBarPopup(objContext, objTextResource) }}
                                        >
                                            {Localization.TextFormatter(objTextResource, 'PerformanceComparision')}
                                        </span>
                                        : <React.Fragment />
                                }
                            </div>
                            : <React.Fragment />
                    }
                    <div className="footer" id="FooterPupil">
                        <div className="all-pdf" onClick={(event) => { objContext.HighStakeTestResults_ModuleProcessor.HandlePdfPopup(objContext); }}>
                            <span>{Localization.TextFormatter(objTextResource, 'AllPDFText')}</span>
                            <img className={state.Open === true ? "active" : ""} src={state.Open == true ? AngleDownImage : AngleUpImage} alt="" />
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
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(HighStakeTestResults_ModuleProcessor.StoreMapList()))(HighStakeTestResults);



/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = HighStakeTestResults_ModuleProcessor; 