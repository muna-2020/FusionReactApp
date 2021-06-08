//React imports 
import { useEffect } from 'react';

//Module specific imports
import LearningTestTeacher_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher_ModuleProcessor'
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name GetInitialState
 * @summary returns initial state
 * @returns {Object}
 * */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objLearningTestTeacher_ModuleProcessor = new LearningTestTeacher_ModuleProcessor();
    let strCycleTypeId = objLearningTestTeacher_ModuleProcessor.strCycleTypeId;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    let iSubjectId = objLearningTestTeacher_ModuleProcessor.GetUserpreferenceSubjectId();
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", props) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N") &&
        DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings") &&
        DataRef(props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;;uTeacherId;" + props.ClientUserDetails.UserId) &&
        DataRef(props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;;uClassId;" + strClassId + ";iStateId;" + iStateId)
    ) {
        // ApplicationState.SetProperty("DisplayFor", 4);//for week display component
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        intSelectedParentSubjectId: iSubjectId ? iSubjectId : -1,
        intSelectedSubSubjectId: -1,
        intStatusToggle: 1,
        strSelectedPupilId: "00000000-0000-0000-0000-000000000000",
        intSelectedModusId: -1,
        strTimePeriod: 1,
        objSelectedSchoolYearPeriod: {
            uSchoolYearPeriodId: ""
        },
        iSchoolYerPeriodCounter: 0,
        blnSearchBtnClicked: false,
        objSelectedDate: undefined
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
    useDataLoaderForChangeOfClassDropdownSelection(objContext);
    useDataLoaderForSkinName(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.LearningTestTeacher_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaderForChangeOfClassDropdownSelection
 * @param {*} objContext 
 * @summary   Triggered when the class dropdown selection changes. Gets the Pupil and ExtranetTest params and makes seperate calls to get data.
 */
export function useDataLoaderForChangeOfClassDropdownSelection(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.LearningTestTeacher_ModuleProcessor.GetDataAfterClassChange(objContext);
        }
    }, [objContext.state.blnIsClassSelectionChanged]);
};

/**
 * @name useDataLoaderForChangeOfWeekDisplaySelection
 * @param {*} objContext 
 * @summary   Trigerred when WeekDisplay component is traversed.
 */
export function useDataLoaderForChangeOfWeekDisplaySelection(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            if (objContext.state.intWeekDisplayChangeCount > 0)//This useEffect gets triggered when the week display component is invoked. So as to reduce the call this check is made.
            {
                ApplicationState.SetProperty("blnShowAnimation", true);
                //  DataCall(objContext, GetExtranetTestParams(objContext), "FetchExecuteForExtranetTest");
            }
            else {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intWeekDisplayChangeCount": objContext.state.intWeekDisplayChangeCount + 1 } });
            }
        }
    }, [objContext.state.objWeekDisplaySelection]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = objContext.LearningTestTeacher_ModuleProcessor.strCycleTypeId
    let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N") &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings") &&
            DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;;uTeacherId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;;uClassId;" + strClassId + ";iStateId;" + iStateId)) {
            ApplicationState.SetProperty("DisplayFor", 4);//for week display component
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } })

        }
    }, [
        objContext.props.Object_Extranet_Teacher_Class, objContext.props.Object_Intranet_Taxonomy_Subject, objContext.props.Object_Framework_Services_TextResource, objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Cockpit_MainClient_ClientSettings, objContext.props.Object_TestApplication_LearningTestLoginAndResult, objContext.props.Object_Intranet_Cycle_Cycle, objContext.props.Object_Intranet_Test_ExtranetTest
    ]);
};

/**
 * @name useDataLoaderForSkinName
 * @summary data loader for skinName
 * @param {any} objContext
 */
export function useDataLoaderForSkinName(objContext) {
    useEffect(() => {
        objContext.LearningTestTeacher_ModuleProcessor.GetSkinData(objContext)
    }, [objContext.props.Object_Cockpit_MainClient_ClientSettings])
}