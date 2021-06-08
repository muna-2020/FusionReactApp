//React related impoprts.
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        blnShowPerformance: false,
        strSelectedClassId: -1,
        strSelectedSchoolId: -1
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
        objContext.Master_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @summary Custom hook which will check if all the data is loaded
 * @param {any} props
 * @param {any} state
 * @param {any} dispatch
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let arrSchoolIdShouldKeys = objContext.props
            .ClientUserDetails
            .PupilDetails
            .t_TestDrive_Member_School_Pupil
            .filter(x => x["cIsDeleted"] == "N")
            .map(x => { return { match: { uSchoolId: x.uSchoolId } } });
        let strMainClientId = objContext.props.ClientUserDetails.MainClientId;
        let strApplicationTypeId = objContext.props.ClientUserDetails.ApplicationTypeId

        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId) &&
            //DataRef(objContext.props.Object_Cockpit_Language)["Data"] &&
            //DataRef(objContext.props.Object_Cockpit_Country)["Data"] &&
            //DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage, "Object_Cockpit_MainClient_MainClientLanguage;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N") &&
            //DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry, "Object_Cockpit_MainClient_MainClientCountry;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N") &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/LoginAndMaster/Master", objContext.props) &&
            //objContext.props.ProfileBackGroundImagePath &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class") &&
            DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;cIsDeleted;N")) {
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, strSelectedClassId: objContext.props.ClientUserDetails.SelectedClassId, strSelectedSchoolId: objContext.props.ClientUserDetails.SelectedSchoolId} });
            Performance.LogPerformance('Master_Data_Call');
            Performance.LogPerformance('Master_Render');
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("SelectedSchoolId", objContext.props.ClientUserDetails.SelectedSchoolId);
            ApplicationState.SetProperty("SelectedClassId", objContext.props.ClientUserDetails.SelectedClassId);
        }
    }, [
        objContext.props.Object_Framework_Services_ExtranetNavigation,
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_Country,
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Cockpit_MainClient_MainClientCountry,
        objContext.props.Object_Extranet_School_School,
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.ProfileBackGroundImagePath,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "LoginAndMaster/Master"]
    ]);
}