//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as SurveyPopup_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/SurveyPopup/SurveyPopup_Hook';
import SurveyPopup_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/SurveyPopup/SurveyPopup_ModuleProcessor';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
* @name SurveyPopup
* @param {object} props props
* @summary This component displays the SurveyPopup data.
* @returns {object} div that encapsulated the SurveyPopup div with its details.
*/
const SurveyPopup = props => {
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SurveyPopup_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["SurveyPopup_ModuleProcessor"]: new SurveyPopup_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Teacher_Hook, that contains all the custom hooks.
    * @returns null
    */
    SurveyPopup_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.SurveyPopup_ModuleProcessor.Initialize(objContext, objContext.SurveyPopup_ModuleProcessor);

    function GetContent() {
        let objTextResource = props.Resource.Text;
        return (
            <React.Fragment>
                <div className="feedback-popup-overlay">
                    <div className="feedback-box">
                        <div className="feedback-title">
                            <h3>{Localization.TextFormatter(objTextResource, 'FeedbackHeader')}</h3>
                            <span className="close">{Localization.TextFormatter(objTextResource, 'Close')}
                                <img src={CloseImage}
                                    className="close-icon"
                                    onClick={() => {
                                        Popup.ClosePopup(props.Id);
                                        props.Events.UpdateFeedbackTab(state.strFeedbackTab);
                                    }}
                                />
                            </span>
                        </div>
                        <div className="feedback-content">
                            <h3>{Localization.TextFormatter(objTextResource, 'FeedbackContentHeader')}</h3>
                            <p>{Localization.TextFormatter(objTextResource, 'FeedbackContent')}</p>
                            <p> {/*Question*/}
                                {props.Data.objSurveyQuestionData["vQuestion"]}
                            </p>
                            <div className="feedback-tab">
                                <button className={state.strFeedbackTab == "Yes" ? "active" : ""} onClick={() => dispatch({ type: "SET_STATE", payload: { "strFeedbackTab": "Yes", "strNoComment": "", "intCheckboxSelectionCount": 0 }})}>{Localization.TextFormatter(objTextResource, 'Yes')}</button>
                                <button className={state.strFeedbackTab == "No" ? "active" : ""} onClick={() => dispatch({ type: "SET_STATE", payload: { "strFeedbackTab": "No", "strYesComment": "" } })}>{Localization.TextFormatter(objTextResource, 'No')}</button>
                            </div>
                            {state.strFeedbackTab !="" ?
                                state.strFeedbackTab == "Yes" ?
                                    <React.Fragment>
                                        <div className="feedback-tab-content"> {/*----------Yes----------*/}
                                            <p>{Localization.TextFormatter(objTextResource, 'YesQuestion')}
                                            </p>
                                            <textarea
                                                name=""
                                                id=""
                                                placeholder={Localization.TextFormatter(objTextResource, 'TextAreaPlaceholder')}
                                                onChange={(e) => {
                                                    objContext.SurveyPopup_ModuleProcessor.HandleCommentChange(objContext, e.target.value);
                                                }}
                                                value={state.strYesComment}
                                            />
                                        </div>
                                        <button className="send-button" onClick={() => objContext.SurveyPopup_ModuleProcessor.SendFeedback(objContext)}>{Localization.TextFormatter(objTextResource, 'SendFeedback')}</button>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <div className="feedback-tab-content wizard-2"> {/*----------No----------*/}
                                            <p>{Localization.TextFormatter(objTextResource, 'NoQuestion')}</p>
                                            <div className="checklist">
                                                <label> <input type="radio" checked={state.intCheckboxSelectionCount == 1? true: false } onClick={() => { objContext.SurveyPopup_ModuleProcessor.OnListClick(objContext, 1); }}/> <span className="checkmark"/></label>
                                                {Localization.TextFormatter(objTextResource, 'Point1')}
                                            </div>
                                            <div className="checklist">
                                                <label> <input type="radio" checked={state.intCheckboxSelectionCount == 2 ? true : false} onClick={() => { objContext.SurveyPopup_ModuleProcessor.OnListClick(objContext, 2); }}/> <span className="checkmark"/></label>
                                                {Localization.TextFormatter(objTextResource, 'Point2')}
                                            </div>
                                            <div className="checklist">
                                                <label> <input type="radio" checked={state.intCheckboxSelectionCount == 3 ? true : false} onClick={() => { objContext.SurveyPopup_ModuleProcessor.OnListClick(objContext, 3); }}/> <span className="checkmark"/></label>
                                                {Localization.TextFormatter(objTextResource, 'Point3')}
                                            </div>
                                            <div>
                                                <span>{Localization.TextFormatter(objTextResource, 'OptionalComment')}</span>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                placeholder={Localization.TextFormatter(objTextResource, 'TextAreaPlaceholder')}
                                                onChange={(e) => {
                                                    objContext.SurveyPopup_ModuleProcessor.HandleCommentChange(objContext, e.target.value);
                                                }}
                                                value={state.strNoComment}
                                            />
                                        </div>                                        
                                        <button className="send-button" onClick={() => objContext.SurveyPopup_ModuleProcessor.SendFeedback(objContext)}>{Localization.TextFormatter(objTextResource, 'SendFeedback')}</button>
                                    </React.Fragment>
                                :<React.Fragment />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return GetContent();
    
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(SurveyPopup_ModuleProcessor.StoreMapList()))(SurveyPopup);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SurveyPopup_ModuleProcessor; 