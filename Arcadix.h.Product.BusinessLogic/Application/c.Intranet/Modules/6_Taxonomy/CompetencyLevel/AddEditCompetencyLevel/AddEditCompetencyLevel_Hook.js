// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditCompetencyLevel_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyLevel/AddEditCompetencyLevel/AddEditCompetencyLevel_OfficeRibbon';
import * as AddEditCompetencyLevel_Tab from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyLevel/AddEditCompetencyLevel/AddEditCompetencyLevel_Tab';
import AddEditCompetencyLevel_ModuleProcessor from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyLevel/AddEditCompetencyLevel/AddEditCompetencyLevel_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "CompetencyLevel"
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
        var arrContentData = AddEditCompetencyLevel_Tab.GetAddEditCompetencyTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CompetencyGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : { ["iSubjectId"]: objContext.props.Data.SubjectDropdownSelectedValue } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditCompetencyLevel_ModuleProcessor = new AddEditCompetencyLevel_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditCompetencyLevel_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditCompetencyLevel_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditCompetencyLevel_OfficeRibbon.GetAddEditCompetencyLevelOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

