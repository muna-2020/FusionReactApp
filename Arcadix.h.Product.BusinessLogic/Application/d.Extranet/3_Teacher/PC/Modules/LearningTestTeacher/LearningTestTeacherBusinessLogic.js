import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import * as RouterHelper from "@root/Framework/Services/ReactRouterHelper/ReactRouterHelper";

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
            subject: DataRef(state.Entity, "subject", true),
            clientsettings: DataRef(state.Entity, "clientsettings", true),
            testloginandresult: DataRef(state.Entity, "testloginandresult", true),
            cycle: DataRef(state.Entity, "cycle", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
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
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    let strTeacherId = props.ClientUserDetails.UserId;
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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningTestTeacher"
                    }
                }
            ]
        }
    };
    let objClassParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": strTeacherId,
            "Type": "nested"
        }
    };
    let objSubjectsParams = {
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "cIsReadyForManualLearningTest": "Y"
                    }
                },
                {
                    "match": {
                        "cIsActive": "Y"
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
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };
    let objClientSettingsParams = {
        "SearchQuery": {
            "should": [
                {
                    "bool":
                    {
                        "must": [
                            {
                                "match": {
                                    "iConfigurationFileId": 1
                                }
                            },
                            {
                                "match": {
                                    "vParentKey": "ExtranetTeacher"
                                }
                            },
                            {
                                "match": {
                                    "vSubParentKey": "LearningTest"
                                }
                            },
                            {
                                "match": {
                                    "vKey": "NumberOfTasksForSystemGeneratedTest"
                                }
                            }
                        ]
                    }
                },
                {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "iConfigurationFileId": 1
                                }
                            },
                            {
                                "match": {
                                    "vParentKey": "ExtranetTeacher"
                                }
                            },
                            {
                                "match": {
                                    "vSubParentKey": "LearningTest"
                                }
                            },
                            {
                                "match": {
                                    "vKey": "NumberOfRepetitionForSystemGeneratedTest"
                                }
                            }
                        ]
                    }
                },
                {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "iConfigurationFileId": 1
                                }
                            },
                            {
                                "match": {
                                    "vParentKey": "ExtranetTeacher"
                                }
                            },
                            {
                                "match": {
                                    "vSubParentKey": "LearningTest"
                                }
                            },
                            {
                                "match": {
                                    "vKey": "TaskFoldersForLearningTest"
                                }
                            }
                        ]
                    }
                },
                {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "iConfigurationFileId": 1
                                }
                            },
                            {
                                "match": {
                                    "vParentKey": "TestConfiguration"
                                }
                            },
                            {
                                "match": {
                                    "vSubParentKey": "Task"
                                }
                            },
                            {
                                "match": {
                                    "vKey": "LearningTestSkinId"
                                }
                            },
                            {
                                "match":
                                {
                                    "iApplicationTypeId": 1
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    let objTestLoginAndResultParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": strCycleTypeId
                    }
                },
                {
                    "match": {
                        "uClassId": strClassId
                    }
                }
            ]
        }
    };

    let objCycleParams = {
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iCycleTypeId": strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "cIsActive": "Y"
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
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Cockpit/MainClient/ClientSettings",
            "Params": objClientSettingsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/Cycle",
            "Params": objCycleParams,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrParams
    };
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the extranet test api call params.
 */
