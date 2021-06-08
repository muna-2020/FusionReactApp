//Objects required for module.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Taxonomy_FeedbackThreshold from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThreshold/FeedbackThreshold';
import Object_Intranet_Taxonomy_FeedbackThresholdTopic from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThresholdTopic/FeedbackThresholdTopic';
import Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription from '@shared/Object/c.Intranet/6_Taxonomy/SubjectFeedback/FeedbackThresholdTopicDescription/FeedbackThresholdTopicDescription';
import Object_Editor_TaskContent_CMSPageContent from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPageContent';
import Extranet_Teacher_Interpretation_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation_Module';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';

/**
 * @name Interpretation_ModuleProcessor
 * @summary Class for Interpretation_ModuleProcessor module display and manipulate.
 */
class Interpretation_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Taxonomy_FeedbackThreshold",
            "Object_Intranet_Taxonomy_FeedbackThresholdTopic",
            "Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription",
            "Extranet_Teacher_Interpretation_Module"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the QueueAndExecute method from ObjectQueue class
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name GetDynamicStyles
     * @param {*} props props
     * @summary Gets dynamic styles for the component.
     * @returns {*} array
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath +
            "/Css/Application/3_Teacher/ReactJs/PC/Interpretation/Interpretation.css"
        ];
    };

    /**
     * @name InitialDataParams
     * @param {*} props props
     * @summary Get initials request params for the component.
     * @returns {*} array
     */
    InitialDataParams(props) {
        var arrDataRequest = [];
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

        Object_Framework_Services_TextResource.Initialize(["/d.Extranet/3_Teacher/Modules/Interpretation"]);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

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

        Object_Intranet_Taxonomy_FeedbackThreshold.Initialize(objFeedbackThresholdParams);
        arrDataParams = [...arrDataParams, Object_Intranet_Taxonomy_FeedbackThreshold];

        Object_Intranet_Taxonomy_FeedbackThresholdTopic.Initialize(objFeedbackThresholdTopicParams);
        arrDataParams = [...arrDataParams, Object_Intranet_Taxonomy_FeedbackThresholdTopic];

        Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription.Initialize(objFeedbackThresholdTopicDescriptionParams);
        arrDataParams = [...arrDataParams, Object_Intranet_Taxonomy_FeedbackThresholdTopicDescription];

        return arrDataParams;
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "ContentHead", "InterpretationHeader", "InterpretationImg"]
        };
    }

    /**
     * @name GetDetailedData
     * @param {any} arrThreshold arrThreshold
     * @param {any} arrTopics arrTopics
     * @param {any} arrTaksWithDesc arrTaksWithDesc
     * @summary {*} array of arrThresholdTopics
     * @returns {*} arrThresholdTopics
     */
    GetDetailedData(arrThreshold, arrTopics, arrTaksWithDesc) {
        if (arrThreshold && arrTopics && arrTaksWithDesc) {
            let arrTopicWithDesc = arrTopics.map((objTopic) => {
                return {
                    ...objTopic,
                    arrDescTasks: arrTaksWithDesc.filter(objDesc => objDesc.uFeedbackThresholdTopicId === objTopic.uFeedbackThresholdTopicId)
                };
            });
            let arrThresholdTopics = arrThreshold.map(objThresholdId => {
                return {
                    ...objThresholdId,
                    arrTopicDescTasks: arrTopicWithDesc.filter(objTopicWithDesc => objThresholdId.uSubjectFeedbackThresholdId === objTopicWithDesc.uSubjectFeedbackThresholdId)
                };
            });
            return arrThresholdTopics;
        }
    }

    /**
    * @name GetSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Subject dropdown
    */
    GetSubjectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data"
        };
    }

    /**
    * @name GetSubjectDropdownData
    * @param {Array} arrSubjects Subject Data
    * @summary Gets the data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetSubjectDropdownData(objContext, arrSubjects) {
        let strUserPreferenceSubjectId = this.GetUserpreferenceSubjectId();
        strSubjectId = strUserPreferenceSubjectId ? strUserPreferenceSubjectId : strSubjectId;
        return {
            DropdownData: arrSubjects,
            SelectedValue: objContext.state.intSelectedSubjectId != -1 ? objContext.state.intSelectedSubjectId : arrSubjects.length > 0 ? arrSubjects[0].iSubjectId : -1
        };
    }

    /**
    * @name GetResourceData
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetResourceData() {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
    * @name GetSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { objContext.Interpretation_ModuleProcessor.HandleOnChangeSubjectDropDown(objContext, objItem); }
        };
    }

    /**
     * @name HandleOnChangeSubjectDropDown
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     * @summary On changing the subject update intSelectedSubjectId and intSelectedSubSubjectId state
     */
    HandleOnChangeSubjectDropDown(objContext, objItem) {
        let arrSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data.filter(objSubject => { return objSubject.iParentSubjectId === objItem.iSubjectId });
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubjectId": objItem.iSubjectId, "intSelectedSubSubjectId": arrSubSubject[0].iSubjectId } });
        this.SaveUserPreferenceSubjectId(objContext, objItem.iSubjectId)
    }

    /**
    * @name GetSubSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Subject dropdown
    */
    GetSubSubjectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data"
        };
    }

    /**
    * @name GetSubSubjectDropdownData
    * @param {Array} arrSubSubject SubSubject Data
    * @summary Gets the data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetSubSubjectDropdownData(objContext, arrSubSubject) {
        return {
            DropdownData: arrSubSubject,
            SelectedValue: objContext.state.intSelectedSubSubjectId ? objContext.state.intSelectedSubSubjectId :
                arrSubSubject.length > 0 ? arrSubSubject[0].iSubjectId : ""
        };
    }

    /**
    * @name GetSubSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetSubSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { objContext.Interpretation_ModuleProcessor.HandleOnChangeSubSubjectDropDown(objContext, objItem); }
        };
    }

    /**
     * @name HandleOnChangeSubSubjectDropDown
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     */
    HandleOnChangeSubSubjectDropDown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedSubSubjectId": objItem.iSubjectId, "blnOpenIndex": [] } });
        objContext.Interpretation_ModuleProcessor.CustomDataParams(objItem.iSubjectId);
    }

    /**
     * @name HandleOnChangeSubjectFeedback
     * @param {any} objContext objContext
     * @param {any} objItem objItem
     * @summary On changing the subjectfeddback update intSelectedThresholdId state
     */
    HandleOnChangeSubjectFeedback(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedThresholdId": objItem.uFeedbackThresholdId } });
    }

    /**
    * @name GetAllPageJsonForCompetency
    * @param {object} objContext objContext
    * @param {Array} arrSubSubject SubSubject data
    * @param {object} objThreshold Threshold object
    * @param {String} strThresholdId Threshold Id
    * @param {Array} arrFilteredTopic arrFilteredTopic
    * @param {Array} arrFilteredTopicDescription arrFilteredTopicDescription
    * @summary Get all the page jsons for both the description and tasks for all the topics of the opened competency
    */
    GetAllPageJsonForCompetency(objContext, arrSubSubject, objThreshold, strThresholdId, arrFilteredTopic, arrFilteredTopicDescription) {
        let arrPageId = [];
        let strCompetencyKey = objThreshold.t_testDrive_Subject_FeedbackThreshold_Data.find(obj => obj.iLanguageId == objContext.props.JConfiguration.InterfaceLanguageId).vThresholdText;
        let intSubjectId = objContext.state.intSelectedSubSubjectId ? objContext.state.intSelectedSubSubjectId : arrSubSubject[0].iSubjectId;

        arrFilteredTopic.map(objTopic => {
            if (objTopic["uSubjectFeedbackThresholdId"] == strThresholdId) { //loop through each topics for the opened threshold (competency)
                arrFilteredTopicDescription.map(objDescription => {
                    if (objTopic["uFeedbackThresholdTopicId"] == objDescription["uFeedbackThresholdTopicId"]) { //loop through description for the topics
                        if (objDescription["iPageId"] != null) {
                            arrPageId = [...arrPageId, objDescription["iPageId"]];
                        }
                        objDescription.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks.map(objTask => { //loop through tasks for the description
                            if (objTask["iTaskId"] != null) {
                                arrPageId = [...arrPageId, objTask["iTaskId"]];
                            }
                        });
                    }
                });
            }
        });

        let objParam = {
            "PageIdList": arrPageId,
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "CompetencyKey": strCompetencyKey
                        }
                    },
                    {
                        "match": {
                            "iSubjectId": intSubjectId
                        }
                    }
                ]
            }
        };

        let strSubjectId = intSubjectId.toString();
        let arrInterpretationModuleData = [];
        if (objContext.props.Extranet_Teacher_Interpretation_Module && DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iSubjectId;" + strSubjectId).Data && DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iSubjectId;" + strSubjectId).Data.length > 0)
            arrInterpretationModuleData = DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iSubjectId;" + strSubjectId).Data;
        //call web api to get the page json
        if (arrInterpretationModuleData.length == 0) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            Extranet_Teacher_Interpretation_Module.GetData(objParam, (objResponse) => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                console.log("objResponse", objResponse);
            });
        }
    }

    GetPageJsonForPageId(objContext, objThreshold, intPageId, arrSubSubject) {
        let objPageJson = null;
        if (intPageId != undefined && intPageId > 0) {
            let strCompetencyKey = objThreshold.t_testDrive_Subject_FeedbackThreshold_Data.find(obj => obj.iLanguageId == objContext.props.JConfiguration.InterfaceLanguageId).vThresholdText;
            let intSubjectId = objContext.state.intSelectedSubSubjectId ? objContext.state.intSelectedSubSubjectId : arrSubSubject[0].iSubjectId;
            let strSubjectId = intSubjectId.toString();
            let arrInterpretationModuleData = [];
            if (objContext.props.Extranet_Teacher_Interpretation_Module && DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iSubjectId;" + strSubjectId).Data && DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iSubjectId;" + strSubjectId).Data.length > 0)
                arrInterpretationModuleData = DataRef(objContext.props.Extranet_Teacher_Interpretation_Module, "Extranet_Teacher_Interpretation_Module;CompetencyKey;" + strCompetencyKey + ";iSubjectId;" + strSubjectId).Data;

            if (arrInterpretationModuleData.length > 0) {
                arrInterpretationModuleData.map(objInterpretationModuleData => {
                    if (objInterpretationModuleData["iPageId"] == intPageId)
                        objPageJson = objInterpretationModuleData["PageJson"];
                });
            }
        }
        return objPageJson;
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": []
        }
    }

    /**
     * @nameGetPageJsonFromServer
     * @param{object}objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @param{number}intPageId PageId for which PageJson needed to be fetched.
     * @param{number}intLanguageId Language id to load page.
     * @param{string}strUserId User id
     * @summary Makes call to get the page json from server.
     * @returns{object} Page json.
     */
    async GetPageJsonFromServer(objContext, intPageId, intLanguageId) {
        if (intPageId == null) {
            return null;
        } else {
            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iPageId": intPageId
                            }
                        },
                        {
                            "match": {
                                "iLanguageId": intLanguageId
                            }
                        }
                    ]
                },
                "cIsForEditor": "Y"
            };

            let objResponse = await Object_Editor_TaskContent_CMSPageContent.GetData(objParams);
            let objPageJson = objResponse["Object_Editor_TaskContent_CMSPageContent;iPageId;" + intPageId + ";iLanguageId;" + intLanguageId]["Data"][0];
            return objPageJson ? objPageJson : null;
        }
    }

    /**
     * @name SaveUserPreferenceSubjectId
     * @summary Updates the selected subjectId to userpreference object.
     * @param {any} objContext
     * @param {any} strSubjectId
     */
    SaveUserPreferenceSubjectId(objContext, strSubjectId) {
        let objUserPreference = ApplicationState.GetProperty('UserPreferenceObject')
        let arrPreferenceValues = [{
            uUserPreferenceId: objUserPreference["uUserPreferenceId"],
            vKey: "CurrentSelectedSubjectId",
            vValue: strSubjectId,
        }];

        let objNewUserPreference = {
            ...objUserPreference,
            t_Framework_UserPreference_PreferenceValue: arrPreferenceValues
        }
        let objUserPreferenceEditParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            ["vEditData"]: objNewUserPreference
        };
        Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams, (response) => {
            ApplicationState.SetProperty("UserPreferenceObject", response[0]);
        });
    }

    /**
     * @name GetUserpreferenceSubjectId
     * @summary returns the user preference subjectid
     * */
    GetUserpreferenceSubjectId() {
        let strSubjectId = undefined;
        let objUserPreference = ApplicationState.GetProperty('UserPreferenceObject')
        if (objUserPreference && objUserPreference["t_Framework_UserPreference_PreferenceValue"]) {
            let objSubjectUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].find(x => x["vKey"] == "CurrentSelectedSubjectId");
            if (objSubjectUserPreferenceValue)
                strSubjectId = objSubjectUserPreferenceValue["vValue"]
        }

        return strSubjectId;
    }

}

export default Interpretation_ModuleProcessor;

