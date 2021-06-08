import { useEffect, useReducer, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import { AddAppStateProperty } from '../../../../../Framework/DataService/ArcadixCacheData/Redux/Actions/ApplicationStateActionCreators';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true),
            subject: DataRef(state.Entity, "subject", true),
            feedbackthreshold: DataRef(state.Entity, "feedbackthreshold", true),
            feedbackthresholdtopic: DataRef(state.Entity, "feedbackthresholdtopic", true),
            feedbackthresholdtopicdescription: DataRef(state.Entity, "feedbackthresholdtopicdescription", true)
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
    let objResourceParams = {
        "ForiegnKeyFilter": {
        },
        "SortKeys": [
            {
                "dateCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/Interpretation"
                    }
                }
            ]
        },
        "OutputColumns": []
    };
    let objSubjectsParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
            "must": [
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
    let arrParams = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectsParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrParams };
}

export function CustomDataParams(objContext, iSubjectId) {
    let objFeedbackThresholdParams = {
        "ForeignKeyFilter": {
            "iSubjectId": iSubjectId
        },
        "SortKeys": [
            {
                "iSegmentNumber": {
                    "order": "asc"
                }
            }
        ]
    };
    let objFeedbackThresholdTopicParams = {
        "ForeignKeyFilter": {
            "iSubjectId": iSubjectId
        }
    };
    let objFeedbackThresholdTopicDescriptionParams = {
        "ForeignKeyFilter": {
            "iSubjectId": iSubjectId
        }
    };
    let arrParams = [
        {
            "URL": "API/Object/Intranet/Taxonomy/FeedbackThreshold/FeedbackThreshold",
            "Params": objFeedbackThresholdParams,
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic/FeedbackThresholdTopic",
            "Params": objFeedbackThresholdTopicParams,
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription",
            "Params": objFeedbackThresholdTopicDescriptionParams,
            "MethodType": "Get",
        }
    ];
    return arrParams;
}

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
        //Do something
    });
}

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

export function GetDetailedData(arrThreshold, arrTopics, arrTaksWithDesc) {
    if (arrThreshold && arrTopics && arrTaksWithDesc) {
        let arrTopicWithDesc = arrTopics.map((tpc) => {
            return {
                ...tpc,
                arrDescTasks: arrTaksWithDesc.filter(desc => desc.uFeedbackThresholdTopicId == tpc.uFeedbackThresholdTopicId)
            };
        });
        let arrThresholdTopics = arrThreshold.map(thrsld => {
            return {
                ...thrsld,
                arrTopicDescTasks: arrTopicWithDesc.filter(tpc => thrsld.uSubjectFeedbackThresholdId == tpc.uSubjectFeedbackThresholdId)
            };
        });
        return arrThresholdTopics;
    }
}

export function useCustomDataLoader(objContext) {
    const GetRequiredData = () => {
        if (DataRef(objContext.props.subject, "subject;cisdeleted;n")) {
            if (objContext.state.intSelectedSubSubjectId == undefined) {
                let arrSubjects = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === 0 && subject.cIsLearnCoacherSubject === "Y" });
                let arrSubSubject = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === arrSubjects[0].iSubjectId });
                DataCall(CustomDataParams(objContext.props.JConfiguration, arrSubSubject[0].iSubjectId));
            }
            else {
                DataCall(CustomDataParams(objContext, objContext.state.intSelectedSubSubjectId));
            }
        }
    };
    useLayoutEffect(GetRequiredData, [objContext.props.subject, objContext.state.intSelectedSubSubjectId]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && DataRef(objContext.props.subject, "subject;cisdeleted;n") &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/Interpretation")) {
            let arrSubjects = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === 0 && subject.cIsLearnCoacherSubject === "Y" });
            let arrSubSubject = [];
            if (objContext.state.intSelectedSubjectId !== -1) {
                arrSubSubject = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === objContext.state.intSelectedSubjectId });
            }
            else {
                arrSubSubject = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === arrSubjects[0].iSubjectId });
            }
            if (DataRef(objContext.props.feedbackthreshold, "feedbackthreshold;isubjectid;" + arrSubSubject[0].iSubjectId) &&
                DataRef(objContext.props.feedbackthresholdtopic, "feedbackthresholdtopic;isubjectid;" + arrSubSubject[0].iSubjectId) &&
                DataRef(objContext.props.feedbackthresholdtopicdescription, "feedbackthresholdtopicdescription;isubjectid;" + arrSubSubject[0].iSubjectId)) {
                if (objContext.state.intSelectedSubjectId === -1) {
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubjectId": arrSubjects[0].iSubjectId } });
                }
                ApplicationState.SetProperty("blnShowAnimation", false)
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    }, [objContext.props.subject, objContext.props.feedbackthreshold, objContext.props.feedbackthresholdtopic, objContext.props.feedbackthresholdtopicdescription, objContext.props.textresource]);
}

export function HandleOnChangeSubjectDropDown(objContext, objItem) {
    //set selected class id to state
    let arrSubSubject = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === objItem.iSubjectId });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": arrSubSubject[0].iSubjectId } });
}

export function HandleOnChangeSubSubjectDropDown(objContext, objItem) {
    //set selected class id to state
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubSubjectId": objItem.iSubjectId } });
    DataCall(CustomDataParams(objContext, objItem.iSubjectId));
}

export function HandleOnChangeSubjectFeedback(objContext, objItem) {
    //set selected class id to state
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedThresholdId": objItem.uFeedbackThresholdId } });
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSelectedSubjectId: -1,
        intSelectedSubSubjectId: undefined,
        intSelectedThresholdId: -1
    };
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
        case 'DATA_LOAD_COMPLETE':
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
    }
}
