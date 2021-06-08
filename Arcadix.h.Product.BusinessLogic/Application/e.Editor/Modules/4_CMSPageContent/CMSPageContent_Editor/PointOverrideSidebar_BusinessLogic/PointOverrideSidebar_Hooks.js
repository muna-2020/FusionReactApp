//React Imports
import { useLayoutEffect, useEffect } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "isLoadComplete": false,
        "Point": {
        ...props.Point
        },
        "Error": {
            "dCorrectPoint" : null,
            "dWrongPoint" : null,
            "dNotAnsweredPoint" : null
        }
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
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.PointOverrideSidebar_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/PointOverrideSidebar", objContext.props)
        ) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/PointOverrideSidebar", objContext.props)]);
}