export function GetExtranetTestParams(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleId = QueryString.GetQueryStringValue("CycleId").toUpperCase();
    let strTeacherId = objContext.props.ClientUserDetails.UserId;
    let strFromDate = "";
    let strToDate = "";
    if (JSON.stringify(objContext.state.objWeekDisplaySelection) !== '{}') {
        strFromDate = objContext.state.objWeekDisplaySelection["StartDate"];
        strToDate = objContext.state.objWeekDisplaySelection["EndDate"];
    }
    let objExtranetTestParams = {
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": GetCycleTypeId()
                    }
                },
                {
                    "match": {
                        "uClassId": strClassId
                    }
                },
                {
                    "match": {
                        "uTeacherId": strTeacherId
                    }
                },
                {
                    "range": {
                        "dtFromDate": strFromDate,
                        "dtToDate": strToDate
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
            "URL": "API/Object/Intranet/Test/ExtranetTest",
            "Params": objExtranetTestParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
};

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get api call params for TestLoginAndResult and Pupil, when the selection of class fropdown is changed.
 */
export function GetDataParamsForChangeOfClassDropdownSelection(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleId = QueryString.GetQueryStringValue("CycleId").toUpperCase();
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };
    let objTestLoginAndResultParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uCycleId": strCycleId
                    }
                },
                {
                    "match": {
                        "uClassId": strClassId
                    }
                }
            ]
        }
    };
    let arrParams = [
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objTestLoginAndResultParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @summary   Call 'Execute' method of 'ArcadixFetchAndCache' or 'ArcadixFetch' based on 'strToggleExecute', to make the api call.
 */
export function DataCall(objContext, arrParams, strToggleExecute = 'FetchAndCacheExecute') {
    switch (strToggleExecute) {
        case 'FetchAndCacheExecute':
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
        case "FetchExecuteForExtranetTest":
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let strClassId = ApplicationState.GetProperty("SelectedClassId");              
                let strTeacherId = objContext.props.ClientUserDetails.UserId;            
                let strKey = "extranettest;icycletypeid;"+GetCycleTypeId()+";uclassid;"+strClassId+";uteacherid;"+ strTeacherId;
                let arrData = objReturn["extranettest"][strKey.toLowerCase()]["Data"];
                switch (objContext.state.intStatusToggle) {
                    case 1:
                        arrData = arrData.filter(objTempData => objTempData["cIsSystemGenerated"] === "N" && objTempData["cIsDeleted"] === "N");
                        break;
                    case 2:
                        arrData = arrData.filter(objTempData => objTempData["cIsSystemGenerated"] === "N" && objTempData["cIsDeleted"] === "Y");
                        break;
                }
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrExtranetTestData": arrData, "arrOriginalExtranetTestData": arrData } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
            break;
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and ExtranetTestParams and passes them as a parameter to the DataCall method. On return, removes the application state used by WeekDisplay component.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
        DataCall(objContext, GetExtranetTestParams(objContext), "FetchExecuteForExtranetTest");
        return () => {
            ApplicationState.RemoveProperty("DisplayFor");
        };
    }, []);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Triggered when the class dropdown selection changes. Gets the Pupil and ExtranetTest params and makes seperate calls to get data.
 */
export function useDataLoaderForChangeOfClassDropdownSelection(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            DataCall(objContext, GetDataParamsForChangeOfClassDropdownSelection(objContext));
            DataCall(objContext, GetExtranetTestParams(objContext), "FetchExecuteForExtranetTest");
        }
    }, [objContext.state.blnIsClassSelectionChanged]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Trigerred when WeekDisplay component is traversed.
 */
export function useDataLoaderForChangeOfWeekDisplaySelection(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            if (objContext.state.intWeekDisplayChangeCount > 0)//This useEffect gets triggered when the week display component is invoked. So as to reduce the call this check is made.
            {
                ApplicationState.SetProperty("blnShowAnimation", true);
                DataCall(objContext, GetExtranetTestParams(objContext), "FetchExecuteForExtranetTest");
            }
            else {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intWeekDisplayChangeCount": objContext.state.intWeekDisplayChangeCount + 1 } });
            }
        }
    }, [objContext.state.objWeekDisplaySelection]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    useEffect(() => {
        if (DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n") &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/LearningTestTeacher") &&
            DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
            DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n") &&
            DataRef(objContext.props.clientsettings, "clientsettings") &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeId + ";uclassid;" + strClassId)) {
            let arrPupilData = GetPupilData(objContext, "GetDataForDropdown");
            let arrSubjects = GetDefaultSubjects(objContext, "GetDataForDropdown");
            ApplicationState.SetProperty("DisplayFor", 4);//for week display component
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupilData": arrPupilData, "intSelectedParentSubjectId": arrSubjects[0].iSubjectId } })
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.class, objContext.props.subject, objContext.props.textresource, objContext.props.pupil, objContext.props.clientsettings, objContext.props.testloginandresult, objContext.props.cycle]);
};

/**
 * 
 * @param {} objContext 
 * @summary  Returns an array of classes to load in the class drop down.
 */
export function GetClassDropDownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    let arrTempClass = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data.map((objClass) => {
        return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") }
    });
    let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
    arrTempClass.forEach((objClass) => {
        let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" }) };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrMainClassData = [...arrMainClassData, objTempClassData];
        }
        objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N") };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
        }
        objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y") };
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
 * @param {*} strToggleGetData //filter
 * @param {*} strPupilId //filter
 * @summary   Returns the pupil data on the basis of filters.
 */
