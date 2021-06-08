import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/InterpretationAdmin"
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
};

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
        },
        "SortKeys": [
            {
                "iOrder": {
                    "order": "asc"
                }
            }
        ]
    };
    let objFeedbackThresholdTopicDescriptionParams = {
        "ForeignKeyFilter": {
            "iSubjectId": iSubjectId
        },
        "SortKeys": [
            {
                "iOrder": {
                    "order": "asc"
                }
            }
        ]
    };
    let arrParams = [
        {
            "URL": "API/Object/Intranet/Taxonomy/FeedbackThreshold/FeedbackThreshold",
            "Params": objFeedbackThresholdParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic/FeedbackThresholdTopic",
            "Params": objFeedbackThresholdTopicParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription",
            "Params": objFeedbackThresholdTopicDescriptionParams,
            "MethodType": "Get"
        }
    ];
    return arrParams;
}

export function GetMergedData(objThresholdParam, arrTopics, arrDescWithTasks) {
    if (objThresholdParam && arrTopics.length > 0 && arrDescWithTasks) {
        let arrTopicWithDesc = arrTopics.map((tpc) => {
            return {
                ...tpc,
                isEditMode: false,
                arrDescTasks: (arrDescWithTasks.filter(desc => desc.uFeedbackThresholdTopicId == tpc.uFeedbackThresholdTopicId)).map((desc) => {
                    return {
                        ...desc,
                        isEditMode: false,
                        t_TestDrive_Subject_FeedbackThreshold_Description_Tasks: GetDefaultTasks().map((tsk, tskIndex) => {
                            return {
                                ...tsk,
                                vTaskName: desc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[tskIndex] ? desc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[tskIndex].vTaskName : ''
                            };
                        })
                    };
                })
            };
        });

        let arrThreshold = arrTopics.map(thrsld => {
            return {
                ...thrsld,
                arrTopic: arrTopicWithDesc.filter(tpc => thrsld.uSubjectFeedbackThresholdId == tpc.uSubjectFeedbackThresholdId)
            };
        });

        let objThreshold = arrThreshold.find(item => item.uSubjectFeedbackThresholdId == objThresholdParam.uSubjectFeedbackThresholdId);
        return objThreshold;
    }
}

export function AddNewEmptyDescriptionObject(objContext, objTopic) {
    let arrDefaultTasks = [...objContext.state.arrDefaultTasks];
    let arrModifiedDefaultTasks = arrDefaultTasks.map((tsk, index) => {
        return {
            ...tsk,
            vTaskName: '',
            iOrder: ++index
        };
    });

    let objDesWithTasks = {
        uFeedbackThresholdTopicDescriptionId: '',
        uUserId: '',
        uFeedbackThresholdTopicId: '',
        iOrder: '',
        iSubjectId: '',
        iMainClientId: '',
        isEditMode: true,
        isNew: "Y",
        t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data: [
            {
                iLanguageId: objContext.props.JConfiguration.InterfaceLanguageId,
                uFeedbackThresholdTopicDescriptionId: '',
                uFeedbackThresholdTopicDescriptionDataId: '',
                vFeedbackThresholdTopicDescription: ''
            }
        ]
    };

    let arrModifiedTopic = objContext.state.objTopicDescriptionTaskData.arrTopic.map(topic => {
        if (topic.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId) {
            return {
                ...topic,
                arrDescTasks: [objDesWithTasks, ...topic.arrDescTasks]
            };
        }
        else {
            return {
                ...topic
            }
        }
    })

    let objThreshold = {
        ...objContext.state.objTopicDescriptionTaskData
    };

    let objModified = {
        ...objThreshold,
        arrTopic: arrModifiedTopic
    }
    objContext.dispatch({ type: 'Update_TopicDescriptionTaskData_Tasks', payload: { blnIsTopicDataLoaded: true, objTopicDescriptionTaskData: objModified, arrModifiedTopic: arrModifiedTopic, arrDefaultTasks: arrModifiedDefaultTasks } })
}

