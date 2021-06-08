//Base classes...
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module...
import Object_Cockpit_ClientConfig from '@shared/Object/c.Cockpit/ClientConfig/ClientConfig';

//Module related files...
import * as AddEditClientConfiguration_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/AddEditClientConfiguration/AddEditClientConfiguration_MetaData';
import * as ClientConfiguration_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/ClientConfiguration_MetaData';

//Module related imports.
import * as ClientConfiguration_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/ClientConfiguration_OfficeRibbon';

/**
 * @name ClientConfiguration_ModuleProcessor
 * @summary Class for ClientConfiguration module display.
 */
class ClientConfiguration_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Cockpit_ClientConfig", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/ClientConfiguration"];
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

        var objClientConfigurationParams = {
            "SortKeys": [
                {
                    "vClientConfigurationName": {
                        "order": "asc"
                    }
                }
            ]
        };

        //ClientConfiguration
        Object_Cockpit_ClientConfig.Initialize(objClientConfigurationParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ClientConfig]; 
                
        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/ClientConfiguration"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let objData = {
            RowData: DataRef(objContext.props.Object_Cockpit_ClientConfig)["Data"] ?? [],
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
            ...ClientConfiguration_MetaData.GetMetaData()
        };
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ClientConfiguration", objContext.props) ?? {};
        let SkinPath = JConfiguration.CockpitSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name OpenAddEditPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call Confirmation popup for Deleting subject
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let arrHeaderData = AddEditClientConfiguration_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ClientConfiguration", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows").ClientConfigurationGrid;

        let blnShowErrorPopup = blnIsEdit && (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    Object_Cockpit_ClientConfig: objContext.props.Object_Cockpit_ClientConfig,
                    IsEdit: blnIsEdit
                },
                Meta: {
                    PopupName: "AddEditClientConfiguration",
                    HeaderData: arrHeaderData,
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    ClientUserDetails: objContext.props.ClientUserDetails
                },
                Events: {
                },
                CallBacks: {
                }
            });     
        }
        else {
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
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ClientConfiguration", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows").ClientConfigurationGrid;

        var strDeleteVariables = "";
        arrSelectedRows.map(objSelectedRows => {
            strDeleteVariables = strDeleteVariables + objSelectedRows["vClientConfigurationName"] + ", ";
        });

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                    Variables: objVaribales
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (objModal) => this.DeleteClientConfiguration(arrSelectedRows, objModal)
                },
                CallBacks: {}                
            });
        }
        else {
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
     * @name DeleteClientConfiguration
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes ClientConfiguration and close popup on success
     */
    DeleteClientConfiguration(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_ClientConfig.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(objModal);
                this.SelectAdjacentGridRow("ClientConfigurationGrid", arrSelectedRows);
            }
        });
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.ClientConfiguration_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.ClientConfiguration_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.ClientConfiguration_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", ClientConfiguration_OfficeRibbon.GetClientConfigurationOfficeRibbonData(objRibbonData));
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/Master.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
        ];
    }
}

export default ClientConfiguration_ModuleProcessor;