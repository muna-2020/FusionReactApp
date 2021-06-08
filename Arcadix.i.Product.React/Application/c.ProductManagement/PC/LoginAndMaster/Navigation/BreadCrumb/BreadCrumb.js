//React related imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import BreadCrumb_ModuleProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/BreadCrumb/BreadCrumb_ModuleProcessor";

/**
 * @name BreadCrumb
 * @param {*} props
 * @returns {object} React.Fragement to form the BreadCrumb.
 */
const BreadCrumb = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, {});

    let objContext = { state, props, dispatch, ["BreadCrumb_ModuleProcessor"]: new BreadCrumb_ModuleProcessor() };

    /**
     * @name FormUrl
     * @param {any} objSubNavigationData
     * @param {any} arrAllNavigations
     * @summary Takes the SubNavigation Object anf forms the Spans till the Root Navigation.
     */
    const FormUrl = (objSubNavigationData, arrAllNavigations) => {
        let domSpanUrl = [];
        let arrRootNavigations = [];
        while (objSubNavigationData) {
            arrRootNavigations = [objSubNavigationData, ...arrRootNavigations];
            objSubNavigationData = arrAllNavigations.find(x => x.NavigationId == objSubNavigationData.ParentNavigationId);
        }
        domSpanUrl = arrRootNavigations.map((objSubNavigationData, intIndex) => {
            let blnRootNavigation = intIndex == 0; //Used for two checks
            //Check 1:  To avoid navigation on Root Navigation Span...
            //Check 2: To avoid ": " for the Root Span Text...
            return <span key={intIndex} onClick={() => {
                if (!blnRootNavigation) { //Check 1
                    objContext.BreadCrumb_ModuleProcessor.OnSubNavigationClick(props, objSubNavigationData, arrAllNavigations)
                }                
            }}>{(blnRootNavigation ? "" : ": ") + objSubNavigationData["NavigationName"]}</span>;//Check 2
        });
        return domSpanUrl;
    }

    /**
     * @name GetContent
     * @param {any} props
     * @sumarry Forms the JSX for the BreadCrumb.
     * @returns {object} JSX
     */
    const GetContent = () => {
        let objBreadCrumb = ApplicationState.GetProperty("BreadCrumbNavigation") ? ApplicationState.GetProperty("BreadCrumbNavigation") : {};
        let strBreadCrumbNavigation = ""
        let arrBreadCrumb = ApplicationState.GetProperty("BreadCrumbNavigation") ? ApplicationState.GetProperty("BreadCrumbNavigation") : "";
        if (arrBreadCrumb != "") {
            return <span>{arrBreadCrumb}</span>
        }
        else {
            return <div></div>
        }
        
    }

    return (GetContent());
};

export default connect(IntranetBase_Hook.MapStoreToProps(BreadCrumb_ModuleProcessor.StoreMapList()))(BreadCrumb);
