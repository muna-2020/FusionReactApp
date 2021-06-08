//Module Related import
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import * as PaginationGrid_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/PaginationGrid/PaginationGrid_Sample_Data';

/**
* @name PaginationGrid_ModuleProcessor
* @summary Class for PaginationGrid module display.
*/
class PaginationGrid_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/Teacher", "Object_Cockpit_MainClient_MainClientLanguage", "Object_Cockpit_Language"];
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

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/Teacher"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    GetData(objContext, i) {
        if (i == 1) {
            objContext.dispatch({ type: "SET_STATE", payload: { "Data": PaginationGrid_Sample_Data.GetData() } });
        }
        else if (i == 2) {
            objContext.dispatch({ type: "SET_STATE", payload: { "Data": PaginationGrid_Sample_Data.GetData1() } });
        }
        else if (i == 3) {
            objContext.dispatch({ type: "SET_STATE", payload: { "Data": PaginationGrid_Sample_Data.GetData2() } });
        }
        else if (i == 4) {
            objContext.dispatch({ type: "SET_STATE", payload: { "Data": PaginationGrid_Sample_Data.GetData3() } });
        }
        else if (i == 5) {
            objContext.dispatch({ type: "SET_STATE", payload: { "Data": PaginationGrid_Sample_Data.GetData4() } });
        }
    }
}

export default PaginationGrid_ModuleProcessor;