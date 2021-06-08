//React related imports.
import React, { useReducer, useState } from "react";
import { connect } from "react-redux";

//Module related files.
import * as LearningTestSystem_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/LearningTestSystem/LearningTestSystem_Hook';
import LearningTestSystem_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/LearningTestSystem/LearningTestSystem_ModuleProcessor';

//Components used in module.
import WeekDisplay from "@root/Application/d.Extranet/5_Shared/PC/Controls/WeekDisplay/WeekDisplay";
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';


//Inline Images import
import ProcessImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/process.svg?inline';
import RocketImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/rocket.svg?inline';
import CheckImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/check.svg?inline';

/**
 * @name LearningTestSystem
 * @param {any} props props
 * @returns {*} Returns the jsx object
 */
const LearningTestSystem = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningTestSystem_Hook.GetInitialState(props));

    const [accordion, openAccordian] = useState(1);

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "LearningTestSystem", ["LearningTestSystem_ModuleProcessor"]: new LearningTestSystem_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.LearningTestSystem_ModuleProcessor.Initialize(objContext, objContext.LearningTestSystem_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Billing_Hook, that contains all the custom hooks.
     * @returns null
    */
    LearningTestSystem_Hook.Initialize(objContext);

    /**
     * @name GetStatusTestImage
     * @param {any} intITestUsageId intITestUsageId
     * @summary Gets the status of Test Image
     * @returns {*} jsx
     */
    function GetStatusTestImage(intITestUsageId) {
        switch (intITestUsageId) {
            case 5:
                return <img title="Übung abgeschlossen" src={CheckImage} />
            case 3:
                return <img title="In Arbeit" src={ProcessImage} />;
            default:
                return <img title="Übung bereit – noch nicht angefangen" src={RocketImage} />
        }
    }

    /**
     * @name GetDisplayData
     * @summary Forms the JSX elemsnts  to display.
     * @param {any} arrExtranetTestData
     * @param {any} objTextResource
     */
    function GetDisplayData(arrExtranetTestData, objTextResource) {
        let arrElements = [];
        let arrAllSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y").Data;
        let arrParentSubjectData = arrAllSubjectData.filter(objSub => objSub["iParentSubjectId"] == 0)
        let strClassName = objContext.LearningTestSystem_ModuleProcessor.GetClassName(objContext);
        if (arrExtranetTestData) {
            arrElements = arrExtranetTestData.map((objTest, intIndexTest) => {
                let objPupil = state.arrPupilData.find(objPpl => objTest["t_TestDrive_Cycle_Pupil"][0] && objTest["t_TestDrive_Cycle_Pupil"][0]["uPupilId"] == objPpl["uPupilId"]);
                let objSubSubjectData = arrAllSubjectData.find(objSub => objSub["iSubjectId"] == objTest["iSubjectId"]);
                let objSubjectData = arrParentSubjectData.find(objSub => objSub["iSubjectId"] == objSubSubjectData["iParentSubjectId"]);
                let blnShowTestDetails = state.objSelectedTestToShow["uTestId"] === "00000000-0000-0000-0000-000000000000"? false : 
                    state.objSelectedTestToShow["uTestId"] === objTest["uTestId"] || (state.objSelectedTestToShow["uTestId"].length == 0 && intIndexTest == 0) 
                return (
                    <div className="task-accordian-main-wrapper">
                        <div className="task-accordian-header" onClick={() => {
                            //accordion == 1 ? openAccordian(0) : openAccordian(1);
                            objContext.LearningTestSystem_ModuleProcessor.SetTestToShow(objContext, objTest)
                        }}>
                            <div className="task-accordian-header-left-content">
                                <span>{Localization.TextFormatter(objTextResource, 'Name')}: <b>{objPupil ? objPupil["vFirstName"] : ''}</b></span>
                                <span>{Localization.TextFormatter(objTextResource, 'Subject')}: <b>{objSubjectData["t_TestDrive_Subject_Data"][0]["vSubjectName"]}</b></span>
                            </div>

                            <div className="task-accordian-header-right-content">
                                {GetStatusTestImage(objTest["iTestUsageId"])}
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
                                        <td>{Localization.TextFormatter(objTextResource, 'Area')}</td>
                                        <td colspan="2">{objSubSubjectData["t_TestDrive_Subject_Data"][0]["vSubjectName"]}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'Exercise')}</td>
                                        <td colspan="2">{objTest["vTestName"]}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'Generated_on')}</td>
                                        <td colspan="2">{objContext.LearningTestSystem_ModuleProcessor.GetFormattedDate(objTest["dtCreatedOn"])}</td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</td>
                                        <td colspan="2">{objTest.iTestTaskCount} </td>
                                    </tr>

                                    <tr>
                                        <td>{Localization.TextFormatter(objTextResource, 'Tasks')}</td>
                                        <td colspan="2">{objTest.iTestTaskCount} </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="table-footer-button">
                                <button>{Localization.TextFormatter(objTextResource, 'Show')}</button>
                            </div>
                        </div>
                    </div>

                )
            })
        }
        return arrElements;
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", props);
        let arrClassData = objContext.LearningTestSystem_ModuleProcessor.GetClassDropDownData(objContext);
        let arrSubjects = [];
        if (DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y")) {
            arrSubjects = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y").Data.
                filter(subject => { return subject.iParentSubjectId === 0 && subject.cIsLearnCoacherSubject === "Y" });
        }

        let objAllSuject = {
            "iSubjectId": -1,
            "iDisplayOrder": -1,
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": JConfiguration["InterfaceLanguageId"],
                    "vSubjectName": "Alle",
                    "vSubjectDisplayName": "Alle",
                    "vSubjectShortName": "MA",
                    "tSubjectDescription": "<span className=\"PageOutputContentText\"><br></span>",
                    "iDataMainClientId": null
                }
            ]
        };
        arrSubjects = [objAllSuject, ...arrSubjects];
        let arrSubSubject = [];
        if (DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y")) {
            arrSubSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y").Data.filter(subject => { return subject.iParentSubjectId === state.intSelectedSubjectId });
        }

        arrSubSubject = [objAllSuject, ...arrSubSubject];
        let arrWeekDisplayDropdownData = objContext.LearningTestSystem_ModuleProcessor.GetWeekDisplayDropdownData(objContext);
        let objPupilDropdownData = {
            DropdownData: state.arrPupilData,
            SelectedValue: state.strSelectedPupilId
        };
        let objSubjectDropdownData = {
            DropdownData: arrSubjects,
            SelectedValue: state.intSelectedSubjectId
        };
        let objSubSubjectDropdownData = {
            DropdownData: arrSubSubject,
            SelectedValue: state.intSelectedSubSubjectId
        };
        let iSelectedWeekDisplayValue = ApplicationState.GetProperty("DisplayFor")
        let objWeekDisplayDropdownData = {
            DropdownData: arrWeekDisplayDropdownData,
            SelectedValue: iSelectedWeekDisplayValue
        };
        let arrExtranetTestData = objContext.LearningTestSystem_ModuleProcessor.GetFilteredTestData(objContext);
        return (
            <div className="teacher-learning-test-system">
                {/*Title head section*/}
                <div className="teacher-learning-test-system-title">
                    <div className="teacher-learning-test-system-title-left">
                        <span className="heading-left">Fordern</span>
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle-right-blue.svg")}
                        />
                        <span className="menu-title">Durch System</span>
                    </div>
                    <div className="teacher-learning-test-system-title-right">
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}
                        />
                    </div>
                </div>

                {/*yellow bar text section*/}
                {
                    state.blnShowInformationBar ? <div class="header-text">
                        {Localization.TextFormatter(objTextResource, 'YellowBarText')}
                    </div> : <React.Fragment />
                }
                {/*Top head dropdown section*/}

                <div className="top-head">
                    <div className="dropdown-main-wrapper">
                        <div className="teacher-learning-test-system-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'ClassLabel')}</span>
                            <div className="teacher-learning-test-system-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestSystemClassDropDown"} JConfiguration={props.JConfiguration} >
                                    <ClassDropDown
                                        id="LearningTestSystemClassDropDown"
                                        Data={arrClassData}
                                        DisplayColumn="vClassName"
                                        ValueColumn="uClassId"
                                        SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                        JConfiguration={JConfiguration}
                                        ClientUserDetails={props.ClientUserDetails}
                                        OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.LearningTestSystem_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }} />
                                </PerformanceProfiler>
                            </div>
                        </div>

                        <div className="teacher-learning-test-system-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'PupilLabel')}</span>
                            <div className="teacher-learning-test-system-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestSystemPupilDropDown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="LearningTestSystemPupilDropDown"
                                        Meta={objContext.LearningTestSystem_ModuleProcessor.GetMetaDataPupilDropdown()}
                                        Data={objPupilDropdownData}
                                        Resource={objContext.LearningTestSystem_ModuleProcessor.GetResourceDataDropdown()}
                                        Events={objContext.LearningTestSystem_ModuleProcessor.GetEventsDataPupilDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown-main-wrapper">
                        <div className="teacher-learning-test-system-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'SubjectLabel')}</span>
                            <div className="teacher-learning-test-system-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestSystemSubjectDropDown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="LearningTestSystemSubjectDropDown"
                                        Meta={objContext.LearningTestSystem_ModuleProcessor.GetMetaSubjectDropdown()}
                                        Data={objSubjectDropdownData}
                                        Resource={objContext.LearningTestSystem_ModuleProcessor.GetResourceDataDropdown()}
                                        Events={objContext.LearningTestSystem_ModuleProcessor.GetEventsDataSubjectDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>

                        <div className="teacher-learning-test-system-dropdown-wrapper">
                            <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'SubSubject')}</span>
                            <div className="teacher-learning-test-system-dropdown">
                                <PerformanceProfiler ComponentName={"LearningTestSystemSubSubjectDropDown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="LearningTestSystemSubSubjectDropDown"
                                        Meta={objContext.LearningTestSystem_ModuleProcessor.GetMetaSubjectDropdown()}
                                        Data={objSubSubjectDropdownData}
                                        Resource={objContext.LearningTestSystem_ModuleProcessor.GetResourceDataDropdown()}
                                        Events={objContext.LearningTestSystem_ModuleProcessor.GetEventsDataSubSubjectDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                    </div>


                    <div className="top-head-buttons">
                        <button className="green-btn" onClick={() => { objContext.LearningTestSystem_ModuleProcessor.OnClickSearchBtn(objContext) }}> {Localization.TextFormatter(objTextResource, 'SearchButtonText')}</button>
                        <button className="yellow-btn" onClick={() => { objContext.LearningTestSystem_ModuleProcessor.UpdateInformationPopupStatus(objContext) }}>{state.blnShowInformationBar ? Localization.TextFormatter(objTextResource, 'HideInformationBar') : Localization.TextFormatter(objTextResource, 'ShowInformationBar')}</button>
                    </div>
                    
                </div>

                {/*main wrapper starts here*/}

                <div className="teacher-learning-test-system-main-wrapper">
                    <span className="wrapper-top-heading"> {Localization.TextFormatter(objTextResource, 'TaskSet')} ({arrExtranetTestData.length})</span>

                    {/* MULTISELECT DATA BLOCK STARTS HERE */}
                    <div className="multiselect-container">
                        <div className="multiselect-left">
                            <PerformanceProfiler ComponentName={"LearningTestSystemWeekDisplay"} JConfiguration={props.JConfiguration} >
                                <WeekDisplay
                                    Id={"LearningTestSystemWeekDisplay"}
                                    JConfiguration={JConfiguration}
                                    OnChangeDisplay={(objItem) => { objContext.LearningTestSystem_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem) }}
                                    backgroundColor="#dde0c9" />
                            </PerformanceProfiler>
                        </div>

                        <div className="multiselect-right">
                            <div className="multiselect-dropdown">
                                {/* <span>Schuljahr</span>
                                <img
                                    src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                                /> */}
                                <PerformanceProfiler ComponentName={"DisplayDropDown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="DisplayDropDown"
                                        Meta={objContext.LearningTestSystem_ModuleProcessor.GetMetaWeekDisplayDropdown()}
                                        Data={objWeekDisplayDropdownData}
                                        Resource={objContext.LearningTestSystem_ModuleProcessor.GetResourceDataDropdown()}
                                        Events={objContext.LearningTestSystem_ModuleProcessor.GetEventsWeekDisplayDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                        
                    </div>

                    {/* MULTISELECT DATA BLOCK ENDS HERE */}

                    {/*Task accordian section starts here*/}
                    {arrExtranetTestData.length > 0 ?
                        
                        <React.Fragment>
                            {GetDisplayData(arrExtranetTestData, objTextResource)}
                            {/* <div className="task-accordian-main-wrapper">
                                <div className="task-accordian-header" onClick={() => {
                                    accordion == 1 ? openAccordian(0) : openAccordian(1);
                                }}>
                                    <div className="task-accordian-header-left-content">
                                        <span>Name: <b>Task Three</b></span>
                                        <span>Fach: <b>Deutsch</b></span>
                                    </div>

                                    <div className="task-accordian-header-right-content">
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/process.svg")}
                                        />
                                        {
                                            accordion === 1 ?
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

                                <div className={accordion === 1 ? "task-accordian-content show" : "task-accordian-content"} >
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Bereich</td>
                                                <td colspan="2">Horen</td>
                                            </tr>

                                            <tr>
                                                <td>Ubung</td>
                                                <td colspan="2">Deutsch-Horen-1-3-R1</td>
                                            </tr>

                                            <tr>
                                                <td>Generiert am</td>
                                                <td colspan="2">04.09.2020</td>
                                            </tr>

                                            <tr>
                                                <td>Klass</td>
                                                <td colspan="2">AClass 05.03.2019A</td>
                                            </tr>

                                            <tr>
                                                <td>Aufgaben</td>
                                                <td colspan="2">5</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-footer-button">
                                        <button>Anwenden</button>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="task-accordian-main-wrapper">
                                <div className="task-accordian-header" onClick={() => {
                                    accordion == 2 ? openAccordian(0) : openAccordian(2);
                                }}>
                                    <div className="task-accordian-header-left-content">
                                        <span>Name: <b>Task Three</b></span>
                                        <span>Fach: <b>Deutsch</b></span>
                                    </div>

                                    <div className="task-accordian-header-right-content">
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/process.svg")}
                                        />
                                        {
                                            accordion === 2 ?
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

                                <div className={accordion === 2 ? "task-accordian-content show" : "task-accordian-content"} >
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Bereich</td>
                                                <td colspan="2">Horen</td>
                                            </tr>

                                            <tr>
                                                <td>Ubung</td>
                                                <td colspan="2">Deutsch-Horen-1-3-R1</td>
                                            </tr>

                                            <tr>
                                                <td>Generiert am</td>
                                                <td colspan="2">04.09.2020</td>
                                            </tr>

                                            <tr>
                                                <td>Klass</td>
                                                <td colspan="2">AClass 05.03.2019A</td>
                                            </tr>

                                            <tr>
                                                <td>Aufgaben</td>
                                                <td colspan="2">5</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-footer-button">
                                        <button>Anwenden</button>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="task-accordian-main-wrapper">
                                <div className="task-accordian-header" onClick={() => {
                                    accordion == 3 ? openAccordian(0) : openAccordian(3);
                                }}>
                                    <div className="task-accordian-header-left-content">
                                        <span>Name: <b>Task Three</b></span>
                                        <span>Fach: <b>Deutsch</b></span>
                                    </div>

                                    <div className="task-accordian-header-right-content">
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/process.svg")}
                                        />
                                        {
                                            accordion === 3 ?
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

                                <div className={accordion === 3 ? "task-accordian-content show" : "task-accordian-content"} >
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Bereich</td>
                                                <td colspan="2">Horen</td>
                                            </tr>

                                            <tr>
                                                <td>Ubung</td>
                                                <td colspan="2">Deutsch-Horen-1-3-R1</td>
                                            </tr>

                                            <tr>
                                                <td>Generiert am</td>
                                                <td colspan="2">04.09.2020</td>
                                            </tr>

                                            <tr>
                                                <td>Klass</td>
                                                <td colspan="2">AClass 05.03.2019A</td>
                                            </tr>

                                            <tr>
                                                <td>Aufgaben</td>
                                                <td colspan="2">5</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-footer-button">
                                        <button>Anwenden</button>
                                    </div>
                                </div>
                            </div> */}
                        </React.Fragment>
                    : <div className="empty-test-message"><span>{Localization.TextFormatter(objTextResource, 'EmptyTestMessage')}</span></div>}
                </div>

                {/*footer starts here*/}

                <div className="teacher-learning-test-system-footer">
                    <div className="footer-left-content">
                        <span> {Localization.TextFormatter(objTextResource, 'FooterTextLeft') + " " + state.SystemNumberOfTasks}</span>
                        <span> {Localization.TextFormatter(objTextResource, 'FooterTextSubLeft') + " " + state.SysytemNumberOfRepetition}</span>
                    </div>
                    <div className="footer-center-content">
                        <button> {Localization.TextFormatter(objTextResource, 'FooterButtonText')}</button>
                    </div>
                    <div className="footer-right-content">                        
                        <span>{Localization.TextFormatter(objTextResource, 'FooterTextRight')}</span>                  
                    </div>
                </div>

            </div>
        );
    }

    return state.isLoadComplete || props.isLoadComplete ? GetContent() : <React.Fragment />
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(LearningTestSystem_ModuleProcessor.StoreMapList()))(LearningTestSystem);


// /**
//  * @name ModuleProcessor
//  * @summary Adding the Module_Processsor to export(for Prefetch)
//  */
// export const ModuleProcessor = LearningTestSystem_ModuleProcessor; 