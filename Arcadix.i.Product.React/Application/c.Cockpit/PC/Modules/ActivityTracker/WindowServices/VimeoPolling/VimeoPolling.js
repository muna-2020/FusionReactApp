// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as VimeoPolling_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/VimeoPolling/VimeoPolling_Hook';
import VimeoPolling_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/VimeoPolling/VimeoPolling_ModuleProcessor";

/**
 * @name VimeoPolling
 * @param {object} props props
 * @summary This component displays the VimeoPolling  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with VimeoPolling  details.
 */
const VimeoPolling = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, VimeoPolling_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "VimeoPolling", ["VimeoPolling_ModuleProcessor"]: new VimeoPolling_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.VimeoPolling_ModuleProcessor.Initialize(objContext, objContext.VimeoPolling_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in VimeoPolling_Hook, that contains all the custom hooks.
     * @returns null
     */
    VimeoPolling_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/VimeoPolling", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="file-watcher" Id="VimeoPolling">
                    <div >
                        <span>{Localization.TextFormatter(objTextResource, 'Server')}</span>
                        <span>{objContext.state.arrServerStatusData?.[0]?.["ServerName"]}</span>
                        <span>{Localization.TextFormatter(objTextResource, 'Status')}</span>
                        <span>{objContext.state.arrServerStatusData?.[0]?.["Status"]}</span>
                    </div>
                </div>
                <div>
                    <Grid
                        Id='VimeoPollingGrid'
                        Data={objContext.VimeoPolling_ModuleProcessor.GetGridData(objContext)}
                        Meta={objContext.VimeoPolling_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.VimeoPolling_ModuleProcessor.GetResourceData(objContext)}
                        CallBacks={objContext.VimeoPolling_ModuleProcessor.GetCallBacks(objContext)}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(VimeoPolling_ModuleProcessor.StoreMapList()))(VimeoPolling);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = VimeoPolling_ModuleProcessor;