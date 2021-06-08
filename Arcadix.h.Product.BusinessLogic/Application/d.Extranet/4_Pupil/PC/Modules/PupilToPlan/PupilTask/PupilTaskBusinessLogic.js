import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        console.log("mapping");
        return {
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
}

function GetWorkApproach(arrReviewCriteriaData, objTopic) {
    let arrWorkApproach = arrReviewCriteriaData.filter(objCriteriaData => objCriteriaData.isSelected == true).map(objCriteriaData => {
        return {
            uLearningJournalPupilTopicId: objTopic.uLearningJournalPupilTopicId,
            uLearningJournalPupilWorkApproachId: '00000000-0000-0000-0000-000000000000',
            iReviewCriteriaId: objCriteriaData.iReviewCriteriaId,
            iReviewLevel: objCriteriaData.iselectedLevel
        };
    });
    return arrWorkApproach;
}

export function SaveTopic(objTaskPopUpContext) {   
    let objTopic = { ...objTaskPopUpContext.state.objTopic };
    let objEditData = {
        uLearningJournalPupilTopicId: objTopic.uLearningJournalPupilTopicId,
        uSegmentId: objTopic.uSegmentId,
        uPupilId: objTopic.uPupilId,
        uClassId: objTopic.uClassId,
        vTopicDescription: objTopic.vTopicDescription,
        dtTopicDate: objTopic.dtTopicDate,
        t_LearnCoacher_LearningJournal_Pupil_WorkApproach: GetWorkApproach(objTaskPopUpContext.state.arrReviewCriteriaData, objTopic)
    };
    if (objTaskPopUpContext.state.iTopicStrengthAssessmentOptionId != -1) {
        objEditData.t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment = [{
            uTopicPupilStrengthAssessmentId: '00000000-0000-0000-0000-000000000000',
            uTopicPupilTopicId: objTopic.uTopicPupilTopicId,
            iStrengthAssessmentOptionId: objTaskPopUpContext.state.iTopicStrengthAssessmentOptionId

        }];
    }
    if (objTaskPopUpContext.state.isClickedSendButton) {
        objEditData.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback = [{
            uTopicPupilCommentFeedbackId: '00000000-0000-0000-0000-000000000000',
            uLearningJournalPupilTopicId: objTopic.uLearningJournalPupilTopicId,
            tComment: objTaskPopUpContext.state.strFeedBack,
            iOrder: 1,
            cIsByTeacher: 'N',
            cIsByPupil: 'Y',
            cHasBeenViewed: 'N'
        }];
    }
    let objSaveParams = {
        ForeignKeyFilter: {
            uClassId: objTopic.uClassId
        },
        SearchQuery: {
        },
        vEditData: objEditData
    };
        
    let arrDataRequest = [
        {
            URL: "API/Object/Extranet/Teacher/LearningJournal/Topic",
            Params: objSaveParams,
            MethodType: "Put"
        }
    ];
    DataCall(arrDataRequest);
}

export function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {        
    });
}

export function UpdateReviewCriteria(objTaskPopUpContext, objReviewCriteria, iLevel) {
    if (objTaskPopUpContext.state.isClickedSendButton == false && objTaskPopUpContext.blnCurrentSchoolYear) {
        let arrUpdatedReviewCriteria = objTaskPopUpContext.state.arrReviewCriteriaData.map(objCriteriaData => {
            if (objCriteriaData.iReviewCriteriaId == objReviewCriteria.iReviewCriteriaId) {
                return {
                    ...objCriteriaData,
                    isSelected: true,
                    iselectedLevel: iLevel
                };
            } else {
                return {
                    ...objCriteriaData
                };
            }
        });
        objTaskPopUpContext.dispatch({ type: 'Update_ReviewCriteia', payload: arrUpdatedReviewCriteria });
    }
}

export function UpdateSAOption(objTaskPopUpContext, objSAO) {
    if (objTaskPopUpContext.state.isClickedSendButton == false) {
        objTaskPopUpContext.dispatch({ type: 'Update_SAOption', payload: objSAO.iTopicStrengthAssessmentOptionId });
    }
}

export function UpdateFeedBackText(objTaskPopUpContext, value) {
    objTaskPopUpContext.dispatch({ type: 'Update_FeedBackText', payload: value })
}

export function OnClickSendButton(objTaskPopUpContext) {
    if (objTaskPopUpContext.state.strFeedBack.trim() != '') {
        objTaskPopUpContext.dispatch({ type: 'Update_SendButtonClicked', payload: true });
    }
}

export function GetInitialState(objData) {
    let arrSAOptionData = objData.arrSAOptionData.map(objSao => {
        return { ...objSao };
    });
    let arrReviewCriteriaData = objData.arrReviewCriteriaData.map(objCriteriaData => {
        let selRCObj = objData.objTopic.t_LearnCoacher_LearningJournal_Pupil_WorkApproach.find(objWorkApporoach => objWorkApporoach.iReviewCriteriaId == objCriteriaData.iReviewCriteriaId)
        return {
            ...objCriteriaData,
            iselectedLevel: selRCObj ? selRCObj.iReviewLevel : -1,
            isSelected: selRCObj ? true : false
        };
    });
    let objSelSAOption = objData.objTopic.t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment[0];
    let objSelFeedback = objData.objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback[0];
    return {
        arrSAOptionData: arrSAOptionData,
        arrReviewCriteriaData: arrReviewCriteriaData,
        iTopicStrengthAssessmentOptionId: objSelSAOption ? objSelSAOption.iStrengthAssessmentOptionId : -1,
        strFeedBack: objSelFeedback ? objSelFeedback.tComment : '',
        objTopic: objData.objTopic,
        objTeacher: ApplicationState.GetProperty("PupilToPlanTeacherDetails"),
        isClickedSendButton: (objSelFeedback == undefined || objSelFeedback.tComment == '') ? false : true,
        commentedDate: objSelFeedback != undefined ? objSelFeedback.dtCommentDate : null
    };
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'Update_ReviewCriteia':
            return {
                ...state,
                arrReviewCriteriaData: action.payload
            }
        case 'Update_SAOption':
            return {
                ...state,
                iTopicStrengthAssessmentOptionId: action.payload
            }

        case 'Update_FeedBackText':
            return {
                ...state,
                strFeedBack: action.payload,
                commentedDate: new Date()
            }
        case 'Update_SendButtonClicked':
            return {
                ...state,
                isClickedSendButton: action.payload
            }
    }
}
