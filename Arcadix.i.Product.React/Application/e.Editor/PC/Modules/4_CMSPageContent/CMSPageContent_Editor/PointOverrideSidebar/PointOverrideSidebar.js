//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as PointOverrideSidebar_Hooks from '@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/PointOverrideSidebar_BusinessLogic/PointOverrideSidebar_Hooks';
import PointOverrideSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/PointOverrideSidebar_BusinessLogic/PointOverrideSidebar_ModuleProcessor";

//Text Resource imports.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name PointOverrideSidebar
 * @param {object} props props from parent
 * @summary PointOverrideSidebar.
 * @returns {Component} PointOverrideSidebar
 */
const PointOverrideSidebar = (props) => {
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, PointOverrideSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, ["PointOverrideSidebar_ModuleProcessor"]: new PointOverrideSidebar_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @name PointOverrideSidebar_Hooks.Initialize
     * @summary Initialize method call in PointOverrideSidebar_Hooks, that contains all the custom hooks.
     */
    PointOverrideSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    Base_Hook.InitializeCss(props, objContext.PointOverrideSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/PointOverrideSidebar", objContext.props);
        return (
            <div className="pointoverride-sidebar-body">
                {
                    objContext.state.Point.isSinglePoint ? // if one common point for Element.
                        <React.Fragment>
                            <div className="pointoverride-sidebar-flex">
                                <span>
                                    {objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Correct_Answer")}
                                </span>
                                <input type="text"
                                    onChange={objEvent => objContext.PointOverrideSidebar_ModuleProcessor.OnInputChange_Single(objContext, "CA", objEvent.target.value)}
                                    value={objContext.state.Point.CA} />
                            </div>
                            <div className="pointoverride-sidebar-flex">
                                <span>
                                    {objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Wrong_Answer")}
                                </span>
                                <input type="text"
                                    onChange={objEvent => objContext.PointOverrideSidebar_ModuleProcessor.OnInputChange_Single(objContext, "WA", objEvent.target.value)}
                                    value={objContext.state.Point.WA} />
                            </div>
                            <div className="pointoverride-sidebar-flex">
                                <span>
                                    {objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Not_Answer")}
                                </span>
                                <input type="text"
                                    onChange={objEvent => objContext.PointOverrideSidebar_ModuleProcessor.OnInputChange_Single(objContext, "NA", objEvent.target.value)}
                                    value={objContext.state.Point.NA} />
                            </div>
                        </React.Fragment> :
                        <React.Fragment>
                            <div className="pointoverride-sidebar-flex">
                                <span>{objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Order")}</span>
                                <span>{objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Correct_Answer")}</span>
                                <span>{objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Wrong_Answer")}</span>
                                {
                                    !objContext.state.Point.hasOwnProperty("NA") &&
                                    <span>{objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Not_Answer")}</span>
                                }
                            </div>
                            {
                                objContext.state.Point.Points.map(objPoint => {
                                    return (
                                        <div className="pointoverride-sidebar-flex" key={objPoint.ValueId}>
                                            <span>{objPoint.iDisplayOrder}</span>
                                            <input type="text" key={objPoint.ValueId}
                                                onChange={objEvent => objContext.PointOverrideSidebar_ModuleProcessor.OnInputChange(objContext, objPoint.ValueId, "CA", objEvent.target.value)}
                                                value={objPoint.CA} />
                                            <input type="text"
                                                onChange={objEvent => objContext.PointOverrideSidebar_ModuleProcessor.OnInputChange(objContext, objPoint.ValueId, "WA", objEvent.target.value)}
                                                value={objPoint.WA} />
                                            {
                                                !objContext.state.Point.hasOwnProperty("NA") &&
                                                <input type="text"
                                                    onChange={objEvent => objContext.PointOverrideSidebar_ModuleProcessor.OnInputChange(objContext, objPoint.ValueId, "NA", objEvent.target.value)}
                                                    value={objPoint.NA} />
                                            }
                                        </div>
                                    );
                                })
                            }
                            {
                                !objContext.state.Point.isSinglePoint && objContext.state.Point.hasOwnProperty("NA") ?
                                    <div className="pointoverride-sidebar-flex">
                                        <span>
                                            {objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "Not_Answer")}
                                        </span>
                                        <input type="text"
                                            onChange={objEvent =>
                                                objContext.PointOverrideSidebar_ModuleProcessor.OnInputChange(objContext, null, "NA", objEvent.target.value)}
                                            value={objContext.state.Point.NA} />
                                    </div> : ""
                            }
                        </React.Fragment>
                }
                <div className="btn-right pointoverride-sidebar-header-footer">
                    <button className="btn" onClick={(event) => { event.preventDefault(); objContext.PointOverrideSidebar_ModuleProcessor.OnClickSave(objContext); }}>
                        {objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                    <button className="btn" onClick={(event) => { event.preventDefault(); objContext.PointOverrideSidebar_ModuleProcessor.OnClickRemove(objContext); }}>
                        {objContext.PointOverrideSidebar_ModuleProcessor.TextFormatter(objTextResource, "RemoveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    return state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(PointOverrideSidebar_ModuleProcessor.StoreMapList()))(PointOverrideSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PointOverrideSidebar_ModuleProcessor; 