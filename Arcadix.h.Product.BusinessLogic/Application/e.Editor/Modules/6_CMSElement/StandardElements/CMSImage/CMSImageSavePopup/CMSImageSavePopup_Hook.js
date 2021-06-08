// React related impoprts.
import { useEffect, useLayoutEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name GetInitialState
* @param {object} props Initial state
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        //...props,
        isLoadComplete: false,
        blnError: false,
        "ElementJson": {
            ...props.Data.ElementJson
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
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.CMSImageSavePopup_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props["Object_Framework_Services_TextResource;Id;de/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageSavePopup"])["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;de/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageSavePopup"]
    ]);
}
