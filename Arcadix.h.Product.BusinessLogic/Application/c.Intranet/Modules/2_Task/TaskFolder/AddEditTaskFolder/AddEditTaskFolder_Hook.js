// React related imports.
import { useEffect, useLayoutEffect } from 'react';


//Module related imports.
import * as AddEditTaskFolder_OfficeRibbon from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/AddEditTaskFolder/AddEditTaskFolder_OfficeRibbon';
import * as AddEditTaskFolder_Tab from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/AddEditTaskFolder/AddEditTaskFolder_Tab';
import AddEditTaskFolder_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/AddEditTaskFolder/AddEditTaskFolder_ModuleProcessor';


/**
 * @name GetInitialState
 * @summary Sets the initialState
 * @returns {*} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (        
        DataRef(props.Object_Cockpit_Skin)["Data"]
    ) {
        blnIsLoadComplete = true;
    }

    return {
        objData: props.Data.IsEdit ? props.Data.objRowData : AddEditTaskFolder_ModuleProcessor.GetInitilaData(props),
        strDivToShow: "TaskFolder",
        objValidationMessages: {},
        isLoadComplete: blnIsLoadComplete
    };
}

/**
 * @name Initialize
 * @param {object} objContext  Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    //useInitializeData(objContext);
    useInitializeTabData(objContext);
    useSetRibbonData(objContext);
}


/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.AddEditTaskFolder_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
        }

        if (DataRef(objContext.props.Object_Cockpit_Skin)["Data"] &&
            objContext.state.objData &&
            !objContext.state.isLoadComplete

        ) {
            //To set state data after the load is complete            
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [
            objContext.props.Object_Cockpit_Skin,
            objContext.state.objData
    ]);
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
        var arrContentData = AddEditTaskFolder_Tab.GetAddEditTaskFolderTab(objContext, objData);
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
        let objEditData = objContext.props.Data.objRowData;
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objContext.props.Data.IsEdit ? objEditData : objContext.AddEditTaskFolder_ModuleProcessor.GetInitilaData(objContext) } });
    }, []);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        let objAddEditTaskFolder_ModuleProcessor = new AddEditTaskFolder_ModuleProcessor(objContext);
        var objData = {
            objContext,
            "SaveMethod": () => objAddEditTaskFolder_ModuleProcessor.SaveData(objContext),
            "SaveAndCloseMethod": () => objAddEditTaskFolder_ModuleProcessor.SaveData(objContext, true)
        };
        let objRibbonData = AddEditTaskFolder_OfficeRibbon.GetAddEditTaskFolderOfficeRibbonData(objData);
        //this is done to update the reference 
        objContext.props.SetOfficeRibbonData(objRibbonData);
    }, [objContext.state.objData]);
}