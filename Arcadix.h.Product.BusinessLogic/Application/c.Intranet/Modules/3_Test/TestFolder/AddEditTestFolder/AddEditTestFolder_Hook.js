// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditTestFolder_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/TestFolder/AddEditTestFolder/AddEditTestFolder_OfficeRibbon';
import * as AddEditTestFolder_Tab from '@shared/Application/c.Intranet/Modules/3_Test/TestFolder/AddEditTestFolder/AddEditTestFolder_Tab';
import AddEditTestFolder_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/TestFolder/AddEditTestFolder/AddEditTestFolder_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState(props) {
    return {
        objData: {},
        strDivToShow: "TestFolder",
        objValidationMessages: {}
    };
}

/**
 * @name Initialize
 * @param {object} objContext  Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useInitializeData(objContext);
    useInitializeTabData(objContext);
    useSetRibbonData(objContext);
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
        var arrContentData = AddEditTestFolder_Tab.GetAddEditTestFolderTab(objContext, objData);
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
        let objEditData = objContext.props.Data.objRowData;
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : objContext.AddEditTestFolder_ModuleProcessor.GetInitilaData(objContext) } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditTestFolder_ModuleProcessor = new AddEditTestFolder_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditTestFolder_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditTestFolder_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditTestFolder_OfficeRibbon.GetAddEditTestFolderOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}