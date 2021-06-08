//React imports 
import React, { useReducer, useEffect } from 'react';

import { connect } from 'react-redux';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import * as VideoProperties_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/VideoProperties/VideoProperties_Hooks';
import VideoProperties_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/VideoProperties/VideoProperties_ModuleProcessor";

import VideoManagement_VideoDetails from "@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideoAddEdit/VideoManagement_VideoDetails/VideoManagement_VideoDetails";

import LinkedPageDetails from '@root/Application/e.Editor/PC/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Element/MultiMediaMangement_ElementDetails/LinkedPageDetails/LinkedPageDetails';

/**
 * @name VideoProperties
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary VideoProperties.
 * @returns {any} returns JSX
 */
const VideoProperties = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, VideoProperties_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, Ref: React.createRef(), ["VideoProperties_ModuleProcessor"]: new VideoProperties_ModuleProcessor() };

    /**
     * @name VideoProperties_Hooks.Initialize
     * @summary Initialize method call in VideoProperties_Hooks, that contains all the custom hooks.
     */
    VideoProperties_Hooks.Initialize(objContext);

    /**
   * @name  InitializeDataForSSR
   * @param {object} objContext context object
   * @summary Initializing API and DynamicStyles
   * @returns Setting ApplicationState
   */
    objContext.VideoProperties_ModuleProcessor.Initialize(objContext, objContext.VideoProperties_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Contains the jsx of the input sidebar.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextResource = {};
        objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSVideo/VideoProperties", objContext.props);
        return (
            <React.Fragment>
                <div className="outer-wrapper">
                    <span>{Localization.TextFormatter(objTextResource, "Display")} </span>
                    <div className="input-wrapper">
                        <span>{Localization.TextFormatter(objTextResource, "Width")} : </span>
                        <input type="text" id="player-width" value={objContext.state.iElementWidth} onChange={(e) => { objContext.VideoProperties_ModuleProcessor.HandleInputOnChange(objContext, { "type": "iElementWidth", "value": e.target.value }) }} />
                        {objContext.state.blnShowError ? Localization.TextFormatter(objTextResource, "ErrorMessage") : ""}
                    </div>
                    <div className="input-wrapper">
                        <span>{Localization.TextFormatter(objTextResource, "Height")} : </span>
                        <input type="text" id="player-height" value={objContext.state.iElementHeight} onChange={(e) => { objContext.VideoProperties_ModuleProcessor.HandleInputOnChange(objContext, { "type": "iElementHeight", "value": e.target.value }) }} />
                        {objContext.state.blnShowError ? Localization.TextFormatter(objTextResource, "ErrorMessage") : ""}
                    </div>
                    <div className="button-wrapper">
                        <button onClick={() => { objContext.VideoProperties_ModuleProcessor.SetPlayerWidthAndHeight(objContext) }}>{Localization.TextFormatter(objTextResource, "Button_Text")}</button>
                    </div>
                </div>
                <div className="video-details-outer-wrapper">
                    <div>
                        <VideoManagement_VideoDetails {...props} TextResource={objTextResource} ElementDetails={objContext.state.ElementJson} blnDisplayPurpose={true} blnShowVideoPlayer={false} />
                    </div>
                    <div>
                        <LinkedPageDetails {...props} ElementDetails={objContext.state.ElementJson} />
                    </div>
                </div>
            </React.Fragment>
        );
    };

    /**
     * @sumamry Calls the GetContent().
     */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name InitialDataParams
* @param {object} props props
* @summary required for SSR
* @returns {object} InitialDataParams 
*/
VideoProperties.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new VideoProperties_ModuleProcessor()).InitialDataParams(props));
};

export default connect(EditorBase_Hook.MapStoreToProps(VideoProperties_ModuleProcessor.StoreMapList()))(VideoProperties);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = VideoProperties_ModuleProcessor; 