// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as TabbedPopup_Sample_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_OfficeRibbon';
import * as TabbedPopup_Sample_Tab from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample_Tab';

/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    return {
        isLoadComplete: blnIsLoadComplete,
        strDivToShow: "FirstTab"
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
    useInitializeTabData(objContext);
}


/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data["DataForModule"]["PageData"] } });
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
    ]);
}


/**
* @name useSetRibbonData
* @param {object} objContext objContext
* @summary Setting up TabData and RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objRibbonData = {
                objContext,
                "SavePopup": () => objContext.TabbedPopup_Sample_ModuleProcessor.SaveData(objContext)
            };
            let arrRibbonData = TabbedPopup_Sample_OfficeRibbon.GetOfficeRibbonData(objRibbonData);
            //this is done to update the reference 
            objContext.props.SetOfficeRibbonData(arrRibbonData);
        }
    }, [objContext.state]);
}


/**
* @name useInitializeTabData
* @param {object} objContext  objContext
* @summary Setting up Content Data
*/
export function useInitializeTabData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objData = {
                "ShowDiv": (strDivId) => { objContext.dispatch({ type: "SET_STATE", payload: { "strDivToShow": strDivId } }); }
            };
            var arrContentData = TabbedPopup_Sample_Tab.GetTabData(objContext, objData);
            objContext.props.SetNavigationData(arrContentData);
        }
    }, [objContext.state.isLoadComplete]);
}