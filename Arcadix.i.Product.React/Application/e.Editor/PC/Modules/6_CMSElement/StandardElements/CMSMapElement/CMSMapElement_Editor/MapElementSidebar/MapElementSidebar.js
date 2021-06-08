//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as MapElementSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_Editor/MapElementSidebar/MapElementSidebar_Hooks';
import MapElementSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_Editor/MapElementSidebar/MapElementSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name MapElementSidebar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary MapElementSidebar's.
 * @returns {any} MapElementSidebar
 */
const MapElementSidebar = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, MapElementSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "MapElementSidebar_ModuleProcessor": new MapElementSidebar_ModuleProcessor()
    };

    /**
     * @name MapElementSidebar_Hooks.Initialize
     * @summary Initialize method call in MapElementSidebar_Hooks, that contains all the custom hooks.
     */
    MapElementSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.MapElementSidebar_ModuleProcessor.Initialize(objContext, objContext.MapElementSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSMapElement/MapElementSidebar", objContext.props);
        let objMapValue = objContext.state.ElementJson["vElementJson"]["Values"].find(y => y["UseAs"].toLowerCase() === "map");
        let objPenValue = objContext.state.ElementJson["vElementJson"]["Values"].find(y => y["UseAs"].toLowerCase() === "pen");
        return (
            <div className="MapElement-sidebar-body">
                <div className="MapElement-sidebar-flex">
                    <span>
                        {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "TaskType")}
                    </span>
                    <input
                        type="checkbox"
                        checked={objContext.state.ElementJson["vElementJson"]["cIsTaskType"] === "Y" ? true : false}
                        onChange={(event) => { objContext.MapElementSidebar_ModuleProcessor.OnTaskTypeChange(objContext); }}
                    />
                </div>
                <div className="MapElement-sidebar-flex">
                    <span>
                        {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "Tolerance")}
                    </span>
                    <input
                        type="text"
                        value={objContext.state.ElementJson["vElementJson"]["Tolerance"]}
                        onChange={(event) => { objContext.MapElementSidebar_ModuleProcessor.OnInputChange(objContext, event.target.value, "Tolerance"); }}
                    />
                </div>
                <div className="MapElement-sidebar-flex">
                    <span>
                        {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "PointsInterval")}
                    </span>
                    <input
                        type="text"
                        value={objContext.state.ElementJson["vElementJson"]["PointsInterval"]}
                        onChange={(event) => { objContext.MapElementSidebar_ModuleProcessor.OnInputChange(objContext, event.target.value, "PointsInterval"); }}
                    />
                </div>
                <div className="MapElement-sidebar-flex">
                    <span>
                        {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "Map")}
                    </span>
                    {
                        !objMapValue ?
                            <span className="btn" onClick={(event) => { objContext.MapElementSidebar_ModuleProcessor.OnImageSelection(objContext, "map"); }}>
                                {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "Select_Image")}
                            </span>
                            :
                            <span className="btn" onClick={(event) => { objContext.MapElementSidebar_ModuleProcessor.OnImageRemoval(objContext, objMapValue); }}>
                                {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "Remove_Image")}
                            </span>
                    }
                </div>
                <div className="MapElement-sidebar-flex">
                    <span>
                        {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "Marker")}
                    </span>
                    {
                        !objPenValue ?
                            <span className="btn" onClick={(event) => { objContext.MapElementSidebar_ModuleProcessor.OnImageSelection(objContext, "pen"); }}>
                                {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "Select_Image")}
                            </span>
                            :
                            <span className="btn" onClick={(event) => { objContext.MapElementSidebar_ModuleProcessor.OnImageRemoval(objContext, objPenValue); }}>
                                {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "Remove_Image")}
                            </span>
                    }
                </div>
                <div className="btn-right MapElement-sidebar-header-footer">
                    <button className="btn" onClick={(event) => { event.preventDefault(); objContext.MapElementSidebar_ModuleProcessor.OnClickSave(objContext); }}>
                        {objContext.MapElementSidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(MapElementSidebar_ModuleProcessor.StoreMapList()))(MapElementSidebar);
