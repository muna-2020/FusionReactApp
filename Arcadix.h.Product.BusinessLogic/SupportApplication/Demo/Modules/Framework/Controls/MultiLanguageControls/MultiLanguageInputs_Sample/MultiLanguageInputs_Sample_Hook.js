// React related imports.
import { useEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name GetInitialState
* @summary to Get Initial State
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        objData: {
            "iSubjectId": 2417,
            "iMainClientId": 97,
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": 3,
                    "vSubjectName": "De",
                },
                {
                    "iLanguageId": 1,
                    "vSubjectName": "Eng",
                }
            ]
        }
    };  // Sample subject Data.
}

/**
 * @name useDataLoaded
 * @param {object} objContext takes  objContext
 * @summary when component loaded hides the animation.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, []);
}