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
            class: DataRef(state.Entity, "class", true),
            subject: DataRef(state.Entity, "subject", true),
            schoolsubject: DataRef(state.Entity, "schoolsubject", true),
            object_extranet_teacher: DataRef(state.Entity, "object_extranet_teacher", true),
            textresource: DataRef(state.Entity, "textresource", true)
        };
    }
    else {
        return {};
    }
}

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component. Do not change the sequence of the request because Pupil params is again taken from this.
 */
export function InitialDataParams(JConfiguration, props){
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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert"
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
    let objTeacherParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Teacher_School.uSchoolId": props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"],
            "Type": "nested"
        }
    };
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
    let objSchoolSubjectParams = {
        "ForeignKeyFilter": {
            "uUserId": props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]
        },
        "SearchQuery": {
            "must":[
                {
                    "match":{
                        "cIsDeleted":"N"
                    }
                }
            ]
        }
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
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher",
            "Params": objTeacherParams,
            "MethodType": "Get",
            "UseFullName":true
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/School/SchoolSubject",
            "Params": objSchoolSubjectParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrParams};
}

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams, strToggleExecute = "FetchAndCacheExecute"){
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    switch(strToggleExecute)
    {
        case "FetchAndCacheExecute":
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
        break;
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext){
    useLayoutEffect(() => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    useLayoutEffect(()=>{
        if(DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId) && 
            DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]) && 
        DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/coteacherandsubjectexpert") && 
        DataRef(objContext.props.subject, "subject;iparentsubjectid;0;cislearncoachersubject;y;cisdeleted;n") && 
        DataRef(objContext.props.schoolsubject, "schoolsubject;uuserId;" + objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"] + ";cisdeleted;n"))
        {
            let objClassData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            if(objClassData === undefined || JSON.stringify(objClassData) === '{}')
            {
                objClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data[0];
            }
            else
            {
                objClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data.filter(objTempClassDetail=> objTempClassDetail["uClassId"] === objClassData["uClassId"])[0];
            }
            let objPreveiouslySelectedTeachers = GetPreveiouslySelectedTeachers(objContext, objClassData);
            let arrAvailableTeachers = GetAvailableTeachers(objContext, objPreveiouslySelectedTeachers["SelectedTeachers"]);
            SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, objClassData, arrAvailableTeachers);
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    }, [objContext.props.class, objContext.props.object_extranet_teacher, objContext.props.textresource,, objContext.props.subject, objContext.props.schoolsubject]);
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objClassData 
 * @summary   Gets previously selected class, to set after rerender
 */
function GetPreveiouslySelectedTeachers(objContext, objClassData)
{
    let arrSelectedTeachers = [];
    let arrClassTeachers = objClassData["t_TestDrive_Member_Class_Teacher"];
    arrClassTeachers.forEach(objTempClassTeacherDetails => {
        if(objTempClassTeacherDetails["cIsDeleted"] === "N")
        {
            arrSelectedTeachers = [...arrSelectedTeachers, objTempClassTeacherDetails["uTeacherId"]];
        }
    });
    return {
        "SelectedTeachers": arrSelectedTeachers
    };
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strKeyName 
 * @summary   Returns the application state for co-teacher and subject expert
 */
export function GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, strKeyName = "")
{
    let objData = ApplicationState.GetProperty("SubjectExpert");
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
export function SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, objSelectedClassData = {}, arrAvailableTeachers = [])
{
    let objData = GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext);
    let objNewData = {};
    if(objData)
    {
        objNewData = {
            ...objData, 
            ["SelectedClassData"]: objSelectedClassData, 
            ["AvailableTeachers"]: arrAvailableTeachers 
        };
    }
    else
    {
        objNewData = {
            "SelectedClassData": objSelectedClassData, 
            "AvailableTeachers": arrAvailableTeachers
        };
    }
    ApplicationState.SetProperty("SubjectExpert", objNewData);
}

/**
 * 
 * @param {*} objContext 
 * @param {*} arrSelectedTeachers 
 * @summary   Gets available teachers after filtering active ones from the already present class teachers.
 */
export function GetAvailableTeachers(objContext, arrSelectedTeachers)
{
    let arrActiveTeachers = GetActiveTeachers(objContext);
    let arrAvailableTeachers = arrActiveTeachers.filter(objTempActiveTeacherDetails => {
        return arrSelectedTeachers.findIndex(strTempSelectedTeacherId => {
            return strTempSelectedTeacherId === objTempActiveTeacherDetails["uTeacherId"]
        }) < 0  && objTempActiveTeacherDetails["uTeacherId"] !== objContext.props.ClientUserDetails.UserId});
    return arrAvailableTeachers;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the active teachers after filtering them from the data from backend.
 */
export function GetActiveTeachers(objContext)
{
    let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let arrTeacherData = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + strSchoolId)["Data"];
    let arrActiveTeachers = arrTeacherData.filter(objTeacherData => objTeacherData["t_TestDrive_Member_Teacher_School"].filter(objTempTeacherSchoolDetails => objTempTeacherSchoolDetails["uSchoolId"] === strSchoolId)[0]["cIsDeleted"] === "N");
    return arrActiveTeachers;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objClassData 
 * @summary   Handle sequence of events that should be triggered when Selection in ClassDropdown Changes
 */
export function HandleOnChangeClassDropDown(objContext, objClassData)
{
    let objPreveiouslySelectedTeachers = GetPreveiouslySelectedTeachers(objContext, objClassData);
    let arrAvailableTeachers = GetAvailableTeachers(objContext, objPreveiouslySelectedTeachers["SelectedTeachers"]);
    SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, objClassData, arrAvailableTeachers);
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false
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
};
