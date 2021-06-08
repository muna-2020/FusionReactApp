//Module object imports.
import Extranet_Pupil_PupilLearningTestStatistics_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestStatistics/PupilLearningTestStatistics_Module';
import PupilLearningTestRoundCreation_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestStatistics/PupilLearningTestRoundCreation_Module';
import Object_Intranet_Test_ExtranetTest from '@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest';

class PupilLearningTestStatistics_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Extranet_Pupil_PupilLearningTestStatistics_Module", "Object_TestApplication_LearningTestLoginAndResult"];
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
        let arrDataRequest = [];

        //TestStaticks
        let { objTest, objClassPupil, strCycleId, strPupilId } = props.Data;
        let objTestStaticksParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uTestId": objTest.uTestId
                        }
                    }
                ]
            },
            objData: {
                uTestId: objTest.uTestId,
                uClassId: objClassPupil.uClassId,
                uSchoolId: objClassPupil.uSchoolId,
                iStateId: objClassPupil.iStateId,
                uCycleId: strCycleId,
                uPupilId: strPupilId,
                uTeacherId: objClassPupil.uTeacherId,
                iTestUsageId: objTest.iTestUsageId
            }
        };

        Extranet_Pupil_PupilLearningTestStatistics_Module.Initialize(objTestStaticksParams);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_PupilLearningTestStatistics_Module];
        return arrDataRequest;
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/WorkTest/ProgressReport/ProgressReport_SummaryPopup.css"];
    }

    /**
    * @name OnClickSelectUnSelectAll
    * @param {object} objContext Context object
    * @param {Boolean} blnValue value
    * @summary performs select all or unselect all
    */
    OnClickSelectUnSelectAll(objContext, blnValue) {
        let arrTask = objContext.state.arrTaskData.map(tsk => {
            return {
                ...tsk,
                isSelected: blnValue
            };
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { arrTaskData: arrTask, blnAllTasks: blnValue } });
    }

    /**
    * @name OnClickCreateTest
    * @param {object} objContext Context object
    * @summary create new test    
    */
    OnClickCreateTest(objContext) {
        let { objTest, objClassPupil, strCycleId, strPupilId } = objContext.props.Data;
        let arriPageId = objContext.state.arrTaskData.filter(tsk => tsk["Rep1"] != "rightEmoji").map(tsk => { return { iPageId: tsk["iPageId"], vAction: "New" } });
        let objSaveParams = {
            ForeignKeyFilter: {},
            SearchQuery: {},
            vAddData:
            {
                uTestId: objTest.uTestId,
                uClassId: objClassPupil.uClassId,
                uSchoolId: objClassPupil.uSchoolId,
                iStateId: objClassPupil.iStateId,
                uCycleId: strCycleId,
                uPupilId: strPupilId,
                uTeacherId: objClassPupil.uTeacherId
            },
            vAssignTaskIds: arriPageId
        };

        let strkey = "Object_Intranet_Test_ExtranetTest;uClassId;" + objClassPupil.uClassId + ";uPupilId;" + strPupilId + ";iCycleTypeId;3;uSchoolYearPeriodId;";
        objContext.PupilLearningTestStatistics_ModuleProcessor.DataCallForSaveTest(objSaveParams, strkey, objContext);
    }

    /**
    * @name DataCallForSaveTest
    * @param {object} objSaveParams Save param object
    * @param {String} strkey strkey
    * @param {object} objContext Context object
    * @summary Fetches the extranet test data and saves it in the store
    */
    DataCallForSaveTest(objSaveParams, strkey, objContext) {
        PupilLearningTestRoundCreation_Module.CreateTestRound(objSaveParams, (objReturn) => {
            console.log("create test summary", objReturn);
            let arrTaskData = DataRef(objReturn, "Object_Intranet_Test_ExtranetTest")["Data"];
            let objTaskData = {
                Filter: strkey,
                Value: {
                    Data: arrTaskData,
                    TimeStamp: "",
                    PrimaryKeyName: "uTestId",
                    Count: arrTaskData.length
                }
            };
            ArcadixCacheData.AddData("Object_Intranet_Test_ExtranetTest", objTaskData, () => {
            });
            Popup.ClosePopup(objContext.props.Id);
        });
    }

    /**
     * @name OnClickSelectUnSelect
     * @param {object} objContext Context object
     * @param {Boolean} blnValue Value
     * @param {String} strPageId PageId
     * @summary check or uncheck the task  all checks make check of all select check box
     */
    OnClickSelectUnSelect(objContext, blnValue, strPageId) {
        let arrTask = objContext.state.arrTaskData.map(tsk => {
            if (strPageId == tsk.iPageId) {
                return {
                    ...tsk,
                    isSelected: blnValue
                };
            } else {
                return {
                    ...tsk
                };
            }
        });
        let objUnChecked = arrTask.find(tsk => tsk.isSelected == false);
        let blnAllTasks = true;
        if (objUnChecked)
            blnAllTasks = false;
        objContext.dispatch({ type: 'SET_STATE', payload: { arrTaskData: arrTask, blnAllTasks: blnAllTasks } });
    }

    /**
    * @name OnClickRepeatSelectedTasks
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource
    * @summary Opens the test popup.
    */
    OnClickRepeatSelectedTasks(objContext, objTextResource) {
        let arrTaskToInclude = [];
        objContext.state.arrTaskData.map(tsk => {
            if (tsk["isSelected"]) {
                arrTaskToInclude = [...arrTaskToInclude, tsk["iPageId"]]
            }
        })
        if (arrTaskToInclude.length > 0) {
            objContext.PupilLearningTestStatistics_ModuleProcessor.OpenTestPopUp(objContext, objTextResource, arrTaskToInclude);
        } else {
            Popup.ShowErrorPopup({
                Data: {
                },
                Meta: {
                    "ShowHeader": true,
                    "CssClassName": "pupillearningtest-error-popup",
                },
                Resource: {
                    Text: {
                        "ErrorPopup_ErrorText": objTextResource["ErrorMessage"],
                        "ErrorPopup_OkButtonText": objTextResource["Okay"],
                        "ErrorPopup_Title": objTextResource["Error"]
                    },
                    SkinPath: JConfiguration.ExtranetSkinPath,
                    TextResourcesKey: "ErrorPopup"
                },
                Events: {},
                CallBacks: {
                }
            });
        }
    }

    /**
    * @name OpenTestPopUp
    * @param {String} strTestLink TestLink
    * @summary open the test popup by provided link 
    */
    OpenTestPopUp(objContext, objTextResource, arrTaskToInclude) {
        let iCycleRepetition = this.GetCycleRepetition(objContext);
        Popup.ShowPopup({
            Data: {
                'Username': objContext.props.Data["strUserName"],
                "iCycleRepetition": iCycleRepetition,
                'uCycleId': objContext.props.Data["strCycleId"],
                'uTestId': objContext.props.Data.objTest["uTestId"],
                'uClassId': objContext.props.Data.objClassPupil["uClassId"],
                'uPupilId': objContext.props.Data["strPupilId"],
                'uSchoolYearPeriodId': objContext.props.Data["strSchoolYearPeriodId"],
                'TaskToInclude': arrTaskToInclude,
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
     * @name GetCycleRepetition
     * @summary returns the next repetiton number.
     * @param {any} objContext
     */
    GetCycleRepetition(objContext) {
        let iCycleRepetition = 1;
        let arrTestLoginAndResult = DataRef(objContext.props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;3;uPupilId;" + objContext.props.Data.strPupilId)["Data"]
        let arrFilteredTestLoginAndResult = arrTestLoginAndResult.filter(item => item["uTestId"] == objContext.props.Data.objTest["uTestId"]);
        arrFilteredTestLoginAndResult.map(item => {
            if (Number(item["iCycleRepetition"]) > iCycleRepetition) {
                iCycleRepetition = Number(item["iCycleRepetition"]);
            }
        })
        return (iCycleRepetition + 1);
    }

    /**
    * @name OpenCreateTestConfirmPopup
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource
    * @summary confirm popup for Create new test
    */
    OpenCreateTestConfirmPopup(objContext, objTextResource) {
        Popup.ShowPopup({
            Data: {
                onClickCreateTest: () => { objContext.PupilLearningTestStatistics_ModuleProcessor.OnClickCreateTest(objContext); }
            },
            Meta: {
                PopupName: 'CreateNewExercisePopUp',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "auto",
                Width: "480px"
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
    * @name CompleteRoundForManualLearningTest
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource
    * @summary Completes the round for Manual Learning Test
    */
    CompleteRoundForManualLearningTest(objContext, objTextResource) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objExtranetTest = { ...objContext.props.Data["objExtranetTest"] };
        objExtranetTest["t_testdrive_Test_Tasks"] = []; // if we send tasks in proc it will treat as new tasks so we need to send empty array.
        let arrFilteredPupil = objExtranetTest["t_TestDrive_Cycle_Pupil"].filter(x => x["uPupilId"] == objContext.props.Data["strPupilId"]);
        if (arrFilteredPupil.length > 0) {
            arrFilteredPupil[0]["cHasRoundCompleted"] = "Y"
        } else {
            objExtranetTest["t_TestDrive_Cycle_Pupil"].push({
                uCycleId: objExtranetTest["t_TestDrive_Cycle_Class"][0]["uCycleId"],
                uClassId: objExtranetTest["t_TestDrive_Cycle_Class"][0]["uClassId"],
                uPupilId: objContext.props.Data["strPupilId"],
                cIsByTeacher: "Y",
                iTestCategoryId: "",
                cIsActive: "Y",
                uParentTestId: "00000000-0000-0000-0000-000000000000",
                iRoundId: "",
                cIsArchive: "N",
                iTestPoints: "",
                cHasRoundCompleted: "Y",
                iRepitionId: "",
                cIsTestCreatedManually: "Y"
            });
        }
        let strClassId = objExtranetTest["t_TestDrive_Cycle_Pupil"][0]["uClassId"];
        let objEditData = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "uPupilId": global.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "iCycleTypeId": "3"
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    }
                ]
            },
            "uCycleId": objContext.props.Data.strCycleId,
            "uSchoolId": ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil[0]["uSchoolId"],
            "iStateId": ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil[0]["iStateId"],
            "vEditData": objExtranetTest
        }
        Object_Intranet_Test_ExtranetTest.EditData(objEditData, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            Popup.ClosePopup(objContext.props.Id);
        })
    }

    /**
    * @name OpenTaskImagePopUp
    * @param {object} objTextResource Text Resource
    * @param {object} objTask Task
    * @summary open  task image in opoup
    */
    OpenTaskImagePopUp(objTextResource, objTask) {
        let strImagePath = JConfiguration.WebDataPath + "Repo/Task/" + JConfiguration.MainClientId + "/" + [objTask.iPageId] + "_" + JConfiguration.InterfaceLanguageId + "_" + ([objTask.iPageFileVersion] || "1") + "_TaskBig.png";

        Popup.ShowPopup({
            Data: {
                vImageUrl: strImagePath
            },
            Meta: {
                PopupName: 'TaskImagePopUp',
                ShowHeader: false,
                ShowCloseIcon: false,
                CssClassName: 'task-image-popup',
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
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}

export default PupilLearningTestStatistics_ModuleProcessor;