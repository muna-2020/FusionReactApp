// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditTeacherManagement_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement_OfficeRibbon';
import AddEditTeacherManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement_ModuleProcessor';
import * as AddEditTeacherManagement_Tab from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement_Tab';


/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "TeacherManagement"
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
        var arrContentData = AddEditTeacherManagement_Tab.GetAddEditTeacherManagementTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TeacherManagementGrid"]?ApplicationState.GetProperty("SelectedRows")["TeacherManagementGrid"] : []:[];
        let objEditData = arrSelectedRows.length > 0 ? arrSelectedRows[0] : arrSelectedRows ? arrSelectedRows : {};
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "objData": objContext.props.Data.IsEdit ? {
                    ...objEditData,
                    "t_TestDrive_Member_Teacher_School": objEditData["t_TestDrive_Member_Teacher_School"]?.map((objTeacherSchool, intIndex) => ({ ...objTeacherSchool, "iIndex": intIndex}))
                }: {
                    "t_TestDrive_Member_Teacher_School": [{
                        "iIndex": 0,
                        "uSchoolId": -1,
                        "iStateId": -1,
                        "cIsTestSchool": "N",
                        "cIsStellwerk":"N",
                        "cIsDeleted": "N",
                    }]
                } } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditTeacherManagement_ModuleProcessor = new AddEditTeacherManagement_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditTeacherManagement_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditTeacherManagement_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditTeacherManagement_OfficeRibbon.GetAddEditTeacherManagementOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}


