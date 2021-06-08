
//Objects required for module.
import Object_Cockpit_UserRole from '@shared/Object/c.Cockpit/AccessControl/UserRole/UserRole';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_Entity from '@shared/Object/c.Cockpit/AccessControl/Privilege/Entity/Entity';
import Object_Cockpit_EntityAccessLevel from '@shared/Object/c.Cockpit/AccessControl/Privilege/Entity/EntityAccessLevel/EntityAccessLevel';
import Object_Cockpit_EntityPrivilege from '@shared/Object/c.Cockpit/AccessControl/Privilege/Entity/EntityPrivilege/EntityPrivilege';
import Object_Cockpit_SystemPrivilege from '@shared/Object/c.Cockpit/AccessControl/Privilege/SystemPrivilege/SystemPrivilege';
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';

//Module related imports
import * as Roles_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/Roles_MetaData';

//Module related imports.
import * as Roles_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/Roles_OfficeRibbon';

/**
 * @name Roles_ModuleProcessor
 * @param NA
 * @summary Class for Roles module display.
 * @return NA
 */
class Roles_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_UserRole",
            "Object_Cockpit_Entity",
            "Object_Cockpit_EntityAccessLevel",
            "Object_Cockpit_EntityPrivilege",
            "Object_Cockpit_SystemPrivilege",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Framework_Services_FrameworkNavigation",
            "Object_Cockpit_Language",
            "Object_Cockpit_ApplicationType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles",
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
        let objEntityParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objEntityAccessLevelParam = {            
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objEntityPrivilegeParam = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objSystemPrivilegeParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        //Roles
        Object_Cockpit_UserRole.Initialize(objUserRoleParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserRole];

        //Entity
        Object_Cockpit_Entity.Initialize(objEntityParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Entity];

        //EntityAccessLevel
        Object_Cockpit_EntityAccessLevel.Initialize(objEntityAccessLevelParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_EntityAccessLevel];

        //EntityPrivilege
        Object_Cockpit_EntityPrivilege.Initialize(objEntityPrivilegeParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_EntityPrivilege];

        //SystemPrivilege
        Object_Cockpit_SystemPrivilege.Initialize(objSystemPrivilegeParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_SystemPrivilege];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //if (JConfiguration.ApplicationTypeName != "ProductManagement") {
            let objApplicationTypeParams = {
                "SortKeys": [
                    {
                        "iApplicationTypeId": {
                            "order": "asc"
                        }
                    }
                ]
            };
            Object_Cockpit_ApplicationType.Initialize(objApplicationTypeParams);
            arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];
        //}

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles"];
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
        let intApplicationTypeForLanguageData = JConfiguration.ApplicationTypeName == "ProductManagement" ? 7 : 2;
        let objData = {
            RowData: DataRef(objContext.props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [],
            LanguageData: objContext.Roles_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
            ...Roles_MetaData.GetMetaData()
        };
    }

    /**
     * @name GetGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} Object with callback methods
     */
    GetGridCallBacks(objContext) {
        let objCallBacks = {
            //OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name OnBeforeGridRowRender
    * @param {object} objRow
    * @param {object} objContext
    * @summary returns the modified row data
    * @return {object} modified objRow data.
    */
    OnBeforeGridRowRender(objRow, objContext) {

        let objReturnRow = {
            ...objRow,
            //ActiveInactiveIcon: objRow.cIsActive == "Y" ? "ActiveRoles" : "InActiveRoles"
        }
        return objReturnRow;
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles", objContext.props);   
        Text = Text ? Text : {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetGridEvents(objContext) {
        let objCallBacks = {
            //OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
        };
        return objCallBacks;
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["RolesGrid"] : [];
        let blnShowAddEditErrorPopup = false, blnShowSystemRoleErrorPopup = false;
        let intApplicationTypeForLanguageData = JConfiguration.ApplicationTypeName == "ProductManagement" ? 7 : 2;
        if (blnIsEdit) {
            blnShowAddEditErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
            blnShowSystemRoleErrorPopup = arrSelectedRows[0] && arrSelectedRows[0]["cIsSystemRole"] == "Y" ? true : false;
        }     
        if (!blnShowAddEditErrorPopup && !blnShowSystemRoleErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    IsEdit: blnIsEdit,
                    //Object_Cockpit_UserRole: DataRef(objContext.props.Object_Cockpit_UserRole),
                    MultiLanguageData: objContext.Roles_ModuleProcessor.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData)
                },
                Meta: {
                    PopupName: "AddEditRoles",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    JConfiguration: objContext.props.JConfiguration
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
                    TextResourcesKey: blnShowAddEditErrorPopup ? "ErrorPopup" : "SystemRoleErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["RolesGrid"];
        let blnShowSystemRoleErrorPopup = arrSelectedRows && arrSelectedRows[0]["cIsSystemRole"] == "Y" ? true : false;

        if (arrSelectedRows && arrSelectedRows.length > 0 && !blnShowSystemRoleErrorPopup) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["t_Framework_MainClient_UserRole_Data"][0]["vUserRoleName"] + ", ";
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
                    ConfirmEvent: (strPopupId) => this.DeleteRoles(arrSelectedRows, strPopupId, objContext)
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
                    TextResourcesKey: blnShowSystemRoleErrorPopup ? "SystemRoleErrorPopup" : "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteRoles
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {string} strPopupId strPopupId
     * @param {object} objContext objContext
     * @summary Deletes Subject and close popup on success
     * @returns null
     */
    DeleteRoles(arrSelectedRows, strPopupId, objContext) {
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
        Object_Cockpit_UserRole.DeleteData({ "SearchQuery": objSearchQuery, vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {                
                Popup.ClosePopup(strPopupId);
                this.SelectAdjacentGridRow("RolesGrid", arrSelectedRows);
            }
        });
    }

    /**
     * @name AssignPrivilegeToRoles
     * @param {object} objContext objContext
     * @summary Deletes Subject and close popup on success
     * @returns null
     */
    AssignPrivilegeToRoles(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["RolesGrid"] : 0;
        let blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        //let intApplicationTypeForLanguageData = JConfiguration.ApplicationTypeName == "ProductManagement" ? 7 : 2;
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    EntityData : DataRef(objContext.props.Object_Cockpit_Entity, "Object_Cockpit_Entity;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"],
                    EntityAccessLevelData: DataRef(objContext.props.Object_Cockpit_EntityAccessLevel)["Data"],
                    EntityPrivilegeData: DataRef(objContext.props.Object_Cockpit_EntityPrivilege)["Data"].filter(objData => objData["cIsMiscPrivilege"] != "Y"),//CHECK
                    SystemPrivilegeData: DataRef(objContext.props.Object_Cockpit_SystemPrivilege, "Object_Cockpit_SystemPrivilege;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"],
                    //MultiLanguageData: objContext.Roles_ModuleProcessor.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),
                    DropdownData: {
                        ApplicationTypeData: DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"],
                    }
                },
                Meta: {
                    PopupName: "AssignPrivilegeToRoles",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    JConfiguration: objContext.props.JConfiguration
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
                    TextResourcesKey: "AssignPrivilegeErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    
    /**
     * @name CopySystemRole
     * @param {object} objContext objContext
     * @summary Creates a Copy of the System Role.
     * @returns null
     */
    CopySystemRole(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["RolesGrid"] : [];
        let blnShowCopyRoleErrorPopup = arrSelectedRows.find(objTemp => objTemp["cIsSystemRole"] != "Y") ? true : false;
        if (!blnShowCopyRoleErrorPopup) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objSystemRole = arrSelectedRows.find(objTemp => objTemp["cIsSystemRole"] == "Y");
            let objCopyData = {
                ...objSystemRole,
                "cIsSystemRole": "N",
                "t_Framework_MainClient_UserRole_Data": objSystemRole.t_Framework_MainClient_UserRole_Data?.map(objSystemRoleData => ({ ...objSystemRoleData, "vUserRoleName": objSystemRoleData["vUserRoleName"] ? "Copy of " + objSystemRoleData["vUserRoleName"] : "" }))
            };
            let objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            };
            Object_Cockpit_UserRole.AddData({ "SearchQuery": objSearchQuery, "vAddData": objCopyData, "uUserId": objContext.props.ClientUserDetails.UserId }, (objReturn, cIsNewData) => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                this.ResetGridSelection("RolesGrid");
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
                    Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles", objContext.props),
                    TextResourcesKey: "CopySystemRoleErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
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
            "AddPopup": () => objContext.Roles_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.Roles_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.Roles_ModuleProcessor.OpenDeletePopup(objContext),
            "AssignPrivilege": () => objContext.Roles_ModuleProcessor.AssignPrivilegeToRoles(objContext),
            "CopySystemRole": () => objContext.Roles_ModuleProcessor.CopySystemRole(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", Roles_OfficeRibbon.GetRolesOfficeRibbonData(objRibbonData));
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} GetDynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/8_Setting/BusinessUnitTeamRole/Roles/AssignPrivilegeToRoles/AssignPrivilegeToRoles.css"
        ]
    }
}

export default Roles_ModuleProcessor;