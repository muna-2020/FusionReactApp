//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_ClientHostUrl from '@shared/Object/c.Cockpit/ClientHostUrl/ClientHostUrl';
import Object_Cockpit_TargetGroup from '@shared/Object/c.Cockpit/TargetGroup/TargetGroup';
import Object_Cockpit_Client from '@shared/Object/c.Cockpit/Client/Client';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';

//Module related files
import * as AddEditClientHostUrl_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/AddEditClientHostUrl/AddEditClientHostUrl_MetaData';
import * as ClientHostUrl_MetaData from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/ClientHostUrl_MetaData';

//Module related imports.
import * as ClientHostUrl_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/ClientHostUrl/ClientHostUrl_OfficeRibbon';

/**
 * @name ClientHostUrl_ModuleProcessor
 * @summary Class for ClientHostUrl module display.
 */
class ClientHostUrl_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Cockpit_ClientHostUrl", "Object_Cockpit_TargetGroup", "Object_Cockpit_Client", "Object_Cockpit_ApplicationType", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/MainClient/ClientHostUrl", "Object_Cockpit_MainClient_MainClient"];
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

        var objClientHostUrlParams = {
            "SortKeys": [
                {
                    "vHostURL": {
                        "order": "asc"
                    }
                }
            ]
        };

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //ClientHostUrl object
        Object_Cockpit_ClientHostUrl.Initialize(objClientHostUrlParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ClientHostUrl];

        //Client object
        Object_Cockpit_Client.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Client];

        //TargetGroup object
        Object_Cockpit_TargetGroup.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_TargetGroup];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/MainClient/ClientHostUrl"];
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
            RowData: DataRef(objContext.props.Object_Cockpit_ClientHostUrl)["Data"] ?? [],
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
            ...ClientHostUrl_MetaData.GetMetaData(),
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
        let Text = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ClientHostUrl", objContext.props) ?? {};
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
        let arrHeaderData = AddEditClientHostUrl_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ClientHostUrl", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClientHostUrlGrid"] : 0;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        else {
            blnShowErrorPopup = objContext.state.objFilter.iClientId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        Client: DataRef(objContext.props.Object_Cockpit_Client)["Data"],
                        ClientId: objContext.state.objFilter.iClientId,
                        ApplicationType: DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"],
                        ApplicationTypeId: objContext.state.strApplicationTypeId,
                        TargetGroup: DataRef(objContext.props.Object_Cockpit_TargetGroup)["Data"],
                        MainClientId: objContext.state.strMainClientId
                    },
                    Object_Cockpit_ClientHostUrl: objContext.props.Object_Cockpit_ClientHostUrl,
                    IsEdit: blnIsEdit
                },
                Meta: {
                    PopupName: "AddEditClientHostUrl",
                    HeaderData: arrHeaderData,
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
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
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ClientHostUrl", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["ClientHostUrlGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vHostURL"] + ", ";
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
                    ConfirmEvent: (objModal) => this.DeleteClientHostUrl(arrSelectedRows, objModal)
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
     * @name DeleteClientHostUrl
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes ClientHostUrl and close popup on success
     */
    DeleteClientHostUrl(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Cockpit_ClientHostUrl.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                Popup.ClosePopup(objModal);
                this.SelectAdjacentGridRow("ClientHostUrlGrid", arrSelectedRows);
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
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClientGrid": null });
        switch (strAttributeName) {
            case "iMainClientId":
                objContext.dispatch({ type: "SET_STATE", payload: { "strMainClientId": objChangeData["iMainClientId"], "strApplicationTypeId": -1, objFilter: { ...objContext.state.objFilter, "iClientId": -1 } } });
                break;
            case "iApplicationTypeId":
                objContext.dispatch({ type: "SET_STATE", payload: { "strApplicationTypeId": objChangeData["iApplicationTypeId"], objFilter: { ...objContext.state.objFilter, "iClientId": -1 } } });
                break;
            case "iClientId":
                objContext.dispatch({ type: "SET_STATE", payload: { objFilter: { ...objContext.state.objFilter, "iClientId": objChangeData["iClientId"] } } });
                break;
        }
    };

    /**
     * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {
        let objClientDropDownData = {
            "IsLanguageDependent": "N",
            "ValueColumn": "iClientId",
            "DisplayColumn": "vClientName",
            "Data": []
        };

        let objTargetGroupDropDownData = {
            "IsLanguageDependent": "N",
            "ValueColumn": "iTargetGroupId",
            "DisplayColumn": "vTargetGroupName",
            "DependingTableName": "t_Framework_MainClient_Configuration_TargetGroup",
            "Data": []
        };

        DataRef(objContext.props.Object_Cockpit_Client)["Data"]?.map((objClient) => {
            objClientDropDownData["Data"] = [...objClientDropDownData["Data"], objClient];
        });
        DataRef(objContext.props.Object_Cockpit_TargetGroup)["Data"]?.map((objTargetGroup) => {
            objTargetGroupDropDownData["Data"] = [...objTargetGroupDropDownData["Data"], objTargetGroup];
        });
        return { "iClientId": objClientDropDownData, "iTargetGroupId": objTargetGroupDropDownData };
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.ClientHostUrl_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.ClientHostUrl_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.ClientHostUrl_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", ClientHostUrl_OfficeRibbon.GetClientHostUrlOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
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

export default ClientHostUrl_ModuleProcessor;