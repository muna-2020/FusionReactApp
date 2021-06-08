// React related imports.
import React, { useReducer, useRef } from 'react';

//Module related fies.
//import * as AddEditWorkFlowBusinessLogic from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlowBusinessLogic';
import AddEditWorkFlow_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlow_ModuleProcessor';
import * as AddEditWorkFlow_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlow_Hook';


/**
 * @name AddEditWorkFlow
 * @param {object} props props
 * @summary This component is used to Add/Edit the Competency Level data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditWorkFlow = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditWorkFlow_Hook.GetInitialState());


    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditWorkFlow_ModuleProcessor": new AddEditWorkFlow_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditClientHostUrl_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditWorkFlow_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="WorkFlow" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'WorkflowName')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'WorkflowName')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vName",
                                    DependingTableName: "t_TestDrive_Workflow_Data",
                                    DisplayColumn: "vName"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                onFocus={(e => { objContext.AddEditWorkFlow_ModuleProcessor.ValidateFocus(objContext, 'vName'); })}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditWorkFlow_ModuleProcessor.HandleChange("t_TestDrive_Workflow_Data.vName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditWorkFlow_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditWorkFlow_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'WorkflowTypeId')}</span>
                        </div>
                        <div className="row-right intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="uWorkflowTypeId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.TargetGroup,
                                    SelectedValue: props.Data.DropdownData.strWorkflowTypeId
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
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditWorkFlow_ModuleProcessor.HandleDropDownChange("strWorkflowTypeId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditWorkFlow_ModuleProcessor.CreateItemEventHandler
                                }}
                                ParentProps={{ ...props }}
                            />

                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'Description')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vDescription",
                                    DependingTableName: "t_TestDrive_Workflow_Data",
                                    DisplayColumn: "vDescription"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditWorkFlow_ModuleProcessor.HandleChange("t_TestDrive_Workflow_Data.vDescription", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditWorkFlow_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditWorkFlow_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>
                <div id="ValidationError" />
            </div>

        </React.Fragment >


    );
};

export default AddEditWorkFlow;