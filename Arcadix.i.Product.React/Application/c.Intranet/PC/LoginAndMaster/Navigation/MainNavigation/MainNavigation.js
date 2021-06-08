// React related imports.
import React, { useReducer } from "react";
import { withRouter } from 'react-router-dom';

//Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import * as MainNavigation_Hook from '@shared/Application/c.Intranet/LoginAndMaster/Navigation/MainNavigation/MainNavigation_Hook';
import MainNavigation_ModuleProcessor from "@shared/Application/c.Intranet/LoginAndMaster/Navigation/MainNavigation/MainNavigation_ModuleProcessor";

//Application state reducer of store.
import { array } from "prop-types";

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

        return (
            <div className={state.IsCollapsed === true ? "main-navigation collapse" : "main-navigation"} >
                <div className="main-navigation-trigger" onClick={() => { dispatch({ type: "SET_STATE", payload: { "IsCollapsed": !state.IsCollapsed } }); }}>
                    <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/control_imgs.png"} />
                </div>
                <ul>
                    {
                        arrMainNavigation.map((objNavigation, intIndex) => {
                            let strClassName = ((ApplicationState.GetProperty("ActiveMainNavigationId") == -1 && objNavigation["NavigationType"] == "Task") || (ApplicationState.GetProperty("ActiveMainNavigationId") == -2 && objNavigation["NavigationType"] == "Test") || (ApplicationState.GetProperty("ActiveMainNavigationId") == objNavigation["NavigationId"])) ? "selected" : "";
                            //let strNavigationTextResourceKey = objNavigation["NavigationText"][props.JConfiguration.LanguageCultureInfo]
                            return <li key={intIndex} className={strClassName} onClick={() => { objContext.MainNavigation_ModuleProcessor.OnMainNavigationClick(objContext, objNavigation) }} >
                                <img src={props.JConfiguration.IntranetSkinPath + "/" + objNavigation.ImagePath} title={Localization.TextFormatter(props.TextResource, objNavigation["TextResourceKey"])}/>
                                {
                                    //<span>{objNavigation["NavigationText"][props.JConfiguration.LanguageCultureInfo]}</span>
                                }
                                <span>{Localization.TextFormatter(props.TextResource, objNavigation["TextResourceKey"])}</span>

                            </li>
                        })
                    }
                </ul>
            </div>
        );
    };

    return (GetContent());

};

export default withRouter(MainNavigation);
