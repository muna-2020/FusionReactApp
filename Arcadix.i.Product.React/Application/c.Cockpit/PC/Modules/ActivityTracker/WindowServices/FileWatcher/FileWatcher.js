// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as FileWatcher_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher/FileWatcher_Hook';
import FileWatcher_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher/FileWatcher_ModuleProcessor";

/**
 * @name FileWatcher
 * @param {object} props props
 * @summary This component displays the FileWatcher  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with FileWatcher  details.
 */
const FileWatcher = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, FileWatcher_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "FileWatcher", ["FileWatcher_ModuleProcessor"]: new FileWatcher_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.FileWatcher_ModuleProcessor.Initialize(objContext, objContext.FileWatcher_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in FileWatcher_Hook, that contains all the custom hooks.
     * @returns null
     */
    FileWatcher_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="file-watcher" id="FileWatcher" >
                    <div >
                        <span>{Localization.TextFormatter(objTextResource, 'Server')}</span>
                        <span>{objContext.state.arrWindowServiceData?.[0]?.["ServerName"]}</span>
                        <span>{Localization.TextFormatter(objTextResource, 'Status')}</span>
                        <span>{objContext.state.arrWindowServiceData?.[0]?.["Status"]}</span>
                    </div>
                </div>
                <div>
                    <Grid
                        Id='FileWatcherGrid'
                        Data={objContext.FileWatcher_ModuleProcessor.GetGridData(objContext)}
                        Meta={objContext.FileWatcher_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.FileWatcher_ModuleProcessor.GetResourceData(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(FileWatcher_ModuleProcessor.StoreMapList()))(FileWatcher);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = FileWatcher_ModuleProcessor;