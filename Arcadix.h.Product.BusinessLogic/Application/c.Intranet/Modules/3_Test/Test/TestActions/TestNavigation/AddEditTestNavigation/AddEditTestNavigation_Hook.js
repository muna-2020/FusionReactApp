﻿// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditTestNavigation_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/AddEditTestNavigation/AddEditTestNavigation_OfficeRibbon';
import * as AddEditTestNavigation_Tab from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/AddEditTestNavigation/AddEditTestNavigation_Tab';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "TestCase"
    };
}

/**
 * @name Initialize
 * @param {object} objContext  Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useInitializeData(objContext);
    useInitializeTabData(objContext);
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.AddEditTestNavigation_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (
            objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation", objContext.props) &&
            !objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
            objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation", objContext.props)
    ]);
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
        var arrContentData = AddEditTestNavigation_Tab.GetAddEditTestNavigationTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, [objContext.state]);
}

/**
 * @name useInitializeData
 * @param {object} objContext objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeData(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestNavigationGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "objData": objContext.props.Data.IsEdit ? objEditData : {
                    ["uTestId"]: objContext.props.Data.TestData.uTestId,
                    //["iPageId"]: objContext.props.Data.TaskData ? objContext.props.Data.TaskData.iPageId : 0,
                    ["uParentTestNavigationId"]: (objContext.props.Data.ParentNavigationData && objContext.props.Data.ParentNavigationData.uTestNavigationId) ? objContext.props.Data.ParentNavigationData.uTestNavigationId :"00000000-0000-0000-0000-000000000000"
                }
            }
        });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        var objData = {
            objContext,
            "SaveMethod": () => objContext.AddEditTestNavigation_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objContext.AddEditTestNavigation_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditTestNavigation_OfficeRibbon.GetAddEditTestCaseOfficeRibbonData(objData, objContext);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData, objContext.state]);
}

