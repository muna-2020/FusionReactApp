//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_SystemTracking_CodeCrawler from '@shared/Object/a.Framework/SystemTracking/CodeCrawler/CodeCrawler';

/**
 * @name CodeCrawler_Moduleprocessor
 * @param NA
 * @summary Class for CodeCrawler module display.
 */
class CodeCrawler_Moduleprocessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.3_CodeCrawler/CodeCrawler",
           // "Object_Framework_SystemTracking_CodeCrawler"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        this.LoadCodeCrawlerData(objContext);
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        
    }

    /**
    * @name InitialDataParams
    * @param {object} props passes props
    * @summary Get initial request params for the component.
    * @returns {object} return objDataCalls
    */
    InitialDataParams(props) {

        let arrDataRequest = [];
        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/3.3_CodeCrawler/CodeCrawler"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
 * @name OpenCodeCrawler
 * @param {any} objContext
 * @summary to openPopup to see code for implementationStep
 */
    LoadCodeCrawlerData(objContext) {
        let objCodeCrawlerParam = {
            "SearchQuery": {
                "must": [
                    {
                        "terms": {
                            "Id": objContext.props.Data.CodeCrawlerUniqueId
                        }
                    }
                ],
            }
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking_CodeCrawler.GetData(objCodeCrawlerParam, (objReturnData) => {
            let arrCodeCrawlerData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            if (arrCodeCrawlerData.length > 0) {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrCodeCrawlerData": arrCodeCrawlerData } });
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrCodeCrawlerData": [{ "Id": "ErrorMessage","FileContent":"Content is not yet Added"}] } });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }


    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
        ];
    }
}

export default CodeCrawler_Moduleprocessor;