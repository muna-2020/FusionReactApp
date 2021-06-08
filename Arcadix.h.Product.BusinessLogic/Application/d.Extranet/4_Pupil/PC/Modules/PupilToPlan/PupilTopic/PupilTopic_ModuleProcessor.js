
/**
 * @name PupilTopic_ModuleProcessor
 * @summary Class for Notes module display and manipulate.
 */
class PupilTopic_ModuleProcessor extends ExtranetBase_ModuleProcessor {

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
    * @returns {object} GetDynamicStyles
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilToPlan/PupilToPlan_PopUp/PupilToPlan_PopUp.css"
        ];
    }

    /**
    * @name SaveTopic
    * @param {object} objPopUpContext Passes Context object
    * @param {object} objPassedData Passes Passed Data
    * @summary Saves the Topic
    * @returns {function} Returns a promise
    */
    SaveTopic(objPopUpContext, objPassedData) {
        return new Promise((resolve, reject) => {
            let objSelDate = objPopUpContext.state.objSelectedDate;
            let objEditData = {
                uLearningJournalPupilTopicId: objPopUpContext.state.objTopic ? objPopUpContext.state.objTopic["uLearningJournalPupilTopicId"] : '00000000-0000-0000-0000-000000000000',
                uSegmentId: objPassedData.objDay.objSegment.uSegmentId,
                uPupilId: objPassedData.strPupilId,
                uClassId: objPassedData.strClassId,
                vTopicDescription: objPopUpContext.state.strTopic,
                dtTopicDate: objSelDate.iYearNumber + "-" + objSelDate.iMonthNumber + "-" + objSelDate.iDayNumber
            };
            let objSaveParams = {
                ForeignKeyFilter: {
                    uClassId: objPassedData.strClassId
                },
                vEditData: objEditData
            };

            ApplicationState.SetProperty("blnShowAnimation", true);
            objPopUpContext.props.Data.Object_Extranet_Teacher_Topic.EditData(objSaveParams, (objReturn, cIsNewData) => {
                if (cIsNewData) {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    resolve(objReturn);
                }
            });
        });
    }

    /**
    * @name UpdateTopicState
    * @param {object} objPopUpContext Passes Context object
    * @param {String} value Passes Value
    * @summary Updates the Topic state
    */
    UpdateTopicState(objPopUpContext, value) {
        objPopUpContext.dispatch({ type: 'SET_STATE', payload: { "strTopic": value } });
    }

    /**
    * @name GetFormattedLocaleEndtDate
    * @param {object} objContext Passes context object
    * @param {object} objDate Date
    * @summary Gets the date according to the locale with formatting.
    * @returns {Array} LocaleDate
    */
    GetFormattedDate(objContext, objDate) {
        let intDay = parseInt(objDate.iDayNumber);
        let intMonth = parseInt(objDate.iMonthNumber);
        let intYear = parseInt(objDate.iYearNumber);
        let strLocaleDate = new Date(intYear, intMonth - 1, intDay).toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo, { dateStyle: "long" });
        return strLocaleDate;
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

export default PupilTopic_ModuleProcessor;