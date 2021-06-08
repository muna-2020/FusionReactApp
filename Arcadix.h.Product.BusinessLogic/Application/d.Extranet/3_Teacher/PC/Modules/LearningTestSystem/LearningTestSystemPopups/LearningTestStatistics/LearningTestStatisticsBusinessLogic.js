import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
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
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let uTeacherId = props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uTeacherId"];
    let strTestId = props.Data.objTestData["uTestId"];
    let uPupilId = props.Data.objPupilData["uPupilId"];
    let iTestUsageId = props.Data.objTestData["iTestUsageId"];
    let objTestStatisticsParams = {
        "SearchQuery": {},
        objData: {
            uTestId: strTestId,
            uClassId: strClassId,
            uSchoolId: uSchoolId,
            iStateId: iStateId,
            uCycleId: props.Data.strCycleId,
            uPupilId: uPupilId,
            uTeacherId: uTeacherId,
            iTestUsageId: iTestUsageId
        }
    };
    let arrParams = [
        {
            "URL": "API/Extranet/PupilLearningTest/PupilLearningTestStatisticks",
            "Params": objTestStatisticsParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrParams
    };
}

/**
 * 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @summary   Call 'Execute' method to make the api call.
 */
export function DataCall(arrParams, objContext) {
    ArcadixFetchData.Execute(arrParams, function (objReturn) {
        console.log("progress report summary", objReturn);
        let arrTaskData = DataRef(objReturn.teststaticks, "teststaticks;")["Data"];
        let arrTaskModifiedData = arrTaskData.map(tsk => {
            return {
                ...tsk,
                isSelected: false
            };
        });
        objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { arrTaskData: arrTaskModifiedData, isLoadComplete: true } });
    });
}

export function DataCallForSaveTest(arrParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
    });
}

/**
 * 
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
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
    }
}
