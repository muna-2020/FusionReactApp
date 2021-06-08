// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module related fies.
import MoveableElementHolder_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Common/CMSMoveableElementHolder_Common';
import * as CMSMoveableElementHolder_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Editor/CMSMoveableElementHolder_Editor_Hooks';
import CMSMoveableElementHolder_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Editor/CMSMoveableElementHolder_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSMoveableElementHolder_Editor
 * @param {object} props props from parent.
 * @param {ref} ref ref to component.
 * @summary CMSMoveableElementHolder's editor version.
 * @returns {component} CMSMoveableElementHolder_Editor.
 */
const CMSMoveableElementHolder_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSMoveableElementHolder_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "ModuleName": "CMSMoveableElementHolder_Editor_" + props.ElementJson.iElementId,
        "IsItemDropped": useRef(false),
        "AddSubElementRef": useRef(null),
        "HolderArea": useRef(null),
        "CMSMoveableElementHolder_Editor_ModuleProcessor": new CMSMoveableElementHolder_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSMoveableElementHolder_Editor_ModuleProcessor);

    /**
     * @name CMSMoveableElementHolder_Editor_Hook.Initialize
     * @summary Initialize method call in CMSMoveableElementHolder_Editor_Hook, that contains all the custom hooks.
     */
    CMSMoveableElementHolder_Editor_Hooks.Initialize(objContext);

    const OnDrag = (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init) => {
        let objMappedElement = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"].toString() === objDraggedElement.parentElement.getAttribute("mappedelementid"));
        let objHolderAreaBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
        let objBoundingRects = objMappedElement["DivRef"].current.getBoundingClientRect();
        let intLeft, intTop;
        intLeft = intClientX - initClientX - objHolderAreaBoundingRects.left + objDraggedElement_BoundingClientRect_init.left;
        intTop = intClientY - initClientY - objHolderAreaBoundingRects.top + objDraggedElement_BoundingClientRect_init.top;
        if (objBoundingRects.left <= objHolderAreaBoundingRects.left) {
            intLeft = 2;
        }
        else if (objBoundingRects.right >= objHolderAreaBoundingRects.right) {
            intLeft = objHolderAreaBoundingRects.width - objBoundingRects.width;
        }
        if (objBoundingRects.top <= objHolderAreaBoundingRects.top - 20) {
            intTop = 0;
        }
        else if (objBoundingRects.bottom >= objHolderAreaBoundingRects.bottom) {
            intTop = objHolderAreaBoundingRects.height - objBoundingRects.height;
        }
        objMappedElement["DivRef"].current.style.position = "absolute";
        objMappedElement["DivRef"].current.style.left = intLeft + "px";
        objMappedElement["DivRef"].current.style.top = intTop + "px";
        return {
            "Top": intTop,
            "Left": intLeft
        };
    };

    const OnDrop = (objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
        let objCoordinates = OnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
        let objMappedElement = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"].toString() === objDraggedElement.parentElement.getAttribute("mappedelementid"));
        let intLeft = objCoordinates["Left"];
        let intTop = objCoordinates["Top"];
        objMappedElement["DivRef"].current.style.left = intLeft + "px";
        objMappedElement["DivRef"].current.style.top = intTop + "px";
        objContext.IsItemDropped.current = true;
        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.SaveElementPosition(objContext, intLeft, intTop);
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objValue) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objValue);
                },
                "OnDropFromSidebar": (objEvent) => {
                    let objHolderAreaBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
                    let intLeft = objEvent.clientX - objHolderAreaBoundingRects.left;
                    let intTop = objEvent.clientY - objHolderAreaBoundingRects.top;
                    if (objEvent.dataTransfer.getData("ActiveDragElement")) {
                        let strElementTypeName = objEvent.dataTransfer.getData("ActiveDragElement");
                        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.OnDropFromSidebar(objContext, strElementTypeName, intLeft, intTop);
                    }
                    else {
                        let objSubElementJson = EditorState.GetProperty("ActiveDragSubElement");
                        EditorState.RemoveProperty("ActiveDragSubElement")
                        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.AddSubElement(objContext, objSubElementJson, intLeft, intTop);
                    }
                },
                "OnInternalDrag": (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init) => {
                    OnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                },
                "OnErrorDrag": (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init) => {
                    OnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                },
                "OnInternalDrop": (objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
                    OnDrop(objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement);
                },
                "OnErrorDrop": (objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
                    OnDrop(objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement);
                },
                "Resize": (event, objMappedElementJson, strAreaType) => {
                    if (strAreaType) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (strAreaType === "MappedElement") {
                            if (!objContext.IsItemDropped.current) {
                                let element = objMappedElementJson["DivRef"].current.querySelector("[type='meh-element']");
                                let intHeight = element.getBoundingClientRect().height;
                                let intWidth = element.getBoundingClientRect().width;
                                objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.ResizeElement(objContext, objMappedElementJson, intHeight, intWidth);
                            }
                        }
                        else {
                            let intHeight = objContext.HolderArea.current.getBoundingClientRect().height;
                            let intWidth = objContext.HolderArea.current.getBoundingClientRect().width;
                            objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.ResizeHolder(objContext, intHeight, intWidth);
                        }
                    }
                },
                "ActivateElement": (event, intElementId) => {
                    // event.preventDefault();
                    // event.stopPropagation();
                    if (intElementId === null) {
                        if (objContext.IsItemDropped.current) {
                            objContext.IsItemDropped.current = false;
                        }
                        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.ActivateElement(objContext, intElementId);
                    }
                    else {
                        objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.ActivateElement(objContext, intElementId);
                    }
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                },
                "GetMappedElementProps": (objMappedElementJson) => {
                    return {
                        ...objContext.CMSMoveableElementHolder_Editor_ModuleProcessor.GetMappedElementProps(objContext, objMappedElementJson),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <MoveableElementHolder_Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSMoveableElementHolder_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSMoveableElementHolder_Editor_ModuleProcessor; 