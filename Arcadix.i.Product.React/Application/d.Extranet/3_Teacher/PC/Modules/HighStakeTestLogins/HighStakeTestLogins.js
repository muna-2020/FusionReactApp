//React imports.
import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";

//Module Specific imports.
import AllPdfTest from "@root/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLoginsPopups/AllPdfTest/AllPdfTest";
import TestLogins_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins_ModuleProcessor'
import * as TestLogins_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins_Hook'
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

//Controls
import ClassDropDown from "@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown";

//Inline Images import
import CompletedTestsLegendImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/CompletedTestsLegend.svg?inline';
import TestloginsPaperlessIncompleteActiveImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/TestloginsPaperlessIncompleteActive.svg?inline';
import TestLoginsPaperlessOpenImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/TestLoginsPaperlessOpen.svg?inline';
import TestloginsPaperlessIncompleteImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/TestloginsPaperlessIncomplete.svg?inline';
import ProcessImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/process.svg?inline';
import RocketImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/rocket.svg?inline';
import CheckImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/check.svg?inline';


/**
 * @name HighStakeTestLogins
 * @summary HighStakeTestLogins module(for generating tokens)
 * @param {any} props
 */
const HighStakeTestLogins = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TestLogins_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "HighStakeTestLogins", ["TestLogins_ModuleProcessor"]: new TestLogins_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestLogins_ModuleProcessor.Initialize(objContext, objContext.TestLogins_ModuleProcessor);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    TestLogins_Hook.Initialize(objContext);

    /**
     * 
     * @param {*} objTestDetails 
     * @summary   Retuens the jsx for the select-all check boxes. Also check if the select-all check box has to be enabled or not and also for which repetition the select-all checkbox is enabled and checked.
     */
    function GetTableHeaderDataForRepetition(objTestDetails, arrPupil) {
        let arrData = [];
        let blnShowAsDisabled = objContext.TestLogins_ModuleProcessor.CheckForDisableAllCheckBoxForKeyCloackUser(objContext, arrPupil, objTestDetails);
        let blnShowChecked = false;
        let blnIsTestFinished = false;
        let blnResult = objContext.TestLogins_ModuleProcessor.CheckIfAllTestLoginsCreatedForRepetition(objContext, arrPupil, 1, objTestDetails);
        if (blnResult) {
            blnIsTestFinished = objContext.TestLogins_ModuleProcessor.CheckIfAllTestFinishedForRepetition(objContext, arrPupil, 1, objTestDetails);
            blnShowChecked = true;
        }

        if (arrPupil.length === 0)//if no pupil are present for a class then none of the select-all check box will be enabled.
        {
            blnShowAsDisabled = true;
        }
        var uId = "Header_" + objTestDetails["iSubjectId"];
        if (blnShowAsDisabled) {
            arrData = [...arrData,
            <td><label id={uId} className="checkContainer disabledCheck">

                {
                    blnShowChecked ?
                        <React.Fragment>
                            <input id={"HeaderChk_" + uId} type="checkbox" onClick={() => { objContext.TestLogins_ModuleProcessor.ShowTestDisabledErrorPopup(objContext) }} />
                            <span id={"HeaderSp_" + uId} className={"checkmark"} />
                        </React.Fragment> :
                        <React.Fragment>
                            <input id={"HeaderChk_" + uId} type="checkbox" onClick={() => { objContext.TestLogins_ModuleProcessor.ShowTestDisabledErrorPopup(objContext) }} />
                            <span id={"HeaderSp_" + uId} className={"checkmark unchecked"} />
                        </React.Fragment>
                }
            </label></td>
            ];
        }
        else {
            arrData = [...arrData,
            <td><label id={uId} className="checkContainer">

                {
                    blnShowChecked ?
                        blnIsTestFinished ?
                            <React.Fragment>
                                <input id={"HeaderChk_" + uId} type="checkbox" checked />
                                <span id={"HeaderSp_" + uId} className={"checkmark"} />
                            </React.Fragment> :
                            <React.Fragment>
                                <input id={"HeaderChk_" + uId} type="checkbox" onChange={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, true, objTestDetails, null, 1, event.target.checked) }} checked />
                                <span id={"HeaderSp_" + uId} className={"checkmark"} />
                            </React.Fragment> :
                        <React.Fragment>
                            <input id={"HeaderChk_" + uId} type="checkbox" onChange={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, true, objTestDetails, null, 1, event.target.checked) }} />
                            <span id={"HeaderSp_" + uId} className={"checkmark unchecked"} />
                        </React.Fragment>
                }
            </label></td>
            ];
        }

        return arrData;
    }

    /**
     * @summary   Contains a map function for test data. Calls 'GetTableHeaderDataForRepetition' method to get the jsx.
     */
    function GetTableHeaderDataForRepetitionPerSubject(arrTestData, arrPupil) {
        let arrReturnData = arrTestData.map(objTempTestDetails =>
            <td>
                <table className="sub-table">
                    <tr>
                        {
                            GetTableHeaderDataForRepetition(objTempTestDetails, arrPupil).map(objTempData => { return objTempData })
                        }
                    </tr>
                </table>
            </td>

        )
        return arrReturnData;
    }

    /**
     * @name GetTableBodyDataForRepetiton
     * @param {*} objTestDetails 
     * @param {*} objPupilDetails 
     * @summary   Returns the check box for generating test login per repetition per student.
     */
    function GetTableBodyDataForRepetiton(objTestDetails, objPupilDetails) {
        let arrData = [];
        let blnShowAsDisabled = objContext.TestLogins_ModuleProcessor.CheckForDisableCheckBoxForKeyCloackUser(objContext, objPupilDetails["uPupilId"], objTestDetails["uTestId"]);
        let objExistsToken = objContext.TestLogins_ModuleProcessor.CheckIfTestTokenExist(objContext, objPupilDetails["uPupilId"], 1, objTestDetails);
        let blnIsTestValid = false;
        let blnIsTestStarted = false;
        let blnIsTestFinished = false;
        if (objExistsToken) {
            blnIsTestValid = objContext.TestLogins_ModuleProcessor.CheckIfTestIsValid(objContext, objExistsToken);
            blnIsTestStarted = objContext.TestLogins_ModuleProcessor.CheckIfTestStarted(objContext, objExistsToken);
            if (blnIsTestStarted) {
                blnIsTestFinished = objContext.TestLogins_ModuleProcessor.CheckIfTestFinished(objContext, objExistsToken);
            }
        }

        var uId = objTestDetails["iSubjectId"];
        if (blnShowAsDisabled) {
            arrData = [...arrData,
            <td>
                <label id={uId} className="checkContainer disabledCheck" onClick={() => { objContext.TestLogins_ModuleProcessor.ShowTestDisabledErrorPopup(objContext) }}>
                    <input id={"chk_" + uId} type="checkbox" />
                    <span id={"sp_" + uId} className={"checkmark unchecked"} />
                </label>
            </td>
            ];
        }
        else {
            arrData = [...arrData,
            <td><label id={uId} className="checkContainer">
                {
                    objExistsToken ?
                        <React.Fragment>
                            {
                                blnIsTestFinished ?
                                    <React.Fragment>
                                        <img src={CompletedTestsLegendImage} alt="" />
                                        <input id={"chk_" + uId} type="checkbox" />
                                        <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                    </React.Fragment> :
                                    <React.Fragment>
                                        {
                                            blnIsTestValid && blnIsTestStarted ?
                                                <React.Fragment>
                                                    <img src={TestloginsPaperlessIncompleteActiveImage} alt="" />
                                                    <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, 1, !(blnIsTestValid && blnIsTestStarted)) }} />
                                                    <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                </React.Fragment> :
                                                <React.Fragment>
                                                    {
                                                        blnIsTestValid && !blnIsTestStarted ?
                                                            <React.Fragment>
                                                                <img src={TestLoginsPaperlessOpenImage} alt="" />
                                                                <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, 1, !(blnIsTestValid && !blnIsTestStarted)) }} />
                                                                <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                            </React.Fragment> :
                                                            <React.Fragment>
                                                                {
                                                                    !blnIsTestValid && blnIsTestStarted ?
                                                                        <React.Fragment>
                                                                            <img src={TestloginsPaperlessIncompleteImage} alt="" />
                                                                            <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, 1, !(blnIsTestValid && !blnIsTestStarted)) }} />
                                                                            <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                                        </React.Fragment> :
                                                                        <React.Fragment>
                                                                            {
                                                                                blnIsTestValid ?
                                                                                    <React.Fragment>
                                                                                        <img src={TestLoginsPaperlessOpenImage} alt="" />
                                                                                        <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, 1, !blnIsTestValid) }} />
                                                                                        <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                                                    </React.Fragment> :
                                                                                    <React.Fragment>
                                                                                        <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, 1, !blnIsTestValid) }} />
                                                                                        <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                                                    </React.Fragment>
                                                                            }
                                                                        </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                    }
                                                </React.Fragment>
                                        }
                                    </React.Fragment>
                            }
                        </React.Fragment> :
                        <React.Fragment>
                            <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, 1, !(objExistsToken != undefined)) }} />
                            <span id={"sp_" + uId} className={"checkmark unchecked"} />
                        </React.Fragment>
                }
            </label>
            </td>
            ];
        }

        return arrData;
    }

    /**
     * 
     * @param {*} objPupilDetails 
     * @summary   Contains a map function for test data. Calls 'GetTableBodyDataForRepetiton' method to get the jsx.
     */
    function GetTableBodyDataForRepetitonPerSubject(arrTestData, objPupilDetails) {
        let arrReturnData = arrTestData.map(objTempTestDetails =>
            <td>
                <table className="sub-table">
                    <tr>
                        {
                            GetTableBodyDataForRepetiton(objTempTestDetails, objPupilDetails).map(objTempData => { return objTempData })
                        }
                    </tr>
                </table>
            </td>
        )
        return arrReturnData;
    }

    function GetFooterJsx(objContext, objTextResource) {
        return (
            <div className="endPanel" id="FooterTestLogins">
                <div />
                <div className="leftFlex">
                    <p>
                        {Localization.TextFormatter(objTextResource, 'FooterText1').replace("{!@TimeToInvalidate}", objContext.TestLogins_ModuleProcessor.GetTimeToInvalidate(objContext))}<br></br>{Localization.TextFormatter(objTextResource, 'FooterText2')}
                    </p>
                </div>
                <div>
                    {
                        !objContext.state.blnShowOptionalPdf && props.JConfiguration.MainClientId == "115" ?

                            <button className="button high-stake-button" onClick={() => { objContext.TestLogins_ModuleProcessor.HandleOptionalPdf(objContext) }}>
                                {Localization.TextFormatter(objTextResource, 'OptionalPdfButtonText')}
                            </button>

                            : <React.Fragment />
                    }
                </div>
            </div>
        )
    }

    /**
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestLogins", props)
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrClassData = objContext.TestLogins_ModuleProcessor.GetClassDropDownData(objContext, objTextResource);
        let arrTestData = objContext.TestLogins_ModuleProcessor.GetTestData(objContext);
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data

        return (
            <div className="WrpCvr HighStakeTestLogins" id="TestLogins">
                {
                    state.blnShowOptionalPdf ?
                        <div>
                            <AllPdfTest Data={state.arrOptionalPdf} {...props} HandlePdfPopup={() => { dispatch({ type: 'SET_STATE', payload: { blnShowOptionalPdf: false } }) }} />
                            {GetFooterJsx(objContext, objTextResource)}
                        </div>
                        : <div style={state.Open ? { display: "none" } : { display: "block" }}>
                            <div className="top-head-padd" id="TestLoginsHeader">
                                {
                                    state.blnShowInformationBar ?
                                        <div class="header-text">
                                            <div>
                                                {Localization.TextFormatter(objTextResource, 'HighStakeYellowBar1')}
                                            </div>
                                            <div>
                                                {Localization.TextFormatter(objTextResource, 'HighStakeYellowBar2')}
                                            </div>
                                        </div>
                                        : <React.Fragment />
                                }
                                <div className="top-head">
                                    <div className="top-head-left">
                                        <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}:</span>
                                        <div className="content-dropdown">
                                            <PerformanceProfiler ComponentName={"HighStakeTestLoginsClassDropDown"} JConfiguration={props.JConfiguration} >
                                                <ClassDropDown
                                                    id="HighStakeTestLoginsClassDropDown"
                                                    Data={arrClassData}
                                                    DisplayColumn="vClassName"
                                                    ValueColumn="uClassId"
                                                    SelectedValue={strClassId}
                                                    JConfiguration={props.JConfiguration}
                                                    ClientUserDetails={props.ClientUserDetails}
                                                    OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.TestLogins_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }} />
                                            </PerformanceProfiler>
                                        </div>

                                    </div>
                                    <div className="top-head-right">
                                        <button class="button yellow-button information-button" onClick={() => { objContext.TestLogins_ModuleProcessor.UpdateInformationPopupStatus(objContext) }}>{state.blnShowInformationBar ? Localization.TextFormatter(objTextResource, 'HideInformationBar') : Localization.TextFormatter(objTextResource, 'ShowInformationBar')}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="rightControls" id="LegendsControls">
                                <div className="left-text">
                                    {Localization.TextFormatter(objTextResource, 'DescriptionForIcons')}
                                </div>
                                <div className="right-block">
                                    <div className="menuWrap">
                                        <img src={RocketImage} alt="" />
                                        <span>{Localization.TextFormatter(objTextResource, 'TestStartLabel')}</span>
                                    </div>
                                    <div className="menuWrap">
                                        <img src={ProcessImage} alt="" />
                                        <span>{Localization.TextFormatter(objTextResource, 'InterruptionLabel')}</span>
                                    </div>
                                    <div className="menuWrap">
                                        <img src={CheckImage} alt="" />
                                        <span>{Localization.TextFormatter(objTextResource, 'CompletedLabel')}</span>
                                    </div>
                                </div>
                            </div>
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="TestLoginFillHeight" Meta={objContext.TestLogins_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                                <table className="testLoginTable">
                                    {
                                        arrTestData && arrTestData.length > 0 ?
                                            <React.Fragment>
                                                <tr className="activeRow">
                                                    <td>{Localization.TextFormatter(objTextResource, 'PupilText')}</td>
                                                    {
                                                        arrTestData.map(objTempData => {
                                                            return (
                                                                <td>
                                                                    {objTempData["vTestName"]}
                                                                </td>
                                                            );
                                                        })
                                                    }
                                                </tr>
                                                <tr className="activeRow">
                                                    <td>{Localization.TextFormatter(objTextResource, 'AllPupilText')} ({arrPupil.length})</td>
                                                    {
                                                        GetTableHeaderDataForRepetitionPerSubject(arrTestData, arrPupil)
                                                    }
                                                </tr>
                                                {
                                                    arrPupil && arrPupil.length > 0 ? arrPupil.map((objTempPupilDetails) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    {objTempPupilDetails["vFirstName"]} {objTempPupilDetails["vName"]}
                                                                </td>
                                                                {
                                                                    GetTableBodyDataForRepetitonPerSubject(arrTestData, objTempPupilDetails)
                                                                }
                                                            </tr>
                                                        );
                                                    })
                                                        :
                                                        <tr>
                                                            <td className="no-data" colSpan={arrTestData && arrTestData.length + 1}>
                                                                {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                                                            </td>
                                                        </tr>
                                                }
                                            </React.Fragment> :
                                            <React.Fragment>
                                                <tr>
                                                    <td className="no-data" colSpan={arrTestData && arrTestData.length + 1}>
                                                        {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                    }
                                </table>

                            </WrapperComponent>
                            {GetFooterJsx(objContext, objTextResource)}
                        </div>
                }
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return (props.isLoadComplete || state.isLoadComplete) ? GetContent() : <React.Fragment></React.Fragment>;
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(TestLogins_ModuleProcessor.StoreMapList()))(HighStakeTestLogins);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TestLogins_ModuleProcessor; 