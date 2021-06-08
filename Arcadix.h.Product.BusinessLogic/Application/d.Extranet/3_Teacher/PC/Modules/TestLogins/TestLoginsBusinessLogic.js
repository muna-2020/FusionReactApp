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
            subject: DataRef(state.Entity, "subject", true),
            textresource: DataRef(state.Entity, "textresource", true),
            pupil: DataRef(state.Entity, "pupil", true),
            cycle: DataRef(state.Entity, "cycle", true),
            intranettest: DataRef(state.Entity, "intranettest", true),
            testloginandresult: DataRef(state.Entity, "testloginandresult", true),
            clientsettings: DataRef(state.Entity, "clientsettings", true),
            schoolyear: DataRef(state.Entity, "schoolyear", true),
            pupilsubjectclasstype: DataRef(state.Entity, "pupilsubjectclasstype", true),
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
    let strCycleTypeId = GetCycleTypeId();
    let strCycleTypeIdForTokenValidation = GetCycleTypeIdToValidateTokens();
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TestLogins"
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
    let objSubjectsParams = {};
    let objPupilSubjectClassTypeParams = {};
    if (blnIsOrientationTest) {
        objSubjectsParams = {
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "cIsActive": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        },
                        {
                            "match": {
                                "cIsTestedAtThisTime": "Y"
                            }
                        }
                    ]
            }
        };
    }
    else {
        objSubjectsParams = {
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "cIsActive": "Y"
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
        objPupilSubjectClassTypeParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            }
        };
    }
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };
    let objCycleParams = {
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "cIsActive": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "bool": {
                            "should": [
                                {
                                    "match": {
                                        "iCycleTypeId": strCycleTypeId
                                    }
                                },
                                {
                                    "match": {
                                        "iCycleTypeId": strCycleTypeIdForTokenValidation
                                    }
                                }
                            ]
                        }
                    }
                ]
        }
    };
    let objMainIntranetTestParams = {
        "cArchieve": "N",
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
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
    let objValidationIntranetTestParams = {
        "cArchieve": "N",
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
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
                            "iCycleTypeId": strCycleTypeIdForTokenValidation
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
    let objMainTestLoginAndResultParams = {
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
    let objValidationTestLoginAndResultParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": strCycleTypeIdForTokenValidation
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
    let objClientSettingsParams = {
        "SearchQuery": {
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
                        "vSubParentKey": "TestLoginPaperless"
                    }
                },
                {
                    "match": {
                        "vKey": "InvalidateTokenTime"
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
            "URL": "API/Object/Intranet/Test/Cycle",
            "Params": objCycleParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objMainIntranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objValidationIntranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objMainTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objValidationTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Cockpit/MainClient/ClientSettings",
            "Params": objClientSettingsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYear",
            "Params": objSchoolYearParams,
            "MethodType": "Get"
        }
    ];
    if (!blnIsOrientationTest) {
        arrParams = [...arrParams,
        {
            "URL": "API/Object/Extranet/Pupil/PupilSubjectClassType",
            "Params": objPupilSubjectClassTypeParams,
            "MethodType": "Get"
        }
        ];
    }
    return {
        "DataCalls": arrParams
    };
};

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
 * @param {*} objContext
 * @summary   Returns the pupil params for selected class
 */
export function GetDataCallParamsWhenClassDropwonSelectionChanges(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    let strCycleTypeIdForTokenValidation = GetCycleTypeIdToValidateTokens();
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };
    let objPupilSubjectClassTypeParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        }
    };
    let objMainCycleIntranetTestParams = {
        "cArchieve": "N",
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
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
    let objValidationCycleIntranetTestParams = {
        "cArchieve": "N",
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
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
                            "iCycleTypeId": strCycleTypeIdForTokenValidation
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
    let objMainTestLoginAndResultParams = {
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
    let objValidationTestLoginAndResultParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": strCycleTypeIdForTokenValidation
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
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objMainTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objValidationTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Pupil/PupilSubjectClassType",
            "Params": objPupilSubjectClassTypeParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objMainCycleIntranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objValidationCycleIntranetTestParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
};

/**
 *
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objContext, arrParams, strToggleExecute = 'FetchAndCacheExecute') {
    switch (strToggleExecute) {
        case 'FetchAndCacheExecute':
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
            break;
        case 'FetchExecuteForDate':
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let strDate = objReturn["dateformatter"]["Data"];
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strCurrentServerDate": strDate } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
            break;
        case 'FetchExecuteForFileInfo':
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let arrData = objReturn["TestLogins"]["Data"];
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPdfFilesInfo": arrData } });
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
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
        let arrDateParams = [
            {
                "URL": "API/Object/TestApplication/TestLoginAndResult/GetServerDate",
                "Params": {}
            }
        ];
        DataCall(objContext, arrDateParams, "FetchExecuteForDate");
    }, []);
};

/**
 *
 * @param {*} objContext
 * @summary   Gets the DataCallParams for when class dropdown selection changes and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForClassDropDownSelectionChange(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            let arrParams = GetDataCallParamsWhenClassDropwonSelectionChanges(objContext);
            DataCall(objContext, arrParams);
            let arrDateParams = [
                {
                    "URL": "API/Object/TestApplication/TestLoginAndResult/GetServerDate",
                    "Params": {}
                }
            ];
            DataCall(objContext, arrDateParams, "FetchExecuteForDate");
        }
    }, [objContext.state.blnIsClassSelectionChanged]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   This is called every time the state.Open is changed but is only executed if the state.Open is true and length of state.arrPdfFilesInfo is 0.
 */
export function useDataLoaderForGettingFileInfoOnShowPdf(objContext) {
    useEffect(() => {
        if (objContext.state.Open && objContext.state.arrPdfFilesInfo.length === 0) {
            let objShowOptionPdf = CheckIfToShowOptionalPdfButton(objContext);
            let arrParams = [
                {
                    "URL": "API/Extranet/Teacher/TestLogins/GetOptionalAdditionFileDetails",
                    "Params": { "TestIds": objShowOptionPdf["TestIds"] },
                }
            ];
            DataCall(objContext, arrParams, "FetchExecuteForFileInfo");
        }
    }, [objContext.state.Open]);
};

/**
 *
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    let strCycleTypeIdForTokenValidation = GetCycleTypeIdToValidateTokens();
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    useEffect(() => {
        if (DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/testlogins") &&
            DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
            DataRef(objContext.props.cycle, "cycle;cisactive;y;cisdeleted;n") &&
            DataRef(objContext.props.clientsettings, "clientsettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime") &&
            DataRef(objContext.props.schoolyear, "schoolyear;cisdeleted;n") &&
            DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeIdForTokenValidation + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeIdForTokenValidation + ";uclassid;" + strClassId) &&
            objContext.state.strCurrentServerDate !== "") {
            ApplicationState.SetProperty("DisplayFor", 4);
            if (blnIsOrientationTest && DataRef(objContext.props.subject, "subject;cisactive;y;cisdeleted;n;cistestedatthistime;y")) {
                let arrPupilData = [];
                let arrTestData = [];
                let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
                let intSelectedSubjectId = -1
                if (arrTempPupilData.length > 0) {
                    arrPupilData = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
                }
                if (objContext.state.intSelectedSubjectId === -1) {
                    let arrSubject = GetDefaultSubjects(objContext);
                    arrTestData = GetTestData(objContext, arrSubject[0].iSubjectId);
                    intSelectedSubjectId = arrSubject[0].iSubjectId
                }
                else {
                    intSelectedSubjectId = objContext.state.intSelectedSubjectId;
                    arrTestData = GetTestData(objContext, objContext.state.intSelectedSubjectId);
                }
               objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupil": arrPupilData, "intSelectedSubjectId": intSelectedSubjectId, "arrTestData": arrTestData } });
                ApplicationState.SetProperty("blnShowAnimation", false);
                if (!objContext.state.isLoadComplete) {
                    objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                }
            }
            else if (!blnIsOrientationTest &&
                DataRef(objContext.props.subject, "subject;cisactive;y;cisdeleted;n;cishighstakesubject;y")) {
                let arrPupil = [];
                let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
                if (arrTempPupilData.length > 0) {
                    arrPupil = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
                }
                let arrTestData = GetTestData(objContext);
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrPupil": arrPupil, "arrTestData": arrTestData } });
                ApplicationState.SetProperty("blnShowAnimation", false);
                if (!objContext.state.isLoadComplete) {
                    objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                }
            }
        }
    }, [objContext.props.class, objContext.props.textresource, objContext.props.subject, objContext.props.pupil, objContext.props.cycle, objContext.props.intranettest, objContext.props.clientsettings, objContext.props.schoolyear, objContext.state.strCurrentServerDate, objContext.props.testloginandresult]);
};

/**
 *
 * @param {*} objContext
 * @summary   Extracts and Returns the default subjects for the component.
 */
export function GetDefaultSubjects(objContext) {
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    let arrTempSubjects = [];
    if (blnIsOrientationTest) {
        arrTempSubjects = DataRef(objContext.props.subject, "subject;cisactive;y;cisdeleted;n;cistestedatthistime;y").Data;
    }
    else {
        arrTempSubjects = DataRef(objContext.props.subject, "subject;cisactive;y;cisdeleted;n;cishighstakesubject;y").Data;
    }
    let arrSubjects = arrTempSubjects.filter(objTempData => objTempData["iParentSubjectId"] === 0);
    let arrSortedSubjects = arrSubjects.sort((objTempDataCurrent, objTempDataNext) => { return objTempDataCurrent["iSubjectId"] - objTempDataNext["iSubjectId"] });
    return arrSortedSubjects;
};

/**
 *
 * @param {*} objContext
 * @summary   Returns the sub subject of the selected subjects
 */
export function GetSubSubject(objContext, intParentSubjectId = -1) {
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    let arrSubjects = [];
    if (blnIsOrientationTest) {
        arrSubjects = DataRef(objContext.props.subject, "subject;cisactive;y;cisdeleted;n;cistestedatthistime;y").Data;
    }
    else {
        arrSubjects = DataRef(objContext.props.subject, "subject;cisactive;y;cisdeleted;n;cishighstakesubject;y").Data;
    }
    if (intParentSubjectId === -1) {
        intParentSubjectId = objContext.state.intSelectedSubjectId;
    }
    let arrSubSubjects = arrSubjects.filter(objTempData => objTempData["iParentSubjectId"] === intParentSubjectId);
    let arrSortedSubjects = arrSubSubjects.sort((objTempDataCurrent, objTempDataNext) => { return objTempDataCurrent["iSubjectId"] - objTempDataNext["iSubjectId"] });
    return arrSortedSubjects;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns mergerd an array of selected subject and its sub-subject
 */
export function GetSubjects(objContext, intSubjectId = -1) {
    if (intSubjectId === -1) {
        intSubjectId = objContext.state.intSelectedSubjectId;
    }
    let arrTempDefaultSubjects = GetDefaultSubjects(objContext);
    let arrDefaultSubjects = arrTempDefaultSubjects.filter(objTempData => objTempData["iSubjectId"] === intSubjectId);
    let arrTempSubSubjects = GetSubSubject(objContext, intSubjectId);
    let arrSubSubjects = arrTempSubSubjects.filter(objTempData => objTempData["iParentSubjectId"] === intSubjectId);
    let arrSubjects = [...arrDefaultSubjects, ...arrSubSubjects];
    return arrSubjects;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns mergerd an array of selected subject and its sub-subject
 */
export function GetAllSubjects(objContext, intSubjectId = -1) {
    let arrDefaultSubjects = GetDefaultSubjects(objContext);
    let arrAllSubjects = [];
    let arrSubjects = [];
    let arrSubSubjects = [];
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = false;
    if (strIsOrientationTest === "Y") {
        blnIsOrientationTest = true;
    }
    if (blnIsOrientationTest) {
        arrAllSubjects = DataRef(objContext.props.subject, "subject;cisactive;y;cisdeleted;n;cIsTestedAtThisTime;Y").Data;
    }
    else {
        arrAllSubjects = DataRef(objContext.props.subject, "subject;cisactive;y;cisdeleted;n;cishighstakesubject;y").Data;
    }
    if (intSubjectId === -1) {
        arrDefaultSubjects.forEach(objTempData => {
            let arrTempSubSubjectsData = arrAllSubjects.filter(objTempDetails => objTempDetails["iParentSubjectId"] === objTempData["iSubjectId"]);
            arrSubSubjects = [...arrSubSubjects, ...arrTempSubSubjectsData];
        });
        arrSubjects = [...arrDefaultSubjects, ...arrSubSubjects];
    }
    else {
        arrSubjects = arrAllSubjects.filter(objTempDetails => objTempDetails["iSubjectId"] === intSubjectId);
    }
    return arrSubjects;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns School Year Id of selected class.
 */
export function GetSchoolYearIdFromSelectedClass(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data;
    let objSelectedClassDetails = arrClassData.filter(objTempData => objTempData["uClassId"] === strClassId)[0];
    let arrSchoolYearData = DataRef(objContext.props.schoolyear, "schoolyear;cisdeleted;n").Data;
    let objSchoolYearDetails = {};
    if (objSelectedClassDetails["iSchoolYear"] != null) {
        objSchoolYearDetails = arrSchoolYearData.filter(objTempData => objTempData["iSchoolYear"] === objSelectedClassDetails["iSchoolYear"])[0];
    } else {
        objSchoolYearDetails = arrSchoolYearData[0];
    }
    return objSchoolYearDetails["iSchoolYearId"];
};

/**
 *
 * @param {*} objContext
 * @summary   Return the test data for the main cycle id and Filters the test data with Selected Subject, its sub-subjects and school year id. Returns an array with the test data for the cycle Id.
 */
export function GetTestData(objContext, intSubjectId = -1) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let arrTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n").Data;
    if (arrTestData.length > 0) {
        let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
        let blnIsOrientationTest = strIsOrientationTest === 'Y';
        let intSchoolYearId = GetSchoolYearIdFromSelectedClass(objContext);
        if (!blnIsOrientationTest) {
            let arrFilteredTestData = [];
            arrTestData.map(objTempData => {
                if (objTempData["t_TestDrive_Cycle_SchoolYear"].filter(objTempTestSchoolYearData => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0) {
                    arrFilteredTestData = [...arrFilteredTestData, objTempData];
                }
            });
           return arrFilteredTestData;
        }
        else {
            let arrSubjects = [];
            if (intSubjectId === -1) {
                intSubjectId = objContext.state.intSelectedSubjectId
            }
            arrSubjects = GetSubjects(objContext, intSubjectId);
            if (arrSubjects.length === 0) {
                arrSubjects = GetAllSubjects(objContext, intSubjectId);
            }
            let arrFilteredTestDataBySubject = [];
            arrSubjects.forEach(objTempSubjectData => {
                let arrTempFilteredTestDatBySubject = arrTestData.filter(objTempTestData => objTempTestData["iSubjectId"] === objTempSubjectData["iSubjectId"]);
                if (arrTempFilteredTestDatBySubject.length > 0) {
                    arrFilteredTestDataBySubject = [...arrFilteredTestDataBySubject, ...arrTempFilteredTestDatBySubject];
                }
            });
           let arrFilteredTestData = [];
            arrFilteredTestDataBySubject.map(objTempData => {
                if (objTempData["t_TestDrive_Cycle_SchoolYear"].filter(objTempTestSchoolYearData => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0) {
                    arrFilteredTestData = [...arrFilteredTestData, objTempData];
                }
            });
            return arrFilteredTestData;
        }
    }
    else {
        return [];
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strTestId 
 * @summary   Returns the test data for the 'CycleIdToValidateTokens' that is given in the query string.
 */
export function GetTokenValidationTestData(objContext,objTest) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strCycleTypeIdForTokenValidation = GetCycleTypeIdToValidateTokens();
    let arrTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strCycleTypeIdForTokenValidation + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n").Data;
    if (arrTestData.length > 0) {
        let intSchoolYearId = GetSchoolYearIdFromSelectedClass(objContext);
        let arrFilteredTestData = [];
        arrTestData.map(objTempData => {
            if (objTempData["t_TestDrive_Cycle_SchoolYear"].filter(objTempTestSchoolYearData => objTempTestSchoolYearData["iSchoolYearId"] === intSchoolYearId).length > 0 && (objTempData["uTestId"] == objTest["uTestId"] || objTempData["uTestId"] == objTest["uParentTestId"])) {
                arrFilteredTestData = [...arrFilteredTestData, objTempData];
            }
        });
        return arrFilteredTestData;
    }
    else {
        return arrTestData;
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the cycle data for the given main cycle.
 */
export function GetCycleData(objContext) {
    let strCycleTypeId = GetCycleTypeId();
    let arrCycle = DataRef(objContext.props.cycle, "cycle;cisactive;y;cisdeleted;n").Data;
    let objCycleData = arrCycle.filter(itm => itm["iCycleTypeId"] === strCycleTypeId)
    return objCycleData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the time to invalidate from client settings and returns it.
 */
export function GetTimeToInvalidate(objContext) {
    let objClientSettings = DataRef(objContext.props.clientsettings, "clientsettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime")["Data"][0];
    let intTimeToInvalidate = parseInt(objClientSettings["vValue"]);
   return intTimeToInvalidate;
};

/**
 *
 * @param {*} objContext
 * @summary   Returns the test logins and result data for the main cycle id.
 */
export function GetTestLoginsAndResultData(objContext, uPupilId = "", iCycleRepetition = "", iSubjectId = "", uTestId = "") {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = GetCycleTypeId();
    let arrTestLoginsAndResultData = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeId + ";uclassid;" + strClassId)["Data"];
    Logger.Log("Test Login And Result Data", arrTestLoginsAndResultData);
    if (arrTestLoginsAndResultData === undefined) {
        arrTestLoginsAndResultData = objContext.state.arrTestLoginsAndResultData;
    }
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    if (blnIsOrientationTest) {
        if (uPupilId === "" && iCycleRepetition === "" && iSubjectId === "" && uTestId === "") {
           return arrTestLoginsAndResultData;
        }
        else {
            let arrFilteredData = [];
            if (uPupilId !== "" && iCycleRepetition !== "" && iSubjectId !== "") {
                arrTestLoginsAndResultData.forEach(objTempTestLoginsAndResultDetails => {
                    if (objTempTestLoginsAndResultDetails["uClassId"] === strClassId && objTempTestLoginsAndResultDetails["uPupilId"] === uPupilId && objTempTestLoginsAndResultDetails["iCycleRepetition"] === iCycleRepetition && objTempTestLoginsAndResultDetails["iSubjectId"] === iSubjectId) {
                        arrFilteredData = [...arrFilteredData, objTempTestLoginsAndResultDetails];
                    }
                });
                return arrFilteredData;
            }
            else if (uPupilId !== "" && iCycleRepetition === "" && iSubjectId === "") {
                arrTestLoginsAndResultData.forEach(objTempTestLoginsAndResultDetails => {
                    if (objTempTestLoginsAndResultDetails["uClassId"] === strClassId && objTempTestLoginsAndResultDetails["uPupilId"] === uPupilId) {
                        arrFilteredData = [...arrFilteredData, objTempTestLoginsAndResultDetails];
                    }
                });
                return arrFilteredData;
            }
            else if (uPupilId === "" && iCycleRepetition !== "" && iSubjectId !== "") {
                arrTestLoginsAndResultData.forEach(objTempTestLoginsAndResultDetails => {
                    if (objTempTestLoginsAndResultDetails["uClassId"] === strClassId && objTempTestLoginsAndResultDetails["iCycleRepetition"] === iCycleRepetition && objTempTestLoginsAndResultDetails["iSubjectId"] === iSubjectId) {
                        arrFilteredData = [...arrFilteredData, objTempTestLoginsAndResultDetails];
                    }
                });
                return arrFilteredData;
            }
            else {
                return arrTestLoginsAndResultData;
            }
        }
    }
    else {
        if (uPupilId === "" && iCycleRepetition === "" && iSubjectId === "" && uTestId === "") {
            return arrTestLoginsAndResultData;
        }
        else {
            let arrFilteredData = [];
            if (uPupilId !== "" && iCycleRepetition !== "" && iSubjectId !== "") {
                arrTestLoginsAndResultData.forEach(objTempTestLoginsAndResultDetails => {
                    if (objTempTestLoginsAndResultDetails["uClassId"] === strClassId && objTempTestLoginsAndResultDetails["uPupilId"] === uPupilId && objTempTestLoginsAndResultDetails["iCycleRepetition"] === iCycleRepetition && objTempTestLoginsAndResultDetails["iSubjectId"] === iSubjectId) {
                        arrFilteredData = [...arrFilteredData, objTempTestLoginsAndResultDetails];
                    }
                });
                return arrFilteredData;
            }
            else if (uPupilId !== "" && iCycleRepetition === "" && iSubjectId === "") {
                arrTestLoginsAndResultData.forEach(objTempTestLoginsAndResultDetails => {
                    if (objTempTestLoginsAndResultDetails["uClassId"] === strClassId && objTempTestLoginsAndResultDetails["uPupilId"] === uPupilId) {
                        arrFilteredData = [...arrFilteredData, objTempTestLoginsAndResultDetails];
                    }
                });
                return arrFilteredData;
            }
            else if (uPupilId === "" && iCycleRepetition !== "" && iSubjectId !== "") {
                arrTestLoginsAndResultData.forEach(objTempTestLoginsAndResultDetails => {
                    if (objTempTestLoginsAndResultDetails["uClassId"] === strClassId && objTempTestLoginsAndResultDetails["iCycleRepetition"] === iCycleRepetition && objTempTestLoginsAndResultDetails["iSubjectId"] === iSubjectId) {
                        arrFilteredData = [...arrFilteredData, objTempTestLoginsAndResultDetails];
                    }
                });
                return arrFilteredData;
            }
            else {
                return arrTestLoginsAndResultData;
            }
        }
    }
};

/**
 *
 * @param {*} objContext
 * @summary   Returns the test logins and result data for the 'CycleIdToValidateTokens'.
 */
export function GetValidationTestLoginsAndResultData(objContext, uPupilId = "", iCycleRepetition = "", iSubjectId = "", uTestId = "") {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeIdForTokenValidation = GetCycleTypeIdToValidateTokens();
    let arrValidationTestLoginsAndResultData = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strCycleTypeIdForTokenValidation + ";uclassid;" + strClassId)["Data"];
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    if (blnIsOrientationTest) {
        if (uPupilId === "" && iCycleRepetition === "" && iSubjectId === "" && uTestId === "") {
           return arrValidationTestLoginsAndResultData;
        }
        else {
            let arrFilteredData = [];
            if (uPupilId !== "" && iCycleRepetition !== "" && iSubjectId !== "") {
                arrValidationTestLoginsAndResultData.forEach(objTempData => {
                    if (objTempData["uClassId"] === strClassId && objTempData["uPupilId"] === uPupilId && objTempData["iCycleRepetition"] === iCycleRepetition && objTempData["iSubjectId"] === iSubjectId) {
                        arrFilteredData = [...arrFilteredData, objTempData];
                    }
                });
                return arrFilteredData;
            }
            else if (uPupilId !== "" && iCycleRepetition === "" && iSubjectId === "") {
                arrValidationTestLoginsAndResultData.forEach(objTempData => {
                    if (objTempData["uClassId"] === strClassId && objTempData["uPupilId"] === uPupilId) {
                        arrFilteredData = [...arrFilteredData, objTempData];
                    }
                });
                return arrFilteredData;
            }
            else if (uPupilId === "" && iCycleRepetition !== "" && iSubjectId !== "") {
                arrValidationTestLoginsAndResultData.forEach(objTempData => {
                    if (objTempData["uClassId"] === strClassId && objTempData["iCycleRepetition"] === iCycleRepetition && objTempData["iSubjectId"] === iSubjectId) {
                        arrFilteredData = [...arrFilteredData, objTempData];
                    }
                });
                return arrFilteredData;
            }
            else {
                return arrValidationTestLoginsAndResultData;
            }
        }
    }
    else {
        if (uPupilId === "" && iCycleRepetition === "" && iSubjectId === "" && uTestId === "") {
            return arrValidationTestLoginsAndResultData;
        }
        else {
            let arrFilteredData = [];
            if (uPupilId !== "" && iCycleRepetition !== "" && iSubjectId !== "") {
                arrValidationTestLoginsAndResultData.forEach(objTempData => {
                    if (objTempData["uClassId"] === strClassId && objTempData["uPupilId"] === uPupilId && objTempData["iCycleRepetition"] === iCycleRepetition && objTempData["iSubjectId"] === iSubjectId) {
                        arrFilteredData = [...arrFilteredData, objTempData];
                    }
                });
                return arrFilteredData;
            }
            else if (uPupilId !== "" && iCycleRepetition === "" && iSubjectId === "") {
                arrValidationTestLoginsAndResultData.forEach(objTempData => {
                    if (objTempData["uClassId"] === strClassId && objTempData["uPupilId"] === uPupilId) {
                        arrFilteredData = [...arrFilteredData, objTempData];
                    }
                });
                return arrFilteredData;
            }
            else if (uPupilId === "" && iCycleRepetition !== "" && iSubjectId !== "") {
                arrValidationTestLoginsAndResultData.forEach(objTempData => {
                    if (objTempData["uClassId"] === strClassId && objTempData["iCycleRepetition"] === iCycleRepetition && objTempData["iSubjectId"] === iSubjectId) {
                        arrFilteredData = [...arrFilteredData, objTempData];
                    }
                });
                return arrFilteredData;
            }
            else {
                return arrValidationTestLoginsAndResultData;
            }
        }
    }
};

/**
 *
 * @param {} objContext
 * @summary  returns an array of classes to load in the drop down
 */
export function GetClassDropDownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/testlogins").Data[0]["TestLogins"];
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
 * @summary   Returns the data for 'pupilsubjectclasstype'.
 */
export function GetPupilSubjectClassType(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrPupilSubejctClassType = DataRef(objContext.props.pupilsubjectclasstype, "pupilsubjectclasstype;uclassid;" + strClassId).Data;
    return arrPupilSubejctClassType;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strValidTillDate 
 * @summary   Compares the the date with time to invalidate.
 */
export function CompareDate(objContext, strValidTillDate) {
    let intTimeToInvalidate = GetTimeToInvalidate(objContext);
    let blnReturn = false;
    var dtValidTill = new Date(strValidTillDate);
    var dtCurrentDate = new Date(objContext.state.strCurrentServerDate);
    if (dtValidTill < dtCurrentDate) {
        blnReturn = false;
    }
    else {
        let intTimeDifference = (dtValidTill.getTime() - dtCurrentDate.getTime()) / 1000;
        intTimeDifference /= 60;
        if (Math.abs(Math.round(intTimeDifference)) <= intTimeToInvalidate) {
            blnReturn = true;
        } else {
            blnReturn = false;
        }
    }
    return blnReturn;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} uPupilId 
 * @param {*} iCycleRepetition 
 * @param {*} iSubjectId 
 * @param {*} uTestId 
 * @param {*} arrTestLoginsAndResultData 
 * @summary   Returns true if TestLoginAndResultData is present for the combination of filters.
 */
export function CheckIfTestExist(objContext, uPupilId, iCycleRepetition, iSubjectId, uTestId, arrTestLoginsAndResultData = []) {
    let blnExistsTest = true;
    if (arrTestLoginsAndResultData.length === 0) {
        arrTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, uPupilId, iCycleRepetition, iSubjectId, uTestId);
    }
    if (arrTestLoginsAndResultData.length === 0) {
        blnExistsTest = false;
    }
    return blnExistsTest;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} uPupilId 
 * @param {*} iCycleRepetition 
 * @param {*} iSubjectId 
 * @param {*} uTestId 
 * @param {*} arrTestLoginsAndResultData 
 * @summary   Returns true if test is valid(is still active).
 */
export function CheckIfTestIsValid(objContext, uPupilId, iCycleRepetition, iSubjectId, uTestId, arrTestLoginsAndResultData = []) {
    if (arrTestLoginsAndResultData.length === 0) {
        arrTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, uPupilId, iCycleRepetition, iSubjectId, uTestId);
    }
    let objTestLoginsAndResultData = arrTestLoginsAndResultData[0];
    let blnResult = CompareDate(objContext, objTestLoginsAndResultData["dtValidTill"]);
    return blnResult;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} uPupilId 
 * @param {*} iCycleRepetition 
 * @param {*} iSubjectId 
 * @param {*} uTestId 
 * @param {*} arrTestLoginsAndResultData 
 * @summary   Returns true if the test is started i.e TestLoginAndResultData has an object for the applied filters and has 'TestExecution' array of length greater than 0.
 */
export function CheckIfTestStarted(objContext, uPupilId, iCycleRepetition, iSubjectId, uTestId, arrTestLoginsAndResultData = []) {
    if (arrTestLoginsAndResultData.length === 0) {
        arrTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, uPupilId, iCycleRepetition, iSubjectId, uTestId);
    }
    let objTestLoginsAndResultData = arrTestLoginsAndResultData[0];
    let blnResult = objTestLoginsAndResultData["TestExecution"].length > 0 ? true : false;
    return blnResult;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} uPupilId 
 * @param {*} iCycleRepetition 
 * @param {*} iSubjectId 
 * @param {*} uTestId 
 * @param {*} arrTestLoginsAndResultData 
 * @summary   Returns true if the test is finished i.e TestLoginAndResultData has an object for the applied filters and has 'TestExecution' array which contains iTestStatusId === 5.
 */
export function CheckIfTestFinished(objContext, uPupilId, iCycleRepetition, iSubjectId, uTestId, arrTestLoginsAndResultData = []) {
    if (arrTestLoginsAndResultData.length === 0) {
        arrTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, uPupilId, iCycleRepetition, iSubjectId, uTestId);
    }
    let objTestLoginsAndResultData = arrTestLoginsAndResultData[0];
    let blnResult = objTestLoginsAndResultData["TestExecution"][0]["iTestStatusId"] === 5 ? true : false;
    return blnResult;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} iCycleRepetition 
 * @param {*} iSubjectId 
 * @summary   Returns true if all the test are finished for the passed repetition.
 */
export function CheckIfAllTestFinishedForRepetition(objContext, iCycleRepetition, iSubjectId) {
    let arrResult = [];
    let strTestId = "";
    objContext.state.arrPupil.forEach(objTempPupilData => {
        let blnResult;
        let arrTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId);
        let blnTestExists = CheckIfTestExist(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId, strTestId, arrTestLoginsAndResultData);
        if (blnTestExists) {
            let blnTestStarted = CheckIfTestStarted(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId, strTestId, arrTestLoginsAndResultData);
            if (blnTestStarted) {
                let blnTestFinished = CheckIfTestFinished(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId, strTestId, arrTestLoginsAndResultData);
                if (blnTestFinished) {
                    blnResult = true
                }
                else {
                    blnResult = false;
                }
            }
            else {
                blnResult = false;
            }
        }
        else {
            blnResult = false
        }
        arrResult = [...arrResult, blnResult];
    });
    if (arrResult.filter(blnTempData => blnTempData === false).length > 0) {
        return false;
    }
    else {
        return true;
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} iCycleRepetition 
 * @param {*} iSubjectId 
 * @summary   Returns true if All test logins are created for the passed repetition.
 */
export function CheckIfAllTestLoginsCreatedForRepetition(objContext, iCycleRepetition, iSubjectId) {
    let arrResult = [];
    let strTestId = "";
    objContext.state.arrPupil.forEach(objTempPupilData => {
        let blnResult;
        let arrTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId);
        let blnTestExists = CheckIfTestExist(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId, strTestId, arrTestLoginsAndResultData);
        if (blnTestExists) {
            let blnTestValid = CheckIfTestIsValid(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId, strTestId, arrTestLoginsAndResultData);
            let blnTestStarted = CheckIfTestStarted(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId, strTestId, arrTestLoginsAndResultData);
            if (blnTestStarted) {
                let blnTestFinished = CheckIfTestFinished(objContext, objTempPupilData["uPupilId"], iCycleRepetition, iSubjectId, strTestId, arrTestLoginsAndResultData);
                if (blnTestFinished) {
                    blnResult = true
                }
                else {
                    if (blnTestValid) {
                        blnResult = true;
                    }
                    else {
                        blnResult = false;
                    }
                }
            }
            else {
                if (blnTestValid) {
                    blnResult = true;
                }
                else {
                    blnResult = false;
                }
            }
        }
        else {
            blnResult = false
        }
        arrResult = [...arrResult, blnResult];
    });
    if (arrResult.length === 0 || arrResult.filter(blnTempData => blnTempData === false).length > 0) {
        return false;
    }
    else {
        return true;
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} uPupilId 
 * @param {*} iSubjectId 
 * @param {*} iCycleRepetition 
 * @summary   Returns a json with details of test if any active test is present for the given combination of filters.
 */
export function CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId, iSubjectId, iCycleRepetition) {
    let arrMainTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, uPupilId);
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    let arrMainActiveTestLoginsAndResultData = [];
    arrMainTestLoginsAndResultData.forEach(objTempData => {
        if (objTempData["TestExecution"].length > 0 && objTempData["TestExecution"][0]["iTestStatusId"] !== 5) {
            if (CompareDate(objContext, objTempData["dtValidTill"]) === true) {
                arrMainActiveTestLoginsAndResultData = [...arrMainActiveTestLoginsAndResultData, objTempData];
            }
        }
        else if (CompareDate(objContext, objTempData["dtValidTill"]) === true) {
            arrMainActiveTestLoginsAndResultData = [...arrMainActiveTestLoginsAndResultData, objTempData];
        }
    });
    if (arrMainActiveTestLoginsAndResultData.length > 0) {
        if ((arrMainActiveTestLoginsAndResultData[0]["iSubjectId"] !== iSubjectId) || (arrMainActiveTestLoginsAndResultData[0]["iSubjectId"] === iSubjectId && arrMainActiveTestLoginsAndResultData[0]["iCycleRepetition"] !== iCycleRepetition)) {
            return {
                "blnIsActiveTestAlreadyPresentForPupil": true,
                "objActiveTestLoginsAndResultDetails": arrMainActiveTestLoginsAndResultData[0],
                "TestType": blnIsOrientationTest ? "Orientation" : "HighStake"
            };
        }
        else {
            return {
                "blnIsActiveTestAlreadyPresentForPupil": false,
                "objActiveTestLoginsAndResultDetails": null
            };
        }
    }
    else {
        let arrValidationTestLoginsAndResultData = GetValidationTestLoginsAndResultData(objContext, uPupilId);
        let arrValidationTestActiveTestLoginsAndResultData = arrValidationTestLoginsAndResultData.filter(objTempData => CompareDate(objContext, objTempData["dtValidTill"]) === true);
        if (arrValidationTestActiveTestLoginsAndResultData.length > 0) {
            return {
                "blnIsActiveTestAlreadyPresentForPupil": true,
                "objActiveTestLoginsAndResultDetails": arrValidationTestActiveTestLoginsAndResultData[0],
                "TestType": blnIsOrientationTest ? "HighStake" : "Orientation"
            };
        }
        else {
            return {
                "blnIsActiveTestAlreadyPresentForPupil": false,
                "objActiveTestLoginsAndResultDetails": null
            };
        }
    }
};

/**
 *
 * @param {*} objContext
 * @param {*} objItem
 * @summary   Triggers when the class dropdown selection changes
 */
export function OnChangeClassDropDown(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnIsClassSelectionChanged": !objContext.state.blnIsClassSelectionChanged } });
};

/**
 *
 * @param {*} objContext
 * @param {*} objItem
 * @summary   Triggers when the Subject dropdown selection changes
 */
export function OnChangeSubjectDropDown(objContext, objItem) {
    let arrTestData = GetTestData(objContext, objItem["iSubjectId"]);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubjectId": objItem["iSubjectId"], "arrTestData": arrTestData } });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objOrientationTestLoginAndResultDataToBeEdited 
 * @param {*} objHighStakeTestLoginAndResultDataToBeEdited 
 * @summary   Forms the data to be edited and makes an api call.
 */
function EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited = {}, objHighStakeTestLoginAndResultDataToBeEdited = {}) {
    ApplicationState.SetProperty("blnShowAnimation", true);
    Logger.Log("Edit Data Object", { "OrientationTest": objOrientationTestLoginAndResultDataToBeEdited, "HighStakeTest": objHighStakeTestLoginAndResultDataToBeEdited })
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strOrientationCycleTypeId = GetCycleTypeId();
    let strHighStakeCycleTypeId = GetCycleTypeIdToValidateTokens();
    if (objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"].length > 0 || objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"].length > 0) {
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": strOrientationCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    }
                ]
            },
            "objTestLoginAndResultDataToBeEdited": objOrientationTestLoginAndResultDataToBeEdited
        };
        let arrParams = [
            {
                "URL": "API/Object/TestApplication/TestLoginAndResult",
                "Params": objParams,
                "MethodType": "Put"
            }
        ];
        ApplicationState.SetProperty("blnShowAnimation", true);
        DataCall(objContext, arrParams);
    }
    if (objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"].length > 0 || objHighStakeTestLoginAndResultDataToBeEdited["DataToDeactivate"].length > 0) {
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": strHighStakeCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    }
                ]
            },
            "objTestLoginAndResultDataToBeEdited": objHighStakeTestLoginAndResultDataToBeEdited
        };
        let arrParams = [
            {
                "URL": "API/Object/TestApplication/TestLoginAndResult",
                "Params": objParams,
                "MethodType": "Put"
            }
        ];
        ApplicationState.SetProperty("blnShowAnimation", true);
        DataCall(objContext, arrParams);
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} uPupilId 
 * @param {*} iSubjectId 
 * @summary   Returns true if PupilSubjectClassType data is present for given pupil id and subject id. Only for Hishshtake Test login.
 */
