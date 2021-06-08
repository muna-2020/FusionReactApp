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
    //useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.OffineExecutionDisplay_ModuleProcessor.GetOfflineData(objContext);
    }, []);
}


///**
// * @name useDataLoaded
// * @param {object} objContext  objContext
// * @summary Checks if the data is loaded to props and then set the component state accordingly.
// */
//export function useDataLoaded(objContext) {
//    useEffect(() => {
//        //if (objContext.state.isLoadComplete) {
//        //    objContext.OffineExecutionDisplay_ModuleProcessor.RegisterOfflineEvent(objContext);
//        //    ApplicationState.SetProperty("blnShowAnimation", false);
//        //}
//        if (!objContext.state.isLoadComplete
//            && DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId)
//        ) {
//            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
//            objContext.OffineExecutionDisplay_ModuleProcessor.RegisterOfflineEvent(objContext);
//        }
//    }, [
//            objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution
//    ]);
//}



