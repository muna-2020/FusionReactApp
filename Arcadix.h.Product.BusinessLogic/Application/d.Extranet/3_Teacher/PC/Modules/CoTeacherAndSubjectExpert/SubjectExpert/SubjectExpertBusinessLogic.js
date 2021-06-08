import { useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            objCoTeacherSubjectExpert: state.ApplicationState.SubjectExpert
        };
    }
    else {
        return {};
    }
};

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams, strToggleExecute = "FetchAndCacheExecute"){
    switch(strToggleExecute)
    {
        case "FetchAndCacheExecute":
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
        });
        break;
        case "FetchExecute":
        ArcadixFetchData.Execute(arrParams, (jsonResponse) => {
            let strEntity = "class";
            let strFilters = 'class;t_testdrive_member_class_teacher.uteacherid;' + arrParams[0]["Params"]["ForeignKeyFilter"]["t_TestDrive_Member_Class_Teacher.uTeacherId"];
            var storeParams = {
                Data: jsonResponse[strEntity.toLowerCase()][strFilters.toLowerCase()]['Data'],
                TimeStamp: 0,
                PrimaryKeyName: "uClassId",
                Count: 1
            };
            ArcadixCacheData.EditData(strEntity, { Filter: strFilters.toLowerCase(), Value: storeParams });
        });
        break;
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{    
    useLayoutEffect(() => {
        if(objContext.props.objCoTeacherSubjectExpert && JSON.stringify(objContext.props.objCoTeacherSubjectExpert) !== '{}')
        {
            let objSelectedClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            if(JSON.stringify(objContext.state.SelectedClass) === '{}' || objContext.state.SelectedClass["uClassId"] !== objSelectedClassData["uClassId"])
            {
                let arrPreSelectedSubjectExperts = GetPreSelectedSelectedSubjectExperts(objContext);
                objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"arrSubjectExperts": arrPreSelectedSubjectExperts, "SelectedClass": objSelectedClassData}});
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    }, [objContext.props.objCoTeacherSubjectExpert]);

    useLayoutEffect(()=>{
        if(objContext.state.isLoadComplete && objContext.state.blnIsSaved)
        {
            let objSelectedClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            let arrPreSelectedSubjectExperts = GetPreSelectedSelectedSubjectExperts(objContext);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"arrSubjectExperts": arrPreSelectedSubjectExperts, "SelectedClass": objSelectedClassData, "blnIsSaved": false}});
        }
    },[objContext.props.objCoTeacherSubjectExpert]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the already present SubjectExperts for the class.
 */
export function GetPreSelectedSelectedSubjectExperts(objContext)
{
    let objClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
    let arrSelectedSubjectExperts = [];
    let arrClassTeachers = objClassData["t_TestDrive_Member_Class_Teacher"];
    arrClassTeachers.forEach(objTempClassTeacherDetails=>{
        if (objTempClassTeacherDetails["cIsCoTeacher"] === "N" && objTempClassTeacherDetails["cIsSubjectExpert"] === "Y" && objTempClassTeacherDetails["cIsDeleted"] === "N")
        {
            arrSelectedSubjectExperts = [...arrSelectedSubjectExperts, objTempClassTeacherDetails];
        }
    });
    return arrSelectedSubjectExperts;
}

/**
 * 
 * @param {*} objContext 
 * @summary   returns active(non deleted) teachers.
 */
export function GetActiveTeachers(objContext)
{
    let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let arrTeacherData = DataRef(objContext.props.teacher, "teacher;t_testdrive_member_teacher_school.uschoolid;" + strSchoolId)["Data"];
    let arrActiveTeachers = arrTeacherData.filter(objTeacherData => objTeacherData["t_TestDrive_Member_Teacher_School"].filter(objTempTeacherSchoolDetails => objTempTeacherSchoolDetails["uSchoolId"] === strSchoolId)[0]["cIsDeleted"] === "N");
    return arrActiveTeachers;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strOperationType 
 * @param {*} strOldSelectedTeacherId 
 * @param {*} strNewTeacherId 
 * @summary   Updates the available active teachers for the module. This method maintains the consistency of teachers between CoTeachers and SubejctExpert sub modules.
 */
export function UpdateAvailableTeachers(objContext, strOperationType = "REMOVE", strOldSelectedTeacherId = "", strNewTeacherId = "")
{
    let arrCurrentlyAvailableTeachers = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "AvailableTeachers");
    let arrNewAvailableTeachers = [];
    let objTeacherDetails = {};
    switch(strOperationType)
    {
        case "ADD":
        objTeacherDetails = GetActiveTeachers(objContext).filter(objTempTeacherData => objTempTeacherData["uTeacherId"] === strOldSelectedTeacherId)[0];
        arrNewAvailableTeachers = [...arrCurrentlyAvailableTeachers, objTeacherDetails];
        break;
        case "REMOVE":
        arrNewAvailableTeachers = arrCurrentlyAvailableTeachers.filter(objTempTeacher => objTempTeacher["uTeacherId"] !== strNewTeacherId);
        break;
        case "REPLACE": 
        arrNewAvailableTeachers = arrCurrentlyAvailableTeachers.filter(objTempTeacher => objTempTeacher["uTeacherId"] !== strNewTeacherId);
        objTeacherDetails = GetActiveTeachers(objContext).filter(objTempTeacherData => objTempTeacherData["uTeacherId"] === strOldSelectedTeacherId)[0];
        arrNewAvailableTeachers = [...arrNewAvailableTeachers, objTeacherDetails];
        break;
    }
    Logger.Log("******************arrNewAvailableTeachers", arrNewAvailableTeachers);
    SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, arrNewAvailableTeachers);
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strKeyName 
 * @summary   Returns the application state for co-teacher and subject expert
 */
