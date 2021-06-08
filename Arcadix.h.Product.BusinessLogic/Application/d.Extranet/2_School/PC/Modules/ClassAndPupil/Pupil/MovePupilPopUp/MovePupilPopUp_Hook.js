//React related imports.
import { useEffect } from 'react';

//Objects required for module.
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';

/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrPupilData: [],
        arrSelectedPupil: [],
        isSelectAll: false,
        arrClassData: [],
        SelectedTeacherId: -1,
        SelectedClassId: -1,
        objValidationResult: {},
        strValidationMessage: "",
        blnIsMovePupilAttempted: false,
        objSelectedSchool: undefined,
        blnDuplicatePupilPresent: false,
        SelectedState: undefined
    };
}

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useTeacherDataLoaderForSchoolDropDownChange(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.MovePupilPopUp_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {*} objContext objContext
 * @summary Checks if the data(text resource, grid config, class group, gender) is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            objContext.MovePupilPopUp_ModuleProcessor.SchoolAndStateDataLoaded(objContext)
        ) {
            let blnLoadCompleted = false;
            if (objContext.state.blnIsMovePupilAttempted &&
                DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_School_Pupil.uSchoolId;" + objContext.props.Data.PresentClass.uClassId)) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.props.ClosePopup(objContext.props.ObjModal);
            }
            else
                if (objContext.props.JConfiguration.ApplicationTypeId === "6" &&
                    DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ParentProps.ClientUserDetails.UserId) &&
                    DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + objContext.props.ParentProps.ClientUserDetails.UserId)) {
                    let arrPupil = objContext.props.Data.PupilData.map(objTempPupil => {
                        return {
                            ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                                .filter(objTempClassPupil => { return objTempClassPupil.cIsDeleted === "N"; })
                        };
                    }).filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
                    let arrTeachers = objContext.MovePupilPopUp_ModuleProcessor.GetTeachers(objContext);
                    let arrClasses = objContext.MovePupilPopUp_ModuleProcessor.GetClasses(objContext, objContext.props.Data.PresentClass.uClassId, arrTeachers[0].uTeacherId);
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "arrClassData": arrClasses, "arrPupilData": arrPupil, "SelectedTeacherId": arrTeachers[0].uTeacherId, "SelectedClassId": -1 } });
                    if (!objContext.state.isLoadComplete) {
                        blnLoadCompleted = true;
                        objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
                    }
                }
                else if (objContext.props.JConfiguration.ApplicationTypeId === "1" &&
                    DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ParentProps.ClientUserDetails.UserId)) {
                    let arrPupil = objContext.props.Data.PupilData.map(objTempPupil => {
                        return {
                            ...objTempPupil, ["t_TestDrive_Member_Class_Pupil"]: objTempPupil["t_TestDrive_Member_Class_Pupil"]
                                .filter(objTempClassPupil => { return objTempClassPupil.cIsDeleted === "N" })
                        }
                    }).filter(objTempPupil => objTempPupil["t_TestDrive_Member_Class_Pupil"].length > 0);
                    let arrClasses = objContext.MovePupilPopUp_ModuleProcessor.GetClasses(objContext, objContext.props.Data.PresentClass.uClassId);
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "arrClassData": arrClasses, "arrPupilData": arrPupil, "SelectedTeacherId": objContext.props.ParentProps.ClientUserDetails.UserId, "SelectedClassId": -1 } });
                    if (!objContext.state.isLoadComplete) {
                        blnLoadCompleted = true;
                        objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
                    }
                }

            if (blnLoadCompleted) {
                window.setTimeout(function () {
                    window.dispatchEvent(new Event('resize'));
                }, 100);
            }
        }
    }, [
        objContext.props.Object_Extranet_Teacher_Teacher,
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Extranet_School_School,
        objContext.props.Object_Extranet_State_State
    ]);
}

/**
 * @name useTeacherDataLoaderForSchoolDropDownChange
 * @param {any} objContext objContext
 * @summary Checks if the teacher data in the school dropdown
 */
export function useTeacherDataLoaderForSchoolDropDownChange(objContext) {
    useEffect(() => {
        if (objContext.props.JConfiguration.ApplicationTypeId === "6" && objContext.state.isLoadComplete && objContext.state.objSelectedSchool) {

            let objTeacherParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.state.objSelectedSchool["uSchoolId"],
                    "Type": "nested"
                }
            };

            Object_Extranet_Teacher_Teacher.GetData(objTeacherParams);

            let objClassParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Class_Teacher",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Class_Teacher.uSchoolId": objContext.state.objSelectedSchool["uSchoolId"]
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            };

            Object_Extranet_Teacher_Class.GetData(objClassParams);
        }
    }, [objContext.state.objSelectedSchool]);
}
