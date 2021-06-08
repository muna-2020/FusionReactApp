//React specific
import { useEffect } from 'react';

import CoTeacherAndSubjectExpert_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert_ModuleProcessor';


/**
* @name GetInitialState
* @summary State of the LearningJournal component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
   let blnIsLoadComplete = false;
    let objCoTeacherAndSubjectExpert_ModuleProcessor = new CoTeacherAndSubjectExpert_ModuleProcessor();
    let objContext = {props}
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"])["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"] + ";cIsDeleted;N")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert", props)
    ) {
        let objClassData = objCoTeacherAndSubjectExpert_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
        if (objClassData === undefined || JSON.stringify(objClassData) === '{}') {
            let strPreSelectedClassId = ApplicationState.GetProperty("SelectedClassId");
            objClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"].filter(objTempClassDetail => objTempClassDetail["uClassId"] === strPreSelectedClassId)[0];
        }
        else {
            objClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"].filter(objTempClassDetail => objTempClassDetail["uClassId"] === objClassData["uClassId"])[0];
        }
        let objPreveiouslySelectedTeachers = objCoTeacherAndSubjectExpert_ModuleProcessor.GetPreveiouslySelectedTeachers(objContext, objClassData);
        let arrAvailableTeachers = objCoTeacherAndSubjectExpert_ModuleProcessor.GetAvailableTeachers(objContext, objPreveiouslySelectedTeachers["SelectedTeachers"]);
        objCoTeacherAndSubjectExpert_ModuleProcessor.SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, objClassData, arrAvailableTeachers);
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
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
}

/** 
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.CoTeacherAndSubjectExpert_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"])["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + objContext.props.ClientUserDetails["TeacherDetails"]["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"] + ";cIsDeleted;N")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert", objContext.props)
        ) {
            let objClassData = objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            if (objClassData === undefined || JSON.stringify(objClassData) === '{}') {
                let strPreSelectedClassId = ApplicationState.GetProperty("SelectedClassId");
                objClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"].filter(objTempClassDetail => objTempClassDetail["uClassId"] === strPreSelectedClassId)[0];
            }
            else {
                objClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"].filter(objTempClassDetail => objTempClassDetail["uClassId"] === objClassData["uClassId"])[0];
            }
            let objPreveiouslySelectedTeachers = objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetPreveiouslySelectedTeachers(objContext, objClassData);
            let arrAvailableTeachers = objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetAvailableTeachers(objContext, objPreveiouslySelectedTeachers["SelectedTeachers"]);
            objContext.CoTeacherAndSubjectExpert_ModuleProcessor.SetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, objClassData, arrAvailableTeachers);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
            
        }
    }, [objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Teacher_Teacher,             
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Extranet_School_SchoolSubject,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert"],
        objContext.props.SelectedClassId]);
}