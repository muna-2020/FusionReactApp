//Module related fies.
import CMSGenericDragDrop_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_Editor/CMSGenericDragDrop_Editor_ContextMenu";
import * as CMSGenericDragDrop_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_Editor/CMSGenericDragDrop_Editor_MetaData";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSGenericDragDrop_Editor_ModuleProcessor
 * @summary Contains the GenericDragDrop's editor version module specific methods.
 */
class CMSGenericDragDrop_Editor_ModuleProcessor extends CMSGenericDragDrop_Editor_ContextMenu {

    /**
     * @name PreserveTextState
     * @param {object} objContext {state, props, dispatch}.
     * @param {object} objState state to be preserved.
     * @summary Preserving text state for undo-redo purpose.
     */
    PreserveTextState(objContext, objState) {
        objContext.Element_UndoRedoDataRef.current = {
            ...objContext.Element_UndoRedoDataRef.current,
            [objState.ElementJson.iElementId]: { ...objState }
        };
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.PreserveElementState) {
            objContext.props.ParentRef.current.PreserveElementState({ ...objContext.state, TextState: objContext.Element_UndoRedoDataRef.current });
        }
    }

    BringOnTop(objParams) {
        let { objContext, Value } = objParams;
        let arrDragObjects = objContext.state.ElementJson["vElementJson"]["DragObjects"].filter(x => x["iElementGenericDragObjectId"] !== Value["iElementGenericDragObjectId"]);
        arrDragObjects = [
            ...arrDragObjects,
            Value
        ];
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DragObjects"]: BaseCMSElement.UpdateDisplayOrder(arrDragObjects)
                    }
                }
            }
        });
    }

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name AddDragObject
     * @param {object} objParams {objContext, strElementTypeName, intLeft, intTop, objAdditionalProperties}
     * @summary Adds a Drag Object to the holder.
     */
    async AddDragObject(objParams) {
        let { objContext, strElementTypeName, objElementJson } = objParams
        if (strElementTypeName.toLowerCase() === "text") {
            objElementJson = await CMSGenericDragDrop_Editor_MetaData.GetTextElementJson();
        }
        else {
            objElementJson = CMSGenericDragDrop_Editor_MetaData.GetRefAttachedToElement(objElementJson);
        }
        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        let objDragObject = CMSGenericDragDrop_Editor_MetaData.GetDragObjectJson(objElementJson);
        if (strElementTypeName.toLowerCase() === "text") {
            objDragObject = {
                ...objDragObject,
                ["iWidth"]: 50,
                ["iHeight"]: 34
            };
        }
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DragObjects"]: [
                            ...objContext.state.ElementJson["vElementJson"]["DragObjects"],
                            { ...objDragObject }
                        ]
                    },
                    ["MappedElements"]: [
                        ...objContext.state.ElementJson["MappedElements"],
                        {
                            ...objElementJson
                        }
                    ]
                }
            }
        });
    }

    /**
     * @name OpenMultiMediaPopUp
     * @param {object} objParams {objContext: { state, dispatch, props, CMSGenericDragDrop_Editor_ModuleProcessor }}.
     * @summary Opens up the multimedia media add edit popup.
     * */
    OpenMultiMediaPopUp(objParams) {
        let { objContext, strElementTypeName } = objParams;
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": strElementTypeName,
                "FolderID": objContext.props.FolderID,
                "ComponentController": objContext.props.ComponentController
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": '602px',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "GetElementJson": (objElementJson) => {
                    objContext.CMSGenericDragDrop_Editor_ModuleProcessor.AddDragObject({ objContext, strElementTypeName, objElementJson: { ...objElementJson, ["iOrder"]: 1 } });
                }
            }
        });
    }

    /**
     * @name DeleteElement
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
     * @param {number} intElementId iElementId of the element to be deleted
     * @summary Deletes the element from the holder
     */
    DeleteElement(objContext, intElementId) {
        let objMappedElementJson = objContext.state.ElementJson["MappedElements"].find(x => x["iElementId"] === intElementId);
        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DragObjects"]: objContext.state.ElementJson["vElementJson"]["DragObjects"].filter(x => x["iElement" + objMappedElementJson["vElementTypeName"] + "Id"] !== intElementId)
                    },
                    ["MappedElements"]: objContext.state.ElementJson["MappedElements"].filter(x => x["iElementId"] !== intElementId)
                }
            }
        });
    }

    // /**
    //  * @name ActivateElement
    //  * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
    //  * @param {number} intElementId ElementId of mapped element
    //  * @summary Activates the element.
    //  */
    // ActivateElement(objContext, intElementId) {
    //     objContext.dispatch({
    //         "type": "SET_STATE",
    //         "payload": {
    //             "ElementFocused": intElementId,
    //         },
    //         blnUndoRedoUpdate: false
    //     });
    // }

    SetDrag(objContext) {
        if (objContext.ActiveObjectRef.current !== null && objContext.ActiveObjectRef.current["type"].toLowerCase() === "drag_object") {
            let objDragObject = objContext.state.ElementJson["vElementJson"]["DragObjects"].find(x => x["iElementGenericDragObjectId"] === objContext.ActiveObjectRef.current["id"]);
            if (objDragObject["vElementTypeName"].toLowerCase() === "image") {
                objContext.dispatch({
                    "type": "SET_STATE",
                    "payload": {
                        "ElementJson": {
                            ...objContext.state.ElementJson,
                            ["vElementJson"]: {
                                ...objContext.state.ElementJson["vElementJson"],
                                ["DragObjects"]: [
                                    ...objContext.state.ElementJson["vElementJson"]["DragObjects"].map(x => {
                                        if (x["iElementGenericDragObjectId"] === objContext.ActiveObjectRef.current["id"]) {
                                            return {
                                                ...x,
                                                ["cIsDraggable"]: "Y"
                                            };
                                        }
                                        else {
                                            return {
                                                ...x
                                            };
                                        }
                                    })
                                ]
                            }
                        }
                    }
                });
            }
            else {
                objContext.ActiveObjectRef.current = null;
            }
        }
        else {
            objContext.ActiveObjectRef.current = null;
        }
    }

    SetDrop(objContext) {
        let objDropObject = CMSGenericDragDrop_Editor_MetaData.GetDropObjectJson();
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DropObjects"]: [
                            ...objContext.state.ElementJson["vElementJson"]["DropObjects"],
                            { ...objDropObject }
                        ]
                    }
                }
            }
        });
    }

    ClearDrag(objContext) {
        if (objContext.ActiveObjectRef.current !== null && objContext.ActiveObjectRef.current["type"].toLowerCase() === "drag_object") {
            let objDragObject = objContext.state.ElementJson["vElementJson"]["DragObjects"].find(x => x["iElementGenericDragObjectId"] === objContext.ActiveObjectRef.current["id"]);
            if (objDragObject["vElementTypeName"].toLowerCase() === "image" && objDragObject["cIsUsed"] === "N") {
                objContext.dispatch({
                    "type": "SET_STATE",
                    "payload": {
                        "ElementJson": {
                            ...objContext.state.ElementJson,
                            ["vElementJson"]: {
                                ...objContext.state.ElementJson["vElementJson"],
                                ["DragObjects"]: [
                                    ...objContext.state.ElementJson["vElementJson"]["DragObjects"].map(x => {
                                        if (x["iElementGenericDragObjectId"] === objContext.ActiveObjectRef.current["id"]) {
                                            return {
                                                ...x,
                                                ["cIsDraggable"]: "N"
                                            };
                                        }
                                        else {
                                            return {
                                                ...x
                                            };
                                        }
                                    })
                                ]
                            }
                        }
                    }
                });
            }
            else {
                objContext.ActiveObjectRef.current = null;
            }
        }
        else {
            objContext.ActiveObjectRef.current = null;
        }
    }

    ClearDrop(objContext) {
        if (objContext.ActiveObjectRef.current !== null && objContext.ActiveObjectRef.current["type"].toLowerCase() === "drop_object") {
            let objTempDropObject = objContext.ActiveObjectRef.current;
            objContext.ActiveObjectRef.current = null;
            let objDropObject = objContext.state.ElementJson["vElementJson"]["DropObjects"].find(x => x["iElementGenericDropObjectId"] === objTempDropObject["id"]);
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            ["DragObjects"]: objContext.state.ElementJson["vElementJson"]["DragObjects"].map(x => {
                                if (objDropObject["DraggedObjects"].filter(y => y === x["iElementGenericDragObjectId"]).length > 0) {
                                    return {
                                        ...x,
                                        "cIsUsed": "N"
                                    };
                                }
                                return {
                                    ...x
                                };
                            }),
                            ["DropObjects"]: objContext.state.ElementJson["vElementJson"]["DropObjects"].filter(x => x["iElementGenericDropObjectId"] !== objTempDropObject["id"])
                        }
                    }
                }
            });
        }
        else {
            objContext.ActiveObjectRef.current = null;
        }
    }

    RegisterDragObjectInDropObejct(objContext, intDropObjectId, intDragObjectId) {
        let arrDragObjects = objContext.state.ElementJson["vElementJson"]["DragObjects"].map(x => {
            if (x["iElementGenericDragObjectId"] === intDragObjectId) {
                return {
                    ...x,
                    ["cIsUsed"]: "Y"
                };
            }
            return {
                ...x
            };
        });
        let arrDropObjects = objContext.state.ElementJson["vElementJson"]["DropObjects"].map(x => {
            if (x["iElementGenericDropObjectId"] === intDropObjectId) {
                if (!x["DraggedObjects"].includes(y => y === intDragObjectId)) {
                    return {
                        ...x,
                        ["DraggedObjects"]: [...x["DraggedObjects"], intDragObjectId]
                    };
                }
            }
            return {
                ...x
            };
        });
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DragObjects"]: arrDragObjects,
                        ["DropObjects"]: arrDropObjects
                    }
                }
            }
        });
    }

    DeRegisterDragObjectFromDropObejct(objContext, intDropObjectId, intDragObjectId) {
        let arrDragObjects = objContext.state.ElementJson["vElementJson"]["DragObjects"].map(x => {
            if (x["iElementGenericDragObjectId"] === intDragObjectId) {
                return {
                    ...x,
                    ["cIsUsed"]: "N"
                };
            }
            return {
                ...x
            };
        });
        let arrDropObjects = objContext.state.ElementJson["vElementJson"]["DropObjects"].map(x => {
            if (x["iElementGenericDropObjectId"] === intDropObjectId) {
                return {
                    ...x,
                    "DraggedObjects": x["DraggedObjects"].filter(y => y !== intDragObjectId)
                };
            }
            return {
                ...x
            };
        });
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["DragObjects"]: arrDragObjects,
                        ["DropObjects"]: arrDropObjects
                    }
                }
            }
        });
    }

    /**
     * @name SaveElementPosition
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
     * @param {number} intLeft X Coordinate
     * @param {number} intTop Y Coordinate
     * @summary Saves the element position.
     */
    SaveElementPosition(objContext, intLeft, intTop, intObjectId, strKey) {
        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        [strKey + "Objects"]: [
                            ...objContext.state.ElementJson["vElementJson"][strKey + "Objects"].map(x => {
                                if (x["iElementGeneric" + strKey + "ObjectId"] === intObjectId) {
                                    return {
                                        ...x,
                                        ["Top"]: intTop,
                                        ["Left"]: intLeft
                                    };
                                }
                                else {
                                    return {
                                        ...x
                                    };
                                }
                            })
                        ]
                    }
                }
            }
        });
    }

    /**
     * @name GetMappedElementProps
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
     * @param {object} objElementJson Element json of mapped element.
     * @summary Returns props for mapped element.
     */
    GetMappedElementProps(objContext, objElementJson) {
        let objElementProps = {
            ...(objContext.props.IsForServerRenderHtml ? objContext.props : {}),
            "Mode": objContext.props.Mode,
            "ContainerId": objContext.props.ContainerId,
            "ParentRef": objContext.props.ElementRef,
            "PageId": objContext.props.PageId,
            "ElementRef": objElementJson.Ref,
            "ComponentController": objContext.props.ComponentController,
            "ElementJson": objElementJson,
            "JConfiguration": objContext.props.JConfiguration,
            // "PreservedState": Container_UndoRedoDataRef.current[ElementJson["iElementId"]]
        };
        return objElementProps;
    }

    /**
     * @name ResizeHolder
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
     * @param {number} intHeight Height
     * @param {number} intWidth Width
     * @summary Resizes the main holder.
     */
    ResizeHolder(objContext, intHeight, intWidth) {
        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                    }
                }
            }
        });
    }

    /**
     * @name Resize
     * @param {object} objContext {state, props, dispatch, CMSGenericDragDrop_Editor_ModuleProcessor}
     * @summary Resizes the every drag object, drop object and holder.
     */
    Resize(objContext) {
        objContext.CMSGenericDragDrop_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        let objHolderArea_BoundingRects = objContext.HolderArea.current.getBoundingClientRect();
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        "iHeight": objHolderArea_BoundingRects.height,
                        "iWidth": objHolderArea_BoundingRects.width,
                        "DragObjects": [
                            ...objContext.state.ElementJson["vElementJson"]["DragObjects"].map(x => {
                                if (x["vElementTypeName"].toLowerCase() === "text") {
                                    let objDragObject_BoundingRects = x["DivRef"].current.getBoundingClientRect();
                                    return {
                                        ...x,
                                        ["iHeight"]: objDragObject_BoundingRects.height,
                                        ["iWidth"]: objDragObject_BoundingRects.width
                                    };
                                }
                                else {
                                    return {
                                        ...x
                                    };
                                }
                            })
                        ],
                        "DropObjects": [
                            ...objContext.state.ElementJson["vElementJson"]["DropObjects"].map(x => {
                                let objDropObject_BoundingRects = x["DivRef"].current.getBoundingClientRect();
                                return {
                                    ...x,
                                    ["iHeight"]: objDropObject_BoundingRects.height,
                                    ["iWidth"]: objDropObject_BoundingRects.width
                                };
                            })
                        ]
                    }
                }
            }
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSGenericDragDrop/CMSGenericDragDropStyles.css"
        ];
    }
}

export default CMSGenericDragDrop_Editor_ModuleProcessor;
