import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name SubjectExpert_ModuleProcessor
* @summary Class for CoTeacherAndSubjectExpert module display and manipulate.
*/
class SubjectExpert_ModuleProcessor extends ExtranetBase_ModuleProcessor {

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
    * @name GetPreSelectedSelectedSubjectExperts
    * @param {object} objContext Passes context object
    * @summary  Returns the already present SubjectExperts for the class.
    * @returns {Array} Array of Selected SubjectExperts
    */
    GetPreSelectedSelectedSubjectExperts(objContext) {
        let objClassData = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
        let arrSelectedSubjectExperts = [];
        let arrClassTeachers = objClassData["t_TestDrive_Member_Class_Teacher"];
        arrClassTeachers.forEach(objTempClassTeacherDetails => {
            if (objTempClassTeacherDetails["cIsSubjectExpert"] === "Y" && objTempClassTeacherDetails["cIsDeleted"] === "N") {
                arrSelectedSubjectExperts = [...arrSelectedSubjectExperts, objTempClassTeacherDetails];
            }
        });
        return arrSelectedSubjectExperts;
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
    * @name GetSubjectsForDropDown
    * @param {object} objContext Passes context object
    * @summary Returns subject array for dropdown
    * @returns {Array} Subjects
    */
    GetSubjectsForDropDown(objContext) {
        let arrDefaultSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"];
        let arrSchoolSubjects = DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"] + ";cIsDeleted;N")["Data"];
        let arrSubjects = [...arrDefaultSubjects, ...arrSchoolSubjects];
        return arrSubjects;
    }

    /**
    * @name GetSubjectsForPreSelectInDropDown
    * @param {object} objContext Passes context object
    * @param {Array} arrClassTeacherSubjects Passes ClassTeacherSubjects array
    * @summary Returns an array containing subject those are there in Class_Teacher_Subject sub table. The array is used in the multi-select dropdown as a preselect value.
    * @returns {Array} FilteredSubjects
    */
    GetSubjectsForPreSelectInDropDown(objContext, arrClassTeacherSubjects) {
        let arrSubjects = this.GetSubjectsForDropDown(objContext);
        let arrFilteredSubjects = [];
        arrClassTeacherSubjects.forEach(objTempClassTeacherSubject => {
            let arrTempSubject = arrSubjects.filter(objTempSubjects => objTempSubjects["iSubjectId"] === objTempClassTeacherSubject["iSubjectId"]);
            if (arrTempSubject.length > 0) {
                arrFilteredSubjects = [...arrFilteredSubjects, ...arrTempSubject];
            }
        });
        return arrFilteredSubjects;
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
            OnChangeEventHandler: (objItem) => objContext.SubjectExpert_ModuleProcessor.HandleOnChangeTeacherDropDown(objContext, strCurrentSelectedTeacherId, objItem)
        };
    }

