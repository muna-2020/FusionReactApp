import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            class: DataRef(state.Entity, "class", true),
            subject: DataRef(state.Entity, "subject", true),
            textresource: DataRef(state.Entity, "textresource", true),
            pupil: DataRef(state.Entity, "pupil", true),
            cycle: DataRef(state.Entity, "cycle", true),
            intranettest: DataRef(state.Entity, "intranettest", true),
            testloginandresult: DataRef(state.Entity, "testloginandresult", true),
            schoolyear: DataRef(state.Entity, "schoolyear", true),
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
    let iStateId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TestResults"
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
    let objSubjectsParams = {
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "cIsTestedAtThisTime": "Y"
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
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };
    let objIntranetTestParams = {
        "cArchieve": "N",
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
        "cIsCache": 'Y',
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    },
                    {
                        "match": {
                            "iCycleTypeId": strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uSchoolId": uSchoolId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
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
    let objSchoolYearParams = {
        "SearchQuery": {
            "must":
                [
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
            "URL": "API/Object/Blocks/TextResource/TextResource",
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
            "URL": "API/Object/Intranet/Test/Cycle",
            "Params": objCycleParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objIntranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYear",
            "Params": objSchoolYearParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrParams };
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the pupil params for selected class
 */
export function GetPupilDataParams(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleId = QueryString.GetQueryStringValue("CycleId");
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];

    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };
    let objIntranetTestParams = {
        "cArchieve": "N",
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
        "cIsCache": 'Y',
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    },
                    {
                        "match": {
                            "uCycleId": strCycleId
                        }
                    },
                    {
                        "match": {
                            "uSchoolId": uSchoolId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": objContext.props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
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
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objIntranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objTestLoginAndResultParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
}

export function OnChangeWeekDisplay(objContext, objItem) {

    if (objContext.state.strType == 'Week') { // forming days present in week
        let arrStartDate = objItem.StartDate.split('.');
        let startDate = new Date(arrStartDate[2], (arrStartDate[1] - 1), arrStartDate[0]);
        let arrEndDate = objItem.EndDate.split('.');
        let endDate = new Date(arrEndDate[2], (arrEndDate[1] - 1), arrEndDate[0])
        let arrWeekDays = [];
        for (var i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
            let objDay = {
                "iDayNumber": parseInt(i.getDate().toString()),
                "iYear": i.getFullYear().toString(),
                "iMonthNumber": i.getMonth() + 1,
                "objDateObject": i.toDateString()
            }
            arrWeekDays = [...arrWeekDays, objDay]
        }
    } else {
        let arrCurrentDate = objItem.CurrentDate.split('.');
    }
}


/**
 * 
 * @param {*} arrParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams, strToggleExecute = 'FetchAndCacheExecute') {
    switch (strToggleExecute) {
        case 'FetchAndCacheExecute':
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
    }
}

export function ResetResult(objContext, objTest, objTestResult) {
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let objParams = {
        "CycleId": objTestResult["uCycleId"],
        "ExecutionId": objTestResult["TestExecution"][0]["uExecutionId"],
        "ClassId": objTestResult["uClassId"],
        "TestId": objTest["uTestId"],
        "RepetitionId": objTestResult["iCycleRepetition"],
        "PupilId": objTestResult["uPupilId"],
        "SchoolId": uSchoolId,
        "StateId": iStateId,
        "TeacherId": objContext.props.ClientUserDetails.UserId,
        "TestTokenId": objTestResult["uTestTokenId"]
    };

    let arrRequest = [
        {
            "URL": "API/Extranet/Teacher/TestResults/ResultReset",
            "Params": objParams
        }
    ]
    DataCall(arrRequest);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the PupilDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForPupil(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            DataCall(GetPupilDataParams(objContext));
        }
    }, [objContext.state.blnIsClassSelectionChanged]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");   
    let strCycleTypeId = GetCycleTypeId();
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];

    useEffect(() => {
        if (DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/testresults") &&
            DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.subject, "subject;cIsTestedAtThisTime;y;cislearncoachersubject;y;cisdeleted;n") &&
            DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
            DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n") &&
            DataRef(objContext.props.schoolyear, "schoolyear;cisdeleted;n") &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n")) {
            ApplicationState.SetProperty("DisplayFor", 4);
            let arrPupilData = [];
            let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
            if (arrTempPupilData.length > 0) {
                arrPupilData = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
            }
            let arrSubject = GetDefaultSubjects(objContext);
            let arrTestLoginsAndResultData = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeId + ";uclassid;" + strClassId).Data;
            let CompletedAndInProgressTestResults = [];
            arrTestLoginsAndResultData.map((objTestResult) => {
                if (objTestResult["TestExecution"].length > 0 && (objTestResult["TestExecution"][0]["iTestStatusId"] === 5 || objTestResult["TestExecution"][0]["iTestStatusId"] === 3)) {
                    CompletedAndInProgressTestResults = [...CompletedAndInProgressTestResults, objTestResult];
                }
            });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubjectId": arrSubject[0].iSubjectId, "arrPupil": arrPupilData, "CompletedAndInProgressTestResults": CompletedAndInProgressTestResults, "arrSelectAllTestResults": [] } });
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        }
    }, [objContext.props.class, objContext.props.subject, objContext.props.textresource, objContext.props.pupil, objContext.props.cycle, objContext.props.intranettest, objContext.props.schoolyear, objContext.props.testloginandresult]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Extracts and Returns the default subjects for the component.
 */
export function GetDefaultSubjects(objContext) {
    let arrTempSubjects = DataRef(objContext.props.subject, "subject;cIsTestedAtThisTime;y;cislearncoachersubject;y;cisdeleted;n").Data;
    let arrSubjects = arrTempSubjects.filter(objTempData => objTempData["iParentSubjectId"] === 0);
    return arrSubjects;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the sub subject of the selected subjects
 */
export function GetSubSubject(objContext) {
    let arrSubjects = DataRef(objContext.props.subject, "subject;cIsTestedAtThisTime;y;cislearncoachersubject;y;cisdeleted;n").Data;
    let arrSubSubjects = arrSubjects.filter(objTempData => objTempData["iParentSubjectId"] === objContext.state.intSelectedSubjectId);
    return arrSubSubjects;
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns School Year Id of selected class.
 */
export function GetSchoolYearIdFromSelectedClass(objContext) {
    var uSelectedClassId = ApplicationState.GetProperty("SelectedClassId");
    var arrSelectedClassObj = [];
    var arrClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data;
    arrClassData.map((objClassData) => {
        if (objClassData["uClassId"] === uSelectedClassId) {
            arrSelectedClassObj = [...arrSelectedClassObj, objClassData];
        }
    });
    var arrSchoolYear = [];
    let arrAllSchoolYear = objContext.props.schoolyear["schoolyear;cisdeleted;n"].Data;
    if (arrClassData[0]["iSchoolYear"] != null) {
        arrAllSchoolYear.map((objSchoolYear) => {
            if (objSchoolYear["iSchoolYear"] === arrSelectedClassObj[0]["iSchoolYear"]) {
                arrSchoolYear = [...arrSchoolYear, objSchoolYear];
            }
        });
    } else {
        arrSchoolYear = [arrAllSchoolYear[0]];
    }
   
    return arrSchoolYear[0]["iSchoolYearId"];
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns an array with the test data for the cycle Id.
 */
export function GetTestData(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let arrTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n").Data;
    let arrSubSubjects = GetSubSubject(objContext);
    let arrFilteredTestDataWithMainSubject = [];
    let arrFilteredTestDataWithSubSubject = [];
    let intSchoolYearId = GetSchoolYearIdFromSelectedClass(objContext);
    if (arrTestData && arrTestData.length > 0) {
        var arrFilteredTestDataBySchoolYId = [];
        arrTestData.map((objTempData) => {
            if (objTempData["t_TestDrive_Cycle_SchoolYear"].filter((objTempTestSchoolYearData) => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0) {
                arrFilteredTestDataBySchoolYId = [...arrFilteredTestDataBySchoolYId, objTempData];
            }
        });

        arrFilteredTestDataWithMainSubject = arrFilteredTestDataBySchoolYId.filter(objTempData => objTempData["iSubjectId"] === objContext.state.intSelectedSubjectId);
        arrSubSubjects.map((objTempSubjectData) => {
            let arrTempFilteredTestDataWithSubSubject = arrFilteredTestDataBySchoolYId.filter(objTempTestData => objTempTestData["iSubjectId"] === objTempSubjectData["iSubjectId"]);
            if (arrTempFilteredTestDataWithSubSubject.length > 0) {
                arrFilteredTestDataWithSubSubject = [...arrFilteredTestDataWithSubSubject, arrTempFilteredTestDataWithSubSubject[0]];
            }
        });
    }

    let arrFilteredTestData = [...arrFilteredTestDataWithMainSubject, ...arrFilteredTestDataWithSubSubject];
    return arrFilteredTestData;
}

/**
 * 
 * @param {} objContext 
 * @summary  returns an array of classes to load in the drop down
 */
export function GetClassDropDownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/testresults").Data[0]["TestResults"];
    let arrTempClass = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data.map((objClass) => {
        return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") };
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
}

export function GetTestLoginsAndResultData() {
    const arrTestLoginsAndResultData = [
        {
            "uTestTokenId": "2209BC65-0000-4073-BBBE-5C5E1EEA6958",
            "vTestTokenNumber": "0133386689562",
            "uCycleId": "8C880D36-6E8F-4EBB-A725-3C2F0F689DBF",
            "uPupilId": "6684323A-909B-46BA-ACEE-F3C3D0EB2963",
            "uTestId": "8C105C30-E8D8-43DC-ACAA-E83E83115D44",
            "dtCreatedOn": "2018-11-16T15:00:00",
            "uClassId": "27C542B8-E3E4-414E-94C3-26EE596E0FB4",
            "dtValidTill": "2018-11-16T16:30:00",
            "uParentTestId": null,
            "iSubjectId": 2419,
            "iCycleRepetition": 1,
            "uSchoolId": "6840D418-EA6E-482B-ACCF-57F95FB6499E",
            "iStateId": 437,
            "iClassTypeId": null,
            "TestExecution": [
                {
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTestStatusId": 5,
                    "uTestTokenId": "2209BC65-BB26-4073-BBBE-5C5E1EEA4852",
                    "dtTestStart": "2018-12-17T08:00:00:00",
                    "dtTestEnd": "2018-12-17T09:00:00:00",
                    "iTaskCountDisplayed": null,
                    "iTotalEffectiveTimeTaken": null,
                    "iNoOfLoginAttempts": 1
                }
            ],
            "TestResultSummary": [
                {
                    "uResultSummaryId": "D4368789-95A6-4E23-BC77-A5B9BAF0354A",
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTaskObjectsCorrect": 31,
                    "iTaskObjectsWrong": 42,
                    "iTaskObjectsNotAnswered": 0,
                    "vResultAttribute": '{"PartiallyCorrectTasks":7,"TestObjectsWrong":20,"TestObjectsNotAnswered":0,"TestPercentage":"","TestLanguageId":3,"RawResult":445,"EffectiveTestTimeinSeconds":2327,"TestEnd":"28.02.2019 15: 09: 31","Result_Unit":"","EffectiveTestTimeinMinutes":39,"Grade":"","Result_Key":"","FullyWrongTasks":8,"NotAttemptedTasks":0,"FullyCorrectTasks":20,"DateWhenTestExecuted":"28.02.2019 14: 29: 45","TestPoint":445,"TestName":"Lesen(Klasse 7)","TotalTasksCount":35,"TestExecutionDate":"2019.02.28","Result":"445","TestObjectsCorrect":42,"TestMaxPoint":60}'
                }
            ],
            "TestResultSummarySubSubject": []
        },
        {
            "uTestTokenId": "CB8B0B30-A61C-4333-8791-79F5B387D0BD",
            "vTestTokenNumber": "0133386684526",
            "uCycleId": "8C880D36-6E8F-4EBB-A725-3C2F0F689DBF",
            "uPupilId": "F6CBCAB9-72A5-464B-98A1-E5EDF6093647",
            "uTestId": "CB8B0B30-A61C-4333-8791-79F5B387D0BD",
            "dtCreatedOn": "2018-11-16T16:00:00",
            "uClassId": "27C542B8-E3E4-414E-94C3-26EE596E0FB4",
            "dtValidTill": "2018-11-16T17:30:00",
            "uParentTestId": null,
            "iSubjectId": 2419,
            "iCycleRepetition": 1,
            "uSchoolId": "6840D418-EA6E-482B-ACCF-57F95FB6499E",
            "iStateId": 437,
            "iClassTypeId": null,
            "TestExecution": [
                {
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTestStatusId": 3,
                    "uTestTokenId": "2209BC65-BB26-4073-BBBE-5C5E1EEA4852",
                    "dtTestStart": "2018-12-17T08:00:00:00",
                    "dtTestEnd": "2018-12-17T09:00:00:00",
                    "iTaskCountDisplayed": null,
                    "iTotalEffectiveTimeTaken": null,
                    "iNoOfLoginAttempts": 1
                }
            ],
            "TestResultSummary": [
                {
                    "uResultSummaryId": "D4368789-95A6-4E23-BC77-A5B9BAF0354A",
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTaskObjectsCorrect": 31,
                    "iTaskObjectsWrong": 42,
                    "iTaskObjectsNotAnswered": 0,
                    "vResultAttribute": '{"PartiallyCorrectTasks":7,"TestObjectsWrong":20,"TestObjectsNotAnswered":0,"TestPercentage":"","TestLanguageId":3,"RawResult":445,"EffectiveTestTimeinSeconds":2327,"TestEnd":"28.02.2019 15: 09: 31","Result_Unit":"","EffectiveTestTimeinMinutes":39,"Grade":"","Result_Key":"","FullyWrongTasks":8,"NotAttemptedTasks":0,"FullyCorrectTasks":20,"DateWhenTestExecuted":"28.02.2019 14: 29: 45","TestPoint":445,"TestName":"Lesen(Klasse 7)","TotalTasksCount":35,"TestExecutionDate":"2019.02.28","Result":"445","TestObjectsCorrect":42,"TestMaxPoint":60}'
                }
            ],
            "TestResultSummarySubSubject": []
        },
        {
            "uTestTokenId": "9034EBDF-D303-4E82-892D-FB3CAE264EF3",
            "vTestTokenNumber": "0133895689562",
            "uCycleId": "8C880D36-6E8F-4EBB-A725-3C2F0F689DBF",
            "uPupilId": "F6CBCAB9-72A5-464B-98A1-E5EDF6093647",
            "uTestId": "CB8B0B30-A61C-4333-8791-79F5B387D0BD",
            "dtCreatedOn": "2018-11-16T16:30:00",
            "uClassId": "27C542B8-E3E4-414E-94C3-26EE596E0FB4",
            "dtValidTill": "2018-11-16T18:00:00",
            "uParentTestId": null,
            "iSubjectId": 2419,
            "iCycleRepetition": 2,
            "uSchoolId": "6840D418-EA6E-482B-ACCF-57F95FB6499E",
            "iStateId": 437,
            "iClassTypeId": null,
            "TestExecution": [
                {
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTestStatusId": 5,
                    "uTestTokenId": "2209BC65-BB26-4073-BBBE-5C5E1EEA4852",
                    "dtTestStart": "2018-12-17T08:00:00:00",
                    "dtTestEnd": "2018-12-17T09:00:00:00",
                    "iTaskCountDisplayed": null,
                    "iTotalEffectiveTimeTaken": null,
                    "iNoOfLoginAttempts": 1
                }
            ],
            "TestResultSummary": [
                {
                    "uResultSummaryId": "D4368789-95A6-4E23-BC77-A5B9BAF0354A",
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTaskObjectsCorrect": 31,
                    "iTaskObjectsWrong": 42,
                    "iTaskObjectsNotAnswered": 0,
                    "vResultAttribute": '{"PartiallyCorrectTasks":7,"TestObjectsWrong":20,"TestObjectsNotAnswered":0,"TestPercentage":"","TestLanguageId":3,"RawResult":445,"EffectiveTestTimeinSeconds":2327,"TestEnd":"28.02.2019 15: 09: 31","Result_Unit":"","EffectiveTestTimeinMinutes":39,"Grade":"","Result_Key":"","FullyWrongTasks":8,"NotAttemptedTasks":0,"FullyCorrectTasks":20,"DateWhenTestExecuted":"28.02.2019 14: 29: 45","TestPoint":445,"TestName":"Lesen(Klasse 7)","TotalTasksCount":35,"TestExecutionDate":"2019.02.28","Result":"445","TestObjectsCorrect":42,"TestMaxPoint":60}'
                }
            ],
            "TestResultSummarySubSubject": []
        },
        {
            "uTestTokenId": "2209BC65-0000-4073-BBBE-5C5E1EEA6958",
            "vTestTokenNumber": "0133386689562",
            "uCycleId": "8C880D36-6E8F-4EBB-A725-3C2F0F689DBF",
            "uPupilId": "6684323A-909B-46BA-ACEE-F3C3D0EB2963",
            "uTestId": "89C2F4FF-64DE-4CDE-B52A-3F9CC80D8541",
            "dtCreatedOn": "2018-11-16T15:00:00",
            "uClassId": "27C542B8-E3E4-414E-94C3-26EE596E0FB4",
            "dtValidTill": "2018-11-16T16:30:00",
            "uParentTestId": null,
            "iSubjectId": 2419,
            "iCycleRepetition": 3,
            "uSchoolId": "6840D418-EA6E-482B-ACCF-57F95FB6499E",
            "iStateId": 437,
            "iClassTypeId": null,
            "TestExecution": [
                {
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTestStatusId": 5,
                    "uTestTokenId": "2209BC65-BB26-4073-BBBE-5C5E1EEA4852",
                    "dtTestStart": "2018-12-17T08:00:00:00",
                    "dtTestEnd": "2018-12-17T09:00:00:00",
                    "iTaskCountDisplayed": null,
                    "iTotalEffectiveTimeTaken": null,
                    "iNoOfLoginAttempts": 1
                }
            ],
            "TestResultSummary": [
                {
                    "uResultSummaryId": "D4368789-95A6-4E23-BC77-A5B9BAF0354A",
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTaskObjectsCorrect": 31,
                    "iTaskObjectsWrong": 42,
                    "iTaskObjectsNotAnswered": 0,
                    "vResultAttribute": '{"PartiallyCorrectTasks":7,"TestObjectsWrong":20,"TestObjectsNotAnswered":0,"TestPercentage":"","TestLanguageId":3,"RawResult":445,"EffectiveTestTimeinSeconds":2327,"TestEnd":"28.02.2019 15: 09: 31","Result_Unit":"","EffectiveTestTimeinMinutes":39,"Grade":"","Result_Key":"","FullyWrongTasks":8,"NotAttemptedTasks":0,"FullyCorrectTasks":20,"DateWhenTestExecuted":"28.02.2019 14: 29: 45","TestPoint":445,"TestName":"Lesen(Klasse 7)","TotalTasksCount":35,"TestExecutionDate":"2019.02.28","Result":"445","TestObjectsCorrect":42,"TestMaxPoint":60}'
                }
            ],
            "TestResultSummarySubSubject": []
        },
        {
            "uTestTokenId": "2209BC65-0000-4073-BBBE-5C5E1EEA6958",
            "vTestTokenNumber": "0133386689562",
            "uCycleId": "8C880D36-6E8F-4EBB-A725-3C2F0F689DBF",
            "uPupilId": "6684323A-909B-46BA-ACEE-F3C3D0EB2963",
            "uTestId": "89C2F4FF-64DE-4CDE-B52A-3F9CC80D8541",
            "dtCreatedOn": "2018-11-16T15:00:00",
            "uClassId": "27C542B8-E3E4-414E-94C3-26EE596E0FB4",
            "dtValidTill": "2018-11-16T16:30:00",
            "uParentTestId": null,
            "iSubjectId": 2419,
            "iCycleRepetition": 4,
            "uSchoolId": "6840D418-EA6E-482B-ACCF-57F95FB6499E",
            "iStateId": 437,
            "iClassTypeId": null,
            "TestExecution": [
                {
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTestStatusId": 5,
                    "uTestTokenId": "2209BC65-BB26-4073-BBBE-5C5E1EEA4852",
                    "dtTestStart": "2018-12-17T08:00:00:00",
                    "dtTestEnd": "2018-12-17T09:00:00:00",
                    "iTaskCountDisplayed": null,
                    "iTotalEffectiveTimeTaken": null,
                    "iNoOfLoginAttempts": 1
                }
            ],
            "TestResultSummary": [
                {
                    "uResultSummaryId": "D4368789-95A6-4E23-BC77-A5B9BAF0354A",
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTaskObjectsCorrect": 31,
                    "iTaskObjectsWrong": 42,
                    "iTaskObjectsNotAnswered": 0,
                    "vResultAttribute": '{"PartiallyCorrectTasks":7,"TestObjectsWrong":20,"TestObjectsNotAnswered":0,"TestPercentage":"","TestLanguageId":3,"RawResult":445,"EffectiveTestTimeinSeconds":2327,"TestEnd":"28.02.2019 15: 09: 31","Result_Unit":"","EffectiveTestTimeinMinutes":39,"Grade":"","Result_Key":"","FullyWrongTasks":8,"NotAttemptedTasks":0,"FullyCorrectTasks":20,"DateWhenTestExecuted":"28.02.2019 14: 29: 45","TestPoint":445,"TestName":"Lesen(Klasse 7)","TotalTasksCount":35,"TestExecutionDate":"2019.02.28","Result":"445","TestObjectsCorrect":42,"TestMaxPoint":60}'
                }
            ],
            "TestResultSummarySubSubject": []
        },
        {
            "uTestTokenId": "2209BC65-0000-4073-BBBE-5C5E1EEA6958",
            "vTestTokenNumber": "0133386689562",
            "uCycleId": "8C880D36-6E8F-4EBB-A725-3C2F0F689DBF",
            "uPupilId": "F6CBCAB9-72A5-464B-98A1-E5EDF6093647",
            "uTestId": "89C2F4FF-64DE-4CDE-B52A-3F9CC80D8541",
            "dtCreatedOn": "2018-11-16T15:00:00",
            "uClassId": "27C542B8-E3E4-414E-94C3-26EE596E0FB4",
            "dtValidTill": "2018-11-16T16:30:00",
            "uParentTestId": null,
            "iSubjectId": 2419,
            "iCycleRepetition": 4,
            "uSchoolId": "6840D418-EA6E-482B-ACCF-57F95FB6499E",
            "iStateId": 437,
            "iClassTypeId": null,
            "TestExecution": [
                {
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTestStatusId": 5,
                    "uTestTokenId": "2209BC65-BB26-4073-BBBE-5C5E1EEA4852",
                    "dtTestStart": "2018-12-17T08:00:00:00",
                    "dtTestEnd": "2018-12-17T09:00:00:00",
                    "iTaskCountDisplayed": null,
                    "iTotalEffectiveTimeTaken": null,
                    "iNoOfLoginAttempts": 1
                }
            ],
            "TestResultSummary": [
                {
                    "uResultSummaryId": "D4368789-95A6-4E23-BC77-A5B9BAF0354A",
                    "uExecutionId": "2B21F8B2-C6CA-4C55-8514-8B1771D2AA5F",
                    "iTaskObjectsCorrect": 31,
                    "iTaskObjectsWrong": 42,
                    "iTaskObjectsNotAnswered": 0,
                    "vResultAttribute": '{"PartiallyCorrectTasks":7,"TestObjectsWrong":20,"TestObjectsNotAnswered":0,"TestPercentage":"","TestLanguageId":3,"RawResult":445,"EffectiveTestTimeinSeconds":2327,"TestEnd":"28.02.2019 15: 09: 31","Result_Unit":"","EffectiveTestTimeinMinutes":39,"Grade":"","Result_Key":"","FullyWrongTasks":8,"NotAttemptedTasks":0,"FullyCorrectTasks":20,"DateWhenTestExecuted":"28.02.2019 14: 29: 45","TestPoint":445,"TestName":"Lesen(Klasse 7)","TotalTasksCount":35,"TestExecutionDate":"2019.02.28","Result":"445","TestObjectsCorrect":42,"TestMaxPoint":60}'
                }
            ],
            "TestResultSummarySubSubject": []
        }
    ];
    return arrTestLoginsAndResultData;
}

export function GetCompletedAndInProgressTestResults(objContext, iCycleRepetition, strCycleId, uPupilId, uTestId) {
    var arrTestLoginsAndResultData = objContext.state.CompletedAndInProgressTestResults;
    var arrcompletedTestResults = [];
    arrTestLoginsAndResultData.map((objTestResult) => {
        if (objTestResult["uPupilId"] === uPupilId && objTestResult["uCycleId"] === strCycleId && objTestResult["uTestId"] === uTestId && objTestResult["iCycleRepetition"] === iCycleRepetition) {
            arrcompletedTestResults = [...arrcompletedTestResults, objTestResult];
        }
    });
    return arrcompletedTestResults;
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function OnChangeClassDropDown(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsClassSelectionChanged": !objContext.state.blnIsClassSelectionChanged } });
}

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function OnChangeSubjectDropDown(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubjectId": objItem.iSubjectId } });
}

/**
 *
 * @param {*} objContext
 * @param {*} objTestDetails
 * @param {*} intCycleRepetition
 * @param {*} blnIsChecked
 * @summary   Trigerred when the any checkbox is checked or unchecked. 
 */
export function OnChangeCheckBox(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked) {
    var arrSelectAllTestData = [];
    if (blnIsChecked) {
        objContext.state.CompletedAndInProgressTestResults.map((objCompletedTestData) => {
            if (objCompletedTestData["uTestId"] === objTestDetails["uTestId"] && objCompletedTestData["iCycleRepetition"] === intCycleRepetition) {
                arrSelectAllTestData = [...arrSelectAllTestData, { "blnIsChecked": blnIsChecked, "intCycleRepetition": intCycleRepetition, "objTestDetails": objCompletedTestData }];
            }
        });
        var arrAllTestResults = [...objContext.state.arrSelectAllTestResults, ...arrSelectAllTestData];
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSelectAllTestResults": arrAllTestResults } });
    }
    else {
        objContext.state.arrSelectAllTestResults.map((objSelectAllTestData) => {
            if (objSelectAllTestData["intCycleRepetition"] !== intCycleRepetition || objSelectAllTestData["objTestDetails"]["uTestId"] !== objTestDetails["uTestId"]) {
                arrSelectAllTestData = [...arrSelectAllTestData, objSelectAllTestData];
            }
        });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSelectAllTestResults": arrSelectAllTestData } });
    }
}

export function GetTestDetailsAndCycleRepitition(objContext, objCompareTestDetails, intTempCount) {
    var arrTestDetails = [];
    if (objContext.state.arrSelectAllTestResults.length > 0) {
        objContext.state.arrSelectAllTestResults.map((objTestData) => {
            if (objTestData["intCycleRepetition"] === intTempCount && objTestData["objTestDetails"]["uTestId"] === objCompareTestDetails["uTestId"]) {
                arrTestDetails = [...arrTestDetails, objTestData];
            }
        });
    }
    return arrTestDetails;
}

export function ReCalculateTestResult(objContext, objTest, objTestResult) {
    let objParams = {
        objData: {
            TestId: objTest["uTestId"],
            CycleId: objTestResult["uCycleId"],
            ClassId: objTestResult["uClassId"],
            PupilId: objTestResult["uPupilId"],
            TestTokenId: objTestResult["uTestTokenId"],
            TokenNumber: objTestResult["vTestTokenNumber"],
            ExecutionId: objTestResult["TestExecution"][0]["uExecutionId"]
        }
    };

    let arrRequest = [{
        URL: "API/Extranet/TestResults/TestResults/ReCalculateTestResultForPupil",
        Params: objParams
    }];

    DataCall(arrRequest);

}

function GetCycleTypeId() {
    return "1";
}

export function GetCycleObject(objContext) {
    let strCycleTypeId = GetCycleTypeId();
    let objCycle = DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")["Data"][0];
    return objCycle;
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSelectedSubjectId: -1,
        Open: false,//All pdf pop up open and close.
        arrPupil: [],
        blnIsClassSelectionChanged: false
    };
}

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
}
