// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: (props.Data.ScriptForTable || props.Data.ScriptsForProcs) ? false : true,
        arrScriptData: props.Data.ScriptData
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (objContext.props.Data.ScriptForTable) {
            objContext.ShowScript_ModuleProcessor.GetScriptsForTables(objContext);
        }
        if (objContext.props.Data.ScriptsForProcs || objContext.props.Data.ScriptsForEditedProcs) {
            objContext.ShowScript_ModuleProcessor.GetScriptsForProcs(objContext);
        }
    }, []);
}