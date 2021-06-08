// React related imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Modules imports.
import * as Master_Hook from '@shared/Application/c.Intranet/LoginAndMaster/Master/Master_Hook';
import Master_ModuleProcessor from "@shared/Application/c.Intranet/LoginAndMaster/Master/Master_ModuleProcessor";

//Components used
import RouteLoader from "@root/Core/3_Route/RouteLoader";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";
import SubNavigation from "../Navigation/SubNavigation/SubNavigation";
import ServiceAction from "@root/Application/c.Intranet/PC/LoginAndMaster/Master/ServiceAction/ServiceAction";
import BreadCrumb from "@root/Application/c.Intranet/PC/LoginAndMaster/Navigation/BreadCrumb/BreadCrumb";
import MasterOfficeRibbon from '@root/Application/c.Intranet/PC/LoginAndMaster/Master/MasterOfficeRibbon/MasterOfficeRibbon';
import OnlineHelpView from '@root/Core/8_OnlineHelpView/OnlineHelpView/OnlineHelpView';
import ContextMenu from '@root/Framework/Controls/ContextMenu_New/ContextMenu';
import Animation from '@root/Framework/Controls/Animation/Animation';
import Dragdrop from '@root/Framework/Controls/Dragdrop/Dragdrop';
import Popup from "@root/Framework/Blocks/Popup/Popup";
import Grid from "@root/Framework/Blocks/Grid/Grid";
import MultiLanguageInputs from '@root/Framework/Controls/MultiLanguageControls/MultiLanguageInputs/MultiLanguageInputs';
import Tree from "@root/Framework/Controls/Tree/Tree";
import SplitPane from '@root/Framework/Controls/SplitPane/SplitPane';

