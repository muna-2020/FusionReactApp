//React Imports
import { useEffect, useImperativeHandle } from 'react';

//UndoRedo imports
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//UniqueId import
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

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
        "ElementJson": props.ElementJson,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "InputValue": ""
    }, props);
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSInput_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useUndoRedo(objContext);
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
    EditorBase_Hook.useRenderComplete(objContext);
};

/**
 * @name useUndoRedo
 * @param {object} objContext {state, props, dispatch, CMSInput_Editor_ModuleProcessor}
 * @summary Undo redo custom hook.
 */
function useUndoRedo(objContext) {
    useEffect(() => {
        if (objContext.props.PreserveElementState) {
            objContext.props.PreserveElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSInput_Editor_ModuleProcessor}
 * @summary Data Loaded custom hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            let strInputValue = "";
            if (objContext.props.ElementJson["vElementJson"]["iTextFieldType"] === 5 || objContext.props.ElementJson["vElementJson"]["iTextFieldType"] === 6 || objContext.props.ElementJson["vElementJson"]["iTextFieldType"] === 7) {
                strInputValue = objContext.props.ElementJson["vElementJson"]["Values"][0]["vText"];
            }
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": objContext.props.ElementJson,
                    "InputValue": strInputValue,
                },
                blnUndoRedoUpdate: false
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, CMSInput_Editor_ModuleProcessor}
 * @summary Imperative Methods custom hook.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        "UndoRedo": (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch);
        }
    }), [objContext.state]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async () => {
            let objElementJson = {
                ...objContext.state.ElementJson
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "GetElementJsonForCopy": async () => {
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["iElementId"]: UniqueId.GetUniqueId()
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSInput_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);
}
