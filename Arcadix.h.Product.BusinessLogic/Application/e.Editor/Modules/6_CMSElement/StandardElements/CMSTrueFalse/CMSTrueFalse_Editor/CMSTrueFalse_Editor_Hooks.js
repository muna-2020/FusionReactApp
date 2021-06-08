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
        "ElementJson": props.ElementJson
    }
}

/**
  * @name Initialize
  * @param {object} objContext {state, props, dispatch, CMSTrueFalse_Editor_ModuleProcessor}
  * @summary Initialize the custom hooks
  */
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useImperativeMethods(objContext);
}

/**
  * @name useDataLoaded
  * @param {object} objContext {state, props, dispatch, CMSTrueFalse_Editor_ModuleProcessor}
  * @summary Data loaded hook.
  */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.ElementJson) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": objContext.props.ElementJson,
                }
            });
        }
    }, [objContext.props.ElementJson]);
}

/**
  * @name useImperativeMethods
  * @param {object} objContext {state, props, dispatch, CMSTrueFalse_Editor_ModuleProcessor}
  * @summary Imperative Methods
  */
function useImperativeMethods(objContext) {
    
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async () => {
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
                    ["TextElements"]: arrNewTextElements
                }
            };
            return BaseCMSElement.RemoveRefKeyFromJson(objElementJson);
        },
        "GetLatestContext": () => {
            return objContext;
        }

    }), [objContext.state, objContext.props]);
}
