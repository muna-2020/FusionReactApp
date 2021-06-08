//React related imports...
import React, { useReducer }  from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as TaskSearch_Hook from '@shared/Application/c.Intranet/Modules/2_Task/TaskSearch/TaskSearch_Hook';
import TaskSearch_ModuleProcessor from "@shared/Application/c.Intranet/Modules/2_Task/TaskSearch/TaskSearch_ModuleProcessor";

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//inline Images import
import SearchImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Search.gif?inline';
import SearchCancelImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SearchCancel.svg?inline';

/**
* @name TaskSearch
* @param {object} props props
* @summary This component displays the Task data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Task details.
*/
const TaskSearch = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TaskSearch_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TaskSearch", ["TaskSearch_ModuleProcessor"]: new TaskSearch_ModuleProcessor()};

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.TaskSearch_ModuleProcessor.Initialize(objContext, objContext.TaskSearch_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TaskSearch_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the jsx required for the FilterBlock in the Top.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let Dropdown = props.ParentProps.ComponentController.GetFrameworkComponent("Dropdown");
        let objTextResource = props.Resource.Text;
        return <div className="filter" id="FilterBlock">
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "Search") + ": " }</span>
                <input
                    className="text-input"
                    id=""
                    type="text"
                    onChange={(e) => {
                        objContext.TaskSearch_ModuleProcessor.HandleChange(objContext, e.target.value, "SearchInput")
                    }}
                    value={state.strSearchText} />
            </div>
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "Where") + ": "}</span>
                <PerformanceProfiler ComponentName="FolderTypeDropdown" JConfiguration={JConfiguration}>
                    <Dropdown
                        Id="FolderTypeDropdown"
                        Data={{
                            DropdownData: objContext.TaskSearch_ModuleProcessor.GetSearchDropDownData(objContext),
                            SelectedValue: objContext.state.blnSearchFromSameFolder ? 1 : 0
                        }}
                        Meta={{
                            ValueColumn: "OptionId",
                            DisplayColumn: "OptionText"                        
                        }}
                        Resource={{
                            Text: {
                                // DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                            },
                            JConfiguration: props.ParentProps.JConfiguration,
                            SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                        }}
                        Events={{
                            OnChangeEventHandler: (objChangeData, props) => objContext.TaskSearch_ModuleProcessor.HandleChange(objContext, objChangeData, "SearchOption"),
                            CheckDeletedDropDownData: objContext.TaskSearch_ModuleProcessor.CreateItemEventHandler
                        }}
                        ParentProps={{ ...props.ParentProps }}
                        />
                </PerformanceProfiler>
            </div>
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "View") + ": "}</span>
                <PerformanceProfiler ComponentName="WorkflowStatusDropdown" JConfiguration={JConfiguration}>
                    <Dropdown
                        Id="WorkflowStatusDropdown"
                        Data={{
                            DropdownData: props.Data.ActiveWorkFlowStatuses,
                            SelectedValue: objContext.state.struWorkflowStatusId ? objContext.state.struWorkflowStatusId : -1
                        }}
                        Meta={{
                            DependingTableName: "t_TestDrive_WorkflowStatus_Data",
                            IsLanguageDependent: "Y",
                            ValueColumn: "uWorkflowStatusId",
                            DisplayColumn: "vWorkflowStatus",
                            DefaultOptionValue: - 1,
                            ShowDefaultOption: "true"
                        }}
                        Resource={{
                            Text: {
                                DefaultOptionText: Localization.TextFormatter(objTextResource, "All")
                            },
                            JConfiguration: props.ParentProps.JConfiguration,
                            SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                        }}
                        Events={{
                            OnChangeEventHandler: (objChangeData, props) => objContext.TaskSearch_ModuleProcessor.HandleChange(objContext, objChangeData, "WorkFlowStatus"),
                            CheckDeletedDropDownData: objContext.TaskSearch_ModuleProcessor.CreateItemEventHandler
                        }}
                        ParentProps={{ ...props.ParentProps }}
                        />
                </PerformanceProfiler>
            </div>

            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "InternalTesting") + ": "}</span>
                <label className="checkbox">
                    <input id="cIsInternalTesting"
                        name="check"
                        type="checkbox"
                        checked={objContext.state.blnInternalTesting}//{blnIsActive}
                        onChange={(e) => {
                            objContext.TaskSearch_ModuleProcessor.HandleChange(objContext, e.target.checked, "InternalTesting")
                        }} />
                    <span className="checkmark" />
                </label>
            </div>

            <div className="filter-block">
                {!state.blnSearchMode ?
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: SearchImage
                        }}
                        Events={{
                            OnClickEventHandler: () => { objContext.TaskSearch_ModuleProcessor.Search(objContext) }
                        }}
                        ParentProps={objContext.props.ParentProps}
                    />
                    :
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: SearchCancelImage
                        }}
                        Events={{
                            OnClickEventHandler: () => { objContext.TaskSearch_ModuleProcessor.SearchCancel(objContext) }
                        }}
                        ParentProps={objContext.props.ParentProps}
                    />
                }
            </div>
        </div>;
    }

    return GetContent();
}

export default connect(IntranetBase_Hook.MapStoreToProps(TaskSearch_ModuleProcessor.StoreMapList()))(TaskSearch);