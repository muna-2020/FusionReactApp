//Module related imports.
import * as StartDashboard_OfficeRibbon from '@shared/Application/c.Intranet/Modules/1_Start/StartDashboard/StartDashboard_OfficeRibbon';

/**
* @name StartDashboard_ModuleProcessor
* @summary Class for Dashboard module display.
*/
class StartDashboard_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/1_Start/StartDashboard",
        ];
    }
    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
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
        let arrResourceParams = ["/c.Intranet/Modules/1_Start/StartDashboard"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams, "Y");
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name SetRibbonData
    * @param {object} objContext
    * @summary Sets the ribbon data.
    */
    SetRibbonData(objContext) {
        if (objContext.state.isLoadComplete || objContext.props.isLoadComplete) {
            var objRibbonData = {
                objContext,
                //"ReloadMethod": () => objContext.StartDashboard_ModuleProcessor.ReloadData(objContext),
            };
            ApplicationState.SetProperty("OfficeRibbonData", StartDashboard_OfficeRibbon.GetDashboardOfficeRibbonData(objRibbonData));
        }
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStyles
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/1_Start/StartDashboard/StartDashboard.css",
        ];
    }

    /**
     * @name GetPrefetchFiles
     * @param {object} props props
     * @returns {object} PrefetchFiles
     */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Charts"]
        }
    }
}

export default StartDashboard_ModuleProcessor;