// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module related fies.
import GenericDragDrop_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_Common/CMSGenericDragDrop_Common';
import * as CMSGenericDragDrop_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_Editor/CMSGenericDragDrop_Editor_Hooks';
import CMSGenericDragDrop_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_Editor/CMSGenericDragDrop_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSGenericDragDrop_Editor
 * @param {object} props props from parent.
 * @param {ref} ref ref to component.
 * @summary CMSGenericDragDrop's editor version.
 * @returns {component} CMSGenericDragDrop_Editor.
 */
const CMSGenericDragDrop_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSGenericDragDrop_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "GDDRef": useRef(null),
        "IsErrorDrag": useRef(false),
        "ActiveObjectRef": useRef(null),
        "ElementEdit_Ref": useRef(null),
        "ModuleName": "CMSGenericDragDrop_Editor_" + props.ElementJson.iElementId,
        "HolderArea": useRef(null),
        "CMSGenericDragDrop_Editor_ModuleProcessor": new CMSGenericDragDrop_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSGenericDragDrop_Editor_ModuleProcessor);

    /**
     * @name CMSGenericDragDrop_Editor_Hook.Initialize
     * @summary Initialize method call in CMSGenericDragDrop_Editor_Hook, that contains all the custom hooks.
     */
    CMSGenericDragDrop_Editor_Hooks.Initialize(objContext);

    const DragObject_Drag = (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init) => {
        let objDragObejct = objContext.state.ElementJson["vElementJson"]["DragObjects"].find(x => x["iElementGenericDragObjectId"].toString() === objDraggedElement.getAttribute("gdd_id"));
        objDraggedElement.style.position = "absolute";
        let intLeft, intTop;
        if (objDragObejct["cIsUsed"] === "N") {
            let objHolderArea_BoundginRect = objContext.HolderArea.current.getBoundingClientRect();
            intLeft = intClientX - initX - objHolderArea_BoundginRect.left + objDraggedElement_BoundingClientRect_init.left;
            intTop = intClientY - initY - objHolderArea_BoundginRect.top + objDraggedElement_BoundingClientRect_init.top;
        }
        else {
            let objBoundingRects = objDraggedElement.getBoundingClientRect();
            let objHolderAreaBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
            intLeft = intClientX - objHolderAreaBoundingRects.left - (objBoundingRects.width / 2);
            intTop = intClientY - objHolderAreaBoundingRects.top - (objBoundingRects.height / 2);
        }
        objDraggedElement.style.left = intLeft + "px";
        objDraggedElement.style.top = intTop + "px";
        return {
            "Top": intTop,
            "Left": intLeft
        };
    };

    const DropObject_Drag = (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init) => {
        let objDropObejct = objContext.state.ElementJson["vElementJson"]["DropObjects"].find(x => x["iElementGenericDropObjectId"].toString() === objDraggedElement.getAttribute("gdd_id"));
        let objHolderArea_BoundginRect = objContext.HolderArea.current.getBoundingClientRect();
        let intLeft = intClientX - initX - objHolderArea_BoundginRect.left + objDraggedElement_BoundingClientRect_init.left;
        let intTop = intClientY - initY - objHolderArea_BoundginRect.top + objDraggedElement_BoundingClientRect_init.top;
        objDropObejct["DivRef"].current.style.left = intLeft + "px";
        objDropObejct["DivRef"].current.style.top = intTop + "px";
        objDropObejct["DivRef"].current.style.position = "absolute";
        return {
            "Top": intTop,
            "Left": intLeft
        };
    };

    const DragObject_ErrorOnDrag = (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init) => {
        let objDragObejct = objContext.state.ElementJson["vElementJson"]["DragObjects"].find(x => x["iElementGenericDragObjectId"].toString() === objDraggedElement.getAttribute("gdd_id"));
        objDraggedElement.style.position = "absolute";
        let intLeft, intTop;
        let objHolderArea_BoundginRect = objContext.HolderArea.current.getBoundingClientRect();
        let objBoundingRects = objDraggedElement.getBoundingClientRect();
        if (objDragObejct["cIsUsed"] === "N") {
            intLeft = intPreviousClientX - initX - objHolderArea_BoundginRect.left + objDraggedElement_BoundingClientRect_init.left;
            intTop = intPreviousClientY - initY - objHolderArea_BoundginRect.top + objDraggedElement_BoundingClientRect_init.top;
        }
        else {
            intLeft = intPreviousClientX - objHolderArea_BoundginRect.left - (objBoundingRects.width / 2);
            intTop = intPreviousClientY - objHolderArea_BoundginRect.top - (objBoundingRects.height / 2);
        }
        if (objBoundingRects.left < objHolderArea_BoundginRect.left) {
            intLeft = 0;
        }
        else if (objBoundingRects.right > objHolderArea_BoundginRect.right) {
            intLeft = objHolderArea_BoundginRect.width - objBoundingRects.width;
        }
        if (objBoundingRects.top < objHolderArea_BoundginRect.top) {
            intTop = 0;
        }
        else if (objBoundingRects.bottom > objHolderArea_BoundginRect.bottom) {
            intTop = objHolderArea_BoundginRect.height - objBoundingRects.height;
        }
        objDraggedElement.style.left = intLeft + "px";
        objDraggedElement.style.top = intTop + "px";
        console.log("top", intTop);
        console.log("Left", intLeft);
        return {
            "Top": intTop,
            "Left": intLeft
        };
    };

    const DropObject_ErrorOnDrag = (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init) => {
        let objDropObejct = objContext.state.ElementJson["vElementJson"]["DropObjects"].find(x => x["iElementGenericDropObjectId"].toString() === objDraggedElement.getAttribute("gdd_id"));
        let objHolderArea_BoundginRect = objContext.HolderArea.current.getBoundingClientRect();
        let objBoundingRects = objDraggedElement.getBoundingClientRect();
        let intLeft = intPreviousClientX - initX - objHolderArea_BoundginRect.left + objDraggedElement_BoundingClientRect_init.left;
        let intTop = intPreviousClientY - initY - objHolderArea_BoundginRect.top + objDraggedElement_BoundingClientRect_init.top;
        if (objBoundingRects.left < objHolderArea_BoundginRect.left) {
            intLeft = 0;
        }
        else if (objBoundingRects.right > objHolderArea_BoundginRect.right) {
            intLeft = objHolderArea_BoundginRect.width - objBoundingRects.width;
        }
        if (objBoundingRects.top < objHolderArea_BoundginRect.top) {
            intTop = 0;
        }
        else if (objBoundingRects.bottom > objHolderArea_BoundginRect.bottom) {
            intTop = objHolderArea_BoundginRect.height - objBoundingRects.height;
        }
        objDropObejct["DivRef"].current.style.position = "absolute";
        objDropObejct["DivRef"].current.style.left = intLeft + "px";
        objDropObejct["DivRef"].current.style.top = intTop + "px";
        return {
            "Top": intTop,
            "Left": intLeft
        };
    };

    const OnDrop = (objDraggedElement, objTargetElement, objCoordinates) => {
        if (objDraggedElement.getAttribute("gdd_type").toLowerCase() === "drag_object") {
            let objDragObejct = objContext.state.ElementJson["vElementJson"]["DragObjects"].find(x => x["iElementGenericDragObjectId"].toString() === objDraggedElement.getAttribute("gdd_id"));
            if (objDragObejct["cIsDraggable"] === "Y") {
                if (objDragObejct["cIsUsed"] === "N") {
                    let objClosestDropObject = objTargetElement.closest("[gdd_type='drop_object']");
                    if (objClosestDropObject !== null) {
                        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.RegisterDragObjectInDropObejct(objContext, parseInt(objClosestDropObject.getAttribute("gdd_id")), objDragObejct["iElementGenericDragObjectId"]);
                    }
                }
                else if (objDragObejct["cIsUsed"] === "Y") {
                    if (objDraggedElement.getAttribute("gdd_dropobjectid") !== null) {
                        let objClosestDropObject = objTargetElement.closest("[gdd_id='" + objDraggedElement.getAttribute("gdd_dropobjectid") + "']");
                        if (objClosestDropObject === null) {
                            objContext.CMSGenericDragDrop_Editor_ModuleProcessor.DeRegisterDragObjectFromDropObejct(objContext, parseInt(objDraggedElement.getAttribute("gdd_dropobjectid")), objDragObejct["iElementGenericDragObjectId"]);
                        }
                        else {
                            objDraggedElement.setAttribute("style", "opacity: 0.8");
                        }
                    }
                    else {
                        if (objCoordinates !== null) {
                            objContext.CMSGenericDragDrop_Editor_ModuleProcessor.SaveElementPosition(objContext, objCoordinates["Left"], objCoordinates["Top"], objDragObejct["iElementGenericDragObjectId"], "Drag");
                        }
                    }
                }
            }
            else {
                if (objCoordinates !== null) {
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.SaveElementPosition(objContext, objCoordinates["Left"], objCoordinates["Top"], objDragObejct["iElementGenericDragObjectId"], "Drag");
                }
            }
        }
        else {
            objContext.CMSGenericDragDrop_Editor_ModuleProcessor.SaveElementPosition(objContext, objCoordinates["Left"], objCoordinates["Top"], parseInt(objDraggedElement.getAttribute("gdd_id")), "Drop");
        }
    };

    const RemoveDrag = (objValue, strElementType) => {
        objContext.ElementEdit_Ref.current = {
            "Value": objValue,
            "ElementType": strElementType,
            "DragDrop_DragElementType": objValue["DivRef"].current.getAttribute("DragDrop_DragElementType")
        };
        objValue["DivRef"].current.setAttribute("DragDrop_DragElementType", undefined);
        if (strElementType !== "image") {
            objValue["DivRef"].current.style.resize = "both";
        }
    };

    const AddDrag = () => {
        if (objContext.ElementEdit_Ref.current !== null) {
            objContext.ElementEdit_Ref.current["Value"]["DivRef"].current.setAttribute("DragDrop_DragElementType", objContext.ElementEdit_Ref.current["DragDrop_DragElementType"]);
            if (objContext.ElementEdit_Ref.current["ElementType"] !== "image") {
                objContext.ElementEdit_Ref.current["Value"]["DivRef"].current.style.resize = "none";
            }
            objContext.ElementEdit_Ref.current = null;
            objContext.CMSGenericDragDrop_Editor_ModuleProcessor.Resize(objContext);
        }
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
                    EditorState.SetProperty("ActiveGenericDragDrop", objContext.GDDRef);
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objValue);
                },
                "ActivateObject": (event, strAreaType, objDiv) => {
                    EditorState.SetProperty("ActiveGenericDragDrop", objContext.GDDRef);
                    if (objContext.ElementEdit_Ref.current !== null) {
                        AddDrag();
                    }
                    else {
                        let objTargetElement = document.elementFromPoint(event.clientX, event.clientY);
                        objTargetElement = objTargetElement.closest("[gdd_type='drag_object']") || objTargetElement.closest("[gdd_type='drop_object']");
                        if (objTargetElement && objTargetElement !== null) {
                            objContext.ActiveObjectRef.current = {
                                "id": parseInt(objTargetElement.getAttribute("gdd_id")),
                                "type": objTargetElement.getAttribute("gdd_type")
                            };
                        }
                        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.Resize(objContext);
                    }
                },
                "OnInternalDrag": (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init) => {
                    objContext.ActiveObjectRef.current = null;
                    objContext.IsErrorDrag.current = false;
                    EditorState.SetProperty("ActiveGenericDragDrop", objContext.GDDRef);
                    let strType = objDraggedElement.getAttribute("gdd_type");
                    if (strType === "drag_object") {
                        DragObject_Drag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init);
                    }
                    else {
                        DropObject_Drag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init);
                    }
                },
                "ErrorOnDrag": (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init) => {
                    objContext.ActiveObjectRef.current = null;
                    objContext.IsErrorDrag.current = true;
                    EditorState.SetProperty("ActiveGenericDragDrop", objContext.GDDRef);
                    let strType = objDraggedElement.getAttribute("gdd_type");
                    if (strType === "drag_object") {
                        DragObject_ErrorOnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init);
                    }
                    else {
                        DropObject_ErrorOnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init);
                    }
                },
                "OnInternalDrop": (objDraggedElement, objDropArea, objSourceArea, objDragdropData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
                    objContext.ActiveObjectRef.current = null;
                    EditorState.SetProperty("ActiveGenericDragDrop", objContext.GDDRef);
                    let strType = objDraggedElement.getAttribute("gdd_type");
                    let objCoordinates;
                    if (objContext.IsErrorDrag.current) {
                        if (strType === "drag_object") {
                            objCoordinates = DragObject_ErrorOnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                        }
                        else {
                            objCoordinates = DropObject_ErrorOnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                        }
                    }
                    else {
                        if (strType === "drag_object") {
                            objCoordinates = DragObject_Drag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                        }
                        else {
                            objCoordinates = DropObject_Drag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                        }
                    }
                    OnDrop(objDraggedElement, objTargetElement, objCoordinates);
                },
                "ErrorOnDrop": (objDraggedElement, objDropArea, objSource, objData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
                    objContext.ActiveObjectRef.current = null;
                    EditorState.SetProperty("ActiveGenericDragDrop", objContext.GDDRef);
                    let strType = objDraggedElement.getAttribute("gdd_type");
                    let objCoordinates;
                    if (strType === "drag_object") {
                        objCoordinates = DragObject_ErrorOnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                    }
                    else {
                        objCoordinates = DropObject_ErrorOnDrag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initClientX, initClientY, objDraggedElement_BoundingClientRect_init);
                    }
                    OnDrop(objDraggedElement, objTargetElement, objCoordinates);
                },
                "OnDrop": (strElementType) => {
                    if (strElementType === "IMAGE") {
                        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, strElementTypeName: "Image" });
                    }
                    else if (strElementType === "TEXT") {
                        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.AddDragObject({ objContext, strElementTypeName: "Text" });
                    }
                },
                "RemoveDrag": (objValue, strElementType) => {
                    RemoveDrag(objValue, strElementType);
                },
                "AddDrag": () => {
                    AddDrag();
                },
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSGenericDragDrop_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                },
                "GetMappedElementProps": (objMappedElementJson) => {
                    return {
                        ...objContext.CMSGenericDragDrop_Editor_ModuleProcessor.GetMappedElementProps(objContext, objMappedElementJson),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <GenericDragDrop_Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSGenericDragDrop_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSGenericDragDrop_Editor_ModuleProcessor; 