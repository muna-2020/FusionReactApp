//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_Client from '@shared/Object/c.Cockpit/Client/Client';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';
import Object_Cockpit_ClientConfig from '@shared/Object/c.Cockpit/ClientConfig/ClientConfig';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';

//Module related files
import * as AddEditClient_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/Client/AddEditClient/AddEditClient_MetaData';
import * as Client_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/Client/Client_MetaData';

//Module related imports.
import * as Client_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/Client/Client_OfficeRibbon';

/**
 * @name Client_ModuleProcessor
 * @summary Class for Client module display.
 */
class Client_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Cockpit_Client", "Object_Cockpit_ClientConfig", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/Client", "Object_Cockpit_ApplicationType", "Object_Cockpit_MainClient_MainClient"];
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

        var objClientParams = {
            "SortKeys": [
                {
                    "vClientName": {
                        "order": "asc"
                    }
                }
            ]
        };
        

        //Client object
        Object_Cockpit_Client.Initialize(objClientParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Client];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        //ClientConfiguration
        Object_Cockpit_ClientConfig.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ClientConfig];  

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/Client"];
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
            RowData: DataRef(objContext.props.Object_Cockpit_Client)["Data"] ?? [],
            DropDownData: this.GetDependingColumnData(objContext)
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
            ...Client_MetaData.GetMetaData(),
            Filter: { ...objContext.state.objFilter }
        };
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Client", objContext.props) ?? {};
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
    OpenAddEditPopup(objContext,blnIsEdit) {
        let arrHeaderData = AddEditClient_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Client", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClientGrid"] : 0;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        else {
            blnShowErrorPopup = (objContext.state.objFilter.iMainClientId == -1 || objContext.state.objFilter.iApplicationTypeId == -1)
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropDownData: {
                    ApplicationType: DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"],
                    ClientConfiguration: DataRef(objContext.props.Object_Cockpit_ClientConfig)["Data"],
                    MainClient: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"],
                    ApplicationId: objContext.state.objFilter.iApplicationTypeId,
                    MainClientId: objContext.state.objFilter.iMainClientId
                    },
                    IsEdit: blnIsEdit,
                    Object_Cockpit_Client: objContext.props.Object_Cockpit_Client
                },
                Meta: {
                    PopupName: "AddEditClient",
                    HeaderData: arrHeaderData,
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
               },
               Events: {
               },
               CallBacks: {
               },
            });
        } else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: blnIsEdit ? "ErrorPopup" : "AddErrorPopup",
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/Client", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClientGrid"] : 0;

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vClientName"] + ", ";
            });
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
                    ConfirmEvent: (objModal) => this.DeleteClient(arrSelectedRows, objModal)
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
     * @name DeleteClient
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Client and close popup on success
     */
    DeleteClient(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_Client.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(objModal);
                this.SelectAdjacentGridRow("ClientGrid", arrSelectedRows);
            }
        });
    }

    /**
     * @name HandleDropDownChange
     * @param {string} objChangeData objChangeData
     * @param {object} objChangeData objChangeData
     * @param {object} objContext objContext
     * @summary Handles change in dropdown filters.
     */
    HandleDropDownChange(strAttributeName, objChangeData, objContext) {
        //this.ResetGridSelection("ClientGrid"); 
        let objNewFilter = {};
        if (strAttributeName == "iMainClientId") {
            objNewFilter = { ...objContext.state.objFilter, "iMainClientId": objChangeData["iMainClientId"], "iApplicationTypeId": -1 };
        }
        else if (strAttributeName == "iApplicationTypeId") {
            objNewFilter = { ...objContext.state.objFilter, "iApplicationTypeId": objChangeData["iApplicationTypeId"] };

        }
        objContext.dispatch({ type: "SET_STATE", payload: { objFilter: objNewFilter } } );
    };

    /**
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext){
            let objClientConfigurationDropDownData = {
                "IsLanguageDependent": "N",
                "ValueColumn": "iClientConfigurationId",
                "DisplayColumn": "vClientConfigurationName",
                "Data": []
            };
            let objMainClientDropDownData = {
                "IsLanguageDependent": "Y",
                "ValueColumn": "iMainClientId",
                "DisplayColumn": "vMainClientName",
                "DependingTableName": "t_Framework_MainClient_Data",
                "Data": []
            };

            let objApplicationTypeDropDownData = {
                "IsLanguageDependent": "N",
                "ValueColumn": "iApplicationTypeId",
                "DisplayColumn": "vApplicationName",
                "DependingTableName": "t_Framework_ApplicationType",
                "Data": []
            };
            let arrClientConfiguration = DataRef(objContext.props.Object_Cockpit_ClientConfig)["Data"] ?? [];
            arrClientConfiguration.map((objClientConfiguration) => {
                if (objClientConfiguration["cIsDeleted"] === "N") {
                    objClientConfigurationDropDownData["Data"] = [...objClientConfigurationDropDownData["Data"], objClientConfiguration];
                }
            });
            let arrMainClient = DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"] ?? [];
            arrMainClient.map((objMainClient) => {
            objMainClientDropDownData["Data"] = [...objMainClientDropDownData["Data"], objMainClient];
            });
            let arrApplicationType = DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] ?? [];
            arrApplicationType.map((objApplicationType) => {
                objApplicationTypeDropDownData["Data"] = [...objApplicationTypeDropDownData["Data"], objApplicationType];
            });
        return { "iClientConfigurationId": objClientConfigurationDropDownData, "iMainClientId": objMainClientDropDownData ,"iApplicationTypeId": objApplicationTypeDropDownData };
    };

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.Client_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.Client_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.Client_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", Client_OfficeRibbon.GetClientOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css"
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

export default Client_ModuleProcessor;