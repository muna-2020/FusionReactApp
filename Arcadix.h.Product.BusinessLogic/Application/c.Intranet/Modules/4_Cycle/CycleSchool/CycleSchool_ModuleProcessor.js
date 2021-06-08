//Objects required for module.
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';

//Module related imports.
import * as CycleSchool_OfficeRibbon from "@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchool/CycleSchool_OfficeRibbon";

/**
 * @name CycleSchool_ModuleProcessor
 * @param NA
 * @summary Class for CycleSchool module.
 * @return NA
 */
class CycleSchool_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/4_Cycle/CycleSchool",
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
        let arrResourceParams = ["/c.Intranet/Modules/4_Cycle/CycleSchool"];
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
            ["OutputColumns"]: ["uTestId", "vTestName", "t_TestDrive_Cycle_AssignedTest", "t_TestDrive_Cycle_State", "t_TestDrive_Cycle_School", "dtModifiedOn"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Intranet_Test_IntranetTest.GetData(objTestParams, (objReturnData) => {
            let arrTestData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            let arrSelectedData = this.GetSelectedCycleSchools(arrTestData);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTestData": arrTestData, "arrSelectedData": arrSelectedData, "arrPrevStateData": arrSelectedData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true)
    }

    /**
     * @name GetSelectedCycleSchools
     * @param {array} arrTestData arrTestData
     * @summary Loads the Test having data in t_TestDrive_Cycle_State subtable and adds vAction key to the objects
     * @returns {array} return modified arrTestData array
     */
    GetSelectedCycleSchools(arrTestData) {
        let arrData = [];
        arrTestData.map(objTestItem => {
            if (objTestItem["t_TestDrive_Cycle_School"].length > 0) {
                arrData = [...arrData, {
                    "uTestId": objTestItem["uTestId"],
                    ["t_TestDrive_Cycle_School"]: objTestItem["t_TestDrive_Cycle_School"].map(objCycleStateItem => { return { ...objCycleStateItem, ["vAction"]: "" } })
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
                objContext.dispatch({ type: "SET_STATE", payload: { "strCycleId": objChangeData["uCycleId"], "arrTestData": [], "arrSelectedData": [], "arrPrevStateData": []  } });
                break;
            case "state":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedState": objChangeData, "blnSchoolSelected": false} });
                break;
        }            
    }

    /**
     * @name OpenAddSchoolPopup
     * @param {*} objContext
     * @summary Opens the AddCycleSchool popup to select the required school
     */
    OpenAddSchoolPopup(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleSchool", objContext.props);
        if (objContext.state.strCycleId != -1) {
            Popup.ShowPopup({
                Data: {
                    DropdownData: {
                        StateData: DataRef(objContext.props.Object_Extranet_State_State)["Data"],
                        SelectedState: objContext.state.objSelectedState
                    },
                    HeaderTitle: "Add School"
                },
                Meta: {
                    PopupName: "AddCycleSchool",
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
                    SetSelectedSchool: (objSelectedState, objSelectedSchool) => this.SetSelectedStateSchool(objSelectedState, objSelectedSchool, objContext)
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
     * @name SetSelectedStateSchool
     * @param {object} objSelectedState objSelectedState
     * @param {object} objSelectedSchool objSelectedSchool
     * @param {object} objContext objContext
     * @summary Sets the selected state and school from Popup.
     */
    SetSelectedStateSchool(objSelectedState, objSelectedSchool, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedState": objSelectedState, "objSelectedSchool": objSelectedSchool, blnSchoolSelected: true } })
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
     * @param {object} objContext objContext
     * @param {object} objTestItem objTestItem
     * @param {boolean} blnChecked blnChecked
     * @summary ClickHandler is called when checkbox are checked in or checked out
     */
    ClickHandler(objContext, objTestItem, blnChecked) {
        let arrNewData = [];
        if (!blnChecked) // action is checked-out means need to delete
        {   
            let objTempData = objContext.state.arrTestData.filter(objItem => objItem["uTestId"] === objTestItem["uTestId"])[0];

            objContext.state.arrSelectedData.forEach(objSelectedItem => {
                if (objSelectedItem["uTestId"] === objTestItem["uTestId"])  //check if test exists in arrSelectedData if not just add.
                {
                    if (objTempData["t_TestDrive_Cycle_School"].filter(objItem => objItem["uSchoolId"] === objContext.state.objSelectedSchool["uSchoolId"]).length === 0) {   //check if clicked state exists in the object of main array (i.e arrTestData),here it will filter out if the state exists
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_School"]: objSelectedItem["t_TestDrive_Cycle_School"].filter(objCycleStateItem => objCycleStateItem["uSchoolId"] !== objContext.state.objSelectedSchool["uSchoolId"])
                        };
                        if (objData["t_TestDrive_Cycle_School"].length > 0) {
                            arrNewData = [...arrNewData, objData];
                        }
                    }
                    else {
                        //exists in the object of arrTestData just change action to delete
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_School"]: objSelectedItem["t_TestDrive_Cycle_School"].map(objCycleStateItem => {
                                if (objCycleStateItem["uSchoolId"] === objContext.state.objSelectedSchool["uSchoolId"]) {
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
                            ["t_TestDrive_Cycle_School"]: [...objSelectedItem["t_TestDrive_Cycle_School"], {
                                ["uSchoolId"]: objContext.state.objSelectedSchool["uSchoolId"],
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
                    ["t_TestDrive_Cycle_School"]: [{
                        ["uSchoolId"]: objContext.state.objSelectedSchool["uSchoolId"],
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
     * @summary Gets the newly Added/Deleted CycleSchool and Edits the t_TestDrive_Cycle_School table
     */
    SaveData(objContext) {
        let arrAddData = [];
        //filter on those which are either add or delete if empty it will not be passed
        objContext.state.arrSelectedData.forEach(objSeletectedElement => {
            let arrSubData = objSeletectedElement["t_TestDrive_Cycle_School"].filter(objItem => objItem["vAction"] !== "");
            if (arrSubData.length > 0) {
                arrAddData = [...arrAddData, { ...objSeletectedElement, ["t_TestDrive_Cycle_School"]: arrSubData }];
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
            "SaveData": () => objContext.CycleSchool_ModuleProcessor.SaveData(objContext),
            "OpenAddSchoolPopup": () => objContext.CycleSchool_ModuleProcessor.OpenAddSchoolPopup(objContext),
            "ClearData": () => objContext.CycleSchool_ModuleProcessor.ClearData(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", CycleSchool_OfficeRibbon.GetCycleSchoolOfficeRibbonData(objRibbonData));
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

export default CycleSchool_ModuleProcessor;