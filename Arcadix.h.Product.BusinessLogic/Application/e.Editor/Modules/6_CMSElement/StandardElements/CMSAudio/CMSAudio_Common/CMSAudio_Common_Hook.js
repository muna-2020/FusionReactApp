//React imports
import { useEffect, useImperativeHandle } from 'react';

import * as CMSAudio_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_MetaData';

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSAudio_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {

    useEffect(() => {
        if (objContext.props.ElementJson) {
            let cShowHeaderText = "N";
            let arrHeaderValues = [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ];
            let arrTextElements = [];
            if (objContext.props.ElementJson["vElementJson"]["cShowHeaderText"]) {
                cShowHeaderText = objContext.props.ElementJson["vElementJson"]["cShowHeaderText"];
            }
            if (objContext.props.ElementJson["vElementJson"]["HeaderValues"]) {
                arrHeaderValues = [...objContext.props.ElementJson["vElementJson"]["HeaderValues"]];
            }
            if (objContext.props.ElementJson["vElementJson"]["TextElements"]) {
                arrTextElements = [...objContext.props.ElementJson["vElementJson"]["TextElements"]];
            }
            var objContainerElementProperties = { ...objContext.props.ElementJson.vContainerElementProperties };
            if (objContainerElementProperties == null || Object.keys(objContainerElementProperties).length === 0) {
                objContainerElementProperties = CMSAudio_Editor_MetaData.GetDefaultContainerElementProperties();
            }
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": {
                        ...objContext.props.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.props.ElementJson["vElementJson"],
                            ["cShowHeaderText"]: cShowHeaderText,
                            ["HeaderValues"]: arrHeaderValues,
                            ["TextElements"]: arrTextElements
                        },
                        ...objContainerElementProperties
                    },
                    "blnUndoRedoUpdate": false
                }
            });
        }
    }, [objContext.props.ElementJson]);

    /**
     * this useEffect is responsible for play and pause when the boolPlay is changes
     * boolPlay = true play()
     * boolPlay = false pause()
     */
    useEffect(() => {
        if (objContext.state.objAudioControl.boolPlay) {
            objContext.AudioRef.current.play();
        } else {
            objContext.AudioRef.current.pause();
        }
    }, [objContext.state.objAudioControl.boolPlay]);

    /**
     * Used to reload audio source from parent
     */
    useImperativeHandle(objContext.props.Ref, () => ({
        ReloadAudio: (dataSourceURL = null) => {
            if (objContext.AudioRef.current) {
                if (dataSourceURL) {
                    objContext.AudioRef.current.src = dataSourceURL;
                }
                objContext.AudioRef.current.load();
                objContext.dispatch({ "type": "SET_STATE", "payload": { "objAudioControl": { ...objContext.state.objAudioControl, "boolMediaLoaded": false } } });
            }
        }
    }), [objContext.state.objAudioControl])
}