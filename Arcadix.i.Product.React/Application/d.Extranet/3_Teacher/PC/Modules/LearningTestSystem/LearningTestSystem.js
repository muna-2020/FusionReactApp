//React related imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module related files.
import * as LearningTestSystem_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystem_Hook';
import LearningTestSystem_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystem_ModuleProcessor';

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
            arrElements = arrExtranetTestData.map(objTest => {
                let objPupil = state.arrPupilData.find(objPpl => objTest["t_TestDrive_Cycle_Pupil"][0] && objTest["t_TestDrive_Cycle_Pupil"][0]["uPupilId"] == objPpl["uPupilId"]);
                let objSubSubjectData = arrAllSubjectData.find(objSub => objSub["iSubjectId"] == objTest["iSubjectId"]);
                let objSubjectData = arrParentSubjectData.find(objSub => objSub["iSubjectId"] == objSubSubjectData["iParentSubjectId"]);
                return (
                    <tr>
                        <td>{objPupil ? objPupil["vFirstName"] : ''}</td>
                        <td>{objSubjectData["t_TestDrive_Subject_Data"][0]["vSubjectName"]}</td>
                        <td>{objSubSubjectData["t_TestDrive_Subject_Data"][0]["vSubjectName"]}</td>
                        <td>{objTest["vTestName"]}</td>
                        <td>{objContext.LearningTestSystem_ModuleProcessor.GetFormattedDate(objTest["dtCreatedOn"])}</td>
                        <td>{strClassName}</td>
                        <td>{objTest.iTestTaskCount} </td>
                        <td>
                            {GetStatusTestImage(objTest["iTestUsageId"])}
                        </td>
                        <td>
                            <button className="button green-button" onClick={() => { objContext.LearningTestSystem_ModuleProcessor.LearningTestStatisticsPopUp(objContext, objTest, objPupil, objSubjectData, objSubSubjectData, strClassName); }}>
                                {Localization.TextFormatter(objTextResource, 'Show')}
                            </button>

                        </td>
                    </tr>

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
            <React.Fragment>
                {
                    <div className="learning-test-system green-bg" id="LearnJournalComponent">
                        <div className="top-head-padd" id="LearningTestSystemHeader">
                            {
                                state.blnShowInformationBar ? <div class="header-text">
                                    {Localization.TextFormatter(objTextResource, 'YellowBarText')}
                                </div> : <React.Fragment />
                            }
                            <div className="top-head">
                                <div className="top-head-left">
                                    <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</span>
                                    <div className="content-dropdown">
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
                                    <span>{Localization.TextFormatter(objTextResource, 'PupilLabel')}</span>
                                    <div className="content-dropdown">
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
                                    <span>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}</span>
                                    <div className="content-dropdown">
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
                                    <span>{Localization.TextFormatter(objTextResource, 'SubSubject')}</span>
                                    <div className="content-dropdown">
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
                                <div className="top-head-right">
                                    <div className="button green-button" onClick={() => { objContext.LearningTestSystem_ModuleProcessor.OnClickSearchBtn(objContext) }}>
                                        {Localization.TextFormatter(objTextResource, 'SearchButtonText')}
                                    </div>
                                    <button class="button yellow-button information-button" onClick={() => { objContext.LearningTestSystem_ModuleProcessor.UpdateInformationPopupStatus(objContext) }}>{state.blnShowInformationBar ? Localization.TextFormatter(objTextResource, 'HideInformationBar') : Localization.TextFormatter(objTextResource, 'ShowInformationBar')}</button>
                                </div>
                            </div>
                        </div>
                        <div className="learning-test-system-content">
                            <span className="head" id="ContentHead">
                                {Localization.TextFormatter(objTextResource, 'TaskSet')} ({arrExtranetTestData.length})
                            </span>
                            <div className="learning-test-system-controls" id="LearningTestSystemControls">
                                <div className="controls-left">
                                    <div className="dropdown-slider">
                                        <PerformanceProfiler ComponentName={"LearningTestSystemWeekDisplay"} JConfiguration={props.JConfiguration} >
                                            <WeekDisplay
                                                Id={"LearningTestSystemWeekDisplay"}
                                                JConfiguration={JConfiguration}
                                                OnChangeDisplay={(objItem) => { objContext.LearningTestSystem_ModuleProcessor.OnChangeWeekDisplay(objContext, objItem) }}
                                                backgroundColor="#dde0c9" />
                                        </PerformanceProfiler>
                                    </div>
                                </div>
                                <div className="controls-right">
                                    <div className="content-dropdown">
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
                            <div className="learning-test-system-table" id="LearningTestSystemTable">
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    Id="FillHeightSystemTest" Meta={objContext.LearningTestSystem_ModuleProcessor.GetMetaDataFillheightSystemTest()} ParentProps={{ ...props }}>
                                    {arrExtranetTestData.length > 0 ?
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>{Localization.TextFormatter(objTextResource, 'Name')}</th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'Subject')}</th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'Area')}</th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'Exercise')}</th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'Generated_on')} am</th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'Tasks')}</th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'Status')}</th>
                                                    <th />
                                                </tr>
                                                {
                                                    GetDisplayData(arrExtranetTestData, objTextResource)
                                                }
                                            </tbody>
                                        </table>
                                        : <div className="empty-test-message"><span>{Localization.TextFormatter(objTextResource, 'EmptyTestMessage')}</span></div>}

                                </WrapperComponent>
                            </div>
                        </div>
                        <div className="footer" id="FooterLearningTest">
                            <div className="footer-flex">
                                <p>
                                    {Localization.TextFormatter(objTextResource, 'FooterTextLeft') + " " + state.SystemNumberOfTasks}
                                </p>
                                <p>
                                    {Localization.TextFormatter(objTextResource, 'FooterTextSubLeft') + " " + state.SysytemNumberOfRepetition}
                                </p>
                                <button className="button green-button" onClick={() => { objContext.LearningTestSystem_ModuleProcessor.LearningTestSettingsPopUp(objContext); }}>
                                    {Localization.TextFormatter(objTextResource, 'FooterButtonText')}
                                </button>
                                {Localization.TextFormatter(objTextResource, 'FooterTextRight')}
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {
                state.isLoadComplete || props.isLoadComplete ? GetContent() : <React.Fragment />
            }
        </React.Fragment>
    );
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(LearningTestSystem_ModuleProcessor.StoreMapList()))(LearningTestSystem);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestSystem_ModuleProcessor; 