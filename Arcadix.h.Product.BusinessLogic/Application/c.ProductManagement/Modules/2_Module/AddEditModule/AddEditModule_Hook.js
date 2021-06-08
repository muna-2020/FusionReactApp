// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditModule_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/2_Module/AddEditModule/AddEditModule_OfficeRibbon';
import * as AddEditModule_Tab from '@shared/Application/c.ProductManagement/Modules/2_Module/AddEditModule/AddEditModule_Tab';
import AddEditModule_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/2_Module/AddEditModule/AddEditModule_ModuleProcessor';


/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState(props) {
    return {
        objData: null,
        strDivToShow: "Module",
        objValidationMessages: {},
        arrDocuments: [],
        isLoadComplete: false
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
        objContext.AddEditModule_ModuleProcessor.LoadInitialData(objContext);
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
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objContext.props) &&
            !objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objContext.props)
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
        var arrContentData = AddEditModule_Tab.GetAddEditModuleTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeData(objContext) {

    useEffect(() => {
        let objEditData = objContext.props.Data.SelectedNode ? objContext.props.Data.SelectedNode : (ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["ModuleGrid"] && ApplicationState.GetProperty("SelectedRows")["ModuleGrid"][0] ? ApplicationState.GetProperty("SelectedRows")["ModuleGrid"][0] : {});
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : objContext.AddEditModule_ModuleProcessor.GetInitilaData(objContext) } });
        objContext.dispatch({ type: "SET_STATE", payload: {"isLoadComplete" : true}})
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditModule_ModuleProcessor = new AddEditModule_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditModule_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditModule_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditModule_OfficeRibbon.GetAddEditModuleOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData, objContext.state.arrDocuments]);
}