// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditOnlineHelp_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp_OfficeRibbon';
import * as AddEditOnlineHelp_Tab from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp_Tab';
import AddEditOnlineHelp_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "OnlineHelp",
        arrHelpGroup: []
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
        //if (objContext.props.Data.DropdownData.uHelpGroupId) {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = AddEditOnlineHelp_Tab.GetAddEditOnlineHelpTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
        //}
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeData(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["OnlineHelpGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "objData": objContext.props.Data.IsEdit ? objEditData
                    : {
                        ["iApplicationTypeId"]: objContext.props.Data.DropdownData.ApplicationTypeId,
                        ["iMainClientId"]: objContext.props.ParentProps.ClientUserDetails.MainClientId,//== 0 ? objContext.props.ParentProps.ClientUserDetails.MainClientId :objContext.props.Data.DropdownData.MainClientId,
                        ["uHelpGroupId"]: objContext.props.Data.DropdownData.HelpGroupId
                    }
            }
        });
    }, []);
}

/**
 * @name useInitializeRibbon
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditOnlineHelp_ModuleProcessor = new AddEditOnlineHelp_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditOnlineHelp_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditOnlineHelp_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditOnlineHelp_OfficeRibbon.GetAddEditOnlineHelpOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