export function RemoveEmptyDescriptionObject(objContext, objTopic, objDesc) {
    if (objDesc.isNew) {
        let arrModifiedTopic = objContext.state.objTopicDescriptionTaskData.arrTopic.map(topic => {
            if (topic.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId) {
                return {
                    ...topic,
                    arrDescTasks: topic.arrDescTasks.filter((desc, index) => index != 0)
                }
            }
            else {
                return {
                    ...topic
                }
            }
        })

        let objThreshold = {
            ...objContext.state.objTopicDescriptionTaskData
        };

        let objModified = {
            ...objThreshold,
            arrTopic: arrModifiedTopic
        }
        objContext.dispatch({ type: 'Update_TopicDescriptionTaskData', payload: { blnIsLoadedTopicData: true, objTopicDescriptionTaskData: objModified } })
    }
    else {
        EditDescriptionObject(objContext, objTopic, objDesc, false);
    }
}

export function EditDescriptionObject(objContext, objTopic, objDesc, blnEdit = true) {
    let arrDefaultTasks = [...objContext.state.arrDefaultTasks];
    let arrModifiedTasks = arrDefaultTasks.map((t, i) => {
        return {
            ...t,
            uFeedbackThresholdTopicDescriptionTaskId: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].uFeedbackThresholdTopicDescriptionTaskId : '',
            uFeedbackThresholdTopicDescriptionId: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[0] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[0].uFeedbackThresholdTopicDescriptionId : '',
            iTaskId: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].iTaskId : '',
            iOrder: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].iOrder : '',
            cIsDeleted: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].cIsDeleted : '',
            vTaskName: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].vTaskName : '',
        }
    })

    let arrModifiedTopic = objContext.state.objTopicDescriptionTaskData.arrTopic.map(topic => {
        if (topic.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId) {
            return {
                ...topic,
                arrDescTasks: topic.arrDescTasks.map((desc) => {
                    if (desc.uFeedbackThresholdTopicDescriptionId == objDesc.uFeedbackThresholdTopicDescriptionId) {
                        return {
                            ...desc,
                            isEditMode: blnEdit
                        }
                    }
                    else {
                        return {
                            ...desc,
                           isEditMode:false
                        }
                    }
                })
            }
        }
        else {
            return {
                ...topic
            }
        }
    })

    let objThreshold = {
        ...objContext.state.objTopicDescriptionTaskData
    };

    let objModified = {
        ...objThreshold,
        arrTopic: arrModifiedTopic
    }
    objContext.dispatch({ type: 'Update_TopicDescriptionTaskData_Tasks', payload: { blnIsTopicDataLoaded: true, objTopicDescriptionTaskData: objModified, arrDefaultTasks: arrModifiedTasks } })
}

export function SaveDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId) {
    if (desc["isNew"] != undefined && desc["isNew"] == "Y") {
        AddDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId);
    } else {
        UpdateDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId);
    }
}

function AddDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId) {
    let intOrder = 1;
    let objAddParams = {
        iOrder: '',
        iSubjectId: objContext.state.intSelectedSubSubjectId,
        t_TestDrive_Subject_FeedbackThreshold_Description_Tasks: objContext.state.arrDefaultTasks.filter((tsk) => {
            if (tsk.vTaskName != "") {
                return {
                    ...tsk,
                    iOrder: intOrder++
                }
            }
        }),
        t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data: desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data,
        uFeedbackThresholdTopicDescriptionId: "",
        uFeedbackThresholdTopicId: uFeedbackThresholdTopicId,
        uUserId: objContext.props.ClientUserDetails.UserId
    }

    let objFeedbackThresholdTopicDescriptionParams = {
        "ForeignKeyFilter": {
            "iSubjectId": objContext.state.intSelectedSubSubjectId
        },
        ["vAddData"]: objAddParams,

    };
    let arrDataRequest = [{
        "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription",
        "Params": objFeedbackThresholdTopicDescriptionParams,
        "MethodType": "Post",
    }];

    DataCallCustom(arrDataRequest).then(res => {
        objContext.dispatch({ type: 'Change_Status', payload: false })
    });
}

function UpdateDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId) {
    let arrDescription = {
        iOrder: desc.iOrder,
        iSubjectId: objContext.state.intSelectedSubSubjectId,
        t_TestDrive_Subject_FeedbackThreshold_Description_Tasks: objContext.state.arrDefaultTasks.filter(tsk => tsk.vTaskName != ""),
        t_testdrive_Subject_FeedbackThreshold_Topic_Description_Data: desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data,
        uFeedbackThresholdTopicDescriptionId: desc.uFeedbackThresholdTopicDescriptionId,
        uFeedbackThresholdTopicId: uFeedbackThresholdTopicId,
        uUserId: objContext.props.ClientUserDetails.UserId
    }
    SendRequestForUpdateDescription(objContext, arrDescription)
}

