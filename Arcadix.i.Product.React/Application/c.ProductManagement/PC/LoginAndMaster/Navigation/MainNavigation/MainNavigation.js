// React related imports.
import React, { useReducer } from "react";
import { withRouter } from 'react-router-dom';

//Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import * as MainNavigation_Hook from '@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/MainNavigation/MainNavigation_Hook';
import MainNavigation_ModuleProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Navigation/MainNavigation/MainNavigation_ModuleProcessor";

/**
 * @name MainNavigation
 * @param {*} props
 * @returns {object} React.Fragement to form the MainNavigation.
 */
const MainNavigation = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, MainNavigation_Hook.GetInitialState(props));

    let objContext = { state, props, dispatch, ["ModuleName"]: "MainNavigation", ["MainNavigation_ModuleProcessor"]: new MainNavigation_ModuleProcessor() };

    /**
    * @name LoadNavigationOnRefresh
    * @param {any} objContext
    * @summary LoadNavigationOnRefresh
    */
    objContext.MainNavigation_ModuleProcessor.LoadNavigationForSSR(objContext);

    /**
    * Based on the URL, sets the ActiveMainNavigationId...
    */
    MainNavigation_Hook.useLoadNavigationOnRefresh(objContext);
   
    /**
     * @name GetContent
     * @sumarry Forms JSX for MainNavigation
     * @returns {object} JSX
     */
    const GetContent = () => {
        let arrMainNavigation = [];
        if (props.NavigationData != undefined)
            arrMainNavigation = props.NavigationData.filter(x => x.ParentNavigationId == 0);        
        let blnIsDevMode = QueryString.GetQueryStringValue("IsDevMode") == "Y" || (props.QueryStringObject && props.QueryStringObject["IsDevMode"] == 'Y');
        return (
            <div className={state.IsCollapsed === true ? "main-navigation collapse" : "main-navigation"} >
                <div className="main-navigation-trigger" onClick={() => { dispatch({ type: "SET_STATE", payload: { "IsCollapsed": !state.IsCollapsed } }); }}>
                    <img src={props.JConfiguration.ProductManagementSkinPath + "/Images/Common/Icons/control_imgs.png"} />
                </div>
                <ul>
                    {
                        arrMainNavigation.map((objNavigation, intIndex) => {
                            if (blnIsDevMode || objNavigation["ProjectIdentifier"].split(',').indexOf(JConfiguration.ProjectIdentifier) > -1) {
                                let strClassName = ApplicationState.GetProperty("ActiveMainNavigationId") == objNavigation["NavigationId"] || objContext.state.strMainNavigationId == objNavigation["NavigationId"] ? "selected" : "";
                                return <li key={intIndex} className={strClassName} onClick={() => { objContext.MainNavigation_ModuleProcessor.OnMainNavigationClick(objContext, objNavigation) }} >
                                    <img src={props.JConfiguration.ProductManagementSkinPath + "/" + objNavigation.ImagePath} title={Localization.TextFormatter(props.TextResource, objNavigation["TextResourceKey"])} />
                                    <span>{Localization.TextFormatter(props.TextResource, objNavigation["TextResourceKey"])}</span>
                                </li>
                            }                            
                        })
                    }
                </ul>
            </div>
        );
    };

    return (GetContent());
  
};

export default withRouter(MainNavigation);
