// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports
import * as DatabaseCompare_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/SoftwareEngineerSupport/DatabaseCompare/DatabaseCompare_OfficeRibbon';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        FirstDBConnectionString: "",
        SecondDBConnectionString: "",
        IsActive: true,
        FirstDBTables: [],
        SecondDBTables: [],
        IsShowColumn: true,
        ShowDataFor: "Table only in IndianServer",
        DBList: GetDBList(),
        objDbConnectionStrings: null
    };
}
/**
 * @name GetDBList 
 * @summary to get the List DB for comparison.
 */
function GetDBList() {
    return [
        {
            "id": 1,
            "DBName":"CMS"
        },
        {
            "id": 2,
            "DBName": "Extranet"
        },
        {
            "id": 3,
            "DBName": "Service"
        },
        {
            "id": 4,
            "DBName": "Result"
        }
    ];
}

export function GetTabData() {
    return [
        { "Text": "Table only in IndianServer", "Type": "", "Index": "0", "IsSeleted": false },
        { "Text": "Column only in IndianServer", "Type": "", "Index": "1", "IsSeleted": false },
        { "Text": "Column Edited in IndianServer", "Type": "", "Index": "2", "IsSeleted": false },
        { "Text": "Procs only in IndianServer", "Type": "", "Index": "3", "IsSeleted": false },
        { "Text": "Procs Edited in IndianServer", "Type": "", "Index": "4", "IsSeleted": false },
        { "Text": "Table only in Active", "Type": "", "Index": "5", "IsSeleted": false },        
        { "Text": "Column only in Active", "Type": "", "Index": "6", "IsSeleted": false }
    ];
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
        objContext.DatabaseCompare_ModuleProcessor.LoadInitialData(objContext);
        ApplicationState.SetProperty("OfficeRibbonData", [{}])
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {       
        ApplicationState.SetProperty("ShowDataFor", "Table only in IndianServer");
        let arrTabData = GetTabData();
        ApplicationState.SetProperty("TabData", arrTabData);   
        if (!objContext.state.isLoadComplete
            && objContext.state.objDbConnectionStrings)
        {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }           
    }, [
            objContext.state.objDbConnectionStrings
    ]);
}

/**
* @name useSetRibbonData
* @param {object} objContext objContext
* @summary Setting up TabData and RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objRibbonData = {
                objContext,
                "GetScripts": () => { objContext.DatabaseCompare_ModuleProcessor.GetScripts(objContext) }
            };
            ApplicationState.SetProperty("OfficeRibbonData", DatabaseCompare_OfficeRibbon.GetDatabaseCompareOfficeRibbonData(objRibbonData));
        }
    }, [objContext.state]);
}
