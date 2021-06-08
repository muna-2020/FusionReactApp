// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditDocument_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/5_Document/AddEditDocument/AddEditDocument_OfficeRibbon';
import * as AddEditDocument_Tab from '@shared/Application/c.ProductManagement/Modules/5_Document/AddEditDocument/AddEditDocument_Tab';
import AddEditDocument_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/5_Document/AddEditDocument/AddEditDocument_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "Document",
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
        objContext.AddEditDocument_ModuleProcessor.LoadInitialData(objContext);
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
            objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props) &&
            !objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
        objContext.Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objContext.props)
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
        var arrContentData = AddEditDocument_Tab.GetAddEditDocumentTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["DocumentGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "objData": objContext.props.Data.IsEdit ? objEditData : {
                    ["uDocumentFolderId"]: objContext.props.Data.DocumentFolderId,
                    ["cIsForModule"]: objContext.props.Data && objContext.props.Data.IsForModule ? "Y" : "N",
                    ["cIsForImplementationStep"]: objContext.props.Data && objContext.props.Data.IsForImplementationStep ? "Y" : "N",
                    ["cIsForTestCase"]: objContext.props.Data && objContext.props.Data.IsForTestCase ? "Y" : "N",
                    ["cIsForUseCase"]: objContext.props.Data && objContext.props.Data.IsForUseCase ? "Y" : "N",
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
        let objAddEditDocument_ModuleProcessor = new AddEditDocument_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditDocument_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditDocument_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditDocument_OfficeRibbon.GetAddEditDocumentOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

