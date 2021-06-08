//Module specific imports
import Object_Intranet_Test_ExtranetTest from '@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name LearningTestCreation_ModuleProcessor
 * @summary module processor for  TestStatistics
 * */
class TestStatistics_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Intranet_Taxonomy_Subject", "Object_Cockpit_MainClient_ClientSettings"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext passes Context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        this.GetInitialData(objContext);
        //(new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
   * @name GetDynamicStyles
   * @summary Css files specific to this module
   * @param {any} props
   * @returns {Array}
   */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestTeacher/LearningTestTeacherPopups/TestStatistics/TestStatistics.css"
        ];
    }


    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    GetInitialData({ props, dispatch }) {
        ArcadixFetchData.Execute(this.GetRequestsObjects(props), (objResponse) => {
            console.log("Extranet_Teacher_TeacherLearningTestManualStatistics_Module", objResponse)
            let objStatisticsData = objResponse["Extranet_Teacher_TeacherLearningTestManualStatistics_Module"]["Data"][0];
            let arrTaskData = DataRef(objResponse.Object_Intranet_Task_Task)["Data"];
            let arrDifficultyLevelData = DataRef(objResponse.Object_Intranet_Task_TaskDifficultyLevel)["Data"];
            dispatch({
                type: "SET_STATE", payload: {
                    isLoadComplete: true,
                    arrTaskData: objStatisticsData.TaskData,
                    arrTaskDifficultyLevelData: arrDifficultyLevelData, arrAllTaskData: arrTaskData, arrPupilData: objStatisticsData.PupilData,
                    arrCategoryData: objStatisticsData.CategoryData,
                    arrCategoryCompetencyData: objStatisticsData.CategoryCompetencyData,
                    arrPupilTaskStatusData: objStatisticsData.PupilTaskStatus,
                    arrTaskDropdownData: objStatisticsData.TaskData,
                    objSelectedTask: objStatisticsData.TaskData[0],
                }
            })
        })
    };

    /**
     * @name GetRequestsObjects
     * @summary returns the data load object.
     * @param {any} props
     */
    GetRequestsObjects(props) {
        let { objTestDetails } = props.Data.objTestDisplayData;
        let objTeacherDetails = props.Data.objTeacherDetails.t_TestDrive_Member_Teacher_School[0];

        let objTestStaticsParams = {
            "SearchQuery": {
            },
            objData: {
                uTestId: objTestDetails.uTestId,
                uClassId: props.Data.objTestDisplayData.objClassDetails.uClassId,
                uSchoolId: objTeacherDetails.uSchoolId,
                iStateId: GetStateIdBasedOnSchool(objTeacherDetails.uSchoolId),
                uCycleId: props.Data.strCycleId,
                uPupilId: objTeacherDetails.uPupilId,
                uTeacherId: objTeacherDetails.uTeacherId,
                iTestUsageId: objTestDetails.iTestUsageId,
                objTest: objTestDetails
            }
        };

        let arrShouldKeys1 = this.GetShouldKeysForCategoryComepetency(props);
        let arrShouldKeys2 = this.GetShouldKeysForFolderId(props);
        let arrShouldKeys = [...arrShouldKeys1, ...arrShouldKeys2];
        let objTaskParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    },
                    {
                        "match": {
                            "iTaskTypeId": 1
                        }
                    },
                    {
                        "match": {
                            "iTaskUsageId": 1
                        }
                    },
                    {
                        "match": {
                            "iSubjectId": objTestDetails.iSubjectId
                        }
                    },
                    {
                        "nested": {
                            "path": "t_CMS_Page_AssignedWorkflowStatus",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_CMS_Page_AssignedWorkflowStatus.cIsLatest": "Y"
                                            }
                                        },
                                        {
                                            "match": {
                                                "t_CMS_Page_AssignedWorkflowStatus.uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ],
                "must_not": [
                    {
                        "match": {
                            "iCategoryCompetencyId": -1
                        }
                    },
                    {
                        "match": {
                            "cIsForInternalTesting": "Y"
                        }
                    }
                ],
                "should": arrShouldKeys
            },
            "OutputColumns": [
                "iPageId",
                "vPageName",
                "iSubjectId",
                "iCategoryId",
                "iTaskTypeId",
                "t_TestDrive_Task_AssignedTaskDifficultyLevel",
                "iPageFileVersion",
                "dtModifiedOn"
            ]
        };


        let strStatiticksUrl = "";
        if (objTestDetails.iTestUsageId == 3) {
            strStatiticksUrl = "API/Extranet/Teacher/TeacherLearningTest/TeacherLearningTestManualStatistics_Module/GetLearningTestStatistics";
        } else {
            strStatiticksUrl = "API/Extranet/Teacher/TeacherLearningTest/TeacherLearningTestManualStatistics_Module/GetLowStakeTestStatistics";
        };


        let objTaskDifficultyLevelParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        let arrParams = [
            {
                "URL": strStatiticksUrl,
                "Params": objTestStaticsParams
            },
            {
                "URL": "API/Object/Intranet/Task/Task/GetTaskFromCache",
                "Params": objTaskParams
            },
            {
                "URL": "API/Object/Intranet/Task/TaskDifficultyLevel",
                "Params": objTaskDifficultyLevelParams,
                "MethodType": "GET"
            }
        ]

        return arrParams;
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData(objContext) {
        return {
            HeaderIds: [`EditorPopup_Header_Id${objContext.props.modalUId}`, "TestStatisticsHeader", "TestStatisticsTabsHeader", "ulBlock"],
            FooterIds: [`EditorPopup_Footer_Id${objContext.props.modalUId}`, "test-statistics-popup-footer"]
        };
    }

    /**
    * @name GetActionDropdownMetaData
    * @summary Gets the meta data for Action dropdown
    * @returns {object} Meta data objects for Action dropdown
    */
    GetActionDropdownMetaData(objContext) {
        return {
            "DisplayColumn": "vName",
            "ValueColumn": "Id"
        };
    }

    /**
    * @name GetActionDropdownData
    * @param {object} objContext Context object
    * @summary Gets the data for Action dropdown contains Edit and Delete actions
    * @returns {object} Meta objects for Pupil Action
    */
    GetActionDropdownData(objContext, objTextResource) {
        let arrActionDropDownData = [
            { Id: 1, vName: Localization.TextFormatter(objTextResource, 'StatisticksPopup_DropDownValue1') },
            { Id: 2, vName: Localization.TextFormatter(objTextResource, 'StatisticksPopup_DropDownValue2') },
            { Id: 3, vName: Localization.TextFormatter(objTextResource, 'StatisticksPopup_DropDownValue3') }
        ];
        return {
            DropdownData: arrActionDropDownData,
            SelectedValue: 1
        };
    }

    /**
    * @name GetActionDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Action dropdown.
    * @returns {object} objEventBasics
    */
    GetActionDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeActionDropDown(objContext, objItem)
        };
    }

    /**
    * @name GetTaskDropdownMetaData
    * @summary Gets the meta data for Task dropdown
    * @returns {object} Meta data objects for Task dropdown
    */
    GetTaskDropdownMetaData(objContext) {
        return {
            "DisplayColumn": "PageName",
            "ValueColumn": "iPageId"
        };
    }

    /**
    * @name GetTaskDropdownData
    * @param {object} objContext Context object
    * @summary Gets the data for Task dropdown
    * @returns {object} Meta objects for Task dropdown
    */
    GetTaskDropdownData(objContext, objTextResource) {
        return {
            DropdownData: objContext.state.arrTaskDropdownData,
            SelectedValue: objContext.state.arrTaskDropdownData.length > 0 ? objContext.state.arrTaskDropdownData[0].iPageId : ''
        };
    }

    /**
    * @name GetTaskDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for Task dropdown.
    * @returns {object} objEventBasics
    */
    GetTaskDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeTask(objContext, objItem)
        };
    }

    /**
   * @name GetResourceData
   * @summary Gets the resource data required for the dropdowns
   * @returns {object} object carrying the skin path
   */
    GetResourceData(objTextResource) {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
     * @name GetShouldKeysForCategoryComepetency
     * @summary returns the should category competencys
     * @param {any} props
     */
    GetShouldKeysForCategoryComepetency(props) {
        let { objTestDetails } = props.Data.objTestDisplayData;

        let arrCategoryComepetencyShouldKeys = [];
        objTestDetails.t_TestDrive_Test_Competency.map(objCatComp => {
            arrCategoryComepetencyShouldKeys = [...arrCategoryComepetencyShouldKeys,
            {
                "match": {
                    "iCategoryCompetencyId": objCatComp["iCategoryCompetencyId"]
                }
            }
            ]
        });
        return arrCategoryComepetencyShouldKeys;
    };

    /**
     * @name GetShouldKeysForFolderId
     * @param {*} objPopUpContext 
     * @summary   Returns the should keys with Folder id's data to add to task params and get task data.
     */
    GetShouldKeysForFolderId(props) {
        let arrFolderIds = this.GetFolderIds(props);
        let arrFolderIdShouldKeys = [];
        arrFolderIds.map(strTempId => {
            arrFolderIdShouldKeys = [...arrFolderIdShouldKeys,
            {
                "match": {
                    "iFolderId": strTempId
                }
            }
            ];
        });
        return arrFolderIdShouldKeys;
    };

    /**
    * @name GetFolderIds
    * @param {*} objContext 
    * @summary   Gets the folder ids from client settings and retuns the data as an array of strings.
    */
    GetFolderIds(props) {
        let arrFolderIdData = [];
        let arrData = DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings").Data;
        arrData = arrData.filter(objTempData => objTempData["vKey"] === "TaskFoldersForLearningTest");
        if (arrData.length > 0) {
            let strFolderIds = arrData[0]["vValue"];
            arrFolderIdData = strFolderIds.split(',');
        }
        return arrFolderIdData;
    };

    /**
     * @name GetTaskData
     * @summary Method reference for returning task data from state
     * @param {any} objPopUpContext
     */
    GetTaskData(objPopUpContext) {
        return [...objPopUpContext.state.arrAllTaskData];
    };

    /**
     * @name GetTaskDifficultyLevelDataWithTasks
     * @summary returns the tasks with Difficulty level.
     * @param {any} objContext
     */
    GetTaskDifficultyLevelDataWithTasks(objContext) {
        let arrTaskIds = objContext.state.arrTaskDropdownData.map(x => x["iPageId"]);
        //let arrSelectedTasks = objContext.state.arrTaskDropdownData.map(selTsk => {
        //    return objContext.state.arrAllTaskData.find(allTsk => allTsk["iPageId"] == selTsk["iPageId"])
        //});
        let arrSelectedTasks = objContext.state.arrAllTaskData.filter(allTsk => arrTaskIds.indexOf(allTsk["iPageId"].toString()) > -1);
        let arrData = objContext.state.arrTaskDifficultyLevelData.map(objTempData => {
            let arrTaskDataPerDifficultyLevel = arrSelectedTasks.filter(objTempTaskData =>
                objTempTaskData["t_TestDrive_Task_AssignedTaskDifficultyLevel"].filter(objTempAssignedTaskDifficultyLevelData =>
                    (objTempAssignedTaskDifficultyLevelData["iSchoolYearId"] === -1) &&
                    objTempAssignedTaskDifficultyLevelData["iTaskDifficultyLevelId"] === objTempData["iTaskDifficultyLevelId"]).length > 0);
            let intNumberOfTasks = arrTaskDataPerDifficultyLevel.length;
            return { ...objTempData, ["NoOfTasks"]: intNumberOfTasks, ["arrTaskDataPerDifficultyLevel"]: arrTaskDataPerDifficultyLevel };
        });
        let arrFilteredData = arrData.filter(d => d["NoOfTasks"] > 0)
        return arrFilteredData;
    };

    /**
     * @name ShowEditTasksPopup
     * @summary Opens the Edit task popup.
     * @param {any} objContext
     */
    ShowEditTasksPopup(objContext) {
        let { objTextResource } = objContext.props.Data;
        let { objTestDetails } = objContext.props.Data.objTestDisplayData;
        let arrSubSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N").Data.filter(objTempData => objTempData["iSubjectId"] === objTestDetails.iSubjectId);
        let objSubSubjectDetails = { ...arrSubSubjectData[0], ["t_TestDrive_Subject_Data"]: arrSubSubjectData[0]["t_TestDrive_Subject_Data"].filter(objTempData => objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)) };
        let { objClassDetails } = objContext.props.Data.objTestDisplayData;
        let arrData = this.GetTaskDifficultyLevelDataWithTasks(objContext);
        Popup.ShowPopup({
            Meta: {
                Height: "98%",
                Width: "98%",
                ShowHeader: false,
                PopupName: "EditTasks",
            },
            Events: {
                OnClickCreateTaskSet: (arrReturn) => {
                    this.GetStatisticksAfterEdit(objContext);
                },
                GetTaskData: () => {
                    return this.GetTaskData(objContext);
                }
            },
            Data: {
                EditSavedTasks: true,
                TextResource: objTextResource,
                ClientUserDetails: objContext.props.Data.ClientUserDetails,
                ClassDetails: objClassDetails,
                SelectedNumberOfTasksPerLevel: objContext.state.arrSelectedTasks,
                SubSubjectDetails: objSubSubjectDetails,
                SelectedNumberOfTasksPerLevel: arrData,
                TestId: objTestDetails["uTestId"],
                TestObject: objTestDetails,
                strCycleId: objContext.props.Data.strCycleId,
                LearningTestSkinId: objContext.props.Data.LearningTestSkinId,
                SkinName: objContext.props.Data.SkinName
            },
            CallBacks: {
            },
            popupClassName: "edit-tasks-parent"
        });
    };

    /**
     * @name GetStatisticksAfterEdit
     * @summary Gets the statistics after test tasks edit done.
     * @param {any} objContext
     */
    GetStatisticksAfterEdit(objContext) {
        let objStatisticksParam = this.GetRequestsObjects(objContext.props)[0];
        ArcadixFetchData.Execute([objStatisticksParam], (objResponse) => {
            let objStatisticsData = objResponse["Extranet_Teacher_TeacherLearningTestManualStatistics_Module"]["Data"][0];
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    arrTaskData: objStatisticsData.TaskData,
                    arrPupilData: objStatisticsData.PupilData,
                    arrCategoryData: objStatisticsData.CategoryData,
                    arrCategoryCompetencyData: objStatisticsData.CategoryCompetencyData,
                    arrPupilTaskStatusData: objStatisticsData.PupilTaskStatus,
                    arrTaskDropdownData: objStatisticsData.TaskData,
                    objSelectedTask: objStatisticsData.TaskData[0],
                }
            })
        });
    }

    /**
     * @name OnChangeTask
     * @summary Updates the selected task to state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeTask(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedTask: objItem } })
    }

    /**
     * @name FormCategoryDetails
     * @summary Forms the category details according to competency. 
     * @param {any} objContext
     * @param {any} objTest
     */
    FormCategoryDetails(objContext, objTest) {
        let arrData = [];
        for (let selCat of objTest.t_TestDrive_Test_Category) {
            let arrAllCompetency = objContext.state.arrCategoryCompetencyData.filter(catComp => selCat["iCategoryId"] == catComp["iCategoryId"])
            let objCategory = {
                objCategory: objContext.state.arrCategoryData.find(cat => selCat["iCategoryId"] == cat["iCategoryId"]),
                arrCategoryCompetency: []
            }
            for (let allComp of arrAllCompetency) {
                for (let selComp of objTest.t_TestDrive_Test_Competency) {
                    if (allComp["iCategoryCompetencyId"] == selComp["iCategoryCompetencyId"]) {
                        objCategory.arrCategoryCompetency = [...objCategory.arrCategoryCompetency, allComp]
                    }
                }
            }
            arrData = [...arrData, objCategory];
        }
        return arrData;
    }

    /**
     * @name OnChangeActionDropDown
     * @summary OnChange Action drop down calls the edit or delete method.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeActionDropDown(objContext, objItem) {
        let { objTestDetails, objStatus } = objContext.props.Data.objTestDisplayData;
        let strSelectedAction = objItem.Id;
        if (strSelectedAction === 2) {
            if (objStatus.strStatus == "NotStarted") {
                this.ShowEditTasksPopup(objContext);
            }
            else {
                strSelectedAction = 1;
            }
        }
        else if (strSelectedAction == "3") {
            this.OpenArchiveTestConfirmPopup(objContext, objTestDetails);
        }
    }

    /**
     * @name DeleteTest
     * @summary Deletes the test by making API call.
     * @param {any} objContext
     * @param {any} objTest
     */
    OpenArchiveTestConfirmPopup(objContext, objTest) {
        let { objTextResource } = objContext.props.Data;
        let objPopupTextResource = {
            Archive_ConfirmText: "",
            Archive_ConfirmButtonText: Localization.TextFormatter(objTextResource, 'Delete'),
            Archive_CloseButtonText: Localization.TextFormatter(objTextResource, 'Close'),
            Archive_Title: Localization.TextFormatter(objTextResource, 'ArchiveMessageHeader')
        };

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": false,
                Height: "auto",
                "CssClassName": "test-statistics-delete-popup",
            },
            Resource: {
                Text: objPopupTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "Archive"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    Popup.ClosePopup(strPopupUniqueId);
                    objContext.TestStatistics_ModuleProcessor.ArchiveTest(objContext, objTest);
                }
            },
            CallBacks: {}
        });


    }

    /**
     * @name ArchiveTest
     * @summary archives the test.
     * @param {any} objContext
     * @param {any} objTest
     */
    ArchiveTest(objContext, objTest) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objDeleteTestParams = {
            "uCycleId": objContext.props.Data.strCycleId,
            "uSchoolId": ClientUserDetails.TeacherDetails.uSchoolId,
            "iStateId": GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId),
            SearchQuery: {
                "must": [
                    {
                        "match": {
                            "iCycleTypeId": objContext.props.Data.strCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.props.Data.strSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": objContext.props.Data.ClientUserDetails.UserId
                        }
                    }
                ]
            },
            vDeleteData: {
                uTestId: objTest["uTestId"],
                TeacherTableAction: "Y",
                t_TestDrive_Cycle_Teacher: [{
                    cIsActive: "N",
                    cIsDeleted: "N",
                    cIsArchive: "Y"
                }]
            }
        }
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Intranet_Test_ExtranetTest.DeleteData(objDeleteTestParams, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            Popup.ClosePopup(objContext.props.Id);
        });
    }

    /**
    * @name ShowTaskImagePopup
    * @param {*} objContext 
    * @param {*} objTaskDetails 
    * @summary   Shows the task image poup when a selected task is clicked.
    */
    ShowTaskImagePopup(objContext, objTaskDetails) {
        //let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", objContext.props)
        let objTextResource = objContext.props.Data.objTextResource;
        Popup.ShowPopup({
            Meta: {
                Width: "880px",
                Height: "523px",
                ShowHeader: false,
                PopupName: "TaskImage",
                CssClassName: "task-popup"
            },
            Events: {},
            Data: {
                TextResource: objTextResource,
                TaskId: objTaskDetails.iPageId,
                ModuleName: 'learning-test-task-preview',
                LearningTestSkinId: objContext.props.Data.LearningTestSkinId,
                SkinName: objContext.props.Data.SkinName
            },
            CallBacks: {},
            popupClassName: "task-image-parent"
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

export default TestStatistics_ModuleProcessor 
