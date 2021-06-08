//Objects required for module.
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';

//Module related imports.
import * as EssayBilling_OfficeRibbon from '@shared/Application/c.Intranet/Modules/7_Report/Essay/EssayBilling/EssayBilling_OfficeRibbon';


/**
* @name EssayBilling_ModuleProcessor
* @param NA
* @summary Class for EssayBilling_ModuleProcessor module display.
* @return NA
*/
class EssayBilling_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_State_State",
            "Object_Intranet_Test_IntranetTest",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/7_Report/Essay/EssayBilling",
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

        var arrFilters = [ {
            "match": {
                "cIsDeleted": "N"
            }
        }];

        let objStateParam = {
            "SearchQuery": {
                ... {
                    "must": arrFilters
                }
            },
            "SortKeys": [
                {
                    "iStateId": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iStateId", "cIsDeleted", "t_TestDrive_Member_State_Data"]
        }

        // State
        Object_Extranet_State_State.Initialize(objStateParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/7_Report/Essay/EssayBilling"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name HandleChange
    * @param {object} strAttributeName
    * @param {object} strValue
    * @param {object} objContext
    * @summary
    */
    HandleChange(strAttributeName, strValue, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { ...objContext.state, [strAttributeName]: strValue } });
    }

    /**
   * @name HandleDropdownChange
   * @param {object} objChangeData 
   * @param {object} objContext takes objContext
   * @summary Handles Dropdown change
   */
    HandleDropdownChange(objChangeData, objContext) {
        objContext.EssayBilling_ModuleProcessor.HandleChange("strStateId", objChangeData.iStateId, objContext);
        let objStateLanguageData = objChangeData.t_TestDrive_Member_State_Data.find(obj => obj["iLanguageId"] == JConfiguration.InterfaceLanguageId);
        let strStateName = objStateLanguageData ? objStateLanguageData.vStateName : "";
        objContext.EssayBilling_ModuleProcessor.HandleChange("strStateName", strStateName, objContext);
    }


    /**
     * @param {*} objItem objItem
     * @summary  To filter the dropdown data based on the condition
     * @returns {bool} boolean
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
    * @name ConfirmationPopup
    * @param {any} objContext
    * @summary to openPopup to get Execution name
    */
    ConfirmationPopup(objContext) {
        let vEventName = "EssayBillingExecutionName" + "_" + Date.now() + "_" + objContext.props.ClientUserDetails.UserId;
            Popup.ShowPopup({
                Data: {
                    ModuleName: "EssayBillingExecutionName",
                    IsEdit: false,
                    Id: "EssayBillingExecutionName",
                    objContext: objContext,
                    EventName: vEventName
                },
                Meta: {
                    PopupName: "EssayBillingExecutionName",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: 200,
                    Width: 500,
                    HeaderData: []
                },
                Resource: {
                    Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/7_Report/Essay/EssayBilling", objContext.props),
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupUniqueId) => {
                        Popup.ClosePopup(strPopupUniqueId);
                        this.InsertOfflineExecutionDetails(objContext, vEventName);
                    }
                },
                CallBacks: {}
            })
    }



  /**
  * @name InsertOfflineExecutionDetails
  * @param {object} objLanguage takes objLanguage
  * @param {object} objApplicationType takes objApplicationType
  * @param {object} objContext takes objContext
  * @summary Start Offline Execution and Register Signal r event
  */
    InsertOfflineExecutionDetails(objContext, vEventName) {
        let strEventName = "EssayBilling" + "_" + objContext.state.strStateName + "_" + (objContext.state.blnIsKeyCloak ? "KeyCloack_" : "NonKeyCloak_")  + Date.now() + "_" + objContext.props.ClientUserDetails.UserId;
        let objParams = {
            ["OfflineProcessParams"]: {
                iStateId: objContext.state.strStateId,
                cIsExternal: objContext.state.blnIsKeyCloak ? "Y" : "N",
                vExecutionName: strEventName,
                Event: strEventName,
            },
            ["OfflineProcessKeyWord"]: "GenerateEssayBilling"
        }
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.StartOfflineExecution(objParams, objContext, (objReturn) => {
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
            "ConfirmationPopup": () => objContext.EssayBilling_ModuleProcessor.InsertOfflineExecutionDetails(objContext)
            //"ConfirmationPopup": () => objContext.EssayBilling_ModuleProcessor.ConfirmationPopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", EssayBilling_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    }


    /**
   * @name GetDynamicStyles
   * @param {object} props props
   * @returns {object} DynamicStyles
   */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/7_Report/DataExport/DataExport.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DatePicker/DatePicker.css"
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

export default EssayBilling_ModuleProcessor;