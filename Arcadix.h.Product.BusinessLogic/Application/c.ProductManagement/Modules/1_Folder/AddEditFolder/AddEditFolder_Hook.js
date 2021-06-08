// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditProductManageFolder_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/1_Folder/AddEditFolder/AddEditFolder_OfficeRibbon';
import * as AddEditProductManageFolder_Tab from '@shared/Application/c.ProductManagement/Modules/1_Folder/AddEditFolder/AddEditFolder_Tab';


/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState(props) {
    return {
        objData: {},
        strDivToShow: "Folder",
        objValidationMessages: {},
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
        objContext.AddEditProductManageFolder_ModuleProcessor.LoadInitialData(objContext);
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
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/1_Folder/Folder", objContext.props) &&
            !objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/1_Folder/Folder", objContext.props)
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
        var arrContentData = AddEditProductManageFolder_Tab.GetAddEditFolderTab(objContext, objData);
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
        let objEditData = objContext.props.Data.SelectedNode;
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : objContext.AddEditProductManageFolder_ModuleProcessor.GetInitilaData(objContext) } });
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
            "SaveMethod": () => objContext.AddEditProductManageFolder_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objContext.AddEditProductManageFolder_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditProductManageFolder_OfficeRibbon.GetAddEditTaskFolderOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}