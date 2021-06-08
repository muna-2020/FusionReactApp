// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditJob_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/AddEditJob/AddEditJob_OfficeRibbon';
import * as AddEditJob_Tab from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/AddEditJob/AddEditJob_Tab';


/**
* @name GetInitialState
* @summary Sets the initialState
* @returns {*} initial state object
*/
export function GetInitialState() {
    return {
        objData: null,
        objValidationMessages: {},
        strDivToShow: "JobField"
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
        var arrContentData = AddEditJob_Tab.GetAddEditJobTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")?.["JobGrid"] ?? [];
        let objData;
        if (objContext.props.Data.IsEdit) {
            objData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        }
        else {
            objData = {
                ["iStateId"]: objContext.props.Data.iStateId, ["t_PathFinder_Job_JobField"]: [{ "uJobFieldId": "00000000-0000-0000-0000-000000000000" }]
            };
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
            "SaveMethod": () => objContext.AddEditJob_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": (blnClose = true) => objContext.AddEditJob_ModuleProcessor.SaveData(objContext, blnClose)
        };
        let arrRibbonData = AddEditJob_OfficeRibbon.GetAddEditJobOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state.objData]);
}

