import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            teacher: DataRef(state.Entity, "teacher", true),
            class: DataRef(state.Entity, "class", true),
            schoolyear: DataRef(state.Entity, "schoolyear", true),
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        return {};
    }
}

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
function DataCall(objContext, arrParams, strToggleExecute = "FetchAndCacheExecute") {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    switch (strToggleExecute) {
        case 'FetchAndCacheExecute':
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
        case 'UserPreferenceFetchExecute':
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let strUserPreferenceFilterKey = "userpreference;uuserid;" + objContext.props.ClientUserDetails.UserId;
                let arrUserPreference = objReturn["userpreference"][strUserPreferenceFilterKey.toLowerCase()].Data;
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
            break;
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strUserId = GetSchoolIdByApplicationType(objContext.props);
        if (DataRef(objContext.props.schoolyear, "schoolyear;cisdeleted;n") &&
            DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n")) {
            if (IsSchoolOrAdminTeacher(objContext) &&
                DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uschoolid;" + strUserId) &&
                DataRef(objContext.props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + strUserId)) {
                let arrClasses = GetClassesForSchool(objContext, objContext.state.intActivationStatusToggleData, objContext.state.uTeacherId);
                let objClassData = GetClassDataFromApplicationState(objContext);
                if (objClassData === null || JSON.stringify(objClassData) === "{}") {
                    SetApplicationState(objContext, arrClasses[0]);
                }
                if (objContext.state.blnIsSaved) {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsSaved": false } });
                }
                if (!objContext.state.isLoadComplete) {
                    objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                }
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrClassGridData": arrClasses, "isNewRowAdded": false } });
            }
            else if (objContext.props.JConfiguration.ApplicationTypeId === "1" &&
                DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId)) {
                let arrClasses = GetClassesForTeacher(objContext, objContext.state.intActivationStatusToggleData);
                let strClassId = "";
                let objClassData = {};
                if (objContext.state.isNewRowAdded) {
                    strClassId = arrClasses[0]["uClassId"];
                    EditUserPreference(objContext, strClassId);
                    objClassData = arrClasses[0];
                }
                else {
                    strClassId = ApplicationState.GetProperty("SelectedClassId");
                    let arrClassData = arrClasses.filter(objClass => objClass.uClassId === strClassId);
                    if (arrClassData.length > 0) {
                        objClassData = arrClassData[0];
                    }
                }
                let objPreSelectedClassData = GetClassDataFromApplicationState(objContext);
                if (typeof objClassData === "undefined" || JSON.stringify(objClassData) === "{}") {
                    SetApplicationState(objContext, GetDefaultClass(objContext));
                }
                else if (objPreSelectedClassData === null || JSON.stringify(objPreSelectedClassData) === "{}" || objPreSelectedClassData["uClassId"] !== objClassData["uClassId"]) {
                    SetApplicationState(objContext, objClassData);
                }
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrClassGridData": arrClasses, "isNewRowAdded": false } });
                if (objContext.state.blnIsSaved) {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsSaved": false } });
                }
                if (!objContext.state.isLoadComplete) {
                    objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                }
            }
        }
    }, [objContext.props.teacher, objContext.props.class, objContext.props.schoolyear, objContext.props.schoolyearperiod]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the Selected class data from application state.
 */
