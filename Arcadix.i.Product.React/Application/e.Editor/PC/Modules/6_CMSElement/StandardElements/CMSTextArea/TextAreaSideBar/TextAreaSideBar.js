//React imports 
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as TextAreaSideBar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextArea/TextAreaSideBar/TextAreaSideBar_Hooks';
import TextAreaSideBar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextArea/TextAreaSideBar/TextAreaSideBar_ModuleProcessor";

// Editor state class methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name TextAreaSideBar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary TextAreaSideBar.
 * @returns {any} returns JSX
 */
const TextAreaSideBar = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, TextAreaSideBar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, Ref: React.createRef(), ["TextAreaSideBar_ModuleProcessor"]: new TextAreaSideBar_ModuleProcessor() };

    /**
     * @name TextAreaSideBar_Hooks.Initialize
     * @summary Initialize method call in TextAreaSideBar_Hooks, that contains all the custom hooks.
     */
    TextAreaSideBar_Hooks.Initialize(objContext);

    /**
   * @name  InitializeDataForSSR
   * @param {object} objContext context object
   * @summary Initializing API and DynamicStyles
   * @returns Setting ApplicationState
   */
    objContext.TextAreaSideBar_ModuleProcessor.Initialize(objContext, objContext.TextAreaSideBar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Contains the jsx of the input sidebar.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextResource = {};
        objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSTextArea/TextAreaSideBar", objContext.props);
        return (
            <div class="textarea-popup">
                <div class="ta-body">
                    <div class="ta-flex">
                        <span>{Localization.TextFormatter(objTextResource, "NoOfLines")}</span>
                        <input type="text" id="iNumberOfRows" value={objContext.state.ElementJson.vElementJson.iNumberOfRows} onChange={(e) => { objContext.TextAreaSideBar_ModuleProcessor.isNumber(objContext, e) }} />
                    </div>
                    <div class="ta-flex">
                        <span>{Localization.TextFormatter(objTextResource, "Width")}</span>
                        <input type="text" id="iWidthInPixel" value={objContext.state.ElementJson.vElementJson.iWidthInPixel} onChange={(e) => { objContext.TextAreaSideBar_ModuleProcessor.isNumber(objContext, e) }} />
                    </div>
                    <div class="btn-right textarea-header-footer">
                        <button class="btn" onClick={(event) => { objContext.TextAreaSideBar_ModuleProcessor.UpdateToCMSTextArea(objContext, event); }}>
                            {Localization.TextFormatter(objTextResource, "Apply")}
                        </button>
                    </div>
                </div>
            </div>
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
TextAreaSideBar.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new TextAreaSideBar_ModuleProcessor()).InitialDataParams(props));
};

export default connect(Base_Hook.MapStoreToProps(TextAreaSideBar_ModuleProcessor.StoreMapList()))(TextAreaSideBar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TextAreaSideBar_ModuleProcessor; 