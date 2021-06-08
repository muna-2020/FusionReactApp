//Objects required for module.
import Object_Framework_SystemTracking from '@shared/Object/a.Framework/SystemTracking/SystemTracking';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';

//Module related fies.
import * as OneDriveService_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OneDriveService/OneDriveService_MetaData';
import Framework_Services_FileHandler_OneDriveFileMapping from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OneDriveService/OneDriveService_Module';

/**
 * @name OneDriveService_ModuleProcessor
 * @param NA
 * @summary Class for OneDriveService module display.
 * @return NA
 */
class OneDriveService_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_MainClient",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/WindowServices/OneDriveService"
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

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/WindowServices/OneDriveService"];
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
            "vServiceName": "OneDriveService"
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
     * @returns {object} Returns Grid data
     */
    GetGridData(objContext) {
        let objData = {
            RowData: objContext.state.arrOneDriveMappingData ?? [],
            DropDownData: this.GetDependingColumnData(objContext),
            AdditionalPaddingIds: ["ServiceStatus"]
        };
        return objData;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary Returns the object for Grid Meta Data
     * @returns {object}  MetaData object
     */
    GetMetaData(objContext) {
        return {
            ...OneDriveService_MetaData.GetMetaData()
        };
    }

    /**
     * @name GetResourceData
     * @param {object} objContext
     * @summary Returns the object for TextResource
     * @returns {object} Returns TextResource
     */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OneDriveService", objContext.props) ?? {};
        let SkinPath = JConfiguration.CockpitSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
     * @name HandleDropdownChange
     * @param {object} objContext
     * @summary Handles 
     * @returns {null} 
     */
    HandleDropdownChange(objChangeData, objContext) {
        let objParams = {
            "vMainClientIdentifier": objChangeData["vMainClientIdentifier"],
            "SortKeys": [
                {
                    "dtModifiedOn": {
                        "order": "desc"
                    }
                }
            ]
        };
        objContext.dispatch({ type: "SET_STATE", payload: { "strMainClientId": objChangeData["iMainClientId"] } });
        ApplicationState.SetProperty("blnShowAnimation", true);
        Framework_Services_FileHandler_OneDriveFileMapping.GetData(objParams, (objReturnData) => {
            let arrReturnData = objReturnData[Object.keys(objReturnData)[0]]["Data"] ? objReturnData[Object.keys(objReturnData)[0]]["Data"] : [];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrOneDriveMappingData": arrReturnData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true)
    }

    /**
     * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Drop-down data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {
        let objMainClientDropDownData = {
            "IsLanguageDependent": "N",
            "ValueColumn": "iMainClientId",
            "DisplayColumn": "vMainClientIdentifier",
            "Data": []
        };

        DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"]?.map((objMainClient) => {
            objMainClientDropDownData["Data"] = [...objMainClientDropDownData["Data"], objMainClient];
        });
        return { "iMainClientId": objMainClientDropDownData };
    }

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

    /**
     * @name GetPrefetchFiles
     * @param {object} props props
     * @returns {object} PrefetchFiles
     */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"]
        }
    }
}

export default OneDriveService_ModuleProcessor;