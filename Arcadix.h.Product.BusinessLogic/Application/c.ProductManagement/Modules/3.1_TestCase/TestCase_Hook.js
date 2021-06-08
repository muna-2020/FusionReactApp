﻿// React related imports.
import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
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
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.TestCase_ModuleProcessor.LoadInitialData(objContext);
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
            && Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objContext.props) &&
            DataRef(objContext.props.Object_DevServer_ProductManagement_TestCase, "Object_DevServer_ProductManagement_TestCase;uUseCaseId;" + objContext.props.Data.UseCaseId)["Data"] 
            //DataRef(objContext.props.Object_DevServer_ProductManagement_TestCase)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_DevServer_ProductManagement_TestCase,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.1_TestCase/TestCase"],
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
            objContext.TestCase_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state, objContext.props.Object_DevServer_ProductManagement_TestCase]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.TestCase_ModuleProcessor.SetRibbonData(objContext);
    }
}