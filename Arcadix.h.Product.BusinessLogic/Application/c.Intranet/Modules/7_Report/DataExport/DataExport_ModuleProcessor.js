//Objects required for module.
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';

//Module related imports.
import * as DataExport_OfficeRibbon from '@shared/Application/c.Intranet/Modules/7_Report/DataExport/DataExport_OfficeRibbon';


/**
* @name DataExport_ModuleProcessor
* @param NA
* @summary Class for DataExport_ModuleProcessor module display.
* @return NA
*/
class DataExport_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_State_State",
            "Object_Intranet_Cycle_Cycle",
            "Object_Intranet_Test_IntranetTest",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/7_Report/DataExport",
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

        //Cycle
        Object_Intranet_Cycle_Cycle.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        let objTestParams = {
            ["OutputColumns"]: ["uTestId", "iFolderId", "vTestName", "t_TestDrive_Cycle_AssignedTest", "dtModifiedOn"]
        };

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/7_Report/DataExport"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name CycleTypeClickHandler
    * @param {object} objLanguage takes objLanguage
    * @param {object} objApplicationType takes objApplicationType
    * @param {object} objContext takes objContext
    * @summary Handles checkBox click of MainClient Language
    */
    CycleTypeClickHandler(objselectedData, objContext, SelectedDropDownId) {
        SelectedDropDownId == "iCycleTypeId"?
            objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "iCycleTypeId": objselectedData["iCycleTypeId"], "uCycleId": -1, "iCycleNumberOfRepetitions": -1 } } }) :
            objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "uTestId": objselectedData["uTestId"] } } }) 
    }

    /**
* @name OnCycleDropDownChange
* @param {*} objContext objChangeData
* @param {*} objChangeData objChangeData
* @summary   To change the ClassType Dropdown Data on change of the state dropdown value
*/
    OnCycleDropDownChange(objContext, objChangeData, props) {
        let arrCycleNumberOfRepetitions = new Array;
        if (objChangeData["iCycleNumberOfRepetitions"] != null) {
            for (var i = 1; i <= objChangeData["iCycleNumberOfRepetitions"]; i++) {
                arrCycleNumberOfRepetitions.push({ "iCycleNumberOfRepetitions": i, "vCycleNumberOfRepetitionsValue": i,"cIsDeleted":"N" })
            }
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "uCycleId": objChangeData["uCycleId"], "iCycleNumberOfRepetitions": -1 }, "arrCycleNumberOfRepetitions": arrCycleNumberOfRepetitions } });
        if (objChangeData.uCycleId != -1){
            this.LoadTestsForCycle(objContext, objChangeData.uCycleId);
        };  
    };

    LoadTestsForCycle(objContext, uCycleId) {
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uCycleId": uCycleId
                        }
                    }
                ]
            }
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Intranet_Test_IntranetTest.GetData(objParams, (objResponse, blnDataReturned) => {
            if (blnDataReturned) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                let arrTestData = objResponse[Object.keys(objResponse)[0]]["Data"];
                if (arrTestData.length > 0) {
                    let objSearchFilters = { ...objContext.state.objSearchFilters, uTestId: arrTestData[0].uTestId, uCycleId: uCycleId };
                    objContext.dispatch({ type: "SET_STATE", payload: { objSearchFilters: objSearchFilters } });
                }                
                objContext.dispatch({ type: "SET_STATE", payload: { arrTestData: arrTestData } });
            }
        },true)
    }

    /**
* @name OnCycleNumberOfRepetitionsDropDownChange
* @param {*} objContext objChangeData
* @param {*} objChangeData objChangeData
* @summary   To change the ClassType Dropdown Data on change of the state dropdown value
*/
    OnCycleNumberOfRepetitionsDropDownChange(objContext, objChangeData, props) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "iCycleNumberOfRepetitions": objChangeData["iCycleNumberOfRepetitions"] }} });
    };

    /**
   * @name stateClickHandler
   * @param {object} objLanguage takes objLanguage
   * @param {object} objApplicationType takes objApplicationType
   * @param {object} objContext takes objContext
   * @summary Handles State Selection
   */
    stateClickHandler(objselectedState, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "iStateId": objselectedState["iStateId"] } } });
    }

    /**
  * @name OnDateChange
  * @param {object} objLanguage takes objLanguage
  * @param {object} objApplicationType takes objApplicationType
  * @param {object} objContext takes objContext
  * @summary Handles checkBox click of MainClient Language
  */
    OnDateChange(strAttributeName, strSelectedDate, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [strAttributeName]: strSelectedDate } } });
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
            let vEventName = "DataExport" + "_" + Date.now() + "_" + objContext.props.ClientUserDetails.UserId;
            Popup.ShowPopup({
                Data: {
                    ModuleName: "DataExportExecutionName",
                    IsEdit: false,
                    Id: "DataExportExecutionName",
                    objContext: objContext,
                    EventName: vEventName
                },
                Meta: {
                    PopupName: "DataExportExecutionName",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: 200,
                    Width: 500,
                    HeaderData: []
                },
                Resource: {
                    Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/7_Report/DataExport", objContext.props),
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
        //let strEventName = "DataExport" + "_" + Date.now() + "_" + objContext.props.ClientUserDetails.UserId;
        let objParams = {
            ["OfflineProcessParams"]: {
                objFilterData: objContext.state.objSearchFilters,
                vExecutionName: ApplicationState.GetProperty("vDataExportExecutionName") != null ? ApplicationState.GetProperty("vDataExportExecutionName") : vEventName,
                Event: vEventName
            },
            ["OfflineProcessKeyWord"]: "DataExport"
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
            //"InsertOfflineExecutionDetails": () => objContext.DataExport_ModuleProcessor.InsertOfflineExecutionDetails(objContext)
            "ConfirmationPopup": () => objContext.DataExport_ModuleProcessor.ConfirmationPopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", DataExport_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            "Components": ["Dropdown","DatePicker"]
        }
    }
}

export default DataExport_ModuleProcessor;