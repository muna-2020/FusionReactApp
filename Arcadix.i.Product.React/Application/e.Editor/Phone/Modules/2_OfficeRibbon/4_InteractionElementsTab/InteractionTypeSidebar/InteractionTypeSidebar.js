//React imports 
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import * as InteractionTypeSidebar_Hooks from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar_BusinessLogic/InteractionTypeSidebar_Hook";
import * as InteractionTypeSidebar_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar_BusinessLogic/InteractionTypeSidebar_MetaData";
import InteractionTypeSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar_BusinessLogic/InteractionTypeSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Configuration related imports
import InteractionConfiguration from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar_BusinessLogic/InteractionTypeSidebar_Configuration";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Common Drag - Drop controls.
import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';

/**
 * @name InteractionTypeSidebar
 * @param {object} props props from parent
 * @param {reference} ref ref to component
 * @summary InteractionTypeSidebar's.
 * @returns {component} InteractionTypeSidebar
 */
const InteractionTypeSidebar = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, InteractionTypeSidebar_Hooks.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        ["InteractionTypeSidebar_ModuleProcessor"]: new InteractionTypeSidebar_ModuleProcessor(),
        ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource
    };

    /**
     * @name InteractionTypeSidebar_Hooks.Initialize
     * @summary Initialize method call in InteractionTypeSidebar_Hooks, that contains all the custom hooks.
     */
    InteractionTypeSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.InteractionTypeSidebar_ModuleProcessor.Initialize(objContext, objContext.InteractionTypeSidebar_ModuleProcessor);

    /**
     * @name OnElementDragStart
     * @param {object} objEvent Drag start event.
     * @param {string} strInteractionType name of interation type
     */
    const OnElementDragStart = (objEvent, strInteractionType) => {
        objEvent.dataTransfer.setData("ActiveDragElement", strInteractionType);
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {JSX} JSX of the Component
     */
    const GetContent = () => {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar", objContext.props);
        let objImageMeta = InteractionTypeSidebar_MetaData.GetImageMeta();
        return (
            <div className="interation-type">
                {
                    InteractionConfiguration.map(objTempData => {
                        return (
                            <div
                                key={UniqueId.GetUniqueId()}
                                draggable
                                onDragStart={objEvt => OnElementDragStart(objEvt, objTempData["vElementTypeName"])}
                                // DragDrop_DragElementType="InteractionType"
                                // elementtypename={objTempData["vElementTypeName"]}
                                className="item border">
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta[objTempData["vElementTypeName"]],
                                    }}
                                    Meta={{
                                        Draggable: false
                                    }}
                                    ParentProps={props}
                                />
                                <span>
                                    {objContext.InteractionTypeSidebar_ModuleProcessor.TextFormatter(objTextResource, objTempData["vElementTypeName"])}
                                </span>
                            </div>
                        );
                    })
                }
            </div >
        );
    };

    return objContext.props.isLoadComplete || objContext.state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(InteractionTypeSidebar_ModuleProcessor.StoreMapList()))(InteractionTypeSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = InteractionTypeSidebar_ModuleProcessor; 