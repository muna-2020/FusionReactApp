//Base class imports
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Module object imports.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';

/**
 * @name SchoolDropdown_ModuleProcessor
 * @summary module processor for SchoolDropdown Page.
 * */
class SchoolDropdown_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_School_School"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {

        let arrDataRequest = [];
        let arrShudFilter = props.arrSchoolData.map(objSchool => {
            return {
                match: {
                    uSchoolId: objSchool.uSchoolId
                }
            }
        })
        let objSchoolParams = {
            SearchQuery: {
                must: [
                    {
                        match: {
                            cIsDeleted: "N"
                        }
                    },
                    {
                        bool: {
                            should: arrShudFilter
                        }
                    }
                ]

            }
        }

        //School
        Object_Extranet_School_School.Initialize(objSchoolParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];

        return arrDataRequest;
    }

    /**
    * @name GetSelectedSchoolId
    * @summary Gets the Selected School Id from state or from User preference
    * @param {any} objContext
    */
    GetSelectedSchoolId(objContext) {
        let strSelctedSchoolId = objContext.state.strSelectedSchoolId;
        if (strSelctedSchoolId == '') {
            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
            let arrFilteredUserPreference =
                objUserPreference["t_Framework_UserPreference_PreferenceValue"]
                    .filter(x => x["vKey"] == "SelectedSchoolForTeacher");
            if (arrFilteredUserPreference.length > 0) {
                strSelctedSchoolId = arrFilteredUserPreference[0]["vValue"];
            } else {
                strSelctedSchoolId = ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
                this.UpdateUserPreference(objContext, strSelctedSchoolId);
            }
        }
        return strSelctedSchoolId;
    }

    /**
   * @name UpdateUserPreference
   * @param {*} objContext objContext
   * @param {*} strSelectedSchoolId strSelectedSchoolId   
   * @summary Add or Edits the keys to the user preference object. Sends the params to the data call to update the user preference.
   */
    UpdateUserPreference(objContext, strSelectedSchoolId) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": ClientUserDetails.UserId
            }
        };
        let objNewUserPreference = {};

        if (objUserPreference != undefined) {
            let arrFilteredUserPreference =
                objUserPreference["t_Framework_UserPreference_PreferenceValue"]
                    .filter(x => x["vKey"] == "SelectedSchoolForTeacher");
            if (arrFilteredUserPreference.length > 0) {
                objNewUserPreference = {
                    ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
                        if (objTempPreference["vKey"] === "SelectedSchoolForTeacher") {
                            return { ...objTempPreference, "vValue": strSelectedSchoolId };
                        }
                        else {
                            return objTempPreference;
                        }
                    })
                }
            } else {
                objNewUserPreference = {
                    ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreference["t_Framework_UserPreference_PreferenceValue"],
                    {
                        "vKey": "SelectedSchoolForTeacher",
                        "vValue": strSelectedSchoolId
                    }]
                };
            }
            let objUserPreferenceModifiedParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
            ApplicationState.SetProperty("blnShowAnimation", true)
            Object_Cockpit_UserPreference.EditData(objUserPreferenceModifiedParams, function (objReturn) {
                ApplicationState.SetProperty("UserPreferenceObject", objReturn[0]); //Sets the UserPreferenceObject to application state.
                objContext.dispatch({ type: "SET_STATE", payload: { strSelectedSchoolId: strSelectedSchoolId } });
                ApplicationState.SetProperty("blnShowAnimation", false);
                window.location.reload();
            });
        }
    }

    /**
    * @name GetResourceSchoolDropdown
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceSchoolDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
     * @name GetEventsSchoolDropdown
     * @param {object} objContext Context object
     * @summary Returns object that contains all the Event methods.
     * @return {object} objEventBasics
    */
    GetEventsSchoolDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { objContext.SchoolDropdown_ModuleProcessor.UpdateUserPreference(objContext, objItem.uSchoolId) }
        };
    }
}

export default SchoolDropdown_ModuleProcessor;