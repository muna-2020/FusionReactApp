//React imports 
import { useEffect } from 'react';

//Common functionality imports.
import Object_Cockpit_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';
import EssayTestLogins_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/EssayTestLogins/EssayTestLogins_ModuleProcessor';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objEssayTestLogins_ModuleProcessor = new EssayTestLogins_ModuleProcessor();
    let strCycleTypeId = objEssayTestLogins_ModuleProcessor.strCycleTypeId;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/EssayTestLogins", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + strCycleTypeId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N") &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + "" + ";cIsDeleted;N") &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + "" + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Extranet_Pupil_PupilLicense, "Object_Extranet_Pupil_PupilLicense;uClassId;" + strClassId)
        //DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsHighStakeSubject;Y")
    ) {
        ApplicationState.SetProperty("DisplayFor", 4);
        ApplicationState.SetProperty("blnShowAnimation", false);
        blnIsLoadComplete = false;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        intSelectedSubjectId: -1,
        strCurrentServerDate: "",
        objSelectedClass: undefined,
        objSelectedSchoolYearPeriod: {
            uSchoolYearPeriodId: ""
        },
        strSchoolYearId: '',
        //arrPdfFilesInfo: [],
        iSchoolYerPeriodCounter: 0,
        arrSelectedPupilTestData: [],
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
    useDataLoadedForOfflineProcessDefinition(objContext);
    useDataLoaderForClassDropDownChange(objContext);
    useUpdatePupilData(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.EssayTestLogins_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}


/**
 * @name useDataLoaded
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = objContext.EssayTestLogins_ModuleProcessor.strCycleTypeId;
    let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/EssayTestLogins", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + strCycleTypeId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSchoolYearId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;GenerateEssayTestLogins")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Pupil_PupilLicense, "Object_Extranet_Pupil_PupilLicense;uClassId;" + strClassId)
        ) {
            ApplicationState.SetProperty("DisplayFor", 4);
            ApplicationState.SetProperty("blnShowAnimation", false);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            }
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/EssayTestLogins"],
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Intranet_Cycle_Cycle,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_Intranet_Test_IntranetTest,
        objContext.props.Object_TestApplication_TestLoginAndResult,
        objContext.props.Object_Cockpit_OfflineProcessDefinition,
        objContext.props.Object_Extranet_Pupil_PupilLicense
    ])

}


/**
* @name useDataLoadedOnOfflineProcessDefinition
* @param {object} objContext objContext
* @summary  Calls the api to get the offline process execution data for the component.
*/
export function useDataLoadedForOfflineProcessDefinition(objContext) {
    useEffect(() => {
        if (
            DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;GenerateEssayTestLogins")["Data"]
        ) {
            let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;GenerateEssayTestLogins");
            if (objOfflineProcessDefinition) {
                let objOfflineProcessExecutionParams = objContext.EssayTestLogins_ModuleProcessor.GetOfflineProcessExecutionDataParams(objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"]);
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Cockpit_OfflineProcessExecution.GetData(objOfflineProcessExecutionParams, (objReturn) => {
                    ApplicationState.SetProperty("blnShowAnimation", false);

                });
            }
        }
    }, [
        objContext.props.Object_Cockpit_OfflineProcessDefinition
    ]);
}

/**
 * @name useDataLoaderForClassDropDownChange
 * @param {*} objContext
 * @summary   Gets the DataCallParams for when class dropdown selection changes and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForClassDropDownChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.blnClassChanged) {
            objContext.EssayTestLogins_ModuleProcessor.GetDataAfterClassChange(objContext);
        }
    }, [objContext.state.objSelectedClass]);
};

/**
 * @name useUpdatePupilData
 * @param {*} objContext
 * @summary   Gets the Pupil data on change of any Pupil data
 */
export function useUpdatePupilData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.EssayTestLogins_ModuleProcessor.GetPupilData(objContext);
        }
    }, [objContext.props.Object_Extranet_Pupil_Pupil]);
};

