// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditTaskQuestion_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/AddEditTaskQuestion/AddEditTaskQuestion_OfficeRibbon';
import * as AddEditTaskQuestion_Tab from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/AddEditTaskQuestion/AddEditTaskQuestion_Tab';

/**
* @name GetInitialState
* @summary Sets the initialState
* @returns {*} initial state object
*/
export function GetInitialState() {
    return {
        objData: null,
        objTaskData: {},
        objValidationMessages: {},
        strDivToShow: "Stammdaten"
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
        var arrContentData = AddEditTaskQuestion_Tab.GetAddEditTaskQuestionTab(objContext, objData);
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
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TaskQuestionGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? { ...objEditData } : { "iPageId": objContext.props.Data.TaskData.iPageId, "iSubjectId": objContext.props.Data.SubSubjectDropdownSelectedValue } } });
            objContext.dispatch({ type: "SET_STATE", payload: { "objTaskData": { ...objContext.props.Data.TaskData } } });
    }, []);
}

/**
* @name useSetRibbonData
* @param {object} objContext objContext
* @summary Setting up TabData and RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        var objData = objContext.state.strDivToShow == "Stammdaten" ? {
            objContext,
            "SaveMethod": () => objContext.AddEditTaskQuestion_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": (blnClose = true) => objContext.AddEditTaskQuestion_ModuleProcessor.SaveData(objContext, blnClose)
        } : {
                objContext,
                "SaveMethod": () => objContext.AddEditTaskQuestion_ModuleProcessor.SaveTaskData(objContext),
            };
        let arrRibbonData = AddEditTaskQuestion_OfficeRibbon.GetAddEditOfficeRibbonData(objData, objContext.state.strDivToShow);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state.objData, objContext.state.objTaskData, objContext.state.strDivToShow]);
}

