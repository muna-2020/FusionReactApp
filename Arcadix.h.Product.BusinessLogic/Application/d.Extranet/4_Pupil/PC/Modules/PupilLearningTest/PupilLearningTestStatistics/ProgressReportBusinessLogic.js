import { useLayoutEffect, useEffect } from 'react';

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
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        Logger.Log("not mapping");
        return {};
    }
}

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    let { objTest, objClassPupil, strCycleId, strPupilId } = props.passedEvents;
    let objTestStaticksParams = {
        "SearchQuery": {
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
    let arrParams = [
        {
            "URL": "API/Extranet/PupilLearningTest/PupilLearningTestStatisticks",
            "Params": objTestStaticksParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrParams
    };
}

/**
 * performs select all or unselect all
 * @param {any} objPopUpContext
 * @param {any} value
 */
export function OnClickSelectUnSelectAll(objPopUpContext, value) {
    let arrTask = objPopUpContext.state.arrTaskData.map(tsk => {
        return {
            ...tsk,
            isSelected: value
        };
    });
    objPopUpContext.dispatch({ type: 'Update_Tasks', payload: { arrTaskData: arrTask, blnAllTasks: value } })
}

/**
 * create new test
 * @param {any} objPopUpContext
 */
export function OnClickCreateTest(objPopUpContext) {
    let { objTest, objClassPupil, strCycleId, strPupilId } = objPopUpContext.props.passedEvents;
    let arriPageId = objPopUpContext.state.arrTaskData.filter(tsk => tsk["Rep1"] != "rightEmoji").map(tsk => { return { iPageId: tsk["iPageId"], vAction:"New" } });
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
        vAssignTaskIds :arriPageId
    };

    let arrRequest = [
        {
            URL: "API/Extranet/PupilLearningTest/PupilLearningTestRoundCreation",
            Params: objSaveParams,
            MethodType: "Post"
        }
    ];
    let key = "extranettest;uclassid;" + objClassPupil.uClassId.toLowerCase() + ";upupilid;" + strPupilId.toLowerCase() + ";ucycleid;" + strCycleId.toLowerCase();
    DataCallForSaveTest(arrRequest, key);
}

/**
 * check or uncheck the task  all checks make check of all select check box 
 * @param {any} objPopUpContext
 * @param {any} value
 * @param {any} iPageId
 */
export function OnClickSelectUnSelect(objPopUpContext, value, iPageId) {
    let arrTask = objPopUpContext.state.arrTaskData.map(tsk => {
        if (iPageId == tsk.iPageId) {
            return {
                ...tsk,
                isSelected: value
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
    objPopUpContext.dispatch({ type: 'Update_Tasks', payload: { arrTaskData: arrTask, blnAllTasks: blnAllTasks } });
}

/**Get the GUId id by time */
export function GetUniqueId() {
    var objdate = new Date();
    return objdate.getDate().toString() + objdate.getMonth().toString() + objdate.getFullYear().toString() + objdate.getHours().toString()
        + objdate.getMinutes().toString() + objdate.getSeconds().toString();
}

/**
 * for repeating test
 * @param {any} objPopUpContext
 */
export function OnClickRepeatSelectedTasks(objPopUpContext) {
    let strSelectedTaskIds = '';
    for (let tsk of objPopUpContext.state.arrTaskData) {
        if (tsk.isSelected)
            strSelectedTaskIds += tsk.iPageId + ",";
    }

    let { objTest, objClassPupil, strCycleId, strPupilId } = objPopUpContext.props.passedEvents;
    let strTestLink = objPopUpContext.props.JConfiguration.TestApplicationUrl + "JloginforTest.aspx?TaskIdToInclude=" + strSelectedTaskIds
        + "&SessionKey=" + GetUniqueId() + "&ShowSaveAndCloseButton=Y&CycleId=" + strCycleId + "&TestIdGuid=" + objTest.uTestId.toUpperCase()
        + "&ClassId=" + objClassPupil.uClassId.toUpperCase() + "&PupilId=" + strPupilId.toUpperCase()
        + "&TeacherId=" + objClassPupil.uTeacherId.toUpperCase() + "&SchoolId=" + objClassPupil.uSchoolId.toUpperCase() +
        "&StateId=" + objClassPupil.iStateId + "&StartNewRepetition=Y&IsDirectJLoginCall=Y&";
    if (objPopUpContext.state.OpenTestInPopup == "Y") {
        strTestLink += "OpenTestInPopup=Y";
    }
    else {
        strTestLink = "OpenTestInPopup=N";
    }
    return strTestLink;
}

/**
 * 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @summary   Call 'Execute' method to make the api call.
 */
export function DataCall(arrParams, objPopUpContext) {
    ArcadixFetchData.Execute(arrParams, function (objReturn) {
        console.log("progress report summary", objReturn);
        let arrTaskData = DataRef(objReturn.teststaticks, "teststaticks;")["Data"];
        let arrTaskModifiedData = arrTaskData.map(tsk => {
            return {
                ...tsk,
                isSelected: false
            };
        });
        objPopUpContext.dispatch({ type: 'Update_Tasks', payload: { arrTaskData: arrTaskModifiedData, isLoadComplete: true } });
    });
}

export function DataCallForSaveTest(arrParams,key) {
    ArcadixFetchData.Execute(arrParams, function (objReturn) {
        console.log("progress report summary", objReturn);
        let arrTaskData = DataRef(objReturn, "extranettest")["Data"];
        let objTaskData = {
            Filter: key,
            Value: {
                Data: arrTaskData,
                TimeStamp: "",
                PrimaryKeyName: "uTestId",
                Count: arrTaskData.length
            }
        };
        ArcadixCacheData.AddData("extranettest", objTaskData, () => {
        });
    });
}

/**
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, objContext);
    };
    useLayoutEffect(GetRequiredData, []);
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState(props) {
    return {
        arrTaskData: [],
        isLoadComplete: false,
        OpenTestInPopup: "Y",
        blnAllTasks: false
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
        case 'Update_Tasks':
            return {
                ...state,
                ...action.payload
            };
    }
}
