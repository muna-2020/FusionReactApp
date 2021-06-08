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
            class: DataRef(state.Entity, "class", true),
            textresource: DataRef(state.Entity, "textresource", true),
            pupil: DataRef(state.Entity, "pupil", true),
            offlineprocessdefinition: DataRef(state.Entity, 'offlineprocessdefinition', true),
            offlineprocessexecution: DataRef(state.Entity, 'offlineprocessexecution', true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true),
            classlicense: DataRef(state.Entity, "classlicense", true)
        };
    }
    else {
        return {};
    }
};

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component. Do not change the sequence of the request because Pupil params is again taken from this.
 */
export function InitialDataParams(JConfiguration, props) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objResourceParams = {
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/PupilLogin"
                    }
                }
            ]
        }
    };
    let objClassParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
            "Type": "nested"
        }
    };
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };

    let objGetSchoolYearPeriodParams = {
        "ForeignKeyFilter": {},

        "SortKeys": [],

        "OutputColumns": []
    };

    let objClassLicenseParams = {
        "ForeignKeyFilter": {},

        "SortKeys": [],

        "OutputColumns": []
    };

    let arrParams = [
        {
            "URL": "API/Object/Framework/Blocks/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/Class",
            "Params": objClassParams,
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": objGetSchoolYearPeriodParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/School/ClassLicense",
            "Params": objClassLicenseParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrParams };
};

/**
 * 
 * @param {*} objContext
 * @summary   Get request params of pupil for the component.
 */
export function GetPupilDataParams(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };
    let arrParams = [
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
    ];
    return arrParams;
};

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams, strToggleExecute = "FetchAndCacheExecute") {
    switch (strToggleExecute) {
        case "FetchAndCacheExecute":
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
            break;
        case "FetchExecute":
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, "FetchAndCacheExecute");
    }, []);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    useEffect(() => {
        if (DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/pupillogin") &&
            DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
            DataRef(objContext.props.schoolyearperiod) &&
            DataRef(objContext.props.classlicense)
        ) {
            let objClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data.filter(objClass => objClass["uClassId"] === strClassId)[0];
            let arrPupilData = GetPupilData(objContext);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupilData": arrPupilData, "objSelectedClass": objClassData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.textresource, objContext.props.class, objContext.props.pupil, objContext.props.schoolyearperiod, objContext.props.classlicense]);

    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let strOfflineProcessDefinitionId = DataRef(objContext.props.offlineprocessdefinition, "offlineprocessdefinition;vOfflineProcessKeyword;ExtranetPupilLogin")["Data"][0]["uOfflineProcessDefinitionId"];
            if (DataRef(objContext.props.offlineprocessexecution, "offlineprocessexecution;uuserid;" + objContext.props.ClientUserDetails.UserId + ";uofflineprocessdefinitionid;" + strOfflineProcessDefinitionId)) {
                let arrTempOfflineProcessExecution = DataRef(objContext.props.offlineprocessexecution, "offlineprocessexecution;uuserid;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + strOfflineProcessDefinitionId).Data;
                let arrOfflineProcessExecution = arrTempOfflineProcessExecution.filter(objTempOfflineProcessExecutionDetails => { return objTempOfflineProcessExecutionDetails["cIsDeleted"] === "N" });
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrOfflineProcessExecutionData": arrOfflineProcessExecution } });
            }
        }
    }, [objContext.props.offlineprocessexecution]);
};

export function GetPupilData(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
    let arrPupilData = arrTempPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
    return arrPupilData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Calls the api to get the pupil data for the component.
 */
export function useDataLoaderForPupilData(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let objClass = GetAllClasses(objContext).find(x => x["uClassId"] == strClassId);
            let arrLicenseData = DataRef(objContext.props.classlicense)["Data"];
            if (HasPackage(objClass, arrLicenseData)) {
                ApplicationState.SetProperty("blnShowAnimation", true);
                DataCall(GetPupilDataParams(objContext), "FetchAndCacheExecute");
            }            
        }
    }, [objContext.state.blnClassChangedInDropdown]);
};

export function GetCurrentSchoolYearPeriod(arrSchoolYearPeriodData) {
    let dtCurrentDate = new Date();
    let objCurrent = arrSchoolYearPeriodData.find(x => dtCurrentDate > new Date(x["dtFromDate"]) && dtCurrentDate < new Date(x["dtToDate"]));
    return objCurrent;
}

