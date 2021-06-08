import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef, DataImmutable } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import { Datacall } from '../Contact/ContactBusinessLogic';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            object_extranet_teacher: DataRef(state.Entity, "object_extranet_teacher", true),
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true),
            textresource: DataRef(state.Entity, "textresource", true),
            class: DataRef(state.Entity, "class", true),
            timetableclasstime: DataRef(state.Entity, "timetableclasstime", true),
            timetableday: DataRef(state.Entity, "timetableday", true),
            timetablecolor: DataRef(state.Entity, "timetablecolor", true),
            timetablesegment: DataRef(state.Entity, "timetablesegment", true),
            classgroup: DataRef(state.Entity, "classgroup", true),
            subject: DataRef(state.Entity, "subject", true),
            schoolsubject: DataRef(state.Entity, "schoolsubject", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
        };
    }
    else {
        console.log("not mapping class");
        return {};
    }
}

export function InitialDataParams(JConfiguration, props) {

    let strSchoolId = props.ClientUserDetails.TeacherDetails.uSchoolId;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    console.log("InitialDataParams", strClassId)

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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TimeTableSchedule"
                    }
                }
            ]
        },
    };

    let objGetClassesParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
            "Type": "nested"
        },
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
                                            "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N"
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        "SortKeys": [],
        "OutputColumns": []
    };

    var objGetTeachersParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Teacher_School.uSchoolId": strSchoolId,
            "Type": "nested"
        },

        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],

        "OutputColumns": []
    };

    var objGetSchoolYearPeriodParams = {
        "ForeignKeyFilter": {},

        "SortKeys": [],

        "OutputColumns": []
    };

    let objGetTimeTableTimeParams = {
        "ForeignKeyFilter": {
            "uUserId": strSchoolId
        },

        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],

        "OutputColumns": []
    };

    let objGetTimeTableDayParams = {
        "ForeignKeyFilter": {
            // "uUserId": strSchoolId
        },

        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],

        "OutputColumns": []
    };

    let objGetTimeTableSegmentParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        },
        "OutputColumns": []
    };

    let classGroupsParams = {
        "ForeignKeyFilter": {
            //"uClassId": strClassId
        },

        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ],
        "OutputColumns": []
    };

    let objDefaultSubjectsParams = {
        "SearchQuery":
        {
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
            ],
            should: [
                {
                    match: {
                        'cIsReadyForManualLearningTest':'Y'
                    }
                }
            ]
        }
    };
    let objSchoolSubjectParams = {
        "ForeignKeyFilter": {
            "uUserId": props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
        },
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
    };

    let objColorParams = {
        "ForeignKeyFilter": {
        },
        "OutputColumns": []
    };

    let arrRequest = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/Class",
            "Params": objGetClassesParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher",
            "Params": objGetTeachersParams,
            "MethodType": "Get",
            "UseFullName":true
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": objGetSchoolYearPeriodParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/School/TimeTableClassTime",
            "Params": objGetTimeTableTimeParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/Planner/TimeTableDay",
            "Params": objGetTimeTableDayParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Teacher/Planner/TimeTableSegment",
            "Params": objGetTimeTableSegmentParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/ClassGroup",
            "Params": classGroupsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objDefaultSubjectsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/Planner/TimeTableColor",
            "Params": objColorParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/School/SchoolSubject",
            "Params": objSchoolSubjectParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrRequest };
};

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
        //Do something
    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        Logger.Log("Getting initial data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }
    useLayoutEffect(GetRequiredData, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
function GetSubjectExpertTechersByClass(objSelClass, arrTeacherData) {
    let arrTeacherByClass = objSelClass.t_TestDrive_Member_Class_Teacher.filter(tchr => tchr.cIsCoTeacher == "Y" || (tchr.cIsCoTeacher == "N" && tchr.cIsSubjectExpert == "N"))
    let arrCopyTeachers = arrTeacherData.map(tchr => {
        return {
            ...tchr
        }
    })
    let arrDropDownTeacher = []
    for (let objTchr of arrCopyTeachers) {
        if (arrTeacherByClass.find(tchr => tchr.uTeacherId == objTchr.uTeacherId)) {
            arrDropDownTeacher = [...arrDropDownTeacher, objTchr]
        }
    }
    return arrDropDownTeacher;
}

export function GetClassDropDownData(arrClassData, objTextResource) {

    let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
    arrClassData.forEach((objClass) => {
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
            "Title": objTextResource.ClassTeacherTextForDropDown,
            "Data": arrMainClassData
        },
        {
            "Title": objTextResource.CoTeacherTextForDropDown,
            "Data": arrCoTeacherClassData
        },
        {
            "Title": objTextResource.SubjectExpertTeacherTextForDropDown,
            "Data": arrSubjectExpertClassData
        },
    ];
    return arrFinalClassData;
}



export function OnClassDropDownChange(objContext, objSelClass, arrTeacherData, arrSchoolYearData) {
    let arrDropDownTeacher = GetSubjectExpertTechersByClass(objSelClass, arrTeacherData);
    let objSchoolYearPeriod = arrSchoolYearData.find(sy => sy["uSchoolYearPeriodId"] == objSelClass["uSchoolYearPeriodId"]);
    objContext.dispatch({
        type: "Update_Teachers_Class", payload: {
            arrTeacher: arrDropDownTeacher,
            objSelClass: objSelClass,
            objSelTeacher: arrDropDownTeacher[0],
            objSelSchoolYearPeriod: objSchoolYearPeriod
        }
    })
}

export function FormDataToDisplay(objContext, objData) {
    let objDataCopy = JSON.parse(JSON.stringify(objData));
    let arrClassDayData = objDataCopy.arrDayData;
    let arrSegmentData = objDataCopy.arrSegmentData.filter(seg => seg["cIsDeleted"] == "N");
    let arrClassTimeData = objDataCopy.arrTimeData;
    let arrClassGroupData = objDataCopy.arrClassGroupData;
    let arrTeacherData = objDataCopy.arrTeacher;
    let arrSubjectData = objDataCopy.arrSubjectData;
    let strClassId = objContext.state.objSelClass ? objContext.state.objSelClass["uClassId"] : objContext.state.strUserPreferenceClassId;
    let strSchoolYearPeriodId = objContext.state.objSelSchoolYearPeriod.uSchoolYearPeriodId;
    let arrFinalData = [];
    for (let clsTime of arrClassTimeData) {
        let objRow = {
            uClassTimeId: clsTime.uClassTimeId,
            vClassFrom: clsTime.vClassTimeFrom,
            vClassTo: clsTime.vClassTimeTo,
            cIsBreak: clsTime.cIsBreak,
            iDisplayOrder: clsTime.iDisplayOrder,
            arrDays: []
        };
        for (let clsDay of arrClassDayData) {
            let objDay = {
                uTimeTableDayId: clsDay.uTimeTableDayId,
                iDisplayOrder: clsDay.iDisplayOrder,
                arrSegments: arrSegmentData.filter(seg => seg.uClassTimeId == clsTime.uClassTimeId && clsDay.uTimeTableDayId == seg.uTimeTableDayId && seg.uClassId == strClassId && seg.uSchoolYearPeriodId == strSchoolYearPeriodId).map(segData => {
                    return {
                        ...segData,
                        objClassGroup: arrClassGroupData.find(clsGrp => clsGrp.uClassGroupId == segData.uClassGroupId),
                        objTeacher: arrTeacherData.find(tchr => tchr.uTeacherId == segData.uTeacherId),
                        objSubject: arrSubjectData.find(objSub => objSub.iSubjectId == segData.iSubjectId)
                    }
                })
            };
            objRow.arrDays = [...objRow.arrDays, objDay]
        }
        arrFinalData = [...arrFinalData, objRow];
    }
    return arrFinalData;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the data required for the schedule. 
 */
export function GetData(objContext) {
    let strSchoolId = objContext.props.ClientUserDetails.TeacherDetails.uSchoolId;
    let strClassId = objContext.state.objSelClass ? objContext.state.objSelClass["uClassId"] : objContext.state.strUserPreferenceClassId;
    const objResourceData = DataRef(objContext.props.textresource, "textresource;Id;de/d.Extranet/3_Teacher/modules/timetableschedule").Data[0]["TimeTableSchedule"];
    const arrTeacherData = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + strSchoolId)["Data"];
    const arrSchoolYearPeriodData = DataRef(objContext.props.schoolyearperiod)["Data"];
    const arrClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId + ";t_testdrive_member_class_teacher.cisdeleted;n")["Data"];
    const arrDayData = DataRef(objContext.props.timetableday)["Data"];
    const arrColorData = DataRef(objContext.props.timetablecolor)["Data"];
    const arrTimeData = DataRef(objContext.props.timetableclasstime, "timetableclasstime;uuserid;" + strSchoolId)["Data"];
    const arrClassGroupData = DataRef(objContext.props.classgroup)["Data"];
    const arrDefaultSubjectData = DataRef(objContext.props.subject, "subject;iparentsubjectid;0;cislearncoachersubject;y;cisdeleted;n")["Data"]
    const arrSchoolSubjectData = DataRef(objContext.props.schoolsubject, "schoolsubject;uuserId;" + strSchoolId + ";cisdeleted;n")["Data"];
    const arrSubjectData = [...arrDefaultSubjectData, ...arrSchoolSubjectData];
    const arrSegmentData = DataRef(objContext.props.timetablesegment, "timetablesegment;uclassid;" + strClassId + ";cisdeleted;n")["Data"];
    return {
        arrSchoolYearPeriod: arrSchoolYearPeriodData,
        arrTeacher: arrTeacherData,
        arrClass: arrClassData,
        objTextResource: objResourceData,
        arrDayData: arrDayData,
        arrTimeData: arrTimeData,
        arrClassGroupData: arrClassGroupData,
        arrSubjectData: arrSubjectData,
        arrSegmentData: arrSegmentData ? arrSegmentData : [],
        arrColorData: arrColorData
    }
}

export function useDataLoadedSegment(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.dispatch({ type: 'ChangeStatus', payload: false })
        }
    }, [objContext.props.timetablesegment])
}

