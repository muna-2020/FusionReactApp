//React imports
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports
import EditTasks_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/EditTasks/EditTasks_ModuleProcessor";
import * as EditTasks_Hook from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/EditTasks/EditTasks_Hook";

//controls
import TaskContentPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import AngleRightImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/EditTasks/angle_right_big.svg?inline';
import AngleLeftImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/EditTasks/angle_left_big.svg?inline';

/**
 * @name EditTasks
 * @summary component for editing tasks for a test.
 * @param {any} props
 */
const EditTasks = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, EditTasks_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to functions in business logic.
     */
    let objContext = { state, props, dispatch, ["EditTasks_ModuleProcessor"]: new EditTasks_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    EditTasks_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.EditTasks_ModuleProcessor.Initialize(objContext, objContext.EditTasks_ModuleProcessor);

    function GetContent() {
        let objTextResource = props.Data.TextResource;
        let arrTaskDifficultyLevelDataWithTasks = objContext.EditTasks_ModuleProcessor.GetTaskDifficultyLevelDataWithTasks(objContext);
        let blnIsSelected = JSON.stringify(state.objCurrentData) !== "{}" && state.arrSelectedNumberOfTasksPerLevel.length > 0 ? state.arrSelectedNumberOfTasksPerLevel.filter(objTempData => objTempData["arrTaskDataPerDifficultyLevel"].filter(objTempTaskData => objTempTaskData["iPageId"] === state.objCurrentData["iPageId"]).length > 0).length > 0 ? true : false : false;
        let strImagePath = JSON.stringify(state.objCurrentData) !== "{}" ? objContext.props.JConfiguration.WebDataPath + "Repo/Task/" + objContext.props.Data.ClientUserDetails.MainClientId + "/" + state.objCurrentData.iPageId + "_" + objContext.props.JConfiguration.InterfaceLanguageId + "_" + ((state.objCurrentData.iPageFileVersion != "" && state.objCurrentData.iPageFileVersion != null) ? state.objCurrentData.iPageFileVersion : "0") + "_TaskBig.png" : "";
        let intSelectedTaskCount = 0;
        let arrTasks = objContext.props.Events.GetTaskData();
        state.arrSelectedNumberOfTasksPerLevel.forEach(objTempData => {
            intSelectedTaskCount += objTempData["NoOfTasks"];
        })
        //let objTaskDetails = { 'iPageId': state.objCurrentData["iPageId"], 'iLanguageId': props.JConfiguration.InterfaceLanguageId };
        //props = { ...props, "TaskDetails": objTaskDetails };
        let arrClientUrl = DataRef(props.Object_Extranet_Shared_OpenApplicationCredential, "FusionTestApplication")["Data"];
        let strBaseUrl = props.JConfiguration.IsSSL == "Y" ? "https://" + arrClientUrl[0]["vCurrentURL"] : "http://" + arrClientUrl[0]["vCurrentURL"];
        let strFullUrl = strBaseUrl + "/TaskPreview?DatabaseProvider=PostgreSQL&TaskId=";
        let iNumberOfDifficultyLevels = arrTaskDifficultyLevelDataWithTasks.filter(x => x["blnShow"]).length;

        return (
            <div className="edit-task-popup">
                <div className="edit-task-popup-header" id="EditTasksHeader">
                    <div className="edit-task-popup-header-left">
                        <h2>
                            {Localization.TextFormatter(objTextResource, 'EditTasksHeading')}
                        </h2>
                        <span>
                            <b>
                                {Localization.TextFormatter(objTextResource, 'EditTasksSubSubjectHeading')}
                            </b>
                            {props.Data.SubSubjectDetails["t_TestDrive_Subject_Data"][0]["vSubjectName"]}
                        </span>
                    </div>
                    <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                        {Localization.TextFormatter(objTextResource, 'EditTasksCloseButtonText')}
                        <img src={CloseImage} alt="" />
                    </span>
                </div>

                <table className="edit-tasks-table-header" id="EditTasksTableHeader">
                    <tbody>
                        <tr>
                            <td className="transparent" colspan="2" />
                            <td colspan={iNumberOfDifficultyLevels}>
                                {Localization.TextFormatter(objTextResource, 'EditTasksCategorizationHeading')}
                            </td>
                            <td className="transparent" />
                        </tr>
                        <tr>
                            <td className="transparent">
                                {Localization.TextFormatter(objTextResource, 'EditTaskTaskTabHeading')}
                            </td>
                            <td className={state.Tab === -1 ? "active" : ""} onClick={() => { objContext.EditTasks_ModuleProcessor.ChangeTab(objContext, -1) }}>
                                {Localization.TextFormatter(objTextResource, 'AllOptionText')} ({arrTasks.length})
                            </td>
                            {
                                arrTaskDifficultyLevelDataWithTasks && arrTaskDifficultyLevelDataWithTasks
                                    .filter(x => x["blnShow"])
                                    .map(objTempData => {
                                        let intCount = objTempData["NoOfTasks"];
                                        let arrTempData = state.arrSelectedNumberOfTasksPerLevel.filter(objTempSelectedData => objTempSelectedData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]);
                                        if (arrTempData.length > 0) {
                                            intCount -= arrTempData[0]["NoOfTasks"];
                                        }
                                        return (
                                            <td className={state.Tab === objTempData["iTaskDifficultyLevelId"] ? "active" : ""} onClick={() => { objContext.EditTasks_ModuleProcessor.ChangeTab(objContext, objTempData["iTaskDifficultyLevelId"]) }}>
                                                <div>
                                                    {objTempData["t_TestDrive_Task_TaskDifficultyLevel_Data"][0]["vTaskDifficultyLevelName"]} ({intCount})
                                                        </div>
                                            </td>);
                                    })
                            }
                            <td className={state.Tab === -2 ? "active forden-green-25" : "forden-green-25"} onClick={() => { objContext.EditTasks_ModuleProcessor.ChangeTab(objContext, -2) }}>
                                {Localization.TextFormatter(objTextResource, 'EditTaskSelectedTabHeading')} ({intSelectedTaskCount})
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="slider-header" id="slider-header" />
                <div className="edit-tasks-slider">
                    {
                        strImagePath !== "" ?
                            <div className={JSON.stringify(state.objPreviousData) !== "{}" ? "slider-prev" : "disabled slider-prev"} onClick={() => { JSON.stringify(state.objPreviousData) !== "{}" ? objContext.EditTasks_ModuleProcessor.TraverseData(objContext, "Previous") : () => { } }}>
                                <img src={AngleLeftImage} alt="" />
                            </div>
                            :
                            <div></div>
                    }
                    <div className="slider-area">
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            id="EditTaskFillHeight" Meta={objContext.EditTasks_ModuleProcessor.GetFillHeightMetaData(objContext)} className="bgStyle" scrollStyle={{ overflow: "auto" }} ParentProps={{ ...props }}>
                            <div className="slide">
                                {

                                    strImagePath !== "" ?
                                        <div className="slides">
                                            <div className="task-content-preview">
                                                {
                                                    state.objPageJson ?
                                                        <TaskContentPreview
                                                            PageJson={state.objPageJson}
                                                            JConfiguration={{ ...JConfiguration }}
                                                            SkinName={props.Data.SkinName}
                                                            LearningTestSkinId={props.Data.LearningTestSkinId}
                                                        />
                                                        : <React.Fragment />
                                                }
                                            </div>
                                            <div className="slider-checkbox">
                                                <input id="chkAssignTask" type="checkbox" onClick={() => { objContext.EditTasks_ModuleProcessor.OnChangeCheck(objContext, !blnIsSelected, state.objCurrentData) }} checked={blnIsSelected} />
                                                <span>
                                                    {Localization.TextFormatter(objTextResource, 'EditTasksSelectTaskCheckBoxText')}
                                                </span>
                                                <a target={'_blank'} href={strFullUrl + state.objCurrentData["iPageId"] + "&LanguageId=3"}>Aufgabenvorschau </a>
                                            </div>
                                        </div> :
                                        <React.Fragment>
                                            {Localization.TextFormatter(objTextResource, 'EditTaskInfoMessage')}
                                        </React.Fragment>
                                }
                            </div>{" "}
                        </WrapperComponent>
                    </div>
                    {
                        strImagePath !== "" ?
                            <div className={JSON.stringify(state.objNextData) !== "{}" ? "slider-prev" : "disabled slider-next"}
                                onClick={() => { JSON.stringify(state.objNextData) !== "{}" ? objContext.EditTasks_ModuleProcessor.TraverseData(objContext, "Next") : () => { } }}>
                                <img src={AngleRightImage} alt="" />
                            </div>
                            :
                            <div></div>
                    }
                </div>

                <div className="wrap edit-task-popup-footer" id="edit-task-popup-footer">
                    <button onClick={e => Popup.ClosePopup(props.Id)} className="button green-button" >
                        {Localization.TextFormatter(objTextResource, 'EditTasksAbortButtonText')}
                    </button>
                    {
                        state.blnShowVlaidationMessage ?
                            <div>
                                {Localization.TextFormatter(objTextResource, 'EditTaskErrorMessage')}
                            </div> :
                            <React.Fragment></React.Fragment>
                    }
                    {
                        props.Data.EditSavedTasks ?
                            <div className="button yellow-button" onClick={() => { objContext.EditTasks_ModuleProcessor.EditSavedTasks(objContext); }}>
                                {Localization.TextFormatter(objTextResource, 'EditTasksPopUpEditSavedTasksButtonText')}
                            </div> :
                            <div className="button yellow-button" onClick={() => { objContext.EditTasks_ModuleProcessor.CreateTaskSet(objContext); }}>
                                {Localization.TextFormatter(objTextResource, 'EditTasksProceedButtonText')}
                            </div>
                    }
                </div>
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return state.isLoadComplete ? GetContent() : <React.Fragment />
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(EditTasks_ModuleProcessor.StoreMapList()))(EditTasks);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = EditTasks_ModuleProcessor; 