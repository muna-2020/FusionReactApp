// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";
import Grid from '@root/Framework/Blocks/Grid/Grid';
//Module related fies.
import * as WorkFlowStatus_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/WorkFlowStatus_Hook';
import * as WorkFlowStatus_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/WorkFlowStatus_MetaData';
import WorkFlowStatus_ModuleProcessor from "@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/WorkFlowStatus_ModuleProcessor";

/**
* @name WorkFlowStatus
* @param {object} props props
* @summary This component displays the WorkFlowStatus data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with WorkFlowStatus details.
*/
const WorkFlowStatus = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, WorkFlowStatus_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "WorkFlowStatus", ["WorkFlowStatus_ModuleProcessor"]: new WorkFlowStatus_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in WorkFlowStatus_Hook, that contains all the custom hooks.
    * @returns null
    */
    WorkFlowStatus_Hook.Initialize(objContext);

    /**
* @name  InitializeDataForSSR
* @param {object} objContext context object
* @summary Initializing API and DynamicStyles
* @returns Setting ApplicationState
*/
    objContext.WorkFlowStatus_ModuleProcessor.Initialize(objContext, objContext.WorkFlowStatus_ModuleProcessor);


    /**
   * @name GetSubjectDropDown
   * @summary Forms the  jsx required for the dropdown.
   * @returns {object} jsx, React.Fragment
   */
    const GetWorkFlowTypeDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"WorkFlowTypeDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="WorkFlowTypeDropDown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"] ? DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"] : [],
                        SelectedValue: state.intWorkFlowTypeDropdownSelectedValue ? state.intWorkFlowTypeDropdownSelectedValue : -1
                    }}
                    Meta={{
                        DependingTableName: "t_TestDrive_WorkflowType_Data",
                        IsLanguageDependent: "Y",
                        ValueColumn: "uWorkflowTypeId",
                        DisplayColumn: "vWorkflowType",
                        DefaultOptionValue: - 1,
                        ShowDefaultOption: "true"
                    }}
                    Resource={{
                        Text: {
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                        },
                        JConfiguration: props.JConfiguration,
                        SkinPath: props.JConfiguration.IntranetSkinPath
                    }}
                    Callbacks={{
                        CheckDeletedDropDownData: (objNode) => {
                            return objNode["cIsDeleted"] == "N" && objNode["cIsForProductManagement"] == (JConfiguration.MainClientId == "0" ? "Y" : "N") ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.WorkFlowStatus_ModuleProcessor.OnWorkFlowTypeDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.WorkFlowStatus_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
    * @name GetSubSubjectDropDown
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    const GetWorkFlowDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"WorkFlowDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="WorkFlowDropDown"
                    Data={{
                        DropdownData: state.arrWorkFlowData,
                        SelectedValue: state.intWorkFlowDropdownSelectedValue ? state.intWorkFlowDropdownSelectedValue : -1
                    }}
                    Meta={{
                        DependingTableName: "t_TestDrive_Workflow_Data",
                        IsLanguageDependent: "Y",
                        ValueColumn: "uWorkflowId",
                        DisplayColumn: "vName",
                        DefaultOptionValue: - 1,
                        ShowDefaultOption: "true"
                    }}
                    Resource={{
                        Text: {
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                        },
                        JConfiguration: props.JConfiguration,
                        SkinPath: props.JConfiguration.IntranetSkinPath
                    }}
                    Callbacks={{
                        CheckDeletedDropDownData: (objNode) => {
                            return objNode["cIsDeleted"] == "N" ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.WorkFlowStatus_ModuleProcessor.OnWorkFlowDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.WorkFlowStatus_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlowStatus", objContext.props);
        objTextResource = objTextResource ? objTextResource : {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "WorkflowType")}</span>
                        {GetWorkFlowTypeDropDown(objTextResource)}
                    </div>
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Workflow")}</span>
                        {GetWorkFlowDropDown(objTextResource)}
                    </div>
                </div>

                <div>
                    <React.Fragment>
                        <PerformanceProfiler ComponentName={"WorkFlowStatusGrid"} JConfiguration={props.JConfiguration}>
                            <Grid
                                Id='WorkFlowStatusGrid'
                                Meta={{ ...WorkFlowStatus_MetaData.GetMetaData(), Filter: { "cIsDeleted": "N", "uWorkflowId": state.intWorkFlowDropdownSelectedValue } }}
                                Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                                Data={objContext.WorkFlowStatus_ModuleProcessor.GetGridData(objContext)}
                                ParentProps={{ ...props }}
                            />
                        </PerformanceProfiler>
                    </React.Fragment>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(WorkFlowStatus_ModuleProcessor.StoreMapList()))(WorkFlowStatus);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = WorkFlowStatus_ModuleProcessor; 