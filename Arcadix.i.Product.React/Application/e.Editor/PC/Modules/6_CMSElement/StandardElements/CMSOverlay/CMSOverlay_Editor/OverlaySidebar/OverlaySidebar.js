//React imports 
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as EditorBase_Hook from "@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook";
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as OverlaySidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/OverlaySidebar/OverlaySidebar_Hooks';
import OverlaySidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/OverlaySidebar/OverlaySidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name OverlaySidebar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary OverlaySidebar.
 * @returns {any} OverlaySidebar
 */
const OverlaySidebar = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, OverlaySidebar_Hooks.GetInitialState(props));

    const TextElementRef = useRef(null);

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        ["Ref"]: TextElementRef,
        ["OverlaySidebar_ModuleProcessor"]: new OverlaySidebar_ModuleProcessor(),
        Object_Framework_Services_TextResource
    };

    /**
     * @name OverlaySidebar_Hooks.Initialize
     * @summary Initialize method call in OverlaySidebar_Hooks, that contains all the custom hooks.
     */
    OverlaySidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.OverlaySidebar_ModuleProcessor.Initialize(objContext, objContext.OverlaySidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Contains the jsx of the input sidebar.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSOverlay/OverlaySidebar", objContext.props);
        let objTextElementJson = state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElememnt => objTempTextElememnt["iElementId"] === state.ElementJson["vElementJson"]["Values"][0]["iElementTextId"])[0];
        let objTextElementProps = {
            ...props,
            ["ElementJson"]: {
                ...objTextElementJson
            },
            ["Type"]: "Overlay",
            ["ElementRef"]: objTextElementJson["Ref"] ? objTextElementJson["Ref"] : React.createRef(),
            ["ParentRef"]: React.createRef(true),
            ["blnDoNotShowContextMenu"]: true
        };
        return (
            <div className="overlay-textarea-flex">
                <div className="overlay-textarea">
                    <div className="width-input block">
                        <div className="overlay-cms-text-label">
                            {objContext.OverlaySidebar_ModuleProcessor.TextFormatter(objTextResource, "DescriptionText")}
                        </div>
                        <div className="overlay-discription-box">
                            <CMSText_Editor {...objTextElementProps} />
                        </div>
                    </div>
                    <div className="width-input">
                        <span style={{ "whiteSpace": "nowrap" }}>
                            {objContext.OverlaySidebar_ModuleProcessor.TextFormatter(objTextResource, "SetWidthCheckboxText")}
                        </span>
                        <input
                            type="checkbox"
                            onChange={(event) => { objContext.OverlaySidebar_ModuleProcessor.OnChangeFixWidthCheckbox(objContext); }}
                            checked={objContext.state.ElementJson["vElementJson"]["cIsFixedWidth"] === "Y" ? true : false} />
                        <input
                            type="text"
                            disabled={state.ElementJson["vElementJson"]["cIsFixedWidth"] === "N" ? true : false}
                            onChange={(event) => { event.preventDefault(); objContext.OverlaySidebar_ModuleProcessor.OnChangeFixWidthInput(objContext, event.target.value); }}
                            value={state.ElementJson["vElementJson"]["cIsFixedWidth"] === "N" ? "0" : objContext.state.ElementJson["vElementJson"]["iWidth"]} />
                    </div>
                    {/* <div className="width-input">
                        <span>
                            {objContext.OverlaySidebar_ModuleProcessor.TextFormatter(objTextResource, "WidthAttributeLabel")}
                        </span>
                        <input
                            type="text"
                            disabled={state.ElementJson["vElementJson"]["cIsFixedWidth"] === "N" ? true : false}
                            onChange={(event) => { event.preventDefault(); objContext.OverlaySidebar_ModuleProcessor.OnChangeFixWidthInput(objContext, event.target.value); }}
                            value={objContext.state.ElementJson["vElementJson"]["iWidth"]} />
                    </div> */}
                </div>
                <div className="bottom-bar">
                    <button
                        onClick={(event) => { event.preventDefault(); objContext.OverlaySidebar_ModuleProcessor.OnClickSaveButton(objContext); }}>
                        {objContext.OverlaySidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    /**
     * @sumamry Calls the GetContent().
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(OverlaySidebar_ModuleProcessor.StoreMapList()))(OverlaySidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = OverlaySidebar_ModuleProcessor; 
