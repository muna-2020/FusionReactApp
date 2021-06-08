//Objects required for module.
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as SchoolYear_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/SchoolYear_MetaData';
import * as AddEditSchoolYear_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/AddEditSchoolYear/AddEditSchoolYear_MetaData';
import * as SchoolYear_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/SchoolYear_OfficeRibbon';

/**
* @name SchoolYear_ModuleProcessor
* @param NA
* @summary Class for ApplicationType module display.
*/
class SchoolYear_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_SchoolYear", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/SchoolYear", "Object_Cockpit_MainClient_MainClientLanguage", "Object_Cockpit_Language"];
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

        var objSchoolYearParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };


        //SchoolYear object
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/SchoolYear"];
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
        let iApplicationTypeForLanguageData = 2;
        let objData = {
            LanguageData: objContext.SchoolYear_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], iApplicationTypeForLanguageData),
            RowData: DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"] ?? [],
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
            ...SchoolYear_MetaData.GetSchoolYearMetaData(),
            Filter: {
                "cIsDeleted": "N"
            }
        };
    }

    /**
     * @name GetGridResource
     * @param {object} objContext
     * @summary it returns the object for Grid Resources
     * @returns {object}  resource object
    */
    GetGridResource(objContext, objTextResource) {
        return {
            Text: objTextResource,
            SkinPath: objContext.props.JConfiguration.CockpitSkinPath
        };
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let arrHeaderData = AddEditSchoolYear_MetaData.GetAddEditSchoolYearMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/SchoolYear", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SchoolYearGrid"] : [];
        let intApplicationTypeForLanguageData = 2;

        let blnShowErrorPopup = blnIsEdit && (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),
                    Object_Extranet_Teacher_SchoolYear: objContext.props.Object_Extranet_Teacher_SchoolYear,
                    IsEdit: blnIsEdit
                },
                Meta: {
                    PopupName: "AddEditSchoolYear",
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
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/SchoolYear", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["SchoolYearGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["iSchoolYear"] + ", ";
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
                    ConfirmEvent: (objModal) => this.DeleteSchoolYear(arrSelectedRows, objModal)
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
     * @name DeleteSchoolYear
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes ApplicationType and close popup on success
     */
    DeleteSchoolYear(arrSelectedRows, objModal) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Extranet_Teacher_SchoolYear.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("SelectedRows", []);
                Popup.ClosePopup(objModal);
            }
        });
    }

    /**
         * @name SetRibbonData
         * @param {any} objContext
         * @summary To Set the Tab Data for the Module
    */
    SetRibbonData(objContext) {
        //let objSchoolYear_ModuleProcessor = new SchoolYear_ModuleProcessor(objContext);
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.SchoolYear_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.SchoolYear_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.SchoolYear_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", SchoolYear_OfficeRibbon.GetSchoolYearOfficeRibbonData(objRibbonData));
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

export default SchoolYear_ModuleProcessor;