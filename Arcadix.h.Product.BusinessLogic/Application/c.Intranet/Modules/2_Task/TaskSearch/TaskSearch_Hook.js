// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        //Search
        blnSearchMode: false,
        strSearchText: "",
        intSearchId:-1,
        blnSearchFromSameFolder: true,
        struWorkflowStatusId: -1,
        blnInternalTesting: false,
    };
}


/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
*/
export function Initialize(objContext) {
    useOnFolderChange(objContext);
}


/**
* @name useOnFolderChange.
* @param {object} objContext takes  objContext.
* @summary When any folder is selected, To load the folders and Tasks for that Folder.
*  Also it keeps watching the task and taskfolder. When add or edit happens, the changes get reflected.
*/
export function useOnFolderChange(objContext) {
    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false, "strSearchText": "", "blnSearchFromSameFolder": true, "struWorkflowStatusId": -1, "blnInternalTesting": false, "intSearchId": -1 } });
    }, [objContext.props.FolderId]);
}