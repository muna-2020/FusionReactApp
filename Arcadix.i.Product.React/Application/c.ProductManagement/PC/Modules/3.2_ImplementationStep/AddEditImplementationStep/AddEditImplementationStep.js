// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddEditImplementationStep_Hook from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/AddEditImplementationStep/AddEditImplementationStep_Hook';
import AddEditImplementationStep_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/AddEditImplementationStep/AddEditImplementationStep_ModuleProcessor';
import Workflow from '@root/Framework/Controls/Workflow/Workflow';

/**
  * @name AddEditImplementationStep
  * @param {object} props props
  * @summary This component is used to Add/Edit the UseCase data.
  * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
  */
const AddEditImplementationStep = props => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditImplementationStep_Hook.GetInitialState());

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { state, props, dispatch, "AddEditImplementationStep_ModuleProcessor": new AddEditImplementationStep_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource, refWorkflow: useRef(null) };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.AddEditImplementationStep_ModuleProcessor.Initialize(objContext, objContext.AddEditImplementationStep_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditImplementationStep_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditImplementationStep_Hook.Initialize(objContext);

    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", props);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <div id="UseCase" className="tabcontent subject-management add-edit-implementation-setup" style={{ display: (state.strDivToShow == "ImplementationStep" ? "block" : "none") }}>
                <div className="title">
                    {'ImplementationStep'}
                </div>
                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{"ImplementationStepLayer"}</span>
                        </div>
                        <div className="row-right">
                            <div className="intranet-dropdown" id="uImplementationStepLayerId" autoFocus>
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="uImplementationStepLayerId"
                                    Data={{
                                        DropdownData: DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer)["Data"],
                                        SelectedValue: objContext.state.objData["uImplementationStepLayerId"] ? objContext.state.objData["uImplementationStepLayerId"] : -1
                                    }}
                                    Meta={{
                                        ValueColumn: "uImplementationStepLayerId",
                                        DisplayColumn: "vImplementationStepLayerName",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: "Please Choose"
                                        },
                                        JConfiguration: props.JConfiguration,
                                        SkinPath: props.JConfiguration.IntranetSkinPath
                                    }}
                                    CallBacks={{
                                        CheckDeletedDropDownData: (objItem) => {
                                            return objItem["cIsDeleted"] == "N" ? true : false
                                        }
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditImplementationStep_ModuleProcessor.HandleDropDownChange("uImplementationStepLayerId", objChangeData, props, objContext),
                                        CheckDeletedDropDownData: objContext.AddEditImplementationStep_ModuleProcessor.CreateItemEventHandler
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{"ImplementaionStepLayerTask"}</span>
                        </div>
                        <div className="row-right">
                            <div className="intranet-dropdown">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="uImplementationStepLayerTaskTypeId"
                                    Data={{
                                        DropdownData: objContext.state.arrImplementationStepLayerTaskType,//DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType)["Data"],
                                        SelectedValue: objContext.state.objData["uImplementationStepLayerTaskTypeId"] ? objContext.state.objData["uImplementationStepLayerTaskTypeId"] : -1
                                    }}
                                    Meta={{
                                        ValueColumn: "uImplementationStepLayerTaskTypeId",
                                        DisplayColumn: "vImplementationStepLayerTaskTypeName",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: "Please Choose"
                                        },
                                        JConfiguration: props.JConfiguration,
                                        SkinPath: props.JConfiguration.IntranetSkinPath
                                    }}
                                    CallBacks={{
                                        CheckDeletedDropDownData: (objItem) => {
                                            return objItem["cIsDeleted"] == "N" && objItem["uImplementationStepLayerId"] == objContext.state.objData["uImplementationStepLayerId"] ? true : false
                                        }
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditImplementationStep_ModuleProcessor.HandleDropDownChange("uImplementationStepLayerTaskTypeId", objChangeData, props, objContext),
                                        CheckDeletedDropDownData: objContext.AddEditImplementationStep_ModuleProcessor.CreateItemEventHandler
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{'ImplementationStep'}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditImplementationStep_ModuleProcessor.ValidateFocus(objContext, 'vImplementationStepName'); })}
                                id="vImplementationStepName"
                                className="text-input"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditImplementationStep_ModuleProcessor.HandleChange("vImplementationStepName", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditImplementationStep_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditImplementationStep_ModuleProcessor, objContext)}
                                value={state.objData["vImplementationStepName"]}
                            />
                        </div>
                    </div>
                </div>
                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Description')}</span>
                        </div>
                        <div className="row-right">
                            <textarea
                                onFocus={(e => { objContext.AddEditImplementationStep_ModuleProcessor.ValidateFocus(objContext, 'vImplementationStepDescription'); })}
                                id="vImplementationStepDescription"
                                className="TextArea"
                                rows="4"
                                style={{ width: "100%" }}
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditImplementationStep_ModuleProcessor.HandleChange("vImplementationStepDescription", e.target.value, objContext);
                                }}
                                value={state.objData["vImplementationStepDescription"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div id="Workflow" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "Workflow" ? "block" : "none") }}>
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'Workflow')}
                </div>

                <Workflow ref={objContext.refWorkflow} Id="Workflow"
                    Data={{
                        DropdownData: {
                            ActiveWorkFlowStatuses: DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus, "Object_Cockpit_Workflow_WorkflowStatus;uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"]
                        },
                        AssignedWorkflowData: DataRef(objContext.props.Object_Cockpit_Workflow_AssignedWorkflow, "Object_Cockpit_Workflow_AssignedWorkflow;vObjectId;" + state.objData.uUseCaseImplementationStepId + ";uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"],
                        MultiLanguageData: [],
                        LanguageId: 3
                    }}
                    Resource={{
                        Text: objTextResource,
                        SkinPath: JConfiguration.IntranetSkinPath
                    }}
                    ParentProps={props}
                />
            </div>
            <div id="ValidationError" />
        </div>
    };
    return (
        state.isLoadComplete && state.objData ? GetContent() : <React.Fragment />
    );
};


export default connect(IntranetBase_Hook.MapStoreToProps(AddEditImplementationStep_ModuleProcessor.StoreMapList()))(AddEditImplementationStep);