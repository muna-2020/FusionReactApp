// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as AddEditClassManagment_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/AddEditClassManagment/AddEditClassManagment_OfficeRibbon';
import * as AddEditClassManagment_Tab from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/AddEditClassManagment/AddEditClassManagment_Tab';
import AddEditClassManagment_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/AddEditClassManagment/AddEditClassManagment_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        strStateId: -1,
        arrSchoolData: [],
        arrTeacherData: [],
        objData: {},
        objValidationMessages: {},
        strDivToShow: "ClassManagment"
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
        var arrContentData = AddEditClassManagment_Tab.GetAddEditClassManagmentTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClassManagementGrid"] ? ApplicationState.GetProperty("SelectedRows")["ClassManagementGrid"] : [] : [];
        let objEditData = arrSelectedRows.length > 0 ? arrSelectedRows[0] : arrSelectedRows ? arrSelectedRows : {};
        if (objContext.props.Data.IsEdit) {
            objContext.AddEditClassManagment_ModuleProcessor.LoadSelectedStateSchools(objContext, objEditData["t_TestDrive_Member_Class_Teacher"][0]["iStateId"]);
            objContext.AddEditClassManagment_ModuleProcessor.LoadSelectedSchoolTeacher(objContext, objEditData["t_TestDrive_Member_Class_Teacher"][0]["uSchoolId"]);
        }
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "objData": objContext.props.Data.IsEdit ? objEditData : {
                    "vClassName": "",
                    "iSchoolYear": -1,
                    //"cIsTestClass": objContext.props.Data.cIsTestSchool =="Y"?"Y":"N",
                    "cIsTestSchool": "N",
                    "cIsStellwerk": "N",
                    "t_TestDrive_Member_Class_Teacher": [{
                        "uTeacherId": -1,
                        "cIsSubjectExpert": "N",
                        "cIsCoTeacher": "N",
                        "uSchoolId": -1
                    }]
                }
            }
        });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditClassManagment_ModuleProcessor = new AddEditClassManagment_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditClassManagment_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditClassManagment_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditClassManagment_OfficeRibbon.GetAddEditClassManagmentOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