export function useDataLoaded(objContext) {
    console.log("useDataLoaded objContext.props ", objContext)
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strSchoolId = objContext.props.ClientUserDetails.TeacherDetails.uSchoolId;
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + strSchoolId) &&
            DataRef(objContext.props.schoolyearperiod) &&
            DataRef(objContext.props.timetableday) &&
            DataRef(objContext.props.timetablecolor) &&
            DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId + ";t_testdrive_member_class_teacher.cisdeleted;n") &&
            DataRef(objContext.props.timetableclasstime, "timetableclasstime;uuserid;" + strSchoolId) &&
            DataRef(objContext.props.classgroup) &&
            DataRef(objContext.props.subject, "subject;iparentsubjectid;0;cislearncoachersubject;y;cisdeleted;n") &&
            DataRef(objContext.props.schoolsubject, "schoolsubject;uuserId;" + strSchoolId + ";cisdeleted;n") &&
            DataRef(objContext.props.timetablesegment, "timetablesegment;uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.textresource, "textresource;id;de/d.extranet/3_teacher/modules/timetableschedule")) {
            let arrTeacherData = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + strSchoolId)["Data"];
            let arrClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId + ";t_testdrive_member_class_teacher.cisdeleted;n")["Data"]
            let objDefaultClass = arrClassData.find(c => c.uClassId == strClassId);
            let arrTeacherDropDownData = GetSubjectExpertTechersByClass(objDefaultClass, arrTeacherData)
            let arrSelSchoolYearPeriod = DataRef(objContext.props.schoolyearperiod)["Data"];
            let objSchoolYearPeriod = undefined;
            let currentDate = new Date();
            for (let itm of arrSelSchoolYearPeriod) {
                if (currentDate > new Date(itm.dtFromDate) && currentDate < new Date(itm.dtToDate)) {
                    objSchoolYearPeriod = itm;
                }
            }
            ApplicationState.SetProperty("blnShowAnimation", false)
            objContext.dispatch({
                type: 'DATA_LOAD_COMPLETE', payload: {
                    isLoadComplete: true,
                    strUserPreferenceClassId: strClassId,
                    arrDropDownTeacher: arrTeacherDropDownData,
                    objSelSchoolYearPeriod: objSchoolYearPeriod,
                    objSelTeacher: arrTeacherDropDownData[0],
                    objSelClass: objDefaultClass
                }
            });
        }
    }, [
            objContext.props.object_extranet_teacher,
            objContext.props.schoolyearperiod,
            objContext.props.textresource,
            objContext.props.class,
            objContext.props.timetableday,
            objContext.props.timetablecolor,
            objContext.props.timetableclasstime,
            objContext.props.classgroup,
            objContext.props.subject,
            objContext.props.schoolsubject,
            objContext.props.timetablesegment
        ]);
}

