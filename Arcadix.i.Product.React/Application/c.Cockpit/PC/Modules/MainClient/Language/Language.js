// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as Language_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/Language/Language_Hook';
import Language_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/Language/Language_ModuleProcessor";

/**
 * @name Language 
 * @param {object} props props
 * @summary This component displays the Language data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Language details.
 */
const Language = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, Language_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Language", ["Language_ModuleProcessor"]: new Language_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Language_Hook, that contains all the custom hooks.
     * @returns null
     */
    Language_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Language_ModuleProcessor.Initialize(objContext, objContext.Language_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        
        return (
            <div className="subject-container">
                <Grid
                    Id='LanguageGrid'
                    Data={objContext.Language_ModuleProcessor.GetGridData(objContext)}
                    Meta={objContext.Language_ModuleProcessor.GetMetaData(objContext)}
                    CallBacks={objContext.Language_ModuleProcessor.GetCallBacks(objContext)}
                    Resource={objContext.Language_ModuleProcessor.GetResourceData(objContext)}                    
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


export default connect(CockpitBase_Hook.MapStoreToProps(Language_ModuleProcessor.StoreMapList()))(Language);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Language_ModuleProcessor;