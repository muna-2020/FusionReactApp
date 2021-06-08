//React related imports...
import React, { useReducer } from "react";
import { connect } from 'react-redux';

//Base classes...
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Components used...
import FillHeight from "@root/Framework/Controls/FillHeight/FillHeight";

//Module related files...
import TaskPropertyDetails_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetails/TaskPropertyDetails_ModuleProcessor';
import * as TaskPropertyDetails_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetails/TaskPropertyDetails_Hook';
//import BasicProperties from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents_New/BasicProperties/BasicProperties';
//import Taxonomy from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents_New/Taxonomy/Taxonomy';
//import Language from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents_New/Language/Language';
//import AdditionalProperties from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents_New/AdditionalProperties/AdditionalProperties';
//import DevelopmentHistoryBasicProperties from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents_New/DevelopmentHistoryBasicProperties/DevelopmentHistoryBasicProperties';
//import WorkflowStatus from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents_New/WorkflowStatus/WorkflowStatus';
//import DifficultyLevel from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents_New/DifficultyLevel/DifficultyLevel';
//Old References
import BasicProperties from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/BasicProperties/BasicProperties';
import Taxonomy from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/Taxonomy/Taxonomy';
import Language from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/Language/Language';
import AdditionalProperties from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/AdditionalProperties/AdditionalProperties';
import DevelopmentHistoryBasicProperties from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/DevelopmentHistoryBasicProperties/DevelopmentHistoryBasicProperties';
import WorkflowStatus from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/WorkflowStatus/WorkflowStatus';
import DifficultyLevel from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/DifficultyLevel/DifficultyLevel';
import SeparationAndCalibration from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/SeparationAndCalibration/SeparationAndCalibration';

/**
 * @name TaskPropertyDetails
 * @param {object} props props
 * @summary This component displays the Task Property details.
 * @returns {object} jsx.
 */
const TaskPropertyDetails = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TaskPropertyDetails_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TaskPropertyDetails", ["TaskPropertyDetails_ModuleProcessor"]: new TaskPropertyDetails_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns null
    */
    objContext.TaskPropertyDetails_ModuleProcessor.Initialize(objContext, objContext.TaskPropertyDetails_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TaskPropertyDetails_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        //var objTextResource = props.TextResource;
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        //To Check from local by giving refrence in ComponentController we can use selected Row as below one
        //let objSelectedRow = {
        //    "iFolderId": 23198,
        //    "cIsShortcut": null,
        //    "iSubjectId": 2421,
        //    "iTaskTypeId": 1,
        //    "dtModifiedOn": "2020-10-06T13:10:30.63",
        //    "t_CMS_Page_Language": [
        //        {
        //            "iLanguageId": 3
        //        }
        //    ],
        //    "uModifiedById": null,
        //    "vPageName": "Task_Amit2",
        //    "dtCreatedOn": "2020-10-06T13:10:30.63",
        //    "cIsFusionVersion": "Y",
        //    "uUserId": "AE27E1A5-CEAF-48DC-9FD7-5EE49BF434C6",
        //    "vPageDescription": "",
        //    "t_TestDrive_Task_AssignedTaskDifficultyLevel": [],
        //    "iCategoryCompetencyLevelId": 16,
        //    "iCategoryCompetencyId": 72,
        //    "cIsDeleted": "N",
        //    "cIsAdaptiveTask": "N",
        //    "t_CMS_Page_Data": [
        //        {
        //            "cPointOverride": "N",
        //            "iLanguageId": 3,
        //            "tCorrectAnswerExplanation": null,
        //            "dPoints": null,
        //            "vPageTitle": null
        //        }
        //    ],
        //    "iEstimatedTimeToSolveSolveInSeconds": null,
        //    "t_CMS_Page_AssignedWorkflowStatus": [
        //        {
        //            "vComment": "",
        //            "uUserId": "AE27E1A5-CEAF-48DC-9FD7-5EE49BF434C6",
        //            "cIsLatest": "Y",
        //            "iLanguageId": 3,
        //            "iPageDataId": 285078,
        //            "dtCreatedOn": "2020-10-06T13:10:30.667",
        //            "uWorkflowStatusId": "98CC75FF-BB78-4702-860E-A6C4F963FADC"
        //        }
        //    ],
        //    "iTaskUsageId": 3,
        //    "iCategoryId": 689,
        //    "vSource": "",
        //    "iIntermediateId": 23,
        //    "dPoints": null,
        //    "iPageId": 252618,
        //    "vCustomerTaskId": null,
        //    "cIsForInternalTesting": "Y",
        //    "t_CMS_Page_Container": [
        //        {
        //            "iContainerId": 203359,
        //            "iLanguageId": 3,
        //            "dContainerPoints": null,
        //            "iOrder": 1
        //        }
        //    ],
        //    "iCategoryCompetencyRangeId": 7,
        //    "uSkinId": "00000000-0000-0000-0000-000000000000",
        //    "Id": 252618,
        //    "Name": "Task_Amit2"
        //};
        let objSelectedRow = props.SelectedRow ? props.SelectedRow : {};
        let objTaskDetails = objContext.TaskPropertyDetails_ModuleProcessor.GetTaskDetails(objSelectedRow, objContext);
        return <div className="file-explorer-detail">
            <FillHeight
                Meta={{
                    HeaderIds: ["MasterHeader", "TaskTitle", "FilterBlock", "BreadCrumb", "OfflineExecution"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
            >
                <h2>{Localization.TextFormatter(objTextResource, 'Task')}</h2>

                <BasicProperties
                    Data={{
                        TaskData: objTaskDetails
                    }}
                    Resource={{
                        Text: objTextResource//props.TextResource
                    }}
                />

                <Taxonomy
                    Data={{
                        TaskData: objTaskDetails
                    }}
                    Resource={{
                        Text: objTextResource//props.TextResource
                    }}
                />

                <Language
                    Data={{
                        TaskData: objTaskDetails
                    }}
                    Resource={{
                        Text: objTextResource//props.TextResource
                    }}
                />
                {
                objSelectedRow["iTaskTypeId"] == 1 &&
                    objSelectedRow["iTaskUsageId"] == 3 &&
                    objSelectedRow["cIsAdaptiveTask"] == 'Y' ?
                    <SeparationAndCalibration
                        SelectedRow={objSelectedRow}
                        Resource={{
                            Text: props.TextResource
                        }}
                    />
                    : <React.Fragment />
                }
                <AdditionalProperties
                    Data={{
                        TaskData: objTaskDetails
                    }}
                    Resource={{
                        Text: objTextResource//props.TextResource
                    }}
                />

                <DifficultyLevel
                    Data={{
                        TaskData: objTaskDetails
                    }}
                    Resource={{
                        Text: objTextResource//props.TextResource
                    }}
                />

                <h2>{Localization.TextFormatter(objTextResource, 'DevelopmentHistory')}</h2>

                <DevelopmentHistoryBasicProperties
                    Data={{
                        TaskData: objTaskDetails
                    }}
                    Resource={{
                        Text: objTextResource//props.TextResource
                    }}
                />
                <WorkflowStatus
                    Data={{
                        TaskData: objTaskDetails
                    }}
                    Resource={{
                        Text: objTextResource//props.TextResource
                    }}
                />

            </FillHeight>
        </div>
    }

    //return (
    //     GetContent()
    //);
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <div className="file-explorer-detail-empty-message" />;
};

export default connect(IntranetBase_Hook.MapStoreToProps(TaskPropertyDetails_ModuleProcessor.StoreMapList()))(TaskPropertyDetails);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TaskPropertyDetails_ModuleProcessor; 