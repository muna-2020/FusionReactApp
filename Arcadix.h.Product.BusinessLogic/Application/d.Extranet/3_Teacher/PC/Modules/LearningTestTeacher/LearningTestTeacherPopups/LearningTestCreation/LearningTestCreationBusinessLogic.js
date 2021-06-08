import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            class: DataRef(state.Entity, "class", true),
            textresource: DataRef(state.Entity, "textresource", true),
            pupil: DataRef(state.Entity, "pupil", true),
            subject: DataRef(state.Entity, "subject", true),
            categorycompetency: DataRef(state.Entity, "categorycompetency", true),
            category: DataRef(state.Entity, "category", true),
            learningtestpupilgroup: DataRef(state.Entity, "learningtestpupilgroup", true),
            clientsettings: DataRef(state.Entity, "clientsettings", true),
            elementattributetemplates: DataRef(state.Entity, "elementattributetemplates", true),
            testresultattributes: DataRef(state.Entity, "testresultattributes", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        Logger.Log("not mapping");
        return {};
    }
};

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props){
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleId = QueryString.GetQueryStringValue("CycleId").toUpperCase();
    let strTeacherId = props.Data.ClientUserDetails.UserId;
    let objCategoryComeptency = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
    };
    let objElementAttributeTemplatesParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsForWholeTask": "N"
                    }
                }
            ]
        }
    };
    let objTestResultAttributesParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "vAttributeKey" : "TestPoint"
                    }
                }
            ]
        }
    };
    let objLearningTestPupilGroup = {
        "ForeignKeyFilter": {
            "uUserId": strTeacherId
        }
    };
    let arrParams = [
        {
            "URL": "API/Object/Taxonomy/CategoryCompetency",
            "Params": objCategoryComeptency,
            "MethodType": "GET"
        },
        {
            "URL": "API/Object/Extranet/Teacher/LearningTest/LearningTestPupilGroup",
            "Params": objLearningTestPupilGroup,
            "MethodType": "GET"
        },
        {
            "URL": "API/Object/TestApplication/ElementAttributeTemplates",
            "Params": objElementAttributeTemplatesParams,
            "MethodType": "GET"
        },
        {
            "URL": "API/Object/TestApplication/TestResultAttributes",
            "Params": objTestResultAttributesParams,
            "MethodType": "GET"
        }
    ];
    return { 
        "DataCalls": arrParams
    };
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns api call params for category data.
 */
