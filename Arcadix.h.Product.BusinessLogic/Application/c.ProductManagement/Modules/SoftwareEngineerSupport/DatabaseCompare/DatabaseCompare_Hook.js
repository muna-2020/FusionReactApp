// React related imports.
import { useEffect, useLayoutEffect } from 'react';

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

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
    useInitializeModuleTabData(objContext);
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
        //let arrTabData = GetTabData();
        //ApplicationState.SetProperty("TabData", arrTabData);   
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
            objContext.DatabaseCompare_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.DatabaseCompare_ModuleProcessor.SetRibbonData(objContext);
    }
}

/**
* @name useInitializeModuleTabData
* @param {*} objContext objContext
* @summary useEffect to setTabData with the first tab as selected
*/
export function useInitializeModuleTabData(objContext) {
    useEffect(() => {
        objContext.DatabaseCompare_ModuleProcessor.SetTabData();
    }, []);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.DatabaseCompare_ModuleProcessor.SetTabData();
    }
}
