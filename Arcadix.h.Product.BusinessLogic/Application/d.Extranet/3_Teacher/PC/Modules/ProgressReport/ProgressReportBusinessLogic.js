import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import * as RouterHelper from "@root/Framework/Services/ReactRouterHelper/ReactRouterHelper";

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            class: DataRef(state.Entity, "class", true),
            pupil: DataRef(state.Entity, "pupil", true),
            textresource: DataRef(state.Entity, "textresource", true),
            subject: DataRef(state.Entity, "subject", true),
            userpreferenceprofileimage: DataRef(state.Entity, "userpreferenceprofileimage", true),
            intranettest: DataRef(state.Entity, "intranettest", true),
            testloginandresult: DataRef(state.Entity, "testloginandresult", true),
            progressreport: DataRef(state.Entity, "progressreport", true),
            feedbackthreshold: DataRef(state.Entity, "feedbackthreshold", true),
            offlineprocessdefinition: DataRef(state.Entity, 'offlineprocessdefinition', true),
            offlineprocessexecution: DataRef(state.Entity, 'offlineprocessexecution', true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            cycle: DataRef(state.Entity, "cycle", true),

        };
    }
    else {
        return {};
    }
}

function GetDataRequestDependsOnClass(props, selClassId = undefined) {
    let strClassId = selClassId ? selClassId : ApplicationState.GetProperty("SelectedClassId");
    let iStateId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strOrientationCycleTypeId = GetOrienationCycleTypeId();
    let strLearningCycleTypeId = GetLearningCycleTypeId();
    let strHighStakeCycleTypeId = GetHighStakeCycleTypeId();
    
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        },
        "SearchQuery": {},
        "SortKeys": [],
        "OutputColumns": []
    };

    let objOrientationIntranetTestParams = {
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
                            "iCycleTypeId": strOrientationCycleTypeId
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

    let objOrientationTestLoginAndResultParams = {
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
        }
    };

    let objHighStakeTestLoginAndResultParams = {
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
        }
    };

    let objLearningExtranetTestResultParams = {
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iCycleTypeId": strLearningCycleTypeId
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

    let objHighStakeIntranetTestParams = {
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
                            "iCycleTypeId": strHighStakeCycleTypeId
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

    let arrDataRequest = [
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objOrientationIntranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objOrientationTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objHighStakeTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Extranet/Teacher/ProgressReport",
            "Params": objLearningExtranetTestResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objHighStakeIntranetTestParams,
            "MethodType": "Get"
        },
    ];

    return arrDataRequest;
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

export function InitialDataParams(JConfiguration, props) {

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

    let objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/ProgressReport"
                    }
                }
            ]
        }
    };

    let objSubjectParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
            "should": [
                {
                    "match": {
                        "cIsTestedAtThisTime": "Y"
                    }
                },
                {
                    "match": {
                        "cIsReadyForSystemLearningTest": "Y"
                    }
                }
            ]
        }
    }

    let objFeedbackThresholdParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iMainClientId": props.ClientUserDetails.MainClientId
                    }
                }
            ]

        },
        "SortKeys": [
            {
                "iSegmentNumber": {
                    "order": "asc"
                }
            }
        ]
    };
    let strOrientationCycleTypeId = GetOrienationCycleTypeId();
    let strLearningCycleTypeId = GetLearningCycleTypeId();
    let strHighStakeCycleTypeId = GetHighStakeCycleTypeId();
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
                                        "iCycleTypeId": strOrientationCycleTypeId
                                    }
                                },
                                {
                                    "match": {
                                        "iCycleTypeId": strLearningCycleTypeId
                                    }
                                },
                                {
                                    "match": {
                                        "iCycleTypeId": strHighStakeCycleTypeId
                                    }
                                }

                            ]
                        }
                    }
                ]
        }
    };
    
    let arrDataRequest = [
        {
            "URL": "API/Object/Teacher/Class",
            "Params": objGetClassesParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/FeedbackThreshold/FeedbackThreshold",
            "Params": objFeedbackThresholdParams,
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Intranet/Test/Cycle",
            "Params": objCycleParams,
            "MethodType": "Get"
        },
        ...GetDataRequestDependsOnClass(props)
    ];
    return { "DataCalls": arrDataRequest };
}

export function ToggleCompetencyMode(objContext) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            blnCompetencyModeOn: !objContext.state.blnCompetencyModeOn
        }
    });
}

export function useDataLoadForClassChange(objContext) {
    let GetDataAfterClassChange = () => {
        if (objContext.state.isLoadComplete) {
            let arrDataRequest = GetDataRequestDependsOnClass(objContext.props, objContext.state.objSelectedClass.uClassId);

            DataCall(arrDataRequest);
        }
    };
    useEffect(GetDataAfterClassChange, [objContext.state.objSelectedClass]);
}

