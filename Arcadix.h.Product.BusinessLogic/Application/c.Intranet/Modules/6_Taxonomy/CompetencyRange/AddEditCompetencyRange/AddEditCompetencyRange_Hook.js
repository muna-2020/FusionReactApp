// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditCompetencyRange_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyRange/AddEditCompetencyRange/AddEditCompetencyRange_OfficeRibbon';
import * as AddEditCompetencyRange_Tab from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyRange/AddEditCompetencyRange/AddEditCompetencyRange_Tab';
import AddEditCompetencyRange_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyRange/AddEditCompetencyRange/AddEditCompetencyRange_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "CompetencyRange"
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
        var arrContentData = AddEditCompetencyRange_Tab.GetAddEditCompetencyRangeTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CompetencyRangeGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iSubjectId"]: objContext.props.Data.SubSubjectDropdownSelectedValue } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditCompetencyRange_ModuleProcessor = new AddEditCompetencyRange_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditCompetencyRange_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditCompetencyRange_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditCompetencyRange_OfficeRibbon.GetAddEditCompetencyRangeOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

