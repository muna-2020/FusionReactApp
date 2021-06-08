// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import AddEditWorkFlowStatus_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/AddEditWorkFlowStatus/AddEditWorkFlowStatus_ModuleProcessor';
import * as  AddEditWorkFlowStatus_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/WorkFlowStatus/AddEditWorkFlowStatus/AddEditWorkFlowStatus_Hook';

/**
 * @name AddEditWorkFlowStatus
 * @param {object} props props
 * @summary This component is used to Add/Edit the Category data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditWorkFlowStatus = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditWorkFlowStatus_Hook.GetInitialState());


    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditWorkFlowStatus_ModuleProcessor": new AddEditWorkFlowStatus_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditWorkFlowStatus_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditWorkFlowStatus_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="WorkflowStatus" className="tabcontent subject-management multilanguage-div">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'WorkflowStatus')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Order')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditWorkFlowStatus_ModuleProcessor.ValidateFocus(objContext, 'Order'); })}
                                className="text-input"
                                id="iDisplayOrder"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                }}
                                onKeyDown={(e) => objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditWorkFlowStatus_ModuleProcessor, objContext)}
                                value={state.objData["iDisplayOrder"]} />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "ProductionReady")}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIsProductionReady"
                                    name="check"
                                    type="checkbox"
                                    checked={state.objData["cIsProductionReady"] == "Y"}//{blnIsActive}
                                    onChange={(e) => {
                                        objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleChange("cIsProductionReady", e.target.checked ? "Y" : "N", objContext)
                                    }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "Shortname")}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vWorkflowStatusShortName",
                                    DependingTableName: "t_TestDrive_WorkflowStatus_Data",
                                    DisplayColumn: "vWorkflowStatusShortName"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleChange("t_TestDrive_WorkflowStatus_Data.vWorkflowStatusShortName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditWorkFlowStatus_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "WorkflowStatus")}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vWorkflowStatus",
                                    DependingTableName: "t_TestDrive_WorkflowStatus_Data",
                                    DisplayColumn: "vWorkflowStatus"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleChange("t_TestDrive_WorkflowStatus_Data.vWorkflowStatus", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditWorkFlowStatus_ModuleProcessor, objContext)
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
                            <span>{Localization.TextFormatter(objTextResource, "Description")}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vWorkflowStatusDescription",
                                    DependingTableName: "t_TestDrive_WorkflowStatus_Data",
                                    DisplayColumn: "vWorkflowStatusDescription"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleChange("t_TestDrive_WorkflowStatus_Data.vWorkflowStatusDescription", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditWorkFlowStatus_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditWorkFlowStatus_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>
                <div id="ValidationError" />
            </div>
        </React.Fragment>
    );
}

export default AddEditWorkFlowStatus;
