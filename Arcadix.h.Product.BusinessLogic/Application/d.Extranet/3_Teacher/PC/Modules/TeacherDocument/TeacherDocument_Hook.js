//React imports 
import { useEffect } from 'react';

import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    let strUserPreferenceClassId = undefined;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    if (
        DataRef(props.Extranet_Teacher_TeacherDocumentFolder_Module, "Extranet_Teacher_TeacherDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;") &&
        DataRef(props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;") &&
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherDocument", props)
    ) {
        let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["TeacherDocumentTree"] ? ApplicationState.GetProperty("ExpandTreeNodes")["TeacherDocumentTree"] : null;
        if (fnExpandTreeNodes) {
            fnExpandTreeNodes([]);
        }
        console.log("initial state always true");
        strUserPreferenceClassId = strClassId;
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objSelectedFolder: undefined,
        objSelectedClass: undefined,
        strUserPreferenceClassId: strUserPreferenceClassId,
        objUserPreference: objUserPreference,
        blnDefaultFolder: false,
        blnSharedFolder: false,
        blnParentFolder: false,
        blnOwnerOfFolder: false,
        objSchoolYearPeriod: { "uSchoolYearPeriodId": "" },
        blnCurrentSchoolYearPeriod: true
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
    useDataLoadForClassChange(objContext);
    useSchoolYearPeriodChangeDataLoader(objContext);
    useRefreshDocumentDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TeacherDocument_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded 
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 * @param {*} objContext
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let strSchoolId = objContext.TeacherDocument_ModuleProcessor.GetSchoolId(objContext.props);
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Extranet_Teacher_TeacherDocumentFolder_Module, "Extranet_Teacher_TeacherDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId) &&
            DataRef(objContext.props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + strSchoolId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId) &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherDocument", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            let arrClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"];
            let objFilteredClass = arrClass.find(x => x["uClassId"] == strClassId);            
            let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["TeacherDocumentTree"] ? ApplicationState.GetProperty("ExpandTreeNodes")["TeacherDocumentTree"] : null;
            if (fnExpandTreeNodes) {
                fnExpandTreeNodes([]);
            }            
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["TeacherDocumentTree"] ? ApplicationState.GetProperty("TeacherDocumentTree")["SchoolDocumentTree"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode({});
            }
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, strUserPreferenceClassId: strClassId, objUserPreference: objUserPreference, objSelectedClass: objFilteredClass } });
        }
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.Extranet_Teacher_TeacherDocumentFolder_Module,
            objContext.props.Extranet_Teacher_TeacherDocument_Module,
            objContext.props.Object_Extranet_Teacher_Class,
            objContext.props.Object_Extranet_Pupil_Pupil,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherDocument"],
            objContext.props.Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId,
            objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
            objContext.props.Object_Extranet_Teacher_Teacher,
            objContext.props.Object_Extranet_School_School
        ]);
}

/**
 * @name useDataLoadForClassChange
 * @summary after class change loads the data of folders, documents and pupil.
 * @param {any} objContext
 */
export function useDataLoadForClassChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSelectedClass) {
            objContext.TeacherDocument_ModuleProcessor.GetDataAfterClassChange(objContext);
        }
    }, [objContext.state.objSelectedClass]);
}

/**
 * @name useSchoolYearPeriodChangeDataLoader
 * @summary hook for load folders after schoolyear changes.
 * @param {any} objContext
 */
export function useSchoolYearPeriodChangeDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != "") {
            objContext.TeacherDocument_ModuleProcessor.GetDataAfterSchoolYearChange(objContext);
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
            objContext.TeacherDocument_ModuleProcessor.GetDocument();
    }, [objContext.props.RefreshDocumentData]);
}