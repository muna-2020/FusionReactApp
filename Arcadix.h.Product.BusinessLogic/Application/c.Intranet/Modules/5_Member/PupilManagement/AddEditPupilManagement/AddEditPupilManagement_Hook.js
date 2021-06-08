// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditPupilManagement_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/AddEditPupilManagement/AddEditPupilManagement_OfficeRibbon';
import * as AddEditPupilManagement_Tab from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/AddEditPupilManagement/AddEditPupilManagement_Tab';
import AddEditPupilManagement_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/AddEditPupilManagement/AddEditPupilManagement_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "PupilManagement"
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
        var arrContentData = AddEditPupilManagement_Tab.GetAddEditPupilManagementTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["PupilManagementGrid"] : [];
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "objData": objContext.props.Data.IsEdit ? objEditData : {
                    "vPupilName": "",
                    "iSchoolYear": -1,
                    "t_TestDrive_Member_School_Pupil": [{
                        "iStateId": -1,                        
                        "uSchoolId": -1
                    }],
                    "t_TestDrive_Member_Class_Pupil": [{
                        "uClassId": -1,
                        "uTeacherId":-1
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
        let objAddEditPupilManagement_ModuleProcessor = new AddEditPupilManagement_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditPupilManagement_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditPupilManagement_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditPupilManagement_OfficeRibbon.GetAddEditPupilManagementOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

