//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as PracticeTest_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTest_Hook';
import PracticeTest_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTest_ModuleProcessor';

/**
* @name PracticeTest
* @param {object} props props
* @summary This component displays the Practice Test.
* @returns {object} div that encapsulated the grid with Teacher details.
*/
const PracticeTest = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PracticeTest_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch, module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["PracticeTest_ModuleProcessor"]: new PracticeTest_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in PracticeTest_Hook, that contains all the custom hooks.
    * @returns null
    */
    PracticeTest_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PracticeTest_ModuleProcessor.Initialize(objContext, objContext.PracticeTest_ModuleProcessor);

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        let arrAllSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsTestedAtThisTime;Y;cIsDeleted;N")["Data"];
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PracticeTest", props);
        let arrSubject = objContext.PracticeTest_ModuleProcessor.GetMainSubject(objContext);
        let arrSubSubject = objContext.PracticeTest_ModuleProcessor.GetSubSubject(objContext, objTextResource);

        let objTaskDetails = objContext.PracticeTest_ModuleProcessor.GetTasksData(objContext)["objTaskDetails"];
        let arrTotalTask = objContext.PracticeTest_ModuleProcessor.GetTasksData(objContext)["arrTotalTask"];
        let arrNotAnsweredTask = objContext.PracticeTest_ModuleProcessor.GetTasksData(objContext)["arrNotAnsweredTask"];
        let arrCorrectAnsweredTask = objContext.PracticeTest_ModuleProcessor.GetTasksData(objContext)["arrCorrectAnsweredTask"];
        let arrWrongAnsweredTask = objContext.PracticeTest_ModuleProcessor.GetTasksData(objContext)["arrWrongAnsweredTask"];

        return (
            <div id="PracticeTest" className="practicetest-wrapper">
                <div className={objContext.props.JConfiguration.ApplicationTypeId === "1" ? "practicetest-container" : "practicetest-pupil-container"}>
                    <div className={objContext.props.JConfiguration.ApplicationTypeId === "1" ? "practicetest-subcontainer" : "practicetest-pupil-subcontainer"}>
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="PracticeTestFillHeight"
                            Meta={objContext.PracticeTest_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}
                            className={objContext.props.JConfiguration.ApplicationTypeId === "1" ? "bgStyle" : "bgStyle practicetest-pupil-bgStyle"}
                            scrollStyle={{ overflow: "auto" }}>
                            <div className="practicetest-wrapper-container">
                                <div className="practicetest">
                                    <div className="practicetest-header">
                                        <span className="header-text">
                                            {Localization.TextFormatter(objTextResource, 'SolveQuestionsIndependently')}
                                        </span>
                                    </div>

                                    <div className="practicetest-dropdown-wrapper">
                                        <div className="chapter-dropdown">
                                            <label> {Localization.TextFormatter(objTextResource, 'Chapter')}</label>
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"PracticeTest_Subject"}
                                                Meta={objContext.PracticeTest_ModuleProcessor.GetSubjectDropdownMetaData()}
                                                Data={objContext.PracticeTest_ModuleProcessor.GetSubjectDropdownData(objContext, arrSubject)}
                                                Resource={objContext.PracticeTest_ModuleProcessor.GetResourceData()}
                                                Events={objContext.PracticeTest_ModuleProcessor.GetSubjectDropdownEvents(objContext, arrSubject)}
                                                ParentProps={{ ...props }}
                                            />
                                        </div>

                                        <div className="subchapter-dropdown">
                                            <label>{Localization.TextFormatter(objTextResource, 'SubChapter')}</label>
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"PracticeTest_SubSubject"}
                                                Meta={objContext.PracticeTest_ModuleProcessor.GetSubSubjectDropdownMetaData()}
                                                Data={objContext.PracticeTest_ModuleProcessor.GetSubSubjectDropdownData(objContext, arrSubSubject)}
                                                Resource={objContext.PracticeTest_ModuleProcessor.GetResourceData()}
                                                Events={objContext.PracticeTest_ModuleProcessor.GetSubSubjectDropdownEvents(objContext)}
                                                ParentProps={{ ...props }}
                                            />
                                        </div>
                                    </div>

                                    <table className="pupil-taskdetails">
                                        <tbody>
                                            <tr>
                                                <td>{Localization.TextFormatter(objTextResource, 'TotallyAvailableQuestions')}</td>
                                                <td align="right">{objTaskDetails ? objTaskDetails.TotalTaskCount : 0}</td>
                                                <td align="right"></td>
                                                <td align="right">
                                                    <div className="pupil-taskdetails-dropdown">
                                                        {arrTotalTask.length > 0 ?
                                                            <WrapperComponent
                                                                ComponentName={"Dropdown"}
                                                                Id={"PracticeTest_AllTask"}
                                                                Meta={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownMetaData()}
                                                                Data={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownData(objContext, arrTotalTask)}
                                                                Resource={objContext.PracticeTest_ModuleProcessor.GetResourceData()}
                                                                Events={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownEvents(objContext)}
                                                                ParentProps={{ ...props }}
                                                            /> : ''}
                                                    </div>
                                                </td>
                                                <td align="right"> {arrTotalTask.length > 0 ? <span className="start-button" onClick={() => { objContext.PracticeTest_ModuleProcessor.StartTest(objContext, "All") }}>{Localization.TextFormatter(objTextResource, 'Start')}</span> : ''}</td>
                                            </tr>
                                            <tr>
                                                <td>{Localization.TextFormatter(objTextResource, 'NotAnswered')}</td>
                                                <td align="right">{objTaskDetails ? objTaskDetails.NotAnsweredCount : 0}</td>
                                                <td align="right">
                                                    <span className="notation-symbol"></span>
                                                </td>
                                                <td align="right">
                                                    <div className="pupil-taskdetails-dropdown">
                                                        {arrNotAnsweredTask.length > 0 ?
                                                            <WrapperComponent
                                                                ComponentName={"Dropdown"}
                                                                Id={"PracticeTest_NotAnsweredTask"}
                                                                Meta={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownMetaData()}
                                                                Data={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownData(objContext, arrNotAnsweredTask)}
                                                                Resource={objContext.PracticeTest_ModuleProcessor.GetResourceData()}
                                                                Events={objContext.PracticeTest_ModuleProcessor.GetNotAnsweredTaskDropdownEvents(objContext)}
                                                                ParentProps={{ ...props }}
                                                            /> : ''}
                                                    </div>
                                                </td>
                                                <td align="right">
                                                    {arrNotAnsweredTask.length > 0 ? <span className="start-button" onClick={() => { objContext.PracticeTest_ModuleProcessor.StartTest(objContext, "NotAnswer") }}>{Localization.TextFormatter(objTextResource, 'Start')}</span> : ''}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{Localization.TextFormatter(objTextResource, 'WrongAnswered')}</td>
                                                <td align="right">{objTaskDetails ? objTaskDetails.WrongAnswerCount : 0}</td>
                                                <td align="right"><span className="notation-symbol red"></span></td>
                                                <td align="right">
                                                    <div className="pupil-taskdetails-dropdown">
                                                        {arrWrongAnsweredTask.length > 0 ?
                                                            <WrapperComponent
                                                                ComponentName={"Dropdown"}
                                                                Id={"PracticeTest_WrongAnsweredTask"}
                                                                Meta={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownMetaData()}
                                                                Data={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownData(objContext, arrWrongAnsweredTask)}
                                                                Resource={objContext.PracticeTest_ModuleProcessor.GetResourceData()}
                                                                Events={objContext.PracticeTest_ModuleProcessor.GetWrongTaskDropdownEvents(objContext)}
                                                                ParentProps={{ ...props }}
                                                            /> : ''}
                                                    </div>
                                                </td>
                                                <td align="right"> {arrWrongAnsweredTask.length > 0 ? <span className="start-button" onClick={() => { objContext.PracticeTest_ModuleProcessor.StartTest(objContext, "Wrong") }}>{Localization.TextFormatter(objTextResource, 'All')}</span> : ''}</td>
                                            </tr>
                                            <tr>
                                                <td>{Localization.TextFormatter(objTextResource, 'CorrectAnswered')}</td>
                                                <td align="right">{objTaskDetails ? objTaskDetails.CorrectAnswerCount : 0}</td>
                                                <td align="right"><span className="notation-symbol green"></span></td>
                                                <td align="right">
                                                    <div className="pupil-taskdetails-dropdown">
                                                        {arrCorrectAnsweredTask.length > 0 ?
                                                            <WrapperComponent
                                                                ComponentName={"Dropdown"}
                                                                Id={"PracticeTest_CorrectAnsweredTask"}
                                                                Meta={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownMetaData()}
                                                                Data={objContext.PracticeTest_ModuleProcessor.GetAllTaskDropdownData(objContext, arrCorrectAnsweredTask)}
                                                                Resource={objContext.PracticeTest_ModuleProcessor.GetResourceData()}
                                                                Events={objContext.PracticeTest_ModuleProcessor.GetCorrectAnsweredTaskDropdownEvents(objContext)}
                                                                ParentProps={{ ...props }}
                                                            /> : ''}
                                                    </div>
                                                </td>
                                                <td align="right">{arrCorrectAnsweredTask.length > 0 ? <span className="start-button" onClick={() => { objContext.PracticeTest_ModuleProcessor.StartTest(objContext, "Correct") }}>{Localization.TextFormatter(objTextResource, 'All')}</span> : ''}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="practicetest-progressbar-test-report">
                                        <div className="practicetest-progressbar-test-report-header">
                                            <span className="task-header">{Localization.TextFormatter(objTextResource, 'LearningProgress')}</span>
                                            <div className="practicetest-progressbar-container">
                                                {/*{objTaskDetails ? */}
                                                <React.Fragment>
                                                    <span className="practicetest-progressbar-border number-of-questions">
                                                        <span>{objTaskDetails ? objTaskDetails.TotalTaskCount : ""}</span>
                                                    </span>
                                                    <div className="practicetest-progressbar-border test-result">
                                                        {objTaskDetails ?
                                                            <div className="result-overlay">
                                                                <span style={{ flex: "0 0" + objTaskDetails.CorrectAnswerTdWidth + "%" }}>{objTaskDetails.WrongAnswerCount == 0 ? '' : objTaskDetails.WrongAnswerCount}</span>
                                                                <span style={{ flex: "0 0" + objTaskDetails.WrongAnswerTdWidth + "%" }}>{objTaskDetails.CorrectAnswerCount == 0 ? '' : objTaskDetails.CorrectAnswerCount}</span>
                                                                <span style={{ flex: "0 0" + objTaskDetails.dblNotAnsweredTdWidth + "%" }}>{objTaskDetails.NotAnsweredCount == 0 ? '' : objTaskDetails.NotAnsweredCount}</span>
                                                            </div>
                                                            : ""}
                                                    </div>
                                                </React.Fragment>
                                                {/*: ''*/}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="practicetest-reset">
                                        <span className="reset-text">{Localization.TextFormatter(objTextResource, 'SetZeroMessage')}</span>
                                        <span className="button" onClick={() => { objContext.PracticeTest_ModuleProcessor.OpenResetPopUp(objContext, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'Okay')} </span>
                                    </div>
                                </div>
                            </div>
                        </WrapperComponent>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment />}
        </div>
    );
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {object} arrStyles
*/
PracticeTest.DynamicStyles = props => {
    return [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Application/4_Pupil/ReactJs/PC/Modules/PracticeTest/PracticeTest.css"
    ];
};

/**
* @name InitialDataParams
* @param {object} props props
* @summary Required for SSR
* @returns {object} InitialDataParams
*/
PracticeTest.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new PracticeTest_ModuleProcessor()).InitialDataParams(props));
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PracticeTest_ModuleProcessor.StoreMapList()))(PracticeTest);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PracticeTest_ModuleProcessor;