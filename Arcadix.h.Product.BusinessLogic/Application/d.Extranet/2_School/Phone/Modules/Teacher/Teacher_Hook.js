//React specific
import { useEffect } from 'react';

export * from '@shared/Application/d.Extranet/2_School/PC/Modules/Teacher/Teacher_Hook';

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
* @param {object} objContext Passes Context Object
* @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.Teacher_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext Passes Context Object
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;SchoolTeacherGrid") &&
            DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;PhoneTeacherDisplay") &&
            DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;PhoneTeacherAddEdit") &&
            DataRef(objContext.props.Object_Extranet_School_Title) &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Teacher", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    },
        [
            objContext.props.Object_Extranet_Teacher_Teacher,
            objContext.props.Object_Cockpit_ObjectGenerator,
            objContext.props.Object_Extranet_School_Title,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Teacher"]
        ]);
}