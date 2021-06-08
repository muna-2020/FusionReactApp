//React related imports...
import React, { useReducer } from 'react';

//Module related fies...
import Audit_ComponentProcessor from '@shared/Framework/Blocks/Audit/Audit_ComponentProcessor'
import * as Audit_Hook from '@shared/Framework/Blocks/Audit/Audit_Hook'

//Components used...
import Grid from '@root/Framework/Blocks/Grid/Grid';
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

/**
 * @name Audit
 * @param {object} props props
 * @summary This component displays the Audit data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Audit details.
 */
const Audit = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Audit_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { props, state, dispatch, ["ModuleName"]: props.Id, ["Audit_ComponentProcessor"]: new Audit_ComponentProcessor()};

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Audit_ComponentProcessor.Initialize(objContext, objContext.Audit_ComponentProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Audit_Hook, that contains all the custom hooks.
     * @returns null
     */
    Audit_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return <div className="audit-container">
                <Grid
                    Id="AuditGrid"
                    Meta={objContext.Audit_ComponentProcessor.GetMetaData(objContext)}
                    Data={objContext.Audit_ComponentProcessor.GetGridData(objContext)}
                    Resource={objContext.Audit_ComponentProcessor.GetResourceData(objContext)}
                    Events={objContext.Audit_ComponentProcessor.GetGridEvents(objContext)}
                    CallBacks={objContext.Audit_ComponentProcessor.GetGridCallBacks(objContext)}
                    ParentProps={{ ...props.ParentProps }}
                />
        </div>;
    }

 return (
        <React.Fragment>{props.isLoadComplete ||  state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default Audit;