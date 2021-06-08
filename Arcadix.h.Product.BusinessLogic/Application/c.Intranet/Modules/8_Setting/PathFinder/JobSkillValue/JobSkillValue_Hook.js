// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    return {
        isLoadComplete: blnIsLoadComplete,
        objFilters: {
            "uJobFieldId": "00000000-0000-0000-0000-000000000000",
            "iStateId": 0,
            "uJobId": "00000000-0000-0000-0000-000000000000",
            "uJobLevelId": "00000000-0000-0000-0000-000000000000",
        },        
        arrJobSkillValueData: [],
        arrSubjectTemplateData:[]
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
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.JobSkillValue_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobSubjectTemplate)["Data"]
            && DataRef(objContext.props.Object_Extranet_State_State)["Data"]
            && DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobField)["Data"]
            && DataRef(objContext.props.Object_Intranet_Setting_PathFinder_Job)["Data"]
            && DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobLevel)["Data"]
            && DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_Intranet_Setting_PathFinder_JobSubjectTemplate,
            objContext.props.Object_Extranet_State_State,
            objContext.props.Object_Intranet_Setting_PathFinder_JobField,
            objContext.props.Object_Intranet_Setting_PathFinder_Job,
            objContext.props.Object_Intranet_Setting_PathFinder_JobLevel,
            objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue"],
            objContext.props.Object_Intranet_Taxonomy_Subject,
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
            objContext.JobSkillValue_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.JobSkillValue_ModuleProcessor.SetRibbonData(objContext);
    }
}