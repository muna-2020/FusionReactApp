// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditApplicationType_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/MainClient/ApplicationType/AddEditApplicationType/AddEditApplicationType_OfficeRibbon';
import * as AddEditApplicationType_Tab from '@shared/Application/c.Cockpit/Modules/MainClient/ApplicationType/AddEditApplicationType/AddEditApplicationType_Tab';
import AddEditApplicationType_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/ApplicationType/AddEditApplicationType/AddEditApplicationType_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "ApplicationType"
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useInitializeData(objContext);
    useInitializeTabData(objContext);
    useSetRibbonData(objContext);
}

export function useInitializeData(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["ApplicationTypeGrid"];
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : {} } });
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext takes objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeTabData(objContext) {
    useEffect(() => {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = AddEditApplicationType_Tab.GetAddEditApplicationTypeTab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext takes objContext
 * @summary Setting up the RibbonData 
 * */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditApplicationType_ModuleProcessor = new AddEditApplicationType_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditApplicationType_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditApplicationType_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditApplicationType_OfficeRibbon.GetAddEditApplicationTypeOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}