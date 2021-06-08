//React related imports.
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/Notes", props)
        && DataRef(props.Object_Extranet_School_Notes, "Object_Extranet_School_Notes;uUserId;" + props.ClientUserDetails.UserId + ";cIsTeacher;Y;cIsSchool;N;cIsPupil;N")["Data"]) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
    };
}
/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
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
    useEffect(() => {
        objContext.Notes_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/Notes", objContext.props)) {
            if (objContext.props.JConfiguration.ApplicationTypeId === "1" && DataRef(objContext.props.Object_Extranet_School_Notes, "Object_Extranet_School_Notes;uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsTeacher;Y;cIsSchool;N;cIsPupil;N")["Data"]) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.Object_Extranet_School_Notes,
    objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/Notes"]
    ]);
}

