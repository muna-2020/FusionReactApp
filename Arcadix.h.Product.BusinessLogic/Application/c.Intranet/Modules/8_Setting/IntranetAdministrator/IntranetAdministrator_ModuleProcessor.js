//Objects required for module.
import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_UserRole from '@shared/Object/c.Cockpit/AccessControl/UserRole/UserRole';
import Object_Cockpit_BusinessUnit from '@shared/Object/c.Cockpit/AccessControl/BusinessUnit/BusinessUnit';
import Object_Cockpit_BusinessUnitTeam from '@shared/Object/c.Cockpit/AccessControl/BusinessUnitTeam/BusinessUnitTeam';

//Module Objects
import * as IntranetAdministrator_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/IntranetAdministrator_MetaData';
import * as AddEditIntranetAdministrator_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/AddEditIntranetAdministrator/AddEditIntranetAdministrator_MetaData';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

//Module related imports.
import * as IntranetAdministrator_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/IntranetAdministrator_OfficeRibbon';

/**
* @name IntranetAdministrator_ModuleProcessor
* @param NA
* @summary Class for CompetencyRange module display.
* @return NA
*/
class IntranetAdministrator_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Member_IntranetAdministrator",
            "Object_Cockpit_BusinessUnit",
            "Object_Cockpit_BusinessUnitTeam",
            "Object_Cockpit_UserRole",
            "Object_Cockpit_MainClient_MainClient",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/IntranetAdministrator",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language"
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

        let objIntranetAdministratorParam = {
            "SortKeys": [
                {
                    "vFirstName": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objBusinessUnitParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
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
                            "cIsDeleted": "N"
                        }
                    },
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
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "match": {
                            "cIsForProductManagement": JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"
                        }
                    }
                ]
            }
        };

        //IntranetAdministrator
        Object_Intranet_Member_IntranetAdministrator.Initialize(objIntranetAdministratorParam);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Member_IntranetAdministrator];

        //BusinessUnit
        Object_Cockpit_BusinessUnit.Initialize(objBusinessUnitParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_BusinessUnit]

        //Business Unit Team
        Object_Cockpit_BusinessUnitTeam.Initialize(objBusinessUnitTeamParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_BusinessUnitTeam]

        //UserRole
        Object_Cockpit_UserRole.Initialize(objUserRoleParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserRole]

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //MainClientLanguage
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        //Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/IntranetAdministrator"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);

        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }


    /**
   * @name OnMainClientDropDownChange
   * @param {*} objContext objChangeData
   * @param {*} objChangeData objChangeData
   * @summary   To change the subject Dropdown Data on change of the subject dropdown value
   */
    OnMainClientDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "IntranetAdministratorGrid": null });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "strMainClientId": objChangeData["iMainClientId"],
            }
        });
    };

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        let intApplicationTypeForLanguageData = 2;
        if (objContext.props.ClientUserDetails.MainClientId == 0) {
            intApplicationTypeForLanguageData = 7;
        }
        let objData = {
            RowData: DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"] ? DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"] : [],
            DropDownData: this.GetDependingColumnData(objContext),
            LanguageData: objContext.IntranetAdministrator_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
        };
        return objData;
    }
    
    /**
     * @name GetMetaData
     * @param {any} objContext
     * @summary Return GetMetaData for Grid
     * @returns {object} Grid Meta data
     */
    GetMetaData(objContext) {
        let objFilter = {
            "cIsDeleted": "N",
            "iMainClientId": objContext.state.strMainClientId,
        };
        if (objContext.state.strMainClientId == 0 || objContext.props.ClientUserDetails.ApplicationTypeId != 7)
            objFilter = {
                ...objFilter,
                "iApplicationTypeId": objContext.props.ClientUserDetails.ApplicationTypeId
            };    
        return {
            ...IntranetAdministrator_MetaData.GetMetaData(),
            Filter: objFilter
        }
    }    
        
    /**
     * @name GetCallBacks
     * @param {any} objContext
     * @summary Return CallBacks for Grid
     * @returns {object} Grid CallBack fucntions.
     */
    GetCallBacks(objContext) {
        return {
            OnBeforeGridRowRender: (objRow) => objContext.IntranetAdministrator_ModuleProcessor.OnBeforeGridRowRender(objRow, objContext)
        }
    }

    /**
    * @name OpenAddEditPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call tabbed popup for Add/Edit of CompetencyRange
    * @return null
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/IntranetAdministrator", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["IntranetAdministratorGrid"] : [];
        let intApplicationTypeForLanguageData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.intSubSubjectDropdownSelectedValue == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),
                    IsEdit: blnIsEdit,
                    strMainClientId: objContext.state.strMainClientId,
                    MainClientData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"],
                    BusinessUnitData: DataRef(objContext.props.Object_Cockpit_BusinessUnit, "Object_Cockpit_BusinessUnit;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [],                   
                    BusinessUnitTeamData: DataRef(objContext.props.Object_Cockpit_BusinessUnitTeam, "Object_Cockpit_BusinessUnitTeam;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [],
                    UserRoleData: DataRef(objContext.props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? []
                },
                Meta: {
                    PopupName: "AddEditIntranetAdministrator",
                    HeaderData: AddEditIntranetAdministrator_MetaData.GetAddEditMetaData(),
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
    * @summary Call Confirmation popup for Deleting CompetencyRange
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/IntranetAdministrator", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["IntranetAdministratorGrid"] : 0;

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vName"] + ", ";
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
                    ConfirmEvent: (strPopupId) => this.DeleteIntranetAdministrator(arrSelectedRows, strPopupId)
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
    * @name DeleteIntranetAdministrator
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes CompetencyRange and close popup on success
    */
    DeleteIntranetAdministrator(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Member_IntranetAdministrator.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                Popup.ClosePopup(strPopupId);
                this.SelectAdjacentGridRow("IntranetAdministratorGrid", arrSelectedRows);
            }
        });
    }

    /**
     * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {
        let objBusinessUnitDropDownData = {
            "IsLanguageDependent": "N",
            "ValueColumn": "uBusinessUnitId",
            "DisplayColumn": "vBusinessUnitName",
            "Data": []
        };        
        let arrBusinessUnit = DataRef(objContext.props.Object_Cockpit_BusinessUnit, "Object_Cockpit_BusinessUnit;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [];
        arrBusinessUnit.forEach((objBusinessUnit) => {
            objBusinessUnitDropDownData["Data"] = [...objBusinessUnitDropDownData["Data"], objBusinessUnit];            
        });        
        return { "uBusinessUnitId": objBusinessUnitDropDownData};
    };

    /**
    * @name OpenSendLoginProgressBarPopup
    * @param {object} objContext passes Context object
    * @summary Opens the SendLogin ProgressBar popup.
    * @return null
    */
    OpenSendLoginProgressBarPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/IntranetAdministrator", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["IntranetAdministratorGrid"] : 0;
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let arrMainClientUserIds = arrSelectedRows.map(t => t.uMainClientUserId)
            Popup.ShowProgressBarPopup({
                "Data": {
                    "ProgressText": Localization.TextFormatter(objTextResource, 'PopupText')
                    },
                "Meta": {
                    "ShowProgressStatus": "Y",
                    "HasCloseButton": "Y",
                    "StartProgressOnLoad": false, 
                    "CloseProgessBarOnComplete": true
                },
                "Resource": {
                    "Text": {
                        "ProgressBarPopup_TitleText": Localization.TextFormatter(objTextResource, 'Process'),
                        "ProgressBarPopup_Total": Localization.TextFormatter(objTextResource, 'Total'), 
                        "ProgressBarPopup_Posted": Localization.TextFormatter(objTextResource, 'Posted'), 
                        "ProgressBarPopup_Failed": Localization.TextFormatter(objTextResource, 'Failed'), 
                        "ProgressBarPopup_CancelButtonText": Localization.TextFormatter(objTextResource, 'AbortStop'),
                        "ProgressBarPopup_CloseButtonText": Localization.TextFormatter(objTextResource, 'ShutDown'),
                        "ProgressBarPopup_StartButtonText": Localization.TextFormatter(objTextResource, 'Begin'),
                    },
                    "TextResourcesKey": Localization.TextFormatter(objTextResource, 'ProgressBarPopup'),
                   
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                "Events": {
                    "StartProgress": (strProgressBarId) => {
                        this.sendLogin(objContext, strProgressBarId, arrMainClientUserIds);
                    },
                },
                CallBacks: {
                    PopupCallBack: () => ({})
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
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
   * @name CreateItemEventHandler
   * @param {*} objItem objItem
   * @summary   To filter the dropdown data based on the condition
   * @return {bool} boolean
   */
    CheckDeletedDropDownDataEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @name OnBeforeGridRowRender
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    OnBeforeGridRowRender(objRow, objContext) {       
        return {
            ...objRow,
            "Team": this.GetAssignedTeams(objRow, objContext),
            "Role": this.GetAssignedRoles(objRow, objContext)
        }
    }
    
    /**
     * @name GetAssignedTeams
     * @param {any} objContext
     * @summary Forms AssignedTeam for Grid Display
     * @returns {string} AssignedTeams of the User.
     */
    GetAssignedTeams(objRow, objContext) {
        let strAssignedTeams = "";
        let arrBusinessUnitTeam = DataRef(objContext.props.Object_Cockpit_BusinessUnitTeam, "Object_Cockpit_BusinessUnitTeam;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [];
        objRow["t_Framework_MainClient_User_Team"]?.forEach(objUserTeam => {
            let objBusinessUnitTeam = arrBusinessUnitTeam.find(objTeam => objTeam["uTeamId"] == objUserTeam["uTeamId"]);
            strAssignedTeams += objBusinessUnitTeam ? objBusinessUnitTeam["vTeamName"] + ", " : "";  
        })
        return strAssignedTeams.substring(0, strAssignedTeams.lastIndexOf(", "));
    }
       
    /**
     * @name GetAssignedRoles
     * @param {any} objContext
     * @summary Forms AssignedRoles for Grid Display
     * @returns {string} AssignedRoles of the User.
     */
    GetAssignedRoles(objRow, objContext) {
        let strAssignedRoles = "";
        let arrUserRole = DataRef(objContext.props.Object_Cockpit_UserRole, "Object_Cockpit_UserRole;cIsDeleted;N;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [];
        objRow["t_Framework_MainClient_User_UserRole"]?.forEach(objAssignedRole => {
            let objUserRole = arrUserRole.find(objRole => objRole["uUserRoleId"] == objAssignedRole["uUserRoleId"]);
            strAssignedRoles += objUserRole ? objUserRole["t_Framework_MainClient_UserRole_Data"]?.find(objTemp => objTemp["iLanguageId"] == JConfiguration.InterfaceLanguageId)?.["vUserRoleName"] + ", " : "";
        })
        return strAssignedRoles.substring(0, strAssignedRoles.lastIndexOf(", "));
    }

    /**
    * @name sendLogin
    * @param {object} objContext passes Context object
    * @summary Call Confirmation popup for Deleting CompetencyRange
    * @return null
    */
    sendLogin(objContext, strProgressBarID, arrSelectedRows) {
        let objSendMailParams =
        {
            ["IntranetAdmins"]: arrSelectedRows,
            ["ProgressBarId"]: strProgressBarID,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        Object_Intranet_Member_IntranetAdministrator.SendLogins(objSendMailParams);
    }


    /**
    * @name SetRibbonData.
    * @param {object} objContext takes  objContext.
    * @summary To set and update the Ribbon Data when the State changes.
    */
    SetRibbonData(objContext) {
        if (objContext.props.isLoadComplete || objContext.state.isLoadComplete) {
            var objRibbonData = {
                objContext,
                "AddPopup": () => objContext.IntranetAdministrator_ModuleProcessor.OpenAddEditPopup(objContext, false),
                "EditPopup": () => objContext.IntranetAdministrator_ModuleProcessor.OpenAddEditPopup(objContext, true),
                "DeletePopup": () => objContext.IntranetAdministrator_ModuleProcessor.OpenDeletePopup(objContext),
                "OpenSendLoginProgressBarPopup": () => objContext.IntranetAdministrator_ModuleProcessor.OpenSendLoginProgressBarPopup(objContext),
            };
            ApplicationState.SetProperty("OfficeRibbonData", IntranetAdministrator_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
        }
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/MultiSelectDropdown/MultiSelectDropdown.css",
        ];
    }


}

export default IntranetAdministrator_ModuleProcessor;