export function GetPupilData(objContext, strToggleGetData, strPupilId = "") {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
    let arrPupilData = [];
    switch (strToggleGetData) {
        case "GetDataForDropdown":
            let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
            arrPupilData = arrTempPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
            let objAllOption = {
                ...arrPupilData[0],
                ["uPupilId"]: "00000000-0000-0000-0000-000000000000",
                ["vFirstName"]: objTextResource["AllOptionText"],
                ["vName"]: "",
                ["t_TestDrive_Member_Class_Pupil"]: [],
                ["t_TestDrive_Member_School_Pupil"]: []
            };
            arrPupilData = [objAllOption, ...arrPupilData];
            break;
        case "GetSpecificData":
            arrPupilData = arrTempPupilData.filter(objTempData => { return objTempData["uPupilId"] === strPupilId && objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N" });
            break;
        default:
            arrPupilData = arrTempPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
            break;
    }
    return arrPupilData;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strToggleGetData //filter
 * @param {*} iSubjectId //filter
 * @summary   Returns the data on the basis of filters
 */
export function GetDefaultSubjects(objContext, strToggleGetData, iSubjectId = -1) {
    let arrSubjects = [];
    switch (strToggleGetData) {
        case "GetDataForDropdown":
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0);
            let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
            let objAllOption = {
                ["iSubjectId"]: -1,
                ["t_TestDrive_Subject_Data"]:
                    [
                        {
                            ["vSubjectName"]: objTextResource["AllOptionText"],
                            ["iLanguageId"]: parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
                        }
                    ]
            };
            arrSubjects = [objAllOption, ...arrSubjects];
            break;
        case "GetSpecificData":
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0 && objTempData["iSubjectId"] === iSubjectId);
            break;
        default:
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0);
            break;
    }
    return arrSubjects;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strToggleGetData //filter
 * @param {*} iSubjectId //filter
 * @summary   Returns the data on the basis of filters
 */
export function GetSubSubjects(objContext, strToggleGetData, iSubjectId = -1) {
    let arrSubjects = [];
    switch (strToggleGetData) {
        case "GetDataForDropdown":
            let arrDefaultSubjects = GetDefaultSubjects(objContext, "GetDataForDropdown");
            let objAllOption = { ...arrDefaultSubjects[0] };
            if (objContext.state.intSelectedParentSubjectId === -1) {
                arrSubjects = [objAllOption];
            }
            else {
                arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === objContext.state.intSelectedParentSubjectId);
                arrSubjects = [objAllOption, ...arrSubjects];
            }
            break;
        case "GetSpecificData":
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iSubjectId"] === iSubjectId);
            break;
        default:
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === objContext.state.intSelectedParentSubjectId);
            break;
    }
    return arrSubjects;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns Week Display dropdown.
 */
export function GetWeekDisplayDropdownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    let arrDropdownData = [
        {
            Key: objTextResource["WeekDisplayDropdownWeekTitle"],
            Value: 2
        },
        {
            Key: objTextResource["WeekDisplayDropdownSemesterTitle"],
            Value: 3
        },
        {
            Key: objTextResource["WeekDisplayDropdownSchoolYearTitle"],
            Value: 4
        }
    ];
    return arrDropdownData;
};

/**
 * 
 * @param {} objContext 
 * @summary  Returns an array of Modus to load in the drop down
 */
export function GetModusDropdownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    return [
        { key: objTextResource["AllOptionText"], value: -1 },//All
        { key: objTextResource["ModusDropdownItemFirst"], value: 2 },//Lernen
        { key: objTextResource["ModusDropdownItemSecond"], value: 3 }//Prufen
    ];
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the status toggle data.
 */
export function GetStatusToggleData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    let arrStatusToggleData = [
        {
            Key: objTextResource["StatusToggleDataActive"],
            Value: 1
        },
        {
            Key: objTextResource["StatusToggleDataArchive"],
            Value: 2
        }
    ];
    return arrStatusToggleData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the TestLoginAndResult data.
 */
