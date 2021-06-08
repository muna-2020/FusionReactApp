import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            taskdifficultylevel: DataRef(state.Entity, "taskdifficultylevel", true),
            schoolyear: DataRef(state.Entity, "schoolyear", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
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
}

/**
 * 
 * @param {*} objContext 
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
        case "FetchExecuteToSaveTask":
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                objContext.props.passedEvents.OnSaveComplete(objContext.state.arrSelectedNumberOfTasksPerLevel);
                // ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.props.closePopUp(objContext.props.objModal);
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
                if(objContext.props.Data.SelectedNumberOfTasksPerLevel.length > 0)
                {
                    ChangeTab(objContext, -2, objContext.props.Data.SelectedNumberOfTasksPerLevel);
                }
                else
                {
                    let objCurrentTaskDifficultyLevelDataWithTasksDetails = {};
                    let objPreviousTaskDifficultyLevelDataWithTasksDetails = {};
                    let objNextTaskDifficultyLevelDataWithTasksDetails = {};
                    let arrTaskDifficultyLevelDataWithTasks = GetTaskDifficultyLevelDataWithTasks(objContext);
                    if(arrTaskDifficultyLevelDataWithTasks.length > 0)
                    {
                        let intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                        if(intIndex > -1)
                        {
                            objCurrentTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                            if(arrTaskDifficultyLevelDataWithTasks[intIndex]["NoOfTasks"] > 1)
                            {
                                objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][1];
                            }
                            else
                            {
                                arrTaskDifficultyLevelDataWithTasks = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== arrTaskDifficultyLevelDataWithTasks[intIndex]["iTaskDifficultyLevelId"]);
                                if(arrTaskDifficultyLevelDataWithTasks.length > 0)
                                {
                                    intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                                    if(intIndex > -1)
                                    {
                                        objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                                    }
                                }
                            }
                        }
                    }
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, "arrSelectedNumberOfTasksPerLevel": objContext.props.Data.SelectedNumberOfTasksPerLevel } });
                }
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.taskdifficultylevel, objContext.props.schoolyear]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Rteuns the school year details.
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
 * @param {*} intTaskDifficultyLevelId //if passed then the functions returns the data for that difficulty.
 * @summary   Returns the task difficulty level data.
 */
export function GetTaskDifficultyLevelData(objContext, intTaskDifficultyLevelId = -1)
{
    let arrFilteredData = [];
    let arrData = [];
    switch(intTaskDifficultyLevelId)
    {
        case -1:
        arrData = DataRef(objContext.props.taskdifficultylevel).Data;
        arrData.map(objTempData => {
            let arrTaskDifficultyLevelData = objTempData["t_TestDrive_Task_TaskDifficultyLevel_Data"].filter(objTempTaskDifficultyLevelData => objTempTaskDifficultyLevelData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId));
            arrFilteredData = [...arrFilteredData, {...objTempData, ["t_TestDrive_Task_TaskDifficultyLevel_Data"]: arrTaskDifficultyLevelData}];
        });
        break;
        default:
        arrData = DataRef(objContext.props.taskdifficultylevel).Data.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === intTaskDifficultyLevelId);
        arrData.map(objTempData => {
            let arrTaskDifficultyLevelData = objTempData["t_TestDrive_Task_TaskDifficultyLevel_Data"].filter(objTempTaskDifficultyLevelData => objTempTaskDifficultyLevelData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId));
            arrFilteredData = [...arrFilteredData, {...objTempData, ["t_TestDrive_Task_TaskDifficultyLevel_Data"]: arrTaskDifficultyLevelData}];
        });
    }
    return arrFilteredData;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} intTaskDifficultyLevelId 
 * @summary   Returns the difficulty level data with the task per level of difficulty and the number of tasks(count) for each difficulty.
 */
