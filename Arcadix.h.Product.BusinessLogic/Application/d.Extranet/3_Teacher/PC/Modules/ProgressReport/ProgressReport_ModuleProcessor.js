//Objects required for module.
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_TestApplication_TestLoginAndResult from '@shared/Object/f.TestApplication/TestLoginAndResult/TestLoginAndResult';
import Extranet_Teacher_ProgressReport_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport_Module';
import Object_Intranet_Taxonomy_FeedbackThreshold from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThreshold/FeedbackThreshold';
import Object_Cockpit_OfflineProcessDefinition from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessDefinition/OfflineProcessDefinition';
import Object_Cockpit_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';

//Helper classes.
import * as RouterHelper from "@root/Framework/Services/ReactRouterHelper/ReactRouterHelper";
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name ProgressReport_ModuleProcessor
* @summary Class for TimeTableSchedule module display and manipulate.
*/
class ProgressReport_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Class", "Object_Extranet_Pupil_Pupil", "Object_Intranet_Taxonomy_Subject", "Object_Cockpit_UserPreferenceProfileImage",
            "Object_Intranet_Test_IntranetTest", "Object_TestApplication_TestLoginAndResult", "Extranet_Teacher_ProgressReport_Module",
            "Object_Intranet_Taxonomy_FeedbackThreshold", "Object_Cockpit_OfflineProcessDefinition", "Object_Cockpit_OfflineProcess_OfflineProcessExecution", "Object_Intranet_Cycle_Cycle",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/ProgressReport"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        // (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/ProgressReport/ProgressReport.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PupilLogin/CreatePdfPopUp.css"
        ];
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //Class
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
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objGetClassesParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //Subject
        let objSubjectParams = {
            "SearchQuery": {
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
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //FeedbackThreshold
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
        Object_Intranet_Taxonomy_FeedbackThreshold.Initialize(objFeedbackThresholdParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_FeedbackThreshold];

        //Cycle
        let strOrientationCycleTypeId = this.GetOrienationCycleTypeId();
        let strLearningCycleTypeId = this.GetLearningCycleTypeId();
        let strHighStakeCycleTypeId = this.GetHighStakeCycleTypeId();
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
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/ProgressReport"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        arrDataRequest = [...arrDataRequest, ...this.GetDataRequestDependsOnClass(props)];
        return arrDataRequest;
    }

    /**
    * @name GetDataRequestDependsOnClass
    * @param {object} props Passes props
    * @param {String} strSelectedClassId SelectedClassId 
    * @param {String} strSchoolYearPeriodId SchoolYearPeriodId
    * @summary Get data request params that depends on class for the component.
    * @returns {Array} return arrays of data request params that depends on class
    */
    GetDataRequestDependsOnClass(props, strSelectedClassId = undefined, strSchoolYearPeriodId = "") {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let strClassId = strSelectedClassId ? strSelectedClassId : ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strOrientationCycleTypeId = this.GetOrienationCycleTypeId();
        let strLearningCycleTypeId = this.GetLearningCycleTypeId();
        let strHighStakeCycleTypeId = this.GetHighStakeCycleTypeId();
        let arrDataRequest = [];

        //IntranetTest
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
        Object_Intranet_Test_IntranetTest.Initialize([objOrientationIntranetTestParams, objHighStakeIntranetTestParams]);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];

        //Pupil
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //TestLoginAndResult
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
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": strSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "iStateId": iStateId
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
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": strSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            }
        };
        Object_TestApplication_TestLoginAndResult.Initialize([objOrientationTestLoginAndResultParams, objHighStakeTestLoginAndResultParams]);
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestLoginAndResult];

        //ProgressReport
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
        Extranet_Teacher_ProgressReport_Module.Initialize(objLearningExtranetTestResultParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_ProgressReport_Module];

        return arrDataRequest;
    }

    /**
    * @name LoadOfflineProcessDefinitionData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadOfflineProcessDefinitionData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.ProgressReport_ModuleProcessor.GetOfflineProcessDefinitionDataParams(objContext));
    }

    /**
    * @name GetOfflineProcessDefinitionDataParams
    * @param {object} objContext Passes Context object
    * @summary Get data request params for OfflineProcessDefinition
    * @returns {Array} return arrays of data request params
    */
    GetOfflineProcessDefinitionDataParams(objContext) {
        let arrDataRequest = [];

        //OfflineProcessDefinition
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

        Object_Cockpit_OfflineProcessDefinition.Initialize(objOfflineProcessDefinitionParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_OfflineProcessDefinition];

        return arrDataRequest;
    }

    /**
    * @name GetOfflineProcessExecutionDataParams
    * @param {object} objContext Passes Context object
    * @param {string} strOfflineProcessDefinitionId OfflineProcessDefinition Id
    * @summary Get data request params for OfflineProcessExecution based on OfflineProcessDefinition Id
    * @returns {Array} return arrays of data request params
    */
    GetOfflineProcessExecutionData(objContext, strOfflineProcessDefinitionId) {

        //OfflineProcessExecution
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
                        "order": "desc"
                    }
                }
            ]
        };

        Object_Cockpit_OfflineProcessExecution.GetData(objOfflineProcessExecutionParams);
    }

    /**
    * @name OnChangeWeekDisplay
    * @param {object} objContext Passes Context object
    * @param {object} objItem Item returned on change of week display, formates the start and end date and then changes the states. The start & end date is used to filter the TestLoginAndResults data.
    * @summary Executes when week display is changed
    */
    OnChangeWeekDisplay(objContext, objItem) {
        let strSchoolYearPeriodId = objContext.state.strSchoolYearPeriodId;
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        if (strSchoolYearPeriodId == "") {
            let strOrientationCycleTypeId = this.GetOrienationCycleTypeId();
            let strHighStakeCycleTypeId = this.GetHighStakeCycleTypeId();
            let strClassId = ApplicationState.GetProperty("SelectedClassId");

            let arrOrientationTestLoginAndResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + strSchoolYearPeriodId + ";iStateId;" + iStateId)["Data"];
            let objOrientationTestLoginAndResultData = {
                Filter: "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId + ";iStateId;" + iStateId,
                Value: {
                    Data: arrOrientationTestLoginAndResult,
                    TimeStamp: "",
                    PrimaryKeyName: "uTestTokenId",
                    Count: arrOrientationTestLoginAndResult.length
                }
            };

            Object_TestApplication_TestLoginAndResult.AddData(objOrientationTestLoginAndResultData, () => {

            });

            let arrHighStakeTestLoginAndResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + strSchoolYearPeriodId + ";iStateId;" + iStateId)["Data"];
            let objHighStakeTestLoginAndResultData = {
                Filter: "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId + ";iStateId;" + iStateId,
                Value: {
                    Data: arrHighStakeTestLoginAndResult,
                    TimeStamp: "",
                    PrimaryKeyName: "uTestTokenId",
                    Count: arrHighStakeTestLoginAndResult.length
                }
            };

            Object_TestApplication_TestLoginAndResult.AddData(objHighStakeTestLoginAndResultData, () => {

            });
        }

        objContext.dispatch({ type: 'SET_STATE', payload: { strSchoolYearPeriodId: objItem["uSchoolYearPeriodId"] } });
    }

    /**
    * @name GetOrienationCycleTypeId
    * @summary Get the Orientation Cycle Type Id
    * @returns {Array} return string of Id
    */
    GetOrienationCycleTypeId() { return "1"; }

    /**
    * @name GetHighStakeCycleTypeId
    * @summary Get the HighStake Cycle Type Id
    * @returns {Array} return string of Id
    */
    GetHighStakeCycleTypeId() { return "6"; }

    /**
    * @name GetLearningCycleTypeId
    * @summary Get the Learning Cycle Type Id
    * @returns {Array} return string of Id
    */
    GetLearningCycleTypeId() { return "3"; }

    /**
    * @name ToggleCompetencyMode
    * @param {object} objContext Passes Context object
    * @summary Executes everytime Competency mode switch is changed and sets the state "blnCompetencyModeOn" to true or false
    */
    ToggleCompetencyMode(objContext) {
        objContext.dispatch({ type: 'SET_STATE', payload: { blnCompetencyModeOn: !objContext.state.blnCompetencyModeOn } });
    }

    /**
    * @name ShowSummaryPopup
    * @param {object} objContext Passes Context object
    * @param {object} objPupil Passes Pupil data
    * @param {object} objSubject Passes Subject data
    * @summary Shows the summary popup in Learning test
    */
    ShowSummaryPopup(objContext, objPupil, objSubject) {
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                objSelPupilForSummaryPopup: objPupil,
                objSelSubjectForSummaryPopup: objSubject
            }
        });
    }

    /**
    * @name HideSummaryPopup
    * @param {object} objContext Passes Context object
    * @summary Hides the summary popup in Learning test on mouse leave
    */
    HideSummaryPopup(objContext) {
        if (objContext.state.objSelPupilForSummaryPopup) {
            objContext.dispatch({
                type: 'SET_STATE', payload: {
                    objSelPupilForSummaryPopup: undefined,
                    objSelSubjectForSummaryPopup: undefined
                }
            });
        }
    }

    /**
    * @name OnChangeClass
    * @param {object} objContext Passes Context object
    * @param {object} objItem Item returned on change of class dropdown
    * @summary Executes when class dropdown is changed and stores the item in a state
    */
    OnChangeClass(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedClass: objItem } });
    }

    /**
    * @name OnClickParentTest
    * @param {object} objContext Passes Context object
    * @param {object} objSelParentSubject Selected Parent Subject
    * @param {object} objSelPreviousParentSubject Previous Selected Parent Subject
    * @summary Executes when class Parent subjects buttons are clicked and filters the Subsubject data with the selected Parent Subject and stores them
    */
    OnClickParentTest(objContext, objSelParentSubject, objSelPreviousParentSubject) {
        if (objSelParentSubject["iSubjectId"] != objSelPreviousParentSubject["iSubjectId"]) {
            let arrOrientionSubSubjectData = objContext.state.arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsTestedAtThisTime"] == "Y");
            let arrLearningSubSubjectData = objContext.state.arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsReadyForSystemLearningTest"] == "Y");
            objContext.dispatch({
                type: 'SET_STATE', payload: {
                    objSelParentSubject: objSelParentSubject,
                    arrOrientionSubSubjectData: arrOrientionSubSubjectData,
                    arrLearningSubSubjectData: arrLearningSubSubjectData
                }
            });
        }
    }

    /**
    * @name GetDisplayTestResultData
    * @param {object} objContext Passes Context object
    * @param {Array} arrPupilData Pupil data
    * @param {Array} arrOrientationTestData Orientation Test data
    * @param {Array} arrOrientationTestLoginsAndResultData Orientation Test LoginsAndResult data
    * @param {Array} arrLearningJournalTestData LearningJournal Test data
    * @param {Array} arrHighStakeTestData HighStake Test data
    * @param {Array} arrHighStakeTestLoginsAndResultData HighStake Test TestLoginsAndResult data
    * @param {Array} arrFeedbackThreshold FeedbackThreshold data
    * @summary Forms the data required for displaying the test results
    * @returns {Array} returns the display data
    */
    GetDisplayTestResultData(objContext, arrPupilData, arrOrientationTestData, arrOrientationTestLoginsAndResultData, arrLearningJournalTestData, arrHighStakeTestData, arrHighStakeTestLoginsAndResultData, arrFeedbackThreshold) {
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
                    uTestId: '',
                    vBackGroundColor: '',
                    isResultExists: false
                };
                if (objTest) {
                    let arrFilterResultsForTest = arrOrientationTestLoginsAndResultData
                        .filter(res => res["uTestId"] == objTest["uTestId"] && objPupil["uPupilId"] == res["uPupilId"])
                        .sort((a, b) => { return b.iCycleRepetition - a.iCycleRepetition; });

                    if (arrFilterResultsForTest[0] && arrFilterResultsForTest[0].TestExecution[0]) {
                        objPupilTestResult.isResultExists = true;
                        objPupilTestResult.uTestId = arrFilterResultsForTest[0]["uTestId"];
                        if (arrFilterResultsForTest[0].TestExecution[0].iTestStatusId === 5) {
                            let resultValue = JSON.parse(arrFilterResultsForTest[0].TestResultSummary[0].vResultAttribute).Result;
                            objPupilTestResult.vResult = resultValue;
                            objPupilTestResult.vBackGroundColor = this.GetColorForLearningTestResult(resultValue);
                            if (objContext.state.blnCompetencyModeOn) {
                                let objFeedbackThresholdBySub = arrFeedbackThreshold
                                    .find(thrsld =>
                                        thrsld["iSubjectId"] == objSubject["iSubjectId"]
                                        && resultValue >= thrsld["iThresholdFromValue"]
                                        && resultValue <= thrsld["iThresholdToValue"]
                                    );
                                let strHeading = objFeedbackThresholdBySub["t_testDrive_Subject_FeedbackThreshold_Data"][0].vThresholdHeading;
                                if (strHeading == undefined || strHeading == null || strHeading.length == 0) {
                                    strHeading = "-";
                                }
                                objPupilTestResult.vResultText = strHeading;
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
                if (objLJTestRslt)
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

    GetColorForLearningTestResult(resultValue) {
        return resultValue <= 400 ? '#ECE264' : (resultValue > 400 && resultValue <= 600) ? '#AED3FF' : '#68D275'
    }

    /**
    * @name NavigateToOrientationTest
    * @param {object} objContext Passes Context object
    * @summary Navigates to TestResult modules
    */
    NavigateToOrientationTest(objContext) {
        //RouterHelper.RouteTo("Orientierungstest/TestResults?CycleId=8c880d36-6e8f-4ebb-a725-3c2f0f689dbf&IsOrientierungstest=Y&CycleIdToValidateTokens=f8a40091-18e0-45e4-b13f-659e5bd344db", objContext.props.history);
        RouterHelper.RouteTo("Orientierungstest/TestResults?IsOrientierungstest=Y", objContext.props.history);
    }

    /**
    * @name NavigateToHighStakeTest
    * @param {object} objContext Passes Context object
    * @summary Navigates to LearningTestSystem modules
    */
    NavigateToHighStakeTest(objContext) {
        //RouterHelper.RouteTo("TeacherLearningTest/TeacherLearningTestSystem?CycleId=0fddde67-6793-4093-9790-9e3611356c8b", objContext.props.history);
        RouterHelper.RouteTo("HighStakeRight/HighStakeTestResults?IsOrientierungstest=N", objContext.props.history);
    }

    /**
    * @name NavigateToOrientationTest
    * @param {object} objContext Passes Context object
    * @summary Shows and hides the AllPdf
    */
    ToggleAllPdf(objContext) {
        objContext.dispatch({ type: 'SET_STATE', payload: { blnShowAllPdf: !objContext.state.blnShowAllPdf } });
    }

    /**
    * @name DeleteGeneratedOfflineProcessExecution
    * @param {object} objContext Passes Context object
    * @param {String} strOfflinePropcessExecutionId Passes OfflinePropcessExecution Id
    * @summary Deletes the Excel file in the popup.
    */
    DeleteGeneratedOfflineProcessExecution(objContext, strOfflinePropcessExecutionId) {
        let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ProgressReportGeneration");
        let strOfflineProcessDefinitionId = objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"];
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

        let objParam = {
            ...objOfflineProcessExecutionParams,
            ["vDeleteData"]: [{ "uOfflineProcessExecutionId": strOfflinePropcessExecutionId }]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Cockpit_OfflineProcessExecution.DeleteData(objParam, (objReturnData) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
    * @name GetClassDropDownData
    * @param {Array} arrClassData Passes Class data
    * @param {object} objTextResource Text resources
    * @summary Forms the data required for Class dropdown
    * @returns {Array} returns the Class dropdown data
    */
    GetClassDropDownData(objContext, arrClassData, objTextResource) {
        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        arrClassData = arrClassData ? arrClassData : [];
        objTextResource = objTextResource ? objTextResource : {};
        let strTeacherId = objContext.props.ClientUserDetails.UserId;
        arrClassData.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"; }) };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsSubjectExpert === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
            }
        });
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
            }
        ];
        return arrFinalClassData;
    }

    /**
    * @name OpenConfirmationPopup
    * @param {object} objContext Context object
    * @param {object} objTextResource Text resources
    * @param {object} objSelectedClass Selected Class
    * @summary Opens the confirmation popup to create pdf. Upon Confirm it opens the progress bar and start the progress.
    */
    OpenConfirmationPopup(objContext, objTextResource, objSelectedClass) {
        let objPopupResoure = {
            ProgressReport_ConfirmText: Localization.TextFormatter(objTextResource, 'ConfirmText'),
            ProgressReport_ConfirmButtonText: Localization.TextFormatter(objTextResource, 'ConfirmBtnText'),
            ProgressReport_CloseButtonText: Localization.TextFormatter(objTextResource, 'CloseBtnText'),
            ProgressReport_Title: Localization.TextFormatter(objTextResource, 'ConfirmTitle')
        };

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                Height: "auto"
            },
            Resource: {
                Text: objPopupResoure,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "ProgressReport"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    Popup.ClosePopup(strPopupUniqueId);
                    setTimeout(() => { objContext.ProgressReport_ModuleProcessor.OpenProgressBarPopUp(objContext, objTextResource, objSelectedClass); }, 500);
                }
            },
            CallBacks: {}
        });
    }

    /**
    * @name OpenConfirmationPopup
    * @param {object} objContext Context object
    * @param {object} objTextResource Text resources
    * @param {object} objSelectedClass Selected Class
    * @summary Opens the progress bar popup to create pdf.
    */
    OpenProgressBarPopUp(objContext, objTextResource, objSelectedClass) {
        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                "ShowProgressStatus": "N",
                "HasCancelButton": "Y",
                "HasCloseButton": "N",
                "StartProgressOnLoad": true,
                "CloseProgessBarOnComplete": "Y"
            },
            "Resource": {
                "Text": {
                    ...objTextResource
                },
                "TextResourcesKey": "ProgressBar",
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            "Events": {
                "StartProgress": (strProgressBarId) => {
                    objContext.ProgressReport_ModuleProcessor.GenerateExcel(objContext, objSelectedClass, strProgressBarId);
                }
            },
            "CallBacks": {}
        });
    }

    /**
    * @name GenerateExcel
    * @param {object} objContext Context object
    * @param {object} objSelectedClass Selected class object
    * @param {String} strProgressBarID Progress bar id
    * @summary Calls the Api to generate progress report Excel
    */
    GenerateExcel(objContext, objSelectedClass, strProgressBarID) {
        let { state, props } = objContext;
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let uTeacherId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uTeacherId"];
        let objOrientationCycle = objContext.ProgressReport_ModuleProcessor.GetCycleObject(objContext, 'Orientation');
        let objLearningCycle = objContext.ProgressReport_ModuleProcessor.GetCycleObject(objContext, 'HighStake');
        let objHighStakeCycle = objContext.ProgressReport_ModuleProcessor.GetCycleObject(objContext, 'Learning');
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

        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Teacher_ProgressReport_Module.GenerateProgressReportExcel(objGenerateExcelParams, (objReturn) => {
            let arrExecutionData = DataRef(objReturn, "Extranet_Teacher_ProgressReport_Module")["Data"];
            let strEntity = "Object_Cockpit_OfflineProcess_OfflineProcessExecution";
            let strFilters = "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + uTeacherId + ";uOfflineProcessDefinitionId;" + arrExecutionData[0].uOfflineProcessDefinitionId;
            let storeParams = {
                Data: arrExecutionData,
                TimeStamp: "",
                PrimaryKeyName: "uOfflineProcessExecutionId",
                Count: arrExecutionData.length
            };
            Object_Cockpit_OfflineProcessExecution.AddOfflineProcessExecutionCache(strEntity, strFilters, storeParams, (objResponse) => {
                //objContext.dispatch({ type: "SET_STATE", payload: { "blnShowAllPdf": true } });
                //ApplicationState.SetProperty("blnShowAnimation", false);
            });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowAllPdf": true } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
    * @name GetCycleObject
    * @param {object} objContext Context object
    * @param {String} strType Type
    * @summary based on type passed forms the cycle object from cycle data
    * @returns {object} cycle object
    */
    GetCycleObject(objContext, strType) {
        let arrCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N")["Data"];
        let objCycle = {};
        if (strType === 'Orientation') {
            objCycle = arrCycle.find(x => x["iCycleTypeId"] == objContext.ProgressReport_ModuleProcessor.GetOrienationCycleTypeId());
        }
        if (strType === 'HighStake') {
            objCycle = arrCycle.find(x => x["iCycleTypeId"] == objContext.ProgressReport_ModuleProcessor.GetHighStakeCycleTypeId());
        }
        if (strType === 'Learning') {
            objCycle = arrCycle.find(x => x["iCycleTypeId"] == objContext.ProgressReport_ModuleProcessor.GetLearningCycleTypeId());
        }
        return objCycle;
    }

    /**
    * @name OpenPupilLearnProfilePopup
    * @param {object} objPupil Pupil object
    * @param {object} objTextResource Text resource object
    * @summary Opens the pupil learning profile popup
    */
    OpenPupilLearnProfilePopup(objPupil, objTextResource, objSelectedClass) {
        Popup.ShowPopup({
            Data: {
                objPupil: objPupil,
                objSelectedClass: objSelectedClass
            },
            Meta: {
                PopupName: 'PupilLearnProfilePopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "98%",
                Width: "98%"
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": []
        }
    }
}

export default ProgressReport_ModuleProcessor;