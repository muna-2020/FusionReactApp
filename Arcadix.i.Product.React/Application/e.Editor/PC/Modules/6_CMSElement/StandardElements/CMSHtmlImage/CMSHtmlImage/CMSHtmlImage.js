// React related imports.
import React, { useReducer, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related fies.
import * as CMSHtmlImage_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHtmlImage/CMSHtmlImage/CMSHtmlImage_Hooks';
import CMSHtmlImage_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSHtmlImage/CMSHtmlImage/CMSHtmlImage_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSHtmlImage
 * @param {object} props props from parent.
 * @param {reference} ref ref to component.
 * @summary CMSHtmlImage component.
 * @returns {Component} CMSHtmlImage.
 */
const CMSHtmlImage = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSHtmlImage_Hooks.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "CMSHtmlImage_ModuleProcessor": new CMSHtmlImage_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSHtmlImage_ModuleProcessor.Initialize(objContext, objContext.CMSHtmlImage_ModuleProcessor);

    /**
     * @name CMSHtmlImage_Hook.Initialize
     * @summary Initialize method call in CMSHtmlImage_Hook, that contains all the custom hooks.
     */
    CMSHtmlImage_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextElementProps = objContext.CMSHtmlImage_ModuleProcessor.GetTextElementProps(objContext, objContext.state.ElementJson["vElementJson"]["Values"][0]["iElementTextId"]);
        let objTextResource = objContext.CMSHtmlImage_ModuleProcessor.GetTextResource(objContext);
        return (
            <div className="htmlimage-container">
                <div className="htmlimage-textarea">
                    <CMSText_Editor {...objTextElementProps} />
                </div>
                <button className="btn" style={{ float: "right" }} onClick={() => { objContext.CMSHtmlImage_ModuleProcessor.SaveClick(objContext); }}>
                    {objTextResource["Save"]}
                </button>
                <button className="btn" style={{ float: "right" }} onClick={() => { objContext.CMSHtmlImage_ModuleProcessor.CancelClick(objContext); }}>
                    {objTextResource["Cancel"]}
                </button>
            </div>
        );
    };

    /**
     * @summary Calls the GetContent method.
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(CMSHtmlImage_ModuleProcessor.StoreMapList()))(CMSHtmlImage);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSHtmlImage_ModuleProcessor; 