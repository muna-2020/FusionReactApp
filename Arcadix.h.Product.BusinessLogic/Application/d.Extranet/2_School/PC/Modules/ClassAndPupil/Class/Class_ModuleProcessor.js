//Objects required for module.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';

import SignalRService from '@root/Application/d.Extranet/5_Shared/PC/Services/SignalRService/SignalRService';


import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name Class_ModuleProcessor
 * @summary Class for Class_ModuleProcessor module display and manipulate.
 */
class Class_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of store objects used in the module
    * @returns {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_SchoolYear",
            "Object_Extranet_Teacher_SchoolYearPeriod",
            "Object_Extranet_Teacher_Class",
            "Object_Extranet_Teacher_Teacher"
        ];
    }

    /**
     * @name GetClassDataFromApplicationState
     * @param {object} objContext objContext
     * @summary Returns the Selected class data from application state.
     * @returns {*} Object
     */
    GetClassDataFromApplicationState() {
        let objData = ApplicationState.GetProperty("ClassAndPupil");
        if (objData) {
            return objData["SelectedClassData"];
        }
        return null;
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown", "Grid"],
            "Files": []
        }
    }


    /**
     * @name SetApplicationState
     * @param {*} objContext objContext
     * @param {*} objClassData objClassData
     * @summary Sets the selected class to application state inside ClassAndPupil key.
     * @returns {*} boolean value
     */
    SetApplicationState(objContext, objClassData) {


        let objData = objContext.Class_ModuleProcessor.GetClassDataFromApplicationState();
        let objNewData = {};
        if (objClassData === undefined || (objClassData["IsNewRow"] && objClassData["IsNewRow"] === true)) {
            return false;
        }
        if (objData === null || JSON.stringify(objData) === "{}" || objData["uClassId"] !== objClassData["uClassId"]) {
            objNewData = {
                "SelectedClassData": objClassData
            };
            ApplicationState.SetProperty("ClassAndPupil", objNewData);
            return true;
        }
        return false;
    }

    /**
     * @name GetTeachers
     * @param {*} objContext objContext
     * @summary Returns an array of teachers. 
     * @returns {*} returns an array
     */
    GetTeachers(objContext) {
        let strUserId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);
        let arrTempTeachers = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strUserId + ";t_TestDrive_Member_Teacher_School.cIsDeleted;N").Data;
        let arrTeachers = arrTempTeachers.map(objTempTeacher => {
            return {
                ...objTempTeacher, ["t_TestDrive_Member_Teacher_School"]: objTempTeacher["t_TestDrive_Member_Teacher_School"]
                    .filter(objTempTeacherSchool => objTempTeacherSchool.cIsDeleted === 'N')
            };
        }).filter(objTempTeacher => objTempTeacher["t_TestDrive_Member_Teacher_School"].length > 0);
        return arrTeachers;
    }

    /**
     * @name GetFilteredClass
     * @param {*} objContext objContext
     * @param {*} arrClassTeacher arrClassTeacher
     * @param {*} charIsDeleted charIsDeleted
     * @summary Returns the classes filtered on the basis of active teachers and toggle selected
     * @returns {*} returns an  array
     */
    GetFilteredClass(objContext, arrClassTeacher, charIsDeleted) {
        let arrTempClassTeacher = [];
        if (charIsDeleted && charIsDeleted === 'N') {
            arrTempClassTeacher = arrClassTeacher.filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.cIsDeleted === "N" });
        }
        else if (charIsDeleted && charIsDeleted === 'Y') {
            arrTempClassTeacher = arrClassTeacher.filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.cIsDeleted === "Y" });
        }
        else {
            arrTempClassTeacher = arrClassTeacher.filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" });
        }
        let arrCT = [];
        if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props)) {
            let arrTempTeachers = objContext.Class_ModuleProcessor.GetTeachers(objContext);
            arrTempClassTeacher.forEach(objTempClassTeacher => {
                if (arrTempTeachers.filter(objTeacher => { return objTeacher.uTeacherId === objTempClassTeacher.uTeacherId }).length > 0) {
                    arrCT = [...arrCT, objTempClassTeacher];
                }
            });
        }
        return arrCT;
    }

    /**
     * @name GetClassesForTeacher
     * @param {*} objContext objContext
     * @param {*} intActivationStatusToggle intActivationStatusToggle
     * @param {*} uTeacherId uTeacherId
     * @summary Used in Teacher Extranet Application. Returns array of classes based on Activation Status and Teacher.
     * @returns {*} returns an array
     */
    GetClassesForTeacher(objContext, intActivationStatusToggle = -1) {
        let arrTempClasses = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data;
        let arrClasses = [];
        let blnAllClasses = objContext.state.intClassAndTeamTeacherStatusToggleData == -1;
        let blnMainClasses = objContext.state.intClassAndTeamTeacherStatusToggleData == 1;
        let blnTeamTeacherClasses = objContext.state.intClassAndTeamTeacherStatusToggleData == 2;

        let strTeacherId = objContext.props.ClientUserDetails.UserId;
        if (intActivationStatusToggle === 1) {
            arrClasses = arrTempClasses
                .filter(x =>
                    x["t_TestDrive_Member_Class_Teacher"]
                        .filter(y =>
                            y["uTeacherId"] == strTeacherId
                            && y["cIsDeleted"] == "N"
                            && y["cIsSubjectExpert"] == "N"
                            && (
                                blnAllClasses
                                || (
                                    y["cIsCoTeacher"] == blnMainClasses ? "N" : "Y"
                                )
                            )
                        ).length > 0
                ).map(x => x);
        }
        else if (intActivationStatusToggle === 2) {
            arrClasses = arrTempClasses
                .filter(x =>
                    x["t_TestDrive_Member_Class_Teacher"]
                        .filter(y =>
                            y["uTeacherId"] == strTeacherId
                            && y["cIsDeleted"] == "Y"
                            && y["cIsSubjectExpert"] == "N"
                            && (
                                blnAllClasses
                                || (
                                    y["cIsCoTeacher"] == blnMainClasses ? "N" : "Y"
                                )
                            )
                        ).length > 0
                ).map(x => x);
        }
        else {
            arrClasses = arrTempClasses
                .filter(x =>
                    x["t_TestDrive_Member_Class_Teacher"]
                        .filter(y =>
                            y["uTeacherId"] == strTeacherId
                            && y["cIsSubjectExpert"] == "N"
                            && (
                                blnAllClasses
                                || (
                                    y["cIsCoTeacher"] == blnMainClasses ? "N" : "Y"
                                )
                            )
                        ).length > 0
                ).map(x => x);
        }
        return arrClasses;
    }

    /**
     * @name GetClassesForSchool
     * @param {*} objContext objContext
     * @param {*} intActivationStatusToggle intActivationStatusToggle
     * @param {*} uTeacherId uTeacherId
     * @summary Used in School Extranet Application. Returns array of classes based on Activation Status and Teacher.
     * @returns {*} returns an array
     */
    GetClassesForSchool(objContext, intActivationStatusToggle = -1, uTeacherId = "") {
        let strUserId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);
        let arrTempClasses = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + strUserId).Data;
        let arrClasses = [];
        if (intActivationStatusToggle === 1) {
            if (uTeacherId && uTeacherId !== "") {
                arrClasses = arrTempClasses.map(objTempClass => {
                    return {
                        ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objTempClass["t_TestDrive_Member_Class_Teacher"]
                            .filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.cIsDeleted === "N" && objTempClassTeacher.uTeacherId === uTeacherId })
                    };
                }).filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
            }
            else {
                arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objContext.Class_ModuleProcessor.GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"], "N") } })
                    .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
            }
        }
        else if (intActivationStatusToggle === 2) {
            if (uTeacherId && uTeacherId !== "") {
                arrClasses = arrTempClasses.map(objTempClass => {
                    return {
                        ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objTempClass["t_TestDrive_Member_Class_Teacher"]
                            .filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.cIsDeleted === "Y" && objTempClassTeacher.uTeacherId === uTeacherId })
                    };
                }).filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
            }
            else {
                arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objContext.Class_ModuleProcessor.GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"], "Y") } })
                    .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
            }
        }
        else {
            if (uTeacherId && uTeacherId !== "") {
                arrClasses = arrTempClasses.map(objTempClass => {
                    return {
                        ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objTempClass["t_TestDrive_Member_Class_Teacher"]
                            .filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.uTeacherId === uTeacherId })
                    };
                })
                    .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
            }
            else {
                arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objContext.Class_ModuleProcessor.GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"]) } })
                    .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
            }
        }
        return arrClasses;
    }

    /**
     * @name GetDefaultClass
     * @param {*} objContext objContext
     * @summary Retuns a class with default values.
     * @returns {*} returns an object
     */
    GetDefaultClass(objContext) {
        let arrSchoolYear = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N").Data;
        let arrSchoolYearPeriod = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N").Data;
        let arrClasses = [];
        let uSchoolId = "";
        let iStateId = "";
        let uTeacherId = "";
        if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props)) {
            arrClasses = objContext.Class_ModuleProcessor.GetClassesForSchool(objContext, -1, objContext.state.uTeacherId);
            uSchoolId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);
            iStateId = objContext.Class_ModuleProcessor.GetStateIdByApplicationType(objContext);
            uTeacherId = objContext.state.uTeacherId === "" ? objContext.Class_ModuleProcessor.GetTeachers(objContext)[0].t_TestDrive_Member_Teacher_School[0].uTeacherId : objContext.state.uTeacherId;
        }
        else if (JConfiguration.ApplicationTypeId === "1") {
            arrClasses = objContext.Class_ModuleProcessor.GetClassesForTeacher(objContext, -1);
            uSchoolId = objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId;
            iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
            uTeacherId = objContext.props.ClientUserDetails.UserId;
        }
        let objClass = {
            ...arrClasses[0],
            vClassName: "",
            cIsDeleted: "N",
            iSchoolYear: arrSchoolYear[0].iSchoolYear,
            uClassId: "00000000-0000-0000-0000-000000000000",
            uSchoolYearPeriodId: arrSchoolYearPeriod[0].uSchoolYearPeriodId,
            uUserId: objContext.props.ClientUserDetails.UserId,
            t_TestDrive_Member_Class_Teacher: [{
                cIsCoTeacher: "N",
                cIsDeleted: "N",
                cIsSubjectExpert: "N",
                dtWhenFirstLoggedIntoClass: null,
                dtWhenLoginEmailSent: null,
                iStateId: iStateId,
                uClassId: "00000000-0000-0000-0000-000000000000",
                uSchoolId: uSchoolId,
                uTeacherId: uTeacherId
            }]
        };
        return objClass;
    }

    /**
     * @name GetActivationStatusToggleData
     * @param {*} objContext objContext
     * @summary Returs an array for Activation Status Toggle dropdown
     * @returns {*} returns an array
     */
    GetActivationStatusToggleData(objContext) {
        let objTextResource = objContext.props.TextResource;
        return [
            { key: Localization.TextFormatter(objTextResource, 'ClassDropdownAllItem'), value: -1 },
            { key: Localization.TextFormatter(objTextResource, 'ClassDropdownActiveItem'), value: 1 },
            { key: Localization.TextFormatter(objTextResource, 'ClassDropdownInactiveItem'), value: 2 }
        ];
    }

    /**
     * @name GetClassAndTeamTeacherStatusToggleData
     * @param {*} objContext objContext
     * @summary Returs an array for Activation Status Toggle dropdown
     * @returns {*} returns an array
     */
    GetClassAndTeamTeacherStatusToggleData(objContext) {
        let objTextResource = objContext.props.TextResource;
        return [
            { key: Localization.TextFormatter(objTextResource, 'ClassDropdownAllTeacher'), value: -1 },
            { key: Localization.TextFormatter(objTextResource, 'ClassDropdownClassTeacher'), value: 1 },
            { key: Localization.TextFormatter(objTextResource, 'ClassDropdownTeamTeacher'), value: 2 }
        ];
    }

    /**
     * @name GetColumns
     * @param {*} objContext objContext
     * @summary Get Coulmns Headers for the grid, Passed to the grid.
     * @returns {*} returns an array
     */
    GetColumns(objContext) {
        let arrGridColumns = objContext.props.GridConfiguration["t_Framework_ObjectConfiguration_Column"];
        if (objContext.props.ClientUserDetails.ApplicationTypeId == "1") {
            if (objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y") {
                arrGridColumns = objContext.props.GridConfiguration["t_Framework_ObjectConfiguration_Column"].filter(objItem => objItem["vColumnName"] != "Edit");
            }
        }
        return arrGridColumns;
    }

    /**
     * @name GetDropdownData
     * @param {*} objContext objContext
     * @summary Gives dropdown data to be displayed in the grid, Passed to the grid.
     * @returns {*} returns an object
     */
    GetDropdownData(objContext) {
        let objDropdownData = {};
        let arrSchoolYearPeriod = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N").Data;
        let arrSortedSchoolYearPeriod = arrSchoolYearPeriod.sort((a, b) => a["iDisplayOrder"] - b["iDisplayOrder"]);

        let objTempDropdownData = {
            uSchoolYearPeriodId:
            {
                "IsLanguageDependent": "Y",
                "ValueColumn": "uSchoolYearPeriodId",
                "DisplayColumn": "vSchoolYearName",
                "DependingTableName": "t_TestDrive_Member_Class_SchoolYearPeriod_Data",
                Data: arrSortedSchoolYearPeriod
            },
            iSchoolYear: {
                "IsLanguageDependent": "Y",
                "ValueColumn": "iSchoolYear",
                "DisplayColumn": "vSchoolYearName",
                "DependingTableName": "t_TestDrive_Member_Class_SchoolYear_Data",
                "Data": DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N").Data
            }
        };
        if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props)) {
            objDropdownData = {
                ...objTempDropdownData, ["t_TestDrive_Member_Class_Teacher.uTeacherId"]:
                {
                    "IsLanguageDependent": "N",
                    "ValueColumn": "uTeacherId",
                    "DisplayColumn": "vFirstName,vName",
                    "Data": objContext.Class_ModuleProcessor.GetTeachers(objContext)
                }
            };
        }
        else if (JConfiguration.ApplicationTypeId === "1") {
            objDropdownData = { ...objTempDropdownData };
        }
        return objDropdownData;
    }

    /**
     * @name GetActionButtons
     * @param {*} objContext objContext
     * @param {*} maxHeight maxHeight
     * @param {*} maxWidth maxWidth
     * @param {*} minHeight minHeight
     * @param {*} minWidth minWidth
     * @summary Returns ACTIVATE AND DEACTIVATE buttons, Passed to the grid.
     * @returns {*} returns an array
     */
    GetActionButtons(objContext) {
        let objTextResource = objContext.props.TextResource;
        return [
            {
                "Key": "ExtraButton",
                "Type": "ExtraButton",
                "Text": Localization.TextFormatter(objTextResource, 'ImportPupilButtonText'),
                "ImagePath": "/Images/Common/Icons/GridUpload.svg",
                "Action": (ActionObject) => {
                    ApplicationState.SetProperty("blnShowAnimation", true);

                    Popup.ShowPopup({
                        Data: {
                            ClassData: ActionObject
                        },
                        Meta: {
                            PopupName: 'ImportPupilPopUp',
                            ShowHeader: false,
                            ShowCloseIcon: false,
                            Height: 'auto',
                            Width: '85%'
                        },
                        Resource: {
                            Text: {
                                "objClassTextResource": objTextResource,
                                "objPupilTextResource": objContext.props.PupilTextResource
                            },
                            SkinPath: JConfiguration.ExtranetSkinPath
                        },
                        Events: {},
                        CallBacks: {}
                    });
                }
            },
            {
                "Key": "Activate",
                "Type": "Activate",
                "Text": Localization.TextFormatter(objTextResource, 'ActivateButtonText'),
                "ImagePath": "/Images/Common/Icons/GridDelete.svg",
                "Action": (ActionObject, GridCallBack) => {
                    let objTempClass = { ...ActionObject, ["t_TestDrive_Member_Class_Teacher"]: [{ ...ActionObject["t_TestDrive_Member_Class_Teacher"][0], ["cIsDeleted"]: "N" }] };
                    objContext.Class_ModuleProcessor.EditClass(objContext, objTempClass, GridCallBack);

                }
            },
            {
                "Key": "Deactivate",
                "Type": "Deactivate",
                "Text": Localization.TextFormatter(objTextResource, 'DeactivateButtonText'),
                "ImagePath": "/Images/Common/Icons/GridDelete.svg",
                "Action": (ActionObject, GridCallBack) => {
                    objContext.Class_ModuleProcessor.DeleteClass(objContext, ActionObject, GridCallBack);
                }
            }
        ];
    }

    /**
     * @name CheckForHideAddButton
     * @summary checks to hide or display the Add button in grid.
     * @param {any} objContext
     */
    CheckForHideAddButton(objContext) {
        let blnHideAddButton = false;
        if (objContext.props.JConfiguration.ApplicationTypeId === "6" || (objContext.props.JConfiguration.ApplicationTypeId === "1" && objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y")) {
            let arrTeacherData = objContext.Class_ModuleProcessor.GetTeachers(objContext);
            blnHideAddButton = arrTeacherData.length > 0 ? false : true;
        }
        return blnHideAddButton;
    }

    /**
     * @name GetHeaderButtons
     * @param {*} objContext objContext
     * @summary Gives Buttons on the top of the grid, Passed to the grid.
     * @returns {*} returns an array
     */
    GetHeaderButtons(objContext) {
        if (objContext.state.intActivationStatusToggleData === 2 || this.CheckForHideAddButton(objContext)) {
            return [];
        }
        else {
            let objTextResource = objContext.props.TextResource;
            let arrHeaderButonData = [];
            let cIsExternalUser = false;
            if (JConfiguration.ApplicationTypeId === "1") {
                cIsExternalUser = (objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y" && objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "N") ? true : false;

            }
            if (objContext.state.intActivationStatusToggleData !== 2 && !cIsExternalUser) {
                let objAddHeaderButonData = {
                    "Key": "Add",
                    "Type": "Add",
                    "Text": Localization.TextFormatter(objTextResource, 'AddButtonText'),
                    "ImageType": "HeaderButtonImage_PlusWhite",
                    ModuleEvent: () => { ApplicationState.SetProperty("ClassAndPupil", undefined) }
                };
                arrHeaderButonData = [objAddHeaderButonData];
            }
            return arrHeaderButonData;
        }
    }

    /**
     * @name DeleteEmptyRow
     * @param {*} objContext objContext
     * @summary Delete the newly added class.
     */
    DeleteEmptyRow(objContext) {
        if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props)) {
            objContext.dispatch({ type: "SET_STATE", payload: { "arrClassGridData": objContext.Class_ModuleProcessor.GetClassesForSchool(objContext, objContext.state.intActivationStatusToggleData, objContext.state.uTeacherId), "isNewRowAdded": false } });
        }
        else if (JConfiguration.ApplicationTypeId === "1") {
            objContext.dispatch({ type: "SET_STATE", payload: { "arrClassGridData": objContext.Class_ModuleProcessor.GetClassesForTeacher(objContext, objContext.state.intActivationStatusToggleData), "isNewRowAdded": false } });
        }
    }

    /**
     * @name SaveMethod
     * @param {*} objContext objContext
     * @param {*} objSaveData objSaveData
     * @param {*} GridCallBack GridCallBack
     * @summary Toggle objSaveData for new/edited class and calls EditClass or SaveClass.
     */
    SaveMethod(objContext, objSaveData, GridCallBack) {
        if (!objSaveData["IsNewRow"]) {
            objContext.Class_ModuleProcessor.EditClass(objContext, objSaveData, GridCallBack);
        }
        else {
            objContext.Class_ModuleProcessor.SaveClass(objContext, objSaveData, GridCallBack);
        }
    }

    /**
     * @name HandleOnClickRow
     * @param {*} objContext objContext
     * @param {*} objClassData objClassData    
     * @summary Set ApplicationState 
     */
    HandleOnClickRow(objContext, objClassData) {
        let objSelectedClassData = objClassData;
        if (JConfiguration.ApplicationTypeId === "1") {
            if (ClientUserDetails.TeacherDetails.cIsExternalMember == 'Y') {
                objSelectedClassData = objClassData["SelectedRow"];
            }
            let arrClassTeacher = objSelectedClassData.t_TestDrive_Member_Class_Teacher.filter(objTeacher => objTeacher["uTeacherId"] == ClientUserDetails.TeacherDetails.uTeacherId);
            let strClassDeleted = arrClassTeacher.length > 0 ? arrClassTeacher[0].cIsDeleted : "";
            if (!objSelectedClassData.IsNewRow && strClassDeleted != "Y") {
                let strClassId = ApplicationState.GetProperty("SelectedClassId");
                if (strClassId !== objSelectedClassData["t_TestDrive_Member_Class_Teacher"][0]["uClassId"]) {
                    objContext.Class_ModuleProcessor.EditUserPreference(objContext, objSelectedClassData["t_TestDrive_Member_Class_Teacher"][0]["uClassId"]);
                }
            }
        }

        if (objContext.Class_ModuleProcessor.SetApplicationState(objContext, objSelectedClassData)) {
            ApplicationState.SetProperty("blnShowAnimation", true);
        }
    }

    /**
     * @name HandleDropDownForTeacher
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Fired when the dropdown data of teacher dropdown chamges.
     */
    HandleDropDownForTeacher(objContext, objItem) {
        let arrClasses = objContext.Class_ModuleProcessor.GetClassesForSchool(objContext, objContext.state.intActivationStatusToggleData, objItem.uTeacherId ? objItem.uTeacherId : "");
        objContext.dispatch({ type: "SET_STATE", payload: { "arrClassGridData": arrClasses, "uTeacherId": objItem.uTeacherId, "isNewRowAdded": false } });
        if (arrClasses && arrClasses.length > 0) {
            objContext.Class_ModuleProcessor.SetApplicationState(objContext, arrClasses[0]);
        }
        else {
            objContext.Class_ModuleProcessor.SetApplicationState(objContext, objContext.Class_ModuleProcessor.GetDefaultClass(objContext));
        }
    }

    /**
     * @name HandleActivationStatusToggle
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Fired when the dropdown data of activation status dropdown chamges. Toggle between All, Active and Inactive classes.
     */
    HandleActivationStatusToggle(objContext, objItem) {
        let arrClasses = [];
        if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props)) {
            arrClasses = objContext.Class_ModuleProcessor.GetClassesForSchool(objContext, objItem.value, objContext.state.uTeacherId);
            if (arrClasses && arrClasses.length > 0) {
                objContext.Class_ModuleProcessor.SetApplicationState(objContext, arrClasses[0]);
            }
            else {
                objContext.Class_ModuleProcessor.SetApplicationState(objContext, objContext.Class_ModuleProcessor.GetDefaultClass(objContext));
            }
        }
        else if (JConfiguration.ApplicationTypeId === "1") {
            arrClasses = objContext.Class_ModuleProcessor.GetClassesForTeacher(objContext, objItem.value);
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let arrClassData = arrClasses.filter(objClass => objClass.uClassId === strClassId);
            let objClassData = {};
            if (arrClassData.length > 0) {
                objClassData = arrClassData[0];
            }
            if (objClassData === undefined || JSON.stringify(objClassData) === "{}") {
                objContext.Class_ModuleProcessor.SetApplicationState(objContext, objContext.Class_ModuleProcessor.GetDefaultClass(objContext));
            }
            else {
                objContext.Class_ModuleProcessor.SetApplicationState(objContext, objClassData);
            }
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "intActivationStatusToggleData": objItem.value, "arrClassGridData": arrClasses, "isNewRowAdded": false } });
    }

    /**
     * @name HandleClassAndTeamTeacherStatusToggle
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary Fired when the dropdown data of TeamTeacher and ClassTeacher status dropdown changes. Toggle between All, Active and Inactive classes.
     */
    HandleClassAndTeamTeacherStatusToggle(objContext, objItem) {
        let arrClasses = [];

        if (JConfiguration.ApplicationTypeId === "1") {
            arrClasses = objContext.Class_ModuleProcessor.GetClassAndTeamTeacher(objContext, objItem.value);
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let arrClassData = arrClasses.filter(objClass => objClass.uClassId === strClassId);
            let objClass = {};
            if (arrClassData.length == 0) {
                if (arrClasses.length == 0) {
                    objClass = objContext.Class_ModuleProcessor.GetDefaultClass(objContext);
                } else {
                    objClass = arrClasses[0];
                }
            }
            else {
                objClass = arrClassData[0];
            }
            //objContext.Class_ModuleProcessor.SetApplicationState(objContext, objClass);
            objContext.Class_ModuleProcessor.HandleOnClickRow(objContext, objClass);
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "intClassAndTeamTeacherStatusToggleData": objItem.value, "arrClassGridData": arrClasses, "isNewRowAdded": false } });
    }

    GetClassAndTeamTeacher(objContext, intClassAndTeamTeacherStatusToggleData = -1) {

        let blnAllClasses = objContext.state.intActivationStatusToggleData == -1;
        let blnNonDeletedClasses = objContext.state.intActivationStatusToggleData == 1;

        let arrTempClasses = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data;
        let arrClasses = [];
        if (intClassAndTeamTeacherStatusToggleData === 1) {
            arrClasses = arrTempClasses
                .filter(x =>
                    x["t_TestDrive_Member_Class_Teacher"]
                        .filter(objTempClassTeacher =>
                            objTempClassTeacher.uTeacherId == objContext.props.ClientUserDetails.UserId
                            && objTempClassTeacher.cIsCoTeacher == "N"
                            && objTempClassTeacher.cIsSubjectExpert == "N"
                            && (
                                blnAllClasses || (objTempClassTeacher.cIsDeleted == (blnNonDeletedClasses ? "N" : "Y"))
                            )
                        ).length > 0)
                .map(x => x);
        }
        else if (intClassAndTeamTeacherStatusToggleData === 2) {
            arrClasses = arrTempClasses
                .filter(x =>
                    x["t_TestDrive_Member_Class_Teacher"]
                        .filter(objTempClassTeacher =>
                            objTempClassTeacher.uTeacherId == objContext.props.ClientUserDetails.UserId
                            && objTempClassTeacher.cIsCoTeacher == "Y"
                            && objTempClassTeacher.cIsSubjectExpert == "N"
                            && (
                                blnAllClasses || (objTempClassTeacher.cIsDeleted == (blnNonDeletedClasses ? "N" : "Y"))
                            )
                        ).length > 0)
                .map(x => x);
        }
        else {
            arrClasses = arrTempClasses
                .filter(x =>
                    x["t_TestDrive_Member_Class_Teacher"]
                        .filter(objTempClassTeacher =>
                            objTempClassTeacher.uTeacherId == objContext.props.ClientUserDetails.UserId
                            && (
                                blnAllClasses || (objTempClassTeacher.cIsDeleted == (blnNonDeletedClasses ? "N" : "Y"))
                            )
                        ).length > 0)
                .map(x => x);
        }
        return arrClasses;
    }

    /**
     * @name EditUserPreference
     * @param {*} objContext objContext
     * @param {*} strClassId strClassId
     * @summary Sends an api request to edit the user preference. 0->Return params, 1-> Make api call to change data in the DB.
     */
    EditUserPreference(objContext, strClassId) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
                return objTempPreference["vKey"] === "CurrentSelectedClassId" ? { ...objTempPreference, "vValue": strClassId } : objTempPreference
            })
        };
        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            "vEditData": objNewUserPreference
        };
        Object_Cockpit_UserPreference.UserPrefernceEditData(objUserPreferenceParams, (objReturn) => {
            let strUserPreferenceFilterKey = "Object_Cockpit_UserPreference;uUserId;" + objContext.props.ClientUserDetails.UserId;
            let arrUserPreference = objReturn["Object_Cockpit_UserPreference"][strUserPreferenceFilterKey].Data;
            let strClassId = "";
            let objUserPreference = {};
            if (arrUserPreference.length > 0) {
                objUserPreference = arrUserPreference[0];
                let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(objTempUserPreferenceValue => objTempUserPreferenceValue["vKey"] === "CurrentSelectedClassId");
                if (arrUserPreferenceValue.length > 0) {
                    strClassId = arrUserPreferenceValue[0]["vValue"];
                    ApplicationState.SetProperty("SelectedClassId", strClassId);
                    ApplicationState.SetProperty("UserPreferenceObject", objUserPreference);
                }
            }
        });
    }

    /**
     * @name SaveClass
     * @param {*} objContext objContext
     * @param {*} objClassData objClassData
     * @param {*} GridCallBack GridCallBack
     * @summary Save class
     */
    SaveClass(objContext, objClassData, GridCallBack) {
        let objClassParams = {};
        let strSchoolId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);

        if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props)) {
            let objNewClassData = {
                ...objClassData,
                ["t_TestDrive_Member_Class_Teacher"]: [{
                    ...objClassData["t_TestDrive_Member_Class_Teacher"][0],
                    "cIsCoTeacher": "N",
                    "cIsSubjectExpert": "N",
                    "dtWhenLoginEmailSent": null,
                    "dtWhenFirstLoggedIntoClass": null,
                    "uSchoolId": strSchoolId
                }]
            };
            objClassParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Class_Teacher",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Class_Teacher.uSchoolId": strSchoolId
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                ["vAddData"]: objNewClassData,
                ["uUserId"]: strSchoolId
            };
        }
        else if (JConfiguration.ApplicationTypeId === "1") {
            let objNewClassData = {
                ...objClassData,
                ["t_TestDrive_Member_Class_Teacher"]: [{
                    "uTeacherId": objContext.props.ClientUserDetails.UserId,
                    "cIsCoTeacher": "N",
                    "cIsSubjectExpert": "N",
                    "dtWhenLoginEmailSent": null,
                    "dtWhenFirstLoggedIntoClass": null,
                    "uSchoolId": strSchoolId
                }]
            };
            objClassParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                    "Type": "nested"
                },
                ["vAddData"]: objNewClassData,
                ["uUserId"]: objContext.props.ClientUserDetails.UserId
            };
        }
        Object_Extranet_Teacher_Class.AddData(objClassParams, (arrReturnClassData) => {
            //Creating new SignalR connection and Adding SignalR Event Listener

            if (arrReturnClassData.length > 0) {
                objContext.Class_ModuleProcessor.SetApplicationState(objContext, arrReturnClassData[0])
            }

            //if (arrReturnClassData.length > 0 && objContext.Class_ModuleProcessor.SetApplicationState(objContext, arrReturnClassData[0])) {
            //    ApplicationState.SetProperty("blnShowAnimation", true);
            //}

            let objSignalRService = new SignalRService();

            let strSchoolId = JConfiguration.ApplicationTypeId === "1" ? ClientUserDetails.TeacherDetails["uSchoolId"] : ClientUserDetails.SchoolDetails["uSchoolId"];

            objSignalRService.EventListener(arrReturnClassData, strSchoolId, "");
            GridCallBack();
        });
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSaved": true } });
    }

    /**
     * @name CheckIsTeacherChanged
     * @param {*} objContext objContext
     * @param {*} objClassChangedDetails objClassChangedDetails
     * @summary Returns true/false if the teacher is changed for a class after edit.
     * @returns {*} returns a boolean value
     */
    CheckIsTeacherChanged(objContext, objClassChangedDetails) {
        let uClassId = objClassChangedDetails["uClassId"];
        let objClassActualDetails = objContext.Class_ModuleProcessor.GetClassesForSchool(objContext).filter(objClassDetails => objClassDetails["uClassId"] === uClassId)[0];
        if (objClassActualDetails["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"] !== objClassChangedDetails["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"]) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @name EditClass
     * @param {*} objContext objContext
     * @param {*} objClassData objClassData
     * @param {*} GridCallBack GridCallBack
     * @summary Activate and Edit class
     */
    EditClass(objContext, objClassData, GridCallBack) {
        let objClassParams = {};
        let strUserId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);
        if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props)) {
            if (objContext.Class_ModuleProcessor.CheckIsTeacherChanged(objContext, objClassData)) {
                objClassData = { ...objClassData, IsTeacherChanged: true };
            }
            objClassParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Class_Teacher",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Class_Teacher.uSchoolId": strUserId
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                ["vEditData"]: [objClassData],
                ["uUserId"]: objContext.props.ClientUserDetails.UserId
            };
        }
        else if (JConfiguration.ApplicationTypeId === "1") {
            objClassParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                    "Type": "nested"
                },
                ["vEditData"]: [objClassData],
                ["uUserId"]: objContext.props.ClientUserDetails.UserId
            };
        }
        Object_Extranet_Teacher_Class.EditData(objClassParams, () => { GridCallBack(); });
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSaved": true } });
    }

    /**
     * @name DeleteClass
     * @param {*} objContext objContext
     * @param {*} objClassData objClassData
     * @summary De-Activate class
     */
    DeleteClass(objContext, objClassData, GridCallBack) {
        let objClassParams = {};
        let strUserId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);
        if (objContext.props.PropsCommonFunctions.IsSchoolOrAdminTeacher(objContext.props)) {
            objClassParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Class_Teacher",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Class_Teacher.uSchoolId": strUserId
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                ["vDeleteData"]: [
                    {
                        "t_TestDrive_Member_Class_Teacher": [
                            {
                                "uClassId": objClassData.t_TestDrive_Member_Class_Teacher[0].uClassId,
                                "uTeacherId": objClassData.t_TestDrive_Member_Class_Teacher[0].uTeacherId,
                                "cIsDeleted": "Y"
                            }
                        ]
                    }
                ]
            };
        }
        else if (JConfiguration.ApplicationTypeId === "1") {
            objClassParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                    "Type": "nested"
                },
                ["vDeleteData"]: [
                    {
                        "t_TestDrive_Member_Class_Teacher": [
                            {
                                uClassId: objClassData.t_TestDrive_Member_Class_Teacher[0].uClassId,
                                uTeacherId: objClassData.t_TestDrive_Member_Class_Teacher[0].uTeacherId,
                                "cIsDeleted": "Y"
                            }
                        ]
                    }
                ]
            };
        }
        Object_Extranet_Teacher_Class.DeleteData(objClassParams, () => { GridCallBack(); });
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSaved": true } });
    }

    /**
     * @name GetStateIdByApplicationType
     * @param {any} objContext objContext
     * @summary Gets the state based on application type id
     * @returns {*} returns iStateId
     */
    GetStateIdByApplicationType(objContext) {
        let iStateId = "";
        if (objContext.props.ClientUserDetails.ApplicationTypeId == "1") {
            iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        } else if (objContext.props.ClientUserDetails.ApplicationTypeId == "6") {
            iStateId = objContext.props.ClientUserDetails.SchoolDetails.iStateId;
        }
        return iStateId;
    }

    /**
     * @name OnBeforeRowRender
     * @param {any} objRowData objRowData
     * @param {any} objContext objContext
     * @summary Add ActiveImageIcon property to the object
     * @return {*} retruns an object or null
     */
    OnBeforeRowRender(objRowData, objContext) {
        if (objRowData.IsNewRow) {
            if (objContext.state.uTeacherId != undefined && objContext.state.uTeacherId != "") {
                objRowData = {
                    ...objRowData,
                    t_TestDrive_Member_Class_Teacher: [
                        {
                            "uTeacherId": objContext.state.uTeacherId
                        }
                    ],
                };
            }
            return {
                ...objRowData,

                "ActivationStatus": "ActiveImageIcon_Check_Green"
            };
        }
        let objRowTemp = objRowData.t_TestDrive_Member_Class_Teacher.filter(objNewData => objNewData["cIsCoTeacher"] !== "Y" && objNewData["cIsSubjectExpert"] !== "Y")[0];
        if (objRowTemp) {
            var strStatusImage = objRowTemp["cIsDeleted"] === "N" ? "ActiveImageIcon_Check_Green" : "ActiveImageIcon_ErrorDeactive";
            return {
                ...objRowData,
                ["ActivationStatus"]: strStatusImage
            };
        }
        else {
            return null; //if objRowTemp value is null
        }
    }

    /**
     * @name OnBeforeEditRow
     * @param {any} objEditRowData objEditRowData
     * @summary Filtering the row basesd on cIsDeleted
     * @returns {*} returns an object
     */
    OnBeforeEditRow(objEditRowData) {
        let objRowTemp = objEditRowData.t_TestDrive_Member_Class_Teacher.filter(objNewData => objNewData["cIsCoTeacher"] !== "Y" && objNewData["cIsSubjectExpert"] !== "Y")[0];
        if (objRowTemp && objRowTemp["cIsDeleted"] === "N") {
            return { "AllowEdit": true, "ButtonKeys": ["ExtraButton", "Deactivate"] };
        } else {
            return { "AllowEdit": false, "ButtonKeys": ["Activate"] };
        }
    }

    /**
     * @name GetCallBacksGrid
     * @param {object} objContext Context object
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} returns an objCallBasics
     */
    GetCallBacksGrid(objContext) {
        return {
            GridActionButtons: objContext.Class_ModuleProcessor.GetHeaderButtons(objContext),
            SaveMethod: (objSaveData, GridCallBack) => { objContext.Class_ModuleProcessor.SaveMethod(objContext, objSaveData, GridCallBack); },
            OnBeforeGridRowRender: (objRowData) => objContext.Class_ModuleProcessor.OnBeforeRowRender(objRowData, objContext),
            //Performs the logic based on objEditRowData 
            //and return the array of string to hold the 
            //button key(same as passed in the RowActionButtons)
            OnBeforeEditRow: (objEditRowData) => { return objContext.Class_ModuleProcessor.OnBeforeEditRow(objEditRowData); }
        };
    }

    /**
     * @name GetEventsGrid
     * @param {any} objContext objContext
     * @summary Returns object that contains all the Events methods.
     * @return {object} returns an object
     */
    GetEventsGrid(objContext) {
        return {
            OnClickRow: (objClass) => { objContext.Class_ModuleProcessor.HandleOnClickRow(objContext, objClass); }
        };
    }

    /**
     * @name GetMetaDataStatusToggleDropDown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataStatusToggleDropDown() {
        return {
            DisplayColumn: "key",
            ValueColumn: "value"
        };
    }

    /**
     * @name GetMetaDataTeacherDropDown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataTeacherDropDown() {
        return {
            DisplayColumn: "vFirstName,vName",
            ValueColumn: "uTeacherId",
            ShowDefaultOption: true,
            DefaultOptionValue: "",
            DefaultOptionTextKey: "DefaultOptionTextKey_Text"
        };
    }

    /**
     * @name GetResourceDataTeacherDropDown
     * @param {*} objTextResource objTextResource
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataTeacherDropDown(objTextResource) {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        let Text = {
            "DefaultOptionTextKey_Text": Localization.TextFormatter(objTextResource, 'TeacherDropdownAllItem') //will show this text as the DefaultOptionText in the Dropdown.
        };
        return {
            Text,
            SkinPath
        };
    }

    /**
     * @name GetResourceDataStatusToggleDropDown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataStatusToggleDropDown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsStatusToggleDropDown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsStatusToggleDropDown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.Class_ModuleProcessor.HandleActivationStatusToggle(objContext, objItem)
        };
    }

    /**
    * @name GetEventsClassAndTeamTeacherStatusToggleDropDown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsClassAndTeamTeacherStatusToggleDropDown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.Class_ModuleProcessor.HandleClassAndTeamTeacherStatusToggle(objContext, objItem)
        };
    }

    /**
    * @name GetEventsTeacherDropDown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsTeacherDropDown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.Class_ModuleProcessor.HandleDropDownForTeacher(objContext, objItem)
        };
    }

    /**
     * @name GetMetaData
     * @param {*} objContext objContext
     * @summary it returns the array of metadatas
     * @returns {array} MetaData
     */
    GetMetaData(objContext) {
        return {
            HeaderData: objContext.Class_ModuleProcessor.GetColumns(objContext),
            Filter: null,
            EditableGrid: objContext.props.blnIsGridEditable,
            RowActionButtons: objContext.Class_ModuleProcessor.GetActionButtons(objContext),
            blnClearApplicationStateOfGrid: true,
            HideSelectionCheckBox: !objContext.props.blnIsGridEditable
        };
    }
}

export default Class_ModuleProcessor;

