// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_Common/CMSGenericDragDrop_Common';
import * as CMSGenericDragDrop_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_TestApplication/CMSGenericDragDrop_TestApplication_Hooks';
import CMSGenericDragDrop_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_TestApplication/CMSGenericDragDrop_TestApplication_ModuleProcessor";

//CMSText Test Application version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSGenericDragDrop_TestApplication
 * @param {object} props component props
 * @param {reference} ref componet ref
 * @summary CMSGenericDragDrop's test application version.
 * @returns {component} CMSGenericDragDrop_TestApplication
 */
const CMSGenericDragDrop_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSGenericDragDrop_TestApplication_ModuleProcessor();

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSGenericDragDrop_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "HolderArea": useRef(null),
        "ModuleName": "CMSGenericDragDrop_TestApplication_" + props.ElementJson.iElementId,
        "CMSGenericDragDrop_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor);

    /**
     * @name CMSGenericDragDrop_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSGenericDragDrop_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSGenericDragDrop_TestApplication_Hooks.Initialize(objContext);


    const DragImage = (objDraggedElement, intClientX, intClientY, objDragObejct) => {
        objDraggedElement.style.position = "absolute";
        let objBoundingRects = objDraggedElement.getBoundingClientRect();
        let objHolderAreaBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
        let intLeft = intClientX - objHolderAreaBoundingRects.left - (objBoundingRects.width / 2);
        let intTop = intClientY - objHolderAreaBoundingRects.top - (objBoundingRects.height / 2);
        objDraggedElement.style.left = intLeft + "px";
        objDraggedElement.style.top = intTop + "px";
        return {
            "Top": intTop,
            "Left": intLeft
        };

        // let objBoundingRects = objDragObejct["DivRef"].current.getBoundingClientRect();
        // let objHolderAreaBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
        // let intLeft = intClientX - objHolderAreaBoundingRects.left - (objBoundingRects.width / 2);
        // let intTop = intClientY - objHolderAreaBoundingRects.top - (objBoundingRects.height / 2);
        // if (objDragObejct["cIsDraggable"] === "N" || (objDragObejct["cIsDraggable"] === "Y" && objDragObejct["cIsUsed"] === "Y")) {
        //     objDragObejct["DivRef"].current.style.left = intLeft + "px";
        //     objDragObejct["DivRef"].current.style.top = intTop + "px";
        //     objDragObejct["DivRef"].current.style.position = "absolute";
        //     return {
        //         "Top": intTop,
        //         "Left": intLeft
        //     };
        // }
        // else {
        //     objDragObejct["DivRef"].current.style.left = intLeft + "px";
        //     objDragObejct["DivRef"].current.style.top = intTop + "px";
        //     objDragObejct["DivRef"].current.style.position = "absolute";
        //     return null;
        // }
    }

    const DragObject_Drag = (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init) => {
        let objDragObejct = objContext.state.ElementJson["vElementJson"]["DragObjects"].find(x => x["iElementGenericDragObjectId"].toString() === objDraggedElement.getAttribute("gdd_id"));
        if (objDragObejct["vElementTypeName"].toLowerCase() === "image") {
            if (objDragObejct["cIsUsed"] === "N") {
                objDraggedElement.style.position = "absolute";
                let objHolderArea_BoundginRect = objContext.HolderArea.current.getBoundingClientRect();
                let intLeft = intClientX - initX - objHolderArea_BoundginRect.left + objDraggedElement_BoundingClientRect_init.left;
                let intTop = intClientY - initY - objHolderArea_BoundginRect.top + objDraggedElement_BoundingClientRect_init.top;
                objDraggedElement.style.left = intLeft + "px";
                objDraggedElement.style.top = intTop + "px";
                return {
                    "Top": intTop,
                    "Left": intLeft
                };
            }
            else {
                DragImage(objDraggedElement, intClientX, intClientY, objDragObejct);
            }
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
                "OnInternalDrag": (objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init) => {
                    DragObject_Drag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init);
                },
                "OnInternalDrop": (objDraggedElement, objDropArea, objSourceArea, objDragdropData, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init, objTargetElement) => {
                    let strType = objDraggedElement.getAttribute("gdd_type");
                    if (strType === "drag_object") {
                        DragObject_Drag(objDraggedElement, intClientX, intClientY, intPreviousClientX, intPreviousClientY, initX, initY, objDraggedElement_BoundingClientRect_init);
                        let objDragObejct = objContext.state.ElementJson["vElementJson"]["DragObjects"].find(x => x["iElementGenericDragObjectId"].toString() === objDraggedElement.getAttribute("gdd_id"));
                        if (objDragObejct["cIsDraggable"] === "Y") {
                            if (objDragObejct["cIsUsed"] === "N") {
                                let objClosestDropObject = objTargetElement.closest("[gdd_type='drop_object']");
                                if (objClosestDropObject !== null) {
                                    objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.RegisterDragObjectInDropObejct(objContext, parseInt(objClosestDropObject.getAttribute("gdd_id")), objDragObejct["iElementGenericDragObjectId"]);
                                }
                            }
                            else if (objDragObejct["cIsUsed"] === "Y") {
                                if (objDraggedElement.getAttribute("gdd_dropobjectid") !== null) {
                                    let objClosestDropObject = objTargetElement.closest("[gdd_id='" + objDraggedElement.getAttribute("gdd_dropobjectid") + "']");
                                    if (objClosestDropObject === null) {
                                        objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.DeRegisterDragObjectFromDropObejct(objContext, parseInt(objDraggedElement.getAttribute("gdd_dropobjectid")), objDragObejct["iElementGenericDragObjectId"]);
                                    }
                                }
                            }
                        }
                    }
                },
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                },
                "GetMappedElementProps": (objMappedElementJson) => {
                    return {
                        ...objContext.CMSGenericDragDrop_TestApplication_ModuleProcessor.GetMappedElementProps(objContext, objMappedElementJson)
                    };
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     */
    return GetContent();
};

export default CMSGenericDragDrop_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSGenericDragDrop_TestApplication_ModuleProcessor; 