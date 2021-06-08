// React related imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Base classes.
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import * as Master_Hook from '@shared/Application/c.ProductManagement/LoginAndMaster/Master/Master_Hook';
import Master_ModuleProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Master/Master_ModuleProcessor";

//Components used
import RouteLoader from "@root/Core/3_Route/RouteLoader";
import MainNavigation from "@root/Application/c.ProductManagement/PC/LoginAndMaster/Navigation/MainNavigation/MainNavigation";
import SubNavigation from "@root/Application/c.ProductManagement/PC/LoginAndMaster/Navigation/SubNavigation/SubNavigation";
import BreadCrumb from "@root/Application/c.ProductManagement/PC/LoginAndMaster/Navigation/BreadCrumb/BreadCrumb";
import MasterOfficeRibbon from '@root/Application/c.ProductManagement/PC/LoginAndMaster/Master/MasterOfficeRibbon/MasterOfficeRibbon';
import OnlineHelpView from '@root/Core/8_OnlineHelpView/OnlineHelpView/OnlineHelpView';

//Internal service class imports
import Animation from '@root/Framework/Controls/Animation/Animation';
import Popup from "@root/Framework/Blocks/Popup/Popup";
import ContextMenu from '@root/Framework/Controls/ContextMenu_New/ContextMenu';
import Grid from "@root/Framework/Blocks/Grid/Grid";
import MultiLanguageInputs from '@root/Framework/Controls/MultiLanguageControls/MultiLanguageInputs/MultiLanguageInputs';
import Dragdrop from '@root/Framework/Controls/Dragdrop/Dragdrop';
import SplitPane from '@root/Framework/Controls/SplitPane/SplitPane';

//global imports
global.IntranetBase_Hook = IntranetBase_Hook;
global.Grid = Grid;
global.MultiLanguageInputs = MultiLanguageInputs;
global.SplitPane = SplitPane;

/**
 * @name Master
 * @param {*} props
 * @returns {object} React.Fragement to form the Master.
 */
