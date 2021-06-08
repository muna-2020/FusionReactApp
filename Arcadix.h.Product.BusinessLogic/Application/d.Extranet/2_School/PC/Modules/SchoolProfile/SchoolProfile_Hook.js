//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the school profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + props.ClientUserDetails.UserId)["Data"] &&
        DataRef(props.Object_Extranet_School_SchoolType)["Data"] &&
        DataRef(props.Object_Extranet_School_Title)["Data"] &&
        DataRef(props.Object_Extranet_State_State)["Data"] &&
        DataRef(props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;SchoolProfile")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolProfile", props)
    ) {
        blnIsLoadComplete = false;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strPasswordMessage: "",
        strImagePath:""
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
* @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.SchoolProfile_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objContext.props.ClientUserDetails.UserId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_SchoolType)["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_Title)["Data"] &&
            DataRef(objContext.props.Object_Extranet_State_State)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;SchoolProfile")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolProfile", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props.Object_Extranet_School_School,
        objContext.props.Object_Extranet_School_SchoolType,
        objContext.props.Object_Extranet_School_Title,
        objContext.props.Object_Extranet_State_State,
        objContext.props["Object_Cockpit_ObjectGenerator", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/SchoolProfile"],
        objContext.props.Object_Cockpit_ObjectGenerator
    ]);
}