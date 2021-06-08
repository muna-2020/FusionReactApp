//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as PupilTopicReviewCriteria_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/PupilTopicReviewCriteria/PupilTopicReviewCriteria_Hook';
import PupilTopicReviewCriteria_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/PupilTopicReviewCriteria/PupilTopicReviewCriteria_ModuleProcessor';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
* @name PupilTopicReviewCriteria
* @param {object} props props
* @summary This component displays the PupilTopicReviewCriteria data.
* @returns {object} div that encapsulated the PupilTopicReviewCriteria div with its details.
*/
const PupilTopicReviewCriteria = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilTopicReviewCriteria_Hook.GetInitialState());

    /**
    * @name objPopupContext
    * @summary Groups state, dispatch and module object(s) in objPopupContext.
    * @returns {object} objPopupContext
    */
    let objPopupContext = { state, props, dispatch, ["PupilTopicReviewCriteria_ModuleProcessor"]: new PupilTopicReviewCriteria_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objPopupContext context object
    * @summary Initialize method call in PupilTopicReviewCriteria_Hook, that contains all the custom hooks.
    * @returns null
    */
    PupilTopicReviewCriteria_Hook.Initialize(objPopupContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objPopupContext.PupilTopicReviewCriteria_ModuleProcessor.Initialize(objPopupContext, objPopupContext.PupilTopicReviewCriteria_ModuleProcessor);

    /**
    * @name GetContent
    * @param {object} props Passes the props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent(props) {
        let objTopic = props.Data.objTopic;
        let objTextResource = props.Resource.Text;
        let objSureUnSure = objTopic.t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment.length > 0 ? props.Data.arrSAOption.find(sa => objTopic.t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment[0].iStrengthAssessmentOptionId == sa["iTopicStrengthAssessmentOptionId"]) : null;
        let objCommented = undefined;
        if (objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback.length > 0) {
            objCommented = objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback[0];
        }
        let blnEnableTeacherToComment = objCommented && objCommented["cIsByTeacher"] == "Y" ? false : true;
        var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return (
            <div className="review-criteria-popup">
                <div
                    className="review-criteria-header"
                    id="PupilTopicReviewCriteriaHeader"
                >
                    <div className="review-criteria-header-left">
                        <h2>{Localization.TextFormatter(objTextResource, 'JudgeFollowingTask')}</h2>
                        <p>{Localization.TextFormatter(objTextResource, 'vFirstName')} {"(" + objTopic.objClass.vClassName + ")"}</p>
                        <p>{Localization.TextFormatter(objTextResource, 'SubjectLabel')}: {objTopic.objSubject.t_TestDrive_Subject_Data[0].vSubjectDisplayName}</p>
                        <p>{Localization.TextFormatter(objTextResource, 'PlanningFor')} = {objTopic.objDay.t_LearnCoacher_Planner_TimeTable_Day_Data[0].vTimeTableDayName}, {props.Data.schoolYearMonth} {objTopic.objClassTime ? objTopic.objClassTime.vClassTimeFrom + "-" + objTopic.objClassTime.vClassTimeTo : ""}</p>
                    </div>
                    <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                        {Localization.TextFormatter(objTextResource, 'ShutDown')}
                        <img src={CloseImage} />
                    </span>
                </div>

                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="PupilTopicReviewCriteria" Meta={objPopupContext.PupilTopicReviewCriteria_ModuleProcessor.GetFillHeightMetaData(objPopupContext)} ParentReference={`EditorPopupParent${objPopupContext.props.id}`} className="bgStyle" scrollStyle={{ overflow: "auto" }} ParentProps={{ ...props }}>
                    <div className="planning-flex">
                        <div className="planning-left">
                            <h3>{Localization.TextFormatter(objTextResource, 'Planning')}</h3>
                            <div className="summary-block">
                                <ul>
                                    <li>{objTopic.vTopicDescription}</li>
                                </ul>
                            </div>
                            <h3>{Localization.TextFormatter(objTextResource, 'SelfAssessment')}</h3>
                            <table className="left-table">
                                <tbody>
                                    {GetWorkApproachElements(objPopupContext.PupilTopicReviewCriteria_ModuleProcessor.GetWorkApproachData(objPopupContext))}
                                </tbody>
                            </table>
                            <p>{Localization.TextFormatter(objTextResource, 'SureUnSureText')}:{objSureUnSure ? objSureUnSure.t_LearnCoacher_LearningJournal_StrengthAssessmentOption_Data[0].vStrengthAssessmentOptionLevel : ""}</p>
                        </div>
                        <div className="planning-right">
                            <h3>{Localization.TextFormatter(objTextResource, 'Comments')}</h3>
                            <div className="summary-block">
                                {objCommented ?
                                    <React.Fragment>
                                        <h3>{objTopic.objPupil.vFirstName + "-" + objCommented.dtCommentDate}</h3>
                                        <p> {objCommented.tComment}</p>
                                    </React.Fragment> : ''}
                                {
                                    state.isClickedCommentBtn ? <React.Fragment><h3>{props.Data.strTeacherName} - {new Date().toLocaleDateString('de-DE', dateOptions)}</h3>
                                        <p>{state.strTeacherComment}</p></React.Fragment> : ''
                                }

                            </div>
                            <div className="textarea-padd">
                                {
                                    blnEnableTeacherToComment && !state.isClickedCommentBtn ?
                                        <div className="textarea-block">
                                            <textarea name="" placeholder={Localization.TextFormatter(objTextResource, 'WriteComment')} id=""
                                                value={state.strTeacherComment}
                                                onChange={(e) => { objPopupContext.PupilTopicReviewCriteria_ModuleProcessor.UpdateTeacherComment(objPopupContext, e.target.value); }}
                                                cols="30"
                                                rows="10"
                                            />
                                            <div className="textarea-button-flex">
                                                <div className="button pink-button" onClick={() => { objPopupContext.PupilTopicReviewCriteria_ModuleProcessor.SaveComment(objPopupContext, true); }}>{objTextResource.NoComment}</div>
                                                <div className="button pink-button" onClick={() => { objPopupContext.PupilTopicReviewCriteria_ModuleProcessor.AddComment(objPopupContext); }} >{objTextResource.AddComment}</div>
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                </WrapperComponent>
                <div className="wrap review-criteria-footer" id="review-criteria-footer">
                    <div
                        className="button yellow-button"
                        onClick={() => { Popup.ClosePopup(props.Id); }}
                    >
                        {Localization.TextFormatter(objTextResource, 'Cancel')}
                    </div>
                    <div
                        className="button yellow-button"
                        onClick={() => { objPopupContext.PupilTopicReviewCriteria_ModuleProcessor.SaveComment(objPopupContext); }}
                    >
                        {Localization.TextFormatter(objTextResource, 'ShutDown')}
                    </div>
                </div>
            </div>
        );

        /**
        * @name GetWorkApproachElements
        * @param {Array} arrWorkApproachData WorkApproachData
        * @summary Gets work approach elements
        * @returns {object} jsx, React.Fragment
        */
        function GetWorkApproachElements(arrWorkApproachData) {
            let arrElements = arrWorkApproachData.map(rc => {
                return (
                    <tr>
                        <td>{rc.vReviewCriteria}</td>
                        <td />
                        <td>
                            <div className={rc.iReviewLevel == 1 ? "number-in-circle selected" : "number-in-circle"}>1 </div>
                        </td>
                        <td>
                            <div className={rc.iReviewLevel == 2 ? "number-in-circle selected" : "number-in-circle"}>2 </div>
                        </td>
                        <td>
                            <div className={rc.iReviewLevel == 3 ? "number-in-circle selected" : "number-in-circle"}>3 </div>
                        </td>
                        <td>
                            <div className={rc.iReviewLevel == 4 ? "number-in-circle selected" : "number-in-circle"}>4 </div>
                        </td>
                        <td>
                            <div className={rc.iReviewLevel == 5 ? "number-in-circle selected" : "number-in-circle"}>5 </div>
                        </td>
                        <td>
                            <div className={rc.iReviewLevel == 6 ? "number-in-circle selected" : "number-in-circle"}>6 </div>
                        </td>
                    </tr>
                );
            });
            return arrElements;
        }
    }
    return GetContent(props);
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module.
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilTopicReviewCriteria_ModuleProcessor.StoreMapList()))(PupilTopicReviewCriteria);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilTopicReviewCriteria_ModuleProcessor; 