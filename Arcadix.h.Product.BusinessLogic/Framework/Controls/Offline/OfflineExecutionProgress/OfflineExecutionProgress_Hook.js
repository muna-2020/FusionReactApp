// React related imports.
import { useEffect } from 'react';

//Module related imports
import SignalRClass from '@shared/Framework/Services/SignalRClass/SignalRClass';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        arrOfflineExecutionData: [],
        cIsClosed:"N",
        Event: "OfflineProcessExecution" + "_" + JConfiguration.ClientUserId
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useOfflineClose(objContext);
}



/**
 * @name useSignalRConnection 
 * @summary Used to establish the connection with the SigalR hub
 */
export function useOfflineClose(objContext) {
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [objContext.props.Data.cIsOfflineClosed]
    );
}
