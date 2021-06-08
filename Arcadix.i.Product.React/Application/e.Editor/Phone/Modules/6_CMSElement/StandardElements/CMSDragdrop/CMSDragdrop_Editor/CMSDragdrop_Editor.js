// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_Common/CMSDragdrop_Common';
import * as CMSDragdrop_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_Editor/CMSDragdrop_Editor_Hooks';
import CMSDragdrop_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_Editor/CMSDragdrop_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSDragdrop_Editor
 * @param {any} props props from parent
 * @param {any} ref ref to component
 * @summary CMSDragdrop's editor version.
 * @returns {any} CMSDragdrop_Editor
 */
const CMSDragdrop_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     * */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSDragdrop_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "QuestionHeaderRef": useRef(null),
        "OptionHeaderRef": useRef(null),
        "ModuleName": "CMSDragDrop_Editor_" + props.ElementJson.iElementId,
        "CMSDragdrop_Editor_ModuleProcessor": new CMSDragdrop_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSDragdrop_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSDragdrop_Editor_ModuleProcessor);

    /**
     * @name CMSDragdrop_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSDragdrop_Editor_Hooks, that contains all the custom hooks.
     */
    CMSDragdrop_Editor_Hooks.Initialize(objContext);

    /**
     * @summary Used for resizing.
     */
    let intMousePositionX = 0;

    /**
     * @name ActivateResize
     * @param {any} objEvent drag event
     * @summary Sets the 'intMousePosition' with the position of the objEvent.clientX
     */
    const ActivateResize = (objEvent) => {
        intMousePositionX = objEvent.screenX;
    };

    /**
     * @name Resize
     * @param {any} objEvent drag event
     * @param {string} strColumnId id of column being dragged.
     * @summary Resizes the width of the element of the passed id.
     */
    const Resize = (objEvent, strColumnId) => {
        // let strPageContentDivId = 'activeworkarea_' + props.Mode + '_' + props.PageId;
        // let objPageContentDiv = document.querySelector('[id="' + strPageContentDivId + '"]');
        // objPageContentDiv.setAttribute("style", "width: inherit");
        let objDragdropDiv = document.querySelector('[ielementid="' + objContext.state.ElementJson["iElementId"] + '"]');
        let intMinWidth = 100;
        if (strColumnId === "Dragdrop_QuestionColumn" + props.ElementJson["iElementId"]) {
            let objResizerDiv = objDragdropDiv.querySelector('[id="' + strColumnId + '"]');
            let intCurrentWidth = parseInt(objResizerDiv.style["width"].split("px")[0]);
            if (objEvent.screenX >= intMousePositionX || intCurrentWidth >= intMinWidth) {
                let intDisplacement = objEvent.screenX - intMousePositionX;
                let intIncreasedWidth = intCurrentWidth + intDisplacement;
                objResizerDiv.style.width = intIncreasedWidth + "px";
                intMousePositionX = objEvent.screenX;
            }
        }
        else {
            let objResizerDiv1 = objDragdropDiv.querySelector('[id="' + strColumnId + '"]');
            let objResizerDiv2 = objDragdropDiv.querySelector('[id="Dragdrop_AnswerColumn' + props.ElementJson["iElementId"] + '"]');
            let intCurrentWidth = parseInt(objResizerDiv1.style["width"].split("px")[0]);
            if (objEvent.screenX >= intMousePositionX || intCurrentWidth >= intMinWidth) {
                let intDisplacement = objEvent.screenX - intMousePositionX;
                let intIncreasedWidth = intCurrentWidth + intDisplacement;
                objResizerDiv1.style.width = intIncreasedWidth + "px";
                objResizerDiv2.style.width = intIncreasedWidth + "px";
                intMousePositionX = objEvent.screenX;
            }
        }
    };

    /**
     * @name DeActivateResize
     * @summary Resets the mouse position variable.
     */
    const DeActivateResize = () => {
        intMousePositionX = 0;
        let objDomAppArea = document.getElementById("activeworkarea_" + objContext.props.Mode + "_" + objContext.props.PageId);
        let objDragdropDiv = objDomAppArea.querySelector('[ielementid="' + objContext.state.ElementJson["iElementId"] + '"]');
        let strQuestionColumnId = "Dragdrop_QuestionColumn" + props.ElementJson["iElementId"];
        let objQuestionColumn = objDragdropDiv.querySelector('[id="' + strQuestionColumnId + '"]');
        let strOptionColumnId = "Dragdrop_OptionColumn" + props.ElementJson["iElementId"];
        let objOptionColumn = objDragdropDiv.querySelector('[id="' + strOptionColumnId + '"]');
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["iElementQuestionWidth"]: parseInt(objQuestionColumn.style["width"].split("px")[0]),
                ["iElementAnswerWidth"]: parseInt(objOptionColumn.style["width"].split("px")[0])
            }
        };
        // let strPageContentDivId = 'activeworkarea_' + props.Mode + '_' + props.PageId;
        // let objPageContentDiv = document.querySelector('[id="' + strPageContentDivId + '"]');
        // objPageContentDiv.removeAttribute("style");
        objContext.CMSDragdrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ "type": "SET_STATE", "payload": { "ElementJson": objElementJson } });
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
                    objContext.CMSDragdrop_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objValue);
                },
                "ActivateResize": ActivateResize,
                "DeActivateResize": DeActivateResize,
                "Resize": Resize
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSDragdrop_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId)
                    };
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return (
            <Common {...objCommonProps} />
        );
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default CMSDragdrop_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSDragdrop_Editor_ModuleProcessor; 
