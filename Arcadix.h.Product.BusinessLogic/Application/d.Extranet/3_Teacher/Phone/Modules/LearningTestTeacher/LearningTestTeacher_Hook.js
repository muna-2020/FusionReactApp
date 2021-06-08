export * from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher_Hook';


//Module specific imports
import LearningTestTeacher_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher_ModuleProcessor'
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = new LearningTestTeacher_ModuleProcessor().strCycleTypeId;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N") &&
        DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings") &&
        DataRef(props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;;uTeacherId;" + props.ClientUserDetails.UserId) &&
        DataRef(props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;;uClassId;" + strClassId + ";iStateId;" + iStateId)
    ) {
        // ApplicationState.SetProperty("DisplayFor", 4);//for week display component
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        intSelectedParentSubjectId: -1,
        intSelectedSubSubjectId: -1,
        intStatusToggle: 1,
        strSelectedPupilId: "00000000-0000-0000-0000-000000000000",
        intSelectedModusId: -1,
        strTimePeriod: 1,
        objSelectedSchoolYearPeriod: {
            uSchoolYearPeriodId: ""
        },
        iSchoolYerPeriodCounter: 0,
        blnSearchBtnClicked: false,
        objSelectedDate: undefined,
        strSelectedTestToShow: ""
    };
}
