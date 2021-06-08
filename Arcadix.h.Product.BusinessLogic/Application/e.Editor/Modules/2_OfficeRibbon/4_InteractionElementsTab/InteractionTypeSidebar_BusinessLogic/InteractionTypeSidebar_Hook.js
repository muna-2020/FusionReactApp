//React Imports
import { useLayoutEffect, useEffect } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState() {
    return {
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
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.InteractionTypeSidebar_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar", objContext.props)) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "isLoadComplete": true
                }
            });
        }
    }, [objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar", objContext.props)]);
}