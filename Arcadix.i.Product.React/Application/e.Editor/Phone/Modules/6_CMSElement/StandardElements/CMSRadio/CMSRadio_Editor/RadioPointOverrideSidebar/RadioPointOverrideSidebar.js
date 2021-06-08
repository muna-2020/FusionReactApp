//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as RadioPointOverrideSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/RadioPointOverrideSidebar/RadioPointOverrideSidebar_Hooks';
import RadioPointOverrideSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/RadioPointOverrideSidebar/RadioPointOverrideSidebar_ModuleProcessor";

//Text Resource imports.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name RadioPointOverrideSidebar
 * @param {object} props props from parent
 * @summary CMSRadioPointOverrideSidebar.
 * @returns {Component} CMSRadioPointOverrideSidebar
 */
const RadioPointOverrideSidebar = (props) => {
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, RadioPointOverrideSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, ["RadioPointOverrideSidebar_ModuleProcessor"]: new RadioPointOverrideSidebar_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @name RadioPointOverrideSidebar_Hooks.Initialize
     * @summary Initialize method call in RadioPointOverrideSidebar_Hooks, that contains all the custom hooks.
     */
    RadioPointOverrideSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    Base_Hook.InitializeCss(props, objContext.RadioPointOverrideSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSRadio/RadioPointOverrideSidebar", objContext.props);
        return (
            <div className="pointoverride-sidebar-body">
                {
                    <React.Fragment>
                        <div className="pointoverride-sidebar-flex">
                            <span>{objContext.RadioPointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Order")}</span>
                            <span>{objContext.RadioPointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Wrong_Answer")}</span>
                        </div>
                        {
                            objContext.state.Point.Points.map(objPoint => {
                                return (
                                    <div className="pointoverride-sidebar-flex" key={objPoint.ValueId}>
                                        <span>{objPoint.iDisplayOrder}</span>
                                        <input
                                            type="text"
                                            onChange={objEvent => objContext.RadioPointOverrideSidebar_ModuleProcessor.OnWAChange(objContext, objPoint.ValueId, objEvent.target.value)}
                                            value={objPoint.WA} />
                                    </div>
                                );
                            })
                        }
                        {
                            <React.Fragment>
                                <div className="pointoverride-sidebar-flex">
                                    <span>
                                        {objContext.RadioPointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Correct_Answer")}
                                    </span>
                                    <input type="text"
                                        onChange={objEvent => objContext.RadioPointOverrideSidebar_ModuleProcessor.OnCANAPointChange(objContext, objEvent.target.value, "CA")}
                                        value={objContext.state.Point.CA} />
                                </div>
                                <div className="pointoverride-sidebar-flex">
                                    <span>
                                        {objContext.RadioPointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Not_Answer")}
                                    </span>
                                    <input type="text"
                                        onChange={objEvent => objContext.RadioPointOverrideSidebar_ModuleProcessor.OnCANAPointChange(objContext, objEvent.target.value, "NA")}
                                        value={objContext.state.Point.NA} />
                                </div>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
                <div className="btn-right pointoverride-sidebar-header-footer">
                    <button className="btn" onClick={(event) => { event.preventDefault(); objContext.RadioPointOverrideSidebar_ModuleProcessor.OnClickSave(objContext); }}>
                        {objContext.RadioPointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                    <button className="btn" onClick={(event) => { event.preventDefault(); objContext.RadioPointOverrideSidebar_ModuleProcessor.OnClickRemove(objContext); }}>
                        {objContext.RadioPointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "RemoveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    return state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(RadioPointOverrideSidebar_ModuleProcessor.StoreMapList()))(RadioPointOverrideSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = RadioPointOverrideSidebar_ModuleProcessor; 