    /**
    * @name HandleOnChangeTeacherDropDown
    * @param {object} objContext Passes context object
    * @param {String} strCurrrentSelectedTeacherId Passes CurrrentSelectedTeacherId
    * @param {object} objNewSelectedTeacherData Passes NewSelectedTeacherData
    * @summary Trigerred when a selection a Teacher dropdown is changed.
    */
    HandleOnChangeTeacherDropDown(objContext, strCurrrentSelectedTeacherId, objNewSelectedTeacherData) {
        if (strCurrrentSelectedTeacherId !== objNewSelectedTeacherData["uTeacherId"]) {
            let intIndex = objContext.state.arrSubjectExperts.findIndex(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] === strCurrrentSelectedTeacherId);
            let arrSubjectExperts = objContext.state.arrSubjectExperts;
            let objNewClassTeacherDetails = this.GetDefaultClassTeacherDetails(objContext, objNewSelectedTeacherData["uTeacherId"]);
            arrSubjectExperts = [...arrSubjectExperts.slice(0, intIndex), objNewClassTeacherDetails, ...arrSubjectExperts.slice(intIndex, arrSubjectExperts.length)];
            let objDeletedSubjectExpertDetail = arrSubjectExperts.filter(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] === strCurrrentSelectedTeacherId)[0];
            arrSubjectExperts = arrSubjectExperts.filter(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] !== strCurrrentSelectedTeacherId);
            if (objDeletedSubjectExpertDetail["uClassTeacherId"] !== "00000000-0000-0000-0000-000000000000") {
                arrSubjectExperts = [...arrSubjectExperts, { ...objDeletedSubjectExpertDetail, ["cIsDeleted"]: "Y" }];
            }
            this.UpdateAvailableTeachers(objContext, "REPLACE", strCurrrentSelectedTeacherId, objNewSelectedTeacherData["uTeacherId"]);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSubjectExperts": arrSubjectExperts } });
        }
    }

    /**
    * @name HandleOnClickRemoveButton
    * @param {object} objContext Passes context object
    * @param {String} strTeacherId Passes eacherId
    * @summary Trigerred when 'X' button is clicked in the module.
    */
    HandleOnClickRemoveButton(objContext, strTeacherId) {
        let arrSubjectExperts = objContext.state.arrSubjectExperts;
        let objSubjectExpertDetails = arrSubjectExperts.filter(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] === strTeacherId)[0];
        arrSubjectExperts = arrSubjectExperts.filter(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] !== strTeacherId);
        if (objSubjectExpertDetails["uClassTeacherId"] !== "00000000-0000-0000-0000-000000000000") {
            arrSubjectExperts = [...arrSubjectExperts, { ...objSubjectExpertDetails, ["cIsDeleted"]: "Y" }];
        }
        this.UpdateAvailableTeachers(objContext, "ADD", strTeacherId, "");
        objContext.dispatch({ type: "SET_STATE", payload: { "arrSubjectExperts": arrSubjectExperts } });
    }

    /**
    * @name HandleOnClickAddButton
    * @param {object} objContext Passes context object
    * @summary Trigerred when the AddCoTeacher button is clicked.
    */
    HandleOnClickAddButton(objContext) {
        let objClassTeacherDetails = this.GetDefaultClassTeacherDetails(objContext);
        if (objClassTeacherDetails != undefined) {
            this.UpdateAvailableTeachers(objContext, "REMOVE", "", objClassTeacherDetails["uTeacherId"]);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSubjectExperts": [...objContext.state.arrSubjectExperts, objClassTeacherDetails] } });
        }
    }

    /**
    * @name GetSubjectMultiSelectDropdownMetaData
    * @summary Gets the meta data for Subject multiselect dropdown
    * @returns {object} Meta data objects for Subject multiselect dropdown
    */
    GetSubjectMultiSelectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data",
            ShortNameColumn: "vSubjectShortName",
            DefaultOptionTextKey: "MultiSelectDropdownDefaultValue"
        };
    }

    /**
    * @name GetSubjectMultiSelectDropdownData
    * @param {Array} arrSubjects Subject Data
    * @param {String} arrPreselectSubjects Preselect Id
    * @summary Gets the data for Subject multiselect dropdown
    * @returns {object} Meta objects for Subject multiselect dropdown
    */
    GetSubjectMultiSelectDropdownData(arrSubjects, arrPreselectSubjects) {
        return {
            MultiSelectDropdownData: arrSubjects,
            SelectedItems: arrPreselectSubjects
        };
    }

    /**
    * @name GetMultiSelectDropdownResourceData
    * @param {String} strText PreSelect value
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetMultiSelectDropdownResourceData(strText) {
        let ResourceText = { "MultiSelectDropdownDefaultValue": strText };
        return {
            SkinPath: JConfiguration.ExtranetSkinPath,
            Text: ResourceText
        };
    }

    /**
    * @name GetSubjectMultiSelectDropdownEvents
    * @param {object} objContext Context object
    * @param {String} strTeacherId Passes CurrrentSelectedTeacherId
    * @summary Returns object that contains all the Event methods for Subject multiselect dropdown.
    * @returns {object} objEventBasics
    */
    GetSubjectMultiSelectDropdownEvents(objContext, strTeacherId) {
        return {
            OnChangeEventHandler: (arrItems) => objContext.SubjectExpert_ModuleProcessor.HandleOnChangeSubjectDropDown(objContext, arrItems, strTeacherId)
        };
    }

    /**
    * @name HandleOnChangeSubjectDropDown
    * @param {object} objContext Passes context object
    * @param {Array} arrSelectedSubjects SelectedSubjects
    * @param {String} strSelectedTeacherId SelectedTeacherId
    * @summary Executes when Subject Dropdown changes
    */
    HandleOnChangeSubjectDropDown(objContext, arrSelectedSubjects, strSelectedTeacherId) {
        let arrSubjectExperts = objContext.state.arrSubjectExperts;
        let arrSubjects = arrSelectedSubjects.map(objTempCurrentlySelectedSubject => {
            return {
                "iSubjectId": objTempCurrentlySelectedSubject["iSubjectId"]
            };
        });

        let arrTempSubjectExperts = arrSubjectExperts.map(objTempClassTeacher => {
            if (objTempClassTeacher["uTeacherId"] === strSelectedTeacherId) {
                return { ...objTempClassTeacher, ["t_TestDrive_Member_Class_Teacher_Subject"]: arrSubjects };
            }
            else {
                return objTempClassTeacher;
            }
        });
        objContext.dispatch({ type: "SET_STATE", payload: { "arrSubjectExperts": arrTempSubjectExperts } });
    }

    /**
    * @name GetDefaultClassTeacherDetails
    * @param {object} objContext Passes context object
    * @param {String} strNewTeacherId Passes NewTeacherId
    * @summary Returns a default ClassTeacher object.
    * @returns {object} ClassTeacherDetails object
    */
    GetDefaultClassTeacherDetails(objContext, strNewTeacherId = "") {
        if (strNewTeacherId == "") {
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
            ...objContext.state.arrSubjectExperts[0],
            ["uClassTeacherId"]: "00000000-0000-0000-0000-000000000000",
            ["uClassId"]: objClassData["uClassId"],
            ["uTeacherId"]: strNewTeacherId,
            ["cIsDeleted"]: "N",
            ["cIsSubjectExpert"]: "Y",
            ["cIsCoTeacher"]: "N",
            ["uSchoolId"]: strSchoolId,
            ["iStateId"]: intStateId,
            ["t_TestDrive_Member_Class_Teacher_Subject"]: []
        };
        return objClassTeacherDetails;
    }

    /**
    * @name ValidateSubjectExperts
    * @param {object} objContext Passes context object
    * @summary checks if all the subject experts are assingned subjects or not. Returns a json object with 'IsValid' as true/false and 'TeacherId' as ""/guid of teacher.
    * @returns {object} Validate object
    */
    ValidateSubjectExperts(objContext) {
        let arrSubjectExperts = objContext.state.arrSubjectExperts;
        let blnIsValid = true;
        let uTeacherId = "";
        let indexInvalid = null;
        if (arrSubjectExperts && arrSubjectExperts.length > 0) {
            arrSubjectExperts.forEach((objTempSubjectExperts, intIndex) => {
                if (objTempSubjectExperts["cIsDeleted"] === 'N' && objTempSubjectExperts["t_TestDrive_Member_Class_Teacher_Subject"].length === 0) {
                    blnIsValid = false;
                    uTeacherId = objTempSubjectExperts["uTeacherId"];
                    indexInvalid = intIndex;
                }
            });
        }
        return {
            "IsValid": blnIsValid,
            "TeacherId": uTeacherId,
            "indexInvalid": indexInvalid
        };
    }

    /**
    * @name GetSaveSubjectExpertsData
    * @param {object} objContext Passes context object
    * @summary returns the class object to be saved.
    * @returns {object} ModifiedClassData object
    */
    GetSaveSubjectExpertsData(objContext) {
        let objTempClassData = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
        let objModifiedClassData = { ...objTempClassData, ["t_TestDrive_Member_Class_Teacher"]: objContext.state.arrSubjectExperts };
        return [objModifiedClassData];
    }

    /**
    * @name SaveSubjectExperts
    * @param {object} objContext Passes context object
    * @summary Saves the SubjectExperts
    */
    SaveSubjectExperts(objContext) {

        ApplicationState.SetProperty("blnShowAnimation", true);

        let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "vEditData": this.GetSaveSubjectExpertsData(objContext),
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "uSchoolId": strSchoolId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Object_Extranet_Teacher_Class.SaveSubjectExpert(objClassParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSaved": true } });
        });
    }



    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown","MultiSelectDropdown"],
            "Files": []
        }
    }
}

export default SubjectExpert_ModuleProcessor;