export function ShowSummaryPopup(objContext, objPupil, objSubject) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objSelPupilForSummaryPopup: objPupil,
            objSelSubjectForSummaryPopup: objSubject
        }
    });
}

export function HideSummaryPopup(objContext) {
    if (objContext.state.objSelPupilForSummaryPopup) {
        objContext.dispatch({
            type: 'SET_STATE_VALUES', payload: {
                objSelPupilForSummaryPopup: undefined,
                objSelSubjectForSummaryPopup: undefined
            }
        });
    }
}

export function OnChangeClass(objContext, objItem) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objSelectedClass: objItem
        }
    });
}

export function OnClickParentTest(objContext, objSelParentSubject, objSelPreviousParentSubject) {
    if (objSelParentSubject["iSubjectId"] != objSelPreviousParentSubject["iSubjectId"]) {
        let arrOrientionSubSubjectData = objContext.state.arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsTestedAtThisTime"] == "Y");
        let arrLearningSubSubjectData = objContext.state.arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsReadyForSystemLearningTest"] == "Y");
        objContext.dispatch({
            type: 'SET_STATE_VALUES', payload: {
                objSelParentSubject: objSelParentSubject,
                arrOrientionSubSubjectData: arrOrientionSubSubjectData,
                arrLearningSubSubjectData: arrLearningSubSubjectData
            }
        });
    }
}

export function GetDisplayTestResultData(objContext, arrPupilData, arrOrientationTestData, arrOrientationTestLoginsAndResultData, arrLearningJournalTestData, arrHighStakeTestData, arrHighStakeTestLoginsAndResultData, arrFeedbackThreshold) {
    let arrDisplayData = [];
    for (let objPupil of arrPupilData) {
        let objDisplayData = {
            uPupilId: objPupil["uPupilId"],
            vName: objPupil["vName"],
            vFirstName: objPupil["vFirstName"],
            arrOrientationSubjectResult: [],
            arrLearningJournalSubjectData: [],
            isHighStakeResultCompleted: false
        };
        for (let objSubject of objContext.state.arrOrientionSubSubjectData) {
            let objTest = arrOrientationTestData.find(tst => tst["iSubjectId"] == objSubject["iSubjectId"]);
            let objPupilTestResult = {
                vResultText: '-',
                isResultExists: false
            };
            if (objTest) {
                let arrResultsForTest = arrOrientationTestLoginsAndResultData.filter(res => res["uTestId"] == objTest["uTestId"] && objPupil["uPupilId"] == res["uPupilId"]).sort((a, b) => { return b.iCycleRepetition - a.iCycleRepetition })

                if (arrResultsForTest[0] && arrResultsForTest[0].TestExecution[0]) {
                    objPupilTestResult.isResultExists = true;
                    if (arrResultsForTest[0].TestExecution[0].iTestStatusId === 5) {
                        let resultValue = JSON.parse(arrResultsForTest[0].TestResultSummary[0].vResultAttribute).Result;
                        if (objContext.state.blnCompetencyModeOn) {
                            let arrFeedbackThresholdBySub = arrFeedbackThreshold.filter(thrsld => thrsld["iSubjectId"] == objSubject["iSubjectId"])
                            for (let thrsld of arrFeedbackThresholdBySub) {
                                if (resultValue > thrsld["iThresholdFromValue"] && resultValue < thrsld["iThresholdToValue"]) {
                                    objPupilTestResult.vResultText = thrsld["t_testDrive_Subject_FeedbackThreshold_Data"][0].vThresholdHeading;
                                }
                            }
                        }
                        else {
                            objPupilTestResult.vResultText = resultValue;
                        }

                    }
                }
            }
            objDisplayData.arrOrientationSubjectResult = [...objDisplayData.arrOrientationSubjectResult, objPupilTestResult];

        }
        for (let objSubject of objContext.state.arrLearningSubSubjectData) {
            let objLJTestRslt = arrLearningJournalTestData.find(tst => tst["iSubjectId"] == objSubject["iSubjectId"] && tst["uPupilId"] == objPupil["uPupilId"]);

            objDisplayData.arrLearningJournalSubjectData = [...objDisplayData.arrLearningJournalSubjectData, objLJTestRslt];
        }

        let objHighStakeTest = arrHighStakeTestData.find(tst => tst["iSubjectId"] == objContext.state.objSelParentSubject["iSubjectId"]);
        if (objHighStakeTest) {
            let arrResultsForTest = arrHighStakeTestLoginsAndResultData.filter(res => res["uTestId"] == objHighStakeTest["uTestId"] && objPupil["uPupilId"] == res["uPupilId"]).sort((a, b) => { return b.iCycleRepetition - a.iCycleRepetition })

            if (arrResultsForTest[0] && arrResultsForTest[0].TestExecution[0]) {
                if (arrResultsForTest[0].TestExecution[0].iTestStatusId === 5) {
                    objDisplayData.isHighStakeResultCompleted = true;
                }
            }
        }
        arrDisplayData = [...arrDisplayData, objDisplayData];
    }
    return arrDisplayData;
}