export function GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, strKeyName = "")
{
    let objData = objContext.props.objCoTeacherSubjectExpert;
    let objReturnData;
    if(objData && JSON.stringify(objData) !== "{}")
    {
        if(strKeyName !== "")
        {
            objReturnData = objData[strKeyName];
        }
        else
        {
            objReturnData = objData;
        }
    }
    return objReturnData;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objSelectedClassData 
 * @param {*} arrAvailableTeachers 
 * @summary   Sets the application state for co-teacher and subject expert
 */
export function SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, arrAvailableTeachers = [])
{
    let objData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext);
    let objNewData = {
        ...objData, 
        ["AvailableTeachers"]: arrAvailableTeachers
    };   
    ApplicationState.SetProperty("SubjectExpert", objNewData);   
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns subject array for dropdown
 */
export function GetSubjectsForDropDown(objContext)
{
    let arrDefaultSubjects = DataRef(objContext.props.subject, "subject;iparentsubjectid;0;cislearncoachersubject;y;cisdeleted;n")["Data"];
    let arrSchoolSubjects = DataRef(objContext.props.schoolsubject, "schoolsubject;uuserId;" + objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"] + ";cisdeleted;n")["Data"];
    let arrSubjects = [...arrDefaultSubjects, ...arrSchoolSubjects];
    return arrSubjects;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} arrClassTeacherSubjects 
 * @summary   Returns an array containing subject those are there in Class_Teacher_Subject sub table. The array is used in the multi-select dropdown as a preselect value.
 */
export function GetSubjectsForPreSelectInDropDown(objContext, arrClassTeacherSubjects)
{
    let arrSubjects = GetSubjectsForDropDown(objContext);
    let arrFilteredSubjects = [];
    arrClassTeacherSubjects.forEach(objTempClassTeacherSubject => {
        let arrTempSubject = arrSubjects.filter(objTempSubjects => objTempSubjects["iSubjectId"] === objTempClassTeacherSubject["iSubjectId"]);
        if(arrTempSubject.length > 0)
        {
            arrFilteredSubjects = [...arrFilteredSubjects, ...arrTempSubject];
        }
    });
    return arrFilteredSubjects;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strPreviouslySelectedTeacherId 
 * @param {*} objCurrentlySelectedTeacherData 
 * @summary   Trigerred when a selection a Teacher dropdown is changed.
 */
export function HandleOnChangeTeacherDropDown(objContext, strCurrrentSelectedTeacherId, objNewSelectedTeacherData)
{
    if(strCurrrentSelectedTeacherId !== objNewSelectedTeacherData["uTeacherId"])
    {
        let intIndex = objContext.state.arrSubjectExperts.findIndex(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] === strCurrrentSelectedTeacherId);
        let arrSubjectExperts = objContext.state.arrSubjectExperts;
        let objNewClassTeacherDetails = GetDefaultClassTeacherDetails(objContext, objNewSelectedTeacherData["uTeacherId"]);
        arrSubjectExperts = [...arrSubjectExperts.slice(0, intIndex), objNewClassTeacherDetails, ...arrSubjectExperts.slice(intIndex, arrSubjectExperts.length)];
        let objDeletedSubjectExpertDetail = arrSubjectExperts.filter(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] === strCurrrentSelectedTeacherId)[0];
        arrSubjectExperts = arrSubjectExperts.filter(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] !== strCurrrentSelectedTeacherId);
        if(objDeletedSubjectExpertDetail["uClassTeacherId"] !== "00000000-0000-0000-0000-000000000000")
        {
            arrSubjectExperts = [...arrSubjectExperts, {...objDeletedSubjectExpertDetail, ["cIsDeleted"]: "Y"}];
        }
        UpdateAvailableTeachers(objContext, "REPLACE", strCurrrentSelectedTeacherId, objNewSelectedTeacherData["uTeacherId"]);
        objContext.dispatch({type: "SET_STATE_VALUES", payload: { "arrSubjectExperts": arrSubjectExperts }});
    }
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strTeacherId 
 * @summary   Trigerred when 'X' button is clicked in the module.
 */
