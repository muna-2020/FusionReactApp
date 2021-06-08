// React related impoprts.
import { useEffect, useLayoutEffect } from 'react';


/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
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
        objContext.Sample_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            objContext.props.Object_Framework_Services_TextResource != undefined && DataRef(objContext.props.Object_Demo_Sample["Data"]) 
            && objContext.props.Object_Framework_Services_TextResource.GetData("/l.Demo/Modules/Sample", objContext.props)
        ) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_Demo_Sample,
            objContext.props.Object_Framework_Services_TextResource
        ]);
}
