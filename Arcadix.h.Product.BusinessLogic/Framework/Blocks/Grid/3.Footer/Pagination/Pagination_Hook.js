import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        intPageNumber: 1
    };
}

/**
* @name InitialDataCallBack
* @param {object} objContext context object
* @summary Make the callback for the first page.
*/
export function useInitialDataCallBack(objContext) {
    useEffect(() => {
        //objContext.props.Events.PageNumberClick(1);
    }, []);   
}

/**
* @name InitialDataCallBack
* @param {object} objContext context object
* @summary To reset the page number back to one.
*/
export function useOnPageNumberChange(objContext) {
    useEffect(() => {
        if (objContext.props.Data.PageNumber && objContext.props.Data.PageNumber == 1) {
            objContext.dispatch({ type: "SET_STATE", payload: { "intPageNumber": objContext.props.Data.PageNumber } });
        }        
    }, [objContext.props.Data.PageNumber]);
}