export function GetTaskDifficultyLevelDataWithTasks(objContext, intTaskDifficultyLevelId = -1)
{
    let objSchoolYearDetails = GetSchoolYearDetails(objContext);
    let arrTaskDifficultyLevelData = [];
    switch(intTaskDifficultyLevelId)
    {
        case -1:
        arrTaskDifficultyLevelData = GetTaskDifficultyLevelData(objContext);
        break;
        default:
        arrTaskDifficultyLevelData = GetTaskDifficultyLevelData(objContext, intTaskDifficultyLevelId);
    }
    let arrTasks = objContext.props.passedEvents.GetTaskData();
    let arrData = arrTaskDifficultyLevelData.map(objTempData => {
        let arrTaskDataPerDifficultyLevel = arrTasks.filter(objTempTaskData => 
            objTempTaskData["t_TestDrive_Task_AssignedTaskDifficultyLevel"].filter(objTempAssignedTaskDifficultyLevelData =>  
                (objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === -1 || objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === objSchoolYearDetails["iSchoolYearId"]) && 
                objTempAssignedTaskDifficultyLevelData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]).length > 0);
        let intNumberOfTasks = arrTaskDataPerDifficultyLevel.length;
        return {...objTempData, ["NoOfTasks"]: intNumberOfTasks, ["arrTaskDataPerDifficultyLevel"]: arrTaskDataPerDifficultyLevel};
    });
    return arrData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Triigerred when the previous button is clicked.
 */
function GetPreviousData(objContext)
{
    let objCurrentTaskDifficultyLevelDataWithTasksDetails = {...objContext.state.objPreviousData};
    let objPreviousTaskDifficultyLevelDataWithTasksDetails = {};
    let objNextTaskDifficultyLevelDataWithTasksDetails = {...objContext.state.objCurrentData};
    let intIndex = -1;
    let arrTaskDifficultyLevelDataWithTasks = [];
    let arrTempData = [];
    switch(objContext.state.Tab)
    {
        case -1:
        arrTaskDifficultyLevelDataWithTasks = GetTaskDifficultyLevelDataWithTasks(objContext);
        arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
        intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objPreviousData["iPageId"]);
        if(intIndex > 0)
        {
            objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex - 1];
        }
        else
        {
            arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0 && objTempData["iDisplayOrder"] < arrTempData[0]["iDisplayOrder"]);
            if(arrTempData.length > 0)
            {
                objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
            }
        }
        break;
        case -2:
        arrTaskDifficultyLevelDataWithTasks = objContext.state.arrSelectedNumberOfTasksPerLevel;
        arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
        intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objPreviousData["iPageId"]);
        if(intIndex > 0)
        {
            objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex - 1];
        }
        else
        {
            arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0 && objTempData["iDisplayOrder"] < arrTempData[0]["iDisplayOrder"]);
            if(arrTempData.length > 0)
            {
                objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
            }
        }
        break;
        default:
        arrTaskDifficultyLevelDataWithTasks = GetTaskDifficultyLevelDataWithTasks(objContext, objContext.state.Tab);
        intIndex = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objPreviousData["iPageId"]);
        if(intIndex - 1 > -1)
        {
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
 * 
 * @param {*} objContext 
 * @summary   Trigerred when the next button is clicked.
 */
function GetNextData(objContext)
{
    let objCurrentTaskDifficultyLevelDataWithTasksDetails = {...objContext.state.objNextData};
    let objPreviousTaskDifficultyLevelDataWithTasksDetails = {...objContext.state.objCurrentData};
    let objNextTaskDifficultyLevelDataWithTasksDetails = {};
    let intIndex = -1;
    let arrTaskDifficultyLevelDataWithTasks = [];
    let arrTempData = [];
    switch(objContext.state.Tab)
    {
        case -1:
        arrTaskDifficultyLevelDataWithTasks = GetTaskDifficultyLevelDataWithTasks(objContext);
        arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
        intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objNextData["iPageId"]);
        if(arrTempData[0]["NoOfTasks"] > (intIndex + 1))
        {
            objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex + 1];
        }
        else
        {
            arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0);
            if(arrTempData.length > 0)
            {
                objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
            }
        }
        break;
        case -2:
        arrTaskDifficultyLevelDataWithTasks = objContext.state.arrSelectedNumberOfTasksPerLevel;
        arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
        intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objNextData["iPageId"]);
        if(arrTempData[0]["NoOfTasks"] > (intIndex + 1))
        {
            objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex + 1];
        }
        else
        {
            arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0);
            if(arrTempData.length > 0)
            {
                objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
            }
        }
        break;
        default:
        arrTaskDifficultyLevelDataWithTasks = GetTaskDifficultyLevelDataWithTasks(objContext, objContext.state.Tab);
        intIndex = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objNextData["iPageId"]);
        if(intIndex + 1 <= arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"].length)
        {
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
 * 
 * @param {*} objContext 
 * @param {*} strTraversalDirection 
 * @summary   Trigerred when any of the traversing button is clicked.
 */
export function TraverseData(objContext, strTraversalDirection)
{
    strTraversalDirection = strTraversalDirection.toUpperCase();
    let objData = [];
    switch(strTraversalDirection)
    {
        case "PREVIOUS":
        objData = GetPreviousData(objContext);
        break;
        case "NEXT":
        objData = GetNextData(objContext);
        break;
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "objCurrentData": objData["objCurrentTaskDifficultyLevelDataWithTasksDetails"], "objPreviousData": objData["objPreviousTaskDifficultyLevelDataWithTasksDetails"], "objNextData": objData["objNextTaskDifficultyLevelDataWithTasksDetails"] }});
};

