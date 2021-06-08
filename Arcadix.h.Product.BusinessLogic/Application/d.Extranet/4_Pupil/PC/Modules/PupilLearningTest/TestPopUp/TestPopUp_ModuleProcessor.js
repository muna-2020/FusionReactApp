
/**
* @name TestPopUp_ModuleProcessor
* @summary Class for TestPopUp_ModuleProcessor module display and manipulate.
*/
class TestPopUp_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "PupilLearningTestPopupClose" }
        ];
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": []
        }
    }
}

export default TestPopUp_ModuleProcessor;