//Common functionality imports
import { useEffect } from 'react';

//Module related files.
import TimeTableSubject_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSubject/TimeTableSubject_ModuleProcessor';

/**
* @name GetInitialState
* @summary State of the TimeTableSubject component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let arrSavedSubjects = [];
    let objTimeTableSubject_ModuleProcessor = new TimeTableSubject_ModuleProcessor()
    if (
        DataRef(props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + new TimeTableSubject_ModuleProcessor().GetUserId(props) + ";cIsDeleted;N")
    ) {
        blnIsLoadComplete = true;
        arrSavedSubjects = objTimeTableSubject_ModuleProcessor.GetSchoolSubjectJson({ props, "TimeTableSubject_ModuleProcessor": objTimeTableSubject_ModuleProcessor });
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        arrSavedSubjects: arrSavedSubjects,
        objNewSubject: {},
        objSubjectToEdit: {},
        strOperation: "",
        blnAddRow: false,
        blnEditRow: false,
        blnReset: false
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
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TimeTableSubject_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (DataRef(objContext.props.Object_Extranet_School_SchoolSubject, "Object_Extranet_School_SchoolSubject;uUserId;" + objContext.TimeTableSubject_ModuleProcessor.GetUserId(objContext.props) + ";cIsDeleted;N")) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: 'SET_STATE', payload: { "isLoadComplete": true, "arrSavedSubjects": objContext.TimeTableSubject_ModuleProcessor.GetSchoolSubjectJson(objContext), "objNewSubject": {}, "objSubjectToEdit": {}, "strOperation": "", "blnAddRow": false, "blnEditRow": false } });
        }
    }, [objContext.props.Object_Extranet_School_SchoolSubject]);
}