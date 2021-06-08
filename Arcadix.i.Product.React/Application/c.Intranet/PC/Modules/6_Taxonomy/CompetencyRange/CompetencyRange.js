// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Helper classes.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//Module related fies.
import * as CompetencyRange_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyRange/CompetencyRange_Hook';
import CompetencyRange_ModuleProcessor from "@shared/Application/c.Intranet/Modules/6_Taxonomy/CompetencyRange/CompetencyRange_ModuleProcessor";

/**
 * @name CompetencyRange
 * @param {object} props props
 * @summary This component displays the CompetencyRange data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with CompetencyRange details.
 */

const CompetencyRange = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, CompetencyRange_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CompetencyRange", ["CompetencyRange_ModuleProcessor"]: new CompetencyRange_ModuleProcessor() };

    /**
     * @name  InitializeSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CompetencyRange_ModuleProcessor.Initialize(objContext, objContext.CompetencyRange_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in CompetencyRange_Hook, that contains all the custom hooks.
     * @returns null
     */
    CompetencyRange_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/CompetencyRange", objContext.props) ?? {};
        return (
            <div className="subject-container">               
                <div>
                    <PerformanceProfiler ComponentName="CompetencyRangeGrid" JConfiguration={JConfiguration}>
                        <Grid
                            Id='CompetencyRangeGrid'
                            Meta={objContext.CompetencyRange_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.CompetencyRange_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                            Data={objContext.CompetencyRange_ModuleProcessor.GetGridData(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </div>
            </div>           
        )
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(CompetencyRange_ModuleProcessor.StoreMapList()))(CompetencyRange);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CompetencyRange_ModuleProcessor; 