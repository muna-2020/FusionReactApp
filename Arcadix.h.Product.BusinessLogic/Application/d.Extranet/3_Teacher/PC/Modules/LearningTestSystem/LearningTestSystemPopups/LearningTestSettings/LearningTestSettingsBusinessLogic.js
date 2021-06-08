import { useLayoutEffect, useEffect} from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true),
            clientsettings: DataRef(state.Entity, "clientsettings", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp    
        };
    }
    else {
        return {};
    }
}

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get ClientSettings request params for the component.
 */
function GetClientSettingsDataParams(objContext){
    let objClientSettingsParams = {
        "SearchQuery": {
            "should": [
                {
                    "bool": 
                    {
                        "must": [
                            {
                                "match": {
                                    "iConfigurationFileId": 1
                                }
                            },
                            {
                                "match": {
                                    "vParentKey": "ExtranetTeacher"
                                }
                            },
                            {
                                "match": {
                                    "vSubParentKey": "LearningTest"
                                }
                            },
                            {
                                "match": {
                                    "vKey": "NumberOfTasksForSystemGeneratedTest"
                                }
                            }
                        ]
                    }
                },
                {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "iConfigurationFileId": 1
                                }
                            },
                            {
                                "match": {
                                    "vParentKey": "ExtranetTeacher"
                                }
                            },
                            {
                                "match": {
                                    "vSubParentKey": "LearningTest"
                                }
                            },
                            {
                                "match": {
                                    "vKey": "NumberOfRepetitionForSystemGeneratedTest"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    let arrParams = [
        {
            "URL": "API/Framework/Blocks/SystemConfiguration/ClientSettings",
            "Params": objClientSettingsParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @summary   Call 'Execute' method to make the api call. Also sets the user preference to application state if the user preference case is called.
 */
export function DataCall(objContext, arrParams, strToggleExecute = 'FetchAndCacheExecute'){
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    switch(strToggleExecute)
    {
        case 'FetchAndCacheExecute':
        objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
            //Do something
        });
        break;
        case "ExecuteForUserPreference":
        let strUserPreferenceFilterKey = "userpreference;uuserid;" + objContext.props.Data.ClientUserDetails.UserId;
        objArcadixFetchAndCacheData.Execute(arrParams, function(objReturn){ //Sets the class id of first active class to user preference.
            Logger.Log("UserPreference API Call return", objReturn);
            let arrUserPreference = objReturn[strUserPreferenceFilterKey.toLowerCase()]; //Extracts User Preference data.
            ApplicationState.SetProperty("UserPreferenceObject", arrUserPreference[0]); //Sets the UserPreferenceObject to application state.
        });
        break;
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext){
    useLayoutEffect(() => {
        let arrUserPreferenceValueForTasks = [], arrUserPreferenceValueForRepetition= [];
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"];
        if(arrUserPreferenceValue.length > 0)
        {
            arrUserPreferenceValueForTasks = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfTaksForSystemGeneratedTest"
            });
            arrUserPreferenceValueForRepetition = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfRepetitionForSystemGeneratedTest"
            });
        }
        if(arrUserPreferenceValueForTasks.length <= 0 || arrUserPreferenceValueForRepetition.length <= 0 )
        {
            DataCall(objContext, GetClientSettingsDataParams(objContext));
        }
    }, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    useEffect(()=>{
        if(DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/LearningTestSystem"))
        {
            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
            let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"];
            let arrUserPreferenceValueForTasks = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfTaksForSystemGeneratedTest"
            });
            let arrUserPreferenceValueForRepetition = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfRepetitionForSystemGeneratedTest"
            });
            if(arrUserPreferenceValueForTasks.length > 0 && arrUserPreferenceValueForRepetition.length > 0)
            {
                let intUserPreferenceForTask = parseInt(arrUserPreferenceValueForTasks[0]["vValue"]);
                let intUserPreferenceForRepetition = parseInt(arrUserPreferenceValueForRepetition[0]["vValue"]);
                if(!objContext.state.isLoadComplete)
                {
                    objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                }
                objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"NumberOfTasks": intUserPreferenceForTask, "NumberOfRepetition": intUserPreferenceForRepetition} });
            }
            else
            {
                if(DataRef(objContext.props.clientsettings, "clientsettings"))
                {
                    let arrClientSettings = DataRef(objContext.props.clientsettings, "clientsettings").Data;
                    let intUserPreferenceForTask = parseInt(arrClientSettings.filter(objTempDetails => objTempDetails["vKey"] === "NumberOfTasksForSystemGeneratedTest")[0]["vValue"]);
                    let intUserPreferenceForRepetition = parseInt(arrClientSettings.filter(objTempDetails => objTempDetails["vKey"] === "NumberOfRepetitionForSystemGeneratedTest")[0]["vValue"]);
                    UpdateUserPreference(objContext, intUserPreferenceForTask, intUserPreferenceForRepetition, "ADD");
                    if(!objContext.state.isLoadComplete)
                    {
                        objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                    }
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"NumberOfTasks": intUserPreferenceForTask, "NumberOfRepetition": intUserPreferenceForRepetition} });
                }
            }
        }
    }, [objContext.props.textresource, objContext.props.clientsettings]);
}

