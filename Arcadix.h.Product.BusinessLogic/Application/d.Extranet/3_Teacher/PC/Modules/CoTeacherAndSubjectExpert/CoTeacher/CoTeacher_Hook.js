//React specific
import { useEffect } from 'react';

import CoTeacher_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacher/CoTeacher_ModuleProcessor';

/**
* @name GetInitialState
* @summary State of the LearningJournal component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objCoTeacher_ModuleProcessor = new CoTeacher_ModuleProcessor();
    let arrCoTeachers = [];
    let SelectedClass = {};
    if (
        props.SubjectExpert && JSON.stringify(props.SubjectExpert) !== '{}'
    ) {
        let objSelectedClassData = objCoTeacher_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert({props}, "SelectedClassData");
        let arrPreSelectedCoTeachers = objCoTeacher_ModuleProcessor.GetPreSelectedSelectedCoTeachers({ props });
        arrCoTeachers = arrPreSelectedCoTeachers;
        SelectedClass = objSelectedClassData;
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        blnIsSaved: false,
        SelectedClass: SelectedClass,
        arrCoTeachers: arrCoTeachers
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoaded(objContext);
}

/**
 * @name useDataLoaded
 * @param {object} objContext objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (objContext.props.SubjectExpert && JSON.stringify(objContext.props.SubjectExpert) !== '{}') {
            let objSelectedClassData = objContext.CoTeacher_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            if (JSON.stringify(objContext.state.SelectedClass) === '{}' || objContext.state.SelectedClass["uClassId"] !== objSelectedClassData["uClassId"]) {
                let arrPreSelectedCoTeachers = objContext.CoTeacher_ModuleProcessor.GetPreSelectedSelectedCoTeachers(objContext);
                objContext.dispatch({ type: "SET_STATE", payload: { "arrCoTeachers": arrPreSelectedCoTeachers, "SelectedClass": objSelectedClassData } });
            }
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
        }
    }, [objContext.props.SubjectExpert]);

    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.blnIsSaved) {
            let objSelectedClassData = objContext.CoTeacher_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            let arrPreSelectedCoTeachers = objContext.CoTeacher_ModuleProcessor.GetPreSelectedSelectedCoTeachers(objContext);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrCoTeachers": arrPreSelectedCoTeachers, "SelectedClass": objSelectedClassData, "blnIsSaved": false } });
        }
    }, [objContext.props.SubjectExpert]);
}