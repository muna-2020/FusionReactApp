//Objects required for module.
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';

//Module related imports.
import * as CycleSchoolYear_OfficeRibbon from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchoolYear/CycleSchoolYear_OfficeRibbon';

/**
* @name CycleSchoolYear_ModuleProcessor
* @summary Class for CycleSchoolYear module display.
*/
class CycleSchoolYear_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Cycle_Cycle",
            "Object_Extranet_Teacher_SchoolYear",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/4_Cycle/CycleSchoolYear"
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

        let objSchoolYearParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_Class_SchoolYear_Data.vSchoolYearName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iSchoolYearId", "t_TestDrive_Member_Class_SchoolYear_Data", "cIsDeleted", "iSchoolYear"]
        }
        // Cycle
        Object_Intranet_Cycle_Cycle.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        // SchoolYear
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/4_Cycle/CycleSchoolYear"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];


        return arrDataRequest;
    }


    /**
  * @param {*} objChangeData objChangeData
  * @param {*} props props
  * @summary   To change the subject Dropdown Data on change of the subject dropdown value
  */
    OnCycleDropDownChange(objContext, objChangeData) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strCycleId": objChangeData["uCycleId"] } });
        let objTestParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uCycleId": objChangeData["uCycleId"]
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vTestName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["uTestId", "t_TestDrive_Cycle_AssignedTest", "t_TestDrive_Cycle_SchoolYear", "vTestName", "cIsDeleted","dtModifiedOn"]
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Intranet_Test_IntranetTest.GetData(objTestParam, (objReturnData) => {
            let arrTestData = objReturnData[Object.keys(objReturnData)[0]];
            let arrSelectedData = this.GetSelectedCycleSchoolYear(arrTestData["Data"]);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTestData": arrTestData["Data"], "arrSelectedData": arrSelectedData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true)
    };

    GetSelectedCycleSchoolYear(arrTestData) {
        let arrData = [];
        arrTestData.forEach(objTestData => {
            if (objTestData["t_TestDrive_Cycle_SchoolYear"] && objTestData["t_TestDrive_Cycle_SchoolYear"].length > 0) {
                arrData = [...arrData, {
                    "uTestId": objTestData["uTestId"],
                    ["t_TestDrive_Cycle_SchoolYear"]: objTestData["t_TestDrive_Cycle_SchoolYear"].map(objCycleStateItem => { return { ...objCycleStateItem, ["vAction"]: "" } })
                }];
            }
        });
        return arrData;
    }


    /**
     * @name ClickHandler
     * @param {*} objContext 
     * @param {*} objSchoolYear
     * @param {*} objTestData
     * @param {*} blnIsCheckBoxChecked
     * ClickHandler is called when checkbox are checked in or checked out
     */
    ClickHandler(objContext, objSchoolYear, objTestData, blnIsCheckBoxChecked) {
        let arrNewData = [];
        if (!blnIsCheckBoxChecked) // action is checkedout means need to delete
        {   //check if the test exits in the main array (i.e arrTestData)
            let objTempData = objContext.state.arrTestData.filter(objItem => objItem["uTestId"] === objTestData["uTestId"])[0];

            objContext.state.arrSelectedData.forEach(objSelectedItem => {
                if (objSelectedItem["uTestId"] === objTestData["uTestId"])  //check if test exixts in arrSelectedData if not just add.
                {
                    if (objSelectedItem["t_TestDrive_Cycle_SchoolYear"].filter(objItem => objItem["iSchoolYearId"] === objSchoolYear["iSchoolYearId"]).length === 0) {   //check if clicked state exists in the object of main array (i.e arrTestData),here it will filter out if the state exists
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_SchoolYear"]: objSelectedItem["t_TestDrive_Cycle_SchoolYear"].filter(objCycleStateItem => objCycleStateItem["iSchoolYearId"] !== objSchoolYear["iSchoolYearId"])
                        };
                        if (objData["t_TestDrive_Cycle_SchoolYear"].length > 0) {
                            arrNewData = [...arrNewData, objData];
                        }
                    }
                    else {
                        //exists in the object of arrTestData just change action to delete
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_SchoolYear"]: objSelectedItem["t_TestDrive_Cycle_SchoolYear"].map(objCycleStateItem => {
                                if (objCycleStateItem["iSchoolYearId"] === objSchoolYear["iSchoolYearId"]) {
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
            if (objContext.state.arrSelectedData.filter(objSelectedItem => objSelectedItem["uTestId"] === objTestData["uTestId"]).length > 0) {// if length is greater than 0 then search for particular test and update the t_TestDrive_Cycle_State and rest just return
                objContext.state.arrSelectedData.forEach(objSelectedItem => {
                    if (objSelectedItem["uTestId"] === objTestData["uTestId"]) {
                        let objData = {
                            ...objSelectedItem,
                            ["t_TestDrive_Cycle_SchoolYear"]: [...objSelectedItem["t_TestDrive_Cycle_SchoolYear"], {
                                ["iSchoolYearId"]: objSchoolYear.iSchoolYearId,
                                ["uCycleId"]: objContext.state.strCycleId,
                                ["uTestId"]: objTestData["uTestId"],
                                ["vAction"]: blnIsCheckBoxChecked ? "Add" : "Delete",
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
                    ["uTestId"]: objTestData["uTestId"],
                    ["t_TestDrive_Cycle_SchoolYear"]: [{
                        ["iSchoolYearId"]: objSchoolYear.iSchoolYearId,
                        ["uCycleId"]: objContext.state.strCycleId,
                        ["uTestId"]: objTestData["uTestId"],
                        ["vAction"]: blnIsCheckBoxChecked ? "Add" : "Delete",
                    }]
                };
                arrNewData = [...objContext.state.arrSelectedData, objData];
            }
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedData": arrNewData } });
    }


    /**
* @param {*} objContext
* @param {*} intRowIndex
* @param {*} intColumnIndex
* @summary changes states according to header checkbox selected
*/
    OnHeaderCheckBoxClick(Event, objContext, objTestData) {
        let arrSelectedData = objContext.state.arrTestData.filter(objTest => objTest["uTestId"].toUpperCase() === objTestData["uTestId"].toUpperCase())[0];
        let arrSchoolYear = objContext.props.Object_Extranet_Teacher_SchoolYear["Data"].filter(objNode => objNode["cIsDeleted"] == "N" );
        let arrTempCheckedData = [];
        if (Event.target.checked) {
            arrSchoolYear.map((objSchoolYearItem) => {
                var objcheckchange = arrSelectedData["t_TestDrive_Cycle_SchoolYear"].filter(objNode => objNode["iSchoolYearId"] == objSchoolYearItem["iSchoolYearId"])[0];
                if (objcheckchange != undefined) {
                    arrTempCheckedData.push({ ...objcheckchange, "vAction": "Add" }) //= [...arrTempCheckedData, { ...objcheckchange, ...{ "vAction": "Delete" } }];
                }
                else {
                    let objData = {
                        //["uTestId"]: objTestData["uTestId"],
                        //["t_TestDrive_Cycle_SchoolYear"]: [{
                        ["iSchoolYearId"]: objSchoolYearItem["iSchoolYearId"],
                        ["uCycleId"]: objContext.state.strCycleId,
                        ["uTestId"]: objTestData["uTestId"],
                        ["vAction"]: "Add"
                        // }]
                    };
                    arrTempCheckedData = [...arrTempCheckedData, objData];

                }
            })
            let arrnewSelectedData = [];
            if (objContext.state.arrSelectedData.filter(objTestData => objTestData["uTestId"].toUpperCase() === objTestData["uTestId"].toUpperCase()).length != 0) {
                objContext.state.arrSelectedData.map((objSelected) => {
                    if (objSelected["uTestId"].toUpperCase() === objTestData["uTestId"].toUpperCase()) {
                        arrnewSelectedData = [...arrnewSelectedData, { ...objSelected, ["t_TestDrive_Cycle_SchoolYear"]: arrTempCheckedData }]
                    }
                    else {
                        arrnewSelectedData = [...arrnewSelectedData, { ...objSelected }]
                    }
                })
            }
            else {
                arrnewSelectedData = objContext.state.arrSelectedData;
                arrnewSelectedData = [...arrnewSelectedData, {
                    ["uTestId"]: objTestData["uTestId"],
                    ["t_TestDrive_Cycle_SchoolYear"]: arrTempCheckedData
                }]
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedData": arrnewSelectedData } });
        }
        else {
            arrSchoolYear.map((objSchoolYearItem) => {
                var objcheckchange = arrSelectedData["t_TestDrive_Cycle_SchoolYear"].filter(objNode => objNode["iSchoolYearId"] == objSchoolYearItem["iSchoolYearId"])[0];
                if (objcheckchange != undefined) {
                    arrTempCheckedData.push({ ...objcheckchange, "vAction": "Delete" }) //= [...arrTempCheckedData, { ...objcheckchange, ...{ "vAction": "Delete" } }];
                }
                else {
                    let objData = {
                        //["uTestId"]: objTestData["uTestId"],
                        //["t_TestDrive_Cycle_SchoolYear"]: [{
                        ["iSchoolYearId"]: objSchoolYearItem["iSchoolYearId"],
                        ["uCycleId"]: objContext.state.strCycleId,
                        ["uTestId"]: objTestData["uTestId"],
                        ["vAction"]: "Delete"
                        // }]
                    };
                    arrTempCheckedData = [...arrTempCheckedData, objData];

                }
            })
            let arrnewSelectedData = [];
            if (objContext.state.arrSelectedData.filter(objTestData => objTestData["uTestId"].toUpperCase() === objTestData["uTestId"].toUpperCase()).length != 0) {
                objContext.state.arrSelectedData.map((objSelected) => {
                    if (objSelected["uTestId"].toUpperCase() === objTestData["uTestId"].toUpperCase()) {
                        arrnewSelectedData = [...arrnewSelectedData, { ...objSelected, ["t_TestDrive_Cycle_SchoolYear"]: arrTempCheckedData }]
                    }
                    else {
                        arrnewSelectedData = [...arrnewSelectedData, { ...objSelected }]
                    }
                })
            }
            else {
                arrnewSelectedData = objContext.state.arrSelectedData;
                arrnewSelectedData = [...arrnewSelectedData, {
                    ["uTestId"]: objTestData["uTestId"],
                    ["t_TestDrive_Cycle_SchoolYear"]: arrTempCheckedData
                }]
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedData": arrnewSelectedData } });
        }

    }





    /**
      * @name SaveData
      * @param {object} objContext takes objContext
      * @param {boolean} blnClose sends true when SaveAndClosed is pressed
      * @summary hits the add/edit api after validation succeeds
      */
    SaveData(objContext) {
        let arrAddData = [];
        objContext.state.arrSelectedData.forEach(objSeletectedElement => {
            let arrSubData = objSeletectedElement["t_TestDrive_Cycle_SchoolYear"].filter(objItem => objItem["vAction"] !== "");
            if (arrSubData.length > 0) {
                arrAddData = [...arrAddData, { ...objSeletectedElement, ["t_TestDrive_Cycle_SchoolYear"]: arrSubData }];
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
            "SaveMethod": () => objContext.CycleSchoolYear_ModuleProcessor.SaveData(objContext),
        };
        ApplicationState.SetProperty("OfficeRibbonData", CycleSchoolYear_OfficeRibbon.GetCycleSchoolYearOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
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

export default CycleSchoolYear_ModuleProcessor;