//React Imports
import { useEffect, useImperativeHandle } from 'react';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

import * as CMSAudio_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor_MetaData';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    var objElementJson = props.vExternalSourceURL ? CMSAudio_Editor_MetaData.GetDefaultElementJson(0) : props.ElementJson;
    if (objElementJson.vContainerElementProperties == null) {
        objElementJson = { ...objElementJson, ...CMSAudio_Editor_MetaData.GetDefaultContainerElementProperties() };
    }
    return UndoRedoInitialize({
        "ElementJson": objElementJson,
        "objAudioControl": { ...CMSAudio_Editor_MetaData.GetDefaultAudioControl(objElementJson) },
        "blnDisablePlayerSlider": false,
        "blnDisplayPurpose": props.blnDisplayPurpose !== undefined || props.blnDisplayPurpose !== null ? props.blnDisplayPurpose : false,
        "isLoadComplete": false
    }, props);
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSAudio_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
    EditorBase_Hook.useRenderComplete(objContext);
};

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSAudio_Editor_ModuleProcessor}
 * @summary Undo redo hook.
 */
function useUndoRedo(objContext) {
    if (!objContext.state.blnDisplayPurpose) {
        useEffect(() => {
            if (objContext.props.ParentRef.current != null && objContext.props.ParentRef.current.PreserveElementState) {
                objContext.props.ParentRef.current.PreserveElementState({ ...objContext.state });
            }
        }, [objContext.state.StateHistory]);
    }
};

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSAudio_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {
    if (!objContext.state.blnDisplayPurpose) {
        useImperativeHandle(objContext.props.UndoRedoRef, () => ({
            "UndoRedo": (LastActivity, Action) => {
                UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
            }
        }), [objContext.state]);

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
                let objElementJson = {
                    ...objContext.state.ElementJson,
                    ["iOrder"]: objContext.props.ElementJson.iOrder,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["TextElements"]: arrNewTextElements
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
                objContext.CMSAudio_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            }
        }), [objContext.state, objContext.props]);
    }
};
