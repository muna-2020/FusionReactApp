//react imports
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Extranet_School_News, "Object_Extranet_School_News;cIsSchool;Y;uSchoolYearPeriodId;;uUserId;" + props.ClientUserDetails.SchoolDetails.uSchoolId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolNews", props)
    ) {
        blnIsLoadComplete = false;
    }
    return {
        strMessagetext: "",
        isLoadComplete: blnIsLoadComplete,
        objSchoolYearPeriod: { "uSchoolYearPeriodId": "" },
        strTeacherOrPupil: "teacher",
        objSchoolYearDropdown: undefined,
        blnShowValidation: false,
        blnShowEmptyTextValidationMessage: false
    };
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSchoolYearPeriodChangeDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.SchoolNews_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 * @param {any} objContext
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_School_News, "Object_Extranet_School_News;cIsSchool;Y;uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.SchoolDetails.uSchoolId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolNews", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    },
        [
            objContext.props.Object_Extranet_School_News,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/SchoolNews"],
            objContext.props.Object_Extranet_Teacher_SchoolYearPeriod
        ]);
}

/**
 * @name useSchoolYearPeriodChangeDataLoader
 * @summary hook for load news after schoolyearperiod changed.
 * @param {any} objContext
 */
export function useSchoolYearPeriodChangeDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != "") {
            objContext.SchoolNews_ModuleProcessor.GetNewsData(objContext);
        }
    }, [objContext.state.objSchoolYearPeriod]);
}