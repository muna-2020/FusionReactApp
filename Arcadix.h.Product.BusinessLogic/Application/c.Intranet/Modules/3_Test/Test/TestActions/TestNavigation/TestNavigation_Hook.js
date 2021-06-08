// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AssignTaskToTest_OfficeRibbon from "@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/AssignTaskToTest/AssignTaskToTest_OfficeRibbon";
import * as TestNavigation_Tab from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/TestNavigation_Tab';

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
        arrTreeData : [],
        arrAssignedTasks: [],
        arrDeletedTasks: [],
        objSelectedTaskInList: { uTestNavigationId: "00000000-0000-0000-0000-000000000000", uParentTestNavigationId: "-1", vNavigationName: "MainNavigation", Type: "FOLDER", expanded: true },
        objSelectedTaskInTree: { iPageId: "0", iFolderId: "-1", vPageName: "Tasks", Type: "FOLDER", expanded: true, ShowExpandCollapseIcon: true },
        strTaskId: "",
        intIndex: 0,
        arrNavigationsToSave: [],
        arrProductionReadyWorkFlowStatuses: []
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
        objContext.TestNavigation_ModuleProcessor.LoadInitialData(objContext);
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
                "Save": () => objContext.TestNavigation_ModuleProcessor.SaveData(objContext),
                "SaveAndClose": () => objContext.TestNavigation_ModuleProcessor.SaveData(objContext, true)
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
        var arrContentData = TestNavigation_Tab.GetTestNavigationTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}


