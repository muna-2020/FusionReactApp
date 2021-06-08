//React related imports.
import { useEffect } from 'react';

//Objects required for module.
import ClassAndPupil_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/ClassAndPupil_ModuleProcessor";

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassObjectName = "";
    let strPupilObjectName = "";

    if (new ClassAndPupil_ModuleProcessor().IsSchoolOrAdminTeacher(props)) {
        strPupilObjectName = "SchoolPupilGrid";
        strClassObjectName = "SchoolClassGrid";
    }
    else {
        strPupilObjectName = "TeacherPupilGrid";
        strClassObjectName = "TeacherClassGrid";
    }
    if (
        Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/ClassAndPupil/Class", props) &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/ClassAndPupil/Pupil", props) &&
        DataRef(props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;" + strClassObjectName)["Data"] &&
        DataRef(props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;" + strPupilObjectName)["Data"]
    ) {
        blnIsLoadComplete = true;
    }

    let ShowInformationBar = true;
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    if (objUserPreference && objUserPreference["t_Framework_UserPreference_PreferenceValue"]) {
        let objShowInformationValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].find(x => x["vKey"] == "ShowInformationBar_ClassPupil")
        ShowInformationBar = objShowInformationValue && objShowInformationValue["vValue"] == "N" ? false : true;
    }

    return {
        isLoadComplete: blnIsLoadComplete,
        blnShowPupilGrid: false,
        blnShowInformationBar: ShowInformationBar,
        blnShowClassTab: true // used in phone JSX
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
        objContext.ClassAndPupil_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
function useDataLoaded(objContext) {
    let strClassObjectName = "";
    let strPupilObjectName = "";

    if (objContext.ClassAndPupil_ModuleProcessor.IsSchoolOrAdminTeacher(objContext.props)) {
        strPupilObjectName = "SchoolPupilGrid";
        strClassObjectName = "SchoolClassGrid";
    }
    else {
        strPupilObjectName = "TeacherPupilGrid";
        strClassObjectName = "TeacherClassGrid";
    }

    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/ClassAndPupil/Class", objContext.props) &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/ClassAndPupil/Pupil", objContext.props) &&
            DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;" + strClassObjectName)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;" + strPupilObjectName)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/ClassAndPupil/Class"],
    objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/ClassAndPupil/Pupil"],
    objContext.props.Object_Cockpit_ObjectGenerator
    ]);
}

