
/**
 * @name TestApplicationPreLogin_ModuleProcessor
 * @summary for event handling methods
 */
class TestApplicationPreLogin_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ StoreKey: "ApplicationState", DataKey: "TestState" },"Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/f.TestApplication/Modules/2_PreLogin/PreLogin"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        /**
         * @name TextResource
         * @summary Text Resource
         */
        Object_Framework_Services_TextResource.Initialize(["/f.TestApplication/Modules/2_PreLogin/PreLogin"]);
        return [Object_Framework_Services_TextResource];
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            
       
        ];
    }
}

export default TestApplicationPreLogin_ModuleProcessor;