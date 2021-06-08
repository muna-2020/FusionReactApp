//Module specific imports
import Object_Extranet_Teacher_LearningTestPupilGroup from "@shared/Object/d.Extranet/3_Teacher/LearningTestPupilGroup/LearningTestPupilGroup";
import Object_Intranet_Taxonomy_CategoryCompetency from "@shared/Object/c.Intranet/6_Taxonomy/CategoryCompetency/CategoryCompetency";
import Object_TestApplication_TestResultAttributes from "@shared/Object/f.TestApplication/ResultCalculation/ResultAttributes/TestResultAttributes";
import Object_Extranet_Teacher_Class from "@shared/Object/d.Extranet/3_Teacher/Class/Class";
import Object_Extranet_Pupil_Pupil from "@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil";
import Object_Intranet_Taxonomy_Subject from "@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject";
import Object_Cockpit_MainClient_ClientSettings from "@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings";
import Object_Intranet_Taxonomy_Category from "@shared/Object/c.Intranet/6_Taxonomy/Category/Category";
import Object_Intranet_Test_ExtranetTest from "@shared/Object/c.Intranet/3_Test/Test/ExtranetTest/ExtranetTest";
import Object_Intranet_Task_TaskDifficultyLevel from "@shared/Object/c.Intranet/2_Task/Task/TaskDifficultyLevel/TaskDifficultyLevel";
import Object_Intranet_Task_Task from "@shared/Object/c.Intranet/2_Task/Task/Task";
import Object_Intranet_Test_IntranetTestTask from "@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTestTask/IntranetTestTask";
import Extranet_Teacher_Interpretation_Module from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation_Module";
import Object_Intranet_Task_TaskFolder from '@shared/Object/c.Intranet/2_Task/TaskFolder/TaskFolder';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';


/**
 * @name LearningTestCreation_ModuleProcessor
 * @summary module processor for  learning test creation.
 * */
