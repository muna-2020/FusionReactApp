
//Objects required for module.
import Object_Demo_Sample from '@shared/Object/SupportApplication/Demo/Sample/Sample';

/**
* @name Sample_ModuleProcessor
* @summary Class for Country module display.
*/
class Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    constructor() {
        super();
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Demo_Sample", "Object_Framework_Services_TextResource"];
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

        let arrDataRequest = [];

        //Sample object
        Object_Demo_Sample.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Demo_Sample];

        // Text Resource
        let arrResourceParams = ["/l.Demo/Modules/Sample"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }
}

export default Sample_ModuleProcessor;