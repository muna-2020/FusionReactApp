//react imports
import React, { useReducer, useState } from "react";
import { connect } from "react-redux";

//Module specific imports
import LearningTestTeacher_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/LearningTestTeacher/LearningTestTeacher_ModuleProcessor'
import * as LearningTestTeacher_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/LearningTestTeacher/LearningTestTeacher_Hook'

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

    const [accordion, openAccordian] = useState(1);

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
                objTestDetails["t_TestDrive_Cycle_Class"].map((objTempData, intIndex) => {
                    let objClassDetails = objContext.LearningTestTeacher_ModuleProcessor.GetClassDetails(objContext, objTempData["uClassId"]);
                    let blnShowTestDetails = state.strSelectedTestToShow === "00000000-0000-0000-0000-000000000000"? false :
                     state.strSelectedTestToShow === objTempData["uCycleClassId"] || (state.strSelectedTestToShow.length == 0 && intIndex == 0) 
                    let objRowElement =
                        <div className="task-accordian-main-wrapper">
                            <div className="task-accordian-header" onClick={() => {
                                // accordion == 1 ? openAccordian(0) : openAccordian(1);
                                objContext.LearningTestTeacher_ModuleProcessor.SetTestToShow(objContext, objTempData["uCycleClassId"])
                            }}>
                                <div className="task-accordian-header-left-content">
                                    <span title="Deutsch-Lesen">{Localization.TextFormatter(objTextResource, 'NoDataFoundText')} <b>{objTestDetails["vTestName"]}</b></span>
                                    <span title="11.01.2021">{Localization.TextFormatter(objTextResource, 'TableSecondColumnText')} <b>{dtCreatedOn}</b></span>
                                </div>

                                <div className="task-accordian-header-right-content">
                                    {
                                        objStatus["strStatus"] === "NotStarted" ?
                                            <img title="Übung bereit – noch nicht angefangen" src={RocketImage} /> :
                                            <img title="In Arbeit" src={ProcessImage} />
                                    }
                                    {
                                        blnShowTestDetails ?
                                            <img
                                                src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_up.png")}
                                            />
                                            :
                                            <img
                                                src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                                            />
                                    }
                                </div>
                            </div>

                            <div className={blnShowTestDetails ? "task-accordian-content show" : "task-accordian-content"} >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'TableThirdColumnText')}</td>
                                            <td colspan="2">{objClassDetails["vClassName"]}</td>
                                        </tr>

                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'TableFourthColumnText')}</td>
                                            <td colspan="2">{Localization.TextFormatter(objSubjectDataDetails, 'vSubjectName')}</td>
                                        </tr>

                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'TableFifthColumnText')}</td>
                                            <td colspan="2">{strModus}</td>
                                        </tr>

                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'TableSixthColumnText')}</td>
                                            <td colspan="2">{intTaskCount}</td>
                                        </tr>

                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'TableSeventhColumnText')}</td>
                                            <td colspan="2">
                                                <span>
                                                    {
                                                        objStatus["strStatus"] === "NotStarted" ?
                                                            <img title="Übung bereit – noch nicht angefangen" src={RocketImage} /> :
                                                            <img title="In Arbeit" src={ProcessImage} />
                                                    }
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="table-footer-button">
                                    <img src={TestPreviewImage} className="eyeIcon" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowTestPreviewPopup(objContext, objTestDetails["uTestId"]); }} />
                                    <button onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ActivateOrDeleteLearningTest(objContext, objTestDetails) }}>
                                        {blnIsActive ? "Delete" : "Activate"}
                                    </button>
                                    <button onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowTeacherStatisticsPopUp(objContext, objTestDetails, objClassDetails, arrSub, objSubjectDataDetails, strModus, intTaskCount, objStatus, objTextResource) }}>
                                        {Localization.TextFormatter(objTextResource, 'TestDetailsButtonText')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    arrReturnData = [...arrReturnData, objRowElement];
                });
            }
            if (objTestDetails["t_TestDrive_Cycle_Pupil"].length > 0) {
                objTestDetails["t_TestDrive_Cycle_Pupil"].map((objTempData, intIndex) => {
                    let objClassDetails = objContext.LearningTestTeacher_ModuleProcessor.GetClassDetails(objContext, objTempData["uClassId"]);
                    let blnShowTestDetails = state.strSelectedTestToShow === "00000000-0000-0000-0000-000000000000"? false :
                     state.strSelectedTestToShow === objTempData["uCyclePupilId"] || (state.strSelectedTestToShow.length == 0 &&  objTestDetails["t_TestDrive_Cycle_Class"].length > 0 && intIndex == 0) 
                    let objRowElement =
                    <div className="task-accordian-main-wrapper">
                        <div className="task-accordian-header" onClick={() => {
                            // accordion == 1 ? openAccordian(0) : openAccordian(1);
                            objContext.LearningTestTeacher_ModuleProcessor.SetTestToShow(objContext, objTempData["uCyclePupilId"])
                        }}>
                            <div className="task-accordian-header-left-content">
                                <span title="Deutsch-Lesen">{Localization.TextFormatter(objTextResource, 'NoDataFoundText')} <b>{objTestDetails["vTestName"]}</b></span>
                                <span title="11.01.2021">{Localization.TextFormatter(objTextResource, 'TableSecondColumnText')} <b>{dtCreatedOn}</b></span>
                            </div>

                            <div className="task-accordian-header-right-content">
                                {
                                    objStatus["strStatus"] === "NotStarted" ?
                                        <img title="Übung bereit – noch nicht angefangen" src={RocketImage} /> :
                                        <img title="In Arbeit" src={ProcessImage} />
                                }
                                {
                                    blnShowTestDetails ?
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_up.png")}
                                        />
                                        :
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                                        />
                                }
                            </div>
                        </div>

                        <div className={blnShowTestDetails ? "task-accordian-content show" : "task-accordian-content"} >
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'TableThirdColumnText')}</td>
                                        <td colspan="2">{objClassDetails["vClassName"]}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'TableFourthColumnText')}</td>
                                        <td colspan="2">{objSubjectDataDetails["vSubjectName"]}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'TableFifthColumnText')}</td>
                                        <td colspan="2">{strModus}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'TableSixthColumnText')}</td>
                                        <td colspan="2">{intTaskCount}</td>
                                    </tr>


                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'TableSeventhColumnText')}</td>
                                        <td colspan="2">
                                            <span>
                                                {
                                                    objStatus["strStatus"] === "NotStarted" ?
                                                        <img title="Übung bereit – noch nicht angefangen" src={RocketImage} /> :
                                                        <img title="In Arbeit" src={ProcessImage} />
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="table-footer-button">
                                <img src={TestPreviewImage} className="eyeIcon" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowTestPreviewPopup(objContext, objTestDetails["uTestId"]); }} />
                                <button onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ActivateOrDeleteLearningTest(objContext, objTestDetails) }}>
                                    {blnIsActive ? "Delete" : "Activate"}
                                </button>
                                <button onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowTeacherStatisticsPopUp(objContext, objTestDetails, objClassDetails, arrSub, objSubjectDataDetails, strModus, intTaskCount, objStatus, objTextResource) }}>
                                    {Localization.TextFormatter(objTextResource, 'TestDetailsButtonText')}
                                </button>
                            </div>
                        </div>
                    </div>
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
            <div className="teacher-learning-test-teacher">
            {/*Title head section*/}
            <div className="teacher-learning-test-teacher-title">
                <div className="teacher-learning-test-teacher-title-left">
                    <span className="heading-left">Fordern</span>
                    <img
                        src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/arrow-angle-pointing-to-right.svg")}
                    />
                    <span className="menu-title">Durch Lehrperson</span>
                </div>
                <div className="teacher-learning-test-teacher-title-right">
                    <img
                        src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}
                    />
                </div>
            </div>

            {/*Top head dropdown section*/}

            <div className="top-head">
                <div className="dropdown-main-wrapper">
                    <div className="teacher-learning-test-teacher-dropdown-wrapper">
                        <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'ClassDropdownLabel')}</span>
                        <div className="teacher-learning-test-teacher-dropdown">
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
                    </div>

                    <div className="teacher-learning-test-teacher-dropdown-wrapper">
                        <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'PupilDropdownLabel')}</span>
                        <div className="teacher-learning-test-teacher-dropdown">
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
                    </div>



                </div>

                <div className="dropdown-main-wrapper">
                    <div className="teacher-learning-test-teacher-dropdown-wrapper">
                        <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'SubjectDropdownLabel')}</span>
                        <div className="teacher-learning-test-teacher-dropdown">
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
                    </div>

                    <div className="teacher-learning-test-teacher-dropdown-wrapper">
                        <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'SubSubjectDropdownLabel')}</span>
                        <div className="teacher-learning-test-teacher-dropdown">
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
                    </div>



                </div>

                <div className="dropdown-main-wrapper">
                    <div className="teacher-learning-test-teacher-dropdown-wrapper">
                        <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'ModusDropdownLabel')}</span>
                        <div className="teacher-learning-test-teacher-dropdown">
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
                    <button className="green-btn" onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.OnClickSearchButton(objContext) }}>{Localization.TextFormatter(objTextResource, 'SearchButtonText')}</button>
                </div>
            </div>

            {/*main wrapper starts here*/}

            <div className="teacher-learning-test-teacher-main-wrapper">

                <div className="action-block">
                    <span className="wrapper-top-heading"> {Localization.TextFormatter(objTextResource, 'TaskSet')} ({arrExtranetTestData ? arrExtranetTestData.length : 0})</span>
                    <div className="action-block-dropdown">
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
                </div>

                {/* MULTISELECT DATA BLOCK STARTS HERE */}
                <div className="multiselect-container">
                    <div className="multiselect-left">
                        <PerformanceProfiler ComponentName={"LearningTestWeekDisplay"} JConfiguration={props.JConfiguration} >
                            <WeekDisplay
                                Id={"LearningTestWeekDisplay"}
                                JConfiguration={props.JConfiguration} OnChangeDisplay={(objItem) => { objContext.LearningTestTeacher_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem) }} backgroundColor="#dde0c9" />
                        </PerformanceProfiler>
                    </div>

                    <div className="multiselect-right">
                        <div className="multiselect-dropdown">
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

                {/* MULTISELECT DATA BLOCK ENDS HERE */}

                {/*Task accordian section starts here*/}
                {
                    arrExtranetTestData === undefined || arrExtranetTestData.length === 0 ?
                    <div className="task-accordian-main-wrapper">
                        {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                    </div>
                    :
                    <React.Fragment />
                }

                {GetDisplayData(arrExtranetTestData, objTextResource)}
                
            </div>

            {/*footer starts here*/}

            <div className="teacher-learning-test-teacher-footer">
            {state.intStatusToggle == 1 ?
                <button onClick={() => { objContext.LearningTestTeacher_ModuleProcessor.ShowLearningTestCreationPopUp(objContext, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'CreateTaskSetButtontext')}</button>
                :
                <React.Fragment />
            }
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

// /**
//  * @name ModuleProcessor
//  * @summary Adding the Module_Processsor to export(for Prefetch)
//  */
// export const ModuleProcessor = LearningTestTeacher_ModuleProcessor; 