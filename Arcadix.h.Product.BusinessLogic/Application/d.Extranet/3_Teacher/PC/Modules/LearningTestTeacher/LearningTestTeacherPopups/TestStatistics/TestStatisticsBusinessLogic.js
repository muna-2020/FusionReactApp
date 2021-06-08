import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            subject: DataRef(state.Entity, "subject", true),
            clientsettings: DataRef(state.Entity, "clientsettings", true),
            taskdifficultylevel: DataRef(state.Entity, "taskdifficultylevel", true)
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
export function InitialDataParams(JConfiguration, props) {
    let { objTestDetails } = props.Data.objTestDisplayData;
    let objTeacherDetails = props.Data.objTeacherDetails.t_TestDrive_Member_Teacher_School[0];
    let objTestStaticksParams = {
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

    let strStatiticksUrl = "";
    if (objTestDetails.iTestUsageId == 3) {
        strStatiticksUrl = "API/Extranet/Teacher/TeacherLearningTest/TeacherLearningTestManualStatistics/GetLearningTestStatistics";
    } else {
        strStatiticksUrl = "API/Extranet/Teacher/TeacherLearningTest/TeacherLearningTestManualStatistics/GetLowStakeTestStatistics";
    }

    let arrShouldKeys1 = GetShouldKeysForCategoryComepetency(props);
    let arrShouldKeys2 = GetShouldKeysForFolderId(props);
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


    let arrParams = [
        {
            "URL": strStatiticksUrl,
            "Params": objTestStaticksParams,
            "ReturnDataOnServerRender": true

        }
        ,
        {
            "URL": "API/Object/Intranet/Task/Task",
            "Params": objTaskParams,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrParams
    };
};

function GetShouldKeysForCategoryComepetency(props) {
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
 * 
 * @param {*} objPopUpContext 
 * @summary   Returns the should keys with Folder id's data to add to task params and get task data.
 */
function GetShouldKeysForFolderId(props) {
    let arrFolderIds = GetFolderIds(props);
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

export function GetFolderIds(props) {
    let arrFolderIdData = [];
    let arrData = DataRef(props.clientsettings, "clientsettings").Data;
    arrData = arrData.filter(objTempData => objTempData["vKey"] === "TaskFoldersForLearningTest");

    if (arrData.length > 0) {
        let strFolderIds = arrData[0]["vValue"];
        arrFolderIdData = strFolderIds.split(',');
    }
    return arrFolderIdData;
};

export function GetTaskData(objPopUpContext) {
    return [...objPopUpContext.state.arrAllTaskData];
};

export function GetTaskDifficultyLevelDataWithTasks(objPopUpContext) {
    // let objSchoolYearDetails = GetSchoolYearDetails(objPopUpContext);


    let arrSelectedTasks = objPopUpContext.state.arrTaskDropdownData.map(selTsk => {
        return objPopUpContext.state.arrAllTaskData.find(allTsk => allTsk["iPageId"] == selTsk["iPageId"])
    });
    let arrData = objPopUpContext.state.arrTaskDifficultyLevelData.map(objTempData => {
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

export function ShowEditTasksPopup(objPopUpContext) {
    let { objTextResource } = objPopUpContext.props.Data;
    let { objTestDetails } = objPopUpContext.props.Data.objTestDisplayData;
    let arrSubSubjectData = DataRef(objPopUpContext.props.subject, "subject;cisreadyformanuallearningtest;y;cisactive;y;cisdeleted;n").Data.filter(objTempData => objTempData["iSubjectId"] === objTestDetails.iSubjectId);
    let objSubSubjectDetails = { ...arrSubSubjectData[0], ["t_TestDrive_Subject_Data"]: arrSubSubjectData[0]["t_TestDrive_Subject_Data"].filter(objTempData => objTempData["iLanguageId"] === parseInt(objPopUpContext.props.JConfiguration.InterfaceLanguageId)) };
    let { objClassDetails } = objPopUpContext.props.Data.objTestDisplayData;
    let arrData = GetTaskDifficultyLevelDataWithTasks(objPopUpContext);
    objPopUpContext.props.showPopup({
        MaxHeight: "98%",
        MaxWidth: "98%",
        popUpMinHeight: "98%",
        popUpMinWidth: "98%",
        showHeader: false,
        popUpName: "edittasks", //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {
            OnSaveComplete: (arrReturn) => {
                // objPopUpContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSelectedTasks": arrReturn } });
                console.log("after saving tasks", arrReturn);
                GetStatisticksAfterEdit(objPopUpContext);
            },
            GetTaskData: () => {
                return GetTaskData(objPopUpContext);
            }
        },
        headerTitle: "",
        Data: {
            EditSavedTasks: true,
            TestId: objTestDetails["uTestId"],
            TextResource: objTextResource,
            ClientUserDetails: objPopUpContext.props.Data.ClientUserDetails,
            ClassDetails: objClassDetails,
            SelectedNumberOfTasksPerLevel: arrData,
            SubSubjectDetails: objSubSubjectDetails
        },
        popupClassName: "edit-tasks-parent"
    });
};

function GetTaskDifficultyLevelParams() {
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
            "URL": "API/Object/Intranet/Task/TaskDifficultyLevel",
            "Params": objTaskDifficultyLevelParams,
            "MethodType": "GET"
        }
    ];
    return arrParams;
}

function GetStatisticksAfterEdit(objPopUpContext) {
    let objStatisticksParam = InitialDataParams(null, objPopUpContext.props).DataCalls[0];
    ArcadixFetchData.Execute([objStatisticksParam], function (objReturn) {
        let objData = DataRef(objReturn, "manualteststatisticks")["Data"];
        let arrPupilData = objData.PupilData;
        let arrCategoryData = objData.CategoryData;
        let arrTaskData = objData.TaskData;
        let arrPupilTaskStatusData = objData.PupilTaskStatus;
        let arrCategoryCompetencyData = objData.CategoryCompetencyData;
        let arrTaskDropdownData = [];
        for (let tsk of arrTaskData) {
            let objTask = {
                iPageId: tsk.iPageId,
                vPageName: tsk.PageName
            };
            arrTaskDropdownData = [...arrTaskDropdownData, objTask];
        }
        objPopUpContext.dispatch({
            type: 'SET_STATE_VALUES', payload: {
                arrPupilData: arrPupilData,
                arrCategoryData: arrCategoryData,
                arrTaskData: arrTaskData,
                arrPupilTaskStatusData: arrPupilTaskStatusData,
                arrCategoryCompetencyData: arrCategoryCompetencyData,
                arrTaskDropdownData: arrTaskDropdownData,
                objSelectedTask: arrTaskData[0],
                isStatisticksLoadComplete: true
            }
        });
    });
}

export function DataCall(arrParams, objPopUpContext) {
    ArcadixFetchData.Execute(arrParams, function (objReturn) {
        let objData = DataRef(objReturn, "manualteststatisticks")["Data"];
        let arrPupilData = objData.PupilData;
        let arrCategoryData = objData.CategoryData;
        let arrTaskData = objData.TaskData;
        let arrPupilTaskStatusData = objData.PupilTaskStatus;
        let arrCategoryCompetencyData = objData.CategoryCompetencyData;
        let arrTaskDropdownData = [];
        for (let tsk of arrTaskData) {
            let objTask = {
                iPageId: tsk.iPageId,
                vPageName: tsk.PageName
            };
            arrTaskDropdownData = [...arrTaskDropdownData, objTask];
        }
        let { objTestDetails } = objPopUpContext.props.Data.objTestDisplayData;
        let arrAllTaskData = DataRef(objReturn.task, "task;cisdeleted;n;itasktypeid;1;itaskusageid;1;isubjectid;" + objTestDetails.iSubjectId + ";t_cms_page_data.t_cms_page_assignedworkflowstatus.cislatest;y;t_cms_page_data.t_cms_page_assignedworkflowstatus.uworkflowstatusid;fa66d530-23ad-452c-84dc-557bdcb91361")["Data"];
        objPopUpContext.dispatch({
            type: 'SET_STATE_VALUES', payload: {
                arrPupilData: arrPupilData,
                arrCategoryData: arrCategoryData,
                arrTaskData: arrTaskData,
                arrAllTaskData: arrAllTaskData,
                arrPupilTaskStatusData: arrPupilTaskStatusData,
                arrCategoryCompetencyData: arrCategoryCompetencyData,
                arrTaskDropdownData: arrTaskDropdownData,
                objSelectedTask: arrTaskData[0],
                isStatisticksLoadComplete: true
            }
        })
    });

    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(GetTaskDifficultyLevelParams(), function (objReturn) {
        //Do something
    });
}

export function OnChangeTask(objPopUpContext, objItem) {
    objPopUpContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objSelectedTask: objItem
        }
    })
}

export function FormCategoryDetails(objPopUpContext, objTest) {
    let arrData = [];
    for (let selCat of objTest.t_TestDrive_Test_Category) {
        let arrAllCompetency = objPopUpContext.state.arrCategoryCompetencyData.filter(catComp => selCat["iCategoryId"] == catComp["iCategoryId"])
        let objCategory = {
            objCategory: objPopUpContext.state.arrCategoryData.find(cat => selCat["iCategoryId"] == cat["iCategoryId"]),
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


export function OnChangeActionDropDown(objPopUpContext, objItem, objTest, { objStatus }) {
    let strSelectedAction = objItem.Id;
    if (strSelectedAction === 2) {
        if (objStatus.strStatus == "NotStarted") {
            ShowEditTasksPopup(objPopUpContext);
        }
        else {
            strSelectedAction = 1;
        }
    }
    else if (strSelectedAction == "3") {
        DeleteTest(objPopUpContext, objTest);
    }
}

function DeleteTest(objPopUpContext, objTest) {
    let objDeleteTestParams = {
        vDeleteData :[{
            uTestId: objTest["uTestId"]
        }]
    }

   let arrRequest = [
        {
            URL: "API/Object/Intranet/ExtranetTest",
            Params: objDeleteTestParams,
            MethodType: "Delete"
        }
    ];    
    ArcadixFetchData.Execute(arrRequest, function (objReturn) {            
        let objData = DataRef(objReturn, "extranettest")["Data"][0];   
        objPopUpContext.props.closePopUp(objPopUpContext.props.objModal);
        objPopUpContext.props.passedEvents.OnClickClsoePopUp(objData);
    });
}

/**
 * 
 * @param {*} objPopUpContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objPopUpContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objPopUpContext.props.JConfiguration, objPopUpContext.props).DataCalls, objPopUpContext);
    };
    useLayoutEffect(GetRequiredData, []);
}

export function useDataLoaded(objPopUpContext) {
    useEffect(() => {
        if (
            !objPopUpContext.state.isDifficultyLevelLoadComplete &&
            DataRef(objPopUpContext.props, "taskdifficultylevel")
        ) {
            let arrTaskDifficultyLevelData = DataRef(objPopUpContext.props, "taskdifficultylevel")["Data"];
            objPopUpContext.dispatch({ type: "SET_STATE_VALUES", payload: { isDifficultyLevelLoadComplete: true, arrTaskDifficultyLevelData: arrTaskDifficultyLevelData } });
        }
    }, [objPopUpContext.props.taskdifficultylevel]);
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState(props) {
    return {
        arrTaskData: [],
        arrPupilData: [],
        arrCategoryData: [],
        arrTaskDropdownData: [],
        arrCategoryCompetencyData: [],
        arrPupilTaskStatusData: [],
        arrAllTaskData: [],
        arrTaskDifficultyLevelData: [],
        objSelectedTask: undefined,
        isStatisticksLoadComplete: false,
        isDifficultyLevelLoadComplete: false

    };
}

/**
 * reducer
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
    }
}
