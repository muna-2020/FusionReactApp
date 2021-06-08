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
            schoolyear: DataRef(state.Entity, "schoolyear", true),
            testloginandresult: DataRef(state.Entity, "testloginandresult", true)
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
    let strIsArchive = QueryString.GetQueryStringValue("IsArchive");
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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/HighStakeTestResults"
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
                },
                {
                    "match": {
                        "cIsHighStakeSubject": "Y"
                    }
                }
            ]
        }
    };

    let objCycleParams = {};

    if (strIsArchive === "Y") {

        objCycleParams = {
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "cIsArchiveTeacher": "Y"
                            }
                        }
                    ]
            }
        };
    }
    else {
        objCycleParams = {
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
    }

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
            "URL": "API/Object/Extranet/Teacher/SchoolYear",
            "Params": objSchoolYearParams,
            "MethodType": "Get"
        }
    ];


    if (strIsArchive !== "Y") {
        arrParams.push({
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objIntranetTestParams,
            "MethodType": "Get"
        });
        arrParams.push({
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objTestLoginAndResultParams,
            "MethodType": "Get"
        });
    }
    return { "DataCalls": arrParams };
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the pupil params for selected class
 */
export function GetPupilDataParams(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strCycleTypeId = GetCycleTypeId();
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
        DataCall(GetPupilDataParams(objContext));
    }, [objContext.state.blnIsClassSelectionChanged]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the CycleRelatedObjectParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForCycleRelatedObjects(objContext) {
    useLayoutEffect(() => {
        let strIsArchive = QueryString.GetQueryStringValue("IsArchive");
        if (objContext.state.strSelectedCycleId === '' && strIsArchive === "Y") {
            let arrCycle = DataRef(objContext.props.cycle, "cycle;cisarchiveteacher;y")["Data"];
            if (arrCycle && arrCycle.length > 0) {

                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strSelectedCycleId": arrCycle[0]["uCycleId"] } });
            }
        }
    }, [objContext.props.cycle]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the Latest Data for the changed cycle, Here it gets . CycleRelatedObjectParams and passes them as a parameter to the DataCall method
 */
export function useDataLoaderForCycleChange(objContext) {
    useLayoutEffect(() => {
        let strIsArchive = QueryString.GetQueryStringValue("IsArchive");
        if (objContext.state.strSelectedCycleId !== '' && strIsArchive === "Y")
            DataCall(GetCycleRelatedObjectsParams(objContext));
    }, [objContext.state.strSelectedCycleId]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the Latest Data for the changed SchoolYear, Here it gets . CycleRelatedObjectParams and passes them as a parameter to the DataCall method
 */
export function useDataLoaderForSchoolYearChange(objContext) {
    useLayoutEffect(() => {
        let strIsArchive = QueryString.GetQueryStringValue("IsArchive");
        if (objContext.state.strSelectedSchoolyearId !== '' && objContext.state.strSelectedCycleId !== '' && strIsArchive === "Y")
            DataCall(GetCycleRelatedObjectsParams(objContext));
    }, [objContext.state.strSelectedSchoolyearId]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Returns CycleRelatedObjectParams .
 */
export function GetCycleRelatedObjectsParams(objContext) {

    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strCycleId = objContext.state.strSelectedCycleId;
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

    return [
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
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    let strIsArchive = QueryString.GetQueryStringValue("IsArchive");
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    useEffect(() => {
        if (DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/highstaketestresults") &&
            DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.subject, "subject;cIsTestedAtThisTime;y;cislearncoachersubject;y;cisdeleted;n;cIsHighStakeSubject;y") &&
            DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
            (strIsArchive === "Y" || DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")) && (strIsArchive !== "Y" || DataRef(objContext.props.cycle, "cycle;cisarchiveteacher;y")) &&
            DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.schoolyear)) {
            let arrPupilData = [];
            let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
            if (arrTempPupilData.length > 0) {
                arrPupilData = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
            }
            let arrTestLoginsAndResultData = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeId + ";uclassid;" + strClassId).Data;
            let CompletedAndInProgressTestResults = [];
            arrTestLoginsAndResultData.map((objTestResult) => {
                if (objTestResult["TestExecution"].length > 0 && (objTestResult["TestExecution"][0]["iTestStatusId"] === 5 || objTestResult["TestExecution"][0]["iTestStatusId"] === 3)) {
                    CompletedAndInProgressTestResults = [...CompletedAndInProgressTestResults, objTestResult];
                }
            });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupil": arrPupilData, "CompletedAndInProgressTestResults": CompletedAndInProgressTestResults, "arrSelectAllTestResults": [] } });
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        }
    }, [objContext.props.class, objContext.props.subject, objContext.props.textresource, objContext.props.pupil, objContext.props.schoolyear, objContext.props.intranettest, objContext.props.cycle, objContext.props.testloginandresult]);
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
    let strIsArchive = QueryString.GetQueryStringValue("IsArchive");
    if (strIsArchive === 'Y' && objContext.state.strSelectedSchoolyearId !== '') {
        return objContext.state.strSelectedSchoolyearId;
    }
    else {
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
    }
}

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
    let strIsArchive = QueryString.GetQueryStringValue("IsArchive");
    let arrTestData = [];
    if (strIsArchive === "Y") {
        if (objContext.state.strSelectedCycleId && objContext.state.strSelectedCycleId !== '') {
            arrTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";ucycleid;" + objContext.state.strSelectedCycleId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n").Data;
        } else {
            arrTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n").Data;

        }
    } else {
        arrTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n").Data;
    }
    let intSchoolYearId = GetSchoolYearIdFromSelectedClass(objContext);
    if (arrTestData && arrTestData.length > 0) {
        var arrFilteredTestDataBySchoolYId = [];
        arrTestData.map((objTempData) => {
            if (objTempData["t_TestDrive_Cycle_SchoolYear"].filter((objTempTestSchoolYearData) => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0) {
                arrFilteredTestDataBySchoolYId = [...arrFilteredTestDataBySchoolYId, objTempData];
            }
        });
    }
    return arrFilteredTestDataBySchoolYId;
}



/**
 * 
 * @param {} objContext 
 * @summary  returns an array of classes to load in the drop down
 */
export function GetClassDropDownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/highstaketestresults").Data[0]["HighStakeTestResults"];
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
        }
    ];
    return arrFinalClassData;
}

function GetCycleId(objContext) {
    let strIsArchive = QueryString.GetQueryStringValue("IsArchive");
    let strCycleTypeId = GetCycleTypeId();
    let strCycleId = undefined;
    if (strIsArchive === "Y") {
        if (objContext.state.strSelectedCycleId && objContext.state.strSelectedCycleId !== '') {
            strCycleId = objContext.state.strSelectedCycleId;
        } else {
            let objCycle = DataRef(objContext.props.cycle, "cycle;cisarchiveteacher;y")["Data"][0];
            strCycleId = objCycle["uCycleId"];
        }
    } else {
        let objCycle = DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")["Data"][0];
        strCycleId = objCycle["uCycleId"];
    }
    return strCycleId;
}

export function GetTestResults(objContext, uPupilId, uTestId) {
    var arrTestLoginsAndResultData = objContext.state.CompletedAndInProgressTestResults;
    var arrcompletedTestResults = [];
    let strCycleId = GetCycleId(objContext);
    arrTestLoginsAndResultData.map((objTestResult) => {
        if (objTestResult["uPupilId"] === uPupilId && objTestResult["uCycleId"] === strCycleId["uCycleId"] && objTestResult["uTestId"] === uTestId) {
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

export function OnChangeSchoolYearDropDown(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strSelectedSchoolyearId": objItem.iSchoolYearId } });
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

export function OnChangeCycleDropDown(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strSelectedCycleId": objItem.uCycleId } });
}

export function GetSelectedTestResults(objContext, objCompareTestDetails) {
    var arrTestDetails = false;
    if (objContext.state.arrSelectAllTestResults.length > 0) {
        objContext.state.arrSelectAllTestResults.map((objTestData) => {
            if (objTestData["objTestDetails"]["uTestId"] === objCompareTestDetails["uTestId"]) {
                arrTestDetails = true;
            }
        });
    }
    return arrTestDetails;
}

/**
 *
 * @param {*} objContext
 * @param {*} objTestDetails
 * @param {*} blnIsChecked
 * @summary   Trigerred when the any checkbox is checked or unchecked. 
 */
export function OnChangeCheckBox(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, blnIsChecked) {
    var arrAllTestResults = [];
    if (blnIsChecked) {
        if (objTestDetails.length > 0) {
            objContext.state.CompletedAndInProgressTestResults.map((objCompletedTestData) => {
                objTestDetails.map((objTestDetails) => {
                    if (objCompletedTestData["uTestId"] === objTestDetails["uTestId"] && objCompletedTestData["TestExecution"][0]["iTestStatusId"] !== 3) {
                        arrAllTestResults = [...arrAllTestResults, { "blnIsChecked": blnIsChecked, "blnIsGroupSelect": true, "objTestDetails": objCompletedTestData }];
                    }
                });
            });
            arrAllTestResults = [...objContext.state.arrSelectAllTestResults, ...arrAllTestResults];

        }
        else {
            objContext.state.CompletedAndInProgressTestResults.map((objCompletedTestData) => {
                if (objCompletedTestData["uTestId"] === objTestDetails["uTestId"] && objCompletedTestData["TestExecution"][0]["iTestStatusId"] !== 3) {
                    arrAllTestResults = [...objContext.state.arrSelectAllTestResults, { "blnIsChecked": blnIsChecked, "blnIsGroupSelect": false, "objTestDetails": objCompletedTestData }];
                }
            });
        }
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSelectAllTestResults": arrAllTestResults } });
    }
    else {
        if (objTestDetails.length > 0) {
            objContext.state.arrSelectAllTestResults.map((objSelectAllTestData) => {
                if (objSelectAllTestData["blnIsGroupSelect"] !== true) {
                    arrAllTestResults = [...arrAllTestResults, objSelectAllTestData];
                }
            });
        }
        else {
            objContext.state.arrSelectAllTestResults.map((objSelectAllTestData) => {
                if (objSelectAllTestData["objTestDetails"]["uTestId"] !== objTestDetails["uTestId"]) {
                    arrAllTestResults = [...arrAllTestResults, objSelectAllTestData];
                }
            });
        }
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSelectAllTestResults": arrAllTestResults } });
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



/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSelectedSubjectId: -1,
        Open: false,//All pdf pop up open and close.
        arrPupil: [],
        blnIsClassSelectionChanged: false,
        strSelectedCycleId: '',
        strSelectedSchoolyearId: ''
    };
}

function GetCycleTypeId() {
    return "6";
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
