//Objects required for module.
import Object_Framework_SystemTracking_FileWatcher from '@shared/Object/a.Framework/SystemTracking/FileWatcher/FileWatcher';
import Object_Framework_SystemTracking from '@shared/Object/a.Framework/SystemTracking/SystemTracking';

//Module Related imports.
import * as FileWatcher_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher/FileWatcher_MetaData';

/**
 * @name FileWatcher_ModuleProcessor
 * @param NA
 * @summary Class for ApplicationServer module display.
 * @return NA
 */
class FileWatcher_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_SystemTracking_FileWatcher","Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        this.GetOfflineProgressData(objContext);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        arrDataRequest = [...arrDataRequest, Object_Framework_SystemTracking_FileWatcher];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher"];
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
    GetOfflineProgressData(objContext) {
        let objFileWatcherParam = {
            "vServiceName": "FileWatcherService"
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking.GetServiceStatusData(objFileWatcherParam, (objReturn) => {
            let arrOfflineProgress = objReturn ? objReturn["Data"] : [];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrWindowServiceData": arrOfflineProgress } });
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
            RowData: DataRef(objContext.props.Object_Framework_SystemTracking_FileWatcher)["Data"] ?? [],
            AdditionalPaddingIds: ["FileWatcher"]
        };
        return objData;
    }

    /**
     * @name GetResourceData
     * @param {object} objContext
     * @summary Returns Resource Data for Grid
     * @returns {object} Resource Data
     */
    GetResourceData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess", objContext.props) ?? {};
        return {
            Text: objTextResource,
            SkinPath: objContext.props.JConfiguration.CockpitSkinPath
        };
    }

    /**
     * @name GetMetaData
     * @summary Returns Meta Data for Grid
     * @returns {object} Meta Data
     */
    GetMetaData() {
        return { ...FileWatcher_MetaData.GetMetaData() };
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ];
    }
}

export default FileWatcher_ModuleProcessor;