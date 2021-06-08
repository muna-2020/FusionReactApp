// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as MainClient_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClient/MainClient_Hook';
import MainClient_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/MainClient/MainClient_ModuleProcessor";

/**
 * @name MainClient
 * @param {object} props props
 * @summary This component displays the MainClient data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with MainClient details.
 */
const MainClient = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, MainClient_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "MainClient", ["MainClient_ModuleProcessor"]: new MainClient_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.MainClient_ModuleProcessor.Initialize(objContext, objContext.MainClient_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in MainClient_Hook, that contains all the custom hooks.
     * @returns null
     */
    MainClient_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {     
        return (
            <div className="subject-container">
                <Grid
                    Id='MainClientGrid'
                    Data={objContext.MainClient_ModuleProcessor.GetGridData(objContext)}
                    Meta={objContext.MainClient_ModuleProcessor.GetMetaData(objContext)}
                    CallBacks={objContext.MainClient_ModuleProcessor.GetCallBacks(objContext)}
                    Resource={objContext.MainClient_ModuleProcessor.GetResourceData(objContext)}
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


export default connect(CockpitBase_Hook.MapStoreToProps(MainClient_ModuleProcessor.StoreMapList()))(MainClient);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MainClient_ModuleProcessor;