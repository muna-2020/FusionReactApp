//React related imports
import React, { useEffect, useReducer, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Common/CMSMultiPageElement_Common';
import CMSMultiPageElement_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/CMSMultiPageElement_Editor_ModuleProcessor';
import * as CMSMultiPageElement_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/CMSMultiPageElement_Editor_Hook';
import CMSContainer_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_ModuleProcessor";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';
import CMSImage_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor';

/**
 * @name CMSMultiPageElement_Editor
 * @param {any} props props from parent
 * @param {any} ref ref to component
 * @summary CMSMultiPageElement's editor version.
 * @returns {any} returns JSX
 */
const CMSMultiPageElement_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSMultiPageElement_Editor_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSMuliPageElement_Editor_" + props.ElementJson.iElementId,
        "slideContainer": useRef(null),
        "slideWrapper": useRef(null),
        ["CMSMultiPageElement_Editor_ModuleProcessor"]: new CMSMultiPageElement_Editor_ModuleProcessor(),
        ["CMSContainer_Editor_ModuleProcessor"]: new CMSContainer_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSMultiPageElement_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSMultiPageElement_Editor_ModuleProcessor);

    /**
     * @name CMSMultiPageElement_Editor_Hook.Initialize
     * @summary Initialize method call in CMSMultiPageElement_Editor_Hook, that contains all the custom hooks.
     */
    CMSMultiPageElement_Editor_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Calls the RenderBody method to get the JSX.
    * @returns {any} JSX of the Component
    * */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSMultiPageElement_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY);
                },
                "HandleSlideNavigation": (strNavigateTo, blnButtonDisabled) => {
                    if (!blnButtonDisabled) {
                        objContext.CMSMultiPageElement_Editor_ModuleProcessor.HandleSlideNavigation(objContext, strNavigateTo);
                    }
                },
                "OpenAddPopup": () => {
                    objContext.CMSMultiPageElement_Editor_ModuleProcessor.OpenAddPopup(objContext);
                },
                "OnPlaceHolderDrop": (event) => {
                    let strElementTypeName = event.dataTransfer.getData("ActiveDragElement");
                    let blnAudio = false;
                    if (strElementTypeName && strElementTypeName.toLowerCase() === "audio") {
                        blnAudio = true;
                    }
                    objContext.CMSContainer_Editor_ModuleProcessor.OnPlaceholderDrop(objContext, strElementTypeName, 0, false, (objElementJson) => {
                        if (strElementTypeName.toLowerCase() !== "text") {
                            if (blnAudio) {
                                objElementJson = { ...objElementJson, "IsSubElement": "N" };
                            }
                            objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                        }
                        else {
                            objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddElement({ ...objContext, ["strElementType"]: "text" });
                        }
                    });
                }
            },
            "Callbacks": {
                "GetTextElementProps": (intElementTextId) => {
                    return objContext.CMSMultiPageElement_Editor_ModuleProcessor.GetTextElementProps(objContext, intElementTextId);
                },
                "AddOrDeleteSlide": (intSelectedIndex) => {
                    objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddOrDeleteSlide(objContext, intSelectedIndex);
                }
            },
            "TextElement": CMSText_Editor,
            "ImageElement": CMSImage_Editor,
            "AppType": "Editor"
        };
        return <Common {...objCommonProps} />;
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default CMSMultiPageElement_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSMultiPageElement_Editor_ModuleProcessor; 