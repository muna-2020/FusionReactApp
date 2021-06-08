//React imports 
import React, { useReducer, useEffect } from 'react';

import { connect } from 'react-redux';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import * as ImageProperties_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/ImageProperties/ImageProperties_Hooks';
import ImageProperties_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/ImageProperties/ImageProperties_ModuleProcessor";

import ImageManagement_ImageDetails from "@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImageAddEdit/ImageManagement_ImageDetails/ImageManagement_ImageDetails";

/**
 * @name ImageProperties
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary ImageProperties.
 * @returns {any} returns JSX
 */
const ImageProperties = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, ImageProperties_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, Ref: React.createRef(), ["ImageProperties_ModuleProcessor"]: new ImageProperties_ModuleProcessor() };

    /**
     * @name ImageProperties_Hooks.Initialize
     * @summary Initialize method call in ImageProperties_Hooks, that contains all the custom hooks.
     */
    ImageProperties_Hooks.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.ImageProperties_ModuleProcessor.Initialize(objContext, objContext.ImageProperties_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Contains the jsx of the input sidebar.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextResource = {};
        objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSImage/ImageProperties", objContext.props);
        return (
            <React.Fragment>
                {
                    props.blnHotspot &&
                    <div className="minimum-hotspot-wrapper">
                        <span>{Localization.TextFormatter(objTextResource, "Hotspot_Features")} </span>
                        <div className="minimum-hotspot-input-wrapper">
                            <span>{Localization.TextFormatter(objTextResource, "Minimum_Correct")} : </span>
                            <input type="text" id="hotspot-mimimum-value" value={objContext.state.iMinimumToBeCorrect} onChange={(e) => { objContext.ImageProperties_ModuleProcessor.HandleHotspotMinimumCorrect(objContext, e.target.value) }} />
                            {objContext.state.blnShowError ? Localization.TextFormatter(objTextResource, "ErrorMessage") : ""}
                        </div>
                        <div className="minimum-hotspot-button-wrapper">
                            <button onClick={() => { objContext.ImageProperties_ModuleProcessor.HandleHotspotMinimumSave(objContext) }}>{Localization.TextFormatter(objTextResource, "Apply")}</button>
                        </div>
                    </div>
                }
                <ImageManagement_ImageDetails {...props} TextResource={objTextResource ? objTextResource : {}} ElementDetails={objContext.state.blnHotspot ? objContext.state.ElementJson.vImageElementJson : objContext.state.ElementJson} HideImage="true" />
            </React.Fragment>
        );
    };

    /**
     * @sumamry Calls the GetContent().
     */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default connect(EditorBase_Hook.MapStoreToProps(ImageProperties_ModuleProcessor.StoreMapList()))(ImageProperties);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ImageProperties_ModuleProcessor; 