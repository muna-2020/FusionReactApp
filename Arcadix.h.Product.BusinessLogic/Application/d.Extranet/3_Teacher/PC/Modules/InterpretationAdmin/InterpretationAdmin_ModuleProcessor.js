//Objects required for module.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Taxonomy_FeedbackThreshold from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThreshold/FeedbackThreshold';
import Object_Intranet_Taxonomy_FeedbackThresholdTopic from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThresholdTopic/FeedbackThresholdTopic';
import Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription';

class InterpretationAdmin_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Taxonomy_FeedbackThreshold",
            "Object_Intranet_Taxonomy_FeedbackThresholdTopic",
            "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/InterpretationAdmin"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the QueueAndExecute method from ObjectQueue class
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this,objContext.props);
    }

    /**
    * @name InitialDataParams
    * @param {*} props props
    * @summary Get initials request params for the component.
    * @returns {*} array
    */
    InitialDataParams(props) {
        var arrDataRequest = [];

        Object_Framework_Services_TextResource.Initialize(["/d.Extranet/3_Teacher/Modules/InterpretationAdmin"]);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        let objSubjectsParams = {
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };

        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectsParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        return arrDataRequest;
    }

    /**
    * @name CustomDataParams
    * @param {any} iSubjectId iSubjectId
    * @summary Datacall for feedbackThreshold,feedbackThresholdtopic,feedbackThresholdtopicdescription
    * @returns {*} array
    */
    CustomDataParams(iSubjectId) {
        let arrDataParams = [];
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

        Object_Intranet_Taxonomy_FeedbackThreshold.Initialize(objFeedbackThresholdParams);
        arrDataParams = [...arrDataParams, Object_Intranet_Taxonomy_FeedbackThreshold];

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

        Object_Intranet_Taxonomy_FeedbackThresholdTopic.Initialize(objFeedbackThresholdTopicParams);
        arrDataParams = [...arrDataParams, Object_Intranet_Taxonomy_FeedbackThresholdTopic];

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

        Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription.Initialize(objFeedbackThresholdTopicDescriptionParams);
        arrDataParams = [...arrDataParams, Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription];

        return arrDataParams;
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath +
            "/Css/Application/3_Teacher/ReactJs/PC/InterpretationAdmin/InterpretationAdmin.css"
        ];
    }

    /**
     * @name GetMergedData
     * @param {any} objSelectedThreshold objThresholdParam
     * @param {any} arrTopics arrTopics
     * @param {any} arrDescWithTasks arrDescWithTasks
     * @summary Filtering and retruning threshold object
     * @return {*} object
     */
    GetMergedData(objContext, objSelectedThreshold) {
        let strSubSubjectId = this.GetSubSubjectId(objContext);
        let arrFeedbackThresholdTopic = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic, "Object_Intranet_Taxonomy_FeedbackThresholdTopic;iSubjectId;" + strSubSubjectId).Data;
        let arrFilteredFeedbackThresholdTopic = arrFeedbackThresholdTopic ? arrFeedbackThresholdTopic.filter(t => t["cIsDeleted"] == "N") : [];
        let arrFeedbackThresholdTopicDescription = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription, "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription;iSubjectId;" + strSubSubjectId).Data;
        let arrFilteredFeedbackThresholdTopicDescription = arrFeedbackThresholdTopicDescription ? arrFeedbackThresholdTopicDescription.filter(d => d["cIsDeleted"] == "N") : [];

        let arrFiletredTopic = arrFilteredFeedbackThresholdTopic.filter(objTopic => objTopic["uSubjectFeedbackThresholdId"] == objSelectedThreshold["uSubjectFeedbackThresholdId"])
        if (objSelectedThreshold && arrFiletredTopic.length > 0 && arrFilteredFeedbackThresholdTopicDescription) {
            let arrTopicWithDesc = arrFiletredTopic.map(objTopic => {
                return {
                    ...objTopic,
                    isEditMode: false,
                    arrDescTasks: (arrFilteredFeedbackThresholdTopicDescription.filter(objDesc => objDesc.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId)).map((objDesc) => {
                        return {
                            ...objDesc,
                            isEditMode: false,
                            t_TestDrive_Subject_FeedbackThreshold_Description_Tasks: this.GetDefaultTasks().map((objtask, taskIndex) => {
                                return {
                                    ...objtask,
                                    vTaskName: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[taskIndex] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[taskIndex].vTaskName : ''
                                };
                            })
                        };
                    })
                };
            });

            return arrTopicWithDesc;
        }
    }

    /**
     * @name AddNewEmptyDescriptionObject
     * @param {any} objContext objContext
     * @param {any} objTopic objTopic
     * @summary Adding new empty description object
     */
    AddNewEmptyDescriptionObject(objContext, objTopic) {
        let arrDefaultTasks = [...objContext.state.arrDefaultTasks];
        let arrModifiedDefaultTasks = arrDefaultTasks.map((objTask, index) => {
            return {
                ...objTask,
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

        let arrModifiedTopic = objContext.state.arrTopicDescriptionTaskData.map(topic => {
            if (topic.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId) {
                return {
                    ...topic,
                    arrDescTasks: [objDesWithTasks, ...topic.arrDescTasks]
                };
            }
            else {
                return {
                    ...topic
                };
            }
        });

        objContext.dispatch({ type: 'SET_STATE', payload: { arrTopicDescriptionTaskData: arrModifiedTopic, "arrDefaultTasks": arrModifiedDefaultTasks } });
    }

    /**
     * @name RemoveEmptyDescriptionObject
     * @param {any} objContext objContext
     * @param {any} objTopic objTopic
     * @param {any} objDesc objDesc
     * @summary To delete the empty description
     */
    RemoveEmptyDescriptionObject(objContext, objTopic, objDesc) {
        if (objDesc.isNew) {
            let arrModifiedTopic = objContext.state.arrTopicDescriptionTaskData.map(topic => {
                if (topic.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId) {
                    return {
                        ...topic,
                        arrDescTasks: topic.arrDescTasks.filter((desc, index) => index != 0)
                    };
                }
                else {
                    return {
                        ...topic
                    };
                }
            });

            objContext.dispatch({ type: 'SET_STATE', payload: { arrTopicDescriptionTaskData: arrModifiedTopic } });
        }
        else {
            this.EditDescriptionObject(objContext, objTopic, objDesc, false);
        }
    }

    /**
     * @name EditDescriptionObject
     * @param {any} objContext objContext
     * @param {any} objTopic objTopic
     * @param {any} objDesc objDesc
     * @param {any} blnEdit blnEdit
     * @summary 
     */
    EditDescriptionObject(objContext, objTopic, objDesc, blnEdit = true) {
        let arrDefaultTasks = [...objContext.state.arrDefaultTasks];
        let arrModifiedTasks = arrDefaultTasks.map((t, i) => {
            return {
                ...t,
                uFeedbackThresholdTopicDescriptionTaskId: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].uFeedbackThresholdTopicDescriptionTaskId : '',
                uFeedbackThresholdTopicDescriptionId: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[0] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[0].uFeedbackThresholdTopicDescriptionId : '',
                iTaskId: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].iTaskId : '',
                iOrder: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].iOrder : '',
                cIsDeleted: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].cIsDeleted : '',
                vTaskName: objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i] ? objDesc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks[i].vTaskName : ''
            };
        });

        let arrModifiedTopic = objContext.state.arrTopicDescriptionTaskData.map(topic => {
            if (topic.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId) {
                return {
                    ...topic,
                    arrDescTasks: topic.arrDescTasks.map((desc) => {
                        if (desc.uFeedbackThresholdTopicDescriptionId == objDesc.uFeedbackThresholdTopicDescriptionId) {
                            return {
                                ...desc,
                                isEditMode: blnEdit
                            };
                        }
                        else {
                            return {
                                ...desc,
                                isEditMode: false
                            };
                        }
                    })
                };
            }
            else {
                return {
                    ...topic
                };
            }
        });

        objContext.dispatch({ type: 'SET_STATE', payload: { arrTopicDescriptionTaskData: arrModifiedTopic, "arrDefaultTasks": arrModifiedTasks } });
    }

    /**
     * @name SaveDescriptionWithTasks
     * @param {any} desc desc
     * @param {any} objContext objContext
     * @param {any} uFeedbackThresholdTopicId uFeedbackThresholdTopicId
     * @summary Checks if ["isNew"] exists
     */
    SaveDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId) {
        if (desc["isNew"] != undefined && desc["isNew"] == "Y") {
            objContext.InterpretationAdmin_ModuleProcessor.AddDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId);
        } else {
            objContext.InterpretationAdmin_ModuleProcessor.UpdateDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId);
        }
    }

    /** chech the api call
     * @name AddDescriptionWithTasks
     * @param {any} desc desc 
     * @param {any} objContext objContext
     * @param {any} uFeedbackThresholdTopicId uFeedbackThresholdTopicId
     * @summary 
     */
    AddDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId) {
        let intOrder = 1;
        let strSubSubjectId = this.GetSubSubjectId(objContext);
        let objAddParams = {
            iOrder: '',
            iSubjectId: strSubSubjectId,
            t_TestDrive_Subject_FeedbackThreshold_Description_Tasks: objContext.state.arrDefaultTasks.filter(objTask => {
                if (objTask.vTaskName != "") {
                    return {
                        ...objTask,
                        iOrder: intOrder++
                    };
                }
            }),
            t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data: desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data,
            uFeedbackThresholdTopicDescriptionId: "",
            uFeedbackThresholdTopicId: uFeedbackThresholdTopicId,
            uUserId: objContext.props.ClientUserDetails.UserId
        };

        let objFeedbackThresholdTopicDescriptionParams = {
            "ForeignKeyFilter": {
                "iSubjectId": strSubSubjectId
            },
            ["vAddData"]: objAddParams

        };
        //let arrDataRequest = [{
        //    "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription",
        //    "Params": objFeedbackThresholdTopicDescriptionParams,
        //    "MethodType": "Post"
        //}];

        //DataCallCustom(arrDataRequest).then(res => {
        //    objContext.dispatch({ type: 'SET_STATE', payload: { "blnIsTopicDataLoaded": false } });
        //});

        Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription.AddData(objFeedbackThresholdTopicDescriptionParams, () => { });
    }

    /**
     * @name UpdateDescriptionWithTasks
     * @param {any} desc desc 
     * @param {any} objContext objContext
     * @param {any} uFeedbackThresholdTopicId uFeedbackThresholdTopicId
     * @summary
     */
    UpdateDescriptionWithTasks(desc, objContext, uFeedbackThresholdTopicId) {
        let arrDescription = {
            iOrder: desc.iOrder,
            iSubjectId: objContext.state.intSelectedSubSubjectId,
            t_TestDrive_Subject_FeedbackThreshold_Description_Tasks: objContext.state.arrDefaultTasks.filter(tsk => tsk.vTaskName != ""),
            t_testdrive_Subject_FeedbackThreshold_Topic_Description_Data: desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data,
            uFeedbackThresholdTopicDescriptionId: desc.uFeedbackThresholdTopicDescriptionId,
            uFeedbackThresholdTopicId: uFeedbackThresholdTopicId,
            uUserId: objContext.props.ClientUserDetails.UserId
        };
        objContext.InterpretationAdmin_ModuleProcessor.SendRequestForUpdateDescription(objContext, arrDescription);
    }

    /**
     * @name ChangeDescriptionOrder
     * @param {any} objContext objContext
     * @param {any} arrDesc arrDesc
     * @param {any} fromIndex fromIndex
     * @param {any} toIndex toIndex
     * @summary
     */
    ChangeDescriptionOrder(objContext, arrDesc, fromIndex, toIndex) {
        let objFromDescription = arrDesc.find((desc, index) => {
            if (index == fromIndex) {
                return {
                    ...desc
                };
            }
        });

        let objToDescription = arrDesc.find((desc, index) => {
            if (index == toIndex) {
                return {
                    ...desc
                };
            }
        });

        let intTempOrder = objFromDescription.iOrder;

        let objModifiedFromDescription = {
            ...objFromDescription,
            iOrder: objToDescription.iOrder
        };

        let objModifiedToDescription = {
            ...objToDescription,
            iOrder: intTempOrder
        };

        let objDescriptionData = { ArrayData: [objModifiedFromDescription, objModifiedToDescription] };

        this.SendRequestForUpdateDescription(objContext, objDescriptionData);
    }

    /**
    * @name ChangeDescriptionOrder
    * @param {any} objContext objContext
    * @param {any} desc desc
    * @summary
    */
    DeleteDescriptionWithTasks(objContext, desc) {
        let objDeleteParams = [{
            uFeedbackThresholdTopicDescriptionId: desc.uFeedbackThresholdTopicDescriptionId
        }];
        let strSubSubjectId = this.GetSubSubjectId(objContext);
        let objFeedbackThresholdTopicDescriptionParams = {
            "ForeignKeyFilter": {
                "iSubjectId": strSubSubjectId
            },
            ["vDeleteData"]: objDeleteParams

        };
        //let arrDataRequest = [{
        //    "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription",
        //    "Params": objFeedbackThresholdTopicDescriptionParams,
        //    "MethodType": "Delete"
        //}];

        //DataCallCustom(arrDataRequest).then(res => {
        //    //objContext.dispatch({ type: 'Change_Status', payload: { "blnIsTopicDataLoaded": false } })
        //    objContext.dispatch({ type: "SET_STATE", payload: { "blnIsTopicDataLoaded": false } });     
        //});

        Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription.DeleteData(objFeedbackThresholdTopicDescriptionParams, () => {
        });
    }

    /**
    * @name AddTopic
    * @param {any} objContext objContext
    * @param {any} objThreshold objThreshold
    * @summary
    */
    AddTopic(objContext, objThreshold) {
        let strSubSubjectId = this.GetSubSubjectId(objContext);
        let objTopic = {
            uSubjectFeedbackThresholdId: objThreshold.uSubjectFeedbackThresholdId,
            uUserId: objContext.props.ClientUserDetails.UserId,
            uFeedbackThresholdTopicId: '',
            iOrder: 1,
            iSubjectId: strSubSubjectId,
            t_testDrive_Subject_FeedbackThreshold_Topic_Data: [{
                iLanguageId: objContext.props.JConfiguration.InterfaceLanguageId,
                uFeedbackThresholdTopicDataId: '',
                uFeedbackThresholdTopicId: '',
                vFeedbackThresholdTopic: objContext.state.strTopic
            }]
        };

        let objTopicParams = {
            "ForeignKeyFilter": {
                "iSubjectId": strSubSubjectId
            },
            "SortKeys": [
                {
                    "iOrder": {
                        "order": "asc"
                    }
                }
            ],
            ["vAddData"]: objTopic

        };
        //let arrDataRequest = [{
        //    "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic/FeedbackThresholdTopic",
        //    "Params": objTopicParams,
        //    "MethodType": "Post"
        //}];
        //DataCallCustom(arrDataRequest).then(res => {
        //    objContext.dispatch({ type: 'SET_STATE', payload: { "blnIsTopicDataLoaded": false, "blnTopicEdit": false } });
        //});

        Object_Intranet_Taxonomy_FeedbackThresholdTopic.AddData(objTopicParams, () => {
        });
    }

    /**
    * @name ChangeTopicOrder
    * @param {any} objContext objContext
    * @param {any} arrTopics arrTopics
    * @param {any} fromIndex fromIndex
    * @param {any} toIndex toIndex
    * @summary
    */
    ChangeTopicOrder(objContext, arrTopics, fromIndex, toIndex) {
        let objFromTopic = arrTopics.find((tpc, index) => {
            if (index == fromIndex) {
                return {
                    ...tpc,
                    arrDescTasks: []
                };
            }
        });

        let objToTopic = arrTopics.find((tpc, index) => {
            if (index == toIndex) {
                return {
                    ...tpc,
                    arrDescTasks: []
                };
            }
        });

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
        };
        objContext.InterpretationAdmin_ModuleProcessor.SendRequestForUpdateTopic(objContext, objTopic);
    }

    /**
    * @name UpdateTopic
    * @param {any} objContext objContext
    * @param {any} topicData topicData
    * @param {any} objThreshold objThreshold
    * @summary
    */
    UpdateTopic(objContext, topicData, objThreshold) {
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
        };
        this.SendRequestForUpdateTopic(objContext, objTopic);
    }

    /**
    * @name SendRequestForUpdateTopic
    * @param {any} objContext objContext
    * @param {any} arrTopicData arrTopicData
    * @summary
    */
    SendRequestForUpdateTopic(objContext, arrTopicData) {
        let strSubSubjectId = this.GetSubSubjectId(objContext);
        let objTopicParams = {
            "ForeignKeyFilter": {
                "iSubjectId": strSubSubjectId
            },
            "SortKeys": [
                {
                    "iOrder": {
                        "order": "asc"
                    }
                }
            ],
            ["vEditData"]: arrTopicData

        };
        //let arrDataRequest = [{
        //    "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic/FeedbackThresholdTopic",
        //    "Params": objTopicParams,
        //    "MethodType": "Put"
        //}];
        //DataCallCustom(arrDataRequest).then(res => {
        //    objContext.dispatch({ type: 'SET_STATE', payload: { "blnIsTopicDataLoaded": false } });
        //});

        Object_Intranet_Taxonomy_FeedbackThresholdTopic.EditData(objTopicParams, () => {
        });
    }

    /**
    * @name SendRequestForUpdateDescription
    * @param {any} objContext objContext
    * @param {any} arrDescription arrDescription
    * @summary
    */
    SendRequestForUpdateDescription(objContext, arrDescription) {
        let strSubSubjectId = this.GetSubSubjectId(objContext);
        let objFeedbackThresholdTopicDescriptionParams = {
            "ForeignKeyFilter": {
                "iSubjectId": strSubSubjectId
            },
            ["vEditData"]: arrDescription

        };
        //let arrDataRequest = [{
        //    "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription",
        //    "Params": objFeedbackThresholdTopicDescriptionParams,
        //    "MethodType": "Put"
        //}];

        //DataCallCustom(arrDataRequest).then(res => {
        //    objContext.dispatch({ type: 'SET_STATE', payload: { "blnIsTopicDataLoaded": false } });
        //});

        Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription.EditData(objFeedbackThresholdTopicDescriptionParams, () => {
        });
    }

    /**
    * @name DeleteTopic
    * @param {any} objContext objContext
    * @param {any} topicData topicData
    * @summary
    */
    DeleteTopic(objContext, topicData) {
        let strSubSubjectId = this.GetSubSubjectId(objContext);
        let objTopic = {
            uUserId: objContext.props.ClientUserDetails.UserId,
            uFeedbackThresholdTopicId: topicData.uFeedbackThresholdTopicId,
            iSubjectId: strSubSubjectId
        };

        let objTopicParams = {
            "ForeignKeyFilter": {
                "iSubjectId": strSubSubjectId
            },
            ["vDeleteData"]: objTopic

        };
        //let arrDataRequest = [{
        //    "URL": "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic/FeedbackThresholdTopic",
        //    "Params": objTopicParams,
        //    "MethodType": "Delete"
        //}];
        //DataCallCustom(arrDataRequest).then(res => {
        //    objContext.dispatch({ type: 'SET_STATE', payload: { "blnIsTopicDataLoaded": false } });
        //});

        Object_Intranet_Taxonomy_FeedbackThresholdTopic.DeleteData(objTopicParams, () => {
        });
    }

    /**
    * @name UpdateTopicDescriptionState
    * @param {any} objContext objContext
    * @param {any} objTopic objTopic
    * @param {any} objDesc objDesc
    * @param {any} strValue strValue
    * @summary
    */
    UpdateTopicDescriptionState(objContext, objTopic, objDesc, strValue) {

        let arrNewTopicData = objContext.state.arrTopicDescriptionTaskData.map(tpc => {
            if (objTopic["uFeedbackThresholdTopicId"] == tpc["uFeedbackThresholdTopicId"]) {
                return {
                    ...tpc,
                    arrDescTasks: tpc.arrDescTasks.map(desc => {
                        if (desc["uFeedbackThresholdTopicDescriptionId"] == objDesc["uFeedbackThresholdTopicDescriptionId"]) {
                            desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data[0].vFeedbackThresholdTopicDescription = strValue;
                            return {
                                ...desc,
                                t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data: desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data
                            };
                        } else {
                            return {
                                ...desc

                            };
                        }
                    })
                };
            } else {
                return {
                    ...tpc
                };
            }
        });

        objContext.dispatch({ type: 'SET_STATE', payload: { arrTopicDescriptionTaskData: arrNewTopicData } });
    }

    /**
    * @name EditThreshold
    * @param {any} objContext objContext
    * @param {any} objThresholdParam objThresholdParam
    * @summary
    */
    EditThreshold(objContext, objThresholdParam) {
        let strSubSubjectId = this.GetSubSubjectId(objContext);
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
        };

        let objThresholdParams = {
            "ForeignKeyFilter": {
                "iSubjectId": strSubSubjectId
            },
            ["vEditData"]: objThreshold
        };
        //let arrDataRequest = [{
        //    "URL": "API/Object/Intranet/Taxonomy/FeedbackThreshold/FeedbackThreshold",
        //    "Params": objThresholdParams,
        //    "MethodType": "Put"
        //}];
        //DataCallCustom(arrDataRequest).then(res => {
        //    objContext.dispatch({ type: 'SET_STATE', payload: { "blnIsTopicDataLoaded": false } });
        //});

        Object_Intranet_Taxonomy_FeedbackThreshold.EditData(objThresholdParams, () => {
        });
    }

    /**
     * 
     * @param {any} objContext objContext
     * @param {any} objTopic objTopic
     * @param {any} blnMode blnMode
     * @summary Enables the topics from disable mode
     */
    EnableDisableTopicEdit(objContext, objTopic, blnMode) {
        let arrModifiedTopic = objContext.state.arrTopicDescriptionTaskData.map(objTopicDesp => {
            if (objTopicDesp.uFeedbackThresholdTopicId == objTopic.uFeedbackThresholdTopicId) {
                return {
                    ...objTopicDesp,
                    isEditMode: blnMode
                };
            }
            else {
                return {
                    ...objTopicDesp,
                    isEditMode: false
                };
            }
        });

        objContext.dispatch({ type: 'SET_STATE', payload: { "arrTopicDescriptionTaskData": arrModifiedTopic, "strTopicEditText": objTopic['t_testDrive_Subject_FeedbackThreshold_Topic_Data'][0].vFeedbackThresholdTopic } });
    }

    /**
    * @name GetMetaDataSubjectDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataSubjectDropdown() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            DependingTableName: "t_TestDrive_Subject_Data",
            IsLanguageDependent: "Y"
        };
    }

    /**
    * @name GetDataSubjectDropdown
    * @param {object} objContext Context object
    * @summary It returns the dropdown data
    * @returns {object} Dropdown data
    */
    GetDataSubjectDropdown(objContext) {
        let arrSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
        return {
            DropdownData: arrSubjects,
            SelectedValue: !objContext.state.intSelectedSubjectId || objContext.state.intSelectedSubjectId == -1 ? arrSubjects[0].iSubjectId : objContext.state.intSelectedSubjectId
        };
    }

    /**
    * @name GetResourceDataSubjectDropdown
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataSubjectDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsDataSubjectDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsDataSubjectDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.InterpretationAdmin_ModuleProcessor.HandleOnChangeSubjectDropDown(objContext, objItem)
        };
    }

    //check the function with datacall repsonse
    /**
    * @name HandleOnChangeSubjectDropDown
    * @param {any} objContext objContext
    * @param {any} objItem objItem
    * @summary
    */
    HandleOnChangeSubjectDropDown(objContext, objItem) {
        //set selected subject id to state
        let arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(subject => { return subject.iParentSubjectId === objItem.iSubjectId; });

        (new ObjectQueue()).QueueAndExecute(objContext.InterpretationAdmin_ModuleProcessor.CustomDataParams(arrSubSubject[0].iSubjectId));
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": arrSubSubject[0].iSubjectId, blnSubjectChanged: true } });
    }

    /**
    * @name GetSubMetaDataSubjectDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataSubSubjectDropdown() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            DependingTableName: "t_TestDrive_Subject_Data",
            IsLanguageDependent: "Y"
        };
    }

    /**
    * @name GetDataSubSubjectDropdown
    * @param {object} objContext Context object
    * @summary It returns the dropdown data
    * @returns {object} Dropdown data
    */
    GetDataSubSubjectDropdown(objContext) {
        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data;
        let arrSubjects = arrAllSubjects.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
        let strSubjectId = objContext.state.intSelectedSubjectId != -1 ? objContext.state.intSelectedSubjectId : arrSubjects[0].iSubjectId;
        let arrSubSubject = arrAllSubjects.filter(objSubject => objSubject.iParentSubjectId == strSubjectId);
        let strSubSubjectId = objContext.state.intSelectedSubSubjectId != -1 ? objContext.state.intSelectedSubSubjectId : arrSubSubject[0].iSubjectId;
        return {
            DropdownData: arrSubSubject,
            SelectedValue: strSubSubjectId
        };
    }

    /**
    * @name GetResourceDataSubSubjectDropdown
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataSubSubjectDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsDataSubSubjectDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsDataSubSubjectDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.InterpretationAdmin_ModuleProcessor.HandleOnChangeSubSubjectDropDown(objContext, objItem)
        };
    }

    //check the function with datacall repsonse
    /**
     * @name HandleOnChangeSubSubjectDropDown
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     * @summary 
     */
    HandleOnChangeSubSubjectDropDown(objContext, objItem) {
        (new ObjectQueue()).QueueAndExecute(objContext.InterpretationAdmin_ModuleProcessor.CustomDataParams(objItem.iSubjectId))
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubSubjectId": objItem.iSubjectId, blnSubjectChanged: true } });
    }


    /**
    * @name GetMetaDataThresholdDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataThresholdDropdown() {
        return {
            DisplayColumn: "vThresholdText",
            ValueColumn: "uSubjectFeedbackThresholdId",
            DependingTableName: "t_testDrive_Subject_FeedbackThreshold_Data",
            IsLanguageDependent: "Y"
        };
    }

    /**
    * @name GetDataThresholdDropdown
    * @param {object} objContext Context object
    * @param {object} arrFilteredFeedbackThreshold Filtered FeedbackThreshold array data
    * @summary It returns the dropdown data
    * @returns {object} Dropdown data
    */
    GetDataThresholdDropdown(objContext, arrFilteredFeedbackThreshold) {
        return {
            DropdownData: arrFilteredFeedbackThreshold,
            SelectedValue: arrFilteredFeedbackThreshold.length > 0 && (!objContext.state.intSelectedThresholdId || objContext.state.intSelectedThresholdId == -1) ? arrFilteredFeedbackThreshold[0].uSubjectFeedbackThresholdId : objContext.state.intSelectedThresholdId
        };
    }

    /**
    * @name GetResourceDataThresholdDropdown
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataThresholdDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsDataThresholdDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsDataThresholdDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.InterpretationAdmin_ModuleProcessor.HandleOnChangeThreshold(objContext, objItem)
        };
    }

    /**
     * @name HandleOnChangeThreshold
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     * @summary Set the selected threshold Id
     */
    HandleOnChangeThreshold(objContext, objItem) {
        let vThresholdText = objItem.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdTextFeedback ? objItem.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdTextFeedback : '';
        let arrTopicDescriptionTaskData = this.GetMergedData(objContext, objItem);
        objContext.dispatch({ type: "SET_STATE", payload: { "objThreshold": objItem, "vThresholdTextFeedback": vThresholdText, "intSelectedThresholdId": objItem.uSubjectFeedbackThresholdId, arrTopicDescriptionTaskData: arrTopicDescriptionTaskData } });
    }

    /**
     * @name GetMetaDataForFillHeight
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetMetaDataForFillHeight() {
        return {
            HeaderIds: ["Header", "InterpretationAdminHeader", "ContentHead"],
            FooterIds: []
        };
    }

    /**
     * @name GetDefaultTasks
     * @summary Gets the default array of task
     * @returns {*} array
     * */
    GetDefaultTasks() {
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

    UpdateTask(objContext, intIndex, strValue) {
        let arrDefaultTasks = objContext.state.arrDefaultTasks.map((tsk, index) => {
            if (index == intIndex) {
                return {
                    ...tsk,
                    vTaskName: strValue
                };
            }
            else {
                return {
                    ...tsk
                };
            }
        });
        //dispatch({ type: "SET_STATE", payload: { "Update_Tasks": arrDefaultTasks } });
        objContext.dispatch({ type: "SET_STATE", payload: { "arrDefaultTasks": arrDefaultTasks } });
    }

    UpdateTopicEditedValue(objContext, strValue) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strTopicEditText": strValue } });
    }

    UpdateThresholdFeedbackValue(objContext, strValue) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strThresholdFeedback": strValue } });
    }

    GetSubSubjectId(objContext) {
        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data;
        let arrSubjects = arrAllSubjects.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
        let strSubjectId = objContext.state.intSelectedSubjectId != -1 ? objContext.state.intSelectedSubjectId : arrSubjects[0].iSubjectId;
        let arrSubSubject = arrAllSubjects.filter(objSubject => objSubject.iParentSubjectId == strSubjectId);
        let strSubSubjectId = objContext.state.intSelectedSubSubjectId != -1 ? objContext.state.intSelectedSubSubjectId : arrSubSubject[0].iSubjectId;
        return strSubSubjectId;
    }

    /**
     * @name UpdateLatestData
     * @summary updates the latest data
     * @param {any} objContext
     */
    UpdateLatestData(objContext) {
        let strSubSubjectId = this.GetSubSubjectId(objContext);
        let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + strSubSubjectId).Data;
        let arrFilteredFeedbackThreshold = [];
        if (arrFeedbackThreshold && arrFeedbackThreshold.length > 0) {
            arrFilteredFeedbackThreshold = arrFeedbackThreshold.filter((t, index) => index != 0);
        }
        let objThreshold = {};
        if (arrFilteredFeedbackThreshold && arrFilteredFeedbackThreshold.length > 0)
            objThreshold = objContext.state.objThreshold ? objContext.state.objThreshold : arrFilteredFeedbackThreshold[0];
        let arrNewData = this.GetMergedData(objContext, objThreshold);
        objContext.dispatch({ type: 'SET_STATE', payload: { arrTopicDescriptionTaskData: arrNewData, blnSubjectChanged: false } })
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown" ],
            "Files": []
        }
    }
}

export default InterpretationAdmin_ModuleProcessor;