export function ChangeDescriptionOrder(objContext, arrDesc, fromIndex, toIndex) {
    let objFromDescription = arrDesc.find((desc, index) => {
        if (index == fromIndex) {
            return {
                ...desc
            }
        }
    })

    let objToDescription = arrDesc.find((desc, index) => {
        if (index == toIndex) {
            return {
                ...desc
            }
        }
    })

    let intTempOrder = objFromDescription.iOrder;

    let objModifiedFromDescription = {
        ...objFromDescription,
        iOrder: objToDescription.iOrder
    };

    let objModifiedToDescription = {
        ...objToDescription,
        iOrder: intTempOrder
    };

    let objDescriptionData = { ArrayData: [objModifiedFromDescription, objModifiedToDescription] }

    SendRequestForUpdateDescription(objContext, objDescriptionData);
}

export function DeleteDescriptionWithTasks(objContext, desc) {
    let objDeleteParams = [{
        uFeedbackThresholdTopicDescriptionId: desc.uFeedbackThresholdTopicDescriptionId
    }]

    let objFeedbackThresholdTopicDescriptionParams = {
        "ForeignKeyFilter": {
            "iSubjectId": objContext.state.intSelectedSubSubjectId
        },
        ["vDeleteData"]: objDeleteParams,

    };
    let arrDataRequest = [{
        "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription",
        "Params": objFeedbackThresholdTopicDescriptionParams,
        "MethodType": "Delete",
    }];

    DataCallCustom(arrDataRequest).then(res => {
        objContext.dispatch({ type: 'Change_Status', payload: false })
    });
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
};

export function DataCallCustom(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    return new Promise(function (resolve, reject) {
        objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
            resolve(true);
        });
    });
};

export function AddTopic(objContext, objThreshold) {
    let objTopic = {
        uSubjectFeedbackThresholdId: objThreshold.uSubjectFeedbackThresholdId,
        uUserId: objContext.props.ClientUserDetails.UserId,
        uFeedbackThresholdTopicId: '',
        iOrder: 1,
        iSubjectId: objContext.state.intSelectedSubSubjectId,
        t_testDrive_Subject_FeedbackThreshold_Topic_Data: [{
            iLanguageId: objContext.props.JConfiguration.InterfaceLanguageId,
            uFeedbackThresholdTopicDataId: '',
            uFeedbackThresholdTopicId: '',
            vFeedbackThresholdTopic: objContext.state.strTopic
        }]
    }

    let objTopicParams = {
        "ForeignKeyFilter": {
            "iSubjectId": objContext.state.intSelectedSubSubjectId
        },
        "SortKeys": [
            {
                "iOrder": {
                    "order": "asc"
                }
            }
        ],
        ["vAddData"]: objTopic,

    };
    let arrDataRequest = [{
        "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic/FeedbackThresholdTopic",
        "Params": objTopicParams,
        "MethodType": "Post",
    }];
    DataCallCustom(arrDataRequest).then(res => {
        objContext.dispatch({ type: 'Change_Status_Disable_TextBox', payload: false })
    });
}

export function ChangeTopicOrder(objContext, arrTopics, fromIndex, toIndex) {

    let objFromTopic = arrTopics.find((tpc, index) => {
        if (index == fromIndex) {
            return {
                ...tpc,
                arrDescTasks: []
            }
        }
    })

    let objToTopic = arrTopics.find((tpc, index) => {
        if (index == toIndex) {
            return {
                ...tpc,
                arrDescTasks: []
            }
        }
    })

    let intTempOrder = objFromTopic.iOrder;

    let objModifiedFromTopic = {
        ...objFromTopic,
        iOrder: objToTopic.iOrder
    };

    let objModifiedToTopic = {
        ...objToTopic,
        iOrder: intTempOrder
    };

    let objTopic = {
        ArrayData:
            [objModifiedFromTopic, objModifiedToTopic]
    }
    SendRequestForUpdateTopic(objContext, objTopic);
}

