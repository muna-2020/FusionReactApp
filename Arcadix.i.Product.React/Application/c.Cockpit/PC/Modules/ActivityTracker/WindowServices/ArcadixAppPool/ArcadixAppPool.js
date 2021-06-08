// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as ArcadixAppPool_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool/ArcadixAppPool_Hook';
import ArcadixAppPool_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool/ArcadixAppPool_ModuleProcessor";

/**
 * @name ArcadixAppPool
 * @param {object} props props
 * @summary This component displays the ArcadixAppPool  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ArcadixAppPool  details.
 */
const ArcadixAppPool = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ArcadixAppPool_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ArcadixAppPool", ["ArcadixAppPool_ModuleProcessor"]: new ArcadixAppPool_ModuleProcessor() };

    /**
      * @name  Initialize
      * @param {object} objContext context object
      * @summary Initializing API and DynamicStyles
      * @returns null
      */
    objContext.ArcadixAppPool_ModuleProcessor.Initialize(objContext, objContext.ArcadixAppPool_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ArcadixAppPool_Hook, that contains all the custom hooks.
     * @returns null
     */
    ArcadixAppPool_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/ArcadixAppPool", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="file-watcher" id="ServiceStatus">
                    <div >
                        <span>{Localization.TextFormatter(objTextResource, 'ServerName')}</span>
                        <span>{objContext.state.arrServiceStatusData?.[0]?.["ServerName"]}</span>
                        <span>{Localization.TextFormatter(objTextResource, 'Status')}</span>
                        <span>{objContext.state.arrServiceStatusData?.[0]?.["Status"]}</span>
                    </div>
                </div>
                <Grid
                    Id='ArcadixAppPoolGrid'
                    Meta={objContext.ArcadixAppPool_ModuleProcessor.GetMetaData(objContext)}
                    Resource={objContext.ArcadixAppPool_ModuleProcessor.GetResourceData(objContext)}
                    Data={objContext.ArcadixAppPool_ModuleProcessor.GetGridData(objContext)}
                    ParentProps={props}
                />
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(ArcadixAppPool_ModuleProcessor.StoreMapList()))(ArcadixAppPool);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ArcadixAppPool_ModuleProcessor;