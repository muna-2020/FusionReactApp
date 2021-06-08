//Objects required for module.
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';

//Module related imports.
import * as CycleClass_OfficeRibbon from "@shared/Application/c.Intranet/Modules/4_Cycle/CycleClass/CycleClass_OfficeRibbon";

/**
* @name CycleClass_ModuleProcessor
* @param NA
* @summary Class for CycleClass module display.
* @return NA
*/
class CycleClass_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/4_Cycle/CycleClass",
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

        //state
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
        let arrResourceParams = ["/c.Intranet/Modules/4_Cycle/CycleClass"];
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
            ["OutputColumns"]: ["uTestId", "vTestName", "t_TestDrive_Cycle_AssignedTest", "t_TestDrive_Cycle_State", "t_TestDrive_Cycle_School", "t_TestDrive_Cycle_Class", "dtModifiedOn"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Intranet_Test_IntranetTest.GetData(objTestParams, (objReturnData) => {
            let arrTestData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            let arrSelectedData = this.GetSelectedCycleClass(arrTestData);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTestData": arrTestData, "arrSelectedData": arrSelectedData, "arrPrevStateData": arrSelectedData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true)
    }

    /**
     * @name GetSelectedCycleClass
     * @param {array} arrTestData arrTestData
     * @summary Loads the Test having data in t_TestDrive_Cycle_State subtable and adds vAction key to the objects
     * @returns {array} return modified arrTestData array
     */
    GetSelectedCycleClass(arrTestData) {
        let arrData = [];
        arrTestData.map(objTestItem => {
            if (objTestItem["t_TestDrive_Cycle_Class"].length > 0) {
                arrData = [...arrData, {
                    "uTestId": objTestItem["uTestId"],
                    ["t_TestDrive_Cycle_Class"]: objTestItem["t_TestDrive_Cycle_Class"].map(objCycleClassItem => { return { ...objCycleClassItem, ["vAction"]: "" } })
                }];
            }
        });
        return arrData;
    }

    /**
     * @name OnDropDownChange
     * @param {string} strType dropdown type
     * @param {object} objChangeData objChangeData
     * @param {object} objContext objContext
     * @summary Handles dropdown changes
     */
    OnDropDownChange(strType, objChangeData, objContext) {
        switch (strType) {
            case "cycle":
                objContext.dispatch({ type: "SET_STATE", payload: { "strCycleId": objChangeData["uCycleId"], "arrTestData": [], "arrSelectedData": [], "arrPrevStateData": [] } });
                break;
            case "state":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedState": objChangeData, "objSelectedSchool": {}, "blnClassSelected": false} });
                break;
            case "school":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedSchool": objChangeData, "blnClassSelected": false } });
                break;
        }            
    }

    /**
     * @name LoadSelectedStateSchools
     * @param {object} objContext objContext
     * @param {string} strStateId uCycleId
     * @summary Loads the Test data based on selected CycleId
     * @returns {object} return objDataCalls
     */
    LoadSelectedStateSchools(objContext, strStateId) {
        let objSchoolParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": strStateId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vSchoolName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["uSchoolId", "vSchoolName", "iStateId", "cIsDeleted"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_School_School.GetData(objSchoolParam, (objReturnData) => {
            let arrSchoolData = objReturnData[Object.keys(objReturnData)[0]]["Data"] ? objReturnData[Object.keys(objReturnData)[0]]["Data"] : [];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSchoolData": arrSchoolData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }

    /**
     * @name OpenAddClassPopup
     * @param {object} objContext objContext
     * @summary Opens the AddCycleClass popup to select the required Class
     */
    OpenAddClassPopup(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleClass", objContext.props);
        if (objContext.state.strCycleId != -1) {
            Popup.ShowPopup({
                Data: {
                    DropdownData: {
                        StateData: DataRef(objContext.props.Object_Extranet_State_State)["Data"],
                        SelectedState: objContext.state.objSelectedState,
                        SelectedSchool: objContext.state.objSelectedSchool
                    },                    
                },
                Meta: {
                    PopupName: "AddCycleClass",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                    Height: "auto",
                    Width: 500
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    SetSelectedClass: (objSelectedState, objSelectedSchool, objSelectedTeacher, objSelectedClass) => this.SetSelectedStateClass(objSelectedState, objSelectedSchool, objSelectedTeacher, objSelectedClass, objContext)
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    ShowHeader: true,
                    ShowCloseIcon: true,
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
     * @name SetSelectedStateClass
     * @param {object} objSelectedState objSelectedState
     * @param {object} objSelectedSchool objSelectedSchool
     * @param {object} objSelectedClass objSelectedClass
     * @param {object} objContext objContext
     * @summary Sets the selected state , school and Class from Popup.
     */
    SetSelectedStateClass(objSelectedState, objSelectedSchool, objSelectedTeacher, objSelectedClass, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedState": objSelectedState, "objSelectedSchool": objSelectedSchool, "objSelectedTeacher": objSelectedTeacher,"objSelectedClass": objSelectedClass, blnSchoolSelected: true } })
    }

    /**
     * @name GetSelectedStateName
     * @param {object} objContext objContext
     * @summary Gets the Name of selected state.
     */
    GetSelectedStateName(objContext) {
        let objSelectedStateData = objContext.state.objSelectedState["t_TestDrive_Member_State_Data"].find(objStateData => objStateData["iLanguageId"] == parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]));
        return objSelectedStateData ? objSelectedStateData["vStateName"] : "";
    }

    /**
     * @name ClickHandler
     * @param {object} objContext
     * @param {object} objTestItem
     * @param {boolean} blnChecked 
     * ClickHandler is called when checkbox are checked in or checked out
     */
    ClickHandler(objContext, objTestItem, blnChecked) {
        let arrNewData = [];
        if (!blnChecked) // action is checked out means need to delete
        {   //check if the test exits in the main array (i.e arrTestData)
            let objTempData = objContext.state.arrTestData.filter(objItem => objItem["uTestId"] === objTestItem["uTestId"])[0];

            objContext.state.arrSelectedData.forEach(objSelectedItem => {
                if (objSelectedItem["uTestId"] === objTestItem["uTestId"])  //check if test exists in arrSelectedData if not just add.
                {
                    if (objTempData["t_TestDrive_Cycle_Class"].filter(objItem => objItem["uClassId"] === objContext.state.objSelectedClass["uClassId"]).length === 0) {   //check if clicked state exists in the object of main array (i.e arrTestData),here it will filter out if the state exists
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_Class"]: objSelectedItem["t_TestDrive_Cycle_Class"].filter(objCycleStateItem => objCycleStateItem["uClassId"] !== objContext.state.objSelectedClass["uClassId"])
                        };
                        if (objData["t_TestDrive_Cycle_Class"].length > 0) {
                            arrNewData = [...arrNewData, objData];
                        }
                    }
                    else {
                        //exists in the object of arrTestData just change action to delete
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_Class"]: objSelectedItem["t_TestDrive_Cycle_Class"].map(objCycleStateItem => {
                                if (objCycleStateItem["uClassId"] === objContext.state.objSelectedClass["uClassId"]) {
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
                            ["t_TestDrive_Cycle_Class"]: [...objSelectedItem["t_TestDrive_Cycle_Class"], {
                                ["uClassId"]: objContext.state.objSelectedClass["uClassId"],
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
                    ["t_TestDrive_Cycle_Class"]: [{
                        ["uClassId"]: objContext.state.objSelectedClass["uClassId"],
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
     * @param {object} objContext objContext
     * @summary Gets the newly Added/Deleted CycleClass and Edits the t_TestDrive_Cycle_Class table
     */
    SaveData(objContext) {
        let arrAddData = [];
        //filter on those which are either add or delete if empty it will not be passed
        objContext.state.arrSelectedData.forEach(objSeletectedElement => {
            let arrSubData = objSeletectedElement["t_TestDrive_Cycle_Class"].filter(objItem => objItem["vAction"] !== "");
            if (arrSubData.length > 0) {
                arrAddData = [...arrAddData, { ...objSeletectedElement, ["t_TestDrive_Cycle_Class"]: arrSubData }];
            }
        });

        if (arrAddData.length > 0) {
            var objEditParams = {                
                "vEditData": arrAddData
            };          
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Intranet_Test_IntranetTest.EditData(objEditParams, () => {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrPrevStateData": objContext.state.arrSelectedData } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }, true);
        }
    }

    /**
     * @name ClearData
     * @param {object} objContext objContext
     * @summary Returns to previous state on click of Clear from office ribbon
     */
    ClearData(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedData": objContext.state.arrPrevStateData } });
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "SaveData": () => objContext.CycleClass_ModuleProcessor.SaveData(objContext),
            "OpenAddClassPopup": () => objContext.CycleClass_ModuleProcessor.OpenAddClassPopup(objContext),
            "ClearData": () => objContext.CycleClass_ModuleProcessor.ClearData(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", CycleClass_OfficeRibbon.GetCycleClassOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} GetDynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/8_Setting/CycleSchool/CycleSchool.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/8_Setting/CycleSchool/AddCycleSchool/AddCycleSchool.css"
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

export default CycleClass_ModuleProcessor;