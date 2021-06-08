//Base classes.
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name CoTeacher_ModuleProcessor
* @summary Class for CoTeacherAndSubjectExpert module display and manipulate.
*/
class CoTeacher_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_Teacher_Class",
            { "StoreKey": "ApplicationState", "DataKey": "SubjectExpert" }
        ];
    }

    /**
    * @name GetPreSelectedSelectedCoTeachers
    * @param {object} objContext Passes context object
    * @summary  Returns the active teachers after filtering them from the data from backend.
    * @returns {Array} Array of Selected Co Teachers
    */
    GetPreSelectedSelectedCoTeachers(objContext) {
        let objClassData = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
        let arrSelectedCoTeachers = [];
        let arrClassTeachers = objClassData["t_TestDrive_Member_Class_Teacher"];
        arrClassTeachers.forEach(objTempClassTeacherDetails => {
            if (objTempClassTeacherDetails["cIsCoTeacher"] === "Y" && objTempClassTeacherDetails["cIsSubjectExpert"] === "N" && objTempClassTeacherDetails["cIsDeleted"] === "N") {
                arrSelectedCoTeachers = [...arrSelectedCoTeachers, objTempClassTeacherDetails];
            }
        });
        return arrSelectedCoTeachers;
    }

    /**
    * @name GetActiveTeachers
    * @param {object} objContext Passes context object
    * @summary Returns active(non deleted) teachers.
    * @returns {Array} Array of active teachers
    */
    GetActiveTeachers(objContext) {
        let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"];
        let arrActiveTeachers = arrTeacherData.filter(objTeacherData => objTeacherData["t_TestDrive_Member_Teacher_School"].filter(objTempTeacherSchoolDetails => objTempTeacherSchoolDetails["uSchoolId"] === strSchoolId)[0]["cIsDeleted"] === "N");
        return arrActiveTeachers;
    }

    /**
    * @name UpdateAvailableTeachers
    * @param {object} objContext Passes context object
    * @param {String} strOperationType Passes OperationType
    * @param {String} strOldSelectedTeacherId Passes OldSelectedTeacherId
    * @param {String} strNewTeacherId Passes NewTeacherId
    * @summary Updates the available active teachers for the module. This method maintains the consistency of teachers between CoTeachers and SubejctExpert sub modules.
    */
    UpdateAvailableTeachers(objContext, strOperationType = "REMOVE", strOldSelectedTeacherId = "", strNewTeacherId = "") {
        let arrCurrentlyAvailableTeachers = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "AvailableTeachers");
        let arrNewAvailableTeachers = [];
        let objTeacherDetails = {};
        switch (strOperationType) {
            case "ADD":
                objTeacherDetails = this.GetActiveTeachers(objContext).filter(objTempTeacherData => objTempTeacherData["uTeacherId"] === strOldSelectedTeacherId)[0];
                arrNewAvailableTeachers = [...arrCurrentlyAvailableTeachers, objTeacherDetails];
                break;
            case "REMOVE":
                arrNewAvailableTeachers = arrCurrentlyAvailableTeachers.filter(objTempTeacher => objTempTeacher["uTeacherId"] !== strNewTeacherId);
                break;
            case "REPLACE":
                arrNewAvailableTeachers = arrCurrentlyAvailableTeachers.filter(objTempTeacher => objTempTeacher["uTeacherId"] !== strNewTeacherId);
                objTeacherDetails = this.GetActiveTeachers(objContext).filter(objTempTeacherData => objTempTeacherData["uTeacherId"] === strOldSelectedTeacherId)[0];
                arrNewAvailableTeachers = [...arrNewAvailableTeachers, objTeacherDetails];
                break;
        }
        this.SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, arrNewAvailableTeachers);
    }

    /**
    * @name GetApplicationStateDataForCoTeacherAndSubjectExpert
    * @param {object} objContext Passes context object
    * @param {String} strKeyName Passes KeyName
    * @summary Returns the application state for co-teacher and subject expert
    * @returns {object} CoTeacherAndSubjectExpert object
    */
    GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, strKeyName = "") {
        let objData = objContext.props.SubjectExpert; //from application state
        let objReturnData;
        if (objData && JSON.stringify(objData) !== "{}") {
            if (strKeyName !== "") {
                objReturnData = objData[strKeyName];
            }
            else {
                objReturnData = objData;
            }
        }
        return objReturnData;
    }

    /**
    * @name SetApplicationStateDataForCoTeacherAndSubjectExpert
    * @param {object} objContext Passes context object
    * @param {Array} arrAvailableTeachers Passes AvailableTeachers
    * @summary Sets the application state for co-teacher and subject expert
    */
    SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, arrAvailableTeachers = []) {
        let objData = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext);
        let objNewData = {
            ...objData,
            ["AvailableTeachers"]: arrAvailableTeachers
        };
        ApplicationState.SetProperty("SubjectExpert", objNewData);
    }

    /**
    * @name GetTeacherDropdownMetaData
    * @summary Gets the meta data for Class dropdown
    * @returns {object} Meta data objects for Class dropdown
    */
    GetTeacherDropdownMetaData() {
        return {
            DisplayColumn: "vFirstName,vName",
            ValueColumn: "uTeacherId"
        };
    }

    /**
    * @name GetTeacherDropdownData
    * @param {Array} arrAvailbaleTeachers AvailableTeacher Data
    * @param {String} strTeacherId Teacher Id
    * @summary Gets the data for Class dropdown
    * @returns {object} Meta objects for Class dropdown
    */
    GetTeacherDropdownData(arrAvailbaleTeachers, strTeacherId) {
        return {
            DropdownData: arrAvailbaleTeachers,
            SelectedValue: strTeacherId
        };
    }

    /**
    * @name GetResourceData
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetResourceData() {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
    * @name GetTeacherDropdownEvents
    * @param {object} objContext Context object
    * @param {String} strCurrentSelectedTeacherId Passes CurrrentSelectedTeacherId
    * @summary Returns object that contains all the Event methods for Class dropdown.
    * @returns {object} objEventBasics
    */
    GetTeacherDropdownEvents(objContext, strCurrentSelectedTeacherId) {
        return {
            OnChangeEventHandler: (objItem) => objContext.CoTeacher_ModuleProcessor.HandleOnChangeTeacherDropDown(objContext, strCurrentSelectedTeacherId, objItem)
        };
    }

    /**
    * @name HandleOnChangeTeacherDropDown
    * @param {object} objContext Passes context object
    * @param {String} strCurrentSelectedTeacherId Passes CurrrentSelectedTeacherId
    * @param {object} objNewSelectedTeacherData Passes NewSelectedTeacherData
    * @summary Trigerred when a selection a Teacher dropdown is changed.
    */
    HandleOnChangeTeacherDropDown(objContext, strCurrentSelectedTeacherId, objNewSelectedTeacherData) {
        if (strCurrentSelectedTeacherId !== objNewSelectedTeacherData["uTeacherId"]) {
            let intIndex = objContext.state.arrCoTeachers.findIndex(objTempCoTeacher => objTempCoTeacher["uTeacherId"] === strCurrentSelectedTeacherId);
            let arrCoTeachers = objContext.state.arrCoTeachers;
            let objNewClassTeacherDetails = this.GetDefaultClassTeacherDetails(objContext, objNewSelectedTeacherData["uTeacherId"]);
            arrCoTeachers = [...arrCoTeachers.slice(0, intIndex), objNewClassTeacherDetails, ...arrCoTeachers.slice(intIndex, arrCoTeachers.length)];
            let objDeletedCoTeacherDetail = arrCoTeachers.filter(objTempCoTeacher => objTempCoTeacher["uTeacherId"] === strCurrentSelectedTeacherId)[0];
            arrCoTeachers = arrCoTeachers.filter(objTempCoTeacher => objTempCoTeacher["uTeacherId"] !== strCurrentSelectedTeacherId);
            if (objDeletedCoTeacherDetail["uClassTeacherId"] !== "00000000-0000-0000-0000-000000000000") {
                arrCoTeachers = [...arrCoTeachers, { ...objDeletedCoTeacherDetail, ["cIsDeleted"]: "Y" }];
            }
            this.UpdateAvailableTeachers(objContext, "REPLACE", strCurrentSelectedTeacherId, objNewSelectedTeacherData["uTeacherId"]);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrCoTeachers": arrCoTeachers } });
        }
    }

    /**
    * @name HandleOnClickRemoveButton
    * @param {object} objContext Passes context object
    * @param {String} strTeacherId Passes eacherId
    * @summary Trigerred when 'X' button is clicked in the module.
    */
    HandleOnClickRemoveButton(objContext, strTeacherId) {
        let arrCoTeachers = objContext.state.arrCoTeachers;
        let objCoTeacherDetails = arrCoTeachers.filter(objTempCoTeacher => objTempCoTeacher["uTeacherId"] === strTeacherId)[0];
        arrCoTeachers = arrCoTeachers.filter(objTempCoTeacher => objTempCoTeacher["uTeacherId"] !== strTeacherId);
        objContext.dispatch({ type: "SET_STATE", payload: { "arrCoTeachers": arrCoTeachers } });
        if (objCoTeacherDetails["uClassTeacherId"] !== "00000000-0000-0000-0000-000000000000") {
            arrCoTeachers = [...arrCoTeachers, { ...objCoTeacherDetails, ["cIsDeleted"]: "Y" }];
        }
        this.UpdateAvailableTeachers(objContext, "ADD", strTeacherId, "");
        //objContext.dispatch({ type: "SET_STATE", payload: { "arrCoTeachers": arrCoTeachers } });
    }

    /**
    * @name HandleOnClickAddButton
    * @param {object} objContext Passes context object
    * @summary Trigerred when the AddCoTeacher button is clicked.
    */
    HandleOnClickAddButton(objContext) {
        let objClassTeacherDetails = this.GetDefaultClassTeacherDetails(objContext);
        this.UpdateAvailableTeachers(objContext, "REMOVE", "", objClassTeacherDetails["uTeacherId"]);
        objContext.dispatch({ type: "SET_STATE", payload: { "arrCoTeachers": [...objContext.state.arrCoTeachers, objClassTeacherDetails] } });
    }

    /**
    * @name GetDefaultClassTeacherDetails
    * @param {object} objContext Passes context object
    * @param {String} strNewTeacherId Passes NewTeacherId
    * @summary Returns a default ClassTeacher object.
    * @returns {object} ClassTeacherDetails object
    */
    GetDefaultClassTeacherDetails(objContext, strNewTeacherId = "") {
        if (strNewTeacherId === "") {
            let arrAvailableTeachers = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "AvailableTeachers");
            if (arrAvailableTeachers.length > 0) {
                strNewTeacherId = arrAvailableTeachers[0]["uTeacherId"];
            } else {
                objContext.props.ErrorMsgRef.current.setAttribute("style", "display:block");
                return undefined;
            }
        }
        let objClassData = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
        let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let intStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let objClassTeacherDetails = {
            ...objContext.state.arrCoTeachers[0],
            ["uClassTeacherId"]: "00000000-0000-0000-0000-000000000000",
            ["uClassId"]: objClassData["uClassId"],
            ["uTeacherId"]: strNewTeacherId,
            ["cIsDeleted"]: "N",
            ["cIsSubjectExpert"]: "N",
            ["cIsCoTeacher"]: "Y",
            ["uSchoolId"]: strSchoolId,
            ["iStateId"]: intStateId,
            ["t_TestDrive_Member_Class_Teacher_Subject"]: []
        };
        return objClassTeacherDetails;
    }

    /**
    * @name GetSaveCoTeachersData
    * @param {object} objContext Passes context object
    * @summary returns the class object to be saved.
    * @returns {object} ModifiedClassData object
    */
    GetSaveCoTeachersData(objContext) {
        let objTempClassData = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
        let objModifiedClassData = { ...objTempClassData, ["t_TestDrive_Member_Class_Teacher"]: objContext.state.arrCoTeachers };
        return [objModifiedClassData];
    }

    /**
    * @name SaveCoTeachers
    * @param {object} objContext Passes context object
    * @summary Saves the CoTeachers
    */
    SaveCoTeachers(objContext) {
        let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "vEditData": this.GetSaveCoTeachersData(objContext),
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "uSchoolId": strSchoolId
        };
        //let arrParams = [
        //    {
        //        "URL": "API/Object/Extranet/Teacher/Class/SaveCoTeacher",
        //        "Params": objClassParams
        //    }
        //];
        //DataCall(arrParams, "FetchExecute");
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Object_Extranet_Teacher_Class.SaveCoTeacherFetch(objClassParams, (jsonResponse) => {
            let strEntity = "Object_Extranet_Teacher_Class";
            let strFilters = 'Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;' + objClassParams["ForeignKeyFilter"]["t_TestDrive_Member_Class_Teacher.uTeacherId"];
            var storeParams = {
                Data: jsonResponse[strEntity][strFilters]['Data'],
                TimeStamp: 0,
                PrimaryKeyName: "uClassId",
                Count: 1
            };
            objContext.props.Object_Extranet_Teacher_Class.SaveCoTeacherCache(strEntity, strFilters, storeParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSaved": true } });
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSaved": true } });
            //ArcadixCacheData.EditData(strEntity, { Filter: strFilters.toLowerCase(), Value: strFilters });            
        });
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": []
        }
    }
}

export default CoTeacher_ModuleProcessor;