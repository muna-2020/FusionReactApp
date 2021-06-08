// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
        DataRef(props.Object_Cockpit_Language)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Category)["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"] &&
        DataRef(props.Object_Intranet_Member_IntranetAdministrator)["Data"] &&
        DataRef(props.Object_Extranet_Teacher_SchoolYear)["Data"] &&
        DataRef(props.Object_Cockpit_Skin)["Data"] &&
        DataRef(props.Object_Intranet_Test_TestProgressDisplay)["Data"] &&
        DataRef(props.Object_Intranet_Test_TestAlgorithm)["Data"] &&
        DataRef(props.Object_TestApplication_TestResultAttributes)["Data"] &&
        DataRef(props.Object_Intranet_Setting_Certificate)["Data"] &&
        DataRef(props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete
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
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.TestPropertyDetails_ModuleProcessor.LoadInitialData(objContext);
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

        if (DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_Language)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"] &&         
            DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"] &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"] &&      
            DataRef(objContext.props.Object_Cockpit_Skin)["Data"] && 
            DataRef(objContext.props.Object_Intranet_Test_TestProgressDisplay)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Test_TestAlgorithm)["Data"] &&
            DataRef(objContext.props.Object_TestApplication_TestResultAttributes)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Setting_Certificate)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"] &&
            !objContext.state.isLoadComplete

        ) {
            //To set state data after the load is complete            
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
        }
    }, [        
        objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
        objContext.props.Object_Cockpit_Language,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Intranet_Taxonomy_Category,
        objContext.props.Object_Intranet_Taxonomy_CategoryCompetency,
        objContext.props.Object_Intranet_Member_IntranetAdministrator,
        objContext.props.Object_Extranet_Teacher_SchoolYear,
        objContext.props.Object_Intranet_Test_TestProgressDisplay,
        objContext.props.Object_Intranet_Test_TestAlgorithm,
        objContext.props.Object_TestApplication_TestResultAttributes,
        objContext.props.Object_Intranet_Setting_Certificate,
        objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup,
        objContext.props.Object_Cockpit_Skin
    ]);
}