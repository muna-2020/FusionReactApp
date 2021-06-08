//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    return {
        "ElementJson": {
            ...props.ElementJson,
            "Ref": React.createRef()
        },
        "minWidth": 24,
        "minHeight": 24,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    }
};

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useImperativeMethods(objContext);
    EditorBase_Hook.useRenderComplete(objContext);
};

/**
 * @name useImperativeMethods
 * @param {object} objContext passes Context Object
 * @summary Imperative Methods Custom hook.
 */
function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async () => {
            let objElementJson = {
                ...objContext.state.ElementJson,
                "vElementJson": {
                    ...objContext.state.ElementJson.vElementJson,
                    "iHeight": objContext.clipArtImageRef.current.height,
                    "iWidth": objContext.clipArtImageRef.current.width
                }
            };
            objElementJson = BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
            return objElementJson;
        },
    }), [objContext.state, objContext.props]);
}
