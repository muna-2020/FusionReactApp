// React related imports.
import { useEffect } from 'react';
import Workflow_ComponentProcessor from '@shared/Framework/Controls/Workflow/Workflow_ComponentProcessor';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let objRecentWorkflowStatus = (new Workflow_ComponentProcessor()).GetRecentWorkflowData(props);
    return {
        objRecentWorkflowStatus : objRecentWorkflowStatus,
        objWorkflowStatusToSet : objRecentWorkflowStatus
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    //useOfflineClose(objContext);
}


