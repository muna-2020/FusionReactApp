// React related imports.
import React, { useReducer, useRef } from 'react';

import { connect } from 'react-redux';
//Base classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import * as CMSImageSavePopup_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImageSavePopup/CMSImageSavePopup_Hook';

import CMSImageSavePopup_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImageSavePopup/CMSImageSavePopup_ModuleProcessor';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name CMSImageSavePopup
 * @summary This component is responsible for loading image save Popup.
 * @param {any} props Component Props.
 * @returns {any} returns JSX
 */
const CMSImageSavePopup = (props) => {

    const Ref = useRef(null);

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSImageSavePopup_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["CMSImageSavePopup_ModuleProcessor"]: new CMSImageSavePopup_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in CMSImageSavePopup_Hook, that contains all the custom hooks.
     * @returns null
     */
    CMSImageSavePopup_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSImageSavePopup_ModuleProcessor.Initialize(objContext, objContext.CMSImageSavePopup_ModuleProcessor);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageSavePopup", objContext.props);
        return (
            <section className="image-save-popup-wrapper">
                <div className="image-save-popup-header">
                    <h3>{Localization.TextFormatter(objTextResource, "Main_Title")} </h3>
                    <span>{Localization.TextFormatter(objTextResource, "Sub_Title")}</span>
                </div>
                <div className="left-block">
                    <img ref={Ref} src={props.Data.imagePath} />
                </div>
                <div className="right-block">
                    <div className="rb-flex">
                        <input type="radio" name="save-type" onChange={() => {
                            objContext.dispatch({ type: "SET_STATE", payload: { "blnSaveAsGlobal": false, "blnError": false } })
                        }} /><span>{Localization.TextFormatter(objTextResource, "Save_As_Local_Image")}</span>
                    </div>
                    <div className="rb-flex">
                        <input type="radio" name="save-type" onChange={() => {
                            objContext.dispatch({ type: "SET_STATE", payload: { "blnSaveAsGlobal": true, "blnError": false } })
                        }} /><span>{Localization.TextFormatter(objTextResource, "Save_As_Global_Image")}</span>
                    </div>
                    {
                        objContext.state.blnSaveAsGlobal &&
                        <div className="sub-radio-button">
                            <div className="rb-flex">
                                <input type="radio" name="global-save-type" onChange={() => {
                                    objContext.dispatch({ type: "SET_STATE", payload: { "blnSaveAsNew": true, "blnError": false } })
                                }} /><span>{Localization.TextFormatter(objTextResource, "Save_As_New_Global_Image")}</span>
                            </div>
                            {
                                (props.Data.ElementJson.cIsFusionVersion.toLowerCase() === 'y' && props.Data.blnImageFound) &&
                                <div className="rb-flex">
                                    <input type="radio" name="global-save-type" onChange={() => {
                                        objContext.dispatch({ type: "SET_STATE", payload: { "blnSaveAsNew": false, "blnError": false } })
                                    }} /><span>{Localization.TextFormatter(objTextResource, "Overwrite_Existing_Global_Image")}</span>
                                </div>
                            }
                        </div>
                    }
                    {
                        objContext.state.blnError &&
                        <div className="error-box">
                            <span> {Localization.TextFormatter(objTextResource, "Error_Message")} </span>
                        </div>
                    }


                </div>
                <div className="image-save-footer">
                    <button className="btn" onClick={() => { objContext.CMSImageSavePopup_ModuleProcessor.handleOkClick(objContext) }}> {Localization.TextFormatter(objTextResource, "Ok")} </button>
                    <button className="btn" onClick={() => { editorPopup.ClosePopup(objContext.props.Id); }}> {Localization.TextFormatter(objTextResource, "Abort")} </button>
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
CMSImageSavePopup.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new CMSImageSavePopup_ModuleProcessor()).InitialDataParams(props));
};


/**
 * @name CMSImageSavePopup.DynamicStyles
 * @param {object} props props
 * @summary required for loading css
 * @returns {Array} Styles array
 */
CMSImageSavePopup.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSImage/CMSImageSavePopup/CMSImageSavePopup.css"
    ];
};

export default connect(EditorBase_Hook.MapStoreToProps(CMSImageSavePopup_ModuleProcessor.StoreMapList()))(CMSImageSavePopup);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSImageSavePopup_ModuleProcessor; 