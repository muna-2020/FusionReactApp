// React related imports.
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        IsCollapsed: false,
    };
}

/**
 * @name useLoadNavigationOnRefresh
 * @param {any} objContext
 * @summary Based on the URL, sets the ActiveMainNavigationId...
 */
export function useLoadNavigationOnRefresh(objContext) {
    useEffect(() => {
        objContext.MainNavigation_ModuleProcessor.LoadNavigationOnRefresh(objContext);
    }, [])
}