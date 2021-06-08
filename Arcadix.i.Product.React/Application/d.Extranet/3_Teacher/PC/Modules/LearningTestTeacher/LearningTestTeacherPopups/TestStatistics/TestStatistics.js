//React imports.
import React, { useState, useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports
import TestStatistics_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/TestStatistics/TestStatistics_ModuleProcessor";
import * as TestStatistics_Hook from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/TestStatistics/TestStatistics_Hook";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import RocketImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/rocket.svg?inline';
import TestPreviewImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/TestPreview.svg?inline';

const TestStatistics = props => {

    /**
     * @name Reduce Initializer.
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TestStatistics_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["TestStatistics_ModuleProcessor"]: new TestStatistics_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    TestStatistics_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.TestStatistics_ModuleProcessor.Initialize(objContext, objContext.TestStatistics_ModuleProcessor);

    const [Tab, OpenTab] = useState(1);

    function GetContent() {
        let { objTestDetails, ...objRest } = props.Data.objTestDisplayData;
        let { objTextResource } = props.Data;

        let arrFilteredTaskData = state.arrPupilTaskStatusData.filter(tsk => tsk["TaskId"] == state.objSelectedTask.iPageId)
        return (
            <div className="test-statistics-popup">
                <div className="test-statistics-popup-header" id="TestStatisticsHeader">
                    <h2>{objTestDetails.vTestName}</h2>
                    <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Shutdown')}
                        <img src={CloseImage} />
                    </span>
                </div>

                <div className="ul-block" id="ulBlock">
                    <ul>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'ClassDropdownLabel')} </span>
                            <span className="right"> {objRest.objClassDetails.vClassName}</span>
                        </li>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_GeneratedOn')} </span>
                            <span className="right">{objTestDetails.dtCreatedOn}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'SubjectDropdownLabel')}</span>
                            <span className="right">{objRest.vSubjectName}</span>
                        </li>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Tasks')}</span>
                            <span className="right">{objRest.intTaskCount}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_NumberOfLearners')}</span>
                            <span className="right">4</span>
                        </li>
                        <li>
                            <span>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Status')}</span>
                            <img title="�bung bereit � noch nicht angefangen" src={RocketImage} />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span className="custom-width">{Localization.TextFormatter(objTextResource, 'ModusDropdownLabel')}</span>
                            <span className="right">{objRest.strModus}</span>
                        </li>
                    </ul>

                    <div className="content-dropdown">
                        {
                            props.Data.blnArchive ? <React.Fragment /> :
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id={"Action"}
                                    Meta={objContext.TestStatistics_ModuleProcessor.GetActionDropdownMetaData(objContext)}
                                    Data={objContext.TestStatistics_ModuleProcessor.GetActionDropdownData(objContext, objTextResource)}
                                    Resource={objContext.TestStatistics_ModuleProcessor.GetResourceData(objTextResource)}
                                    Events={objContext.TestStatistics_ModuleProcessor.GetActionDropdownEvents(objContext)}
                                    ParentProps={{ ...props }}
                                />
                        }
                    </div>
                </div>

                {objTestDetails["t_TestDrive_Test_TestProperty"].length > 0 && objTestDetails["t_TestDrive_Test_TestProperty"][0].iTestUsageId == 2 ?
                    <div className="test-statistics">
                        <ul className="tablinks" id="TestStatisticsTabsHeader">
                            <li className={Tab == 1 ? "active" : ""} onClick={() => OpenTab(1)}>
                                {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Results')}
                            </li>
                            <li className={Tab == 2 ? "active" : ""} onClick={() => OpenTab(2)}>
                                {Localization.TextFormatter(objTextResource, 'StatisticksPopup_TaskStatistics')}
                            </li>
                            <li className={Tab == 3 ? "active" : ""} onClick={() => OpenTab(3)}>
                                {Localization.TextFormatter(objTextResource, 'StatisticksPopup_TaskStatisticsLearners')}
                            </li>
                            <li className={Tab == 4 ? "active" : ""} onClick={() => OpenTab(4)}>
                                {Localization.TextFormatter(objTextResource, 'StatisticksPopup_LPArea')}
                            </li>
                        </ul>
                        {Tab == 1 ?
                            <div
                                className="tabscontent"
                                style={{ display: Tab == 1 ? "block" : "none" }}
                            >
                                <div className="test-statistics-table" id="TestStatisticsTable">
                                    <WrapperComponent
                                        ComponentName={"FillHeight"}
                                        id="TestStatisticsFillHeightTab1"
                                        Meta={objContext.TestStatistics_ModuleProcessor.GetFillHeightMetaData(objContext)}
                                        ParentReference={`EditorPopupParent${props.modalUId}`}
                                        ParentProps={{ ...props }}
                                        className="bgStyle"
                                        scrollStyle={{ overflow: "auto" }}
                                    >
                                        <table className="table-top-space">
                                            <tbody>
                                                <tr>
                                                    <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Learner')} ({state.arrPupilData.length})</th>
                                                    <th>
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Right')}
                                                    </th>
                                                    <th>
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_NotCorrect')}
                                                    </th>
                                                    <th>
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Open')}
                                                    </th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_NumberOfCalls')}</th>
                                                </tr>
                                                {GetLowStakeTestPupilElements()}
                                            </tbody>
                                        </table>
                                    </WrapperComponent>
                                </div>
                            </div>
                            : ''}
                        {Tab == 2 ?
                            <div
                                className="tabscontent test-statistics-table"
                                style={{ display: Tab == 2 ? "block" : "none" }}
                            >
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    id="TestStatisticsFillHeightTab2"
                                    Meta={objContext.TestStatistics_ModuleProcessor.GetFillHeightMetaData(objContext)}
                                    ParentReference={`EditorPopupParent${props.modalUId}`}
                                    ParentProps={{ ...props }}
                                    className="bgStyle"
                                    scrollStyle={{ overflow: "auto" }}
                                >
                                    <table className="table-top-space">
                                        <tbody>
                                            <tr>
                                                <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Tasks')} ({state.arrTaskData.length})</th>
                                                <th>
                                                    {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Right')}
                                                </th>
                                                <th>
                                                    {Localization.TextFormatter(objTextResource, 'StatisticksPopup_NotCorrect')}
                                                </th>

                                                <th>
                                                    {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Open')}
                                                </th>
                                                <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Difficulty')}</th>
                                                <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Details')}</th>
                                                <th className="text-right">{Localization.TextFormatter(objTextResource, 'StatisticksPopup_NumberOfCalls')}</th>
                                            </tr>
                                            {GetLowStakeTestTaskStatisticksElements()}
                                        </tbody>
                                    </table>
                                </WrapperComponent>
                            </div>
                            : ''}
                        {Tab == 3 ?
                            <div
                                className="tabscontent"
                                style={{ display: Tab == 3 ? "block" : "none" }}
                            >
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    id="TestStatisticsFillHeightTab3"
                                    Meta={objContext.TestStatistics_ModuleProcessor.GetFillHeightMetaData(objContext)}
                                    ParentReference={`EditorPopupParent${props.modalUId}`}
                                    ParentProps={{ ...props }}
                                    className="bgStyle"
                                    scrollStyle={{ overflow: "auto" }}
                                >
                                    <div className="statistics-dropdown">
                                        <div className="content-dropdown">
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"Task"}
                                                Meta={objContext.TestStatistics_ModuleProcessor.GetTaskDropdownMetaData(objContext)}
                                                Data={objContext.TestStatistics_ModuleProcessor.GetTaskDropdownData(objContext, objTextResource)}
                                                Resource={objContext.TestStatistics_ModuleProcessor.GetResourceData(objTextResource)}
                                                Events={objContext.TestStatistics_ModuleProcessor.GetTaskDropdownEvents(objContext)}
                                                ParentProps={{ ...props }}
                                            />
                                        </div>
                                    </div>
                                    <div className="test-statistics-table">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Tasks')} ({arrFilteredTaskData.length})</th>
                                                    <th>
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Right')}
                                                    </th>
                                                    <th>
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_NotCorrect')}
                                                    </th>
                                                    <th>
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Open')}
                                                    </th>
                                                </tr>
                                                {GetLowStakeTestTaskStatusElements()}
                                            </tbody>
                                        </table>
                                    </div>
                                </WrapperComponent>
                            </div>
                            : ''}
                        {Tab == 4 ?
                            <div
                                className="tabscontent"
                                style={{ display: Tab == 4 ? "block" : "none" }}
                            >
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    id="TestStatisticsFillHeightTab4"
                                    Meta={objContext.TestStatistics_ModuleProcessor.GetFillHeightMetaData(objContext)}
                                    ParentReference={`EditorPopupParent${props.modalUId}`}
                                    ParentProps={{ ...props }}
                                    className="bgStyle"
                                    scrollStyle={{ overflow: "auto" }}
                                >
                                    <div className="test-statistics-table area-block">
                                        <p>{Localization.TextFormatter(objTextResource, 'SubjectDropdownLabel')} {objRest.vSubjectName}</p>
                                        <p>{Localization.TextFormatter(objTextResource, 'SubSubjectDropdownLabel')} {objRest.vSubSubjectName}</p>
                                        <p>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_ActionThemeAspects')}</p>

                                        {GetAreaElements()}
                                    </div>
                                </WrapperComponent>
                            </div>
                            : ''}
                    </div>
                    : ''}
                {objTestDetails["t_TestDrive_Test_TestProperty"].length > 0 && objTestDetails["t_TestDrive_Test_TestProperty"][0].iTestUsageId == 3 ?
                    <div className="test-statistics">
                        <ul className="tablinks" id="TestStatisticsTabsHeader">
                            <li className={Tab == 1 ? "active" : ""} onClick={() => OpenTab(1)}>
                                {Localization.TextFormatter(objTextResource, 'StatisticksPopup_Results')}
                            </li>
                            <li className={Tab == 2 ? "active" : ""} onClick={() => OpenTab(2)}>
                                {Localization.TextFormatter(objTextResource, 'StatisticksPopup_TaskStatistics')}
                            </li>
                            <li className={Tab == 3 ? "active" : ""} onClick={() => OpenTab(3)}>
                                {Localization.TextFormatter(objTextResource, 'StatisticksPopup_TaskStatisticsLearners')}
                            </li>
                            <li className={Tab == 4 ? "active" : ""} onClick={() => OpenTab(4)}>
                                {Localization.TextFormatter(objTextResource, 'StatisticksPopup_LPArea')}
                            </li>
                        </ul>
                        {Tab == 1 ?
                            <div
                                className="tabscontent"
                                style={{ display: Tab == 1 ? "block" : "none" }}
                            >
                                <div className="test-statistics-table" id="TestStatisticsTable">
                                    <WrapperComponent
                                        ComponentName={"FillHeight"}
                                        ParentProps={{ ...props }}
                                        id="TestStatisticsFillHeightTab1Learning"

                                        Meta={objContext.TestStatistics_ModuleProcessor.GetFillHeightMetaData(objContext)}
                                        ParentReference={`EditorPopupParent${props.modalUId}`}
                                        className="bgStyle"
                                        scrollStyle={{ overflow: "auto" }}
                                    >
                                        <table className="table-top-space">
                                            <tbody>
                                                <tr>
                                                    <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Learner')} ({state.arrPupilData.length})</th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle green" /> {Localization.TextFormatter(objTextResource, 'StatisticksPopup_RightAfterSingleRelease')}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle green-ring" />
                                                            {Localization.TextFormatter(objTextResource, 'StatisticksPopup_RightAfterRepeatedLosing')}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle red" />
                                                            {Localization.TextFormatter(objTextResource, 'StatisticksPopup_WrongSolved')}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle yellow" />
                                                            {Localization.TextFormatter(objTextResource, 'StatisticksPopup_PartiallyCorrect')}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle black" />
                                                            {Localization.TextFormatter(objTextResource, 'StatisticksPopup_NotSolved')}
                                                        </div>
                                                    </th>
                                                    <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_NumberOfCalls')}</th>
                                                </tr>
                                                {GetPupilElements()}
                                            </tbody>
                                        </table>
                                    </WrapperComponent>
                                </div>
                            </div>
                            : ''}
                        {Tab == 2 ?
                            <div
                                className="tabscontent test-statistics-table"
                                style={{ display: Tab == 2 ? "block" : "none" }}
                            >
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    id="TestStatisticsFillHeightTab2Learning"
                                    Meta={objContext.TestStatistics_ModuleProcessor.GetFillHeightMetaData(objContext)}
                                    ParentReference={`EditorPopupParent${props.modalUId}`}
                                    ParentProps={{ ...props }}
                                    className="bgStyle"
                                    scrollStyle={{ overflow: "auto" }}
                                >
                                    <table className="table-top-space">
                                        <tbody>
                                            <tr>
                                                <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Tasks')} ({state.arrTaskData.length})</th>
                                                <th>
                                                    <div className="color-button-rows">
                                                        <span className="bubble-circle green" /> {Localization.TextFormatter(objTextResource, 'StatisticksPopup_RightAfterSingleRelease')}
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="color-button-rows">
                                                        <span className="bubble-circle green-ring" />
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_RightAfterRepeatedLosing')}
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="color-button-rows">
                                                        <span className="bubble-circle red" />
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_WrongSolved')}
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="color-button-rows">
                                                        <span className="bubble-circle yellow" />
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_PartiallyCorrect')}
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="color-button-rows">
                                                        <span className="bubble-circle black" />
                                                        {Localization.TextFormatter(objTextResource, 'StatisticksPopup_NotSolved')}
                                                    </div>
                                                </th>
                                                <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Difficulty')}</th>
                                                <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Details')}</th>
                                                <th className="text-right">{Localization.TextFormatter(objTextResource, 'StatisticksPopup_NumberOfCalls')}</th>
                                            </tr>
                                            {GetTaskStatisticksElements()}
                                        </tbody>
                                    </table>
                                </WrapperComponent>
                            </div>
                            : ''}
                        {Tab == 3 ?
                            <div
                                className="tabscontent"
                                style={{ display: Tab == 3 ? "block" : "none" }}
                            >
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    Meta={objContext.TestStatistics_ModuleProcessor.GetFillHeightMetaData(objContext)}
                                    ParentReference={`EditorPopupParent${props.modalUId}`}
                                    id="TestStatisticsFillHeightTab3Learning"
                                    className="bgStyle"
                                    ParentProps={{ ...props }}
                                    scrollStyle={{ overflow: "auto" }}
                                >
                                    <div className="statistics-dropdown">
                                        <div className="content-dropdown">
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"Task"}
                                                Meta={objContext.TestStatistics_ModuleProcessor.GetTaskDropdownMetaData(objContext)}
                                                Data={objContext.TestStatistics_ModuleProcessor.GetTaskDropdownData(objContext, objTextResource)}
                                                Resource={objContext.TestStatistics_ModuleProcessor.GetResourceData(objTextResource)}
                                                Events={objContext.TestStatistics_ModuleProcessor.GetTaskDropdownEvents(objContext)}
                                                ParentProps={{ ...props }}
                                            />
                                        </div>
                                    </div>
                                    <div className="test-statistics-table">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Learner')}({arrFilteredTaskData.length})</th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle green" /> {Localization.TextFormatter(objTextResource, 'StatisticksPopup_RightAfterSingleRelease')}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle green-ring pl-0" />
                                                            {Localization.TextFormatter(objTextResource, 'StatisticksPopup_RightAfterRepeatedLosing')}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle red" />
                                                            {Localization.TextFormatter(objTextResource, 'StatisticksPopup_WrongSolved')}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle yellow" />
                                                            {Localization.TextFormatter(objTextResource, 'StatisticksPopup_PartiallyCorrect')}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="color-button-rows">
                                                            <span className="bubble-circle black" />
                                                            {Localization.TextFormatter(objTextResource, 'StatisticksPopup_NotSolved')}
                                                        </div>
                                                    </th>
                                                </tr>

                                                {GetTaskStatusElements()}

                                            </tbody>
                                        </table>
                                    </div>
                                </WrapperComponent>
                            </div>
                            : ''}
                        {Tab == 4 ?
                            <div
                                className="tabscontent"
                                style={{ display: Tab == 4 ? "block" : "none" }}
                            >
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    Meta={objContext.TestStatistics_ModuleProcessor.GetFillHeightMetaData(objContext)}
                                    ParentReference={`EditorPopupParent${props.modalUId}`}
                                    id="TestStatisticsFillHeightTab4Learning"
                                    className="bgStyle"
                                    ParentProps={{ ...props }}
                                    scrollStyle={{ overflow: "auto" }}
                                >
                                    <div className="test-statistics-table area-block">
                                        <p>{Localization.TextFormatter(objTextResource, 'SubjectDropdownLabel')} {objRest.vSubjectName}</p>
                                        <p>{Localization.TextFormatter(objTextResource, 'SubSubjectDropdownLabel')} {objRest.vSubSubjectName}</p>
                                        <p>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_ActionThemeAspects')}</p>

                                        {GetAreaElements()}
                                    </div>
                                </WrapperComponent>
                            </div>
                            : ''}
                    </div>
                    : ''}
                <div
                    className="test-statistics-popup-footer"
                    id="test-statistics-popup-footer"
                />
            </div>
        );

        function GetLowStakeTestPupilElements() {
            let arrPupilElements = state.arrPupilData.map(objPupil => {
                return (
                    <tr>
                        <td>{objPupil.PupilName}</td>
                        <td>{objPupil.TruePer}</td>
                        <td>{objPupil.FalsePer}</td>
                        <td>{objPupil.OpenPer}</td>
                        <td>{objPupil.Repetitions}</td>
                    </tr>
                )
            })
            return arrPupilElements;
        }

        function GetLowStakeTestTaskStatisticksElements() {
            let arrElements = state.arrTaskData.map((tsk, idx) => {
                return (
                    <tr>
                        <td onClick={() => { objContext.TestStatistics_ModuleProcessor.ShowTaskImagePopup(objContext, tsk) }}>
                            <a>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Task')} {(idx + 1)}:{tsk.PageName}</a>
                        </td>
                        <td>{tsk.TruePer}</td>
                        <td>{tsk.FalsePer}</td>
                        <td>{tsk.OpenPer}</td>

                        <td>{tsk.Difficulty}</td>
                        <td>
                            <span className="icon" onClick={() => { OpenTab(3) }}>
                                <img src={TestPreviewImage} />
                            </span>
                        </td>
                        <td className="text-right">{tsk.Repetitions}</td>
                    </tr>
                )
            })
            return arrElements;
        }

        function GetLowStakeTestTaskStatusElements() {
            let arrElements = arrFilteredTaskData.map(tsk => {
                return (
                    <tr>
                        <td>{tsk.PupilName}</td>
                        <td className="circle-block ">
                            {tsk.Correct ? <div class='bubble-circle green'></div> : <div> - </div>}
                        </td>
                        <td className="circle-block ">
                            {tsk.Wrong ? <div class='bubble-circle red'> - </div> : <div> - </div>}
                        </td>
                        <td className="circle-block ">
                            {tsk.Open ? <div class='bubble-circle black'> - </div> : <div> - </div>}
                        </td>
                    </tr>
                )
            })
            return arrElements;
        }


        function GetPupilElements() {
            let arrPupilElements = state.arrPupilData.map(objPupil => {
                return (
                    <tr>
                        <td>{objPupil.PupilName}</td>
                        <td>{objPupil.Correct}</td>
                        <td>{objPupil.MultipleAttempt}</td>
                        <td>{objPupil.NotCorrect}</td>
                        <td>{objPupil.PartiallyCorrect}</td>
                        <td>{objPupil.NotAttempt}</td>
                        <td>{objPupil.Repetitions}</td>
                    </tr>
                )
            })
            return arrPupilElements;
        }

        function GetTaskStatisticksElements() {
            let arrElements = state.arrTaskData.map((tsk, idx) => {
                return (
                    <tr>
                        <td onClick={() => { objContext.TestStatistics_ModuleProcessor.ShowTaskImagePopup(objContext, tsk) }}>
                            <a>{Localization.TextFormatter(objTextResource, 'StatisticksPopup_Task')} {(idx + 1)}:{tsk.PageName}</a>
                        </td>
                        <td>{tsk.Correct}</td>
                        <td>{tsk.MultipleAttempt}</td>
                        <td>{tsk.NotCorrect}</td>
                        <td>{tsk.PartiallyCorrect}</td>
                        <td>{tsk.NotAttempt}</td>
                        <td>{tsk.Difficulty}</td>
                        <td>
                            <span className="icon" onClick={() => { OpenTab(3) }}>
                                <img src={TestPreviewImage} />
                            </span>
                        </td>
                        <td className="text-right">{tsk.Repetitions}</td>
                    </tr>
                )
            })
            return arrElements;
        }


        function GetTaskStatusElements() {
            let arrElements = arrFilteredTaskData.map(tsk => {
                return (
                    <tr>
                        <td>{tsk.PupilName}</td>
                        <td className="circle-block ">
                            {tsk.Correct ? <div class='bubble-circle green'></div> : <div> - </div>}
                        </td>
                        <td className="circle-block ">
                            {tsk.MultipleAttempt ? <div class='bubble-circle green-ring'> - </div> : <div> - </div>}
                        </td>
                        <td className="circle-block ">
                            {tsk.NotCorrect ? <div class='bubble-circle red'> - </div> : <div> - </div>}
                        </td>
                        <td className="circle-block ">
                            {tsk.PartialCorrect ? <div class='bubble-circle yellow'> - </div> : <div> - </div>}
                        </td>
                        <td className="circle-block ">
                            {tsk.NotAttempted ? <div class='bubble-circle black'> - </div> : <div> - </div>}
                        </td>
                    </tr>
                )
            })
            return arrElements;
        }

        function GetAreaElements() {
            let arrData = objContext.TestStatistics_ModuleProcessor.FormCategoryDetails(objContext, objTestDetails)

            let arrElement = arrData.map(cat => {
                return (
                    <ul>
                        <li>
                            <span>{cat.objCategory.t_TestDrive_Category_Data[0].vCategoryName}</span>
                        </li>
                        {
                            cat.arrCategoryCompetency.map(comp => {
                                return (
                                    <li>
                                        <span>
                                            {comp.t_TestDrive_Category_Competency_Data[0].tCompetencyText}
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            })
            return arrElement;
        }
    }

    return state.isLoadComplete ? GetContent() : <React.Fragment />
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(TestStatistics_ModuleProcessor.StoreMapList()))(TestStatistics);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TestStatistics_ModuleProcessor; 