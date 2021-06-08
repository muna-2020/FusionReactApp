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
        objFilter: { "cIsDeleted": "N" },
        OfflineTaskName: "RunPreload",
        blnIsAllSelected: false,
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
    useLoadPreloadConfig(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.Preload_ModuleProcessor.LoadInitialData(objContext);
        let objColumnParameters = objContext.Preload_ModuleProcessor.GetColumnParameters();
        objContext.dispatch({ type: "SET_STATE", payload: { "objColumnParams": objColumnParameters } });
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/SoftwareEngineerSupport/Preload", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            var arrMainclient = DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"];
            arrMainclient = arrMainclient.map(t => { return { ...t, isSelected: false } });
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "arrMainClientData": arrMainclient.filter(objMainclient =>
                        objMainclient["iMainClientId"] == 97 || objMainclient["iMainClientId"] == 115 || objMainclient["iMainClientId"] == 0 || objMainclient["iMainClientId"] == 91 || objMainclient["iMainClientId"] == 112 || objMainclient["iMainClientId"] == 114 || objMainclient["iMainClientId"] == 124)
                }
            });
            //ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/SoftwareEngineerSupport/Preload"],
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Cockpit_MainClient_MainClient,
        objContext.props.Object_Cockpit_Language
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
            objContext.Preload_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.Preload_ModuleProcessor.SetRibbonData(objContext);
    }
}

export function useLoadPreloadConfig(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.Preload_ModuleProcessor.LoadPreloadConfigData(objContext);
        }
    }, [objContext.state.isLoadComplete]);

    //if (objContext.props.IsForServerRenderHtml && objContext.props.isLoadComplete) { //_CHECK
    //    objContext.Preload_ModuleProcessor.LoadPreloadConfigData(objContext);
    //}
}