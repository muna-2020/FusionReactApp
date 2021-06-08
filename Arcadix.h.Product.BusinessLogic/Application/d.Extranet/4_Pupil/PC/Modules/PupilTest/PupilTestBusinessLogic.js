import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';


export function mapStateToProps(state) {
    if (!global["mode"]) {
        console.log("mapping");
        return {
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            pupiltest: DataRef(state.Entity, "pupiltest")
        };
    }
    else {
        console.log(" not mapping");
        return {};
    }
}

function GetActivePupilClass(props) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objClass = props.Data.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.find(cls => cls["uClassId"] == strClassId);
    return objClass;
}



export function InitialDataParams(JConfiguration, props) {
    let objClass = GetActivePupilClass(props);
    let strClassId = objClass.uClassId;
    let strSchoolId = objClass.uSchoolId;
    let strTeacherId = objClass.uTeacherId;
    let strStateId = objClass.iStateId;
    let strOrientationCycleId = QueryString.GetQueryStringValue("OrientationCycleId");
    let strHighStakeCycleId = QueryString.GetQueryStringValue("HighStakeCycleId");
    let objGetTestParams = {
        "objData": {
            TeacherId: strTeacherId,
            ClassId: strClassId,
            PupilId: props.Data.ClientUserDetails.UserId,
            SchoolId: strSchoolId,
            StateId: strStateId,
            OrientationCycleId: strOrientationCycleId,
            HighStakeCycleId: strHighStakeCycleId
        }
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Pupil/PupilTest",
            "Params": objGetTestParams,
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

export function useDataLoader(objContext) {
    const getRequiredData = () => {
        console.log("getting required data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);

    }

    useLayoutEffect(getRequiredData, []);
}




export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.pupiltest)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({
                type: "DATA_LOAD_COMPLETE", payload: {
                    isLoadComplete: true,
                }
            });
        }
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.pupiltest
        ]);
}



export function GetInitialState() {
    return {
        isLoadComplete: false,
    };
}

export function Reducer(state, action) {
    switch (action.type) {

        case 'DATA_LOAD_COMPLETE': {
            return {
                ...state,
                ...action.payload
            };
        }
    }
}

