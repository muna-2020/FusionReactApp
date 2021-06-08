import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
/**
 * @name TestApplicationResult_ModuleProcessor
 * @summary Handling Next Task Button Click
 */
class TestApplicationResult_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "TestState" }];
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.TestApplicationSkinPath + "/Css/Application/ReactJs/" + props.JConfiguration.DeviceType + "/Modules/6_Result/TestApplicationResult.css",
        ];
    }
}

export default TestApplicationResult_ModuleProcessor 