/**
 * 
 * @param {*} objContext 
 * @param {*} intUserPreferenceForTask 
 * @param {*} intUserPreferenceForRepetition 
 * @param {*} strToggleOperation 
 * @summary   Add or Edits the keys to the user preference object. Sends the params to the data call to update the user preference.
 */
function UpdateUserPreference(objContext, intUserPreferenceForTask, intUserPreferenceForRepetition, strToggleOperation = "EDIT")
{
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    let objUserPreferenceParams = {
        "ForeignKeyFilter": {
            "uUserId": objContext.props.Data.ClientUserDetails.UserId
        }
    };
    let objNewUserPreference = {};
    switch(strToggleOperation)
    {
        case "ADD":
        objNewUserPreference = {...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreference["t_Framework_UserPreference_PreferenceValue"], 
            {
                "vKey": "NumberOfTaksForSystemGeneratedTest",
                "vValue": intUserPreferenceForTask,
            },
            {
                "vKey": "NumberOfRepetitionForSystemGeneratedTest",
                "vValue": intUserPreferenceForRepetition
            }
        ]};
        break;
        case "EDIT":
        objNewUserPreference = {...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => { 
            if(objTempPreference["vKey"] === "NumberOfTaksForSystemGeneratedTest")
            {
                return {...objTempPreference, "vValue": intUserPreferenceForTask };
            }
            else if(objTempPreference["vKey"] === "NumberOfRepetitionForSystemGeneratedTest")
            {
                return {...objTempPreference, "vValue": intUserPreferenceForRepetition };
            }
            else
            {
                return objTempPreference;
            }
        })};
        break;
    }
    let objUserPreferenceModifiedParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
    let arrNewUserPreferenceCallParams = [{
        "URL": "API/Object/Framework/UserPreference/UserPreference",
        "Params": objUserPreferenceModifiedParams,
        "MethodType": "Put"
    }];
    Logger.Log("UserPreference API Call params", arrNewUserPreferenceCallParams);
    DataCall(objContext, arrNewUserPreferenceCallParams, "ExecuteForUserPreference");
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strValue 
 * @param {*} strFieldName 
 * @summary   Trigerred when there is a change in the input text boxes.
 */
export function OnChangeInput(objContext, strValue, strFieldName)
{
    strFieldName = strFieldName.toLowerCase();
    if(isNaN(parseInt(strValue)))
    {
        strValue = "";
    }
    switch(strFieldName)
    {
        case "task":
        objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"NumberOfTasks": strValue} });
        break;
        case "repetition":
        objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"NumberOfRepetition": strValue} });
        break;
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Called when the proceed button is clicked.
 */
export function SaveToUserPreference(objContext)
{
    let intUserPreferenceForTask = parseInt(objContext.state.NumberOfTasks);
    let intUserPreferenceForRepetition = parseInt(objContext.state.NumberOfRepetition);
    if(!isNaN(intUserPreferenceForTask) && !isNaN(intUserPreferenceForRepetition))
    {
        UpdateUserPreference(objContext, intUserPreferenceForTask, intUserPreferenceForRepetition, "EDIT");
        objContext.props.closePopUp(objContext.props.objModal);
    }
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false,
        NumberOfTasks: -1,
        NumberOfRepetition: -1
    };
}

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
}

