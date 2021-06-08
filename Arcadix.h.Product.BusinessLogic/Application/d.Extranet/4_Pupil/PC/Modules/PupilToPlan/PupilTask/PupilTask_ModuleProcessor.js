
/**
 * @name PupilTask_ModuleProcessor
 * @summary Class for Notes module display and manipulate.
 */
class PupilTask_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of store objects used in the module
    * @returns {Array} Array of object list
    */
    static StoreMapList() {
        return [
        ];
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilTaskPage/PupilTaskPage.css"
        ];
    }

    /**
    * @name GetWorkApproach
    * @param {Array} arrReviewCriteriaData Passes ReviewCriteriaData
    * @param {object} objTopic Passes Topic
    * @summary Gets the work approach
    * @returns {Array} WorkApproach data
    */
    GetWorkApproach(arrReviewCriteriaData, objTopic) {
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

    /**
    * @name SaveTopic
    * @param {object} objTaskPopUpContext Passes Context object
    * @summary Saves the Topic
    */
    SaveTopic(objTaskPopUpContext) {
        let objTopic = { ...objTaskPopUpContext.state.objTopic };
        let objEditData = {
            uLearningJournalPupilTopicId: objTopic.uLearningJournalPupilTopicId,
            uSegmentId: objTopic.uSegmentId,
            uPupilId: objTopic.uPupilId,
            uClassId: objTopic.uClassId,
            vTopicDescription: objTopic.vTopicDescription,
            dtTopicDate: objTopic.dtTopicDate,
            t_LearnCoacher_LearningJournal_Pupil_WorkApproach: this.GetWorkApproach(objTaskPopUpContext.state.arrReviewCriteriaData, objTopic)
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
            SearchQuery: {},
            vEditData: objEditData
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        objTaskPopUpContext.props.Data.Object_Extranet_Teacher_Topic.EditData(objSaveParams, (objReturn, cIsNewData) => {
            Popup.ClosePopup(objTaskPopUpContext.props.Id);
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        });
    }


    /**
    * @name UpdateReviewCriteria
    * @param {object} objTaskPopUpContext Passes Context object
    * @param {object} objReviewCriteria Passes Review Criteria
    * @param {Integer} iLevel Passes Level
    * @summary Updates the ReviewCriteria
    */
    UpdateReviewCriteria(objTaskPopUpContext, objReviewCriteria, iLevel) {
        if ((objTaskPopUpContext.state.isClickedSendButton == false && objTaskPopUpContext.props.Data.blnCurrentSchoolYear) && !objTaskPopUpContext.props.Data.blnDay) {
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
            objTaskPopUpContext.dispatch({ type: 'SET_STATE', payload: { "arrReviewCriteriaData": arrUpdatedReviewCriteria } });
        }
    }

    /**
    * @name UpdateSAOption
    * @param {object} objTaskPopUpContext Passes Context object
    * @param {object} objSAO Passes Review StrengthAssessmentOption
    * @summary Updates the StrengthAssessmentOption state
    */
    UpdateSAOption(objTaskPopUpContext, objSAO) {
        if (objTaskPopUpContext.state.isClickedSendButton == false && !objTaskPopUpContext.props.Data.blnDay) {
            objTaskPopUpContext.dispatch({ type: 'SET_STATE', payload: { "iTopicStrengthAssessmentOptionId": objSAO.iTopicStrengthAssessmentOptionId } });
        }
    }

    /**
    * @name UpdateFeedBackText
    * @param {object} objTaskPopUpContext Passes Context object
    * @param {String} value Passes value
    * @summary Updates theFeedBackText state
    */
    UpdateFeedBackText(objTaskPopUpContext, value) {
        objTaskPopUpContext.dispatch({ type: 'SET_STATE', payload: { "strFeedBack": value, "commentedDate": new Date() } });
    }

    /**
    * @name OnClickSendButton
    * @param {object} objTaskPopUpContext Passes Context object
    * @summary Updates SendButtonClicked state
    */
    OnClickSendButton(objTaskPopUpContext) {
        if (objTaskPopUpContext.state.strFeedBack.trim() != '') {
            objTaskPopUpContext.dispatch({ type: 'SET_STATE', payload: { "isClickedSendButton": true } });
        }
    }

    /**
    * @name GetDateText
    * @param {String} strDate Passed date 
    * @summary Formats the passed date in dd.mm.yyyy
    * @returns {String} formated date
    */
    GetDateText(strDate) {
        let objDay = new Date(strDate);
        let strDay = objDay.getDate();
        let strMonth = objDay.getMonth() + 1; //January is 0!
        let strYear = objDay.getFullYear();

        return strDay + '.' + strMonth + '.' + strYear;
    }

    /**
    * @name GetTimeText
    * @param {String} strDate Passed date
    * @summary Formats the passed date in time hh:ss
    * @returns {String} formated time
    */
    GetTimeText(strDate) {
        let objDate = new Date(strDate);
        let strCulture = JConfiguration.LanguageCultureInfo + "-" + JConfiguration.CountryCultureInfo;
        let strTime = objDate.toLocaleTimeString(strCulture);
        return strTime.slice(0, -3);
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}

export default PupilTask_ModuleProcessor;