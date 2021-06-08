//React Imports
import { useEffect, useLayoutEffect } from 'react';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSPunctuations_Editor_ModuleProcessor}
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
function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.CMSPunctuations_Common_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext {state, props, dispatch, CMSPunctuations_Editor_ModuleProcessor}
 * @summary Data loaded hook.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (DataRef(objContext.props[`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/e.Editor/Modules/6_CMSElement/CMSPunctuations`])["Data"]) {
            objContext.dispatch({
                type: "SET_STATE",
                payload: {
                    "isLoadComplete": true
                },
                "blnUndoRedoUpdate": false
            });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSPunctuations"]
    ]);
}


