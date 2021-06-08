// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as TestTaskProperties_Tab from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/TestTaskProperties_Tab';

/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strDivToShow: "Hierarchy"
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
    useInitializeTabData(objContext)
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.TestTaskProperties_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
            && DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"]
            && DataRef(objContext.props.Object_Intranet_Task_TaskIndexDisplay)["Data"]
            && DataRef(objContext.props.Object_Intranet_Test_TestProgressDisplay)["Data"]
            && objContext.state.arrtasktotestData
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props),
            objContext.props.Object_Cockpit_Language,
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"],
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
            objContext.props.Object_Intranet_Task_TaskIndexDisplay,
            objContext.props.Object_Intranet_Test_TestProgressDisplay,
            objContext.state.arrtasktotestData
    ]);
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
            var arrContentData = TestTaskProperties_Tab.GetTabData(objContext, objData);
            objContext.props.SetNavigationData(arrContentData);
        }
    }, [objContext.state.isLoadComplete]);
}


