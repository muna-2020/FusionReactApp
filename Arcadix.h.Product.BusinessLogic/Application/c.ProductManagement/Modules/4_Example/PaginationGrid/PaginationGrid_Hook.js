// React related imports.
import { useEffect, useLayoutEffect } from 'react';
//Module Related imports
import PaginationGrid_ModuleProcessor from "@shared/Application/c.ProductManagement/Modules/4_Example/PaginationGrid/PaginationGrid_ModuleProcessor";
import * as PaginationGrid_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/PaginationGrid/PaginationGrid_Sample_Data';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strTeacherId: -1,
        strSchoolId: -1,
        RowsPerPage: 10,
        PageNumber: 1,
        From: 1,
        TotalRowCount: 50,
        Data: PaginationGrid_Sample_Data.GetData()
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
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        let objPaginationGrid_ModuleProcessor = new PaginationGrid_ModuleProcessor(objContext);
        objPaginationGrid_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}



/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [objContext.props]);
}