function CheckIfPupilSubjectClassTypeIsPresentForPupil(objContext, uPupilId, iSubjectId) {
    let arrPupilSubejctClassType = GetPupilSubjectClassType(objContext);
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrFilteredData = arrPupilSubejctClassType.filter(objTempData => objTempData["uPupilId"] === uPupilId && objTempData["iSubjectId"] === iSubjectId && objTempData["uClassId"] === strClassId);
    if (arrFilteredData.length > 0) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrPupilAndTestId 
 * @param {*} iSubjectId 
 * @param {*} objOrientationTestLoginAndResultDataToBeEdited 
 * @param {*} objHighStakeTestLoginAndResultDataToBeEdited 
 * @param {*} ClosePopupAfterAllProcessHaveBeenDone //close activation pop up. This function is only sent from activatioin pop up. If this pop up is called if in activation pop up proceed is clicked.
 * @summary   Forms the data to be passed to the pop up. Opens AssignClassTyoePopup. Only for Highstake Test Logins.
 */
function ShowAssignClassTypePopUp(objContext, arrPupilAndTestId, iSubjectId, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, ClosePopupAfterAllProcessHaveBeenDone) {
    let arrPupilAndTestData = [];
    let arrTestData = GetTestData(objContext);
    arrPupilAndTestId.map(objTempData => {
        let objPupilDetails = objContext.state.arrPupil.filter(objTempPupilDetails => objTempPupilDetails["uPupilId"] === objTempData["uPupilId"])[0];
        let objTestDetails = arrTestData.filter(objTempTestDetails => objTempTestDetails["uTestId"] === objTempData["uTestId"])[0];
        arrPupilAndTestData = [...arrPupilAndTestData, { "Pupil": objPupilDetails, "Test": objTestDetails }];
    });

    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/testlogins").Data[0]["TestLogins"];
    ApplicationState.SetProperty("blnShowAnimation", true);
    objContext.props.showPopup({
        MaxHeight: "98%",
        MaxWidth: "98%",
        popUpMinHeight: "98%",
        popUpMinWidth: "98%",
        showHeader: false,
        popUpName: "TestLoginsAssignClassType",
        passedEvents: {
            OnClickSaveButton: (blnReturn) => {
                if (blnReturn) {
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                }
                if (ClosePopupAfterAllProcessHaveBeenDone) {
                    ClosePopupAfterAllProcessHaveBeenDone();
                }
            },
            OnCloseCloseActivationPopup: () => {
                if (ClosePopupAfterAllProcessHaveBeenDone) {
                    ClosePopupAfterAllProcessHaveBeenDone();
                }
            }
        },
        headerTitle: "",
        Data: {
            SubjectId: iSubjectId,
            PupilAndTestData: arrPupilAndTestData,
            TextResource: objTextResource,
            ClientUserDetails: objContext.props.ClientUserDetails
        }
    });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrConflictingData 
 * @param {*} objOrientationTestLoginAndResultDataToBeEdited 
 * @param {*} objHighStakeTestLoginAndResultDataToBeEdited 
 * @param {*} iSubjectId 
 * @summary   Forms the data to be sent to be sent to the pop up. Open ActivateAllTest popup. This is shown only when 'CheckIfActiveTestAlreadyPresentForPupil' returns true.
 */
function ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, iSubjectId) {
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/testlogins").Data[0]["TestLogins"];
    objContext.props.showPopup({
        MaxHeight: "380px",
        MaxWidth: "759px",
        popUpMinHeight: "380px",
        popUpMinWidth: "759px",
        showHeader: false,
        popUpName: "ActivateAllTests", //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {
            OnClickProceedButton: (ClosePopupAfterAllProcessHaveBeenDone) => {
                if (!blnIsOrientationTest) {
                    let arrPupilToAssignClassType = [];
                    objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"].map(objTempData => {
                        let blnIsClassTypeIsPresentForPupil = CheckIfPupilSubjectClassTypeIsPresentForPupil(objContext, objTempData["arrPupilId"][0], iSubjectId);
                        if (!blnIsClassTypeIsPresentForPupil) {
                            arrPupilToAssignClassType = [...arrPupilToAssignClassType, { "uPupilId": objTempData["arrPupilId"][0], "uTestId": objTempData["uTestId"] }];
                        }
                    });
                    if (arrPupilToAssignClassType.length > 0) {
                        ShowAssignClassTypePopUp(objContext, arrPupilToAssignClassType, iSubjectId, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, ClosePopupAfterAllProcessHaveBeenDone);
                    }
                    else {
                        ApplicationState.SetProperty("blnShowAnimation", true);
                        EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                        if (ClosePopupAfterAllProcessHaveBeenDone) {
                            ClosePopupAfterAllProcessHaveBeenDone()
                        }
                    }
                }
                else {
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
                    if (ClosePopupAfterAllProcessHaveBeenDone) {
                        ClosePopupAfterAllProcessHaveBeenDone()
                    }
                }
            }
        },
        headerTitle: "",
        Data: {
            ConflictingData: arrConflictingData,
            TextResource: objTextResource
        }
    });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} blnIsSelectAll 
 * @param {*} objTestDetails 
 * @param {*} objPupilDetails 
 * @param {*} intCycleRepetition 
 * @param {*} blnIsChecked 
 * @summary   This is called when the orientation module is using the business logic, as this module is common for HighstakeTestLogins and OrientationTestLogins.
 *  This function checks if the pop up needs to be opened or not and if yes then which pop up should be opened. 'CheckIfActiveTestAlreadyPresentForPupil' is called inside, if true is returned then the data is categorised into two objects: 
 * if the data present is in orientation test.
 * 1)objOrientationTestLoginAndResultDataToBeEdited[DataToActivate]
 * 2)objOrientationTestLoginAndResultDataToBeEdited[DataToDeactivate]
 * else
 * 1)objOrientationTestLoginAndResultDataToBeEdited[DataToActivate]
 * 2)objHighStakeTestLoginAndResultDataToBeEdited[DataToDeactivate]
 * Activation pop up is show.
 * If the return from 'CheckIfActiveTestAlreadyPresentForPupil' is false then activaton pop up is not shown.
 */
function OrientationTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked) {
    let iSubjectId = objTestDetails["iSubjectId"];
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let arrCycle = DataRef(objContext.props.cycle, "cycle;cisactive;y;cisdeleted;n").Data;
    let objCycle = arrCycle.filter(x => x["iCycleTypeId"] === "1");
    let strOrientationCycleId = objCycle["uCycleId"];
    let objHighStakeCycle = arrCycle.filter(x => x["iCycleTypeId"] === "6")
    let strHighStakeCycleId = objHighStakeCycle["uCycleId"];
    let objOrientationTestLoginAndResultDataToBeEdited = { "DataToActivate": [], "DataToDeactivate": [] };
    let objHighStakeTestLoginAndResultDataToBeEdited = { "DataToActivate": [], "DataToDeactivate": [] };
    if (!blnIsSelectAll) {
        let uPupilId = objPupilDetails["uPupilId"];
        let objResult = CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId, iSubjectId, intCycleRepetition);
       if (objResult["blnIsActiveTestAlreadyPresentForPupil"]) {
            //Main Data
            if (objResult["TestType"] === "Orientation") {
                objOrientationTestLoginAndResultDataToBeEdited = {
                    ...objOrientationTestLoginAndResultDataToBeEdited,
                    ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objTestDetails["uTestId"],
                        "uCycleId": strOrientationCycleId,
                        "uClassId": strClassId,
                        "iCycleRepetition": intCycleRepetition,
                        "iStateId": iStateId,
                        "strOperationType": "ACTIVATE"
                    }
                    ],
                    ["DataToDeactivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                        "uCycleId": strOrientationCycleId,
                        "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                        "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                        "iStateId": iStateId,
                        "strOperationType": "DEACTIVATE"
                    }
                    ]
                };
            }
            else {
                objOrientationTestLoginAndResultDataToBeEdited = {
                    ...objOrientationTestLoginAndResultDataToBeEdited,
                    ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objTestDetails["uTestId"],
                        "uCycleId": strOrientationCycleId,
                        "uClassId": strClassId,
                        "iCycleRepetition": intCycleRepetition,
                        "iStateId": iStateId,
                        "strOperationType": "ACTIVATE"
                    }
                    ]
                };
                objHighStakeTestLoginAndResultDataToBeEdited = {
                    ...objHighStakeTestLoginAndResultDataToBeEdited,
                    ["DataToDeactivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                        "uCycleId": strHighStakeCycleId,
                        "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                        "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                        "iStateId": iStateId,
                        "strOperationType": "DEACTIVATE"
                    }
                    ]
                };
            }
            //Pop up data
            let strParentSubjectName = "", strSubSubjectName = "";
            let arrTestData = [];
            if (objResult["TestType"] === "Orientation") {
                let arrSubjects = GetAllSubjects(objContext);
                let objParentSubjectDetails = {};
                let objSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"])[0];
                if (objSubjectDetails["iParentSubjectId"] !== 0) {
                    objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objSubjectDetails["iParentSubjectId"])[0];
                    strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                    strSubSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];;
                }
                else {
                    strParentSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                }
                arrTestData = GetTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"]);
            }
            else {
                let arrSubjects = GetAllSubjects(objContext);
                let objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"])[0];
                strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                arrTestData = GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
            }
            let objConflictingTestDetails = arrTestData.filter(objTempTestData => objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uTestId"])[0];
            let strTestName = objConflictingTestDetails["vTestName"];
            let arrConflictingData = [
                {
                    "PupilName": objPupilDetails["vFirstName"] + objPupilDetails["vName"],
                    "TestName": strTestName,
                    "ParentSubjectName": strParentSubjectName,
                    "SubSubjectName": strSubSubjectName,
                    "TestType": objResult["TestType"],
                }
            ];
            ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
        }
        else {
            let arrTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, uPupilId, intCycleRepetition, iSubjectId);
            if (!blnIsChecked) {
                if (arrTestLoginsAndResultData.length > 0) {
                    objOrientationTestLoginAndResultDataToBeEdited = {
                        ...objOrientationTestLoginAndResultDataToBeEdited,
                        ["DataToDeactivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                        {
                            "arrPupilId": [uPupilId],
                            "uTestId": objTestDetails["uTestId"],
                            "uCycleId": strOrientationCycleId,
                            "uClassId": strClassId,
                            "iCycleRepetition": intCycleRepetition,
                            "iStateId": iStateId,
                            "strOperationType": "DEACTIVATE"
                        }
                        ]
                    };
                }
            }
            else {
                objOrientationTestLoginAndResultDataToBeEdited = {
                    ...objOrientationTestLoginAndResultDataToBeEdited,
                    ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objTestDetails["uTestId"],
                        "uCycleId": strOrientationCycleId,
                        "uClassId": strClassId,
                        "iCycleRepetition": intCycleRepetition,
                        "iStateId": iStateId,
                        "strOperationType": "ACTIVATE"
                    }
                    ]
                };
            }
            ApplicationState.SetProperty("blnShowAnimation", true);
            EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
        }
    }
    else {
        let arrConflictingData = [];
        let arrSubjects = GetAllSubjects(objContext);
        let blnIsAlreadySelectAll = true;
        objContext.state.arrPupil.forEach(objTempData => {
            let uPupilId = objTempData["uPupilId"];
            let arrTestLoginsAndResultDataForCurrentPupil = GetTestLoginsAndResultData(objContext, uPupilId, intCycleRepetition, iSubjectId, objTestDetails["uTestId"]);
            if (arrTestLoginsAndResultDataForCurrentPupil.length > 0) {
                let objTestLoginsAndResultDataForCurrentPupil = arrTestLoginsAndResultDataForCurrentPupil[0];
                if (CompareDate(objContext, objTestLoginsAndResultDataForCurrentPupil["dtValidTill"]) === false) {
                    blnIsAlreadySelectAll = false;
                }
            }
            else {
                blnIsAlreadySelectAll = false;
            }
        });
        if (!blnIsAlreadySelectAll) {
            objContext.state.arrPupil.forEach(objTempData => {
                let uPupilId = objTempData["uPupilId"];
                let arrTestLoginsAndResultDataForCurrentPupil = GetTestLoginsAndResultData(objContext, uPupilId, intCycleRepetition, iSubjectId, objTestDetails["uTestId"]);
                let objTestLoginsAndResultDataForCurrentPupil = arrTestLoginsAndResultDataForCurrentPupil[0];
                if (arrTestLoginsAndResultDataForCurrentPupil.length === 0 || CompareDate(objContext, objTestLoginsAndResultDataForCurrentPupil["dtValidTill"]) === false) {
                    let objResult = CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId, iSubjectId, intCycleRepetition);
                    if (objResult["blnIsActiveTestAlreadyPresentForPupil"]) {
                        if (objResult["TestType"] === "Orientation") {
                            objOrientationTestLoginAndResultDataToBeEdited = {
                                ...objOrientationTestLoginAndResultDataToBeEdited,
                                ["DataToDeactivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                                {
                                    "arrPupilId": [uPupilId],
                                    "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                                    "uCycleId": strOrientationCycleId,
                                    "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                                    "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                                    "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                                    "strOperationType": "DEACTIVATE"
                                }
                                ]
                            };
                        }
                        else {
                            objHighStakeTestLoginAndResultDataToBeEdited = {
                                ...objHighStakeTestLoginAndResultDataToBeEdited,
                                ["DataToDeactivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                                {
                                    "arrPupilId": [uPupilId],
                                    "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                                    "uCycleId": strHighStakeCycleId,
                                    "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                                    "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                                    "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                                    "strOperationType": "DEACTIVATE"
                                }
                                ]
                            };
                        }

                        let strParentSubjectName = "", strSubSubjectName = "";
                        let arrTestData = [];
                        if (objResult["TestType"] === "Orientation") {
                            let arrSubjects = GetAllSubjects(objContext);
                            let objParentSubjectDetails = {};
                            let objSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"])[0];
                            if (objSubjectDetails["iParentSubjectId"] !== 0) {
                                objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objSubjectDetails["iParentSubjectId"])[0];
                                strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                                strSubSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];;
                            }
                            else {
                                strParentSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                            }
                            arrTestData = GetTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"]);
                        }
                        else {
                            let arrSubjects = GetAllSubjects(objContext);
                            let objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"])[0];
                            strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                            arrTestData = GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
                        }
                        let objConflictingTestDetails = arrTestData.filter(objTempTestData => objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uTestId"])[0];
                        let strTestName = objConflictingTestDetails["vTestName"];
                        arrConflictingData = [...arrConflictingData,
                        {
                            "PupilName": objTempData["vFirstName"] + objTempData["vName"],
                            "TestName": strTestName,
                            "SubSubjectName": strSubSubjectName,
                            "ParentSubjectName": strParentSubjectName,
                            "TestType": objResult["TestType"]
                        }
                        ];
                    }
                    if (arrTestLoginsAndResultDataForCurrentPupil.length > 0 && CompareDate(objContext, arrTestLoginsAndResultDataForCurrentPupil[0]["dtValidTill"]) === false) {
                        if (arrTestLoginsAndResultDataForCurrentPupil[0]["TestExecution"].length > 0 ? arrTestLoginsAndResultDataForCurrentPupil[0]["TestExecution"][0]["iTestStatusId"] !== 5 ? true : false : true) {
                            objOrientationTestLoginAndResultDataToBeEdited = {
                                ...objOrientationTestLoginAndResultDataToBeEdited,
                                ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                                {
                                    "arrPupilId": [uPupilId],
                                    "uTestId": objTestDetails["uTestId"],
                                    "uCycleId": strOrientationCycleId,
                                    "uClassId": strClassId,
                                    "iCycleRepetition": intCycleRepetition,
                                    "iStateId": iStateId,
                                    "strOperationType": "ACTIVATE"
                                }
                                ]
                            };
                        }
                    }
                    else {
                        objOrientationTestLoginAndResultDataToBeEdited = {
                            ...objOrientationTestLoginAndResultDataToBeEdited,
                            ["DataToActivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToActivate"],
                            {
                                "arrPupilId": [uPupilId],
                                "uTestId": objTestDetails["uTestId"],
                                "uCycleId": strOrientationCycleId,
                                "uClassId": strClassId,
                                "iCycleRepetition": intCycleRepetition,
                                "iStateId": iStateId,
                                "strOperationType": "ACTIVATE"
                            }
                            ]
                        };
                    }
                }
            });
        }
        else {
            objContext.state.arrPupil.forEach(objTempData => {
                let uPupilId = objTempData["uPupilId"];
                let arrTestLoginsAndResultPupilData = GetTestLoginsAndResultData(objContext, uPupilId, intCycleRepetition, iSubjectId);
                if (arrTestLoginsAndResultPupilData.length > 0 && CompareDate(objContext, arrTestLoginsAndResultPupilData[0]["dtValidTill"]) === true) {
                    if (arrTestLoginsAndResultPupilData[0]["TestExecution"].length > 0 ? arrTestLoginsAndResultPupilData[0]["TestExecution"][0]["iTestStatusId"] !== 5 ? true : false : true) {
                        objOrientationTestLoginAndResultDataToBeEdited = {
                            ...objOrientationTestLoginAndResultDataToBeEdited,
                            ["DataToDeactivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                            {
                                "arrPupilId": [uPupilId],
                                "uTestId": objTestDetails["uTestId"],
                                "uCycleId": strOrientationCycleId,
                                "uClassId": strClassId,
                                "iCycleRepetition": intCycleRepetition,
                                "iStateId": iStateId,
                                "strOperationType": "DEACTIVATE"
                            }
                            ]
                        };
                    }
                }
            });
        }
        if (arrConflictingData.length > 0) {
            ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
        }
        else {
            ApplicationState.SetProperty("blnShowAnimation", true);
            EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
        }
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} blnIsSelectAll 
 * @param {*} objTestDetails 
 * @param {*} objPupilDetails 
 * @param {*} intCycleRepetition 
 * @param {*} blnIsChecked 
 * @summary   This is called when the highstake module is using the business logic, as this module is common for HighstakeTestLogins and OrientationTestLogins.
 *  This function checks if the pop up needs to be opened or not and if yes then which pop up should be opened. 'CheckIfActiveTestAlreadyPresentForPupil' is called inside, if true is returned then the data is categorised into two objects: 
 * if the data present is in highstake test.
 * 1)objHighStakeTestLoginAndResultDataToBeEdited[DataToActivate]
 * 2)objHighStakeTestLoginAndResultDataToBeEdited[DataToDeactivate]
 * else
 * 1)objHighStakeTestLoginAndResultDataToBeEdited[DataToActivate]
 * 2)objOrientationTestLoginAndResultDataToBeEdited[DataToDeactivate]
 * Activation pop up is show.
 * If the return from 'CheckIfActiveTestAlreadyPresentForPupil' is false then activaton pop up is not shown.
 */
function HisghStakeTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked) {
    let iSubjectId = objTestDetails["iSubjectId"];
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let arrCycle = DataRef(objContext.props.cycle, "cycle;cisactive;y;cisdeleted;n").Data;
    let objCycle = arrCycle.filter(x => x["iCycleTypeId"] === "1");
    let strOrientationCycleId = objCycle["uCycleId"];
    let objHighStakeCycle = arrCycle.filter(x => x["iCycleTypeId"] === "6")
    let strHighStakeCycleId = objHighStakeCycle["uCycleId"];
    let objOrientationTestLoginAndResultDataToBeEdited = { "DataToActivate": [], "DataToDeactivate": [] };
    let objHighStakeTestLoginAndResultDataToBeEdited = { "DataToActivate": [], "DataToDeactivate": [] };
    if (!blnIsSelectAll) {
        let uPupilId = objPupilDetails["uPupilId"];
        let objResult = CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId, iSubjectId, intCycleRepetition);
        if (objResult["blnIsActiveTestAlreadyPresentForPupil"]) {
            if (objResult["TestType"] === "Orientation") {
                objHighStakeTestLoginAndResultDataToBeEdited = {
                    ...objHighStakeTestLoginAndResultDataToBeEdited,
                    ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objTestDetails["uTestId"],
                        "uCycleId": strHighStakeCycleId,
                        "uClassId": strClassId,
                        "iCycleRepetition": intCycleRepetition,
                        "iStateId": iStateId,
                        "strOperationType": "ACTIVATE"
                    }
                    ]
                };
                objOrientationTestLoginAndResultDataToBeEdited = {
                    ...objOrientationTestLoginAndResultDataToBeEdited,
                    ["DataToDeactivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                        "uCycleId": objResult["TestType"] === "Orientation" ? strOrientationCycleId : strHighStakeCycleId,
                        "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                        "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                        "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                        "strOperationType": "DEACTIVATE"
                    }
                    ]
                };
            }
            else {
                objHighStakeTestLoginAndResultDataToBeEdited = {
                    ...objHighStakeTestLoginAndResultDataToBeEdited,
                    ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objTestDetails["uTestId"],
                        "uCycleId": strHighStakeCycleId,
                        "uClassId": strClassId,
                        "iCycleRepetition": intCycleRepetition,
                        "iStateId": iStateId,
                        "strOperationType": "ACTIVATE"
                    }
                    ],
                    ["DataToDeactivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                        "uCycleId": strHighStakeCycleId,
                        "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                        "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                        "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                        "strOperationType": "DEACTIVATE"
                    }
                    ]
                };
            }
            //Pop up data
            let strParentSubjectName = "", strSubSubjectName = "";
            let arrTestData = [];
            if (objResult["TestType"] === "Orientation") {
                let arrSubjects = GetAllSubjects(objContext);
                let objParentSubjectDetails = {};
                let objSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"])[0];
                if (objSubjectDetails["iParentSubjectId"] !== 0) {
                    objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objSubjectDetails["iParentSubjectId"])[0];
                    strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                    strSubSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];;
                }
                else {
                    strParentSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                }
                arrTestData = GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
            }
            else {
                let arrSubjects = GetAllSubjects(objContext);
                let objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"])[0];
                strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                arrTestData = GetTestData(objContext);
            }
            let objConflictingTestDetails = arrTestData.filter(objTempTestData => objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uTestId"])[0];
            let strTestName = objConflictingTestDetails["vTestName"];
            let arrConflictingData = [
                {
                    "PupilName": objPupilDetails["vFirstName"] + objPupilDetails["vName"],
                    "TestName": strTestName,
                    "ParentSubjectName": strParentSubjectName,
                    "SubSubjectName": strSubSubjectName,
                    "TestType": objResult["TestType"],
                }
            ];
            ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, iSubjectId);
        }
        else {
            let arrTestLoginsAndResultData = GetTestLoginsAndResultData(objContext, uPupilId, intCycleRepetition, iSubjectId);
            if (!blnIsChecked) {
                if (arrTestLoginsAndResultData.length > 0) {
                    objHighStakeTestLoginAndResultDataToBeEdited = {
                        ...objHighStakeTestLoginAndResultDataToBeEdited,
                        ["DataToDeactivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                        {
                            "arrPupilId": [uPupilId],
                            "uTestId": objTestDetails["uTestId"],
                            "uCycleId": strHighStakeCycleId,
                            "uClassId": strClassId,
                            "iCycleRepetition": intCycleRepetition,
                            "iStateId": iStateId,
                            "strOperationType": "DEACTIVATE"
                        }
                        ]
                    };
                }
            }
            else {
                objHighStakeTestLoginAndResultDataToBeEdited = {
                    ...objHighStakeTestLoginAndResultDataToBeEdited,
                    ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                    {
                        "arrPupilId": [uPupilId],
                        "uTestId": objTestDetails["uTestId"],
                        "uCycleId": strHighStakeCycleId,
                        "uClassId": strClassId,
                        "iCycleRepetition": intCycleRepetition,
                        "iStateId": iStateId,
                        "strOperationType": "ACTIVATE"
                    }
                    ]
                };
            }
            if (CheckIfPupilSubjectClassTypeIsPresentForPupil(objContext, uPupilId, iSubjectId)) {
                ApplicationState.SetProperty("blnShowAnimation", true);
                EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
            else {
                ShowAssignClassTypePopUp(objContext, [{ "uPupilId": uPupilId, "uTestId": objTestDetails["uTestId"] }], iSubjectId, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
        }
    }
    else {
        let arrConflictingData = [];
        let arrSubjects = GetAllSubjects(objContext);
        let blnIsAlreadySelectAll = true;
        objContext.state.arrPupil.forEach(objTempData => {
            let uPupilId = objTempData["uPupilId"];
            let arrTestLoginsAndResultDataForCurrentPupil = GetTestLoginsAndResultData(objContext, uPupilId, intCycleRepetition, iSubjectId, objTestDetails["uTestId"]);
            if (arrTestLoginsAndResultDataForCurrentPupil.length > 0) {
                let objTestLoginsAndResultDataForCurrentPupil = arrTestLoginsAndResultDataForCurrentPupil[0];
                if (CompareDate(objContext, objTestLoginsAndResultDataForCurrentPupil["dtValidTill"]) === false) {
                    blnIsAlreadySelectAll = false;
                }
            }
            else {
                blnIsAlreadySelectAll = false;
            }
        });
        if (!blnIsAlreadySelectAll) {
            objContext.state.arrPupil.forEach(objTempData => {
                let uPupilId = objTempData["uPupilId"];
                let arrTestLoginsAndResultDataForCurrentPupil = GetTestLoginsAndResultData(objContext, uPupilId, intCycleRepetition, iSubjectId, objTestDetails["uTestId"]);
                let objTestLoginsAndResultDataForCurrentPupil = arrTestLoginsAndResultDataForCurrentPupil[0];
                if (arrTestLoginsAndResultDataForCurrentPupil.length === 0 || CompareDate(objContext, objTestLoginsAndResultDataForCurrentPupil["dtValidTill"]) === false) {
                    let objResult = CheckIfActiveTestAlreadyPresentForPupil(objContext, uPupilId, iSubjectId, intCycleRepetition);
                    if (objResult["blnIsActiveTestAlreadyPresentForPupil"]) {
                        if (objResult["TestType"] === "Orientation") {
                            objOrientationTestLoginAndResultDataToBeEdited = {
                                ...objOrientationTestLoginAndResultDataToBeEdited,
                                ["DataToDeactivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                                {
                                    "arrPupilId": [uPupilId],
                                    "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                                    "uCycleId": strOrientationCycleId,
                                    "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                                    "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                                    "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                                    "strOperationType": "DEACTIVATE"
                                }
                                ]
                            };
                        }
                        else {
                            objHighStakeTestLoginAndResultDataToBeEdited = {
                                ...objHighStakeTestLoginAndResultDataToBeEdited,
                                ["DataToDeactivate"]: [...objOrientationTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                                {
                                    "arrPupilId": [uPupilId],
                                    "uTestId": objResult["objActiveTestLoginsAndResultDetails"]["uTestId"],
                                    "uCycleId": strHighStakeCycleId,
                                    "uClassId": objResult["objActiveTestLoginsAndResultDetails"]["uClassId"],
                                    "iCycleRepetition": objResult["objActiveTestLoginsAndResultDetails"]["iCycleRepetition"],
                                    "iStateId": objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] ? objResult["objActiveTestLoginsAndResultDetails"]["iStateId"] : iStateId,
                                    "strOperationType": "DEACTIVATE"
                                }
                                ]
                            };
                        }
                        let strParentSubjectName = "", strSubSubjectName = "";
                        let arrTestData = [];
                        if (objResult["TestType"] === "Orientation") {
                            let arrSubjects = GetAllSubjects(objContext);
                            let objParentSubjectDetails = {};
                            let objSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"])[0];
                            if (objSubjectDetails["iParentSubjectId"] !== 0) {
                                objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objSubjectDetails["iParentSubjectId"])[0];
                                strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                                strSubSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];;
                            }
                            else {
                                strParentSubjectName = objSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                            }
                            arrTestData = GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
                        }
                        else {
                            let arrSubjects = GetAllSubjects(objContext);
                            let objParentSubjectDetails = arrSubjects.filter(objTempSubjectData => objTempSubjectData["iSubjectId"] === objResult["objActiveTestLoginsAndResultDetails"]["iSubjectId"])[0];
                            strParentSubjectName = objParentSubjectDetails["t_TestDrive_Subject_Data"].filter(objTempSubjectData => objTempSubjectData["iLanguageId"] === parseInt(objContext.props.JConfiguration["InterfaceLanguageId"]))[0]["vSubjectName"];
                            // arrTestData = GetTokenValidationTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]["uTestId"]);
                            arrTestData = GetTestData(objContext, objResult["objActiveTestLoginsAndResultDetails"]);
                        }
                        let objConflictingTestDetails = arrTestData.filter(objTempTestData => objTempTestData["uTestId"] === objResult["objActiveTestLoginsAndResultDetails"]["uTestId"])[0];
                        let strTestName = objConflictingTestDetails["vTestName"];
                        arrConflictingData = [...arrConflictingData,
                        {
                            "PupilName": objTempData["vFirstName"] + objTempData["vName"],
                            "TestName": strTestName,
                            "SubSubjectName": strSubSubjectName,
                            "ParentSubjectName": strParentSubjectName,
                            "TestType": objResult["TestType"]
                        }
                        ];
                    }
                    if (arrTestLoginsAndResultDataForCurrentPupil.length > 0 && CompareDate(objContext, arrTestLoginsAndResultDataForCurrentPupil[0]["dtValidTill"]) === false) {
                        if (arrTestLoginsAndResultDataForCurrentPupil[0]["TestExecution"].length > 0 ? arrTestLoginsAndResultDataForCurrentPupil[0]["TestExecution"][0]["iTestStatusId"] !== 5 ? true : false : true) {
                            objHighStakeTestLoginAndResultDataToBeEdited = {
                                ...objHighStakeTestLoginAndResultDataToBeEdited,
                                ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                                {
                                    "arrPupilId": [uPupilId],
                                    "uTestId": objTestDetails["uTestId"],
                                    "uCycleId": strHighStakeCycleId,
                                    "uClassId": strClassId,
                                    "iCycleRepetition": intCycleRepetition,
                                    "iStateId": iStateId,
                                    "strOperationType": "ACTIVATE"
                                }
                                ]
                            };
                        }
                    }
                    else {
                        objHighStakeTestLoginAndResultDataToBeEdited = {
                            ...objHighStakeTestLoginAndResultDataToBeEdited,
                            ["DataToActivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"],
                            {
                                "arrPupilId": [uPupilId],
                                "uTestId": objTestDetails["uTestId"],
                                "uCycleId": strHighStakeCycleId,
                                "uClassId": strClassId,
                                "iCycleRepetition": intCycleRepetition,
                                "iStateId": iStateId,
                                "strOperationType": "ACTIVATE"
                            }
                            ]
                        };
                    }
                }
            });
        }
        else {
            objContext.state.arrPupil.forEach(objTempData => {
                let uPupilId = objTempData["uPupilId"];
                let arrTestLoginsAndResultPupilData = GetTestLoginsAndResultData(objContext, uPupilId, intCycleRepetition, iSubjectId);
                if (arrTestLoginsAndResultPupilData.length > 0 && CompareDate(objContext, arrTestLoginsAndResultPupilData[0]["dtValidTill"]) === true) {
                    if (arrTestLoginsAndResultPupilData[0]["TestExecution"].length > 0 ? arrTestLoginsAndResultPupilData[0]["TestExecution"][0]["iTestStatusId"] !== 5 ? true : false : true) {
                        objHighStakeTestLoginAndResultDataToBeEdited = {
                            ...objHighStakeTestLoginAndResultDataToBeEdited,
                            ["DataToDeactivate"]: [...objHighStakeTestLoginAndResultDataToBeEdited["DataToDeactivate"],
                            {
                                "arrPupilId": [uPupilId],
                                "uTestId": objTestDetails["uTestId"],
                                "uCycleId": strHighStakeCycleId,
                                "uClassId": strClassId,
                                "iCycleRepetition": intCycleRepetition,
                                "iStateId": iStateId,
                                "strOperationType": "DEACTIVATE"
                            }
                            ]
                        };
                    }
                }
            });
        }
        if (arrConflictingData.length > 0) {
            ShowActivationPopUp(objContext, arrConflictingData, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited, iSubjectId);
        }
        else {
            let arrPupilToAssignClassType = [];
            objHighStakeTestLoginAndResultDataToBeEdited["DataToActivate"].map(objTempData => {
                let blnIsClassTypeIsPresentForPupil = CheckIfPupilSubjectClassTypeIsPresentForPupil(objContext, objTempData["arrPupilId"][0], iSubjectId);
                if (!blnIsClassTypeIsPresentForPupil) {
                    arrPupilToAssignClassType = [...arrPupilToAssignClassType, { "uPupilId": objTempData["arrPupilId"][0], "uTestId": objTempData["uTestId"] }];
                }
            });
            if (arrPupilToAssignClassType.length > 0) {
                ShowAssignClassTypePopUp(objContext, arrPupilToAssignClassType, iSubjectId, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
            else {
                ApplicationState.SetProperty("blnShowAnimation", true);
                EditData(objContext, objOrientationTestLoginAndResultDataToBeEdited, objHighStakeTestLoginAndResultDataToBeEdited);
            }
        }
    }
};

