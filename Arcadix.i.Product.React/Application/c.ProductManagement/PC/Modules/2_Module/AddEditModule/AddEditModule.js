// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddEditModule_Hook from '@shared/Application/c.ProductManagement/Modules/2_Module/AddEditModule/AddEditModule_Hook';
import AddEditModule_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/2_Module/AddEditModule/AddEditModule_ModuleProcessor';


/**
 * @name AddEditModule
 * @param {object} props props
 * @summary This component is used to Add/Edit the Module data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditModule = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditModule_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditModule_ModuleProcessor": new AddEditModule_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AddEditModule_ModuleProcessor.Initialize(objContext, objContext.AddEditModule_ModuleProcessor);

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditModule_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditModule_Hook.Initialize(objContext);

    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", props);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div id="Module" style={{ display: (state.strDivToShow == "Module" ? "block" : "none") }} className="task-tabcontent">

            <div className="title">{Localization.TextFormatter(objTextResource, 'BaseData')}</div>
            <div className="col col-1">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, 'ModuleName')}</span>
                    </div>
                    <div className="row-right">
                        <input
                            autoFocus
                            id="vModuleName"
                            className="text-input"
                            value={state.objData.vModuleName}
                            onKeyDown={(e) => objContext.AddEditModule_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditModule_ModuleProcessor, objContext)}
                            onFocus={() => objContext.AddEditModule_ModuleProcessor.ValidateFocus(objContext, "vModuleName")}
                            onChange={e => {
                                objContext.AddEditModule_ModuleProcessor.HandleChange(
                                    "vModuleName",
                                    e.target.value,
                                    objContext
                                );
                            }}
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
                            id="vDescription"
                            className="textarea"
                            rows="4"
                            style={{ width: "100%" }}
                            value={state.objData.vDescription}
                            onFocus={() => objContext.AddEditModule_ModuleProcessor.ValidateFocus(objContext, "vDescription")}
                            onChange={e => {
                                objContext.AddEditModule_ModuleProcessor.HandleChange(
                                    "vDescription",
                                    e.target.value,
                                    objContext
                                );
                            }}
                        />
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

export default connect(IntranetBase_Hook.MapStoreToProps(AddEditModule_ModuleProcessor.StoreMapList()))(AddEditModule);

