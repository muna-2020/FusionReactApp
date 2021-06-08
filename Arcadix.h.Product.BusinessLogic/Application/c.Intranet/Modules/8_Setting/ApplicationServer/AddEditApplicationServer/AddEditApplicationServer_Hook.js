// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditApplicationServer_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/AddEditApplicationServer/AddEditApplicationServer_OfficeRibbon';
import * as AddEditApplicationServer_Tab from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/AddEditApplicationServer/AddEditApplicationServer_Tab';
import AddEditApplicationServer_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/AddEditApplicationServer/AddEditApplicationServer_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "ApplicatioServer"
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
        var arrContentData = AddEditApplicationServer_Tab.GetAddEditApplicationServerTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ApplicationServerGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { "iNumberOfTimeShown": null, "iUrlDisplayCounter": null, "vTargetType": objContext.props.Data.vTargetType, "uTargetTypeId": objContext.props.Data.uTargetDropDownData, "cIsCurrentUrl": null } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditApplicationServer_ModuleProcessor = new AddEditApplicationServer_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditApplicationServer_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditApplicationServer_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditApplicationServer_OfficeRibbon.GetAddEditApplicationServerOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

