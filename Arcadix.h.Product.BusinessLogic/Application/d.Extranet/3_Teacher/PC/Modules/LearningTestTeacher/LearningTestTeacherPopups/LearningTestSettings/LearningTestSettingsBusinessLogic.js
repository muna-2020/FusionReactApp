import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';


/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            taskdifficultylevel: DataRef(state.Entity, "taskdifficultylevel", true),
            schoolyear: DataRef(state.Entity, "schoolyear", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        Logger.Log("not mapping");
        return {};
    }
};

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props)
{
    let iSchoolYear = props.Data.ClassDetails["iSchoolYear"];
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
                    "order": "asc"
                }
            }
        ]
    };
    let arrParams = [
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYear",
            "Params": objSchoolYearParams,
            "MethodType": "GET"
        }
    ];
    return { 
        "DataCalls": arrParams
    };
};

/**
 * 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @summary   Call 'Execute' method to make the api call.
 */
export function DataCall(objContext, arrParams, strToggleExecute = 'FetchAndCacheExecute'){
    switch(strToggleExecute)
    {
        case 'FetchAndCacheExecute':
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
        break;
        case "FetchExecuteForTasks":
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                Logger.Log("/*/*/*/*/*/*/*/*/*/*/*/objReturn", objReturn);
                // let strKey = "task;cisdeleted;n;itasktypeid;1;itaskusageid;1;isubjectid;" + objContext.state.intSelectedSubSubjectId + ";t_CMS_Page_Data.t_Cms_Page_AssignedWorkflowStatus.cIsLatest;y;t_CMS_Page_Data.t_Cms_Page_AssignedWorkflowStatus.uWorkflowStatusId;FA66D530-23AD-452C-84DC-557BDCB91361";
                // let arrData = objReturn["task"][strKey.toLowerCase()]["Data"];
                // Logger.Log("/*/*/*/*/*/*/arrTasksData", arrData);
                // objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrTasks": arrData }});
            });
        break;
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext){
    useLayoutEffect(() => {
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, []);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    useEffect(() => {
        if(DataRef(objContext.props.taskdifficultylevel) && 
        DataRef(objContext.props.schoolyear, "schoolyear;iSchoolYear;" + objContext.props.Data.ClassDetails["iSchoolYear"] + ";cIsDeleted;N"))
        {
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "strTestName": objContext.props.Data.TestName, "arrSelectedNumberOfTasksPerLevel": objContext.props.Data.SelectedNumberOfTasksPerLevel }});
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.taskdifficultylevel, objContext.props.schoolyear]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the task difficulty level data.
 */
export function GetTaskDifficultyLevelData(objContext)
{
    let arrData = DataRef(objContext.props.taskdifficultylevel).Data;
    let arrFilteredData = [];
    arrData.map(objTempData => {
        let arrTaskDifficultyLevelData = objTempData["t_TestDrive_Task_TaskDifficultyLevel_Data"].filter(objTempTaskDifficultyLevelData => objTempTaskDifficultyLevelData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId));
        arrFilteredData = [...arrFilteredData, {...objTempData, ["t_TestDrive_Task_TaskDifficultyLevel_Data"]: arrTaskDifficultyLevelData}];
    });
    Logger.Log("/*/*/*/*/*/*/*/*/*arrFilteredData", arrFilteredData);
    return arrFilteredData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the task difficulty level data with task per level and the number of task per level(count).
 */
export function GetTaskDifficultyLevelDataWithNumberOfTasks(objContext)
{
    let objSchoolYearDetails = GetSchoolYearDetails(objContext);
    let arrTaskDifficultyLevelData = GetTaskDifficultyLevelData(objContext);
    let arrTasks = objContext.props.passedEvents.GetTaskData();
    let arrData = arrTaskDifficultyLevelData.map(objTempData => {
        let intNumberOfTasks = arrTasks.filter(objTempTaskData => 
            objTempTaskData["t_TestDrive_Task_AssignedTaskDifficultyLevel"].filter(objTempAssignedTaskDifficultyLevelData =>  
                (objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === -1 || objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === objSchoolYearDetails["iSchoolYearId"]) && 
                objTempAssignedTaskDifficultyLevelData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]).length > 0).length;
        return {...objTempData, ["NoOfTasks"]: intNumberOfTasks};
    });
    return arrData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the school year details.
 */
export function GetSchoolYearDetails(objContext)
{
    let arrData = DataRef(objContext.props.schoolyear, "schoolyear;iSchoolYear;" + objContext.props.Data.ClassDetails["iSchoolYear"] + ";cIsDeleted;N").Data;
    let objSchoolYearDetails = arrData[0];
    return objSchoolYearDetails;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strValue 
 * @summary   Trigerred when the test name is changed.
 */
export function OnChangeTestName(objContext, strValue)
{
    if(strValue === "")
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnShowValidationBorderForTestName": true, "strTestName": strValue }});
    }
    else
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnShowValidationBorderForTestName": false, "strTestName": strValue }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} Value 
 * @param {*} objData 
 * @summary   Trigerred when the number of task is changed.
 */
export function OnChangeNumberOfTasks(objContext, Value, objData)
{
    let intMaxValue = objData["NoOfTasks"];
    let iDisplayOrder = objData["iDisplayOrder"];
    if(Value === "")
    {
        let arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData => objTempData["iDisplayOrder"] !== iDisplayOrder);
        let arrNewData = arrData.sort((a,b) => { return a.iDisplayOrder - b.iDisplayOrder});
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedNumberOfTasksPerLevel": arrNewData }});
    }
    else if(Value !== "0" && (!isNaN(parseInt(Value)) && parseInt(Value) > 0  && parseInt(Value) <= intMaxValue))
    {
        if(!isNaN(parseInt(Value)))
        {
            Value = parseInt(Value);
        }
        let arrData = [];
        if(objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData=> objTempData["iDisplayOrder"] === iDisplayOrder).length > 0)
        {
            arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.map(objTempData => {
                if(objTempData["iDisplayOrder"] === iDisplayOrder)
                {
                    return {...objTempData, ["intValue"]: Value};
                }
                else
                {
                    return objTempData;
                }
            });
        }
        else
        {
            arrData = [...objContext.state.arrSelectedNumberOfTasksPerLevel, {...objData, ["intValue"]: Value}];
        }
        let arrNewData = arrData.sort((a,b) => { return a.iDisplayOrder - b.iDisplayOrder});
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedNumberOfTasksPerLevel": arrNewData }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Invokes the 'OnClickCreateTaskSet' event in the props.
 */
export function CreateTaskSet(objContext)
{
    let strTestName = objContext.state.strTestName ? objContext.state.strTestName.trim() : "";
    if(strTestName === "")
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnShowValidationBorderForTestName": true }});
    }
    else if(strTestName !== "" && objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData => objTempData["intValue"].toString() !== "").length > 0)
    {
        let objSchoolYearDetails = GetSchoolYearDetails(objContext);
        let arrTasks = objContext.props.passedEvents.GetTaskData();
        let arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.map(objTempData => {
            let arrDataForDifficultyLevel = arrTasks.filter(objTempTaskData => 
                objTempTaskData["t_TestDrive_Task_AssignedTaskDifficultyLevel"].filter(objTempAssignedTaskDifficultyLevelData => 
                    (objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === -1 || objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === objSchoolYearDetails["iSchoolYearId"]) && 
                    objTempAssignedTaskDifficultyLevelData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]).length > 0);
            let intNoOfTasks = 1;
            let objTask = {};
            let arrTemp = [];
            while (intNoOfTasks <= objTempData.intValue)
            {
                objTask = arrDataForDifficultyLevel[Math.floor(Math.random() * arrDataForDifficultyLevel.length)]
                arrDataForDifficultyLevel.splice(arrDataForDifficultyLevel.indexOf(objTask), 1);
                arrTemp.push(objTask);
                intNoOfTasks++;
            }
            return {...objTempData, ["NoOfTasks"]: arrTemp.length, ["arrTaskDataPerDifficultyLevel"]: arrTemp};
        });
        Logger.Log("/*/*/*/*/*/*/*/*/arrSelectedTaskData", arrData);
        objContext.props.closePopUp(objContext.props.objModal);
        objContext.props.passedEvents.OnClickCreateTaskSet({"SelectedNumberOfTasksPerLevel": arrData, "TestName": objContext.state.strTestName});
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnShowVlaidationMessage": false }});
    }
    else
    {
        objContext.props.closePopUp(objContext.props.objModal);
        objContext.props.passedEvents.OnClickCreateTaskSet({"SelectedNumberOfTasksPerLevel": [], "TestName": objContext.props.Data.TestName});
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnShowVlaidationMessage": true }});
    }
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false,
        strTestName: "",
        arrSelectedNumberOfTasksPerLevel: [],
        blnShowVlaidationMessage: false,
        blnShowValidationBorderForTestName: false
    };
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action)
{
    switch(action.type)
    {
        case 'SET_STATE_VALUES':
        return{
            ...state,
            ...action.payload
        };
        case 'DATA_LOAD_COMPLETE':
        return{
            ...state,
            ["isLoadComplete"]: action.payload
        };
    }
};
