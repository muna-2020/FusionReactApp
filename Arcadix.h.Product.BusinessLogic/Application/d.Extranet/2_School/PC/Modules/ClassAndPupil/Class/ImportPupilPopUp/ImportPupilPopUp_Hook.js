//React related imports.
import { useEffect } from 'react';


/**
 * @name GetInitialState
 * @summary Returns Initial state of the component.
 * @returns {*} returns object
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        classContent: "",
        classNextSlideContent: "hideContent",
        blnShowReportHref: false,
        blnIsReportGenerated: false,
        blnIsFileUploadAttempted: false
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
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        Logger.Log("getting required data");
        objContext.ImportPupilPopUp_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {*} objContext objContext
 * @summary Checks if the data(text resource, grid config, class group, gender) is loaded to props and then set the component state accordingly.
 */
function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = objContext.props.Data.ClassData["uClassId"];
        //if (DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) && objContext.state.blnIsFileUploadAttempted) {
        //    objContext.dispatch({ type: "SET_STATE", payload: { "blnIsReportGenerated": true, "blnShowReportHref": true, "blnIsFileUploadAttempted": false } });
        //}
        if (!objContext.state.isLoadComplete) {
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true }});
        }
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [objContext.state.blnIsFileUploadAttempted]);
}



