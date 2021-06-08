//Common functionality imports
import { useEffect } from 'react';

//Module related files.
import TimeTableClassTime_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableClassTime/TimeTableClassTime_ModuleProcessor';

/**
* @name GetInitialState
* @summary State of the TimeTableClassTime component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let arrSavedTimeTableSlots = [];
    let objTimeTableClassTime_ModuleProcessor = new TimeTableClassTime_ModuleProcessor()
    if (
        DataRef(props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + new TimeTableClassTime_ModuleProcessor().GetUserId(props) + ";cIsDeleted;N")["Data"]
    ) {
        arrSavedTimeTableSlots = objTimeTableClassTime_ModuleProcessor.GetTimeTableClassTimeJson({ props, "TimeTableClassTime_ModuleProcessor": objTimeTableClassTime_ModuleProcessor});
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        arrSavedTimeTableSlots: arrSavedTimeTableSlots,
        arrNewTimeTableSlots: [],
        arrTimeTableClassTimeDropDownData: [],
        strInputTagIdToAutoFocus: "",
        objInputTagIdToAutoFoucs: null,
        strInvaidFieldId: "",
        objInvaidFieldId: null,
        strRemoveValidationBoxFromId: "",
        objRemoveValidationBoxFromId: null,
        blnReset: false,
        blnIsSaved: false
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
}

/**
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.TimeTableClassTime_ModuleProcessor.LoadInitialData(objContext);
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
        if (DataRef(objContext.props.Object_Extranet_School_TimeTableClassTime, "Object_Extranet_School_TimeTableClassTime;uUserId;" + objContext.TimeTableClassTime_ModuleProcessor.GetUserId(objContext.props) + ";cIsDeleted;N")["Data"]) {
            objContext.dispatch({ type: 'SET_STATE', payload: { "isLoadComplete": true, "arrSavedTimeTableSlots": objContext.TimeTableClassTime_ModuleProcessor.GetTimeTableClassTimeJson(objContext), "arrNewTimeTableSlots": [] } });
            if (objContext.state.blnIsSaved) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: 'SET_STATE', payload: { "blnIsSaved": false } });
            }
        }
    }, [objContext.props.Object_Extranet_School_TimeTableClassTime]);
}