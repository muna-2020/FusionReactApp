// React related impoprts.
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
        strPerCentage: "",
        strFilePath: "",
        strDisplayFileName: "",
        vTestPdfName: props.Data.ExecutionName //ApplicationState.GetProperty("vTestPdfName")
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
        objContext.TestPdf_ModuleProcessor.LoadInitialData(objContext);
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
            && objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/PrintToPdf", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });

        }
    }, [
        objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/PrintToPdf", objContext.props),
    ]);
}

