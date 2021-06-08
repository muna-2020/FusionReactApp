//React imports.
import { useEffect, useLayoutEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//text related imports.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

/**
* @name GetInitialState
* @summary Defines the component local state.
* @returns {object} initial state object.
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (props && Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/EditorFrame", props) &&
        Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/Common", props) && 
        Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon", props)) {
        blnIsLoadComplete = true;
    }
    return {
        "Preview": false,
        "isLoadComplete": blnIsLoadComplete
    };
};

/**
* @name Initialize
* @param {object} objContext passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/** 
* @name useDataLoader
* @param {object} objContext Passes Context Object
* @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.EditorFrame_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext Passes Context Object
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete && Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/EditorFrame", objContext.props) &&
            Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/Common", objContext.props) &&
            Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon", objContext.props)) {
            let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/Common", objContext.props);
            EditorState.SetProperty("CommonTextResource", objTextResource);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/EditorFrame", objContext.props),
    Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/1_EditorFrame/Common", objContext.props),
    Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/2_OfficeRibbon/OfficeRibbon", objContext.props)]);
}
