// React related imports.
import { useEffect } from 'react';

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
        blnSearchFromSameFolder: true,
        strTestUsageId: -1,
        blnInternalTesting: false
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
* @summary When any folder is selected, To load the folders and Tests for that Folder.
*  Also it keeps watching the Test and Test folder. When add or edit happens, the changes get reflected.
*/
export function useOnFolderChange(objContext) {
    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false, "strSearchText": "", "blnSearchFromSameFolder": true, "strTestUsageId": -1, "blnInternalTesting": false} });
    }, [objContext.props.FolderId]);
}