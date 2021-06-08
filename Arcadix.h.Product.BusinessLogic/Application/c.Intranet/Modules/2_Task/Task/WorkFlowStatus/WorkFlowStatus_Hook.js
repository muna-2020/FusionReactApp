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
        DataRef(props.Object_Cockpit_Workflow_WorkflowStatus)["Data"]
        && DataRef(props.Object_Cockpit_Workflow_WorkflowType)["Data"]
        && DataRef(props.Object_Cockpit_Workflow_Workflow)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Category", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        intWorkFlowTypeDropdownSelectedValue: -1,
        arrWorkFlowData: [],
        intWorkFlowDropdownSelectedValue: -1
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
        objContext.WorkFlowStatus_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowStatus)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Workflow_Workflow)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Workflow_WorkflowType)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlowStatus", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_Cockpit_Workflow_WorkflowStatus,
            objContext.props.Object_Cockpit_Workflow_Workflow,
            objContext.props.Object_Cockpit_Workflow_WorkflowType,
            Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/WorkFlowStatus", objContext.props),
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
            objContext.WorkFlowStatus_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.WorkFlowStatus_ModuleProcessor.SetRibbonData(objContext);
    } 

    useEffect(() => {
        if (objContext.state.isLoadComplete) {
           
        }
    }, [objContext.state]);
}

/**
 * @name useResetGridSelection
 * @param {object} objContext objContext
 * @summary To Reset the Grid Row selection.
 */
export function useResetGridSelection(objContext) {
    useEffect(() => {
        objContext.WorkFlowStatus_ModuleProcessor.ResetGridSelection("WorkFlowStatusGrid");
    }, [objContext.state.objFilter])
}