/**
 * 
 * @param {*} objContext 
 * @param {*} intTaskDifficultyLevelId 
 * @param {*} arrSelectedNumberOfTasksPerLevel 
 * @summary   Trigerred when the Tab is changed.
 */
export function ChangeTab(objContext, intTaskDifficultyLevelId, arrSelectedNumberOfTasksPerLevel = [])
{
    if(intTaskDifficultyLevelId !== objContext.state.Tab)
    {
        let objCurrentTaskDifficultyLevelDataWithTasksDetails = {};
        let objPreviousTaskDifficultyLevelDataWithTasksDetails = {};
        let objNextTaskDifficultyLevelDataWithTasksDetails = {};
        let arrTaskDifficultyLevelDataWithTasks = [];
        switch(intTaskDifficultyLevelId)
        {
            case -1:
            arrTaskDifficultyLevelDataWithTasks = GetTaskDifficultyLevelDataWithTasks(objContext);
            if(arrTaskDifficultyLevelDataWithTasks.length > 0)
            {
                let intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                if(intIndex > -1)
                {
                    objCurrentTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                    if(arrTaskDifficultyLevelDataWithTasks[intIndex]["NoOfTasks"] > 1)
                    {
                        objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][1];
                    }
                    else
                    {
                        arrTaskDifficultyLevelDataWithTasks = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== arrTaskDifficultyLevelDataWithTasks[intIndex]["iTaskDifficultyLevelId"]);
                        if(arrTaskDifficultyLevelDataWithTasks.length > 0)
                        {
                            intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                            if(intIndex > -1)
                            {
                                objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                            }
                        }
                    }
                }
            }
            break;
            case -2:
            if(arrSelectedNumberOfTasksPerLevel.length === 0)
            {
                arrTaskDifficultyLevelDataWithTasks = objContext.state.arrSelectedNumberOfTasksPerLevel;
            }
            else
            {
                arrTaskDifficultyLevelDataWithTasks = arrSelectedNumberOfTasksPerLevel;
            }
            if(arrTaskDifficultyLevelDataWithTasks.length > 0)
            {
                let intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                if(intIndex > -1)
                {
                    objCurrentTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                    if(arrTaskDifficultyLevelDataWithTasks[intIndex]["NoOfTasks"] > 1)
                    {
                        objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][1];
                    }
                    else
                    {
                        arrTaskDifficultyLevelDataWithTasks = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== arrTaskDifficultyLevelDataWithTasks[intIndex]["iTaskDifficultyLevelId"]);
                        if(arrTaskDifficultyLevelDataWithTasks.length > 0)
                        {
                            intIndex = arrTaskDifficultyLevelDataWithTasks.findIndex(objTempData => objTempData["NoOfTasks"] > 0);
                            if(intIndex > -1)
                            {
                                objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[intIndex]["arrTaskDataPerDifficultyLevel"][0];
                            }
                        }
                    }
                }
            }
            break;
            default:
            arrTaskDifficultyLevelDataWithTasks = GetTaskDifficultyLevelDataWithTasks(objContext, intTaskDifficultyLevelId);
            if(arrTaskDifficultyLevelDataWithTasks.length > 0 && arrTaskDifficultyLevelDataWithTasks[0]["NoOfTasks"] > 0)
            {
                objCurrentTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"][0];
                if(arrTaskDifficultyLevelDataWithTasks[0]["NoOfTasks"] > 1)
                {
                    objNextTaskDifficultyLevelDataWithTasksDetails = arrTaskDifficultyLevelDataWithTasks[0]["arrTaskDataPerDifficultyLevel"][1];
                }
            }
        }
        if(arrSelectedNumberOfTasksPerLevel.length > 0 && intTaskDifficultyLevelId === -2)
        {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "Tab": intTaskDifficultyLevelId, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, "arrSelectedNumberOfTasksPerLevel": arrSelectedNumberOfTasksPerLevel }});
        }
        else
        {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "Tab": intTaskDifficultyLevelId, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails }});
        }
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} blnIsChecked 
 * @param {*} objTaskDifficultyLevelDataWithTasksDetails 
 * @summary   Trigerred when the task is selected or deselected.
 */
