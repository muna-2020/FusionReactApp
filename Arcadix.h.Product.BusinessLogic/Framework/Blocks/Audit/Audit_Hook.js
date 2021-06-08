// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Module related imports.
import * as Audit_OfficeRibbon from '@shared/Framework/Blocks/Audit/Audit_OfficeRibbon';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        arrAuditData: []
    }
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize method call to load the initial data
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.Audit_ComponentProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && objContext.state.arrAuditData.length > 0
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [objContext.state.arrAuditData]);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objData = {
                objContext,
                "ComparePopup": () => objContext.Audit_ComponentProcessor.OpenComparePopup(objContext),
            };
            if (objContext.props.Events && objContext.props.Events.SetAuditOfficeRibbon) {
                let objRibbonData = Audit_OfficeRibbon.GetAuditOfficeRibbonData(objData);
                objContext.props.Events.SetAuditOfficeRibbon(objRibbonData);
            }
        }
    }, [objContext.state]);
}