export function UpdateTopic(objContext, topicData, objThreshold) {
    let objTopic = {
        uSubjectFeedbackThresholdId: objThreshold.uSubjectFeedbackThresholdId,
        uUserId: objContext.props.ClientUserDetails.UserId,
        uFeedbackThresholdTopicId: topicData.uFeedbackThresholdTopicId,
        iOrder: topicData.iOrder,
        iSubjectId: objContext.state.intSelectedSubSubjectId,
        t_testDrive_Subject_FeedbackThreshold_Topic_Data: [{
            iLanguageId: objContext.props.JConfiguration.InterfaceLanguageId,
            uFeedbackThresholdTopicDataId: topicData.t_testDrive_Subject_FeedbackThreshold_Topic_Data[0].uFeedbackThresholdTopicDataId,
            vFeedbackThresholdTopic: objContext.state.strTopicEditText
        }]
    }
    SendRequestForUpdateTopic(objContext, objTopic);
}

function SendRequestForUpdateTopic(objContext, arrTopicData) {
    let objTopicParams = {
        "ForeignKeyFilter": {
            "iSubjectId": objContext.state.intSelectedSubSubjectId
        },
        "SortKeys": [
            {
                "iOrder": {
                    "order": "asc"
                }
            }
        ],
        ["vEditData"]: arrTopicData,

    };
    let arrDataRequest = [{
        "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic/FeedbackThresholdTopic",
        "Params": objTopicParams,
        "MethodType": "Put",
    }];
    DataCallCustom(arrDataRequest).then(res => {
        objContext.dispatch({ type: 'Change_Status', payload: false })
    });
}

function SendRequestForUpdateDescription(objContext, arrDescription) {   
    let objFeedbackThresholdTopicDescriptionParams = {
        "ForeignKeyFilter": {
            "iSubjectId": objContext.state.intSelectedSubSubjectId
        },
        ["vEditData"]: arrDescription,

    };
    let arrDataRequest = [{
        "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription",
        "Params": objFeedbackThresholdTopicDescriptionParams,
        "MethodType": "Put",
    }];

    DataCallCustom(arrDataRequest).then(res => {
        objContext.dispatch({ type: 'Change_Status', payload: false })
    });
}

export function DeleteTopic(objContext, topicData) {
    let objTopic = {
        uUserId: objContext.props.ClientUserDetails.UserId,
        uFeedbackThresholdTopicId: topicData.uFeedbackThresholdTopicId,
        iSubjectId: objContext.state.intSelectedSubSubjectId,
    }

    let objTopicParams = {
        "ForeignKeyFilter": {
            "iSubjectId": objContext.state.intSelectedSubSubjectId
        },
        ["vDeleteData"]: objTopic,

    };
    let arrDataRequest = [{
        "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic/FeedbackThresholdTopic",
        "Params": objTopicParams,
        "MethodType": "Delete",
    }];
    DataCallCustom(arrDataRequest).then(res => {
        objContext.dispatch({ type: 'Change_Status', payload: false })
    });
}

export function UpdateTopicDescriptionState(objContext, objTopic, objDesc, strValue) {
    let x = 10;
    let arrNewTopicData = objContext.state.objTopicDescriptionTaskData.arrTopic.map(tpc => {
        if (objTopic["uFeedbackThresholdTopicId"] == tpc["uFeedbackThresholdTopicId"]) {
            return {
                ...tpc,
                arrDescTasks: tpc.arrDescTasks.map(desc => {
                    if (desc["uFeedbackThresholdTopicDescriptionId"] == objDesc["uFeedbackThresholdTopicDescriptionId"]) {
                        desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data[0].vFeedbackThresholdTopicDescription = strValue
                        return {
                            ...desc,
                            t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data: desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data
                        }
                    } else {
                        return {
                            ...desc
                            
                        }
                    }
                })
            }
        } else {
            return {
                ...tpc
            }
        }
    })

    let objNewState = { ...objContext.state.objTopicDescriptionTaskData, arrTopic: arrNewTopicData }
    objContext.dispatch({ type: 'Topic_Description', payload: objNewState})
}

