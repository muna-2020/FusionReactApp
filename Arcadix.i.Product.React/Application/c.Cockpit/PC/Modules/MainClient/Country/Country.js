// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as Country_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/Country/Country_Hook';
import Country_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/Country/Country_ModuleProcessor";

/**
 * @name Country 
 * @param {object} props props
 * @summary This component displays the country data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with country details.
 */
const Country = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, Country_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Country", ["Country_ModuleProcessor"]: new Country_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Country_ModuleProcessor.Initialize(objContext, objContext.Country_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Country_Hook, that contains all the custom hooks.
     * @returns null
     */
    Country_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {        
        return (
            <div className="subject-container">
                <Grid
                    Id="CountryGrid"
                    Data={objContext.Country_ModuleProcessor.GetGridData(objContext)}
                    Meta={objContext.Country_ModuleProcessor.GetMetaData(objContext)}
                    CallBacks={objContext.Country_ModuleProcessor.GetCallBacks(objContext)}
                    Resource={objContext.Country_ModuleProcessor.GetResourceData(objContext)}
                    ParentProps={props} 
                />
            </div>
        );
    };

    return (
        <React.Fragment>{
            props.isLoadComplete || state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment/>
        }
        </React.Fragment>
    );
};

export default connect(CockpitBase_Hook.MapStoreToProps(Country_ModuleProcessor.StoreMapList()))(Country);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Country_ModuleProcessor;