
/**
* @name PupilTopicReviewCriteria_ModuleProcessor
* @summary Class for LearningJournal module display and manipulate.
*/
class PlanenTopicDisplay_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [];
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
   * @name GetDynamicStyles
   * @param {object} props props
   * @summary Required for css
   * @returns {object} arrStyles
   */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath +
            "/Css/Application/3_Teacher/ReactJs/PC/LearningJournal/LearningJournalPopups/PlanenTopicDisplay/PlanenTopicDisplay.css"
        ];
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
    * @name GetFormattedLocaleEndtDate
    * @param {object} objContext Passes context object
    * @param {object} objDate Date
    * @summary Gets the date according to the locale with formatting.
    * @returns {Array} LocaleDate
    */
    GetFormattedDate(objContext, objDate) {
        let arrDate = objDate.split('-');
        let intDay = parseInt(arrDate[2]);
        let intMonth = parseInt(arrDate[1]);
        let intYear = parseInt(arrDate[0]);
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

export default PlanenTopicDisplay_ModuleProcessor;