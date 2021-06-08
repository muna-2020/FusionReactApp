import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            subject: DataRef(state.Entity, "subject", true),
            practicetest: DataRef(state.Entity, "practicetest", true),
            textresource: DataRef(state.Entity, "textresource", true),
            cycle: DataRef(state.Entity, "cycle", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        return {};
    }
}

function GetClassObject(props) {
    let objClassReturn = {};
    if (props.ClientUserDetails.ApplicationTypeId == "16") {
        let objClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(objClassPupil => objClassPupil["cIsDeleted"] == "N");
        objClassReturn["uClassId"] = objClass.uClassId;
        objClassReturn["iStateId"] = objClass.iStateId;
    }
    else if (props.ClientUserDetails.ApplicationTypeId == "1") {
        let objSchool = props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0];
        objClassReturn["uClassId"] = ApplicationState.GetProperty("SelectedClassId");
        objClassReturn["iStateId"] = objSchool.iStateId;
    }
    return objClassReturn;
}

export function OnChangeMainSubject(objContext, objItem, arrAllSubject) {
    let arrSubSubject = [];
    if (objItem["iSubjectId"] == -1) {
        arrSubSubject = arrAllSubject.map(sub => { return { ...sub }; });
    } else {
        arrSubSubject = arrAllSubject.filter(sub => sub["iParentSubjectId"] !== objItem["iSubjectId"]);
    }
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objSubject: objItem,
            arrSubSubject: arrSubSubject
        }
    });
}

export function OnChangeSubSubject(objContext, objItem) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objSubSubject: objItem
        }
    });
}

export function InitialDataParams(JConfiguration, props) {
    let objSubjectParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "cIsTestedAtThisTime": "Y"
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }

            ]
        },
        "SortKeys": [],
        "OutputColumns": []
    };

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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PracticeTest"
                    }
                }
            ]
        }
    };

    let objCycleParams = {
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iCycleTypeId": GetCycleTypeId()
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

    let arrDataRequest = [
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/Cycle",
            "Params": objCycleParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrDataRequest };
}

export function DataCall(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
    });
}

export function DataCallFoStartTest(objParams) {
    return new Promise((resolve, reject) => {
        ArcadixFetchData.Execute(objParams, function (objReturn) {
            resolve(objReturn);
        });
    });
}

export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        let strCycleTypeId = GetCycleTypeId();
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n") &&
            DataRef(objContext.props.subject, "subject;cistestedatthistime;y;cisdeleted;n") &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/4_pupil/modules/PracticeTest")
        ) {
            objContext.dispatch({
                type: "SET_STATE_VALUES", payload: {
                    isLoadComplete: true
                }
            });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.subject,
            objContext.props.textresource,
            objContext.props.cycle
        ]);
}

export function useDataLoaderForTasks(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            if (objContext.state.objSubject) {
                let objTaskParams = GetTaskParams(objContext);
                let arrDataRequest = [
                    {
                        "URL": "API/Extranet/Pupil/PracticeTest",
                        "Params": objTaskParams,
                        "MethodType": "Get"
                    }
                ];
                DataCall(arrDataRequest);
            }
        }
    }, [objContext.state.objSubject, objContext.state.objSubSubject])
}

function GetTaskParams(objContext) {
    let { state, props } = objContext;
    let arrSubjectId = [];
    let iMainSubjectId = -1;
    let iSubSubjectId = -1;
    if (state.objSubject && (state.objSubSubject == undefined || state.objSubSubject.iSubjectId == -1)) {
        arrSubjectId = state.arrSubSubject.map(sub => { return { iSubjectId: sub["iSubjectId"] }; });
        iMainSubjectId = state.objSubject.iSubjectId;
    } else {
        arrSubjectId = [{
            iSubjectId: state.objSubSubject.iSubjectId
        }];
        iMainSubjectId = state.objSubject.iSubjectId;
        iSubSubjectId = state.objSubSubject.iSubjectId;
    }

    let objClassOfPupil = GetClassObject(props);
    let strCycleTypeId = GetCycleTypeId();  
    let objTaskParams = {
        SearchQuery: {
            must: [
                {
                    match: {
                        "iMainSubjectId": iMainSubjectId
                    }
                },
                {
                    match: {
                        "iSubSubjectId": iSubSubjectId
                    }
                }
            ]
        },
        "PupilId": props.ClientUserDetails.UserId,
        "ClassId": objClassOfPupil.uClassId,
        "iCycleTypeId": strCycleTypeId,
        "MainSubjectId": iMainSubjectId,
        "SubSubjectId": iSubSubjectId,
        "LanguageId": props.JConfiguration.InterfaceLanguageId,
        "ArraySubSubjectId": arrSubjectId
    };
    return objTaskParams;
}

