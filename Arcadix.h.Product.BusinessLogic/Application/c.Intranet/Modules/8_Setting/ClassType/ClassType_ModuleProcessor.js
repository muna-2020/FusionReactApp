
//Objects required for module.
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Extranet_Teacher_ClassType from '@shared/Object/d.Extranet/3_Teacher/ClassType/ClassType';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as ClassType_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/ClassType_MetaData';
import * as ClassType_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/ClassType_OfficeRibbon';
import * as AddEditClassType_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/AddEditClassType/AddEditClassType_MetaData';

/**
* @name ClassType_ModuleProcessor
* @param NA
* @summary Class for CompetencyLevel module display.
* @return NA
*/
class ClassType_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_State_State",
            "Object_Extranet_Teacher_ClassType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/ClassType",
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

        //Compentency_level
        Object_Extranet_Teacher_ClassType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_ClassType]

        // State
        Object_Extranet_State_State.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/ClassType"];
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
        let intApplicationTypeForLanguageData = 2;
        let objData = {
            RowData: DataRef(objContext.props.Object_Extranet_Teacher_ClassType)["Data"] ?? [],
            DropDownData: objContext.ClassType_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.ClassType_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
            ...ClassType_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "iStateId": objContext.state.strStateId
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
            SkinPath: objContext.props.JConfiguration.IntranetSkinPath
        };
    }

    /**
    * @name OpenAddEditPopup
    * @param {object} objContext passes Context object
    * @param {boolean} blnIsEdit is either edit or Add
    * @summary Call Confirmation popup for Deleting Competency level
    * @return null
    */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ClassType", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClassTypeGrid"] : 0;
        let intApplicationTypeForClassTypeData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        else {
            blnShowErrorPopup = objContext.state.strStateId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        State: DataRef(objContext.props.Object_Extranet_State_State)["Data"],
                        StateDropdownSelectedValue: objContext.state.strStateId,
                    },
                    Object_Extranet_Teacher_ClassType: objContext.props.Object_Extranet_Teacher_ClassType,
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForClassTypeData),
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditClassType",
                    HeaderData: AddEditClassType_MetaData.GetAddEditClassTypeMetaData(),
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
    * @summary Call Confirmation popup for Deleting Competency level
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ClassType", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["ClassTypeGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["iDisplayOrder"] + ", ";
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
                    ConfirmEvent: (strPopupId) => this.DeleteClassType(arrSelectedRows, strPopupId)
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
* @name DeleteClassType
* @param {array} arrSelectedRows selected row from the display grid
* @param {object} objModal objModal
* @summary Deletes Subject and close popup on success
*/
    DeleteClassType(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Extranet_Teacher_ClassType.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClassTypeGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }


    /**
   * @name OnStateDropDownChange
   * @param {*} objContext objChangeData
   * @param {*} objChangeData objChangeData
   * @summary   To change the Classtype Dropdown Data on change of the state dropdown value
   */
    OnStateDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClassTypeGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "strStateId": objChangeData["iStateId"] } });
    };

    /**
  * @name CreateItemEventHandler
  * @param {*} objItem objItem
  * @summary   To filter the dropdown data based on the condition
  * @return {bool} boolean
  */
    CreateItemEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {

        let objStateDropDownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iStateId",
            "DisplayColumn": "vStateName",
            "DependingTableName": "t_TestDrive_Member_State_Data",
            "Data": []
        };

        let arrState =DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [];
        arrState.map((objState) => {
            objStateDropDownData["Data"] = [...objStateDropDownData["Data"], objState];
        });
        return { "iStateId": objStateDropDownData };
    };

    /**
         * @name SetRibbonData
         * @param {any} objContext
         * @summary To Set the Tab Data for the Module
    */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.ClassType_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.ClassType_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.ClassType_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", ClassType_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    }


    /**
     * @name GetDynamicStlyes
     * @param {object} props props
     * @returns {object} DynamicStlyes
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

export default ClassType_ModuleProcessor;