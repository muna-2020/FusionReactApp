//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the Billing component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objData = {};
    let objSchoolYearDropdown = {}
    if (
        Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Billing", props)
        && DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"]
        && DataRef(props.Extranet_School_Billing_Module)["Data"]
    ) {
        objData = DataRef(props.Extranet_School_Billing_Module)["Data"];
        objSchoolYearDropdown = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"][0];
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objData: objData,
        objSchoolYearDropdown: objSchoolYearDropdown,
        blnEmptyData: "Y"
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        // Logger.Log("getting required data");
        objContext.Billing_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary   Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Billing", objContext.props)
            && DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"]
            && DataRef(objContext.props.Extranet_School_Billing_Module)["Data"]
        ) {
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "objData": DataRef(objContext.props.Extranet_School_Billing_Module)["Data"], "objSchoolYearDropdown": DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"][0] } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Billing"],
        objContext.props.Extranet_School_Billing_Module,
        objContext.props.Object_Extranet_Teacher_SchoolYearPeriod
    ]);
}