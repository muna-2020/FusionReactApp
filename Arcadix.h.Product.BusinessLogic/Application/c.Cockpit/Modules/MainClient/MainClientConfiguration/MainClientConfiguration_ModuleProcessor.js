//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_MainClient_MainClientConfiguration from '@shared/Object/c.Cockpit/MainClient/MainClientConfiguration/MainClientConfiguration';

//Module related imports.
import * as MainClientConfiguration_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/MainClientConfiguration_OfficeRibbon';
import * as MainClientConfiguration_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/MainClientConfiguration_MetaData';
import * as AddEditMainClientConfiguration_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/AddEditMainClientConfiguration/AddEditMainClientConfiguration_MetaData';

/**
 * @name MainClient_ModuleProcessor
 * @summary Class for MainClient module display.
 */
class MainClientConfiguration_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_MainClientConfiguration",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/MainClientConfiguration"
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
        var objMainClientConfigurationParams = {
            "SortKeys": [
                {
                    "vMainClientConfigurationName": {
                        "order": "asc"
                    }
                }
            ]
        };

        //MainClientConfiguration object
        Object_Cockpit_MainClient_MainClientConfiguration.Initialize(objMainClientConfigurationParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientConfiguration];       

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/MainClientConfiguration"];
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
            RowData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientConfiguration)["Data"] ?? [],
        };
        return objData;
    }

    /**
     * @name GetResourceData
     * @param {any} objContext
     * @summary Returns Resource Data for Grid
     * @returns {object} Resource Data
     */
    GetResourceData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientConfiguration", objContext.props) ?? {};
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
        return MainClientConfiguration_MetaData.GetMetaData();
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let arrHeaderData = AddEditMainClientConfiguration_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientConfiguration", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows").MainClientConfigurationGrid;
        let blnShowErrorPopup = blnIsEdit && (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;

        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    Object_Cockpit_MainClient_MainClientConfiguration: objContext.props.Object_Cockpit_MainClient_MainClientConfiguration,
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditMainClientConfiguration",
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
     * @name DeletePopup  
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientConfiguration", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows").MainClientConfigurationGrid;

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vMainClientConfigurationName"] + ", ";
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
                    ConfirmEvent: (objModal) => this.DeleteMainClientConfiguration(arrSelectedRows, objModal)
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
     * @name DeleteMainClientConfiguration
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes MainClient and close pop-up on success
     */
    DeleteMainClientConfiguration(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_MainClient_MainClientConfiguration.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(objModal);
                this.SelectAdjacentGridRow("MainClientConfigurationGrid", arrSelectedRows);
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
            "AddPopup": () => objContext.MainClientConfiguration_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.MainClientConfiguration_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.MainClientConfiguration_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", MainClientConfiguration_OfficeRibbon.GetMainClientConfigurationOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.CockpitSkinPath + "/Css/Application/ReactJs/PC/Modules/MainClient/MainClientConfiguration/MainClientConfiguration.css"
        ];
    }
}

export default MainClientConfiguration_ModuleProcessor;