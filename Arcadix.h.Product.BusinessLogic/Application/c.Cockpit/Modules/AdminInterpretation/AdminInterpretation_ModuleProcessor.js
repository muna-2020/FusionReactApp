//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_ApplicationType from '@shared/Object/c.Cockpit/ApplicationType/ApplicationType';
import Object_Cockpit_MainClient_MainClient from '@shared/Object/c.Cockpit/MainClient/MainClient/MainClient';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';

import Object_Intranet_Taxonomy_FeedbackThreshold from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThreshold/FeedbackThreshold';
import Object_Intranet_Taxonomy_FeedbackThresholdTopic from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThresholdTopic/FeedbackThresholdTopic';
import Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription';

//Module Objects
import * as AddEditTopic_MetaData from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AddEditTopic/AddEditTopic_MetaData';

//Module related imports.
import * as AdminInterpretation_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AdminInterpretation_OfficeRibbon';

//Editor Main Module.
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
 * @name AdminInterpretation_ModuleProcessor
 * @summary Class for Topic module display.
 */
class AdminInterpretation_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_ApplicationType",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/AdminInterpretation",
            "Object_Cockpit_MainClient_MainClient",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Taxonomy_FeedbackThreshold",
            "Object_Intranet_Taxonomy_FeedbackThresholdTopic",
            "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //MainClient object
        Object_Cockpit_MainClient_MainClient.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClient];

        //ApplicationType object
        Object_Cockpit_ApplicationType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ApplicationType];

        //Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        //Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/AdminInterpretation"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Subject
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
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        let arrHeaderData = AddEditTopic_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/AdminInterpretation", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TopicGrid"] : 0;
        let intApplicationTypeForTopicData = 0;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0 ? true : false;
        }
        if (!blnShowErrorPopup) {
            let arrThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + objContext.state.intSubSubjectId).Data;
            if (arrThreshold.length > 0) {
                Popup.ShowTabbedPopup({
                    Data: {
                        MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForTopicData),
                        DropdownData: {
                            uSubjectFeedbackThresholdId: objContext.state.objThreshold ? objContext.state.objThreshold["uSubjectFeedbackThresholdId"] : arrThreshold[0].uSubjectFeedbackThresholdId,
                            arrThreshold
                        },
                        intSubjectId: objContext.state.intSubSubjectId,
                        Object_Intranet_Taxonomy_FeedbackThresholdTopic: objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
                        IsEdit: blnIsEdit
                    },
                    Meta: {
                        PopupName: "AddEditTopic",
                        HeaderData: arrHeaderData,
                        ShowHeader: true,
                        ShowCloseIcon: true,
                        ShowToggleMaximizeIcon: true,
                    },
                    Resource: {
                        Text: objTextResource,
                        SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                    },
                    Events: {
                    },
                    CallBacks: {
                    }
                });
            } else {
                Popup.ShowErrorPopup({
                    Data: {},
                    Meta: {
                        "ShowHeader": true,
                        "ShowCloseIcon": true,
                    },
                    Resource: {
                        Text: objTextResource,
                        TextResourcesKey: "EmptyThresholdErrorPopup",
                        SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                    },
                    CallBacks: {}
                });
            }

        } else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: blnIsEdit ? "ErrorPopup" : "AddErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting subject
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/AdminInterpretation", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TopicGrid"] : [];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows.t_testDrive_Subject_FeedbackThreshold_Topic_Data.find(objTopicData => objTopicData.iLanguageId == objContext.props.JConfiguration.InterfaceLanguageId)["vFeedbackThresholdTopic"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    Variables: objVaribales,
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (objModal) => this.DeleteTopic(arrSelectedRows, objModal, objContext)
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteTopic
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @param {object} objContext passes Context object
     * @summary Deletes Topic and close popup on success
     */
    DeleteTopic(arrSelectedRows, objModal, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Taxonomy_FeedbackThresholdTopic.DeleteData({
            "vDeleteData": arrDeleteRow,
            "ForeignKeyFilter": {
                "iSubjectId": objContext.state.intSubSubjectId
            }
        }, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("SelectedRows", []);
                objContext.dispatch({ type: "SET_STATE", payload: { "arrCheckedTopics": [] } });
                Popup.ClosePopup(objModal);
            }
        });
    }

    /**
     * @name OnSubjectDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objItem objItem
     * @summary   To change the subject Dropdown Data on change of the subject dropdown value
     */
    OnSubjectDropDownChange(objContext, objItem) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TopicGrid": null });

        //set selected subject id to state
        let arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(subject => { return subject.iParentSubjectId === objItem.iSubjectId; });

        let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + objContext.state.intSubSubjectId).Data;


        (new ObjectQueue()).QueueAndExecute(objContext.AdminInterpretation_ModuleProcessor.CustomDataParams(arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : -1));
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intSubjectId": objItem.iSubjectId,
                "intSubSubjectId": arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : -1,
                //"objThreshold": arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : {},
                "intThresholdId": -1,
                "blnSubjectChanged": true
            }
        });

    }

    /**
     * @name OnSubSubjectDropDownChange
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary   To change the row Data on change of the dropdown value
     */
    OnSubSubjectDropDownChange(objContext, objItem) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TopicGrid": null });

        (new ObjectQueue()).QueueAndExecute(objContext.AdminInterpretation_ModuleProcessor.CustomDataParams(objItem.iSubjectId));
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intSubSubjectId": objItem.iSubjectId, "intThresholdId": -1, "blnSubjectChanged": true
            }
        });
    }

    /**
     * @name OnThresholdDropDownChange
     * @param {*} objContext objContext
     * @param {*} objItem objItem
     * @summary   To change the row Data on change of the dropdown value
     */
    OnThresholdDropDownChange(objContext, objItem) {
        let vThresholdText = objItem.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdTextFeedback ? objItem.t_testDrive_Subject_FeedbackThreshold_Data[0].vThresholdTextFeedback : '';
        objContext.dispatch({ type: "SET_STATE", payload: { "objThreshold": objItem, "vThresholdTextFeedback": vThresholdText, "intThresholdId": objItem.uSubjectFeedbackThresholdId } });
        if (!objItem["iPageId"] || objItem["iPageId"] == null) {
            let objRequestData = {
                "ForeignKeyFilter": {
                    "iSubjectId": objContext.state.intSubSubjectId
                },
                "vEditData": objItem
            };
            objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold.EditData(objRequestData, (objReturn, cIsNewData) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "objThreshold": objReturn[0] } });
            });
        }
    }

    /**
     * @name CreateItemEventHandler
     * @param {*} objItem objItem
     * @summary   To filter the dropdown data based on the condition
     * @return {bool} boolean
     */
    CheckDeletedDropDownDataEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @name GetSubSubjectId
     * @param {object} objContext Context object
     * @summary Returns the sub subject id
     * @return {String} boolean
     */
    GetSubSubjectId(objContext) {
        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data;
        let arrSubjects = arrAllSubjects.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
        let strSubjectId = objContext.state.intSubjectId != -1 ? objContext.state.intSubjectId :
            arrSubjects.length > 0 ? arrSubjects[0].iSubjectId : -1;
        let arrSubSubject = arrAllSubjects.filter(objSubject => objSubject.iParentSubjectId == strSubjectId);
        let strSubSubjectId = objContext.state.intSubSubjectId != -1 ? objContext.state.intSubSubjectId :
            arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : -1;
        return strSubSubjectId;
    }

    /**
     * @name UpdateLatestData
     * @summary updates the latest data
     * @param {object} objContext Context object
     */
    UpdateLatestData(objContext) {

        let objAdminInterpretation_ModuleProcessor = new AdminInterpretation_ModuleProcessor(objContext);
        var objRibbonData = {
            objContext,
            "AddPopup": () => objAdminInterpretation_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objAdminInterpretation_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objAdminInterpretation_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenContent": () => objAdminInterpretation_ModuleProcessor.OpenContent(objContext),
            "OpenPreviewInNewTab": () => objAdminInterpretation_ModuleProcessor.OpenPreviewInNewTab(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", AdminInterpretation_OfficeRibbon.GetAdminInterpretationOfficeRibbonData(objRibbonData));

        objContext.dispatch({ type: 'SET_STATE', payload: { "blnSubjectChanged": false } });
    }

    /**
     * @name OpenContent
     * @param {object} objContext passes Context object.
     * @summary this open the Editor.
     */
    OpenContent(objContext) {
        let objSelectedFeedbackThreshold = {};
        let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + objContext.state.intSubSubjectId).Data;
        if (arrFeedbackThreshold && arrFeedbackThreshold.length > 0) {
            objSelectedFeedbackThreshold = objContext.state.objThreshold ? objContext.state.objThreshold : arrFeedbackThreshold[0];
            if (objSelectedFeedbackThreshold["iPageId"] || objSelectedFeedbackThreshold["iPageId"] != null) {
                let intPageId = objSelectedFeedbackThreshold["iPageId"];
                objContext.AdminInterpretation_ModuleProcessor.OpenEditor(objContext, intPageId);
            } else {
                //call edit data method for feedback threshold
                let objRequestData = {
                    "ForeignKeyFilter": {
                        "iSubjectId": objContext.state.intSubSubjectId
                    },
                    "vEditData": objSelectedFeedbackThreshold
                };
                objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold.EditData(objRequestData, (objReturn, cIsNewData) => {
                    let intPageId = objReturn[0].iPageId;
                    objContext.dispatch({ type: "SET_STATE", payload: { "objThreshold": objReturn[0] } });
                    objContext.AdminInterpretation_ModuleProcessor.OpenEditor(objContext, intPageId);
                });
            }
        } else {
            objContext.AdminInterpretation_ModuleProcessor.GetErrorFeedbackThresholdPopup(objContext);
        }
    }

    /**
     * @name OpenPreviewInNewTab
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}
     * @summary This method is reponsible for opening the preview component.
     */
    OpenPreviewInNewTab(objContext) {
        let objSelectedFeedbackThreshold = {};
        let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + objContext.state.intSubSubjectId).Data;
        if (arrFeedbackThreshold && arrFeedbackThreshold.length > 0) {
            objSelectedFeedbackThreshold = objContext.state.objThreshold ? objContext.state.objThreshold : arrFeedbackThreshold[0];
            if (objSelectedFeedbackThreshold["iPageId"] || objSelectedFeedbackThreshold["iPageId"] != null) {
                let intPageId = objSelectedFeedbackThreshold["iPageId"];
                let strBaseUrl = "https://testdevfusionlernlupe.arcadixdevelopment.com/";
                let strUrl = strBaseUrl + "TaskPreview/Index?TaskId=" + intPageId + "&LanguageId=" + objContext.props.JConfiguration.InterfaceLanguageId;
                window.open(strUrl, "_blank");
            }
            else {
                objContext.AdminInterpretation_ModuleProcessor.GetErrorFeedbackTextPopup(objContext);
            }
        }
        else {
            objContext.AdminInterpretation_ModuleProcessor.GetErrorFeedbackThresholdPopup(objContext);
        }
    }

    /**
     * @name OpenEditor
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}
     * @param {Integer} intPageId Page Id
     * @summary This method is reponsible for opening the Editor.
     */
    OpenEditor(objContext, intPageId) {
        let objEditor = new Editor();
        let objParams = {
            "Data": {
                "PageId": intPageId,
                "SubjectForMainClient": null,
                "TaskProperties": null,
                "LanguageData": null,
                "IsFirstTask": true,
                "IsLastTask": true,
                "IsNotFromIntranet": true,
                "ContentUsageGroupId": "UseCaseContentGroup",
                "MultiMediaUsageGroupId": "UseCaseMediaGroup"
            },
            "CallBacks": {},
            "ParentProps": {
                "JConfiguration": objContext.props.JConfiguration,
                "ClientUserDetails": objContext.props.ClientUserDetails
            }
        };
        objEditor.OpenEditor(objParams);
    }

    /**
     * @name GetErrorFeedbackThresholdPopup
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}
     * @summary This method is reponsible for opening the error popup when Feedback Threshold is not present
     */
    GetErrorFeedbackThresholdPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/AdminInterpretation", objContext.props);

        Popup.ShowErrorPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            Resource: {
                Text: objTextResource,
                TextResourcesKey: "ErrorFeedbackThresholdPopup",
                SkinPath: objContext.props.JConfiguration.CockpitSkinPath
            },
            CallBacks: {}
        });
    }

    /**
     * @name GetErrorFeedbackTextPopup
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}
     * @summary This method is reponsible for opening the error popup when Feedback text is not present for the selected threshold
     */
    GetErrorFeedbackTextPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/AdminInterpretation", objContext.props);
        Popup.ShowErrorPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            Resource: {
                Text: objTextResource,
                TextResourcesKey: "ErrorFeedbackTextPopup",
                SkinPath: objContext.props.JConfiguration.CockpitSkinPath
            },
            CallBacks: {}
        });
    }

    /**
     * @name HandleCheck
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}
     * @param {Boolean} blnIsChecked checkbox checked value
     * @param {object} objTopic Topic
     * @param {Array} arrAllTopic original topic array data
     * @summary This method is reponsible for checking the checkbox and also updating the app state.
     */
    HandleCheck(objContext, blnIsChecked, objTopic, arrAllTopic) {
        let arrCheckedTopics = [];
        if (blnIsChecked) {
            arrCheckedTopics = [...objContext.state.arrCheckedTopics, objTopic];
            let arrSortedTopics = [];
            //the sorting is done, do that the checked array should contain the objects in the serial manner that they appear in the original array
            arrAllTopic.map(objAllTopic => {
                if (arrCheckedTopics.find(objCheckedTopic => objCheckedTopic["uFeedbackThresholdTopicId"] == objAllTopic["uFeedbackThresholdTopicId"])) {
                    arrSortedTopics = [...arrSortedTopics, objAllTopic];
                }
            });
            arrCheckedTopics = arrSortedTopics;
        } else {
            arrCheckedTopics = objContext.state.arrCheckedTopics.filter(objCheckedTopic => objCheckedTopic["uFeedbackThresholdTopicId"] != objTopic["uFeedbackThresholdTopicId"]);
        }
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TopicGrid": arrCheckedTopics });
        objContext.dispatch({ type: "SET_STATE", payload: { "arrCheckedTopics": arrCheckedTopics } });
    }

    /**
     * @name AddDescription
     * @param {object} objContext passes Context object.
     * @param {object} objTopic passes Topic object.
     * @summary this open the Editor to add description.
     */
    AddDescription(objContext, objTopic) {
        let objRequest = {
            "ForeignKeyFilter": {
                "iSubjectId": objContext.state.intSubSubjectId
            },
            "vAddData": {
                "uFeedbackThresholdTopicId": objTopic["uFeedbackThresholdTopicId"]
            }
        };
        objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription.AddData(objRequest, (objReturn, cIsNewData) => {
            let intPageId = objReturn[0].iPageId;
            //objContext.dispatch({ type: "SET_STATE", payload: { "objThresholdTopic": objReturn[0] } });
            objContext.AdminInterpretation_ModuleProcessor.OpenEditor(objContext, intPageId);
        });
    }

    /**
     * @name EditDescription
     * @param {object} objContext passes Context object.
     * @param {object} objDescription passes Description object.
     * @summary this open the Editor to add description.
     */
    EditDescription(objContext, objDescription) {
        objContext.AdminInterpretation_ModuleProcessor.OpenEditor(objContext, objDescription["iPageId"]);
    }

    /**
     * @name PreviewDescription
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}
     * @param {object} objDescription passes Description object.
     * @summary This method is reponsible for opening the description preview component.
     */
    PreviewDescription(objContext, objDescription) {
        let intPageId = objDescription["iPageId"];
        let strBaseUrl = "https://testdevfusionlernlupe.arcadixdevelopment.com/";
        let strUrl = strBaseUrl + "TaskPreview/Index?TaskId=" + intPageId + "&LanguageId=" + objContext.props.JConfiguration.InterfaceLanguageId;
        window.open(strUrl, "_blank");
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {object} objTopicDescription Description object for which the tasks are needed to be addded.
     * @summary Opens the Assign Task to description popup to add the tasks into the description
     */
    OpenAddTaskPopup(objContext, objTopicDescription) {
        //let arrHeaderData = AddEditTopic_MetaData.GetAddEditMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/AdminInterpretation", objContext.props);
        //let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TopicGrid"] : 0;
        let intApplicationTypeForTopicData = 0;
        //let blnShowErrorPopup = false;
        //if (blnIsEdit) {
        //    blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0 ? true : false;
        //}
        //if (!blnShowErrorPopup) {
        //let arrThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + objContext.state.intSubSubjectId).Data;
        //if (arrThreshold.length > 0) {
        Popup.ShowTabbedPopup({
            Data: {
                MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForTopicData),
                //DropdownData: {
                //    uSubjectFeedbackThresholdId: arrThreshold
                //},
                intSubjectId: objContext.state.intSubSubjectId,
                objTopicDescription: objTopicDescription
                //Object_Intranet_Taxonomy_FeedbackThresholdTopic: objContext.props.Object_Intranet_Taxonomy_FeedbackThresholdTopic,
                //IsEdit: blnIsEdit
            },
            Meta: {
                PopupName: "AssignTaskToDescription",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: objTextResource,
                SkinPath: objContext.props.JConfiguration.CockpitSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
        });
        // } 

        //} 
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.AdminInterpretation_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.AdminInterpretation_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.AdminInterpretation_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenContent": () => objContext.AdminInterpretation_ModuleProcessor.OpenContent(objContext),
            "OpenPreviewInNewTab": () => objContext.AdminInterpretation_ModuleProcessor.OpenPreviewInNewTab(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", AdminInterpretation_OfficeRibbon.GetAdminInterpretationOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.CockpitSkinPath + "/Css/Application/ReactJs/PC/Modules/AdminInterpretation/AdminInterpretation.css",

        ];
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown", "Image"],
            "Files": [
            ]
        }
    }
}

export default AdminInterpretation_ModuleProcessor;