
/**
* @name GetInitialState
* @param {object} objData Data
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(objData) {
    let arrSAOptionData = objData.arrSAOptionData.map(objSao => {
        return { ...objSao };
    });
    let arrReviewCriteriaData = objData.arrReviewCriteriaData.map(objCriteriaData => {
        let selRCObj = objData.objTopic ? objData.objTopic.t_LearnCoacher_LearningJournal_Pupil_WorkApproach.find(objWorkApporoach => objWorkApporoach.iReviewCriteriaId == objCriteriaData.iReviewCriteriaId) : undefined;
        return {
            ...objCriteriaData,
            iselectedLevel: selRCObj ? selRCObj.iReviewLevel : -1,
            isSelected: selRCObj ? true : false
        };
    });
    let objSelSAOption = objData.objTopic ? objData.objTopic.t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment[0] : undefined;
    let objSelFeedback = objData.objTopic ? objData.objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback[0] : undefined;
    return {
        arrSAOptionData: arrSAOptionData,
        arrReviewCriteriaData: arrReviewCriteriaData,
        iTopicStrengthAssessmentOptionId: objSelSAOption ? objSelSAOption.iStrengthAssessmentOptionId : -1,
        strFeedBack: objSelFeedback ? objSelFeedback.tComment : '',
        objTopic: objData.objTopic,
        objTeacher: ApplicationState.GetProperty("PupilToPlanTeacherDetails"),
        isClickedSendButton: (objSelFeedback && objSelFeedback.tComment !== '') ? true : false,
        commentedDate: objSelFeedback ? objSelFeedback.dtCommentDate : null
    };
}