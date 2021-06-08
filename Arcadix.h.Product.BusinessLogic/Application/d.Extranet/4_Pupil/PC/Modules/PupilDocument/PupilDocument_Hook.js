//React imports 
import { useEffect } from 'react';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");// props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
    let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
    let iStateId = props["ClientUserDetails"]["PupilDetails"]["t_TestDrive_Member_School_Pupil"][0]["iStateId"];
    if (
        DataRef(props.Extranet_Pupil_PupilDocumentFolder_Module, "Extranet_Pupil_PupilDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;") &&
        DataRef(props.Extranet_Pupil_PupilDocument_Module, "Extranet_Pupil_PupilDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;") &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId) &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher") &&
        DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilDocument", props)
    ) {
        ApplicationState.SetProperty("blnShowAnimation", false);
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objSelectedFolder: undefined,
        blnDefaultFolder: false,
        blnSharedFolder: false,
        blnParentFolder: false,
        blnOwnerOfFolder: false,
        objSchoolYearPeriod: { "uSchoolYearPeriodId": "" },
        strClassId: strClassId,
        blnCurrentSchoolYearPeriod: true,
        strSchoolId: strSchoolId
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
    useRefreshDocumentDataLoaded(objContext);
    useDataLoaderForTeachers(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilDocument_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded 
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 * @param {*} objContext
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");//objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let iStateId = objContext.props["ClientUserDetails"]["PupilDetails"]["t_TestDrive_Member_School_Pupil"][0]["iStateId"];
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Extranet_Pupil_PupilDocumentFolder_Module, "Extranet_Pupil_PupilDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId) &&
            DataRef(objContext.props.Extranet_Pupil_PupilDocument_Module, "Extranet_Pupil_PupilDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId) &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilDocument", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false)
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, strClassId: strClassId } });
        }
    },
        [
            objContext.props.Extranet_Pupil_PupilDocumentFolder_Module,
            objContext.props.Extranet_Pupil_PupilDocument_Module,
            objContext.props.Object_Extranet_Pupil_Pupil,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilDocument"],
            objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
            objContext.props.Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId,
            objContext.props.Object_Extranet_Teacher_Class
        ]);
}

/**
 * @name useSchoolYearPeriodChangeDataLoader
 * @summary hook for load folders after schoolyear changes.
 * @param {any} objContext
 */
export function useSchoolYearPeriodChangeDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != "") {
            objContext.PupilDocument_ModuleProcessor.GetDataAfterSchoolYearChange(objContext);
        }
    }, [objContext.state.objSchoolYearPeriod])
}

/**
 * @name useRefreshDocumentDataLoaded
 * @param {object} objContext ContextObject
 * @summary Calls the GetNews on RefreshNewsData change
 */
export function useRefreshDocumentDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.RefreshDocumentData)
            objContext.PupilDocument_ModuleProcessor.GetDocument();
    }, [objContext.props.RefreshDocumentData]);
}

/**
 * @name useRefreshDocumentDataLoaded
 * @param {object} objContext ContextObject
 * @summary Calls the GetNews on RefreshNewsData change
 */
export function useDataLoaderForTeachers(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");// objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId)["Data"]) {
            objContext.PupilDocument_ModuleProcessor.GetTeacherData(objContext);
        }
    }, [objContext.props.Object_Extranet_Teacher_Class]);
}