// React related imports.
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
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.TestCaseStep_ModuleProcessor.LoadInitialData(objContext);
        //ApplicationState.SetProperty("OfficeRibbonData", [{}])
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
            && Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep", objContext.props) &&
            DataRef(objContext.props.Object_DevServer_ProductManagement_TestCaseStep, "Object_DevServer_ProductManagement_TestCaseStep;uTestCaseId;" + objContext.props.Data.uTestCaseId)["Data"] 
            //DataRef(objContext.props.Object_DevServer_ProductManagement_TestCaseStep)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_DevServer_ProductManagement_TestCaseStep,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep"],
    ]);
}

