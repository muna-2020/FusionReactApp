//React related imports.
import React, { useLayoutEffect, useEffect, useReducer } from "react";

//Base classes/hooks.
import * as CrossOutWordTab_Hook from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CrossOutWordTab/CrossOutWordTab_Hook";

//Module realted fies.
import CrossOutWordTab_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CrossOutWordTab/CrossOutWordTab_ModuleProcessor";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

/**
 * @name CrossOutWordTab
 * @summary this tab is responsible for cross word add and delete.
 * @param {any} props 
 */
const CrossOutWordTab = props => {

    /**
    * @name [state, dispatch]
    * @summary Gets the state and dispatch for the component. Initializes the UndoRedo for the component.
    * */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CrossOutWordTab_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Combines the props, state, dispatch and other objects that are required throughout the component.
    * */
    let objContext = { state, dispatch, props, ["CrossOutWordTab_ModuleProcessor"]: new CrossOutWordTab_ModuleProcessor() };

    /**
    * @name GetContent
    * @summary Calls the render body function of the common.
    * @returns {JSX} JSX of the Component.
    */
    const GetContent = () => {
        return (
            <div className="office-ribbon table-tab editor-office-ribbon">
                {
                    <div id={`cross-out-word-wrapper`} className="office-ribbon-cross-out-word-wrapper">
                        <div className="cross-out-word-button-wrapper">
                            <span onClick={() => { objContext.CrossOutWordTab_ModuleProcessor.HandleCrossOutWordClick(objContext, "MARKALLTEXTINCORRECT") }} >SELECT-ALL-TEXT</span>
                        </div>
                        <div className="cross-out-word-button-wrapper">
                            <span onClick={() => { objContext.CrossOutWordTab_ModuleProcessor.HandleCrossOutWordClick(objContext, "MARKSELECTIONTEXTINCORRECT") }} >SELECT-HIGHLIGHTED-TEXT</span>
                        </div>
                        <div className="cross-out-word-button-wrapper">
                            <span onClick={() => { objContext.CrossOutWordTab_ModuleProcessor.HandleCrossOutWordClick(objContext, "CROSSOUTSELECTION") }} className="cross-out-word-text-decoration">STRIKETHROUGH</span>
                        </div>
                        <div className="cross-out-word-button-wrapper">
                            <span onClick={() => { objContext.CrossOutWordTab_ModuleProcessor.HandleCrossOutWordClick(objContext, "REMOVE") }}>REMOVE</span>
                        </div>
                    </div>
                }
            </div>
        );
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent()
}

export default CrossOutWordTab;