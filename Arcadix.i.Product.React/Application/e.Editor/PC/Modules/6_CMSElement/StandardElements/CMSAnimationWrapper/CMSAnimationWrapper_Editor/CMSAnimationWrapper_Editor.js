// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Common/CMSAnimationWrapper_Common';
import * as CMSAnimationWrapper_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/CMSAnimationWrapper_Editor_Hooks';
import CMSAnimationWrapper_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/CMSAnimationWrapper_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSAnimationWrapper_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSAnimationWrapper's editor version.
 * @returns {any} CMSAnimationWrapper_Editor
 */
const CMSAnimationWrapper_Editor = (props, ref) => {

    /**
     * @name GetEditorState
     * @param {any} objElementJson
     * @summary this returns the editor initial state.
     */
    const GetEditorAnimationState = (props) => {
        let strIframelessAnimation = props.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsIframelessAnimation"] &&
            props.ElementJson["vAnimationElementJson"]["vElementJson"]["cIsIframelessAnimation"] == "Y" ? "Y" : "N";
        let objElementJson = { ...props.ElementJson };
        if (strIframelessAnimation == "Y" && document && document !== null) {
            let strHtmlDoc = props.ElementJson["vAnimationElementJson"]["WrapperContents"]["HtmlDoc"];
            let strNewHtmlDoc = props.ElementJson["vAnimationElementJson"]["WrapperContents"]["HtmlDoc"];
            let objTempDiv = document.createElement("div");
            objTempDiv.innerHTML = strHtmlDoc;
            let arrIdNodes = objTempDiv.querySelectorAll('[id]');
            arrIdNodes.forEach(objIdNode => {
                let strNewId = objIdNode.id + "_" + props.ElementJson.iElementId + "_" + "Editor";
                console.log("new id", strNewId);
                objIdNode.id = strNewId;
            });
            strNewHtmlDoc = objTempDiv.innerHTML;
            objElementJson = {
                ...props.ElementJson,
                "vAnimationElementJson": {
                    ...props.ElementJson.vAnimationElementJson,
                    "WrapperContents": {
                        ...props.ElementJson.vAnimationElementJson.WrapperContents,
                        "HtmlDoc": strNewHtmlDoc
                    }
                }
            };
        }
        return objElementJson;
    }

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSAnimationWrapper_Editor_Hooks.GetInitialState(props, GetEditorAnimationState));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "iFrameRef": useRef(null),
        "iFramelessRef": useRef(null),
        "iFrameContainerDivRef": useRef(null),
        "blnIsInitialValuesSet_Ref": useRef(false),
        "blnIsLoadViewClicked": useRef(false),
        "ComponentAnimationRef_Main": useRef(null),
        "ComponentAnimationRef_Solution": useRef(null),
        "ModuleName": "CMSAnimationWapper_Editor_" + props.ElementJson.iElementId,
        "CMSAnimationWrapper_Editor_ModuleProcessor": new CMSAnimationWrapper_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSAnimationWrapper_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSAnimationWrapper_Editor_ModuleProcessor);

    /**
     * @name CMSAnimationWrapper_Editor_Hook.Initialize
     * @summary Initialize method call in CMSAnimationWrapper_Editor_Hook, that contains all the custom hooks.
     */
    CMSAnimationWrapper_Editor_Hooks.Initialize(objContext);

    /**
     * @summary Used for resizing.
     */
    let intMousePositionX = 0;
    let intMousePositionY = 0;

    /**
     * @name HorizontalResize
     * @param {event} objEvent 
     * @param {object} objIFrameHandlerDiv 
     * @param {integer} intCurrentWidth 
     * @param {integer} intMinWidth 
     * @summary Handles the horizontal resize.
     */
    const HorizontalResize = (objEvent, objIFrameHandlerDiv, intCurrentWidth, intMinWidth) => {
        if ((intCurrentWidth >= intMinWidth || objEvent.screenX >= intMinWidth) && objEvent.screenX !== 0) {
            let intDisplacement = objEvent.screenX - intMousePositionX;
            let intWidth = parseInt(objIFrameHandlerDiv.style["width"].split("px")[0]) + intDisplacement;
            objIFrameHandlerDiv.style.width = intWidth + "px";
            intMousePositionX = objEvent.screenX;
        }
    };

    /**
     * @name VerticalResize
     * @param {event} objEvent 
     * @param {object} objIFrameHandlerDiv 
     * @param {integer} intCurrentHeight 
     * @param {integer} intMinHeight 
     * @summary Handles the vertical resize.
     */
    const VerticalResize = (objEvent, objIFrameHandlerDiv, intCurrentHeight, intMinHeight) => {
        if (objEvent.screenY >= intMousePositionY || intCurrentHeight >= intMinHeight) {
            let intDisplacement = objEvent.screenY - intMousePositionY;
            objIFrameHandlerDiv.style.height = (parseInt(objIFrameHandlerDiv.style["height"].split("px")[0]) + intDisplacement) + "px";
            intMousePositionY = objEvent.screenY;
        }
    };

    /**
     * @name ActivateResize
     * @param {any} objEvent drag event
     * @summary Sets the 'intMousePosition' with the position of the objEvent.clientX
     */
    const ActivateResize = (objContext, objEvent) => {
        intMousePositionX = objEvent.screenX;
        intMousePositionY = objEvent.screenY;
    };

    /**
     * @name Resize
     * @param {any} objEvent drag event
     * @param {string} strColumnId id of column being dragged.
     * @summary Resizes the width of the element of the passed id.
     */
    // const Resize = (objContext, objEvent, strResizerId) => {
    //     let objDomAppArea = document.getElementById("activeworkarea_" + objContext.props.Mode + "_" + objContext.props.PageId);
    //     // let objElementPlaceholderDiv = objDomAppArea.querySelector('[id="right_' + objContext.props.Mode + objContext.props.ContainerId + '"]');
    //     let objClientRect_DomAppArea = objDomAppArea.getBoundingClientRect();
    //     let objAnimationWrapperDiv = objDomAppArea.querySelector('[ielementid="' + objContext.state.ElementJson["iElementId"] + '"]');
    //     let objIFrameHandlerDiv = objAnimationWrapperDiv.querySelector('[id="iframe_handler"]');
    //     let objClientRect = objIFrameHandlerDiv.getBoundingClientRect();
    //     let intCurrentWidth = objClientRect.left + parseInt(objIFrameHandlerDiv.style["width"].split("px")[0]);
    //     let intCurrentHeight = objClientRect.top + parseInt(objIFrameHandlerDiv.style["height"].split("px")[0]);
    //     let intMinWidth = objClientRect.left + 100;
    //     let intMinHeight = objClientRect.top + 100;
    //     switch (strResizerId) {
    //         case "resize_right":
    //             HorizontalResize(objEvent, objIFrameHandlerDiv, intCurrentWidth, intMinWidth);
    //             break;
    //         case "resize_bottom_right":
    //             HorizontalResize(objEvent, objIFrameHandlerDiv, intCurrentWidth, intMinWidth);
    //             VerticalResize(objEvent, objIFrameHandlerDiv, intCurrentHeight, intMinHeight);
    //             break;
    //         case "resize_bottom":
    //             VerticalResize(objEvent, objIFrameHandlerDiv, intCurrentHeight, intMinHeight);
    //             break;
    //     }
    // };

    /**
     * @name DeActivateResize
     * @summary Resets the mouse position variable.
     */
    const DeActivateResize = () => {
        intMousePositionX = 0;
        intMousePositionY = 0;
        let objDomAppArea = document.getElementById("activeworkarea_" + objContext.props.Mode + "_" + objContext.props.PageId);
        let objAnimationWrapperDiv = objDomAppArea.querySelector('[ielementid="' + objContext.state.ElementJson["iElementId"] + '"]');
        let objIFrameHandlerDiv = objAnimationWrapperDiv.querySelector('[id="iframe_handler"]');
        let intCurrentWidth = parseInt(objIFrameHandlerDiv.style["width"].split("px")[0]);
        let intCurrentHeight = parseInt(objIFrameHandlerDiv.style["height"].split("px")[0]);
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["iHeight"]: intCurrentHeight,
                ["iWidth"]: intCurrentWidth
            }
        };
        objContext.dispatch({ "type": "SET_STATE", "payload": { "ElementJson": objElementJson } });
    };

    const Resize = (event) => {
        let objBoundingClientRects = objContext.iFrameContainerDivRef.current.getBoundingClientRect();
        let intHeight = objBoundingClientRects.height - 4;
        let intWidth = objBoundingClientRects.width - 4;
        if (intHeight > 100 && intWidth > 100) {
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["iHeight"]: intHeight,
                    ["iWidth"]: intWidth
                }
            };
            objContext.dispatch({ "type": "SET_STATE", "payload": { "ElementJson": objElementJson } });
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
                "OpenContextMenu": (event, objAnimationSpecificContextMenu = null) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSAnimationWrapper_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objAnimationSpecificContextMenu);
                },
                "ActivateResize": ActivateResize,
                "Resize": Resize,
                "DeActivateResize": DeActivateResize
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSAnimationWrapper_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                },
                "OpenAnimationWrapperSidebar": () => {
                    objContext.CMSAnimationWrapper_Editor_ModuleProcessor.OpenAnimationWrapperSidebar(objContext);
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

export default CMSAnimationWrapper_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSAnimationWrapper_Editor_ModuleProcessor; 