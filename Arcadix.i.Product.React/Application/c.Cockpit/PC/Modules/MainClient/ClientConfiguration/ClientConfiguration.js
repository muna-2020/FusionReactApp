// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as ClientConfiguration_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/ClientConfiguration_Hook';
import ClientConfiguration_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/ClientConfiguration/ClientConfiguration_ModuleProcessor";

/**
 * @name ClientConfiguration
 * @param {object} props props
 * @summary This component displays the ClientConfiguration data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ClientConfiguration details.
 */
const ClientConfiguration = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, ClientConfiguration_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ClientConfiguration", ["ClientConfiguration_ModuleProcessor"]: new ClientConfiguration_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.ClientConfiguration_ModuleProcessor.Initialize(objContext, objContext.ClientConfiguration_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ClientConfiguration_Hook, that contains all the custom hooks.
     * @returns null
     */
    ClientConfiguration_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        return (
            <div className="subject-container">
                <Grid
                    Id="ClientConfigurationGrid"
                    Data={objContext.ClientConfiguration_ModuleProcessor.GetGridData(objContext)}
                    Meta={objContext.ClientConfiguration_ModuleProcessor.GetMetaData(objContext)}
                    Resource={objContext.ClientConfiguration_ModuleProcessor.GetResourceData(objContext)}                    
                    ParentProps={props}
                />
            </div>
        );
    }
    return (
        props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(ClientConfiguration_ModuleProcessor.StoreMapList()))(ClientConfiguration);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClientConfiguration_ModuleProcessor;