import ApplicationState from "../ApplicationState/ApplicationState";
import { LoadDynamicStyles_API } from '@shared/Framework/Services/CssLoader/CssLoader';
/**
 * this class is responsible for actually making the fetch requests.
 */
class ArcadixFetchData {

    static ExecuteSingle(strUrl, objParams, strMethodType, fnCallBack, objCustomHeader = {}, blnIsCache = false) {
        this.Execute([{
            "URL": strUrl,
            "Params": objParams,
            "MethodType": strMethodType,
            "UseFullName": true
        }], fnCallBack, objCustomHeader, blnIsCache);
    }

    /**
     * Calls the multi execute api
     * can retrieve data for multiple objects
     * @param {*} arrParams array of param objects 
     * @param {*} fnCallBack 
     * @param {*} customHeaders 
     * @param {*} blnIsCache called from FetchAndCache or not. 
     */
    static Execute(arrParams, fnCallBack, customHeaders = {}, blnIsCache = false) {
        var sendParams = {};
        if (!blnIsCache) {
            sendParams = { Params: arrParams };
            customHeaders = { ...customHeaders, "ExecutionTime": Date.now() };
            var result = global.ProviderController.ArcadixFetchDataProvider.fetch("API/MultiClassMethodCall/Execute?sessionkey=" + global.JConfiguration.SessionKey + "", "POST", sendParams, customHeaders)
                .then(response => {
                    if (!Performance.GetProperty("IsRerender"))
                        Performance.StartNewBatch();

                    if (response.status !== 403) {
                        // increment the application state for Main CSR array .                          
                        var castresponse = Promise.resolve(response.json());
                        var HeaderData = {};
                        for (var pair of response.headers.entries()) {
                            HeaderData[pair[0]] = pair[1];
                        }
                        var performancestarttime = HeaderData["executiontime"];
                        var strExecutionTime;
                        if (performancestarttime && performancestarttime != "")
                            strExecutionTime = Date.now() - performancestarttime;

                        var performanceloginmemory = HeaderData["performanceloginmemory"] ? HeaderData["performanceloginmemory"] : '{}';
                        var performancelog = HeaderData["performancelog"] ? HeaderData["performancelog"] : '{}';
                        var timestamp = HeaderData["timestamp"];
                        var actiontype = HeaderData["actiontype"];
                        var count = HeaderData["count"];
                        var pkn = HeaderData["primarykeyname"];
                        var stCode = HeaderData["statuscode"];
                        var err = HeaderData["error"];
                        var contentlength = HeaderData["content-length"];
                        var clientData = {};
                        var responseJson = {};
                        var compressiontime;
                        var uncompressiontime;

                        if (HeaderData["compressiontime"]) {
                            compressiontime = HeaderData["compressiontime"];
                        }

                        ApplicationState.SetProperty("APICallErrors", err);

                        responseJson["PerformanceLog"] = JSON.parse(performancelog);
                        if (performanceloginmemory != undefined)
                            responseJson["PerformanceLogInMemory"] = JSON.parse(performanceloginmemory);
                        responseJson["TimeStamp"] = JSON.parse(timestamp);
                        responseJson["PrimaryKeyName"] = JSON.parse(pkn);
                        responseJson["Count"] = JSON.parse(count);
                        responseJson["ActionType"] = JSON.parse(actiontype);
                        responseJson["StatusCode"] = JSON.parse(stCode);
                        responseJson["Error"] = JSON.parse(err);
                        responseJson["ContentLength"] = contentlength;

                        castresponse.then((response) => {
                            let dtDeCompressionStart = Date.now();
                            let responsecast = ArcadixFetchData.GetMappedColumns(response);
                            let iDeCompressionTime = Date.now() - dtDeCompressionStart;
                            uncompressiontime = iDeCompressionTime;

                            responseJson["ContentLength"] = responseJson["ContentLength"] != undefined ? responseJson["ContentLength"] : JSON.stringify(responsecast).length.toString();
                            HeaderData["content-length"] = responseJson["ContentLength"];
                            var objResponseForClient = { "HeaderData": responseJson };

                            var respKeys = Object.keys(responsecast);
                            respKeys.forEach(key => {
                                var entity = key.split(';')[0];
                                if (key.split(';').length > 1) {
                                    clientData = { ...clientData, [entity]: { ...clientData[entity], [key]: { Data: responsecast[key] } } };
                                }
                                else {
                                    if (key.includes("Object_Framework_Services_DynamicStyle")) {
                                        LoadDynamicStyles_API(responsecast[key]);
                                    } else {
                                        clientData = { ...clientData, [key]: { Data: responsecast[key] } };
                                    }
                                }
                            })

                            if (global.JConfiguration.Performance && strExecutionTime) {
                                performancelog = {
                                    ["APICallType"]: "Multi",
                                    ["APICallsDetails"]: JSON.parse(HeaderData["performancelog"]),
                                    ["InMemoryTimes"]: performanceloginmemory != undefined ? JSON.parse(HeaderData["performanceloginmemory"]) : "",
                                    ["ExecutionTime"]: strExecutionTime,
                                    ["ContentLength"]: responseJson["ContentLength"],
                                    ["CompressionTime"]: compressiontime,
                                    ["UnCompressionTime"]: uncompressiontime,
                                    ["Response"]: {
                                        ["Data"]: clientData,
                                        ["Header"]: HeaderData
                                    }
                                };
                                Performance.GetTotalPerformanceData(performancelog)
                            }

                            return { ...clientData };
                        }).then(json => {
                            fnCallBack(json, JSON.parse(count));
                        });

                        Logger.Log("response json from ArcadixFetch :", responseJson);
                        return responseJson;
                    }
                    else {
                        let strBaseUrl = global.JConfiguration.BaseUrl.substring(0, global.JConfiguration.BaseUrl.length - 1);
                        window.location = strBaseUrl;
                    }
                });
        }
        else {
            sendParams = arrParams;
            customHeaders = { ...customHeaders, "ExecutionTime": Date.now() };
            var result = global.ProviderController.ArcadixFetchDataProvider.fetch("API/MultiClassMethodCall/Execute?sessionkey=" + global.JConfiguration.SessionKey + "", "POST", sendParams, customHeaders)
                .then(response => {
                    if (!Performance.GetProperty("IsRerender"))
                        Performance.StartNewBatch();

                    if (response.status !== 403) {
                        var castresponse = Promise.resolve(response.json());
                        var HeaderData = {};
                        for (var pair of response.headers.entries()) {
                            HeaderData[pair[0]] = pair[1];
                        }
                        var performancestarttime = HeaderData["executiontime"];
                        var strExecutionTime;
                        if (performancestarttime && performancestarttime != "")
                            strExecutionTime = Date.now() - performancestarttime;

                        var performancelog = HeaderData["performancelog"] ? HeaderData["performancelog"] : '{}';
                        var timestamp = HeaderData["timestamp"];
                        var actiontype = HeaderData["actiontype"];
                        var count = HeaderData["count"];
                        var pkn = HeaderData["primarykeyname"];
                        var performanceloginmemory = HeaderData["performanceloginmemory"] ? HeaderData["performanceloginmemory"] : '{}';

                        if (performanceloginmemory != undefined)
                            var performanceloginmemory = HeaderData["performanceloginmemory"] ? HeaderData["performanceloginmemory"] : '{}';
                        var stCode = HeaderData["statuscode"];
                        var err = HeaderData["error"];


                        ApplicationState.SetProperty("APICallErrors", err);
                        var contentlength = HeaderData["content-length"];
                        var responseJson = {};

                        responseJson["PerformanceLog"] = JSON.parse(performancelog);
                        if (performanceloginmemory != undefined)
                            responseJson["PerformanceLogInMemory"] = JSON.parse(performanceloginmemory);
                        responseJson["TimeStamp"] = timestamp != undefined ? JSON.parse(timestamp) : {};
                        responseJson["PrimaryKeyName"] = pkn != undefined ? JSON.parse(pkn) : {};
                        responseJson["Count"] = count != undefined ? JSON.parse(count) : {};
                        responseJson["ActionType"] = actiontype != undefined ? JSON.parse(actiontype) : {};
                        responseJson["StatusCode"] = stCode != undefined ? JSON.parse(stCode) : {};
                        responseJson["Error"] = err != undefined ? JSON.parse(err) : {};
                        responseJson["ContentLength"] = contentlength;

                        castresponse.then((objResponseData) => {
                            var compressiontime = HeaderData["compressiontime"];
                            var uncompressiontime;

                            let dtDeCompressionStart = Date.now();
                            let responsecast = ArcadixFetchData.GetMappedColumns(objResponseData);
                            let iDeCompressionTime = Date.now() - dtDeCompressionStart;
                            uncompressiontime = iDeCompressionTime;

                            var respKeys = Object.keys(responsecast);
                            respKeys.forEach(key => {
                                if (key.includes("Object_Framework_Services_DynamicStyle")) {
                                    LoadDynamicStyles_API(responsecast[key]);
                                    delete responsecast[key];
                                }
                            })

                            responseJson["ContentLength"] = responseJson["ContentLength"] != undefined ? responseJson["ContentLength"] : JSON.stringify(responsecast).length.toString();
                            HeaderData["content-length"] = responseJson["ContentLength"];

                            if (global.JConfiguration.Performance && HeaderData["performancelog"] != undefined && strExecutionTime) {
                                performancelog = {
                                    ["APICallType"]: "Multi",
                                    ["APICallsDetails"]: JSON.parse(HeaderData["performancelog"]),
                                    ["InMemoryTimes"]: performanceloginmemory != undefined ? JSON.parse(HeaderData["performanceloginmemory"]) : "",
                                    ["ExecutionTime"]: strExecutionTime,
                                    ["ContentLength"]: responseJson["ContentLength"],
                                    ["CompressionTime"]: compressiontime,
                                    ["UnCompressionTime"]: uncompressiontime,
                                    ["Response"]: {
                                        ["Data"]: responsecast,
                                        ["Header"]: HeaderData
                                    }
                                };
                                Performance.GetTotalPerformanceData(performancelog);
                            }
                            responseJson["Data"] = responsecast;
                            return responseJson;
                        }).then(json => {
                            fnCallBack(json);
                        });

                        Logger.Log("response json from ArcadixFetch :", responseJson);
                        return responseJson;
                    }
                    else {
                        let strBaseUrl = global.JConfiguration.BaseUrl.substring(0, global.JConfiguration.BaseUrl.length - 1);
                        window.location = strBaseUrl;
                    }
                });
        }
    }

