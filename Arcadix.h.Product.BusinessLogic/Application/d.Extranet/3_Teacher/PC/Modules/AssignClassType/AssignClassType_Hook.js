//React related imports.
import { useEffect } from 'react';

//Common functionality imports
import Object_Extranet_Pupil_PupilSubjectClassType from '@shared/Object/d.Extranet/4_Pupil/PupilSubjectClassType/PupilSubjectClassType';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    let strUserPreferenceClassId = undefined;
    let objSelectedSubject = undefined;
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsHighStakeSubject;Y;iParentSubjectId;0")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/AssignClassType", props) &&
        DataRef(props.Object_Extranet_Teacher_ClassType, "Object_Extranet_Teacher_ClassType;iStateId;" + iStateId) &&
        DataRef(props.Object_Extranet_Pupil_PupilSubjectClassType, "Object_Extranet_Pupil_PupilSubjectClassType;uClassId;" + strClassId)
    ) {
        let objSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsHighStakeSubject;Y;iParentSubjectId;0")["Data"][0];
        strUserPreferenceClassId = strClassId;
        objUserPreference = objUserPreference;
        iStateId = iStateId;
        objSelectedSubject = objSubject;
        blnIsLoadComplete = false;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objSelectedClass: undefined,
        objSelectedSubject: objSelectedSubject,
        strUserPreferenceClassId: strUserPreferenceClassId,
        objUserPreference: objUserPreference,
        iStateId: iStateId,
        blnDataLoaded: false,
        arrManipulatedClassTypeData: [],
        arrClassTypeData: [],
        arrActiveState: []
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useDataLoadForClassChange(objContext);
    useDataLoadForPupil(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.AssignClassType_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsHighStakeSubject;Y;iParentSubjectId;0")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/AssignClassType", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Teacher_ClassType, "Object_Extranet_Teacher_ClassType;iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Extranet_Pupil_PupilSubjectClassType, "Object_Extranet_Pupil_PupilSubjectClassType;uClassId;" + strClassId)
        ) {
            let objSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsHighStakeSubject;Y;iParentSubjectId;0")["Data"][0];
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "isLoadComplete": true,
                    "strUserPreferenceClassId": strClassId,
                    "objUserPreference": objUserPreference,
                    "iStateId": iStateId,
                    "objSelectedSubject": objSubject
                }
            });
        }
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.Object_Extranet_Teacher_ClassType,
            objContext.props.Object_Intranet_Taxonomy_Subject,
            objContext.props.Object_Extranet_Teacher_Class,
            objContext.props.Object_Extranet_Pupil_Pupil,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/AssignClassType"],
            objContext.props.Object_Extranet_Pupil_PupilSubjectClassType
        ]);
}

/**
 * @name useDataLoadForClassChange
 * @param {object} objContext objContext
 * @summary Load data once class has been changed.
 */
export function useDataLoadForClassChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete === true) {
            let strClassId = objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher[0].uClassId;
            let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                }
            };

            let objAssignedClassTypeParams = {
                "ForeignKeyFilter": {
                    "uClassId": strClassId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iStateId": iStateId
                            }
                        }
                    ]
                }
            };

            Object_Extranet_Pupil_Pupil.GetData(objPupilParams);
            Object_Extranet_Pupil_PupilSubjectClassType.GetData(objAssignedClassTypeParams);
        }
    }, [objContext.state.objSelectedClass]);
}

/**
 * @name useDataLoadForPupil
 * @param {object} objContext objContext
 * @summary Use to load pupil data.
 */
export function useDataLoadForPupil(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
            let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
            if (DataRef(objContext.props.Object_Extranet_Pupil_PupilSubjectClassType, "Object_Extranet_Pupil_PupilSubjectClassType;uClassId;" + strClassId) &&
                DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)) {
                objContext.dispatch({ type: 'SET_STATE', payload: { "blnDataLoaded": false } });
            }
        }
    }, [objContext.props.Object_Extranet_Pupil_Pupil, objContext.props.Object_Extranet_Pupil_PupilSubjectClassType]);
}
