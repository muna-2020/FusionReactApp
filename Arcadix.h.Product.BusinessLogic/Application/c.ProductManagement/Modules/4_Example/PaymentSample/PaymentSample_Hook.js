// React related imports.
import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        //store the order details here
        arrData: [
            { "item": "Fusion Intranet", "price": "10000000" },
            { "item": "Fusion Extranet School", "price": "1000000" },
            { "item": "Fusion Extranet Teacher", "price": "1000000" },
        ]
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    //useDataLoader(objContext);
    //useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        //objContext.GitPull_ModuleProcessor.LoadInitialData(objContext);
        ApplicationState.SetProperty("OfficeRibbonData", [{}])
    }, []);
}