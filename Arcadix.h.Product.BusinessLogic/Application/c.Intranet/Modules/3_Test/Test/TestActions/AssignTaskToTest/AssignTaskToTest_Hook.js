// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AssignTaskToTest_OfficeRibbon from "@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/AssignTaskToTest/AssignTaskToTest_OfficeRibbon";
import * as AssignTaskToTest_Tab from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/AssignTaskToTest/AssignTaskToTest_Tab';

/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrTaskListData: [],
        arrAssignedTasks: [],
        arrDeletedTasks: [],
        objSelectedTaskInList: {},
        arrProductionReadyWorkFlowStatuses: [],
        strTaskId: "",
        intIndex: 0
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
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
        objContext.AssignTaskToTest_ModuleProcessor.LoadInitialData(objContext);
    }, []);
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
                "Save": () => objContext.AssignTaskToTest_ModuleProcessor.SaveTaskToTest(objContext),
                "SaveAndClose": () => objContext.AssignTaskToTest_ModuleProcessor.SaveTaskToTest(objContext, true)
            };
            objContext.props.SetOfficeRibbonData(AssignTaskToTest_OfficeRibbon.GetOfficeRibbonData(objRibbonData));

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
        var arrContentData = AssignTaskToTest_Tab.GetAssignTaskTestTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}


