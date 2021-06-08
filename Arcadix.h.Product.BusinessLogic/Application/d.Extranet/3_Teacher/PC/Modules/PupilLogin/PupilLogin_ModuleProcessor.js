//Objects required for module.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Cockpit_OfflineProcessDefinition from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessDefinition/OfflineProcessDefinition';
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_School_ClassLicense from '@shared/Object/d.Extranet/2_School/ClassLicense/ClassLicense';
import Extranet_PupilLogin_SavePupilLogin from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLogin_Module';

import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name PupilLogin_ModuleProcessor
* @summary Class for TeacherProfile module display and manipulate.
*/
class PupilLogin_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class",
            "Object_Extranet_Pupil_Pupil",
            "Object_Cockpit_OfflineProcessDefinition",
            "Object_Cockpit_OfflineProcess_OfflineProcessExecution",
            "Object_Extranet_Teacher_SchoolYearPeriod",
            "Object_Extranet_School_ClassLicense",
            "Object_Extranet_Teacher_Teacher",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/PupilLogin"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PupilLogin/PupilLogin.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PupilLogin/CreatePdfPopUp.css"
        ];
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrDataRequest = [];

        //Class
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //Pupil
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //School Year Period.
        let objSchoolYearPeriodParams = {
            "SearchQuery": {
                "must":
                    [
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
        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        //ClassLicense        
        Object_Extranet_School_ClassLicense.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_ClassLicense];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/PupilLogin"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Offline Process Definition
        let objOfflineProcessDefinitionParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "vOfflineProcessKeyword": "ExtranetPupilLogin"
                        }
                    }
                ]
            }
        };

        Object_Cockpit_OfflineProcessDefinition.Initialize(objOfflineProcessDefinitionParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_OfflineProcessDefinition];

        let strSchoolId = this.GetSchoolId(props);
        if (props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y") {
            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
            let arrFilteredUserPreference = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(x => x["vKey"] == "SelectedSchoolForTeacher");
            if (arrFilteredUserPreference.length > 0) {
                strSchoolId = arrFilteredUserPreference[0]["vValue"];
            }
        } else {
            strSchoolId = props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        }

        //Teacher
        let objTeacherParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": strSchoolId,
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        return arrDataRequest;
    }

    /**
     * @name GetSchoolId
     * @param {any} props
     */
    GetSchoolId(props) {
        let strSchoolId = "";
        if (props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y") {
            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
            let arrFilteredUserPreference = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(x => x["vKey"] == "SelectedSchoolForTeacher");
            if (arrFilteredUserPreference.length > 0) {
                strSchoolId = arrFilteredUserPreference[0]["vValue"];
            }
        } else {
            strSchoolId = props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        }
        return strSchoolId;
    }

    /**
    * @name GetPDFFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetPDFFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "outletBand", "SubNavigation", "TopSpace"],
            FooterIds: ["FooterPupil"]
        };
    }

    /**
    * @name GetLoginFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetLoginFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "outletBand", "SubNavigation", "PupilLoginHeader", "TopSpace"],
            FooterIds: ["FooterPupil"]
        };
    }

    /**
    * @name GetSchoolYearPeriodDropdownMetaData
    * @summary Gets the meta data for SchoolYearPeriod dropdown
    * @returns {object} Meta data objects for SchoolYearPeriod dropdown
    */
    GetSchoolYearPeriodDropdownMetaData() {
        return {
            DisplayColumn: "vSchoolYearName",
            ValueColumn: "uSchoolYearPeriodId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Member_Class_SchoolYearPeriod_Data"
        };
    }

    /**
    * @name GetSchoolYearPeriodDropdownData
    * @param {object} objCurrentSchoolYeraPeriod Current SchoolYearPeriod
    * @summary Gets the data for SchoolYearPeriod dropdown
    * @returns {object} Meta objects for SchoolYearPeriod dropdown
    */
    GetSchoolYearPeriodDropdownData(objCurrentSchoolYeraPeriod) {
        let strSchoolYearPeriodId = objCurrentSchoolYeraPeriod ? objCurrentSchoolYeraPeriod.uSchoolYearPeriodId : "";
        return {
            DropdownData: objCurrentSchoolYeraPeriod ? [objCurrentSchoolYeraPeriod] : [],
            SelectedValue: strSchoolYearPeriodId
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
    * @name GetSchoolYearPeriodDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetSchoolYearPeriodDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { }
        };
    }

    /**
    * @name GetPupilDataParams
    * @param {object} objContext Passes context object
    * @summary Get request params of pupil for the component.
    */
    GetPupilDataParams(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_Pupil_Pupil.GetData(objPupilParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        });
    }

    /**
    * @name GetPupilData
    * @param {object} objContext Passes context object
    * @summary Get pupil data
    * @returns {Array} PupilData
    */
    GetPupilData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrTempPupilData = [];
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        if (DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)) {
            arrTempPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        }
        let arrPupilData = arrTempPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
        return arrPupilData;
    }

    /**
    * @name GetCurrentSchoolYearPeriod
    * @param {Array} arrSchoolYearPeriodData Passes SchoolYearPeriodData
    * @summary Get current schoolyearperiod
    * @returns {Object} Current object
    */
    GetCurrentSchoolYearPeriod(arrSchoolYearPeriodData) {
        let dtCurrentDate = new Date();
        let objCurrent = arrSchoolYearPeriodData.find(x => dtCurrentDate > new Date(x["dtFromDate"]) && dtCurrentDate < new Date(x["dtToDate"]));
        return objCurrent;
    }

    /**
    * @name HasPackage
    * @param {object} objClass Class
    * @param {Array} arrLicenseData Passes LicenseData
    * @summary if it has package, return true, else false
    * @returns {boolean} true/false
    */
    HasPackage(objClass, arrLicenseData) {
        let objLicense = arrLicenseData.find(x => x["uClassId"] == objClass["uClassId"] && x["uSchoolYearPeriodId"] == objClass["uSchoolYearPeriodId"]);
        return objLicense && objLicense.cHasPackage == 'Y';
    }

    /**
    * @name GetOfflineProcessExecutionDataParams
    * @param {object} objContext Passes context object
    * @param {String} strOfflineProcessDefinitionId Passes OfflineProcessDefinitionId
    * @summary Returns Get data params for Offline Process Execution.
    * @returns {Array} OfflineProcessExecutionDataParams
    */
    GetOfflineProcessExecutionDataParams(objContext, strOfflineProcessDefinitionId) {
        return {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uOfflineProcessDefinitionId": strOfflineProcessDefinitionId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
    }

    /**
    * @name GetClassDropDownData
    * @param {object} objContext Passes context object
    * @summary Returns an array of classes to load in the drop down
    * @returns {Array} FinalClassData
    */
    GetClassDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PupilLogin", objContext.props);//DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/pupillogin")["Data"][0]["PupilLogin"];
        let arrTempClass = [];
        objTextResource = objTextResource ? objTextResource : {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            arrTempClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data.map((objClass) => {
                return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") };
            }).filter(objClass => objClass["t_TestDrive_Member_Class_Teacher"].length > 0);
        }
        let strTeacherId = global.ClientUserDetails.UserId;
        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        arrTempClass.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"; }) };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsSubjectExpert === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
            }
        });
        let arrFinalClassData = [
            {
                "Title": objTextResource["ClassDropDownMainClassTitle"],
                "Data": arrMainClassData
            },
            {
                "Title": objTextResource["ClassDropDownCoTeacherTitle"],
                "Data": arrCoTeacherClassData
            },
            {
                "Title": objTextResource["ClassDropDownSubjectExpertTitle"],
                "Data": arrSubjectExpertClassData
            }
        ];
        return arrFinalClassData;
    }

    /**
    * @name GetAllClasses
    * @param {object} objContext Passes context object
    * @summary  Returns all non deleted classes
    * @returns {Array} Classes
    */
    GetAllClasses(objContext) {
        let arrData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            arrData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        }

        let arrClasses = arrData.map((objTempData) => {
            return { ...objTempData, ["t_TestDrive_Member_Class_Teacher"]: objTempData["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => objClassTeacher["cIsDeleted"] === "N") };
        }).filter(objTempData => objTempData["t_TestDrive_Member_Class_Teacher"].length > 0);
        return arrClasses;
    }

    /**
    * @name HandlePdfPopup
    * @param {object} objContext Passes context object
    * @summary Opens and close AllPdfPopup
    */
    HandlePdfPopup(objContext) {
        objContext.state.Open === false ? objContext.dispatch({ type: "SET_STATE", payload: { "Open": true } }) : objContext.dispatch({ type: "SET_STATE", payload: { "Open": false } });
    }

    /**
    * @name GetLoginPdfAfterCreationIsDone
    * @param {object} objContext Passes context object
    * @summary Sets the state to open the pop up.
    */
    GetLoginPdfAfterCreationIsDone(objContext) {
        //objContext.dispatch({ type: "SET_STATE", payload: { "Open": true } });
    }

    /**
    * @name GetAllPupilIdsAndName
    * @param {object} objContext Passes context object
    * @summary  Extract and return all selected pupil id's from arrPupilData in local state.
    * @returns {Array} Pupil Ids
    */
    GetAllPupilIdsAndName(objContext) {
        let arrPupilIds = [];
        objContext.state.arrPupilData.forEach(objPupilDetails => {
            arrPupilIds = [...arrPupilIds, { "uPupilId": objPupilDetails["uPupilId"], "FullName": objPupilDetails["vFirstName"] + " " + objPupilDetails["vName"] }];
        });
        return arrPupilIds;
    }

    /**
    * @name GetSelectedPupilIds
    * @param {object} objContext Passes context object
    * @summary Extracts Pupil Ids form Selected
    * @returns {Array} Pupil Ids
    */
    GetSelectedPupilIds(objContext) {
        let arrPupilIds = [];
        objContext.state.arrSelectedPupil.forEach(objSelectedPupilDetails => {
            arrPupilIds = [...arrPupilIds, objSelectedPupilDetails["uPupilId"]];
        });
        return arrPupilIds;
    }

    /**
    * @name OnChangeClassDropDown
    * @param {object} objContext Passes context object
    * @param {object} objClassData Passes Class Data
    * @summary Triggers when the class dropdown selection changes
    */
    OnChangeClassDropDown(objContext, objClassData) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnClassChangedInDropdown": !objContext.state.blnClassChangedInDropdown, "arrSelectedPupil": [], "isSelectAll": false } });
    }

    /**
    * @name OnChangeCheckBoxItem
    * @param {object} objContext Passes context object
    * @param {String} strValue Passes Value
    * @param {String} strFullName Passes FullName
    * @param {boolean} blnIsChecked Passes IsChecked
    * @summary Triggers when the check box selection changes, strValue = uPupilId, but for select all strVlaue = "AllPupil"
    */
    OnChangeCheckBoxItem(objContext, strValue, strFullName, blnIsChecked) {
        if (strValue === "AllPupil") {
            if (blnIsChecked) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": true, "arrSelectedPupil": this.GetAllPupilIdsAndName(objContext) } });
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": false, "arrSelectedPupil": [] } });
            }
        }
        else if (strValue !== "AllPupil") {
            if (blnIsChecked) {
                if (objContext.state.arrPupilData.length === (objContext.state.arrSelectedPupil.length + 1)) {
                    objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": true, "arrSelectedPupil": [{ "uPupilId": strValue, "FullName": strFullName }, ...objContext.state.arrSelectedPupil] } });
                }
                else {
                    objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": false, "arrSelectedPupil": [{ "uPupilId": strValue, "FullName": strFullName }, ...objContext.state.arrSelectedPupil] } });
                }
            }
            else {
                if (objContext.state.isSelectAll) {
                    objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": false, "arrSelectedPupil": [{ "uPupilId": strValue, "FullName": strFullName }] } });
                }
                else {
                    objContext.dispatch({ type: "SET_STATE", payload: { "isSelectAll": false, "arrSelectedPupil": objContext.state.arrSelectedPupil.filter(objSelectedPupilDetails => { return objSelectedPupilDetails["uPupilId"] !== strValue; }) } });
                }
            }
        }
    }

    /**
    * @name GenerateLogins
    * @param {object} objContext Passes context object
    * @param {String} strProgressId Passes ProgressId
    * @summary Triggers when the send email button is clicked
    */
    GenerateLogins(objContext, strProgressId) {
        let arrSchoolYearPeriodData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod)) {
            arrSchoolYearPeriodData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        }
        let objCurrentSchoolYeraPeriod = objContext.PupilLogin_ModuleProcessor.GetCurrentSchoolYearPeriod(arrSchoolYearPeriodData);
        let objDataParams = {
            "Pupils": objContext.PupilLogin_ModuleProcessor.GetSelectedPupilIds(objContext),
            "ClassId": objContext.state.objSelectedClass["uClassId"],
            "ProgressId": strProgressId,
            "SchoolYearPeriodId": objCurrentSchoolYeraPeriod["uSchoolYearPeriodId"]
        };
        Extranet_PupilLogin_SavePupilLogin.SavePupilLogin(objDataParams, (objResponse) => {
            let arrPdfData = [...objResponse["Extranet_Teacher_PupilLogin_Module"].Data];
            let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin");
            let objOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
            let strOfflineExecutionKey = "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + objOfflineProcessDefinitionId
            let objOfflineExecutionData = {
                Filter: strOfflineExecutionKey,
                Value: {
                    Data: [...arrPdfData],
                    TimeStamp: "",
                    PrimaryKeyName: "uOfflineProcessExecutionId",
                    Count: arrPdfData.length
                }
            };
            ArcadixCacheData.AddData("Object_Cockpit_OfflineProcess_OfflineProcessExecution", objOfflineExecutionData, () => {

            });
            objContext.dispatch({ type: "SET_STATE", payload: { Open: true } });
        });
    }

    /**
    * @name DeleteGeneratedOfflineProcessExecution
    * @param {object} objContext Passes context object
    * @param {String} strOfflinePropcessExecutionId Passes OfflinePropcessExecutionId
    * @summary Deletes Offline process.
    */
    DeleteGeneratedOfflineProcessExecution(objContext, strOfflinePropcessExecutionId) {
        let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin");
        let strOfflinePropcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
        let objOfflineProcessExecutionParams = objContext.PupilLogin_ModuleProcessor.GetOfflineProcessExecutionDataParams(objContext, strOfflinePropcessDefinitionId);
        //let arrOfflineProcessExecutionParams = [
        //    {
        //        "URL": "API/Object/Framework/OfflineProcess/OfflineProcessExecution",
        //        "Params": this.GetOfflineProcessExecutionDataParams(objContext, strOfflinePropcessDefinitionId),
        //        "MethodType": "Get"
        //    }
        //];
        objOfflineProcessExecutionParams = {
            ...objOfflineProcessExecutionParams,
            ["vDeleteData"]: [{ "uOfflineProcessExecutionId": strOfflinePropcessExecutionId }]
        };
        //DataCall(arrOfflineProcessExecutionDeleteDataParams);
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.DeleteData(objOfflineProcessExecutionParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        });
    }

    /**
     * @name OpenConfirmationPopup  
     * @param {object} objContext Passes context object
     * @summary This popup is to confirm whether to start with the progressbar for pupillogin generation
    */
    OpenConfirmationPopup(objContext, RightArrowImage) {
        let objTextResource = { ...Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PupilLogin", objContext.props) };
        if (objContext.state.arrSelectedPupil.length > 0) {
            let objVaribales = {};
            if (objContext.state.isSelectAll) {
                objVaribales = {
                    Variable_1: objContext.state.objSelectedClass.vClassName
                };
            } else {
                let InnerPupilName = "<div class='clsLoginName'>  ";
                objContext.state.arrSelectedPupil.map(objSelectedPupil => {
                    InnerPupilName += "<div class='clsLoginName-items'><img src='" + RightArrowImage + "' alt='No Icon' />  " + objContext.state.objSelectedClass.vClassName + ', ' + objSelectedPupil['FullName'] + "</div>"
                })
                InnerPupilName += " </div>";
                objTextResource["ConfirmationPopup_ConfirmText"] = InnerPupilName;
            }
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": false,
                    "CssClassName": "pupil-login-confirmation-popup",
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath,
                    TextResourcesKey: "ConfirmationPopup",
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (objModal) => {
                        Popup.ClosePopup(objModal)
                        objContext.dispatch({ type: "SET_STATE", payload: { "OpenProgressBar": true } });
                    }
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "Width": "380px",
                    "Height": "auto",
                    "ShowHeader": true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath,
                    TextResourcesKey: "CreatePdfPopup"
                },
                Events: {},
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenProgressBarPopup
     * @param {object} objContext Passes context object
     * @summary Opens progress bar pop up and passes event to generate pupil login
     */
    OpenProgressBarPopup(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PupilLogin", objContext.props);
        Popup.ShowProgressBarPopup({
            "Data": {
                HeaderTitle: "Pupil login"
            },
            "Meta": {
                "ShowProgressStatus": "N",
                "HasCloseButton": "N",
                "HasCancelButton": "Y",
                "StartProgressOnLoad": true,
                "CloseProgessBarOnComplete": "Y"
            },
            "Resource": {
                "Text": objTextResource,
                "TextResourcesKey": "PupilLoginProgressBarPopup",
                "SkinPath": JConfiguration.ExtranetSkinPath
            },
            "Events": {
                StartProgress: (strProgressBarID) => { objContext.PupilLogin_ModuleProcessor.GenerateLogins(objContext, strProgressBarID); },
                OnProgressComplete: () => { objContext.PupilLogin_ModuleProcessor.GetLoginPdfAfterCreationIsDone(objContext); }
            },
            "CallBacks": {}
        });
    }

    GetOfflineExecutionLoaded(objContext) {
        let objOfflineProcessDefinition = {};
        if (DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin")) {
            objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin");
        }
        let objOfflineProcessDefinitionId = "";
        if (objOfflineProcessDefinition.Data && objOfflineProcessDefinition.Data.length > 0) {
            objOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
        }
        let objOfflineProcessExecution = undefined;
        if (DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + objOfflineProcessDefinitionId)) {
            objOfflineProcessExecution = DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + objOfflineProcessDefinitionId)["Data"];
        }

        return objOfflineProcessExecution ? true : false;
    }

    /**
     * @name GetOfflineFileName
     * @param {any} objContext
     * @param {any} objOfflinePropcessExecutionData
     */
    GetOfflineFileName(objContext, objOfflinePropcessExecutionData) {
        let strSchoolId = objContext.PupilLogin_ModuleProcessor.GetSchoolId(objContext.props);
        let strFileName = objOfflinePropcessExecutionData["t_TestDrive_OfflineProcess_Execution_File"][0]["vFileName"];
        let arrTeacher = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"];
        let strTeacherId = objOfflinePropcessExecutionData["uUserId"];
        let arrFilteredTeacher = arrTeacher.filter(x => x["uTeacherId"] == strTeacherId);
        let strTeacherName = "";
        if (arrFilteredTeacher.length > 0) {
            strTeacherName = arrFilteredTeacher[0]["vName"] + " " + arrFilteredTeacher[0]["vFirstName"];
        }
        let strTime = Localization.DateTimeFormatter(objOfflinePropcessExecutionData["dtCreatedOn"])
        let strFormattedTime = strTime.substring(0, strTime.lastIndexOf(":"));
        return strFileName + " (" + strTeacherName + "), " + strFormattedTime;
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

export default PupilLogin_ModuleProcessor;