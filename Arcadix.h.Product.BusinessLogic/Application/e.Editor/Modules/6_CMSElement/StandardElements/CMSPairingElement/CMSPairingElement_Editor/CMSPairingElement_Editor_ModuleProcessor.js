import React from 'react';

//Module related fies.
import CMSPairingElement_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_Editor/CMSPairingElement_Editor_ContextMenu";

import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSPairingElement_Editor_ModuleProcessor
 * @summary Contains the PairingElement's editor version module specific methods.
 * */
class CMSPairingElement_Editor_ModuleProcessor extends CMSPairingElement_Editor_ContextMenu {

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

    /**
     * @name AddPairingElement
     * @param {object} objParams {objContext, objPairingElement, objElementJson}
     * @summary Adds pairing element.
     */
    AddPairingElement(objParams) {
        let { objContext, objPairingElement, objElementJson } = objParams;
        let { vPairingElementTypeName } = objPairingElement;
        let iMinResizeHeight = objContext.state.ElementJson.vElementJson.iMinResizeHeight;
        let iMinResizeWidth = objContext.state.ElementJson.vElementJson.iMinResizeWidth;
        let arrElementValues = [...objContext.state.ElementJson.MappedElements];
        let arrPairingElements = [...objContext.state.ElementJson.vElementJson.PairingElements, objPairingElement];
        let arrTextElements = [...objContext.state.ElementJson.vElementJson.TextElements];
        if (objElementJson) {
            objElementJson = BaseCMSElement.AttachRef(objElementJson);
            arrElementValues = [...arrElementValues, objElementJson];
        }
        if (vPairingElementTypeName.toLowerCase() === "text") {
            arrTextElements = [...arrTextElements, { ...CMSText_Editor_MetaData.GetDefaultElementJson(1, objPairingElement["iPairingElementId"]), ["Ref"]: React.createRef() }];
        }
        if (objPairingElement["StyleProperties"]["top"] > iMinResizeHeight) {
            iMinResizeHeight = objPairingElement["StyleProperties"]["top"];
        }
        if (objPairingElement["StyleProperties"]["left"] > iMinResizeWidth) {
            iMinResizeWidth = objPairingElement["StyleProperties"]["left"];
        }
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["PairingElements"]: arrPairingElements,
                        ["TextElements"]: arrTextElements,
                        ["iMinResizeHeight"]: iMinResizeHeight,
                        ["iMinResizeWidth"]: iMinResizeWidth
                    },
                    ["MappedElements"]: arrElementValues
                },
                "strSelectedPairingType": null
            }
        });
        objContext.CMSPairingElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name HandlePairingContainerClick
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @param{object} objPairingElement {elementtype, styleproperties}
     * @summary add the dropped element to container.
     */
    HandlePairingContainerClick(objContext, objPairingElement) {
        if (objPairingElement["vPairingElementTypeName"].toLowerCase() === "image") {
            objContext.CMSPairingElement_Editor_ModuleProcessor.OpenMultiMediaPopUp({ objContext, objPairingElement });
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": { "strSelectedPairingType": null, }
            });
        }
        else {
            objContext.CMSPairingElement_Editor_ModuleProcessor.AddPairingElement({ objContext, objPairingElement });
        }
    }

    /**
     * @name OpenMultiMediaPopUp
     * @param {object} objParams {objContext: { state, dispatch, props, CMSPairingElement_Editor_ModuleProcessor }}.
     * @summary Opens up the multimedia media add edit popup.
     * */
    OpenMultiMediaPopUp(objParams) {
        let { objContext, objPairingElement } = objParams;
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": objPairingElement["vPairingElementTypeName"],
                //"FolderID": objContext.props.FolderID,
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
                    if (objElementJson) {
                        objContext.CMSPairingElement_Editor_ModuleProcessor.AddPairingElement({
                            objContext, objPairingElement: {
                                ...objPairingElement,
                                ["iPairingElementId"]: objElementJson["iElementId"],
                                //[`iElement${objPairingElement["vPairingElementTypeName"]}Id`]: objElementJson["iElementId"],
                                //["vElementTypeName"]: objPairingElement["vPairingElementTypeName"]
                            }, objElementJson
                        });
                    }
                }
            }
        });
    }

    /**
     * @name DeleteElement
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @param {number} intElementId iElementId of the element to be deleted
     * @summary Deletes the element from the holder
     */
    DeleteElement(objContext, intElementId) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["PairingElements"]: objContext.state.ElementJson["vElementJson"]["PairingElements"].filter(x => x.iPairingElementId !== intElementId)
                    },
                    ["MappedElements"]: objContext.state.ElementJson["MappedElements"].filter(x => x["iElementId"] !== intElementId)
                }
            }
        });
        objContext.CMSPairingElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name SaveElementPosition
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @param {object} objPairingElemenet {elementid, styleproperties}
     * @summary Saves the element position.
     */
    SaveElementPosition(objContext, objPairingElement) {
        var arrPairingElements = [...objContext.state.ElementJson["vElementJson"]["PairingElements"].filter(x => x["iPairingElementId"] !== objPairingElement["iPairingElementId"]), objPairingElement];
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["PairingElements"]: arrPairingElements
                    }
                }
            }
        });
        objContext.CMSPairingElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name DeletePairingElement
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @summary deletes pairing elements includes circle and polyline
     */
    DeletePairingElement(objContext) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "Values": objContext.state.ElementJson.vElementJson.Values.filter(x => x.iPolylineId !== objContext.state.iSelectedPairingElement && x.iStartPairingId !== objContext.state.iSelectedPairingElement && x.iEndPairingId !== objContext.state.iSelectedPairingElement),
                        "PairingElements": objContext.state.ElementJson.vElementJson.PairingElements.filter(x => x.iPairingElementId !== objContext.state.iSelectedPairingElement),
                    }
                },
                iSelectedPairingElement: null
            }
        })

    }

    /**
     * @name UpdateElementJson
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @param {any} objElementJson element json
     */
    UpdateElementJson(objContext, objElementJson, iPreviousElementId) {
        var objPairingElement = objContext.state.ElementJson.vElementJson.PairingElements.find(x => x.iPairingElementId === iPreviousElementId);
        objElementJson = BaseCMSElement.AttachRef(objElementJson);
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vElementJson": {
                        ...objContext.state.ElementJson.vElementJson,
                        "PairingElements": [...objContext.state.ElementJson.vElementJson.PairingElements.filter(x => x.iPairingElementId !== iPreviousElementId), {
                            ...objPairingElement, ["iPairingElementId"]: objElementJson["iElementId"]
                        }]
                    },
                    "MappedElements": [...objContext.state.ElementJson.MappedElements.filter(x => x.iElementId !== iPreviousElementId), objElementJson]
                }
            }
        });
        objContext.CMSPairingElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name GetMappedElementProps
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
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
            "IsSubElement": "Y"
            // "PreservedState": Container_UndoRedoDataRef.current[ElementJson["iElementId"]]
        };
        return objElementProps;
    }

    /**
     * @name ResizeHolder
     * @param {object} objContext {state, props, dispatch, CMSPairingElement_Editor_ModuleProcessor}
     * @param {number} intHeight Height
     * @param {number} intWidth Width
     * @summary Resizes the main holder.
     */
    ResizeHolder(objContext, intHeight, intWidth) {
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["iHeight"]: intHeight,
                        ["iWidth"]: intWidth
                    }
                }
            }
        });
        objContext.CMSPairingElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name SetElementPosition
     * @param {object} objParams
     * @summary Allows user to set element as a background for another element.
     */
    SetElementPosition(objParams) {
        let { objContext, ElementDetails, cIsSetAsBackground } = objParams;
        if (objContext.state.cIsEditEnabled === "Y") {
            let arrPairingElement = [...objContext.state.ElementJson.vElementJson.PairingElements];
            let index = arrPairingElement.findIndex(e => e.iPairingElementId === ElementDetails.value);
            arrPairingElement[index] = { ...arrPairingElement[index], "cIsSetAsBackground": cIsSetAsBackground };
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        "vElementJson": {
                            ...objContext.state.ElementJson.vElementJson,
                            "PairingElements": arrPairingElement
                        }
                    },
                    "cIsEditEnabled": "N"
                }
            });
        }
    }

    /**
     * @name HandleElementEdit
     * @param {any} objParams
     * @summary Element position can be changed only if edit is enabled. Edit enable and disbale will be handled here. 
     */
    HandleElementEdit(objParams) {
        let { objContext } = objParams;
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "cIsEditEnabled": objContext.state.cIsEditEnabled === "N" ? "Y" : "N",
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
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSPairingElement/CMSPairingElementStyles.css"
        ];
    }
}

export default CMSPairingElement_Editor_ModuleProcessor;
