//React Imports
import { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

import * as Image from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Upload_Save";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

import * as CMSImage_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_MetaData"

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        ElementJson: {
            ...props.ElementJson
        },
        PageId: props.PageId,
        ComponentKey: props.ComponentKey,
        arrBoundingBoxes: [],
        arrPolygonPoints: [],
        arrSteps: [],
        objCoordinates: {},
        isLoadComplete: false,
        blnDisplay: true,
        blnLoaded: props.ElementJson.vElementJson.Values && props.ElementJson.vElementJson.Values.length > 0 ? true : false,
        dataURL: [],
        blnInitialLoad: true,
        blnImageLoaded: true,
        blnRedraw: false,
        blnImageCropped: false,
        iDisplayOrder: props.ElementJson.vElementJson.Values.length,
        blnImageOnLoadSuccesful: true,
        imageOffset: {}
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSHotspot_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSHotspot_Editor_ModuleProcessor}
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
            var objImageElementJson = { ...objContext.props.ElementJson.vImageElementJson };
            if (objImageElementJson["vContainerElementProperties"] == null || Object.keys(objImageElementJson["vContainerElementProperties"]).length === 0) {
                objImageElementJson = { ...objImageElementJson, ...CMSImage_Editor_MetaData.GetDefaultContainerElementProperties() }
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
                        ["vImageElementJson"]: objImageElementJson
                    },
                    "blnUndoRedoUpdate": false
                }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSHotspot_Editor_ModuleProcessor}
 * @summary Undo redo hook.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.PreserveElementState) {
            objContext.props.PreserveElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSHotspot_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {

    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    /**
     *@summary Saves selected shape from ribbon 
     */
    useImperativeHandle(objContext.hotspotRef, () => ({
        SaveSelectedShape: (strSelectedShape) => {
            if (strSelectedShape && strSelectedShape !== "Remove") {
                objContext.dispatch({ "type": "SET_STATE", "payload": { "selectedShape": strSelectedShape }, "blnUndoRedoUpdate": false });
            }
            else {
                objContext.CMSHotspot_Editor_ModuleProcessor.removeSelectedShape(objContext);
            }
        }
    }), [objContext.state]);

    /**
      * @summary Gets the Element Json.
      */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            let objElementJson = null;
            if (objContext.state.arrSteps.length > 0) {
                var blnUploaded = false;
                var dataURL = objContext.imageArea.current.src;
                objElementJson = { ...objContext.state.ElementJson.vImageElementJson, ["dataURL"]: dataURL };
                if (objContext.state.ElementJson.vImageElementJson.iFolderID !== -1) {
                    objElementJson = await Image.HandleImageSavePopup(objElementJson);
                    blnUploaded = true;
                }
                else {
                    objElementJson = await Image.HandleUploadAndSaveImage(objElementJson);
                    blnUploaded = true;
                }
                if (blnUploaded) {
                    objElementJson = {
                        ...objElementJson,
                        ["iOrder"]: objContext.state.ElementJson.iOrder,
                        ["vContainerElementProperties"]: { ...objContext.state.ElementJson.vImageElementJson.vContainerElementProperties }
                    };
                }
            }
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrNewTextElements = [];
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
            objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["iElementImageId"]: objElementJson ? objElementJson["iElementId"] : objContext.state.ElementJson.vImageElementJson.iElementId,
                    ["iMarkerCount"]: objContext.state.ElementJson.vElementJson.Values.length,
                    ["TextElements"]: arrNewTextElements
                },
                ["vImageElementJson"]: objElementJson ? objElementJson : objContext.state.ElementJson.vImageElementJson
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
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetPointOverride": () => {
            return objContext.CMSHotspot_Editor_ModuleProcessor.GetPointOverride(objContext)
        },
        "SetPointOverride": (objPoints) => {
            objContext.CMSHotspot_Editor_ModuleProcessor.SetPointOverride(objContext, objPoints);
        },
        "RemovePointOverride": (objPoints) => {
            objContext.CMSHotspot_Editor_ModuleProcessor.RemovePointOverride(objContext);
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSHotspot_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}