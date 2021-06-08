//React Imports
import { useEffect, useImperativeHandle } from 'react';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "ElementJson": props.ElementJson,
        "PageId": props.PageId
    }
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @summary Resets the element json in the state with the new data.
     */
    useEffect(() => {
        if (objContext.props.ElementJson) {
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objContext.props.ElementJson } });
        }
    }, [objContext.props.ElementJson]);

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": () => {
            let objElementJson = {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"]
                }
            };
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "SpellCheckUpdate": (objCheckedElementJson) => { //optional needed if element has Text_Editor.
            objContext.CMSCheckbox_Editor_ModuleProcessor.ElementSpellCheckUpdate(objContext, objCheckedElementJson);
        },
        "GetContextMenuOptions": (intElementTextId) => {
            return objContext.CMSSample_Editor_ModuleProcessor.GetContextMenuOptions(objContext, { "Value": arrData[0], "Type": strType });
        }
    }), [objContext.state, objContext.props]);
}
