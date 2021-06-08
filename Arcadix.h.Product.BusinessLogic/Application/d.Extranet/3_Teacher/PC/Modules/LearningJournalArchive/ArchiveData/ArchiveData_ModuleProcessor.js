
/**
* @name ArchiveData_ModuleProcessor
* @summary Class for LearningJournal module display and manipulate.
*/
class ArchiveData_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class", "Object_Extranet_Pupil_Pupil", "Object_Extranet_Teacher_Topic", "Object_Extranet_Teacher_TimeTableSegment", "Object_Intranet_Taxonomy_Subject",
            "Object_Extranet_School_SchoolSubject", "Object_Extranet_Teacher_ReviewCriteria", "Object_Extranet_School_TimeTableClassTime", "Object_Extranet_Teacher_TimeTableDay",
            "Object_Extranet_Teacher_StrengthAssessmentOption", "Object_Framework_Services_TextResource"];
    }

    /**
    * @name GetFillHeightMetaData
    * @param {object} objPopupContext Context object
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData(objPopupContext) {
        return {
            HeaderIds: [`EditorPopup_Header_Id${objPopupContext.props.id}`, "ArchiveDataHeader"],
            FooterIds: [`EditorPopup_Footer_Id${objPopupContext.props.id}`, "review-criteria-footer"]
        };
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        return [];
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @summary Required for css
    * @returns {object} arrStyles
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath +
            "/Css/Application/3_Teacher/ReactJs/PC/LearningJournalArchive/LearningJournalArchivePopups/ArchiveData/ArchiveData.css"
        ];
    };


    /**
    * @name GetWorkApproachData
    * @param {Array} arrReviewCriteria Passes ReviewCriteria
    * @param {Array} arrWorkApporach Passes WorkApproach
    * @summary Gets the work approach data
    * @returns {Array} ReviewCriteriaData
    */
    GetWorkApproachData(arrReviewCriteria, arrWorkApporach) {
        let arrReviewCriteriaData = [];
        for (let rc of arrReviewCriteria) {
            let objData = {
                vReviewCriteria: rc.t_LearnCoacher_LearningJournal_WorkApproach_ReviewCriteria_Data[1].vReviewCriteria
            };
            for (let wa of arrWorkApporach) {
                if (rc.iReviewCriteriaId == wa.iReviewCriteriaId) {
                    objData["iReviewLevel"] = wa["iReviewLevel"];
                }
            }
            arrReviewCriteriaData = [...arrReviewCriteriaData, objData];
        }
        return arrReviewCriteriaData;
    }

    /**
    * @name UpdateTeacherComment
    * @param {object} objPopupContext Passes PopupContext
    * @param {String} value Passes value
    * @summary Updates the state strTeacherComment with the value
    */
    UpdateTeacherComment(objPopupContext, value) {
        objPopupContext.dispatch({ type: 'SET_STATE', payload: { strTeacherComment: value } });
    }

    /**
    * @name SaveComment
    * @param {object} objPopupContext Passes PopupContext
    * @param {boolean} blnNoComment Passes true if No comment is written, else false
    * @summary Calls the SaveTopic
    */
    SaveComment(objPopupContext, blnNoComment = false) {
        let strComment = '';
        if (blnNoComment)
            strComment = objPopupContext.Data.objTextResource["NoComment"];
        else
            strComment = objPopupContext.state.strTeacherComment;
        this.SaveTopic(objPopupContext, strComment);
    }

    /**
    * @name SaveTopic
    * @param {object} objPopupContext Passes PopupContext
    * @param {String} strComment Passes Comment
    * @summary Saves the topic
    */
    SaveTopic(objPopupContext, strComment) {
        let objTopic = objPopupContext.props.Data.objTopic;
        let objTeacherComment = {
            uTopicPupilCommentFeedbackId: '00000000-0000-0000-0000-000000000000',
            uLearningJournalPupilTopicId: objTopic.uLearningJournalPupilTopicId,
            tComment: strComment,
            iOrder: 2,
            cIsByTeacher: 'Y',
            cIsByPupil: 'N',
            cHasBeenViewed: 'N'
        };
        let objEditData = {
            uLearningJournalPupilTopicId: objTopic.uLearningJournalPupilTopicId,
            uSegmentId: objTopic.uSegmentId,
            uPupilId: objTopic.uPupilId,
            uClassId: objTopic.uClassId,
            vTopicDescription: objTopic.vTopicDescription,
            dtTopicDate: objTopic.dtTopicDate,
            t_LearnCoacher_LearningJournal_Pupil_WorkApproach: objTopic.t_LearnCoacher_LearningJournal_Pupil_WorkApproach,
            t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment: objTopic.t_LearnCoacher_LearningJournal_Pupil_StrengthAssessment,
            t_LearnCoacher_LearningJournal_Pupil_CommentFeedback: [...objTopic.t_LearnCoacher_LearningJournal_Pupil_CommentFeedback, objTeacherComment]
        };

        let objSaveParams = {
            ForeignKeyFilter: {
                uClassId: objTopic.uClassId
            },
            vEditData: objEditData
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        objPopupContext.props.Object_Extranet_Teacher_Topic.EditData(objSaveParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                ClosePopup.ClosePopup(objPopupContext.props.Id);
            }
        });
    }

    /**
    * @name AddComment
    * @param {object} objPopupContext Passes PopupContext
    * @summary Set state to true when Comment button is clicked
    */
    AddComment(objPopupContext) {
        objPopupContext.dispatch({ type: 'SET_STATE', payload: { isClickedCommentBtn: true } });
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

export default ArchiveData_ModuleProcessor;