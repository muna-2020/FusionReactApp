/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        DataExportExecutionName: props.Data.EventName 
    };
}