//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as PracticeTestDisplay_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PracticeTestDisplay_Hook';
import PracticeTestDisplay_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PracticeTestDisplay_ModuleProcessor";

//Components used in module.
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';

/**
 * @name PracticeTestDisplay
 * @param {object} props props
 * @summary This component consists of PracticeTestDisplay.
 * @returns {object} React.Fragement that encapsulated with PracticeTestDisplay.
 */
const PracticeTestDisplay = props => {

    /**
    * @name Initializing Reducer
    * @summary Provides state and dispatch.
    **/
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PracticeTestDisplay_Hook.GetInitialState());

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     **/
    let objContext = { state, props, dispatch, ["PracticeTestDisplay_ModuleProcessor"]: new PracticeTestDisplay_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     **/
    PracticeTestDisplay_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PracticeTestDisplay_ModuleProcessor.Initialize(objContext, objContext.PracticeTestDisplay_ModuleProcessor);

    function GetContent() {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PracticeTestDisplay", props);
        let arrClassData = objContext.PracticeTestDisplay_ModuleProcessor.GetClassDropDownData(objContext);
        return (
            <div id="PracticeTestDisplay" className="practicetestdisplay-wrapper">
                <div className={objContext.props.JConfiguration.ApplicationTypeId === "1" ? "practicetest-display-container" : "practicetest-display-container practicetest-display-pupil-container"}>
                    <div className={objContext.props.JConfiguration.ApplicationTypeId === "1" ? "practicetest-display-subcontainer" : "practicetest-display-subcontainer practicetest-display-pupil-subcontainer"}>
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="PracticeTestFillHeight"
                            Meta={objContext.PracticeTestDisplay_ModuleProcessor.GetFillHeightMetaData()}
                            ParentProps={{ ...props }}
                            className={objContext.props.JConfiguration.ApplicationTypeId === "1" ? "bgStyle" : "bgStyle practicetest-display-pupil-bgStyle"}
                            scrollStyle={{ overflow: "auto" }}>
                            <div className="practicetestdisplay-wrapper-container">
                                <div className="practicetestdisplay">
                                    <div className="practicetestdisplay-header">
                                        <span className="header-text">
                                            {Localization.TextFormatter(objTextResource, 'HeaderText')}
                                        </span>
                                    </div>
                                    {
                                        arrClassData.length > 0
                                            ?
                                            <div className="practicetest-dropdown-wrapper">
                                                <div className="class-dropdown">
                                                    <label>{Localization.TextFormatter(objTextResource, 'SelectClass')}</label>
                                                    <ClassDropDown
                                                        id="dd_PracticeTestDisplay_ClassDropDown"
                                                        Data={arrClassData}
                                                        DisplayColumn="vClassName"
                                                        ValueColumn="uClassId"
                                                        SelectedValue={ApplicationState.GetProperty("SelectedClassId")}
                                                        JConfiguration={props.JConfiguration}
                                                        ImgPath='/Images/Common/Icons/angle_down.svg'
                                                        ClientUserDetails={props.ClientUserDetails}
                                                        OnChangeEventHandler={(objItem, objDropdownProps) => {
                                                            objContext.PracticeTestDisplay_ModuleProcessor.HandleOnChangeClassDropDown(objContext, objItem);
                                                        }} />
                                                </div>
                                                <div className="teacher-dropdown">
                                                    <label>{Localization.TextFormatter(objTextResource, 'SelectPupil')}</label>

                                                    <WrapperComponent
                                                        ComponentName={"Dropdown"}
                                                        Id={"PracticeTestDisplay_PupilDropDown"}
                                                        Meta={objContext.PracticeTestDisplay_ModuleProcessor.GetPupliDropdownMetaData()}
                                                        Data={objContext.PracticeTestDisplay_ModuleProcessor.GetPupilDropdownData(objContext)}
                                                        Resource={objContext.PracticeTestDisplay_ModuleProcessor.GetResourceData()}
                                                        Events={objContext.PracticeTestDisplay_ModuleProcessor.GetPupilDropdownEvents(objContext)}
                                                        ParentProps={{ ...props }}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <div />
                                    }

                                    <div className="practicetest-progressbar-test-report">
                                        {
                                            QueryString.GetQueryStringValue("cIsPupil") == "Y" ? GetPracticeTestHTML(objContext.state.arrPracticeTestData.Data, objTextResource) : GetPracticeTestHTML(objContext.state.arrPracticeTestData, objTextResource)
                                        }
                                    </div>
                                </div>
                            </div>
                        </WrapperComponent>
                    </div>
                </div>
            </div>
        );
    }

    function GetPracticeTestHTML(arrPracticeTestData, objTextResource) {
        if (arrPracticeTestData) {
            return (
                <React.Fragment>
                    <div className="practicetest-notations">
                        <div className="test-results">
                            <div className="notation-symbol"></div>
                            <span className="notations-text">{Localization.TextFormatter(objTextResource, 'NotAnsweredQuestions')}</span>
                        </div>
                        <div className="test-results">
                            <div className="notation-symbol red"></div>
                            <span className="notations-text">{Localization.TextFormatter(objTextResource, 'WrongAnsweredQuestions')}</span>
                        </div>
                        <div className="test-results">
                            <div className="notation-symbol green"></div>
                            <span className="notations-text">{Localization.TextFormatter(objTextResource, 'CorrectAnsweredQuestions')}</span>
                        </div>
                    </div>
                    <div>
                        {
                            arrPracticeTestData.map((objSubject, intSubjectIndex) => {
                                return (
                                    <React.Fragment>
                                        <div className="practicetest-progressbar-test-report-header">
                                            <span className="task-header" id={objSubject.iSubjectId}>{intSubjectIndex.toString() + '. ' + objSubject.vSubjectName}</span>
                                            {
                                                GetSubjectResultsBar(objSubject)
                                            }
                                        </div>
                                        <ul>
                                            {
                                                GetSubSubjectsHTML(objSubject.SubSubjects, intSubjectIndex)
                                            }
                                        </ul>
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>
                </React.Fragment>
            );
        }
        else {
            return (<React.Fragment />);
        }
    }

    function GetSubSubjectsHTML(arrSubSubjects, intSubjectIndex) {
        return (
            arrSubSubjects.map((objSubSubject, intSubSubjectIndex) => {
                return (
                    <li className="practicetest-progressbar-test-report-subsection">
                        <span className="task-subheader">{intSubjectIndex.toString() + '.' + intSubSubjectIndex.toString() + '. ' + objSubSubject.vSubjectName}</span>
                        {
                            GetSubjectResultsBar(objSubSubject)
                        }
                    </li>
                );
            })
        )
    }

    function GetSubjectResultsBar(objSubject) {
        return (
            <div className="practicetest-progressbar-container">
                <div className="practicetest-progressbar-border test-result">
                    <div className="result-overlay">
                        {
                            objSubject.CorrectTasks > 0
                                ? <span style={{ flex: "0 0" + objSubject.CorrectTasksWidth + "%" }}>{objSubject.CorrectTasks}</span>
                                : <span style={{ flex: "0 0 0%" }}></span>
                        }
                        {
                            objSubject.WrongTasks > 0
                                ? <span style={{ flex: "0 0" + objSubject.WrongTasksWidth + "%" }}>{objSubject.WrongTasks}</span>
                                : <span style={{ flex: "0 0 0%" }}></span>
                        }
                        {
                            objSubject.NotAttemptedTasks > 0
                                ? <span style={{ flex: "0 0" + objSubject.NotAttemptedTasksWidth + "%" }}>{objSubject.NotAttemptedTasks}</span>
                                : <span style={{ flex: "0 0 0%" }}></span>
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            {
                (props.isLoadComplete || state.isLoadComplete) ? GetContent() : <React.Fragment />
            }
        </React.Fragment>
    );


};

export default connect(ExtranetBase_Hook.MapStoreToProps(PracticeTestDisplay_ModuleProcessor.StoreMapList()))(PracticeTestDisplay);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PracticeTestDisplay_ModuleProcessor; 