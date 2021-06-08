//React imports 
import { useEffect } from 'react';

//Common functionality imports.
import Object_Cockpit_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';
import TestResults_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults_ModuleProcessor';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';
/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objTestResults_ModuleProcessor = new TestResults_ModuleProcessor();
    let strCycleTypeId = objTestResults_ModuleProcessor.strCycleTypeId;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let iSubjectId = objTestResults_ModuleProcessor.GetUserpreferenceSubjectId();
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestResults", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsTestedAtThisTime;Y") &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + strCycleTypeId) &&
        DataRef(props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N") &&
        DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + "" + ";cIsDeleted;N") &&
        DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + "" + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback")["Data"]
    ) {
        ApplicationState.SetProperty("DisplayFor", 4);
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        intSelectedSubjectId: iSubjectId ? iSubjectId : -1,
        Open: false,//All pdf pop up open and close.
        objSelectedClass: undefined,
        strSchoolYearId: "",
        objSelectedSchoolYearPeriod: {
            uSchoolYearPeriodId: ""
        },
        arrSelectedResults: [],
        arrSelectAllTestResults: [],
        objTempTest: undefined, // for testing only
        strCycleId: undefined, // for testing only
        arrPdfFilesInfo: [],
        showLearningTestGenerationPopup: false,
        iExecutionCount: 0
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
    useDataLoadedOnOfflineProcessDefinition(objContext);
    useRefreshTokenDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TestResults_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaderForClassDropDownChange
 * @param {*} objContext
 * @summary   Gets the DataCallParams for when class dropdown selection changes and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForClassDropDownChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.TestResults_ModuleProcessor.GetDataAfterClassOrSchoolYearPeriodChange(objContext)
        }
    }, [objContext.state.objSelectedClass]);
};

/**
 * @name useDataLoaded
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = objContext.TestResults_ModuleProcessor.strCycleTypeId;
    let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TestResults", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsActive;Y;cIsDeleted;N;cIsTestedAtThisTime;Y") &&
            DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + strCycleTypeId) &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear, "Object_Extranet_Teacher_SchoolYear;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";iSchoolYearId;" + objContext.state.strSchoolYearId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.objSelectedSchoolYearPeriod.uSchoolYearPeriodId + ";uClassId;" + strClassId + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback")["Data"]
            //objContext.TestResults_ModuleProcessor.GetOfflineExecutionLoaded(objContext)
        ) {
            ApplicationState.SetProperty("DisplayFor", 4);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TestResults"],
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Intranet_Cycle_Cycle,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_Intranet_Test_IntranetTest,
        objContext.props.Object_TestApplication_TestLoginAndResult,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Cockpit_OfflineProcessDefinition
        //objContext.props.Object_Cockpit_OfflineProcessExecution
    ])
}

/**
* @name useDataLoadedOnOfflineProcessDefinition
* @param {object} objContext objContext
* @summary  Calls the api to get the offline process execution data for the component.
*/
export function useDataLoadedOnOfflineProcessDefinition(objContext) {
    useEffect(() => {
        if (
            DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback")["Data"]
        ) {
            let objOfflineProcessDefinition = DataRef(objContext.props.Object_Cockpit_OfflineProcessDefinition, "Object_Cockpit_OfflineProcessDefinition;vOfflineProcessKeyword;ResultThresholdFeedback");
            if (objOfflineProcessDefinition) {
                let objOfflineProcessExecutionParams = {
                    "ForeignKeyFilter": {
                        "uUserId": ClientUserDetails.UserId
                    },
                    "SearchQuery": {
                        "must": [
                            {
                                "match": {
                                    "uOfflineProcessDefinitionId": objOfflineProcessDefinition.Data[0]["uOfflineProcessDefinitionId"]
                                }
                            }
                        ]
                    },
                    "SortKeys": [
                        {
                            "dtCreatedOn": {
                                "order": "asc"
                            }
                        }
                    ]
                };
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
 * @name useRefreshTokenDataLoaded
 * @param {object} objContext ContextObject
 * @summary Calls the RefreshTokenData method when token status changed
 */
export function useRefreshTokenDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.props.RefreshTestTokenData)
            objContext.TestResults_ModuleProcessor.RefreshTokenData(objContext);
    }, [objContext.props.RefreshTestTokenData]);
}