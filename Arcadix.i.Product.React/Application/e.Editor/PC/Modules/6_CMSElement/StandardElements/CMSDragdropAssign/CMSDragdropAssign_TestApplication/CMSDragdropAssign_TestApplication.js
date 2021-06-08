// React related imports.
import React, { useReducer, useEffect, useRef } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_Common/CMSDragdropAssign_Common';
import * as CMSDragdropAssign_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_TestApplication/CMSDragdropAssign_TestApplication_Hooks';
import CMSDragdropAssign_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_TestApplication/CMSDragdropAssign_TestApplication_ModuleProcessor';

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSDragdropAssign_TestApplication
 * @param {object} props component props
 * @param {any} ref component ref
 * @summary CMSDragdropAssign's test application version.
 * @returns {any} CMSDragdropAssign_TestApplication
 */
const CMSDragdropAssign_TestApplication = (props, ref) => {

    let objModuleProcessor = new CMSDragdropAssign_TestApplication_ModuleProcessor();
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSDragdropAssign_TestApplication_Hooks.GetInitialState(props, objModuleProcessor));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ComponentRef": useRef(null),
        "ModuleName": "CMSDragDrop_TestApplication_" + props.ElementJson.iElementId,
        "intRowHeight": useRef(null),
        "IsItemDropped": useRef(false),
        "CMSDragdropAssign_TestApplication_ModuleProcessor": objModuleProcessor
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSDragdropAssign_TestApplication_ModuleProcessor);

    /**
     * @name CMSDragdropAssign_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSDragdropAssign_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSDragdropAssign_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name useEffect
     * @summary Preserves the height of the component.
     */
    useEffect(() => {
        if (state.isLoadComplete) {
            let objValue = objContext.state.ElementJson["vElementJson"]["Values"][0];
            let strDivId = "DragDropAssign_" + objValue["iElementDragDropAssignValueId"];
            let objDragDropAssignElement = objContext.ComponentRef.current;
            let objRowElement = objDragDropAssignElement.querySelector('[id="DragDropAssignRow_preview"]');
            let objDiv = objDragDropAssignElement.querySelector('[id="' + strDivId + '"]');
            let intDivHeight = parseInt(getComputedStyle(objDiv, '').height) + 4;
            let intHeight = intDivHeight * objContext.state.ElementJson["vElementJson"]["Values"].length;
            objContext.intRowHeight.current = intHeight;
            objRowElement.setAttribute("style", "height:" + intHeight + "px");
        }
    }, [state.isLoadComplete])

    /**
     * @name useEffect
     * @summary resets the height of the component to preserved height on drop.
     */
    useEffect(() => {
        if (objContext.IsItemDropped.current) {
            let objDragDropAssignElement = objContext.ComponentRef.current;
            let objRowElement = objDragDropAssignElement.querySelector('[id="DragDropAssignRow_preview"]');
            objRowElement.setAttribute("style", "height:" + objContext.intRowHeight.current + "px");
        }
    }, [state.ElementJson]);

    /**
     * @name OnDrop
     * @param {element} objDraggedElement The Element being dragged and dropped.
     * @param {element} objDropArea The drop area where the dragged element is dropped.
     * @param {element} objSourceArea The source area from which the drag is happened.
     * @param {object} objDragdropData This is the data sent to drag component. It is returned as it is from there.
     * @summary Handler for the Mouse up/Touch end event.
     */
    const OnDrop = (objDraggedElement, objDropArea, objSourceArea, objDragdropData) => {
        if (objDropArea && objDropArea !== null && objDropArea.closest("div[ielementid='" + objDragdropData["iElementId"] + "']")) {
            if (objDropArea.getAttribute("DragDrop_DropAreaType") === "AnswerArea" || objDropArea.getAttribute("DragDrop_DragAreaType") === "OptionArea") {
                let intBlockId = parseInt(objDropArea.getAttribute("iblockid"));
                let intElementDragDropAssignValueId = parseInt(objDraggedElement.getAttribute("ielementdragdropassignvalueid"));
                let arrValues = state.ElementJson["vElementJson"]["Values"].map(objTempData => {
                    if (objTempData["iElementDragDropAssignValueId"] === intElementDragDropAssignValueId) {
                        return {
                            ...objTempData,
                            ["iBlockId"]: intBlockId
                        };
                    }
                    else {
                        return {
                            ...objTempData
                        };
                    }
                });
                objContext.IsItemDropped.current = true;
                objContext.dispatch({
                    "type": "SET_STATE",
                    "payload": {
                        "ElementJson": {
                            ...objContext.state.ElementJson,
                            ["vElementJson"]: {
                                ...objContext.state.ElementJson["vElementJson"],
                                ["Values"]: arrValues
                            }
                        },
                        "arrDragdropAssignAnswered": objContext.state.arrDragdropAssignAnswered.filter(x => x["iElementDragDropAssignValueId"] !== intElementDragDropAssignValueId && x["iBlockId"] !== intBlockId)
                    }
                });
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
                "OnDrop": OnDrop
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSDragdropAssign_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return (
            <Common {...objCommonProps} />
        );
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default CMSDragdropAssign_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSDragdropAssign_TestApplication_ModuleProcessor; 