/**
 *
 * @param {*} objContext
 * @param {*} blnIsSelectAll
 * @param {*} objTestDetails
 * @param {*} intCycleRepetition
 * @param {*} blnIsChecked
 * @summary   Trigerred when the any checkbox is checked or unchecked.
 */
export function OnChangeCheckBox(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked) {
    Logger.Log("*****************Check box details", {
        "blnIsSelectAll": blnIsSelectAll,
        "objTestDetails": objTestDetails,
        "objPupilDetails": objPupilDetails,
        "intCycleRepetition": intCycleRepetition,
        "blnIsChecked": blnIsChecked
    });
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    if (blnIsOrientationTest) {
        OrientationTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked);
    }
    else {
        HisghStakeTestExtendedCheckBokChange(objContext, blnIsSelectAll, objTestDetails, objPupilDetails, intCycleRepetition, blnIsChecked);
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   This manages the state to open and close Pdf Popup
 */
export function HandlePdfPopup(objContext) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "Open": !objContext.state.Open } });
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns a json object. If to show OptionalPdfButton 'ShowOptionalPdfButton' is true and 'TestIds' contains the test ids present in the test data and also in the hardcoded data.
 */
export function CheckIfToShowOptionalPdfButton(objContext) {
    let arrTestIds = [];
    let strIsOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest");
    let blnIsOrientationTest = strIsOrientationTest === 'Y';
    if (blnIsOrientationTest) {
        arrTestIds = ["1978685B-06EF-449A-9392-5DD32D8E3323", "1C0B6D14-D218-44E4-9CC9-0BE909776BAB"];
    }
    else {
        arrTestIds = ["4412DC16-5B7F-42DD-A92C-43A9572A14AB"];
    }
    let arrTestIdsPresentInTestData = [];
    arrTestIds.forEach(strTempTestId => {
        if (objContext.state.arrTestData.filter(objTempData => objTempData["uTestId"] === strTempTestId).length > 0) {
            arrTestIdsPresentInTestData = [...arrTestIdsPresentInTestData,
            {
                "uTestId": strTempTestId
            }
            ];
        }
    });
    if (arrTestIdsPresentInTestData.length > 0) {
        return {
            "ShowOptionalPdfButton": true,
            "TestIds": arrTestIdsPresentInTestData
        };
    }
    else {
        return {
            "ShowOptionalPdfButton": false,
            "TestIds": arrTestIdsPresentInTestData
        };
    }
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSelectedSubjectId: -1,
        arrPupil: [],
        arrTestData: [],
        arrTestLoginsAndResultData: [],
        arrValidationTestLoginsAndResultData: [],
        strCurrentServerDate: "",
        blnIsClassSelectionChanged: false,
        Open: false,
        arrPdfFilesInfo: []
    };
};

export function GetCycleTypeId() {
    let blnOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest") === 'Y';
    if (blnOrientationTest)
        return "1"
    else
        return "6"
}

export function GetCycleTypeIdToValidateTokens() {
    let blnOrientationTest = QueryString.GetQueryStringValue("IsOrientierungstest") === 'Y';
    if (blnOrientationTest)
        return "6"
    else
        return "1"
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
};
