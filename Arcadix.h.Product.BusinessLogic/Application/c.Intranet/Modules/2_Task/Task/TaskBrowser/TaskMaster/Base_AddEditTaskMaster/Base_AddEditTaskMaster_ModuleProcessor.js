//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Module Related Files.
import Object_Intranet_Task_Task from '@shared/Object/c.Intranet/2_Task/Task/Task';
import * as BasicProperties_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/AddEditComponents/BasicProperties/BasicProperties_MetaData';
import * as Taxonomy_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/AddEditComponents/Taxonomy/Taxonomy_MetaData';
import * as DevelopmentHistoryBasicProperties_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/AddEditComponents/DevelopmentHistoryBasicProperties/DevelopmentHistoryBasicProperties_MetaData';

//Objects required for module.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Taxonomy_Category from '@shared/Object/c.Intranet/6_Taxonomy/Category/Category';
import Object_Intranet_Taxonomy_CategoryCompetency from '@shared/Object/c.Intranet/6_Taxonomy/CategoryCompetency/CategoryCompetency';
import Object_Intranet_Taxonomy_CompetencyRange from '@shared/Object/c.Intranet/6_Taxonomy/CompetencyRange/CompetencyRange';
import Object_Intranet_Taxonomy_CompetencyLevel from '@shared/Object/c.Intranet/6_Taxonomy/CompetencyLevel/CompetencyLevel';
import Object_Intranet_Task_TaskAdditionalProperty from '@shared/Object/c.Intranet/2_Task/Task/TaskAdditionalProperty/TaskAdditionalProperty';
import Object_Intranet_Task_TaskAdditionalPropertyValue from '@shared/Object/c.Intranet/2_Task/Task/TaskAdditionalPropertyValue/TaskAdditionalPropertyValue';
import Object_Intranet_Task_TaskDifficultyLevel from '@shared/Object/c.Intranet/2_Task/Task/TaskDifficultyLevel/TaskDifficultyLevel';
import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';
import Object_Intranet_Taxonomy_Intermediate from '@shared/Object/c.Intranet/6_Taxonomy/Intermediate/Intermediate';
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings';
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';

/**
 * @name Base_AddEditTaskMaster_ModuleProcessor
 * @summary Class for Add/Edit Task module.
 */
class Base_AddEditTaskMaster_ModuleProcessor extends IntranetBase_ModuleProcessor {       

