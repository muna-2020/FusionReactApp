// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditIntranetAdministrator_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/AddEditIntranetAdministrator/AddEditIntranetAdministrator_OfficeRibbon';
import * as AddEditIntranetAdministrator_Tab from '@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/AddEditIntranetAdministrator/AddEditIntranetAdministrator_Tab';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: null,
        objValidationMessages: {},
        strDivToShow: "IntranetAdministrator"
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
        var arrContentData = AddEditIntranetAdministrator_Tab.GetAddEditIntranetAdministratorTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["IntranetAdministratorGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iApplicationTypeId"]: objContext.props.ParentProps.ClientUserDetails.ApplicationTypeId,["iMainClientId"]: (objContext.props.Data.strMainClientId)} } });
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
            "SaveMethod": () => objContext.AddEditIntranetAdministrator_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objContext.AddEditIntranetAdministrator_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditIntranetAdministrator_OfficeRibbon.GetAddEditIntranetAdministratorOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

