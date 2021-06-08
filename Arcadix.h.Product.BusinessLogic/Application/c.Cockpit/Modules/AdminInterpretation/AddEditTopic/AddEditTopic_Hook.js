// React related imports.
import { useEffect } from 'react';

//Module related imports.
import * as AddEditTopic_OfficeRibbon from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AddEditTopic/AddEditTopic_OfficeRibbon';
import * as AddEditTopic_Tab from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AddEditTopic/AddEditTopic_Tab';
import AddEditTopic_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AddEditTopic/AddEditTopic_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState() {
    return {
        objData: {},
        objValidationMessages: {},
        strDivToShow: "Topic"
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
        if (objContext.props.Data.DropdownData.uHelpGroupId) {
            var objData = {
                "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
            };
            var arrContentData = AddEditTopic_Tab.GetAddEditTopicTab(objContext, objData);
            objContext.props.SetNavigationData(arrContentData);
        }
    }, []);
}

/**
 * @name useInitializeData
 * @param {object} objContext objContext
 * @summary Setting up objData state and objValidationColumnTabMapping state
 */
export function useInitializeData(objContext) {
    useEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TopicGrid"] : 0;
        let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "objData": objContext.props.Data.IsEdit ? objEditData : {
                    //uSubjectFeedbackThresholdId: objContext.props.Data.DropdownData.uSubjectFeedbackThresholdId[0].uSubjectFeedbackThresholdId
                    uSubjectFeedbackThresholdId: objContext.props.Data.DropdownData.uSubjectFeedbackThresholdId
                }
            }
        });
    }, []);
}

/**
 * @name useInitializeRibbon
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditTopic_ModuleProcessor = new AddEditTopic_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditTopic_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditTopic_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditTopic_OfficeRibbon.GetAddEditTopicOfficeRibbonData(objData);
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}

