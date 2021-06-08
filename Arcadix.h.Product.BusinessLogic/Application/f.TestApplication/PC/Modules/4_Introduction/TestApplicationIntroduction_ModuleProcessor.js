import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
 * @name TestApplicationIntroduction_ModuleProcessor
 * @summary Common methods for Introduction component
 */
class TestApplicationIntroduction_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "TestState" }, "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/f.TestApplication/Modules/4_Introduction/Introduction"];
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/" + props.JConfiguration.DeviceType + "/Modules/4_Introduction/TestApplicationIntroduction.css"];
    }
}

export default TestApplicationIntroduction_ModuleProcessor;