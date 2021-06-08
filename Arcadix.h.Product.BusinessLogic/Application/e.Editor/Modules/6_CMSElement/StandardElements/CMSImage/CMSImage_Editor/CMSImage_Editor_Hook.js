//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

import * as CMSImage_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor_MetaData"

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

import * as Image from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Upload_Save";

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        ElementJson: { ...props.ElementJson },
        PageId: props.PageId,
        ComponentKey: props.ComponentKey,
        arrBoundingBoxes: [],
        arrPolygonPoints: [],
        arrSteps: [],
        objPreviousCanvasDimensions: null,
        objCoordinates: {},
        isLoadComplete: false,
        blnDisplay: true,
        blnShowHeader: props.ElementJson.cHasTextOnTop === "Y" ? true : false,
        blnInitialLoad: true,
        dataURL: [],
        objOffsetXY: null,
        blnImageCropped: false,
        blnChanged: false,
        blnImageLoaded: true,
        canvasDimensions: {},
        imageOffset: {}
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSImage_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
    EditorBase_Hook.useRenderComplete(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSImage_Editor_ModuleProcessor}
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
            var objElementJson = {
                ...objContext.props.ElementJson,
                ["vElementJson"]: {
                    ...objContext.props.ElementJson["vElementJson"],
                    ["cShowHeaderText"]: cShowHeaderText,
                    ["HeaderValues"]: arrHeaderValues,
                    ["TextElements"]: arrTextElements
                }

            };
            if (objContext.props.ElementJson["vContainerElementProperties"] == null || Object.keys(objContext.props.ElementJson["vContainerElementProperties"]).length === 0) {
                objElementJson = { ...objElementJson, ...CMSImage_Editor_MetaData.GetDefaultContainerElementProperties() }
            }
            objContext.dispatch({
                type: "SET_STATE",
                payload: { "ElementJson": { ...objElementJson }, "blnUndoRedoUpdate": false }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSImage_Editor_ModuleProcessor}
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
 * @param {object} objContext {state, props, dispatch, CMSImage_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {

    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    /**
      * @summary Gets the Element Json.
      */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            let objElementJson = { ...objContext.state.ElementJson };
            if (objContext.state.arrSteps.length > 0 || objContext.state.ElementJson.blnScreenShotPaste) {
                if (objContext.state.ElementJson.iFolderID !== -1 || objContext.state.ElementJson.blnScreenShotPaste) {
                    objElementJson = await Image.HandleImageSavePopup({ ...objContext.state.ElementJson, ["dataURL"]: objContext.imageArea.current.src }); //objContext.CMSImage_Editor_ModuleProcessor.handleImageSavePopup(objContext);
                    if (objContext.state.ElementJson.blnScreenShotPaste || objElementJson.iFolderID === -1) {
                        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.GetInnerHtml) {
                            var strTextInnerHTML = objContext.props.ParentRef.current.GetInnerHtml();
                            var div = document.createElement("div");
                            div.innerHTML = strTextInnerHTML;
                            var imageElement = div.querySelector('[ielementid="' + objContext.state.ElementJson.iElementId + '"]');
                            if (imageElement) {
                                imageElement.setAttribute("ielementid", objElementJson.iElementId);
                                imageElement.setAttribute("id", objElementJson.iElementId);
                            }
                            objContext.props.ParentRef.current.ResetText(div.innerHTML);
                        }
                    }
                }
                else {
                    objElementJson = await Image.HandleUploadAndSaveImage({ ...objContext.state.ElementJson, ["dataURL"]: objContext.imageArea.current.src }); //objContext.CMSImage_Editor_ModuleProcessor.HandleUploadAndSaveImage(objContext);

                }
                objElementJson = {
                    ...objElementJson,
                    ["iOrder"]: objContext.state.ElementJson.iOrder,
                    ["vContainerElementProperties"]: { ...objContext.state.ElementJson.vContainerElementProperties }
                };
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
                ...objElementJson,
                ["vElementJson"]: {
                    ...objElementJson["vElementJson"],
                    ["TextElements"]: arrNewTextElements
                }
            };
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetContextMenuOptions": (intElementTextId) => {
            return objContext.CMSImage_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "GetElementJsonForCopy": async () => {
            let objElementJson = { ...objContext.state.ElementJson };
            if (objContext.state.arrSteps.length > 0) {
                if (objContext.state.ElementJson.iFolderID !== -1) {
                    objElementJson = await objContext.CMSImage_Editor_ModuleProcessor.handleImageSavePopup(objContext);
                }
                else {
                    objElementJson = await objContext.CMSImage_Editor_ModuleProcessor.HandleUploadAndSaveImage(objContext);
                }
            }
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
            objElementJson = {
                ...objElementJson,
                ["vElementJson"]: {
                    ...objElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["TextElements"]: arrTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSImage_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}