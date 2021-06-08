//React imports
import React, { useEffect, useReducer } from 'react';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Common/CMSOverlay_Common';
import * as CMSOverlay_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_TestApplication/CMSOverlay_TestApplication_Hooks';
import CMSOverlay_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_TestApplication/CMSOverlay_TestApplication_ModuleProcessor";

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSOverlay_Editor
 * @param {object} props component props
 * @param {any} ref component's ref
 * @summary CMS Overlay's editor version
 * @returns {any} CMSOverlay_TestApplication
 */
const CMSOverlay_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSOverlay_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSOverlay_TestApplication_" + props.ElementJson.iElementId,
        "CMSOverlay_TestApplication_ModuleProcessor": new CMSOverlay_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSOverlay_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSOverlay_TestApplication_ModuleProcessor);

    /**
     * @name CMSOverlay_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSOverlay_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSOverlay_TestApplication_Hooks.Initialize(objContext);

    // useEffect(() => {
    //     if (state.blnShowOverlay) {
    //         let objElement = document.getElementById(state.ElementJson["iElementId"] + "_baloon");
    //         if (objElement.offsetWidth > 700) {
    //             objElement.style.width = 700 + "px";
    //         }
    //         objElement.style.top = state.top + "px";
    //         objElement.style.left = state.left + "px";
    //     }
    // }, [state.blnShowOverlay])

    const OnMouseOver = (event) => {
        window.addEventListener("click", RemoveOverlay);
        window.addEventListener("resize", RemoveOverlay);
        // let objOverlayDiv = event.target.getBoundingClientRect();
        // console.log("objOverlayDiv", objOverlayDiv);
        // let objDiv = document.querySelector(".parent-div");
        // let objBoundingRects = objDiv.getBoundingClientRect();
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "blnShowOverlay": true
            }
        });
    }

    const RemoveOverlay = () => {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "blnShowOverlay": false
            }
        });
        window.removeEventListener("click", RemoveOverlay);
        window.addEventListener("resize", RemoveOverlay);
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objProps = {
            "Context": objContext,
            "Events": {
                "OnMouseOver": (event) => {
                    OnMouseOver(event);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return {
                        ...objContext.CMSOverlay_TestApplication_ModuleProcessor.GetTextElementProps(objContext, intElementTextId),
                    };
                }
            },
            "TextElement": CMSText_TestApplication,
            "AppType": "TestApplication"
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default Helper.forwardComponent(CMSOverlay_TestApplication);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSOverlay_TestApplication_ModuleProcessor; 