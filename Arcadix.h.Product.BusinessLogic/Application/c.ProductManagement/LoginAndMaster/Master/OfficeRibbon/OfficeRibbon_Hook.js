// React related impoprts.
import { useEffect } from 'react';


/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isIntialContentDataLoaded: false
    };
}

/**
 * 
 * @param {*} objContext 
 * 
 */
export function useSetInitialContentData(objContext) {
    useEffect(() => {
        if(!objContext.state.isIntialToolBarDataLoaded && objContext.props.OfficeRibbonData){
            objContext.OfficeRibbon_ComponentProcessor.SetOfficeRibbonContentData(objContext, objContext.props.OfficeRibbonData[0]);
            objContext.dispatch({ type: "SET_STATE", payload: { "isIntialContentDataLoaded": true } });
        }        
    }, [objContext.props.OfficeRibbonData]);
}
