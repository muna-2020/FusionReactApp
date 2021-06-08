//React imports 
import React, { useReducer } from 'react';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as PropertiesSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Editor/PropertiesSidebar/PropertiesSidebar_Hooks';
import PropertiesSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Editor/PropertiesSidebar/PropertiesSidebar_ModuleProcessor";

/**
 * @name MoveableElementHolderPropertiesSidebar
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary MoveableElementHolderPropertiesSidebar's.
 * @returns {component} MoveableElementHolderPropertiesSidebar
 */
const MoveableElementHolderPropertiesSidebar = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, PropertiesSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "PropertiesSidebar_ModuleProcessor": new PropertiesSidebar_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PropertiesSidebar_ModuleProcessor.Initialize(objContext, objContext.PropertiesSidebar_ModuleProcessor);

    /**
     * @name PropertiesSidebar_Hooks.Initialize
     * @summary Initialize method call in PropertiesSidebar_Hooks, that contains all the custom hooks.
     */
    PropertiesSidebar_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {JSX} JSX of the Component.
     */
    const GetContent = () => {
        return (
            <div className="meh-sidebar">
                <div className="meh-row-flex">
                    <span>
                        {objContext.PropertiesSidebar_ModuleProcessor.TextFormatter(props.TextResource, "Height")}:
                    </span>
                    <input value={objContext.state.ElementJson["vElementJson"]["iHeight"]} onChange={(event) => { objContext.PropertiesSidebar_ModuleProcessor.OnInputChange(objContext, event.target.value, "iHeight"); }} />
                    <span>px</span>
                </div>
                <div className="meh-row-flex">
                    <span>
                        {objContext.PropertiesSidebar_ModuleProcessor.TextFormatter(props.TextResource, "Width")}:
                    </span>
                    <input value={objContext.state.ElementJson["vElementJson"]["iWidth"]} onChange={(event) => { objContext.PropertiesSidebar_ModuleProcessor.OnInputChange(objContext, event.target.value, "iWidth"); }} />
                    <span>px</span>
                </div>
                <button className="btn" style={{ float: "right" }} onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.PropertiesSidebar_ModuleProcessor.OnSaveClick(objContext); }}>
                    {objContext.PropertiesSidebar_ModuleProcessor.TextFormatter(props.TextResource, "Save")}:
                </button>
            </div>
        );
    };

    return GetContent();
};

export default MoveableElementHolderPropertiesSidebar;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PropertiesSidebar_ModuleProcessor; 