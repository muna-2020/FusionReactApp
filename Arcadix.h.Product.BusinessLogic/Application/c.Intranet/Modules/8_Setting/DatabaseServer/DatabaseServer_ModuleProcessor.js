//Objects required for module.
import Object_Intranet_Setting_DatabaseServer from '@shared/Object/c.Intranet/8_Setting/DataBaseServer/DatabaseServer';
import Object_Intranet_Setting_GateKeeperTargetType from '@shared/Object/c.Intranet/8_Setting/GateKeeperTargetType/GateKeeperTargetType';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related imports.
import * as DatabaseServer_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/DatabaseServer/DatabaseServer_MetaData';
import * as DatabaseServer_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/DataBaseServer/DatabaseServer_OfficeRibbon';

/**
* @name DatabaseServer_ModuleProcessor
* @param NA
* @summary Class for DatabaseServer module display.
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
            "Object_Intranet_Setting_DatabaseServer",
            "Object_Intranet_Setting_GateKeeperTargetType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/DatabaseServer",
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

        //ApplicationServer
        Object_Intranet_Setting_DatabaseServer.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_DatabaseServer]

        // GateKeeperTargetType
        Object_Intranet_Setting_GateKeeperTargetType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_GateKeeperTargetType];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/DatabaseServer"];
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
            RowData: DataRef(objContext.props.Object_Intranet_Setting_DatabaseServer)["Data"] ?? [],
            LanguageData: objContext.DatabaseServer_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
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
            ...DatabaseServer_MetaData.GetMetaData(),
            Filter: {
                "cIsDeleted": "N",
                "uTargetTypeId": objContext.state.strGateKeeperTargetTypeId
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
   * @name OnGateKeeperTargetTypeDropDownChange
   * @param {*} objContext objChangeData
   * @param {*} objChangeData objChangeData
   * @summary   To change the subject Dropdown Data on change of the subject dropdown value
   */
    OnGateKeeperTargetTypeDropDownChange(objContext, objChangeData) {
        //if (objChangeData["uTargetTypeId"] != -1) {
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "DataBaseServerGrid": null });
            objContext.dispatch({ type: "SET_STATE", payload: { "strGateKeeperTargetTypeId": objChangeData["uTargetTypeId"] } });
        //};
    }

    /**
  * @name GetDependingColumnData
  * @param {*} objContext objContext
  * @summary Return depending column Dropdown data
  * @returns {obj} depending column object
  */
    GetDependingColumnData(objContext) {

        let objGateKeeperTargetDropdownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "uTargetTypeId",
            "DisplayColumn": "vTargetTypeName",
            "DependingTableName": "t_Framework_Gatekeeper_TargetType_Data",
            "Data": []
        };
        objContext.props.Object_Intranet_Setting_GateKeeperTargetType["Data"].map((objGetKeeperTarget) => {
            objGateKeeperTargetDropdownData["Data"] = [...objGateKeeperTargetDropdownData["Data"], objGetKeeperTarget];
        });
        return { "uTargetTypeId": objGateKeeperTargetDropdownData };
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
         * @name SetRibbonData
         * @param {any} objContext
         * @summary To Set the Tab Data for the Module
    */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            // "AddPopup": () => objContext.DatabaseServer_ModuleProcessor.OpenAddEditPopup(objContext, false),
            // "EditPopup": () => objContext.DatabaseServer_ModuleProcessor.OpenAddEditPopup(objContext, true),
            // "DeletePopup": () => objContext.DatabaseServer_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", DatabaseServer_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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

export default DatabaseServer_ModuleProcessor;