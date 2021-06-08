//React related imports
import React, { useReducer, useRef, useEffect } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Common/CMSVideo_Common';
import CMSVideo_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor_ModuleProcessor';
import CMSVideo_Common_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Common/CMSVideo_Common_ModuleProcessor';
import * as CMSVideo_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor_Hook';
import * as CMSVideo_Common_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Common/CMSVideo_Common_Hook';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSVideo_Editor
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary CMSVideo's editor version.
 * @returns {JSX} returns JSX
 */
const CMSVideo_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSVideo_Editor_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSVideo_Editor_" + props.ElementJson.iElementId,
        ["CMSVideo_Editor_ModuleProcessor"]: new CMSVideo_Editor_ModuleProcessor(),
        ["CMSVideo_Common_ModuleProcessor"]: new CMSVideo_Common_ModuleProcessor(),
        ["Ref"]: useRef(null),
        ["ContextRef"]: useRef(null),
        ["outerContainerRef"]: useRef(null),
        ["VideoPlayerRef"]: useRef(null)
    };

    /**
    * @name CMSVideo_Common_Hook.Initialize
    * @summary Initialize method call in CMSVideo_Common_Hook, that contains all the common custom hooks.
    */
    CMSVideo_Common_Hook.Initialize(objContext);

    /**
     * @name CMSVideo_Editor_Hook.Initialize
     * @summary Initialize method call in CMSVideo_Editor_Hook, that contains all the custom hooks.
     */
    CMSVideo_Editor_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (objEvt) => {
                    objEvt.preventDefault();
                    objEvt.stopPropagation();
                    objContext.CMSVideo_Editor_ModuleProcessor.OpenContextMenu(objContext, objEvt.clientX, objEvt.clientY);
                },
                "OnPlayerTimeUpdate": () => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandlePlayerTimeUpdate(objContext);
                },
                "OnEnded": () => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleOnEnd(objContext);
                },
                "OnPlaying": () => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleOnPlay(objContext);
                },
                "HandleLoadedMetaData": (event) => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleMetaDataLoad(objContext);
                },
                "HandleSliderClick": (blnPlay, blnIncrementReplay) => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleSliderClick(objContext, blnPlay, blnIncrementReplay);
                },
                "HandleValueChange": (iCurrentTime) => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleValueChange(objContext, iCurrentTime);
                },
                "HandleVolumeChange": (iVolume) => {
                    objContext.CMSVideo_Common_ModuleProcessor.HandleVolumeChange(objContext, iVolume);
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSVideo_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                },
                "GetVideoPath": () => {
                    return objContext.CMSVideo_Common_ModuleProcessor.GetVideoPath(objContext);
                }
            },
            "TextElement": CMSText_Editor,
            "AppType": "Editor"
        };
        return (
            <React.Fragment>
                <Common {...objCommonProps} iELementId={objContext.state.ElementJson.iElementId} />
            </React.Fragment>
        );
    };

    return GetContent();
};

export default CMSVideo_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSVideo_Editor_ModuleProcessor; 