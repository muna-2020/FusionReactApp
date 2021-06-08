//React Imports
import { useLayoutEffect, useEffect } from 'react';

//Module Objects import
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
        "Errors": [],
        "SelectedValue": {},
        "isLoadComplete": false
    };
}

/**
* @name Initialize
* @param {object} objContext passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext)
}

function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (!Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSDropdown/DropdownSidebar", objContext.props)) {
            objContext.DropdownSidebar_ModuleProcessor.LoadInitialData(objContext);
        }
    }, []);
}

function useDataLoaded(objContext) {
    useEffect(() => {
        if (Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSDropdown/DropdownSidebar", objContext.props) && objContext.props.ElementJson) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objContext.props.ElementJson } });
        }
    }, [Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSDropdown/DropdownSidebar", objContext.props), objContext.props.ElementJson]);
}
