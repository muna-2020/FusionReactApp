//Objects required for module.
import Object_Cockpit_BusinessUnit from '@shared/Object/c.Cockpit/AccessControl/BusinessUnit/BusinessUnit';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as AddEditBusinessUnit_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/AddEditBusinessUnit/AddEditBusinessUnit_MetaData';

//Module related imports.
import * as BusinessUnit_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/BusinessUnit_OfficeRibbon';

/**
* @name DatabaseServer_ModuleProcessor
* @param NA
* @summary Class for ApplicationServer module display.
* @return NA
*/
class DatabaseServer_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_BusinessUnit",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit",
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
        //BusinessUnit
        Object_Cockpit_BusinessUnit.Initialize(objBusinessUnitParam);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_BusinessUnit]

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit"];
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
            RowData: DataRef(objContext.props.Object_Cockpit_BusinessUnit, "Object_Cockpit_BusinessUnit;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [] ,
        };
        return objData;
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call tabbed pop-up for Add/Edit of CompetencyRange
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["BusinessUnitGrid"] : [];
        let intApplicationTypeForLanguageData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditBusinessUnit",
                    HeaderData: AddEditBusinessUnit_MetaData.GetAddEditMetaData(),
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
    * @summary Call Confirmation pop-up for Deleting CompetencyRange
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["BusinessUnitGrid"] : 0;

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vBusinessUnitName"] + ", ";
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
                    ConfirmEvent: (strPopupId) => this.DeleteBusinessUnit(arrSelectedRows, strPopupId, objContext)
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
    * @summary Deletes CompetencyRange and close pop-up on success
    */
    DeleteBusinessUnit(arrSelectedRows, strPopupId, objContext) {
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
        Object_Cockpit_BusinessUnit.DeleteData({ "SearchQuery": objSearchQuery, "vDeleteData": arrDeleteRow, "uUserId": objContext.props.ClientUserDetails.UserId }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "BusinessUnitGrid": null });
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
            "AddPopup": () => objContext.BusinessUnit_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.BusinessUnit_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.BusinessUnit_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", BusinessUnit_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
        ];
    }


}

export default DatabaseServer_ModuleProcessor;