export function GetClassDataFromApplicationState(objContext) {
    let objData = ApplicationState.GetProperty("ClassAndPupil");
    if (objData) {
        return objData["SelectedClassData"];
    }
    return null;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objClassData 
 * @summary   Sets the selected class to application state inside ClassAndPupil key.
 */
export function SetApplicationState(objContext, objClassData) {
    let objData = GetClassDataFromApplicationState(objContext);
    let objNewData = {};
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
 * 
 * @param {*} objContext 
 * @summary   Returns an array of teachers. 
 */
export function GetTeachers(objContext) {
    let strUserId = GetSchoolIdByApplicationType(objContext.props);
    let arrTempTeachers = DataRef(objContext.props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + strUserId).Data;
    let arrTeachers = arrTempTeachers.map(objTempTeacher => {
        return {
            ...objTempTeacher, ["t_TestDrive_Member_Teacher_School"]: objTempTeacher["t_TestDrive_Member_Teacher_School"]
                .filter(objTempTeacherSchool => objTempTeacherSchool.cIsDeleted === 'N')
        };
    }).filter(objTempTeacher => objTempTeacher["t_TestDrive_Member_Teacher_School"].length > 0);
    return arrTeachers;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} arrClassTeacher 
 * @param {*} charIsDeleted 
 * @summary   Returns the classes filtered on the basis of active teachers and toggle selected
 */
function GetFilteredClass(objContext, arrClassTeacher, charIsDeleted) {
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
    if (IsSchoolOrAdminTeacher(objContext)) {
        let arrTempTeachers = GetTeachers(objContext);
        arrTempClassTeacher.forEach(objTempClassTeacher => {
            if (arrTempTeachers.filter(objTeacher => { return objTeacher.uTeacherId === objTempClassTeacher.uTeacherId }).length > 0) {
                arrCT = [...arrCT, objTempClassTeacher];
            }
        });
    }
    return arrCT;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} intActivationStatusToggle 
 * @param {*} uTeacherId 
 * @summary   Used in Teacher Extranet Application. Returns array of classes based on Activation Status and Teacher.
 */
export function GetClassesForTeacher(objContext, intActivationStatusToggle = -1) {
    let arrTempClasses = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data;
    let arrClasses = [];
    if (intActivationStatusToggle === 1) {
        arrClasses = arrTempClasses.map(objTempClass => {
            return {
                ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objTempClass["t_TestDrive_Member_Class_Teacher"]
                    .filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.cIsDeleted === "N" })
            };
        }).filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
    }
    else if (intActivationStatusToggle === 2) {
        arrClasses = arrTempClasses.map(objTempClass => {
            return {
                ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objTempClass["t_TestDrive_Member_Class_Teacher"]
                    .filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.cIsDeleted === "Y" })
            };
        }).filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
    }
    else {
        arrClasses = arrTempClasses.map(objTempClass => {
            return {
                ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objTempClass["t_TestDrive_Member_Class_Teacher"]
                    .filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" })
            };
        }).filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
    }
    return arrClasses;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} intActivationStatusToggle 
 * @param {*} uTeacherId 
 * @summary   Used in School Extranet Application. Returns array of classes based on Activation Status and Teacher.
 */
export function GetClassesForSchool(objContext, intActivationStatusToggle = -1, uTeacherId = "") {
    let strUserId = GetSchoolIdByApplicationType(objContext.props);
    let arrTempClasses = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uschoolid;" + strUserId).Data;
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
            arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"], "N") } })
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
            arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"], "Y") } })
                .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
        }
    }
    else {
        if (uTeacherId && uTeacherId !== "") {
            arrClasses = arrTempClasses.map(objTempClass => {
                return {
                    ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: objTempClass["t_TestDrive_Member_Class_Teacher"]
                        .filter(objTempClassTeacher => { return objTempClassTeacher.cIsCoTeacher === "N" && objTempClassTeacher.cIsSubjectExpert === "N" && objTempClassTeacher.uTeacherId === uTeacherId })
                }
            })
                .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
        }
        else {
            arrClasses = arrTempClasses.map(objTempClass => { return { ...objTempClass, ["t_TestDrive_Member_Class_Teacher"]: GetFilteredClass(objContext, objTempClass["t_TestDrive_Member_Class_Teacher"]) } })
                .filter(objTempClass => objTempClass["t_TestDrive_Member_Class_Teacher"].length > 0);
        }
    }
    return arrClasses;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Retuns a class with default values.
 */
