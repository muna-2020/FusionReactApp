//Module object imports.
import Extranet_Pupil_PupilLearningTestStatistics_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestStatistics/PupilLearningTestStatistics_Module';
import PupilLearningTestRoundCreation_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestStatistics/PupilLearningTestRoundCreation_Module';

class LowStakeTestStatistics_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Extranet_Pupil_PupilLearningTestStatistics_Module"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext passes Context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        //let objParam = {
        //    uTestId: objContext.props.Data.objTest.uTestId,
        //    uClassId: objContext.props.Data.objClassPupil.uClassId,
        //    iStateId: objContext.props.Data.objClassPupil.iStateId,
        //    uCycleId: objContext.props.Data.strCycleId,
        //    uTeacherId: objContext.props.Data.objClassPupil.uTeacherId,
        //    uSchoolId: objContext.props.Data.objClassPupil.uSchoolId,
        //    uPupilId: objContext.props.Data.strPupilId
        //   // objTest: objContext.props.Data.objTest
        //};
        //Extranet_Pupil_PupilLearningTestStatistics_Module.GetLowStakeTestStatistics(objParam, objReturnData => {
        //    console.log("objReturnData", objReturnData);
        //    objContext.dispatch({ type: "SET_STATE", payload: { "objTestStatistics": objReturnData["Extranet_Pupil_PupilLearningTestStatistics_Module"] } });
        //});
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

        //TestStatistics
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

        let strkey = "Object_Intranet_Test_ExtranetTest;uClassId;" + objClassPupil.uClassId + ";uPupilId;" + strPupilId + ";uCycleId;" + strCycleId;
        objContext.LowStakeTestStatistics_ModuleProcessor.DataCallForSaveTest(objSaveParams, strkey, objContext);
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
                },
                Resource: {
                    Text: {
                        "ErrorPopup_ErrorText": objTextResource["ErrorMessage"],
                        "ErrorPopup_OkButtonText": objTextResource["Okay"]
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
                ShowCloseIcon: false
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
                onClickCreateTest: () => { objContext.LowStakeTestStatistics_ModuleProcessor.OnClickCreateTest(objContext); }
            },
            Meta: {
                PopupName: 'CreateNewExercisePopUp',
                ShowHeader: false,
                ShowCloseIcon: false
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
                ShowCloseIcon: false
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

export default LowStakeTestStatistics_ModuleProcessor;