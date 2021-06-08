
/**
 * @name Home_ModuleProcessor
 * @summary module processor for Home Page.
 * */
class Home_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_ExtranetNavigation",
            { "StoreKey": "ApplicationState", "DataKey": "ShowTestMessage" },
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/LoginAndMaster/Master",
        ];
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

export default Home_ModuleProcessor;