export function GetTestLoginAndResult(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleId = QueryString.GetQueryStringValue("CycleId").toUpperCase();
    let arrTestLoginsAndResultData = DataRef(objContext.props.testloginandresult, "testloginandresult;ucycleid;" + strCycleId + ";uclassid;" + strClassId)["Data"];
    Logger.Log("Test Login And Result Data", arrTestLoginsAndResultData);
    return arrTestLoginsAndResultData;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrData 
 * @summary   Returns the extranet test data after filtering it on basis of class id.
 */
export function GetFilteredTestData(objContext, arrData) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrNewData = arrData.filter(objTempData => objTempData["uClassId"] === strClassId);
    return arrNewData;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strClassId 
 * @summary   Retruns the class object of the class id passed or the one set in application state.
 */
export function GetClassDetails(objContext, strClassId = "") {
    if (strClassId === "") {
        strClassId = ApplicationState.GetProperty("SelectedClassId");
    }
    let arrClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data.filter(objTempData => objTempData["uClassId"] === strClassId);
    let objClassDetails = null;
    if (arrClassData.length > 0) {
        objClassDetails = arrClassData[0];
    }
    return objClassDetails;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrTestData
 * @summary   Called when the search button is clicked. Does the filtering of extranet test data on the basis of selected pupil, subject, competency(sub-subject), modus.
 */
export function LoadTestWithFilters(objContext, arrTestData = []) {
    let arrData = [];
    if (arrTestData.length > 0) {
        arrData = [...objContext.state.arrOriginalExtranetTestData, arrTestData[0]];
    }
    else {
        arrData = [...objContext.state.arrOriginalExtranetTestData];
    }
    //arrOriginalExtranetTestData
    if (objContext.state.strSelectedPupilId !== "00000000-0000-0000-0000-000000000000") {
        arrData = arrData.filter(objTempData => objTempData["t_TestDrive_Cycle_Pupil"].filter(objTempPupilTestData => objTempPupilTestData["uPupilId"] === objContext.state.strSelectedPupilId).length > 0);

    }
    if (objContext.state.intSelectedParentSubjectId !== -1) {
        let arrSubSubejcts = GetSubSubjects(objContext);
        let arrTempTestData = [];
        arrSubSubejcts.forEach(objTempSubjectData => {
            let arrTempData = arrData.filter(objTempData => objTempData["iSubjectId"] === objTempSubjectData["iSubjectId"]);
            if (arrTempData.length > 0) {
                arrTempTestData = [...arrTempTestData, ...arrTempData];
            }
        });
        arrData = [...arrTempTestData];
    }
    if (objContext.state.intSelectedSubSubjectId !== -1) {
        arrData = arrData.filter(objTempData => objTempData["iSubjectId"] === objContext.state.intSelectedSubSubjectId);
    }
    if (objContext.state.intSelectedModusId !== -1) {
        arrData = arrData.filter(objTempData => objTempData["iTestTypeId"] === objContext.state.intSelectedModusId);
    }
    if (arrTestData.length > 0) {
        return arrData;
    }
    else {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrExtranetTestData": arrData } });
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objTestDetails 
 * @param {*} objClassDetails 
 * @param {*} arrSub 
 * @param {*} objSubjectDataDetails 
 * @param {*} strModus 
 * @param {*} intTaskCount 
 * @param {*} objStatus 
 * @param {*} objTextResource 
 * @summary   Gets the data to be sent to TeacherStatisticsPopUp and opens it.
 */
export function ShowTeacherStatisticsPopUp(objContext, objTestDetails, objClassDetails, arrSub, objSubjectDataDetails, strModus, intTaskCount, objStatus, objTextResource) {
    let strCycleId = QueryString.GetQueryStringValue("CycleId").toUpperCase();
    let objTestDisplayData = {
        objTestDetails: objTestDetails,
        objClassDetails: objClassDetails,
        vSubSubjectName: arrSub[0]["t_TestDrive_Subject_Data"][0]["vSubjectName"],
        vSubjectName: objSubjectDataDetails["vSubjectName"],
        strModus: strModus,
        intTaskCount: intTaskCount,
        objStatus: objStatus
    };
    ApplicationState.SetProperty("blnShowAnimation", true);
    objContext.props.showPopup({
        MaxHeight: "98%",
        MaxWidth: "98%",
        popUpMinHeight: "98%",
        popUpMinWidth: "98%",
        showHeader: false,
        popUpName: "TestStatistics", //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {
            OnClickClsoePopUp: (objDeletedTest) => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                AfterDeletingTest(objContext, objDeletedTest);
            }
        },
        headerTitle: "",
        Data: {
            ClientUserDetails: objContext.props.ClientUserDetails,
            objTestDisplayData: objTestDisplayData,
            strCycleId: strCycleId,
            objTeacherDetails: objContext.props.ClientUserDetails.TeacherDetails,
            objTextResource: objTextResource
        }
    });
};

function AfterDeletingTest(objContext, objDeletedTest) {
    let arrTestDataAfterDelete = objContext.state.arrExtranetTestData.filter(objTest => objDeletedTest["uTestId"] != objTest["uTestId"]);
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { arrExtranetTestData: arrTestDataAfterDelete } })
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objTestDetails 
 * @summary   Used to get the status of the extranet test. Returns a Json object.
 */
export function GetStatus(objContext, objTestDetails) {
    let objTaskAndRoundDetails = GetTaskAndRoundDetails(objContext);
    let arrTestLoginAndResult = GetTestLoginAndResult(objContext);
    let objStatus = {};
    if (objTestDetails["t_TestDrive_Cycle_Pupil"].length > 0) {
        objStatus["cHasRoundCompleted"] = objTestDetails["t_TestDrive_Cycle_Pupil"][0]["cHasRoundCompleted"] == "Y" ? "Y" : "N";
        objStatus["cNewTestAllowed"] = parseInt(objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] ? objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] : 0) < parseInt(objTaskAndRoundDetails["RepetitionCount"]) && objStatus["cHasRoundCompleted"] === "N" ? true : false;
        objStatus["cRoundFinished"] = parseInt(objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] ? objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] : 0) < parseInt(objTaskAndRoundDetails["RepetitionCount"]) && objStatus["cHasRoundCompleted"] === "Y" ? true : false;
        objStatus["cRoundsCompleted"] = objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] ? objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] : 0 === parseInt(objTaskAndRoundDetails["RepetitionCount"]) && objStatus["cHasRoundCompleted"] === "Y" ? true : false;
        objStatus["cShowRoundComplete"] = objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] ? objTestDetails["t_TestDrive_Cycle_Pupil"][0]["iRoundId"] : 0 === parseInt(objTaskAndRoundDetails["RepetitionCount"]) && objStatus["cHasRoundCompleted"] === "N" ? true : false;
    }
    let objStatusToReturn = {
        strStatus: "NotStarted",
        vImgUrl: '',
        vResourceText: 'NotStarted',
        cHasRoundCompleted: objStatus["cHasRoundCompleted"]
    };
    if (objStatus["cHasRoundCompleted"] !== null && objStatus["cHasRoundCompleted"] === "Y") {
        objStatusToReturn.strStatus = 'Completed';
        objStatusToReturn.vResourceText = 'Completed';
    }
    else {
        if (arrTestLoginAndResult && arrTestLoginAndResult.length > 0) {
            let arrData = arrTestLoginAndResult.filter(objTempData => objTempData["uTestId"] === objTestDetails["uTestId"]);
            if (arrData.length > 0) {
                let objTestLoginAndResultDetails = arrData[0];
                if (objTestDetails["cIsSystemGenerated"] === "N") {
                    if (objTestDetails["iTestUsageId"] === 2) {
                        if (objTestLoginAndResultDetails !== null && objTestLoginAndResultDetails["TestExecution"] !== null) {
                            if (objTestLoginAndResultDetails["TestExecution"].length > 0 && objTestLoginAndResultDetails["TestExecution"][0]["iTestStatusId"] === 5 && objTestDetails["cHasRoundCompleted"] === "N") {
                                objStatusToReturn.strStatus = 'Completed';
                                objStatusToReturn.vResourceText = 'Completed';
                            }
                            else {
                                objStatusToReturn.strStatus = 'Started';
                                objStatusToReturn.vResourceText = 'Started';
                            }
                        }
                        else {
                            objStatusToReturn.strStatus = 'NotStarted';
                            objStatusToReturn.vResourceText = 'NotStarted';
                        }
                    }
                    else if (objTestDetails["iTestUsageId"] === 3) {
                        let arrTestRepetition = arrTestLoginAndResult.filter(objTempData => objTempData["uTestId"] === objTestDetails["uTestId"]).sort((objTempDataF, objTempDataS) => { return parseInt(objTempDataF["iCycleRepetition"]) - parseInt(objTempDataS["iCycleRepetition"]) });
                        if (objTestLoginAndResultDetails !== null && objTestLoginAndResultDetails["TestExecution"] !== null) {
                            if (objTestDetails["cIsSystemGenerated"] === "N" && arrTestRepetition.length > 0 && arrTestRepetition.length >= 7 && arrTestRepetition[6]["TestExecution"].length > 0 && arrTestRepetition[6]["TestExecution"][0]["iTestStatusId"] === 5) {
                                objStatusToReturn.strStatus = 'Completed';
                                objStatusToReturn.vResourceText = 'Completed';
                            }
                            else {
                                if (objTestLoginAndResultDetails["TestExecution"].length > 0 && objTestLoginAndResultDetails["TestExecution"][0]["iTestStatusId"] === 5) {
                                    objStatusToReturn.strStatus = 'NotCompleted';
                                    objStatusToReturn.vResourceText = 'NotCompleted';
                                }
                                else {
                                    objStatusToReturn.strStatus = 'Started';
                                    objStatusToReturn.vResourceText = 'Started';
                                }
                            }
                        }
                        else {
                            objStatusToReturn.strStatus = 'NotStarted';
                            objStatusToReturn.vResourceText = 'NotStarted';
                        }
                    }
                }
                else {
                    if (objTestLoginAndResultDetails !== null && objTestLoginAndResultDetails["TestExecution"] !== null) {
                        if (objTestLoginAndResultDetails["TestExecution"].length > 0 && objTestLoginAndResultDetails["TestExecution"][0]["iTestStatusId"] === 5 && objStatus["cHasRoundCompleted"] === "N") {
                            objStatusToReturn.strStatus = 'NotCompleted';
                            objStatusToReturn.vResourceText = 'NotCompleted';
                        }
                        else {
                            objStatusToReturn.strStatus = 'Started';
                            objStatusToReturn.vResourceText = 'Started';
                        }
                    }
                    else {
                        objStatusToReturn.strStatus = 'NotStarted';
                        objStatusToReturn.vResourceText = 'NotStarted';
                    }
                }
            }
        }
    }
    return objStatusToReturn;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the task round and repetition details.
 */
