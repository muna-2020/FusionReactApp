// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditSubject_OfficeRibbon from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/AddEditSubject/AddEditSubject_OfficeRibbon';
import * as AddEditSubject_Tab from '@shared/Application/c.Intranet/Modules/6_Taxonomy/Subject/AddEditSubject/AddEditSubject_Tab';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: null,
        objValidationMessages: {},
        strDivToShow: "SubjectManagementMain"
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
 * @name useInitializeTabData
 * @param {object} objContext  objContext
 * @summary Setting up Content Data
 */
export function useInitializeTabData(objContext) {
    useEffect(() => {
        var objData = {
            "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
        };
        var arrContentData = AddEditSubject_Tab.GetAddEditSubjectTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["SubjectGrid"];
        let objData;
        if (objContext.props.Data.IsEdit) {
            objData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        }
        else {
            objData = { ["iParentSubjectId"]: objContext.props.Data.ParentSubjectId };
        }
        objContext.dispatch({ type: "SET_STATE", payload: { objData } });
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
            "SaveMethod": () => objContext.AddEditSubject_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": (blnClose = true) => objContext.AddEditSubject_ModuleProcessor.SaveData(objContext, blnClose)
        };
        let arrRibbonData = AddEditSubject_OfficeRibbon.GetAddEditSubjectOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state.objData]);
}