export function GetDefaultSchoolYearPeriod() {
    if (objData.SchoolYearPeriod.length !== 0) {
        objData.SchoolYearPeriod.map((obj, index) => {
            var a = obj.t_TestDrive_Member_Class_SchoolYearPeriod_Data[0].vSchoolYearName
            var b = obj.t_TestDrive_Member_Class_SchoolYearPeriod_Data[0].iLanguageId
            var c = obj.uSchoolYearPeriodId
            var prevYear = (new Date().getFullYear() - 1).toString()
            if (prevYear === a.split("/")[0]) {
                SelectedSchoolYearPeriodId = c
            }
            schoolYearPeriodDropDownData.push({ a, b, c })
        })
    }
}

export function SchoolYearDropDownChange(objContext, objSchoolYear) {
    objContext.dispatch({ type: 'SET_SCHOOL_YEAR_PERIOD', payload: objSchoolYear })
}

export function TeacherDropDownChange(objContext, objTeacher) {
    objContext.dispatch({ type: 'SET_TEACHER', payload: objTeacher })
}

export function OnClickShow(objContext) {
    let objGetTimeTableSegmentParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.objSelClass["uClassId"]
        },
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        },
        "OutputColumns": []
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Teacher/Planner/TimeTableSegment",
            "Params": objGetTimeTableSegmentParams,
            "MethodType": "Get"
        }
    ]
    Datacall(arrDataRequest);
}

