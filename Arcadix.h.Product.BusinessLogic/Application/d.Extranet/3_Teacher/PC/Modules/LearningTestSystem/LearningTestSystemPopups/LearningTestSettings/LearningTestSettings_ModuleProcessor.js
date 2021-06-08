//Objects required for module.
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';

/**
* @name LearningTestSetting_ModuleProcessor
* @summary Class for Teacher module display and manipulate.
*/
class LearningTestSettings_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningTestSystem",
            "Object_Cockpit_UserPreference",
            "Object_Cockpit_MainClient_ClientSettings"];
    }

    /**
     * @name UpdateUserPreference
     * @param {*} objContext objContext
     * @param {*} intUserPreferenceForTask intUserPreferenceForTask
     * @param {*} intUserPreferenceForRepetition intUserPreferenceForRepetition
     * @param {*} strToggleOperation strToggleOperation
     * @summary Add or Edits the keys to the user preference object. Sends the params to the data call to update the user preference.
     */
    UpdateUserPreference(objContext, intUserPreferenceForTask, intUserPreferenceForRepetition, strToggleOperation = "EDIT") {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": ClientUserDetails.UserId
            }
        };
        let objNewUserPreference = {};
        switch (strToggleOperation) {
            case "ADD":
                objNewUserPreference = {
                    ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreference["t_Framework_UserPreference_PreferenceValue"],
                    {
                        "vKey": "NumberOfTasksForSystemGeneratedTest",
                        "vValue": intUserPreferenceForTask
                    },
                    {
                        "vKey": "NumberOfRepetitionForSystemGeneratedTest",
                        "vValue": intUserPreferenceForRepetition
                    }
                    ]
                };
                break;
            case "EDIT":
                objNewUserPreference = {
                    ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
                        if (objTempPreference["vKey"] === "NumberOfTasksForSystemGeneratedTest") {
                            return { ...objTempPreference, "vValue": intUserPreferenceForTask };
                        }
                        else if (objTempPreference["vKey"] === "NumberOfRepetitionForSystemGeneratedTest") {
                            return { ...objTempPreference, "vValue": intUserPreferenceForRepetition };
                        }
                        else {
                            return objTempPreference;
                        }
                    })
                };
                break;
        }
        let objUserPreferenceModifiedParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };

        //let strUserPreferenceFilterKey = "Object_Cockpit_UserPreference;uUserId;" + ClientUserDetails.UserId;
        ApplicationState.SetProperty("blnShowAnimation",true)
        Object_Cockpit_UserPreference.EditData(objUserPreferenceModifiedParams, function (objReturn) { //Sets the class id of first active class to user preference.
            ApplicationState.SetProperty("blnShowAnimation", false)
            if (objContext.props.Meta.FromTestResults) {
                objContext.props.Events.SaveExecutions();
            } else {
                let arrUserPreference = objReturn[0]; //Extracts User Preference data.
                objContext.LearningTestSystem_ModuleProcessor.SetApplicationState(objContext, objContext.props.Data.objContext);
                ApplicationState.SetProperty("UserPreferenceObject", arrUserPreference); //Sets the UserPreferenceObject to application state.
            }

        });
    }

    OnFocusInput(objContext, objTextResource, strValue, strFieldName) {
        strFieldName = strFieldName.toLowerCase();
        let iValue = parseInt(strValue);
        if (objContext.state.blnSaveToUserPreferenceClicked) {
            switch (strFieldName) {
                case "task":
                    if (isNaN(iValue)) {
                        strValue = "";
                        objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": strValue, ErrorTaskMessage: objTextResource.EnterTaskMessage, ErrorTaskSetMessage: "" } });
                    } else if (iValue < 1 || iValue > 25) {
                        objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": strValue, ErrorTaskMessage: objTextResource.TaskValidationMessage, ErrorTaskSetMessage: "" } });
                    } else
                        objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": strValue, ErrorTaskMessage: "", ErrorTaskSetMessage: "" } });
                    break;
                case "repetition":
                    if (isNaN(iValue)) {
                        strValue = "";
                        objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfRepetition": strValue, ErrorTaskSetMessage: objTextResource.EnterTaskSetMessage, ErrorTaskMessage: "" } });
                    } else if (iValue < 1 || iValue > 5) {
                        objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfRepetition": strValue, ErrorTaskSetMessage: objTextResource.TaskSetValidationMessage, ErrorTaskMessage: "" } });
                    } else
                        objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfRepetition": strValue, ErrorTaskSetMessage: "", ErrorTaskMessage: "" } });
                    break;
            }
        }
    }

    /**
     * @name OnChangeInput
     * @param {*} objContext objContext
     * @param {*} strValue strValue
     * @param {*} strFieldName strFieldName
     * @summary Trigerred when there is a change in the input text boxes.
     */
    OnChangeInput(objContext, objTextResource, strValue, strFieldName) {
        strFieldName = strFieldName.toLowerCase();
        let iValue = parseInt(strValue);

        switch (strFieldName) {
            case "task":
                //if (isNaN(iValue)) {
                //    strValue = "";
                //    objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": strValue, ErrorTaskMessage: objTextResource.EnterTaskMessage } });
                //} else if (iValue < 1 || iValue > 25) {
                //    objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": strValue, ErrorTaskMessage: objTextResource.TaskValidationMessage } });
                //} else
                //    objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": strValue, ErrorTaskMessage: "" } });
                objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfTasks": strValue, ErrorTaskMessage: "" } });
                break;
            case "repetition":
                //if (isNaN(iValue)) {
                //    strValue = "";
                //    objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfRepetition": strValue, ErrorTaskSetMessage: objTextResource.EnterTaskSetMessage } });
                //} if (iValue < 1 || iValue > 5) {
                //    objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfRepetition": strValue, ErrorTaskSetMessage: objTextResource.TaskSetValidationMessage } });
                //} else
                //    objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfRepetition": strValue, ErrorTaskSetMessage: "" } });
                objContext.dispatch({ type: "SET_STATE", payload: { "NumberOfRepetition": strValue, ErrorTaskSetMessage: "" } });
                break;
        }
    }


    OnBlurInput(objContext, strFieldName) {
        if (strFieldName == "Task") {
            objContext.dispatch({ type: "SET_STATE", payload: { ErrorTaskMessage: undefined } });
        } else if (strFieldName == "Repetition") {
            objContext.dispatch({ type: "SET_STATE", payload: { ErrorTaskSetMessage: undefined } });
        }
    }

    /**
     * @name SaveToUserPreference
     * @param {*} objContext objContext
     * @summary Called when the proceed button is clicked.
     */
    SaveToUserPreference(objContext, objTextResource) {

        objContext.dispatch({ type: "SET_STATE", payload: { blnSaveToUserPreferenceClicked: true } });
        let intUserPreferenceForTask = parseInt(objContext.state.NumberOfTasks);
        let intUserPreferenceForRepetition = parseInt(objContext.state.NumberOfRepetition);
        let blnSetErrorMessage = true;
        if (!isNaN(intUserPreferenceForTask) && !isNaN(intUserPreferenceForRepetition)) {
            if ((intUserPreferenceForTask >= 1 && intUserPreferenceForTask <= 25) && (intUserPreferenceForRepetition >= 1 && intUserPreferenceForRepetition <= 5)) {
                objContext.LearningTestSettings_ModuleProcessor.UpdateUserPreference(objContext, intUserPreferenceForTask, intUserPreferenceForRepetition, "EDIT");
                Popup.ClosePopup(objContext.props.Id);
                blnSetErrorMessage = true;
            }
        }
        if (blnSetErrorMessage) {
            if (isNaN(intUserPreferenceForTask)) {
                objContext.dispatch({ type: "SET_STATE", payload: { ErrorTaskMessage: objTextResource.EnterTaskMessage } });
            }
            else if (intUserPreferenceForTask < 1 || intUserPreferenceForTask > 25) {
                objContext.dispatch({ type: "SET_STATE", payload: { ErrorTaskMessage: objTextResource.TaskValidationMessage } });
            }
            else if (isNaN(intUserPreferenceForRepetition)) {
                objContext.dispatch({ type: "SET_STATE", payload: { ErrorTaskSetMessage: objTextResource.EnterTaskSetMessage } });
            }
            else if (intUserPreferenceForRepetition < 1 || intUserPreferenceForRepetition > 5) {
                objContext.dispatch({ type: "SET_STATE", payload: { ErrorTaskSetMessage: objTextResource.TaskSetValidationMessage } });
            }
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

export default LearningTestSettings_ModuleProcessor;