export function HasPackage(objClass, arrLicenseData) {
    let objLicense = arrLicenseData.find(x => x["uClassId"] == objClass["uClassId"] && x["uSchoolYearPeriodId"] == objClass["uSchoolYearPeriodId"]);
    return objLicense && objLicense.cHasPackage == 'Y';
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns get data params for Offline Process Definition
 */
function GetOfflineProcessDefinitionDataParams(objContext) {
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
    let arrParams = [
        {
            "URL": "API/Object/Framework/OfflineProcess/OfflineProcessDefinition",
            "Params": objOfflineProcessDefinitionParams,
            "MethodType": "Get"
        },
    ];
    return arrParams;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strOfflineProcessDefinitionId 
 * @summary   Returns Get data params for Offline Process Execution.
 */
function GetOfflineProcessExecutionDataParams(objContext, strOfflineProcessDefinitionId) {
    let objOfflineProcessExecutionParams = {
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
    let arrParams = [
        {
            "URL": "API/Object/Framework/OfflineProcess/OfflineProcessExecution",
            "Params": objOfflineProcessExecutionParams,
            "MethodType": "Get"
        },
    ];
    return arrParams;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Calls the api to get the offline process definition data for the component.
 */
export function useDataLoaderForOfflineProcessDefinition(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.Open === true) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            DataCall(GetOfflineProcessDefinitionDataParams(objContext));
        }
    }, [objContext.state.Open]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Calls the api to get the offline process execution data for the component.
 */
export function useDataLoaderForOfflineProcessExecution(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.Open) {
            let objOfflineProcessDefinition = DataRef(objContext.props.offlineprocessdefinition, "offlineprocessdefinition;vOfflineProcessKeyword;ExtranetPupilLogin");
            if (objOfflineProcessDefinition) {
                DataCall(GetOfflineProcessExecutionDataParams(objContext, objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"]));
            }
        }
    }, [objContext.props.offlineprocessdefinition]);
};

/**
 * 
 * @param {} objContext 
 * @summary  returns an array of classes to load in the drop down
 */
export function GetClassDropDownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/pupillogin")["Data"][0]["PupilLogin"];
    let arrTempClass = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data.map((objClass) => {
        return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") }
    }).filter(objClass => objClass["t_TestDrive_Member_Class_Teacher"].length > 0);
    let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
    arrTempClass.forEach((objClass) => {
        let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" }) };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrMainClassData = [...arrMainClassData, objTempClassData];
        }
        objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "Y") };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
        }
        objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsSubjectExpert === "Y") };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
        }
    }
    );
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
        },
    ];
    return arrFinalClassData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns all non deleted classes
 */
export function GetAllClasses(objContext) {
    let arrData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data;
    let arrClasses = arrData.map((objTempData) => {
        return { ...objTempData, ["t_TestDrive_Member_Class_Teacher"]: objTempData["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => objClassTeacher["cIsDeleted"] === "N") };
    }).filter(objTempData => objTempData["t_TestDrive_Member_Class_Teacher"].length > 0);
    return arrClasses;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Opens and close AllPdfPopup
 */
export function HandlePdfPopup(objContext) {
    objContext.state.Open === false ? objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "Open": true } }) : objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "Open": false } });
};

/**
 * 
 * @param {*} objContext 
 * @summary   Sets the state to open the pop up.
 */
export function GetLoginPdfAfterCreationIsDone(objContext) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "Open": true } });
};

/**
 * 
 * @param {*} objContext 
 * @summary   Extract and return all selected pupil id's from arrPupilData in local state.
 */
