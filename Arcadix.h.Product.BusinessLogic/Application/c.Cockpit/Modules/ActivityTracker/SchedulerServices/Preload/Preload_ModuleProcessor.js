//Objects required for module.
import Object_Framework_SystemTracking from '@shared/Object/a.Framework/SystemTracking/SystemTracking';
import Object_Framework_SystemTracking_Preload from '@shared/Object/a.Framework/SystemTracking/Preload/Preload';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';

//Module related files...
import * as Preload_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload/Preload_MetaData';
import * as Preload_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload/Preload_OfficeRibbon';
/**
* @name Preload_ModuleProcessor
* @param NA
* @summary Class for Preload module display.
* @return NA
*/
class Preload_ModuleProcessor extends IntranetBase_ModuleProcessor {
    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_SystemTracking_Preload","Object_Cockpit_MainClient_MainClient","Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        this.GetPreloadData(objContext);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        arrDataRequest = [...arrDataRequest, Object_Framework_SystemTracking_Preload];

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];
        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetPreloadData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetPreloadData(objContext) {
        let objFileWatcherParam = {
            "vSchedulerName": "PreloadAll"
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_SystemTracking.GetSchedulerStatus(objFileWatcherParam, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSchedulerStatusData": objReturn } });
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
            RowData: DataRef(objContext.props.Object_Framework_SystemTracking_Preload)["Data"] ?? [],
            AdditionalPaddingIds: ["Preload"]
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
            ...Preload_MetaData.GetMetaData()
        };
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload", objContext.props) ?? {};
        let SkinPath = JConfiguration.CockpitSkinPath;
        return {
            Text,
            SkinPath
        };
    }

    /**
     * @name GetCallBacks
     * @param {object} objContext passes objContext
     * @summary Gets Callbacks for Grid.
     * @returns {object} return objDataCalls
     */
    GetCallBacks(objContext) {
        return {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext)
        }
    }
    
    /**
     * @name OnBeforeGridRowRender
     * @param {objRow} objRow passes objRow
     * @param {object} objContext passes objContext
     * @summary OnBeforeGridRowRender functionality.
     * @returns {object} return objDataCalls
     */
    OnBeforeGridRowRender(objRow, objContext) {
        let objMainClientData = objContext.props.Object_Cockpit_MainClient_MainClient["Data"].filter(objMainClient => objMainClient["iMainClientId"] === objRow["iMainClientId"]);
        return { ...objRow, "vMainClientName": objMainClientData[0]["vMainClientIdentifier"] };
    }

    /**
     * @name ShowActivityDetailsPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting subject
     */
    ShowPreloadObjectPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["PreloadGrid"][0];
        let blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
       
        if (!blnShowErrorPopup) {
            Popup.ShowPopup({
                Data: {
                    ModuleName: "PreloadPopup",
                    arrPreloadObjectData: arrSelectedRows["t_Log_Preload_Object"]
                },
                Meta: {
                    PopupName: "PreloadPopup",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: 700,
                    Width: 1200,
                    HeaderData: []
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                ParentProps: objContext.Props,
                Events: {},
                CallBacks: {}
            })
        } else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "ShowActivityDetailsPopup": () => objContext.Preload_ModuleProcessor.ShowPreloadObjectPopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", Preload_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ];
    }
}

export default Preload_ModuleProcessor;