    /**
     * @name GetMappedColumns
     * @param {any} objData
     * @summary Decompression of compressed data. will return as it is if it's not compressed.
     */
    static GetMappedColumns(objData) {
        if (objData && objData["Data"] != undefined && objData["Data_MappedColumns"] != undefined) {
            let objModifiedData = {};

            Object.keys(objData["Data_MappedColumns"]).map(objObjectKey => {

                objModifiedData[objObjectKey] = objData["Data"][objObjectKey].map((objDataObjects) => {
                    let objMappedColumns = objData["Data_MappedColumns"][objObjectKey];
                    let objInnerData = {};
                    if (Object.keys(objDataObjects)) {
                        Object.keys(objDataObjects).map(strItemKey => {
                            if (typeof objDataObjects[strItemKey] == "object" && objDataObjects[strItemKey] != null) {
                                if (Array.isArray(objDataObjects[strItemKey])) {
                                    let blnIsObject = true;
                                    if (objDataObjects[strItemKey]) {
                                        var arrSubItems = objDataObjects[strItemKey].map((objObject) => {
                                            if (typeof objObject == "string") {
                                                blnIsObject = false;
                                                return;
                                            }
                                            else {
                                                blnIsObject = true;
                                                var objSubObject = {};
                                                Object.keys(objObject).map(strKey => {
                                                    if (objMappedColumns[strKey] != undefined)
                                                        objSubObject = { ...objSubObject, [objMappedColumns[strKey]]: objObject[strKey] };
                                                    else
                                                        objSubObject = { ...objSubObject, strKey: objObject[strKey] };
                                                })
                                                return objSubObject;
                                            }
                                        })
                                        objInnerData[objMappedColumns[strItemKey]] = arrSubItems;
                                        if (!blnIsObject)
                                            objInnerData[objMappedColumns[strItemKey]] = objDataObjects[strItemKey];
                                    }
                                }
                                else {
                                    let objSubItems = {};
                                    if (objDataObjects[strItemKey]) {
                                        Object.keys(objDataObjects[strItemKey]).map(strKey => {
                                            if (objMappedColumns[strKey] != undefined)
                                                objSubItems[objMappedColumns[strKey]] = objDataObjects[strItemKey][strKey];
                                            else
                                                objSubItems[strKey] = objDataObjects[strItemKey][strKey];
                                        })
                                        objInnerData[objMappedColumns[strItemKey]] = objSubItems;
                                    }
                                }
                            }
                            else {
                                objInnerData[objMappedColumns[strItemKey]] = objDataObjects[strItemKey];
                            }
                        })
                    }
                    return objInnerData;
                })

            })
            return objModifiedData;
        }
        else {
            return objData;
        }
    }

    /**
     * Returns a promise that has to be resolved in the client side code. 
     * @param {string} strUrl
     * @param {string} strHttpMethodType
     * @param {object} objParams
     * @param {object} customHeaders if any custom headers have to be sent(like device type etc.) 
     * e.g.
     * var customHeaders = {'HeaderName','Value'}
     * ArcadixFetchData('/DummyAPI', objParams, customHeaders)
       .then(response => response.json())
       .then(json => {
            console.log("Response:", json);
       })
     */
    static ExecuteCustom(strUrl, strHttpMethodType, objParams, customHeaders = {}) {
        return global.ProviderController.ArcadixFetchDataProvider.fetch(strUrl + "?sessionkey=" + global.JConfiguration.SessionKey + "", strHttpMethodType, objParams, customHeaders);
    };
}

export default ArcadixFetchData;
