// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Preload_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload/Preload_Hook';
import Preload_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload/Preload_ModuleProcessor";

/**
 * @name Preload
 * @param {object} props props
 * @summary This component displays the Preload  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Preload  details.
 */
const Preload = props => {
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Preload_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Preload", ["Preload_ModuleProcessor"]: new Preload_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Preload_ModuleProcessor.Initialize(objContext, objContext.Preload_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Preload_Hook, that contains all the custom hooks.
     * @returns null
     */
    Preload_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div>
                    <div className="file-watcher" Id="Preload">
                        <span>{Localization.TextFormatter(objTextResource, 'ServerName')}</span>
                        <span>{objContext.state.objSchedulerStatusData?.["ServerName"]}</span>
                        <span>{Localization.TextFormatter(objTextResource, 'TaskStatus')}</span>
                        <span>{objContext.state.objSchedulerStatusData?.["State"]}</span>
                    </div>
                    <Grid
                        Id='PreloadGrid'
                        Meta={objContext.Preload_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.Preload_ModuleProcessor.GetResourceData(objContext)}
                        Data={objContext.Preload_ModuleProcessor.GetGridData(objContext)}
                        CallBacks={objContext.Preload_ModuleProcessor.GetCallBacks(objContext)}
                        ParentProps={props}
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

export default connect(IntranetBase_Hook.MapStoreToProps(Preload_ModuleProcessor.StoreMapList()))(Preload);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Preload_ModuleProcessor;