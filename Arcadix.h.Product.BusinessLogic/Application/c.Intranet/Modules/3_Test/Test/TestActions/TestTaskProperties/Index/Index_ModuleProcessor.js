//Module Objects
import Intranet_Test_TestTaskProperties_Module from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/TestTaskProperties_Module';
import * as AddEditIndex_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/AddEditIndex/AddEditIndex_MetaData';

/**
* @name Index_ModuleProcessor
* @param NA
* @summary Class for CompetencyRange module display.
* @return NA
*/
class Index_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/TestTaskProperties",
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

        let arrResourceParams = ["/c.Intranet/Modules/3_Test/TestTaskProperties"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);

        //Object_Intranet_Task_TaskIndexDisplay.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskIndexDisplay];

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
            RowData: objContext.state.arrtasktotestData,
            LanguageData: objContext.Index_ModuleProcessor.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),
        };
        return objData;
    }

    /**
     * @name GetCallBackforGrid
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    GetCallBackforGrid(objRow, objContext) {
        console.log(objRow);
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props);
        var vTaskIndexDisplayText = objTextResource["TaskIndexDisplay"].filter(obj => obj["iTaskIndexDisplayId"] == objRow["iTaskIndexDisplayId"]);
        return { ...objRow, "PageName": objRow["TaskProperties"]["vPageName"], "PageType": "Test", "vTaskIndexDisplayText": vTaskIndexDisplayText.length > 0 ? vTaskIndexDisplayText[0]["vTaskIndexDisplayText"]:"" };
    }

    /**
* @name MoveSelectedRow
* @param {any} objContext
* @summary Return Grid data
* @returns {object} Grid data
*/
    MoveSelectedRow(objContext, strDirection) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["IndexGrid"];
        let objOtherData = "";
        var iOrderId = arrSelectedRows[0]["iOrderId"];
        let arrnewtesttotaskdata = new Array;
        if (strDirection == "Up") {
            iOrderId--;
            if (iOrderId <= 0) {
                return false;
            }
            arrnewtesttotaskdata.push({ ...objContext.state.arrtasktotestData[iOrderId], "iOrderId": iOrderId, "vAction": "Edit" });
            arrnewtesttotaskdata.push({ ...objContext.state.arrtasktotestData[iOrderId - 1], "iOrderId": iOrderId + 1, "vAction": "Edit" });
            objOtherData = objContext.state.arrtasktotestData.filter(objTaskToTestData => objTaskToTestData.iOrderId !== iOrderId && objTaskToTestData.iOrderId !== iOrderId + 1);
        } else {
            iOrderId++;
            if (iOrderId >= objContext.state.arrtasktotestData.length + 1) {
                return false;
            }
            arrnewtesttotaskdata.push({ ...objContext.state.arrtasktotestData[iOrderId - 2], "iOrderId": iOrderId, "vAction": "Edit" });
            arrnewtesttotaskdata.push({ ...objContext.state.arrtasktotestData[iOrderId - 1], "iOrderId": iOrderId - 1, "vAction": "Edit" });
            objOtherData = objContext.state.arrtasktotestData.filter(objTaskToTestData => objTaskToTestData.iOrderId !== iOrderId && objTaskToTestData.iOrderId !== iOrderId - 1);
        }
        arrnewtesttotaskdata.push(...objOtherData);
        arrnewtesttotaskdata.sort(function (a, b) {
            if (a.iOrderId < b.iOrderId) {
                return -1
            }
            else
                return 1;
        });
        let objTestTaskParams = {
            "SortKeys": [
                {
                    "iOrderId": {
                        "order": "asc"
                    }
                }
            ],
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objContext.props.Data.TestData.uTestId
                        }
                    }
                ]
            },
            "vEditData": arrnewtesttotaskdata,
            "uTestId": objContext.props.Data.TestData.uTestId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objTestTaskParams, "Put", (objReturn, blnEdited) => {
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "IndexGrid": [{ ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.props.Data.TestData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == arrSelectedRows[0].iTestTaskId)[0] }] });
            objContext.props.Event.onEditComplete({ ...objReturn["Object_Intranet_Test_IntranetTestTask"]["Object_Intranet_Test_IntranetTestTask;uTestId;" + objContext.props.Data.TestData.uTestId]["Data"].filter(obj => obj["iTestTaskId"] == arrSelectedRows[0].iTestTaskId)[0] });

        });

    }

    /**
    * @name SaveData
    * @param {any} objContext
    * @summary Return Grid data
    * @returns {object} Grid data
    */
    SaveData(objContext) {
        let objTestTaskParams = {
            "SortKeys": [
                {
                    "iOrderId": {
                        "order": "asc"
                    }
                }
            ],
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objContext.props.Data.TestData.uTestId
                        }
                    }
                ]
            },
            "vEditData": objContext.state.arrtasktotestData,
            "uTestId": objContext.props.Data.TestData.uTestId
        };

        ArcadixFetchData.ExecuteSingle("API/Object/Intranet/Test/IntranetTestTask", objTestTaskParams, "Put", (objReturn, blnEdited) => {
            let objTestTaskParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "uTestId": objContext.props.Data.TestData.uTestId
                            }
                        }
                    ]
                },
                "iSubjectId": objContext.props.Data.TestData.iSubjectId
            };
            ApplicationState.GetProperty("blnShowAnimation", true);
            Intranet_Test_TestTaskProperties_Module.GetAssignTaskToTestData(objTestTaskParams, (objData) => {
                ApplicationState.SetProperty("blnShowAnimation", true);
                objContext.dispatch({ type: "SET_STATE", payload: { "arrtasktotestData": objData["AssignedTasks"].map(obj => { return { ...obj, ["vAction"]: "Edit" } }) } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
            if (blnEdited) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "IndexGrid": null });
            }

        })
    }


    /**
   * @name OpenAddEditPopup
   * @param {object} objContext passes Context object
   * @param {boolean} blnIsEdit is either edit or Add
   * @summary Call Confirmation popup for Deleting subject
   * @return null
   */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["IndexGrid"] : [];
        let intApplicationTypeForIndexData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.intParentSubjectId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForIndexData),
                    IsEdit: blnIsEdit,
                    TaskIndexDisplayDropDowndata: objContext.props.Object_Intranet_Task_TaskIndexDisplay["Data"]
                },
                Meta: {
                    PopupName: "AddEditIndex",
                    HeaderData: AddEditIndex_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                events: {
                    oneditcomplete: () => {
                        objContext.props.Event.onEditComplete()
                    }
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
   * @name GetDependingColumnData
   * @param {*} objContext objContext
   * @summary Return depending column Dropdown data
   * @returns {obj} depending column object
   */
    GetDependingColumnData(objContext) {
        let objTestProgressDisplayDropDownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iTaskIndexDisplayId",
            "DisplayColumn": "vTaskIndexDisplayText",
            "DependingTableName": "t_TestDrive_Test_TaskIndexDisplay_Data",
            "Data": []
        };

        objContext.props.Object_Intranet_Task_TaskIndexDisplay["Data"].map((objClient) => {
            objTestProgressDisplayDropDownData["Data"] = [...objTestProgressDisplayDropDownData["Data"], objClient];
        });
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props);
        return { "iTaskIndexDisplayId": objTextResource["TaskIndexDisplay"] };
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStlyes(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/TestTaskProperties.css"
        ];
    }


}

export default Index_ModuleProcessor;