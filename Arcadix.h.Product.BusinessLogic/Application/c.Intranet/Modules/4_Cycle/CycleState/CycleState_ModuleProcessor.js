//Objects required for module.
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';

//Module related imports.
import * as CycleState_OfficeRibbon from "@shared/Application/c.Intranet/Modules/4_Cycle/CycleState/CycleState_OfficeRibbon";

/**
* @name CycleState_ModuleProcessor
* @param NA
* @summary Class for Subject module display.
* @return NA
*/
class CycleState_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Cycle_Cycle", 
            "Object_Extranet_State_State",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/4_Cycle/CycleState"
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

        //Cycle
        let objCycleParam = {
            "SortKeys": [
                {
                    "vCycleName": {
                        "order": "asc"
                    }
                }],
        }
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParam);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];
        
        //State
        let objStateParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_State_Data.vStateName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iStateId", "cIsDeleted", "t_TestDrive_Member_State_Data"]
        }
        Object_Extranet_State_State.Initialize(objStateParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/4_Cycle/CycleState"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name LoadSelectedCycleTests
     * @param {object} objContext objContext
     * @param {string} strCycleId uCycleId
     * @summary Loads the Test data based on selected CycleId
     * @returns {object} return objDataCalls
     */
    LoadSelectedCycleTests(objContext, strCycleId) {
        let objTestParams = {
            ["SearchQuery"]: {
                "must": [
                    {                       
                        "match": {
                            "uCycleId": strCycleId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },                            
            ["OutputColumns"]: ["uTestId", "vTestName", "t_TestDrive_Cycle_AssignedTest", "t_TestDrive_Cycle_State", "dtModifiedOn"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Intranet_Test_IntranetTest.GetData(objTestParams, (objReturnData) => {
            let arrTestData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            let arrSelectedData = this.GetSelectedCycleStates(arrTestData);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTestData": arrTestData, "arrSelectedData": arrSelectedData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true)
    }

    /**
     * @name GetSelectedCycleStates
     * @param {array} arrTestData arrTestData
     * @summary Loads the Test having data in t_TestDrive_Cycle_State subtable and adds vAction key to the objects
     * @returns {array} return modified arrTestData array
     */
    GetSelectedCycleStates(arrTestData) {
        let arrData = [];
        arrTestData.forEach(objTestItem => {
            if (objTestItem["t_TestDrive_Cycle_State"].length > 0) {
                arrData = [...arrData, {
                    "uTestId": objTestItem["uTestId"],
                    ["t_TestDrive_Cycle_State"]: objTestItem["t_TestDrive_Cycle_State"]?.map(objCycleStateItem => { return { ...objCycleStateItem, ["vAction"]: "" } })
                }];
            }
        });
        return arrData;
    }

    /**
     * @name OnCycleDropDownChange
     * @param {object} objContext objContext
     * @param {object} objChangeData objChangeData
     * @summary Handles the change of Cycle dropdown
     * @returns {object} return objDataCalls
     */
    OnCycleDropDownChange(objContext, objChangeData) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strCycleId": objChangeData["uCycleId"], "arrTestData": [] } });
    }

    /**
     * @name ClickHandler
     * @param {object} objContext objContext
     * @param {object} objStateItem objStateItem
     * @param {object} objTestItem objTestItem
     * @param {boolean} blnChecked blnChecked
     * ClickHandler is called when checkbox are checked in or checked out
     */
    ClickHandler(objContext, objStateItem, objTestItem, blnChecked) {
        let arrNewData = [];
        if (!blnChecked) // action is checkedout means need to delete
        {   //check if the test exits in the main array (i.e arrTestData)
            let objTempData = objContext.state.arrTestData.filter(objItem => objItem["uTestId"] === objTestItem["uTestId"])[0];

            objContext.state.arrSelectedData.forEach(objSelectedItem => {
                if (objSelectedItem["uTestId"] === objTestItem["uTestId"])  //check if test exixts in arrSelectedData if not just add.
                {
                    if (objTempData["t_TestDrive_Cycle_State"].filter(objItem => objItem["iStateId"] === objStateItem["iStateId"]).length === 0) {   //check if clicked state exists in the object of main array (i.e arrTestData),here it will filter out if the state exists
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_State"]: objSelectedItem["t_TestDrive_Cycle_State"].filter(objCycleStateItem => objCycleStateItem["iStateId"] !== objStateItem["iStateId"])
                        };
                        if (objData["t_TestDrive_Cycle_State"].length > 0) {
                            arrNewData = [...arrNewData, objData];
                        }
                    }
                    else {
                        //exists in the object of arrTestData just change action to delete
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_State"]: objSelectedItem["t_TestDrive_Cycle_State"].map(objCycleStateItem => {
                                if (objCycleStateItem["iStateId"] === objStateItem["iStateId"]) {
                                    return { ...objCycleStateItem, ["vAction"]: "Delete" };
                                }
                                else {
                                    return objCycleStateItem;
                                }
                            })
                        };
                        arrNewData = [...arrNewData, objData];
                    }
                }
                else { //simply add in arrSelectedData
                    arrNewData = [...arrNewData, objSelectedItem];
                }
            });
        }
        else {
            if (objContext.state.arrSelectedData.filter(objSelectedItem => objSelectedItem["uTestId"] === objTestItem["uTestId"]).length > 0) {// if length is greater than 0 then search for particular test and update the t_TestDrive_Cycle_State and rest just return
                objContext.state.arrSelectedData.forEach(objSelectedItem => {
                    if (objSelectedItem["uTestId"] === objTestItem["uTestId"]) {
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_State"]: [...objSelectedItem["t_TestDrive_Cycle_State"], {
                                ["iStateId"]: objStateItem.iStateId,
                                ["uCycleId"]: objContext.state.strCycleId,
                                ["uTestId"]: objTestItem["uTestId"],
                                ["vAction"]: blnChecked ? "Add" : "Delete",
                            }]
                        };
                        arrNewData = [...arrNewData, objData];
                    }
                    else {
                        arrNewData = [...arrNewData, objSelectedItem];
                    }
                });
            }
            else {
                //add the test in arrSelectedData if its not present.
                let objData = {
                    ["uTestId"]: objTestItem["uTestId"],
                    ["t_TestDrive_Cycle_State"]: [{
                        ["iStateId"]: objStateItem.iStateId,
                        ["uCycleId"]: objContext.state.strCycleId,
                        ["uTestId"]: objTestItem["uTestId"],
                        ["vAction"]: blnChecked ? "Add" : "Delete",
                    }]
                };
                arrNewData = [...objContext.state.arrSelectedData, objData];
            }
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedData": arrNewData } });
    }

    /**
    * @name SaveData
    * @param {object} objContext
    * @summary Saves the data by calling EditData of IntranetTest
    */
    SaveData(objContext) {
        let arrAddData = [];
        //filter on those which are either add or delete if empty it will not be passed
        objContext.state.arrSelectedData?.forEach(objSeletectedElement => {
            let arrSubData = objSeletectedElement["t_TestDrive_Cycle_State"]?.filter(objItem => objItem["vAction"] !== "");
            if (arrSubData.length > 0) {
                arrAddData = [...arrAddData, { ...objSeletectedElement, ["t_TestDrive_Cycle_State"]: arrSubData }];
            }
        });

        if (arrAddData.length > 0) {
            var objEditParams = {                
                "vEditData": arrAddData
            };          
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Intranet_Test_IntranetTest.EditData(objEditParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            }, true);
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
            "SaveData": () => objContext.CycleState_ModuleProcessor.SaveData(objContext),
        };
        ApplicationState.SetProperty("OfficeRibbonData", CycleState_OfficeRibbon.GetCycleStateOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} GetDynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
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

export default CycleState_ModuleProcessor;