//React related imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module related files.
import * as LearningTestSettings_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/LearningTestSettings/LearningTestSettings_Hook';
import LearningTestSettings_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/LearningTestSettings/LearningTestSettings_ModuleProcessor';
import LearningTestSystem_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystem_ModuleProcessor';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';


/**
 * @name LearningTestSettings
 * @param {any} props props
 * @returns {*} Returns the jsx object
 */
const LearningTestSettings = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningTestSettings_Hook.GetInitialState());

    /**
    * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
    */
    let objContext = { state, props, dispatch, ["LearningTestSettings_ModuleProcessor"]: new LearningTestSettings_ModuleProcessor(), ["LearningTestSystem_ModuleProcessor"]: new LearningTestSystem_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Billing_Hook, that contains all the custom hooks.
    * @returns null
    */
    LearningTestSettings_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary returns the required jsx for component
    * @returns {*} Jsx
    */
    function GetContent() {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", props);
        return (
            <div className="settings-popup">
                <div className="settings-popup-header" id="Settings_Header">
                    <span className="close" onClick={e => { if (props.Meta.FromTestResults) props.Events.SaveExecutions(); Popup.ClosePopup(props.Id) }}>
                        {Localization.TextFormatter(objTextResource, 'LearningTestSettingsCloseButtonText')}
                        <img src={CloseImage} alt="" />
                    </span>
                </div>

                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="FillHeightLearningTestSettings"
                    Meta={{
                        HeaderIds: [`EditorPopup_Header_Id${objContext.props.id}`, "Settings_Header"],
                        FooterIds: [`EditorPopup_Footer_Id${objContext.props.id}`, "Settings_Footer"]
                    }}
                    ParentReference={`EditorPopupParent${objContext.props.id}`}
                    ParentProps={{ ...props }} className="bgStyle" scrollStyle={{ overflow: "auto" }}
                >
                    <div className="settings-popup-container">
                        <h2>{Localization.TextFormatter(objTextResource, 'LearningTestSettingsFirstTitleText')}</h2>
                        <p>{Localization.TextFormatter(objTextResource, 'LearningTestSettingsFirstTitleDescriptionFirstPara')}</p>
                        <p>{Localization.TextFormatter(objTextResource, 'LearningTestSettingsFirstTitleDescriptionSecondPara')}</p>
                        <div className="input-flex">
                            <span>{Localization.TextFormatter(objTextResource, 'LearningTestSettingsFirstTitleNumberOfTasks')}</span>
                            <input
                                type="text"
                                value={state.NumberOfTasks}
                                className={state.ErrorTaskMessage ? "input-border" : ""}
                                name=""
                                id=""
                                onBlur={() => { objContext.LearningTestSettings_ModuleProcessor.OnBlurInput(objContext, 'Task') }}
                                onChange={(event) => { objContext.LearningTestSettings_ModuleProcessor.OnChangeInput(objContext, objTextResource, event.target.value, "Task") }}
                                onFocus={(event) => { objContext.LearningTestSettings_ModuleProcessor.OnFocusInput(objContext, objTextResource, event.target.value, "Task") }}
                            />
                            {" "}
                        </div>
                        <p>{Localization.TextFormatter(objTextResource, 'LearningTestSettingsFirstTitleDescriptionFourthPara')}</p>
                        <div className="input-flex">
                            <span>{Localization.TextFormatter(objTextResource, 'LearningTestSettingsFirstTitleNumberOfRepetition')}</span>
                            <input type="text"
                                value={state.NumberOfRepetition}
                                className={state.ErrorTaskSetMessage ? "input-border" : ""}
                                name=""
                                id=""
                                onBlur={() => { objContext.LearningTestSettings_ModuleProcessor.OnBlurInput(objContext, 'Repetition') }}
                                onChange={(event) => { objContext.LearningTestSettings_ModuleProcessor.OnChangeInput(objContext, objTextResource, event.target.value, "Repetition") }}
                                onFocus={(event) => { objContext.LearningTestSettings_ModuleProcessor.OnFocusInput(objContext, objTextResource, event.target.value, "Repetition") }}
                            />
                            {" "}
                        </div>
                        <div className="note-block">
                            <h3>{Localization.TextFormatter(objTextResource, 'LearningTestSettingsFirstTitleNoteHeadingText')}</h3>
                            <p>{Localization.TextFormatter(objTextResource, 'LearningTestSettingsFirstTitleNoteDescription')}</p>
                        </div>

                        {
                            state.ErrorTaskMessage ?
                                <div className="error-task-message">
                                    <img src={ExclamationMarkImage} alt="" />
                                    <b>{state.ErrorTaskMessage}</b>
                                </div>
                                : <React.Fragment />
                        }
                        {
                            state.ErrorTaskSetMessage ?
                                <div className="error-task-message">
                                    <img src={ExclamationMarkImage} alt="" />
                                    <b>{state.ErrorTaskSetMessage}</b>
                                </div>
                                : < React.Fragment />
                        }

                    </div>
                </WrapperComponent>

                <div className="settings-popup-footer" id="Settings_Footer">
                    <div className="button green-button" onClick={e => { if (props.Meta.FromTestResults) props.Events.SaveExecutions(); Popup.ClosePopup(props.Id) }}>
                        {Localization.TextFormatter(objTextResource, 'LearningTestSettingsAbortButtonText')}
                    </div>
                    <div className="button green-button" onClick={() => objContext.LearningTestSettings_ModuleProcessor.SaveToUserPreference(objContext, objTextResource)}>
                        {Localization.TextFormatter(objTextResource, 'LearningTestSettingsUpdateButtonText')}
                    </div>
                </div>
            </div>
        );
    }

    /**
    * @summary renders the jsx.
    */
    return state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* calls mapStateToProps of business logic and exports the component.
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(LearningTestSettings_ModuleProcessor.StoreMapList()))(LearningTestSettings);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestSettings_ModuleProcessor; 