/**
 * @summary Returns Initial state of the component.
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        objSelSchoolYearPeriod: undefined,
        arrDropDownTeacher: [],
        objSelClass: undefined,
        objSelTeacher: undefined,
        strUserPreferenceClassId: undefined,
        arrDisplayData: [],
        blnInitialDataLoaded: false
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
        case 'DATA_LOAD_COMPLETE':
            return {
                ...state,
                ["isLoadComplete"]: action.payload.isLoadComplete,
                ["strUserPreferenceClassId"]: action.payload.strUserPreferenceClassId,
                ["arrDropDownTeacher"]: action.payload.arrDropDownTeacher,
                ["objSelSchoolYearPeriod"]: action.payload.objSelSchoolYearPeriod,
                ["objSelClass"]: action.payload.objSelClass,
                ["objSelTeacher"]: action.payload.objSelTeacher,
            }
        case 'InitialUpdate': {
            return {
                ...state,
                arrDisplayData: action.payload,
                blnInitialDataLoaded: true
            }
        }

        case 'SET_SCHOOL_YEAR_PERIOD':
            return {
                ...state,
                "objSelSchoolYearPeriod": action.payload
            }
        case 'SET_TEACHER':
            return {
                ...state,
                "objSelTeacher": action.payload
            }
        case 'ChangeStatus':
            return {
                ...state,
                blnInitialDataLoaded: action.payload
            }

        case 'Update_Teachers_Class':
            return {
                ...state,
                "arrDropDownTeacher": action.payload.arrTeacher,
                "objSelClass": action.payload.objSelClass,
                "objSelTeacher": action.payload.objSelTeacher,
                "objSelSchoolYearPeriod": action.payload.objSelSchoolYearPeriod
            }
    }
}