//global imports
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
global.IntranetBase_Hook = IntranetBase_Hook;
global.Grid = Grid;
global.MultiLanguageInputs = MultiLanguageInputs;
global.Tree = Tree;
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

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Master", ["Master_ModuleProcessor"]: new Master_ModuleProcessor() };

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

    /**
     * @name GetContent
     * @param {any} props
     * @returns Forms the JSX for Master...
     */
    const GetContent = (props) => {

        let arrNavigation = DataRef(props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + props.JConfiguration.ApplicationTypeId)["Data"];
        let objNavigation = arrNavigation ? arrNavigation[0] : {};
        let strApplicationName = Object.keys(objNavigation)[1];
        let arrNavigationData = objNavigation[strApplicationName];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/LoginAndMaster/Master", objContext.props);
        let objNavigationTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/LoginAndMaster/Navigation", objContext.props);


        return (
            <div className="master-parent" >
                <div className="main-wrapper">
                    <SplitPane
                        ref={objContext.state.refOnlineHelp}
                        Meta={{
                            SplitDirection: "vertical",
                            DefaultSize: "0%",
                            MaxSize: 900,
                            MinSize: 200,
                            Primary: "second",
                            ResizerStyle: { marginRight: "-5px", position: "relative", zIndex: "999999" },
                            Pane1Style: {width: "100%",overflow: "hidden"}
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
                                        <img src={props.JConfiguration.WebDataPath + "Repo/Logo/" + props.JConfiguration.MainClientId + "/JLogo.svg"} />
                                    </div>
                                    <ServiceAction
                                        {...props}
                                        JConfiguration={props.JConfiguration}
                                        Data={{
                                            DropdownData: {
                                                CountryData: props.IsForServerRenderHtml ? props.CountryData : state.arrCountryData,
                                                LanguageData: props.IsForServerRenderHtml ? props.LanguageData : state.arrLanguageData,
                                                MainClientLanguageData: props.IsForServerRenderHtml ? props.MainClientLanguageData : state.arrMainClientLanguageData,
                                                MainClientCountryData: props.IsForServerRenderHtml ? props.MainClientCountryData : state.arrMainClientCountryData
                                            }
                                        }}
                                        Resource={{
                                            Text: objTextResource ? objTextResource : {}
                                        }}
                                        Events={{
                                            OnChangeEventHandler: (objChangeData) => objContext.Master_ModuleProcessor.HandleDropDownChange(objContext, objChangeData),
                                            OnHelpClick: () => objContext.Master_ModuleProcessor.OnHelpClick(objContext),
                                            OnLogoutClick: () => objContext.Master_ModuleProcessor.OnLogoutClick(objContext),
                                            OnCloseOfflinePopup: objContext.Master_ModuleProcessor.LoadOfflineProcessCount
                                        }}
                                        ParentProps={{ ...props }}
                                    />
                                </div>
                                <div className="top-navigation">
                                    <MasterOfficeRibbon
                                        {...props}
                                        SkinPath={props.JConfiguration.IntranetSkinPath}
                                    />
                                </div>
                            </div>
                            <div className="content-flex">
                                <SplitPane
                                    Meta={{ SplitDirection: "vertical", MinSize: 200, MaxSize: 500, DefaultSize: "15%", Pane2Style: { width: "100%", overflow: "hidden" } }}
                                >
                                    <div className={state.blnOpenSideNav === false ? "side-navigation" : "side-navigation active"} >
                                        <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/collaspe.svg"}
                                            className="close-side-nav-trigger" onClick={() => objContext.Master_ModuleProcessor.HandleSideNavigation(objContext)} />
                                        <div className="sub-navigation" id="DivSubNavigation">
                                            <SubNavigation
                                                {...props}
                                                MainNavigationId={objContext.Master_ModuleProcessor.GetMainNavigationId(objContext)}
                                                NavigationData={arrNavigationData}
                                                TextResource={objNavigationTextResource ? objNavigationTextResource : {}}
                                            />
                                        </div>
                                        <MainNavigation
                                            JConfiguration={props.JConfiguration}
                                            NavigationData={arrNavigationData}
                                            TextResource={objNavigationTextResource ? objNavigationTextResource : {}}
                                            history={props.history}
                                            ComponentController={props.ComponentController}
                                        />
                                    </div>
                                    <div className="content-area">
                                        <div className="content-block">
                                            <div className="task-container">

                                                <BreadCrumb
                                                    {...props}
                                                    JConfiguration={props.JConfiguration}
                                                    NavigationData={arrNavigationData}
                                                    history={props.history}
                                                    TextResource={objNavigationTextResource ? objNavigationTextResource : {}}
                                                    ComponentController={props.ComponentController}
                                                />

                                                <div className="task-flex">
                                                    {
                                                        props.IsForServerRenderHtml
                                                            ?
                                                            objContext.Master_ModuleProcessor.LoadModuleForSSR(objContext)
                                                            :
                                                            <RouteLoader
                                                                {...props}
                                                                RouterPath={ApplicationState.GetProperty('RouterPath')}
                                                                ComponentController={props.ComponentController}
                                                                JConfiguration={props.JConfiguration}
                                                                Resource={
                                                                    { "ImagePath": props.JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif' }
                                                                } />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SplitPane>
                            </div>
                        </div>
                        <OnlineHelpView {...props} Events={{ OnOnlineHelpClose: () => objContext.Master_ModuleProcessor.OnOnlineHelpClose(objContext) }}/>
                    </SplitPane>
                </div>
                <div id="IntranetEditorHolder" />
            </div>
        );
    };

    return (
        <Dragdrop ApplicationName="Intranet">
            <React.Fragment>
                <Popup Id="PopupId"
                    Meta={{ GroupName: "Popup" }}
                    Resource={{ SkinPath: props.JConfiguration.IntranetSkinPath }}
                    ParentProps={props}
                />
                <ContextMenu ParentProps={props} JConfiguration={props.JConfiguration} Resource={{ "SkinPath": objContext.props.JConfiguration.IntranetSkinPath }} />
            </React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment></React.Fragment>}
        </Dragdrop>
    );

};


export default connect(IntranetBase_Hook.MapStoreToProps(Master_ModuleProcessor.StoreMapList()))(Master);
