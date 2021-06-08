//Objects required for module.
import Object_Cockpit_BusinessUnit from '@shared/Object/c.Cockpit/AccessControl/BusinessUnit/BusinessUnit';
import Object_Cockpit_BusinessUnitTeam from '@shared/Object/c.Cockpit/AccessControl/BusinessUnitTeam/BusinessUnitTeam';
import Object_Cockpit_UserRole from '@shared/Object/c.Cockpit/AccessControl/UserRole/UserRole';

//Module Objects
import * as AddEditBusinessUnitTeam_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/AddEditBusinessUnitTeam/AddEditBusinessUnitTeam_MetaData';

//Module related imports.
import * as BusinessUnitTeam_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/BusinessUnitTeam_OfficeRibbon';

/**
 * @name BusinessUnitTeam_ModuleProcessor
 * @param NA
 * @summary Class for Subject module display.
 * @return NA
 */
class BusinessUnitTeam_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_BusinessUnit",
            "Object_Cockpit_BusinessUnitTeam",
            "Object_Cockpit_UserRole",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam",
        ];
    }
    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        let objBusinessUnitParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            }
        };
        let objBusinessUnitTeamParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            }
        };
        let objUserRoleParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            }
        };

        //BusinessUnit
        Object_Cockpit_BusinessUnit.Initialize(objBusinessUnitParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_BusinessUnit]

        //Business Unit Team
        Object_Cockpit_BusinessUnitTeam.Initialize(objBusinessUnitTeamParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_BusinessUnitTeam]

        //UserRole
        Object_Cockpit_UserRole.Initialize(objUserRoleParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserRole]
        
        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam"];
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
            RowData: DataRef(objContext.props.Object_Cockpit_BusinessUnitTeam, "Object_Cockpit_BusinessUnitTeam;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [],
        };
        return objData;
    }

    /**
* @name GetCallBackforGrid
* @param {any} objContext
* @summary Return Grid data
* @returns {object} Grid data
*/
    GetCallBackforGrid(objRow, objContext) {
        let arrUserRoleData = DataRef(objContext.props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [];
        let vUserRoleName = "";
        if (objRow["t_Framework_MainClient_Team_UserRole"]) {
            objRow["t_Framework_MainClient_Team_UserRole"].map(objTeamUserData => {
                arrUserRoleData.map(objUserRollData => {
                    if (objUserRollData["uUserRoleId"] == objTeamUserData["uUserRoleId"]) {
                        objUserRollData["t_Framework_MainClient_UserRole_Data"].map(data => {
                            if (objContext.props.JConfiguration.InterfaceLanguageId == data["iLanguageId"]) {
                                vUserRoleName = vUserRoleName + data["vUserRoleName"] + ",";
                            }
                        })
                    }
                })
            })
        }
        vUserRoleName = vUserRoleName.substring(0, vUserRoleName.length - 1);
        let objTeamUserRole = { "vUserRoleName": vUserRoleName };
        return { ...objRow, ...objTeamUserRole };
    };
  
    /**
     * @name OnBusinessUnitDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the Businessunit Dropdown Data on change of the BusinessUnit dropdown value
     */
    OnBusinessUnitDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "BusinessUnitTeamGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "strBusinessUnitId": objChangeData["uBusinessUnitId"] } });
    };

    /**
    * @name OpenAddEditPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call Confirmation pop-up for Deleting Competency level
    * @return null
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["BusinessUnitTeamGrid"] : 0;
        let intApplicationTypeForTeamData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        else {
            blnShowErrorPopup = objContext.state.strBusinessUnitId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    IsEdit: blnIsEdit,
                    BusinessUnitId: objContext.state.strBusinessUnitId,
                    UserRoleData: DataRef(objContext.props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? []
                },
                Meta: {
                    PopupName: "AddEditBusinessUnitTeam",
                    HeaderData: AddEditBusinessUnitTeam_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: objContext.props
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
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
    * @name OpenDeletePopup
    * @param {object} objContext passes Context object
    * @summary Call Confirmation pop-up for Deleting Competency level
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["BusinessUnitTeamGrid"] : 0;

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vTeamName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteBusinessUnitTeam(arrSelectedRows, strPopupId, objContext)
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
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteBusinessUnitTeam
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close pop-up on success
     */
    DeleteBusinessUnitTeam(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objSearchQuery = {
            "must": [
                {
                    "match": {
                        "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                    }
                }
            ]
        };
        Object_Cockpit_BusinessUnitTeam.DeleteData({ "SearchQuery": objSearchQuery, "vDeleteData" : arrDeleteRow, "uUserId": objContext.props.ClientUserDetails.UserId }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "BusinessUnitTeamGrid": null });
                Popup.ClosePopup(strPopupId);
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
            "AddPopup": () => objContext.BusinessUnitTeam_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.BusinessUnitTeam_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.BusinessUnitTeam_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", BusinessUnitTeam_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/MultiSelectDropdown/MultiSelectDropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css"
        ];
    }

}
export default BusinessUnitTeam_ModuleProcessor;

