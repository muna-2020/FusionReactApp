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
            state: DataRef(state.Entity, "state", true),
            cycle: DataRef(state.Entity, "cycle", true),
            school: DataRef(state.Entity, "school", true),
            teacher: DataRef(state.Entity, "teacher", true),
            class: DataRef(state.Entity, "class", true),
            pupil: DataRef(state.Entity, "pupil", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
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
    let objStateParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iMainClientId": props.Data.ClientUserDetails.MainClientId
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

    let objCycleParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iMainClientId": props.Data.ClientUserDetails.MainClientId
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

    let arrParams = [
        {
            "URL": "API/Object/Extranet/State",
            "Params": objStateParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Cycle",
            "Params": objCycleParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrParams };
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(GetRequiredData, []);
}

export function DataCall(arrParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        //Do something
    });
}

export function OnChangeCycleAutoSuggest(objContext, objItem) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objCycle: objItem,
        }
    })
}

export function OnChangeStateAutoSuggest(objContext, objItem) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objState: objItem,
            objSchool: undefined,
            objTeacher: undefined,
            objClass: undefined,
            objPupil: undefined
        }
    })
}

export function useStateDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let objSchoolParams = {
                "ForeignKeyFilter": {
                    "iStateId": objContext.state.objState.iStateId
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
            let arrRequest = [
                {
                    "URL": "API/Object/Extranet/School",
                    "Params": objSchoolParams,
                    "MethodType": "Get"
                }
            ];
            DataCall(arrRequest);
        }
    }, [objContext.state.objState])
}

export function OnChangeSchoolAutoSuggest(objContext, objItem) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objSchool: objItem,
            objTeacher: undefined,
            objClass: undefined,
            objPupil: undefined
        }
    })
}

export function useSchoolDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchool) {
            let objTeacherParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.state.objSchool.uSchoolId,
                    "Type": "nested"
                },
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Teacher_School",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Teacher_School.cIsDeleted": "N"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            };
            let arrRequest = [
                {
                    "URL": "API/Object/Extranet/Teacher",
                    "Params": objTeacherParams,
                    "MethodType": "Get"
                }
            ];
            DataCall(arrRequest);
        }
    }, [objContext.state.objSchool])
}

export function OnChangeTeacherAutoSuggest(objContext, objItem) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objTeacher: objItem,
            objClass: undefined,
            objPupil: undefined
        }
    })
}

export function useTeacherDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objTeacher) {
            let objClassParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.state.objTeacher.uTeacherId,
                    "Type": "nested"
                },
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Class_Teacher",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            };
            let arrRequest = [
                {
                    "URL": "API/Object/Extranet/Class",
                    "Params": objClassParams,
                    "MethodType": "Get"
                }
            ];
            DataCall(arrRequest);
        }
    }, [objContext.state.objTeacher])
}

export function OnChangeClassAutoSuggest(objContext, objItem) {
    objContext.dispatch({
        type: 'SET_STATE_VALUES', payload: {
            objClass: objItem,
            objPupil: undefined
        }
    })
}

export function useClassDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objClass) {
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": objContext.state.objClass.uClassId,
                    "Type": "nested"
                },
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Class_Pupil",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Class_Pupil.cIsDeleted": "N"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            };
            let arrRequest = [
                {
                    "URL": "API/Object/Extranet/Pupil",
                    "Params": objPupilParams,
                    "MethodType": "Get"
                }
            ];
            DataCall(arrRequest);
        }
    }, [objContext.state.objClass])
}

export function OnChangePupilAutoSuggest(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objPupil: objItem } })
}

export function MoveResults(objContext, objTestResult, objCycle) {
    let { state } = objContext
    let objParams = {
        "ExecutionId": objTestResult["TestExecution"][0]["uExecutionId"],
        "SourceCycleId": objCycle["uCycleId"],
        "DestinationCycleId": objCycle["uCycleId"],
        "SourceStateId": objTestResult["iStateId"],
        "DestinationStateId": state.objState["iStateId"],
        "SourceTestId": objTestResult["uTestId"],
        "SourceClassId": objTestResult["uClassId"],
        "DestinationClassId":state.objClass["uClassId"],
        "DestinationSchoolId":state.objSchool["uSchoolId"],
        "SourceRepitionId": objTestResult["iCycleRepetition"],
        "DestinationRepitionId": objTestResult["iCycleRepetition"],
        "SourcePupilId": objTestResult["uPupilId"],
        "DestinationPupilId":state.objPupil["uPupilId"],
        "SourceSchoolId": objTestResult["uSchoolId"],
    }
    let arrParams = [
        {
            "URL": "API/Extranet/Teacher/TestResults/AssignResultToPupil",
            "Params": objParams
        }
    ];
    DataCall(arrParams);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let iMainClientId = objContext.props.Data.ClientUserDetails.MainClientId
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.state, "state;imainclientid;" + iMainClientId + ";cisdeleted;n") &&
            DataRef(objContext.props.cycle, "cycle;imainclientid;" + iMainClientId + ";cisdeleted;n")

        ) {
            objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { isLoadComplete: true } })
        }
    }, [objContext.props.state, objContext.props.cycle]);
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        objCycle: undefined,
        objState: undefined,
        objSchool: undefined,
        objTeacher: undefined,
        objClass: undefined,
        objPupil: undefined
    };
}

/**
 * 
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
