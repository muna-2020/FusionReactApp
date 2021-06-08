// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as Hierarchy_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/Hierarchy_OfficeRibbon';

/**
* @name GetInitialState
* @summary Sets the initialState
* @returns {*} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
    };
}

/**
* @name Initialize
* @param {object} objContext  Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useInitializeData(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
}

/**
* @name useInitializeData
* @param {object} objContext objContext
* @summary Setting up objData state and objValidationColumnTabMapping state
*/
export function useInitializeData(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["HierarchyGrid"];
        let objData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objData, "arrtasktotestData": objContext.props.arrtasktotestData } });
    }, [objContext.props.arrtasktotestData]);
}


/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && objContext.state.arrtasktotestData
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.state.arrtasktotestData
    ]);
}



/**
* @name useSetRibbonData
* @param {object} objContext objContext
* @summary Setting up TabData and RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        var objData = {
            objContext,
            "EditPopup": () => objContext.Hierarchy_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "MoveUp": () => objContext.Hierarchy_ModuleProcessor.MoveSelectedRow(objContext, "Up"),
            "MoveDown": () => objContext.Hierarchy_ModuleProcessor.MoveSelectedRow(objContext, "Down"),
            "SaveData": () => objContext.Hierarchy_ModuleProcessor.SaveData(objContext)
        };
        //ApplicationState.SetProperty("OfficeRibbonData", Hierarchy_OfficeRibbon.GetOfficeRibbonData(objData));
        let arrRibbonData = Hierarchy_OfficeRibbon.GetOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.Callbacks.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state]);
}

