//Module object imports.
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Intranet_Task_TaskDifficultyLevel from '@shared/Object/c.Intranet/2_Task/Task/TaskDifficultyLevel/TaskDifficultyLevel';
import Object_Editor_TaskContent_CMSPageContent from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPageContent';
import Extranet_Teacher_Interpretation_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation_Module';

//common imports.
import Object_Intranet_Test_ExtranetTest from '@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest';
import Object_Extranet_Shared_OpenApplicationCredential from '@shared/Object/d.Extranet/5_Shared/OpenApplicationCredential/OpenApplicationCredential';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name EditTasks_ModuleProcessor
 * @summary module processor for  Edit Tasks.
 * */
class EditTasks_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [
            "Object_Intranet_Task_TaskDifficultyLevel",
            "Object_Extranet_Teacher_SchoolYear",
            "Object_Extranet_Shared_OpenApplicationCredential",
            "Extranet_Teacher_Interpretation_Module",
            "Object_Cockpit_MainClient_ClientSettings"
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
    * @name GetDynamicStyles
    * @summary Css files specific to this module
    * @param {any} props
    * @returns {Array}
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestTeacher/LearningTestTeacherPopups/EditTasks/EditTasks.css"
        ];
    };

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {
        let iSchoolYear = props.Data.ClassDetails["iSchoolYear"];
        let arrDataRequest = [];
        //School Year
        let objSchoolYearParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iSchoolYear": iSchoolYear
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "desc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        let objTaskDifficultyLevelParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        }
        Object_Intranet_Task_TaskDifficultyLevel.Initialize(objTaskDifficultyLevelParams)
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskDifficultyLevel];
        let objClientUrlParams = {
            "vTargetType": "FusionTestApplication"
        };
        Object_Extranet_Shared_OpenApplicationCredential.GetGateKeeperUrl(objClientUrlParams, () => { });

        return arrDataRequest;
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData(objContext) {
        return {
            HeaderIds: [`EditorPopup_Header_Id${objContext.props.modalUId}`, "EditTasksHeader", "EditTasksTableHeader", "slider-header"],
            FooterIds: [`EditorPopup_Footer_Id${objContext.props.modalUId}`, "edit-task-popup-footer"]
        };
    }

    /**
    * @name GetSchoolYearDetails
    * @param {*} objContext 
    * @summary   Rteuns the school year details.
    */
    GetSchoolYearDetails(objContext) {
        let arrData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;iSchoolYear;" + objContext.props.Data.ClassDetails["iSchoolYear"] + ";cIsDeleted;N").Data;
        let objSchoolYearDetails = arrData[0];
        return objSchoolYearDetails;
    };

    /**
     * @name GetTaskDifficultyLevelData
     * @param {*} objContext 
     * @param {*} intTaskDifficultyLevelId //if passed then the functions returns the data for that difficulty.
     * @summary   Returns the task difficulty level data.
     */
    GetTaskDifficultyLevelData(objContext, intTaskDifficultyLevelId = -1) {
        let arrFilteredData = [];
        let arrData = [];
        switch (intTaskDifficultyLevelId) {
            case -1:
                arrData = DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel).Data;
                arrData.map(objTempData => {
                    let arrTaskDifficultyLevelData = objTempData["t_TestDrive_Task_TaskDifficultyLevel_Data"].filter(objTempTaskDifficultyLevelData => objTempTaskDifficultyLevelData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId));
                    arrFilteredData = [...arrFilteredData, { ...objTempData, ["t_TestDrive_Task_TaskDifficultyLevel_Data"]: arrTaskDifficultyLevelData }];
                });
                break;
            default:
                arrData = DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel).Data.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === intTaskDifficultyLevelId);
                arrData.map(objTempData => {
                    let arrTaskDifficultyLevelData = objTempData["t_TestDrive_Task_TaskDifficultyLevel_Data"].filter(objTempTaskDifficultyLevelData => objTempTaskDifficultyLevelData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId));
                    arrFilteredData = [...arrFilteredData, { ...objTempData, ["t_TestDrive_Task_TaskDifficultyLevel_Data"]: arrTaskDifficultyLevelData }];
                });
        }
        return arrFilteredData;
    };

    /**
     * @name GetTaskDifficultyLevelDataWithTasks
     * @param {*} objContext 
     * @param {*} intTaskDifficultyLevelId 
     * @summary   Returns the difficulty level data with the task per level of difficulty and the number of tasks(count) for each difficulty.
     */
    GetTaskDifficultyLevelDataWithTasks(objContext, intTaskDifficultyLevelId = -1) {
        let objSchoolYearDetails = this.GetSchoolYearDetails(objContext);
        let arrTaskDifficultyLevelData = [];
        switch (intTaskDifficultyLevelId) {
            case -1:
                arrTaskDifficultyLevelData = this.GetTaskDifficultyLevelData(objContext);
                break;
            default:
                arrTaskDifficultyLevelData = this.GetTaskDifficultyLevelData(objContext, intTaskDifficultyLevelId);
        }
        let arrTasks = objContext.props.Events.GetTaskData();
        let arrData = arrTaskDifficultyLevelData.map(objTempData => {
            let arrTaskDataPerDifficultyLevel = arrTasks.filter(objTempTaskData =>
                objTempTaskData["t_TestDrive_Task_AssignedTaskDifficultyLevel"].filter(objTempAssignedTaskDifficultyLevelData =>
                    (objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === -1 || objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === objSchoolYearDetails["iSchoolYearId"]) &&
                    objTempAssignedTaskDifficultyLevelData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]).length > 0);
            let intNumberOfTasks = arrTaskDataPerDifficultyLevel.length;
            return { ...objTempData, ["NoOfTasks"]: intNumberOfTasks, ["arrTaskDataPerDifficultyLevel"]: arrTaskDataPerDifficultyLevel, ["blnShow"]: true };
        });
        if (objContext.props.Data.blnIsNTSubjectSelected) {
            arrData[0]["blnShow"] = false;
            arrData[arrData.length - 1]["blnShow"] = false;
            if (objContext.state.blnIsNTCheckBoxSelected) {
                arrData.filter(x => x["blnShow"])
                    .forEach(objTempData => {
                        let arrTempData = objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempSelectedData =>
                            objTempSelectedData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]);
                        objTempData["blnShow"] = arrTempData.length > 0 && arrTempData[0]["NoOfTasks"] > 0
                    });
            }
        }
        return arrData;
    };

    /**
     * @name GetPreviousData
     * @param {*} objContext 
     * @summary   Triigerred when the previous button is clicked.
     */
    GetPreviousData(objContext) {
        let objCurrentTaskDifficultyLevelDataWithTasksDetails = { ...objContext.state.objPreviousData };
        let objPreviousTaskDifficultyLevelDataWithTasksDetails = {};
        let objNextTaskDifficultyLevelDataWithTasksDetails = { ...objContext.state.objCurrentData };
        let intIndex = -1;
        let arrTaskDifficultyLevelDataWithTasks = [];
        let arrTempData = [];
        switch (objContext.state.Tab) {
            case -1:
                arrTaskDifficultyLevelDataWithTasks = this.GetTaskDifficultyLevelDataWithTasks(objContext);
                arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
                intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objPreviousData["iPageId"]);
                if (intIndex > 0) {
                    objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex - 1];
                }
                else {
                    arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] < objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0 && objTempData["iDisplayOrder"] < arrTempData[0]["iDisplayOrder"]);
                    if (arrTempData.length > 0) {
                        objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
                    }
                }
                break;
            case -2:
                arrTaskDifficultyLevelDataWithTasks = objContext.state.arrSelectedNumberOfTasksPerLevel;
                arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
                intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objPreviousData["iPageId"]);
                if (intIndex > 0) {
                    objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex - 1];
                }
                else {
                    arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] < objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0 && objTempData["iDisplayOrder"] < arrTempData[0]["iDisplayOrder"]);
                    if (arrTempData.length > 0) {
                        objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
                    }
                }
                break;
            default:
                arrTaskDifficultyLevelDataWithTasks = this.GetTaskDifficultyLevelDataWithTasks(objContext, objContext.state.Tab);
                intIndex = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objPreviousData["iPageId"]);
                if (intIndex - 1 > -1) {
                    objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"][intIndex - 1];
                }
        }
        return {
            "objCurrentTaskDifficultyLevelDataWithTasksDetails": objCurrentTaskDifficultyLevelDataWithTasksDetails,
            "objPreviousTaskDifficultyLevelDataWithTasksDetails": objPreviousTaskDifficultyLevelDataWithTasksDetails,
            "objNextTaskDifficultyLevelDataWithTasksDetails": objNextTaskDifficultyLevelDataWithTasksDetails
        }
    }

    /**
     * @name GetNextData
     * @param {*} objContext 
     * @summary   Trigerred when the next button is clicked.
     */
    GetNextData(objContext) {
        let objCurrentTaskDifficultyLevelDataWithTasksDetails = { ...objContext.state.objNextData };
        let objPreviousTaskDifficultyLevelDataWithTasksDetails = { ...objContext.state.objCurrentData };
        let objNextTaskDifficultyLevelDataWithTasksDetails = {};
        let intIndex = -1;
        let arrTaskDifficultyLevelDataWithTasks = [];
        let arrTempData = [];
        switch (objContext.state.Tab) {
            case -1:
                arrTaskDifficultyLevelDataWithTasks = this.GetTaskDifficultyLevelDataWithTasks(objContext);
                arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
                intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objNextData["iPageId"]);
                if (arrTempData[0]["NoOfTasks"] > (intIndex + 1)) {
                    objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex + 1];
                }
                else {
                    arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] > objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0);
                    if (arrTempData.length > 0) {
                        objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
                    }
                }
                break;
            case -2:
                arrTaskDifficultyLevelDataWithTasks = objContext.state.arrSelectedNumberOfTasksPerLevel;
                arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
                intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objNextData["iPageId"]);
                if (arrTempData[0]["NoOfTasks"] > (intIndex + 1)) {
                    objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex + 1];
                }
                else {
                    arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] > objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0);
                    if (arrTempData.length > 0) {
                        objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
                    }
                }
                break;
            default:
                arrTaskDifficultyLevelDataWithTasks = this.GetTaskDifficultyLevelDataWithTasks(objContext, objContext.state.Tab);
                intIndex = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objNextData["iPageId"]);
                if (intIndex + 1 <= arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"].length) {
                    objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"][intIndex + 1];
                }
        }
        return {
            "objCurrentTaskDifficultyLevelDataWithTasksDetails": objCurrentTaskDifficultyLevelDataWithTasksDetails,
            "objPreviousTaskDifficultyLevelDataWithTasksDetails": objPreviousTaskDifficultyLevelDataWithTasksDetails,
            "objNextTaskDifficultyLevelDataWithTasksDetails": objNextTaskDifficultyLevelDataWithTasksDetails
        }
    }

    /**
     * @name TraverseData
     * @param {*} objContext 
     * @param {*} strTraversalDirection 
     * @summary   Trigerred when any of the traversing button is clicked.
     */
    TraverseData(objContext, strTraversalDirection) {
        strTraversalDirection = strTraversalDirection.toUpperCase();
        let objData = [];
        switch (strTraversalDirection) {
            case "PREVIOUS":
                objData = this.GetPreviousData(objContext);
                break;
            case "NEXT":
                objData = this.GetNextData(objContext);
                break;
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "objCurrentData": objData["objCurrentTaskDifficultyLevelDataWithTasksDetails"], "objPreviousData": objData["objPreviousTaskDifficultyLevelDataWithTasksDetails"], "objNextData": objData["objNextTaskDifficultyLevelDataWithTasksDetails"] } });
    };

    /**
     * @name ChangeTab
     * @param {*} objContext 
     * @param {*} intTaskDifficultyLevelId 
     * @param {*} arrSelectedNumberOfTasksPerLevel 
     * @summary   Trigerred when the Tab is changed.
     */
    ChangeTab(objContext, intTaskDifficultyLevelId, arrSelectedNumberOfTasksPerLevel = []) {
        if (intTaskDifficultyLevelId !== objContext.state.Tab) {
            let objCurrentTaskDifficultyLevelDataWithTasksDetails = {};
            let objPreviousTaskDifficultyLevelDataWithTasksDetails = {};
            let objNextTaskDifficultyLevelDataWithTasksDetails = {};
            let arrTaskDifficultyLevelDataWithTasks = [];
            switch (intTaskDifficultyLevelId) {
                case -1:
                    arrTaskDifficultyLevelDataWithTasks = this.GetTaskDifficultyLevelDataWithTasks(objContext);
                    if (arrTaskDifficultyLevelDataWithTasks.length > 0) {
                        let intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                        if (intIndex > -1) {
                            objCurrentTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                            if (arrTaskDifficultyLevelDataWithTasks[intIndex]["NoOfTasks"] > 1) {
                                objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][1];
                            }
                            else {
                                arrTaskDifficultyLevelDataWithTasks = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== arrTaskDifficultyLevelDataWithTasks[intIndex]["iTaskDifficultyLevelId"]);
                                if (arrTaskDifficultyLevelDataWithTasks.length > 0) {
                                    intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                                    if (intIndex > -1) {
                                        objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                                    }
                                }
                            }
                        }
                    }
                    break;
                case -2:
                    if (arrSelectedNumberOfTasksPerLevel.length === 0) {
                        arrTaskDifficultyLevelDataWithTasks = objContext.state.arrSelectedNumberOfTasksPerLevel;
                    }
                    else {
                        arrTaskDifficultyLevelDataWithTasks = arrSelectedNumberOfTasksPerLevel;
                    }
                    if (arrTaskDifficultyLevelDataWithTasks.length > 0) {
                        let intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                        if (intIndex > -1) {
                            objCurrentTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                            if (arrTaskDifficultyLevelDataWithTasks[intIndex]["NoOfTasks"] > 1) {
                                objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][1];
                            }
                            else {
                                arrTaskDifficultyLevelDataWithTasks = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== arrTaskDifficultyLevelDataWithTasks[intIndex]["iTaskDifficultyLevelId"]);
                                if (arrTaskDifficultyLevelDataWithTasks.length > 0) {
                                    intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                                    if (intIndex > -1) {
                                        objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                                    }
                                }
                            }
                        }
                    }
                    break;
                default:
                    arrTaskDifficultyLevelDataWithTasks = this.GetTaskDifficultyLevelDataWithTasks(objContext, intTaskDifficultyLevelId);
                    if (arrTaskDifficultyLevelDataWithTasks.length > 0 && arrTaskDifficultyLevelDataWithTasks[0]["NoOfTasks"] > 0) {
                        objCurrentTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"][0];
                        if (arrTaskDifficultyLevelDataWithTasks[0]["NoOfTasks"] > 1) {
                            objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"][1];
                        }
                    }
            }
            if (arrSelectedNumberOfTasksPerLevel.length > 0 && intTaskDifficultyLevelId === -2) {
                objContext.dispatch({ type: "SET_STATE", payload: { "Tab": intTaskDifficultyLevelId, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, "arrSelectedNumberOfTasksPerLevel": arrSelectedNumberOfTasksPerLevel, isLoadComplete: true } });
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { "Tab": intTaskDifficultyLevelId, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, isLoadComplete: true } });
            }
        }
    };

    /**
     * @name OnChangeCheck
     * @param {*} objContext 
     * @param {*} blnIsChecked 
     * @param {*} objTaskDifficultyLevelDataWithTasksDetails 
     * @summary   Trigerred when the task is selected or deselected.
     */
    OnChangeCheck(objContext, blnIsChecked, objTaskDifficultyLevelDataWithTasksDetails) {
        let arrTaskDifficultyLevelDataWithTasks = this.GetTaskDifficultyLevelDataWithTasks(objContext, objTaskDifficultyLevelDataWithTasksDetails["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
        let objData = arrTaskDifficultyLevelDataWithTasks[0];
        let arrData = [];
        let arrNewData = [];
        if (blnIsChecked) {
            let iDisplayOrder = objData["iDisplayOrder"];
            if (objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData => objTempData["iDisplayOrder"] === iDisplayOrder).length > 0) {
                arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.map(objTempData => {
                    if (objTempData["iDisplayOrder"] === iDisplayOrder) {
                        return { ...objTempData, ["NoOfTasks"]: objTempData["arrTaskDataPerDifficultyLevel"].length + 1, ["arrTaskDataPerDifficultyLevel"]: [...objTempData["arrTaskDataPerDifficultyLevel"], objTaskDifficultyLevelDataWithTasksDetails] };
                    }
                    else {
                        return objTempData;
                    }
                });
            }
            else {
                arrData = [...objContext.state.arrSelectedNumberOfTasksPerLevel, { ...objData, ["NoOfTasks"]: 1, ["arrTaskDataPerDifficultyLevel"]: [objTaskDifficultyLevelDataWithTasksDetails] }];
            }
            arrNewData = arrData.sort((a, b) => { return a.iDisplayOrder - b.iDisplayOrder });
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedNumberOfTasksPerLevel": arrNewData, "blnShowVlaidationMessage": false } });
        }
        else {
            objContext.state.arrSelectedNumberOfTasksPerLevel.forEach(objTempData => {
                if (objTempData["iDisplayOrder"] === objData["iDisplayOrder"]) {
                    arrData = objTempData["arrTaskDataPerDifficultyLevel"].filter(objTempTaskDifficultyLevelWithTasksData => objTempTaskDifficultyLevelWithTasksData["iPageId"] !== objTaskDifficultyLevelDataWithTasksDetails["iPageId"]);
                    if (arrData.length > 0) {
                        arrNewData = [...arrNewData, { ...objTempData, ["NoOfTasks"]: objTempData["arrTaskDataPerDifficultyLevel"].length - 1, ["arrTaskDataPerDifficultyLevel"]: arrData }];
                    }
                }
                else {
                    arrNewData = [...arrNewData, objTempData];
                }
            });
            if (objContext.state.Tab === -2)//When Check/Un-Check is done from 'SelectedTask' Tab
            {
                let objCurrentTaskDifficultyLevelDataWithTasksDetails = {};
                let objPreviousTaskDifficultyLevelDataWithTasksDetails = {};
                let objNextTaskDifficultyLevelDataWithTasksDetails = {};
                let intFlag = 0;
                let arrTempData = [];
                let intIndex = -1;
                if (JSON.stringify(objContext.state.objPreviousData) !== '{}') {
                    objCurrentTaskDifficultyLevelDataWithTasksDetails = objContext.state.objPreviousData;
                    intFlag = 1;
                }
                else if (JSON.stringify(objContext.state.objNextData) !== '{}') {
                    objCurrentTaskDifficultyLevelDataWithTasksDetails = objContext.state.objNextData;
                    intFlag = 2;
                }
                switch (intFlag) {
                    case 0:
                        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedNumberOfTasksPerLevel": arrNewData, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, "blnShowVlaidationMessage": false } });
                        break;
                    case 1:
                        arrTaskDifficultyLevelDataWithTasks = arrNewData;
                        arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
                        intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objPreviousData["iPageId"]);
                        if (intIndex > 0) {
                            objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex - 1];
                        }
                        else {
                            arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0 && objTempData["iDisplayOrder"] < arrTempData[0]["iDisplayOrder"]);
                            if (arrTempData.length > 0) {
                                objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
                            }
                        }
                        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedNumberOfTasksPerLevel": arrNewData, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "blnShowVlaidationMessage": false } });
                        break;
                    case 2:
                        arrTaskDifficultyLevelDataWithTasks = arrNewData;
                        arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
                        intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objNextData["iPageId"]);
                        if (arrTempData[0]["NoOfTasks"] > (intIndex + 1)) {
                            objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex + 1];
                        }
                        else {
                            arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0);
                            if (arrTempData.length > 0) {
                                objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
                            }
                        }
                        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedNumberOfTasksPerLevel": arrNewData, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, "blnShowVlaidationMessage": false } });
                        break;
                }
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedNumberOfTasksPerLevel": arrNewData, "blnShowVlaidationMessage": false } });
            }
        }
    };

    /**
     * @name CreateTaskSet
     * @param {*} objContext 
     * @summary   Trigerrerd when the create task button is clicked. Invokes 'OnClickCreateTaskSet' event in the props.
     */
    CreateTaskSet(objContext) {
        if (objContext.state.arrSelectedNumberOfTasksPerLevel.length > 0) {
            Popup.ClosePopup(objContext.props.Id);
            objContext.props.Events.OnClickCreateTaskSet(objContext.state.arrSelectedNumberOfTasksPerLevel);
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowVlaidationMessage": false } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowVlaidationMessage": true } });
        }
    };

    /**
     * @name EditSavedTasks
     * @param {*} objContext 
     * @summary   Makes an api call for saving the tasks after editing the saved task.
     */
    EditSavedTasks(objContext) {
        if (objContext.props.Data.TestId && objContext.props.Data.EditSavedTasks) {
            let arrDataToEdit = [];
            let arrDataToDelete = [];
            objContext.state.arrSelectedNumberOfTasksPerLevel.forEach(objTempData => {
                let arrTasks = objContext.props.Data.SelectedNumberOfTasksPerLevel.filter(objTempDataTaskPerDifficulty => objTempDataTaskPerDifficulty["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]);
                objTempData["arrTaskDataPerDifficultyLevel"].forEach(objTempTaskData => {
                    if (arrTasks.length === 0 || arrTasks[0]["arrTaskDataPerDifficultyLevel"].find(x => x["iPageId"] === objTempTaskData["iPageId"]) === undefined) {
                        arrDataToEdit = [...arrDataToEdit,
                        {
                            "iPageId": objTempTaskData["iPageId"],
                            "vAction": "New"
                        }
                        ];
                    }
                });
            });
            objContext.props.Data.SelectedNumberOfTasksPerLevel.filter(objTempData => {
                let arrTasks = objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempDataTaskPerDifficulty => objTempDataTaskPerDifficulty["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]);
                objTempData["arrTaskDataPerDifficultyLevel"].forEach(objTempTaskData => {
                    if (arrTasks.length === 0 || arrTasks[0]["arrTaskDataPerDifficultyLevel"].find(x => x["iPageId"] === objTempTaskData["iPageId"]) === undefined) {
                        arrDataToDelete = [...arrDataToDelete,
                        {
                            "iPageId": objTempTaskData["iPageId"],
                            "vAction": "Delete"
                        }
                        ];
                    }
                });
            });
            let arrDataToSave = [...arrDataToEdit, ...arrDataToDelete];

            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iCycleTypeId": "3"
                            }
                        },
                        {
                            "match": {
                                "uClassId": objContext.props.Data.ClassDetails.uClassId
                            }
                        },
                        {
                            "match": {
                                "uSchoolYearPeriodId": ''
                            }
                        },
                        {
                            "match": {
                                "uTeacherId": ClientUserDetails.UserId,
                            }
                        }
                    ]
                },
                "uCycleId": objContext.props.Data.strCycleId,
                "uSchoolId": ClientUserDetails.TeacherDetails.uSchoolId,
                "iStateId": GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId),
                "vEditData": {
                    ...objContext.props.Data.TestObject,
                    "t_TestDrive_Test_TestProperty": [],
                    "t_TestDrive_Test_Category": [],
                    "t_TestDrive_Test_Competency": [],
                    "t_testdrive_Test_Tasks": arrDataToSave
                }
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Intranet_Test_ExtranetTest.EditData(objParams, (objResponse) => {
                Popup.ClosePopup(objContext.props.Id);
                objContext.props.Events.OnClickCreateTaskSet(objResponse);
                ApplicationState.SetProperty("blnShowAnimation", false);
            });

        }
    }

    /**
     * @nameGetPageJsonFromServer
     * @param{object}objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param{number}intPageId PageId for which PageJson needed to be fetched.
     * @param{number}intLanguageId Language id to load page.
     * @param{string}strUserId User id
     * @summary Makes call to get the page json from server.
     * @returns{object} Page json.
     */
    GetPageJsonFromServer(objContext, intPageId, intLanguageId) {
        if (intPageId == null) {
            return null;
        } else {
            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iPageId": intPageId
                            }
                        },
                        {
                            "match": {
                                "iLanguageId": intLanguageId
                            }
                        }
                    ]
                },
                "cIsForEditor": "Y"
            };

            let objResponse = {};
            Object_Editor_TaskContent_CMSPageContent.GetData(objParams).then((objResponse) => {
                objResponse = objResponse;
            }
            );
            let objPageJson = objResponse["Object_Editor_TaskContent_CMSPageContent;iPageId;" + intPageId + ";iLanguageId;" + intLanguageId]["Data"][0];
            return objPageJson ? objPageJson : null;
        }
    }

    GetPageJson(objContext, intPageId) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let strCompetencyKey = "EditTask";
        let objParam = {
            "PageIdList": [intPageId],
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "CompetencyKey": strCompetencyKey
                        }
                    },
                    {
                        "match": {
                            "iPageId": intPageId
                        }
                    }
                ]
            }
        };

        let strpageId = intPageId.toString();
        let arrInterpretationModuleData = [];
        if (objContext.props.Extranet_Teacher_Interpretation_Module && DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iPageId;" + strpageId).Data && DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iPageId;" + strpageId).Data.length > 0)
            arrInterpretationModuleData = DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iPageId;" + strpageId).Data;
        //call web api to get the page json
        let objReturn = null;
        if (arrInterpretationModuleData.length == 0) {
            Extranet_Teacher_Interpretation_Module.GetData(objParam, (objResponse) => {
                console.log("objResponse", objResponse);
                objReturn = objResponse["Extranet_Teacher_Interpretation_Module;CompetencyKey;EditTask;iPageId;" + strpageId].Data[0].PageJson;
                objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": objReturn } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        } else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": arrInterpretationModuleData[0].PageJson } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }

}

export default EditTasks_ModuleProcessor