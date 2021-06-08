//React Imports
import React, { useEffect, useImperativeHandle } from "react";

// UndoRedo Imports.
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Contains the initial local state.
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        "ContainerJson": {
            ...props.ContainerJson,
            ["ContainerTemplate_Ref"]: React.createRef(),
            ["Elements"]: GetContainerJsonForTemplate(props)
        },
        "ComponentKey": props.ComponentKey,
        "PageId": props.PageId,
        "isLoadComplete": false
    }, props);
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
}

/**
 * @name useUndoRedo
 * @param {object} objContext passes Context Object
 * @summary Undo redo related stuff.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.ParentRef && objContext.props.ParentRef.current && objContext.props.ParentRef.current.PreserveContainerState) {
            objContext.props.ParentRef.current.PreserveContainerState({ ...objContext.state, ElementState: objContext.Container_UndoRedoDataRef.current });
        }
    }, [objContext.state.StateHistory]);
}

/**
 * @name useDataLoaded
 * @param {object} objContext passes Context Object
 * @summary Data loaded custom hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ContainerJson) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ContainerJson": {
                        ...objContext.props.ContainerJson,
                        ["Elements"]: GetContainerJsonForTemplate(objContext.props)
                    },                  
                },
                "blnUndoRedoUpdate": false
            });
        }
    }, [objContext.props.ContainerJson]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext passes Context Object
 * @summary this contains the set of methods which can be accessed by the parent
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.Container_HandlerRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "GetContainerJson": async (strDataFor) => {
            let arrElement = [];
            for (var i = 0; i < objContext.state.ContainerJson.Elements.length; i++) {
                if (objContext.state.ContainerJson.Elements[i].Ref.current !== null && objContext.state.ContainerJson.Elements[i].Ref.current.GetElementJson) {
                    let objElementJSON = await objContext.state.ContainerJson.Elements[i].Ref.current.GetElementJson(true, strDataFor);
                    if (!strDataFor && strDataFor !== "preview") {
                        if (objElementJSON.iElementTypeId === 1 && objElementJSON.vElementJson.isQuestionOrAnswerType && objElementJSON.vElementJson.isQuestionOrAnswerType != null) {
                            let objOldElementJson = objContext.state.ContainerJson.Elements.find(objTemp => objTemp.iElementId === objElementJSON.iElementId);
                            if (objOldElementJson.vElementJson.vText !== objElementJSON.vElementJson.vText) {
                                arrElement = [...arrElement, objElementJSON];
                            } else if (!objOldElementJson.vJsonType) {
                                arrElement = [...arrElement, objElementJSON];
                            }
                        } else {
                            arrElement = [...arrElement, objElementJSON];
                        }
                    } else {
                        arrElement = [...arrElement, objElementJSON];
                    }
                }
            }
            let objContainerJson = {
                ...objContext.state.ContainerJson,
                "Elements": arrElement
            };
            objContainerJson = BaseCMSElement.RemoveRefKeyFromJson(objContainerJson);
            return objContainerJson;
        },
        "SpellCheckUpdate": (objContainer) => {
            objContext.CMSContainer_Editor_ModuleProcessor.ContainerSpellCheckUpdate(objContext, objContainer);
        },
        "GetContainerId": () => {
            return objContext.state.ContainerJson.iContainerId;
        },
        "GetContextMenuOptions": (intElementId) => {
            return objContext.CMSContainer_Editor_ModuleProcessor.GetContextMenuOptions(objContext, false, null);
        },
        "PreserveElementState": (State) => {
            objContext.CMSContainer_Editor_ModuleProcessor.PreserveElementState(objContext, State);
        },
        "DeleteElement": (intElementId, blnShowPopup = true) => {
            objContext.CMSContainer_Editor_ModuleProcessor.ShowDeleteElementPopup(objContext, intElementId, blnShowPopup);
        },
        "ReplaceElement": (iElementId, objNewElementJson) => {
            objContext.props.ParentRef.current.SetTaskEditStatus();
            objContext.CMSContainer_Editor_ModuleProcessor.ReplaceElement(objContext, iElementId, objNewElementJson);
        },
        "SetTaskEditStatus": () => {
            objContext.props.ParentRef.current.SetTaskEditStatus();
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSContainer_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        },
        "GetContainerJsonForCopy": async () => {
            let arrElements = [];
            for (let i = 0; i < objContext.state["ContainerJson"]["Elements"].length; i++) {
                if (objContext.state["ContainerJson"]["Elements"][i]["Ref"].current !== null && objContext.state["ContainerJson"]["Elements"][i]["Ref"].current.GetElementJsonForCopy) {
                    let objTempElementJson = await objContext.state["ContainerJson"]["Elements"][i]["Ref"].current.GetElementJsonForCopy();
                    arrElements = [
                        ...arrElements,
                        {
                            ...objTempElementJson
                        }
                    ]
                }
            }
            let objContainerJson = {
                ...objContext.state.ContainerJson,
                ["iContainerId"]: UniqueId.GetUniqueId(),
                ["Elements"]: arrElements
            };
            objContainerJson = BaseCMSElement.RemoveRefKeyFromJson(objContainerJson);
            return objContainerJson;
        },
        "AddElement": (intOrder, strElementType) => {
            objContext.CMSContainer_Editor_ModuleProcessor.OnPlaceholderDrop(objContext, strElementType, intOrder);
        },
        "ShowCalculator": () => {
            objContext.CMSContainer_Editor_ModuleProcessor.ShowCalculator(objContext);
        },
        "GetContainerData": () => {
            return objContext.state.ContainerJson;
        }
    }), [objContext.state, objContext.props]);
}

/**
 * @name GetContainerJsonForTemplate
 * @param {object} props Component Props.
 * @summary This methods adds the ref to the ElementJson.
 * @returns {Array} Element's Array with Ref property to hold the Element component References.
 */
const GetContainerJsonForTemplate = (props) => {
    let arrModifiedElements = [];
    if (props.ContainerJson.Elements && props.ContainerJson.Elements.length > 0) {
        props.ContainerJson.Elements.forEach(objElementJson => {
            let objModifiedElementJson = BaseCMSElement.AttachRef(objElementJson);
            arrModifiedElements = [
                ...arrModifiedElements,
                {
                    ...objModifiedElementJson
                }
            ];
        });
    }
    return arrModifiedElements;
};

