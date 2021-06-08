//React Imports
import { useEffect, useImperativeHandle } from 'react';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import * as AudioSave from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_Common/CMSAudioRecorder_Upload_Save';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    return {
        "ElementJson": { ...props.ElementJson },
        "blnIsRecording": false,
        "blnIsPaused": false,
        "recorder": null,
        "dataChunks": [],
        "arrAudioFiles": [],
        "iCurrentSelectedId": -1,
        "blnLoadAudioPlayer": false,
        "blnAllowMultipleRecording": props.AllowMultipleRecording ? props.AllowMultipleRecording : false
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSCMSAudioRecorder_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useImperativeMethods(objContext);
    EditorBase_Hook.useRenderComplete(objContext);
};

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSCMSAudioRecorder_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {
    if (!objContext.state.blnDisplayPurpose) {

        /**
          * @summary Gets the Element Json.
          */
        useImperativeHandle(objContext.props.ElementRef, () => ({
            "GetElementJson": async () => {
                let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
                let arrNewTextElements = [];
                for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
                    let objTextElementJson = { ...arrTextElements[intCount] };
                    if (arrTextElements[intCount].Ref.current && arrTextElements[intCount].Ref.current.GetElementJson) {
                        objTextElementJson = await arrTextElements[intCount].Ref.current.GetElementJson();
                    }
                    arrNewTextElements = [
                        ...arrNewTextElements,
                        objTextElementJson
                    ];
                }
                var arrAudioSources = [...objContext.state.ElementJson.vElementJson.AudioSources];
                for (let i = 0; i < arrAudioSources.length; i++) {
                    debugger;
                    if (arrAudioSources[i]["cIsBlobSource"] == "Y") {
                        arrAudioSources[i]["cIsBlobSource"] = "N";
                        var objAudioElementJson = await AudioSave.HandleUploadAndSaveAudio(arrAudioSources[i]["vExternalSourceURL"]);
                        if (objAudioElementJson) {
                            arrAudioSources[i]["ElementJson"] = objAudioElementJson;
                        }
                    }
                }
                let objElementJson = {
                    ...objContext.state.ElementJson,
                    ["iOrder"]: objContext.props.ElementJson.iOrder,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["TextElements"]: arrNewTextElements,
                        ["AudioSources"]: arrAudioSources
                    }
                };
                return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            },
            "GetLatestContext": () => {
                return objContext;
            },
            "GetElementJsonForCopy": async () => {
                let arrHeaderValues = []; let arrTextElements = [];
                for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["HeaderValues"].length; intCount++) {
                    if (objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"] !== null) {
                        let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"]);
                        let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                        arrTextElements = [
                            ...arrTextElements,
                            objNewTextElementJson
                        ];
                        arrHeaderValues = [
                            ...arrHeaderValues,
                            {
                                ...objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount],
                                ["iElementTextId"]: objNewTextElementJson["iElementId"]
                            }
                        ];
                    }
                    else {
                        arrHeaderValues = [
                            ...arrHeaderValues,
                            objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]
                        ];
                    }
                }
                let objElementJson = {
                    ...objContext.state.ElementJson,
                    ["iElementId"]: UniqueId.GetUniqueId(),
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["HeaderValues"]: arrHeaderValues,
                        ["TextElements"]: arrTextElements
                    }
                }
                objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
                return objElementJson;
            },
            "UpdateTaskEditStatus": () => {
                objContext.CMSCMSAudioRecorder_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            }
        }), [objContext.state, objContext.props]);
    }
};
