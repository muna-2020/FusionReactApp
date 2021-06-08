//React imports
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

//Module related import 
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name PerformanceView
 * @param {any} props
 * @summary The PerformanceView is to show the Performance Log for the modules loading. 
 */
const PerformanceView = props => {

    /**
     *@summary local state for performance log
     */
    const [arrPerformanceLogs, setPerformanceLogs] = useState([]);
    const [arrPerformanceCSRLogs, setPerformanceCSRLogs] = useState([]);
    const [strTabName, setTabName] = useState("SSR");
    const [objFirstLoadPerformance, setFirstLoadPerformance] = useState({});
    const [objFileDetails, setFileDetails] = useState([]);

    /**
     * @name useEffect
     * @summary called after the performanceLog gets updated.
     */
    useEffect(() => {

        //latest performance log on the top.
        if (props.PerformanceLog != undefined) {
            setPerformanceLogs(props.PerformanceLog);

        }

        //latest performance log on the top.
        if (props.TotalCSRPerformanceLog != undefined) {
            setPerformanceCSRLogs(props.TotalCSRPerformanceLog);
        }
        setFileDetails(window.FileDetails ? window.FileDetails : []);

        if (Object.keys(objFirstLoadPerformance).length == 0 && typeof LoginPerformance != "undefined") {
            setFirstLoadPerformance({ ...LoginPerformance });
        }


    }, [props.PerformanceLog]);

    /**
     * @name OnClickNavigation
     * @param {any} strDivToShow
     * @summary event for onClick Tabs
     */
    const OnClickNavigation = (strDivToShow) => {
        let strCurrentTab = strTabName;
        document.getElementById(strCurrentTab).classList.remove("active");
        document.getElementById(strDivToShow).classList.add("active");
        setTabName(strDivToShow);
    }

    /**
     * @name GetTabs
     * @summary Forms the jsx required for the Tabbed in the Top.
     * @returns {object} jsx
     */
    const GetTabs = () => {
        return <ul style={{ "display": "flex" }} className="peformance-navigation" id="FilterBlock">
            <li>
                <span id="SSR" className="active" onClick={() => { OnClickNavigation("SSR") }} >{"SSR"}</span>
            </li>
            <li>
                <span id="FileDetailsView" onClick={() => { OnClickNavigation("FileDetailsView") }} >{"FileDetails"}</span>
            </li>
            <li>
                <span id="CSRAPICalls" onClick={() => { OnClickNavigation("CSRAPICalls") }} >{"ClientAPICall"}</span>
            </li>
            <li>
                <span id="ClientRender" onClick={() => { OnClickNavigation("ClientRender") }} >{"ClientRender"}</span>
            </li>
            <li>
                <span id="Summary" onClick={() => { OnClickNavigation("Summary") }} >{"Summary"}</span>
            </li>
        </ul>
    }

    /**
    * @name GetViews
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetViews = () => {
        return (
            <div className="task-container">
                <div id="SSR" className="" style={{ display: (strTabName == "SSR" ? "block" : "none") }}>
                    {GetSSRDiv()}
                </div>
                <div id="FileDetailsView" className="" style={{ display: (strTabName == "FileDetailsView" ? "block" : "none") }}>
                    {FileDetailsView()}
                </div>
                <div id="CSRAPICalls" className="" style={{ display: (strTabName == "CSRAPICalls" ? "block" : "none") }}>
                    {CSRAPICalls()}

                </div>
                <div id="ClientRender" className="" style={{ display: (strTabName == "ClientRender" ? "block" : "none") }}>
                    {ClientRender()}
                </div>
                <div id="Summary" className="" style={{ display: (strTabName == "Summary" ? "block" : "none") }}>
                    {GetSummary()}
                </div>
            </div>);
    }

    /**
     * @name ClientRender
     * @summary get CSR time
     */
    const ClientRender = () => {
        let blnLoadRenderTime = false;
        let jsxModule;
        let jsxModulesToRender = [];
        let objCSR = {};
        let intApiCall = 0;
        let strLastModuleName = "";
        let blnIsCSRModuleNameDispalyed = false;
        let iClientRenderCount = 1;
        let TotalCSRTimeOfMainModule = 0;

        arrPerformanceLogs.map((objPerformanceLog, index) => {
            let objKey = Object.keys(objPerformanceLog)[0];
            if (objKey == "Message" && !blnIsCSRModuleNameDispalyed) {
                strLastModuleName = objPerformanceLog.Message ? objPerformanceLog.Message : props.Entity ? props.Entity : "";

                if (strLastModuleName != "" && strLastModuleName != "PerformanceResponse" && strLastModuleName != "ViewCSRStateProps") {
                    let intComponentCSRTime = 0;
                    if (props.TotalCSRPerformanceLog && props.TotalCSRPerformanceLog.length != 0) {
                        props.TotalCSRPerformanceLog[0].map((objCSRLog) => {
                            if (objCSRLog.IsMainModule) {
                                intComponentCSRTime = parseInt(Object.values(objCSRLog)[0]);
                            }
                        })
                    }

                    jsxModule = (
                        <React.Fragment>
                            <div className="p-log-line heading">
                                <span className="key">{"Module Name: " + strLastModuleName}</span>                                
                            </div>
                            <div className="p-log-line sub-heading">
                                <span className="key">{"TotalTime:" + intComponentCSRTime}</span>
                            </div>
                        </React.Fragment>);
                }
                blnIsCSRModuleNameDispalyed = true;
                jsxModulesToRender = [...jsxModulesToRender, jsxModule];
            }
            if (strLastModuleName == "" && !blnIsCSRModuleNameDispalyed && props.TotalCSRPerformanceLog.length>0) {
                let intComponentCSRTime = 0;
                props.TotalCSRPerformanceLog[0].map((objCSRLog) => {
                    if (objCSRLog.IsMainModule) {
                        intComponentCSRTime = parseInt(Object.values(objCSRLog)[0]);
                        strLastModuleName = Object.keys(objCSRLog)[0].split("_")[1];
                    }
                })
                if (strLastModuleName != "") {
                    jsxModule = (
                        <React.Fragment>
                            <div className="p-log-line heading">
                                <span className="key">{"Module Name: " + strLastModuleName}</span>
                            </div>
                            <div className="p-log-line sub-heading">
                                <span className="key">{"TotalTime:" + intComponentCSRTime}</span>
                            </div>
                        </React.Fragment>);

                    jsxModulesToRender = [...jsxModulesToRender, jsxModule];
                    blnIsCSRModuleNameDispalyed = true;
                }
            }

            if (objKey.split("_")[0] != "CSR" && objKey.split("_")[0] != "SSR" && objKey !== "Message" && objKey.split("_")[1] != "RENDER" && objKey != "Multi_SSR") {
                if (Object.keys(objPerformanceLog).length == 1 && Object.keys(objPerformanceLog)[0] === "IsRenderCSR") {
                    let arrCallData = arrPerformanceLogs.filter(objData => Object.keys(objData)[0] == "Multi");
                    if (arrCallData.length == 0)
                        blnLoadRenderTime = true;
                }
                else {
                    let strKey = Object.keys(objPerformanceLog)[0];
                    let ObjCallDetails = objPerformanceLog[strKey];

                    if (Object.keys(ObjCallDetails.APICalls)) {
                        intApiCall += 1;
                    }
                    blnLoadRenderTime = true;
                }
            }
            if (objKey == "Message" && (Object.values(objPerformanceLog)[0].split("_")[0]).toUpperCase() == "LOGIN") {
                blnLoadRenderTime = true;
            }

            if (objKey == "CSR_" + strLastModuleName.toUpperCase()) {
                objCSR = objPerformanceLog;
            }

            //Jsx for RenderTime
            if (blnLoadRenderTime) {
                if (Object.keys(objCSR).length != 0 || arrPerformanceCSRLogs.length != 0) {
                    intApiCall = intApiCall == 0 ? 1 : intApiCall;
                    
                    let intTotal = 0;

                    let jsxSubHeading = (
                        <React.Fragment>
                            {arrPerformanceCSRLogs[intApiCall - 1] && arrPerformanceCSRLogs[intApiCall - 1].length > 0 ?
                                < div className="p-log-line sub-heading">
                                    <span style={{ "color": "green" }} className="value">{iClientRenderCount + ". ClientSideRenderTime:"}</span>
                                </div> : <React.Fragment />
                            }
                        </React.Fragment>
                    );

                    let jsxClientRenderContent = (
                        <React.Fragment>
                            {
                                arrPerformanceCSRLogs[intApiCall - 1] ? arrPerformanceCSRLogs[intApiCall - 1].map((objCSRPerformance, CsrIndex) => {
                                    let objStateProps = objCSRPerformance.StateAndProps[strLastModuleName.toUpperCase()] ? objCSRPerformance.StateAndProps[strLastModuleName.toUpperCase()] : {};
                                    if (Object.keys(objCSRPerformance)[0].split("_")[1] != "MASTER"
                                        //&& Object.keys(objCSRPerformance)[0].split("_")[1] != "LOGIN"
                                        && objCSRPerformance.IsMainModule
                                        && Object.keys(objStateProps).length > 0 && !objStateProps.State["isLoadComplete"]) {
                                        TotalCSRTimeOfMainModule += parseInt(Object.values(objCSRPerformance)[0]);
                                    }
                                    if (Object.keys(objCSRPerformance)[0].split("_")[1] != "MASTER"
                                        && !objCSRPerformance.IsMainModule
                                        || Object.keys(objStateProps).length > 0 && (objStateProps.State["isLoadComplete"] || objStateProps.State.isLoadComplete == undefined)) {
                                        let ModuleName = ApplicationState.GetProperty("PerformanceLogModuleName");
                                        let objPreviuosProps = {};
                                        arrPerformanceCSRLogs[intApiCall - 1].map((objCSRData, index) => {
                                            if (Object.keys(objCSRPerformance)[0].split("_")[1] == Object.keys(objCSRData)[0].split("_")[1] && index < CsrIndex) {
                                                objPreviuosProps = objCSRData;
                                            }
                                        })
                                        if (ModuleName && ModuleName.toUpperCase() == Object.keys(objCSRPerformance)[0].split("_")[1]) {
                                            intTotal += parseInt(Object.values(objCSRPerformance)[0]);
                                        }
                                        return (
                                            <React.Fragment>
                                                {objCSRPerformance.IsMainModule ? <div className="p-log-line sub-heading">
                                                    &nbsp;<span className="value">{Object.keys(objCSRPerformance)[0].replace("CSR_", "") + ": "}</span>
                                                        &nbsp;<span style={{ "fontSize": "13px", "paddingLeft": "5px", "cursor": "pointer" }}
                                                        className="value" onClick={() => { Object.keys(objPreviuosProps).length > 0 ? OpenPopupForCSRDetails({}, objPreviuosProps) : "" }}>{TotalCSRTimeOfMainModule}</span>
                                                </div> : <React.Fragment />}
                                                <div className="p-log-line sub-heading">
                                                    &nbsp;<span className="value">{Object.keys(objCSRPerformance)[0].replace("CSR_", "") + ": "}</span>
                                                &nbsp;<span style={{ "fontSize": "13px", "paddingLeft": "5px", "cursor": "pointer" }}
                                                        className="value" onClick={() => { OpenPopupForCSRDetails(objPreviuosProps, objCSRPerformance) }}>{Object.values(objCSRPerformance)[0]}</span>
                                                </div>
                                            </React.Fragment>);
                                    }
                                }) : <React.Fragment />
                            }
                        </React.Fragment>
                        );

                    let jsxRenderTime = (
                        <React.Fragment>
                            {jsxClientRenderContent &&
                                jsxClientRenderContent.props.children.length > 0 &&
                                jsxClientRenderContent.props.children[0] ?
                                jsxSubHeading : <React.Fragment />}
                            {jsxClientRenderContent}
                        </React.Fragment>
                    );

                    jsxModulesToRender = [...jsxModulesToRender,jsxRenderTime];
                    if (jsxClientRenderContent &&
                        jsxClientRenderContent.props.children.length > 0 &&
                        jsxClientRenderContent.props.children[0]) {
                        iClientRenderCount += 1;
                    }
                }
                
            }
            objCSR = {};
            blnLoadRenderTime = false;

        })
        return jsxModulesToRender;
    }

    /**
     * @name CSRAPICalls
     * @summary ClientRendered API calls
     */
    const CSRAPICalls = () => {
        let strLastModuleName = "";
        let jsxModulesToRender = [];
        let strModuleName = "";
        let iCallCount = 0;
        let blnLoadRenderTime = false;
        let strLastCallDetails;
        let strLastCallName;

        if (arrPerformanceLogs != undefined) {
            arrPerformanceLogs.map((objPerformanceLog, index) => {
                let objKey = Object.keys(objPerformanceLog)[0];
                let jsxModule;
                //Jsx for Module Name
                if (objKey == "Message") {
                    strLastModuleName = objPerformanceLog.Message ? objPerformanceLog.Message : props.Entity ? props.Entity : "";
                    if (strLastModuleName != "") {
                        ApplicationState.SetProperty("PerformanceLogModuleName", strLastModuleName);
                        if (index != 0) {
                            strLastCallDetails = Object.keys(arrPerformanceLogs[index - 1])[0];
                            strLastCallName = Object.values(arrPerformanceLogs[index - 1])[0];
                        }
                        else {
                            jsxModule = (
                                <React.Fragment>
                                    <div className="p-log-line heading">
                                        <span className="key">{"Module Name: " + strLastModuleName}</span>
                                    </div>
                                </React.Fragment>);
                        }
                        if (Object.values(objPerformanceLog)[0] != strModuleName) {
                            iCallCount = 0;
                            jsxModulesToRender = [...jsxModulesToRender, jsxModule];
                        }
                    }
                }

                //jsx for RenderType
                if (objKey == "CSR_" + strLastModuleName.toUpperCase() && props.Entity != "PerformanceResponse") {
                    let objTotalTime = GetTotalClientAPICallTime();
                   let jsxRenderType = (
                        <React.Fragment>
                            <div className="p-log-line sub-heading">
                               <span className="key">{"TotalTime:" + objTotalTime["TotalTime"]}</span>
                               <span className="key">{" TotalSize:" + objTotalTime["TotalSize"]}</span>
                            </div>
                        </React.Fragment>);
                    jsxModulesToRender = [...jsxModulesToRender, jsxRenderType];
                }

                //Jsx for Call Details
                if (objKey.split("_")[0] != "CSR" && objKey.split("_")[0] != "SSR" && objKey !== "Message" && objKey.split("_")[1] != "RENDER" && objKey != "Multi_SSR" && props.Entity != "PerformanceResponse") {

                    if (Object.keys(objPerformanceLog).length == 1 && Object.keys(objPerformanceLog)[0] === "IsRenderCSR") {

                        let arrCallData = arrPerformanceLogs.filter(objData => Object.keys(objData)[0] == "Multi");
                        if (arrCallData.length == 0)
                            blnLoadRenderTime = true;
                    }
                    else {
                        let strKey = Object.keys(objPerformanceLog)[0];
                        let ObjCallDetails = objPerformanceLog[strKey];

                        let iTotalTime = ObjCallDetails.ServerTime.TransportationTime + ObjCallDetails.ServerTime.TotalServerTime;
                        let jsxServerCallDetails = (
                            <React.Fragment>
                                
                                <div className="p-log-line sub-heading apis-child">
                                    <span className="key">
                                        {ObjCallDetails.CompressionTime != undefined && ObjCallDetails.DeComressionTime != undefined ?
                                            ++iCallCount + "." + strKey.split("_")[0] + ": " + iTotalTime +
                                            " (TransportationTime: " + ObjCallDetails.ServerTime.TransportationTime + "," +
                                            " ServerTime: " + ObjCallDetails.ServerTime.TotalServerTime+
                                            ", CompressionTime: " + ObjCallDetails.CompressionTime +
                                            " DeCompressionTime: " + ObjCallDetails.DeComressionTime + ") " :

                                            ++iCallCount + "." + strKey.split("_")[0] + ": " + iTotalTime +
                                            " (TransportationTime: " + ObjCallDetails.ServerTime.TransportationTime + "," +
                                            " ServerTime: " + ObjCallDetails.ServerTime.TotalServerTime+ ") "
                                        }
                                        <span style={{ "fontSize": "13px", "paddingLeft": "5px", "color": "#32af43", "cursor": "pointer" }} onClick={() => { OpenPopup(ObjCallDetails) }}>{" Size"}</span>
                                        {" : " + (ObjCallDetails.Size / 1000).toFixed(1) + " kb"}
                                    </span>
                                </div>
                                <div className="api-call-details">
                                    {
                                        GetGroupedAPICalls(ObjCallDetails)
                                    }
                                </div>
                            </React.Fragment>
                        );
                        jsxModulesToRender = [...jsxModulesToRender, jsxServerCallDetails];
                    }
                }
            });
        }
        return jsxModulesToRender;
    }

    /**
     * @name GetTotalClientAPICallTime
     * @summary to get total Api call time
     */
    const GetTotalClientAPICallTime = () => {
        let iTotalTime = 0;
        let iTotalSize = 0;
        if (arrPerformanceLogs != undefined) {            
            arrPerformanceLogs.map((objPerformanceLog, index) => {
                let objKey = Object.keys(objPerformanceLog)[0];
                if (objKey.split("_")[0] != "CSR" && objKey.split("_")[0] != "SSR" && objKey !== "Message" && objKey.split("_")[1] != "RENDER" && objKey != "Multi_SSR" && props.Entity != "PerformanceResponse") {
                    let strKey = Object.keys(objPerformanceLog)[0];
                    let ObjCallDetails = objPerformanceLog[strKey];
                    iTotalTime += ObjCallDetails.ServerTime.TransportationTime + ObjCallDetails.ServerTime.TotalServerTime;
                    iTotalSize += parseFloat((parseFloat(ObjCallDetails.Size) / 1000).toFixed(1));
                }
            })
        }
        return {
            "TotalTime": iTotalTime, "TotalSize": iTotalSize.toFixed(2)
        };
    }

    /**
     * @name GetSSRDiv
     * @summary get SSR div 
     */
    const GetSSRDiv = () => {
        let strLastModuleName = "";
        let jsxModulesToRender = [];
        let strModuleName = "";
        let iCallCount = 0;
        let objSSR = {};
        let blnLoadRenderTime = false;
        let strLastCallDetails;
        let strLastCallName;

        let iSSRTotalTime = 0;
        let iAPICallTime = 0;
        let iTransportationTime = 0;
        let iNodeAPICallTime = 0;

        if (arrPerformanceLogs != undefined) {
            arrPerformanceLogs.map((objPerformanceLog, index) => {
                let objKey = Object.keys(objPerformanceLog)[0];
                let jsxModule;
                //Jsx for Module Name
                if (objKey == "Message" || index == 0) {
                    strLastModuleName = objPerformanceLog.Message ? objPerformanceLog.Message : props.Entity ? props.Entity : "";
                    if (strLastModuleName != "") {
                        ApplicationState.SetProperty("PerformanceLogModuleName", strLastModuleName);
                        if (index != 0) {
                            strLastCallDetails = Object.keys(arrPerformanceLogs[index - 1])[0];
                            strLastCallName = Object.values(arrPerformanceLogs[index - 1])[0];
                        }
                        else {
                            jsxModule = (
                                <React.Fragment>
                                    <div className="p-log-line heading">
                                        <span className="key">{"Module Name: " + strLastModuleName}</span>
                                    </div>
                                </React.Fragment>);
                        }
                        if (Object.values(objPerformanceLog)[0] != strModuleName) {
                            iCallCount = 0;
                            jsxModulesToRender = [...jsxModulesToRender, jsxModule];
                        }
                        objSSR = {};
                    }

                    if (strLastModuleName != "" && strLastModuleName.toUpperCase() == "LOGIN" && objFirstLoadPerformance && objFirstLoadPerformance.ServerRederAPIListTime) {
                        let iNodeAPICallTime = objFirstLoadPerformance ? parseInt(objFirstLoadPerformance.ServerRederAPIListTime) + parseInt(objFirstLoadPerformance.ServerRenderHTMLTime) : 0;
                        iNodeAPICallTime = (iNodeAPICallTime / 1000).toFixed(1);
                        let TotalServerTime = iNodeAPICallTime;
                        let objResponseDetails = {
                            "Response": {
                                "Data": {},
                                "Html": objFirstLoadPerformance.Html,
                                "Header": {}
                            }
                        }

                        if (LoginPerformance)
                        {
                            LoginPerformance = {};
                        }

                        let jsxServerCallDetails = (
                            <React.Fragment>
                                <div className="p-log-line sub-heading">
                                    <span className="key">{"TotalTime: " + TotalServerTime}</span>
                                    <span className="key">
                                        <span style={{ "cursor": "pointer" }} onClick={() => { OpenPopup(objResponseDetails) }}>{"TotalSize: 0 kb"}</span>
                                    </span>
                                </div>
                                <div className="p-log-line sub-heading">
                                    <span className="value">
                                        {
                                            "DataCallTime: " + 0
                                        }
                                    </span>
                                </div>

                                <div className="p-log-line sub-heading">
                                    <span className="value">{"NodeServiceTime: " + iNodeAPICallTime}</span>
                                </div>
                                <div className="p-log-line sub-heading">
                                    <span className="value">{"TransportationTime: " + 0}</span>
                                </div>
                            </React.Fragment>
                        );
                        jsxModulesToRender = [...jsxModulesToRender, jsxServerCallDetails];
                        blnLoadRenderTime = true;
                    }
                }

                


                //Jsx for Call Details
                if (objKey == "Multi_SSR") {

                    if (Object.keys(objPerformanceLog).length == 1 && Object.keys(objPerformanceLog)[0] === "IsRenderCSR") {

                        let arrCallData = arrPerformanceLogs.filter(objData => Object.keys(objData)[0] == "Multi_SSR");
                        if (arrCallData.length == 0)
                            blnLoadRenderTime = true;
                    }
                    else {
                        let strKey = Object.keys(objPerformanceLog)[0];
                        let ObjCallDetails = objPerformanceLog[strKey];

                        let iTotalTime = ObjCallDetails.ServerTime.TransportationTime + ObjCallDetails.ServerTime.TotalServerTime;

                        iSSRTotalTime = iTotalTime;
                        iAPICallTime = ObjCallDetails.ServerTime.APICallTime;
                        iTransportationTime = ObjCallDetails.ServerTime.TransportationTime;
                        iNodeAPICallTime = ObjCallDetails.ServerTime.NodeAPICallTime;

                        let jsxServerCallDetails = (
                            <React.Fragment>
                                <div className="p-log-line sub-heading">
                                    <span className="key">{"TotalTime: " + ObjCallDetails.ServerTime.TotalServerTime}</span>
                                    <span className="key">
                                        <span style={{ "cursor": "pointer" }} onClick={() => { OpenPopup(ObjCallDetails) }}>{"TotalSize"}</span>
                                        {" : " + (ObjCallDetails.Size / 1000).toFixed(1) + " kb"}
                                    </span>
                                </div>
                                <div className="p-log-line sub-heading">
                                    <span className="value">
                                        {ObjCallDetails.CompressionTime != undefined && ObjCallDetails.DeComressionTime != undefined ?
                                            "DataCallTime: " + iAPICallTime + "(CompressionTime: " + ObjCallDetails.CompressionTime + ", DeCompressionTime: " + ObjCallDetails.DeComressionTime + ")" :
                                            "DataCallTime: " + iAPICallTime
                                        }
                                    </span>
                                </div>
                                <div className="api-call-details">
                                    {
                                        GetGroupedAPICalls(ObjCallDetails)
                                    }
                                </div>
                                <div className="p-log-line sub-heading">
                                    <span className="value">{"NodeServiceTime: " + iNodeAPICallTime}</span>
                                </div>
                                <div className="p-log-line sub-heading">
                                    <span className="value">{"TransportationTime: " + iTransportationTime}</span>
                                </div>
                            </React.Fragment>
                        );
                        jsxModulesToRender = [...jsxModulesToRender, jsxServerCallDetails];
                        blnLoadRenderTime = true;
                    }
                }

                //Jsx for RenderTime
                if (blnLoadRenderTime) {

                    if (Object.keys(objSSR).length != 0) {
                        let jsxRenderTime = (
                            <React.Fragment>

                            </React.Fragment>);
                        jsxModulesToRender = [...jsxModulesToRender, jsxRenderTime];

                        objSSR = {};
                        blnLoadRenderTime = false;
                    }
                }
            });
        }
        if (jsxModulesToRender.length <= 1) {
            let jsxServerCallDetails = (
                <React.Fragment>
                    <div className="p-log-line sub-heading">
                        <span className="value">{"No SSR Call"}</span>
                    </div>
                </React.Fragment>
            );
            jsxModulesToRender = [...jsxModulesToRender, jsxServerCallDetails];
            return jsxModulesToRender;
        }
        else {
            return jsxModulesToRender;
        }
    }

    /**
     * @name FileDetailsView
     * @summary network file details view.
     */
    const FileDetailsView = () => {       

        let jsxFileViewFinal = [];
        let strLastModuleName = "";
        if (objFileDetails && objFileDetails.TotalDownloadTime) {
            let intTotalSize = 0;
            if (objFileDetails && objFileDetails.FileDetails) {
                objFileDetails.FileDetails.map(objData => {
                    intTotalSize += parseFloat(objData.FileSize);
                })
            }
            arrPerformanceLogs.map((objPerformanceLog, index) => {
                let objKey = Object.keys(objPerformanceLog)[0];
                let jsxModule;
                if (objKey == "Message" || index == 0) {
                    strLastModuleName = objPerformanceLog.Message ? objPerformanceLog.Message : props.Entity ? props.Entity : "";
                    if (strLastModuleName != "" && strLastModuleName != "PerformanceResponse"
                        && strLastModuleName != "ViewCSRStateProps"
                        && strLastModuleName != "ViewWaterFallChatPopup"
                        && strLastModuleName != "ViewFileContent"
                        && strLastModuleName != "ShowProcedureDefinition") {
                        jsxModule = (
                            <React.Fragment>
                                <div className="p-log-line heading">
                                    <span className="key" style={{ "cursor": "pointer" }}>
                                        {"Module Name: " + strLastModuleName}
                                    </span>
                                </div>
                                <div className="p-log-line sub-heading">
                                    <span className="key" style={{ "cursor": "pointer" }} onClick={() => { WaterFallPopup() }}>{"TotalTime: " + (parseFloat(objFileDetails.TotalDownloadTime).toFixed(1))}</span>
                                    <span className="key">
                                        <span>{"TotalSize"}</span>
                                        <span >{" : " + intTotalSize.toFixed(1) + " kb"}</span>                                        
                                    </span>
                                </div>
                            </React.Fragment>);
                        jsxFileViewFinal = [...jsxFileViewFinal, jsxModule];
                    }
                }
            })
        }

        if (objFileDetails && objFileDetails.FileDetails && objFileDetails.FileDetails.length > 0) {
            let arrPrefetchFiles = document.querySelectorAll("Link[rel='prefetch']");
            let jsxFileDetails = (
                <React.Fragment>
                    <table className="performance-file-details">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Status</td>
                                <td>Type</td>
                                <td>Size (in kb)</td>
                                <td>Time (in ms)</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                objFileDetails.FileDetails.map((objFileDetail) => {
                                    let strFileName = objFileDetail.FileName.split("/")[objFileDetail.FileName.split("/").length - 1];
                                    let isPrefetchFile = false;
                                    if (arrPrefetchFiles) {
                                        arrPrefetchFiles = Array.from(arrPrefetchFiles);
                                        arrPrefetchFiles.map(objFileData => {
                                            if (objFileData.href == objFileDetail.FileName) {
                                                isPrefetchFile = true;
                                            }
                                        })
                                    }

                                    return (
                                        <React.Fragment>
                                            {//strFileName.split(".").length > 1 ?
                                                <tr>
                                                    <td>
                                                        <span style={isPrefetchFile ? { "color": "blue" } : {}} title={objFileDetail.FileName} className="value">{strFileName}</span>
                                                    </td>
                                                    <td>
                                                        <span style={isPrefetchFile ? { "color": "blue" } : {}} className="value">{objFileDetail.Status}</span>
                                                    </td>
                                                    <td>
                                                        <span style={isPrefetchFile ? { "color": "blue" } : {}} className="value file-type">{objFileDetail.type}</span>
                                                    </td>
                                                    <td>
                                                        <span style={isPrefetchFile ? { "color": "blue" } : {}} className="value">{objFileDetail.FileSize}</span>
                                                    </td>
                                                    <td>
                                                        <span style={isPrefetchFile ? { "color": "blue" } : {}} className="value">{objFileDetail.time}</span>
                                                    </td>
                                                </tr> 
                                            }
                                        </React.Fragment>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </React.Fragment>
            );
            jsxFileViewFinal = [...jsxFileViewFinal, jsxFileDetails];
        }
        else if (window.FileDetails == undefined) {
            let jsxFileDetails = (
                <React.Fragment>
                    <div>
                        <span>The extension has to been installed or it's not enabled. </span>
                        <br/>
                        <span>please follow Instruction from path to install-
                           G:\Arcadix\Product.Fusion\Arcadix.i.Product.React\Core\7_DevelopmentSideBar\PerformanceView\BackgroundProcess\ArcadixModulePerformance.txt</span>
                    </div>
                </React.Fragment>
                );
            jsxFileViewFinal = [...jsxFileViewFinal, jsxFileDetails]; 
        }
        return jsxFileViewFinal;
    }

    /**
     * @name WaterFallPopup
     * @summary to Open the Waterfall chat popup
     */
    const WaterFallPopup = () => {
        let iApplicationTypeId = typeof JConfiguration.ApplicationTypeId === "string" ? parseInt(JConfiguration.ApplicationTypeId) : JConfiguration.ApplicationTypeId;
        window.ResetLogFile();
        Popup.ShowPopup({
            Data: {
                ModuleName: "ViewWaterFallChatPopup",
                IsEdit: false,
                objFileDetails,
                Id: "ViewWaterFallChatPopup"
            },
            Meta: {
                PopupName: "ViewWaterFallChatPopup",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                HeaderData: [],
                IsPerformance: iApplicationTypeId === 6 || iApplicationTypeId === 1 || iApplicationTypeId === 16 ? true : false
            },
            Resource: {
                Text: {},
                ClientUserDetails: props.ClientUserDetails,
                SkinPath: JConfiguration.ExtranetSkinPath //JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            IsForceClientRender: true
        })
    }

    /**
     * @name GetSummary
     * @summary Get summary of calls to display.
     */
    const GetSummary = () => {
        let jsxModulesToRender = [];
        let strModuleName = "";
        if (arrPerformanceLogs != undefined) {
            let intCSRCallTimes = 0;
            let strLastModuleName = "";
            let intComponentCSRTime = 0;
            let intTotalTime = 0;
            let iTotalServerTime = 0;
            let iSSRTotalTime = 0;
            let iAPICallTime = 0;
            let iTransportationTime = 0;
            let blnIsAPICallCompletes = true;
            arrPerformanceLogs.map((objPerformanceLog, index) => {
                let objKey = Object.keys(objPerformanceLog)[0];

                if (objKey == "Message" || index == 0) {
                    strLastModuleName = objPerformanceLog.Message ? objPerformanceLog.Message : props.Entity ? props.Entity : "";
                    if (strLastModuleName != "" && strLastModuleName != "PerformanceResponse" && strLastModuleName != "ViewCSRStateProps" && strLastModuleName != "ViewWaterFallChatPopup") {
                        let jsxModule = (
                            <React.Fragment>
                                <div className="p-log-line heading">
                                    <span className="key">{" " +"Module Name: " + strLastModuleName}</span>
                                </div>
                            </React.Fragment>);
                        if (Object.values(objPerformanceLog)[0] != strModuleName) {
                            jsxModulesToRender = [...jsxModulesToRender, jsxModule];
                        }
                    }
                };

                //Jsx for Call Details
                if (objKey == "Multi_SSR") {
                    let strKey = Object.keys(objPerformanceLog)[0];
                    let ObjCallDetails = objPerformanceLog[strKey];
                    iSSRTotalTime = ObjCallDetails.ServerTime.TransportationTime + ObjCallDetails.ServerTime.TotalServerTime;
                    iTotalServerTime = ObjCallDetails.ServerTime.TotalServerTime;
                    iAPICallTime = ObjCallDetails.ServerTime.APICallTime;
                    iTransportationTime = ObjCallDetails.ServerTime.TransportationTime;

                }

                //Jsx for RenderTime
                if (blnIsAPICallCompletes && iSSRTotalTime != 0 && iAPICallTime != 0 && iTransportationTime != 0) {
                    let jsxRenderTime = (
                        <React.Fragment>
                            <div className="p-log-line sub-heading">
                                <span style={{ "color": "green" }} className="value">{"Server Render Total: "}</span>&nbsp;
                                <span className="value"> {" " +iTotalServerTime}</span>
                            </div>
                        </React.Fragment>);
                    blnIsAPICallCompletes = false;
                    jsxModulesToRender = [...jsxModulesToRender, jsxRenderTime];
                }

                //calculate total Api call time.
                if (objKey == "Multi" && objPerformanceLog["Multi"]["ServerTime"]) {
                    let intServerTime = parseInt(objPerformanceLog["Multi"]["ServerTime"]["TotalServerTime"]);
                    let intTransportationTime = parseInt(objPerformanceLog["Multi"]["ServerTime"]["TransportationTime"]);

                    intCSRCallTimes += (intServerTime + intTransportationTime);
                }
            })

            if (props.TotalCSRPerformanceLog && props.TotalCSRPerformanceLog.length != 0) {
                props.TotalCSRPerformanceLog[0].map((objCSRLog) => {
                    if (objCSRLog.IsMainModule) {
                        intComponentCSRTime = parseInt(Object.values(objCSRLog)[0]);
                    }
                })
            }

            //get CSR call time.
            if (intCSRCallTimes != 0) {
                let jsxCSRCallTime = [];

                jsxCSRCallTime = (
                    <React.Fragment>
                        <div className="p-log-line sub-heading">
                            <span style={{ "color": "green" }} className="value">
                                {"CSR API Call Time: "}
                            </span>&nbsp;
                            <span className="value">
                                {" " +intCSRCallTimes}
                            </span>
                        </div>
                    </React.Fragment>
                );

                jsxModulesToRender = [...jsxModulesToRender, jsxCSRCallTime];
            }

            //Get FileView Time
            if (objFileDetails && objFileDetails.TotalDownloadTime) {
                let jsxCSRRenderTime = [];

                jsxCSRRenderTime = (
                    <React.Fragment>
                        <div className="p-log-line sub-heading">
                            <span style={{ "color": "green" }} className="value">
                                {"FileDownload Time: "}
                            </span>&nbsp;
                            <span className="value">
                                {" "+objFileDetails.TotalDownloadTime}
                            </span>
                        </div>
                    </React.Fragment>
                );

                jsxModulesToRender = [...jsxModulesToRender, jsxCSRRenderTime];
            }

            //get CSR Render time.
            if (intComponentCSRTime != 0) {
                let jsxCSRRenderTime = [];

                jsxCSRRenderTime = (
                    <React.Fragment>
                        <div className="p-log-line sub-heading">
                            <span style={{ "color": "green" }} className="value">
                                {"CSR Render Time: "}
                            </span>&nbsp;
                            <span className="value">
                                {" "+intComponentCSRTime}
                            </span>
                        </div>
                    </React.Fragment>
                );

                jsxModulesToRender = [...jsxModulesToRender, jsxCSRRenderTime];
            }

            //get Total Time. 
            if (intComponentCSRTime != 0 && intCSRCallTimes != 0 || iTotalServerTime != 0) {
                if (iTotalServerTime != 0)
                    intTotalTime = intComponentCSRTime + intCSRCallTimes + iTotalServerTime + parseFloat(objFileDetails.TotalDownloadTime ? objFileDetails.TotalDownloadTime : 0.0);
                else
                    intTotalTime = intComponentCSRTime + intCSRCallTimes + parseFloat(objFileDetails.TotalDownloadTime?objFileDetails.TotalDownloadTime:0.0);
                let jsxCSRRenderTime = [];

                if (iTotalServerTime) {
                    intTotalTime = intTotalTime - iTotalServerTime;
                }

                jsxCSRRenderTime = (
                    <React.Fragment>
                        <div className="p-log-line sub-heading">
                            <span style={{ "color": "green" }} className="value">
                                {"Total Time: "}
                            </span>&nbsp;
                            <span className="value">
                                {" " + intTotalTime.toFixed(1)}
                            </span>
                        </div>
                    </React.Fragment>
                );

                jsxModulesToRender = [...jsxModulesToRender, jsxCSRRenderTime];
            }
        }

        return jsxModulesToRender;
    }

    /**
     * @name OpenPopup
     * @param {any} ObjCallDetails
     * @summary to Open Popup for API Call details
     */
    const OpenPopup = (ObjCallDetails) => {
        let iApplicationTypeId = typeof JConfiguration.ApplicationTypeId === "string" ? parseInt(JConfiguration.ApplicationTypeId) : JConfiguration.ApplicationTypeId;

        Popup.ShowPopup({
            Data: {
                ModuleName: "PerformanceResponse",
                IsEdit: false,
                ResponseData: ObjCallDetails,
                Id: "PerformanceResponse"
            },
            Meta: {
                PopupName: "PerformanceResponse",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                HeaderData: [],
                IsPerformance: iApplicationTypeId === 6 || iApplicationTypeId === 1 || iApplicationTypeId === 16 ? true : false
            },
            Resource: {
                Text: {},
                ClientUserDetails: props.ClientUserDetails,
                SkinPath: JConfiguration.ExtranetSkinPath //JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            IsForceClientRender: true
        })
    };

    /**
     * @name OpenPopupForCSRDetails
     * @param {any} ObjCallDetails
     * @summary to Open Popup for API Call details
     */
    const OpenPopupForCSRDetails = (objPreviuosProps, objStateProps) => {
        let iApplicationTypeId = typeof JConfiguration.ApplicationTypeId === "string" ? parseInt(JConfiguration.ApplicationTypeId) : JConfiguration.ApplicationTypeId;

        Popup.ShowPopup({
            Data: {
                ModuleName: "ViewCSRStateProps",
                IsEdit: false,
                objStateProps,
                objPreviuosProps,
                Id: "ViewCSRStateProps"
            },
            Meta: {
                PopupName: "ViewCSRStateProps",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                HeaderData: [],
                IsPerformance: iApplicationTypeId === 6 || iApplicationTypeId === 1 || iApplicationTypeId === 16 ? true : false
            },
            Resource: {
                Text: {},
                ClientUserDetails: props.ClientUserDetails,
                SkinPath: JConfiguration.ExtranetSkinPath //JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            IsForceClientRender: true
        })
    };

    /**
     * @name GetGroupedAPICalls
     * @param {any} ObjCallDetails
     * @summary To get the JSX for API Calls
     */
    const GetGroupedAPICalls = (ObjCallDetails) => {
        let strCallType = "";
        let JSXAPICallDetails = [];
        let JsxInMemory = [];
        let JsxMultiIndex = [];
        let JsxNormal = [];
        let intMultiIndexKeys = 0;
        let intCSRTime = 0;

        Object.keys(ObjCallDetails.APICalls).map((strCallKey, index) => {
            if (ObjCallDetails.APICalls[strCallKey] && ObjCallDetails.APICalls[strCallKey].isMultiIndex != undefined && ObjCallDetails.APICalls[strCallKey].isMultiIndex == "Y") {
                intMultiIndexKeys += 1;
            }
            let iServerAPICallTime = 0;
            let TotalElasticKeyTime = 0;
            let iRowCount = 0;
            let blnIsInMemory = false;
            let arrMultiIndexData = ObjCallDetails.APICalls[strCallKey] && ObjCallDetails.APICalls[strCallKey].ElasticKeys ?
                ObjCallDetails.APICalls[strCallKey].ElasticKeys.filter((x) => x.Key == JConfiguration.MainClientIdentifier + "_" + strCallKey.toLowerCase()) : null;

            //InMemory
            props.PerformanceLogInMemory ? props.PerformanceLogInMemory.map((objData) => {
                Object.keys(objData).map((objKey) => {
                    if (objKey == strCallKey) {
                        blnIsInMemory = true;
                        return false;
                    }
                })
            }) : "";
            if (props.PerformanceLogInMemory != undefined && props.PerformanceLogInMemory.length != 0 && blnIsInMemory) {
                props.PerformanceLogInMemory.map((objData) => {
                    Object.keys(objData).map((objKey) => {
                        if (objKey == strCallKey) {
                            iRowCount = objData[objKey]["Count"];

                            if (iRowCount == undefined) {
                                ObjCallDetails.APICalls[strCallKey].DataCount != undefined ?
                                    iRowCount = DataCount : "";
                            }

                            let JsxInMemoryItems = (
                                <React.Fragment>
                                    <div className="p-log-line sub-heading">
                                        <span className="key">{strCallKey.split(";")[0] + ":"}
                                            {
                                                "(RowCount: " + iRowCount + ")"
                                            }
                                        </span>

                                    </div>
                                    <div className="p-log-line sub-heading">
                                        <span className="key"><span className="h-arrow">&#187;</span>{"inMemory Time:"}</span>
                                        <span className="value">{objData[objKey]["InMemoryTime"]}</span>
                                    </div>
                                </React.Fragment>
                            );

                            JsxInMemory = [...JsxInMemory, JsxInMemoryItems];
                            return false;
                        }
                    })
                })
            }

            //MultiIndex            
            else if (ObjCallDetails.APICalls[strCallKey] && arrMultiIndexData && ObjCallDetails.APICalls[strCallKey].ElasticKeys[0]["Type"] == 2) {
                ObjCallDetails.APICalls[strCallKey].DataCount != undefined ?
                    iRowCount = ObjCallDetails.APICalls[strCallKey].DataCount : "";                    

                let JsxMultiIndexItems = (
                    <React.Fragment>
                        <div className="p-log-line sub-heading">
                            <span className="key">{strCallKey.split(";")[0] + ":"}
                                {
                                    "(RowCount: " + iRowCount + ")"
                                }
                            </span>

                        </div>
                        <div className="p-log-line sub-heading">
                            {
                                intMultiIndexKeys == 1 ?
                                    ObjCallDetails.APICalls[strCallKey].CallLogs.map((objPerformanceCallLog, index) => {
                                        let blnDiffKey = false;
                                        let strCallTypeName = "Elastic:";
                                        if (objPerformanceCallLog.Key.split(":")[0].includes("ElasticFetch")) {
                                            iServerAPICallTime = iServerAPICallTime + objPerformanceCallLog.Time;
                                            if (strCallType != strCallTypeName) {
                                                strCallType = strCallTypeName;
                                                blnDiffKey = true;
                                            }
                                            TotalElasticKeyTime += objPerformanceCallLog.Time;
                                        }

                                        return (
                                            <React.Fragment>
                                                {
                                                    index == 0 || blnDiffKey && TotalElasticKeyTime != 0 ?
                                                        <span className="key"><span className="h-arrow">&#187;</span>  {"Multi Index " + strCallType} </span> : <React.Fragment />
                                                }
                                                {
                                                    objPerformanceCallLog.Key.split(":")[0].includes("ElasticFetch")
                                                    && TotalElasticKeyTime != 0 &&
                                                    <span style={{ "color": "red", "paddingRight": "5px", "fontWeight": "600", "cursor": "pointer" }} title={objPerformanceCallLog.Order + "." + objPerformanceCallLog.Key}>
                                                        {index == 0 && "("}
                                                        {objPerformanceCallLog.Time}
                                                        {
                                                            index != ObjCallDetails.APICalls[strCallKey].CallLogs.length - 1 && ","
                                                        }
                                                    </span>
                                                }
                                                {
                                                    index == ObjCallDetails.APICalls[strCallKey].CallLogs.length - 1 && TotalElasticKeyTime != 0 &&
                                                    <span className="value">{" ): " + TotalElasticKeyTime}
                                                    </span>
                                                }
                                            </React.Fragment>
                                        );
                                    })
                                    : <React.Fragment>
                                        <span className="key">
                                            Multi Index
                                    </span>
                                    </React.Fragment>

                            }
                            {
                                intMultiIndexKeys == 1 ?
                                    <React.Fragment>
                                        <span className="key"><span className="h-arrow">&#187;</span> {"Processing:"} </span>
                                        <span className="value">{ObjCallDetails.APICalls[strCallKey].Total - iServerAPICallTime}</span>

                                        <span className="key"><span className="h-arrow">&#187;</span>
                                            {
                                                ObjCallDetails.APICalls[strCallKey].isMultiIndex != undefined ||
                                                    ObjCallDetails.APICalls[strCallKey].isMultiIndex == "Y" ? " MultiIndexTotal: " : "Total"
                                            }
                                        </span>
                                        <span className="value">{ObjCallDetails.APICalls[strCallKey].Total}</span>
                                    </React.Fragment>
                                    : <React.Fragment />
                            }
                        </div>
                    </React.Fragment>
                );

                JsxMultiIndex = [...JsxMultiIndex, JsxMultiIndexItems];
            }

            //NormalCalls
            else if (ObjCallDetails.APICalls[strCallKey] && ObjCallDetails.APICalls[strCallKey].CallLogs != undefined) {

                ObjCallDetails.APICalls[strCallKey].DataCount != undefined ?
                    iRowCount = ObjCallDetails.APICalls[strCallKey].DataCount : "";

                let JsxNormalCallItems = (
                    <React.Fragment>
                        <div className="p-log-line sub-heading">
                            <span className="key">{strCallKey.split(";")[0] + ":"}
                                {
                                    "(RowCount: " + iRowCount + ")"
                                }
                            </span>
                        </div>
                        <div className="p-log-line sub-heading">
                            {
                                ObjCallDetails.APICalls[strCallKey].CallLogs.map((objPerformanceCallLog, index) => {
                                    let blnDiffKey = false;
                                    let strCallTypeName = "Elastic:";
                                    if (objPerformanceCallLog.Key.split(":")[0].includes("ElasticFetch")) {
                                        iServerAPICallTime = iServerAPICallTime + objPerformanceCallLog.Time;
                                        if (strCallType != strCallTypeName) {
                                            strCallType = strCallTypeName;
                                            blnDiffKey = true;
                                        }
                                        TotalElasticKeyTime += objPerformanceCallLog.Time;
                                    }

                                    return (
                                        <React.Fragment>
                                            {
                                                index == 0 || blnDiffKey && TotalElasticKeyTime != 0 ?
                                                    <span className="key"><span className="h-arrow">&#187;</span> {strCallType} </span> : <React.Fragment />
                                            }
                                            {
                                                objPerformanceCallLog.Key.split(":")[0].includes("ElasticFetch")
                                                && TotalElasticKeyTime != 0 &&
                                                <span style={{ "color": "red", "paddingRight": "5px", "fontWeight": "600", "cursor": "pointer" }} title={objPerformanceCallLog.Order + "." + objPerformanceCallLog.Key}>
                                                    {index == 0 && "("}
                                                    {objPerformanceCallLog.Time}
                                                    {
                                                        index != ObjCallDetails.APICalls[strCallKey].CallLogs.length - 1 && ","
                                                    }
                                                </span>
                                            }
                                            {
                                                index == ObjCallDetails.APICalls[strCallKey].CallLogs.length - 1 && TotalElasticKeyTime != 0 &&
                                                <span className="value">{" ): " + TotalElasticKeyTime}
                                                </span>
                                            }
                                        </React.Fragment>
                                    );
                                })
                            }
                            {
                                TotalElasticKeyTime == 0 ? ObjCallDetails.APICalls[strCallKey].CallLogs.map((objPerformanceCallLog, index) => {
                                    let blnDiffKey = false;
                                    let strCallTypeName = "DataBase:";
                                    let TotalDBTime = 0;
                                    if (!objPerformanceCallLog.Key.split(":")[0].includes("ElasticFetch")) {
                                        iServerAPICallTime = iServerAPICallTime + objPerformanceCallLog.Time;
                                        if (strCallType != strCallTypeName) {
                                            strCallType = strCallTypeName;
                                            blnDiffKey = true;
                                        }
                                        TotalDBTime += objPerformanceCallLog.Time;
                                    }

                                    return (
                                        <React.Fragment>
                                            {
                                                index == 0 || blnDiffKey && TotalDBTime != 0 ?
                                                    <span className="key">{strCallType} </span> : <React.Fragment />
                                            }
                                            {
                                                !objPerformanceCallLog.Key.split(":")[0].includes("ElasticFetch")
                                                && TotalDBTime != 0 &&
                                                <span style={{ "color": "red", "paddingRight": "5px", "fontWeight": "600", "cursor": "pointer" }} title={objPerformanceCallLog.Order + "." + objPerformanceCallLog.Key}>
                                                    {objPerformanceCallLog.Time}
                                                </span>
                                            }
                                        </React.Fragment>
                                    );
                                }) : <React.Fragment />
                            }
                            <span className="key"><span className="h-arrow">&#187;</span> {"Processing:"} </span>
                            <span className="value">{ObjCallDetails.APICalls[strCallKey].Total - iServerAPICallTime}</span>

                            <span className="key"><span className="h-arrow">&#187;</span> {"Total: "} </span>
                            <span className="value">{ObjCallDetails.APICalls[strCallKey].Total}</span>
                        </div>
                    </React.Fragment>
                );

                JsxNormal = [...JsxNormal, JsxNormalCallItems];
            }
        });

        //grouping
        if (JsxInMemory.length != 0) {
            JSXAPICallDetails = [...JSXAPICallDetails, JsxInMemory];
        }
        if (JsxMultiIndex.length != 0) {
            JSXAPICallDetails = [...JSXAPICallDetails, JsxMultiIndex];
        }
        if (JsxNormal.length != 0) {
            JSXAPICallDetails = [...JSXAPICallDetails, JsxNormal];
        }
        return JSXAPICallDetails;
    };


    /**
     * @name GetContent
     * @summary Get the Content for PerformanceView 
     */
    const GetContent = () => {       
        return (<React.Fragment>
            <div className="clear-all">
                <span onClick={() => {                                        
                    Performance.SetProperty("PerformanceLog", [{ "IsRenderCSR": true }]);
                    Performance.Reset();
                    window.FileDetails = [];
                }}>Clear All <b>&#8856;</b></span>
                <span className="reload" onClick={() => {
                    Performance.Reset();
                    let lbnReload = ApplicationState.GetProperty("iReloadCount");
                    if (lbnReload != undefined) {
                        let iReloadCount = parseInt(ApplicationState.GetProperty("iReloadCount"));
                        iReloadCount += 1;
                        ApplicationState.SetProperty("iReloadCount", "" + iReloadCount + "");
                    }
                    else {
                        ApplicationState.SetProperty("iReloadCount", "1");
                    }
                    ApplicationState.SetProperty("IsSSRReload", false);
                    Performance.Reset();
                }}>Reload <b>&#128472;</b></span>
                <span className="reload" onClick={() => {
                    Performance.Reset();
                    let lbnReload = ApplicationState.GetProperty("iReloadCount");
                    if (lbnReload != undefined) {
                        let iReloadCount = parseInt(ApplicationState.GetProperty("iReloadCount"));
                        iReloadCount += 1;
                        ApplicationState.SetProperty("iReloadCount", "" + iReloadCount + "");
                    }
                    else {
                        ApplicationState.SetProperty("iReloadCount", "1");
                    }
                    ApplicationState.SetProperty("IsSSRReload", true);
                    Performance.Reset();
                }}>SSR Reload <b>&#128472;</b></span>
            </div>
            <div>
                {GetTabs()}
            </div>
            {GetViews()}
        </React.Fragment>);
    }

    //Return Jsx
    return <React.Fragment>{GetContent()}</React.Fragment>
};


export default connect(Base_Hook.MapStoreToProps([
    { "StoreKey": "PerformanceLog", "DataKey": "PerformanceLog" },
    { "StoreKey": "PerformanceLog", "DataKey": "Entity" },
    { "StoreKey": "PerformanceLog", "DataKey": "TotalCSRPerformanceLog" },
    { "StoreKey": "PerformanceLog", "DataKey": "PerformanceLogInMemory" },
]))(PerformanceView);