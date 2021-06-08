//React imports 
import { useEffect } from 'react';

//Common functionality imports.
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';
import HighStakeTestResults_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResults_ModuleProcessor';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objHighStakeTestResults_ModuleProcessor = new HighStakeTestResults_ModuleProcessor();
    let strCycleTypeId = objHighStakeTestResults_ModuleProcessor.strCycleTypeId;
    let blnArchive = objHighStakeTestResults_ModuleProcessor.blnArchive;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let objSelectedClass = undefined;
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId /*+ ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N"*/) &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/HighStakeTestResults", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsTestedAtThisTime;Y;cIsLearnCoacherSubject;Y;cIsDeleted;N;cIsHighStakeSubject;Y") &&
        (blnArchive || DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")) &&
        (!blnArchive || DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsArchiveTeacher;Y;cIsActive;Y;cIsDeleted;N")) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N") &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + "" + ";cIsDeleted;N") &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + "" + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition")["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;iApplicationTypeId;1")
    ) {
        ApplicationState.SetProperty("DisplayFor", 4);

        let objClassData = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId).Data.filter(objClass => objClass["uClassId"] === strClassId)[0];
        blnIsLoadComplete = true;
        objSelectedClass = objClassData;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        intSelectedSubjectId: -1,
        OpenCertifcateGenerationPopup: false, //Certificate Generation popup open and close.
        Open: false,//All pdf pop up open and close.
        objSelectedClass: objSelectedClass,
        strSelectedSchoolyearId: "",
        objSelectedSchoolYearPeriod: {
            uSchoolYearPeriodId: ""
        },
        arrSelectAllTestResults: [],
        strArchiveSelectedCycleId: '',
        arrOfflineProcessExecutionData: [],
        arrAllTestsForPupil: [],
        arrSelectedPupil: [], //Selected pupil needed for the request to generate certificate
        blnIsClassEight: false, //when class is not 8, then the Certificate should start generating directly without opening the popup,
        strCertificateName: "MainCertificate",
        arrSelectedPupilForVV: [],
        arrSelectedPupilForTLV: [],
        arrSelectedPupilForPSM: [],
        blnClassChanged: false
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
    useDataLoaderForClassDropDownChange(objContext);
    useDataLoaderForCycleChange(objContext);
    useDataLoaderForSchoolYearChange(objContext);
    //useDataLoaderForOfflineProcessExecution(objContext);
    useDataLoadedForOfflineProcessDefinition(objContext);
    useRefreshTokenDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.HighStakeTestResults_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaderForClassDropDownChange
 * @param {*} objContext
 * @summary   Gets the DataCallParams for when class dropdown selection changes and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForClassDropDownChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.blnClassChanged) {
            console.log("second time useDataLoaderForClassDropDownChange")
            objContext.HighStakeTestResults_ModuleProcessor.GetDataAfterClassChange(objContext);
        }
    }, [objContext.state.objSelectedClass]);
};

/**
 * @name useDataLoaderForCycleChange
 * @param {*} objContext 
 * @summary   Gets the Latest Data for the changed cycle, Here it gets . CycleRelatedObjectParams and passes them as a parameter to the DataCall method
 */
export function useDataLoaderForCycleChange(objContext) {
    useEffect(() => {
        if (objContext.state.strArchiveSelectedCycleId !== '' && objContext.HighStakeTestResults_ModuleProcessor.blnArchive) {
            console.log("second time useDataLoaderForCycleChange")
            objContext.HighStakeTestResults_ModuleProcessor.GetDataAfterCycleOrSchoolYearChange(objContext);
        }
    }, [objContext.state.strArchiveSelectedCycleId]);
}

/**
 * @name useDataLoaderForSchoolYearChange
 * @param {*} objContext 
 * @summary   Gets the Latest Data for the changed SchoolYear, Here it gets . CycleRelatedObjectParams and passes them as a parameter to the DataCall method
 */
export function useDataLoaderForSchoolYearChange(objContext) {
    useEffect(() => {
        if (objContext.state.strSelectedSchoolyearId !== '' && objContext.state.strArchiveSelectedCycleId !== '' && objContext.HighStakeTestResults_ModuleProcessor.blnArchive) {
            console.log("second time useDataLoaderForSchoolYearChange")
            objContext.HighStakeTestResults_ModuleProcessor.GetDataAfterCycleOrSchoolYearChange(objContext);
        }
    }, [objContext.state.strSelectedSchoolyearId]);
}

/**
 * @name useDataLoaded
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = objContext.HighStakeTestResults_ModuleProcessor.strCycleTypeId;
    let blnArchive = objContext.HighStakeTestResults_ModuleProcessor.blnArchive;
    let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId/* + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N"*/) &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/HighStakeTestResults", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsTestedAtThisTime;Y;cIsLearnCoacherSubject;Y;cIsDeleted;N;cIsHighStakeSubject;Y") &&
            (blnArchive || DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")) &&
            (!blnArchive || DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsArchiveTeacher;Y;cIsActive;Y;cIsDeleted;N")) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSelectedSchoolyearId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition")["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;iApplicationTypeId;1")
        ) {
            ApplicationState.SetProperty("DisplayFor", 4);
            ApplicationState.SetProperty("blnShowAnimation", false);
            let objClassData = DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId).Data.filter(objClass => objClass["uClassId"] === strClassId)[0];
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, "objSelectedClass": objClassData } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/HighStakeTestResults"],
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Intranet_Cycle_Cycle,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_Intranet_Test_IntranetTest,
        objContext.props.Object_TestApplication_TestLoginAndResult,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Cockpit_OfflineProcessDefinition,
        objContext.props.Object_Cockpit_MainClient_ClientSettings
    ]);
}


/**
* @name useDataLoadedOnOfflineProcessDefinition
* @param {object} objContext objContext
* @summary  Calls the api to get the offline process execution data for the component.
*/
export function useDataLoadedForOfflineProcessDefinition(objContext) {
    useEffect(() => {
        if (
            DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition")["Data"]
        ) {
            let arrOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition")["Data"];
            if (arrOfflineProcessDefinition && arrOfflineProcessDefinition.length > 0) {
                let objOfflineProcessExecutionParams = objContext.HighStakeTestResults_ModuleProcessor.GetOfflineProcessExecutionDataParams(arrOfflineProcessDefinition);
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

/**
 * @name useRefreshTokenDataLoaded
 * @param {object} objContext ContextObject
 * @summary Calls the RefreshTokenData method when token status changed
 */
export function useRefreshTokenDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.RefreshTestTokenData)
            objContext.HighStakeTestResults_ModuleProcessor.RefreshTokenData(objContext);
    }, [objContext.props.RefreshTestTokenData]);
}
