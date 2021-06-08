import React, { useState, useReducer } from "react";
//import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//module specific imports
import * as Master_Hook from '@shared/Application/d.Extranet/4_Pupil/Phone/LoginAndMaster/Master/Master_Hook';
import Master_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/Phone/LoginAndMaster/Master/Master_ModuleProcessor';

//Common functionalities
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import TopRightMenu from '@root/Application/d.Extranet/4_Pupil/Phone/LoginAndMaster/Master/TopRightMenu/TopRightMenu';
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";
import ServiceNavigation from "../Navigation/ServiceNavigation/ServiceNavigation";
import RouteLoader from '@root/Core/3_Route/RouteLoader';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Controls
import Popup from "@root/Framework/Blocks/Popup/Popup";

function Master(props) {
    const [nav, setNav] = useState(false);

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Master_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, dispatch, props, ["ModuleName"]: "Master", ["Master_ModuleProcessor"]: new Master_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.Master_ModuleProcessor.Initialize(objContext, objContext.Master_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Master_Hook, that contains all the custom hooks.
    * @returns null
    */
    Master_Hook.Initialize(objContext);

    function RouteToHome() {
        ApplicationState.SetProperty("LoadNavigation", { NavigationName: "Teacher" });
    }

    /**
    * @name GetContent
    * @param {object} props Props
    * @summary Gets the jsx to be returned by the component
    * @returns {object} JSX
    */
    const GetContent = (props) => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/LoginAndMaster/Master", props);
        let objNavigation = {}
        if (DataRef(props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)) {
            objNavigation = DataRef(props.Object_Framework_Services_ExtranetNavigation, "Object_Framework_Services_ExtranetNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"][0];
        }
        let strApplicationName = "";
        if (Object.keys(objNavigation).length > 0) {
            strApplicationName = Object.keys(objNavigation)[1];
        }

        let arrNavigationData = [];
        let objProfileNavigation = {};
        if (objNavigation[strApplicationName]) {
            arrNavigationData = objNavigation[strApplicationName];
            objProfileNavigation = arrNavigationData.find(objNavigation => objNavigation.ParentNavigationId == -2);
        }
        let arrMainNavigationData = arrNavigationData.filter(x => x.ParentNavigationId !== -1 && x.ParentNavigationId !== -2);

        return (
          
                <div className="school-master-page">
                    <header id="Header">
                        <div className="header-left">
                            <div
                                className={nav ? "menu-icon active" : "menu-icon"}
                                onClick={() => setNav(!nav)}
                            >
                                <span className="bars bar1" />
                                <span className="bars bar2" />
                                <span className="bars bar3" />
                            </div>
                        </div>
                        <div className="logo" onClick={() => { RouteToHome() }}>
                            <img src={props.JConfiguration ? props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/logo.svg" : ""} />
                        </div>
                        <TopRightMenu
                            objNavigation={{ ...objProfileNavigation }}
                            ClientUserDetails={props.ClientUserDetails}
                            JConfiguration={props.JConfiguration}
                            TextResource={objTextResource}
                        />
                    </header>

                    <div className={nav ? "mobile-navigation active" : "mobile-navigation"}>
                        <div className="nav-container">
                            <MainNavigation
                                ClientUserDetails={props.ClientUserDetails}
                                arrNavigation={arrMainNavigationData}
                                CloseMenu={() => { setNav(false); }}
                            />
                            {
                                //  <ServiceNavigation
                                //    ClientUserDetails={props.ClientUserDetails}
                                //    CloseMenu={() => { setNav(false); }}
                                ///>
                            }
                        </div>
                    </div>
                    <div className="module-area">
                        {/*module goes here*/
                            props.IsForServerRenderHtml ?
                                objContext.Master_ModuleProcessor.LoadModuleForSSR(objContext) :
                                <RouteLoader
                                    {...props}
                                    RouterPath={ApplicationState.GetProperty('RouterPath')}
                                    ClientUserDetails={props.ClientUserDetails}
                                    ComponentController={props.ComponentController}
                                    JConfiguration={props.JConfiguration}
                                />
                        }

                    </div>
                </div>
           
        );
    };

    return (
        <React.Fragment>
            <Popup
                Id="PopupId"
                Meta={{ GroupName: "Popup" }}
                Resource={{ SkinPath: props.JConfiguration.ExtranetSkinPath }}
                ParentProps={props}
            />
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment />}
        </React.Fragment>
    );
}
export default connect(ExtranetBase_Hook.MapStoreToProps(Master_ModuleProcessor.StoreMapList()))(Master);