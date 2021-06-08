//Module specific imports
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Intranet_Task_TaskDifficultyLevel from '@shared/Object/c.Intranet/2_Task/Task/TaskDifficultyLevel/TaskDifficultyLevel';


/**
 * @name LearningTestSettings_ModuleProcessor
 * @summary module processor for  learning test creation.
 * */
class LearningTestSettings_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Intranet_Task_TaskDifficultyLevel", "Object_Extranet_Teacher_SchoolYear"];
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
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestTeacher/LearningTestTeacherPopups/LearningTestSettings/LearningTestSettings.css"
        ];
    };

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        let iSchoolYear = props.Data.ClassDetails["iSchoolYear"];
        //School Year.
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
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParams)
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
        return arrDataRequest;
    };

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData(objContext) {
        return {
            HeaderIds: [`EditorPopup_Header_Id${objContext.props.modalUId}`, "LearningTestSettingsHeader"],
            FooterIds: [`EditorPopup_Footer_Id${objContext.props.modalUId}`, "LearningTestSettingsFooter"]
        };
    }

    /**
    * @name GetTaskDifficultyLevelData
    * @param {*} objContext 
    * @summary   Returns the task difficulty level data.
    */
    GetTaskDifficultyLevelData(objContext) {
        let arrData = DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel).Data;
        let arrFilteredData = [];
        arrData.map(objTempData => {
            let arrTaskDifficultyLevelData = objTempData["t_TestDrive_Task_TaskDifficultyLevel_Data"].filter(objTempTaskDifficultyLevelData => objTempTaskDifficultyLevelData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId));
            arrFilteredData = [...arrFilteredData, { ...objTempData, ["t_TestDrive_Task_TaskDifficultyLevel_Data"]: arrTaskDifficultyLevelData, ["blnShow"]: true }];
        });
        if (objContext.props.Data.blnIsNTSubjectSelected) {
            arrFilteredData[0]["blnShow"] = false;
            arrFilteredData[arrFilteredData.length - 1]["blnShow"] = false;
        }
        Logger.Log("/*/*/*/*/*/*/*/*/*arrFilteredData", arrFilteredData);
        return arrFilteredData;
    };

    /**
     * @name GetTaskDifficultyLevelDataWithNumberOfTasks
     * @param {*} objContext 
     * @summary   Returns the task difficulty level data with task per level and the number of task per level(count).
     */
    GetTaskDifficultyLevelDataWithNumberOfTasks(objContext) {
        let objSchoolYearDetails = this.GetSchoolYearDetails(objContext);
        let arrTaskDifficultyLevelData = this.GetTaskDifficultyLevelData(objContext);
        let arrTasks = objContext.props.Events.GetTaskData();
        let arrData = arrTaskDifficultyLevelData.map(objTempData => {
            let intNumberOfTasks = arrTasks.filter(objTempTaskData =>
                objTempTaskData["t_TestDrive_Task_AssignedTaskDifficultyLevel"] != undefined &&
                objTempTaskData["t_TestDrive_Task_AssignedTaskDifficultyLevel"].filter(objTempAssignedTaskDifficultyLevelData =>
                    (objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === -1 || objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === objSchoolYearDetails["iSchoolYearId"]) &&
                    objTempAssignedTaskDifficultyLevelData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]).length > 0).length;
            return { ...objTempData, ["NoOfTasks"]: intNumberOfTasks };
        });
        return arrData;
    };

    /**
     * @name GetSchoolYearDetails
     * @param {*} objContext 
     * @summary   Returns the school year details.
     */
    GetSchoolYearDetails(objContext) {
        let arrData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;iSchoolYear;" + objContext.props.Data.ClassDetails["iSchoolYear"] + ";cIsDeleted;N").Data;
        let objSchoolYearDetails = arrData[0];
        return objSchoolYearDetails;
    };

    /**
     * @name OnChangeTestName
     * @param {*} objContext 
     * @param {*} strValue 
     * @summary   Trigerred when the test name is changed.
     */
    OnChangeTestName(objContext, strValue) {
        if (strValue === "") {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowValidationBorderForTestName": true, "strTestName": strValue } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowValidationBorderForTestName": false, "strTestName": strValue } });
        }
    };

    /**
     * @name OnChangeNumberOfTasks
     * @param {*} objContext 
     * @param {*} Value 
     * @param {*} objData 
     * @summary   Trigerred when the number of task is changed.
     */
    OnChangeNumberOfTasks(objContext, Value, objData) {
        let intMaxValue = objData["NoOfTasks"];
        let iDisplayOrder = objData["iDisplayOrder"];
        let blnDisableTextBoxes = false;
       
        if (Value === "") {
            let arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData => objTempData["iDisplayOrder"] !== iDisplayOrder);
            let arrNewData = arrData.sort((a, b) => { return a.iDisplayOrder - b.iDisplayOrder });
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedNumberOfTasksPerLevel": arrNewData, "blnDisableTextBoxes": blnDisableTextBoxes} });
        }
        else if (Value !== "0" && (!isNaN(parseInt(Value)) && parseInt(Value) > 0 && parseInt(Value) <= intMaxValue)) {
            if (!isNaN(parseInt(Value))) {
                Value = parseInt(Value);
            }
            let arrData = [];
            if (objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData => objTempData["iDisplayOrder"] === iDisplayOrder).length > 0) {
                arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.map(objTempData => {
                    if (objTempData["iDisplayOrder"] === iDisplayOrder) {
                        return { ...objTempData, ["intValue"]: Value };
                    }
                    else {
                        return objTempData;
                    }
                });
            }
            else {
                arrData = [...objContext.state.arrSelectedNumberOfTasksPerLevel, { ...objData, ["intValue"]: Value }];
            }
            let arrNewData = arrData.sort((a, b) => { return a.iDisplayOrder - b.iDisplayOrder });
            if (objContext.props.Data.blnIsNTCheckBoxSelected) {
                blnDisableTextBoxes = true;
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedNumberOfTasksPerLevel": arrNewData, "blnDisableTextBoxes": blnDisableTextBoxes} });
        }
        
    };

    /**
     * @name CreateTaskSet
     * @param {*} objContext 
     * @summary   Invokes the 'OnClickCreateTaskSet' event in the props.
     */
    CreateTaskSet(objContext) {
        let strTestName = objContext.state.strTestName ? objContext.state.strTestName.trim() : "";
        if (strTestName === "") {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowValidationBorderForTestName": true } });
        }
        else if (strTestName !== "" && objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData => objTempData["intValue"].toString() !== "").length > 0) {
            let objSchoolYearDetails = this.GetSchoolYearDetails(objContext);
            let arrTasks = objContext.props.Events.GetTaskData();
            let arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.map(objTempData => {
                let arrDataForDifficultyLevel = arrTasks.filter(objTempTaskData =>
                    objTempTaskData["t_TestDrive_Task_AssignedTaskDifficultyLevel"].filter(objTempAssignedTaskDifficultyLevelData =>
                        (objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === -1 || objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === objSchoolYearDetails["iSchoolYearId"]) &&
                        objTempAssignedTaskDifficultyLevelData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]).length > 0);
                let intNoOfTasks = 1;
                let objTask = {};
                let arrTemp = [];
                while (intNoOfTasks <= objTempData.intValue) {
                    objTask = arrDataForDifficultyLevel[Math.floor(Math.random() * arrDataForDifficultyLevel.length)]
                    arrDataForDifficultyLevel.splice(arrDataForDifficultyLevel.indexOf(objTask), 1);
                    arrTemp.push(objTask);
                    intNoOfTasks++;
                }
                return { ...objTempData, ["NoOfTasks"]: arrTemp.length, ["arrTaskDataPerDifficultyLevel"]: arrTemp };
            });
            Logger.Log("/*/*/*/*/*/*/*/*/arrSelectedTaskData", arrData);
            Popup.ClosePopup(objContext.props.Id);
            objContext.props.Events.OnClickCreateTaskSet({ "SelectedNumberOfTasksPerLevel": arrData, "TestName": objContext.state.strTestName });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowVlaidationMessage": false } });
        }
        else {
            Popup.ClosePopup(objContext.props.Id);
            objContext.props.Events.OnClickCreateTaskSet({ "SelectedNumberOfTasksPerLevel": [], "TestName": objContext.props.Data.TestName });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowVlaidationMessage": true } });
        }
    };

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown" ],
            "Files": []
        }
    }

}

export default LearningTestSettings_ModuleProcessor 
