//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as PupilTask_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTask/PupilTask_Hook';
import PupilTask_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTask/PupilTask_ModuleProcessor';

//Inline Images import
import imgClose from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/close.svg?inline';
import imgNachdenken from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/nachdenken.svg?inline';
import imgEmoticonWrongOne from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/emoticon_wrong_1.svg?inline';
import imgEmoticonWrongTwo from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/emoticon_wrong_2.svg?inline';
import imgEmoticonWrongThree from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/emoticon_wrong_3.svg?inline';
import imgEmoticonNoAnswer from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/emoticon_no_answer.svg?inline';
import imgEmoticonCorrectOne from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/emoticon_correct_1.svg?inline';
import imgEmoticonCorrectTwo from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/emoticon_correct_2.svg?inline';

/**
* @name PupilTaskPage
* @param {object} props props
* @summary This component displays the PupilTaskPage data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with PupilTaskPage details.
*/
const PupilTaskPage = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilTask_Hook.GetInitialState(props.Data));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objTaskPopUpContext = { state, props, dispatch, ["PupilTask_ModuleProcessor"]: new PupilTask_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objTaskPopUpContext.PupilTask_ModuleProcessor.Initialize(objTaskPopUpContext, objTaskPopUpContext.PupilTask_ModuleProcessor);

    function GetTopicDetailsText({ objTime, objSubject, objDay, objTopic }) {
        let strReturnText = "";
        //let { objTime, objSubject, objDay } = props.Data;
        let strSubjectName = objSubject.t_TestDrive_Subject_Data.find(x => x["iLanguageId"] == props.JConfiguration.InterfaceLanguageId).vSubjectName;
        let strTimeTableDayName = objDay.t_LearnCoacher_Planner_TimeTable_Day_Data[0]["vTimeTableDayName"];
        let strTopicDate = objTopic ? Localization.DateFormatter(objTopic.dtTopicDate) : '';
        let arrDates = strTopicDate.split('.');
        let strDateToDisplay = arrDates[0] + ". " + Localization.GetMonthName(parseInt(arrDates[1]) - 1) + " " + arrDates[2];
        let strClassTime = objTime.vClassTimeFrom + " - " + objTime.vClassTimeTo;
        strReturnText = strSubjectName + ", " + strTimeTableDayName + ", " + strDateToDisplay + ", " + strClassTime;
        return strReturnText;
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = props.Resource.Text;
        let strPupilLearningJournalText = GetTopicDetailsText(props.Data);
        let objTeacherFeedBack = state.objTopic ? state.objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback.find(fdbk => fdbk["cIsByTeacher"] == "Y") : undefined;
        return (
            <div className="task-popup-wrapper" id="TaskPopUpWrapper"> {/*parent refernece*/}
                <div className="task-popup-content">

                    <div className="task-popup-header" id="TaskPopUpHeader"> {/*header id*/}
                        <div className="header-icons ">
                            <img className="edit-icon" src={imgNachdenken} alt="" />
                            <div className="close" onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.SaveTopic(objTaskPopUpContext); }}>
                                <span>{Localization.TextFormatter(props.Resource.Text, 'SaveTopic')}</span>
                                <img
                                    src={imgClose} alt="" className="close-icon"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="task-popup-content-block">
                        <span className="task-popup-contentheader">
                            {Localization.TextFormatter(objTextResource, 'Think_Assessment_Plan')}
                        </span>
                        <div className="headerBlock">
                            <p>{Localization.TextFormatter(objTextResource, 'JudgeFollowingTaskHeader')}</p>
                            <p> {strPupilLearningJournalText}</p>
                        </div>
                        <div className="table-flex">
                            <div className="middle-block-table">
                                <div className="middle-block-left">
                                    <span className="check-sheet-header">{Localization.TextFormatter(objTextResource, 'ReviewCriteriaMessage')}</span>
                                    <div className="space-block" />
                                    <table className="leftTable">
                                        <tr>
                                            <th />
                                            <th>1</th>
                                            <th>2</th>
                                            <th>3</th>
                                            <th>4</th>
                                            <th>5</th>
                                            <th>6</th>
                                        </tr>
                                        {GetReviewCriteriaElements()}
                                        <tr>
                                            <td>{Localization.TextFormatter(objTextResource, 'SureWhenSolving')}:</td>
                                            <td colSpan="6">
                                                <div className="assessment-block">
                                                    {GetSAOptionElements()}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="space-block" />
                                </div>

                                <div className="middle-block-right">
                                    <span className="comment">{Localization.TextFormatter(objTextResource, 'MyComment')}</span>
                                    <div className="space-block" />
                                    <div className="faq-section">
                                        <div className="faq-block">
                                            {state.isClickedSendButton && props.Data.blnCurrentSchoolYear ?
                                                <React.Fragment>
                                                    <label className="pupil-summary-title"> {props.Data.pupilName + " - " + objTaskPopUpContext.PupilTask_ModuleProcessor.GetDateText(state.commentedDate) + " " + objTaskPopUpContext.PupilTask_ModuleProcessor.GetTimeText(state.commentedDate)}</label>
                                                    <div className="pupil-summary">{state.strFeedBack}</div>
                                                    {objTeacherFeedBack ? <ul className="teacher-remarks">
                                                        <li>
                                                            <label className="pupil-summary-title">{state.objTeacher.vFirstName + " " + state.objTeacher.vName} - {new Date(objTeacherFeedBack.dtCommentDate).toDateString()}</label>
                                                            <div className="pupil-summary">{objTeacherFeedBack.tComment}</div>
                                                        </li>
                                                    </ul> : ''}
                                                </React.Fragment> : ''
                                            }
                                        </div>
                                    </div>
                                    <div className="space-block" />
                                    {(!state.isClickedSendButton && props.Data.blnCurrentSchoolYear) && !props.Data.blnDay ?
                                        <div className="comment-block">
                                            <textarea placeholder={Localization.TextFormatter(objTextResource, 'FeedbackPlaceHolder')} value={state.strFeedBack} onChange={(e) => { objTaskPopUpContext.PupilTask_ModuleProcessor.UpdateFeedBackText(objTaskPopUpContext, e.target.value); }} />
                                            <span onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.OnClickSendButton(objTaskPopUpContext); }}>{Localization.TextFormatter(objTextResource, 'SendButton')}</span>
                                            <div className="space-block" />
                                        </div> : ''
                                    }
                                    <div className="space-block" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="task-popup-footer" id="TaskPopUpFooter">  {/*footer id*/}
                        <div className="footer-section">
                            <span className="footerclose-button" onClick={e => { Popup.ClosePopup(props.Id); }}>
                                {Localization.TextFormatter(objTextResource, 'CloseTopic')}
                            </span>
                            {
                                props.Data.blnDay ? <React.Fragment /> :
                                    <span className="footerclose-button" onClick={e => { objTaskPopUpContext.PupilTask_ModuleProcessor.SaveTopic(objTaskPopUpContext); }}>
                                        {Localization.TextFormatter(objTextResource, 'SaveAndCloseTopic')}
                                    </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
    * @name GetSAOptionElements
    * @summary Get StrengthAssessmentOption elements
    * @returns {Array} StrengthAssessmentOption Elements
    */
    function GetSAOptionElements() {
        let arrElements = state.arrSAOptionData.map(sao => {
            return (
                <div className="summary-assesment">
                    <label className="check-containers">
                        <input name="StrengthAssessment" onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.UpdateSAOption(objTaskPopUpContext, sao); }} checked={state.iTopicStrengthAssessmentOptionId == sao.iTopicStrengthAssessmentOptionId} type="radio" className="strength-assesment" />
                        <span className="checkmark" />
                    </label>
                    <span className="checkboxFields">{sao.t_LearnCoacher_LearningJournal_StrengthAssessmentOption_Data.find(objSAData => objSAData["iLanguageId"].toString() === JConfiguration.InterfaceLanguageId).vStrengthAssessmentOptionLevel}</span>
                </div>
            );
        });
        return arrElements;
    }


    /**
    * @name GetReviewCriteriaElements
    * @summary Get ReviewCriteria Elements
    * @returns {Array} StrengthAssessmentOption Elements
    */
    function GetReviewCriteriaElements() {
        let arrElements = state.arrReviewCriteriaData.map(rc => {
            return (
                <tr>
                    <td>{rc.t_LearnCoacher_LearningJournal_WorkApproach_ReviewCriteria_Data[1].vReviewCriteria}</td>
                    <td>
                        <div className="emoji" onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.UpdateReviewCriteria(objTaskPopUpContext, rc, 1); }}>
                            <span className="emojiIcon wrongOne">
                                <img src={imgEmoticonWrongOne} className={rc.iselectedLevel == 1 && rc.isSelected ? 'selectedAnswer' : ''} />
                            </span>
                        </div>
                    </td>
                    <td>
                        <div className="emoji" onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.UpdateReviewCriteria(objTaskPopUpContext, rc, 2); }}>
                            <span className="emojiIcon wrongThree">
                                <img src={imgEmoticonWrongTwo} className={rc.iselectedLevel == 2 && rc.isSelected ? 'selectedAnswer' : ''} />
                            </span>
                        </div>
                    </td>
                    <td>
                        <div className="emoji" onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.UpdateReviewCriteria(objTaskPopUpContext, rc, 3); }}>
                            <span className="emojiIcon wrongThree">
                                <img src={imgEmoticonWrongThree} className={rc.iselectedLevel == 3 && rc.isSelected ? 'selectedAnswer' : ''} />
                            </span>
                        </div>
                    </td>
                    <td>
                        <div className="emoji" onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.UpdateReviewCriteria(objTaskPopUpContext, rc, 4); }}>
                            <span className="emojiIcon wrongTwo">
                                <img src={imgEmoticonNoAnswer} className={rc.iselectedLevel == 4 && rc.isSelected ? 'selectedAnswer' : ''} />
                            </span>
                        </div>
                    </td>
                    <td>
                        <div className="emoji" onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.UpdateReviewCriteria(objTaskPopUpContext, rc, 5); }}>
                            <span className="emojiIcon correctOne">
                                <img src={imgEmoticonCorrectOne} className={rc.iselectedLevel == 5 && rc.isSelected ? 'selectedAnswer' : ''} />
                            </span>
                        </div>
                    </td>

                    <td>
                        <div className="emoji" onClick={() => { objTaskPopUpContext.PupilTask_ModuleProcessor.UpdateReviewCriteria(objTaskPopUpContext, rc, 6); }}>
                            <span className="emojiIcon correctTwo">
                                <img src={imgEmoticonCorrectTwo} className={rc.iselectedLevel == 6 && rc.isSelected ? 'selectedAnswer' : ''} />
                            </span>
                        </div>
                    </td>
                </tr>
            );
        });
        return arrElements;
    }

    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>
    );
};


/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilTask_ModuleProcessor.StoreMapList()))(PupilTaskPage);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilTask_ModuleProcessor;