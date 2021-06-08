//Objects required for module.
import Object_Framework_SystemTracking_ArcadixAppPool from '@shared/Object/a.Framework/SystemTracking/ArcadixAppPool/ArcadixAppPool';
import Object_Framework_SystemTracking from '@shared/Object/a.Framework/SystemTracking/SystemTracking';

//Module related fies.
import * as ArcadixAppPool_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool/ArcadixAppPool_MetaData';

/**
 * @name ArcadixAppPool_ModuleProcessor
 * @param NA
 * @summary Class for ArcadixAppPool module display.
 * @return NA
 */
class ArcadixAppPool_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_SystemTracking_ArcadixAppPool",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        this.GetServiceStatusData(objContext);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        // ArcadixAppPool
        //Object_Framework_Services_ArcadixAppPool.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Framework_SystemTracking_ArcadixAppPool];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetOfflineProgressData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetServiceStatusData(objContext) {
        let objFileWatcherParam = {
            "vServiceName": "ArcadixAppPoolService"
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking.GetServiceStatusData(objFileWatcherParam, (objReturn) => {
            let arrServiceStatusData = objReturn ? objReturn["Data"] : [];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrServiceStatusData": arrServiceStatusData } });
        });
    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let objData = {
            RowData: DataRef(objContext.props.Object_Framework_SystemTracking_ArcadixAppPool)["Data"] ?? [],
            AdditionalPaddingIds: ["ServiceStatus"]
        };
        return objData;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary it returns the object for Grid Meta Data
     * @returns {object}  MetaData object
     */
    GetMetaData(objContext) {
        return {
            ...ArcadixAppPool_MetaData.GetMetaData()
        };
    }

    /**
     * @name GetResourceData
     * @param {object} objContext
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool", objContext.props) ?? {};
        let SkinPath = JConfiguration.CockpitSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css"
        ];
    }
}

export default ArcadixAppPool_ModuleProcessor;