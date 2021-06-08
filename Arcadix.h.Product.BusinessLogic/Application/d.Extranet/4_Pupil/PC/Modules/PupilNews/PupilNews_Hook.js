//react imports 
import { useEffect } from 'react';

//Common functionality imports.
import PupilNews_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary initial state for the component
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objClass = new PupilNews_ModuleProcessor().GetPupilClass(props);
    let strClassId = objClass.uClassId;
    let objSelectedClass = undefined;
    let iStateId = props["ClientUserDetails"]["PupilDetails"]["t_TestDrive_Member_School_Pupil"][0]["iStateId"];
    if (
        Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilNews", props) &&
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId) &&
        DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objClass.uSchoolId) &&
        DataRef(props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;;cIsDeleted;N") &&
        DataRef(props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;") &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objClass.uSchoolId)
    ) {
        objSelectedClass = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId)["Data"][0];
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
    useSchoolYearPeriodChangeDataLoader(objContext);
    useRefreshNewsDataLoaded(objContext);
    useNewsLoadedAfterSchoolYearPeriodChange(objContext);
}

/**
 * @name useDataLoader
 * @summary initial data load.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilNews_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 * @param {any} objContext
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let objClass = objContext.PupilNews_ModuleProcessor.GetPupilClass(objContext.props);
        let strClassId = objClass.uClassId;
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        let iStateId = objContext.props["ClientUserDetails"]["PupilDetails"]["t_TestDrive_Member_School_Pupil"][0]["iStateId"];
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (
            !objContext.state.isLoadComplete &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilNews", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId) &&
            DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + strSchoolId) &&
            DataRef(objContext.props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)) {
            let objSelectedClass = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId)["Data"][0];
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, objSelectedClass: objSelectedClass } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    },
        [
            objContext.props.Object_Extranet_Teacher_Class,
            objContext.props.Object_Extranet_School_School,
            objContext.props.Object_Extranet_School_NewsGroup,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilNews"],
            objContext.props.Object_Extranet_Teacher_Teacher,
            objContext.props.Object_Extranet_Pupil_Pupil,
            objContext.props.Extranet_Pupil_PupilNews_Module,
            objContext.props.Object_Extranet_Teacher_SchoolYearPeriod
        ]);
}

/**
 * @name useNewsLoadedAfterSchoolYearPeriodChange
 * @summary hook to hide animation after News has loaded after School Year Period Changed.
 * @param {any} objContext
 */
export function useNewsLoadedAfterSchoolYearPeriodChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != "") {
            console.log('useNewsLoadedAfterSchoolYearPeriodChange Method Call');
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [objContext.props.Extranet_Pupil_PupilNews_Module])
}

/**
 * @name useSchoolYearPeriodChangeDataLoader
 * @summary hook for load news after schoolyearperiod changes.
 * @param {any} objContext
 */
export function useSchoolYearPeriodChangeDataLoader(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != "") {
            objContext.PupilNews_ModuleProcessor.GetNewsData(objContext);
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
            objContext.PupilNews_ModuleProcessor.GetNews(objContext);
    }, [objContext.props.RefreshNewsData]);
}