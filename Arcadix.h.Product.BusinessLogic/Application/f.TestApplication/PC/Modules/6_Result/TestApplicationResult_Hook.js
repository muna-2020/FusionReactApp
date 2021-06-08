/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        objFilter: { "cIsDeleted": "N" },
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
    export function Initialize(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", false);
}
