//React imports
import React, { useReducer } from 'react';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module Related Imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_Common/CMSDragdropAssign_Common';
import * as CMSDragdropAssign_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_Editor/CMSDragdropAssign_Editor_Hooks';
import CMSDragdropAssign_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_Editor/CMSDragdropAssign_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSDragdropAssign_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to the component
 * @summary CMSDragdropAssign's Editor version
 * @returns {any} CMSDragdropAssign_Editor
 */
const CMSDragdropAssign_Editor = (props, ref) => {

    /**
     * @name Element_UndoRedoDataRef
     * @summary  This Ref is used to store the preserved element state to be used for undo-redo.
     * */
    let Element_UndoRedoDataRef = useRef(props.PreservedState ? props.PreservedState.TextState : {}); // skip

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSDragdropAssign_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        Element_UndoRedoDataRef,
        "ModuleName": "CMSDragDropAssign_Editor_" + props.ElementJson.iElementId,
        ["CMSDragdropAssign_Editor_ModuleProcessor"]: new CMSDragdropAssign_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSDragdropAssign_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSDragdropAssign_Editor_ModuleProcessor);

    /**
     * @name CMSDragdropAssign_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSDragdropAssign_Editor_Hooks, that contains all the custom hooks.
     */
    CMSDragdropAssign_Editor_Hooks.Initialize(objContext);

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
        let objDomAppArea = document.getElementById("activeworkarea_" + objContext.props.Mode + "_" + objContext.props.PageId);
        // let objElementPlaceholderDiv = objDomAppArea.querySelector('[id="right_' + objContext.props.Mode + objContext.props.ContainerId + '"]');
        let objClientRect_DomAppArea = objDomAppArea.getBoundingClientRect();
        let objDragdropDiv = objDomAppArea.querySelector('[ielementid="' + objContext.state.ElementJson["iElementId"] + '"]');
        let objResizerDiv = objDragdropDiv.querySelector('[id="' + strColumnId + '"]');
        let objClientRect_ResizerDiv = objResizerDiv.getBoundingClientRect();
        let intCurrentWidth = objClientRect_ResizerDiv.left + parseInt(objResizerDiv.style["width"].split("px")[0]);
        let intMaxWidth = objClientRect_DomAppArea.right;
        let strColumn2Id = "DragdropAssign_ColumnTwo_" + props.ElementJson["iElementId"];
        let strColumn3Id = "DragdropAssign_ColumnThree_" + props.ElementJson["iElementId"];
        let objColumn2 = objDragdropDiv.querySelector('[id="' + strColumn2Id + '"]');
        let objColumn3 = objDragdropDiv.querySelector('[id="' + strColumn3Id + '"]');
        let intWidthColumn2 = parseInt(objColumn2.style["width"].split("px")[0]);
        let intWidthColumn3 = parseInt(objColumn3.style["width"].split("px")[0]);
        let intMinWidth = objClientRect_ResizerDiv.left + parseInt(objResizerDiv.style["min-width"].split("px")[0]);
        switch (strColumnId.split("_")[1].toLocaleLowerCase()) {
            case "columnone":
                intMaxWidth -= (intWidthColumn2 + intWidthColumn3);
                break;
            case "columntwo":
                intMaxWidth -= intWidthColumn3;
                break;
        }
        // if ((objEvent.screenX >= intMousePositionX || intCurrentWidth >= intMinWidth) && objEvent.screenX < intMaxWidth) {
        if (objEvent.screenX >= intMousePositionX || intCurrentWidth >= intMinWidth) {
            let intDisplacement = objEvent.screenX - intMousePositionX;
            objResizerDiv.style.width = (parseInt(objResizerDiv.style["width"].split("px")[0]) + intDisplacement) + "px";
            intMousePositionX = objEvent.screenX;
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
        let strColumn1Id = "DragdropAssign_ColumnOne_" + props.ElementJson["iElementId"];
        let strColumn2Id = "DragdropAssign_ColumnTwo_" + props.ElementJson["iElementId"];
        let strColumn3Id = "DragdropAssign_ColumnThree_" + props.ElementJson["iElementId"];
        let objColumn1 = objDragdropDiv.querySelector('[id="' + strColumn1Id + '"]');
        let objColumn2 = objDragdropDiv.querySelector('[id="' + strColumn2Id + '"]');
        let objColumn3 = objDragdropDiv.querySelector('[id="' + strColumn3Id + '"]');
        let intWidthColumn1 = parseInt(objColumn1.style["width"].split("px")[0]);
        let intWidthColumn2 = parseInt(objColumn2.style["width"].split("px")[0]);
        let intWidthColumn3 = parseInt(objColumn3.style["width"].split("px")[0]);
        let arrHeaderValues = state.ElementJson["vElementJson"]["HeaderValues"].map(objTempHeaderValue => {
            if (objTempHeaderValue["iBlockId"]) {
                switch (objTempHeaderValue["iBlockId"]) {
                    case 1:
                        return {
                            ...objTempHeaderValue,
                            ["iWidth"]: intWidthColumn1
                        };
                    case 2:
                        return {
                            ...objTempHeaderValue,
                            ["iWidth"]: intWidthColumn2
                        };
                    case 3:
                        return {
                            ...objTempHeaderValue,
                            ["iWidth"]: intWidthColumn3
                        };
                }
            }
            else {
                return {
                    ...objTempHeaderValue
                };
            }
        });
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["HeaderValues"]: arrHeaderValues
            }
        };
        objContext.CMSDragdropAssign_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({ "type": "SET_STATE", "payload": { "ElementJson": objElementJson } });
    };

    /**
     * @name GetContent
     * @summary Calls the Common.RenderBody to get the jsx.
     * @returns {any} JSX recieved from Common.RenderBody.
     * */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objParams) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSDragdropAssign_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "ActivateOnlyPassedBlockId": (objValue, objTextElementJson) => {
                    objContext.CMSDragdropAssign_Editor_ModuleProcessor.ActivateOnlyPassedBlockId(objContext, objValue, objTextElementJson);
                },
                "ActivateResize": ActivateResize,
                "DeActivateResize": DeActivateResize,
                "Resize": Resize
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSDragdropAssign_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
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
     * @summary Calls the GetContent().
     */
    return GetContent();
};

export default CMSDragdropAssign_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSDragdropAssign_Editor_ModuleProcessor; 