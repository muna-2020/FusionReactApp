//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let objElementJson = {
        ...props.ElementJson,
        "vElementJson": {
            ...props.ElementJson["vElementJson"],
            "DragObjects": [...props.ElementJson["vElementJson"]["DragObjects"].map(x => {
                return {
                    ...x,
                    ["DivRef"]: React.createRef()
                };
            })],
            "DropObjects": [...props.ElementJson["vElementJson"]["DropObjects"].map(x => {
                return {
                    ...x,
                    ["DivRef"]: React.createRef()
                };
            })]
        },
        "MappedElements": [...props.ElementJson["MappedElements"].map(x => {
            let objMappedElementJson = BaseCMSElement.AttachRef(x);
            return {
                ...objMappedElementJson
            };
        })]
    };
    return UndoRedoInitialize({
        "ElementJson": objElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "ElementFocused": null
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useUndoRedo(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {
    EditorState.SetProperty("ActiveGenericDragDrop", objContext.GDDRef);
    useEffect(() => {
        if (objContext.props.ElementJson) {
            let objElementJson = {
                ...objContext.props.ElementJson,
                "vElementJson": {
                    ...objContext.props.ElementJson["vElementJson"],
                    "DragObjects": [...objContext.props.ElementJson["vElementJson"]["DragObjects"].map(x => {
                        return {
                            ...x,
                            ["DivRef"]: React.createRef()
                        };
                    })],
                    "DropObjects": [...objContext.props.ElementJson["vElementJson"]["DropObjects"].map(x => {
                        return {
                            ...x,
                            ["DivRef"]: React.createRef()
                        };
                    })]
                },
                "MappedElements": [...objContext.props.ElementJson["MappedElements"].map(x => {
                    let objMappedElementJson = BaseCMSElement.AttachRef(x);
                    return {
                        ...objMappedElementJson
                    };
                })]
            };
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": objElementJson,
                },
                blnUndoRedoUpdate: false
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
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
 * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef = true, strDataFor = null) => {
            let arrTextElements = [...objContext.state.ElementJson["vElementJson"]["TextElements"]];
            let arrNewTextElements = [];
            let arrMappedElements = [];
            let arrDragObjects = [];
            let arrDropObjects = [];
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
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["DragObjects"].length; intCount++) {
                let { DivRef, ...objDragObject } = objContext.state.ElementJson["vElementJson"]["DragObjects"][intCount];
                let strMappedElementTypeName = objContext.state.ElementJson["vElementJson"]["DragObjects"][intCount]["vElementTypeName"];
                let intMappedElementId = objContext.state.ElementJson["vElementJson"]["DragObjects"][intCount]["iElement" + strMappedElementTypeName + "Id"];
                let objMappedElementJson = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === intMappedElementId);
                if (objMappedElementJson.Ref.current !== null && objMappedElementJson.Ref.current.GetElementJson) {
                    objMappedElementJson = await objMappedElementJson.Ref.current.GetElementJson();
                }
                arrMappedElements = [
                    ...arrMappedElements,
                    objMappedElementJson
                ];
                if (objDragObject["vElementTypeName"].toLowerCase() === "text") {
                    let objDragObject_BoundingRects = DivRef.current.getBoundingClientRect();
                    arrDragObjects = [
                        ...arrDragObjects,
                        {
                            ...objDragObject,
                            ["iHeight"]: objDragObject_BoundingRects.height,
                            ["iWidth"]: objDragObject_BoundingRects.width
                        }
                    ];
                }
                else {
                    arrDragObjects = [
                        ...arrDragObjects,
                        objDragObject
                    ];
                }
            }
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["DropObjects"].length; intCount++) {
                let { DivRef, ...objDropObject } = objContext.state.ElementJson["vElementJson"]["DropObjects"][intCount];
                let objDropObject_BoundingRects = DivRef.current.getBoundingClientRect();
                arrDropObjects = [
                    ...arrDropObjects,
                    {
                        ...objDropObject,
                        ["iHeight"]: objDropObject_BoundingRects.height,
                        ["iWidth"]: objDropObject_BoundingRects.width
                    }
                ];
            }
            let objBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["iHeight"]: objBoundingRects.height,
                    ["iWidth"]: objBoundingRects.width,
                    ["DragObjects"]: arrDragObjects,
                    ["DropObjects"]: arrDropObjects,
                    ["TextElements"]: arrNewTextElements
                },
                ["MappedElements"]: arrMappedElements
            };
            console.log("GenericDragDrop ElementJson", objElementJson);
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetElementJsonForCopy": async () => {
            let arrHeaderValues = [];
            let arrDragObjects = [];
            let arrTextElements = [];
            let arrMappedElements = [];
            let arrDropObjects = [];
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
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["DragObjects"].length; intCount++) {
                let { DivRef, ...objDragObject } = objContext.state.ElementJson["vElementJson"]["DragObjects"][intCount];
                let intMappedElementId = objDragObject["iElement" + objDragObject["vElementTypeName"] + "Id"];
                let objMappedElementJson = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === intMappedElementId);
                if (objMappedElementJson.Ref.current !== null && objMappedElementJson.Ref.current.GetElementJsonForCopy) {
                    objMappedElementJson = await objMappedElementJson.Ref.current.GetElementJsonForCopy();
                }
                objDragObject["iElement" + objDragObject["vElementTypeName"] + "Id"] = objMappedElementJson["iElementId"];
                arrMappedElements = [
                    ...arrMappedElements,
                    objMappedElementJson
                ];
                if (objDragObject["vElementTypeName"].toLowerCase() === "text") {
                    let objDragObject_BoundingRects = DivRef.current.getBoundingClientRect();
                    arrDragObjects = [
                        ...arrDragObjects,
                        {
                            ...objDragObject,
                            ["iHeight"]: objDragObject_BoundingRects.height,
                            ["iWidth"]: objDragObject_BoundingRects.width
                        }
                    ];
                }
                else {
                    arrDragObjects = [
                        ...arrDragObjects,
                        objDragObject
                    ];
                }
            }
            for (let intCount = 0; intCount < objContext.state.ElementJson["vElementJson"]["DropObjects"].length; intCount++) {
                let { DivRef, ...objDropObject } = objContext.state.ElementJson["vElementJson"]["DropObjects"][intCount];
                let objDropObject_BoundingRects = DivRef.current.getBoundingClientRect();
                arrDropObjects = [
                    ...arrDropObjects,
                    {
                        ...objDropObject,
                        ["iHeight"]: objDropObject_BoundingRects.height,
                        ["iWidth"]: objDropObject_BoundingRects.width
                    }
                ];
            }
            let objBoundingRects = objContext.HolderArea.current.getBoundingClientRect();
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId(),
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["HeaderValues"]: arrHeaderValues,
                    ["iHeight"]: objBoundingRects.height,
                    ["iWidth"]: objBoundingRects.width,
                    ["DragObjects"]: arrDragObjects,
                    ["DropObjects"]: arrDropObjects,
                    ["TextElements"]: arrTextElements
                },
                ["MappedElements"]: arrMappedElements
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            console.log("GenericDragDrop ElementJson", objElementJson);
            return objElementJson;
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "DeleteElement": (intElementId) => {
            objContext.CMSGenericDragDrop_Editor_ModuleProcessor.DeleteElement(objContext, intElementId);
        },
        // "SpellCheckUpdate": (objCheckedElementJson) => { //optional needed if element has Text_Editor.
        //     objContext.CMSGenericDragDrop_Editor_ModuleProcessor.ElementSpellCheckUpdate(objContext, objCheckedElementJson);
        // },
        "GetContextMenuOptions": (blnShowAsSubMenu = false) => {
            return objContext.CMSGenericDragDrop_Editor_ModuleProcessor.GetContextMenuOptions(objContext, null, blnShowAsSubMenu);
        },
        "PreserveTextState": (objState) => {
            objContext.CMSGenericDragDrop_Editor_ModuleProcessor.PreserveTextState(objContext, objState);
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSGenericDragDrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);

    useImperativeHandle(objContext.GDDRef, () => ({
        "GenericDragDropHandle": (strOperation) => {
            switch (strOperation.toLowerCase()) {
                case "addimage":
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, strElementTypeName: "Image" });
                    break;
                case "addtext":
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.AddDragObject({ objContext, strElementTypeName: "Text" });
                    break;
                case "setdrag":
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.SetDrag(objContext);
                    break;
                case "setdrop":
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.SetDrop(objContext);
                    break;
                case "clear":
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.ClearDrag(objContext);
                    break;
                case "deletedroparea":
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.ClearDrop(objContext);
                    break;
            }
        }
    }), [objContext.state, objContext.props]);
}
