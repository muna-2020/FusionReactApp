// React related imports.
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

//Application state reducer for store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as OnlineHelp_Hook from '@shared/Framework/Controls/OnlineHelp/OnlineHelp_Hook';
import OnlineHelp_ComponentProcessor from '@shared/Framework/Controls/OnlineHelp/OnlineHelp_ComponentProcessor';

//Application state reducer of store.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//Inline Images import
import ArrowLeftImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/arrow_left.svg?inline';
import CrossImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/cross_smallBrown.svg?inline';

/**
* @name OnlineHelp
* @param {object} props props
* @summary This component displays the OnlineHelp. 
* @returns {object} returns a jsx with provided data that will be displayed in it.
*/
const OnlineHelp = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, OnlineHelp_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["OnlineHelp_ComponentProcessor"]: new OnlineHelp_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.OnlineHelp_ComponentProcessor.Initialize(objContext, objContext.OnlineHelp_ComponentProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in OnlineHelp_Hook, that contains all the custom hooks.
    * @returns null
    */
    OnlineHelp_Hook.Initialize(objContext);    

    /**
    * @name OnLinkClick
    * @param {object} event Event object
    * @summary Gets the strHelpKey from the event, and insert the arrHelpHistory with the OnlineHelpGroupKey and the new help key, and updates the OnlineHelpGroupObject application state.
    */
    function OnLinkClick(event) {
        let strHelpKey = event.target.getAttribute('linkkey');
        let objOnlineHelp = ApplicationState.GetProperty("OnlineHelpGroupObject");
        let objOnlineHelpObject = {
            blnShowOnlineHelp: true,
            OnlineHelpGroupKey: objOnlineHelp["OnlineHelpGroupKey"],
            OnlineHelpKey: strHelpKey
        };
        ApplicationState.SetProperty("OnlineHelpGroupObject", objOnlineHelpObject);

        dispatch({
            type: "SET_STATE",
            payload: {
                "strPreviousHelpGroupKey": objOnlineHelp["OnlineHelpGroupKey"],
                "strPreviousHelpKey": strHelpKey,
                "arrHelpHistory": [...objContext.state.arrHelpHistory, objOnlineHelp["OnlineHelpGroupKey"] + "_" + strHelpKey],
                "intHistoryIndex": state.intHistoryIndex + 1
            }
        });
    }

    /**
    * @name useEffect
    * @summary useEffect that fetches all the links in the html, and binds the click event to the OnLinkClick function
    */
    useEffect(() => {
        if (state.isHelpDataPresent) {
            let objElement = document.getElementById("online_help_links");
            let arrLinks = objElement.querySelectorAll('[type="link"]');
            for (let i = 0; i < arrLinks.length; i++) { //adding all the event listeners
                arrLinks[i].addEventListener('click', OnLinkClick);
            }
        }
    }, [state.isHelpDataPresent, state.intHistoryIndex]);

    /**
    * @name GetContent
    * @summary OnlineHelp JSX formation 
    * @returns {object} JSX for OnlineHelp
    */
    const GetContent = () => {
        let objHelpGroup = objContext.OnlineHelp_ComponentProcessor.GetHelpGroup(objContext);
        let arrHelp = DataRef(objContext.props.Object_Framework_Services_Help, "Object_Framework_Services_Help;uHelpGroupId;" + objHelpGroup["uHelpGroupId"])["Data"];
        if (objContext.props.OnlineHelpGroupObject.OnlineHelpGroupKey !== "TestLogins") {
            arrHelp = [...arrHelp, ...objContext.OnlineHelp_ComponentProcessor.GetTempHelpArray(objContext.props.OnlineHelpGroupObject.OnlineHelpGroupKey)];
        }
        let strOnlineHelpkey = objContext.props.OnlineHelpGroupObject.OnlineHelpKey;
        let strHeaderHtml = "";
        let strParagraphHtml = "";
        if (arrHelp.length > 0) {
            let objFilteredHelp = arrHelp.filter(objHelp => objHelp["vHelpKey"] == strOnlineHelpkey)[0];
            strHeaderHtml = objFilteredHelp.t_Framework_Help_Data.find(objHelpData => objHelpData["iLanguageId"].toString() == JConfiguration.InterfaceLanguageId).vHelpTitleHtml;
            strParagraphHtml = objFilteredHelp.t_Framework_Help_Data.find(objHelpData => objHelpData["iLanguageId"].toString() == JConfiguration.InterfaceLanguageId).vHelpContentHtml
        }
        
        return (
            <div className="page-container">
                    
                <div className={props.OnlineHelpGroupObject && props.OnlineHelpGroupObject.blnShowOnlineHelp ? "online-help-popup show" : "online-help-popup"}>
                    {
                        state.intHistoryIndex > 1 &&
                            <div onClick={() => objContext.OnlineHelp_ComponentProcessor.OnBackwardArrowClick(objContext)}>
                            <img src={ArrowLeftImage} alt="" className="close-icon" />
                            </div>
                    }
                        
                    <h3 dangerouslySetInnerHTML={{ __html: strHeaderHtml }} />
                    <p id="online_help_links" dangerouslySetInnerHTML={{ __html: strParagraphHtml }} />
                    <span className="icon-trigger" onClick={() => {
                        ApplicationState.SetProperty("OnlineHelpGroupObject", { blnShowOnlineHelp: false });
                        objContext.dispatch({ type: "SET_STATE", payload: { "isHelpDataPresent": false } });
                    }}>
                        <img src={CrossImage} alt="" />
                        </span>
                    </div>
                </div > 
            
        );
    };

    return state.isLoadComplete && state.isHelpDataPresent && props.OnlineHelpGroupObject.blnShowOnlineHelp ? GetContent() : <React.Fragment/>;
};

export default connect(Base_Hook.MapStoreToProps(OnlineHelp_ComponentProcessor.StoreMapList()))(OnlineHelp);