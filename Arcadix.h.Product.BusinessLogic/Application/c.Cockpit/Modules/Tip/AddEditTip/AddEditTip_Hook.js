// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditTip_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/Tip/AddEditTip/AddEditTip_OfficeRibbon';
import * as AddEditTip_Tab from '@shared/Application/c.Cockpit/Modules/Tip/AddEditTip/AddEditTip_Tab';
import AddEditTip_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/Tip/AddEditTip/AddEditTip_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "Tip"
        //arrHelpGroup: []
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
            //objContext.dispatch({ type: "SET_STATE", payload: { "arrHelpGroup": objContext.props.Data.DropdownData.uHelpGroupId } });
            var arrContentData = AddEditTip_Tab.GetAddEditTipTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TipGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objEditData = { ...objEditData, "dtTipDate": objContext.AddEditTip_ModuleProcessor.GetDateText(objEditData["dtTipDate"]) };
        //objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["uTipId"]: objContext.props.Data.DropdownData.ClientId } } });
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : objContext.props.ParentProps.ClientUserDetails.MainClientId == 0 ? { "iApplicationTypeId": objContext.props.Data.DropdownData.ApplicationTypeId } : { "iApplicationTypeId": objContext.props.Data.DropdownData.ApplicationTypeId, "iMainClientId": objContext.props.ParentProps.ClientUserDetails.MainClientId} }});
    }, []);
}

/**
 * @name useInitializeRibbon
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditTip_ModuleProcessor = new AddEditTip_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditTip_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditTip_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditTip_OfficeRibbon.GetAddEditTipOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

