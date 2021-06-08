// React related imports.
import React, { useReducer, useRef, useEffect } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module related fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_Common/CMSPairingElement_Common';
import * as CMSPairingElement_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_Editor/CMSPairingElement_Editor_Hooks';
import CMSPairingElement_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_Editor/CMSPairingElement_Editor_ModuleProcessor";

import CMSPairingElement_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_Editor/CMSPairingElement_Editor_MetaData";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSPairingElement_Editor
 * @param {object} props props from parent.
 * @param {ref} ref ref to component.
 * @summary CMSPairingElement's editor version.
 * @returns {component} CMSPairingElement_Editor.
 */
const CMSPairingElement_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSPairingElement_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "ModuleName": "CMSPairingElement_Editor_" + props.ElementJson.iElementId,
        "IsItemDropped": useRef(false),
        "AddSubElementRef": useRef(null),
        "HolderArea": useRef(null),
        "PairingElementRef": useRef(null),
        "CMSPairingElement_Editor_ModuleProcessor": new CMSPairingElement_Editor_ModuleProcessor(),
        "Adjustment": { top: 10, left: 20 }
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSPairingElement_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSPairingElement_Editor_ModuleProcessor);

    /**
     * @name CMSPairingElement_Editor_Hook.Initialize
     * @summary Initialize method call in CMSPairingElement_Editor_Hook, that contains all the custom hooks.
     */
    CMSPairingElement_Editor_Hooks.Initialize(objContext);

    useEffect(() => {
        EditorState.SetReference("PairingElementRef", objContext.PairingElementRef);
    }, [])

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objParams) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSPairingElement_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "HandlePairingContainerClick": (objEvent) => {
                    let strElementTypeName = objContext.state.strSelectedPairingType;
                    if (strElementTypeName && !/(line|delete)/.test(strElementTypeName.toLowerCase())) {
                        let objHolderAreaBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
                        let intLeft = objEvent.clientX - objHolderAreaBoundingRects.left;
                        let intTop = objEvent.clientY - objHolderAreaBoundingRects.top;
                        let iElementId = UniqueId.GetUniqueId();
                        let objPairingElement = {
                            "iPairingElementId": iElementId,
                            "vPairingElementTypeName": strElementTypeName,
                            "cIsSetAsBackground": "N",
                            "StyleProperties": {
                                "top": intTop,
                                "left": intLeft
                            },
                            "PairingElementRef": React.createRef()
                        }
                        objContext.CMSPairingElement_Editor_ModuleProcessor.HandlePairingContainerClick(objContext, objPairingElement);
                    }
                },
                "OnInternalDrag": (objDraggedElement, intClientX, intClientY) => {
                    let objPairingElement = objContext.state.ElementJson["vElementJson"]["PairingElements"].find(x => x["iPairingElementId"].toString() === objDraggedElement.id);
                    let objHolderAreaBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
                    let intLeft = intClientX - objHolderAreaBoundingRects.left;
                    let intTop = intClientY - objHolderAreaBoundingRects.top;
                    if (objPairingElement["vPairingElementTypeName"].toLowerCase() === "circle") {
                        objPairingElement["PairingElementRef"].current.setAttribute("cx", intLeft);
                        objPairingElement["PairingElementRef"].current.setAttribute("cy", intTop);
                    }
                    else {
                        objPairingElement["PairingElementRef"].current.style.position = "absolute";
                        objPairingElement["PairingElementRef"].current.style.left = intLeft - objContext["Adjustment"].left + "px";
                        objPairingElement["PairingElementRef"].current.style.top = intTop - objContext["Adjustment"].top + "px";
                    }
                    objContext.CMSPairingElement_Editor_ModuleProcessor.SaveElementPosition(objContext, { ...objPairingElement, "StyleProperties": { ...objPairingElement["StyleProperties"], "left": intLeft, "top": intTop } });
                },
                "OnInternalDrop": (objDraggedElement, objDropArea, objSourceArea, objDragdropData, intClientX, intClientY) => {
                    let objPairingElement = objContext.state.ElementJson["vElementJson"]["PairingElements"].find(x => x["iPairingElementId"].toString() === objDraggedElement.id);
                    let objHolderAreaBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
                    let intLeft = intClientX - objHolderAreaBoundingRects.left;
                    let intTop = intClientY - objHolderAreaBoundingRects.top;
                    if (objPairingElement["vPairingElementTypeName"].toLowerCase() !== "circle") {
                        intLeft = intLeft - objContext["Adjustment"].left;
                        intTop = intTop - objContext["Adjustment"].top;
                    }
                    objPairingElement["PairingElementRef"].current.style.left = intLeft + "px";
                    objPairingElement["PairingElementRef"].current.style.top = intTop + "px";
                    objContext.IsItemDropped.current = true;
                },
                "Resize": (event) => {
                },
                "HandlePairingCircleClick": (iParingElementCircleId, ref) => {
                    if (iParingElementCircleId !== objContext.state.iSelectedPairingElement || objContext.state.strSelectedPairingType) {
                        let blnDrawPolyline = objContext.state.blnDrawPolyline;
                        if (objContext.state.strSelectedPairingType && blnDrawPolyline) {
                            //var objPairingStart = objContext.state.ElementJson.vElementJson.PairingElements.find(e => e.iPairingElementId === objContext.state.iSelectedPairingElement);
                            //var objPairingEnd = objContext.state.ElementJson.vElementJson.PairingElements.find(e => e.iPairingElementId === iParingElementCircleId)
                            objContext.dispatch({
                                "type": "SET_STATE", "payload": {
                                    "ElementJson": {
                                        ...objContext.state.ElementJson,
                                        "vElementJson": {
                                            ...objContext.state.ElementJson.vElementJson,
                                            "Values": [
                                                ...objContext.state.ElementJson.vElementJson.Values,
                                                {
                                                    iPolylineId: UniqueId.GetUniqueId(),
                                                    iStartPairingId: objContext.state.iSelectedPairingElement,
                                                    iEndPairingId: iParingElementCircleId,
                                                    //x1: objPairingStart["StyleProperties"]["left"],
                                                    //y1: objPairingStart["StyleProperties"]["top"],
                                                    //x2: objPairingEnd["StyleProperties"]["left"],
                                                    //y2: objPairingEnd["StyleProperties"]["top"]
                                                }
                                            ]
                                        }
                                    },
                                    "iSelectedPairingElement": iParingElementCircleId,
                                    "strSelectedPairingType": null,
                                    "blnDrawPolyline": false
                                }
                            });
                            return "";
                        }
                        if (objContext.state.strSelectedPairingType && !blnDrawPolyline) {
                            blnDrawPolyline = true;
                        }
                        objContext.dispatch({
                            "type": "SET_STATE", "payload": {
                                "iSelectedPairingElement": iParingElementCircleId,
                                "blnDrawPolyline": blnDrawPolyline
                            }
                        });
                        objContext.CMSPairingElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
                    }
                },
                "HandlePolylineClick": (iPolylineId) => {
                    objContext.dispatch({
                        "type": "SET_STATE", "payload": {
                            "iSelectedPairingElement": iPolylineId
                        }
                    });
                },
                "ResetPairingElementValues": () => {
                    objContext.dispatch({
                        "type": "SET_STATE", "payload": {
                            "ElementJson": {
                                ...objContext.state.ElementJson,
                                "vElementJson": {
                                    ...objContext.state.ElementJson.vElementJson,
                                    "Values": []
                                }
                            },
                            "iSelectedPairingElement": null
                        }
                    })
                },
                "AddDrag": (objValue, strDragElementType) => {
                    objValue["PairingElementRef"].current.setAttribute("DragDrop_DragElementType", strDragElementType);
                    //objValue["PairingElementRef"].current.style.border = "1px dotted red";
                },
                "RemoveDrag": (objValue, strElementType) => {
                    objValue["PairingElementRef"].current.setAttribute("DragDrop_DragElementType", undefined);
                },
                "HandleTextResizeMouseUp": (event, objValue) => {
                    if (objValue["PairingElementRef"].current.getAttribute("TextEditEnabled")) {
                        let arrPairingElements = objContext.state.ElementJson.vElementJson.PairingElements;
                        let index = arrPairingElements.findIndex(e => e.iPairingElementId === objValue["iPairingElementId"]);
                        if (index > -1) {
                            var offset = arrPairingElements[index]["PairingElementRef"].current.getBoundingClientRect();
                            arrPairingElements[index]["StyleProperties"] = { ...arrPairingElements[index]["StyleProperties"], "width": offset.width, "height": offset.height };
                        }
                        objContext.dispatch({
                            "type": "SET_STATE", "payload": {
                                "ElementJson": {
                                    ...objContext.state.ElementJson,
                                    "vElementJson": {
                                        ...objContext.state.ElementJson.vElementJson,
                                        "PairingElements": arrPairingElements
                                    }
                                }
                            }
                        })
                        objValue["PairingElementRef"].current.removeAttribute("TextEditEnabled");
                    }
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSPairingElement_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                },
                "GetMappedElementProps": (objMappedElementJson) => {
                    return {
                        ...objContext.CMSPairingElement_Editor_ModuleProcessor.GetMappedElementProps(objContext, objMappedElementJson),
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     */
    return GetContent();
};

export default CMSPairingElement_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSPairingElement_Editor_ModuleProcessor; 