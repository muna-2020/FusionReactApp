// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as RedisToDb_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/RedisToDb/RedisToDb_Hook';
import RedisToDb_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/RedisToDb/RedisToDb_ModuleProcessor";

/**
 * @name RedisToDb
 * @param {object} props props
 * @summary This component displays the RedisToDb  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with RedisToDb  details.
 */
const RedisToDb = props => {
    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, RedisToDb_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "RedisToDb", ["RedisToDb_ModuleProcessor"]: new RedisToDb_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.RedisToDb_ModuleProcessor.Initialize(objContext, objContext.RedisToDb_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in RedisToDb_Hook, that contains all the custom hooks.
     * @returns null
     */
    RedisToDb_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/RedisToDb", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div>
                    <div className="file-watcher" Id="RedisToDb">
                        <div >
                            <span>{Localization.TextFormatter(objTextResource, 'ServerName')}</span>
                            <span>{objContext.state.objSchedulerStatusData?.["ServerName"]}</span>
                            <span>{Localization.TextFormatter(objTextResource, 'TaskStatus')}</span>
                            <span>{objContext.state.objSchedulerStatusData?.["State"]}</span>
                        </div>
                    </div>
                    <Grid
                        Id='RedisToDbGrid'
                        Meta={objContext.RedisToDb_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.RedisToDb_ModuleProcessor.GetResourceData(objContext)}
                        Data={objContext.RedisToDb_ModuleProcessor.GetGridData(objContext)}
                        CallBacks={objContext.RedisToDb_ModuleProcessor.GetCallBacks(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(RedisToDb_ModuleProcessor.StoreMapList()))(RedisToDb);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = RedisToDb_ModuleProcessor;