//react imports
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports
import LearningTestTeacher_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher_ModuleProcessor'
import * as LearningTestTeacher_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher_Hook'

//controls
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import RocketImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/rocket.svg?inline';
import ProcessImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/process.svg?inline';
import TestPreviewImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/TestPreview.svg?inline';


/**
 * @name LearningTestTeacher
 * @summary component for manual learning test.
 * @param {any} props
 */
const LearningTestTeacher = (props) => {

    /**
     * @name Reduce Initializer.
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningTestTeacher_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "LearningTestTeacher", ["LearningTestTeacher_ModuleProcessor"]: new LearningTestTeacher_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.LearningTestTeacher_ModuleProcessor.Initialize(objContext, objContext.LearningTestTeacher_ModuleProcessor);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    LearningTestTeacher_Hook.Initialize(objContext);

    function GetDisplayData(arrExtranetTestData, objTextResource) {
        let arrReturnData = [];
        let blnIsActive = objContext.state.intStatusToggle == 1;
        arrExtranetTestData.map(objTestDetails => {
            let dtCreatedOn = new Date(objTestDetails["dtCreatedOn"]).toLocaleDateString(props.JConfiguration.LanguageCultureInfo);
            let arrSubjectData = objContext.LearningTestTeacher_ModuleProcessor.GetSubSubjects(objContext, "GetSpecificData", objTestDetails["iSubjectId"]);
            let arrSub = [...arrSubjectData];
            if (arrSubjectData.length === 0 || arrSubjectData[0]["iParentSubjectId"] !== 0) {
                arrSubjectData = objContext.LearningTestTeacher_ModuleProcessor.GetDefaultSubjects(objContext, "GetSpecificData", arrSubjectData[0]["iParentSubjectId"])
            }
            let objSubjectDataDetails = arrSubjectData[0]["t_TestDrive_Subject_Data"].filter(objTempData => objTempData["iLanguageId"] === parseInt(props.JConfiguration["InterfaceLanguageId"]))[0];
            let strModus = objTestDetails["t_TestDrive_Test_TestProperty"][0]["iTestUsageId"] == 2 ? Localization.TextFormatter(objTextResource, 'ModusDropdownItemFirst') : objTestDetails["t_TestDrive_Test_TestProperty"][0]["iTestUsageId"] == 3 ? Localization.TextFormatter(objTextResource, 'ModusDropdownItemSecond') : "";
            let objStatus = objContext.LearningTestTeacher_ModuleProcessor.GetStatus(objContext, objTestDetails);
            let intTaskCount = objTestDetails["t_testdrive_Test_Tasks"] ? objTestDetails["t_testdrive_Test_Tasks"].length : "";
            if (objTestDetails["t_TestDrive_Cycle_Class"].length > 0) {
                objTestDetails["t_TestDrive_Cycle_Class"].map(objTempData => {
                    let objClassDetails = objContext.LearningTestTeacher_ModuleProcessor.GetClassDetails(objContext, objTempData["uClassId"]);
                    let objRowElement =
                        <tr>
                            <td>{objTestDetails["vTestName"]}</td>
                            <td>
                                <span>
                                    <img src={TestPreviewImage} className="eyeIcon" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowTestPreviewPopup(objContext, objTestDetails["uTestId"]); }} />
                                </span>
                            </td>
                            <td>{dtCreatedOn}</td>
                            <td>
                                <span>{objClassDetails["vClassName"]}</span>
                            </td>
                            <td>{Localization.TextFormatter(objSubjectDataDetails, 'vSubjectName')}</td>
                            <td>{strModus}</td>
                            <td>{intTaskCount}</td>
                            <td>
                                <span>
                                    {
                                        objStatus["strStatus"] === "NotStarted" ?
                                            <img title="Übung bereit – noch nicht angefangen" src={RocketImage} /> :
                                            <img title="In Arbeit" src={ProcessImage} />
                                    }
                                </span>
                            </td>
                            <td>
                                <div className="table-btn-flex">
                                    <button className="button green-button" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ActivateOrDeleteLearningTest(objContext, objTestDetails) }}>
                                        {blnIsActive ? "Delete" : "Activate"}
                                    </button>
                                    <button className="button green-button" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowTeacherStatisticsPopUp(objContext, objTestDetails, objClassDetails, arrSub, objSubjectDataDetails, strModus, intTaskCount, objStatus, objTextResource) }}>
                                        {Localization.TextFormatter(objTextResource, 'TestDetailsButtonText')}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    arrReturnData = [...arrReturnData, objRowElement];
                });
            }
            if (objTestDetails["t_TestDrive_Cycle_Pupil"].length > 0) {
                objTestDetails["t_TestDrive_Cycle_Pupil"].map(objTempData => {
                    let objClassDetails = objContext.LearningTestTeacher_ModuleProcessor.GetClassDetails(objContext, objTempData["uClassId"]);
                    let objRowElement =
                        <tr>
                            <td>{objTestDetails["vTestName"]}</td>
                            <td>
                                <span>
                                    <img src={TestPreviewImage} className="eyeIcon" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowTestPreviewPopup(objContext, objTestDetails["uTestId"]); }} />
                                </span>
                            </td>
                            <td>{dtCreatedOn}</td>
                            <td>
                                <span>{objClassDetails["vClassName"]}</span>
                            </td>
                            <td>{objSubjectDataDetails["vSubjectName"]}</td>
                            <td>{strModus}</td>
                            <td>{intTaskCount}</td>
                            <td>
                                <span>
                                    {
                                        objStatus["strStatus"] === "NotStarted" ?
                                            <img title="Übung bereit – noch nicht angefangen" src={RocketImage} /> :
                                            <img title="In Arbeit" src={ProcessImage} />
                                    }
                                </span>
                            </td>
                            <td>
                                <div className="table-btn-flex">
                                    <button className="button green-button" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ActivateOrDeleteLearningTest(objContext, objTestDetails) }}>
                                        {blnIsActive ? "Delete" : "Activate"}
                                    </button>
                                    <button className="button green-button" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowTeacherStatisticsPopUp(objContext, objTestDetails, objClassDetails, arrSub, objSubjectDataDetails, strModus, intTaskCount, objStatus, objTextResource) }}>
                                        {Localization.TextFormatter(objTextResource, 'TestDetailsButtonText')}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    arrReturnData = [...arrReturnData, objRowElement]
                });
            }
        })

        return arrReturnData;
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", props)
        let arrClassData = objContext.LearningTestTeacher_ModuleProcessor.GetClassDropDownData(objContext, objTextResource);
        let arrExtranetTestData = objContext.LearningTestTeacher_ModuleProcessor.GetFilteredTestData(objContext);
        return (
            <div className="learning-test-teacher green-bg" id="LearnJournalComponent">
                <div className="top-head-padd" id="LearningTestTeacherHeader">
                    <div className="top-head">
                        <div className="top-head-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ClassDropdownLabel')}</span>
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestClassDropDown"} JConfiguration={props.JConfiguration} >
                                    <ClassDropDown
                                        id="LearningTestClassDropDown"
                                        Data={arrClassData}
                                        DisplayColumn="vClassName"
                                        ValueColumn="uClassId"
                                        SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                        JConfiguration={props.JConfiguration}
                                        ClientUserDetails={props.ClientUserDetails}
                                        OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.LearningTestTeacher_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }} />
                                </PerformanceProfiler>
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'PupilDropdownLabel')}</span>
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestPupilDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningTestPupilDropdown"}
                                        Meta={objContext.LearningTestTeacher_ModuleProcessor.GetPupilDropdownMetaData(objContext)}
                                        Data={objContext.LearningTestTeacher_ModuleProcessor.GetPupilDropdownData(objContext)}
                                        Resource={objContext.LearningTestTeacher_ModuleProcessor.GetResourceData(objTextResource)}
                                        Events={objContext.LearningTestTeacher_ModuleProcessor.GetPupilDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'SubjectDropdownLabel')}</span>
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestSubjectDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningTestSubjectDropdown"}
                                        Meta={objContext.LearningTestTeacher_ModuleProcessor.GetSubjectDropdownMetaData(objContext)}
                                        Data={objContext.LearningTestTeacher_ModuleProcessor.GetSubjectDropdownData(objContext)}
                                        Resource={objContext.LearningTestTeacher_ModuleProcessor.GetResourceData(objTextResource)}
                                        Events={objContext.LearningTestTeacher_ModuleProcessor.GetSubjectDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'SubSubjectDropdownLabel')}</span>
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestSubSubjectDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningTestSubSubjectDropdown"}
                                        Meta={objContext.LearningTestTeacher_ModuleProcessor.GetSubSubjectDropdownMetaData(objContext)}
                                        Data={objContext.LearningTestTeacher_ModuleProcessor.GetSubSubjectDropdownData(objContext)}
                                        Resource={objContext.LearningTestTeacher_ModuleProcessor.GetResourceData(objTextResource)}
                                        Events={objContext.LearningTestTeacher_ModuleProcessor.GetSubSubjectDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'ModusDropdownLabel')}</span>
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestModusDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningTestModusDropdown"}
                                        Meta={objContext.LearningTestTeacher_ModuleProcessor.GetModusDropdownMetaData()}
                                        Data={objContext.LearningTestTeacher_ModuleProcessor.GetModusDropdownData(objContext, objTextResource)}
                                        Resource={objContext.LearningTestTeacher_ModuleProcessor.GetResourceData(objTextResource)}
                                        Events={objContext.LearningTestTeacher_ModuleProcessor.GetModusDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                        <div className="top-head-right">
                            <div className="button green-button" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.OnClickSearchButton(objContext) }} >
                                {Localization.TextFormatter(objTextResource, 'SearchButtonText')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="learning-test-teacher-content">
                    <span class="head" id="ContentHead">
                        {Localization.TextFormatter(objTextResource, 'TaskSet')} ({arrExtranetTestData ? arrExtranetTestData.length : 0})
                        <div className="content-dropdown">
                            <PerformanceProfiler ComponentName={"LearningTestStatusDropdown"} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id={"LearningTestStatusDropdown"}
                                    Meta={objContext.LearningTestTeacher_ModuleProcessor.GetStatusDropdownMetaData()}
                                    Data={objContext.LearningTestTeacher_ModuleProcessor.GetStatusDropdownData(objContext, objTextResource)}
                                    Resource={objContext.LearningTestTeacher_ModuleProcessor.GetResourceData(objTextResource)}
                                    Events={objContext.LearningTestTeacher_ModuleProcessor.GetStatusDropdownEvents(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>
                    </span>
                    <div className="learning-test-teacher-controls" id="LearningTestTeacherControls">
                        <div className="controls-left">
                            <div className="dropdown-slider">
                                <PerformanceProfiler ComponentName={"LearningTestWeekDisplay"} JConfiguration={props.JConfiguration} >
                                    <WeekDisplay
                                        Id={"LearningTestWeekDisplay"}
                                        JConfiguration={props.JConfiguration} OnChangeDisplay={(objItem) => { objContext.LearningTestTeacher_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem) }} backgroundColor="#dde0c9" />
                                </PerformanceProfiler>
                            </div>
                        </div>
                        <div className="controls-right">
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestTimePeriodDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"LearningTestTimePeriodDropdown"}
                                        Meta={objContext.LearningTestTeacher_ModuleProcessor.GetTimePeriodDropdownMetaData()}
                                        Data={objContext.LearningTestTeacher_ModuleProcessor.GetTimePeriodDropdownData(objContext, objTextResource)}
                                        Resource={objContext.LearningTestTeacher_ModuleProcessor.GetTimePeriodResourceData(objTextResource)}
                                        Events={objContext.LearningTestTeacher_ModuleProcessor.GetTimePeriodDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                    </div>
                    <div className="learning-test-teacher-table" id="LearningTestTeacherTable">
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="LearningTestTeacherHeader" Meta={objContext.LearningTestTeacher_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }} className="bgStyle" scrollStyle={{ overflow: "auto" }}>
                            <table>
                                {
                                    arrExtranetTestData === undefined || arrExtranetTestData.length === 0 ?
                                        <tr><td className="no-data" colSpan={9}>
                                            {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                                        </td></tr>
                                        : <tr>
                                            <th>{Localization.TextFormatter(objTextResource, 'TableFirstColumnText')}</th>
                                            <th>
                                                <span>
                                                    <img src={TestPreviewImage} className="eyeIcon" />
                                                </span>
                                            </th>
                                            <th>{Localization.TextFormatter(objTextResource, 'TableSecondColumnText')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'TableThirdColumnText')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'TableFourthColumnText')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'TableFifthColumnText')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'TableSixthColumnText')}</th>
                                            <th>{Localization.TextFormatter(objTextResource, 'TableSeventhColumnText')}</th>
                                            <th />
                                        </tr>
                                }
                                {GetDisplayData(arrExtranetTestData, objTextResource)}
                            </table>

                        </WrapperComponent>
                    </div>
                </div>
                <div className="footer" id="FooterLearningTest">
                    <div className="footer-flex">
                        {state.intStatusToggle == 1 ?
                            <button className="button yellow-button" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowLearningTestCreationPopUp(objContext, objTextResource) }}>
                                {Localization.TextFormatter(objTextResource, 'CreateTaskSetButtontext')}
                            </button> :
                            <React.Fragment />
                        }
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(LearningTestTeacher_ModuleProcessor.StoreMapList()))(LearningTestTeacher);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestTeacher_ModuleProcessor; 