export function EditThreshold(objContext, objThresholdParam) {
    let objThreshold = {
        iThresholdFromValue: objThresholdParam.iThresholdFromValue,
        iThresholdToValue: objThresholdParam.iThresholdToValue,
        iSegmentNumber: objThresholdParam.iSegmentNumber,
        uUserId: objContext.props.ClientUserDetails.UserId,
        t_TestDrive_Subject_FeedbackThreshold_Data: [{
            vThresholdTextFeedback: objContext.state.strThresholdFeedback,
            vThresholdHeading: objThresholdParam.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdHeading,
            vThresholdText: objThresholdParam.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdText
        }],
        uSubjectFeedbackThresholdId: objThresholdParam.uSubjectFeedbackThresholdId,
        iLanguageId: objContext.props.JConfiguration.InterfaceLanguageId
    }

    let objThresholdParams = {
        "ForeignKeyFilter": {
            "iSubjectId": objContext.state.intSelectedSubSubjectId
        },
        ["vEditData"]: objThreshold
    };
    let arrDataRequest = [{
        "URL": "API/Object/Intranet/Taxonomy/FeedbackThreshold/FeedbackThreshold",
        "Params": objThresholdParams,
        "MethodType": "Put",
    }];
    DataCallCustom(arrDataRequest).then(res => {
        objContext.dispatch({ type: 'Change_Status', payload: false })
    });
}

export function EnableDisableTopicEdit(objContext, objTopic, blnMode) {
    let arrModifiedTopic = objContext.state.objTopicDescriptionTaskData.arrTopic.map(topic => {
        if (topic.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId) {
            return {
                ...topic,
                isEditMode: blnMode
            }
        }
        else {
            return {
                ...topic,
                isEditMode: false
            }
        }
    })

    let objThreshold = {
        ...objContext.state.objTopicDescriptionTaskData
    };

    let objModified = {
        ...objThreshold,
        arrTopic: arrModifiedTopic
    }
    objContext.dispatch({ type: 'Update_TopicDescriptionTaskData_TopicName', payload: { blnIsTopicDataLoaded: true, objTopicDescriptionTaskData: objModified, strTopicEditText: objTopic['t_testDrive_Subject_FeedbackThreshold_Topic_Data'][0].vFeedbackThresholdTopic } });
    }

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }
    useLayoutEffect(GetRequiredData, []);
}

export function HandleOnChangeSubjectDropDown(objContext, objItem) {
    //set selected subject id to state
    let arrSubSubject = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === objItem.iSubjectId });
    DataCallCustom(CustomDataParams(objContext, arrSubSubject[0].iSubjectId)).then(res => {
        objContext.dispatch({ type: 'Change_Status_Update_Threshold', payload: false })
    });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": arrSubSubject[0].iSubjectId } });
}

export function HandleOnChangeSubSubjectDropDown(objContext, objItem) {
    //set selected class id to state
    DataCallCustom(CustomDataParams(objContext, objItem.iSubjectId)).then(res => {
        objContext.dispatch({ type: 'Change_Status_Update_Threshold', payload: false })
    });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubSubjectId": objItem.iSubjectId } });
}

export function HandleOnChangeThreshold(objContext, objItem) {
    //set selected Threshold id to state
    let vThresholdText = objItem.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdTextFeedback ? objItem.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdTextFeedback : '';
    objContext.dispatch({ type: "Update_Threshold", payload: { objThreshold: objItem, vThresholdTextFeedback: vThresholdText } });
}

export function useCustomDataLoader(objContext) {
    const GetRequiredData = () => {
        if (DataRef(objContext.props.subject, "subject;cisdeleted;n")) {
            if (objContext.state.intSelectedSubSubjectId == undefined) {
                let arrSubjects = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === 0 && subject.cIsLearnCoacherSubject === "Y" });
                let arrSubSubject = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === arrSubjects[0].iSubjectId });
                DataCall(CustomDataParams(objContext.props.JConfiguration, arrSubSubject[0].iSubjectId));
            }
        }
    }
    useLayoutEffect(GetRequiredData, [objContext.props.subject]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && DataRef(objContext.props.subject, "subject;cisdeleted;n") &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/InterpretationAdmin")) {
            let arrSubjects = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === 0 && subject.cIsLearnCoacherSubject === "Y" });
            let arrSubSubject = [];
            arrSubSubject = DataRef(objContext.props.subject, "subject;cisdeleted;n").Data.filter(subject => { return subject.iParentSubjectId === arrSubjects[0].iSubjectId });
            if (DataRef(objContext.props.feedbackthreshold, "feedbackthreshold;isubjectid;" + arrSubSubject[0].iSubjectId) &&
                DataRef(objContext.props.feedbackthresholdtopic, "feedbackthresholdtopic;isubjectid;" + arrSubSubject[0].iSubjectId) &&
                DataRef(objContext.props.feedbackthresholdtopicdescription, "feedbackthresholdtopicdescription;isubjectid;" + arrSubSubject[0].iSubjectId)) {
                if (objContext.state.intSelectedSubjectId === -1) {
                    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intSelectedSubjectId": arrSubjects[0].iSubjectId, "intSelectedSubSubjectId": arrSubSubject[0].iSubjectId } });
                }
                ApplicationState.SetProperty("blnShowAnimation", false)
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
    }, [objContext.props.subject, objContext.props.textresource, objContext.props.feedbackthreshold, objContext.props.feedbackthresholdtopic, objContext.props.feedbackthresholdtopicdescription,]);
}

