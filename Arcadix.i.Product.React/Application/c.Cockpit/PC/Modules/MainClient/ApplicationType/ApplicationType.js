// React related imports.
import React, { useReducer} from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as ApplicationType_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/ApplicationType/ApplicationType_Hook';
import ApplicationType_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/ApplicationType/ApplicationType_ModuleProcessor';

/**
 * @name ApplicationType
 * @param {object} props props
 * @summary This component displays the ApplicationType data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ApplicationType details.
 */
const ApplicationType = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, ApplicationType_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ApplicationType", ["ApplicationType_ModuleProcessor"]: new ApplicationType_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ApplicationType_ModuleProcessor.Initialize(objContext, objContext.ApplicationType_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ApplicationType_Hook, that contains all the custom hooks.
     * @returns null
     */
    ApplicationType_Hook.Initialize(objContext);    

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return (
            <div className="subject-container">
                <Grid
                    Id="ApplicationTypeGrid"
                    Data={objContext.ApplicationType_ModuleProcessor.GetGridData(objContext)}
                    Meta={objContext.ApplicationType_ModuleProcessor.GetMetaData()}
                    Resource={objContext.ApplicationType_ModuleProcessor.GetResourceData(objContext)}
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

export default connect(CockpitBase_Hook.MapStoreToProps(ApplicationType_ModuleProcessor.StoreMapList()))(ApplicationType);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ApplicationType_ModuleProcessor;