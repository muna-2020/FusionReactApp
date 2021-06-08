//React imports
import React, { useEffect, useReducer } from 'react';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Common/CMSWiki_Common';
import * as CMSWiki_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_TestApplication/CMSWiki_TestApplication_Hooks';
import CMSWiki_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_TestApplication/CMSWiki_TestApplication_ModuleProcessor";

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

/**
 * @name CMSWiki_Editor
 * @param {object} props component props
 * @param {any} ref component's ref
 * @summary CMS Wiki's TestApplication version
 * @returns {any} CMSWiki_TestApplication
 */
const CMSWiki_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSWiki_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSTextMark_TestApplication_" + props.ElementJson.iElementId,
        ["CMSWiki_TestApplication_ModuleProcessor"]: new CMSWiki_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSWiki_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSWiki_TestApplication_ModuleProcessor);

    /**
     * @name OpenWikiInfoPopup
     * @summary Opens up the Wiki info popup.
     */
    const OpenWikiInfoPopup = () => {
        TestApplicationPopup.ShowPopup({
            "Data": {
                "ElementJson": {
                    ...state.ElementJson
                },
                "ComponentController": props.ComponentController
            },
            "Meta": {
                "PopupName": "WikiInfoPopup",
                "Height": 'auto',
                "Width": '500px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": false,
                "CssClassName": "wiki-info-popup",
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {}
        });
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objProps = {
            "Context": objContext,
            "Events": {
                "OpenWikiInfoPopup": OpenWikiInfoPopup
            },
            "Callbacks": {},
            "TextElement": null,
            "AppType": "TestApplication"
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default Helper.forwardComponent(CMSWiki_TestApplication);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSWiki_TestApplication_ModuleProcessor; 