    /**
     * @name IsDataLoaded
     * @param {object} props takes objContext
     * @summary Checks if Data is loaded in to Redux
     */
    static IsDataLoaded(props) {
        let blnIsLoadComplete = false;
        if (
            DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
            DataRef(props.Object_Cockpit_Language)["Data"] &&
            DataRef(props.Object_Intranet_Task_TaskDifficultyLevel)["Data"] &&
            DataRef(props.Object_Cockpit_Workflow_WorkflowType)["Data"] &&
            DataRef(props.Object_Cockpit_Workflow_Workflow)["Data"] &&
            DataRef(props.Object_Cockpit_Workflow_WorkflowStatus)["Data"] &&
            //check
            DataRef(props.Object_Intranet_Taxonomy_Subject)["Data"] &&
            DataRef(props.Object_Intranet_Taxonomy_Category)["Data"] &&
            DataRef(props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"] &&
            DataRef(props.Object_Intranet_Taxonomy_CompetencyRange)["Data"] &&
            DataRef(props.Object_Intranet_Taxonomy_CompetencyLevel)["Data"] &&
            DataRef(props.Object_Intranet_Taxonomy_Intermediate)["Data"] &&
            DataRef(props.Object_Intranet_Task_TaskAdditionalProperty)["Data"] &&
            DataRef(props.Object_Intranet_Task_TaskAdditionalPropertyValue)["Data"] &&
            DataRef(props.Object_Intranet_Member_IntranetAdministrator)["Data"] &&
            DataRef(props.Object_Cockpit_MainClient_ClientSettings)["Data"] &&
            DataRef(props.Object_Extranet_Teacher_SchoolYear)["Data"] &&
            //DataRef(props.Object_Intranet_Test_SeparationAndCalibrationTask)["Data"] &&
            //DataRef(props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"] &&
            //DataRef(props.Object_Intranet_Test_InputStatus)["Data"] &&
            DataRef(props.Object_Cockpit_Skin)["Data"] 
        ) {
            blnIsLoadComplete = true;
        }
        return blnIsLoadComplete;
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            //"Object_Cockpit_MainClient_MainClientLanguage",
            //"Object_Cockpit_Language",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Taxonomy_Category",
            "Object_Intranet_Taxonomy_CategoryCompetency",
            "Object_Intranet_Taxonomy_CompetencyRange",
            "Object_Intranet_Taxonomy_CompetencyLevel",
            "Object_Intranet_Task_TaskAdditionalProperty",
            "Object_Intranet_Task_TaskAdditionalPropertyValue",
            "Object_Intranet_Member_IntranetAdministrator",
            "Object_Intranet_Taxonomy_Intermediate",
            "Object_Cockpit_Skin",
            "Object_Intranet_Task_TaskDifficultyLevel",
            "Object_Cockpit_MainClient_ClientSettings",
            "Object_Extranet_Teacher_SchoolYear",
            //"Object_Cockpit_Workflow_WorkflowStatus",
            //"Object_Cockpit_Workflow_Workflow",
            //"Object_Cockpit_Workflow_WorkflowType",
            //"Object_Intranet_Test_SeparationAndCalibrationTask",
            //"Object_Intranet_Test_SeparationAndCalibrationGroup",
            //"Object_Intranet_Test_InputStatus"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];    
        let objTaskAdditionalPropertyParams = {
            "SortKeys": [
                {
                    "iOrderId": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objTaskAdditionalPropertyValueParams = {
            "SortKeys": [
                {
                    "iOrderId": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objWorkFlowStatusParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objSubjectParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objCategoryParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objCategoryCompetencyParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objCompetencyRangeParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objCompetencyLevelParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        let objIntermediateParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        ////MainClient Language
        //Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        ////Language
        //Object_Cockpit_Language.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        //Subject
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //Category
        Object_Intranet_Taxonomy_Category.Initialize(objCategoryParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Category];

        //CategoryCompetency
        Object_Intranet_Taxonomy_CategoryCompetency.Initialize(objCategoryCompetencyParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_CategoryCompetency];

        //CompetencyRange
        Object_Intranet_Taxonomy_CompetencyRange.Initialize(objCompetencyRangeParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_CompetencyRange];

        //CompetencyLevel
        Object_Intranet_Taxonomy_CompetencyLevel.Initialize(objCompetencyLevelParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_CompetencyLevel];

        //Additional Property
        Object_Intranet_Task_TaskAdditionalProperty.Initialize(objTaskAdditionalPropertyParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskAdditionalProperty];

        //Additional PropertyValue
        Object_Intranet_Task_TaskAdditionalPropertyValue.Initialize(objTaskAdditionalPropertyValueParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskAdditionalPropertyValue];

        //TaskDifficultyLevel
        Object_Intranet_Task_TaskDifficultyLevel.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskDifficultyLevel];

        //IntranetAdministrator
        Object_Intranet_Member_IntranetAdministrator.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Member_IntranetAdministrator];

        //Skin
        Object_Cockpit_Skin.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Skin];

        //Intermediate
        Object_Intranet_Taxonomy_Intermediate.Initialize(objIntermediateParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Intermediate];

        //ClientSettings
        Object_Cockpit_MainClient_ClientSettings.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_ClientSettings];

        //SchoolYear
        Object_Extranet_Teacher_SchoolYear.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        ////WorkFlow Type
        //Object_Cockpit_Workflow_WorkflowType.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowType]

        //// WorkFlow
        //Object_Cockpit_Workflow_Workflow.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_Workflow];

        //// WorkFlowStatus
        //Object_Cockpit_Workflow_WorkflowStatus.Initialize(objWorkFlowStatusParams);
        //arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowStatus];

        ////SeparationAndCalibrationTask
        //Object_Intranet_Test_SeparationAndCalibrationTask.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Intranet_Test_SeparationAndCalibrationTask];

        ////SeparationAndCalibrationTask
        //Object_Intranet_Test_SeparationAndCalibrationGroup.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Intranet_Test_SeparationAndCalibrationGroup];

        ////InputStatus
        //Object_Intranet_Test_InputStatus.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_Intranet_Test_InputStatus];

        return arrDataRequest;
    }

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multi language input if any
     * @summary Handle change method to handle changes in the JSX elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name HandleCheckBoxClick
     * @param {string} strLanguageId consists of value of the LangaugeId
     * @param {object} objContext takes objContext
     * @summary Handles check box click of Language component.
     */
    HandleCheckBoxClick(strLanguageId, objContext) {
        let arrt_CMS_Page_Language = objContext.state.objData.t_CMS_Page_Language;
        let blnLanguageAdded = arrt_CMS_Page_Language.filter(objt_CMS_Page_Language => { return objt_CMS_Page_Language.iLanguageId == strLanguageId }).length > 0;
        var arr_New_t_CMS_Page_Language;
        if (blnLanguageAdded && objContext.state.objData.t_CMS_Page_Language.length > 1) {
            arr_New_t_CMS_Page_Language = arrt_CMS_Page_Language.filter(objt_CMS_Page_Language => { return objt_CMS_Page_Language.iLanguageId != strLanguageId })
        }
        else if (!blnLanguageAdded) {
            arr_New_t_CMS_Page_Language = [...arrt_CMS_Page_Language, { ["iLanguageId"]: strLanguageId }]
        }
        if (arr_New_t_CMS_Page_Language) {
            let objNewData = { ...objContext.state.objData, ["t_CMS_Page_Language"]: arr_New_t_CMS_Page_Language };
            objContext.dispatch({ type: "SET_STATE", payload: { objData: objNewData } });
        }
    }

    /**
     * @name GetSubjectId
     * @param {string} strSubSubjectId subject Id
     * @param {object} objContext objContext
     * @summary Gets the subject Id/ parent subject id
     */
    GetSubjectId(strSubSubjectId, objContext) {
        let objSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].find(objSubject => {
            return objSubject["iSubjectId"] == strSubSubjectId
        });
        if (objSubSubject) {
            return objSubSubject["iParentSubjectId"];
        }
    }

    /**
     * @name IsLanguageAdded
     * @param {string} strLanguageId consists of value of the LangaugeId
     * @param {object} objContext takes objContext
     * @summary Checks if Language is present for check box.
     */
    IsLanguageAdded(strLanguageId, objContext) {
    let arrt_CMS_Page_Language = objContext.state.objData.t_CMS_Page_Language;
    let blnLanguageAdded = arrt_CMS_Page_Language.filter(objt_CMS_Page_Language => { return objt_CMS_Page_Language.iLanguageId == strLanguageId }).length > 0;
    return blnLanguageAdded;
    }

    /**
     * @name HandleDifficultyLevelCheckBoxClick
     * @param {string} strAssignedTaskDifficultyLevelId consists of value of the AssignedTaskDifficultyLevelId
     * @param {object} objContext takes objContext
     * @summary Handles check-box click of DifficultyLevel component.
     */
    HandleDifficultyLevelCheckBoxClick(strAssignedTaskDifficultyLevelId, strSchoolYearId, objContext) {               
        //update in state for selection
        let arrNewSelectedDifficultyLevel = objContext.state.objData.t_TestDrive_Task_AssignedTaskDifficultyLevel.filter(obj => { return (obj["iSchoolYearId"] != strSchoolYearId) });
        arrNewSelectedDifficultyLevel = [...arrNewSelectedDifficultyLevel, { "iSchoolYearId": strSchoolYearId, "iTaskDifficultyLevelId": strAssignedTaskDifficultyLevelId }];
        objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objContext.state.objData, ["t_TestDrive_Task_AssignedTaskDifficultyLevel"]: arrNewSelectedDifficultyLevel } } });
    }

    /**
     * @name IsDifficultyLevelChecked
     * @param {string} strLanguageId consists of value of the LangaugeId
     * @param {object} objContext takes objContext
     * @summary Checks if DifficultyLevel is present for check box.
     */
    IsDifficultyLevelChecked(strTaskDifficultyLevelId, strSchoolYearId, objContext) {
        let arrt_TestDrive_Task_AssignedTaskDifficultyLevel = objContext.state.objData.t_TestDrive_Task_AssignedTaskDifficultyLevel;        
        let blnDifficultyLevelChecked = arrt_TestDrive_Task_AssignedTaskDifficultyLevel.filter(objAssignedTaskDifficultyLevel => { return (objAssignedTaskDifficultyLevel.iTaskDifficultyLevelId == strTaskDifficultyLevelId && objAssignedTaskDifficultyLevel.iSchoolYearId == strSchoolYearId) }).length > 0;
        return blnDifficultyLevelChecked;
    }

    /**
     * @name SaveData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit API after validation succeeds
     */
    SaveData(objContext, blnClose = false) {
        let objt_CMS_Page_AssignedWorkflowStatus = objContext.state.objComponentRefs.WorkFlowStatusRef.current.GetSaveData();
        let objt_TestDrive_Task_AssignedTaskDifficultyLevel = objContext.state.objComponentRefs.DifficultyLevelRef ? objContext.state.objComponentRefs.DifficultyLevelRef.current.GetSaveData() : { ["t_TestDrive_Task_AssignedTaskDifficultyLevel"] : []};
        let objData = {
            ...objContext.state.objData,
            ...objContext.state.objComponentRefs.BasicPropertyRef.current.GetSaveData(),
            ...objContext.state.objComponentRefs.TaxonomyRef.current.GetSaveData(),
            ...objContext.state.objComponentRefs.DevelepmentHistoryBasicPropertyRef.current.GetSaveData(),
            ...objContext.state.objComponentRefs.LanguageRef.current.GetSaveData(),
            ["t_CMS_Page_AssignedWorkflowStatus"]: objContext.state.objData["iPageId"] && objContext.state.objData["iPageId"] != "" ? objt_CMS_Page_AssignedWorkflowStatus.arrNewWorkflowStatuses : this.GetWorkFlowStatusData(objt_CMS_Page_AssignedWorkflowStatus.arrRecentWorkflowStatuses, objContext),
            ["t_TestDrive_Task_AssignedTaskDifficultyLevel"]: objt_TestDrive_Task_AssignedTaskDifficultyLevel.t_TestDrive_Task_AssignedTaskDifficultyLevel
        };

        let objValidationObject = this.Validate(objContext, objData);    
        if (!objValidationObject) {
        ApplicationState.SetProperty("blnShowAnimation", true);   
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iFolderId": objContext.props.Data.FolderId
                    }
                }
            ]
        }
        if (objData["iPageId"] && objData["iPageId"] != "") {
            objParams ={                    
                        "SearchQuery": objSearchQuery,
                        "vEditData": [objData],
                        "uUserId": objContext.props.Data.ClientUserDetails.UserId                    
                };

        }
        else {
            objParams ={                   
                        "SearchQuery": objSearchQuery,
                        "vAddData": [objData],
                        "uUserId": objContext.props.Data.ClientUserDetails.UserId                   
                };
        }       
        
        if (objContext.state.objData["iPageId"] && objContext.state.objData["iPageId"] != "") {
                Object_Intranet_Task_Task.EditData(objParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.props.CallBacks.OnAddEditComplete(objReturn[0]);
                    //callback when Task edited form Editor
                    if (objContext.props.CallBacks.EditCallBack) {
                        objContext.props.CallBacks.EditCallBack(objReturn[0]);
                    }
                    if (blnClose) {
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskGrid": [{ ...objReturn[0], "Id": objReturn[0]["iPageId"] }] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                Object_Intranet_Task_Task.AddData(objParams, (objReturn, cIsNewData) => {
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskGrid": null });
                    objContext.props.CallBacks.OnAddEditComplete(objReturn[0]);                    
                    if (blnClose) {
                        objContext.props.CallBacks.OpenEditorOnSaveTask(objReturn[0]);
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnSaveClicked": true } });
            //objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        }
    }

    /**
     * @name Validate
     * @param {object} objContext takes objContext
     * @param {object} objData takes objData
     * @param {string}  strColumnName takes strColumnName
     * @summary Validate
     * @returns {object} objNewValidationObject
     */
    Validate(objContext, objData, strColumnName) {
        //to get MetaData of Taxonomy component based on ClientSettings
        let objEvent = {
            IsTheDropDownToShow: (strKey) => this.IsTheDropDownToShow(strKey, objContext)
        };
        let arrMetaData = [...BasicProperties_MetaData.GetBasicPropertiesMetaData(),
                           ...Taxonomy_MetaData.GetTaxonomyMetaData(objEvent),
                           ...DevelopmentHistoryBasicProperties_MetaData.GetDevelopmentHistoryBasicPropertiesMetaData(),
        ];
        let objNewValidationObject = FieldValidator.ValidateClientSide(arrMetaData, objContext.props.Resource.Text, objData, strColumnName, true, "", "", true);
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }

    /**
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {string} strColumnName strColumnName
     * @summary hits the add/edit API after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }   

    /**
     * @name ValidateOnBlur
     * @param {object} objContext takes objContext
     * @param {string} strColumnName strColumnName
     * @summary Validates onBlur event of field after click of Save
     */
    ValidateOnBlur(strColumnName, arrMetaData, objContext) {
        if (objContext.props.Data.IsSaveClicked) {
            FieldValidator.ValidateClientSide(arrMetaData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, false, "", "", true)
        }
    }   

    /**
     * @name AddLanguageData
     * @param {object} objContext takes objContext
     * @param {object} objEditData takes objContext
     * @summary Adds the required Language data to objEditData
     */
    AddLanguageData(objContext, objEditData = null) {
        let arr_t_CMS_Page_Data = [];
        if (objContext.props.Data.IsEdit) {
            arr_t_CMS_Page_Data = objEditData["t_CMS_Page_Data"];
            let arrLanguageIds = arr_t_CMS_Page_Data.map(obj_t_CMS_Page_Data => { return obj_t_CMS_Page_Data.iLanguageId });
            objContext.props.Data.MultiLanguageData.map(objMultiLanguageData => {
                if (!arrLanguageIds.includes(objMultiLanguageData["iFrameworkLanguageId"])) {
                    let objLanguageData = {
                        "iLanguageId": objMultiLanguageData["iFrameworkLanguageId"],
                        "vPageTitle": null,
                        "tCorrectAnswerExplanation": null,
                        "cPointOverride": null,
                        "dPoints": null
                    };
                    arr_t_CMS_Page_Data = [...arr_t_CMS_Page_Data, objLanguageData]
                }
            })            
        }
        else {
            objContext.props.Data.MultiLanguageData.map(objMultiLanguageData => {
                    let objLanguageData = {
                        "iLanguageId": objMultiLanguageData["iFrameworkLanguageId"],
                        "vPageTitle": null,
                        "tCorrectAnswerExplanation": null,
                        "cPointOverride": null,
                        "dPoints": null
                    };
                    arr_t_CMS_Page_Data = [...arr_t_CMS_Page_Data, objLanguageData]                
            })
        }
        return arr_t_CMS_Page_Data;
    }

    /**
     * @name IsShowLanguageDiv
     * @param {object} objContext takes objContext
     * @summary Checks whether to display Language component or not.
     */
    IsShowLanguageDiv(objContext) {
        if (objContext.props.Data.MainClientLanguageData.filter(objMainClientLanguage => objMainClientLanguage["cIsDeleted"] == 'N' && objMainClientLanguage["iApplicationTypeId"] == 2).length > 1)
            return true;
        else
            return false;
    }

    /**
     * @name GetRecentWorkflowData
     * @param {object} objContext takes objContext
     * @summary Returns the Recent work-flow data (also for Initial work-flow data)
     */
    GetRecentWorkflowData(objContext) {
        var arrRecentWorkflowStatuses = [];
        if (objContext.props.Data.IsEdit) {
            arrRecentWorkflowStatuses = objContext.props.Data.DisplayData["t_CMS_Page_AssignedWorkflowStatus"].filter(objAssignedWorkflowStatus => {
                return objAssignedWorkflowStatus["cIsLatest"] == "Y"
            });
        }
        var arrRecentWorkflowStatusesLanguageIds = arrRecentWorkflowStatuses.map(objRecentWorkflowStatus => {
            return objRecentWorkflowStatus["iLanguageId"]
        });
        var arrMultiLanguageIds = objContext.props.Data.MultiLanguageData.map(objMultiLanguage => objMultiLanguage["iFrameworkLanguageId"] );

        var arrFullRecentWorkflowStauses = [];
        arrMultiLanguageIds.map(strLanguageId => {
            if (!arrRecentWorkflowStatusesLanguageIds.includes(strLanguageId)) {
                let objWorkflowStatus = {
                    "uWorkflowStatusId": null,                    
                    "vComment": "",
                    "uUserId": objContext.props.Data.ClientUserDetails.UserId,
                    "cIsLatest": "Y",
                    "iLanguageId": strLanguageId
                }
                arrFullRecentWorkflowStauses = [...arrFullRecentWorkflowStauses, objWorkflowStatus]
            }
            else {
                let objRecentWorkflowStatus = arrRecentWorkflowStatuses.find(objRecentWorkflowStatus => {
                    return objRecentWorkflowStatus["iLanguageId"] == strLanguageId
                })
                arrFullRecentWorkflowStauses = [...arrFullRecentWorkflowStauses, objRecentWorkflowStatus];
            }
        })

        return arrFullRecentWorkflowStauses;
    }

    /**
     * @name GetWorkFlowStatusData
     * @param {array} arrRecentWorkflowStatuses takes arrRecentWorkflowStatuses
     * @param {object} objContext takes objContext
     * @summary Gets the new Work flow status data for adding in objData(for SaveData)
     */
    GetWorkFlowStatusData(arrRecentWorkflowStatuses, objContext) {
        
        let arrNewRecentWorkflowStatuses = arrRecentWorkflowStatuses.map(objWorkflowStatus => {
            let strFirstWorkflowStatusId = objContext.props.Data.DropDownData.arrActiveWorkFlowStatuses[0]["uWorkflowStatusId"];
            let strWorkflowStatusId = objWorkflowStatus["uWorkflowStatusId"] ? objWorkflowStatus["uWorkflowStatusId"] : strFirstWorkflowStatusId;
            return { ...objWorkflowStatus, ["uWorkflowStatusId"]: strWorkflowStatusId };
        });
        return arrNewRecentWorkflowStatuses;
    }

    /**
     * @name GetRecentWorkflowStatus
     * @param {string} strLanguageId takes LanguageId
     * @param {string} strId takes strId
     * @param {object} objContext takes objContext
     * @summary Gets the RecentWorkflow status from t_CMS_Page_AssignedWorkflowStatus
     */
    GetRecentWorkflowStatus(strLanguageId, strId, objContext) {
        let strRecentWorkflowStausId = strId == "uWorkflowStatusId" ? -1 : "";
        var objRecentWorkflowStatus;
        if (objContext.state.objData["t_CMS_Page_AssignedWorkflowStatus"])
            objRecentWorkflowStatus = objContext.state.objData["t_CMS_Page_AssignedWorkflowStatus"].find(objAssignedWorkflowStatus => {
                return objAssignedWorkflowStatus["cIsLatest"] == "Y" && objAssignedWorkflowStatus["iLanguageId"] == strLanguageId
            });
        if (objRecentWorkflowStatus)
        {
            strRecentWorkflowStausId = objRecentWorkflowStatus[strId];
        };           
        return strRecentWorkflowStausId;
    }

    /**
     * @name HandleChangeWorkflowStatus
     * @param {string} strId takes strId
     * @param {string} strValue takes strValue
     * @param {string} strLanguageId takes LanguageId
     * @param {object} objContext takes objContext
     * @summary Handel the change of drop down in WorkFlowStatus component
     */
    HandleChangeWorkflowStatus(strId, strValue, strLanguageId, objContext) {    
        
        //updating the arrNewWorkflowStatuses to be sent in vEditData
        let objNewWorkflowStatus = {}
        if (strId == "uWorkflowStatusId") {
            objNewWorkflowStatus = { ...objContext.state.arrRecentWorkflowStatuses.find(objRecentWorkflowStatus => objRecentWorkflowStatus["iLanguageId"] == strLanguageId), "uWorkflowStatusId": strValue, "vComment": "" }
        }
        else {
            objNewWorkflowStatus = { ...objContext.state.arrRecentWorkflowStatuses.find(objRecentWorkflowStatus => objRecentWorkflowStatus["iLanguageId"] == strLanguageId), "vComment": strValue }
        }
        let arrNewEditWorkflowStauses = objContext.state.arrNewWorkflowStatuses.filter(objNewWorkflowStatuses => objNewWorkflowStatuses["iLanguageId"] != strLanguageId);

        //updating arrRecentWorkflowStatuses for two way binding
        let arrNewRecentWorkflowStauses = objContext.state.arrRecentWorkflowStatuses.map(objRecentWorkflowStatus => {
            if (objRecentWorkflowStatus["iLanguageId"] == strLanguageId) {
                if (strId == "uWorkflowStatusId")
                    return { ...objRecentWorkflowStatus, "uWorkflowStatusId": strValue, "vComment": "" }
                else
                    return { ...objRecentWorkflowStatus, "vComment": strValue }
            }
            else return objRecentWorkflowStatus
        });
        objContext.dispatch({ type: "SET_STATE", payload: { arrNewWorkflowStatuses: [...arrNewEditWorkflowStauses, objNewWorkflowStatus], arrRecentWorkflowStatuses: arrNewRecentWorkflowStauses } });
    }

    /**
     * @name GetWorkflowStatusDetail
     * @param {string} strLanguageId takes LanguageId
     * @param {string} strType takes the field id of work flow
     * @param {object} objContext takes objContext
     * @summary Returns recent work flow status Id or Comment based on strType passed
     */
    GetWorkflowStatusDetail(strLanguageId, strType, objContext) {
        let strRecentWorkflowStausDetail = strType == "uWorkflowStatusId" ? -1 : "";
        var objRecentWorkflowStatus = objContext.state.arrRecentWorkflowStatuses.find(objAssignedWorkflowStatus => {
            return objAssignedWorkflowStatus["cIsLatest"] == "Y" && objAssignedWorkflowStatus["iLanguageId"] == strLanguageId
        });
        if (objRecentWorkflowStatus)
        {
            strRecentWorkflowStausDetail = objRecentWorkflowStatus[strType];
        };
        return strRecentWorkflowStausDetail;
    }
    
    /**
     * @name GetCurrentWorkflowStatusName
     * @param {string} strLanguageId takes Language id
     * @param {object} objContext takes objContext 
     * @summary Returns name of WorkflowStatus
     */
    GetCurrentWorkflowStatusName(strLanguageId, objContext) {
        let strCurrentWorkFlowStatusName = "  -  ";
        let strCurrentWorkFlowStatusId = this.GetRecentWorkflowStatus(strLanguageId, "uWorkflowStatusId", objContext);
        if (strCurrentWorkFlowStatusId != -1)
            strCurrentWorkFlowStatusName = this.GetWorkflowStatusNameFromId(strCurrentWorkFlowStatusId, objContext);
        return strCurrentWorkFlowStatusName;
    }

    /**
     * @name GetWorkflowStatusNameFromId
     * @param {string} strWorkflowStatusId takes work flow status id
     * @param {object} objContext takes objContext
     * @summary Returns name of WorkflowStatus
     */
    GetWorkflowStatusNameFromId(strWorkflowStatusId, objContext) {
    let arrActiveWorkFlowStatuses = objContext.props.Data.DropdownData.ActiveWorkFlowStatuses;
    var strWorkflowStatusName = "-";
    var objActiveWorkFlowStatus = arrActiveWorkFlowStatuses.find(objActiveWorkFlowStatus => {
        return objActiveWorkFlowStatus["uWorkflowStatusId"] == strWorkflowStatusId
    });
    var arrt_TestDrive_WorkflowStatus_Data = objActiveWorkFlowStatus ? (objActiveWorkFlowStatus["t_TestDrive_WorkflowStatus_Data"] ? objActiveWorkFlowStatus["t_TestDrive_WorkflowStatus_Data"] : []) : [];
    arrt_TestDrive_WorkflowStatus_Data.map(objActiveWorkFlowStatusData => {
        if (objActiveWorkFlowStatusData["iLanguageId"] == objContext.props.Resource.JConfiguration.InterfaceLanguageId)
            strWorkflowStatusName = objActiveWorkFlowStatusData["vWorkflowStatus"];
    })
    return strWorkflowStatusName;
    }

    /**
     * @name GetAdministratorName
     * @param {string} strUserId takes UserId 
     * @param {object} objContext takes objContext
     * @summary Returns name of Administrator
     */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"];
        var objIntranetadministrator = arrIntranetadministrators.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] == strUserId
        })
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }
        
    /**
     * @name GetMultiLanguageData
     * @param {object} objContext takes objContext
     * @summary Returns MultilanguageData
     */
    GetMultiLanguageData(objContext) {
        let arrClientLanguageId = [];
        let arrMultiLanguageData = [];
        let arrMultiLanguageDetails = [];
        if (objContext.props.Data.MainClientLanguageData && objContext.props.Data.LanguageData) {
            objContext.props.Data.MainClientLanguageData.map((objMainClientLanguage) => {
                if (objMainClientLanguage["cIsDeleted"] == 'N' && objMainClientLanguage["iApplicationTypeId"] == 2 )
                    arrClientLanguageId = [...arrClientLanguageId, objMainClientLanguage["iLanguageId"]]
            })

            objContext.props.Data.LanguageData.map((objLanguage) => {
                if (arrClientLanguageId.includes(objLanguage["iFrameworkLanguageId"])) {
                    let obj = {
                        "iLanguageId": objLanguage["iFrameworkLanguageId"],
                        "vPageTitle": null,
                        "tCorrectAnswerExplanation": null,
                        "cPointOverride": null,
                        "dPoints": null
                    };
                    arrMultiLanguageData = [...arrMultiLanguageData, obj];
                    arrMultiLanguageDetails = [...arrMultiLanguageDetails, objLanguage];
                }
            })
        }
        return { arrMultiLanguageData, arrMultiLanguageDetails };
    }

    /**
     * @name IsTheDropDownToShow
     * @param {string} strKey takes key for ClientSettingsData object
     * @param {object} objContext takes objContext
     * @summary Checks of the strKey is present in ClientSettingsData object
     */
    IsTheDropDownToShow(strKey, objContext) {
        let arrClientSettingsData = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings)["Data"] ? DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings)["Data"] : [];
        let objClientSettingsData = arrClientSettingsData.find(objClientSettingsData => {
            return objClientSettingsData["vKey"] == strKey && objClientSettingsData["vParentKey"] == "Intranet"
        })
        return objClientSettingsData ? (objClientSettingsData["vValue"] == "Y" ? true : false) : false;
    }

    /**
     * @name SetSubjectKundenId
     * @param {object} objSubject takes Subject object.
     * @param {object} objContext takes objContext
     * @summary Sets the KundenId for subject in state
     */
    SetSubjectKundenId(objSubject, objContext) {
        let objSubjectData = objSubject.t_TestDrive_Subject_Data.find(objSubjectData => { return objSubjectData["iLanguageId"] == objContext.props.Resource.JConfiguration.InterfaceLanguageId });
        var strSubjectName = objSubjectData["vSubjectName"];
        let strSubjectKundenId = strSubjectName.substring(0, 2);
        objContext.dispatch({ type: "SET_STATE", payload: { strKundenId1: strSubjectKundenId } });
    }

    /**
     * @name GetKundenId
     * @param {object} objContext takes objContext
     * @summary Computes the KundenId for vCustomerTaskId
     */
    GetKundenId(objContext) {
        let strKundenId = "";
        if (objContext.state.strKundenId1) {
            strKundenId += objContext.state.strKundenId1;
            strKundenId += objContext.state.intKundenId2 + "_";
            strKundenId += objContext.state.strKundenId3;
            strKundenId += objContext.state.intKundenId4 + "_";
            strKundenId += objContext.state.strKundenId5;
            strKundenId += objContext.state.intKundenId6;
        }
        else {
            strKundenId = objContext.props.Data.objSelectedRow["vCustomerTaskId"];
        }
        return strKundenId;
    }

    /**
     * @name HandleDropDownChange
     * @param {string} strDropDownType takes the type of drop down
     * @param {object} objSelectedValue takes objSelectedValue
     * @param {object} objContext takes objContext
     * @param {object} objDropDownProps takes objDropDownProps
     * @summary Handles the change in drop down selection
     */
    HandleDropDownChange(strDropDownType, objSelectedValue, objContext, objDropDownProps) {
        let objData = objContext.state.objData;
        let strValue = "", strId = "";
        let arrt_TestDrive_Task_AssignedAdditionalTaskProperty = objContext.state.objData.t_TestDrive_Task_AssignedAdditionalTaskProperty;
        switch (strDropDownType.toLowerCase()) {
            case "subject":
                objContext.dispatch({ type: "SET_STATE", payload: { strSubjectId: objSelectedValue["iSubjectId"], strSubSubjectId: -1, strCategoryId: -1, strCategoryCompetencyId: -1, strCompetencyRangeId: -1, strCompetencyLevelId: -1, strIntermediateId: -1, objData: { ...objData, "iParentSubjectId": objSelectedValue.iSubjectId, "iSubjectId": -1, "iCategoryId": -1, "iCategoryCompetencyId": -1, "iCategoryCompetencyLevelId": -1, "iIntermediateId": -1, "t_TestDrive_Task_AssignedAdditionalTaskProperty": [] } } });
                this.SetSubjectKundenId(objSelectedValue, objContext);
                strValue = objSelectedValue.iSubjectId;
                strId = "iParentSubjectId";
                break;
            case "subsubject":
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objData, "iSubjectId": objSelectedValue.iSubjectId, "iCategoryId": -1, "iCategoryCompetencyId": -1 } } });
                objContext.dispatch({ type: "SET_STATE", payload: { intKundenId2: objDropDownProps.intIndex } });
                strValue = objSelectedValue.iSubjectId;
                strId = "iSubjectId";
                break;
            case "category":
                objContext.state.objData.t_TestDrive_Task_AssignedAdditionalTaskProperty.map(objDepData => {
                    let objDependency = objContext.props.Data.TaskAdditionalPropertyValue.find(obj => obj["iAdditionalTaskPropertyId"] == objDepData["iAdditionalTaskPropertyId"]);
                    if (objDependency && objDependency["iDependencyColumnValueId"] != -1)
                        arrt_TestDrive_Task_AssignedAdditionalTaskProperty = objContext.state.objData.t_TestDrive_Task_AssignedAdditionalTaskProperty.filter(obj => obj["iAdditionalTaskPropertyId"] != objDependency["iAdditionalTaskPropertyId"])
                });
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objData, "iCategoryId": objSelectedValue.iCategoryId, "iCategoryCompetencyId": -1, "t_TestDrive_Task_AssignedAdditionalTaskProperty": arrt_TestDrive_Task_AssignedAdditionalTaskProperty } } });
                objContext.dispatch({ type: "SET_STATE", payload: { strKundenId3: String.fromCharCode(objDropDownProps.intIndex + 96) } });
                strValue = objSelectedValue.iCategoryId;
                strId = "iCategoryId";
                break;
            case "competency":
                objContext.state.objData.t_TestDrive_Task_AssignedAdditionalTaskProperty.map(objDepData => {
                    let objDependency = objContext.props.Data.TaskAdditionalPropertyValue.find(obj => obj["iAdditionalTaskPropertyId"] == objDepData["iAdditionalTaskPropertyId"]);
                    if (objDependency && objDependency["iDependencyColumnValueId"] != -1)
                        arrt_TestDrive_Task_AssignedAdditionalTaskProperty = objContext.state.objData.t_TestDrive_Task_AssignedAdditionalTaskProperty.filter(obj => obj["iAdditionalTaskPropertyId"] != objDependency["iAdditionalTaskPropertyId"])
                });
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objData, "iCategoryCompetencyId": objSelectedValue.iCategoryCompetencyId, "t_TestDrive_Task_AssignedAdditionalTaskProperty": arrt_TestDrive_Task_AssignedAdditionalTaskProperty } } });
                objContext.dispatch({ type: "SET_STATE", payload: { intKundenId4: objDropDownProps.intIndex } });
                strValue = objSelectedValue.iCategoryCompetencyId;
                strId = "iCategoryCompetencyId";
                break;
            case "competencyrange":
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objData, "iCategoryCompetencyRangeId": objSelectedValue.iCompetencyRangeId } } });
                strValue = objSelectedValue.iCompetencyRangeId;
                strId = "iCategoryCompetencyRangeId";
                break;
            case "competencylevel":
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objData, "iCategoryCompetencyLevelId": objSelectedValue.iCompetencyLevelId } } });
                objContext.dispatch({ type: "SET_STATE", payload: { strKundenId5: String.fromCharCode(objDropDownProps.intIndex + 96) } });
                strValue = objSelectedValue.iCompetencyLevelId;
                strId = "iCategoryCompetencyLevelId";
                break;
            case "intermediate":
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objData, "iIntermediateId": objSelectedValue.iIntermediateId } } });
                objContext.dispatch({ type: "SET_STATE", payload: { intKundenId6: objSelectedValue.iIntermediateValue } });
                strValue = objSelectedValue.iIntermediateId;
                strId = "iIntermediateId";
                break;            
            case "skin":
                objContext.dispatch({ type: "SET_STATE", payload: { objData: { ...objData, "uSkinId": objSelectedValue.uSkinId } } });
                strValue = objSelectedValue["uSkinId"];
                strId = "uSkinId";
                break;
        }
        //validation 
        if (objContext.props.Data.IsSaveClicked) {
            //to get MetaData of Taxonomy component based on ClientSettings
            let objEvent = {
                IsTheDropDownToShow: (strKey) => objContext.props.Events.IsTheDropDownToShow(strKey)
            };
            FieldValidator.ValidateClientSide(Taxonomy_MetaData.GetTaxonomyMetaData(objEvent), objContext.props.Resource.Text, { [strId]: strValue }, strId, false, "", "", true)
        }
    }
   
    /**
     * @name AdditionalPropHandleChange
     * @param {array} arrTestDrive_Task_AssignedAdditionalTaskProperty takes the updated array of Additional task property
     * @param {object} objContext takes objContext
     * @summary Handles the change in drop down selection of Additional properties component
     */
    AdditionalPropHandleChange(arrTestDrive_Task_AssignedAdditionalTaskProperty, objContext) {        
        let objData = { ...objContext.state.objData, "t_TestDrive_Task_AssignedAdditionalTaskProperty": arrTestDrive_Task_AssignedAdditionalTaskProperty };
        objContext.dispatch({ type: "SET_STATE", payload: { objData: objData } });
    }
}
export default Base_AddEditTaskMaster_ModuleProcessor;