export function OnChangeCheck(objContext, blnIsChecked, objTaskDifficultyLevelDataWithTasksDetails)
{
    let arrTaskDifficultyLevelDataWithTasks = GetTaskDifficultyLevelDataWithTasks(objContext, objTaskDifficultyLevelDataWithTasksDetails["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
    let objData = arrTaskDifficultyLevelDataWithTasks[0];
    let arrData = [];
    let arrNewData = [];
    if(blnIsChecked)
    {
        let iDisplayOrder = objData["iDisplayOrder"];
        if(objContext.state.arrSelectedNumberOfTasksPerLevel.filter(objTempData=> objTempData["iDisplayOrder"] === iDisplayOrder).length > 0)
        {
            arrData = objContext.state.arrSelectedNumberOfTasksPerLevel.map(objTempData => {
                if(objTempData["iDisplayOrder"] === iDisplayOrder)
                {
                    return {...objTempData, ["NoOfTasks"]: objTempData["arrTaskDataPerDifficultyLevel"].length + 1, ["arrTaskDataPerDifficultyLevel"]: [...objTempData["arrTaskDataPerDifficultyLevel"], objTaskDifficultyLevelDataWithTasksDetails]};
                }
                else
                {
                    return objTempData;
                }
            });
        }
        else
        {
            arrData = [...objContext.state.arrSelectedNumberOfTasksPerLevel, {...objData, ["NoOfTasks"]: 1, ["arrTaskDataPerDifficultyLevel"]: [objTaskDifficultyLevelDataWithTasksDetails]}];
        }
        arrNewData = arrData.sort((a,b) => { return a.iDisplayOrder - b.iDisplayOrder});
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedNumberOfTasksPerLevel": arrNewData, "blnShowVlaidationMessage": false }});
    }
    else
    {
        objContext.state.arrSelectedNumberOfTasksPerLevel.forEach(objTempData => { 
            if(objTempData["iDisplayOrder"] === objData["iDisplayOrder"])
            {
                arrData =  objTempData["arrTaskDataPerDifficultyLevel"].filter(objTempTaskDifficultyLevelWithTasksData => objTempTaskDifficultyLevelWithTasksData["iPageId"] !== objTaskDifficultyLevelDataWithTasksDetails["iPageId"]);
                if(arrData.length > 0)
                {
                    arrNewData = [...arrNewData, {...objTempData, ["NoOfTasks"]: objTempData["arrTaskDataPerDifficultyLevel"].length - 1, ["arrTaskDataPerDifficultyLevel"]: arrData}];
                }
            }
            else
            {
                arrNewData = [...arrNewData, objTempData];
            }
        });
        if(objContext.state.Tab === -2)//When Check/Un-Check is done from 'SelectedTask' Tab
        {
            let objCurrentTaskDifficultyLevelDataWithTasksDetails = {};
            let objPreviousTaskDifficultyLevelDataWithTasksDetails = {};
            let objNextTaskDifficultyLevelDataWithTasksDetails = {};
            let intFlag = 0;
            let arrTempData = [];
            let intIndex = -1;
            if(JSON.stringify(objContext.state.objPreviousData) !== '{}')
            {
                objCurrentTaskDifficultyLevelDataWithTasksDetails = objContext.state.objPreviousData;
                intFlag = 1;
            }
            else if(JSON.stringify(objContext.state.objNextData) !== '{}')
            {
                objCurrentTaskDifficultyLevelDataWithTasksDetails = objContext.state.objNextData;
                intFlag = 2;
            }
            switch(intFlag)
            {
                case 0:
                objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedNumberOfTasksPerLevel": arrNewData, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, "blnShowVlaidationMessage": false }});
                break;
                case 1:
                arrTaskDifficultyLevelDataWithTasks = arrNewData;
                arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
                intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objPreviousData["iPageId"]);
                if(intIndex > 0)
                {
                    objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex - 1];
                }
                else
                {
                    arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== objContext.state.objPreviousData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0 && objTempData["iDisplayOrder"] < arrTempData[0]["iDisplayOrder"]);
                    if(arrTempData.length > 0)
                    {
                        objPreviousTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
                    }
                }        
                objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedNumberOfTasksPerLevel": arrNewData, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objPreviousData": objPreviousTaskDifficultyLevelDataWithTasksDetails, "blnShowVlaidationMessage": false }});
                break;
                case 2:
                arrTaskDifficultyLevelDataWithTasks = arrNewData;
                arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] === objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"]);
                intIndex = arrTempData[0]["arrTaskDataPerDifficultyLevel"].findIndex(objTempData => objTempData["iPageId"] === objContext.state.objNextData["iPageId"]);
                if(arrTempData[0]["NoOfTasks"] > (intIndex + 1))
                {
                    objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][intIndex + 1];
                }
                else
                {
                    arrTempData = arrTaskDifficultyLevelDataWithTasks.filter(objTempData => objTempData["iTaskDifficultyLevelId"] !== objContext.state.objNextData["t_TestDrive_Task_AssignedTaskDifficultyLevel"][0]["iTaskDifficultyLevelId"] && objTempData["NoOfTasks"] > 0);
                    if(arrTempData.length > 0)
                    {
                        objNextTaskDifficultyLevelDataWithTasksDetails = arrTempData[0]["arrTaskDataPerDifficultyLevel"][0];
                    }
                }        
                objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedNumberOfTasksPerLevel": arrNewData, "objCurrentData": objCurrentTaskDifficultyLevelDataWithTasksDetails, "objNextData": objNextTaskDifficultyLevelDataWithTasksDetails, "blnShowVlaidationMessage": false }});
                break;
            }
        }
        else
        {
            objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedNumberOfTasksPerLevel": arrNewData, "blnShowVlaidationMessage": false }});
        }
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Trigerrerd when the create task button is clicked. Invokes 'OnClickCreateTaskSet' event in the props.
 */
