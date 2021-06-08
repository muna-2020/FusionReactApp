// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Intranet_Cycle_Cycle)["Data"] &&
        DataRef(props.Object_Extranet_State_State)["Data"] &&
        Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleClass", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        blnClassSelected: false,
        strCycleId: -1,
        objSelectedState: {},
        objSelectedSchool: {},
        arrTestData: [],
        arrSchoolData:[],
        arrSelectedData: [],
        arrPrevStateData: []
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
    useLoadSelectedCycleTests(objContext);
    useLoadSelectedStateSchools(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.CycleClass_ModuleProcessor.LoadInitialData(objContext);
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
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Intranet_Cycle_Cycle)["Data"]
            && DataRef(objContext.props.Object_Extranet_State_State)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleClass", objContext.props)
        ) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });            
        }
    }, [
        objContext.props.Object_Intranet_Cycle_Cycle,           
        objContext.props.Object_Extranet_State_State,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/4_Cycle/CycleClass"]
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
            objContext.CycleClass_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.CycleClass_ModuleProcessor.SetRibbonData(objContext);
    }
}

/**
 * @name useLoadSelectedCycleTests
 * @param {object} objContext takes  objContext.
 * @summary On StateDropdown change, loads the Class for selected State.
 *  
 */
export function useLoadSelectedCycleTests(objContext) {

    useEffect(() => {
        if (objContext.state.strCycleId != -1 && objContext.state.strCycleId != 3) {
            objContext.CycleClass_ModuleProcessor.LoadSelectedCycleTests(objContext, objContext.state.strCycleId);
        }
    }, [objContext.state.strCycleId]);
}

/**
 * @name useLoadSelectedStateSchools
 * @param {object} objContext takes  objContext.
 * @summary On StateDropdown change, loads the Schools for selected State.
 *  
 */
export function useLoadSelectedStateSchools(objContext) {

    useEffect(() => {
        if (objContext.state.objSelectedState && objContext.state.objSelectedState["iStateId"] && objContext.state.objSelectedState["iStateId"] != -1) {
            objContext.CycleClass_ModuleProcessor.LoadSelectedStateSchools(objContext, objContext.state.objSelectedState["iStateId"]);
        }
    }, [objContext.state.objSelectedState]);
}