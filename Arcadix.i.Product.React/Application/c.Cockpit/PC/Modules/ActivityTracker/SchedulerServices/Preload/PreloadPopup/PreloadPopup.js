//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as PreloadPopup_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload/PreloadPopup/PreloadPopup_Hook';
import * as PreloadPopup_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload/PreloadPopup/PreloadPopup_MetaData';
import PreloadPopup_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload/PreloadPopup/PreloadPopup_ModuleProcessor';


/**
 * @name PreloadPopup.
 * @param {object} props props.
 * @summary This component is used to show details of Preload object.
 * @returns {object} React.Fragement that contains the content to be display in popup required .
 */
const PreloadPopup = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, PreloadPopup_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "PreloadPopup_ModuleProcessor": new PreloadPopup_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PreloadPopup_ModuleProcessor.Initialize(objContext, objContext.PreloadPopup_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Preload_Hook, that contains all the custom hooks.
     * @returns null
     */
    PreloadPopup_Hook.Initialize(objContext);

    /**
     * JSX for subject
     */
    function GetContent() {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/SchedulerServices/Preload/PreloadPopup", objContext.props);
        return (
            <div className="subject-container">
                <Grid
                    Id='PreloadPopupGrid'
                    Meta={{ ...PreloadPopup_MetaData.GetMetaData() }}
                    Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                    Data={objContext.PreloadPopup_ModuleProcessor.GetGridData(objContext)}
                    ParentProps={{ ...props }}
                />
            </div>
        );
    }

    return (
        <React.Fragment>{state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );

}
export default connect(IntranetBase_Hook.MapStoreToProps(PreloadPopup_ModuleProcessor.StoreMapList()))(PreloadPopup);
