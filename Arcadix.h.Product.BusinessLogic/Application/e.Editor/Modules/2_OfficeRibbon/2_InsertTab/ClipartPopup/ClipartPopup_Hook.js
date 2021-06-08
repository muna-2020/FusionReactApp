import { useLayoutEffect, useEffect } from 'react';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        "isLoadComplete": false
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object.
 * @summary Initialize the custom hooks.
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {any} objContext
 * @summary this used to load the data.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.ClipartPopup_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete && DataRef(objContext.props.Object_Editor_OfficeRibbon_Clipart)["Data"]) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            let Folders = DataRef(objContext.props.Object_Editor_OfficeRibbon_Clipart)["Data"][0]["Folders"];
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "Folders": [ ...Folders],
                    "ActiveFolder": Folders[0].FolderName,
                    "ActiveFolderIndex": 0,
                    "SelectedImage" : "",
                    "isLoadComplete": true
                }
            });
        }
    }, [objContext.props.Object_Editor_OfficeRibbon_Clipart]);
}