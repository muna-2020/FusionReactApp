// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as MainClientThemeConfiguration_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/MainClientThemeConfiguration_Hook';
import MainClientThemeConfiguration_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/MainClientThemeConfiguration/MainClientThemeConfiguration_ModuleProcessor";

/**
 * @name MainClientThemeConfiguration
 * @param {object} props props
 * @summary This component displays the MainClientThemeConfiguration data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with MainClientThemeConfiguration details.
 */
const MainClientThemeConfiguration = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, MainClientThemeConfiguration_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "MainClientThemeConfiguration", ["MainClientThemeConfiguration_ModuleProcessor"]: new MainClientThemeConfiguration_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.MainClientThemeConfiguration_ModuleProcessor.Initialize(objContext, objContext.MainClientThemeConfiguration_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in MainClientThemeConfiguration_Hook, that contains all the custom hooks.
     * @returns null
     */
    MainClientThemeConfiguration_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {      
        return (
            <div className="subject-container">
                <Grid
                    Id='MainClientThemeConfigurationGrid'
                    Data={objContext.MainClientThemeConfiguration_ModuleProcessor.GetGridData(objContext)}
                    Meta={objContext.MainClientThemeConfiguration_ModuleProcessor.GetMetaData(objContext)}
                    CallBacks={objContext.MainClientThemeConfiguration_ModuleProcessor.GetCallBacks(objContext)}
                    Resource={objContext.MainClientThemeConfiguration_ModuleProcessor.GetResourceData(objContext)}
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

export default connect(CockpitBase_Hook.MapStoreToProps(MainClientThemeConfiguration_ModuleProcessor.StoreMapList()))(MainClientThemeConfiguration);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MainClientThemeConfiguration_ModuleProcessor;