export function GetCategoryParams(objContext)
{
    let objCategoryParams = {
        "ForeignKeyFilter": {
            "iSubjectId": objContext.state.intSelectedSubSubjectId
        },
        "SearchQuery": {
            "must": [
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
            "URL": "API/Object/Taxonomy/Category",
            "Params": objCategoryParams,
            "MethodType": "GET"
        }
    ];
    return arrParams;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns api call params for getting Pupil data.
 */
export function GetPupilDataParams(objContext)
{
    let strClassId = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type":"nested"
        }
    };
    let arrParams = [
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns api call params for getting task data.
 */
export function GetTasksParams(objContext)
{
    let arrShouldKeys1 = GetShouldKeysForCategoryComepetency(objContext);
    let arrShouldKeys2 = GetShouldKeysForFolderId(objContext);
    let arrShouldKeys = [...arrShouldKeys1, ...arrShouldKeys2];
    let objTaskParams = {
        "SearchQuery" : {
            "must" : [
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
                        "iSubjectId": objContext.state.intSelectedSubSubjectId
                    }
                },
                {
                    "match": {
                        "t_CMS_Page_Data.t_CMS_Page_AssignedWorkflowStatus.cIsLatest": "Y"
                    }
                },
                {
                    "match": {
                        "t_CMS_Page_Data.t_CMS_Page_AssignedWorkflowStatus.uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361"
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
        "OutputColumns":[
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
    let arrParams = [
        {
            "URL": "API/Object/Intranet/Task/Task",
            "Params": objTaskParams,
            "MethodType": "Get"
        }
    ];
    return arrParams
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the should keys with Copmetency Category data to add to task params and get task data.
 */
function GetShouldKeysForCategoryComepetency(objContext)
{
    let arrCategoryComepetencyShouldKeys = [];
    objContext.state.arrSelectedCategoryCompetencyId.map(strTempId => {
        arrCategoryComepetencyShouldKeys = [...arrCategoryComepetencyShouldKeys, 
            {
                "match": {
                    "iCategoryCompetencyId": strTempId
                }
            }
        ]
    });
    return arrCategoryComepetencyShouldKeys;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the should keys with Folder id's data to add to task params and get task data.
 */
function GetShouldKeysForFolderId(objContext)
{
    let arrFolderIds = GetFolderIds(objContext);
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
 * 
 * @param {*} objContext 
 * @summary   Returns api call params for getting task difficulty level data.
 */
export function GetTaskDifficultyLevelParams(objContext)
{
    let objTaskDifficultyLevelParams = {
        "SortKeys": [
            {
                "iDisplayOrder": {
                    "order": "asc"
                }
            }
        ]
    }
    let arrParams = [
        {
            "URL": "API/Object/Intranet/Task/TaskDifficultyLevel",
            "Params": objTaskDifficultyLevelParams,
            "MethodType": "GET"
        }
    ];
    return arrParams;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @param {*} arrAdditionalData 
 * @summary   Call 'Execute' method to make the api call.
 */
export function DataCall(objContext, arrParams, strToggleExecute = 'FetchAndCacheExecute', arrExtranetTestData = []){
    switch(strToggleExecute)
    {
        case 'FetchAndCacheExecute':
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
        break;
        case "FetchExecuteForTasks":
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let strKey = "task;cisdeleted;n;itasktypeid;1;itaskusageid;1;isubjectid;" + objContext.state.intSelectedSubSubjectId + ";t_CMS_Page_Data.t_Cms_Page_AssignedWorkflowStatus.cIsLatest;y;t_CMS_Page_Data.t_Cms_Page_AssignedWorkflowStatus.uWorkflowStatusId;FA66D530-23AD-452C-84DC-557BDCB91361";
                let arrData = objReturn["task"][strKey.toLowerCase()]["Data"];
                objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrTasks": arrData }});
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        break;
        case "FetchExecuteToSaveExtranetTest":
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let strClassId = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
                let strCycleId = QueryString.GetQueryStringValue("CycleId").toUpperCase();
                let strTeacherId = objContext.props.Data.ClientUserDetails.UserId;
                let arrData = objReturn["extranettest"]["Data"];
                if(arrData.length > 0)
                {
                    SaveTasksWithTestId(objContext, arrData, arrData[0]["uTestId"]);
                }
            });
        break;
        case "FetchExecuteToSaveTask":
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                objContext.props.passedEvents.GetNewCreatedTest(arrExtranetTestData);
                objContext.props.closePopUp(objContext.props.objModal);
            });
        break;
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext){
    useLayoutEffect(() => {
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, []);
};

/**
 * 
 * @param {*} objContext 
 * @summary   This useEffect is triggered when the class drop down selection changes.
 */
export function useDataLoaderWhenClassDropdownSelectionChanges(objContext)
{
    useLayoutEffect(() => {
        if(objContext.state.isLoadComplete)
        {
            ApplicationState.SetProperty("blnShowAnimation", true);
            DataCall(objContext, GetPupilDataParams(objContext));
        }
    }, [objContext.state.blnIsClassSelectionChanged]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   This useEffect is triggered when the Competency is selected in the competency dropdown.
 */
export function useDataLoaderForCategory(objContext)
{
    useLayoutEffect(() => {
        if(objContext.state.isLoadComplete && objContext.state.intSelectedSubSubjectId !== -1)
        {
            ApplicationState.SetProperty("blnShowAnimation", true);
            DataCall(objContext, GetCategoryParams(objContext));
        }
    }, [objContext.state.intSelectedSubSubjectId]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   This useEffect is triggered when the local state (TAB) changes to 3
 */
export function useDataLoaderForTasks(objContext)
{
    useEffect(() => {
        if(objContext.state.Tab === 3)
        {
            ApplicationState.SetProperty("blnShowAnimation", true);
            DataCall(objContext, GetTasksParams(objContext), "FetchExecuteForTasks");
            DataCall(objContext, GetTaskDifficultyLevelParams(objContext));
        }
    },[objContext.state.Tab])
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    let strClassId = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
    let strCycleId = QueryString.GetQueryStringValue("CycleId").toUpperCase();
    let strUserId = objContext.props.Data.ClientUserDetails.UserId;
    useEffect(()=>{
        if(DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + strUserId) && 
        DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n") &&
        DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/LearningTestTeacher") && 
        DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) && 
        DataRef(objContext.props.categorycompetency, "categorycompetency;cisdeleted;n") && 
        DataRef(objContext.props.learningtestpupilgroup, "learningtestpupilgroup;uuserid;" + strUserId) &&
        DataRef(objContext.props.testresultattributes, "testresultattributes;vAttributeKey;TestPoint") && //
        DataRef(objContext.props.elementattributetemplates, "elementattributetemplates;cIsForWholeTask;N") && //elementattributetemplates;cisforwholetask;n
        DataRef(objContext.props.clientsettings, "clientsettings"))
        {
            let arrPupilData = GetPupilData(objContext);
            if(!objContext.state.isLoadComplete)
            {
                let arrSubjects = GetDefaultSubjects(objContext, "GetDataForDropdown");
                let arrSubjSubjects = GetSubSubjects(objContext, "GetDataForDropdown", arrSubjects[1]["iSubjectId"]);
                let blnShowCompileTasksPopup = CheckIfToShowCompileTasksPopup(objContext);
                if(blnShowCompileTasksPopup)
                {
                    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrPupilData": arrPupilData, "intSelectedParentSubjectId": arrSubjects[0].iSubjectId, "intSelectedSubSubjectId": arrSubjSubjects[0]["iSubjectId"], "Tab": 1 }});
                }
                else
                {
                    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrPupilData": arrPupilData, "intSelectedParentSubjectId": arrSubjects[0].iSubjectId, "intSelectedSubSubjectId": arrSubjSubjects[0]["iSubjectId"], "Tab": 2 }});
                }
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            else
            {
                objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrPupilData": arrPupilData }});
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.class, objContext.props.subject, objContext.props.textresource, objContext.props.pupil, objContext.props.categorycompetency, objContext.props.learningtestpupilgroup,objContext.props.clientsettings, objContext.props.testresultattributes, objContext.props.elementattributetemplates]);

    useEffect(()=>{
        if(objContext.state.isLoadComplete && DataRef(objContext.props.category, "category;isubjectid;" + objContext.state.intSelectedSubSubjectId + ";cisdeleted;n"))
        {
            let arrCategoryData = GetCategoryData(objContext);
            objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrCategoryData": arrCategoryData }});
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    },[objContext.props.category]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if to show Manual Learning Test Intro Pop up on the basis user preference data.
 */
function CheckIfToShowCompileTasksPopup(objContext)
{
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    let arrPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(objTempData => objTempData["vKey"] === "ShowManualLearningTestIntroPopup");
    if(arrPreferenceValue.length > 0 && arrPreferenceValue[0]["vValue"] === "N")
    {
        return false;
    }
    else
    {
        return true;
    }
};

/**
 * 
 * @param {} objContext 
 * @summary  Returns an array of classes to load in the drop down
 */
export function GetClassDropDownData(objContext)
{
    let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    let strUserId = objContext.props.Data.ClientUserDetails.UserId;
    let arrTempClass = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + strUserId).Data.map((objClass)=>{
        return {...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N")}
    });
    let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
    arrTempClass.forEach((objClass) => {
            let objTempClassData = {...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"} )};
            if(objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0)
            {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = {...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N")};
            if(objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0)
            {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = {...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y")};
            if(objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0)
            {
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
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strToggleGetData //Filter
 * @param {*} strPupilId //Filter
 * @summary   Returns the pupil data on the basis of filter.
 */
export function GetPupilData(objContext, strToggleGetData, strPupilId = "")
{
    let strClassId = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
    let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
    let arrPupilData = [];
    switch(strToggleGetData)
    {
        case "GetDataForDropdown":
            let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
            arrPupilData = arrTempPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
            let objAllOption = {
                ...arrPupilData[0], 
                ["uPupilId"]: "00000000-0000-0000-0000-000000000000", 
                ["vFirstName"]: objTextResource["AllOptionText"],
                ["vName"]: "",
                ["t_TestDrive_Member_Class_Pupil"]: [],
                ["t_TestDrive_Member_School_Pupil"]: []
            };
            arrPupilData = [objAllOption, ...arrPupilData];
        break;
        case "GetSpecificData":
            arrPupilData = arrTempPupilData.filter(objTempData => { return objTempData["uPupilId"] === strPupilId && objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N"});
        break;
        default:
            arrPupilData = arrTempPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
        break;
    }
    return arrPupilData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the folder ids from client settings and retuns the data as an array of strings.
 */
export function GetFolderIds(objContext)
{
    let arrFolderIdData = [];
    let arrData = DataRef(objContext.props.clientsettings, "clientsettings").Data;
    arrData = arrData.filter(objTempData => objTempData["vKey"] === "TaskFoldersForLearningTest");
    // let arrData = DataRef(objContext.props.clientsettings, "clientsettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;LearningTest;vKey;TaskFoldersForLearningTest").Data;
    if(arrData.length > 0)
    {
        let strFolderIds = arrData[0]["vValue"];
        arrFolderIdData = strFolderIds.split(',');
    }
    return arrFolderIdData;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strToggleGetData //Filter
 * @param {*} iSubjectId //Filter
 * @summary   Gets the default subject data on the basis of filters
 */
export function GetDefaultSubjects(objContext, strToggleGetData, iSubjectId = -1)
{
    let arrSubjects = [];
    switch(strToggleGetData)
    {
        case "GetDataForDropdown":
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0);
            let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
            let objPleaseSelectOption = {
                ...arrSubjects[0], 
                ["iSubjectId"]: -1, 
                ["t_TestDrive_Subject_Data"]: 
                [
                    {
                        ...arrSubjects[0]["t_TestDrive_Subject_Data"][0], 
                        ["vSubjectName"]: objTextResource["DropDownPleaseSelectOption"], 
                        ["iLanguageId"]: parseInt(objContext.props.JConfiguration.InterfaceLanguageId)
                    }
                ]
            };
            arrSubjects = [objPleaseSelectOption, ...arrSubjects];
        break;
        case "GetSpecificData":
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0 && objTempData["iSubjectId"] === iSubjectId);
        break;
        default:
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === 0);
        break;
        }
    return arrSubjects;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strToggleGetData //Filter
 * @param {*} iSubjectId //Filter
 * @summary   Gets the sub subject data on the basis of filters
 */
export function GetSubSubjects(objContext, strToggleGetData, iSubjectId = -1)
{
    let arrSubjects = [];
    switch(strToggleGetData)
    {
        case "GetDataForDropdown":
            let arrDefaultSubjects = GetDefaultSubjects(objContext, "GetDataForDropdown");
            let objPleaseSelectOption = {...arrDefaultSubjects[0], ["iParentSubjectId"]: -1};
            if(objContext.state.intSelectedParentSubjectId === -1)
            {
                arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === iSubjectId);
                arrSubjects = [objPleaseSelectOption, ...arrSubjects];
            }
            else
            {
                arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === objContext.state.intSelectedParentSubjectId);
                arrSubjects = [objPleaseSelectOption, ...arrSubjects];
            }
        break;
        case "GetSpecificData":
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iSubjectId"] === iSubjectId);
        break;
        case "GetForSubSubjectForParentSubjectId":
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === iSubjectId);
        break;
        default:
            arrSubjects = DataRef(objContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iParentSubjectId"] === objContext.state.intSelectedParentSubjectId);
        break;
    }
    return arrSubjects;
};

/**
 * 
 * @param {} objContext 
 * @summary  returns an array of Modus to load in the drop down
 */
export function GetModusDropdownData(objContext)
{
    let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    return[
        { key: objTextResource["ModusDropdownItemFirst"], value: 2 },//iTestTypeId === 2 => Lernen
        { key: objTextResource["ModusDropdownItemSecond"], value: 3 }//iTestTypeId === 3 => Prufen
    ];
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strClassId 
 * @summary   Returns the class object for the class id. If the class id is not given it will take it from the application state.
 */
export function GetClassDetails(objContext, strClassId = "")
{
    if(strClassId === "")
    {
        strClassId = ApplicationState.GetProperty("SelectedClassId");
    }
    let strUserId = objContext.props.Data.ClientUserDetails.UserId;
    let arrClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + strUserId).Data.filter(objTempData => objTempData["uClassId"] === strClassId);
    let objClassDetails = null;
    if(arrClassData.length > 0)
    {
        objClassDetails = arrClassData[0];
    }
    return objClassDetails;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns an array of category data.
 */
export function GetCategoryData(objContext)
{
    let arrData = DataRef(objContext.props.category, "category;isubjectid;" + objContext.state.intSelectedSubSubjectId + ";cisdeleted;n").Data.filter(objTempData => objTempData["t_TestDrive_Category_Data"].length > 0);
    return arrData;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} intCategoryId 
 * @summary   Returns an array of Competency Category data.
 */
export function GetCategoryCompetencyData(objContext, intCategoryId)
{
    let arrData = DataRef(objContext.props.categorycompetency, "categorycompetency;cisdeleted;n").Data;
    let arrCategoryCompetencyData = [];
    arrData.forEach(objTempData => {
        if(objTempData["iCategoryId"] === intCategoryId)
        {
            arrCategoryCompetencyData = [...arrCategoryCompetencyData, 
                {
                    ...objTempData, 
                    ["t_TestDrive_Category_Competency_Data"]: objTempData["t_TestDrive_Category_Competency_Data"].filter(objTempCategoryCompetencyData => objTempCategoryCompetencyData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId))
                }
            ];
        }
    });
    let arrCategoryCompetency = arrCategoryCompetencyData.filter(objTempData => objTempData["t_TestDrive_Category_Competency_Data"].length > 0);
    return arrCategoryCompetency;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strToggle //Filter
 * @param {*} uPupilGroupId //Filter
 * @summary   Returns an array of Pupil Group Data on the basis of filter
 */
export function GetLearningTestPupilGroupData(objContext, strToggle = "GetWholeClassData", uPupilGroupId = "")
{
    let strClassId = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
    let strUserId = objContext.props.Data.ClientUserDetails.UserId;
    let arrData = DataRef(objContext.props.learningtestpupilgroup, "learningtestpupilgroup;uuserid;" + strUserId).Data;
    let arrFinalData = [];
    switch(strToggle)
    {
        case "GetWholeClassData":
        arrFinalData = arrData.filter(objTempData => { return objTempData["uClassId"] === strClassId && objTempData["t_TestDrive_LearningTest_PupilGroup_Data"].filter(objTempPgpData => objTempPgpData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId)).length > 0 });
        break;
        case "GetSpecificGroupData":
        arrFinalData = arrData.filter(objTempData => objTempData["uPupilGroupId"] === uPupilGroupId );
        break;
    }
    return arrFinalData;
};

/**
 * @summary   Returns the current client side date.
 */
export function GetCurrentDate()
{
    let objDate = new Date();
    let intDate = objDate.getDate();
    let intMonth = objDate.getMonth() + 1;
    let intYear = objDate.getFullYear();
    let strFullDate = intDate + "." + intMonth + "." + intYear;
    return strFullDate;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns a Test Name.
 */
export function GetTestName(objContext)
{
    if(objContext.state.intSelectedParentSubjectId !== -1 && objContext.state.intSelectedSubSubjectId !== -1)
    {
        let strFullDate = GetCurrentDate();
        let arrParentSubjectDetails = GetDefaultSubjects(objContext, "GetSpecificData", objContext.state.intSelectedParentSubjectId);
        let objParentSubjectDataDetails = arrParentSubjectDetails[0]["t_TestDrive_Subject_Data"].filter(objTempData => objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId))[0];
        let arrSubSubjectDetails = GetSubSubjects(objContext, "GetSpecificData", objContext.state.intSelectedSubSubjectId);
        let objSubSubjectDataDetails = arrSubSubjectDetails[0]["t_TestDrive_Subject_Data"].filter(objTempData => objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId))[0];
        let strTestName = objParentSubjectDataDetails["vSubjectName"] + "-" + objSubSubjectDataDetails["vSubjectName"] + "-" + strFullDate;
        return strTestName;
    }
    else
    {
        return "";
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Forms an array of json for selected competencies.
 */
function GetTestCompetencyData(objContext)
{
    let TestCompetencyData = [];
    objContext.state.arrSelectedCategoryCompetencyId.forEach(intTempId => {
        TestCompetencyData = [...TestCompetencyData, 
            {
                "iCategoryCompetencyId": intTempId
            }
        ];
    })
    return TestCompetencyData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns an array of Json for selected Category.
 */
function GetTestCategoryData(objContext)
{
    let arrTestCategoryData = [];
    objContext.state.arrSelectedCategoryId.forEach(intTempId => {
        arrTestCategoryData = [...arrTestCategoryData, 
            {
                "iCategoryId": intTempId
            }
        ];
    })
    return arrTestCategoryData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns an array (Data/Empty) of the CycleClass sub table.
 */
function GetCycleClassData(objContext)
{
    let arrReturnData = [];
    if(objContext.state.SelectedClassId !== "")
    {
        let strClassId = objContext.state.SelectedClassId;
        let strCycleId = objContext.props.Data.strCycleId;
        arrReturnData = [
            {
                "uClassId": strClassId,
                "uCycleId": strCycleId
            }
        ];
    }
    return arrReturnData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns an array (Data/Empty) for Cycle Pupil Sub table.
 */
function GetCyclePupilData(objContext)
{
    let strClassId = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
    let strCycleId = objContext.props.Data.strCycleId;
    let arrCyclePupilData = [];
    objContext.state.arrSelectedPupilForCreatingGroup.forEach(strTempPupilId => {
        arrCyclePupilData = [...arrCyclePupilData, 
            {
                "uCycleId" : strCycleId,
                "uClassId" : strClassId,
                "uPupilId" : strTempPupilId,
                "cIsByTeacher" : "Y",
                "uParentTestId" : "00000000-0000-0000-0000-000000000000",
                "cIsArchive" : "N"
            }
        ];
    });
    return arrCyclePupilData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the uElementFormulaAttributeTemplateId.
 */
function GetElementFormulaAttributeTemplateId(objContext)
{
    let strElementFormulaAttributeTemplateId = "";
    let arrElementFormulaAttributeTemplateData = DataRef(objContext.props.elementattributetemplates, "elementattributetemplates;cIsForWholeTask;N").Data;
    if(arrElementFormulaAttributeTemplateData.length > 0)
    {
        strElementFormulaAttributeTemplateId = arrElementFormulaAttributeTemplateData[0]["uElementFormulaAttributeTemplateId"];
    }
    return strElementFormulaAttributeTemplateId;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns the uResultAttributeId.
 */
function GetResultAttributeId(objContext)
{
    let intMainClientId = objContext.props.Data.ClientUserDetails.MainClientId;
    let strResultAttributeId = "";
    let arrData = DataRef(objContext.props.testresultattributes, "testresultattributes;vAttributeKey;TestPoint").Data;
    let arrResultAttributeData = arrData.filter(objTempData => objTempData["iMainClientId"] === intMainClientId);
    if(arrResultAttributeData.length > 0)
    {
        strResultAttributeId = arrResultAttributeData[0]["uResultAttributeId"];
    }
    else
    {
        arrResultAttributeData = arrData.filter(objTempData => objTempData["iMainClientId"] === 0);
        if(arrResultAttributeData.length > 0)
        {
            strResultAttributeId = arrResultAttributeData [0]["uResultAttributeId"];
        }
    }
    return strResultAttributeId;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Returns SkinId from client settings data.
 */
function GetSkinId(objContext)
{
    let strSkinId = "";
    let arrData = DataRef(objContext.props.clientsettings, "clientsettings").Data.filter(objTempData => objTempData["vKey"] === "LearningTestSkinId");
    // let arrData = DataRef(objContext.props.clientsettings, "clientsettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;LearningTest;vKey;TaskFoldersForLearningTest").Data;
    if(arrData.length > 0)
    {
        strSkinId = arrData[0]["vValue"];
    }
    return strSkinId;
};

/**
 * 
 * @param {*} objContext 
 * @summary   This methods forms and saves the Extranet Learning Test Data.
 */
export function SaveLearningTest(objContext)
{
    if(objContext.state.arrSelectedTasks.length > 0 && objContext.state.strTestName !== "")
    {
        let strClassId = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
        let strUserId = objContext.props.Data.ClientUserDetails.UserId;
        let strCycleId = objContext.props.Data.strCycleId;
        let arrTestCompetency = GetTestCompetencyData(objContext);
        let arrTestCategory = GetTestCategoryData(objContext);
        let arrCycleClass = GetCycleClassData(objContext);
        let arrCyclePupil = GetCyclePupilData(objContext);
        let strElementFormulaAttributeTemplateId = GetElementFormulaAttributeTemplateId(objContext);
        let strResultAttributeId = GetResultAttributeId(objContext);
        let strSkinId = GetSkinId(objContext);
        let objTestDataToSave = {
            "iFolderId" : -1,
            "cIsDeleted" : "N",
            "iTestTypeId": objContext.state.intSelectedModusId,
            "iSubjectId": objContext.state.blnIsNTCheckBoxSelected ? objContext.state.intSelectedParentSubjectId : objContext.state.intSelectedSubSubjectId,
            "iAlgorithmId" : 2,
            "iProviderId" : 1,
            "iMainClientId" : parseInt(objContext.props.Data.ClientUserDetails.MainClientId),
            "uUserId" : strUserId,
            "vTestName" : objContext.state.strTestName,
            "iTestProgressDisplayId" : 5,//Hard Coded for now, to be reviewed
            "cIsSolutionAfterTask" : "Y",
            "uClassId" : strClassId,
            "cIsForInternalTesting" : "N",
            "iTestUsageId" : 3,
            "cIterateTillAllTaskCorrect" : "N",
            "uElementFormulaAttributeTemplateId" : strElementFormulaAttributeTemplateId,
            "uResultAttributeId" : strResultAttributeId,
            "uSkinId" : strSkinId,
            "cIsSystemGenerated": "N",
            "cHasNTTheme": objContext.state.blnIsNTCheckBoxSelected?"Y":"N",
            "t_TestDrive_Test_Competency" : arrTestCompetency,
            "t_TestDrive_Test_Category" : arrTestCategory,
            "t_TestDrive_Test_Language" : [
                {
                    "iLanguageId": parseInt(objContext.props.JConfiguration.InterfaceLanguageId),
                    "cIsActivatedForTest": "Y"
                }
            ],
            "t_TestDrive_Cycle_AssignedTest" : [
                {
                    "uCycleId" : strCycleId,
                }
            ],
            "t_TestDrive_Cycle_Class" : arrCycleClass,
            "t_TestDrive_Cycle_Pupil" : arrCyclePupil
        };
        let objExtranetTestParams = {
            "iOffSet": 0,
            "iInterval": 6000,
            "cIsFilterBasedOnDate": "N",
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
                    },
                    {
                        "match": {
                            "uTeacherId": strUserId
                        }
                    }
                ]
            },
            "vAddData": objTestDataToSave
        };
        let arrParams = [
            {
                "URL": "API/Object/Intranet/Test/ExtranetTest",
                "Params": objExtranetTestParams,
                "MethodType": "POST"
            }
        ];
        ApplicationState.SetProperty("blnShowAnimation", true);
        DataCall(objContext, arrParams, "FetchExecuteToSaveExtranetTest");
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} arrTestData 
 * @param {*} strTestId 
 * @summary   This methods saves Task. The test id is provied oned the test is saved. So this will be only saved ones the test is saved.
 */
function SaveTasksWithTestId(objContext, arrTestData, strTestId)
{
    if(objContext.state.arrSelectedTasks.length > 0 && (strTestId !== "" || strTestId !== "00000000-0000-0000-0000-000000000000"))
    {
        let strUserId = objContext.props.Data.ClientUserDetails.UserId;
        let arrDataToSave = [];
        objContext.state.arrSelectedTasks.forEach(objTempData => {
            objTempData["arrTaskDataPerDifficultyLevel"].forEach(objTemptaskData => {
                arrDataToSave = [...arrDataToSave, 
                    {
                        "iPageId": objTemptaskData["iPageId"],
                        "vAction": "New"
                    }
                ];
            });
        });
        let arrParams = [
            {
                "URL": "API/Object/Intranet/Test/IntranetTestTask",
                "Params": {
                    "uTestId": strTestId,
                    "vEditData": arrDataToSave
                },
                "MethodType": "Put"
            }
        ];
        DataCall(objContext, arrParams, "FetchExecuteToSaveTask", arrTestData);
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if all required fields are selected before continuing for task selection pop up.
 */
function CheckIfAllRequiredFieldsAreSelectedToGoToTaskSelection(objContext)
{
    let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    let objValidation = {};
    if (objContext.state.intSelectedParentSubjectId !== -1) {
        if (objContext.state.intSelectedSubSubjectId !== -1) {
            if (objContext.state.arrSelectedCategoryCompetencyId.length > 0) {
                if (objContext.state.SelectedClassId !== "" || objContext.state.arrSelectedPupilForCreatingGroup.length > 0) {
                    objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
                }
                else {
                    objValidation = { "strValidatedField": "PupilSelection", "strValidationMessage": objTextResource["LearningTestCreationPopupValidationMessagePupilNotSelected"], "blnShowValidation": true };
                }
            }
            else {
                objValidation = { "strValidatedField": "CategoryCompetencySelection", "strValidationMessage": objTextResource["LearningTestCreationPopupValidationMessageCompetencyLevelNotSelected"], "blnShowValidation": true };
            }
        }
        else {
            objValidation = { "strValidatedField": "div_SubSubjectDropDown", "strValidationMessage": objTextResource["LearningTestCreationPopupValidationMessageSubSubjectNotSelected"], "blnShowValidation": true };
        }
    }
    else
        {
            objValidation = { "strValidatedField": "div_SubjectDropDown", "strValidationMessage": objTextResource["LearningTestCreationPopupValidationMessageSubejctNotSelected"], "blnShowValidation": true };
    }
    return objValidation;
}

/**
 * 
 * @param {*} objContext 
 * @summary   This is called when the continue button is clicked. It Checks the state.Tab value and then decides whether to show next tab or to save the data or do nothing.
 */
export function HandleDetermineBlock(objContext){
    if(objContext.state.Tab === 2)
    {
        let objValidationResult = CheckIfAllRequiredFieldsAreSelectedToGoToTaskSelection(objContext);
        if(!objValidationResult["blnShowValidation"])
        {
            objContext.dispatch({type:"SET_STATE_VALUES", payload:{"Tab": 3, "strTestName": GetTestName(objContext)}});
        }
        else
        {
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objValidation": objValidationResult } });
        }
    }
    else if(objContext.state.Tab === 3 && objContext.state.arrSelectedTasks.length > 0 && objContext.state.strTestName !== "")
    {
        SaveLearningTest(objContext);
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Switches the tab. Change the value of state.Tab to 2.
 */
export function HandleTaskDetails(objContext){
    objContext.dispatch({type:"SET_STATE_VALUES", payload:{"Tab": 2}});
};

/**
 * 
 * @param {*} objContext 
 * @summary   This is called when the ManualLearningTestIntroPopUp is closed or its proceed button is clicked.
 */
export function HandleClosePopup(objContext){
    objContext.dispatch({type:"SET_STATE_VALUES", payload:{"Tab": 2}});
};

/**
 * 
 * @param {*} objContext 
 * Used by QuickSelection(LearningTestSettings) and ManualTaskSelection(EditTasks) Pop up to get the tasks.
 */
export function GetTaskData(objContext)
{
    return [...objContext.state.arrTasks];
};

/**
 * 
 * @param {*} objContext 
 * @summary   Shows the Create Group pop up.
 */
export function ShowCreateGroupPopUp(objContext)
{
    let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    if(objContext.state.arrSelectedPupilForCreatingGroup.length > 0)
    {
        let objClassDetails = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? GetClassDetails(objContext) : objContext.state.objSelectedClassData;
        objContext.props.showPopup({
            MaxHeight: "98%",
            MaxWidth: "98%",
            popUpMinHeight: "98%",
            popUpMinWidth: "98%",
            showHeader: false,
            popUpName: "learningtestcreategroup",
            passedEvents: {},
            headerTitle: "",
            Data: {
                SelectedPupilIds: objContext.state.arrSelectedPupilForCreatingGroup,
                TextResource: objTextResource,
                ClientUserDetails: objContext.props.Data.ClientUserDetails,
                SelectedClass: objClassDetails
            },
            popupClassName: "learningtestcreategroup-parent"
        });
        if(objContext.state.objValidation["strValidatedField"] === "CreateGroup")
        {
            let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
            objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "objValidation": objValidation }});
        }
    }
    else
    {
        let objValidation = { "strValidatedField": "CreateGroup", "strValidationMessage": objTextResource["LearningTestCreationPopupSelectStudentToCreateGroupValidationMessage"], "blnShowValidation": true };
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "objValidation": objValidation }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objTaskDetails 
 * @summary   Shows the task image poup when a selected task is clicked.
 */
export function ShowTaskImagePopup(objContext, objTaskDetails)
{
    let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    let strImagePath = objContext.props.JConfiguration.WebDataPath + "Repo/Task/" + objContext.props.Data.ClientUserDetails.MainClientId + "/" + objTaskDetails.iPageId + "_" + objContext.props.JConfiguration.InterfaceLanguageId + "_" + ((objTaskDetails.iPageFileVersion != "" && objTaskDetails.iPageFileVersion != null) ? objTaskDetails.iPageFileVersion : "0") + "_TaskBig.png";
    objContext.props.showPopup({
        MaxHeight: "50%",
        MaxWidth: "50%",
        popUpMinHeight: "50%",
        popUpMinWidth: "50%",
        showHeader: false,
        popUpName: "taskimage",
        passedEvents: {},
        headerTitle: "",
        Data: {
            ClientUserDetails: objContext.props.Data.ClientUserDetails,
            TextResource: objTextResource,
            ImagePath: strImagePath
        },
        popupClassName: "task-image-parent"
    });
};

/**
 * 
 * @param {*} objContext 
 * @summary   Shows QuickSelection(LearningTestSettings) Popup.
 */
export function ShowLearningTestTeacherSettingsPopup(objContext)
{
    let objTextResource = DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    if(objContext.state.arrTasks && objContext.state.arrTasks.length > 0)
    {
        let arrParentSubjectData = GetDefaultSubjects(objContext, "GetSpecificData", objContext.state.intSelectedParentSubjectId);
        let objParentSubjectDetails = {...arrParentSubjectData[0], ["t_TestDrive_Subject_Data"]: arrParentSubjectData[0]["t_TestDrive_Subject_Data"].filter(objTempData=> objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId))};
        let arrSubSubjectData = GetSubSubjects(objContext, "GetSpecificData", objContext.state.intSelectedSubSubjectId);
        let objSubSubjectDetails = {...arrSubSubjectData[0], ["t_TestDrive_Subject_Data"]: arrSubSubjectData[0]["t_TestDrive_Subject_Data"].filter(objTempData=> objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId))};
        let strModus = objContext.state.intSelectedModusId === 2 ? objTextResource["ModusDropdownItemFirst"] : objTextResource["ModusDropdownItemSecond"];
        let intCountForSelectedPupil = 0;
        let objClassDetails = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? GetClassDetails(objContext) : objContext.state.objSelectedClassData;
        if(objContext.state.SelectedClassId === "")
        {
            intCountForSelectedPupil = objContext.state.arrSelectedPupilForCreatingGroup.length;
        }
        else
        {
            intCountForSelectedPupil = objContext.state.arrPupilData.length;
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.showPopup({
            MaxHeight: "98%",
            MaxWidth: "98%",
            popUpMinHeight: "98%",
            popUpMinWidth: "98%",
            showHeader: false,
            popUpName: "learningtestteachersettings", //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {
                OnClickCreateTaskSet: (objReturn) => {
                    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedTasks": objReturn["SelectedNumberOfTasksPerLevel"], "strTestName": objReturn["TestName"] }});
                },
                GetTaskData: () => {
                    return GetTaskData(objContext);
                }
            },
            headerTitle: "",
            Data: {
                TextResource: objTextResource,
                TestName: objContext.state.strTestName,
                ClientUserDetails: objContext.props.Data.ClientUserDetails,
                ClassDetails: objClassDetails,
                CountForSelectedPupil: intCountForSelectedPupil,
                ParentSubjectDetails: objParentSubjectDetails,
                SubSubjectDetails: objSubSubjectDetails,
                strDate: GetCurrentDate(),
                Modus: strModus,
                SelectedNumberOfTasksPerLevel: objContext.state.arrSelectedTasks,
            },
            popupClassName: "learningtestteachersettings"
        });
        if(objContext.state.objValidation["strValidatedField"] === "ShowLearingTestSettingsPopup")
        {
            let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
            objContext.dispatch({type: "SET_STATE_VALUES", payload: { "objValidation": objValidation }});
        }
    }
    else
    {
        let objValidation = { "strValidatedField": "ShowLearingTestSettingsPopup", "strValidationMessage": objTextResource["LearningTestCreationPopupNoTaskAvailable"], "blnShowValidation": true };
        objContext.dispatch({type: "SET_STATE_VALUES", payload: { "objValidation": objValidation }})
    }
};

/**
 * 
 * @param {*} objContext
 * @summary   Shows the ManualSelection(EditTasks) PopUp
 */
export function ShowEditTasksPopup(objContext)
{
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/learningtestteacher").Data[0]["LearningTestTeacher"];
    if(objContext.state.arrTasks && objContext.state.arrTasks.length > 0)
    {
        let arrSubSubjectData = GetSubSubjects(objContext, "GetSpecificData", objContext.state.intSelectedSubSubjectId);
        let objSubSubjectDetails = {...arrSubSubjectData[0], ["t_TestDrive_Subject_Data"]: arrSubSubjectData[0]["t_TestDrive_Subject_Data"].filter(objTempData=> objTempData["iLanguageId"] === parseInt(objContext.props.JConfiguration.InterfaceLanguageId))};
        let objClassDetails = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? GetClassDetails(objContext) : objContext.state.objSelectedClassData;
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.showPopup({
            MaxHeight: "98%",
            MaxWidth: "98%",
            popUpMinHeight: "98%",
            popUpMinWidth: "98%",
            showHeader: false,
            popUpName: "edittasks", //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {
                OnClickCreateTaskSet: (arrReturn) => {
                    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedTasks": arrReturn }});
                },
                GetTaskData: () => {
                    return GetTaskData(objContext);
                }
            },
            headerTitle: "",
            Data: {
                TextResource: objTextResource,
                ClientUserDetails: objContext.props.Data.ClientUserDetails,
                ClassDetails: objClassDetails,
                SelectedNumberOfTasksPerLevel: objContext.state.arrSelectedTasks,
                SubSubjectDetails: objSubSubjectDetails
            },
            popupClassName: "edit-tasks-parent"
        });
        if(objContext.state.objValidation["strValidatedField"] === "ShowEditTasksPopup")
        {
            let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
            objContext.dispatch({type: "SET_STATE_VALUES", payload: { "objValidation": objValidation }});
        }
    }
    else
    {
        let objValidation = { "strValidatedField": "ShowEditTasksPopup", "strValidationMessage": objTextResource["LearningTestCreationPopupNoTaskAvailable"], "blnShowValidation": true };
        objContext.dispatch({type: "SET_STATE_VALUES", payload: { "objValidation": objValidation }})
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} blnIsSelectAll 
 * @param {*} iCategoryId 
 * @param {*} blnIsChecked 
 * @param {*} iCategoryCompetencyId 
 * @summary   Sets the loacl state when the competency category check box is checked or unchecked.
 */
export function OnChangeCheckBoxForCompetencyCategory(objContext, blnIsSelectAll, iCategoryId, blnIsChecked, iCategoryCompetencyId)
{
    if(blnIsSelectAll)
    {
        let arrCategoryCompetencyData = GetCategoryCompetencyData(objContext, iCategoryId);
        let arrAllSelectedId = arrCategoryCompetencyData.map(objTempData => { return objTempData["iCategoryCompetencyId"] });
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedCategoryId": [...objContext.state.arrSelectedCategoryId, iCategoryId], "arrSelectedCategoryCompetencyId": [...objContext.state.arrSelectedCategoryCompetencyId, ...arrAllSelectedId] }});
    }
    else
    {
        if(blnIsSelectAll !== null)
        {
            let arrCategoryCompetencyData = GetCategoryCompetencyData(objContext, iCategoryId);
            let arrTempCategoryCompetencyData = [...objContext.state.arrSelectedCategoryCompetencyId];
            let arrNewCategoryCompetencyData = [];
            arrCategoryCompetencyData.map(objTempData => {
                let arrCategoryCompetencyData = arrTempCategoryCompetencyData.filter(intTempCategoryCompetencyId => intTempCategoryCompetencyId !== objTempData["iCategoryCompetencyId"]);
                arrTempCategoryCompetencyData = [...arrCategoryCompetencyData];
                arrNewCategoryCompetencyData = [...arrCategoryCompetencyData];
            });
            let arrCategoryData = objContext.state.arrSelectedCategoryId.filter(intTempCategoryId => intTempCategoryId !== iCategoryId);
            objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedCategoryId": arrCategoryData, "arrSelectedCategoryCompetencyId": arrNewCategoryCompetencyData }});
        }
        else
        {
            if(blnIsChecked)
            {
                let arrSelectedId = [...objContext.state.arrSelectedCategoryCompetencyId, iCategoryCompetencyId];
                let arrSelectedCategoryId = objContext.state.arrSelectedCategoryId.filter(strTempId => strTempId !== iCategoryId);
                arrSelectedCategoryId = [...arrSelectedCategoryId, iCategoryId];
                objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedCategoryId": arrSelectedCategoryId, "arrSelectedCategoryCompetencyId": arrSelectedId }});
            }
            else
            {
                let arrSelectedCategoryCompetencyId = objContext.state.arrSelectedCategoryCompetencyId.filter(intTempCategoryCompetencyId => intTempCategoryCompetencyId !== iCategoryCompetencyId);
                let arrCategoryCompetencyData = GetCategoryCompetencyData(objContext, iCategoryId);
                let intCount = 0;
                arrCategoryCompetencyData.forEach(objTempData => {
                    if(arrSelectedCategoryCompetencyId.filter(intTempId => intTempId === objTempData["iCategoryCompetencyId"]).length > 0)
                    {
                        intCount ++;
                    }
                });
                if(intCount === 0)
                {
                    let arrCategoryIdData = objContext.state.arrSelectedCategoryId.filter(intTempCategoryId => intTempCategoryId !== iCategoryId);
                    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedCategoryId": arrCategoryIdData, "arrSelectedCategoryCompetencyId": arrSelectedCategoryCompetencyId }});
                }
                else
                {
                    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "arrSelectedCategoryCompetencyId": arrSelectedCategoryCompetencyId }});
                }
            }
        }
    }
    if(objContext.state.objValidation["strValidatedField"] === "CategoryCompetencySelection")
    {
        let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "objValidation": objValidation }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} blnIsChecked 
 * @summary   Sets the loacl state when the class check box is checked or unchecked.
 */
export function OnChangeCheckBoxForClass(objContext, blnIsChecked)
{
    let strClassId = "";
    if(blnIsChecked)
    {
        strClassId = JSON.stringify(objContext.state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : objContext.state.objSelectedClassData["uClassId"];
    }
    if(objContext.state.objValidation["strValidatedField"] === "PupilSelection")
    {
        let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnSelectAllPupil": false, "arrSelectedPupilId": [], "SelectedClassId": strClassId, "arrSelectedPupilGroupId": [], "arrSelectedPupilForCreatingGroup": [], "objValidation": objValidation }});
    }
    else
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnSelectAllPupil": false, "arrSelectedPupilId": [], "SelectedClassId": strClassId, "arrSelectedPupilGroupId": [], "arrSelectedPupilForCreatingGroup": [] }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} blnIsChecked 
 * @param {*} uPupilGroupId 
 * @summary   Sets the loacl state when the group check box is checked or unchecked.
 */
export function OnChangeCheckBoxForGroup(objContext, blnIsChecked, uPupilGroupId)
{
    let arrLearningTestPupilGroupData = GetLearningTestPupilGroupData(objContext, "GetSpecificGroupData", uPupilGroupId);
    let arrPupilInGroup = arrLearningTestPupilGroupData[0]["t_TestDrive_LearningTest_PupilGroup_Pupils"].map(objTempData => { 
        return objTempData["uPupilId"]; 
    });
    let arrPupilGroupId = [], arrSelectedPupilId = [];
    let arrTempData = [...objContext.state.arrSelectedPupilForCreatingGroup]
    arrPupilInGroup.forEach(strTempId => {
        arrSelectedPupilId = arrTempData.filter(strTempPupilId => strTempPupilId !== strTempId);
        arrTempData = [...arrSelectedPupilId];
    });
    if(blnIsChecked)
    {
        arrPupilGroupId = [...objContext.state.arrSelectedPupilGroupId, uPupilGroupId];
        arrSelectedPupilId = [...arrSelectedPupilId, ...arrPupilInGroup];
    }
    else
    {
        arrPupilGroupId = objContext.state.arrSelectedPupilGroupId.filter(strTempId=> strTempId !== uPupilGroupId);
    }
    if(objContext.state.objValidation["strValidatedField"] === "PupilSelection")
    {
        let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnSelectAllPupil": false, "SelectedClassId": "", "arrSelectedPupilGroupId": arrPupilGroupId, "arrSelectedPupilForCreatingGroup": arrSelectedPupilId, "objValidation": objValidation }});
    }
    else
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnSelectAllPupil": false, "SelectedClassId": "", "arrSelectedPupilGroupId": arrPupilGroupId, "arrSelectedPupilForCreatingGroup": arrSelectedPupilId }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} blnIsChecked 
 * @param {*} uPupilId 
 * @summary   Sets the loacal states accordingly when a pupil is checked or unchecked.
 */
export function OnChangeCheckBoxForPupil(objContext, blnIsChecked, uPupilId)
{
    let arrSelectedPupilId = [], arrSelectedPupilIdForGroup = [];
    if(blnIsChecked)
    {
        arrSelectedPupilIdForGroup = objContext.state.arrSelectedPupilForCreatingGroup.filter(strTempPupilId => strTempPupilId !== uPupilId);
        arrSelectedPupilIdForGroup = [...arrSelectedPupilIdForGroup, uPupilId];
        arrSelectedPupilId = [...objContext.state.arrSelectedPupilId, uPupilId];
    }
    else
    {
        arrSelectedPupilIdForGroup = objContext.state.arrSelectedPupilForCreatingGroup.filter(strTempPupilId => strTempPupilId !== uPupilId);
        arrSelectedPupilId = objContext.state.arrSelectedPupilId.filter(strTempId => strTempId !== uPupilId);
    }
    if(objContext.state.objValidation["strValidatedField"] === "PupilSelection")
    {
        let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnSelectAllPupil": false, "arrSelectedPupilId": arrSelectedPupilId, "SelectedClassId": "", "arrSelectedPupilForCreatingGroup": arrSelectedPupilIdForGroup, "objValidation": objValidation }});
    }
    else
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "blnSelectAllPupil": false, "arrSelectedPupilId": arrSelectedPupilId, "SelectedClassId": "", "arrSelectedPupilForCreatingGroup": arrSelectedPupilIdForGroup }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function OnChangeClassDropDown(objContext, objItem)
{
     objContext.dispatch({type: "SET_STATE_VALUES", payload: { "blnSelectAllPupil": false, "arrSelectedPupilId": [], "objSelectedClassData": objItem, "blnIsClassSelectionChanged": !objContext.state.blnIsClassSelectionChanged }});
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the Subject dropdown selection changes
 */
export function OnChangeSubjectDropDown(objContext, objItem)
{
   if(objContext.state.objValidation["strValidatedField"] === "div_SubjectDropDown")
    {
        let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "intSelectedParentSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": -1, "arrCategoryData": [], "arrSelectedCategoryId": [], "arrSelectedCategoryCompetencyId": [], "objValidation": objValidation }});
    }
    else
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "intSelectedParentSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": -1, "arrCategoryData": [], "arrSelectedCategoryId": [], "arrSelectedCategoryCompetencyId": [] }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the sub Subject dropdown selection changes
 */
export function OnChangeSubSubjectDropDown(objContext, objItem)
{
    if (objContext.state.objValidation["strValidatedField"] === "div_SubSubjectDropDown")
    {
        let objValidation = { "strValidatedField": "", "strValidationMessage": "", "blnShowValidation": false };
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "intSelectedSubSubjectId": objItem.iSubjectId, "arrSelectedCategoryId": [], "arrSelectedCategoryCompetencyId": [], "blnShowValidation": false, "strValidationMessage": "", "objValidation": objValidation }});
    }
    else
    {
        objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "intSelectedSubSubjectId": objItem.iSubjectId, "arrSelectedCategoryId": [], "arrSelectedCategoryCompetencyId": [], "blnShowValidation": false, "strValidationMessage": "" }});
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the Modus dropdown selection changes
 */
export function OnChangeModusDropDown(objContext, objItem)
{
    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "intSelectedModusId": objItem.value }});
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false,
        intSelectedParentSubjectId: -1,
        intSelectedSubSubjectId: -1,
        intSelectedModusId: 2,
        blnSelectAllPupil: false,
        arrSelectedPupilId: [],
        arrSelectedPupilForCreatingGroup: [],
        arrSelectedCategoryId: [],
        arrSelectedCategoryCompetencyId: [],
        blnIsClassSelectionChanged: false,
        arrPupilData: [],
        arrCategoryData: [],
        Tab: 1,
        objValidation: {},
        blnShowValidation: false,
        strValidationMessage: "",
        arrSelectedPupilGroupId: [],
        SelectedClassId: "",
        objSelectedClassData: {},
        arrTasks: [],
        strTestName: "",
        arrSelectedTasks: []
    };
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action)
{
    switch(action.type)
    {
        case 'SET_STATE_VALUES':
        return{
            ...state,
            ...action.payload
        };
        case 'DATA_LOAD_COMPLETE':
        return{
            ...state,
            ["isLoadComplete"]: action.payload
        };
    }
};
