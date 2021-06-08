export * from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport_Hook';

//Common functionality imports
import ProgressReport_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport_ModuleProcessor';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name GetInitialState
* @summary State of the ProgressReport profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objProgressReport_ModuleProcessor = new ProgressReport_ModuleProcessor()
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strOrientationCycleTypeId = objProgressReport_ModuleProcessor.GetOrienationCycleTypeId();
    let strLearningCycleTypeId = objProgressReport_ModuleProcessor.GetLearningCycleTypeId();
    let strHighStakeCycleTypeId = objProgressReport_ModuleProcessor.GetHighStakeCycleTypeId();
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    let strSchoolYearPeriodId = "";

    let strUserPreferenceClassId = undefined;
    let arrSubjectData = undefined;
    let arrParentSubjectData = [];
    let arrOrientionSubSubjectData = [];
    let arrLearningSubSubjectData = [];
    let objSelParentSubject = undefined;

    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject")["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iMainClientId;" + props.ClientUserDetails.MainClientId)["Data"] &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N")["Data"] &&
        //DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
        //DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + strSchoolYearPeriodId)["Data"] &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + strSchoolYearPeriodId)["Data"] &&
        DataRef(props.Extranet_Teacher_ProgressReport_Module, "Extranet_Teacher_ProgressReport_Module;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/ProgressReport", props)
    ) {
        // ApplicationState.SetProperty("blnShowAnimation", false);
        ApplicationState.SetProperty("DisplayFor", 4);
        arrSubjectData = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject")["Data"];
        arrParentSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] === 0);
        objSelParentSubject = arrParentSubjectData[0];
        arrOrientionSubSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsTestedAtThisTime"] == "Y");
        arrLearningSubSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsReadyForSystemLearningTest"] == "Y");
        strUserPreferenceClassId = strClassId;
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objSelectedClass: undefined,
        strUserPreferenceClassId: strUserPreferenceClassId,
        objUserPreference: objUserPreference,
        objSelParentSubject: objSelParentSubject,
        arrParentSubjectData: arrParentSubjectData,
        arrOrientionSubSubjectData: arrOrientionSubSubjectData,
        arrLearningSubSubjectData: arrLearningSubSubjectData,
        blnCompetencyModeOn: false,
        objSelPupilForSummaryPopup: undefined,
        objSelSubjectForSummaryPopup: undefined,
        blnShowAllPdf: false,
        arrOfflineProcessExecutionData: [],
        strStartDate: "",
        strEndDate: "",
        strSchoolYearPeriodId: "",
        arrSubjectData: arrSubjectData,
        blnDisplayResultIndex: 0
    };
}
