//React imports
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

//Module related import 
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

/**
 * @name ElasticView
 * @param {any} props
 * @summary The ElasticView is to show the Performance Log for the modules loading. 
 */
const ElasticView = props => {

    /**
     *@summary local state for performance log
     */
    const [blnShowAllElasticKeys, setShowAllElasticKeys] = useState(true); //To decide either to show Full content or the module content

    /**
     *@summary local state for performance log
     */
    const [arrPerformanceLogs, setPerformanceLogs] = useState([]);
    const [arrAllPerformanceLogs, setAllPerformanceLogs] = useState([]);

    /**
     * @name useEffect
     * @summary called after the performanceLog gets updated.
     */
    useEffect(() => {

        if (props.PerformanceLog != undefined || props.PerformanceLog.length != 0) {
            setPerformanceLogs(props.PerformanceLog);
        }
    }, [props.PerformanceLog]);

    /**
     * @name useEffect
     * @summary called after the performanceLog gets updated.
     */
    useEffect(() => {

        if (props.PerformanceLog != undefined || props.PerformanceLog.length != 0) {
            setAllPerformanceLogs(props.AllPerformanceLog);
        }
    }, [props.AllPerformanceLog]);

    /**
     * @name CountElasticData
     * @param {object} arrElasticData
     * @summary count the elastic Data and combine.
     */
    const CountElasticData = (objElasticData) => {
        let arrFinalData = [];
        objElasticData.ElasticKeys.map((objKey, index) => {
            let iIndex = arrFinalData.findIndex(objKeys => objKeys.Key == objKey.Key);
            if (arrFinalData.length == 0 || iIndex == -1) {
                arrFinalData.push(objKey);
            }
            else {
                arrFinalData[iIndex].Count = arrFinalData[iIndex].Count + arrFinalData[iIndex].Count;
            }
        });
        return arrFinalData;
    }

    const OnCheckBoxClick = (blnParams) => {
        if (blnParams) {
            setShowAllElasticKeys(true)
            setPerformanceLogs(props.AllPerformanceLog);
        }
        else {
            setPerformanceLogs(props.PerformanceLog);
            setShowAllElasticKeys(false)
        }
    }

    /**
     * @name GetContent
     * @summary Get the Content for ElasticView 
     */
    const GetContent = () => {
        let jsxModulesToRender = [];

        if (arrPerformanceLogs != undefined) {
            let strModuleName = "";
            let iCallCount = 0;
            let strLastCallDetails = "";
            let strLastCallName = "";
            let arrPerformanceLog = blnShowAllElasticKeys ? arrAllPerformanceLogs : arrPerformanceLogs;

            if (arrPerformanceLog) {
                arrPerformanceLog.map((objPerformanceLog, index) => {
                    let objKey = Object.keys(objPerformanceLog)[0];
                    let jsxModule;

                    //Jsx for Module Name
                    if (objKey == "Message") {
                        if (index != 0) {
                            strLastCallDetails = Object.keys(arrPerformanceLog[index - 1])[0];
                            strLastCallName = Object.values(arrPerformanceLog[index - 1])[0];
                        }

                        if (strLastCallDetails == "Message") {
                            if (strLastCallName.includes("AddEdit")) {
                                jsxModule = (
                                    <React.Fragment>
                                        <div className="p-log-line sub-heading">
                                            <span className="key">{"ClientSideRender"}</span>
                                        </div>
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
                    }


                    //Jsx for Call Details
                    if (objKey.split("_")[0] != "CSR" && objKey.split("_")[0] != "SSR" && objKey !== "Message" && objKey.split("_")[1] != "RENDER") {
                        let strKey = Object.keys(objPerformanceLog)[0];
                        let ObjCallDetails = objPerformanceLog[strKey];
                        let arrElasticKeys = [];


                        let jsxServerCallDetails = (
                            <React.Fragment>

                                <div className="p-log-line sub-heading">
                                    <span className="key"> {"Elastic Keys: "} </span>
                                </div>
                                <div className="api-call-details">
                                    {
                                        Object.keys(ObjCallDetails.APICalls).map((strCallKey) => {
                                            if (ObjCallDetails.APICalls && ObjCallDetails.APICalls[strCallKey] &&
                                                Object.keys(ObjCallDetails.APICalls[strCallKey])[0] == "ElasticKeys" && ObjCallDetails.APICalls[strCallKey].ElasticKeys != undefined) {
                                                arrElasticKeys = CountElasticData(ObjCallDetails.APICalls[strCallKey]);
                                            }
                                            return (<React.Fragment>
                                                {
                                                    arrElasticKeys.map((objElasticKey, index) => {
                                                        let strElasticKey = objElasticKey.Key;
                                                        return (
                                                            <div className="p-log-line sub-heading">
                                                                <span className="key"><span className="h-arrow">{++iCallCount + "."}</span> {strElasticKey} </span>
                                                                <span className="value"><span className="h-arrow"></span> {objElasticKey.Count} </span>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </React.Fragment>
                                            );
                                        })
                                    }
                                </div>
                            </React.Fragment>
                        );
                        iCallCount = 0;
                        jsxModulesToRender = [...jsxModulesToRender, jsxServerCallDetails];
                    }
                });
            }
        }

        return (<React.Fragment>
            <div className="plog-radio-flex">
                <div className="plog-radio-item">
                    <span>AllElasticKeys</span>
                    <label className="plog-radio">
                        <input type="radio" checked={blnShowAllElasticKeys} onChange={() => {
                            OnCheckBoxClick(true);
                        }} />
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="plog-radio-item">
                    <span>ModuleElasticKeys</span>
                    <label className="plog-radio">
                        <input type="radio" checked={!blnShowAllElasticKeys} onChange={() => {
                            OnCheckBoxClick(false);
                        }} />
                        <span className="checkmark" />
                    </label>
                </div>
            </div>
            {jsxModulesToRender}
        </React.Fragment>);
    }

    //Return Jsx
    return <React.Fragment>{GetContent()}</React.Fragment>
};

export default connect(Base_Hook.MapStoreToProps([
    { "StoreKey": "PerformanceLog", "DataKey": "PerformanceLog" },
    { "StoreKey": "PerformanceLog", "DataKey": "PerformanceLogInMemory" },
    { "StoreKey": "PerformanceLog", "DataKey": "AllPerformanceLog" },
]))(ElasticView);
