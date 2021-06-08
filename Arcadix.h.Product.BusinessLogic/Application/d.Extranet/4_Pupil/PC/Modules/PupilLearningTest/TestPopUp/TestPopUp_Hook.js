//React imports 
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    usePupilLearningTestPopupClose(objContext);
}


/**
* @name useDataLoadedForExtranetTest
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly. Executes each time class dropdown selects an option
*/
export function usePupilLearningTestPopupClose(objContext) {
    useEffect(() => {
        if (objContext.props.PupilLearningTestPopupClose) {
            Popup.ClosePopup(objContext.props.Id);
            //let objTemp = new Object();
            //objTemp["ClosePopUp"] = false;
            ApplicationState.SetProperty("PupilLearningTestPopupClose", false);
        }

    }, [objContext.props.PupilLearningTestPopupClose]);
}