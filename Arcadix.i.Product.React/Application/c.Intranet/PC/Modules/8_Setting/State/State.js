//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files...
import * as State_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/State/State_Hook';
import State_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/State/State_ModuleProcessor';

/**
* @name State
* @param {object} props props
* @summary This component displays the State data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with State details.
*/
const State = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, State_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "State", ["State_ModuleProcessor"]: new State_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.State_ModuleProcessor.Initialize(objContext, objContext.State_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    State_Hook.Initialize(objContext);  

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        return <div className="subject-container">
                <Grid
                    Id="StateGrid"
                    Meta={objContext.State_ModuleProcessor.GetMetaData(objContext)}
                    Data={objContext.State_ModuleProcessor.GetGridData(objContext)}
                    Resource={objContext.State_ModuleProcessor.GetResourceData(objContext)}
                    Events={objContext.State_ModuleProcessor.GetGridEvents(objContext)}
                    ParentProps={{ ...props }}
                />
        </div>;
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(State_ModuleProcessor.StoreMapList()))(State);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = State_ModuleProcessor;