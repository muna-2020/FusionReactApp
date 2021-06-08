//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as AdditionalProperty_Hook from '@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AdditionalProperty_Hook';
import AdditionalProperty_ModuleProcessor from "@shared/Application/c.Intranet/Modules/6_Taxonomy/AdditionalProperty/AdditionalProperty_ModuleProcessor";

/**
 * @name AdditionalProperty
 * @param {object} props props
 * @summary This component displays the AdditionalProperty data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with AdditionalProperty details.
 */
const AdditionalProperty = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AdditionalProperty_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "AdditionalProperty", ["AdditionalProperty_ModuleProcessor"]: new AdditionalProperty_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AdditionalProperty_ModuleProcessor.Initialize(objContext, objContext.AdditionalProperty_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AdditionalProperty_Hook, that contains all the custom hooks.
     * @returns null
     */
    AdditionalProperty_Hook.Initialize(objContext);

    /**
     * JSX for subject
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/AdditionalProperty", objContext.props) ?? {};
        return (
            <div>
                <React.Fragment>
                    <PerformanceProfiler ComponentName={"AdditionalPropertyGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='AdditionalPropertyGrid'
                            Meta={objContext.AdditionalProperty_ModuleProcessor.GetMetaData(objContext)}
                            Resource={objContext.AdditionalProperty_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                            Data={objContext.AdditionalProperty_ModuleProcessor.GetGridData(objContext)}
                            CallBacks={objContext.AdditionalProperty_ModuleProcessor.GetGridCallBack(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </React.Fragment>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(AdditionalProperty_ModuleProcessor.StoreMapList()))(AdditionalProperty);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = AdditionalProperty_ModuleProcessor; 