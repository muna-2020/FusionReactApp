// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Translate_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Translate/Translate_Hook';
import Translate_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Translate/Translate_ModuleProcessor";

/**
 * @name Translate
 * @param {object} props props
 * @summary This component displays the Translate  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Translate  details.
 */
const Translate = props => {
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Translate_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Translate", ["Translate_ModuleProcessor"]: new Translate_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Translate_ModuleProcessor.Initialize(objContext, objContext.Translate_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Translate_Hook, that contains all the custom hooks.
     * @returns null
     */
    Translate_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Translate", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="file-watcher" Id="Translate">
                    <span>{Localization.TextFormatter(objTextResource, 'ServerName')}</span>
                    <span>{objContext.state.objSchedulerStatusData?.["ServerName"]}</span>
                    <span>{Localization.TextFormatter(objTextResource, 'TaskStatus')}</span>
                    <span>{objContext.state.objSchedulerStatusData?.["State"]}</span>
                </div>
                <div>
                    <Grid
                        Id='TranslateGrid'
                        Meta={objContext.Translate_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.Translate_ModuleProcessor.GetResourceData(objContext)}
                        Data={objContext.Translate_ModuleProcessor.GetGridData(objContext)}
                        CallBacks={objContext.Translate_ModuleProcessor.GetCallBacks(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(Translate_ModuleProcessor.StoreMapList()))(Translate);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Translate_ModuleProcessor;