// React related impoprts.
import React, { useEffect } from 'react';

//Module related imports.
import * as AddEditSurveyTest_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/SurveyTest/AddEditSurveyTest/AddEditSurveyTest_OfficeRibbon';
import * as AddEditSurveyTest_Tab from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/SurveyTest/AddEditSurveyTest/AddEditSurveyTest_Tab';

/**
* @name GetInitialState
* @summary Sets the initialState
* @returns {*} initial state object
*/
export function GetInitialState() {
    return {
        objData: null,
        isLoadComplete: false,
        objValidationMessages: {},
        strDivToShow: "General",
        blnSaveClicked: false,
        objComponentRefs: {
            BasicPropertyRef: React.createRef(),
            DescriptionRef: React.createRef(),
            ExtrasRef: React.createRef(),
            LanguageRef: React.createRef(),
            FilterRef: React.createRef(),
            SecurityRef: React.createRef(),
            AlgorithmRef: React.createRef(),
            DisplayOptionsRef: React.createRef(),
            TimeKeepingExtrasRef: React.createRef(),
            PreLoginRef: React.createRef(),
            WelcomePageRef: React.createRef(),
            TestPageRef: React.createRef(),
            FinalPageRef: React.createRef(),
            ResultPageRef: React.createRef()
        }
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
        var arrContentData = AddEditSurveyTest_Tab.GetAddEditSurveyTestTabData(objContext, objData);
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
        let arrSelectedRows = objContext.props.Data.objSelectedRow ? objContext.props.Data.objSelectedRow : {};
        let objData;
        if (objContext.props.Data.IsEdit) {
            objData = arrSelectedRows;
        }
        else {
            objData = objContext.AddEditSurveyTest_ModuleProcessor.GetDefaultData(objContext);
        }
        objContext.dispatch({ type: "SET_STATE", payload: { objData } });
        objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
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
            "SaveMethod": () => objContext.AddEditSurveyTest_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": (blnClose = true) => objContext.AddEditSurveyTest_ModuleProcessor.SaveData(objContext, blnClose)
        };
        let arrRibbonData = AddEditSurveyTest_OfficeRibbon.GetAddEditSurveyTestOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state.objData, objContext.state.strDivToShow]);   
}