export function CreateTaskSet(objContext)
{
    if(objContext.state.arrSelectedNumberOfTasksPerLevel.length > 0)
    {
        objContext.props.closePopUp(objContext.props.objModal);
        objContext.props.passedEvents.OnClickCreateTaskSet(objContext.state.arrSelectedNumberOfTasksPerLevel);
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnShowVlaidationMessage": false }});
    }
    else
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnShowVlaidationMessage": true }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Makes an api call for saving the tasks after editing the saved task.
 */
export function EditSavedTasks(objContext)
{
    if(objContext.props.Data.TestId && objContext.props.Data.EditSavedTasks)
    {
        let arrDataToEdit = [];
        let arrDataToDelete = [];
        objContext.state.arrSelectedNumberOfTasksPerLevel.forEach(objTempData => {
            let arrTasks = objContext.props.Data.SelectedNumberOfTasksPerLevel.filter(objTempDataTaskPerDifficulty => objTempDataTaskPerDifficulty["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]);
            objTempData["arrTaskDataPerDifficultyLevel"].forEach(objTempTaskData => {
                if(arrTasks.length === 0 || arrTasks[0]["arrTaskDataPerDifficultyLevel"].find(x=>x["iPageId"] === objTempTaskData["iPageId"]) === undefined)
                {
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
                if(arrTasks.length === 0 || arrTasks[0]["arrTaskDataPerDifficultyLevel"].find(x=>x["iPageId"] === objTempTaskData["iPageId"]) === undefined)
                {
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
        let arrParams = [
            {
                "URL": "API/Object/Intranet/Test/IntranetTestTask",
                "Params": {
                    "uTestId": objContext.props.Data.TestId,
                    "vEditData": arrDataToSave
                },
                "MethodType": "Put"
            }
        ];
        DataCall(objContext, arrParams, "FetchExecuteToSaveTask");
    }
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false,
        Tab: -1,//this value is 'iTaskDifficultyLevelId' from Task Difficulty Level Data, -1 -> all tab, -2 ->selected tab
        arrSelectedNumberOfTasksPerLevel: [],
        arrSelectedTasks: [],
        objPreviousData: {},
        objCurrentData: {},
        objNextData: {},
        blnShowVlaidationMessage: false
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