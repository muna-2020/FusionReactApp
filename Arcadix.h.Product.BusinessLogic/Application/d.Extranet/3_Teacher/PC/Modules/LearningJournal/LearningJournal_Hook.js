//React specific
import { useEffect } from 'react';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

//Module specific imports
import LearningJournal_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/LearningJournal_ModuleProcessor'

/**
* @name GetInitialState
* @summary State of the LearningJournal component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strSchoolId = props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrPupilData = [];
    let objLearningJournal_ModuleProcessor = new LearningJournal_ModuleProcessor();
    let intSelectedSubjectId = objLearningJournal_ModuleProcessor.GetUserpreferenceSubjectId();
    let objParentSubject = undefined;
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournal", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_ReviewCriteria)["Data"] &&
        DataRef(props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"]
    ) {
        blnIsLoadComplete = true;
        let arrTempPupilData = DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
        let arrPupilFromClass = [];
        if (arrTempPupilData.length > 0) {
            arrPupilFromClass = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
        }
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournal", props);
        let objAllPupil = {
            vFirstName: objTextResource["AllText"],
            uPupilId: '00000000-0000-0000-0000-000000000000'
        };
        arrPupilData = [objAllPupil, ...arrPupilFromClass];
        objParentSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N").Data.find(objSubject => { return objSubject.iSubjectId == intSelectedSubjectId });

    }
    return {
        isLoadComplete: blnIsLoadComplete,
        blnIsClassSelectionChanged: false,
        arrPupilData: arrPupilData,
        arrTopicData: [],
        arrDisplayData: [],
        objProcessStep: undefined,
        objPupil: undefined,
        objSubject: objParentSubject,
        dtStartDate: undefined,
        dtEndDate: undefined,
        blnDateFilterCalled: false,
        blnPlanen: false
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useDataLoaderForPupilAndTopic(objContext);
    useCheckAllDataLoadedAfterClassChange(objContext);
}

/** 
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.LearningJournal_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strSchoolId = objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournal", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"]
        ) {
            let arrPupilData = [];
            let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningJournal", objContext.props);
            let arrTempPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];

            if (arrTempPupilData.length > 0) {
                arrPupilData = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
            }
            let objAllPupil = {
                vFirstName: objTextResource["AllText"],
                uPupilId: '00000000-0000-0000-0000-000000000000'
            };
            arrPupilData = [objAllPupil, ...arrPupilData];
            ApplicationState.SetProperty("DisplayFor", 4);//for week display component
            ApplicationState.SetProperty("blnShowAnimation", false);
            let objLearningJournal_ModuleProcessor = new LearningJournal_ModuleProcessor();
            let intSelectedSubjectId = objLearningJournal_ModuleProcessor.GetUserpreferenceSubjectId();
            let objParentSubject = undefined;
            objParentSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N").Data.find(objSubject => { return objSubject.iSubjectId == intSelectedSubjectId });
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true, "arrPupilData": arrPupilData, objSubject: objParentSubject} });
        }
    }, [
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Extranet_School_SchoolSubject,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningJournal"],
        objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Extranet_Teacher_ReviewCriteria,
        objContext.props.Object_Extranet_School_TimeTableClassTime,
        objContext.props.Object_Extranet_Teacher_TimeTableDay,
        objContext.props.Object_Extranet_Teacher_StrengthAssessmentOption,
        objContext.props.Object_Extranet_Teacher_TimeTableSegment,
        objContext.props.Object_Extranet_Teacher_Topic
    ]);
}

/**
* @name useDataLoaderForPupilAndTopic
* @param {object} objContext objContext
* @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoaderForPupilAndTopic(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            (new ObjectQueue()).QueueAndExecute(objContext.LearningJournal_ModuleProcessor.GetPupilDataParams(objContext), () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
    }, [objContext.state.blnIsClassSelectionChanged]);
}

/**
* @name useCheckAllDataLoadedAfterClassChange
* @param {object} objContext objContext
* @summary CheckAllDataLoadedAfterClassChange
*/
export function useCheckAllDataLoadedAfterClassChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
            if (
                DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
                DataRef(objContext.props.Object_Extranet_Teacher_ReviewCriteria)["Data"] &&
                DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
                DataRef(objContext.props.Object_Extranet_Teacher_Topic, "Object_Extranet_Teacher_Topic;uClassId;" + strClassId)["Data"]
            ) {
                objContext.dispatch({ type: "SET_STATE", payload: { blnDateFilterCalled: true } });
            }
        }
    }, [objContext.props.Object_Extranet_Pupil_Pupil,
    objContext.props.Object_Extranet_Teacher_Topic,
    objContext.props.Object_Extranet_Teacher_TimeTableSegmentlesegment
    ]);
}