//React imports
import { useEffect } from "react";

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {object} object
 * */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        objData: {},
        objSelectedCycle: undefined, // used in archive mode only.
        showMessage: false
    };
}

/**
* @name Initialize
* @param {object} objContext passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {any} objContext objContext
 * @summary Custom hook which is to make data call when component loaded.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.DataComparison_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {*} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/DataComparison", objContext.props)
            //&&
           // DataRef(objContext.props.Extranet_School_SchoolDataComparison_Module)["Data"]             
        ) {
            let objData = objContext.props.Data.arrDataComparisonData; //DataRef(objContext.props.Extranet_School_SchoolDataComparison_Module)["Data"][0];
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, objData: objData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/DataComparison"],
            //objContext.props.Extranet_School_SchoolDataComparison_Module
        ]
    );
}