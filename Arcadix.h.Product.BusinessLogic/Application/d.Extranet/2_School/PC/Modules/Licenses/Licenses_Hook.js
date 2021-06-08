//React specific
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the Licenses component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    var strSchoolYearPeriodId = undefined;
    if (
        Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Licenses", props) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_ClassLicense, "Object_Extranet_School_ClassLicense;uUserId;" + props.ClientUserDetails.UserId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + props.ClientUserDetails.UserId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + props.ClientUserDetails.UserId)["Data"] &&
        DataRef(props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uCycleId;9673B33F-F672-4E9F-B87B-023C1C226EF1")["Data"]
    ) {
        let arrSchoolYearPeriod = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        strSchoolYearPeriodId = arrSchoolYearPeriod[0].uSchoolYearPeriodId;
        blnIsLoadComplete = true;
    }

    let ShowInformationBar = true;
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    if (objUserPreference && objUserPreference["t_Framework_UserPreference_PreferenceValue"]) {
        let objShowInformationValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].find(x => x["vKey"] == "ShowInformationBar_ClassLicense")
        ShowInformationBar = objShowInformationValue && objShowInformationValue["vValue"] == "N" ? false : true;
    }

    return {
        isLoadComplete: blnIsLoadComplete,
        blnManipulatedDataLoaded: false,
        strSchoolYearPeriodId: strSchoolYearPeriodId,
        arrDisplayData: [],
        blnShowInformationBar: ShowInformationBar
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
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.Licenses_ModuleProcessor.LoadInitialData(objContext);
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
        if (!objContext.state.isLoadComplete &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Licenses", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_ClassLicense, "Object_Extranet_School_ClassLicense;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.UserId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + objContext.props.ClientUserDetails.UserId)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uCycleId;9673B33F-F672-4E9F-B87B-023C1C226EF1")["Data"]

        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            let arrSchoolYearPeriod = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
            let strSchoolYearPeriodId = arrSchoolYearPeriod[0].uSchoolYearPeriodId;
            objContext.Licenses_ModuleProcessor.AddClassLicenseDataToCache(objContext, strSchoolYearPeriodId)
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, strSchoolYearPeriodId: strSchoolYearPeriodId } });
        }
    },
        [
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Licenses"],
            objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
            objContext.props.Object_Extranet_School_ClassLicense,
            objContext.props.Object_Extranet_Teacher_Teacher,
            objContext.props.Object_Extranet_Teacher_Class,
            objContext.props.Object_Intranet_Test_ExtranetTest
        ]);
}



/**
* @name useDataLoadedForSchoolYearPeriod
* @param {object} objContext objContext
* @summary After schoolyeardropdown change to load the data
*/
//function useDataLoadedForSchoolYearPeriod(objContext) {
//    useEffect(() => {
//        if (objContext.state.blnManipulatedDataLoaded) {
//            let objClassLicenseParams = {
//                "ForeignKeyFilter": {
//                    "uSchoolYearPeriodId": objContext.state.strSchoolYearPeriodId
//                }
//            };

//            objContext.props.Object_Extranet_School_ClassLicense.GetData(objClassLicenseParams, () => {
//                objContext.dispatch({ type: 'SET_STATE', payload: { blnManipulatedDataLoaded: false } });
//            });
//        }
//    }, [objContext.state.strSchoolYearPeriodId]);
//}

///**
//* @name useClassLicenseDataLoaded
//* @param {object} objContext objContext
//* @summary on class license change to set blnManipulatedDataLoaded to false
//*/
//function useClassLicenseDataLoaded(objContext) {
//    useEffect(() => {
//        if (objContext.state.isLoadComplete) {
//            ApplicationState.SetProperty("blnShowAnimation", false);
//            objContext.dispatch({ type: 'SET_STATE', payload: { blnManipulatedDataLoaded: false } });
//        }
//    }, [objContext.props.Object_Extranet_School_ClassLicense]);
//}