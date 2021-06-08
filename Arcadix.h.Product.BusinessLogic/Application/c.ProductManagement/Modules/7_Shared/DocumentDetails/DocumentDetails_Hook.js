// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        objPageJson : null
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useLoadData(objContext);
    usePageJsonLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.DocumentDetails_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/DocumentDetails", objContext.props) &&
            !objContext.state.isLoadComplete
        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/2_Module/DocumentDetails"]
    ]);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useLoadData(objContext) {
    useLayoutEffect(() => {
        objContext.DocumentDetails_ModuleProcessor.LoadData(objContext);
    }, [objContext.props.Data.ModuleId]);
}

/**
 * @name usePageJsonLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function usePageJsonLoader(objContext) {
    if (objContext.props.Data.DisplayData?.iPageId) {
        useLayoutEffect(() => {
            objContext.DocumentDetails_ModuleProcessor.LoadPageJson(objContext);
        }, [objContext.props.Data.DisplayData.iPageId]);
    }
}