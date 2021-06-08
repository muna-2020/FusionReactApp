//Base class imports
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Module object imports.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference'

/**
 * @name UserPreferenceClass_ModuleProcessor
 * @summary module processor for UserPreferenceClass Page.
 * */
class UserPreferenceClass_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class", "Object_Cockpit_UserPreference"];
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
        let objClassParams = {
            ["ForeignKeyFilter"]: {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            }
        };

        //Class
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];


        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": props.ClientUserDetails.UserId
            }
        };

        //Userpreference
        Object_Cockpit_UserPreference.Initialize(objUserPreferenceParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserPreference];

        return arrDataRequest;
    }

    /**
     * @name GetActiveClasses
     * @summary   Filters classes on their activation status.
     * @param {*} arrClassData 
     */
    GetActiveClasses(arrClassData) {
        let arrActiveClassData = arrClassData.map((objClassDetails) => {
            return { ...objClassDetails, ["t_TestDrive_Member_Class_Teacher"]: objClassDetails.t_TestDrive_Member_Class_Teacher.filter(objClassTeacherDetails => objClassTeacherDetails.cIsDeleted === "N") }
        }).filter(objClassDetails => { return objClassDetails["t_TestDrive_Member_Class_Teacher"].length > 0 });
        return arrActiveClassData
    }

    /**
     * @name GetDefaultUserPreference
     * @summary   Returns a defualt userPreference object.
     * @param {*} ClientUserDetails 
     * @param {*} strClassId 
     */
    GetDefaultUserPreference(props, strClassId) {
        return {
            "iApplicationTypeId": parseInt(props.JConfiguration.ApplicationTypeId),
            "uUserId": props.ClientUserDetails.UserId,
            "iWindowHeight": null,
            "iWindowWidth": null,
            "iGridSize": null,
            "iLanguageId": parseInt(props.JConfiguration.InterfaceLanguageId),
            "iTreeWidth": null,
            "cUseWindowPopup": "Y",
            "uNavigationSkinId": null,
            "uBackgroundThemeId": null,
            "uProfileImageId": null,
            "t_Framework_UserPreference_PreferenceValue": [
                {
                    "vKey": "CurrentSelectedClassId",
                    "vValue": strClassId
                }
            ]
        }
    }

    /**
     * @name SetUserPreference
     * @summary sets the userpreference values to Application state
     * @param {any} objContext
     */
    SetUserPreference(objContext) {
        let strClassId = "";
        let objUserPreference = {};
        let strUserPreferenceFilterKey = "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId;
        let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"] //Extract Classes.
        let arrUserPreference = DataRef(objContext.props.Object_Cockpit_UserPreference, "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        let arrActiveClasses = this.GetActiveClasses(arrClassData); //Get all the non deleted classes for the current logged in teacher.
        if (arrUserPreference.length > 0) //Checks for the user preference for logged in teacher.
        {
            objUserPreference = arrUserPreference[0];
            let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(objTempUserPreferenceValue => objTempUserPreferenceValue["vKey"] === "CurrentSelectedClassId");
            if (arrUserPreferenceValue.length > 0) //Check if 'CurrentSelectedClassId' object is present in the user preference's sub-table.
            {
                strClassId = arrUserPreferenceValue[0]["vValue"];
                if (arrActiveClasses.findIndex(objClassDetails => objClassDetails.uClassId === strClassId) < 0) //Check wether the currently set user preference class id is of deleted class or active class.
                {
                    strClassId = arrActiveClasses[0]["uClassId"];
                    let objNewUserPreference = {
                        ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
                            return objTempPreference["vKey"] === "CurrentSelectedClassId" ? { ...objTempPreference, "vValue": strClassId } : objTempPreference
                        })
                    };
                    let objUserPreferenceEditParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
                    Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams) //Sets the class id of first active class to user preference.
                    ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
                    ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
                }
                else {
                    ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
                    ApplicationState.SetProperty("UserPreferenceObject", objUserPreference); //Sets the UserPreferenceObject to application state.
                }
            }
            else //This is executed when the 'CurrentSelectedClassId' object is not present in the user preference's sub-table.
            {
                strClassId = arrActiveClasses[0]["uClassId"];
                let objNewUserPreference = { ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreference["t_Framework_UserPreference_PreferenceValue"], { "vKey": "CurrentSelectedClassId", "vValue": strClassId }] };
                let objUserPreferenceEditParams = { ...objUserPreferenceParams, ["vEditData"]: objNewUserPreference };
                Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams) //Sets the class id of first active class to user preference.
                ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
                ApplicationState.SetProperty("UserPreferenceObject", objNewUserPreference); //Sets the UserPreferenceObject to application state.
            }
        }
        else //This is executed when user preference is not set for logged in teacher
        {
            strClassId = arrActiveClasses[0]["uClassId"];
            let objNewUserPreference = GetDefaultUserPreference(props, strClassId);
            let objUserPreferenceAddParams = { ...objUserPreferenceParams, ["vAddData"]: objNewUserPreference };
            Object_Cockpit_UserPreference.AddData(objUserPreferenceAddParams, function (objNewReturn) { //Sets the class id of first active class to user preference.
                arrUserPreference = objNewReturn["userpreference"][strUserPreferenceFilterKey.toLowerCase()].Data; //Extracts User Preference data.
                ApplicationState.SetProperty("SelectedClassId", strClassId); //Sets active class id to application state.
                ApplicationState.SetProperty("UserPreferenceObject", arrUserPreference[0]); //Sets the UserPreferenceObject to application state.
            });
        }
    }
}

export default UserPreferenceClass_ModuleProcessor