class LearningTestCreation_ModuleProcessor extends ExtranetBase_ModuleProcessor {
    /**
     * @name StoreMapList
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_Teacher_LearningTestPupilGroup",
            "Object_TestApplication_TestResultAttributes",
            "Object_Intranet_Taxonomy_CategoryCompetency",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningTestTeacher",
            "Object_Extranet_Teacher_Class",
            "Object_Extranet_Pupil_Pupil",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Cockpit_MainClient_ClientSettings",
            "Object_Intranet_Taxonomy_Category", "Object_Intranet_Task_TaskFolder"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name GetDynamicStyles
     * @summary Css files specific to this module
     * @param {any} props
     * @returns {Array}
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath +
            "/Css/Application/3_Teacher/ReactJs/PC/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreation/LearningTestCreation.css",
        ];
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        //Text Resource
        let arrResourcePath = ["/d.Extranet/3_Teacher/Modules/LearningTestTeacher"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //class
        let objGetClassesParams = {
            ForeignKeyFilter: {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.Data.ClientUserDetails.UserId,
                Type: "nested",
            },
            SearchQuery: {
                must: [
                    {
                        nested: {
                            path: "t_TestDrive_Member_Class_Teacher",
                            query: {
                                bool: {
                                    must: [
                                        {
                                            match: {
                                                "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N",
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
            SortKeys: [],
            OutputColumns: [],
        };
        Object_Extranet_Teacher_Class.Initialize(objGetClassesParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //pupil
        let objPupilParams = {
            ForeignKeyFilter: {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                Type: "nested",
            },
            SearchQuery: {
                must: [
                    {
                        nested: {
                            path: "t_TestDrive_Member_Class_Pupil",
                            query: {
                                bool: {
                                    must: [
                                        {
                                            match: {
                                                "t_TestDrive_Member_Class_Pupil.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
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
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //subjects
        let objSubjectParams = {
            SearchQuery: {
                must: [
                    {
                        match: {
                            cIsReadyForManualLearningTest: "Y",
                        },
                    },
                    {
                        match: {
                            cIsActive: "Y",
                        },
                    },
                    {
                        match: {
                            cIsDeleted: "N",
                        },
                    },
                ],
            },
            SortKeys: [
                {
                    "iDisplayOrder": {
                        order: "asc",
                    },
                },
            ],
        };

        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //Client settings
        let objClientSettingsParams = {
            SearchQuery: {
                should: [
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        vParentKey: "ExtranetTeacher",
                                    },
                                },
                                {
                                    match: {
                                        vSubParentKey: "LearningTest",
                                    },
                                },
                                {
                                    match: {
                                        vKey: "NumberOfTasksForSystemGeneratedTest",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        vParentKey: "ExtranetTeacher",
                                    },
                                },
                                {
                                    match: {
                                        vSubParentKey: "LearningTest",
                                    },
                                },
                                {
                                    match: {
                                        vKey: "NumberOfRepetitionForSystemGeneratedTest",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        vParentKey: "ExtranetTeacher",
                                    },
                                },
                                {
                                    match: {
                                        vSubParentKey: "LearningTest",
                                    },
                                },
                                {
                                    match: {
                                        vKey: "TaskFoldersForLearningTest",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        vParentKey: "TestConfiguration",
                                    },
                                },
                                {
                                    match: {
                                        vSubParentKey: "Task",
                                    },
                                },
                                {
                                    match: {
                                        vKey: "LearningTestSkinId",
                                    },
                                },
                                {
                                    match: {
                                        iApplicationTypeId: 1,
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        };
        Object_Cockpit_MainClient_ClientSettings.Initialize(objClientSettingsParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_ClientSettings];

        //category competency.
        let objCategoryComeptency = {
            SearchQuery: {
                must: [
                    {
                        match: {
                            cIsDeleted: "N",
                        },
                    },
                ],
            },
        };
        Object_Intranet_Taxonomy_CategoryCompetency.Initialize(objCategoryComeptency);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_CategoryCompetency];

        //server side object is not there after creating server side object we need to implement.
        let objElementAttributeTemplatesParams = {
            SearchQuery: {
                must: [
                    {
                        match: {
                            cIsForWholeTask: "N",
                        },
                    },
                ],
            },
        };

        //Test Result attributes.
        let objTestResultAttributesParams = {
            SearchQuery: {
                must: [
                    {
                        match: {
                            vAttributeKey: "TestPoint",
                        },
                    },
                ],
            },
        };
        Object_TestApplication_TestResultAttributes.Initialize(objTestResultAttributesParams);
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestResultAttributes];

        let objLearningTestPupilGroup = {
            ForeignKeyFilter: {
                uUserId: props.Data.ClientUserDetails.UserId,
            },
        };

        Object_Extranet_Teacher_LearningTestPupilGroup.Initialize(objLearningTestPupilGroup);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_LearningTestPupilGroup];

        // category
        let objCategoryParams = {
            ForeignKeyFilter: {
                iSubjectId: props.Data.intSelectedSubSubjectId,
            },
            SearchQuery: {
                must: [
                    {
                        match: {
                            cIsDeleted: "N",
                        },
                    },
                ],
            },
            SortKeys: [
                {
                    "iDisplayOrder": {
                        order: "asc",
                    },
                },
            ],
        };

        Object_Intranet_Taxonomy_Category.Initialize(objCategoryParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Category];

        let objTaskFolderParams = {
            "SortKeys": [
                {
                    "vPageFolderName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["iPageFolderId", "iPageParentFolderId", "vPageFolderName"]
        };
        Object_Intranet_Task_TaskFolder.Initialize(objTaskFolderParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskFolder];
        return arrDataRequest;
    }

    /**
     * @name GetFillHeightMetaData
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetFillHeightMetaData(objContext) {
        return {
            HeaderIds: [`EditorPopup_Header_Id${objContext.props.modalUId}`, "LearningTestCreationHeader", "BreadCrumb"],
            FooterIds: [`EditorPopup_Footer_Id${objContext.props.modalUId}`, "learning-test-creation-footer", "edit-selected-tasks"]
        };
    }

    /**
     * @name GetSubjectDropdownMetaData
     * @summary Gets the meta data for Subject dropdown
     * @returns {object} Meta data objects for Pupil dropdown
     */
    GetSubjectDropdownMetaData(objContext) {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data",
            DefaultOptionValue: -1, //objContext.state.strParentSubjectId,
            ShowDefaultOption: true,
            DefaultOptionTextKey: "Choose",
        };
    }

    /**
     * @name GetSubjectDropdownData
     * @summary Gets the data for Subject dropdown
     * @param {any} objContext
     */
    GetSubjectDropdownData(objContext) {
        let arrSubjects = this.GetDefaultSubjects(objContext, "GetDataForDropdown");
        return {
            DropdownData: arrSubjects,
            SelectedValue: objContext.state.intSelectedParentSubjectId
        };
    }

    /**
     * @name GetSubjectDropdownEvents
     * @summary Returns object that contains all the Event methods for Subject dropdown.
     * @param {any} objContext
     */
    GetSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeSubjectDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetSubjectDropdownMetaData
     * @summary Gets the meta data for SubSubject dropdown
     * @returns {object} Meta data objects for Pupil dropdown
     */
    GetSubSubjectDropdownMetaData(objContext) {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data",
            DefaultOptionValue: -1, // objContext.state.intSelectedSubSubjectId,
            ShowDefaultOption: true,
            DefaultOptionTextKey: "Choose"
        };
    }

    /**
     * @name GetSubSubjectDropdownData
     * @summary Gets the data for SubSubject dropdown
     * @param {any} objContext
     */
    GetSubSubjectDropdownData(objContext) {
        let arrSubSubjects = this.GetSubSubjects(objContext, "GetDataForDropdown");
        return {
            DropdownData: arrSubSubjects,
            SelectedValue: objContext.state.intSelectedSubSubjectId
        };
    }

    /**
     * @name GetSubSubjectDropdownEvents
     * @summary Returns object that contains all the Event methods for SubSubject dropdown.
     * @param {any} objContext
     */
    GetSubSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeSubSubjectDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetModusDropdownMetaData
     * @summary Gets the meta data for Modus dropdown
     * @returns {object} Meta data objects for Pupil dropdown
     */
    GetModusDropdownMetaData() {
        return {
            DisplayColumn: "Key",
            ValueColumn: "Value",
            //"DefaultOptionValue": -1, //Pass the id of the default option text
            //"ShowDefaultOption": true, //when true shows the DefaultOptionText (from resource) in the Dropdown
            //"DefaultOptionTextKey": "All"
        };
    }

    /**
     * @name GetModusDropdownData
     * @summary Gets the data for Modus dropdown
     * @param {any} objContext
     * @param {any} objTextResource
     */
    GetModusDropdownData(objContext, objTextResource) {
        let arrModusData = [
            { Key: objTextResource["ModusDropdownItemFirst"], Value: 3 },//Lernen
            { Key: objTextResource["ModusDropdownItemSecond"], Value: 2 }//Prufen            
        ];
        return {
            DropdownData: arrModusData,
            SelectedValue: objContext.state.intSelectedModusId
        };
    }

    /**
     * @name GetModusDropdownEvents
     * @summary Returns object that contains all the Event methods for Modus dropdown.
     * @param {any} objContext
     */
    GetModusDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => this.OnChangeModusDropDown(objContext, objItem)
        };
    }

    /**
     * @name GetResourceData
     * @summary Gets the resource data required for the dropdowns
     * @returns {object} object carrying the skin path
     */
    GetResourceData(objTextResource) {
        let objText = {
            All: objTextResource["AllOptionText"],
            Choose: objTextResource["Choose"]
        };
        return {
            SkinPath: JConfiguration.ExtranetSkinPath,
            Text: objText
        };
    }

    /**
     * @name GetCategoryData
     * @summary gets the category data after subject drop changes.
     * @param {any} objContext
     */
    GetCategoryData(objContext) {
        let objCategoryParams = {
            ForeignKeyFilter: {
                iSubjectId: objContext.state.intSelectedSubSubjectId,
            },
            SearchQuery: {
                must: [
                    {
                        match: {
                            cIsDeleted: "N",
                        },
                    },
                ],
            },
        };
        Object_Intranet_Taxonomy_Category.GetData(objCategoryParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name GetPupilDataAfterClassChange
     * @summary loads the pupil data class change.
     * @param {any} objContext
     */
    GetPupilDataAfterClassChange(objContext) {
        let iStateId = GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        //pupil
        let objPupilParams = {
            ForeignKeyFilter: {
                "t_TestDrive_Member_Class_Pupil.uClassId": objContext.state.objSelectedClassData.uClassId,
                Type: "nested",
            },
            SearchQuery: {
                must: [
                    {
                        nested: {
                            path: "t_TestDrive_Member_Class_Pupil",
                            query: {
                                bool: {
                                    must: [
                                        {
                                            match: {
                                                "t_TestDrive_Member_Class_Pupil.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
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
        Object_Extranet_Pupil_Pupil.GetData(objPupilParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name GetTaskFoldersRecursively
     * @summary Gets All Task Folder Ids Data Recursively
     * @param {any} strParentFolderId  Parent Folder Id
     * @param {any} arrTaskFolderData Complete Task Folder Data
     * @param {any} arrTaskFolderIds List of Task Folder Id's
     */
    GetTaskFoldersRecursively(strParentFolderId, arrTaskFolderData, arrTaskFolderIds) {
        let strSubFolderId = "";
        let arrSubFodlers = arrTaskFolderData.filter(x => x["iPageParentFolderId"] == strParentFolderId);
        arrSubFodlers.forEach(objSubFolder => {
            strSubFolderId = objSubFolder["iPageFolderId"].ToString();
            if (!arrTaskFolderIds.includes(strSubFolderId)) {
                arrTaskFolderIds.push(strSubFolderId);
                this.GetTaskFoldersRecursively(strSubFolderId, arrJTaskFolders, arrTaskFolderIds);
            }
        });
    }

    /**
     * @name GetTasks
     * @param {*} objContext
     * @summary   Returns api call params for getting task data.
     */
    GetTasks(objContext) {
        let arrShouldKeys1 = this.GetShouldKeysForCategoryComepetency(objContext);
        let arrShouldKeys2 = this.GetShouldKeysForFolderId(objContext);
        let arrShouldKeys = [...arrShouldKeys1, ...arrShouldKeys2];
        let objSubjectMatchQuery = {
            match: {
                iSubjectId: objContext.state.intSelectedSubSubjectId
            }
        };

        if (objContext.state.blnIsNTCheckBoxSelected) {
            let arrSelctedNTParentFolderIds = objContext.state.arrSelectedCategoryId
            let arrTaskFolderIds = objContext.props.Object_Intranet_Task_TaskFolder.Data
                .filter(x => arrSelctedNTParentFolderIds.indexOf(x["iPageParentFolderId"]) > -1)
                .map(x => x["iPageFolderId"]);
            let arrTaskFolderIdCopyList = [...arrTaskFolderIds];
            arrTaskFolderIdCopyList.forEach(x => { this.GetTaskFoldersRecursively(x, objContext.props.Object_Intranet_Task_TaskFolder.Data, arrTaskFolderIds) });
            let arrShouldKeys = [];
            arrTaskFolderIds.forEach(x => {
                arrShouldKeys.push({
                    match: {
                        iFolderId: x
                    }
                });
            });
            objSubjectMatchQuery = {
                bool: {
                    should: arrShouldKeys
                }
            }
        }
        let objTaskParams = {
            SearchQuery: {
                must: [
                    {
                        match: {
                            cIsDeleted: "N",
                        },
                    },
                    {
                        match: {
                            iTaskTypeId: 1,
                        },
                    },
                    {
                        match: {
                            iTaskUsageId: 1,
                        },
                    },
                    objSubjectMatchQuery,
                    {
                        nested: {
                            path: "t_CMS_Page_AssignedWorkflowStatus",
                            query: {
                                match: {
                                    "t_CMS_Page_AssignedWorkflowStatus.cIsLatest": "Y",
                                },
                            },
                        },
                    },
                    {
                        nested: {
                            path: "t_CMS_Page_AssignedWorkflowStatus",
                            query: {
                                match: {
                                    "t_CMS_Page_AssignedWorkflowStatus.uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361",
                                },
                            },
                        },
                    },
                ],
                must_not: [
                    {
                        match: {
                            iCategoryCompetencyId: -1,
                        },
                    },
                    {
                        match: {
                            cIsForInternalTesting: "Y",
                        },
                    },
                ],
                should: arrShouldKeys,
            },
            OutputColumns: [
                "iPageId",
                "vPageName",
                "iSubjectId",
                "iCategoryId",
                "iTaskTypeId",
                "t_TestDrive_Task_AssignedTaskDifficultyLevel",
                "iPageFileVersion",
                "dtModifiedOn",
            ],
        };

        let arrDataRequest = [
            {
                URL: "API/Object/Intranet/Task/Task/GetTaskFromCache",
                Params: objTaskParams
            }
        ];

        ArcadixFetchData.Execute(arrDataRequest, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            let arrTasks = DataRef(objResponse.Object_Intranet_Task_Task)["Data"];
            objContext.dispatch({ type: "SET_STATE", payload: { arrTasks: arrTasks } });
        });
    }

    /**
     * @name GetShouldKeysForCategoryComepetency
     * @param {*} objContext
     * @summary   Returns the should keys with Copmetency Category data to add to task params and get task data.
     */
    GetShouldKeysForCategoryComepetency(objContext) {
        let arrCategoryComepetencyShouldKeys = [];
        objContext.state.arrSelectedCategoryCompetencyId.map((strTempId) => {
            arrCategoryComepetencyShouldKeys = [
                ...arrCategoryComepetencyShouldKeys,
                {
                    match: {
                        iCategoryCompetencyId: strTempId,
                    },
                },
            ];
        });
        return arrCategoryComepetencyShouldKeys;
    }

    /**
     * @name GetShouldKeysForFolderId
     * @param {*} objContext
     * @summary   Returns the should keys with Folder id's data to add to task params and get task data.
     */
    GetShouldKeysForFolderId(objContext) {
        let arrFolderIds = this.GetFolderIds(objContext);
        let arrFolderIdShouldKeys = [];
        arrFolderIds.map((strTempId) => {
            arrFolderIdShouldKeys = [
                ...arrFolderIdShouldKeys,
                {
                    match: {
                        iFolderId: strTempId,
                    },
                },
            ];
        });
        return arrFolderIdShouldKeys;
    }

    /**
     * @name CheckIfToShowCompileTasksPopup
     * @param {*} objContext
     * @summary   Checks if to show Manual Learning Test Intro Pop up on the basis user preference data.
     */
    CheckIfToShowCompileTasksPopup(objContext) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let arrPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(
            (objTempData) => objTempData["vKey"] === "ShowManualLearningTestIntroPopup"
        );
        if (arrPreferenceValue.length > 0 && arrPreferenceValue[0]["vValue"] === "N") {
            return false;
        } else {
            return true;
        }
    }

    /**
     * @name GetClassDropDownData
     * @summary Returns an array of classes to load in the drop down
     * @param {any} objContext
     * @param {any} objTextResource
     */
    GetClassDropDownData(objContext, objTextResource) {
        let arrTempClass = DataRef(
            objContext.props.Object_Extranet_Teacher_Class,
            "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" +
            objContext.props.Data.ClientUserDetails.UserId +
            ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N"
        ).Data.map((objClass) => {
            return {
                ...objClass,
                ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(
                    (objClassTeacher) => objClassTeacher.cIsDeleted === "N"
                ),
            };
        });
        let arrMainClassData = [],
            arrCoTeacherClassData = [],
            arrSubjectExpertClassData = [];
        arrTempClass.forEach((objClass) => {
            let objTempClassData = {
                ...objClass,
                ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter((objClassTeacher) => {
                    return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N";
                }),
            };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = {
                ...objClass,
                ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(
                    (objClassTeacher) => objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N"
                ),
            };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = {
                ...objClass,
                ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(
                    (objClassTeacher) => objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y"
                ),
            };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
            }
        });
        let arrFinalClassData = [
            {
                Title: objTextResource["ClassDropDownMainClassTitle"],
                Data: arrMainClassData,
            },
            {
                Title: objTextResource["ClassDropDownCoTeacherTitle"],
                Data: arrCoTeacherClassData,
            },
            {
                Title: objTextResource["ClassDropDownSubjectExpertTitle"],
                Data: arrSubjectExpertClassData,
            },
        ];
        return arrFinalClassData;
    }

    /**
     * @name GetPupilData
     * @param {*} objContext
     * @param {*} strToggleGetData //Filter
     * @param {*} strPupilId //Filter
     * @summary   Returns the pupil data on the basis of filter.
     */
    GetPupilData(objContext, strToggleGetData, strPupilId = "") {
        let strClassId =
            JSON.stringify(objContext.state.objSelectedClassData) === "{}"
                ? ApplicationState.GetProperty("SelectedClassId")
                : objContext.state.objSelectedClassData["uClassId"];
        let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
        let arrPupilData = [];
        switch (strToggleGetData) {
            case "GetDataForDropdown":
                let objTextResource = DataRef(
                    objContext.props.textresource,
                    "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher"
                ).Data[0]["LearningTestTeacher"];
                arrPupilData = arrTempPupilData.filter(
                    (objTempData) =>
                        objTempData["t_TestDrive_Member_Class_Pupil"].filter((objTempClassPupil) => objTempClassPupil["uClassId"] === strClassId)[0]
                            .cIsDeleted === "N"
                );
                let objAllOption = {
                    ...arrPupilData[0],
                    ["uPupilId"]: "00000000-0000-0000-0000-000000000000",
                    ["vFirstName"]: objTextResource["AllOptionText"],
                    ["vName"]: "",
                    ["t_TestDrive_Member_Class_Pupil"]: [],
                    ["t_TestDrive_Member_School_Pupil"]: [],
                };
                arrPupilData = [objAllOption, ...arrPupilData];
                break;
            case "GetSpecificData":
                arrPupilData = arrTempPupilData.filter((objTempData) => {
                    return (
                        objTempData["uPupilId"] === strPupilId &&
                        objTempData["t_TestDrive_Member_Class_Pupil"].filter((objTempClassPupil) => objTempClassPupil["uClassId"] === strClassId)[0]
                            .cIsDeleted === "N"
                    );
                });
                break;
            default:
                arrPupilData = arrTempPupilData.filter(
                    (objTempData) =>
                        objTempData["t_TestDrive_Member_Class_Pupil"].filter((objTempClassPupil) => objTempClassPupil["uClassId"] === strClassId)[0]
                            .cIsDeleted === "N"
                );
                break;
        }
        return arrPupilData;
    }

    /**
     * @name GetFolderIds
     * @param {*} objContext
     * @summary   Gets the folder ids from client settings and retuns the data as an array of strings.
     */
    GetFolderIds(objContext) {
        let arrFolderIdData = [];
        let arrData = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings").Data;
        arrData = arrData.filter((objTempData) => objTempData["vKey"] === "TaskFoldersForLearningTest");
        if (arrData.length > 0) {
            let strFolderIds = arrData[0]["vValue"];
            arrFolderIdData = strFolderIds.split(",");
        }
        return arrFolderIdData;
    }

    /**
     * @name GetDefaultSubjects
     * @param {*} objContext
     * @param {*} strToggleGetData //Filter
     * @param {*} iSubjectId //Filter
     * @summary   Gets the default subject data on the basis of filters
     */
    GetDefaultSubjects(objContext, strToggleGetData, iSubjectId = -1) {
        let arrSubjects = [];
        switch (strToggleGetData) {
            case "GetDataForDropdown":
                arrSubjects = DataRef(
                    objContext.props.Object_Intranet_Taxonomy_Subject,
                    "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N"
                ).Data.filter((objTempData) => objTempData["iParentSubjectId"] === 0);
                break;
            case "GetSpecificData":
                arrSubjects = DataRef(
                    objContext.props.Object_Intranet_Taxonomy_Subject,
                    "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N"
                ).Data.filter((objTempData) => objTempData["iParentSubjectId"] === 0 && objTempData["iSubjectId"] === iSubjectId);
                break;
            default:
                arrSubjects = DataRef(
                    objContext.props.Object_Intranet_Taxonomy_Subject,
                    "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N"
                ).Data.filter((objTempData) => objTempData["iParentSubjectId"] === 0);
                break;
        }
        return arrSubjects;
    }

    /**
     * @name GetSubSubjects
     * @param {*} objContext
     * @param {*} strToggleGetData //Filter
     * @param {*} iSubjectId //Filter
     * @summary   Gets the sub subject data on the basis of filters
     */
    GetSubSubjects(objContext, strToggleGetData, iSubjectId = -1) {
        let arrSubjects = [];
        switch (strToggleGetData) {
            case "GetDataForDropdown":
                let arrDefaultSubjects = this.GetDefaultSubjects(objContext, "GetDataForDropdown");
                let objPleaseSelectOption = { ...arrDefaultSubjects[0], ["iParentSubjectId"]: -1 };
                if (objContext.state.intSelectedParentSubjectId === -1) {
                    arrSubjects = DataRef(
                        objContext.props.Object_Intranet_Taxonomy_Subject,
                        "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N"
                    ).Data.filter((objTempData) => objTempData["iParentSubjectId"] === iSubjectId);
                    //arrSubjects = [objPleaseSelectOption, ...arrSubjects];
                } else if (objContext.state.blnIsNTCheckBoxSelected && objContext.state.intSelectedParentSubjectId == 7021) {
                    arrSubjects = [
                        {
                            "iSubjectId": 19398,
                            "t_TestDrive_Subject_Data": [
                                {
                                    "iLanguageId": 3,
                                    "vSubjectName": "7. Klasse"
                                }
                            ]
                        },
                        {
                            "iSubjectId": 19399,
                            "t_TestDrive_Subject_Data": [
                                {
                                    "iLanguageId": 3,
                                    "vSubjectName": "8. Klasse"
                                }
                            ]
                        }
                    ];
                } else {
                    arrSubjects = DataRef(
                        objContext.props.Object_Intranet_Taxonomy_Subject,
                        "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N"
                    ).Data.filter((objTempData) => objTempData["iParentSubjectId"] === objContext.state.intSelectedParentSubjectId);
                    //arrSubjects = [objPleaseSelectOption, ...arrSubjects];
                }
                break;
            case "GetSpecificData":
                if (objContext.state.blnIsNTCheckBoxSelected && objContext.state.intSelectedParentSubjectId == 7021) {
                    arrSubjects = [
                        {
                            "iSubjectId": 19398,
                            "t_TestDrive_Subject_Data": [
                                {
                                    "iLanguageId": 3,
                                    "vSubjectName": "7. Klasse"
                                }
                            ]
                        },
                        {
                            "iSubjectId": 19399,
                            "t_TestDrive_Subject_Data": [
                                {
                                    "iLanguageId": 3,
                                    "vSubjectName": "8. Klasse"
                                }
                            ]
                        }
                    ];
                } else {
                    arrSubjects = DataRef(
                        objContext.props.Object_Intranet_Taxonomy_Subject,
                        "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N"
                    ).Data.filter((objTempData) => objTempData["iSubjectId"] === iSubjectId);
                }
                break;
            case "GetForSubSubjectForParentSubjectId":
                arrSubjects = DataRef(
                    objContext.props.Object_Intranet_Taxonomy_Subject,
                    "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N"
                ).Data.filter((objTempData) => objTempData["iParentSubjectId"] === iSubjectId);
                break;
            default:
                arrSubjects = DataRef(
                    objContext.props.Object_Intranet_Taxonomy_Subject,
                    "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N"
                ).Data.filter((objTempData) => objTempData["iParentSubjectId"] === objContext.state.intSelectedParentSubjectId);
                break;
        }
        return arrSubjects;
    }

    /**
     * @name GetClassDetails
     * @param {*} objContext
     * @param {*} strClassId
     * @summary   Returns the class object for the class id. If the class id is not given it will take it from the application state.
     */
    GetClassDetails(objContext, strClassId = "") {
        if (strClassId === "") {
            strClassId = ApplicationState.GetProperty("SelectedClassId");
        }
        let strUserId = objContext.props.Data.ClientUserDetails.UserId;
        let arrClassData = DataRef(
            objContext.props.Object_Extranet_Teacher_Class,
            "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + strUserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N"
        ).Data.filter((objTempData) => objTempData["uClassId"] === strClassId);
        let objClassDetails = null;
        if (arrClassData.length > 0) {
            objClassDetails = arrClassData[0];
        }
        return objClassDetails;
    }

    /**
     * @name GetCategoryCompetencyData
     * @param {*} objContext
     * @param {*} intCategoryId
     * @summary   Returns an array of Competency Category data.
     */
    GetCategoryCompetencyData(objContext, intCategoryId) {
        let arrData = DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency, "Object_Intranet_Taxonomy_CategoryCompetency;cIsDeleted;N")
            .Data;
        let arrCategoryCompetencyData = [];
        arrData.forEach((objTempData) => {
            if (objTempData["iCategoryId"] === intCategoryId) {
                arrCategoryCompetencyData = [
                    ...arrCategoryCompetencyData,
                    {
                        ...objTempData,
                        ["t_TestDrive_Category_Competency_Data"]: objTempData["t_TestDrive_Category_Competency_Data"].filter(
                            (objTempCategoryCompetencyData) =>
                                objTempCategoryCompetencyData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
                        ),
                    },
                ];
            }
        });
        let arrCategoryCompetency = arrCategoryCompetencyData.filter((objTempData) => objTempData["t_TestDrive_Category_Competency_Data"].length > 0);
        return arrCategoryCompetency;
    }

    /**
     * @name GetLearningTestPupilGroupData
     * @param {*} objContext
     * @param {*} strToggle //Filter
     * @param {*} uPupilGroupId //Filter
     * @summary   Returns an array of Pupil Group Data on the basis of filter
     */
    GetLearningTestPupilGroupData(objContext, strToggle = "GetWholeClassData", uPupilGroupId = "") {
        let strClassId =
            JSON.stringify(objContext.state.objSelectedClassData) === "{}"
                ? ApplicationState.GetProperty("SelectedClassId")
                : objContext.state.objSelectedClassData["uClassId"];
        let strUserId = objContext.props.Data.ClientUserDetails.UserId;
        let arrData = DataRef(
            objContext.props.Object_Extranet_Teacher_LearningTestPupilGroup,
            "Object_Extranet_Teacher_LearningTestPupilGroup;uUserId;" + strUserId
        ).Data;
        let arrFinalData = [];
        switch (strToggle) {
            case "GetWholeClassData":
                arrFinalData = arrData.filter((objTempData) => {
                    return (
                        objTempData["uClassId"] === strClassId &&
                        objTempData["t_TestDrive_LearningTest_PupilGroup_Data"].filter(
                            (objTempPgpData) => objTempPgpData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
                        ).length > 0
                    );
                });
                break;
            case "GetSpecificGroupData":
                arrFinalData = arrData.filter((objTempData) => objTempData["uPupilGroupId"] === uPupilGroupId);
                break;
        }
        return arrFinalData;
    }

    /**
     * @name GetCurrentDate
     * @summary   Returns the current client side date.
     */
    GetCurrentDate() {
        let objDate = new Date();
        let intDate = objDate.getDate();
        let intMonth = objDate.getMonth() + 1;
        let intYear = objDate.getFullYear();
        let strFullDate = intDate + "." + intMonth + "." + intYear;
        return strFullDate;
    }

    /**
     * @name GetTestName
     * @param {*} objContext
     * @summary   Returns a Test Name.
     */
    GetTestName(objContext) {
        if (objContext.state.intSelectedParentSubjectId !== -1 && objContext.state.intSelectedSubSubjectId !== -1) {
            let strFullDate = this.GetCurrentDate();
            let arrParentSubjectDetails = this.GetDefaultSubjects(objContext, "GetSpecificData", objContext.state.intSelectedParentSubjectId);
            let objParentSubjectDataDetails = arrParentSubjectDetails[0]["t_TestDrive_Subject_Data"].filter(
                (objTempData) => objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
            )[0];
            let arrSubSubjectDetails = this.GetSubSubjects(objContext, "GetSpecificData", objContext.state.intSelectedSubSubjectId);
            let objSubSubjectDataDetails = arrSubSubjectDetails[0]["t_TestDrive_Subject_Data"].filter(
                (objTempData) => objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
            )[0];
            let strTestName = objParentSubjectDataDetails["vSubjectName"] + "-" + objSubSubjectDataDetails["vSubjectName"] + "-" + strFullDate;
            return strTestName;
        } else {
            return "";
        }
    }

    /**
     * @name GetTestCompetencyData
     * @param {*} objContext
     * @summary   Forms an array of json for selected competencies.
     */
    GetTestCompetencyData(objContext) {
        let TestCompetencyData = [];
        objContext.state.arrSelectedCategoryCompetencyId.forEach((intTempId) => {
            TestCompetencyData = [
                ...TestCompetencyData,
                {
                    iCategoryCompetencyId: intTempId,
                },
            ];
        });
        return TestCompetencyData;
    }

    /**
     * @name GetTestCategoryData
     * @param {*} objContext
     * @summary   Returns an array of Json for selected Category.
     */
    GetTestCategoryData(objContext) {
        let arrTestCategoryData = [];
        objContext.state.arrSelectedCategoryId.forEach((intTempId) => {
            arrTestCategoryData = [
                ...arrTestCategoryData,
                {
                    iCategoryId: intTempId,
                },
            ];
        });
        return arrTestCategoryData;
    }

    /**
     * @name GetCycleClassData
     * @param {*} objContext
     * @summary   Returns an array (Data/Empty) of the CycleClass sub table.
     */
    GetCycleClassData(objContext) {
        let arrReturnData = [];
        if (objContext.state.isSelectedClass) {
            let strClassId = objContext.state.SelectedClassId;
            let strCycleId = objContext.props.Data.strCycleId;
            arrReturnData = [
                {
                    uClassId: strClassId,
                    uCycleId: strCycleId,
                },
            ];
        }
        return arrReturnData;
    }

    /**
     * @name GetCyclePupilData
     * @param {*} objContext
     * @summary   Returns an array (Data/Empty) for Cycle Pupil Sub table.
     */
    GetCyclePupilData(objContext) {
        let strClassId =
            JSON.stringify(objContext.state.objSelectedClassData) === "{}"
                ? ApplicationState.GetProperty("SelectedClassId")
                : objContext.state.objSelectedClassData["uClassId"];
        let strCycleId = objContext.props.Data.strCycleId;
        let arrCyclePupilData = [];
        objContext.state.arrSelectedPupilForCreatingGroup.forEach((strTempPupilId) => {
            arrCyclePupilData = [
                ...arrCyclePupilData,
                {
                    uCycleId: strCycleId,
                    uClassId: strClassId,
                    uPupilId: strTempPupilId,
                    cIsByTeacher: "Y",
                    uParentTestId: "00000000-0000-0000-0000-000000000000",
                    cIsArchive: "N",
                },
            ];
        });
        return arrCyclePupilData;
    }

    /**
     * @name GetElementFormulaAttributeTemplateId
     * @param {*} objContext
     * @summary   Returns the uElementFormulaAttributeTemplateId.
     */
    GetElementFormulaAttributeTemplateId(objContext) {
        //let strElementFormulaAttributeTemplateId = "";
        //let arrElementFormulaAttributeTemplateData = DataRef(objContext.props.elementattributetemplates, "elementattributetemplates;cIsForWholeTask;N").Data;
        //if (arrElementFormulaAttributeTemplateData.length > 0) {
        //    strElementFormulaAttributeTemplateId = arrElementFormulaAttributeTemplateData[0]["uElementFormulaAttributeTemplateId"];
        //}
        return "B5AFFBAE-0062-449D-B926-7944D0A42C0A"; //strElementFormulaAttributeTemplateId;
    }

    /**
     * @name GetResultAttributeId
     * @param {*} objContext
     * @summary   Returns the uResultAttributeId.
     */
    GetResultAttributeId(objContext) {
        let intMainClientId = objContext.props.Data.ClientUserDetails.MainClientId;
        let strResultAttributeId = "";
        let arrData = DataRef(
            objContext.props.Object_TestApplication_TestResultAttributes,
            "Object_TestApplication_TestResultAttributes;vAttributeKey;TestPoint"
        ).Data;
        let arrResultAttributeData = arrData.filter((objTempData) => objTempData["iMainClientId"] == intMainClientId);
        if (arrResultAttributeData.length > 0) {
            strResultAttributeId = arrResultAttributeData[0]["uResultAttributeId"];
        } else {
            arrResultAttributeData = arrData.filter((objTempData) => objTempData["iMainClientId"] == 0);
            if (arrResultAttributeData.length > 0) {
                strResultAttributeId = arrResultAttributeData[0]["uResultAttributeId"];
            }
        }
        return strResultAttributeId == "" || undefined ? "00000000-0000-0000-0000-000000000000" : strResultAttributeId;
    }

    /**
     * @name GetSkinId
     * @param {*} objContext
     * @summary   Returns SkinId from client settings data.
     */
    GetSkinId(objContext) {
        let strSkinId = "";
        let arrData = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings").Data.filter(
            (objTempData) => objTempData["vKey"] == "LearningTestSkinId"
        );
        if (arrData.length > 0) {
            let objSkinId = arrData.find(x => x["iMainClientId"] == objContext.props.JConfiguration.MainClientId);
            if (objSkinId == undefined) {
                objSkinId = arrData[0];
            }
            strSkinId = objSkinId["vValue"];
        }
        return strSkinId == "" || undefined ? "00000000-0000-0000-0000-000000000000" : strSkinId;
    }

    /**
     * @name SaveLearningTest
     * @param {*} objContext
     * @summary   This methods forms and saves the Extranet Learning Test Data.
     */
    SaveLearningTest(objContext, objTestDataToSave) {
        let strClassId =
            JSON.stringify(objContext.state.objSelectedClassData) === "{}"
                ? ApplicationState.GetProperty("SelectedClassId")
                : objContext.state.objSelectedClassData["uClassId"];
        let strUserId = objContext.props.Data.ClientUserDetails.UserId;
        let strCycleId = objContext.props.Data.strCycleId;
        let strCycleTypeId = objContext.props.Data.strCycleTypeId;
        let strSchoolYearPeriodId = objContext.props.Data.strSchoolYearPeriodId;
        let objExtranetTestParams = {
            iOffSet: 0,
            iInterval: 6000,
            cIsFilterBasedOnDate: "N",
            uCycleId: strCycleId,
            uSchoolId: ClientUserDetails.TeacherDetails.uSchoolId,
            iStateId: GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId),
            SearchQuery: {
                must: [
                    {
                        match: {
                            iCycleTypeId: strCycleTypeId,
                        },
                    },
                    {
                        match: {
                            uClassId: strClassId,
                        },
                    },
                    {
                        match: {
                            uSchoolYearPeriodId: strSchoolYearPeriodId,
                        },
                    },
                    {
                        match: {
                            uTeacherId: strUserId,
                        },
                    },
                ],
            },
            vAddData: objTestDataToSave,
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Intranet_Test_ExtranetTest.AddData(objExtranetTestParams, (objResponse) => {
            Popup.ClosePopup(objContext.props.Id);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { OpenAddLearningTestPopup: false } });
        });
    }

    /**
     * @name OpenSurveyPopup
     * @param {object} objContext Context object
     * @param {Array} strAction Survey Question Data
     * @summary Opens the survey popup
     */
    AddLearningTestPopup(objContext, strAction) {
        let strClassId =
            JSON.stringify(objContext.state.objSelectedClassData) === "{}"
                ? ApplicationState.GetProperty("SelectedClassId")
                : objContext.state.objSelectedClassData["uClassId"];
        let strUserId = objContext.props.Data.ClientUserDetails.UserId;
        let strCycleId = objContext.props.Data.strCycleId;
        let arrTestCompetency = this.GetTestCompetencyData(objContext);
        let arrTestCategory = this.GetTestCategoryData(objContext);
        let arrCycleClass = this.GetCycleClassData(objContext);
        let arrCyclePupil = this.GetCyclePupilData(objContext);
        let strElementFormulaAttributeTemplateId = this.GetElementFormulaAttributeTemplateId(objContext);
        let strResultAttributeId = this.GetResultAttributeId(objContext);
        let strSkinId = this.GetSkinId(objContext);
        let objTestDataToSave = {
            iFolderId: -1,
            cIsDeleted: "N",
            iTestTypeId: objContext.state.intSelectedModusId == 3 ? 2 : 1,
            iSubjectId: objContext.state.blnIsNTCheckBoxSelected ? objContext.state.intSelectedParentSubjectId : objContext.state.intSelectedSubSubjectId,
            iAlgorithmId: 2,
            iProviderId: 1,
            iMainClientId: parseInt(objContext.props.Data.ClientUserDetails.MainClientId),
            uUserId: strUserId,
            vTestName: objContext.state.strTestName,
            iTestProgressDisplayId: 5, //Hard Coded for now, to be reviewed
            cIsSolutionAfterTask: "Y",
            uClassId: strClassId,
            cIsForInternalTesting: "N",
            iTestUsageId: objContext.state.intSelectedModusId,
            cIterateTillAllTaskCorrect: "N",
            uElementFormulaAttributeTemplateId: strElementFormulaAttributeTemplateId,
            uResultAttributeId: strResultAttributeId,
            uSkinId: strSkinId,
            cIsSystemGenerated: "N",
            cHasNTTheme: objContext.state.blnIsNTCheckBoxSelected ? "Y" : "N",
            t_TestDrive_Test_Competency: arrTestCompetency,
            t_TestDrive_Test_Category: arrTestCategory,
            t_TestDrive_Test_Language: [
                {
                    iLanguageId: parseInt(objContext.props.JConfiguration.InterfaceLanguageId),
                    cIsActivatedForTest: "Y",
                },
            ],
            t_TestDrive_Cycle_AssignedTest: [
                {
                    uCycleId: strCycleId,
                },
            ],
            t_TestDrive_Cycle_Class: arrCycleClass,
            t_TestDrive_Cycle_Pupil: arrCyclePupil,
            t_testdrive_Test_Tasks: this.GetTasksForSave(objContext),
        };

        if (strAction == "Cancel") {
            objContext.dispatch({ type: "SET_STATE", payload: { OpenAddLearningTestPopup: false } });
        } else if (strAction == "Archieve") {
            objTestDataToSave = {
                ...objTestDataToSave,
                t_TestDrive_Cycle_Teacher: [
                    {
                        uTeacherId: strUserId,
                        uCycleId: strCycleId,
                        cIsActive: "N",
                        cIsDeleted: "N",
                        iTestCategoryId: 0, //ask sanjay
                        cIsArchive: "Y",
                    },
                ],
            };
            objContext.LearningTestCreation_ModuleProcessor.SaveLearningTest(objContext, objTestDataToSave);
        } else {
            //active
            objTestDataToSave = {
                ...objTestDataToSave,
                t_TestDrive_Cycle_Teacher: [
                    {
                        uTeacherId: strUserId,
                        uCycleId: strCycleId,
                        cIsActive: "Y",
                        cIsDeleted: "N",
                        iTestCategoryId: 0, //ask sanjay
                        cIsArchive: "N",
                    },
                ],
            };
            objContext.LearningTestCreation_ModuleProcessor.SaveLearningTest(objContext, objTestDataToSave);
        }
    }

    /**
     * @name GetTasksForSave
     * @param {*} objContext
     * @param {*} arrTestData
     * @param {*} strTestId
     * @summary   This methods saves Task. The test id is provied oned the test is saved. So this will be only saved ones the test is saved.
     */
    GetTasksForSave(objContext) {
        if (objContext.state.arrSelectedTasks.length > 0) {
            let arrDataToSave = [];
            let iOrder = 0;
            objContext.state.arrSelectedTasks.forEach((objTempData) => {
                objTempData["arrTaskDataPerDifficultyLevel"].forEach((objTemptaskData) => {
                    ++iOrder;
                    arrDataToSave = [
                        ...arrDataToSave,
                        {
                            iPageId: objTemptaskData["iPageId"],
                            iOrderId: iOrder,
                        },
                    ];
                });
            });
            return arrDataToSave;
        }
    }

    /**
     * @name CheckIfAllRequiredFieldsAreSelectedToGoToTaskSelection
     * @param {*} objContext
     * @summary   Checks if all required fields are selected before continuing for task selection pop up.
     */
    CheckIfAllRequiredFieldsAreSelectedToGoToTaskSelection(objContext) {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData(
            "/d.Extranet/3_Teacher/Modules/LearningTestTeacher",
            objContext.props
        );
        let iStateId = GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let objValidation = {};
        if (objContext.state.intSelectedParentSubjectId !== -1) {
            if (objContext.state.intSelectedSubSubjectId !== -1) {
                if (objContext.state.arrSelectedCategoryCompetencyId.length > 0 || objContext.state.blnIsNTCheckBoxSelected) {
                    let strClassId =
                        JSON.stringify(objContext.state.objSelectedClassData) === "{}"
                            ? ApplicationState.GetProperty("SelectedClassId")
                            : objContext.state.objSelectedClassData["uClassId"];
                    let arrPupilData = DataRef(
                        objContext.props.Object_Extranet_Pupil_Pupil,
                        "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId
                    ).Data;
                    if ((objContext.state.SelectedClassId !== "" && arrPupilData.length > 0) || objContext.state.arrSelectedPupilForCreatingGroup.length > 0) {
                        objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
                    } else {
                        objValidation = {
                            strValidatedField: "PupilSelection",
                            strValidationMessage: objTextResource["LearningTestCreationPopupValidationMessagePupilNotSelected"],
                            blnShowValidation: true,
                        };
                    }
                } else {
                    objValidation = {
                        strValidatedField: "CategoryCompetencySelection",
                        strValidationMessage: objTextResource["LearningTestCreationPopupValidationMessageCompetencyLevelNotSelected"],
                        blnShowValidation: true,
                    };
                }
            } else {
                objValidation = {
                    strValidatedField: "div_SubSubjectDropDown",
                    strValidationMessage: objTextResource["LearningTestCreationPopupValidationMessageSubSubjectNotSelected"],
                    blnShowValidation: true,
                };
            }
        } else {
            objValidation = {
                strValidatedField: "div_SubjectDropDown",
                strValidationMessage: objTextResource["LearningTestCreationPopupValidationMessageSubejctNotSelected"],
                blnShowValidation: true,
            };
        }
        return objValidation;
    }

    /**
     * @name HandleDetermineBlock
     * @param {*} objContext
     * @summary   This is called when the continue button is clicked. It Checks the state.Tab value and then decides whether to show next tab or to save the data or do nothing.
     */
    HandleDetermineBlock(objContext) {
        if (objContext.state.Tab === 2) {
            let objValidationResult = this.CheckIfAllRequiredFieldsAreSelectedToGoToTaskSelection(objContext);
            if (!objValidationResult["blnShowValidation"]) {
                objContext.dispatch({ type: "SET_STATE", payload: { Tab: 3, strTestName: this.GetTestName(objContext) } });
            } else {
                objContext.dispatch({ type: "SET_STATE", payload: { objValidation: objValidationResult } });
            }
        } else if (objContext.state.Tab === 3 && objContext.state.arrSelectedTasks.length > 0 && objContext.state.strTestName !== "") {
            //this.SaveLearningTest(objContext);
            objContext.dispatch({ type: "SET_STATE", payload: { OpenAddLearningTestPopup: true } });
        }
    }

    /**
     * @name HandleTaskDetails
     * @param {*} objContext
     * @summary   Switches the tab. Change the value of state.Tab to 2.
     */
    HandleTaskDetails(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { Tab: 2 } });
    }

    /**
     * @name HandleClosePopup
     * @param {*} objContext
     * @summary   This is called when the ManualLearningTestIntroPopUp is closed or its proceed button is clicked.
     */
    HandleClosePopup(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { Tab: 2 } });
    }

    /**
     * @name GetTaskData
     * @param {*} objContext
     * Used by QuickSelection(LearningTestSettings) and ManualTaskSelection(EditTasks) Pop up to get the tasks.
     */
    GetTaskData(objContext) {
        //let arrTasks = DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;cIsDeleted;N;iTaskTypeId;1;iTaskUsageId;1;iSubjectIds;" + objContext.state.intSelectedSubSubjectId)["Data"];
        return [...objContext.state.arrTasks];
    }

    /**
     * @name ShowCreateGroupPopUp
     * @param {*} objContext
     * @summary   Shows the Create Group pop up.
     */
    ShowCreateGroupPopUp(objContext) {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData(
            "/d.Extranet/3_Teacher/Modules/LearningTestTeacher",
            objContext.props
        );
        if (objContext.state.arrSelectedPupilForCreatingGroup.length > 0) {
            let objClassDetails =
                JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? this.GetClassDetails(objContext) : objContext.state.objSelectedClassData;
            Popup.ShowPopup({
                Meta: {
                    Height: "98%",
                    Width: "98%",
                    ShowHeader: false,
                    PopupName: "LearningTestCreateGroup",
                },
                Data: {
                    SelectedPupilIds: objContext.state.arrSelectedPupilForCreatingGroup,
                    TextResource: objTextResource,
                    ClientUserDetails: objContext.props.Data.ClientUserDetails,
                    SelectedClass: objClassDetails,
                },
                CallBacks: {},
                popupClassName: "learningtestcreategroup-parent",
            });
            if (objContext.state.objValidation["strValidatedField"] === "CreateGroup") {
                let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
                objContext.dispatch({ type: "SET_STATE", payload: { objValidation: objValidation } });
            }
        } else {
            let objValidation = {
                strValidatedField: "CreateGroup",
                strValidationMessage: objTextResource["LearningTestCreationPopupSelectStudentToCreateGroupValidationMessage"],
                blnShowValidation: true,
            };
            objContext.dispatch({ type: "SET_STATE", payload: { objValidation: objValidation } });
        }
    }

    /**
     * @name ShowTaskImagePopup
     * @param {*} objContext
     * @param {*} objTaskDetails
     * @summary   Shows the task image poup when a selected task is clicked.
     */
    ShowTaskImagePopup(objContext, objTaskDetails) {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData(
            "/d.Extranet/3_Teacher/Modules/LearningTestTeacher",
            objContext.props
        );
        let objParam = {
            PageIdList: [objTaskDetails.iPageId],
            SearchQuery: {
                must: [
                    {
                        match: {
                            CompetencyKey: "TaskImage",
                        },
                    },
                ],
            },
        };
        Extranet_Teacher_Interpretation_Module.GetData(objParam, (objResponse) => {
            let arrClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")["Data"]
            let arrSkinData = arrClientSettings.filter(x => x["vParentKey"] == "TestConfiguration" && x["vSubParentKey"] == "Task" && x["vKey"] == "LearningTestSkinId");
            let strSkinId = "";
            let objSkin = arrSkinData.find(x => x["iMainClientId"] == objContext.props.JConfiguration.MainClientId);
            if (objSkin == undefined) {
                objSkin = arrSkinData[0];
            }
            strSkinId = objSkin["vValue"];
            Popup.ShowPopup({
                Meta: {
                    Height: "50%",
                    Width: "50%",
                    ShowHeader: false,
                    PopupName: "TaskImage",
                    "CssClassName": "taskImage-popup",
                },
                Events: {},
                Data: {
                    TextResource: objTextResource,
                    TaskId: objTaskDetails.iPageId,
                    PageJson: objResponse["Extranet_Teacher_Interpretation_Module;CompetencyKey;TaskImage"].Data[0].PageJson,
                    LearningTestSkinId: objContext.props.Data.LearningTestSkinId,
                    SkinName: objContext.props.Data.SkinName
                },
                CallBacks: {},
                popupClassName: "task-image-parent",
            });
        });
    }

    /**
     * @name ShowLearningTestTeacherSettingsPopup
     * @param {*} objContext
     * @summary   Shows QuickSelection(LearningTestSettings) Popup.
     */
    ShowLearningTestTeacherSettingsPopup(objContext) {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData(
            "/d.Extranet/3_Teacher/Modules/LearningTestTeacher",
            objContext.props
        );
        let iStateId = GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        //let arrTasks = DataRef(objContext.props.Object_Intranet_Task_Task, "Object_Intranet_Task_Task;cIsDeleted;N;iTaskTypeId;1;iTaskUsageId;1;iSubjectIds;" + objContext.state.intSelectedSubSubjectId)["Data"];
        if (objContext.state.arrTasks && objContext.state.arrTasks.length > 0) {
            let arrParentSubjectData = this.GetDefaultSubjects(objContext, "GetSpecificData", objContext.state.intSelectedParentSubjectId);
            let objParentSubjectDetails = {
                ...arrParentSubjectData[0],
                ["t_TestDrive_Subject_Data"]: arrParentSubjectData[0]["t_TestDrive_Subject_Data"].filter(
                    (objTempData) => objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
                ),
            };
            let arrSubSubjectData = this.GetSubSubjects(objContext, "GetSpecificData", objContext.state.intSelectedSubSubjectId);
            let objSubSubjectDetails = {
                ...arrSubSubjectData[0],
                ["t_TestDrive_Subject_Data"]: arrSubSubjectData[0]["t_TestDrive_Subject_Data"].filter(
                    (objTempData) => objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
                ),
            };
            let strModus =
                objContext.state.intSelectedModusId === 2 ? objTextResource["ModusDropdownItemFirst"] : objTextResource["ModusDropdownItemSecond"];
            let intCountForSelectedPupil = 0;
            let objClassDetails =
                JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? this.GetClassDetails(objContext) : objContext.state.objSelectedClassData;
            if (objContext.state.SelectedClassId === "") {
                intCountForSelectedPupil = objContext.state.arrSelectedPupilForCreatingGroup.length;
            } else {
                let strClassId = ApplicationState.GetProperty("SelectedClassId");
                let arrPupilData = DataRef(
                    objContext.props.Object_Extranet_Pupil_Pupil,
                    "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId
                ).Data;
                intCountForSelectedPupil = arrPupilData.length;
            }
            ApplicationState.SetProperty("blnShowAnimation", true);
            Popup.ShowPopup({
                Meta: {
                    PopupName: "LearningTestSettingsTeacher",
                    ShowHeader: false,
                    ShowCloseIcon: false,
                    Height: "98%",
                    Width: "98%",
                },
                Events: {
                    OnClickCreateTaskSet: (objReturn) => {
                        objContext.dispatch({
                            type: "SET_STATE",
                            payload: { arrSelectedTasks: objReturn["SelectedNumberOfTasksPerLevel"], strTestName: objReturn["TestName"] },
                        });
                    },
                    GetTaskData: () => {
                        return this.GetTaskData(objContext);
                    },
                },
                Data: {
                    TextResource: objTextResource,
                    TestName: objContext.state.strTestName,
                    ClientUserDetails: objContext.props.Data.ClientUserDetails,
                    ClassDetails: objClassDetails,
                    CountForSelectedPupil: intCountForSelectedPupil,
                    ParentSubjectDetails: objParentSubjectDetails,
                    SubSubjectDetails: objSubSubjectDetails,
                    strDate: this.GetCurrentDate(),
                    Modus: strModus,
                    SelectedNumberOfTasksPerLevel: objContext.state.arrSelectedTasks,
                    blnIsNTCheckBoxSelected: objContext.state.blnIsNTCheckBoxSelected,
                    blnIsNTSubjectSelected: objContext.state.intSelectedParentSubjectId == "7021"
                },
                CallBacks: {},
                popupClassName: "learningtestteachersettings",
            });
            if (objContext.state.objValidation["strValidatedField"] === "ShowLearingTestSettingsPopup") {
                let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
                objContext.dispatch({ type: "SET_STATE", payload: { objValidation: objValidation } });
            }
        } else {
            let objValidation = {
                strValidatedField: "ShowLearingTestSettingsPopup",
                strValidationMessage: objTextResource["LearningTestCreationPopupNoTaskAvailable"],
                blnShowValidation: true,
            };
            objContext.dispatch({ type: "SET_STATE", payload: { objValidation: objValidation } });
        }
    }

    /**
     * @name ShowEditTasksPopup
     * @param {*} objContext
     * @summary   Shows the ManualSelection(EditTasks) PopUp
     */
    ShowEditTasksPopup(objContext) {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData(
            "/d.Extranet/3_Teacher/Modules/LearningTestTeacher",
            objContext.props
        );
        if (objContext.state.arrTasks && objContext.state.arrTasks.length > 0) {
            let arrSubSubjectData = this.GetSubSubjects(objContext, "GetSpecificData", objContext.state.intSelectedSubSubjectId);
            let objSubSubjectDetails = {
                ...arrSubSubjectData[0],
                ["t_TestDrive_Subject_Data"]: arrSubSubjectData[0]["t_TestDrive_Subject_Data"].filter(
                    (objTempData) => objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
                ),
            };
            let objClassDetails =
                JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? this.GetClassDetails(objContext) : objContext.state.objSelectedClassData;
            ApplicationState.SetProperty("blnShowAnimation", true);

            Popup.ShowPopup({
                Meta: {
                    Height: "98%",
                    Width: "98%",
                    ShowHeader: false,
                    PopupName: "EditTasks",
                },
                Events: {
                    OnClickCreateTaskSet: (arrReturn) => {
                        objContext.dispatch({ type: "SET_STATE", payload: { arrSelectedTasks: arrReturn } });
                    },
                    GetTaskData: () => {
                        return this.GetTaskData(objContext);
                    },
                },
                Data: {
                    TextResource: objTextResource,
                    ClientUserDetails: objContext.props.Data.ClientUserDetails,
                    ClassDetails: objClassDetails,
                    SelectedNumberOfTasksPerLevel: objContext.state.arrSelectedTasks,
                    SubSubjectDetails: objSubSubjectDetails,
                    blnIsNTCheckBoxSelected: objContext.state.blnIsNTCheckBoxSelected,
                    blnIsNTSubjectSelected: objContext.state.intSelectedParentSubjectId == "7021",
                    LearningTestSkinId: objContext.props.Data.LearningTestSkinId,
                    SkinName: objContext.props.Data.SkinName
                },
                CallBacks: {},
                popupClassName: "edit-tasks-parent",
            });
            if (objContext.state.objValidation["strValidatedField"] === "ShowEditTasksPopup") {
                let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
                objContext.dispatch({ type: "SET_STATE", payload: { objValidation: objValidation } });
            }
        } else {
            let objValidation = {
                strValidatedField: "ShowEditTasksPopup",
                strValidationMessage: objTextResource["LearningTestCreationPopupNoTaskAvailable"],
                blnShowValidation: true,
            };
            objContext.dispatch({ type: "SET_STATE", payload: { objValidation: objValidation } });
        }
    }

    /**
     * @name OnChangeCheckBoxForCompetencyCategory
     * @param {*} objContext
     * @param {*} blnIsSelectAll
     * @param {*} iCategoryId
     * @param {*} blnIsChecked
     * @param {*} iCategoryCompetencyId
     * @summary   Sets the loacl state when the competency category check box is checked or unchecked.
     */
    OnChangeCheckBoxForCompetencyCategory(objContext, blnIsSelectAll, iCategoryId, blnIsChecked, iCategoryCompetencyId) {

        if (blnIsSelectAll) {
            let arrCategoryCompetencyData = this.GetCategoryCompetencyData(objContext, iCategoryId);
            let arrAllSelectedId = arrCategoryCompetencyData.map((objTempData) => {
                return objTempData["iCategoryCompetencyId"];
            });
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    arrSelectedCategoryId: [...objContext.state.arrSelectedCategoryId, iCategoryId],
                    arrSelectedCategoryCompetencyId: [...objContext.state.arrSelectedCategoryCompetencyId, ...arrAllSelectedId],
                },
            });
        }
        else {
            if (blnIsSelectAll !== null) {
                let arrCategoryCompetencyData = this.GetCategoryCompetencyData(objContext, iCategoryId);
                let arrTempCategoryCompetencyData = [...objContext.state.arrSelectedCategoryCompetencyId];
                let arrNewCategoryCompetencyData = [];
                arrCategoryCompetencyData.map((objTempData) => {
                    let arrCategoryCompetencyData = arrTempCategoryCompetencyData.filter(
                        (intTempCategoryCompetencyId) => intTempCategoryCompetencyId !== objTempData["iCategoryCompetencyId"]
                    );
                    arrTempCategoryCompetencyData = [...arrCategoryCompetencyData];
                    arrNewCategoryCompetencyData = [...arrCategoryCompetencyData];
                });
                let arrCategoryData = objContext.state.arrSelectedCategoryId.filter((intTempCategoryId) => intTempCategoryId !== iCategoryId);
                objContext.dispatch({
                    type: "SET_STATE",
                    payload: { arrSelectedCategoryId: arrCategoryData, arrSelectedCategoryCompetencyId: arrNewCategoryCompetencyData },
                });
            } else {
                if (blnIsChecked) {
                    let arrSelectedId = [...objContext.state.arrSelectedCategoryCompetencyId, iCategoryCompetencyId];
                    let arrSelectedCategoryId = objContext.state.arrSelectedCategoryId.filter((strTempId) => strTempId !== iCategoryId);
                    arrSelectedCategoryId = [...arrSelectedCategoryId, iCategoryId];
                    objContext.dispatch({
                        type: "SET_STATE",
                        payload: { arrSelectedCategoryId: arrSelectedCategoryId, arrSelectedCategoryCompetencyId: arrSelectedId },
                    });
                } else {
                    let arrSelectedCategoryCompetencyId = objContext.state.arrSelectedCategoryCompetencyId.filter(
                        (intTempCategoryCompetencyId) => intTempCategoryCompetencyId !== iCategoryCompetencyId
                    );
                    let arrCategoryCompetencyData = this.GetCategoryCompetencyData(objContext, iCategoryId);
                    let intCount = 0;
                    arrCategoryCompetencyData.forEach((objTempData) => {
                        if (arrSelectedCategoryCompetencyId.filter((intTempId) => intTempId === objTempData["iCategoryCompetencyId"]).length > 0) {
                            intCount++;
                        }
                    });
                    if (intCount === 0) {
                        let arrCategoryIdData = objContext.state.arrSelectedCategoryId.filter((intTempCategoryId) => intTempCategoryId !== iCategoryId);
                        objContext.dispatch({
                            type: "SET_STATE",
                            payload: { arrSelectedCategoryId: arrCategoryIdData, arrSelectedCategoryCompetencyId: arrSelectedCategoryCompetencyId },
                        });
                    } else {
                        objContext.dispatch({ type: "SET_STATE", payload: { arrSelectedCategoryCompetencyId: arrSelectedCategoryCompetencyId } });
                    }
                }
            }
        }
        if (!objContext.state.blnIsNTCheckBoxSelected) {
            if (objContext.state.objValidation["strValidatedField"] === "CategoryCompetencySelection") {
                let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
                objContext.dispatch({ type: "SET_STATE", payload: { objValidation: objValidation } });
            }
        }
    }

    OnChangeNTSpecialCheckBox(objContext, blnIsChecked) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                blnIsNTCheckBoxSelected: blnIsChecked,
                intSelectedSubSubjectId: -1
            },
        });

        if (blnIsChecked) {

        }
    }

    /**
     * @name OnChangeCheckBoxForClass
     * @param {*} objContext
     * @param {*} blnIsChecked
     * @summary   Sets the loacl state when the class check box is checked or unchecked.
     */
    OnChangeCheckBoxForClass(objContext, blnIsChecked) {
        let strClassId = "";
        if (blnIsChecked) {
            strClassId =
                JSON.stringify(objContext.state.objSelectedClassData) === "{}"
                    ? ApplicationState.GetProperty("SelectedClassId")
                    : objContext.state.objSelectedClassData["uClassId"];
        }
        if (objContext.state.objValidation["strValidatedField"] === "PupilSelection") {
            let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    blnSelectAllPupil: false,
                    arrSelectedPupilId: [],
                    SelectedClassId: strClassId,
                    arrSelectedPupilGroupId: [],
                    arrSelectedPupilForCreatingGroup: [],
                    objValidation: objValidation,
                    isSelectedClass: true
                },
            });
        } else {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    blnSelectAllPupil: false,
                    arrSelectedPupilId: [],
                    SelectedClassId: strClassId,
                    arrSelectedPupilGroupId: [],
                    arrSelectedPupilForCreatingGroup: [],
                    isSelectedClass: true
                },
            });
        }
    }

    /**
     * @name OnChangeCheckBoxForGroup
     * @param {*} objContext
     * @param {*} blnIsChecked
     * @param {*} uPupilGroupId
     * @summary   Sets the loacl state when the group check box is checked or unchecked.
     */
    OnChangeCheckBoxForGroup(objContext, blnIsChecked, uPupilGroupId) {
        let arrLearningTestPupilGroupData = this.GetLearningTestPupilGroupData(objContext, "GetSpecificGroupData", uPupilGroupId);
        let arrPupilInGroup = arrLearningTestPupilGroupData[0]["t_TestDrive_LearningTest_PupilGroup_Pupils"].map((objTempData) => {
            return objTempData["uPupilId"];
        });
        let arrPupilGroupId = [],
            arrSelectedPupilId = [];
        let arrTempData = [...objContext.state.arrSelectedPupilForCreatingGroup];
        arrPupilInGroup.forEach((strTempId) => {
            arrSelectedPupilId = arrTempData.filter((strTempPupilId) => strTempPupilId !== strTempId);
            arrTempData = [...arrSelectedPupilId];
        });
        if (blnIsChecked) {
            arrPupilGroupId = [...objContext.state.arrSelectedPupilGroupId, uPupilGroupId];
            arrSelectedPupilId = [...arrSelectedPupilId, ...arrPupilInGroup];
        } else {
            arrPupilGroupId = objContext.state.arrSelectedPupilGroupId.filter((strTempId) => strTempId !== uPupilGroupId);
        }
        if (objContext.state.objValidation["strValidatedField"] === "PupilSelection") {
            let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    blnSelectAllPupil: false,
                    arrSelectedPupilGroupId: arrPupilGroupId,
                    arrSelectedPupilForCreatingGroup: arrSelectedPupilId,
                    objValidation: objValidation,
                },
            });
        } else {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    blnSelectAllPupil: false,
                    arrSelectedPupilGroupId: arrPupilGroupId,
                    arrSelectedPupilForCreatingGroup: arrSelectedPupilId,
                },
            });
        }
    }

    /**
     * @name OnChangeCheckBoxForPupil
     * @param {*} objContext
     * @param {*} blnIsChecked
     * @param {*} uPupilId
     * @summary   Sets the loacal states accordingly when a pupil is checked or unchecked.
     */
    OnChangeCheckBoxForPupil(objContext, blnIsChecked, uPupilId) {
        let arrSelectedPupilId = [],
            arrSelectedPupilIdForGroup = [];
        if (blnIsChecked) {
            arrSelectedPupilIdForGroup = objContext.state.arrSelectedPupilForCreatingGroup.filter((strTempPupilId) => strTempPupilId !== uPupilId);
            arrSelectedPupilIdForGroup = [...arrSelectedPupilIdForGroup, uPupilId];
            arrSelectedPupilId = [...objContext.state.arrSelectedPupilId, uPupilId];
        } else {
            arrSelectedPupilIdForGroup = objContext.state.arrSelectedPupilForCreatingGroup.filter((strTempPupilId) => strTempPupilId !== uPupilId);
            arrSelectedPupilId = objContext.state.arrSelectedPupilId.filter((strTempId) => strTempId !== uPupilId);
        }
        if (objContext.state.objValidation["strValidatedField"] === "PupilSelection") {
            let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    blnSelectAllPupil: false,
                    arrSelectedPupilId: arrSelectedPupilId,
                    arrSelectedPupilForCreatingGroup: arrSelectedPupilIdForGroup,
                    objValidation: objValidation,
                    isSelectedClass: false
                },
            });
        } else {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    blnSelectAllPupil: false,
                    arrSelectedPupilId: arrSelectedPupilId,
                    arrSelectedPupilForCreatingGroup: arrSelectedPupilIdForGroup,
                    isSelectedClass: false
                },
            });
        }
    }

    /**
     * @name OnChangeClassDropDown
     * @param {*} objContext
     * @param {*} objItem
     * @summary   Triggers when the class dropdown selection changes
     */
    OnChangeClassDropDown(objContext, objItem) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                blnSelectAllPupil: false,
                arrSelectedPupilId: [],
                objSelectedClassData: objItem,
                SelectedClassId: objItem["uClassId"],
                intSelectedParentSubjectId: -1,
                intSelectedSubSubjectId: -1,
            },
        });
    }

    /**
     * @name OnChangeSubjectDropDown
     * @param {*} objContext
     * @param {*} objItem
     * @summary   Triggers when the Subject dropdown selection changes
     */
    OnChangeSubjectDropDown(objContext, objItem) {
        if (objContext.state.objValidation["strValidatedField"] === "div_SubjectDropDown") {
            let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    intSelectedParentSubjectId: objItem.iSubjectId,
                    intSelectedSubSubjectId: -1,
                    arrCategoryData: [],
                    arrSelectedCategoryId: [],
                    arrSelectedCategoryCompetencyId: [],
                    objValidation: objValidation,
                    blnIsNTCheckBoxSelected: false
                },
            });
        } else {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    intSelectedParentSubjectId: objItem.iSubjectId,
                    intSelectedSubSubjectId: -1,
                    arrCategoryData: [],
                    arrSelectedCategoryId: [],
                    arrSelectedCategoryCompetencyId: [],
                    blnIsNTCheckBoxSelected: false
                },
            });
        }
    }

    /**
     * @name OnChangeSubSubjectDropDown
     * @param {*} objContext
     * @param {*} objItem
     * @summary   Triggers when the sub Subject dropdown selection changes
     */
    OnChangeSubSubjectDropDown(objContext, objItem) {
        if (objContext.state.objValidation["strValidatedField"] === "div_SubSubjectDropDown") {
            let objValidation = { strValidatedField: "", strValidationMessage: "", blnShowValidation: false };
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    intSelectedSubSubjectId: objItem.iSubjectId,
                    arrSelectedCategoryId: [],
                    arrSelectedCategoryCompetencyId: [],
                    blnShowValidation: false,
                    strValidationMessage: "",
                    objValidation: objValidation,
                },
            });
        } else {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    intSelectedSubSubjectId: objItem.iSubjectId,
                    arrSelectedCategoryId: [],
                    arrSelectedCategoryCompetencyId: [],
                    blnShowValidation: false,
                    strValidationMessage: "",
                },
            });
        }
    }

    /**
     * @name OnChangeModusDropDown
     * @param {*} objContext
     * @param {*} objItem
     * @summary   Triggers when the Modus dropdown selection changes
     */
    OnChangeModusDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { intSelectedModusId: objItem.Value } });
    }

    /**
     * @name GetCategoryDataForNTSubject
     * @param {any} objContext
     * @summary Gets Category Data For selected NT Sub-Subject 
     * @returns array of Task folders as categories
     */
    GetCategoryDataForNTSubject(objContext) {
        let arrTaskFolderData = objContext.props.Object_Intranet_Task_TaskFolder.Data
        let arrFilteredTaskFolderData = arrTaskFolderData.filter(x => x["iPageParentFolderId"] == objContext.state.intSelectedSubSubjectId);
        arrFilteredTaskFolderData.sort((x, y) => parseInt(x["vPageFolderName"].split(' ')[0]) - parseInt(y["vPageFolderName"].split(' ')[0]));
        return arrFilteredTaskFolderData
            .map(x => {
                return {
                    "iCategoryId": x["iPageFolderId"],
                    "isChecked": false,
                    "iSubjectId": objContext.state.intSelectedSubSubjectId,
                    "t_TestDrive_Category_Data": [{
                        "iLanguageId": 3,
                        "vCategoryName": x["vPageFolderName"]
                    }]
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
            "Components": ["Dropdown"],
            "Files": []
        }
    }
}

export default LearningTestCreation_ModuleProcessor;
