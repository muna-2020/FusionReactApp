//React imports
import { useEffect } from 'react';

import * as CMSVideo_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor_MetaData';

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
 * @param {object} objContext {state, props, dispatch, CMSVideo_Editor_ModuleProcessor}
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
                objContainerElementProperties = CMSVideo_Editor_MetaData.GetDefaultContainerElementProperties();
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
     * @name useEffect
     * @summary this useEffect is responsible for updating the current time to 0 when the track is ended
     */
    //useEffect(() => {
    //    if (objContext.state.objVideoControl.boolTrackEnd) {
    //        objContext.dispatch({
    //            "type": "SET_STATE", "payload": {
    //                "objVideoControl": {
    //                    ...CMSVideo_Editor_MetaData.GetDefaultVideoControl(objContext.state.ElementJson, objContext.state.blnDisplayPurpose),
    //                    "boolMediaLoaded": objContext.state.objVideoControl.boolMediaLoaded
    //                }
    //            }
    //        });
    //    }
    //}, [objContext.state.objVideoControl.boolTrackEnd]);

    /**
     * @name useEffect
     * @summary this useEffect is responsible for play and pause when the boolPlay is changes
     * boolPlay = true play()
     * boolPlay = false pause()
     */
    useEffect(() => {
        if (objContext.state.blnLoadPlayer) {
            if (objContext.state.objVideoControl.boolPlay) {
                objContext.Ref.current.play();
            } else {
                objContext.Ref.current.pause();
            }
        }
    }, [objContext.state.objVideoControl.boolPlay]);
}