const Master = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Master_Hook.GetInitialState(props));

    let objContext = { state, props, dispatch, ["ModuleName"]: "Master", ["Master_ModuleProcessor"]: new Master_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} objContext context object
    * @param {object} ModuleProcessor Props
    * @summary Initializing API and DynamicStyles
    * @returns null
    */
    objContext.Master_ModuleProcessor.Initialize(objContext, objContext.Master_ModuleProcessor);

    /**
    * @name LoadNavigationOnRefresh
    * @param {any} objContext
    * @summary LoadNavigationOnRefresh
    */
    //objContext.Master_ModuleProcessor.LoadNavigationForSSR(objContext);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Master_Hook, that contains all the custom hooks.
    * @returns null
    */
    Master_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @param {any} props
     * @returns Forms the JSX for Master...
     */
    const GetContent = () => {

        let arrNavigationData = objContext.Master_ModuleProcessor.GetNavigationData(objContext);
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Master", objContext.props);
        let objNavigationTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/MainNavigation", objContext.props);
        let objSubNavigationTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation", objContext.props);
        let ServiceAction = objContext.props.ComponentController.GetComponent("ServiceAction");

        return (
            <div className="master-parent product-management-parent">

                <div id="main-split-pane" className="main-wrapper">
                    <SplitPane
                        ref={objContext.state.refOnlineHelp}
                        Meta={{
                            SplitDirection: "vertical",
                            DefaultSize: "0%",
                            MaxSize: 900,
                            MinSize: 200,
                            Primary: "second",
                            ResizerStyle: { marginRight: "-5px", position: "relative", zIndex: "999999" },
                            Pane1Style: { width: "100%", overflow: "hidden" }
                        }}
                        Events={{
                            onDragStarted: () => objContext.state.refOnlineHelp.current.pane1.style.flex = "0 0 auto"
                        }}
                    >
                    <div className="wrapper-flex">
                        <div className="header" id="MasterHeader">
                            <div className="header-flex">
                                <div className="top-left" />
                                <div className="top-center">
                                    <span><b>ProductManagement</b></span>
                                </div>
                                    <ServiceAction
                                        {...props}
                                    Id="ServiceAction"
                                    Events={{
                                        OnCloseOfflinePopup: objContext.Master_ModuleProcessor.LoadOfflineProcessCount,
                                        OnHelpClick: () => objContext.Master_ModuleProcessor.OnHelpClick(objContext),
                                        OnLogoutClick: () => objContext.Master_ModuleProcessor.OnLogoutClick(objContext)
                                    }}
                                    Resource={{
                                        Text: objTextResource ? objTextResource : {}
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="top-navigation">
                                    <MasterOfficeRibbon
                                        {...props}
                                        SkinPath={props.JConfiguration.IntranetSkinPath}
                                        JConfiguration={props.JConfiguration}
                                        ComponentController={props.ComponentController}
                                        isSSRDisabled={false}
                                        IsForServerRenderHtml={props.IsForServerRenderHtml}
                                    />
                            </div>
                        </div>
                        <div className="content-flex">
                            <SplitPane
                                    Meta={{ SplitDirection: "vertical", MinSize: 200, MaxSize: 500, DefaultSize: "15%", Pane2Style: { width: "100%", overflow: "hidden" }}}
                            >
                                <div className={state.blnOpenSideNav === false ? "side-navigation" : "side-navigation active"}>
                                    <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/collaspe.svg"}
                                        className="close-side-nav-trigger" onClick={() => objContext.Master_ModuleProcessor.HandleSideNavigation(objContext)} />
                                        <SubNavigation
                                            {...props}
                                            IsForServerRenderHtml={props.IsForServerRenderHtml}
                                            IsForServerRenderAPI={props.IsForServerRenderAPI}
                                            JConfiguration={props.JConfiguration}
                                            ClientUserDetails={props.ClientUserDetails}
                                            history={props.history}
                                            isLoadComplete={props.isLoadComplete}
                                            NavigationData={arrNavigationData}
                                            MainNavigationId={objContext.Master_ModuleProcessor.GetMainNavigationId(objContext)}
                                            TextResource={objSubNavigationTextResource ? objSubNavigationTextResource : {}}
                                    />
                                        <MainNavigation
                                            {...props}
                                            IsForServerRenderHtml={props.IsForServerRenderHtml}
                                            IsForServerRenderAPI={props.IsForServerRenderAPI}
                                        JConfiguration={props.JConfiguration}
                                        ClientUserDetails={props.ClientUserDetails}
                                        NavigationData={arrNavigationData}
                                        TextResource={objNavigationTextResource ? objNavigationTextResource : {}}
                                            history={props.history}
                                            isLoadComplete={props.isLoadComplete}
                                    />

                                </div>
                                <div className="content-area">
                                    <div className="content-block">
                                        <div className="task-container">
                                            {
                                                    <BreadCrumb
                                                        JConfiguration={props.JConfiguration}
                                                        NavigationData={arrNavigationData}
                                                        history={props.history}
                                                    />
                                            }
                                                <div className="task-flex">
                                                    {
                                                        props.IsForServerRenderHtml
                                                            ?
                                                             objContext.Master_ModuleProcessor.LoadModuleForSSR(objContext)
                                                            : 
                                                            <RouteLoader {...props}
                                                                RouterPath={ApplicationState.GetProperty('RouterPath')}
                                                                ComponentController={props.ComponentController}
                                                                JConfiguration={props.JConfiguration}
                                                                Resource={{ "ImagePath": props.JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif' }}
                                                            />
                                                    }
                                            </div>
                                            {/*<OffineExecutionDisplay {...props} />*/}
                                        </div>
                                    </div>
                                </div>
                            </SplitPane>
                        </div>
                    </div>
                        <OnlineHelpView
                            {...props}
                            Events={{ OnOnlineHelpClose: () => objContext.Master_ModuleProcessor.OnOnlineHelpClose(objContext) }} />

                    </SplitPane>

                </div>
            </div>
        );
    };

    return (
        <Dragdrop ApplicationName="ProductManagment">
            <React.Fragment>               
                <Popup Id="PopupId"
                    Meta={{ GroupName: "Popup" }}
                    Resource={{ SkinPath: props.JConfiguration.IntranetSkinPath }}
                    ParentProps={props}
                />
                <ContextMenu ParentProps={props} JConfiguration={props.JConfiguration} Resource={{ "SkinPath": objContext.props.JConfiguration.IntranetSkinPath }} />
            </React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />}
        </Dragdrop>
    );

};

export default connect(IntranetBase_Hook.MapStoreToProps(Master_ModuleProcessor.StoreMapList()))(Master);
