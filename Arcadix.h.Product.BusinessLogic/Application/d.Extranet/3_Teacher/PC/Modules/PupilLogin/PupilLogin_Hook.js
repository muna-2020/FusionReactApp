//React specific
import { useEffect } from 'react';

//Common functionality imports
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';

//Module related files.
import PupilLogin_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLogin_ModuleProcessor';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name GetInitialState
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrPupilData = [];
    let objSelectedClass = {};
    let objPupilLogin_ModuleProcessor = new PupilLogin_ModuleProcessor();
    let strSchoolId = objPupilLogin_ModuleProcessor.GetSchoolId(props);
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PupilLogin", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_School_ClassLicense)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"] &&
        DataRef(props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin")["Data"]
    ) {
        let objClassData = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId).Data.filter(objClass => objClass["uClassId"] === strClassId)[0];
        arrPupilData = objPupilLogin_ModuleProcessor.GetPupilData({props}); 
        objSelectedClass = objClassData;
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        arrPupil: [],
        objSelectedClass: objSelectedClass,
        arrSelectedPupil: [],
        isSelectAll: false,
        arrPupilData: arrPupilData,
        Open: false,
        OpenProgressBar: false,
        arrOfflineProcessExecutionData: [],
        blnClassChangedInDropdown: false
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
    useDataLoaderForPupilData(objContext);
    //useDataLoaderForOfflineProcessDefinition(objContext);
    //useDataLoaderForOfflineProcessExecution(objContext);
    useOpenProgressBar(objContext);
    useDataLoadedForOfflineProcessDefinition(objContext);
}

/** 
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilLogin_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strSchoolId = objContext.PupilLogin_ModuleProcessor.GetSchoolId(objContext.props);
    let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/PupilLogin", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_School_ClassLicense)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin")["Data"]
        ) {
            let objClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data.filter(objClass => objClass["uClassId"] === strClassId)[0];
            let arrPupilData = objContext.PupilLogin_ModuleProcessor.GetPupilData(objContext);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilData": arrPupilData, "objSelectedClass": objClassData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/PupilLogin"],
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
        objContext.props.Object_Extranet_School_ClassLicense,
        objContext.props.Object_Cockpit_OfflineProcessDefinition,
        objContext.props.Object_Extranet_Teacher_Teacher
    ]);

    //useEffect(() => {
    //    if (objContext.state.isLoadComplete) {
    //        let strOfflineProcessDefinitionId = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin")["Data"][0]["uOfflineProcessDefinitionId"];
    //        if (DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + strOfflineProcessDefinitionId)) {
    //            let arrTempOfflineProcessExecution = DataRef(objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution, "Object_Cockpit_OfflineProcess_OfflineProcessExecution;uUserId;" + objContext.props.ClientUserDetails.UserId + ";uOfflineProcessDefinitionId;" + strOfflineProcessDefinitionId).Data;
    //            let arrOfflineProcessExecution = arrTempOfflineProcessExecution.filter(objTempOfflineProcessExecutionDetails => { return objTempOfflineProcessExecutionDetails["cIsDeleted"] === "N" });
    //            ApplicationState.SetProperty("blnShowAnimation", false);
    //            objContext.dispatch({ type: "SET_STATE", payload: { "arrOfflineProcessExecutionData": arrOfflineProcessExecution } });
    //        }
    //    }
    //}, [objContext.props.Object_Cockpit_OfflineProcess_OfflineProcessExecution]);
}

/**
* @name useDataLoaderForPupilData
* @param {object} objContext objContext
* @summary Calls the api to get the pupil data for the component.
*/
export function useDataLoaderForPupilData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let objClass = objContext.PupilLogin_ModuleProcessor.GetAllClasses(objContext).find(x => x["uClassId"] == strClassId);
            objClass ? objClass : { HasPackage: 'N', uClassId: "00000000-0000-0000-0000-000000000000" }
            let arrLicenseData = DataRef(objContext.props.Object_Extranet_School_ClassLicense)["Data"];
            if (objContext.PupilLogin_ModuleProcessor.HasPackage(objClass, arrLicenseData)) {
                ApplicationState.SetProperty("blnShowAnimation", true);
                objContext.PupilLogin_ModuleProcessor.GetPupilDataParams(objContext);
            }
        }
    }, [objContext.state.blnClassChangedInDropdown]);
}

///**
//* @name useDataLoaderForOfflineProcessDefinition
//* @param {object} objContext objContext
//* @summary Calls the api to get the offline process definition data for the component.
//*/
//export function useDataLoaderForOfflineProcessDefinition(objContext) {
//    useEffect(() => {
//        if (objContext.state.Open === true) {
//            ApplicationState.SetProperty("blnShowAnimation", true);
//            objContext.PupilLogin_ModuleProcessor.GetOfflineProcessDefinitionDataParams(objContext);
//        }
//    }, [objContext.state.Open]);
//}

///**
//* @name useDataLoaderForOfflineProcessExecution
//* @param {object} objContext objContext
//* @summary Calls the api to get the offline process execution data for the component.
//*/
//export function useDataLoaderForOfflineProcessExecution(objContext) {
//    useEffect(() => {
//        if (objContext.state.Open) {
//            let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin");
//            if (objOfflineProcessDefinition) {
//                let objOfflineProcessExecutionParams = objContext.PupilLogin_ModuleProcessor.GetOfflineProcessExecutionDataParams(objContext, objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"]);
//                ApplicationState.SetProperty("blnShowAnimation", true);
//                Object_Cockpit_OfflineProcess_OfflineProcessExecution.GetData(objOfflineProcessExecutionParams, (objReturn, cIsNewData) => {
//                    if (cIsNewData) {
//                        ApplicationState.SetProperty("blnShowAnimation", false);
//                    }
//                });
//            }
//        }
//    }, [objContext.props.Object_Cockpit_OfflineProcessDefinition]);
//}

/**
 * @name useOpenProgressBar
 * @param {object} objContext objContext
 * @summary 
 * */
export function useOpenProgressBar(objContext) {
    useEffect(() => {
        if (objContext.state.OpenProgressBar) {
            objContext.PupilLogin_ModuleProcessor.OpenProgressBarPopup(objContext);
            objContext.dispatch({ type: "SET_STATE", payload: { "OpenProgressBar": false } });
        }
    }, [objContext.state.OpenProgressBar]);
}

/**
* @name useDataLoadedOnOfflineProcessDefinition
* @param {object} objContext objContext
* @summary  Calls the api to get the offline process execution data for the component.
*/
export function useDataLoadedForOfflineProcessDefinition(objContext) {
    useEffect(() => {
        if (
            DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin")["Data"]
        ) {
            let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ExtranetPupilLogin");
            if (objOfflineProcessDefinition) {
                let objOfflineProcessExecutionParams = objContext.PupilLogin_ModuleProcessor.GetOfflineProcessExecutionDataParams(objContext, objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"]);
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Cockpit_OfflineProcess_OfflineProcessExecution.GetData(objOfflineProcessExecutionParams, (objReturn) => {
                    ApplicationState.SetProperty("blnShowAnimation", false);

                });
            }
        }
    }, [
        objContext.props.Object_Cockpit_OfflineProcessDefinition
    ]);
}