//React related imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import * as NavigationCommonPage_Hook from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage_Hook';
import NavigationCommonPage_ModuleProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage_ModuleProcessor";

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
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, {});

    let objContext = {state, props, dispatch, ["NavigationCommonPage_ModuleProcessor"]: new NavigationCommonPage_ModuleProcessor()};

    //custom hooks
    NavigationCommonPage_Hook.useSetAnimation(objContext);

    /**
    * @name GetContent
    * @param {any} props
    * @sumarry Forms the JSX for the SubNavigation...
    * @returns {object} JSX
    */
    const GetContent = () => {
        let objNavigation = DataRef(props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"][0];
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        let arrSubNavigationData = arrNavigationData.filter(obj => obj["ParentNavigationId"] == props.ActiveSubNavigationId);
        let domNavigation = arrSubNavigationData.map((objSubNavigation, intIndex) => {
            return <li key={intIndex} onClick={() => {
                objContext.NavigationCommonPage_ModuleProcessor.OnSubNavigationClick(props, objSubNavigation, arrNavigationData)
            }} >{objSubNavigation.NavigationName}</li>
        });
        return domNavigation;
    };
    
    return <ul>{GetContent()}</ul>
}

NavigationCommonPage.InitialDataParams = (props) => {
    return [];
}

export default connect(IntranetBase_Hook.MapStoreToProps(NavigationCommonPage_ModuleProcessor.StoreMapList()))(NavigationCommonPage);