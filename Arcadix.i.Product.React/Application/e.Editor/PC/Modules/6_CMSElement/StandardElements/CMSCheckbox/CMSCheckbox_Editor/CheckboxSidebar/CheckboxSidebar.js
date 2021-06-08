//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as CheckboxSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CheckboxSidebar/CheckboxSidebar_Hooks';
import CheckboxSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CheckboxSidebar/CheckboxSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name CheckboxSidebar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CheckboxSidebar's.
 * @returns {any} CheckboxSidebar
 */
const CheckboxSidebar = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CheckboxSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "CheckboxSidebar_ModuleProcessor": new CheckboxSidebar_ModuleProcessor()
    };

    /**
     * @name CheckboxSidebar_Hooks.Initialize
     * @summary Initialize method call in CheckboxSidebar_Hooks, that contains all the custom hooks.
     */
    CheckboxSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CheckboxSidebar_ModuleProcessor.Initialize(objContext, objContext.CheckboxSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSCheckbox/CheckboxSidebar", objContext.props);
        return (
            <div className="checkbox-sidebar-body">
                <div className="checkbox-sidebar-flex">
                    <span>
                        {objContext.CheckboxSidebar_ModuleProcessor.TextFormatter(objTextResource, "Checkbox_Count")}
                    </span>
                    <input
                        style={{ "outline": objContext.state.Errors !== null && objContext.state.Errors["ErrorWithCheckboxes"] !== null ? "1px solid red" : "" }}
                        type="text"
                        value={objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfCheckboxes"]}
                        onChange={(event) => { objContext.CheckboxSidebar_ModuleProcessor.OnNumberOfCheckboxInputChange(objContext, event.target.value); }} />
                </div>
                <div className="checkbox-sidebar-flex">
                    <span>
                        {objContext.CheckboxSidebar_ModuleProcessor.TextFormatter(objTextResource, "Column_Count")}
                    </span>
                    <input
                        style={{ "outline": objContext.state.Errors !== null && objContext.state.Errors["ErrorWithColumn"] !== null ? "1px solid red" : "" }}
                        type="text"
                        value={objContext.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfColumns"]}
                        onChange={(event) => { objContext.CheckboxSidebar_ModuleProcessor.OnColumnInputChange(objContext, event.target.value); }} />
                </div>
                <div className="btn-right checkbox-sidebar-header-footer">
                    <button className="btn" onClick={(event) => { event.preventDefault(); objContext.CheckboxSidebar_ModuleProcessor.OnClickSave(objContext); }}>
                        {objContext.CheckboxSidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(CheckboxSidebar_ModuleProcessor.StoreMapList()))(CheckboxSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CheckboxSidebar_ModuleProcessor; 