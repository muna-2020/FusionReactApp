//React imports
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports
import LearningTestSettings_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestSettings/LearningTestSettings_ModuleProcessor";
import * as LearningTestSettings_Hook from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestSettings/LearningTestSettings_Hook";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

const LearningTestSettings = props => {

    /**
     * @name Reduce Initializer.
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningTestSettings_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["LearningTestSettings_ModuleProcessor"]: new LearningTestSettings_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    LearningTestSettings_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.LearningTestSettings_ModuleProcessor.Initialize(objContext, objContext.LearningTestSettings_ModuleProcessor);

    /**
     * @name GetFormData
     * @param {any} objTextResource
     * @param {any} objTaskDifficultyLevelDetails
     */
    function GetFormData(objTextResource, objTaskDifficultyLevelDetails) {
        let arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData => objTempData["iDisplayOrder"] === objTaskDifficultyLevelDetails["iDisplayOrder"]);
        let objData = { ...objTaskDifficultyLevelDetails, ["intValue"]: arrData.length > 0 ? arrData[0]["intValue"] : "" };
        return (
            objTaskDifficultyLevelDetails["blnShow"]
                ?
                <div id={objData["iDisplayOrder"]} className={objContext.state.blnDisableTextBoxes && objData.intValue == "" ? "input-flex disabled" : "input-flex"} >
                    <input type="text" value={objData["intValue"]} onChange={() => { objContext.LearningTestSettings_ModuleProcessor.OnChangeNumberOfTasks(objContext, event.target.value, objData) }} />
                    <span>
                        {objTaskDifficultyLevelDetails["t_TestDrive_Task_TaskDifficultyLevel_Data"][0]["vTaskDifficultyLevelName"]} ({objTaskDifficultyLevelDetails["NoOfTasks"]})
                        </span>
                </div>
                : <div></div>
        );
    }

    /**
     * @name GetContent
     * @summary returns the required JSX for the component.
     * */
    function GetContent() {
        let objTextResource = props.Data.TextResource;
        let arrTaskDifficultyLevelData = objContext.LearningTestSettings_ModuleProcessor.GetTaskDifficultyLevelDataWithNumberOfTasks(objContext);
        return (
            <div className="settings-popup learning-test-teacher-settings">
                <div className="settings-popup-header" id="LearningTestSettingsHeader">
                    <span className="close" onClick={(e) => { Popup.ClosePopup(props.Id);}}>
                        {Localization.TextFormatter(objTextResource, 'LearningTestSettingsPopupTestCloseButtonText')}
                        <img src={CloseImage} alt="" />
                    </span>
                </div>
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    id="TestSettingsFillHeight" Meta={objContext.LearningTestSettings_ModuleProcessor.GetFillHeightMetaData(objContext)}
                    ParentReference={`EditorPopupParent${props.modalUId}`} className="bgStyle" scrollStyle={{ overflow: "auto" }} ParentProps={{ ...props }} >
                    <div className="settings-popup-overlay">
                        <div className="settings-popup-container">
                            <h3>
                                {Localization.TextFormatter(objTextResource, 'LearningTestSettingsPopupTestNameHeading')}
                            </h3>
                            <input type="text" className={state.blnShowValidationBorderForTestName ? "input-err" : ""} value={state.strTestName} onChange={(event) => { objContext.LearningTestSettings_ModuleProcessor.OnChangeTestName(objContext, event.target.value) }} />
                            <h3>
                                {Localization.TextFormatter(objTextResource, 'LearningTestSettingsPopupNoOfTaskHeading')}
                            </h3>
                            {
                                arrTaskDifficultyLevelData.map(objTempData => {
                                    return GetFormData(objTextResource, objTempData);
                                })
                            }
                            <div className="paragraph-block">
                                <p>
                                    {Localization.TextFormatter(objTextResource, 'LearningTestSettingsPopupTaskSetCompiledFor')}
                                </p>
                                <p>
                                    – {props.Data.ClassDetails["vClassName"]}, {props.Data.ParentSubjectDetails["t_TestDrive_Subject_Data"][0]["vSubjectName"]}, {props.Data.SubSubjectDetails["t_TestDrive_Subject_Data"][0]["vSubjectName"]}, {props.Data.Modus}, {props.Data.strDate}
                                </p>
                                <p>
                                    – {props.Data.CountForSelectedPupil} {Localization.TextFormatter(objTextResource, 'PupilLabel')}
                                </p>
                            </div>
                        </div>
                    </div>
                </WrapperComponent>
                <div className="settings-popup-footer" id="LearningTestSettingsFooter">
                    <div className="button green-button" onClick={e => Popup.ClosePopup(props.Id)} >
                        {Localization.TextFormatter(objTextResource, 'LearningTestSettingsPopupTestAbortButtonText')}
                    </div>
                    {
                        state.blnShowVlaidationMessage ?
                            <div>
                                {Localization.TextFormatter(objTextResource, 'LearningTestSettingsPopupValidationMessage')}
                            </div>
                            : <React.Fragment></React.Fragment>
                    }
                    <div className="button yellow-button" onClick={() => { objContext.LearningTestSettings_ModuleProcessor.CreateTaskSet(objContext) }}>
                        {Localization.TextFormatter(objTextResource, 'LearningTestSettingsPopupTestProceedButtonText')}
                    </div>
                </div>
            </div >
        );
    }

    /**
     * @summary renders the jsx.
     */
    return state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(LearningTestSettings_ModuleProcessor.StoreMapList()))(LearningTestSettings);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestSettings_ModuleProcessor; 