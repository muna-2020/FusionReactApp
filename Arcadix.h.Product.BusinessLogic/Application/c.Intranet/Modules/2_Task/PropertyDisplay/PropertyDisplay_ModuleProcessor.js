//Objects required for module.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Taxonomy_Category from '@shared/Object/c.Intranet/6_Taxonomy/Category/Category';
import Object_Intranet_Taxonomy_CategoryCompetency from '@shared/Object/c.Intranet/6_Taxonomy/CategoryCompetency/CategoryCompetency';
import Object_Intranet_Taxonomy_CompetencyRange from '@shared/Object/c.Intranet/6_Taxonomy/CompetencyRange/CompetencyRange';
import Object_Intranet_Taxonomy_CompetencyLevel from '@shared/Object/c.Intranet/6_Taxonomy/CompetencyLevel/CompetencyLevel';
import Object_Intranet_Task_TaskAdditionalProperty from '@shared/Object/c.Intranet/2_Task/Task/TaskAdditionalProperty/TaskAdditionalProperty';
import Object_Intranet_Task_TaskAdditionalPropertyValue from '@shared/Object/c.Intranet/2_Task/Task/TaskAdditionalPropertyValue/TaskAdditionalPropertyValue';
import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';
import Object_Intranet_Taxonomy_Intermediate from '@shared/Object/c.Intranet/6_Taxonomy/Intermediate/Intermediate';
import Object_Cockpit_MainClient_ClientSettings from '@shared/Object/c.Cockpit/MainClient/ClientSettings/ClientSettings';
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Intranet_Test_SeparationAndCalibrationTask from '@shared/Object/c.Intranet/3_Test/Test/SeparationAndCalibration/SeparationAndCalibrationTask/SeparationAndCalibrationTask'
import Object_Intranet_Test_SeparationAndCalibrationGroup from '@shared/Object/c.Intranet/3_Test/Test/SeparationAndCalibration/SeparationAndCalibrationGroup/SeparationAndCalibrationGroup'
import Object_Intranet_Test_InputStatus from '@shared/Object/c.Intranet/3_Test/Test/SeparationAndCalibration/InputStatus/InputStatus'


