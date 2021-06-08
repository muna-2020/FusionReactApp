//React related imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import * as NavigationCommonPage_Hook from '@shared/Application/c.Intranet/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage_Hook';
import NavigationCommonPage_ModuleProcessor from "@shared/Application/c.Intranet/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage_ModuleProcessor";


/**
 * @name NavigationCommonPage
 * @param {*} props
 * @returns {object} React.Fragement to form the NavigationCommonPage.
 */
const NavigationCommonPage = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, NavigationCommonPage_Hook.GetInitialState(props));

    let objContext = { state, props, dispatch, ["ModuleName"]: "NavigationCommonPage", ["NavigationCommonPage_ModuleProcessor"]: new NavigationCommonPage_ModuleProcessor() };

    /**
      * @name  Initialize
      * @param {object} objContext context object
      * @summary Initializing API and DynamicStyles
      * @returns null
      */
    objContext.NavigationCommonPage_ModuleProcessor.Initialize(objContext, objContext.NavigationCommonPage_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Preload_Hook, that contains all the custom hooks.
    * @returns null
    */
    NavigationCommonPage_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @param {any} props
    * @sumarry Forms the JSX for the SubNavigation...
    * @returns {object} JSX
    */
    const GetContent = () => {
        let arrSubNavigationData = objContext.NavigationCommonPage_ModuleProcessor.GetSubNavigationData(objContext)["SubNavigationData"];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/LoginAndMaster/Navigation", objContext.props);
        let domNavigation = arrSubNavigationData.map((objSubNavigation, intIndex) => {
            return <li key={intIndex}                       
                onClick={() => { objContext.NavigationCommonPage_ModuleProcessor.OnSubNavigationClick(objContext, objSubNavigation) }}
                    >
                        <img src={objContext.props.JConfiguration.IntranetSkinPath + "/" + objSubNavigation["ImagePath"]} />
                        <span>{Localization.TextFormatter(objTextResource, objSubNavigation["TextResourceKey"])}</span>
            </li>
        });
        return <ul className="navigationlist">{domNavigation}</ul>;
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default connect(IntranetBase_Hook.MapStoreToProps(NavigationCommonPage_ModuleProcessor.StoreMapList()))(NavigationCommonPage);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = NavigationCommonPage_ModuleProcessor; 