export function HandleOnClickRemoveButton(objContext, strTeacherId)
{
    let arrSubjectExperts = objContext.state.arrSubjectExperts;
    let objSubjectExpertDetails = arrSubjectExperts.filter(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] === strTeacherId)[0];
    arrSubjectExperts = arrSubjectExperts.filter(objTempSubjectExpert => objTempSubjectExpert["uTeacherId"] !== strTeacherId);
    if(objSubjectExpertDetails["uClassTeacherId"] !== "00000000-0000-0000-0000-000000000000")
    {
        arrSubjectExperts = [...arrSubjectExperts, { ...objSubjectExpertDetails, ["cIsDeleted"]: "Y" }];   }
    UpdateAvailableTeachers(objContext, "ADD", strTeacherId, "");
    objContext.dispatch({type: "SET_STATE_VALUES", payload: { "arrSubjectExperts": arrSubjectExperts }});
}

/**
 * 
 * @param {*} objContext 
 * @summary   Trigerred when the AddCoTeacher button is clicked.
 */
export function HandleOnClickAddButton(objContext)
{
    let objClassTeacherDetails = GetDefaultClassTeacherDetails(objContext);
    UpdateAvailableTeachers(objContext, "REMOVE", "", objClassTeacherDetails["uTeacherId"]);
    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSubjectExperts": [...objContext.state.arrSubjectExperts, objClassTeacherDetails] }});
}

/**
 * 
 * @param {*} objContext 
 * @param {*} arrCurrentlySelectedSubjects 
 * @param {*} strPreviouslySelectedTeacherId 
 */
export function HandleOnChangeSubjectDropDown(objContext, arrSelectedSubjects, strSelectedTeacherId)
{
    let arrSubjectExperts = objContext.state.arrSubjectExperts;
    let arrSubjects = arrSelectedSubjects.map(objTempCurrentlySelectedSubject=>{
        return {
            "iSubjectId": objTempCurrentlySelectedSubject["iSubjectId"]
        };
    });

    let arrTempSubjectExperts = arrSubjectExperts.map(objTempClassTeacher => {
        if(objTempClassTeacher["uTeacherId"] === strSelectedTeacherId)
        {
            return {...objTempClassTeacher, ["t_TestDrive_Member_Class_Teacher_Subject"]: arrSubjects};
        }
        else
        {
            return objTempClassTeacher;
        }
    });
    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSubjectExperts": arrTempSubjectExperts }});
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strNewTeacherId 
 * @summary   Returns a default ClassTeacher object.
 */
function GetDefaultClassTeacherDetails(objContext, strNewTeacherId = "")
{
    if(strNewTeacherId === "")
    {
        let arrAvailableTeachers = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "AvailableTeachers");
        strNewTeacherId = arrAvailableTeachers[0]["uTeacherId"];
    }
    let objClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
    let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let intStateId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
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
 * 
 * @param {*} objContext 
 * @summary   checks if all the subject experts are assingned subjects or not. Returns a json object with 'IsValid' as true/false and 'TeacherId' as ""/guid of teacher.
 */
export function ValidateSubjectExperts(objContext)
{
    let arrSubjectExperts = objContext.state.arrSubjectExperts;
    let blnIsValid = true;
    let uTeacherId = "";
    if(arrSubjectExperts && arrSubjectExperts.length > 0)
    {
        arrSubjectExperts.forEach(objTempSubjectExperts=> {
            if(objTempSubjectExperts["cIsDeleted"] === 'N' && objTempSubjectExperts["t_TestDrive_Member_Class_Teacher_Subject"].length === 0)
            {
                blnIsValid = false;
                uTeacherId = objTempSubjectExperts["uTeacherId"];
            }
        });    
    }
    return {
        "IsValid": blnIsValid,
        "TeacherId": uTeacherId
    };
}

/**
 * 
 * @param {*} objContext 
 * @summary   returns the class object to be saved.
 */
function GetSaveSubjectExpertsData(objContext)
{
    let objTempClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
    let objModifiedClassData = {...objTempClassData, ["t_TestDrive_Member_Class_Teacher"]: objContext.state.arrSubjectExperts};
    return [objModifiedClassData];
}

/**
 * 
 * @param {*} objContext 
 * @summary   Saves the SubjectExperts
 */
export function SaveSubjectExperts(objContext)
{
    let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let objClassParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
            "Type": "nested"
        },
        "vEditData": GetSaveSubjectExpertsData(objContext),
        "uUserId": objContext.props.ClientUserDetails.UserId,
        "uSchoolId": strSchoolId
    };
    let arrParams = [
        {
            "URL": "API/Object/Extranet/Teacher/Class/SaveSubjectExpert",
            "Params": objClassParams
        }
    ];
    DataCall(arrParams, "FetchExecute");
    ApplicationState.SetProperty("blnShowAnimation", true);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"blnIsSaved": true}});
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false,
        blnIsSaved: false,
        SelectedClass: {},
        arrSubjectExperts: []
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action)
{
    switch(action.type)
    {
        case 'SET_STATE_VALUES':
        return{
            ...state,
            ...action.payload
        };
        case 'DATA_LOAD_COMPLETE':
        return{
            ...state,
            ["isLoadComplete"]: action.payload
        };
    }
}



