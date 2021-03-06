// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import HistoryExceptions_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/HistoryExceptions/HistoryExceptions_ModuleProcessor';
import { DataRef } from '../../../../../../../Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (        
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/HistoryExceptions", props)
        && DataRef(props.Object_Cockpit_ApplicationType)["Data"]
        && DataRef(props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"]
        && DataRef(props.Object_Cockpit_MainClient_MainClient)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        arrLogData: [],
        strMainClientId: -1,
        strMainClient:-1,
        arrApplicationTypeData: [],
        objSearchFilters: {
            dtToDate: HistoryExceptions_ModuleProcessor.GetPreviousDate(),
            //dtToDate: new Date(),
            strType: "AllExceptions",
            iApplicationTypeId: -1,
            vApplicationName: "*",
        }        
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
        objContext.HistoryExceptions_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.HistoryExceptions_ModuleProcessor.GetApplicationTypeData(objContext);
        }
        if (!objContext.state.isLoadComplete
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/HistoryExceptions", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"]
        ) {
            objContext.HistoryExceptions_ModuleProcessor.GetApplicationTypeData(objContext);
        }
    }, [
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/HistoryExceptions"],
            objContext.props.Object_Cockpit_ApplicationType,
            objContext.props.Object_Cockpit_MainClient_MainClientApplicationType,
            objContext.props.Object_Cockpit_MainClient_MainClient
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
            objContext.HistoryExceptions_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.HistoryExceptions_ModuleProcessor.SetRibbonData(objContext);
    }
}