function GetDefaultClass(objContext) {
    let arrSchoolYear = DataRef(objContext.props.schoolyear, "schoolyear;cisdeleted;n").Data;
    let arrSchoolYearPeriod = DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n").Data;
    let arrClasses = [];
    let uSchoolId = "";
    let iStateId = "";
    let uTeacherId = "";
    if (IsSchoolOrAdminTeacher(objContext)) {
        arrClasses = GetClassesForSchool(objContext, -1, objContext.state.uTeacherId);
        uSchoolId = GetSchoolIdByApplicationType(objContext.props);
        iStateId = GetStateIdByApplicationType(objContext);
        uTeacherId = objContext.state.uTeacherId === "" ? GetTeachers(objContext)[0].t_TestDrive_Member_Teacher_School[0].uTeacherId : objContext.state.uTeacherId;
    }
    else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        arrClasses = GetClassesForTeacher(objContext, -1);
        uSchoolId = objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId;
        iStateId = objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].iStateId;
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
 * 
 * @param {*} objContext 
 * @summary   Add a new default class to the present classes. Sets application state for the new class.
 */
export function AddClass(objContext) {
    let objClass = GetDefaultClass(objContext);
    objClass = { ...objClass, ["cIsNew"]: "Y", ["strMode"]: "Edit" };
    objContext.dispatch({ type: "ADD_NEW_CLASS", payload: objClass });
    SetApplicationState(objContext, objClass);
    // ApplicationState.SetProperty("ClassPupil_objClassData", objClass);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returs an array for Activation Status Toggle dropdown
 */
export function GetActivationStatusToggleData(objContext) {
    let objTextResource = objContext.props.TextResource;
    let arrActivationStatusToggleData = [
        { key: objTextResource["ClassDropdownAllItem"], value: -1 },
        { key: objTextResource["ClassDropdownActiveItem"], value: 1 },
        { key: objTextResource["ClassDropdownInactiveItem"], value: 2 }
    ];
    Logger.Log("..........SatusToggleData", arrActivationStatusToggleData);
    return arrActivationStatusToggleData;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Get Coulmns Headers for the grid, Passed to the grid.
 */
export function GetColumns(objContext) {
    let arrGridColumns = objContext.props.GridConfiguration["t_Framework_ObjectConfiguration_Column"];
    if (objContext.props.ClientUserDetails.ApplicationTypeId == "1") {
        if (objContext.props.ClientUserDetails.TeacherDetails.cIsExternal && objContext.props.ClientUserDetails.TeacherDetails.cIsExternal == "Y") {
            arrGridColumns = objContext.props.GridConfiguration["t_Framework_ObjectConfiguration_Column"].filter(itm => itm["vColumnName"] != "Edit");
        }
    }
    return arrGridColumns;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gives dropdown data to be displayed in the grid, Passed to the grid.
 */
export function GetDropdownData(objContext) {
    let objDropdownData = {};
    if (objContext.state.arrClassGridData && objContext.state.arrClassGridData.length > 0) {
        let objTempDropdownData = {
            uSchoolYearPeriodId:
            {
                "cISLanguageDependent": "Y",
                "ValueColumn": "uSchoolYearPeriodId",
                "DisplayColumn": "vSchoolYearName",
                "DependingTableName": "t_TestDrive_Member_Class_SchoolYearPeriod_Data",
                Data: DataRef(objContext.props.schoolyearperiod, "schoolyearperiod;cisdeleted;n").Data
            },
            iSchoolYear: {
                "cISLanguageDependent": "Y",
                "ValueColumn": "iSchoolYear",
                "DisplayColumn": "vSchoolYearName",
                "DependingTableName": "t_TestDrive_Member_Class_SchoolYear_Data",
                "Data": DataRef(objContext.props.schoolyear, "schoolyear;cisdeleted;n").Data
            }
        };
        if (IsSchoolOrAdminTeacher(objContext)) {
            objDropdownData = {
                ...objTempDropdownData, ["t_TestDrive_Member_Class_Teacher.uTeacherId"]:
                {
                    "cISLanguageDependent": "N",
                    "ValueColumn": "uTeacherId",
                    "DisplayColumn": "vFirstName,vName",
                    "Data": GetTeachers(objContext)
                }
            };
        }
        else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            objDropdownData = { ...objTempDropdownData };
        }
    }
    return objDropdownData;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns ACTIVATE AND DEACTIVATE buttons, Passed to the grid.
 */
export function GetActionButtons(objContext, maxHeight, maxWidth, minHeight, minWidth) {
    let objTextResource = objContext.props.TextResource;
    return {
        "Activate": {
            "Key": "Activate",
            "Type": "Activate",
            "Text": objTextResource["ActivateButtonText"],
            "Action": (ActionObject) => {
                Logger.Log("........Activate action object", ActionObject.ActionObjectToActivate);
                let objTempClass = { ...ActionObject.ActionObjectToActivate, ["t_TestDrive_Member_Class_Teacher"]: [{ ...ActionObject.ActionObjectToActivate["t_TestDrive_Member_Class_Teacher"][0], ["cIsDeleted"]: "N" }] };
                EditClass(objContext, objTempClass);
            }
        },
        "Deactivate": {
            "Key": "Deactivate",
            "Type": "Deactivate",
            "Text": objTextResource["DeactivateButtonText"],
            "Action": (ActionObject) => {
                Logger.Log("........De-Activate action object", ActionObject.ActionObjectToDeactivate);
                DeleteClass(objContext, ActionObject.ActionObjectToDeactivate);
            }
        },
        "ExtraButton": {
            "Key": "ExtraButton",
            "Type": "ExtraButton",
            "Text": objTextResource["ImportPupilButtonText"],
            "Image": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/GridUpload.svg",
            "Action": (ActionObject) => {
                ApplicationState.SetProperty("blnShowAnimation", true);
                objContext.props.showPopup({
                    MaxHeight: maxHeight,
                    MaxWidth: maxWidth,
                    popUpMinHeight: minHeight,
                    popUpMinWidth: minWidth,
                    showHeader: false,
                    popUpName: 'import_pupil_popup',
                    passedEvents: {},
                    headerTitle: '',
                    popupClassName: 'import-data-parent',
                    Data: {
                        ClassData: ActionObject.ActionObject,
                        ClientUserDetails: objContext.props.ClientUserDetails,
                        JConfiguration: objContext.props.JConfiguration
                    }
                });
            }
        }
    };
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gives Buttons on the top of the grid, Passed to the grid.
 */
export function GetHeaderButtons(objContext) {
    let objTextResource = objContext.props.TextResource;
    let arrHeaderButonData = [];
    let cIsExternalUser = false;
    if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        cIsExternalUser =  (objContext.props.ClientUserDetails.TeacherDetails.cIsExternal && objContext.props.ClientUserDetails.TeacherDetails.cIsExternal == "Y") ? true : false;
    }
    if (objContext.state.intActivationStatusToggleData !== 2 && !cIsExternalUser) {
        let objAddHeaderButonData = {
            "Key": "Add",
            "Type": "Type",
            "Text": objTextResource["AddButtonText"],
            "Image": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/pluswhite.svg",
            "Action": () => { if (!objContext.state.isNewRowAdded) { AddClass(objContext) } }
        };
        arrHeaderButonData = [objAddHeaderButonData];
    }
    return arrHeaderButonData;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Delete the newly added class.
 */
export function DeleteEmptyRow(objContext) {
    if (IsSchoolOrAdminTeacher(objContext)) {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrClassGridData": GetClassesForSchool(objContext, objContext.state.intActivationStatusToggleData, objContext.state.uTeacherId), "isNewRowAdded": false } });
    }
    else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrClassGridData": GetClassesForTeacher(objContext, objContext.state.intActivationStatusToggleData), "isNewRowAdded": false } });
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objSaveData 
 * @summary   Toggle objSaveData for new/edited class and calls EditClass or SaveClass.
 */
export function SaveMethod(objContext, objSaveData) {
    Logger.Log(".........Save data", objSaveData);
    if (!objSaveData["cIsNew"]) {
        EditClass(objContext, objSaveData);
    }
    else {
        SaveClass(objContext, objSaveData);
    }
}

/**
 * 
 * @param {*} objClassData 
 * @summary   Set ApplicationState 
 */
export function HandleOnClickRow(objContext, objClassData) {
    if (!objClassData.cIsNew) {
        // ApplicationState.SetProperty("blnShowAnimation", true);
        if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            Logger.Log(".....Class Id for user preference", strClassId);
            if (strClassId !== objClassData["t_TestDrive_Member_Class_Teacher"][0]["uClassId"]) {
                EditUserPreference(objContext, objClassData["t_TestDrive_Member_Class_Teacher"][0]["uClassId"]);
            }
        }
        if (SetApplicationState(objContext, objClassData)) {
            ApplicationState.SetProperty("blnShowAnimation", true);
        }
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Fired when the dropdown data of teacher dropdown chamges.
 */
export function HandleDropDownForTeacher(objContext, objItem) {
    Logger.Log("........Selected Teacher", objItem);
    let arrClasses = GetClassesForSchool(objContext, objContext.state.intActivationStatusToggleData, objItem.uTeacherId ? objItem.uTeacherId : "");
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrClassGridData": arrClasses, "uTeacherId": objItem.uTeacherId, "isNewRowAdded": false } });
    SetApplicationState(objContext, GetDefaultClass(objContext));
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary Fired when the dropdown data of activation status dropdown chamges. Toggle between All, Active and Inactive classes.
 */
export function HandleActivationStatusToggle(objContext, objItem) {
    let arrClasses = [];
    if (IsSchoolOrAdminTeacher(objContext)) {
        arrClasses = GetClassesForSchool(objContext, objItem.value, objContext.state.uTeacherId);
        SetApplicationState(objContext, GetDefaultClass(objContext));
    }
    else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        arrClasses = GetClassesForTeacher(objContext, objItem.value);
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrClassData = arrClasses.filter(objClass => objClass.uClassId === strClassId);
        let objClassData = {};
        if (arrClassData.length > 0) {
            objClassData = arrClassData[0];
        }
        if (objClassData === undefined || JSON.stringify(objClassData) === "{}") {
            SetApplicationState(objContext, GetDefaultClass(objContext));
        }
        else {
            SetApplicationState(objContext, objClassData);
        }
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intActivationStatusToggleData": objItem.value, "arrClassGridData": arrClasses, "isNewRowAdded": false } });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strClassId 
 * @param {*} intToggle 
 * @summary   Sends an api request to edit the user preference. 0->Return params, 1-> Make api call to change data in the DB.
 */
function EditUserPreference(objContext, strClassId) {
    Logger.Log("class id", strClassId);
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
    let arrParams = [
        {
            "URL": "API/Object/Framework/UserPreference/UserPreference",
            "Params": objUserPreferenceParams,
            "MethodType": "Put"
        }
    ];
    DataCall(objContext, arrParams, "UserPreferenceFetchExecute");
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objClassData 
 * @summary   Save class
 */
export function SaveClass(objContext, objClassData) {
    let arrParams = [];
    let strUserId = GetSchoolIdByApplicationType(objContext.props);
    if (IsSchoolOrAdminTeacher(objContext)) {
        let objClassParams = {
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
            ["vAddData"]: objClassData,
            ["uUserId"]: strUserId
        };
        arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/Class",
                "Params": objClassParams,
                "MethodType": "Post"
            }
        ];
    }
    else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        // let arrUserPreference = EditUserPreference(objContext, "00000000-0000-0000-0000-000000000000", 0);
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            ["vAddData"]: objClassData,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/Class",
                "Params": objClassParams,
                "MethodType": "Post"
            }
        ];
    }
    DataCall(objContext, arrParams, "FetchAndCacheExecute");
    ApplicationState.SetProperty("blnShowAnimation", true);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsSaved": true } });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objClassChangedDetails 
 * @summary   Returns true/false if the teacher is changed for a class after edit.
 */
function CheckIsTeacherChanged(objContext, objClassChangedDetails) {
    let uClassId = objClassChangedDetails["uClassId"];
    let objClassActualDetails = GetClassesForSchool(objContext).filter(objClassDetails => objClassDetails["uClassId"] === uClassId)[0];
    if (objClassActualDetails["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"] !== objClassChangedDetails["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"]) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objClassData 
 * @summary   Activate and Edit class
 */
export function EditClass(objContext, objClassData) {
    let arrParams = [];
    let strUserId = GetSchoolIdByApplicationType(objContext.props);
    if (IsSchoolOrAdminTeacher(objContext)) {
        if (CheckIsTeacherChanged(objContext, objClassData)) {
            objClassData = { ...objClassData, ["IsTeacherChanged"]: true };
        }
        let objClassParams = {
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
        arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/Class",
                "Params": objClassParams,
                "MethodType": "Put"
            }
        ];
    }
    else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            ["vEditData"]: [objClassData],
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/Class",
                "Params": objClassParams,
                "MethodType": "Put"
            },
        ];
    }
    DataCall(objContext, arrParams, "FetchAndCacheExecute");
    ApplicationState.SetProperty("blnShowAnimation", true);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsSaved": true } });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objClassData 
 * @summary   De-Activate class
 */
export function DeleteClass(objContext, objClassData) {
    let arrParams = [];
    let strUserId = GetSchoolIdByApplicationType(objContext.props);
    if (IsSchoolOrAdminTeacher(objContext)) {
        let objClassParams = {
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
        arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/Class",
                "Params": objClassParams,
                "MethodType": "Delete"
            }
        ];
    }
    else if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            ["vDeleteData"]: [
                {
                    uClassId: objClassData.t_TestDrive_Member_Class_Teacher[0].uClassId,
                    uTeacherId: objClassData.t_TestDrive_Member_Class_Teacher[0].uTeacherId
                }
            ]
        };
        arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/Class",
                "Params": objClassParams,
                "MethodType": "Delete"
            }
        ];
    }
    DataCall(objContext, arrParams, "FetchAndCacheExecute");
    ApplicationState.SetProperty("blnShowAnimation", true);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsSaved": true } });
}

