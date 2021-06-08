//React related imports
import React, { useEffect } from "react";
import { connect } from "react-redux";

//Application state reducer for store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Module related import 
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import { isArray } from "util";
import Pimage from '@intranetdefaulttheme/Images/Common/Icons/pimage.svg?inline';
import Redux from '@intranetdefaulttheme/Images/Common/Icons/Redux.svg?inline';
import DomView from '@intranetdefaulttheme/Images/Common/Icons/DomView.svg?inline';
import DataUsage from '@intranetdefaulttheme/Images/Common/Icons/dataUsage.svg?inline';
import ElasticView from '@intranetdefaulttheme/Images/Common/Icons/ElasticView.svg?inline';
import ModulePerformance from '@intranetdefaulttheme/Images/Common/Icons/ModulePerformance.svg?inline';
import ErrorBlock from '@intranetdefaulttheme/Images/Common/Icons/error-black.svg?inline';
import ErrorImage from '@intranetdefaulttheme/Images/Common/Icons/error.svg?inline';
import ApplicationLog from '@intranetdefaulttheme/Images/Common/Icons/ApplicationLog.svg?inline';
import Bundle from '@intranetdefaulttheme/Images/Common/Icons/bundle.svg?inline';

/**
 * @name DevelopmentSideBarView
 * @param {object} props parent props.
 * @summary used to show the development side bars.
 * @returns {component} DevelopmentSideBarView
 */
const DevelopmentSideBarView = (props) => {

    /**
     * @name useEffect
     * @summary used to set the application initial state for SystemInspectMenuToShow & ShowSideBarLeftMenu
     */
    useEffect(() => {
        ApplicationState.SetProperty("ShowSideBarLeftMenu", false);
        ApplicationState.SetProperty("SystemInspectMenuToShow", "");
    }, []);

    /**
     * @name ChooseFromSystemInspectMenu
     * @param {string} strSystemInspectMenuToShow Context object
     * @summary Does the logic for the selecting the SystemInspectMenu
     */
    const ChooseFromSystemInspectMenu = (strSystemInspectMenuToShow) => {
        let objButton = document.getElementById(ApplicationState.GetProperty("SystemInspectMenuToShow"));
        if (objButton && objButton !== null) {
            let strClassName = objButton.getAttribute("class");
            if (strClassName.includes(" highlight")) {
                strClassName = strClassName.replace(" highlight", "");
                objButton.setAttribute("class", strClassName);
            }
        }
        ApplicationState.SetProperty("ShowSideBarLeftMenu", true);
        ApplicationState.SetProperty("SystemInspectMenuToShow", strSystemInspectMenuToShow);
        objButton = document.getElementById(strSystemInspectMenuToShow);
        if (objButton && objButton !== null) {
            let strClassName = objButton.getAttribute("class");
            strClassName += " highlight";
            objButton.setAttribute("class", strClassName);
        }
    };

    /**
     * @name GetContent
     * @sumamry Contains the JSX.
     * @returns {JSX} JSX
     */
    const GetContent = () => {

        let IsAnyError = false;

        if (props.JSError && props.JSError.length > 0) {
            IsAnyError = true;
        }
        else if (props.APICallErrors && typeof props.APICallErrors == "string") {
            let objAPICallErrors = JSON.parse(props.APICallErrors);
            Object.keys(objAPICallErrors).map(x => {
                if (objAPICallErrors[x] != null && IsAnyError == false) {
                    IsAnyError = true;
                }
            })
        }

        return (
            <div className="plog-container">
                <button
                    id="PerformanceLog"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => { ChooseFromSystemInspectMenu("PerformanceLog"); }}>
                    <img src={Pimage} />
                    <span className="hover-title">Performance View</span>
                </button >
                <button
                    id="ReduxView"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => { ChooseFromSystemInspectMenu("ReduxView"); }}>
                    <img src={Redux} title="ReduxView" />
                    <span className="hover-title">Redux View</span>
                </button >
                <button
                    id="DomView"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => { ChooseFromSystemInspectMenu("DomView"); }}>
                    <img src={DomView} />
                    <span className="hover-title">Dom View</span>
                </button >
                <button
                    id="MemoryView"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => { ChooseFromSystemInspectMenu("MemoryView"); }}>
                    <img src={DataUsage} title="MemoryView" />
                    <span className="hover-title">Memory View</span>
                </button >
                <button
                    id="ElasticView"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => { ChooseFromSystemInspectMenu("ElasticView"); }} >
                    < img src={ElasticView} title="ElasticView" />
                    <span className="hover-title">Elastic View</span>
                </button >
                <button
                    id="ModulePerformance"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => { ChooseFromSystemInspectMenu("ModulePerformance"); }} >
                    <img src={ModulePerformance} title="ModulePerformance" />
                    <span className="hover-title">ModulePerformance</span>
                </button>
                <button
                    id="ErrorView"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => { ChooseFromSystemInspectMenu("ErrorView"); }} >
                    <img src={!IsAnyError ? ErrorBlock : ErrorImage} title="ErrorView" />
                    <span className="hover-title">ErrorView</span>
                </button >
                <button
                    id="ApplicationLog"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => { ChooseFromSystemInspectMenu("ApplicationLog"); }} >
                    <img
                        src={ApplicationLog}
                        alt="ApplicationLog"
                        title="ApplicationLog" />
                    <span className="hover-title">ApplicationLog</span>
                </button>
                <button
                    id="BundleAnalyzer"
                    style={{ display: "inline-block" }}
                    className="plog-btn"
                    onClick={() => {
                        let HtmlFilePath = JConfiguration.OnlineBaseUrl + "Bundle/" + props.JConfiguration.ApplicationFolderName + props.JConfiguration.DeviceType + "/ClientBuild/BundleAnalysisReport.html";
                        if (HtmlFilePath) {
                            window.open(HtmlFilePath);
                        }
                    }} >
                    <img
                        src={Bundle}
                        alt="BundleAnalyzer"
                        title="BundleAnalyzer" />
                    <span className="hover-title">BundleAnalyzer</span>
                </button>
            </div>
        );
    };

    return GetContent();
};

export default connect(Base_Hook.MapStoreToProps([
    { "StoreKey": "ApplicationState", "DataKey": "APICallErrors" },
    { "StoreKey": "ApplicationState", "DataKey": "JSError" },
]))(DevelopmentSideBarView);
