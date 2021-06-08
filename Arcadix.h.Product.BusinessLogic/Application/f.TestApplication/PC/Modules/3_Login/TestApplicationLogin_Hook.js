// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import TestApplicationLogin_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/3_Login/TestApplicationLogin_ModuleProcessor';

/**
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        objValidationMessages: null,
        LoginDetails: props.TestState ? props.TestState.LoginPageProperties ? props.TestState.LoginPageProperties["UserCredentials"] ? { ...props.TestState.LoginPageProperties["UserCredentials"]["objLoginDetails"] } : {} : {} : {}
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    ApplicationState.SetProperty("blnShowAnimation", false);
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        let objTestApplicationLogin_ModuleProcessor = new TestApplicationLogin_ModuleProcessor(objContext);
        objTestApplicationLogin_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext takes  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        let strMainClientId = JConfiguration.MainClientId;
        let strApplicationTypeId = JConfiguration.ApplicationTypeId
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Country)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage, "Object_Cockpit_MainClient_MainClientLanguage;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N") &&
            DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry, "Object_Cockpit_MainClient_MainClientCountry;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N"))
        {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props.Object_Cockpit_Language,
            objContext.props.Object_Cockpit_Country,
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
            objContext.props.Object_Cockpit_MainClient_MainClientCountry,
    ]);
}