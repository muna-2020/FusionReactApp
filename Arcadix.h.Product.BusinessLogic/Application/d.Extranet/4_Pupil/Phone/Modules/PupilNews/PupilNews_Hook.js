export * from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_Hook';

//Common functionalities.
import PupilNews_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_ModuleProcessor';

/**
 * @name GetInitialState
 * @param {object} props Props
 * @summary returns initial state
 * @returns {Object} Initial object
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objClass = new PupilNews_ModuleProcessor().GetPupilClass(props);
    let strClassId = objClass.uClassId; 
    if (
        Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilNews", props) &&
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId) &&
        DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objClass.uSchoolId) &&
        DataRef(props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;;cIsDeleted;N") &&
        DataRef(props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;") &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod) &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objClass.uSchoolId)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        strMessagetext: "",
        isLoadComplete: blnIsLoadComplete,
        objSelectedClass: undefined,
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