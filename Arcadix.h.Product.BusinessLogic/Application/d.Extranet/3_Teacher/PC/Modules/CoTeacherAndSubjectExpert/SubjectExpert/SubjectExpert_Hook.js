//React specific
import { useEffect } from 'react';
import SubjectExpert_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/SubjectExpert/SubjectExpert_ModuleProcessor';

/**
* @name GetInitialState
* @summary State of the LearningJournal component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objSubjectExpert_ModuleProcessor = new SubjectExpert_ModuleProcessor();
    let SelectedClass = {};
    let arrSubjectExperts = [];
    if (
        props.SubjectExpert && JSON.stringify(props.SubjectExpert) !== '{}'
    ) {
        let objSelectedClassData = objSubjectExpert_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert({props}, "SelectedClassData");
        let arrPreSelectedSubjectExperts = objSubjectExpert_ModuleProcessor.GetPreSelectedSelectedSubjectExperts({props});
        arrSubjectExperts = arrPreSelectedSubjectExperts;
        SelectedClass = objSelectedClassData;
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        blnIsSaved: false,
        SelectedClass: SelectedClass,
        arrSubjectExperts: arrSubjectExperts
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
        if (objContext.props.SubjectExpert && JSON.stringify(objContext.props.SubjectExpert) !== '{}') {
            let objSelectedClassData = objContext.SubjectExpert_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            if (JSON.stringify(objContext.state.SelectedClass) === '{}' || objContext.state.SelectedClass["uClassId"] !== objSelectedClassData["uClassId"]) {
                let arrPreSelectedSubjectExperts = objContext.SubjectExpert_ModuleProcessor.GetPreSelectedSelectedSubjectExperts(objContext);
                objContext.dispatch({ type: "SET_STATE", payload: { "arrSubjectExperts": arrPreSelectedSubjectExperts, "SelectedClass": objSelectedClassData } });
            }
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
        }
    }, [objContext.props.SubjectExpert]);

    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.blnIsSaved) {
            let objSelectedClassData = objContext.SubjectExpert_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
            let arrPreSelectedSubjectExperts = objContext.SubjectExpert_ModuleProcessor.GetPreSelectedSelectedSubjectExperts(objContext);
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSubjectExperts": arrPreSelectedSubjectExperts, "SelectedClass": objSelectedClassData, "blnIsSaved": false } });
        }
    }, [objContext.props.SubjectExpert]);
}