/**
 * gets school  based on teacher or school by iApplicationTypeId
 ** @param {any} props
 */
export function GetSchoolIdByApplicationType(props) {
    let strSchoolId = props.ClientUserDetails.UserId;
    if (props.ClientUserDetails.ApplicationTypeId == "1") {
        strSchoolId = props.ClientUserDetails.TeacherDetails.uSchoolId;
    }
    return strSchoolId;
}

function GetStateIdByApplicationType(objContext) {
    let iStateId = "";
    if (objContext.props.ClientUserDetails.ApplicationTypeId == "1") {
        iStateId = objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].iStateId;
    } else if (objContext.props.ClientUserDetails.ApplicationTypeId == "6") {
        iStateId = objContext.props.ClientUserDetails.SchoolDetails.iStateId;
    }
    return iStateId;
}

function IsSchoolOrAdminTeacher(objContext) {
    let blnSchoolOrAdminTeacher = false;
    if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
        blnSchoolOrAdminTeacher = true;
    } else {
        if (objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
            blnSchoolOrAdminTeacher = true;
        }
    }
    return blnSchoolOrAdminTeacher;
}

/**
 * @summary Returns Initial state of the component.
 */
export function GetInitialState() {
    return {
        isDataSentToPupil: false,
        isLoadComplete: false,
        arrClassGridData: [],
        intActivationStatusToggleData: -1,
        uTeacherId: "",
        isNewRowAdded: false,
        blnIsSaved: false
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case "ADD_NEW_CLASS":
            return {
                ...state,
                ["arrClassGridData"]: [action.payload, ...state.arrClassGridData],
                ["isNewRowAdded"]: true
            };
        case "SET_STATE_VALUES":
            return {
                ...state,
                ...action.payload
            };
    }
};
