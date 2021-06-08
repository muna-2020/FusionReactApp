// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AssignTaskToDescription_OfficeRibbon from "@shared/Application/c.Cockpit/Modules/AdminInterpretation/AssignTaskToDescription/AssignTaskToDescription_OfficeRibbon";
import * as AssignTaskToDescription_Tab from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AssignTaskToDescription/AssignTaskToDescription_Tab';

/**
* @name GetInitialState
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
        objContext.AssignTaskToDescription_ModuleProcessor.LoadInitialData(objContext);
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
                "Save": () => objContext.AssignTaskToDescription_ModuleProcessor.SaveTaskToDescription(objContext),
                "SaveAndClose": () => objContext.AssignTaskToDescription_ModuleProcessor.SaveTaskToDescription(objContext, true)
            };
            objContext.props.SetOfficeRibbonData(AssignTaskToDescription_OfficeRibbon.GetOfficeRibbonData(objRibbonData));

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
        var arrContentData = AssignTaskToDescription_Tab.GetAssignTaskToDescriptionTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}


