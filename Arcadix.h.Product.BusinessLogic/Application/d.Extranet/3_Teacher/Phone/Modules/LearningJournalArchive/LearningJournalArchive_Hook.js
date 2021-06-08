export * from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournalArchive/LearningJournalArchive_Hook';

/**
* @name GetInitialState
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strSchoolId = props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrPupilData = [];
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournalArchive", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_ReviewCriteria)["Data"] &&
        DataRef(props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"]
    ) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournalArchive", props);

        let arrTempPupilData = DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId)["Data"];

        if (arrTempPupilData.length > 0) {
            arrPupilData = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
        }
        let objAllPupil = {
            vFirstName: objTextResource["AllText"],
            uPupilId: '00000000-0000-0000-0000-000000000000'
        };
        arrPupilData = [objAllPupil, ...arrPupilData];
        ApplicationState.SetProperty("DisplayFor", 4);//for week display component
        // ApplicationState.SetProperty("blnShowAnimation", false);
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        blnIsClassSelectionChanged: false,
        objPupil: undefined,
        objSubject: undefined,
        objClass: undefined,
        initialDataLoaded: false,
        dtStartDate: undefined,
        dtEndDate: undefined,
        blnDateFilterCalled: false,
        arrPupilData: arrPupilData,
        arrDisplayData: [],
        intSelectedAccordionIndex: 0
    };
}