/**
* @name PropertyDisplay_ModuleProcessor
* @summary Class for Task module display.
*/
class PropertyDisplay_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language",
            "Object_Intranet_Task_TaskDifficultyLevel",
            "Object_Cockpit_Workflow_WorkflowStatus",
            "Object_Cockpit_Workflow_Workflow",
            "Object_Cockpit_Workflow_WorkflowType",
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
            "Object_Intranet_Test_SeparationAndCalibrationTask",
            "Object_Intranet_Test_SeparationAndCalibrationGroup",
            "Object_Intranet_Test_InputStatus",
            { "StoreKey": "ApplicationState", "DataKey": "SelectedRows" }
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

        //SeparationAndCalibrationTask
        Object_Intranet_Test_SeparationAndCalibrationTask.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_SeparationAndCalibrationTask];

        //SeparationAndCalibrationTask
        Object_Intranet_Test_SeparationAndCalibrationGroup.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_SeparationAndCalibrationGroup];

        //InputStatus
        Object_Intranet_Test_InputStatus.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_InputStatus];

        return arrDataRequest;
    }

    /**
     * @name GetTaskDetails
     * @param {object} objSelectedRow SelectedRow
     * @param {object} objContext objContext
     * @summary Gets the property details to be displayed on TaskDisplayProperties
     */
    GetTaskDetails(objSelectedRow, objContext) {
        var strSubjectName = "", strSubSubjectName = "", strCategoryName = "", strCategoryCompetencyName = "", strCompetencyRangeName = "", strCompetencyLevelName = "", strWorkFlowStatus = "", strWorkFlowComment = "", strTasktype = "", strTaskUsage = "",
            strOwner = "", strEditedBy = "", strDifficultyLevel = "";

        //Getting subject and SubSubject Names
        let objSubSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].find(objSubject => {
            return objSubject["iSubjectId"] == objSelectedRow["iSubjectId"]
        });
        if (objSubSubject) {
            let objSubSubjectData = objSubSubject.t_TestDrive_Subject_Data.find(objSubjectData => { return objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId });
            strSubSubjectName = objSubSubjectData ? objSubSubjectData["vSubjectName"] : "";
            let objSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].find(objSubject => {
                return objSubject["iSubjectId"] == objSubSubject["iParentSubjectId"]
            });
            if (objSubject) {
                let objSubjectData = objSubject.t_TestDrive_Subject_Data.find(objSubjectData => { return objSubjectData["iLanguageId"] == JConfiguration.InterfaceLanguageId });
                strSubjectName = objSubjectData ? objSubjectData["vSubjectName"] : "";
            }
        }

        //Getting Category Name
        let objCategory = DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"].find(objCat => {
            return objCat["iCategoryId"] == objSelectedRow["iCategoryId"]
        });
        if (objCategory) {
            let objCategoryData = objCategory.t_TestDrive_Category_Data.find(objCatData => { return objCatData["iLanguageId"] == JConfiguration.InterfaceLanguageId });
            strCategoryName = objCategoryData ? objCategoryData["vCategoryName"] : "";
        }

        //Getting CategoryCompetency Name
        let objCategoryCompetency = DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"].find(objComp => {
            return objComp["iCategoryCompetencyId"] == objSelectedRow["iCategoryCompetencyId"]
        });
        if (objCategoryCompetency) {
            let objCategoryCompetencyData = objCategoryCompetency.t_TestDrive_Category_Competency_Data.find(objCompData => { return objCompData["iLanguageId"] == JConfiguration.InterfaceLanguageId });
            strCategoryCompetencyName = objCategoryCompetencyData ? objCategoryCompetencyData["tCompetencyText"] : "";
        }

        //Competency level
        let objCompetencyLevel = DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyLevel)["Data"].find(objCompetencyLevel => {
            return objCompetencyLevel["iCompetencyLevelId"] == objSelectedRow["iCategoryCompetencyLevelId"]
        });
        if (objCompetencyLevel) {
            let objCompetencyLevelData = objCompetencyLevel.t_testdrive_Category_Competency_CompetencyLevel_Data.find(objCompetencyLevelData => { return objCompetencyLevelData["iLanguageId"] == JConfiguration.InterfaceLanguageId });
            strCompetencyLevelName = objCompetencyLevelData ? objCompetencyLevelData["cCompetencyLevel"] : "";
        }

        //Competency Range
        let objCompetencyRange = DataRef(objContext.props.Object_Intranet_Taxonomy_CompetencyRange)["Data"].find(objCompetencyRange => {
            return objCompetencyRange["iCompetencyRangeId"] == objSelectedRow["iCategoryCompetencyRangeId"]
        });
        if (objCompetencyRange) {
            let objCompetencyRangeData = objCompetencyRange.t_testdrive_Category_Competency_CompetencyRange_Data.find(objCompetencyRangeData => { return objCompetencyRangeData["iLanguageId"] == JConfiguration.InterfaceLanguageId });
            strCompetencyRangeName = objCompetencyRangeData ? objCompetencyRangeData["vCompetencyRange"] : "";
        }

        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        //Workflow status      
        if (objSelectedRow.t_CMS_Page_AssignedWorkflowStatus && objSelectedRow.t_CMS_Page_AssignedWorkflowStatus.length > 0) {
            let objLatestWorkFlowStatus = objSelectedRow.t_CMS_Page_AssignedWorkflowStatus.find(objAssignedWorkflowStatus => objAssignedWorkflowStatus["cIsLatest"] == "Y" || objAssignedWorkflowStatus["cIsLatest"] == true && objAssignedWorkflowStatus["iLanguageId"] == JConfiguration.InterfaceLanguageId);
            let objWorkFlowStatus;
            if (objLatestWorkFlowStatus) {
                strWorkFlowComment = objLatestWorkFlowStatus["vComment"];
                objWorkFlowStatus = DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus)["Data"].find(objWorkFlowStatus => objWorkFlowStatus["uWorkflowStatusId"] == objLatestWorkFlowStatus["uWorkflowStatusId"]);
            } 

            if (objWorkFlowStatus) {
                let objWorkFlowStatusData = objWorkFlowStatus.t_TestDrive_WorkflowStatus_Data.find(objWorkFlowStatusData => objWorkFlowStatusData["iLanguageId"] == JConfiguration.InterfaceLanguageId)
                strWorkFlowStatus = objWorkFlowStatusData ? objWorkFlowStatusData["vWorkflowStatus"] : ""
            }
        }

        //Language details
        let arrLanguageIds = objSelectedRow.t_CMS_Page_Language ? objSelectedRow.t_CMS_Page_Language.map(objLanguage => { return objLanguage["iLanguageId"] }) : [];

        let objLanguages = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"].map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
        });

        let arrLanguageDetails = arrLanguageIds.map(iLanguageId => { return objLanguages[iLanguageId] })

        //DifficultyLevel
        //let arrAssignedDifficultyLevelDetails = []
        if (objSelectedRow.t_TestDrive_Task_AssignedTaskDifficultyLevel) {

            let objDifficultyLevels = {}
            DataRef(objContext.props.Object_Intranet_Task_TaskDifficultyLevel)["Data"].map(objDifficultyLevel => {
                objDifficultyLevel.t_TestDrive_Task_TaskDifficultyLevel_Data.map(objDifficultyLevelData => {
                    if (objDifficultyLevelData["iLanguageId"] == JConfiguration.InterfaceLanguageId)
                        objDifficultyLevels = { ...objDifficultyLevels, [objDifficultyLevel.iTaskDifficultyLevelId]: objDifficultyLevelData.vTaskDifficultyLevelName }
                })
            })

            objSelectedRow.t_TestDrive_Task_AssignedTaskDifficultyLevel.map(objAssignedDifficultyLevel => {
                if (objAssignedDifficultyLevel["iSchoolYearId"] == -1) {
                    strDifficultyLevel = objDifficultyLevels[objAssignedDifficultyLevel["iTaskDifficultyLevelId"]]
                }
            })

            //for multiple school year settings

            //let objSchoolYears = {}
            //DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"].map(objSchoolYear => {
            //    objSchoolYear.t_TestDrive_Member_Class_SchoolYear_Data.map(objSchoolYearData => {
            //        if (objSchoolYearData["iLanguageId"] == JConfiguration.InterfaceLanguageId)
            //            objSchoolYears = { ...objSchoolYears, [objSchoolYear.iSchoolYearId]: objSchoolYearData.vSchoolYearName }
            //    })
            //})
            //arrAssignedDifficultyLevelDetails = objSelectedRow.t_TestDrive_Task_AssignedTaskDifficultyLevel.map(objAssignedDifficultyLevel => { return { "SchoolYear": objSchoolYears[objAssignedDifficultyLevel["iSchoolYearId"]], "DifficultyLevel": objDifficultyLevels[objAssignedDifficultyLevel["iTaskDifficultyLevelId"]] } })
        }

        //Additional Properties
        let arrAssignedAdditionalPropertyDetails = []
        if (objSelectedRow.t_TestDrive_Task_AssignedAdditionalTaskProperty) {
            let objAdditionalProperties = {}
            DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalProperty)["Data"].map(objAdditionalProperty => {
                objAdditionalProperty.t_TestDrive_Task_AdditionalTaskProperty_Data.map(objAdditionalPropertyData => {
                    if (objAdditionalPropertyData["iLanguageId"] == JConfiguration.InterfaceLanguageId)
                        objAdditionalProperties = { ...objAdditionalProperties, [objAdditionalProperty.iAdditionalTaskPropertyId]: [objAdditionalPropertyData.vAdditionalTaskProperty] }
                })
            })
            let objAdditionalPropertyValues = {}
            DataRef(objContext.props.Object_Intranet_Task_TaskAdditionalPropertyValue)["Data"].map(objAdditionalPropertyValue => {
                objAdditionalPropertyValue.t_TestDrive_Task_AdditionalTaskProperty_Value_Data.map(objAdditionalPorpertyValueData => {
                    objAdditionalPropertyValues = { ...objAdditionalPropertyValues, [objAdditionalPropertyValue.iAdditionalTaskPropertyValueId]: objAdditionalPorpertyValueData.vAdditionalTaskPropertyValueText }
                })
            })

            arrAssignedAdditionalPropertyDetails = objSelectedRow.t_TestDrive_Task_AssignedAdditionalTaskProperty.map(objAssignedAdditionalProperty => {
                return { "PropertyName": objAdditionalProperties[objAssignedAdditionalProperty["iAdditionalTaskPropertyId"]], "PropertyValue": objAdditionalPropertyValues[objAssignedAdditionalProperty["iAdditionalTaskPropertyValueId"]] }
            })
        }
        //TaskType and TaskUsage

        switch (objSelectedRow.iTaskTypeId) {
            case 1:
                strTasktype = "Test";
                break;
            case 2:
                strTasktype = "Manual";
                break;
            case 3:
                strTasktype = "Demo";
                break;
            case 4:
                strTasktype = "Interrogation List";
                break;
            case 5:
                strTasktype = "Break";
                break;
            case 6:
                strTasktype = "Survey";
                break;
            default:
                strTasktype = "";
        }

        switch (objSelectedRow.iTaskUsageId) {
            case 1:
                strTaskUsage = "Learning Task";
                break;
            case 2:
                strTaskUsage = "Examination Paper";
                break;
            case 3:
                strTaskUsage = "Test Task";
                break;
            case 5:
                strTaskUsage = "ShowCase Task";
                break;
            case 6:
                strTaskUsage = "Survey Task";
                break;
            case 7:
                strTaskUsage = "Presentation Task";
                break;
            default:
                strTaskUsage = "";
        }

        //Separation And Calibration details
        let arrSeparationAndCalibrationTaskDetails = [];
        if (objSelectedRow["iTaskTypeId"] == 1 && objSelectedRow["iTaskUsageId"] == 3 && objSelectedRow["cIsAdaptiveTask"] == 'Y') {
            arrSeparationAndCalibrationTaskDetails = DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationTask)["Data"]
                .filter(objSepTask => objSepTask["iTaskId"] == objSelectedRow["iPageId"])
                .map(objTask => {
                    let objGroup = DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"].find(obj => obj["uSeparationAndCalibrationGroupId"] == objTask["uSeparationAndCalibrationGroupId"]);
                    let strGroupName = objGroup ? objGroup.t_TestDrive_SeparationAndCalibration_Group_Data.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId)["vGroupName"] : "";
                    let objInputStatus = DataRef(objContext.props.Object_Intranet_Test_InputStatus)["Data"].find(obj => obj["iInputStatusId"] == objTask["iInputStatusId"]);
                    let strInputStatusName = objInputStatus ? objInputStatus.t_TestDrive_InputStatus_Data.find(objData => objData["iLanguageId"] == JConfiguration.InterfaceLanguageId)["vInputStatusName"] : "";

                    return {
                        ...objTask,
                        ["GroupName"]: strGroupName,
                        ["InputStatusName"]: strInputStatusName
                    }
                });
            if (arrSeparationAndCalibrationTaskDetails.length == 0)
                arrSeparationAndCalibrationTaskDetails = [{ "NotAssigned": true }]
        }


        let objTaskDetails = {
            ...objSelectedRow,
            strTasktype: strTasktype,
            strTaskUsage: strTaskUsage,
            strSubjectName: strSubjectName,
            strSubSubjectName: strSubSubjectName,
            strCategoryName: strCategoryName,
            strCategoryCompetencyName: strCategoryCompetencyName,
            strCompetencyRangeName: strCompetencyRangeName,
            strCompetencyLevelName: strCompetencyLevelName,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            strWorkFlowStatus: strWorkFlowStatus,
            strWorkFlowComment: strWorkFlowComment,
            arrLanguageDetails: arrLanguageDetails,
            //arrAssignedDifficultyLevelDetails: arrAssignedDifficultyLevelDetails,
            strDifficultyLevel: strDifficultyLevel,
            arrAssignedAdditionalPropertyDetails: arrAssignedAdditionalPropertyDetails,
            arrSeparationAndCalibrationTaskDetails: arrSeparationAndCalibrationTaskDetails
        };

        return objTaskDetails;
    }

    /**
     * @name GetTaskFolderDetails
     * @param {object} objSelectedRow SelectedRow
     * @param {object} objContext objContext
     * @summary Gets the property details to be displayed on TaskFolderDetails
     */
    GetTaskFolderDetails(objSelectedRow, objContext) {
        let strOwner = "", strEditedBy = "";
        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        //Language details
        let arrLanguageIds = objSelectedRow.t_CMS_FileSystem_PageFolder_Langauge ? objSelectedRow.t_CMS_FileSystem_PageFolder_Langauge.map(objLanguage => { return objLanguage["iLanguageId"] }) : [];
        let objLanguages = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"].map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
        });
        let arrLanguageDetails = arrLanguageIds.map(iLanguageId => { return objLanguages[iLanguageId] })

        let objTaskFolderDetails = {
            ...objSelectedRow,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            arrLanguageDetails: arrLanguageDetails,
        };

        return objTaskFolderDetails;
    }

    /**
     * @name GetAdministratorName
     * @param {string} strUserId uUserId
     * @param {object} objContext objContext
     * @summary Gets the administrator name for the UserId
     */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"];
        var objIntranetadministrator = arrIntranetadministrators.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] == strUserId
        })
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }
}

export default PropertyDisplay_ModuleProcessor;