//React Imports
import { useEffect, useImperativeHandle } from 'react';

import * as CMSVideo_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor_MetaData';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    return {
        "ElementJson": { ...props.ElementJson },
        "objVideoControl": { ...CMSVideo_Editor_MetaData.GetDefaultVideoControl(props.ElementJson) },
        "blnLoadPlayer": props.ElementJson.vElementJson.cIsVimeo === undefined || props.ElementJson.vElementJson.cIsVimeo === "N" || props.ElementJson.vElementJson.cIsVimeo === "Y" && props.ElementJson.vElementJson.cIsTranscodingComplete === "Y" ? true : false
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSVideo_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSVideo_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {
    /**
    * @summary Gets latest context object.
    */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetLatestContext": () => {
            return objContext;
        },
        "ResetAnswer": () => {
            objContext.CMSVideo_Common_ModuleProcessor.HandleOnEnd(objContext);
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "ElementJson": objContext.props.ElementJson,
                    "objVideoControl": {
                        ...CMSVideo_Editor_MetaData.GetDefaultVideoControl(objContext.props.ElementJson),
                        "boolMediaLoaded": true,
                        "boolResetControls": true
                    }
                }
            });
        }
    }), [objContext.state, objContext.props]);
}