export function DataCall(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
    });
}

export function NavigateToOrientationTest(objContext) {
    RouterHelper.RouteTo("Orientierungstest/TestResults?CycleId=8c880d36-6e8f-4ebb-a725-3c2f0f689dbf&IsOrientierungstest=Y&CycleIdToValidateTokens=f8a40091-18e0-45e4-b13f-659e5bd344db", objContext.props.history);
}

export function NavigateToHighStakeTest(objContext) {
    RouterHelper.RouteTo("TeacherLearningTest/TeacherLearningTestSystem?CycleId=0fddde67-6793-4093-9790-9e3611356c8b", objContext.props.history);
}

export function useDataLoaderForOfflineProcessDefinition(objContext) {
    const GetRequiredData = () => {
        if (objContext.state.blnShowAllPdf === true) {
            DataCall(GetOfflineProcessDefinitionDataParams(objContext));
        }
    }
    useLayoutEffect(GetRequiredData, [objContext.state.blnShowAllPdf]);
}

export function useDataLoaderForOfflineProcessExecution(objContext) {
    const GetRequiredData = () => {
        if (objContext.state.blnShowAllPdf) {
            let objOfflineProcessDefinition = DataRef(objContext.props.offlineprocessdefinition, "offlineprocessdefinition;vOfflineProcessKeyword;progressreportgeneration");
            if (objOfflineProcessDefinition) {
                DataCall(GetOfflineProcessExecutionDataParams(objContext, objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"]));
            }
        }
    }
    useLayoutEffect(GetRequiredData, [objContext.props.offlineprocessdefinition]);
}

export function useDataLoadedForAllPdf(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.blnShowAllPdf) {
            let strOfflineProcessDefinitionId = DataRef(objContext.props.offlineprocessdefinition, "offlineprocessdefinition;vOfflineProcessKeyword;progressreportgeneration")["Data"][0]["uOfflineProcessDefinitionId"];
            if (DataRef(objContext.props.offlineprocessexecution, "offlineprocessexecution;uuserid;" + objContext.props.ClientUserDetails.UserId + ";uofflineprocessdefinitionid;" + strOfflineProcessDefinitionId)) {
                let arrTempOfflineProcessExecution = DataRef(objContext.props.offlineprocessexecution, "offlineprocessexecution;uuserid;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + strOfflineProcessDefinitionId).Data;
                let arrOfflineProcessExecution = arrTempOfflineProcessExecution.filter(objTempOfflineProcessExecutionDetails => { return objTempOfflineProcessExecutionDetails["cIsDeleted"] === "N" });
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrOfflineProcessExecutionData": arrOfflineProcessExecution } });
            }
        }
    }, [objContext.props.offlineprocessexecution]);
}

function GetOfflineProcessDefinitionDataParams(objContext) {
    let objOfflineProcessDefinitionParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "vOfflineProcessKeyword": "ProgressReportGeneration"
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
        }
    ];
    return arrParams;
}

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
}

export function ToggleAllPdf(objContext) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            blnShowAllPdf: !objContext.state.blnShowAllPdf
        }
    });
}

export function DeleteGeneratedOfflineProcessExecution(objContext, strOfflinePropcessExecutionId) {
    let objOfflineProcessDefinition = DataRef(objContext.props.offlineprocessdefinition, "offlineprocessdefinition;vOfflineProcessKeyword;progressreportgeneration");
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
}

