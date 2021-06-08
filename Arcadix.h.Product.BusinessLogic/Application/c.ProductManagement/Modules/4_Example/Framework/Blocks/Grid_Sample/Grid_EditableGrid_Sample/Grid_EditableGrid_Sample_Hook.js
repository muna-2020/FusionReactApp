// React related imports.
import { useEffect } from 'react';
import * as Grid_EditableGrid_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample_Data';

/**
* @name GetInitialState
* @summary to Get Initial State
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        IsLoadComplete: false,
        arrRowData: Grid_EditableGrid_Sample_Data.GetRowData()
    };
}


/**
 * @name useDataLoaded
 * @param {object} objContext takes  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.IsLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "IsLoadComplete": true } });
        };        
    }, [objContext.props]);
}