//React related imports
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

/**
 * @name mapStateToProps
 * @param {*} state
 * we just map the whole Entity and ApplicationState to get the redux data to show 
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            PerformanceLog: state.PerformanceLog.PerformanceLog ? state.PerformanceLog.PerformanceLog : []        
        };
    }
}

/**
 * @name MemoryView
 * @param {*} props 
 * @summary The Memory view shows the memory usage for the object used in perticular module.
 */
const MemoryView = props => {

    /**
      *@summary local state for performance log
      */
    const [arrPerformanceLogs, setPerformanceLogs] = useState([]);

    /**
      * @name useEffect
      * @summary called after the performanceLog gets updated.
      */
    useEffect(() => {

        //latest performance log on the top.
        if (props.PerformanceLog != undefined || props.PerformanceLog.length != 0) {
            setPerformanceLogs(props.PerformanceLog);
        }
    }, [props.PerformanceLog]);

    /**
     * @name GetMemoryUsageInKb
     * @param {long} iMemoryCount 
     * @summary gets the memory usage as byte.Then format & send it as KB 
     * @returns returns formatted Memory usage
     */
    const GetMemoryUsageInKb = iMamoryCount => {
        return iMamoryCount != 0 || iMamoryCount > 0 && iMamoryCount != undefined ? (iMamoryCount / 1024).toFixed(2) : 0;
    }

    /**
     * @name GetContent
     * @summary Get the Content for MemoryView 
     */
    const GetContent = () => {
        let strLastModuleName = "";
        let jsxModulesToRender = [];

        if (arrPerformanceLogs != undefined) {
            let strModuleName = "";
            let iCallCount = 0;
            let objSSR = {};
            let objCSR = {};
            let blnLoadRenderTime = false;
            let strLastCallDetails = "";
            let strLastCallName = "";

            arrPerformanceLogs.map((objPerformanceLog, index) => {
                let objKey = Object.keys(objPerformanceLog)[0];
                let IsLastCallEmpty = false;
                let jsxModule;
                //Jsx for Module Name
                if (objKey == "Message") {
                    strLastModuleName = objPerformanceLog.Message;
                    if (index != 0) {
                        strLastCallDetails = Object.keys(arrPerformanceLogs[index - 1])[0];
                        strLastCallName = Object.values(arrPerformanceLogs[index - 1])[0];
                    }

                    if (strLastCallDetails == "Message") {
                        if (strLastCallName.includes("AddEdit")) {
                            jsxModule = (
                                <React.Fragment>
                                    <div className="p-log-line heading">
                                        <span className="key">{"Module Name: " + objPerformanceLog.Message}</span>
                                    </div>
                                </React.Fragment>);
                        }
                    }
                    else {
                        jsxModule = (
                            <React.Fragment>
                                <div className="p-log-line heading">
                                    <span className="key">{"Module Name: " + objPerformanceLog.Message}</span>
                                </div>
                            </React.Fragment>);
                    }
                    if (Object.values(objPerformanceLog)[0] != strModuleName) {
                        iCallCount = 0;
                        jsxModulesToRender = [...jsxModulesToRender, jsxModule];
                    }
                    objSSR = {};
                    objCSR = {};
                }

                //Jsx for Call Details & Memory usage
                if (objKey.split("_")[0] != "CSR" && objKey.split("_")[0] != "SSR" && objKey !== "Message") {
                    let strKey = Object.keys(objPerformanceLog)[0];
                    let ObjCallDetails = objPerformanceLog[strKey];

                    if (ObjCallDetails.APICalls != undefined) {
                        let jsxServerCallDetails = (
                            <React.Fragment>
                                <div className="p-log-line sub-heading">
                                    <span className="value">{"API Calls "} </span>
                                </div>
                                <div className="p-log-line sub-heading apis-child">
                                    <span className="key"> {
                                        ++iCallCount + "." + strKey
                                    }
                                    </span>
                                </div>
                                <div className="api-call-details">
                                    {
                                        Object.keys(ObjCallDetails.APICalls).map((strCallKey) => {
                                            return (<React.Fragment>
                                                <div className="p-log-line sub-heading">
                                                    {
                                                        ObjCallDetails.APICalls[strCallKey]?ObjCallDetails.APICalls[strCallKey].Order != undefined ?
                                                            <span className="key">{ObjCallDetails.APICalls[strCallKey].Order + "."} </span>
                                                            : "" : <React.Fragment/>
                                                    }
                                                    <span className="key">{strCallKey + ": "} </span>
                                                </div>
                                                <div className="p-log-line sub-heading">
                                                    <React.Fragment>
                                                        <span className="key"><span className="h-arrow">&#187;</span> {"MemoryUsage:"} </span>
                                                        {
                                                            ObjCallDetails.APICalls[strCallKey] ?
                                                            <span className="value">{GetMemoryUsageInKb(ObjCallDetails.APICalls[strCallKey].MemoryUsage) + " Kb"}</span>
                                                            : <React.Fragment />
                                                        }
                                                    </React.Fragment>
                                                </div>
                                            </React.Fragment>
                                            );
                                        })
                                    }
                                </div>
                            </React.Fragment>
                        );
                        jsxModulesToRender = [...jsxModulesToRender, jsxServerCallDetails];
                        blnLoadRenderTime = true;
                    }
                }

                //Jsx for RenderTime
                if (blnLoadRenderTime) {
                    if (Object.keys(objCSR).length != 0) {
                        let jsxRenderTime = (
                            <React.Fragment>
                                <div className="p-log-line sub-heading">
                                    <span className="value">{"ClientSideRenderTime: " + Object.values(objCSR)[0]}</span>
                                </div>
                            </React.Fragment>
                        );

                        jsxModulesToRender = [...jsxModulesToRender, jsxRenderTime];

                        objCSR = {};
                        blnLoadRenderTime = false;
                    }
                    else if (Object.keys(objSSR).length != 0) {
                        let jsxRenderTime = (
                            <React.Fragment>
                                <div className="p-log-line sub-heading">
                                    <span className="value">{"ServerSideRenderTime: " + Object.values(objSSR)[0]}</span>
                                </div>
                            </React.Fragment>);
                        jsxModulesToRender = [...jsxModulesToRender, jsxRenderTime];

                        objSSR = {};
                        blnLoadRenderTime = false;
                    }
                }

                if (index != 0) {
                    if (index == arrPerformanceLogs.length - 1) {
                        strLastCallDetails = Object.keys(arrPerformanceLogs[index])[0];
                        strLastCallName = typeof (Object.values(arrPerformanceLogs[index])[0]) == "string" ? Object.values(arrPerformanceLogs[index])[0] : "";
                        if (strLastCallDetails == "Message") {
                            if (strLastCallName.includes("AddEdit")) {
                                jsxModule = (
                                    <React.Fragment>
                                        <div className="p-log-line sub-heading">
                                            <span className="key">{"ClientSideRender"}</span>
                                        </div>
                                    </React.Fragment>);
                                jsxModulesToRender = [...jsxModulesToRender, jsxModule];
                            }
                        }
                    }
                }

            });
        }

        return (<React.Fragment>
            <div className="clear-all">
                <span onClick={() => {
                    Performance.SetProperty("PerformanceLog", [])
                }}>Clear All <b>&#8856;</b></span>
            </div>
            {jsxModulesToRender}
        </React.Fragment>);
    }

    return <React.Fragment>{GetContent()}</React.Fragment>
};

export default connect(mapStateToProps)(MemoryView);