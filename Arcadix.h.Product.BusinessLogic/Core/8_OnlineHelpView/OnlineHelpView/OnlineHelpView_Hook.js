// React related impoprts.
import { useLayoutEffect } from 'react';


/** 
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        strPageId: null,
        PageJson: null
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
 * @summary Calls the DataCall method.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        if (objContext.props.HelpData) {
            if (objContext.props.HelpData.HelpGroup && objContext.props.HelpData.HelpKey && objContext.props.HelpData.HelpAction == "Open") {
                objContext.OnlineHelpView_ModuleProcessor.GetOnlineHelp(objContext);
            }
        }
    }, [
        objContext.props.HelpData
        //objContext.props.HelpGroup,
        //objContext.props.HelpKey
    ]);
}