//Module object imports.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Test_ExtranetTest from '@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest';
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_TestApplication_LearningTestLoginAndResult from '@shared/Object/f.TestApplication/LearningTestLoginAndResult/LearningTestLoginAndResult';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';

/**
* @name PupilLearningTest_ModuleProcessor
* @summary Class for PupilLearningTest_ModuleProcessor module display and manipulate.
*/
class PupilLearningTest_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilLearningTest",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Test_ExtranetTest",
            "Object_Cockpit_MainClient_ClientSettings",
            "Object_Intranet_Cycle_Cycle",
            "Object_TestApplication_LearningTestLoginAndResult", "Object_Extranet_Teacher_SchoolYearPeriod"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let strClassId = this.GetClassId(props);
        let iStateId = this.GetStateId(props);
        let arrDataRequest = [];
        let strCycleTypeId = this.GetCycleTypeId();

        //Text Resource
        let arrResourcePath = ["/d.Extranet/4_Pupil/Modules/PupilLearningTest"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Subject
        let objSubjectParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
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

        //ExtranetTest
        let objExtranetTestParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "uPupilId": props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "iCycleTypeId": strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    }
                ]
            },
            iOffSet: 0,
            iInterval: 6000,
            cIsFilterBasedOnDate: 'N',
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "desc"
                    }
                }
            ]
        };
        Object_Intranet_Test_ExtranetTest.Initialize(objExtranetTestParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_ExtranetTest];

        //LearningTestLoginAndResult
        let objLearningTestLoginAndResult = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uPupilId": props.ClientUserDetails.UserId
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
        Object_TestApplication_LearningTestLoginAndResult.Initialize([objLearningTestLoginAndResult]);
        arrDataRequest = [...arrDataRequest, Object_TestApplication_LearningTestLoginAndResult];

        //Client Settings
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
        };
        Object_Cockpit_MainClient_ClientSettings.Initialize(objClientSettingsParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_ClientSettings];

        //Cycle
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
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        //SchoolYearPeriod
        let objSchoolYearPeriodParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilLearningTest/PupilLearningTest.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/WorkTest/CreateNewExercisePopUp/CreateNewExercisePopUp.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/WorkTest/ProgressReport/ProgressReport_SummaryPopup.css"
        ];
    }

    /**
     * @name GetClassId
     * @summay @summary returns the pupil class id.
     * @param {any} props
     */
    GetClassId(props) {
        //let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["cIsDeleted"] == "N");
        //return objClass["uClassId"];
        return ApplicationState.GetProperty("SelectedClassId");
    }

    /**
    * @name GetCycleTypeId
    * @summary returns the pupil class type id.
    * @returns {String} class type id
    */
    GetCycleTypeId() {
        return "3";
    }

    /**
     * to get data in display format
     * @param {object} objContext Context object
     * @param {Array} arrExtranetTestData Extranet Test Data
     * @param {Array} arrSubject Subject Data
     * @param {Array} arrTestLoginAndResult TestLogin and Result Data
     * @param {object} objMaxRoundDetails Max round details
     * @summary Forms the Formated Data from ExtranetTestData
     * @returns {Array} FormatedData
     */
    GetFormatedData(objContext, arrExtranetTestData, arrSubject, arrTestLoginAndResult, objMaxRoundDetails, objTextResource) {

        if (objMaxRoundDetails == undefined) {
            objMaxRoundDetails = {
                vValue: "3"
            };
        }

        let GetMode = (test) => {
            let strMode = '';
            let iTestUsageId = test.t_TestDrive_Test_TestProperty[0].iTestUsageId;
            if (iTestUsageId == "3") {
                strMode = test.t_TestDrive_Test_TestProperty[0].cIsSystemGenerated == "Y" ? Localization.TextFormatter(objTextResource, 'SystemGeneratedLearningTest') : Localization.TextFormatter(objTextResource, 'ManualLearningTest');

            } else if (iTestUsageId == "2") {
                strMode = "Low Stake";
            }
            return strMode;
        };

        let GetStatus = (test) => {
            let objStatus = {};
            if (test.t_TestDrive_Cycle_Pupil.length > 0) {
                let arrFilteredPupil = test.t_TestDrive_Cycle_Pupil.filter(x => x["uPupilId"] == objContext.props.ClientUserDetails.UserId);
                if (arrFilteredPupil.length > 0) {
                    let objFilteredPupil = arrFilteredPupil[0];
                    objStatus["cHasRoundCompleted"] = objFilteredPupil["cHasRoundCompleted"] == "Y" ? "Y" : "N";
                    objStatus["cNewTestAllowed"] = Number(objFilteredPupil["iRoundId"] ? objFilteredPupil["iRoundId"] : 0) < Number(objMaxRoundDetails.vValue) && objStatus["cHasRoundCompleted"] == "N" ? true : false;
                    objStatus["cRoundFinished"] = Number(objFilteredPupil["iRoundId"] ? objFilteredPupil["iRoundId"] : 0) < Number(objMaxRoundDetails.vValue) && objStatus["cHasRoundCompleted"] == "Y" ? true : false;
                    objStatus["cRoundsCompleted"] = objFilteredPupil["iRoundId"] ? objFilteredPupil["iRoundId"] : 0 == Number(objMaxRoundDetails.vValue) && objStatus["cHasRoundCompleted"] == "Y" ? true : false;
                    objStatus["cShowRoundComplete"] = objFilteredPupil["iRoundId"] ? objFilteredPupil["iRoundId"] : 0 == Number(objMaxRoundDetails.vValue) && objStatus["cHasRoundCompleted"] == "N" ? true : false;
                }
            }
            let objStatusToReturn = {
                strSatus: "NotStarted",
                vImgUrl: '',
                vResourceText: 'NotStarted',
                cHasRoundCompleted: objStatus["cHasRoundCompleted"],
                cNewTestAllowed: objStatus["cNewTestAllowed"],
                cShowRoundComplete: objStatus["cShowRoundComplete"],
                cManuallyCreated: test.t_TestDrive_Test_TestProperty[0].cIsSystemGenerated == "Y" ? false : true,

            };
            let objFirstToken = arrTestLoginAndResult.find(tlr => tlr["uTestId"] == test["uTestId"] && tlr["iCycleRepetition"] == "1");
            if (objStatus["cHasRoundCompleted"] != null && objStatus["cHasRoundCompleted"] == "Y") {
                objStatusToReturn.strSatus = 'Completed';
                objStatusToReturn.vResourceText = 'Completed';
            }
            else {
                let iTestUsageId = test.t_TestDrive_Test_TestProperty[0].iTestUsageId;
                if (test.t_TestDrive_Test_TestProperty[0].cIsSystemGenerated == "N") {
                    if (iTestUsageId == "2") {
                        if (objFirstToken != null && objFirstToken["TestExecution"] != null) {
                            if (objFirstToken["TestExecution"].length != 0 && objFirstToken["TestExecution"][0]["iTestStatusId"] == "5") {
                                objStatusToReturn.strSatus = 'Completed';
                                objStatusToReturn.vResourceText = 'Completed';
                            }
                            else {
                                objStatusToReturn.strSatus = 'Started';
                                objStatusToReturn.vResourceText = 'Started';
                            }
                        }
                        else {
                            objStatusToReturn.strSatus = 'NotStarted';
                            objStatusToReturn.vResourceText = 'NotStarted';
                        }
                    }
                    else if (iTestUsageId == "3") {
                        let arrTestRepitation = arrTestLoginAndResult
                            .filter(tlr => tlr["uTestId"] == test["uTestId"])
                            .sort((x, y) => { return Number(x["iCycleRepetition"]) - Number(y["iCycleRepetition"]); });
                        if (objFirstToken != null && objFirstToken["TestExecution"] != null) {
                            if (test["cIsSystemGenerated"] == "N"
                                && arrTestRepitation.length > 0
                                && arrTestRepitation.length >= 7
                                && arrTestRepitation[6]["TestExecution"].length != 0
                                && arrTestRepitation[6]["TestExecution"][0]["iTestStatusId"] == "5") {
                                objStatusToReturn.strSatus = 'Completed';
                                objStatusToReturn.vResourceText = 'Completed';
                            }
                            else {
                                if (objFirstToken["TestExecution"].length != 0 && objFirstToken["TestExecution"][0]["iTestStatusId"] == "5") {
                                    objStatusToReturn.strSatus = 'NotCompleted';
                                    objStatusToReturn.vResourceText = 'NotCompleted';
                                }
                                else {
                                    objStatusToReturn.strSatus = 'Started';
                                    objStatusToReturn.vResourceText = 'Started';
                                }
                            }
                        }
                        else {
                            objStatusToReturn.strSatus = 'NotStarted';
                            objStatusToReturn.vResourceText = 'NotStarted';
                        }
                    }
                }
                else {
                    if (objFirstToken != null && objFirstToken["TestExecution"] != null) {
                        if (objFirstToken["TestExecution"].length != 0 && objFirstToken["TestExecution"][0]["iTestStatusId"] == "5" && objStatus["cHasRoundCompleted"] == "N") {
                            objStatusToReturn.strSatus = 'NotCompleted';
                            objStatusToReturn.vResourceText = 'NotCompleted';
                        }
                        else {
                            objStatusToReturn.strSatus = 'Started';
                            objStatusToReturn.vResourceText = 'Started';
                        }
                    }
                    else {
                        objStatusToReturn.strSatus = 'NotStarted';
                        objStatusToReturn.vResourceText = 'NotStarted';
                    }
                }
            }
            return objStatusToReturn;
        };

        let GetNumberOfAttempts = (test) => {
            let objTestLoginResult = arrTestLoginAndResult.find(tlr => tlr["uTestId"] == test["uTestId"]);
            let iAttempts = 0;
            if (objTestLoginResult && objTestLoginResult.TestExecution && objTestLoginResult.TestExecution.length > 0 && objTestLoginResult.TestExecution[0])
                iAttempts = objTestLoginResult.TestExecution[0].iNoOfLoginAttempts;
            return iAttempts;
        };

        let GetRoundDetails = (test) => {
            let strRoundDetails = undefined;
            if (test.t_TestDrive_Cycle_Pupil.length > 0) {
                let arrFilteredPupil = test.t_TestDrive_Cycle_Pupil.filter(x => x["uPupilId"] == ClientUserDetails.UserId);
                if (arrFilteredPupil.length > 0) {
                    let objFilteredPupil = arrFilteredPupil[0];
                    strRoundDetails = "( " + " Rounde" + objFilteredPupil.iRoundId + "/" + objMaxRoundDetails.vValue + " )";
                }
            }
            return strRoundDetails;
        };

        let arrFormatedData = [];
        let arrFilteredExtranetTestData = [];
        if (arrExtranetTestData && arrExtranetTestData.length > 0) {
            arrFilteredExtranetTestData = arrExtranetTestData.filter(objTest => {
                return objTest["t_TestDrive_Cycle_Teacher"] && objTest["t_TestDrive_Cycle_Teacher"].length > 0 && objTest["t_TestDrive_Cycle_Teacher"][0]["cIsActive"] == "Y" && objTest["t_TestDrive_Cycle_Teacher"][0]["cIsDeleted"] == "N"
            })
        }
        if (arrFilteredExtranetTestData && arrFilteredExtranetTestData.length > 0) {
            arrFormatedData = arrFilteredExtranetTestData.map(test => {
                let objSubject = arrSubject.find(sub => {
                    return sub.iSubjectId == test.iSubjectId;
                });
                let objMainSubject = objSubject;
                if (objSubject.iParentSubjectId > 0) {
                    objMainSubject = arrSubject.find(sub => {
                        return sub.iSubjectId == objSubject.iParentSubjectId;
                    });
                }

                return {
                    uTestId: test.uTestId,
                    vTestName: test.vTestName,
                    dtCreatedOn: test.dtCreatedOn,
                    vSubjectName: objMainSubject.t_TestDrive_Subject_Data[0].vSubjectName,
                    iSubjectId: objMainSubject.iSubjectId,
                    cIsSystemGenerated: test.t_TestDrive_Test_TestProperty[0].cIsSystemGenerated,
                    iTestUsageId: test.t_TestDrive_Test_TestProperty[0].iTestUsageId,
                    vModeText: GetMode(test),
                    vRoundDetails: test["t_TestDrive_Test_TestProperty"][0]["cIsSystemGenerated"] == "Y" ? GetRoundDetails(test) : '',
                    iNumberOfAttempts: GetNumberOfAttempts(test),
                    objStatus: GetStatus(test)
                };
            });
        }


        return arrFormatedData;
    }
    /**
    * @name GetFilteredExtranetTestData
    * @param {object} objContext Context Object
    * @param {Array} arrExtranetTestData Extranet test data
    * @param {Array} arrSubject Subject data
    * @summary Filters the Test data based on the selections of the subject, sub subject and mode dropdowns.
    * @returns {Array} filtered Extranet test data
    */
    GetFilteredExtranetTestData(objContext, arrExtranetTestData, arrSubject) {
        let arrFilteredExtranetTestData = [];
        let arrSubSubjects = [];
        if (objContext.state.objSubject && objContext.state.objSubject.iSubjectId && objContext.state.objSubject.iSubjectId !== -1) {
            if (objContext.state.objSubSubject && objContext.state.objSubSubject.iSubjectId && objContext.state.objSubSubject.iSubjectId !== -1) {
                arrExtranetTestData.map((objTest) => {
                    if (objContext.state.objSubSubject.iSubjectId == objTest["iSubjectId"])
                        arrFilteredExtranetTestData = [...arrFilteredExtranetTestData, objTest];
                });
            } else {
                arrSubSubjects = arrSubject.filter(objSubject => { return objSubject["iParentSubjectId"] === objContext.state.objSubject.iSubjectId; });
                arrExtranetTestData.map((objTest) => {
                    arrSubSubjects.map((objSubSubject) => {
                        if (objSubSubject["iSubjectId"] == objTest["iSubjectId"])
                            arrFilteredExtranetTestData = [...arrFilteredExtranetTestData, objTest];
                    });
                });
            }
        } else {
            arrFilteredExtranetTestData = arrExtranetTestData;
        }

        if (objContext.state.objMode && objContext.state.objMode.value != "0") {
            if (objContext.state.objMode.value == "3") {
                if (objContext.state.objMode.cIsSystemGenerated == 'Y') {
                    arrFilteredExtranetTestData = arrFilteredExtranetTestData.filter(test => test.t_TestDrive_Test_TestProperty[0].cIsSystemGenerated == 'Y' && (test.t_TestDrive_Test_TestProperty[0].iTestUsageId == 3 || test.t_TestDrive_Test_TestProperty[0].iTestUsageId == "3"));
                } else {
                    arrFilteredExtranetTestData = arrFilteredExtranetTestData.filter(test => test.t_TestDrive_Test_TestProperty[0].cIsSystemGenerated == 'N' && (test.t_TestDrive_Test_TestProperty[0].iTestUsageId == 3 || test.t_TestDrive_Test_TestProperty[0].iTestUsageId == "3"));

                }
            } else { //for low stake
                arrFilteredExtranetTestData = arrFilteredExtranetTestData.filter(test => test.t_TestDrive_Test_TestProperty[0].cIsSystemGenerated == 'N' && (test.t_TestDrive_Test_TestProperty[0].iTestUsageId == 2 || test.t_TestDrive_Test_TestProperty[0].iTestUsageId == "2"));
            }
        }
        console.log("arrFilteredExtranetTestData", arrFilteredExtranetTestData);
        return arrFilteredExtranetTestData;
    }

    /**
    * @name OnClickSearch
    * @param {any} objContext Context Object
    * @summary updates the data load flag as false.
    */
    OnClickSearch(objContext) {
        let strCycleTypeId = objContext.PupilLearningTest_ModuleProcessor.GetCycleTypeId();
        let arrExtranetTestData = [];
        if (objContext.state.arrExtranetTestForSchoolYearPeriod == undefined)
            arrExtranetTestData = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uClassId;" + objContext.state.strClassId + ";uPupilId;" + objContext.props.ClientUserDetails.UserId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.strSchoolYearPeriodId)["Data"];
        else
            arrExtranetTestData = [...objContext.state.arrExtranetTestForSchoolYearPeriod];

        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"];
        let arrFilteredExtranetTestData = objContext.PupilLearningTest_ModuleProcessor.GetFilteredExtranetTestData(objContext, arrExtranetTestData, arrAllSubjects);
        objContext.dispatch({ type: 'SET_STATE', payload: { blnInitialDataLoaded: false, arrExtranetTest: arrFilteredExtranetTestData } });
    }

    /**
    * @name OnChangeWeekDisplay
    * @param {object} objContext Passes Context object
    * @param {object} objItem Item returned on change of week display.
    * @summary Executes when week display is changed
    */
    OnChangeWeekDisplay(objContext, objItem) {
        let strClassId = objContext.PupilLearningTest_ModuleProcessor.GetClassId(objContext.props);
        let strCycleTypeId = objContext.PupilLearningTest_ModuleProcessor.GetCycleTypeId();
        let strPupilId = objContext.props.ClientUserDetails.UserId;
        if (objContext.state.blnMakeCall) {
            let objExtranetTestParams = {
                "SearchQuery":
                {
                    "must": [
                        {
                            "match": {
                                "uClassId": strClassId
                            }
                        },
                        {
                            "match": {
                                "uPupilId": strPupilId
                            }
                        },
                        {
                            "match": {
                                "iCycleTypeId": strCycleTypeId
                            }
                        },
                        {
                            "match": {
                                "uSchoolYearPeriodId": objItem.uSchoolYearPeriodId
                            }
                        },
                        {
                            range: {
                                "dtFromDate": objItem.StartDate,
                                "dtToDate": objItem.EndDate,
                                "format": "yyyy-MM-dd'T'HH:mm:ss.SSS"
                            }
                        }
                    ]
                },
                iOffSet: 0,
                iInterval: 6000,
                cIsFilterBasedOnDate: 'N',
                "SortKeys": [
                    {
                        "dtCreatedOn": {
                            "order": "desc"
                        }
                    }
                ]
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Intranet_Test_ExtranetTest.FetchData(objExtranetTestParams, (objReturn) => {
                let arrExtranetTest = DataRef(objReturn.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uClassId;" + strClassId + ";uPupilId;" + strPupilId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objItem.uSchoolYearPeriodId)["Data"];
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: 'SET_STATE', payload: { blnInitialDataLoaded: false, arrExtranetTest: arrExtranetTest, arrExtranetTestForSchoolYearPeriod: arrExtranetTest, strSchoolYearPeriodId: objItem.uSchoolYearPeriodId } });
            });
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { objSchoolYear: objItem, blnMakeCall: true } });
    }

    /**
    * @name GetSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Subject dropdown
    */
    GetSubjectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data",
            DefaultOptionValue: -1,
            ShowDefaultOption: true,
            DefaultOptionTextKey: "DefaultSubjectDropdown_Text"
        };
    }

    /**
    * @name GetSubjectDropdownData
    * @param {object} objContext Context object
    * @param {Array} arrAllSubjects All Subject data
    * @summary Filters the main subject data from all subjects data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetSubjectDropdownData(objContext, arrAllSubjects) {
        let arrMainSubjects = arrAllSubjects.filter(subject => { return subject.iParentSubjectId == 0 && (subject.cIsReadyForManualLearningTest == "Y" || subject.cIsReadyForSystemLearningTest == "Y") });

        return {
            DropdownData: arrMainSubjects,
            SelectedValue: objContext.state.objSubject ? objContext.state.objSubject.iSubjectId : -1
        };
    }

    /**
    * @name GetSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Subject dropdown.
    * @returns {object} objEventBasics
    */
    GetSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.PupilLearningTest_ModuleProcessor.OnChangeSubjectDropDown(objContext, objItem)
        };
    }

    /**
    * @name OnChangeSubjectDropDown
    * @param {object} objContext Context Object
    * @param {object} objItem Item
    * @summary Triggers when the Subject dropdown selection changes
    */
    OnChangeSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { objSubject: objItem, objSubSubject: { ...objItem, iSubjectId: -1 } } });
    }

    /**
    * @name GetResourceData
    * @param {object} objTextResource Text Resource
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetResourceData(objTextResource) {
        let objText = {
            "DefaultSubjectDropdown_Text": Localization.TextFormatter(objTextResource, 'All'),
            "DefaultSubSubjectDropdown_Text": Localization.TextFormatter(objTextResource, 'All')//If DefaultOptionTextKey(in meta) is passed with the value "DefaultOptionTextKey_Text", then Dropdown will show "Default_Key_Text" as the default text insted of the value from "Default_Text"
        };
        let ImagePath = JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/angle_down_white.svg";
        return {
            Text: objText,
            ImagePath: ImagePath
        };
    }

    /**
    * @name GetSubSubjectDropdownMetaData
    * @summary Gets the meta data for Sub Subject dropdown
    * @returns {object} Meta data objects for Sub Subject dropdown
    */
    GetSubSubjectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data",
            DefaultOptionValue: -1,
            ShowDefaultOption: true,
            DefaultOptionTextKey: "DefaultSubSubjectDropdown_Text"
        };
    }

    /**
    * @name GetSubSubjectDropdownData
    * @param {object} objContext Context object
    * @param {Array} arrSubSubjects Sub Subject data
    * @summary Gets the data for Sub Subject dropdown
    * @returns {object} Meta objects for Sub Subject dropdown
    */
    GetSubSubjectDropdownData(objContext) {
        let intSubjectId = objContext.state.objSubject ? objContext.state.objSubject.iSubjectId : -1;
        let arrSubSubjects = [];
        if (intSubjectId === -1) {
            arrSubSubjects = [];
        } else {
            let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"];
            arrSubSubjects = arrAllSubjects.filter(objSubject => { return objSubject["iParentSubjectId"] === intSubjectId; });
        }
        return {
            DropdownData: arrSubSubjects,
            SelectedValue: objContext.state.objSubSubject ? objContext.state.objSubSubject.iSubjectId : -1
        };
    }

    /**
    * @name GetSubSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Sub Subject dropdown.
    * @returns {object} objEventBasics
    */
    GetSubSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.PupilLearningTest_ModuleProcessor.OnChangeSubSubjectDropDown(objContext, objItem)
        };
    }

    /**
    * @name OnChangeSubSubjectDropDown
    * @param {object} objContext Context Object
    * @param {object} objItem Item
    * @summary Triggers when the sub Subject dropdown selection changes
    */
    OnChangeSubSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSubSubject: objItem } });
    }

    /**
    * @name GetModesDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Modes dropdown
    */
    GetModesDropdownMetaData() {
        return {
            DisplayColumn: "key",
            ValueColumn: "id",
            IsLanguageDependent: "N"
        };
    }

    /**
    * @name GetModesDropdownData
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Modes dropdown.
    * @returns {object} Meta objects for Modes dropdown
    */
    GetModesDropdownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilLearningTest", objContext.props);
        objTextResource = objTextResource ? objTextResource : {};
        let arrModes = [
            { id: "0", key: objTextResource["ModesDropdownItem1"], value: "0", cIsSystemGenerated: 'N' },
            { id: "1", key: objTextResource["ModesDropdownItem2"], value: "3", cIsSystemGenerated: 'N' },
            { id: "2", key: objTextResource["ModesDropdownItem3"], value: "3", cIsSystemGenerated: 'Y' },
            { id: "3", key: objTextResource["ModesDropdownItem4"], value: "2", cIsSystemGenerated: 'N' }
        ];
        return {
            DropdownData: arrModes,
            SelectedValue: objContext.state.objMode ? objContext.state.objMode.id : arrModes[0].id//arrModes.length > 0 ? arrModes[0].value : "" //arrModes.length > 0 ? objContext.state.objMode ? objContext.state.objMode: arrModes[0].value : ""
        };
    }

    /**
    * @name GetModesDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Modes dropdown.
    * @returns {object} objEventBasics
    */
    GetModesDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.PupilLearningTest_ModuleProcessor.OnChangeModesDropDown(objContext, objItem)
        };
    }

    /**
    * @name OnChangeModesDropDown
    * @param {object} objContext Context Object
    * @param {object} objItem Item
    * @summary Triggers when the Modes dropdown selection changes
    */
    OnChangeModesDropDown(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objMode: objItem } });
    }

    /**
    * @name OpenStatisticsPopup
    * @param {object} objContext Context Object
    * @param {object} objTest Test
    * @param {object} objTextResource Text Resource object
    * @param {Boolean} blnIsLowStake True if the Test is Low stake otherwise false
    * @summary To open StatisticsPopup or LowStakeStatistic Popup   
    */
    OpenStatisticsPopup(objContext, objTest, objTextResource, blnIsLowStake = false) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objClassPupil = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["uClassId"] == strClassId);
        let strCycleTypeId = "3";// objContext.PupilLearningTest_ModuleProcessor.GetCycleTypeId();
        let arrExtranetTest = [];
        if (objContext.state.arrExtranetTest == undefined)
            arrExtranetTest = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uClassId;" + objContext.state.strClassId + ";uPupilId;" + objContext.props.ClientUserDetails.UserId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.strSchoolYearPeriodId)["Data"];
        else
            arrExtranetTest = [...objContext.state.arrExtranetTest];

        let objExtranetTest = arrExtranetTest.filter(x => x["uTestId"] == objTest["uTestId"])[0];
        //ApplicationState.SetProperty("blnShowAnimation", true);
        if (blnIsLowStake) {
            Popup.ShowPopup({
                Data: {
                    objTest: objTest,
                    objClassPupil: objClassPupil,
                    strCycleId: objContext.state.strCycleId,
                    strPupilId: objContext.props.ClientUserDetails.UserId,
                    'strSchoolYearPeriodId': objContext.state.objSchoolYear["uSchoolYearPeriodId"],
                    strUserName: objContext.props.ClientUserDetails.PupilDetails.vUserName,
                    objExtranetTest: objExtranetTest
                },
                Meta: {
                    PopupName: 'ProgressReport_LowStakeSummaryPopup', //low stake statistic popup
                    ShowHeader: false,
                    ShowCloseIcon: false,
                    Height: "98%",
                    Width: "98%",
                    CssClassName: 'low-stake-summary-popup',
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath
                },
                Events: {
                },
                CallBacks: {
                }
            });
        } else {
            Popup.ShowPopup({
                Data: {
                    objTest: objTest,
                    objClassPupil: objClassPupil,
                    strCycleId: objContext.state.strCycleId,
                    strPupilId: objContext.props.ClientUserDetails.UserId,
                    'strSchoolYearPeriodId': objContext.state.objSchoolYear["uSchoolYearPeriodId"],
                    strUserName: objContext.props.ClientUserDetails.PupilDetails.vUserName,
                    objExtranetTest: objExtranetTest
                },
                Meta: {
                    PopupName: 'ProgressReport_SummaryPopup', //statistic popup
                    ShowHeader: false,
                    ShowCloseIcon: false,
                    Height: "98%",
                    Width: "98%",
                    CssClassName: 'summary-popup',
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath
                },
                Events: {
                },
                CallBacks: {
                }
            });
        }
    }

    /**
    * @name OpenTestPopUp
    * @param {object} objTest Test
    * @param {object} objTextResource Text Resource
    * @summary To open TestPopup
    */
    OpenTestPopUp(objContext, objTest, objTextResource) {
        let objCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + this.GetCycleTypeId() + ";cIsActive;Y;cIsDeleted;N")["Data"][0];
        Popup.ShowPopup({
            Data: {
                'Username': objContext.props.ClientUserDetails.PupilDetails.vUserName,
                "iCycleRepetition": 1,
                'uCycleId': objCycle["uCycleId"],
                'uTestId': objTest["uTestId"],
                'uClassId': this.GetClassId(objContext.props),
                'uPupilId': objContext.props.ClientUserDetails.UserId,
                'uSchoolYearPeriodId': objContext.state.objSchoolYear["uSchoolYearPeriodId"],
                ModuleName: 'test-popup-parent'
            },
            Meta: {
                PopupName: 'TestPopUp',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "100%",
                Width: "100%",
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
        });
    }

    /**
    * @name GetStatusText
    * @param {object} objTextResource Text Resource
    * @param {String} strStatus Text Resource
    * @summary Gets the status text
    * @returns {String} Status Text
    */
    GetStatusText(objTextResource, strStatus) {
        if (strStatus == "NotStarted") {
            return Localization.TextFormatter(objTextResource, 'Start');
        } else if (strStatus == "Started") {
            return Localization.TextFormatter(objTextResource, 'Continue');
        } else if (strStatus == "Completed") { //when all rounds are completed
            return Localization.TextFormatter(objTextResource, 'Completed');
        } else { //when not all rounds are complted
            return Localization.TextFormatter(objTextResource, 'NotCompleted');
        }
    }

    GetWeekDisplayTitle(objContext, objTextResource) {
        let strReturnStatus = Localization.TextFormatter(objTextResource, 'CurrentExercisesAndExams');
        if (objContext.state.objSchoolYear != undefined && objContext.state.objSchoolYear.uSchoolYearPeriodId != objContext.state.strCurrentSchoolYearPeriodId) {
            strReturnStatus = Localization.TextFormatter(objTextResource, 'ExercisesAndExams');
        }
        return strReturnStatus;
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

    /**
    * @name GetStateId
    * @summary returns the iStateId
    * @param {any} props
    */
    GetStateId(props) {
        return props["ClientUserDetails"]["PupilDetails"]["t_TestDrive_Member_School_Pupil"][0]["iStateId"]
    }
}

export default PupilLearningTest_ModuleProcessor;