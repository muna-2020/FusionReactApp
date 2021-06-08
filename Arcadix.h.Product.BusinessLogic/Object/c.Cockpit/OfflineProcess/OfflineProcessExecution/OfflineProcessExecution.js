//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import SignalRClass from '@shared/Framework/Services/SignalRClass/SignalRClass';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

var Object_Cockpit_OfflineProcess_OfflineProcessExecution = {

    /**
    * @summary URL
    */
    URL: "API/Object/Cockpit/OfflineProcess/OfflineProcessExecution",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the OfflineProcessExecution object to store
    */
    Initialize: function (objParam) {
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.InitialDataCallParam = objParam;
       // ArcadixCacheData.GetData("Object_Cockpit_OfflineProcess_OfflineProcessExecution", (objDataObject) => {
       //     if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_OfflineProcess_OfflineProcessExecution", Object_Cockpit_OfflineProcess_OfflineProcessExecution);
       // })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for OfflineProcessExecution
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_OfflineProcess_OfflineProcessExecution.URL,
            "Params": Object_Cockpit_OfflineProcess_OfflineProcessExecution.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for OfflineProcessExecution
    */
    GetData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OfflineProcess_OfflineProcessExecution.URL, objParams, "Get", fnCallback, blnNoCache);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for OfflineProcessExecution
    */
    AddData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OfflineProcess_OfflineProcessExecution.URL, objParams, "Post", fnCallback, blnNoCache);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for OfflineProcessExecution
    */
    EditData: (objParams, fnCallback,blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OfflineProcess_OfflineProcessExecution.URL, objParams, "Put", fnCallback,blnNoCache);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for OfflineProcessExecution
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_OfflineProcess_OfflineProcessExecution.URL, objParams, "Delete", fnCallback);
    },

    /**
    * @name SaveCoTeacher
    * @param {String} strEntity passes Entity
    * @param {String} strFilters passes Filter
    * @param {object} storeParams passes store params
    * @param {callback} fnCallback callback function
    * @summary Saves co teacher for Class
    */
    AddOfflineProcessExecutionCache: (strEntity, strFilters, storeParams, fnCallback) => {
        ArcadixCacheData.AddData(strEntity, { Filter: strFilters, Value: storeParams }, fnCallback);
    },

    /**
    * @name StartOfflineExecutionDetails
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Start offline Execution and register offline(Signalr) Event
    */
    StartOfflineExecution: (objParams, objContext, fnCallback) => {        
        ArcadixFetchData.ExecuteCustom("API/Object/Cockpit/OfflineProcess/OfflineProcessExecution/StartOfflineExecution", "Post", objParams).then(response => response.json()).then(json => {
            let arrOfflineData = ApplicationState.GetProperty("OfflineExecutionData") ? ApplicationState.GetProperty("OfflineExecutionData") : [];
            let arrModfiedOfflineExecution = [...arrOfflineData, json[Object.keys(json)][0]];
            ApplicationState.SetProperty("OfflineExecutionData", arrModfiedOfflineExecution);
            ApplicationState.SetProperty("RunningOfflineProcesses", ApplicationState.GetProperty("RunningOfflineProcesses") + 1);
            ApplicationState.SetProperty("TotalOfflineProcesses", ApplicationState.GetProperty("TotalOfflineProcesses") + 1);
            ApplicationState.SetProperty("cIsOfflineClosed", "N");
            Object_Cockpit_OfflineProcess_OfflineProcessExecution.RegisterOfflineEvent(objContext, objParams["OfflineProcessParams"]["Event"]);
            fnCallback(json);
        });
    },

    /**
    * @name RegisterOfflineEvent
    * @param {any} strProcessKeyWord
    * @summary Register Signalr(offline) Event
    */
    RegisterOfflineEvent: (objContext, strEventName) => {
        let objSignalR = new SignalRClass();
        objSignalR.ConnectToHub(objContext);
        objSignalR.EventListener(strEventName, (objResponse) => {
            let objData = JSON.parse(objResponse).Data;
            if (objData) {
                let arrOfflineData = ApplicationState.GetProperty("OfflineExecutionData") ? ApplicationState.GetProperty("OfflineExecutionData") : [];
                let arrModfiedOfflineExecution;
                if (arrOfflineData.find(obj => obj.uOfflineProcessExecutionId == objData.uOfflineProcessExecutionId)) {
                    arrModfiedOfflineExecution = arrOfflineData.map(obj => obj.uOfflineProcessExecutionId == objData.uOfflineProcessExecutionId ? objData : obj);
                }
                else {
                    arrModfiedOfflineExecution = [...arrOfflineData, objData];
                }
                ApplicationState.SetProperty("OfflineExecutionData", arrModfiedOfflineExecution);
            }
        });            
    }

};



export default Object_Cockpit_OfflineProcess_OfflineProcessExecution;
