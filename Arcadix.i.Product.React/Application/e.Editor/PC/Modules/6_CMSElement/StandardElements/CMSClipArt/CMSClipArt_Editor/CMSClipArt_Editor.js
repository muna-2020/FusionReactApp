// React related imports.
import React, { useReducer, useRef, useEffect } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

// Throttle related import
import { throttle } from 'lodash';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSClipArt/CMSClipArt_Common/CMSClipArt_Common';
import * as CMSClipArt_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSClipArt/CMSClipArt_Editor/CMSClipArt_Editor_Hooks';

/**
 * @name CMSClipArt_Editor
 * @param {object} props props from parent
 * @param {Ref} ElementRef ref to component
 * @summary CMSClipArt's editor version.
 * @returns {Component} CMSClipArt Editor
 */
const CMSClipArt_Editor = (props, ElementRef) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSClipArt_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSClipArt_Editor_" + props.ElementJson.iElementId,
        "resizeRef": useRef(null),
        "blnResizeClipArt": useRef(false),
        "clipArtImageRef": useRef(null),
        "offsetRef": useRef({})
    };

    /**
     * @name CMSClipArt_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSClipArt_Editor_Hooks, that contains all the custom hooks.
     */
    CMSClipArt_Editor_Hooks.Initialize(objContext);

    /**
     @name useEffect
     @summary helps in attaching mouseup and mousemove events
     */
    useEffect(() => {
        var containerDiv = document.getElementById("editor_div");
        if (containerDiv) {
            containerDiv.addEventListener("mousemove", handleThrottleOuterMouseMove);
            containerDiv.addEventListener("mouseup", handleOuterDivMouseUpCallBack);
        }
        return () => {
            if (containerDiv) {
                containerDiv.removeEventListener("mousemove", handleThrottleOuterMouseMove);
                containerDiv.removeEventListener("mouseup", handleOuterDivMouseUpCallBack);
            }
        };
    }, [objContext.state]);

    /**
     * @name handleOuterDivMouseUpCallBack
     * @param {any} e mpuseup event
     * @summary handles mouseup event
     */
    const handleOuterDivMouseUpCallBack = (e) => {
        if (objContext.blnResizeClipArt.current) {
            objContext.blnResizeClipArt.current = false;
            //objContext.resizeRef.current.style.display = "none";
        }
        console.log(e.target)
    };

    /**
   * @name handleThrottleOuterMouseMove
   * @summary throttle helps is controlling the method execution rate
   * */
    const handleThrottleOuterMouseMove = throttle((event) => {
        if (objContext.blnResizeClipArt.current) {
            var iCurrentWidth = objContext.offsetRef.current.width;
            var iCurrentHeight = objContext.offsetRef.current.height;
            var eX = parseInt(event.clientX - objContext.offsetRef.current.x);
            var eY = parseInt(event.clientY - objContext.offsetRef.current.y);
            console.log(iCurrentWidth + eX, iCurrentHeight + eY)
            objContext.clipArtImageRef.current.style.width = iCurrentWidth + eX + "px";
            objContext.clipArtImageRef.current.style.height = iCurrentHeight + eY + "px";
        }
    }, 0);

    /**
     * @name GetContent
     * @summary Calls the RenderBody method to get the JSX.
     * @returns {any} JSX of the Component
     * */
    const GetContent = () => {
        let objProps = {
            "Context": objContext,
            "Events": {
                "HandleImageClick": (event) => {
                    if (event.detail === 2) {
                        objContext.resizeRef.current.style.display = "block";
                    }
                },
                "HandleResizeMouseDown": (event) => {
                    objContext.blnResizeClipArt.current = true;
                    objContext.offsetRef.current = { "x": event.clientX, "y": event.clientY, "width": objContext.clipArtImageRef.current.width, "height": objContext.clipArtImageRef.current.height }
                }
            }
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Returs the JSX of the Component
     */
    return GetContent();
};

export default CMSClipArt_Editor;
