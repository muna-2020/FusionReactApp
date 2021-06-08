import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';
import { AddPerformanceLogProperty } from '@shared/Framework/DataService/ArcadixCacheData/Redux/Actions/PerformanceLogActionCreators';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export default class Performance{
    constructor(){
        this.timer = Date.now();
        this.PerformanceLog = {};        
    }

    /**
     * @summary adds an entry the PerformanceLog data. IF the stage has already  started(there is an entry in this.PerformanceLog), then the difference from current time is added and updated on redux. else a new log is started
     * @param {string} strMessage the stage we want to start/end logging for
     */
    LogPerformance(strMessage) {

        if (strMessage === undefined) {
            console.trace("Trace:", strMessage)
            return;
        }

        if(Object.keys(this.PerformanceLog).length === 0)
            this.timer = Date.now();
        if (this.PerformanceLog[strMessage.toUpperCase()] && this.PerformanceLog[strMessage.toUpperCase()] !== null) {
            let strLogTime = Date.now() - this.PerformanceLog[strMessage.toUpperCase()];
            console.log("%c Client side Performance Log for " + strMessage.toUpperCase() + ":" + strLogTime, 'background: beige; color: purple; font-weight: bold');
            let arrPerformanceLogData = this.GetProperty("PerformanceLog") ? this.GetProperty("PerformanceLog") : [];
            this.SetProperty("PerformanceLog", [...arrPerformanceLogData, { [strMessage.toUpperCase()]: strLogTime }]);
            this.PerformanceLog[strMessage.toUpperCase()] = null;
        }
        else
            this.PerformanceLog[strMessage.toUpperCase()] = Date.now();
        this.timer= Date.now();
    }

    /**
     * @name LogPerformanceStart
     * @param {any} strKey
     * @summary sets current time to Performancelog of the Key.
     */
    LogPerformanceStart(strKey) {
        if (Object.keys(this.PerformanceLog).length === 0)
            this.timer = Date.now();
        if (!this.PerformanceLog[strKey.toUpperCase()] && this.PerformanceLog[strKey.toUpperCase()] == null) {
            this.PerformanceLog[strKey.toUpperCase()] = Date.now();
        }
    }

    /**
     * @name LogPerformanceEnd
     * @param {any} strKey
     * @summary measure the time of the execution by comparing with the start time.
     */
    LogPerformanceEnd(strKey) {
        if (this.PerformanceLog[strKey.toUpperCase()] && this.PerformanceLog[strKey.toUpperCase()] !== null) {
            let strLogTime = Date.now() - this.PerformanceLog[strKey.toUpperCase()];
            let arrPerformanceLogData = this.GetProperty("PerformanceLog") ? this.GetProperty("PerformanceLog") : [];
            this.SetProperty("PerformanceLog", [...arrPerformanceLogData, { [strKey.toUpperCase()]: strLogTime }]);
            this.PerformanceLog[strKey.toUpperCase()] = null;
        }
        this.timer = Date.now();
    }

    LogTitle(strMessage) {

    }

    /**
     * @summary returns the required key from PerformanceLog reducer
     * @param {string} Key key name
     * @returns {Array/Object} requested value for key
     */
    GetProperty(Key) {
        var currentState = store.getState();
        return currentState.PerformanceLog[Key];
    }

    /**
     * @summary Adds the given KeyValue pair to PerformanceLog key on redux
     * @param {string} Key log key that denotes a particular stage
     * @param {int} data time
     */
    SetProperty(Key, data) {
        store.dispatch(AddPerformanceLogProperty(Key, data));
    }

    /**
     * @name CompareAndSetProperty
     * @param {any} arrAllPerformanceLog
     * @param {any} arrPerformanceLog
     * @summary compare and update AllPerformanceLog if any object is new.
     */
    CompareAndSetAllLog(arrPerformanceLog) {
        let arrAllLog = this.GetProperty("AllPerformanceLog") == undefined ? [] : this.GetProperty("AllPerformanceLog");
        if (arrAllLog.length == 0) {
            this.SetProperty("AllPerformanceLog", arrPerformanceLog);
        }
        else
        {

            let blnIsEqual = false;
            arrPerformanceLog.map((objData) => {
                this.GetProperty("AllPerformanceLog").map((objAllData) => {
                    if (Object.keys(objAllData)[0] == Object.keys(objData)[0]
                        && Object.values(objAllData)[0] == Object.values(objData)[0]) {

                        blnIsEqual = true;
                    }
                });
                if (!blnIsEqual) {
                    arrAllLog.push(objData);
                }
            })          

            this.SetProperty("AllPerformanceLog", arrAllLog);
        }
    }

    /**
     * @name StartNewBatch
     * @param {any} blnIsRerender
     * @summary for resetting CSR time.
     */
    StartNewBatch(blnIsRerender = false) {
        let iAPICallCount = this.GetProperty("APICallCount") ? this.GetProperty("APICallCount") : 0;        
        let arrTotalPerformance = this.GetProperty("TotalCSRPerformanceLog") ? this.GetProperty("TotalCSRPerformanceLog") : [];
        if (iAPICallCount != 0 && arrTotalPerformance.length != 0 && arrTotalPerformance[arrTotalPerformance.length - 1].length != 0) {
            arrTotalPerformance.push([]);
        }
        this.SetProperty("TotalCSRPerformanceLog", arrTotalPerformance);
        this.SetProperty("IsRerender", blnIsRerender);
        this.SetProperty("APICallCount", iAPICallCount + 1);
    }

    /**
     * @name Reset
     * @summary for resetting Performance Property
     */
    Reset() {        
        let arrPerformanceLog = this.GetProperty("PerformanceLog");
        this.CompareAndSetAllLog(arrPerformanceLog);

        //Logging Performance for adding to Redish.
        let arrModifiedPerformanceLog = [];
        let arrClientRenderTime = this.GetProperty("TotalCSRPerformanceLog");
        if (arrClientRenderTime) {
            arrClientRenderTime = arrClientRenderTime.map(arrData => {
                let arrInnerData = arrData.map(objModuleDetails => {
                    Object.keys(objModuleDetails).map(strKey => {
                        if (strKey == "StateAndProps") {
                            delete objModuleDetails.StateAndProps;
                        }
                    })
                    return objModuleDetails
                })
                return arrInnerData;
            })
        }

        if (arrPerformanceLog) {
            arrModifiedPerformanceLog = arrPerformanceLog.map(objLogs => {
                if (!Object.keys(objLogs)[0].includes("CSR_"))
                    return objLogs;
            })
        }
        
        ApplicationState.SetProperty("AllPerformanceLogData", { "PerformanceLogData": arrModifiedPerformanceLog, "ClientRenderTime": arrClientRenderTime });
        this.SetProperty("PerformanceLog", []);
        this.SetProperty("PerformanceLogInMemory", []);
        this.SetProperty("TotalCSRPerformanceLog", []);
        this.SetProperty("APICallCount", 0);
        this.SetProperty("IsRerender", false);
        ApplicationState.SetProperty("JSError", []);
        window.LogFileDetails = true;
        if (window.ResetFileDetails)
            window.ResetFileDetails();
    }

    /**
     * collects the performance log data for multiple objects and Logs it on console
     * @param {*} objPerformanceData 
     */
    GetTotalPerformanceData(objPerformanceData) {
        let strResponseString = "%cPerformance Log for objects : ";
        if (typeof objPerformanceData == "string") {        
            let objMessage=this.GetProperty("PerformanceLog").find(objData => {
                return Object.keys(objData)[0] == "Message";
            });
            if (objMessage == undefined || Object.values(objMessage)[0] != objPerformanceData) {
                this.SetProperty("PerformanceLog", [...this.GetProperty("PerformanceLog"), { "Message": objPerformanceData }]);
                let strEntity = this.GetProperty("Entity");
                if (strEntity && strEntity != objPerformanceData && objPerformanceData != "PerformanceResponse") {
                    this.SetProperty("Entity", objPerformanceData);
                }
            }                
        }
        else if (typeof objPerformanceData == "object") {
            let objAPICalls = {};
            let iTotalServerTime = 0;
            let objServerTime = {};
            let iTotalAPICallTime = 0;
            let arrKeys = Object.keys(objPerformanceData.APICallsDetails);
            arrKeys.map((entity, index) => {
                if (entity == "TotalServerTime") {
                    iTotalServerTime = parseInt(objPerformanceData.APICallsDetails[entity]);
                    objServerTime = { ...objServerTime, "TotalServerTime": iTotalServerTime };
                }
                else {
                    objAPICalls = { ...objAPICalls, [entity]: objPerformanceData.APICallsDetails[entity] };
                    iTotalAPICallTime += parseInt(objPerformanceData.APICallsDetails[entity]["Total"]);
                }
            });
            if (objPerformanceData.ServerTime && objPerformanceData.ServerTime != 0) {
                iTotalServerTime = parseInt(objPerformanceData.ServerTime);
            }
            if (objPerformanceData.ExecutionTime != undefined) {
                objServerTime = { ...objServerTime, ["TransportationTime"]: parseInt(objPerformanceData.ExecutionTime) - iTotalServerTime };
            }
            else if (objPerformanceData.ServerRederAPIListTime && objPerformanceData.ServerRenderHTMLTime)
            {
                objServerTime = {
                    ...objServerTime,
                    ["NodeAPICallTime"]: parseInt(objPerformanceData.ServerRederAPIListTime) + parseInt(objPerformanceData.ServerRenderHTMLTime),
                    ["TotalServerTime"]: iTotalServerTime,
                    ["TransportationTime"]: iTotalServerTime - (parseInt(objPerformanceData.ServerRederAPIListTime) + parseInt(objPerformanceData.ServerRenderHTMLTime) + iTotalAPICallTime),
                    ["APICallTime"]: iTotalAPICallTime
                };
            }

            if (objPerformanceData.InMemoryTimes != undefined && Object.keys(objPerformanceData.InMemoryTimes).length != 0) {
                let arrPerformanceLogInMemory = this.GetProperty("PerformanceLogInMemory");
                if (arrPerformanceLogInMemory != undefined) {
                    this.SetProperty("PerformanceLogInMemory", [...this.GetProperty("PerformanceLogInMemory"), objPerformanceData.InMemoryTimes]);
                }
                else {
                    this.SetProperty("PerformanceLogInMemory", [objPerformanceData.InMemoryTimes]);
                }
            }
            
            let objPerformaceLog = {
                ["ServerTime"]: objServerTime,
                ["APICalls"]: objAPICalls,
                ["Size"]: objPerformanceData.ContentLength,
                ["Response"]: objPerformanceData.Response,
                ["CompressionTime"]: objPerformanceData.CompressionTime,
                ["DeComressionTime"]: objPerformanceData.UnCompressionTime
            };
            this.SetProperty("PerformanceLog", [...this.GetProperty("PerformanceLog"), { [objPerformanceData["APICallType"]]: objPerformaceLog }]);

            console.log(strResponseString, 'background: beige; color: green; font-weight: bold')
        }
    }
}