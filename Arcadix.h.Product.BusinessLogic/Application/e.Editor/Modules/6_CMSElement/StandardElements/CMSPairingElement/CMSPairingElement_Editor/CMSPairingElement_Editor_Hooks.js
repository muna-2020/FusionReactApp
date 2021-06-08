//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let objElementJson = { ...BaseCMSElement.AttachRef(props.ElementJson) };
    return UndoRedoInitialize({
        "ElementJson": {
            ...objElementJson,
            ["vElementJson"]: {
                ...objElementJson.vElementJson,
                ["PairingElements"]: [...objElementJson["vElementJson"]["PairingElements"].map((objPairingElementValue) => {
                    return { ...objPairingElementValue, ["PairingElementRef"]: React.createRef() };
                })]
            },
            ["MappedElements"]: [...props.ElementJson["MappedElements"].map(x => {
                return BaseCMSElement.AttachRef(x);
            })]
        },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "ElementFocused": null,
        "arrSelectedPairingElements": [],
        "blnDrawPolyline": false,
        "cIsEditEnabled": "N"
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
 * @summary Undo redo hook.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.ParentRef.current != null && objContext.props.ParentRef.current.PreserveElementState) {
            objContext.props.ParentRef.current.PreserveElementState({ ...objContext.state, TextState: objContext.Element_UndoRedoDataRef.current });
        }
    }, [objContext.state.StateHistory]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    /**
     *@summary gets selected shape from ribbon 
     */
    useImperativeHandle(objContext.PairingElementRef, () => ({
        GetPairingElementType: (strSelectedShape) => {
            if (strSelectedShape && strSelectedShape !== "Delete") {
                objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedPairingType": strSelectedShape }, "blnUndoRedoUpdate": false });
            }
            else {
                objContext.CMSPairingElement_Editor_ModuleProcessor.DeletePairingElement(objContext);
            }
        }
    }), [objContext.state]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrNewTextElements = [];
            let arrMappedElements = [];
            let arrPairingElements = objContext.state.ElementJson.vElementJson["PairingElements"].map((objPairingElement) => {
                const { PairingElementRef, ...objNewPairingElement } = objPairingElement;
                return objNewPairingElement;
            });
            for (let intCount = 0; intCount < arrTextElements.length; intCount++) {
                let objTextElementJson = { ...arrTextElements[intCount] };
                if (arrTextElements[intCount].Ref.current && arrTextElements[intCount].Ref.current.GetElementJson) {
                    objTextElementJson = await arrTextElements[intCount].Ref.current.GetElementJson(blnRemoveRef, strDataFor);
                }
                arrNewTextElements = [
                    ...arrNewTextElements,
                    objTextElementJson
                ];
            }
            for (let intCount = 0; intCount < objContext.state.ElementJson["MappedElements"].length; intCount++) {
                let objMappedElementJson = { ...objContext.state.ElementJson["MappedElements"][intCount] };
                let objMappedNewElementJson = await objMappedElementJson.Ref.current.GetElementJson();
                arrMappedElements = [...arrMappedElements, objMappedNewElementJson];
                var objPairedElement = arrPairingElements.filter(e => e["iPairingElementId"] === objMappedElementJson["iElementId"])[0];
                if (objPairedElement) {
                    arrPairingElements = [...arrPairingElements.filter(e => e["iPairingElementId"] !== objMappedElementJson["iElementId"]), {
                        ...objPairedElement,
                        ["iPairingElementId"]: objMappedNewElementJson["iElementId"]
                    }];
                }
            }
            let objBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["PairingElements"]: arrPairingElements,
                    ["iHeight"]: objBoundingRects.height,
                    ["iWidth"]: objBoundingRects.width,
                    ["TextElements"]: arrNewTextElements
                },
                ["MappedElements"]: arrMappedElements
            };
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetElementJsonForCopy": async () => {
            let arrHeaderValues = [];
            let arrValues = [];
            let arrTextElements = [];
            let arrMappedElements = [];
            let arrPairingElements = objContext.state.ElementJson.vElementJson["PairingElements"].map((objPairingElement) => {
                const { PairingElementRef, ...objNewPairingElement } = objPairingElement;
                return objNewPairingElement;
            });
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
            for (let intCount = 0; intCount < objContext.state.ElementJson["MappedElements"].length; intCount++) {
                let objMappedElementJson = { ...objContext.state.ElementJson["MappedElements"][intCount] };
                let objMappedNewElementJson = await objMappedElementJson.Ref.current.GetElementJsonForCopy();
                arrMappedElements = [...arrMappedElements, objMappedNewElementJson];
                var objPairedElement = arrPairingElements.filter(e => e["iPairingElementId"] === objMappedElementJson["iElementId"])[0];
                if (objPairedElement) {
                    arrPairingElements = [...arrPairingElements.filter(e => e["iPairingElementId"] !== objMappedElementJson["iElementId"]), {
                        ...objPairedElement,
                        ["iPairingElementId"]: objMappedNewElementJson["iElementId"]
                    }];
                }
            }
            let objBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["Values"]: arrValues,
                    ["iHeight"]: objBoundingRects.height,
                    ["iWidth"]: objBoundingRects.width,
                    ["TextElements"]: arrTextElements,
                    ["PairingElements"]: arrPairingElements
                },
                ["MappedElements"]: arrMappedElements
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "DeleteElement": (intElementId) => {
            objContext.CMSPairingElement_Editor_ModuleProcessor.DeleteElement(objContext, intElementId);
        },
        "GetContextMenuOptions": (intElementId) => {
            let objParams = { "value": intElementId };
            let objValue = objContext.state.ElementJson.vElementJson.PairingElements.find(e => e.iPairingElementId === intElementId);
            if (objValue) {
                objParams = { ...objParams, type: objValue["vPairingElementTypeName"], additionalproperties: objValue };
            }
            return objContext.CMSPairingElement_Editor_ModuleProcessor.GetContextMenuOptions(objContext, objParams);
        },
        "PreserveTextState": (objState) => {
            objContext.CMSPairingElement_Editor_ModuleProcessor.PreserveTextState(objContext, objState);
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSPairingElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        },
        "UpdateElementJson": (objElementJson) => {
            var { AdditionalProperties } = objElementJson;
            objContext.CMSPairingElement_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson, AdditionalProperties.iPreviousElementId);
        }
    }), [objContext.state, objContext.props]);
}
