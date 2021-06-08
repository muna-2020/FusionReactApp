//React imports 
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import * as WikiSidebar_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Editor/WikiSidebar/WikiSidebar_Hooks';
import WikiSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Editor/WikiSidebar/WikiSidebar_ModuleProcessor";
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name WikiSidebar
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary WikiSidebar.
 * @returns {any} WikiSidebar
 */
const WikiSidebar = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, WikiSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "strOperationTypeRef": useRef(null),
        "WikiSidebar_ModuleProcessor": new WikiSidebar_ModuleProcessor(),
        Object_Framework_Services_TextResource
    };

    /**
     * @name WikiSidebar_Hooks.Initialize
     * @summary Initialize method call in WikiSidebar_Hooks, that contains all the custom hooks.
     */
    WikiSidebar_Hooks.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.WikiSidebar_ModuleProcessor.Initialize(objContext, objContext.WikiSidebar_ModuleProcessor);

    const OpenDeleteWikiConfirmationPopup = (objWikiJson) => {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar", objContext.props);
        let objTextResourceForDelete = {
            "DELETE_ConfirmText": objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_Message"),
            "DELETE_ConfirmButtonText": objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_ConfirmButtonText"),
            "DELETE_CloseButtonText": objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_CloseButtonText"),
            "DELETE_Title": objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_Title"),
            "DELETE_SubTitle": objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_SubTitle")
        };
        editorPopup.ShowConfirmationPopup({
            "Resource": {
                "Text": objTextResourceForDelete,
                "TextResourcesKey": "DELETE",
                "Variables": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Meta": {
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "Height": 'auto',
                "Width": '390px'
            },
            "Data": {},
            "Events": {
                "ConfirmEvent": (strPopupId) => {
                    editorPopup.ClosePopup(strPopupId);
                    objContext.WikiSidebar_ModuleProcessor.RemoveWiki(objContext, objWikiJson);
                }
            },
            "CallBacks": {}
        });
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetWikiTabContent = () => {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar", objContext.props);
        let objTextElementJson = state.ElementJson["vElementJson"]["TextElements"].filter(objTempTextElememnt => objTempTextElememnt["iElementId"] === state.ElementJson["vElementJson"]["Values"][0]["iElementTextId"])[0];
        let objTextElementProps = {
            ...props,
            ["ElementJson"]: {
                ...objTextElementJson
            },
            ["Type"]: "wiki",
            ["ElementRef"]: objTextElementJson["Ref"] ? objTextElementJson["Ref"] : React.createRef(),
            ["ParentRef"]: React.createRef(true),
            ["blnDoNotShowContextMenu"]: true
        };
        return (
            <div className="wiki-body">
                <div className="wiki-flex">
                    <span>
                        {objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "WikiWordLabel")}
                    </span>
                    <input type="text" value={state.ElementJson["vElementJson"]["Values"][0]["vWikiKeyword"]} disabled="true" />
                </div>
                <div className="wk-label">
                    {objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "WikiDescriptionLabel")}
                </div>
                <div className="wiki-padd">
                    <CMSText_Editor {...objTextElementProps} />
                </div>
                <div className="btn-right wiki-header-footer">
                    <button className="btn" onClick={(event) => { event.preventDefault(); objContext.WikiSidebar_ModuleProcessor.OnClickSaveButton(objContext); }}>
                        {objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "SaveButtonText")}
                    </button>
                </div>
            </div>
        );
    };

    /**
     * @name GetAllWikiTabContent
     * @summary Contains the jsx for AllWiki Tab
     * @returns {any} JSX
     */
    const GetAllWikiTabContent = () => {
        return (
            <ul className="wiki-list">
                {
                    state.arrWiki && state.arrWiki.map(objTempData => {
                        return (
                            <li>
                                <span onClick={() => { objContext.WikiSidebar_ModuleProcessor.SetWikiToElementJson(objContext, objTempData); }}>
                                    {objTempData["vElementJson"]["Values"][0]["vWikiKeyword"]}
                                </span>
                                <img
                                    src={objContext.props.JConfiguration.EditorSkinPath + "/Images/Common/Icon_Close.svg"}
                                    alt=""
                                    onClick={(event) => { event.preventDefault(); OpenDeleteWikiConfirmationPopup(objTempData); }} />
                            </li>
                        );
                    })
                }
            </ul>
        );
    };

    /**
     * @name GetContent
     * @summary Contains the jsx of the input sidebar.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSWiki/WikiSidebar", objContext.props);
        return (
            <div className="wiki-popup">
                <div className="wiki-navigation">
                    <ul>
                        <li onClick={(event) => { event.preventDefault(); objContext.WikiSidebar_ModuleProcessor.ChangeTab(objContext, true); }} className={state.blnShowWikiTab ? "active" : ""}>
                            <span>
                                {objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "WikiTab")}
                            </span>
                        </li>
                        <li onClick={(event) => { event.preventDefault(); objContext.WikiSidebar_ModuleProcessor.ChangeTab(objContext, false); }} className={state.blnShowWikiTab ? "" : "active"}>
                            <span>
                                {objContext.WikiSidebar_ModuleProcessor.TextFormatter(objTextResource, "AllWikiTab")}
                            </span>
                        </li>
                    </ul>
                </div>
                {
                    state.blnShowWikiTab ? GetWikiTabContent() : GetAllWikiTabContent(objTextResource)
                }
            </div>
        );
    };

    /**
     * @sumamry Calls the GetContent().
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(WikiSidebar_ModuleProcessor.StoreMapList()))(WikiSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = WikiSidebar_ModuleProcessor; 
