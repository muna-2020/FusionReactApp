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
    if (
        DataRef(props.Object_Cockpit_Workflow_Workflow)["Data"]
        && DataRef(props.Object_Cockpit_Workflow_WorkflowType)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlow", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strWorkflowTypeId: -1,
        strActiveWorkFlowId: -1
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
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.WorkFlow_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}


/**
 * @name useDataLoaded
 * @param {*} objContext 
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Cockpit_Workflow_Workflow)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlow", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });

        }
    }, [
            objContext.props.Object_Cockpit_Workflow_Workflow,
            objContext.props.Object_Cockpit_Workflow_WorkflowType,
            Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlow", objContext.props),
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
            objContext.WorkFlow_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.WorkFlow_ModuleProcessor.SetRibbonData(objContext);
    } 
}

/**
 * @name useResetGridSelection
 * @param {object} objContext objContext
 * @summary To Reset the Grid Row selection.
 */
export function useResetGridSelection(objContext) {
    useEffect(() => {
        objContext.WorkFlow_ModuleProcessor.ResetGridSelection("WorkFlowGrid");
    }, [objContext.state.objFilter])
}