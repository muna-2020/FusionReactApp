import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference'

class CompileTasks_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["frameworknavigation"];
    }

    /**
     * @name SaveData
     * @summary saves the userpreference data.
     * @param {any} objContext
     */
    SaveData(objContext) {
        if (objContext.state.blnIsChecked) {
            let objUserPreferenceDetails = ApplicationState.GetProperty("UserPreferenceObject");
            let objEditData = { ...objUserPreferenceDetails, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreferenceDetails["t_Framework_UserPreference_PreferenceValue"], { "uUserPreferenceId": objUserPreferenceDetails["uUserPreferenceId"], "vKey": "ShowManualLearningTestIntroPopup", "vValue": "N" }] };
            let objEditDataParams = {
                "ForeignKeyFilter": {
                    "uUserId": ClientUserDetails.UserId
                },
                "vEditData": objEditData
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Cockpit_UserPreference.EditData(objEditDataParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.props.HandleClosePopup();
            });
        }
        else {
            objContext.props.HandleClosePopup();
        }
    };

    /**
     * @name OnChangeCheckBoxSelection
     * @summary updates check box value to state
     * @param {any} objContext
     * @param {any} blnIsChecked
     */
    OnChangeCheckBoxSelection(objContext, blnIsChecked) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnIsChecked": blnIsChecked } })
    };

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

export default CompileTasks_ModuleProcessor