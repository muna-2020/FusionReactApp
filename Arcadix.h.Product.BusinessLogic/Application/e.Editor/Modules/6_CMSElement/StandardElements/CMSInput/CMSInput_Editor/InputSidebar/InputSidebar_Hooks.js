//React Imports
import { useLayoutEffect, useEffect } from 'react';

//Module Related import
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "ElementJson": props.ElementJson,
        "Errors": {
            "ValueError": "",
            "ListError": []
        },
        "blnIsTextOnlyBox": props.ElementJson["vElementJson"]["iTextFieldType"] === 1 ? true : false,
        "blnIsWordOnlyBox": props.ElementJson["vElementJson"]["iTextFieldType"] === 3 ? true : false,
        "blnIsNumberOnlyBox": props.ElementJson["vElementJson"]["iTextFieldType"] === 4 ? true : false,
        "blnIsLetterOnlyBox": props.ElementJson["vElementJson"]["iTextFieldType"] === 2 ? true : false,
        "CAFieldValue": props.ElementJson.vElementJson.dCorrectPoint ? props.ElementJson.vElementJson.dCorrectPoint : "",
        "NAFieldValue": props.ElementJson.vElementJson.dNotAnsweredPoint ? props.ElementJson.vElementJson.dNotAnsweredPoint : "",
        "WAFieldValue": props.ElementJson.vElementJson.dWrongPoint ? props.ElementJson.vElementJson.dWrongPoint : "",
        "iElementInputValueId": "",
        "ToleranceFieldValue": "0.0",
        "ValueFieldValue": "",
        "ShowCancelButton": false,
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, InputSidebar_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext {state, props, dispatch, InputSidebar_ModuleProcessor}
 * @summary Data loader custom hook.
 */
function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSInput/InputSidebar", objContext.props)) {
            objContext.InputSidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, InputSidebar_ModuleProcessor}
 * @summary Data loaded custom hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSInput/InputSidebar", objContext.props)) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "ElementJson": objContext.props.ElementJson,
                    "isLoadComplete": true
                }
            });
        }
    }, [Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSInput/InputSidebar", objContext.props), objContext.props.ElementJson]);

    useEffect(() => {
        let strValueError = "";
        let arrErrorAtValueId = [];
        if (objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y") {
            if (objContext.state.ValueFieldValue !== "") {
                strValueError = objContext.InputSidebar_ModuleProcessor.GetInputError(objContext, "VALUE", objContext.state.ValueFieldValue, "ADD");
            }
            arrErrorAtValueId = objContext.InputSidebar_ModuleProcessor.GetListError(objContext);
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "Errors": { ...objContext.state.Errors, ["ValueError"]: strValueError, ["ListError"]: arrErrorAtValueId } } });
    }, [objContext.state.ElementJson]);
}
