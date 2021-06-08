// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as TaskQuestion_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/TaskQuestion_OfficeRibbon';
import * as TaskQuestion_Tab from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/TaskQuestion_Tab';


/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Intranet_Task_TaskQuestionPolarity)["Data"]
        && DataRef(props.Object_Intranet_Task_TaskQuestion, "Object_Intranet_Task_TaskQuestion;iPageId;" + props.PageId)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        intSubjectDropdownSelectedValue: -1,
        arrSubSubjectData: [],
        intSubSubjectDropdownSelectedValue: -1
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
    useInitializeTabData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.TaskQuestion_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Intranet_Task_TaskQuestion, "Object_Intranet_Task_TaskQuestion;iPageId;" + objContext.props.PageId)["Data"]
            && DataRef(objContext.props.Object_Intranet_Task_TaskQuestionPolarity)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
        objContext.props.Object_Intranet_Task_TaskQuestion,
        objContext.props.Object_Intranet_Task_TaskQuestionPolarity,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion"],
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage
    ]);
}


/**
* @name useSetRibbonData
* @param {object} objContext objContext
* @summary Setting up TabData and RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objRibbonData = {
                objContext,
                "AddPopup": () => objContext.TaskQuestion_ModuleProcessor.OpenAddEditPopup(objContext, false),
                "EditPopup": () => objContext.TaskQuestion_ModuleProcessor.OpenAddEditPopup(objContext, true),
                "DeletePopup": () => objContext.TaskQuestion_ModuleProcessor.OpenDeletePopup(objContext)
            };
            //ApplicationState.SetProperty("OfficeRibbonData", TaskQuestion_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
            let arrRibbonData = TaskQuestion_OfficeRibbon.GetOfficeRibbonData(objRibbonData);
            //this is done to update the reference 
            objContext.props.SetOfficeRibbonData(arrRibbonData);
        }
    }, [objContext.state]);
}


/**
* @name useInitializeTabData
* @param {object} objContext  objContext
* @summary Setting up Content Data
*/
export function useInitializeTabData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objData = {
                "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
            };
            var arrContentData = TaskQuestion_Tab.GetTabData(objContext, objData);
            objContext.props.SetNavigationData(arrContentData);
        }
    }, [objContext.state.isLoadComplete]);
}