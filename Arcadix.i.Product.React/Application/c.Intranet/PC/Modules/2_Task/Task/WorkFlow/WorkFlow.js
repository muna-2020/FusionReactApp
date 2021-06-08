// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";
import Grid from '@root/Framework/Blocks/Grid/Grid';

//Module related fies.
import * as WorkFlow_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/WorkFlow_Hook';
import * as WorkFlow_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/WorkFlow_MetaData';
import WorkFlow_ModuleProcessor from "@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/WorkFlow_ModuleProcessor";

//In-line Image imports...
import SetDefaultImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Set_Default.png?inline';

/**
* @name WorkFlow
* @param {object} props props
* @summary This component displays the WorkFlow  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with WorkFlow  details.
*/
const WorkFlow = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, WorkFlow_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "WorkFlow", ["WorkFlow_ModuleProcessor"]: new WorkFlow_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in WorkFlow_Hook, that contains all the custom hooks.
    * @returns null
    */
    WorkFlow_Hook.Initialize(objContext);

    /**
* @name  InitializeDataForSSR
* @param {object} objContext context object
* @summary Initializing API and DynamicStyles
* @returns Setting ApplicationState
*/
    objContext.WorkFlow_ModuleProcessor.Initialize(objContext, objContext.WorkFlow_ModuleProcessor);



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
                        SelectedValue: state.strWorkflowTypeId ? state.strWorkflowTypeId : -1
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.WorkFlow_ModuleProcessor.OnWorkflowTypeDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.WorkFlow_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetContent
     * JSX for WorkFlow
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlow", objContext.props);
        objTextResource = objTextResource ? objTextResource : {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "WorkflowType")}</span>
                        {GetWorkFlowTypeDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <PerformanceProfiler ComponentName={"WorkFlowGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='WorkFlowGrid'
                            Meta={{ ...WorkFlow_MetaData.GetMetaData(), Filter: { "cIsDeleted": "N", "uWorkflowTypeId": state.strWorkflowTypeId } }}
                            Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                            Data={objContext.WorkFlow_ModuleProcessor.GetGridData(objContext)}
                            CallBacks={{
                                OnBeforeGridRowRender: (objRow) => objContext.WorkFlow_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
                            }}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        SetDefaultImage: SetDefaultImage
    }
}
export default connect(IntranetBase_Hook.MapStoreToProps(WorkFlow_ModuleProcessor.StoreMapList()))(WorkFlow);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = WorkFlow_ModuleProcessor; 