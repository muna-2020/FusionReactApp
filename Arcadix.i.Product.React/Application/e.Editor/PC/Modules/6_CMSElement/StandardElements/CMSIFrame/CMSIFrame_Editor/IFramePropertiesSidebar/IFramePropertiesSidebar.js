//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as IFramePropertiesSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Editor/IFramePropertiesSidebar/IFramePropertiesSidebar_Hooks';
import IFramePropertiesSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Editor/IFramePropertiesSidebar/IFramePropertiesSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Application State classes/methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name IFramePropertiesSidebar
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary IFramePropertiesSidebar's.
 * @returns {component} IFramePropertiesSidebar
 */
const IFramePropertiesSidebar = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, IFramePropertiesSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "IFramePropertiesSidebar_ModuleProcessor": new IFramePropertiesSidebar_ModuleProcessor()
    };

    /**
     * @name IFramePropertiesSidebar_Hooks.Initialize
     * @summary Initialize method call in IFramePropertiesSidebar_Hooks, that contains all the custom hooks.
     */
    IFramePropertiesSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.IFramePropertiesSidebar_ModuleProcessor.Initialize(objContext, objContext.IFramePropertiesSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {JSX} JSX of the Component.
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSIFrame/IFramePropertiesSidebar", objContext.props);
        return (
            <div className="iframe-sidebar">
                <div className="iframe-row-flex">
                    <span>
                        {objContext.IFramePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "URL")}:
                    </span>
                    <input type="text" value={objContext.state.ElementJson["vElementJson"]["vURL"]} onChange={(event) => { objContext.IFramePropertiesSidebar_ModuleProcessor.OnUrlChange(objContext, event.target.value); }} />
                </div>
                <div className="iframe-row-flex">
                    <span>
                        {objContext.IFramePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Width")}:
                    </span>
                    <input type="text" value={objContext.state.ElementJson["vElementJson"]["iWidth"]} onChange={(event) => { objContext.IFramePropertiesSidebar_ModuleProcessor.OnInputChange(objContext, event.target.value, "iWidth"); }} />
                </div>
                <div className="iframe-row-flex">
                    <span>
                        {objContext.IFramePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Height")}:
                    </span>
                    <input type="text" value={objContext.state.ElementJson["vElementJson"]["iHeight"]} onChange={(event) => { objContext.IFramePropertiesSidebar_ModuleProcessor.OnInputChange(objContext, event.target.value, "iHeight"); }} />
                </div>
                <div className="iframe-row-flex">
                    <span>
                        {objContext.IFramePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Scroll")}:
                    </span>
                    <input type="checkbox" checked={objContext.state.ElementJson["vElementJson"]["cIsScroll"] === "Y"} onChange={(event) => { objContext.IFramePropertiesSidebar_ModuleProcessor.OnScrollCheckChange(objContext); }} />
                </div>
                <button className="btn" style={{ float: "right" }} onClick={(event) => { event.preventDefault(); event.stopPropagation(); objContext.IFramePropertiesSidebar_ModuleProcessor.OnSaveClick(objContext); }}>
                    {objContext.IFramePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Save")}
                </button>
            </div>
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(IFramePropertiesSidebar_ModuleProcessor.StoreMapList()))(IFramePropertiesSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = IFramePropertiesSidebar_ModuleProcessor; 