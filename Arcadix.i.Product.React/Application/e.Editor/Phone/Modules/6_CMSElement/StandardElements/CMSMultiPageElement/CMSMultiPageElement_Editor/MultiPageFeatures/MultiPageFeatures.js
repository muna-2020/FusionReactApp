//React imports 
import React, { useReducer } from 'react';

import { connect } from 'react-redux';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import * as MultiPageFeatures_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/MultiPageFeatures/MultiPageFeatures_Hooks';
import MultiPageFeatures_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/MultiPageFeatures/MultiPageFeatures_ModuleProcessor";

/**
 * @name MultiPageFeatures
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary MultiPageFeatures.
 * @returns {any} returns JSX
 */
const MultiPageFeatures = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, MultiPageFeatures_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, Ref: React.createRef(), ["MultiPageFeatures_ModuleProcessor"]: new MultiPageFeatures_ModuleProcessor() };

    /**
     * @name MultiPageFeatures_Hooks.Initialize
     * @summary Initialize method call in MultiPageFeatures_Hooks, that contains all the custom hooks.
     */
    MultiPageFeatures_Hooks.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.MultiPageFeatures_ModuleProcessor.Initialize(objContext, objContext.MultiPageFeatures_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Contains the jsx of the input sidebar.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextResource = {};
        objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSMultiPageElement/MultiPageFeatures", objContext.props);
        return (
            <React.Fragment>
                <div className="multipage-features-input-wrapper">
                    <span>{Localization.TextFormatter(objTextResource, "Height")} : </span>
                    <input type="text" id={`${objContext.state.ElementJson.iElementId}-slider-height-`}
                        value={objContext.state.vContainerElementProperties.iElementHeight}
                        onChange={(e) => { objContext.MultiPageFeatures_ModuleProcessor.HandleInputOnChange(objContext, "iElementHeight", e.target.value) }} />
                    {objContext.state.blnShowError ? Localization.TextFormatter(objTextResource, "ErrorMessage") : ""}
                </div>
                <div className="multipage-features-button-wrapper">
                    <button onClick={() => { objContext.MultiPageFeatures_ModuleProcessor.HandleSave(objContext) }}>{Localization.TextFormatter(objTextResource, "Apply")}</button>
                </div>
            </React.Fragment>
        );
    };

    /**
     * @sumamry Calls the GetContent().
     */
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default connect(EditorBase_Hook.MapStoreToProps(MultiPageFeatures_ModuleProcessor.StoreMapList()))(MultiPageFeatures);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MultiPageFeatures_ModuleProcessor; 