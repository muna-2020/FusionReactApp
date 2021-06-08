//React related imports.
import { useEffect } from 'react';

//Objects required for module.
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';

//Module related fies.
import Pupil_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/Pupil_ModuleProcessor";


/**
 * @name GetInitialState
 * @summary Initializes the state
 * @returns {object} Initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objPupil_ModuleProcessor = new Pupil_ModuleProcessor()
    let objClassData = objPupil_ModuleProcessor.GetClassDataFromApplicationState();
    let arrPupilGridData = [];
    let strStateId = objPupil_ModuleProcessor.GetStateIdByApplicationType({ props });
    if (
        objClassData && JSON.stringify(objClassData) !== "{}" &&
        DataRef(props.Object_Extranet_Pupil_Gender)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_ClassGroup, "Object_Extranet_Teacher_ClassGroup;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objClassData["uClassId"] + ";iStateId;" + strStateId)["Data"] &&
        objPupil_ModuleProcessor.CheckDataLoadedForSchoolPupil({ props })
    ) {
        let arrPupilData = objPupil_ModuleProcessor.GetPupil({ props, "Pupil_ModuleProcessor": objPupil_ModuleProcessor }, 1);
        ApplicationState.SetProperty("blnShowAnimation", false);

        blnIsLoadComplete = true;
        arrPupilGridData = arrPupilData;
        //objClass = objPupil_ModuleProcessor.GetClassDataFromApplicationState() //not used from state
        //objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilGridData": arrPupilData, "isNewRowAdded": false, "objClass": objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext) } });
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        isNewRowAdded: false,
        arrPupilGridData: arrPupilGridData,
        intActivationStatusTogglValue: 1, //-1,
        strFilterStatus: 'Active'
    };
}

/**
 * @name Initialize
 * @param {object} objContext Passes Context Object
 * @summary Initialize the custom hooks for loading the data 
 */
export function Initialize(objContext) {
    useDataLoaderForPupilData(objContext);
    useDataLoaderForSchoolPupilData(objContext);
    useDataLoaded(objContext);
    useRefreshImportData(objContext);
}


/**
 * @name useDataLoaderForPupilData
 * @param {*} objContext objContext
 * @summary Checks if the pupil's data is loaded to props and then set the component state accordingly.  
 */
function useDataLoaderForPupilData(objContext) {
    useEffect(() => {
        let objData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);
        if (objData && JSON.stringify(objData) !== "{}") {
            let strClassId = objData["uClassId"];
            let strStateId = objContext.Pupil_ModuleProcessor.GetStateIdByApplicationType(objContext);
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                },
                "SearchQuery": {
                    "must": [{
                        "match": {
                            "iStateId": strStateId
                        }
                    }]
                }
            };
            Object_Extranet_Pupil_Pupil.GetData(objPupilParams, () => { });

            ApplicationState.SetProperty("Pupil_Grid_Cancel_EditRow", true);
        }
    }, [objContext.props.ClassAndPupil]);
}


/**
 * @name useDataLoaderForSchoolPupilData
 * @param {any} objContext objContext
 * @summary Checks if the IsAdminTeacher 
 */
function useDataLoaderForSchoolPupilData(objContext) {
    useEffect(() => {
        if (objContext.Pupil_ModuleProcessor.IsAdminTeacher(objContext)) {
            let strSchoolId = objContext.props.PropsCommonFunctions.GetSchoolIdByApplicationType(objContext.props);
            let strStateId = objContext.Pupil_ModuleProcessor.GetStateIdByApplicationType(objContext);
            let objPupilParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_School_Pupil.uSchoolId": strSchoolId,
                    "Type": "nested"
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iStateId": strStateId
                            }
                        }
                    ]
                },
                "OutputColumns": ["uPupilId", "vFirstName", "vName", "vBirthdate", "vEmail", "vStreet", "iZip", "vTown", "vUserName", "cIsExternal", "cIsExternalMember", "cIsTestPupil", "t_TestDrive_Member_Class_Pupil", "t_TestDrive_Member_School_Pupil"]
            };
            Object_Extranet_Pupil_Pupil.GetData(objPupilParams, () => { });
        }
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
function useDataLoaded(objContext) {
    let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);
    useEffect(() => {
        let strStateId = objContext.Pupil_ModuleProcessor.GetStateIdByApplicationType(objContext);
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (objClassData && JSON.stringify(objClassData) !== "{}" &&
            DataRef(objContext.props.Object_Extranet_Pupil_Gender)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_ClassGroup, "Object_Extranet_Teacher_ClassGroup;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objClassData["uClassId"] + ";iStateId;" + strStateId)["Data"] &&
            objContext.Pupil_ModuleProcessor.CheckDataLoadedForSchoolPupil(objContext)) {
            let arrPupilData = objContext.Pupil_ModuleProcessor.GetPupil(objContext, objContext.state.intActivationStatusTogglValue);
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilGridData": arrPupilData, "isNewRowAdded": false, "objClass": objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext) } });
        }
    }, [objContext.props.Object_Extranet_Pupil_Pupil, objContext.props.Object_Extranet_Pupil_Gender, objContext.props.Object_Extranet_Teacher_ClassGroup, objContext.props.ClassAndPupil]);
}

/**
 * @name useRefreshImportData
 * @summary refreshes the pupil data
 * @param {any} objContext
 */
function useRefreshImportData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            console.clear();
            console.log("hook of import pupil is called");
            objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilGridData": objContext.Pupil_ModuleProcessor.GetPupil(objContext, objContext.state.intActivationStatusTogglValue), "isNewRowAdded": false } });
        }
    }, [objContext.props.ImportedPupil])
}