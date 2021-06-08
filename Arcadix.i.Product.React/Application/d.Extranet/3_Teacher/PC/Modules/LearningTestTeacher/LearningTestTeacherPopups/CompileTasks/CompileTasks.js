//React imports
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports
import CompileTasks_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/CompileTasks/CompileTasks_ModuleProcessor";
import * as CompileTasks_Hook from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/CompileTasks/CompileTasks_Hook";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

const CompileTasks = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, CompileTasks_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["CompileTasks_ModuleProcessor"]: new CompileTasks_ModuleProcessor() };

    /**
     * @name GetContent
     * @summary returns the required JSX for component.
     * */
    function GetContent() {
        let objTextResource = props.TextResource;
        return (
            <div className="compile-tasks-popup-wrapper">
                <div className="compile-tasks-popup-box">
                    <span className="compile-tasks-close-button">
                        <img src={CloseImage} onClick={props.HandleClosePopup} alt="" />
                    </span>
                    <h3>
                        {Localization.TextFormatter(objTextResource, 'CompileTasksPopupTitle')}
                    </h3>
                    <p>
                        {Localization.TextFormatter(objTextResource, 'CompileTasksPopupFirstHeading')}
                    </p>
                    <p>
                        {Localization.TextFormatter(objTextResource, 'CompileTasksPopupSecondHeading')}
                    </p>
                    <p>
                        {Localization.TextFormatter(objTextResource, 'CompileTasksPopupThirdHeading')}
                    </p>
                    <p>
                        {Localization.TextFormatter(objTextResource, 'CompileTasksPopupFourthHeading')}
                        <span className="link" onClick={() => { props.ShowLearningTestManualComponent(); }}>
                            {Localization.TextFormatter(objTextResource, 'CompileTasksPopupShowLearningTestManualLinkText')}
                        </span>
                    </p>

                    <p className="promote">
                        {Localization.TextFormatter(objTextResource, 'CompileTasksPopupNoteText')}
                        <span className="link" onClick={() => { props.ShowLearningTestSystemComponent(); }}>
                            {Localization.TextFormatter(objTextResource, 'CompileTasksPopupShowLearningTestSystemLinkText')}
                        </span>
                    </p>

                    <div className="compile-tasks-footer">
                        <p>
                            <label class="check-container">
                                {
                                    state.blnIsChecked ?
                                        <input type="checkbox" onClick={() => { objContext.CompileTasks_ModuleProcessor.OnChangeCheckBoxSelection(objContext, false) }} checked /> :
                                        <input type="checkbox" onClick={() => { objContext.CompileTasks_ModuleProcessor.OnChangeCheckBoxSelection(objContext, true) }} />
                                }
                                <span class="checkmark" />
                            </label>
                            <span>
                                {Localization.TextFormatter(objTextResource, 'CompileTasksPopupCheckBoxDescription')}
                            </span>
                        </p>

                        <div className="button yellow-button" onClick={() => { objContext.CompileTasks_ModuleProcessor.SaveData(objContext) }}>
                            {Localization.TextFormatter(objTextResource, 'CompileTasksPopupProceedButtonText')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return GetContent();
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(CompileTasks_ModuleProcessor.StoreMapList()))(CompileTasks);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CompileTasks_ModuleProcessor; 