//React imports
import { useEffect } from "react";


/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        strUserValidated: false,
        strBarcodeImageUrl: "",
        strUserId: "",
        objData: {},
        objValidationMessageJson: {},
        blnLoginClicked: false
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
    useEffect(() => {
        objContext.Login_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}