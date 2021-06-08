//React imports 
import { useEffect } from 'react';

//Common functionality imports.
import TestLogins_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins_ModuleProcessor'
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objTestLogins_ModuleProcessor = new TestLogins_ModuleProcessor();
    let strCycleTypeId = objTestLogins_ModuleProcessor.strCycleTypeId;
    let strCycleTypeIdToInValidateTokens = objTestLogins_ModuleProcessor.strCycleTypeIdToInValidateTokens;
    let blnIsOrientationTest = objTestLogins_ModuleProcessor.blnIsOrientationTest;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let iSubjectId = objTestLogins_ModuleProcessor.GetUserpreferenceSubjectId();
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestLogins", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N") &&
        DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime") &&
        DataRef(props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N") &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + "" + ";cIsDeleted;N") &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeIdToInValidateTokens + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + "" + ";cIsDeleted;N") &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + "" + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeIdToInValidateTokens + ";uSchoolYearPeriodId;" + "" + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        !objTestLogins_ModuleProcessor.CheckUserHasLicesne(props) || DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
        DataRef(props.Extranet_Teacher_TestLogins_Module_GetServerDate, "") &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N")
    ) {
        ApplicationState.SetProperty("DisplayFor", 4);
        blnIsLoadComplete = true;
        //if (blnIsOrientationTest && DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsTestedAtThisTime;Y")) {
        //    blnIsLoadComplete = true;
        //}
        //else if (!blnIsOrientationTest &&
        //    DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsHighStakeSubject;Y")) {
        //    blnIsLoadComplete = true;
        //}
    }

    let ShowInformationBar = true;
    let vKey = this.blnIsOrientationTest ? "ShowInformationBar_TestLoginsPaperless" : "ShowInformationBar_HighStakeTestLoginsPaperless";
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    if (objUserPreference && objUserPreference["t_Framework_UserPreference_PreferenceValue"]) {
        let objShowInformationValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].find(x => x["vKey"] == vKey)
        ShowInformationBar = objShowInformationValue && objShowInformationValue["vValue"] == "N" ? false : true;
    }

    return {
        isLoadComplete: false,
        intSelectedSubjectId: iSubjectId ? iSubjectId : -1,
        strCurrentServerDate: "",
        objSelectedClass: undefined,
        objSelectedSchoolYearPeriod: {
            uSchoolYearPeriodId: ""
        },
        strSchoolYearId: '',
        //arrPdfFilesInfo: [],
        iSchoolYerPeriodCounter: 0,
        blnCurrentSchoolYearPeriod: true,
        blnShowInformationBar: ShowInformationBar,
        blnShowOptionalPdf: false,
        arrOptionalPdf: [],
        blnEveryMinTokenInitialized: false
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
    useDataLoaderForSchoolYearPeriodChange(objContext);
    useDataLoaderForClassChangeFromOutSide(objContext);
    useRefreshTokenDataLoaded(objContext);
    useDataLoaderForClassDropDownChange(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TestLogins_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaderForClassDropDownChange
 * @param {*} objContext
 * @summary   Gets the DataCallParams for when class dropdown selection changes and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForClassDropDownChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.TestLogins_ModuleProcessor.GetDataAfterClassOrSchoolYearPeriodChange(objContext)
        }
    }, [objContext.state.objSelectedClass]);
};

/**
 * @name useDataLoaderForSchoolYearPeriodChange
 * @param {*} objContext
 * @summary   Gets the DataCallParams for when class dropdown selection changes and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForSchoolYearPeriodChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.iSchoolYerPeriodCounter > 1) {
            objContext.TestLogins_ModuleProcessor.GetDataAfterClassOrSchoolYearPeriodChange(objContext, true, true)
        }
    }, [objContext.state.objSelectedSchoolYearPeriod]);
};

/**
 * @name useDataLoaderForClassChangeFromOutSide
 * @param {*} objContext
 * @summary   Gets the DataCallParams for when class dropdown selection changes and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForClassChangeFromOutSide(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.TestLogins_ModuleProcessor.GetDataAfterClassOrSchoolYearPeriodChange(objContext, false, true)
        }
    }, [objContext.props.SelectedClassId]);
};

/**
 * @name useDataLoaded
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = objContext.TestLogins_ModuleProcessor.strCycleTypeId;
    let strCycleTypeIdToInValidateTokens = objContext.TestLogins_ModuleProcessor.strCycleTypeIdToInValidateTokens;
    let blnIsOrientationTest = objContext.TestLogins_ModuleProcessor.blnIsOrientationTest;
    let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (
            !objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestLogins", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime") &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSchoolYearId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeIdToInValidateTokens + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSchoolYearId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeIdToInValidateTokens + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            !objContext.TestLogins_ModuleProcessor.CheckUserHasLicesne(objContext.props) || DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Extranet_Teacher_TestLogins_Module_GetServerDate, "") &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N")) {
            ApplicationState.SetProperty("DisplayFor", 4);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            //if (!objContext.state.isLoadComplete) {
            //    if (blnIsOrientationTest && DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsTestedAtThisTime;Y")) {
            //        objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });

            //    }
            //    else if (!blnIsOrientationTest &&
            //        DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsHighStakeSubject;Y")) {
            //        objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            //    }
            //}
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TestLogins"],
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Intranet_Cycle_Cycle,
        objContext.props.Object_Cockpit_MainClient_ClientSettings,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_Intranet_Test_IntranetTest,
        objContext.props.Object_TestApplication_TestLoginAndResult,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Extranet_Teacher_TestLogins_Module_GetServerDate,
        objContext.props.Object_Extranet_Pupil_PupilLicense
    ])
};

/**
 * @name useRefreshTokenDataLoaded
 * @param {object} objContext ContextObject
 * @summary Calls the RefreshTokenData method when token status changed
 */
export function useRefreshTokenDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.RefreshTestTokenData)
            objContext.TestLogins_ModuleProcessor.RefreshTokenData(objContext);
    }, [objContext.props.RefreshTestTokenData]);
}