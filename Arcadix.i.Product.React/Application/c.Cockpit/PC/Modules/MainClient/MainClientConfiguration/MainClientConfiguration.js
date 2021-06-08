// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as MainClientConfiguration_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/MainClientConfiguration_Hook';
import MainClientConfiguration_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/MainClientConfiguration_ModuleProcessor";

/**
 * @name MainClientConfiguration
 * @param {object} props props
 * @summary This component displays the MainClientConfiguration data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with MainClientConfiguration details.
 */
const MainClientConfiguration = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, MainClientConfiguration_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "MainClientConfiguration", ["MainClientConfiguration_ModuleProcessor"]: new MainClientConfiguration_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.MainClientConfiguration_ModuleProcessor.Initialize(objContext, objContext.MainClientConfiguration_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in MainClientConfiguration_Hook, that contains all the custom hooks.
     * @returns null
     */
    MainClientConfiguration_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return (
            <div className="subject-container">
                <Grid
                    Id='MainClientConfigurationGrid'
                    Data={objContext.MainClientConfiguration_ModuleProcessor.GetGridData(objContext)}
                    Meta={objContext.MainClientConfiguration_ModuleProcessor.GetMetaData(objContext)}
                    Resource={objContext.MainClientConfiguration_ModuleProcessor.GetResourceData(objContext)}                
                    ParentProps={props} 
              />
            </div>
        );
    };

    return (
        <React.Fragment>{
            props.isLoadComplete || state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />
        }
        </React.Fragment>
    );
};



export default connect(CockpitBase_Hook.MapStoreToProps(MainClientConfiguration_ModuleProcessor.StoreMapList()))(MainClientConfiguration);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MainClientConfiguration_ModuleProcessor;