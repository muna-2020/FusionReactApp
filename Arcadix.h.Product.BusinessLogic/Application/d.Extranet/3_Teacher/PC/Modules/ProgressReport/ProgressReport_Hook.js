//React specific
import { useEffect } from 'react';

//Common functionality imports
import ProgressReport_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport_ModuleProcessor';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name GetInitialState
* @summary State of the ProgressReport profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objProgressReport_ModuleProcessor = new ProgressReport_ModuleProcessor()
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strOrientationCycleTypeId = objProgressReport_ModuleProcessor.GetOrienationCycleTypeId();
    let strLearningCycleTypeId = objProgressReport_ModuleProcessor.GetLearningCycleTypeId();
    let strHighStakeCycleTypeId = objProgressReport_ModuleProcessor.GetHighStakeCycleTypeId();
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    let strSchoolYearPeriodId = "";

    let strUserPreferenceClassId = undefined;
    let arrSubjectData = undefined;
    let arrParentSubjectData = [];
    let arrOrientionSubSubjectData = [];
    let arrLearningSubSubjectData = [];
    let objSelParentSubject = undefined;

    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject")["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iMainClientId;" + props.ClientUserDetails.MainClientId)["Data"] &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N")["Data"] &&
        //DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
        //DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + strSchoolYearPeriodId + ";iStateId;" + iStateId)["Data"] &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + strSchoolYearPeriodId + ";iStateId;" + iStateId)["Data"] &&
        DataRef(props.Extranet_Teacher_ProgressReport_Module, "Extranet_Teacher_ProgressReport_Module;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/ProgressReport", props)
    ) {
        ApplicationState.SetProperty("blnShowAnimation", false);
        ApplicationState.SetProperty("DisplayFor", 4);
        arrSubjectData = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject")["Data"];
        arrParentSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] === 0);
        objSelParentSubject = arrParentSubjectData[0];
        arrOrientionSubSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsTestedAtThisTime"] == "Y");
        arrLearningSubSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsReadyForSystemLearningTest"] == "Y");
        strUserPreferenceClassId = strClassId;
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        objSelectedClass: undefined,
        strUserPreferenceClassId: strUserPreferenceClassId,
        objUserPreference: objUserPreference,
        objSelParentSubject: objSelParentSubject,
        arrParentSubjectData: arrParentSubjectData,
        arrOrientionSubSubjectData: arrOrientionSubSubjectData,
        arrLearningSubSubjectData: arrLearningSubSubjectData,
        blnCompetencyModeOn: false,
        objSelPupilForSummaryPopup: undefined,
        objSelSubjectForSummaryPopup: undefined,
        blnShowAllPdf: false,
        arrOfflineProcessExecutionData: [],
        strStartDate: "",
        strEndDate: "",
        strSchoolYearPeriodId: "",
        arrSubjectData: arrSubjectData
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaderForOfflineProcessDefinition(objContext);
    useDataLoaderForOfflineProcessExecution(objContext);
    useDataLoaded(objContext);
    //useDataLoadedForAllPdf(objContext);
    useDataLoadForClassChange(objContext);
}

/** 
* @name useDataLoader
* @param {object} objContext objContext
* @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.ProgressReport_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaderForOfflineProcessDefinition
* @param {object} objContext objContext
* @summary   Gets the OfflineProcessDefinitionData and passes them as a parameter to the DataCall method.
*/
export function useDataLoaderForOfflineProcessDefinition(objContext) {
    const GetRequiredData = () => {
        //if (objContext.state.blnShowAllPdf === true) {
        objContext.ProgressReport_ModuleProcessor.LoadOfflineProcessDefinitionData(objContext);
        //}
    };
    useEffect(GetRequiredData, [objContext.state.blnShowAllPdf]);
}

/**
* @name useDataLoaderForOfflineProcessExecution
* @param {object} objContext objContext
* @summary   Gets the OfflineProcessExecutionData and passes them as a parameter to the DataCall method.
*/
export function useDataLoaderForOfflineProcessExecution(objContext) {
    useEffect(() => {
        let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ProgressReportGeneration");
        if (objOfflineProcessDefinition) {
            objContext.ProgressReport_ModuleProcessor.GetOfflineProcessExecutionData(objContext, objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"]);
        }
    }, [objContext.props.Object_Cockpit_OfflineProcessDefinition]);
}

/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let strOrientationCycleTypeId = objContext.ProgressReport_ModuleProcessor.GetOrienationCycleTypeId();
        let strLearningCycleTypeId = objContext.ProgressReport_ModuleProcessor.GetLearningCycleTypeId();
        let strHighStakeCycleTypeId = objContext.ProgressReport_ModuleProcessor.GetHighStakeCycleTypeId();
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let strSchoolYearPeriodId = objContext.state.strSchoolYearPeriodId;

        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);

        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject")["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iMainClientId;" + objContext.props.ClientUserDetails.MainClientId)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N")["Data"] &&
            //DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
            //DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
            DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + strSchoolYearPeriodId + ";iStateId;" + iStateId)["Data"] &&
            DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;" + strSchoolYearPeriodId + ";iStateId;" + iStateId)["Data"] &&
            DataRef(objContext.props.Extranet_Teacher_ProgressReport_Module, "Extranet_Teacher_ProgressReport_Module;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/ProgressReport", objContext.props)

        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("DisplayFor", 4);
            let arrSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject")["Data"];
            let arrParentSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] === 0);
            let objSelParentSubject = arrParentSubjectData[0];
            let arrOrientionSubSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsTestedAtThisTime"] == "Y");
            let arrLearningSubSubjectData = arrSubjectData.filter(sub => sub["iParentSubjectId"] == objSelParentSubject["iSubjectId"] && sub["cIsReadyForSystemLearningTest"] == "Y");
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    isLoadComplete: true,
                    strUserPreferenceClassId: strClassId,
                    objUserPreference: objUserPreference,
                    arrSubjectData: arrSubjectData,
                    arrParentSubjectData: arrParentSubjectData,
                    arrOrientionSubSubjectData: arrOrientionSubSubjectData,
                    arrLearningSubSubjectData: arrLearningSubSubjectData,
                    objSelParentSubject: objSelParentSubject
                }
            });
        }
        else {
            console.log("data is loading");
        }

    },
        [
            objContext.props.Object_Extranet_Teacher_Class,
            objContext.props.Object_Extranet_Pupil_Pupil,
            objContext.props.Object_Intranet_Taxonomy_Subject,
            objContext.props.Object_Intranet_Test_IntranetTest,
            objContext.props.Object_TestApplication_TestLoginAndResult,
            objContext.props.Extranet_Teacher_ProgressReport_Module,
            objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold,
            objContext.props.Object_Intranet_Cycle_Cycle,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/ProgressReport"]
        ]);
}

/**
* @name useDataLoadForClassChange
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly. Executes each time OfflineProcessExecution updates
*/
export function useDataLoadForClassChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSelectedClass != undefined) { 
            let arrRequest = objContext.ProgressReport_ModuleProcessor.GetDataRequestDependsOnClass(objContext.props, objContext.state.objSelectedClass.uClassId, objContext.state.strSchoolYearPeriodId);
            (new ObjectQueue()).QueueAndExecute(arrRequest,
                    () => {
                        //ApplicationState.SetProperty("blnShowAnimation", false)
                    }
                );
        }
    },[objContext.state.objSelectedClass]);
}