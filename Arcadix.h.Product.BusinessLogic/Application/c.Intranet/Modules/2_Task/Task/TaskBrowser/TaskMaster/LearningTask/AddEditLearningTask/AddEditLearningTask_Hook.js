// React related imports.
import React, { useEffect } from 'react';

//Base classes.
import * as Base_AddEditTaskMaster_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_Hook';
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';

//Module related imports.
import AddEditLearningTask_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/LearningTask/AddEditLearningTask/AddEditLearningTask_ModuleProcessor';
import * as AddEditLearningTask_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/LearningTask/AddEditLearningTask/AddEditLearningTask_OfficeRibbon';
import * as AddEditLearningTask_Tab from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/LearningTask/AddEditLearningTask/AddEditLearningTask_Tab';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = Base_AddEditTaskMaster_ModuleProcessor.IsDataLoaded(props);
    return {
        objData: props.Data.IsEdit ? props.Data.objSelectedRow : AddEditLearningTask_ModuleProcessor.GetInitialData(props),
        objValidationMessages: {},
        strDivToShow: "TaskDiv",
        isLoadComplete: blnIsLoadComplete,
        blnSaveClicked: false,
        objComponentRefs: {
            BasicPropertyRef: React.createRef(),
            TaxonomyRef: React.createRef(),
            DevelepmentHistoryBasicPropertyRef: React.createRef(),
            LanguageRef: React.createRef(),
            WorkFlowStatusRef: React.createRef(),
            DifficultyLevelRef: React.createRef()
        }
    };
}

/**
 * @name Initialize
 * @param {object} objContext  Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    //-----To Load Objects required for Add/Edit----------
    Base_AddEditTaskMaster_Hook.useDataLoader(objContext.AddEditLearningTask_ModuleProcessor, objContext);
    Base_AddEditTaskMaster_Hook.useDataLoaded(objContext);
    //---------------------------------------------------
    useSetRibbonData(objContext);
    useInitializeTabData(objContext);
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
        var arrContentData = AddEditLearningTask_Tab.GetAddEditLearningTask_Tab(objContext, objData);
        objContext.props.SetNavigationData(arrContentData);
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
            "SaveMethod": () => objContext.AddEditLearningTask_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objContext.AddEditLearningTask_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditLearningTask_OfficeRibbon.GetAddEditLearningTaskOfficeRibbonData(objData);
        //this is done to update the reference
        if (objContext.state.strDivToShow != "SubjectAreaDiv")
            objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData, objContext.state.strDivToShow, objContext.props]);
} 