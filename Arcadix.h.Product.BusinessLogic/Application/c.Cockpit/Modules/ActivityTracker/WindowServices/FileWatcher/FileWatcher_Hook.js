// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        arrWindowServiceData: []
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
    // useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.FileWatcher_ModuleProcessor.LoadInitialData(objContext);
        ApplicationState.SetProperty("OfficeRibbonData", []);
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
            && objContext.state.arrWindowServiceData.length > 0
            && DataRef(objContext.props.Object_Framework_SystemTracking_FileWatcher)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher", objContext.props)

        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });

        }
    }, [
        objContext.state.arrWindowServiceData,
        objContext.props.Object_Framework_SystemTracking_FileWatcher,
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher", objContext.props),
    ]);
}

///**
//* @name useSetRibbonData
//* @param {object} objContext objContext
//* @summary Setting up TabData and RibbonData
//*/
//export function useSetRibbonData(objContext) {
//    useEffect(() => {
//        if (objContext.state.isLoadComplete) {
//            var objRibbonData = {
//                objContext,
//                "ShowActivityDetailsPopup": () => objContext.FileWatcher_ModuleProcessor.ShowActivityDetailsPopup(objContext)
//            };
//            ApplicationState.SetProperty("OfficeRibbonData", FileWatcher_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
//        }
//    }, [objContext.state]);
//}
