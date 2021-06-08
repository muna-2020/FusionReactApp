//React Imports
import React, { useReducer, useRef } from "react";
import { connect } from 'react-redux';

//Base classes/hooks
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related files
import * as AdditionalInformationSidebar_Hooks from "@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/AdditionalInformation/AdditionalInformationSidebar/AdditionalInformationSidebar_Hooks";
import AdditionalInformationSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/AdditionalInformation/AdditionalInformationSidebar/AdditionalInformationSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Application State Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name AdditionalInformationSidebar
 * @param {object} props parent props
 * @param {object} ref ref to component
 * @summary AdditionalInformationSidebar component
 * @returns {any} AdditionalInformationSidebar
 */
const AdditionalInformationSidebar = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, AdditionalInformationSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    const objContext = {
        props,
        state,
        dispatch,
        "AdditionalInformationSidebar_ModuleProcessor": new AdditionalInformationSidebar_ModuleProcessor(),
        Object_Framework_Services_TextResource
    };

    /**
     * @name AdditionalInformationSidebar_Hooks.Initialize
     * @summary Initialize method call in AdditionalInformation_Hooks, that contains all the custom hooks.
     */
    AdditionalInformationSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AdditionalInformationSidebar_ModuleProcessor.Initialize(objContext, objContext.AdditionalInformationSidebar_ModuleProcessor);

    /**
     * @name GetContent
     * @summaty Contains the JSX for the AdditionalInformationSidebar.
     * @returns {any} JSX
     * */
    const GetContent = () => {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar", objContext.props);
        let objTextElementProps = {
            ...props,
            ["ElementJson"]: {
                ...state.ElementJson["TextElements"][0]
            },
            ["ParentRef"]: React.createRef(),
            ["Type"]: "additionalinformation",
            ["ElementRef"]: objContext.state.ElementJson["TextElements"][0].Ref,
            ["blnDoNotShowContextMenu"]: true
        };
        return (
            <div className="additionalinformationsidebar-textarea-flex">
                <div className="additionalinformationsidebar-textarea">
                    <CMSText_Editor {...objTextElementProps} />
                </div>
                <div className="bottom-bar">
                    <button onClick={(event) => { event.preventDefault(); objContext.AdditionalInformationSidebar_ModuleProcessor.OnClickDeleteButton(objContext); }}>
                        {objContext.AdditionalInformationSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeleteButtonText")}
                    </button>
                    <button onClick={(event) => { event.preventDefault(); objContext.AdditionalInformationSidebar_ModuleProcessor.OnClickSaveButton(objContext); }}>
                        {objContext.AdditionalInformationSidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     * @returns Jsx of the component.
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(AdditionalInformationSidebar_ModuleProcessor.StoreMapList()))(AdditionalInformationSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = AdditionalInformationSidebar_ModuleProcessor; 
