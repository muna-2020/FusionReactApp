// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddEditUseCase_Hook from '@shared/Application/c.ProductManagement/Modules/3_UseCase/AddEditUseCase/AddEditUseCase_Hook';
import AddEditUseCase_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3_UseCase/AddEditUseCase/AddEditUseCase_ModuleProcessor';
import Workflow from '@root/Framework/Controls/Workflow/Workflow';

/**
  * @name AddEditUseCase
  * @param {object} props props
  * @summary This component is used to Add/Edit the UseCase data.
  * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
  */
const AddEditUseCase = props => {
    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dispatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditUseCase_Hook.GetInitialState(props));

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { state, props, dispatch, "AddEditUseCase_ModuleProcessor": new AddEditUseCase_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource, refWorkflow: useRef(null)  };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.AddEditUseCase_ModuleProcessor.Initialize(objContext, objContext.AddEditUseCase_ModuleProcessor);

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditUseCase_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditUseCase_Hook.Initialize(objContext);

    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", props);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <div id="UseCase" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "UseCase" ? "block" : "none") }}>
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'UseCase')}
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'UseCaseName')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditUseCase_ModuleProcessor.ValidateFocus(objContext, 'vUseCaseName'); })}
                                id="vUseCaseName"
                                className="text-input"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditUseCase_ModuleProcessor.HandleChange("vUseCaseName", e.target.value, objContext);
                                }}
                                value={state.objData["vUseCaseName"]}
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
                                onFocus={(e => { objContext.AddEditUseCase_ModuleProcessor.ValidateFocus(objContext, 'vDescription'); })}
                                id="vDescription"
                                className="textarea"
                                rows="4"
                                style={{ width: "100%" }}
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditUseCase_ModuleProcessor.HandleChange("vDescription", e.target.value, objContext);
                                }}
                                value={state.objData["vDescription"]}
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
                        AssignedWorkflowData: DataRef(objContext.props.Object_Cockpit_Workflow_AssignedWorkflow, "Object_Cockpit_Workflow_AssignedWorkflow;vObjectId;" + state.objData.uUseCaseId + ";uWorkflowTypeId;" + objContext.props.Data.WorkflowTypeId)["Data"],
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


export default connect(IntranetBase_Hook.MapStoreToProps(AddEditUseCase_ModuleProcessor.StoreMapList()))(AddEditUseCase);