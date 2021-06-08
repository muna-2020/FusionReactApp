//React imports
import { useImperativeHandle } from 'react';

import * as CMSAudio_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_MetaData';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    let objElementJson = { ...props.ElementJson };
    if (objElementJson.vContainerElementProperties == null) {
        objElementJson = { ...objElementJson, ...CMSAudio_Editor_MetaData.GetDefaultContainerElementProperties() };
    }
    return {
        "ElementJson": objElementJson,
        "objAudioControl": { ...CMSAudio_Editor_MetaData.GetDefaultAudioControl(props.ElementJson) },
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSAudio_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSAudio_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {
    /**
    * @summary Gets the Element Json.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetLatestContext": () => {
            return objContext;
        },
        "ResetAnswer": () => {
            objContext.CMSAudio_Common_ModuleProcessor.HandleOnEnd(objContext);
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "ElementJson": objContext.props.ElementJson,
                    "objAudioControl": {
                        ...CMSAudio_Editor_MetaData.GetDefaultAudioControl(objContext.props.ElementJson),
                        "boolMediaLoaded": true,
                        "boolResetControls": true
                    }
                }
            });
        }
    }), [objContext.state, objContext.props]);
}