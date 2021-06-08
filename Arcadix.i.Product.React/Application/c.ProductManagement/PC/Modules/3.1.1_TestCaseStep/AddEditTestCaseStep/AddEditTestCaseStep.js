// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddEditTestCaseStep_Hook from '@shared/Application/c.ProductManagement/Modules/3.1.1_TestCaseStep/AddEditTestCaseStep/AddEditTestCaseStep_Hook';
import AddEditTestCaseStep_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3.1.1_TestCaseStep/AddEditTestCaseStep/AddEditTestCaseStep_ModuleProcessor';

/**
  * @name AddEditTestCaseStep
  * @param {object} props props
  * @summary This component is used to Add/Edit the UseCase data.
  * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
  */
const AddEditTestCaseStep = props => {
    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dspatch
      */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditTestCaseStep_Hook.GetInitialState());

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { state, props, dispatch, "AddEditTestCaseStep_ModuleProcessor": new AddEditTestCaseStep_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.AddEditTestCaseStep_ModuleProcessor.Initialize(objContext, objContext.AddEditTestCaseStep_ModuleProcessor);

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTestCaseStep_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditTestCaseStep_Hook.Initialize(objContext);

    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep", props);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <div id="UseCase" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'TestCaseStep')}
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span> {Localization.TextFormatter(objTextResource, 'TestCaseStep')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditTestCaseStep_ModuleProcessor.ValidateFocus(objContext, 'vTestCaseStepName'); })}
                                id="vTestCaseStepName"
                                className="text-input"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditTestCaseStep_ModuleProcessor.HandleChange("vTestCaseStepName", e.target.value, objContext);
                                }}
                                value={state.objData["vTestCaseStepName"]}
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
                                onFocus={(e => { objContext.AddEditTestCaseStep_ModuleProcessor.ValidateFocus(objContext, 'vTestCaseStepDescription'); })}
                                id="vTestCaseStepDescription"
                                className="TextArea"
                                rows="4"
                                style={{ width: "100%" }}
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditTestCaseStep_ModuleProcessor.HandleChange("vTestCaseStepDescription", e.target.value, objContext);
                                }}
                                value={state.objData["vTestCaseStepDescription"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div id="ValidationError" />
        </div>
    };
    return (
        state.isLoadComplete && state.objData ? GetContent() : <React.Fragment />
    );
};


export default connect(IntranetBase_Hook.MapStoreToProps(AddEditTestCaseStep_ModuleProcessor.StoreMapList()))(AddEditTestCaseStep);