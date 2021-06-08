

//Objects required for module.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_School_SchoolSubject from '@shared/Object/d.Extranet/2_School/SchoolSubject/SchoolSubject';

/**
* @name CoTeacherAndSubjectExpert_ModuleProcessor
* @summary Class for CoTeacherAndSubjectExpert module display and manipulate.
*/
class CoTeacherAndSubjectExpert_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class", "Object_Extranet_Teacher_Teacher", "Object_Intranet_Taxonomy_Subject",
            "Object_Extranet_School_SchoolSubject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert",
            { "StoreKey": "ApplicationState", "DataKey": "SelectedClassId" }
        ];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {        
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name GetDynamicStyles
     * @param {*} props props
     * @summary Gets dynamic styles for the component.
     * @returns {*} array
     */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert.css",
            JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/MultiSelectDropDown/MultiSelectDropDown.css"
        ];
    };

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];
        ApplicationState.SetProperty("blnShowAnimation", true);
        //Class
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": ClientUserDetails.UserId,
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //Teacher
        let objTeacherParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"],
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        //Subject
        let objSubjectParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iParentSubjectId": 0
                        }
                    },
                    {
                        "match": {
                            "cIsLearnCoacherSubject": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //SchoolSubject
        let objSchoolSubjectParams = {
            "ForeignKeyFilter": {
                "uUserId": ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };
        Object_Extranet_School_SchoolSubject.Initialize(objSchoolSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_SchoolSubject];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "outletBand", "SubNavigation", "TopHeadCoTeacherAndSubjectExpert", "ErrorMsg"],
            FooterIds: ["FooterPupil"]
        };
    }

    /**
    * @name GetPreveiouslySelectedTeachers
    * @param {object} objContext Passes context object
    * @param {object} objClassData Passes class data
    * @summary Gets previously selected class, to set after rerender
    * @returns {object} SelectedTeachers object
    */
    GetPreveiouslySelectedTeachers(objContext, objClassData) {
        let arrSelectedTeachers = [];
        let arrClassTeachers = [];
        if (objClassData) {
            arrClassTeachers = objClassData["t_TestDrive_Member_Class_Teacher"];
        }

        arrClassTeachers.forEach(objTempClassTeacherDetails => {
            if (objTempClassTeacherDetails["cIsDeleted"] === "N") {
                arrSelectedTeachers = [...arrSelectedTeachers, objTempClassTeacherDetails["uTeacherId"]];
            }
        });
        return {
            "SelectedTeachers": arrSelectedTeachers
        };
    }

    /**
    * @name GetApplicationStateDataForCoTeacherAndSubjectExpert
    * @param {object} objContext Passes context object
    * @param {string} strKeyName Passes KeyName
    * @summary Returns the application state for co-teacher and subject expert
    * @returns {object} Application State for co-teacher and subject expert
    */
    GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, strKeyName = "") {
        let arrClassData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        }

        let objData = ApplicationState.GetProperty("SubjectExpert");
        let objReturnData = {};
        if (objData && JSON.stringify(objData) !== "{}") {
            if (strKeyName !== "") {
                if (strKeyName === "SelectedClassData") {
                    let strPreSelectedClassId = ApplicationState.GetProperty("SelectedClassId");
                    let blnIsMainClassSelected = false;
                    let objSelectedClassData = arrClassData.filter(objClassData => objClassData["uClassId"] == strPreSelectedClassId)[0];
                    blnIsMainClassSelected = objSelectedClassData["t_TestDrive_Member_Class_Teacher"][0].cIsSubjectExpert == "N" & objSelectedClassData["t_TestDrive_Member_Class_Teacher"][0].cIsCoTeacher == "N" ? true : false;
                    if (!blnIsMainClassSelected) {
                        objReturnData = arrClassData[0];
                    } else {
                        if (strPreSelectedClassId === objData[strKeyName]["uClassId"])
                            objReturnData = objData[strKeyName];
                    }

                }
                else
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
    * @param {object} objSelectedClassData Selected Class Data
    * @param {Array} arrAvailableTeachers Array of available teachers
    * @summary Sets the application state for co-teacher and subject expert
    */
    SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, objSelectedClassData = {}, arrAvailableTeachers = []) {
        let objData = this.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext);
        let objNewData = {};
        if (objData) {
            objNewData = {
                ...objData,
                ["SelectedClassData"]: objSelectedClassData,
                ["AvailableTeachers"]: arrAvailableTeachers
            };
        }
        else {
            objNewData = {
                "SelectedClassData": objSelectedClassData,
                "AvailableTeachers": arrAvailableTeachers
            };
        }
        ApplicationState.SetProperty("SubjectExpert", objNewData);
    }

    /**
    * @name GetAvailableTeachers
    * @param {object} objContext Passes context object
    * @param {Array} arrSelectedTeachers Array of Selected Teachers
    * @summary Gets available teachers after filtering active ones from the already present class teachers.
    * @returns {Array} Array of available teachers
    */
    GetAvailableTeachers(objContext, arrSelectedTeachers) {
        let arrActiveTeachers = this.GetActiveTeachers(objContext);
        let arrAvailableTeachers = arrActiveTeachers.filter(objTempActiveTeacherDetails => {
            return arrSelectedTeachers.findIndex(strTempSelectedTeacherId => {
                return strTempSelectedTeacherId === objTempActiveTeacherDetails["uTeacherId"];
            }) < 0 && objTempActiveTeacherDetails["uTeacherId"] !== objContext.props.ClientUserDetails.UserId;
        });
        return arrAvailableTeachers;
    }

    /**
    * @name GetActiveTeachers
    * @param {object} objContext Passes context object
    * @summary  Returns the active teachers after filtering them from the data from backend.
    * @returns {Array} Array of active teachers
    */
    GetActiveTeachers(objContext) {
        let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrTeacherData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)) {
            arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"];
        }
        // DataRef(objContext.props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + strSchoolId)["Data"];

        let arrActiveTeachers = arrTeacherData.filter(objTeacherData => objTeacherData["t_TestDrive_Member_Teacher_School"].filter(objTempTeacherSchoolDetails => objTempTeacherSchoolDetails["uSchoolId"] === strSchoolId)[0]["cIsDeleted"] === "N");
        return arrActiveTeachers;
    }

    /**
   * @name GetClassDropdownMetaData
   * @summary Gets the meta data for Class dropdown
   * @returns {object} Meta data objects for Class dropdown
   */
    GetClassDropdownMetaData() {
        return {
            DisplayColumn: "vClassName",
            ValueColumn: "uClassId"
        };
    }

    /**
    * @name GetClassDropdownData
    * @param {Array} arrClassData Class Data
    * @param {String} strPreSelectClassId PreSelect Class Id
    * @summary Gets the data for Class dropdown
    * @returns {object} Meta objects for Class dropdown
    */
    GetClassDropdownData(arrClassData, strPreSelectClassId) {
        return {
            DropdownData: arrClassData ? arrClassData : [],
            SelectedValue: strPreSelectClassId
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
    * @name GetClassDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Class dropdown.
    * @returns {object} objEventBasics
    */
    GetClassDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.CoTeacherAndSubjectExpert_ModuleProcessor.HandleOnChangeClassDropDown(objContext, objItem)
        };
    }

    /**
    * @name HandleOnChangeClassDropDown
    * @param {object} objContext Passes context object
    * @param {object} objClassData Passes Class Data
    * @summary Handle sequence of events that should be triggered when Selection in ClassDropdown Changes
    */
    HandleOnChangeClassDropDown(objContext, objClassData) {
        let objPreveiouslySelectedTeachers = this.GetPreveiouslySelectedTeachers(objContext, objClassData);
        let arrAvailableTeachers = this.GetAvailableTeachers(objContext, objPreveiouslySelectedTeachers["SelectedTeachers"]);
        this.SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, objClassData, arrAvailableTeachers);
    }



    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown" ],
            "Files": []
        }
    }
}

export default CoTeacherAndSubjectExpert_ModuleProcessor;