export function GetTaskAndRoundDetails(objContext) {
    let arrClientSettings = DataRef(objContext.props.clientsettings, "clientsettings").Data;
    let intTaskCount = parseInt(arrClientSettings.filter(objTempDetails => objTempDetails["vKey"] === "NumberOfTasksForSystemGeneratedTest")[0]["vValue"]);
    let intRepetitionCount = parseInt(arrClientSettings.filter(objTempDetails => objTempDetails["vKey"] === "NumberOfRepetitionForSystemGeneratedTest")[0]["vValue"]);
    return {
        "TaskCount": intTaskCount,
        "RepetitionCount": intRepetitionCount
    };
    // let objMaxRoundDetails = DataRef(props.clientsettings, "clientsettings;iconfigurationfileid;1;vparentkey;extranetteacher;vsubparentkey;learningtest;vkey;numberofrepetitionforsystemgeneratedtest")["Data"][0];
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strTestId 
 * @summary   Opens the preview pop up for previewing the test url.
 */
export function ShowPreviewPopUp(objContext, strTestId) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    objContext.props.showPopup(
        {
            MaxHeight: "98%",
            MaxWidth: "98%",
            popUpMinHeight: "98%",
            popUpMinWidth: "98%",
            showHeader: false,
            popUpName: "LearningTestPreview",
            passedEvents: {},
            headerTitle: "",
            Data: {
                "ClientUserDetails": objContext.props.ClientUserDetails,
                "TestId": strTestId,
                "TextResource": objTextResource
            }
        }
    );
};

