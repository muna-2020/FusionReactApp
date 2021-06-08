//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as Roles_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/Roles_Hook';
import Roles_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles/Roles_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import CopyImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Copy.svg?inline';

/**
 * @name Roles
 * @param {object} props props
 * @summary This component displays the Roles data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Roles details.
 */
const Roles = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Roles_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Roles", ["Roles_ModuleProcessor"]: new Roles_ModuleProcessor(), ["ImageMeta"]: GetImageMeta()  };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Roles_ModuleProcessor.Initialize(objContext, objContext.Roles_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    Roles_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return <div className="file-explorer-container">
            <PerformanceProfiler ComponentName="RolesGrid" JConfiguration={JConfiguration}>
                <Grid
                    Id="RolesGrid"
                    Meta={objContext.Roles_ModuleProcessor.GetMetaData(objContext)}
                    Data={objContext.Roles_ModuleProcessor.GetGridData(objContext)}
                    Resource={objContext.Roles_ModuleProcessor.GetResourceData(objContext)}
                    Events={objContext.Roles_ModuleProcessor.GetGridEvents(objContext)}
                    CallBacks={objContext.Roles_ModuleProcessor.GetGridCallBacks(objContext)}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        </div>;
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        CopyImage: CopyImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(Roles_ModuleProcessor.StoreMapList()))(Roles);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Roles_ModuleProcessor; 