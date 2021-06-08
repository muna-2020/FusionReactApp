// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as Example_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/4_Example/Example_OfficeRibbon';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/4_Example/Example", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
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
        objContext.Example_ModuleProcessor.LoadInitialData(objContext);
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
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if (
            Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/4_Example/Example", objContext.props) &&
            !objContext.state.isLoadComplete
        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/4_Example/Example"],
        objContext.props.ActiveModuleName
    ]);
}

/**
* @name useSetRibbonData.
* @param {object} objContext takes  objContext.
* @summary To set and update the Ribbon Data when the State changes.
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objRibbonData = {
                objContext,
                "PreviewModule": () => objContext.Example_ModuleProcessor.PreviewModule(objContext, false),
                "CopyLinkToClipBoard": () => objContext.Example_ModuleProcessor.CopyLinkToClipBoard(),
            };            
             ApplicationState.SetProperty("OfficeRibbonData", Example_OfficeRibbon.GetExampleOfficeRibbonData(objRibbonData));           
        }
    }, [objContext.state, objContext.props.ActiveModuleName]);
}