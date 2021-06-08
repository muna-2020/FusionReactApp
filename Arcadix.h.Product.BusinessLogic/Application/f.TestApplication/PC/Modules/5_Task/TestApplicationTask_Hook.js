import { useImperativeHandle } from "react";
 
/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        objFilter: { "cIsDeleted": "N" },
        TimeTakenByTask: 0,
        "PageId":0
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    //useImperativeMethods(objContext);
    ApplicationState.SetProperty("blnShowAnimation", false);
}

function useImperativeMethods(objContext) {
    useImperativeHandle(objContext.TaskLayoutRef, () => ({
        "GetLatestContext": () => {
            return objContext;
        }
    }), [objContext.props, objContext.state]);
}
    