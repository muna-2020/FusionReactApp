// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditJobLevel_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/AddEditJobLevel/AddEditJobLevel_OfficeRibbon';
import * as AddEditJobLevel_Tab from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/AddEditJobLevel/AddEditJobLevel_Tab';


/**
* @name GetInitialState
* @summary Sets the initialState
* @returns {*} initial state object
*/
export function GetInitialState() {
    return {
        objData: null,
        objValidationMessages: {},
        strDivToShow: "JobLevel"
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
        var arrContentData = AddEditJobLevel_Tab.GetAddEditJobLevelTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")?.["JobLevelGrid"] ?? [];
        //let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")&&ApplicationState.GetProperty("SelectedRows")["JobLevelGrid"]&&ApplicationState.GetProperty("SelectedRows")["JobLevelGrid"].length>0 ? ApplicationState.GetProperty("SelectedRows")["JobLevelGrid"] : [];
        let objData;
        if (objContext.props.Data.IsEdit) {
            objData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        }
        else {
            objData = {
                ["iStateId"]: objContext.props.Data.iStateId, ["uJobFieldId"]: objContext.props.Data.uJobFieldId
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
            "SaveMethod": () => objContext.AddEditJobLevel_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": (blnClose = true) => objContext.AddEditJobLevel_ModuleProcessor.SaveData(objContext, blnClose)
        };
        let arrRibbonData = AddEditJobLevel_OfficeRibbon.GetAddEditJobLevelOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state.objData]);
}

