//React specific
import { useEffect } from 'react';

//Common functionality imports
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings';

/**
* @name GetInitialState
* @summary State of the Licenses component
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        NumberOfTasks: -1,
        NumberOfRepetition: -1,
        ErrorTaskMessage: "",
        ErrorTaskSetMessage: "",
        blnSaveToUserPreferenceClicked: false
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary Custom hook which is to make data call when component loaded.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        let arrUserPreferenceValueForTasks = [], arrUserPreferenceValueForRepetition = [];
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"];
        if (arrUserPreferenceValue.length > 0) {
            arrUserPreferenceValueForTasks = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfTasksForSystemGeneratedTest";
            });
            arrUserPreferenceValueForRepetition = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfRepetitionForSystemGeneratedTest";
            });
        }
        if (arrUserPreferenceValueForTasks.length <= 0 || arrUserPreferenceValueForRepetition.length <= 0) {
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
            Object_Cockpit_MainClient_ClientSettings.GetData(objClientSettingsParams, () => { });
        }
    }, []);
}

/**
 * 
 * @param {*} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", objContext.props)) {
            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
            let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"];
            let arrUserPreferenceValueForTasks = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfTasksForSystemGeneratedTest";
            });
            let arrUserPreferenceValueForRepetition = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfRepetitionForSystemGeneratedTest";
            });
            if (arrUserPreferenceValueForTasks.length > 0 && arrUserPreferenceValueForRepetition.length > 0) {
                let intUserPreferenceForTask = parseInt(arrUserPreferenceValueForTasks[0]["vValue"]);
                let intUserPreferenceForRepetition = parseInt(arrUserPreferenceValueForRepetition[0]["vValue"]);
                if (!objContext.state.isLoadComplete) {
                    objContext.dispatch({
                        type: "SET_STATE", payload: { "isLoadComplete": true }
                    });
                }
                objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": intUserPreferenceForTask, "NumberOfRepetition": intUserPreferenceForRepetition } });
            }
            else {
                if (DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")) {
                    let arrClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings").Data;
                    let intUserPreferenceForTask = parseInt(arrClientSettings.filter(objTempDetails => objTempDetails["vKey"] === "NumberOfTasksForSystemGeneratedTest")[0]["vValue"]);
                    let intUserPreferenceForRepetition = parseInt(arrClientSettings.filter(objTempDetails => objTempDetails["vKey"] === "NumberOfRepetitionForSystemGeneratedTest")[0]["vValue"]);
                    objContext.LearningTestSettings_ModuleProcessor.UpdateUserPreference(objContext, intUserPreferenceForTask, intUserPreferenceForRepetition, "ADD");
                    if (!objContext.state.isLoadComplete) {
                        objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
                    }
                    objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": intUserPreferenceForTask, "NumberOfRepetition": intUserPreferenceForRepetition } });
                }
            }
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningTestSystem"],
        objContext.props.Object_Cockpit_MainClient_ClientSettings]);
}
