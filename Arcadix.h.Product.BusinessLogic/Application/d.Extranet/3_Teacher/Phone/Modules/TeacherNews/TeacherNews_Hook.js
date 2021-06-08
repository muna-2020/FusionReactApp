export * from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews_Hook';


/**
* @name GetInitialState
* @param {object} props Props
* @summary returns initial state
* @returns {Object} Initial object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    if (
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherNews", props) &&
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId) &&
        DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId) &&
        DataRef(props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;;cIsDeleted;N") &&
        DataRef(props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;;") &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Data") &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        strMessagetext: "",
        isLoadComplete: blnIsLoadComplete,
        objSelectedClass: {},
        strSelectedId: "",
        strType: "school",
        arrForwardMessagesId: [],
        objSchoolYearPeriod: { "uSchoolYearPeriodId": "" },
        blnClassChanged: false,
        searchFilter: '',
        blnFileReload: false,
        blnShowEmptyTextValidationMessage: false,
        blnShowChat: false
    };
}