export function GetDefaultTasks() {
    let objEmptyTask = {
        uFeedbackThresholdTopicDescriptionId: '',
        uFeedbackThresholdTopicDescriptionTaskId: '',
        iTaskId: '',
        vTaskName: '',
        iOrder: 1
    };
    let arrTasks = [objEmptyTask, objEmptyTask, objEmptyTask, objEmptyTask, objEmptyTask];
    return arrTasks;
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        intSelectedSubjectId: -1,
        intSelectedSubSubjectId: undefined,
        objTopicDescriptionTaskData: undefined,
        blnIsTopicDataLoaded: false,
        blnIsClickedPlus: false,
        blnTopicEdit: false,
        strTopic: '',
        strTopicEditText: '',
        strThresholdFeedback: '',
        arrDefaultTasks: GetDefaultTasks(),
        objThreshold: undefined
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
        case 'Update_Threshold':
            return {
                ...state,
                ["objThreshold"]: action.payload.objThreshold,
                ["strThresholdFeedback"]: action.payload.vThresholdTextFeedback,
                ["blnIsTopicDataLoaded"]: false
            };
        case 'Update_TopicDescriptionTaskData':
            return {
                ...state,
                ["objTopicDescriptionTaskData"]: action.payload.objTopicDescriptionTaskData,
                ["blnIsTopicDataLoaded"]: action.payload.blnIsTopicDataLoaded,
            };

        case 'Change_Status':
            return {
                ...state,
                blnIsTopicDataLoaded: action.payload
            };
        case 'Change_Status_Update_Threshold':
            return {
                ...state,
                blnIsTopicDataLoaded: action.payload,
                objThreshold: undefined
            };
        case 'Update_Tasks':
            {
                let arrDefaultTasks = state.arrDefaultTasks.map((tsk, index) => {
                    if (index == action.payload.index) {
                        return {
                            ...tsk,
                            vTaskName: action.payload.value
                        }
                    }
                    else {
                        return {
                            ...tsk
                        }
                    }
                })
                return {
                    ...state,
                    arrDefaultTasks: arrDefaultTasks
                };
            }
        case 'Change_Status_AddTopicButton':
            return {
                ...state,
                blnTopicEdit: action.payload
            };
        case 'Update_Topic_Value':
            return {
                ...state,
                strTopic: action.payload
            };
        case 'Update_TopicEdited_Value':
            return {
                ...state,
                strTopicEditText: action.payload
            };
        case 'Update_ThresholdFeedback_Value':
            return {
                ...state,
                strThresholdFeedback: action.payload
            };
        case 'Update_TopicDescriptionTaskData_Tasks':
            return {
                ...state,
                ["objTopicDescriptionTaskData"]: action.payload.objTopicDescriptionTaskData,
                ["blnIsTopicDataLoaded"]: action.payload.blnIsTopicDataLoaded,
                ["arrDefaultTasks"]: action.payload.arrDefaultTasks
            };
        case 'Update_TopicDescriptionTaskData_TopicName':
            return {
                ...state,
                ["objTopicDescriptionTaskData"]: action.payload.objTopicDescriptionTaskData,
                ["blnIsTopicDataLoaded"]: action.payload.blnIsTopicDataLoaded,
                ["strTopicEditText"]: action.payload.strTopicEditText
            };
        case 'Change_Status_Disable_TextBox':
            return {
                ...state,
                blnIsTopicDataLoaded: action.payload,
                blnTopicEdit: action.payload
            };
        case 'Topic_Description':
            return {
                ...state,
                objTopicDescriptionTaskData: action.payload
            };
    }
}
