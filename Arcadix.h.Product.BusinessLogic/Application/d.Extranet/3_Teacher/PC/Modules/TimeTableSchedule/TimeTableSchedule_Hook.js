//React specific
import { useEffect } from 'react';

import TimeTableSchedule_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedule_ModuleProcessor';

/**
* @name GetInitialState
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strSchoolId = props.ClientUserDetails.TeacherDetails.uSchoolId;
    let objTimeTableSchedule_ModuleProcessor = new TimeTableSchedule_ModuleProcessor();
    let strUserPreferenceClassId = undefined;
    let arrDropDownTeacher = [];
    let objSelSchoolYearPeriod = undefined;
    let objSelTeacher = undefined;
    let objSelClass = undefined;
    if (
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod,"Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableColor)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_ClassGroup)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TimeTableSchedule", props)
    ) {
        let arrTeacherData = DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"];
        let arrClassData = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"];
        let objDefaultClass = arrClassData.find(c => c.uClassId == strClassId);
        let arrTeacherDropDownData = objTimeTableSchedule_ModuleProcessor.GetSubjectExpertTechersByClass(objDefaultClass, arrTeacherData);
        let arrSelSchoolYearPeriod = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        let objSchoolYearPeriod = undefined;
        let currentDate = new Date();
        for (let itm of arrSelSchoolYearPeriod) {
            if (currentDate > new Date(itm.dtFromDate) && currentDate < new Date(itm.dtToDate)) {
                objSchoolYearPeriod = itm;
            }
        }
        strUserPreferenceClassId = strClassId;
        arrDropDownTeacher = arrTeacherDropDownData;
        objSelSchoolYearPeriod = objSchoolYearPeriod;
        objSelTeacher = arrTeacherDropDownData[0];
        objSelClass = objDefaultClass;
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objSelSchoolYearPeriod: objSelSchoolYearPeriod,
        arrDropDownTeacher: arrDropDownTeacher,
        objSelClass: objSelClass,
        objSelTeacher: objSelTeacher,
        strUserPreferenceClassId: strUserPreferenceClassId,
        arrDisplayData: [],
        blnInitialDataLoaded: false
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
    useDataLoadedSegment(objContext);
}

/** 
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TimeTableSchedule_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strSchoolId = objContext.props.ClientUserDetails.TeacherDetails.uSchoolId;
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableDay)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableColor)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_ClassGroup)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iParentSubjectId;0;cIsLearnCoacherSubject;Y;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + strSchoolId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_TimeTableSegment, "Object_Extranet_Teacher_TimeTableSegment;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TimeTableSchedule", objContext.props)
        ) {
            let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"];
            let arrClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"];
            let objDefaultClass = arrClassData.find(c => c.uClassId == strClassId);
            let arrTeacherDropDownData = objContext.TimeTableSchedule_ModuleProcessor.GetSubjectExpertTechersByClass(objDefaultClass, arrTeacherData);
            let arrSelSchoolYearPeriod = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
            let objSchoolYearPeriod = undefined;
            let currentDate = new Date();
            for (let itm of arrSelSchoolYearPeriod) {
                if (currentDate > new Date(itm.dtFromDate) && currentDate < new Date(itm.dtToDate)) {
                    objSchoolYearPeriod = itm;
                }
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({
                type: 'SET_STATE', payload: {
                    isLoadComplete: true,
                    strUserPreferenceClassId: strClassId,
                    arrDropDownTeacher: arrTeacherDropDownData,
                    objSelSchoolYearPeriod: objSchoolYearPeriod,
                    objSelTeacher: arrTeacherDropDownData[0],
                    objSelClass: objDefaultClass
                }
            });
        }
    }, [
        objContext.props.Object_Extranet_Teacher_Teacher,
        objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TimeTableSchedule"],
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Teacher_TimeTableDay,
        objContext.props.Object_Extranet_Teacher_TimeTableColor,
        objContext.props.Object_Extranet_School_TimeTableClassTime,
        objContext.props.Object_Extranet_Teacher_ClassGroup,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Extranet_School_SchoolSubject,
        objContext.props.Object_Extranet_Teacher_TimeTableSegment
    ]);
}


/**
* @name useDataLoadedSegment
* @param {object} objContext objContext
* @summary Set the state change status to false whenever timetablesegment changes.
*/
export function useDataLoadedSegment(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.dispatch({ type: 'SET_STATE', payload: { "blnInitialDataLoaded": false } });
        }
    }, [objContext.props.Object_Extranet_Teacher_TimeTableSegment]);
}