//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the teacher component
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        //strPageId: null,
        //PageJson: null,
        //intOrderId: null,
        objNewsTip: null,
        blnShowNewsTipContent: false
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/** 
* @name useDataLoader
* @param {object} objContext objContext
* @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.NewsTip_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}
