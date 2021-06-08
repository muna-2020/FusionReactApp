//React related imports
import React from "react";
import { connect } from "react-redux";
import loadable from '@loadable/component';

//Application state reducer for store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Base component imports
import * as Base_Hook from "@shared/Framework/BaseClass/Base_Hook";

//Component related imports
import PerformanceView from "@root/Core/7_DevelopmentSideBar/PerformanceView/PerformanceView";
import ReduxView from "@root/Core/7_DevelopmentSideBar/ReduxView/ReduxView";
import MemoryView from "@root/Core/7_DevelopmentSideBar/MemoryView/MemoryView";

/**
  * @name StoreMapList     
  * @summary Returns list of objects used in the module
  * @return {Array} Array of object list
  */
const StoreMapList = () => {
    return [
        { "StoreKey": "ApplicationState", "DataKey": "ShowSideBarLeftMenu" },
        { "StoreKey": "ApplicationState", "DataKey": "SystemInspectMenuToShow" }
    ];
};

/**
 * @name DevelopmentSideBarContentView
 * @param {object} props parent props.
 * @summary used to show the development side bar content.
 * @returns {Component} DevelopmentSideBarContentView
 */
const DevelopmentSideBarContentView = (props) => {

    /**
      * @name SystemInspectDetails
      * @summary Forms the JSX for the SystemInspectDetails.
      * @returns {object} React.Fragement to form the Master.
      */
    const SystemInspectDetails = () => {
        let blnIsDirectEditor = QueryString.GetQueryStringValue("PageId") !== "";
        if (document.getElementById("EditorMainWrapper") && blnIsDirectEditor)
            document.getElementById("EditorMainWrapper").style.left = blnIsDirectEditor ? "528px" : "";

        switch (props.SystemInspectMenuToShow) {
            case "PerformanceLog":
                return <PerformanceView />;
            case "ReduxView":
                return <ReduxView {...props} />;
            case "DomView":
                let DomViewComponent = loadable(() => import(/* webpackChunkName: "DomView" */ '@root/Core/7_DevelopmentSideBar/DomView/DomView'));
                return <DomViewComponent {...props} />;
            case "MemoryView":
                return <MemoryView />;
            case "ElasticView":
                let ElasticViewComponent = loadable(() => import(/* webpackChunkName: "ElasticView" */ '@root/Core/7_DevelopmentSideBar/ElasticView/ElasticView'));
                return <ElasticViewComponent {...props} />;
            case "ErrorView":
                let ErrorViewComponent = loadable(() => import(/* webpackChunkName: "ErrorView" */ '@root/Core/7_DevelopmentSideBar/ErrorView/ErrorView'));
                return <ErrorViewComponent {...props} />;
            case "ModulePerformance":
                let ModulePerformanceComponent = loadable(() => import(/* webpackChunkName: "ModulePerformance" */ '@root/Core/7_DevelopmentSideBar/ModulePerformance/ModulePerformance'));
                return <ModulePerformanceComponent {...props} />;
            case "ApplicationLog":
                let ApplicationLog = loadable(() => import(/* webpackChunkName: "ApplicationLog" */ '@root/Core/7_DevelopmentSideBar/ApplicationLog/ApplicationLog'));
                return <ApplicationLog {...props} />;
            default: return "";
        }
    };

    /**
     * @name OnCloseButtonClick
     * @summary Actions to be done when close button is clicked.
     * */
    const OnCloseButtonClick = () => {
        let objButton = document.getElementById(props.SystemInspectMenuToShow);
        if (objButton && objButton !== null) {
            let strClassName = objButton.getAttribute("class");
            if (strClassName.includes(" highlight")) {
                strClassName = strClassName.replace(" highlight", "");
                objButton.setAttribute("class", strClassName);
            }
        }
        ApplicationState.SetProperty("ShowSideBarLeftMenu", false);
        ApplicationState.SetProperty("SystemInspectMenuToShow", "");
        let blnIsDirectEditor = QueryString.GetQueryStringValue("PageId") !== "";

        if (document.getElementById("EditorMainWrapper") && blnIsDirectEditor)
            document.getElementById("EditorMainWrapper").style.left = blnIsDirectEditor ? "48px" : "";
    };

    /**
     * @name GetContent
     * @summary Contains the JSX
     * @returns {JSX} JSX.
     * */
    const GetContent = () => {
        if (props.ShowSideBarLeftMenu) {
            return (
                <div className="performance-log-sidebar show">
                    <div className="close-all">
                        <span onClick={() => { OnCloseButtonClick(); }}>
                            &#10006;
                        </span>
                    </div>
                    {
                        props.SystemInspectMenuToShow && props.SystemInspectMenuToShow != "" ? SystemInspectDetails() : ""
                    }
                </div>
            );
        }
        else {
            return "";
        }
    };

    return GetContent();
};

export default connect(Base_Hook.MapStoreToProps(StoreMapList()))(DevelopmentSideBarContentView);