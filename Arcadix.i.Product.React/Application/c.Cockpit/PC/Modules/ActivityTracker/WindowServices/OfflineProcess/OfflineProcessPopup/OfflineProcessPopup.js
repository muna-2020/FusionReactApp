//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as OfflineProcessPopup_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup/OfflineProcessPopup_Hook';
import * as OfflineProcessPopup_MetaData from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup/OfflineProcessPopup_MetaData';
import OfflineProcessPopup_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup/OfflineProcessPopup_ModuleProcessor';

//In line Image 
import TestImage from '@inlineimage/Common/ReactJs/PC/JNavigation/test.svg?inline';

/**
 * @name OfflineProcessPopup.
 * @param {object} props props.
 * @summary This component is used to Add/Edit the TestTaskProperty.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const OfflineProcessPopup = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, OfflineProcessPopup_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "OfflineProcessPopup_ModuleProcessor": new OfflineProcessPopup_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource, ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.OfflineProcessPopup_ModuleProcessor.Initialize(objContext, objContext.OfflineProcessPopup_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in FileWatcher_Hook, that contains all the custom hooks.
     * @returns null
     */
    OfflineProcessPopup_Hook.Initialize(objContext);

    /**
     * JSX for subject
     */
    function GetContent() {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess/OfflineProcessPopup", objContext.props);
        return (
            <div className="subject-container">
                <Grid
                    Id='OfflineProcessPopupGrid'
                    Meta={{ ...OfflineProcessPopup_MetaData.GetMetaData() }}//, Filter: { "iProgressValue" "N" }
                    Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                    Data={objContext.OfflineProcessPopup_ModuleProcessor.GetGridData(objContext)}
                    CallBacks={{
                        OnBeforeGridRowRender: (objRow) => objContext.OfflineProcessPopup_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
                    }}
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

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        TestImage: TestImage
    }
}
export default connect(IntranetBase_Hook.MapStoreToProps(OfflineProcessPopup_ModuleProcessor.StoreMapList()))(OfflineProcessPopup);
