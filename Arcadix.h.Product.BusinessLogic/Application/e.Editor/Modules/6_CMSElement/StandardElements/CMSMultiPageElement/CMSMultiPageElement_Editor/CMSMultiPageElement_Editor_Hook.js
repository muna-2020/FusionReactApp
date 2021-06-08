//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

//Module realted fies.
import * as CMSMultiPageElement_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/CMSMultiPageElement_Editor_MetaData";

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
    let cShowHeaderText = "N";
    let arrHeaderValues = [
        {
            "iElementTextId": null,
            "vHeaderType": "ElementHeader"
        }
    ];
    let arrTextElements = []; let arrElementValues = []; let arrValues = []; let arrNewValues = [];
    if (props.ElementJson["vElementJson"]["cShowHeaderText"]) {
        cShowHeaderText = props.ElementJson["vElementJson"]["cShowHeaderText"];
    }
    if (props.ElementJson["vElementJson"]["HeaderValues"]) {
        arrHeaderValues = [...props.ElementJson["vElementJson"]["HeaderValues"]];
    }
    if (props.ElementJson["vElementJson"]["TextElements"]) {
        arrTextElements = [...props.ElementJson["vElementJson"]["TextElements"]];
    }
    if (props.ElementJson["ElementValues"]) {
        arrElementValues = [...props.ElementJson["ElementValues"]];
        arrValues = [...props.ElementJson["vElementJson"]["Values"]];
        let iLength = arrValues.length;
        for (let iCount = 0; iCount < iLength; iCount++) {
            let objElementValue = arrValues[iCount];
            if (!/(text|empty)/.test(objElementValue.vElementTypeName.toLowerCase())) {
                arrNewValues = [...arrNewValues, { ...arrElementValues.find((e) => objElementValue[`iElement${objElementValue.vElementTypeName}Id`] === e.iElementId), ["Ref"]: React.createRef(), "IsSubElement": objElementValue.vElementTypeName.toLowerCase() !== "audio" ? "Y" : "N"   }];
            }
            else {
                arrNewValues = [...arrNewValues, { ...objElementValue, ["Ref"]: React.createRef() }];
            }
        }
    }
    return UndoRedoInitialize({
        "ElementJson": {
            ...props.ElementJson,
            ["vElementJson"]: {
                ...props.ElementJson["vElementJson"],
                ["cShowHeaderText"]: cShowHeaderText,
                ["HeaderValues"]: arrHeaderValues,
                ["TextElements"]: arrTextElements,
                ["Values"]: arrNewValues
            }
        },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "objCurrentSlideElementJson": null,
        "intSlideLength": 0,
        "intCurrentSlideIndex": 0,
        "intPreviousSlideIndex": 0,
        "isLoadComplete": false,
        "blnDisplay": true,
        "localQueue": [],
        "arrEditedImageIds": []
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSMultiPageElement_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSMultiPageElement_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {

    /**
     *@summary Initializing slides
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete) {
            let objTempState;
            if (objContext.state.ElementJson["vElementJson"].Values.length > 0) {
                objTempState = {
                    "isLoadComplete": true,
                    "intSlideLength": objContext.state.ElementJson["vElementJson"].Values.length
                };
            }
            else {
                objTempState = {
                    ...objContext.state,
                    "isLoadComplete": true,
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            "Values": [CMSMultiPageElement_Editor_MetaData.GetDummySlideObject()]
                        }
                    },
                    "intSlideLength": 1
                };
            }
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddOrDeleteSlide(objContext, 0, objTempState);
        }
    }, []);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSMultiPageElement_Editor_ModuleProcessor}
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
 * @param {object} objContext {state, props, dispatch, CMSMultiPageElement_Editor_ModuleProcessor}
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
            let arrValues = [...objContext.state.ElementJson.vElementJson.Values];
            for (var i = 0; i < arrValues.length; i++) {
                var elementJson = arrValues[i];
                if (elementJson.vElementTypeName.toLowerCase() === "image" && elementJson.Ref && elementJson.Ref.current && elementJson.Ref.current.GetElementJson) {
                    arrValues[i] = await elementJson.Ref.current.GetElementJson(blnRemoveRef, strDataFor);
                }
            }
            let arrElementValues = arrValues.filter(ele => ele.vElementTypeName.toLowerCase() !== "text" && ele.vElementTypeName.toLowerCase() !== "empty");
            // Creating mapping keys for element's inside Values array and actual json is moved to ElementValues.
            var arrIndexes = [];
            arrValues = arrValues.map((ele, i) => {
                if (!/(text|empty)/.test(ele.vElementTypeName.toLowerCase())) {
                    arrIndexes = [...arrIndexes, { "index": i, "iElementId": ele.iElementId }];
                    return { "index": i, [`iElement${ele.vElementTypeName}Id`]: ele.iElementId, ['vElementTypeName']: ele.vElementTypeName };
                }
                else {
                    arrIndexes = [...arrIndexes, { "index": i, "iElementId": ele["iElementTextId"] }];
                    return { "index": i, ...ele };
                }
            });
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
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: arrValues,// contains mapping keys
                    ["TextElements"]: arrNewTextElements
                },
                ["ElementValues"]: arrElementValues, // holds actual element json
                ["indexes"]: arrIndexes
            };
            var objContainerProperties = objContext.CMSMultiPageElement_Editor_ModuleProcessor.GetSliderContainerProperties(objContext);
            if (objContainerProperties["vContainerElementProperties"]["iElementHeight"] > 0 &&
                objContainerProperties["vContainerElementProperties"]["iElementWidth"] > 0) {
                objElementJson = { ...objElementJson, ...objContainerProperties };
            }
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetContextMenuOptions": (intElementTextId) => {
            return objContext.CMSMultiPageElement_Editor_ModuleProcessor.GetContextMenuOptions(objContext);
        },
        "OpenAddPopup": () => {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.OpenAddPopup(objContext);
        },
        "AddEmptySlide": () => {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddEmptySlide(objContext);
        },
        "UpdateElementJson": (objElementJson) => {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
        },
        "ClearImage": () => {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.ClearImage(objContext);
        },
        "ShowHeader": (objElementJson) => {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.ShowHeader(objContext, objElementJson);
        },
        "DeleteElement": () => {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.DeleteElement(objContext);
        },
        "GetElementJsonForCopy": async () => {
            let arrValues = objContext.state.ElementJson.vElementJson.Values;
            for (var i = 0; i < arrValues.length; i++) {
                var elementJson = arrValues[i];
                if (elementJson.vElementTypeName.toLowerCase() === "image" && elementJson.Ref.current && elementJson.Ref.current.GetElementJson) {
                    arrValues[i] = await elementJson.Ref.current.GetElementJson();
                }
            }
            let arrElementValues = arrValues.filter(ele => ele.vElementTypeName.toLowerCase() !== "text");
            let arrTextElements = []; let arrHeaderValues = [];
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["HeaderValues"].length; intCount++) {
                if (objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"] !== null) {
                    let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === objContext.state.ElementJson["vElementJson"]["HeaderValues"][intCount]["iElementTextId"]);
                    let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                    arrTextElements = [
                        ...arrTextElements,
                        objNewTextElementJson
                    ];
                    arrHeaderValues = [...arrHeaderValues, {
                        ...objTempData,
                        ["iElementTextId"]: objNewTextElementJson["iElementId"]
                    }];
                }
                else {
                    arrHeaderValues = [...arrHeaderValues, objTempData];
                }
            }
            // Creating mapping keys for element's inside Values array and actual json is moved to ElementValues.
            for (var iCount = 0; iCount < arrValues; iCount++) {
                if (arrValues[iCount].vElementTypeName.toLowerCase() !== "text") {
                    arrValues = [...arrValues, { "index": i, [`iElement${arrValues[iCount].vElementTypeName}Id`]: arrValues[iCount].iElementId, ['vElementTypeName']: arrValues[iCount].vElementTypeName }];
                }
                else {
                    let objTextElementJson = objContext.state.ElementJson["vElementJson"]["TextElements"].find(objTempTextElement => objTempTextElement["iElementId"] === ele["iElementTextId"]);
                    let objNewTextElementJson = await objTextElementJson.Ref.current.GetElementJsonForCopy();
                    arrTextElements = [
                        ...arrTextElements,
                        objNewTextElementJson
                    ];
                    arrValues = [...arrValues, {
                        "index": i,
                        ...arrValues[iCount],
                        ["iElementTextId"]: objNewTextElementJson["iElementId"]
                    }];
                }
            }
            //var { ElementJson, ...vElementJson } = objContext.state.ElementJson["vElementJson"];
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: arrValues,// contains mapping keys
                    ["HeaderValues"]: arrHeaderValues,
                    ["ElementValues"]: arrElementValues, // holds actual element json
                    ["TextElements"]: arrTextElements
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}
