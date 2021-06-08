//React imports
import { useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    return {
        "ElementJson": props.ElementJson,
        "blnIsRecording": false,
        "blnIsPaused": false,
        "iCurrentSelectedId": -1,
        "blnLoadAudioPlayer": false,
        "blnAllowMultipleRecording": props.AllowMultipleRecording ? true : false
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
                    "ElementJson": objContext.props.ElementJson
                }
            });
        }
    }), [objContext.state, objContext.props]);
}