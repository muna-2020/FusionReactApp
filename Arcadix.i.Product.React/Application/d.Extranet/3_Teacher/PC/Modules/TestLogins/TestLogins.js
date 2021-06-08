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
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";

//Inline Images import
import CompletedTestsLegendImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/CompletedTestsLegend.svg?inline';
import TestloginsPaperlessIncompleteActiveImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestloginsPaperlessIncompleteActive.svg?inline';
import TestLoginsPaperlessOpenImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLoginsPaperlessOpen.svg?inline';
import TestloginsPaperlessIncompleteImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestloginsPaperlessIncomplete.svg?inline';
import ProcessImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/process.svg?inline';
import RocketImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/rocket.svg?inline';
import CheckImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/check.svg?inline';

/**
 * @name TestLogins
 * @summary TestLogins module(for generating tokens)
 * @param {any} props
 */
const TestLogins = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TestLogins_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestLogins", ["TestLogins_ModuleProcessor"]: new TestLogins_ModuleProcessor() };

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
     * @name Resize
     * @summary dispatches the resize event.
     * */
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [state.Open]);

    /**
     * 
     * @param {*} objTestDetails 
     * @summary   Retuens the jsx for the select-all check boxes. Also check if the select-all check box has to be enabled or not and also for which repetition the select-all checkbox is enabled and checked.
     */
    function GetTableHeaderDataForRepetition(objTestDetails, arrPupil) {
        let objCycleData = objContext.TestLogins_ModuleProcessor.GetCycleData(objContext);
        let arrData = [];
        let intIndexForDisabledCheckbox = -1;
        let blnShowAsDisabled = objContext.TestLogins_ModuleProcessor.CheckForDisableAllCheckBoxForKeyCloackUser(objContext, arrPupil, objTestDetails);
        for (let intTempRepetitionCount = 1; intTempRepetitionCount <= parseInt(objCycleData["iCycleNumberOfRepetitions"]); intTempRepetitionCount++) {
            let blnShowChecked = false;
            let blnIsTestFinished = false;
            let blnResult = objContext.TestLogins_ModuleProcessor.CheckIfAllTestLoginsCreatedForRepetition(objContext, arrPupil, intTempRepetitionCount, objTestDetails);
            if (blnResult) {
                blnIsTestFinished = objContext.TestLogins_ModuleProcessor.CheckIfAllTestFinishedForRepetition(objContext, arrPupil, intTempRepetitionCount, objTestDetails);
                if (blnIsTestFinished) {
                    intIndexForDisabledCheckbox = intTempRepetitionCount + 2;
                }
                else {
                    intIndexForDisabledCheckbox = intTempRepetitionCount + 1;
                }
                blnShowChecked = true;
            }
            else {
                if (intIndexForDisabledCheckbox === -1) {
                    intIndexForDisabledCheckbox = intTempRepetitionCount + 1;
                }
            }
            if (intTempRepetitionCount >= intIndexForDisabledCheckbox || arrPupil.length === 0)//if no pupil are present for a class then none of the select-all check box will be enabled.
            {
                blnShowAsDisabled = true;
            }
            var uId = "Header_" + intTempRepetitionCount.toString() + objTestDetails["iSubjectId"];
            if (blnShowAsDisabled) {
                arrData = [...arrData,
                <td><label id={uId} className="checkContainer disabledCheck">
                    <span id={"HeaderCountSp_" + uId} className="spanNum">{intTempRepetitionCount}</span>
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
                    <span id={"HeaderCountSp_" + uId} className="spanNum">{intTempRepetitionCount}</span>
                    {
                        blnShowChecked ?
                            blnIsTestFinished ?
                                <React.Fragment>
                                    <input id={"HeaderChk_" + uId} type="checkbox" checked />
                                    <span id={"HeaderSp_" + uId} className={"checkmark"} />
                                </React.Fragment> :
                                <React.Fragment>
                                    <input id={"HeaderChk_" + uId} type="checkbox" onChange={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, true, objTestDetails, null, intTempRepetitionCount, event.target.checked) }} checked />
                                    <span id={"HeaderSp_" + uId} className={"checkmark"} />
                                </React.Fragment> :
                            <React.Fragment>
                                <input id={"HeaderChk_" + uId} type="checkbox" onChange={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, true, objTestDetails, null, intTempRepetitionCount, event.target.checked) }} />
                                <span id={"HeaderSp_" + uId} className={"checkmark unchecked"} />
                            </React.Fragment>
                    }
                </label></td>
                ];
            }
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
        let objCycleData = objContext.TestLogins_ModuleProcessor.GetCycleData(objContext);
        let arrData = [];
        let intIndexForDisabledCheckbox = -1;
        let blnShowAsDisabled = objContext.TestLogins_ModuleProcessor.CheckForDisableCheckBoxForKeyCloackUser(objContext, objPupilDetails["uPupilId"], objTestDetails["uTestId"]);

        for (let intTempRepetitionCount = 1; intTempRepetitionCount <= parseInt(objCycleData["iCycleNumberOfRepetitions"]); intTempRepetitionCount++) {
            let objExistsToken = objContext.TestLogins_ModuleProcessor.CheckIfTestTokenExist(objContext, objPupilDetails["uPupilId"], intTempRepetitionCount, objTestDetails);
            let blnIsTestValid = false;
            let blnIsTestStarted = false;
            let blnIsTestFinished = false;
            if (objTestDetails["uTestId"] == "313B9242-E998-41B6-B3A4-DC3FFAD1B9AD" && objPupilDetails["vFirstName"] == "4" && intTempRepetitionCount == 1) {
                debugger;
                console.log("token details ", objExistsToken);
            }
            if (objExistsToken) {
                blnIsTestValid = objContext.TestLogins_ModuleProcessor.CheckIfTestIsValid(objContext, objExistsToken);
                blnIsTestStarted = objContext.TestLogins_ModuleProcessor.CheckIfTestStarted(objContext, objExistsToken);
                if (blnIsTestStarted) {
                    blnIsTestFinished = objContext.TestLogins_ModuleProcessor.CheckIfTestFinished(objContext, objExistsToken);
                }
                if (blnIsTestFinished) {
                    intIndexForDisabledCheckbox = intTempRepetitionCount + 2;
                }
                else {
                    intIndexForDisabledCheckbox = intTempRepetitionCount + 1;
                }
            }
            else {
                if (intIndexForDisabledCheckbox === -1) {
                    intIndexForDisabledCheckbox = intTempRepetitionCount + 1;
                }
            }
            if (intTempRepetitionCount >= intIndexForDisabledCheckbox) {
                blnShowAsDisabled = true;
            }
            var uId = intTempRepetitionCount.toString() + objTestDetails["iSubjectId"];
            if (blnShowAsDisabled) {
                arrData = [...arrData,
                <td>
                    <label id={uId} className="checkContainer disabledCheck" onClick={() => { objContext.TestLogins_ModuleProcessor.ShowTestDisabledErrorPopup(objContext) }} >
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
                                                        <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, intTempRepetitionCount, !(blnIsTestValid && blnIsTestStarted)) }} />
                                                        <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                    </React.Fragment> :
                                                    <React.Fragment>
                                                        {
                                                            blnIsTestValid && !blnIsTestStarted ?
                                                                <React.Fragment>
                                                                    <img src={TestLoginsPaperlessOpenImage} alt="" />
                                                                    <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, intTempRepetitionCount, !(blnIsTestValid && !blnIsTestStarted)) }} />
                                                                    <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                                </React.Fragment> :
                                                                <React.Fragment>
                                                                    {
                                                                        !blnIsTestValid && blnIsTestStarted ?
                                                                            <React.Fragment>
                                                                                <img src={TestloginsPaperlessIncompleteImage} alt="" />
                                                                                <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, intTempRepetitionCount, !(blnIsTestValid && !blnIsTestStarted)) }} />
                                                                                <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                                            </React.Fragment> :
                                                                            <React.Fragment>
                                                                                {
                                                                                    blnIsTestValid ?
                                                                                        <React.Fragment>
                                                                                            <img src={TestLoginsPaperlessOpenImage} alt="" />
                                                                                            <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, intTempRepetitionCount, !blnIsTestValid) }} />
                                                                                            <span id={"sp_" + uId} className={"checkmark unchecked"} />
                                                                                        </React.Fragment> :
                                                                                        <React.Fragment>
                                                                                            <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, intTempRepetitionCount, !blnIsTestValid) }} />
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
                                <input id={"chk_" + uId} type="checkbox" onClick={(event) => { objContext.TestLogins_ModuleProcessor.OnChangeCheckBox(objContext, false, objTestDetails, objPupilDetails, intTempRepetitionCount, !(objExistsToken != undefined)) }} />
                                <span id={"sp_" + uId} className={"checkmark unchecked"} />
                            </React.Fragment>
                    }
                </label>
                </td>
                ];
            }
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

    /**
     * @name GetFooterJsx
     * @summary returns footer jsx
     * @param {any} objTextResource
     */
    function GetFooterJsx(objTextResource) {
        return (
            <div className="endPanel" id="FooterTestLogins">
                <div />
                <div className="leftFlex">
                    <p>
                        {Localization.TextFormatter(objTextResource, 'FooterText1').replace("{!@TimeToInvalidate}", objContext.TestLogins_ModuleProcessor.GetTimeToInvalidate(objContext))}<br></br>{Localization.TextFormatter(objTextResource, 'FooterText2')}
                    </p>
                </div>
                <div />
            </div>
        )
    }

    /**
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestLogins", props)
        let arrClassData = objContext.TestLogins_ModuleProcessor.GetClassDropDownData(objContext, objTextResource);
        let arrSubjects = objContext.TestLogins_ModuleProcessor.GetDefaultSubjects(objContext);
        let iSubjectId = state.intSelectedSubjectId > -1 ? state.intSelectedSubjectId : arrSubjects.length > 0 ? arrSubjects[0]["iSubjectId"] : -1;
        let arrTestData = objContext.TestLogins_ModuleProcessor.GetTestData(objContext);
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data
        let cIsExternalUser = (objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y") ? true : false;

        return (
            <div className="WrpCvr TestLogins" id="TestLogins">
                <div className="top-space" id="TopSpace" />
                <div style={state.Open ? { display: "none" } : { display: "block" }}>
                    <div className="top-head-padd" id="TestLoginsHeader">
                        {
                            (!state.blnCurrentSchoolYearPeriod && state.blnShowInformationBar) ?
                                <div class="header-text">
                                    {Localization.TextFormatter(objTextResource, 'YellowBarText')}
                                </div> :
                                <React.Fragment />
                        }
                        <div className="top-head">
                            <div className="top-head-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}:</span>
                                <div className="content-dropdown">
                                    <ClassDropDown
                                        id="ClassDropDown"
                                        Data={arrClassData}
                                        DisplayColumn="vClassName"
                                        ValueColumn="uClassId"
                                        SelectedValue={strClassId}
                                        JConfiguration={props.JConfiguration}
                                        ClientUserDetails={props.ClientUserDetails}
                                        OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.TestLogins_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }} />
                                </div>

                                <React.Fragment>
                                    <span>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}:</span>
                                    <div className="content-dropdown">
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"TestLogin_Subject"}
                                            Meta={objContext.TestLogins_ModuleProcessor.GetSubjectDropdownMetaData()}
                                            Data={objContext.TestLogins_ModuleProcessor.GetSubjectDropdownData(arrSubjects, iSubjectId)}
                                            Resource={objContext.TestLogins_ModuleProcessor.GetResourceData()}
                                            Events={objContext.TestLogins_ModuleProcessor.GetSubjectDropdownEvents(objContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </div>
                                </React.Fragment>



                            </div>
                            {
                                !state.blnCurrentSchoolYearPeriod ?
                                    <div className="top-head-right">
                                        <button class="button yellow-button information-button" onClick={() => {
                                            objContext.TestLogins_ModuleProcessor.UpdateInformationPopupStatus(objContext)
                                        }}>
                                            {Localization.TextFormatter(objTextResource, state.blnShowInformationBar ? 'HideInformationBar' : 'ShowInformationBar')}
                                        </button>
                                    </div>
                                    : <React.Fragment />
                            }
                        </div>

                    </div>
                    <div className="rightControls" id="LegendsControls">

                        <WeekDisplay JConfiguration={props.JConfiguration} OnChangeDisplay={(objItem) => { objContext.TestLogins_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem) }} />


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
                                arrTestData || arrTestData != null ? arrTestData.length > 0 ?
                                    <React.Fragment>
                                        <tr>
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
                                                    <td className="no-data" colSpan={arrTestData.length + 1}>
                                                        {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                                                    </td>
                                                </tr>
                                        }
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <tr>
                                            <td className="no-data" colSpan={arrTestData.length + 1}>
                                                {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                    : <React.Fragment />
                            }
                        </table>

                    </WrapperComponent>
                    {
                        GetFooterJsx(objTextResource)
                    }
                </div>
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
export default connect(ExtranetBase_Hook.MapStoreToProps(TestLogins_ModuleProcessor.StoreMapList()))(TestLogins);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TestLogins_ModuleProcessor; 