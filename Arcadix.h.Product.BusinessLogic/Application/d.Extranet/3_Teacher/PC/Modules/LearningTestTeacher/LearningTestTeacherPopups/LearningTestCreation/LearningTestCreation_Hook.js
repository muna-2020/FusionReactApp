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
        intSelectedParentSubjectId: -1,
        intSelectedSubSubjectId: -1,
        intSelectedModusId: 3,
        blnSelectAllPupil: false,
        arrSelectedPupilId: [],
        arrSelectedPupilForCreatingGroup: [],
        arrSelectedCategoryId: [],
        arrSelectedCategoryCompetencyId: [],
        Tab: 1,
        objValidation: {},
        blnShowValidation: false,
        strValidationMessage: "",
        arrSelectedPupilGroupId: [],
        SelectedClassId: "",
        objSelectedClassData: {},
        arrTasks: [],
        strTestName: "",
        arrSelectedTasks: [],
        OpenAddLearningTestPopup: false,
        blnIsNTCheckBoxSelected: false
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
    useDataLoaderForClassChange(objContext);
    useDataLoaderForCategory(objContext);
    useDataLoaderForTasks(objContext);
}

/**
 * @name useDataLoader
 * @summary Custom hook which is to make data call when component loaded.
 * @param {any} objContext
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.LearningTestCreation_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * 
 * @param {*} objContext 
 * @summary   This useEffect is triggered when the class drop down selection changes.
 */
export function useDataLoaderForClassChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.LearningTestCreation_ModuleProcessor.GetPupilDataAfterClassChange(objContext);
        }
    }, [objContext.state.objSelectedClassData]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   This useEffect is triggered when the Competency is selected in the competency dropdown.
 */
export function useDataLoaderForCategory(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.intSelectedSubSubjectId !== -1) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.LearningTestCreation_ModuleProcessor.GetCategoryData(objContext);
        }
    }, [objContext.state.intSelectedSubSubjectId]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   This useEffect is triggered when the local state (TAB) changes to 3
 */
export function useDataLoaderForTasks(objContext) {
    useEffect(() => {
        if (objContext.state.Tab === 3) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.LearningTestCreation_ModuleProcessor.GetTasks(objContext);
        }
    }, [objContext.state.Tab])
};

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strUserId = objContext.props.Data.ClientUserDetails.UserId;
    let iStateId = GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + strUserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N") &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsReadyForManualLearningTest;Y;cIsActive;Y;cIsDeleted;N") &&
            objContext.Object_Framework_Services_TextResource && objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", objContext.props) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId) &&
            DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings") &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency, "Object_Intranet_Taxonomy_CategoryCompetency;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Extranet_Teacher_LearningTestPupilGroup, "Object_Extranet_Teacher_LearningTestPupilGroup;uUserId;" + strUserId) &&
            DataRef(objContext.props.Object_TestApplication_TestResultAttributes, "Object_TestApplication_TestResultAttributes;vAttributeKey;TestPoint") && //&& 
            DataRef(objContext.props.Object_Intranet_Taxonomy_Category, "Object_Intranet_Taxonomy_Category;iSubjectId;" + objContext.props.Data.intSelectedSubSubjectId + ";cIsDeleted;N") //&& 
           /* DataRef(objContext.props.elementattributetemplates, "elementattributetemplates;cIsForWholeTask;N")*/) {
            if (!objContext.state.isLoadComplete) {
                let blnShowCompileTasksPopup = objContext.LearningTestCreation_ModuleProcessor.CheckIfToShowCompileTasksPopup(objContext);
                objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, "Tab": blnShowCompileTasksPopup ? 1 : 2 } });
            }
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_CategoryCompetency, objContext.props.Object_Extranet_Teacher_LearningTestPupilGroup, objContext.props.Object_TestApplication_TestResultAttributes, objContext.props.elementattributetemplates, objContext.props.Object_Intranet_Taxonomy_Category,
        objContext.props.Object_Extranet_Teacher_Class, objContext.props.Object_Intranet_Taxonomy_Subject, objContext.props.Object_Framework_Services_TextResource, objContext.props.Object_Extranet_Pupil_Pupil, objContext.props.Object_Cockpit_MainClient_ClientSettings
    ]);

};
