//react imports 
import { useEffect } from 'react';

import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary initial state for the component
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objSelectedClass = {}
    let strClassNewsStatus = undefined;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    if (
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherNews", props) &&
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId) &&
        DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId) &&
        DataRef(props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;;cIsDeleted;N") &&
        DataRef(props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;;") &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId)
    ) {
        let arrClassData = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)["Data"];
        objSelectedClass = arrClassData.find(cls => cls["uClassId"] == strClassId);
        objSelectedClass = objSelectedClass ? objSelectedClass : { uClassId: "00000000-0000-0000-0000-000000000000", cIsNewsEnabled: "N", t_TestDrive_Member_Class_Teacher: [] };
        let strClassActiveStatus = (objSelectedClass.cIsNewsEnabled !== null && objSelectedClass.cIsNewsEnabled == 'N') ? 'N' : 'Y';
        strClassNewsStatus = strClassActiveStatus;
        blnIsLoadComplete = true;
    }
    return {
        strMessagetext: "",
        isLoadComplete: blnIsLoadComplete,
        objSelectedClass: objSelectedClass,
        strSelectedId: "",
        strType: "school",
        arrForwardMessagesId: [],
        objSchoolYearPeriod: { "uSchoolYearPeriodId": "" },
        blnClassChanged: false,
        searchFilter: '',
        blnFileReload: false,
        blnShowEmptyTextValidationMessage: false,
        strClassNewsStatus: strClassNewsStatus,
        blnCurrentSchoolYearPeriod: true
    };
}

/**
 * @name useDataLoader
 * @summary initial data load.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TeacherNews_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useClassDataLoader(objContext);
    useSchoolYearPeriodChangeDataLoader(objContext);
    useRefreshNewsDataLoaded(objContext);
}

/**
 * @name useDataLoaded
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 * @param {any} objContext
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (
            !objContext.state.isLoadComplete &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherNews", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objContext.props.ClientUserDetails.TeacherDetails.uSchoolId) &&
            DataRef(objContext.props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.TeacherDetails.uSchoolId)

        ) {
            let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"];
            let objSelectedClass = arrClassData.find(cls => cls["uClassId"] == strClassId);
            objSelectedClass = objSelectedClass ? objSelectedClass : { uClassId: "00000000-0000-0000-0000-000000000000", cIsNewsEnabled: "N", t_TestDrive_Member_Class_Teacher: [] };
            let strClassActiveStatus = (objSelectedClass.cIsNewsEnabled !== null && objSelectedClass.cIsNewsEnabled == 'N') ? 'N' : 'Y';
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, objSelectedClass: objSelectedClass, strClassNewsStatus: strClassActiveStatus } });
            ApplicationState.SetProperty("blnShowAnimation", false)
        }
    },
        [objContext.props.Object_Extranet_Teacher_Class, objContext.props.Object_Extranet_School_School, objContext.props.Object_Extranet_School_NewsGroup, objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherNews"], objContext.props.Object_Extranet_Teacher_Teacher, objContext.props.Object_Extranet_Pupil_Pupil, objContext.props.Extranet_Teacher_TeacherNews_Module, objContext.props.Object_Extranet_Teacher_SchoolYearPeriod]);
}

/**
 * @name useClassDataLoader
 * @summary loads the data after class change
 * @param {any} objContext
 */
export function useClassDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.blnClassChanged && objContext.state.isLoadComplete) {
            objContext.TeacherNews_ModuleProcessor.GetDataAfterClassChange(objContext);
        }
    }, [objContext.state.objSelectedClass])
}

/**
 * @name useSchoolYearPeriodChangeDataLoader
 * @summary hook for load news after schoolyearperiod changes.
 * @param {any} objContext
 */
export function useSchoolYearPeriodChangeDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != "") {
            objContext.TeacherNews_ModuleProcessor.GetNewsData(objContext);
        }
    }, [objContext.state.objSchoolYearPeriod])
}

/**
 * @name useRefreshNewsDataLoaded
 * @param {object} objContext ContextObject
 * @summary Calls the GetNews on RefreshNewsData change
 */
export function useRefreshNewsDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.RefreshNewsData)
            objContext.TeacherNews_ModuleProcessor.GetNews();
    }, [objContext.props.RefreshNewsData]);
}