//React Imports
import { useLayoutEffect, useEffect } from 'react';

//Module related imports
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
        "iElementMultiInputValueId": "",
        "ToleranceFieldValue": "",
        "ValueFieldValue": "",
        "CAFieldValue": "",
        "NAFieldValue": props.ElementJson.vElementJson.dNotAnsweredPoint ? props.ElementJson.vElementJson.dNotAnsweredPoint : "",
        "WAFieldValue": props.ElementJson.vElementJson.dWrongPoint ? props.ElementJson.vElementJson.dWrongPoint : "",
        "ShowCancelButton": false,
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
 * @summary Custom Data Loader hook
 */
function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSMultiInput/MultiInputSidebar", objContext.props)) {
            objContext.MultiInputSidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
 * @summary Custom Data Loaded Hook
 */
function useDataLoaded(objContext) {

    useEffect(() => {
        if (Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSMultiInput/MultiInputSidebar", objContext.props) &&
            objContext.props.ElementJson) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objContext.props.ElementJson } });
        }
    }, [Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSMultiInput/MultiInputSidebar", objContext.props), objContext.props.ElementJson]);

    useEffect(() => {
        let strValueError = "";
        let arrErrorAtValueId = [];
        if (objContext.state.ElementJson["vElementJson"]["cIsNumber"] === "Y") {
            if (objContext.state.ValueFieldValue !== "") {
                strValueError = objContext.MultiInputSidebar_ModuleProcessor.GetInputError(objContext, "VALUE", objContext.state.ValueFieldValue, "ADD");
            }
            arrErrorAtValueId = objContext.MultiInputSidebar_ModuleProcessor.GetListError(objContext);
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "Errors": { ...objContext.state.Errors, ["ValueError"]: strValueError, ["ListError"]: arrErrorAtValueId } } });
    }, [objContext.state.ElementJson]);
}
