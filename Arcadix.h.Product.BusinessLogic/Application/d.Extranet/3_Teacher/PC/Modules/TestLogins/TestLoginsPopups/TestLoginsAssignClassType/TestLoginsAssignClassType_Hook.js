//React imports 
import { useEffect } from 'react';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        blnIsDataCalledForSave: false,
        arrSelectedData: [],//[{"iClassTypeId": iClassTypeId, "uPupilId": uPupilId}]
        blnIsSelectAll: false,
        intSelectAllClassTypeId: -1,
        blnShowValidationMessage: false
    };
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 *
 * @param {*} objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TestLoginsAssignClassType_ModuleProcessor.LoadInitialData(objContext);
    }, []);
};

/**
 *
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let iStateId = GetStateIdBasedOnSchool(objContext.props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_ClassType, "Object_Extranet_Teacher_ClassType;iStateId;" + iStateId + ";cIsDeleted;N") && !objContext.state.blnIsDataCalledForSave) {
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [objContext.props.Object_Extranet_Teacher_ClassType, objContext.props.pupilsubjectclasstype]);
};