function GetAllPupilIdsAndName(objContext) {
    let arrPupilIds = [];
    objContext.state.arrPupilData.forEach(objPupilDetails => {
        arrPupilIds = [...arrPupilIds, { "uPupilId": objPupilDetails["uPupilId"], "FullName": objPupilDetails["vFirstName"] + " " + objPupilDetails["vName"] }];
    });
    return arrPupilIds;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Extracts Pupil Ids form Selected 
 */
function GetSelectedPupilIds(objContext) {
    let arrPupilIds = [];
    objContext.state.arrSelectedPupil.forEach(objSelectedPupilDetails => {
        arrPupilIds = [...arrPupilIds, objSelectedPupilDetails["uPupilId"]];
    });
    return arrPupilIds;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function OnChangeClassDropDown(objContext, objClassData)
{
    objContext.dispatch({ type:"SET_STATE_VALUES", payload: {"blnClassChangedInDropdown": !objContext.state.blnClassChangedInDropdown, "arrSelectedPupil": [], "isSelectAll": false}});
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strValue
 * @param {*} strName
 * @param {*} blnIsChecked 
 * @summary   Triggers when the check box selection changes, strValue = uPupilId, but for select all strVlaue = "AllPupil"
 */
export function OnChangeCheckBoxItem(objContext, strValue, strFullName, blnIsChecked) {
    if (strValue === "AllPupil") {
        if (blnIsChecked) {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": true, "arrSelectedPupil": GetAllPupilIdsAndName(objContext) } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": false, "arrSelectedPupil": [] } });
        }
    }
    else if (strValue !== "AllPupil") {
        if (blnIsChecked) {
            if (objContext.state.arrPupilData.length === (objContext.state.arrSelectedPupil.length + 1)) {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": true, "arrSelectedPupil": [{ "uPupilId": strValue, "FullName": strFullName }, ...objContext.state.arrSelectedPupil] } });
            }
            else {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": false, "arrSelectedPupil": [{ "uPupilId": strValue, "FullName": strFullName }, ...objContext.state.arrSelectedPupil] } });
            }
        }
        else {
            if (objContext.state.isSelectAll) {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": false, "arrSelectedPupil": [{ "uPupilId": strValue, "FullName": strFullName }] } });
            }
            else {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "isSelectAll": false, "arrSelectedPupil": objContext.state.arrSelectedPupil.filter(objSelectedPupilDetails => { return objSelectedPupilDetails["uPupilId"] !== strValue }) } });
            }
        }
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the send email button is clicked
 */
export function GenerateLogins(objContext, strProgressId) {
    const arrSchoolYearPeriodData = DataRef(objContext.props.schoolyearperiod)["Data"];
    let objCurrentSchoolYeraPeriod = GetCurrentSchoolYearPeriod(arrSchoolYearPeriodData)
    let objDataParams = {
        "Pupils": GetSelectedPupilIds(objContext),
        "ClassId": objContext.state.objSelectedClass["uClassId"],
        "ProgressId": strProgressId,
        "SchoolYearPeriodId": objCurrentSchoolYeraPeriod["uSchoolYearPeriodId"]
    };
    let arrParams = [
        {
            "URL": "API/Extranet/Teacher/PupilLogin/SavePupilLogin",
            "Params": objDataParams
        }
    ];
    DataCall(arrParams, "FetchExecute");
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strOfflinePropcessExecutionId 
 * @summary   Deletes Offline process.
 */
export function DeleteGeneratedOfflineProcessExecution(objContext, strOfflinePropcessExecutionId) {
    let objOfflineProcessDefinition = DataRef(objContext.props.offlineprocessdefinition, "offlineprocessdefinition;vOfflineProcessKeyword;ExtranetPupilLogin");
    let strOfflinePropcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"]
    let arrOfflineProcessExecutionParams = GetOfflineProcessExecutionDataParams(objContext, strOfflinePropcessDefinitionId);
    let arrOfflineProcessExecutionDeleteDataParams = [{
        ...arrOfflineProcessExecutionParams[0],
        ["MethodType"]: "Delete",
        ["Params"]: {
            ...arrOfflineProcessExecutionParams[0]["Params"],
            ["vDeleteData"]: [{ "uOfflineProcessExecutionId": strOfflinePropcessExecutionId }]
        }
    }];
    DataCall(arrOfflineProcessExecutionDeleteDataParams);
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        arrPupil: [],
        isLoadComplete: false,
        objSelectedClass: {},
        arrSelectedPupil: [],
        isSelectAll: false,
        arrPupilData: [],
        Open: false,
        OpenProgressBar: false,
        arrOfflineProcessExecutionData: [],
        blnClassChangedInDropdown: false
    };
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action) {
    switch (action.type) {
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
        case 'DATA_LOAD_COMPLETE':
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
    }
};