export function GetTaskDropDownValues(iCount) {
    let arrReturnData = [];
    for (let i = 1; i <= iCount; i++) {
        let objData = {
            iValue: i,
            iId: i
        };
        arrReturnData = [...arrReturnData, objData];
    }
    return arrReturnData;
}

export function OnClickReset(objContext) {
    if (objContext.state.objSubject) {
        let objTaskParams = GetTaskParams(objContext);
        let arrDataRequest = [
            {
                "URL": "API/Extranet/Pupil/PracticeTest/ResetResults",
                "Params": objTaskParams

            }
        ];
        DataCall(arrDataRequest);
    }
}

export function OnChangeTaskCount(objContext, objItem, type) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { [type]: objItem.iValue } });
}

export function StartTest(objContext, strType) {
    let { state, props } = objContext;
    let iMainSubjectId = -1;
    let iSubSubjectId = -1;
    if (state.objSubject && (state.objSubSubject == undefined || state.objSubSubject.iSubjectId == -1)) {
        iMainSubjectId = state.objSubject.iSubjectId;
    } else {
        iMainSubjectId = state.objSubject.iSubjectId;
        iSubSubjectId = state.objSubSubject.iSubjectId;
    }
    let objClassOfPupil = GetClassObject(props);
    let strTaskStatusId = -1;
    let strTaskCount = 0;
    if (strType == "All") {
        strTaskStatusId = -1;
        strTaskCount = state.AllTaskCount;
    }
    if (strType == "Correct") {
        strTaskStatusId = 1;
        strTaskCount = state.CorrectTaskCount;
    }
    if (strType == "NotAnswer") {
        strTaskStatusId = 3;
        strTaskCount = state.NotTaskCount;
    }
    if (strType == "Wrong") {
        strTaskStatusId = 2;
        strTaskCount = state.WrongTaskCount;
    }
    let strCycleTypeId = GetCycleTypeId();
    let objCycle = DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")["Data"][0];
    let objSaveParams = {
        "PupilId": props.ClientUserDetails.UserId,
        "ClassId": objClassOfPupil.uClassId,
        "CycleId": objCycle["uCycleId"],
        "MainSubjectId": iMainSubjectId,
        "SubSubjectId": iSubSubjectId,
        "TaskStatusId": strTaskStatusId,
        "TaskCount": strTaskCount,
        "StateId": objClassOfPupil.iStateId,
        "CategoryId": -1,
        "CompetencyId": -1
    };
    let arrDataRequest = [
        {
            "URL": "API/Extranet/Pupil/PracticeTest/StartTest",
            "Params": objSaveParams
        }
    ];
    DataCallFoStartTest(arrDataRequest).then(res => {
        let objTestUrl = DataRef(res.practicetest, "practicetest;starttest")["Data"][0];
        props.showPopup({
            MaxHeight: "190px",
            MaxWidth: "480px",
            popUpMinHeight: "190px",
            popUpMinWidth: "480px",
            popUpName: "PracticeTestPopUp", //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {
            },
            headerTitle: "",
            Data: {
                TestUrl: objTestUrl.TestUrl
            }
        });
    });
}
function GetCycleTypeId() {
    return "4";
}
export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrAllSubject: [],
        arrSubject: [],
        arrSubSubject: [],
        objSubject: undefined,
        objSubSubject: undefined,
        AllTaskCount: undefined,
        CorrectTaskCount: undefined,
        NotTaskCount: undefined,
        WrongTaskCount: undefined
    };
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'SET_STATE_VALUES': {
            return {
                ...state,
                ...action.payload
            };
        }
    }
}

