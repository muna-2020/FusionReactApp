//React imports
import { useEffect } from 'react';

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
 * @param {object} objContext {state, props, dispatch, CMSAudioRecorder_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {

    useEffect(() => {
        if (objContext.props.ElementJson) {
            let cShowHeaderText = "N"
            let objStateParams = {};
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
            let arrAudioSources = [...objContext.props.ElementJson["vElementJson"]["AudioSources"]];
            if (arrAudioSources.length > 0) {
                for (let intCount = 0; intCount < arrAudioSources.length; intCount++) {
                    if (arrAudioSources[intCount]["cIsBlobSource"] == "N" && arrAudioSources[intCount]["ElementJson"]) {
                        let objElementJson = arrAudioSources[intCount]["ElementJson"];
                        arrAudioSources[intCount]["vExternalSourceURL"] = `${objContext.props.JConfiguration.WebDataPath}Repo/AudioRecorder/${objContext.props.JConfiguration.MainClientId}/${objElementJson.iElementId}_Audio_${objElementJson.vElementJson.iAudioFileVersion}.mp3`;
                    }
                }
                let objLastAudioSource = arrAudioSources[arrAudioSources.length - 1];
                objStateParams = { ...objStateParams, ["blnLoadAudioPlayer"]: true, ["objAudioSource"]: objLastAudioSource, ["iCurrentSelectedId"]: objLastAudioSource["id"] };
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
                            ["TextElements"]: arrTextElements,
                            ["AudioSources"]: arrAudioSources
                        },
                    },
                    ...objStateParams,
                    "blnUndoRedoUpdate": false
                }
            });
        }
    }, [objContext.props.ElementJson]);
}
