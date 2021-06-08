// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AssignTestToCycle_OfficeRibbon from "@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle/AssignTestToCycle_OfficeRibbon";
import * as AssignTestToCycle_Tab from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle/AssignTestToCycle_Tab';

/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        blnAssignedTestsLoaded: false,
        arrTestsToAssign :[],
        arrTestListData: [],
        arrAssignedTests: [],
        arrRemovedTests: [],
        arrNewAssignedTests:[],
        arrDeletedTasks: [],
        objSelectedTestInList: {}
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
        objContext.AssignTestToCycle_ModuleProcessor.LoadInitialData(objContext);
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
            && DataRef(objContext.props.Object_Intranet_Test_IntranetTest)["Data"]
            && DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"]
            && objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle", objContext.props)
        ) {            
            if (!objContext.state.blnAssignedTestsLoaded) {
                objContext.AssignTestToCycle_ModuleProcessor.LoadAssignedTests(objContext);
            }
            else {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
        }
    }, [
            objContext.props.Object_Intranet_Test_IntranetTest,
            objContext.props.Object_Intranet_Test_TestFolder,
            objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle", objContext.props),
            objContext.state.blnAssignedTestsLoaded
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
                "Save": () => objContext.AssignTestToCycle_ModuleProcessor.AssignTestsToCycle(objContext),
                "SaveAndClose": () => objContext.AssignTestToCycle_ModuleProcessor.AssignTestsToCycle(objContext, true)
            };
            objContext.props.SetOfficeRibbonData(AssignTestToCycle_OfficeRibbon.GetOfficeRibbonData(objRibbonData));

        }        
    }, [objContext.state]);
}


/**
 * @name useInitializeTabs
 * @param {object} objContext  objContext
 * @summary Setting up Content Data
 */
export function useInitializeTabData(objContext) {
    useEffect(() => {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = AssignTestToCycle_Tab.GetAssignTaskTestTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}


