// React related imports.
import React, { useReducer, useRef } from 'react';

import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import * as MultiMediaPopup_Hook from '@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaPopup_Hook';
import MultiMediaPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaPopup_ModuleProcessor";
import MultiMediaAddEdit from "@root/Application/e.Editor/PC/Modules/8_MultiMediaPopup/MultiMediaAddEdit/MultiMediaAddEdit";
import MultiMediaManagement from "@root/Application/e.Editor/PC/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement";

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

// Editor state class methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//Application state class methods.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name MultiMediaPopup
 * @summary This component is responsible for loading Image/Video/Audio/Document Popup's.
 * @param {any} props Component Props.
 * @returns {any} returns JSX
 */
const MultiMediaPopup = (props) => {

    const MultiMediaManagementRef = useRef();
    const MultiMediaAddEditRef = useRef();

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, MultiMediaPopup_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = {
        state,
        props,
        dispatch,
        ["MultiMediaPopup_ModuleProcessor"]: new MultiMediaPopup_ModuleProcessor(props),
        ["MultiMediaManagementRef"]: MultiMediaManagementRef,
        ["MultiMediaAddEditRef"]: MultiMediaAddEditRef
    };


    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.MultiMediaPopup_ModuleProcessor.Initialize(objContext, objContext.MultiMediaPopup_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in MultiMediaPopup_Hook, that contains all the custom hooks.
    * @returns null
    */
    MultiMediaPopup_Hook.Initialize(objContext);

    const SetTabSelection = (strSelectedTab) => {
        let objPayload;
        if (strSelectedTab === "Local") {
            objPayload = {
                "strSelectedTab": strSelectedTab
            };
        }
        else {
            objPayload = {
                "strSelectedTab": strSelectedTab,
                "blnShowMultiMediaManagement": true
            };
        }
        objContext.dispatch({ "type": "SET_STATE", "payload": objPayload });
    };

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        var objTextResource;
        if (objContext.props.Data.MediaType.toLowerCase() === "usecase") {
            objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objContext.props);
        }
        else {
            objTextResource = Object_Framework_Services_TextResource.GetData(`/e.Editor/Modules/6_CMSElement/CMS${objContext.props.Data.MediaType}/CMS${objContext.props.Data.MediaType}AddEdit`, objContext.props);
        }
        return (
            <section className="multimedia-popup">
                <div className="image-add-edit-header">
                    <h3>{Localization.TextFormatter(objTextResource, "Main_Title")} </h3>
                    <span>{Localization.TextFormatter(objTextResource, "Sub_Title")}</span>
                </div>
                <div className="popup-content">
                    {
                        state.blnShowTabs ?
                            <div className="popup-tab-nav">
                                <nav>
                                    <ul className="tablist-item">
                                        <li className={objContext.state.strSelectedTab === "Local" ? "selected" : ""} onClick={() => { SetTabSelection("Local") }}>
                                            <a href="#" >{Localization.TextFormatter(objTextResource, "Local")}</a>
                                            {objContext.state.strSelectedTab === "Local" ? <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/closeWindow.png"} alt="" /> : <React.Fragment />}
                                        </li>
                                        <li className={objContext.state.strSelectedTab === "Global" ? "selected" : ""} onClick={() => { SetTabSelection("Global") }}>
                                            <a href="#" >{Localization.TextFormatter(objTextResource, "Global")}</a>
                                            {objContext.state.strSelectedTab === "Global" ? <img src={props.JConfiguration.EditorSkinPath + "/Images/Common/closeWindow.png"} alt="" /> : <React.Fragment />}
                                        </li>
                                    </ul>
                                </nav>
                            </div> : ""
                    }
                    {
                        objContext.state.blnShowMultiMediaAddEdit ?
                            <div className="tab-content-block" style={{ "display": objContext.state.strSelectedTab === "Local" ? "block" : "none" }}>
                                <MultiMediaAddEdit ref={objContext.MultiMediaAddEditRef} {...props} TextResource={objTextResource} />
                            </div> : ""
                    }
                    {
                        objContext.state.blnShowMultiMediaManagement ?
                            <div className="tab-content-block" style={{ "display": objContext.state.strSelectedTab !== "Local" ? "block" : "none" }}>
                                <MultiMediaManagement
                                    ref={objContext.MultiMediaManagementRef}
                                    {...props}
                                    blnDisplayOnlyFolders={objContext.state.blnDisplayOnlyFolders}
                                    TextResource={objTextResource} />
                            </div> : ""
                    }

                    <footer>
                        <button className="btn btnOrnge" onClick={() => { objContext.MultiMediaPopup_ModuleProcessor.OkClick(objContext) }}> {Localization.TextFormatter(objTextResource, "Ok")} </button>
                        <button className="btn btnOrnge" onClick={() => { editorPopup.ClosePopup(objContext.props.Id); }}> {Localization.TextFormatter(objTextResource, "Abort")} </button>
                    </footer>
                </div>
            </section>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name InitialDataParams
 * @param {object} props props
 * @summary required for SSR
 * @returns {object} InitialDataParams 
 */
MultiMediaPopup.InitialDataParams = (props) => {
    return new ObjectQueue().Queue(new MultiMediaPopup_ModuleProcessor().InitialDataParams(props));
};

function mapStateToProps(state, ownProps) {
    if (!ownProps.isLoadComplete) {
        return {
            [`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/e.Editor/Modules/6_CMSElement/CMS${ownProps.Data.MediaType}/CMS${ownProps.Data.MediaType}AddEdit`]: state.Entity["Object_Framework_Services_TextResource"][`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/e.Editor/Modules/6_CMSElement/CMS${ownProps.Data.MediaType}/CMS${ownProps.Data.MediaType}AddEdit`],
            [`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/c.ProductManagement/Modules/3_UseCase/UseCase`]: state.Entity["Object_Framework_Services_TextResource"][`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/c.ProductManagement/Modules/3_UseCase/UseCase`]
        };
    }
    else {
        return null;
    }
}

export default connect(mapStateToProps)(MultiMediaPopup);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MultiMediaPopup_ModuleProcessor; 