export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }
    useLayoutEffect(GetRequiredData, []);
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strOrientationCycleTypeId = GetOrienationCycleTypeId();
        let strLearningCycleTypeId = GetLearningCycleTypeId();
        let strHighStakeCycleTypeId = GetHighStakeCycleTypeId();
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId + ";t_testdrive_member_class_teacher.cisdeleted;n") &&
            DataRef(objContext.props.pupil, "pupil;t_testdrive_member_class_pupil.uclassid;" + strClassId) &&
            DataRef(objContext.props.subject, "subject") &&
            DataRef(objContext.props.feedbackthreshold, "feedbackthreshold;imainclientid;" + objContext.props.ClientUserDetails.MainClientId) &&
            DataRef(objContext.props.cycle, "cycle;cisactive;y;cisdeleted;n") &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strOrientationCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strHighStakeCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.progressreport, "progressreport;icycletypeid;" + strLearningCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strOrientationCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strHighStakeCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/progressreport")
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("DisplayFor", 4);
            let arrSubjectData = DataRef(objContext.props.subject, "subject")["Data"];
            let arrParentSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] === 0);
            let objSelParentSubject = arrParentSubjectData[0];
            let arrOrientionSubSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsTestedAtThisTime"] == "Y");
            let arrLearningSubSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsReadyForSystemLearningTest"] == "Y");
            objContext.dispatch({
                type: "SET_STATE_VALUES", payload: {
                    isLoadComplete: true,
                    strUserPreferenceClassId: strClassId,
                    objUserPreference: objUserPreference,
                    arrSubjectData: arrSubjectData,
                    arrParentSubjectData: arrParentSubjectData,
                    arrOrientionSubSubjectData: arrOrientionSubSubjectData,
                    arrLearningSubSubjectData: arrLearningSubSubjectData,
                    objSelParentSubject: objSelParentSubject
                }
            });

        }
        else {
            console.log("data is loading");
        }

    },
        [
            objContext.props.class,
            objContext.props.pupil,
            objContext.props.textresource,
            objContext.props.subject,
            objContext.props.intranettest,
            objContext.props.testloginandresult,
            objContext.props.progressreport,
            objContext.props.feedbackthreshold,
            objContext.props.cycle,

        ]);
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

export function GenerateExcel(objContext, objSelectedClass,  strProgressBarID) {
    let { state, props } = objContext;
    let iStateId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let uTeacherId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uTeacherId"];
    let objOrientationCycle = GetCycleObject('Orientation');
    let objLearningCycle = GetCycleObject('HighStake');;
    let objHighStakeCycle = GetCycleObject('Learning');
    let objGenerateExcelParams = {
        "SearchQuery": {},
        "objData": {
            "vClassName": objSelectedClass["vClassName"],
            "OfflineProcessKeyword": "ProgressReportGeneration",
            "uClassId": objSelectedClass["uClassId"],
            "SchoolYear": objSelectedClass["iSchoolYear"],
            "vTeacherName": props.ClientUserDetails.Name,
            "TeacherId": uTeacherId,
            "StateId": iStateId,
            "SchoolId": uSchoolId,
            "CreatedDate": new Date().toDateString(),
            "ProgressBarId": strProgressBarID,
            "strHighStakeCycleId": objHighStakeCycle["uCycleId"],
            "strLearningTestCycleId": objLearningCycle["uCycleId"],
            "strOrientationCycleId": objOrientationCycle["uCycleId"]
        }
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Teacher/ProgressReport/GenerateProgressReportExcel",
            "Params": objGenerateExcelParams
        }
    ];

    ArcadixFetchData.Execute(arrDataRequest, (objReturn) => {      
        let arrExecutionData = DataRef(objReturn, "progressreport")["Data"];
        let strKey = "offlineprocessexecution;uuserid;" + uTeacherId + ";uofflineprocessdefinitionid;" + arrExecutionData[0].uOfflineProcessDefinitionId.toLowerCase()
        let objExecutionData = {
            Filter: strKey,
            Value: {
                Data: arrExecutionData,
                TimeStamp: "",
                PrimaryKeyName: "uOfflineProcessExecutionId",
                Count: arrExecutionData.length
            }

        }
        ArcadixCacheData.AddData("offlineprocessexecution", objExecutionData, () => {           
        })
    })
}

export function GetOrienationCycleTypeId() { return "1" }

export function GetHighStakeCycleTypeId() { return "6" }

export function GetLearningCycleTypeId() { return "3"}

export function GetCycleObject(objContext, strType) {
    let arrCycle = DataRef(objContext.props.cycle, "cycle;cisactive;y;cisdeleted;n")["Data"];
    let objCycle = {};
    if (strType === 'Orientation') {
        objCycle = arrCycle.find(x => x["iCycleTypeId"] == GetOrienationCycleTypeId())
    }
    if (strType === 'HighStake') {
        objCycle = arrCycle.find(x => x["iCycleTypeId"] == GetHighStakeCycleTypeId())
    }
    if (strType === 'Learning') {
        objCycle = arrCycle.find(x => x["iCycleTypeId"] == GetLearningCycleTypeId())
    }
    return objCycle;
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        objSelectedClass: undefined,
        strUserPreferenceClassId: undefined,
        objUserPreference: undefined,
        objSelParentSubject: undefined,
        arrParentSubjectData: [],
        arrOrientionSubSubjectData: [],
        arrLearningSubSubjectData: [],
        blnCompetencyModeOn: false,
        objSelPupilForSummaryPopup: undefined,
        objSelSubjectForSummaryPopup: undefined,
        blnShowAllPdf: false,
        arrOfflineProcessExecutionData:[]
    };
}

export function Reducer(state, action) {
    switch (action.type) {

        case 'SET_STATE_VALUES': {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}