/**
 * 
 * @param {*} objContext 
 * @summary   Opens the LearningTestCreation Popup.
 */
export function ShowLearningTestCreationPopUp(objContext) {
    ApplicationState.SetProperty("blnShowAnimation", true);
    let objCycle = GetCycleObject(objContext);
    objContext.props.showPopup(
        {
            MaxHeight: "98%",
            MaxWidth: "98%",
            popUpMinHeight: "98%",
            popUpMinWidth: "98%",
            showHeader: false,
            popUpName: "LearningTestCreation",
            passedEvents: {
                ChangeRouteToLearningTestSystem: () => {
                    RouterHelper.RouteTo("TeacherLearningTest/TeacherLearningTestSystem?CycleId=0fddde67-6793-4093-9790-9e3611356c8b", objContext.props.history);
                },
                GetNewCreatedTest: (arrReturn) => {
                    let strClassId = ApplicationState.GetProperty("SelectedClassId");
                    if (arrReturn[0]["uClassId"] === strClassId) {
                        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrExtranetTestData": LoadTestWithFilters(objContext, arrReturn), "arrOriginalExtranetTestData": [...objContext.state.arrOriginalExtranetTestData, arrReturn[0]] } });
                        ApplicationState.SetProperty("blnShowAnimation", false);
                    }
                }
            },
            headerTitle: "",
            Data: {
                "ClientUserDetails": objContext.props.ClientUserDetails,
                strCycleId: objCycle["uCycleId"]
            },
            popupClassName: "learning-test-creation-parent",
        }
    );
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function OnChangeClassDropDown(objContext, objItem) {
    objContext.dispatch(
        {
            type: "SET_STATE_VALUES",
            payload:
            {
                "blnIsClassSelectionChanged": !objContext.state.blnIsClassSelectionChanged,
                "strSelectedPupilId": "00000000-0000-0000-0000-000000000000",
                "intSelectedParentSubjectId": -1,
                "intSelectedSubSubjectId": -1
            }
        }
    );
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the pupil dropdown selection changes
 */
export function OnChangePupilDropDown(objContext, objItem) {
    Logger.Log("/*/*/*/*/*/*/Pupil Dropdown", objItem);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strSelectedPupilId": objItem["uPupilId"] } });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the Subject dropdown selection changes
 */
export function OnChangeSubjectDropDown(objContext, objItem) {
    Logger.Log("/*/*/*/*/*/*/Subject Dropdown", objItem);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedParentSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": -1 } });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the sub Subject dropdown selection changes
 */
export function OnChangeSubSubjectDropDown(objContext, objItem) {
    Logger.Log("/*/*/*/*/*/*/Sub-Subject Dropdown", objItem);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubSubjectId": objItem.iSubjectId } });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the Modus dropdown selection changes
 */
export function OnChangeModusDropDown(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedModusId": objItem.value } });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the status toggle dropdown selection changes
 */
export function OnChangeStatusToggleDropDown(objContext, objItem) {
    let arrData = [];
    switch (objItem.Value) {
        case 1:
            arrData = objContext.state.arrOriginalExtranetTestData.filter(objTempData => objTempData["cIsDeleted"] === "N");
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intStatusToggle": objItem.Value, "arrExtranetTestData": arrData } });
            break;
        case 2:
            arrData = objContext.state.arrOriginalExtranetTestData.filter(objTempData => objTempData["cIsDeleted"] === "Y");
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intStatusToggle": objItem.Value, "arrExtranetTestData": arrData } });
            break;
    }
};

/**
 * 
 * @param {*} objItem 
 * @summary   Trigerred when the change is there in week display component.
 */
export function OnChangeWeekDisplay(objContext, objItem) {
    if (objContext.state.objWeekDisplaySelection["StartDate"] !== objItem["StartDate"] && objContext.state.objWeekDisplaySelection["EndDate"] !== objItem["EndDate"]) {
       objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objWeekDisplaySelection": objItem } });
    }
};

/**
 * 
 * @param {*} objItem 
 * @summary   Trigerred when the selection changes in the WeekDisplayDropdown.
 */
export function OnChangeDisplayDropdown(objContext, objItem) {
    ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSelectedParentSubjectId: -1,
        intSelectedSubSubjectId: -1,
        intStatusToggle: 1,
        strSelectedPupilId: "00000000-0000-0000-0000-000000000000",
        blnIsClassSelectionChanged: false,
        intSelectedModusId: -1,
        objWeekDisplaySelection: {},
        intWeekDisplayChangeCount: 0,
        arrPupilData: [],
        arrExtranetTestData: [],
        arrOriginalExtranetTestData: []
    };
};

function GetCycleTypeId() {
    return "3";
}

export function GetCycleObject(objContext) {
    let strCycleTypeId = GetCycleTypeId();
    let objCycle = DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")["Data"][0];
    return objCycle;
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE':
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
    }
};
