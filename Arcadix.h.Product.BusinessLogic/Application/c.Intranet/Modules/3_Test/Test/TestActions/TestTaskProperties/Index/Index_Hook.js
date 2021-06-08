﻿// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as Index_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/Index_OfficeRibbon';

/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.Index_ModuleProcessor.LoadInitialData(objContext);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["IndexGrid"];
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
            //&& DataRef(objContext.props.Object_Intranet_Task_TaskIndexDisplay)["Data"]
            && objContext.state.arrtasktotestData
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
          //objContext.props.Object_Intranet_Task_TaskIndexDisplay,
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
            "EditPopup": () => objContext.Index_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "MoveUp": () => objContext.Index_ModuleProcessor.MoveSelectedRow(objContext, "Up"),
            "MoveDown": () => objContext.Index_ModuleProcessor.MoveSelectedRow(objContext, "Down"),
            "SaveData": () => objContext.Index_ModuleProcessor.SaveData(objContext)
        };
        let arrRibbonData = Index_OfficeRibbon.GetOfficeRibbonData(objData);
        objContext.props.Callbacks.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state]);
}
