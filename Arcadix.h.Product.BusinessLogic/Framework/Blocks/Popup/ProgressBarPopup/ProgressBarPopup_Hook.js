// React related impoprts.
import { useEffect } from 'react';
import useInterval from 'react-useinterval';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props){
    return {
        ProgressDetails: {
            "Percentage" : 5
        },
        strProgressBarId: ""
    }
}

/**
 * @name useStartProgressOnLoad
 * @param {object} objContext takes objContext
 * @summary starts the progress on load if StartProgressOnLoad is true
 */
export function useStartProgressOnLoad(objContext) {
    useEffect(() => {
        if (objContext.props.Meta.StartProgressOnLoad) {
            objContext.ProgressBarPopup_ComponentProcessor.StartProgress(objContext);
        }
    }, []);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the GetProgressBarStatus method in one second interval....
 */
export function useGetProgressBarDetails(objContext) {
    useInterval(() => {
        if (objContext.state.strProgressBarId != "" && parseInt(objContext.state.ProgressDetails.Percentage) < 100) {
            objContext.ProgressBarPopup_ComponentProcessor.GetProgressBarStatus(objContext);
        }
    }, 1000);
}

/**
 * 
 * @param {*} objContext 
 *  Keeps watch on local state change of ProgressDetails...
    Logic written will be invoked  when Percentage reaches 100 or IsRunning becomes "N"
    Logic ==> close the Progress Bar if CloseProgessBarOnComplete is passed as "Y", Calls the CallBack OnProgressComplete with ProgressDetails
 */
export function useCheckCloseProgressBar(objContext) {
    useEffect(() => {
        let objProgressDetails = objContext.state.ProgressDetails;
        if (parseInt(objProgressDetails.Percentage) >= 100 || objProgressDetails.IsRunning == 'N') {
            if (objContext.props.Meta.CloseProgessBarOnComplete == 'Y') {
                objContext.props.Events.CloseParentPopup(objContext.props.Id);
            }
            if (objContext.props.Events.OnProgressComplete) {
                objContext.props.Events.OnProgressComplete(objProgressDetails);
            }
        }
    }, [objContext.state.ProgressDetails])
}