export * from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins_Hook';

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
        intSelectedSubjectId: -1,
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
        blnEveryMinTokenInitialized: false,
        objSelectedHeaderTest: {
            uTestId: ""
        }
    };
}