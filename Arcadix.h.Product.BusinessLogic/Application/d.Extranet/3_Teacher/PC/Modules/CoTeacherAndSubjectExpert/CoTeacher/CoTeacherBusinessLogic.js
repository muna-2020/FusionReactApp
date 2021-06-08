import { useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            SubjectExpert: state.ApplicationState.SubjectExpert
        };
    }
    else {
        Logger.Log("not mapping");
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
    useLayoutEffect(()=>{
        if(objContext.props.SubjectExpert && JSON.stringify(objContext.props.SubjectExpert) !== '{}')
        {
            let objSelectedClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            if(JSON.stringify(objContext.state.SelectedClass) === '{}' || objContext.state.SelectedClass["uClassId"] !== objSelectedClassData["uClassId"])
            {
                let arrPreSelectedCoTeachers = GetPreSelectedSelectedCoTeachers(objContext);
                objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"arrCoTeachers": arrPreSelectedCoTeachers, "SelectedClass": objSelectedClassData}});
            }
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    }, [objContext.props.SubjectExpert]);

    useLayoutEffect(()=>{
        if(objContext.state.isLoadComplete && objContext.state.blnIsSaved)
        {
            let objSelectedClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            let arrPreSelectedCoTeachers = GetPreSelectedSelectedCoTeachers(objContext);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE_VALUES", payload:{"arrCoTeachers": arrPreSelectedCoTeachers, "SelectedClass": objSelectedClassData, "blnIsSaved": false}});
        }
    },[objContext.props.SubjectExpert]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the already present CoTeachers for the class.
 */
export function GetPreSelectedSelectedCoTeachers(objContext)
{
    let objClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
    let arrSelectedCoTeachers = [];
    let arrClassTeachers = objClassData["t_TestDrive_Member_Class_Teacher"];
    arrClassTeachers.forEach(objTempClassTeacherDetails=>{
        if(objTempClassTeacherDetails["cIsCoTeacher"] === "Y" && objTempClassTeacherDetails["cIsSubjectExpert"] === "N" && objTempClassTeacherDetails["cIsDeleted"] === "N")
        {
            arrSelectedCoTeachers = [...arrSelectedCoTeachers, objTempClassTeacherDetails];
        }
    });
    return arrSelectedCoTeachers;
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
    let objData = objContext.props.SubjectExpert;
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
};

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
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strCurrrentSelectedTeacherId 
 * @param {*} objNewSelectedTeacherData 
 * @summary   Trigerred when a selection a Teacher dropdown is changed.
 */
export function HandleOnChangeTeacherDropDown(objContext, strCurrrentSelectedTeacherId, objNewSelectedTeacherData)
{
    if(strCurrrentSelectedTeacherId !== objNewSelectedTeacherData["uTeacherId"])
    {
        let intIndex = objContext.state.arrCoTeachers.findIndex(objTempCoTeacher => objTempCoTeacher["uTeacherId"] === strCurrrentSelectedTeacherId);
        let arrCoTeachers = objContext.state.arrCoTeachers;
        let objNewClassTeacherDetails = GetDefaultClassTeacherDetails(objContext, objNewSelectedTeacherData["uTeacherId"]);
        arrCoTeachers = [...arrCoTeachers.slice(0, intIndex), objNewClassTeacherDetails, ...arrCoTeachers.slice(intIndex, arrCoTeachers.length)];
        let objDeletedCoTeacherDetail = arrCoTeachers.filter(objTempCoTeacher => objTempCoTeacher["uTeacherId"] === strCurrrentSelectedTeacherId)[0];
        arrCoTeachers = arrCoTeachers.filter(objTempCoTeacher => objTempCoTeacher["uTeacherId"] !== strCurrrentSelectedTeacherId);
        if(objDeletedCoTeacherDetail["uClassTeacherId"] !== "00000000-0000-0000-0000-000000000000")
        {
            arrCoTeachers = [...arrCoTeachers, {...objDeletedCoTeacherDetail, ["cIsDeleted"]: "Y"}];
        }
        UpdateAvailableTeachers(objContext, "REPLACE", strCurrrentSelectedTeacherId, objNewSelectedTeacherData["uTeacherId"])
        objContext.dispatch({type: "SET_STATE_VALUES", payload: { "arrCoTeachers": arrCoTeachers }});
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
    let arrCoTeachers = objContext.state.arrCoTeachers;
    let objCoTeacherDetails = arrCoTeachers.filter(objTempCoTeacher => objTempCoTeacher["uTeacherId"] === strTeacherId)[0];
    arrCoTeachers = arrCoTeachers.filter(objTempCoTeacher => objTempCoTeacher["uTeacherId"] !== strTeacherId);
    if(objCoTeacherDetails["uClassTeacherId"] !== "00000000-0000-0000-0000-000000000000")
    {
        arrCoTeachers = [...arrCoTeachers, {...objCoTeacherDetails, ["cIsDeleted"]: "Y"}]
    }
    UpdateAvailableTeachers(objContext, "ADD", strTeacherId, "");
    objContext.dispatch({type: "SET_STATE_VALUES", payload: { "arrCoTeachers": arrCoTeachers }});
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
    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrCoTeachers": [...objContext.state.arrCoTeachers, objClassTeacherDetails] }});
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
 * 
 * @param {*} objContext 
 * @summary   returns the class object to be saved.
 */
function GetSaveCoTeachersData(objContext)
{
    let objTempClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
    let objModifiedClassData = {...objTempClassData, ["t_TestDrive_Member_Class_Teacher"]: objContext.state.arrCoTeachers};
    return [objModifiedClassData];
}

/**
 * 
 * @param {*} objContext 
 * @summary   Saves the CoTeachers
 */
export function SaveCoTeachers(objContext)
{
    let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let objClassParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
            "Type": "nested"
        },
        "vEditData": GetSaveCoTeachersData(objContext),
        "uUserId": objContext.props.ClientUserDetails.UserId,
        "uSchoolId": strSchoolId
    };
    let arrParams = [
        {
            "URL": "API/Object/Extranet/Teacher/Class/SaveCoTeacher",
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
        arrCoTeachers: []
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
