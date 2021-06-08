import { processUrl, getProcessUrl } from '@shared/Framework/DataService/ArcadixCacheData/Redux/ProcessUrl';
import ArcadixCacheData, { ShouldAddFilters } from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';  //ArcadixCacheData is a wrpper class used to modify the store
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';  //ArcadixFetchData is a wrapper class for ajax calls
import produce, { setAutoFreeze } from "immer";


// Terminology 
//   1) Store = redux store
//   2) Backend = database and elastic cache

/**
 * this class needs to be used when we need to communicate with the backend after which we change the store
 */
class ArcadixFetchAndCacheData {

    ExecuteSingle(strUrl, objParams, strMethodType, fnCallBack, blnNoCache = false, objCustomHeader = {}) {
        this.Execute([{
            "URL": strUrl,
            "Params": objParams,
            "MethodType": strMethodType,
            "NoCache": blnNoCache,
            "UseFullName": true
        }], fnCallBack, objCustomHeader);
    }

    /**
     * get data from backend and insert into store as well as return to fnCallBack function if data is present in store then its dorectly sent from store rather then backend
     * strUrl : the Url to hit to modify the backend eg '/api/school/getdata'
     * the data is saved under the Entity 'School' for the above strUrl. the entity name is dependant on the strUrl.
     * @param {*} arrParams array of filter conditions to be sent for different objects. 
     * @param {*} fnCallBack => callback to send the fetched data if needed. (avoid usage if possible)
     * @param {*} customHeaders =>  any custom headers to be sent(used in native)
     */
    Execute(arrParams, fnCallBack, customHeaders = {}) {
        let flag = true;
        let blnDataExists = false;
        let isGetRequest = true;
        arrParams.forEach(objRequest => {
            if (objRequest.MethodType && objRequest.MethodType != null && objRequest.MethodType.toUpperCase() != "GET") {
                isGetRequest = false;
            }
        });
        let objSendParams = {
            Params: arrParams
        };
        let arrModifiedParams = [];
        let objStoreReturnData = {
            Data: {},
            DataRequest: {}
        }
        if (isGetRequest) {
            objStoreReturnData = ArcadixCacheData.IsDataPresent(arrParams); // get cached requests.

            if (objStoreReturnData.DataRequest) {
                arrModifiedParams = objStoreReturnData.DataRequest.filter((objRequest) => {
                    if (Object.keys(ArcadixCacheData.IsDataPresent([objRequest]).Data).length != 0) {
                        objRequest["IsMultiIndexData"] = "N";
                        objRequest["IsInMemoryCache"] = "N";
                    }
                    if (objRequest.blnSyncData != false) { // fetch if blSyncData != false                            
                        return true;
                    } else if (objRequest.blnSyncData == false &&  // fetch only if blnSyncData == false and it it not cached
                        Object.keys(ArcadixCacheData.IsDataPresent([objRequest]).Data).length == 0) {
                        return true;
                    } else { // skip if blnSyncData == false and if data is already cached and other cases.
                        return false;
                    }
                });

                // skip the api fetch call if all the requests are already cached
                if (fnCallBack && Object.keys(objStoreReturnData.Data).length == objStoreReturnData.DataRequest.length && arrModifiedParams.length == 0) {
                    fnCallBack(objStoreReturnData.Data, false);
                }
            }
        }
        else {
            if (fnCallBack && objStoreReturnData.Data && JSON.stringify(objStoreReturnData.Data) !== "{}") {
                fnCallBack(objStoreReturnData.Data, false); //return if exists
            }
            arrModifiedParams = arrParams;
        }
        objSendParams["Params"] = arrModifiedParams;
        if (objSendParams["Params"].length > 0) {//condition check to make fetch request only when params are present (arrModifiedParams might be empty if requests are already cached)
            ArcadixFetchData.Execute(objSendParams, (jsonResponse) => {
                if (jsonResponse.Data) { // if data is found update    
                    let objModifiedReturnData = objStoreReturnData;
                    delete jsonResponse["PerformanceLog"];
                    arrModifiedParams.map((api, index) => {                        
                        let strEntity = getProcessUrl(api.URL, api.MethodType, api.UseFullName);
                        let strFilters = ArcadixCacheData.fnGetFilters(strEntity, api.Params);
                        let objReturnDataParams = {
                            ModifiedReturnData: objModifiedReturnData,
                            Response: jsonResponse.Data[strFilters],
                            Count: jsonResponse.Count[strFilters],
                            Filter: strFilters,
                            TotalLength: arrModifiedParams.length - 1,
                            Index: index,
                            FnCallBack: fnCallBack
                        };
                        /*
                         * NoCache should be set to true if you dont want the object to be cached, an alternative is to use
                         * ArcadixFetchData directly.
                         */
                        if (!api.NoCache) {
                            CacheEntityResponse(jsonResponse, api, fnCallBack, isGetRequest, objModifiedReturnData, objReturnDataParams, true);
                            //---Commented out for now, common code moved into CacheEntityResponse(will be cleaned up)
                            //if (jsonResponse.StatusCode[strFilters] === 200 || jsonResponse.StatusCode[strFilters] === 304) {
                            //    if (jsonResponse.Data[strFilters]) {
                            //        let strAction = jsonResponse.ActionType[strFilters];
                            //        let objResponseData = {
                            //            Data: jsonResponse.Data[strFilters],
                            //            TimeStamp: jsonResponse.TimeStamp[strFilters],
                            //            PrimaryKeyName: jsonResponse.PrimaryKeyName[strFilters],
                            //            Count: jsonResponse.Count[strFilters]
                            //        }
                            //        switch (strAction.toUpperCase()) {
                            //            case "REPLACE": if (api.Params.Timestamp == undefined || objResponseData.TimeStamp != api.Params.Timestamp) {
                            //                if (api.Params && ShouldAddFilters(api.Params)) {
                            //                    ArcadixCacheData.ReplaceData(strEntity, { Filter: strFilters, Value: objResponseData });
                            //                }
                            //                else {
                            //                    ArcadixCacheData.ReplaceData(strEntity, { Value: objResponseData }, fnCallBack);
                            //                }
                            //            }
                            //                objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, isGetRequest);
                            //                break;
                            //            case "ADD": if (api.Params && ShouldAddFilters(api.Params)) {
                            //                ArcadixCacheData.AddData(strEntity, { Filter: strFilters, Value: objResponseData });
                            //                objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, isGetRequest);
                            //            }
                            //            else {
                            //                ArcadixCacheData.AddData(strEntity, { Value: objResponseData }, fnCallBack);
                            //                objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, isGetRequest);
                            //            }
                            //                break;
                            //            case "EDIT": if (api.Params && ShouldAddFilters(api.Params)) {
                            //                ArcadixCacheData.EditData(strEntity, { Filter: strFilters, Value: objResponseData });
                            //                objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, isGetRequest);
                            //            }
                            //            else {
                            //                ArcadixCacheData.EditData(strEntity, { Value: objResponseData }, fnCallBack);
                            //                objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, isGetRequest);
                            //            }
                            //                break;
                            //            case "DELETE": if (api.Params && ShouldAddFilters(api.Params)) {
                            //                ArcadixCacheData.DeleteData(strEntity, { Filter: strFilters, Value: objResponseData });
                            //                objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, isGetRequest);
                            //            }
                            //            else {
                            //                ArcadixCacheData.DeleteData(strEntity, { Value: objResponseData }, fnCallBack);
                            //                objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, isGetRequest);
                            //            }
                            //                break;
                            //            default:
                            //                fnCallBack(jsonResponse, true);
                            //                break;
                            //        }
                            //    }
                            //    else {
                            //        Logger.Log("Entity " + strEntity + " not found");
                            //    }
                            //}
                            //else {
                            //    if (strEntity != "Object_Framework_Services_DynamicStyleReactJs") {
                            //        if (jsonResponse.Error[strFilters])
                            //            console.error("Server Error:", jsonResponse.Error[strFilters]);
                            //        else
                            //            console.error("Entity " + strEntity + " not found");
                            //    }
                            //}
                        }
                        else {
                            // fnCallBack(objReturnData, false);
                            objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, isGetRequest);
                            console.log("Not Cached", api);
                        }
                    });
                }
                Logger.Log("Server Error List:", jsonResponse.Error);
            }, customHeaders, true);
        }
    }

    /**
     * Used to call one api endpoint at a time. 
     * These API endpoints often will have some special operations performed before sending data to client side
     * @param {*} strUrl  the Url to hit to modify the backend eg '/api/school/getdata'
     * @param {*} strHttpMethodType  Get,Post,Put, Delete
     * @param {*} objParams Format: {URL:"",Params:{}}
     * @param {*} fnCallback => callback to send the fetched data if needed. (avoid usage if possible)
     * @param {*} customHeaders any custom headers to be sent(used in native)
     */
    ExecuteCustom(strUrl, strHttpMethodType, objParams, fnCallback, customHeaders = {}) {
        var dtStartTime = Date.now();
        ArcadixFetchData.ExecuteCustom(strUrl, strHttpMethodType, objParams, customHeaders)
            .then(response => {
                if (!Performance.GetProperty("IsRerender"))
                    Performance.StartNewBatch();

                var strExecutionTime = Date.now() - dtStartTime;
                var castresponse = Promise.resolve(response.json());
                var HeaderData = {};
                for (var pair of response.headers.entries()) {
                    HeaderData[pair[0]] = pair[1];
                }
                var performancelog = HeaderData["performancelog"] ? HeaderData["performancelog"] : '{}';
                var timestamp = HeaderData["timestamp"];
                var actiontype = HeaderData["actiontype"];
                var count = HeaderData["count"];
                var pkn = HeaderData["primarykeyname"];
                var performanceloginmemory = HeaderData["performanceloginmemory"] ? HeaderData["performanceloginmemory"] : '{}';
                var stCode = HeaderData["statuscode"];
                var err = HeaderData["error"];
                var contentlength = HeaderData["content-length"];
                var responseJson = {};

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
                
                castresponse.then((responsecast) => {
                    responseJson["Data"] = responsecast;

                    if (global.JConfiguration.Performance) {
                        performancelog = {
                            ["APICallType"]: strUrl.MethodType,
                            ["APICallsDetails"]: JSON.parse(HeaderData["performancelog"]),
                            ["InMemoryTimes"]: performanceloginmemory != undefined ? JSON.parse(HeaderData["performanceloginmemory"]) : "",
                            ["ExecutionTime"]: strExecutionTime,
                            ["ContentLength"]: contentlength,
                            ["Response"]: {
                                ["Data"]: responseJson["Data"],
                                ["Header"]: HeaderData
                            }
                        };
                        Performance.GetTotalPerformanceData(performancelog);
                    }

                    return responseJson;
                }).then(jsonResponse => {
                    //redux operation based on ActionType
                    let objAPI = {
                        Url: strUrl,
                        MethodType: strHttpMethodType,
                        UseFullName: objParams.UseFullName === undefined ? false : objParams.UseFullName,
                        Params: objParams.Params
                    };
                    CacheEntityResponse(jsonResponse, objAPI, fnCallBack);
                    //---Commented out for now, common code moved into CacheEntityResponse(will be cleaned up)
                    //var strEntity = getProcessUrl(strUrl, strHttpMethodType, objParams.UseFullName === undefined ? false : objParams.UseFullName);
                    //var strFilters = ArcadixCacheData.fnGetFilters(strEntity, objParams.Params);
                    //if (jsonResponse.StatusCode[strFilters] === 200) {
                    //    if (jsonResponse.Data[strFilters]) {
                    //        var strAction = jsonResponse.ActionType[strFilters];
                    //        var objResponseData = {
                    //            Data: jsonResponse.Data[strFilters],
                    //            TimeStamp: jsonResponse.TimeStamp[strFilters],
                    //            PrimaryKeyName: jsonResponse.PrimaryKeyName[strFilters],
                    //            Count: jsonResponse.Count[strFilters],
                    //            ContentLength: jsonResponse.ContentLength
                    //        };
                    //        switch (strAction.toUpperCase()) {
                    //            case "REPLACE": if (objParams.Params && ShouldAddFilters(objParams.Params)) {
                    //                ArcadixCacheData.ReplaceData(strEntity, { Filter: strFilters, Value: objResponseData });
                    //            }
                    //            else {
                    //                ArcadixCacheData.ReplaceData(strEntity, { Value: objResponseData }, fnCallBack);
                    //            }
                    //                break;
                    //            case "ADD": if (objParams.Params && ShouldAddFilters(objParams.Params)) {
                    //                ArcadixCacheData.AddData(strEntity, { Filter: strFilters, Value: objResponseData });
                    //            }
                    //            else {
                    //                ArcadixCacheData.AddData(strEntity, { Value: objResponseData }, fnCallBack);
                    //            }
                    //                break;
                    //            case "EDIT": if (objParams.Params && ShouldAddFilters(objParams.Params)) {
                    //                ArcadixCacheData.EditData(strEntity, { Filter: strFilters, Value: objResponseData });
                    //            }
                    //            else {
                    //                ArcadixCacheData.EditData(strEntity, { Value: objResponseData }, fnCallBack);
                    //            }
                    //                break;
                    //            case "DELETE": if (objParams.Params && ShouldAddFilters(objParams.Params)) {
                    //                ArcadixCacheData.DeleteData(strEntity, { Filter: strFilters, Value: objResponseData });
                    //            }
                    //            else {
                    //                ArcadixCacheData.DeleteData(strEntity, { Value: objResponseData }, fnCallBack);
                    //            }
                    //                break;
                    //        }
                    //    }
                    //    else {
                    //        console.log("Entity " + strEntity + " not found");
                    //    }
                    //}
                    //else {
                    //    console.error("Server Error:", jsonResponse.Error[strFilters]);
                    //}
                    Logger.Log("Server Error List : ", jsonResponse.Error);
                });
            })
    }    
}

/**
 * @name CacheEntityResponse
 * @param {object} objJsonResponse JsonResponse
 * @param {object} objAPI API
 * @param {object} fnCallBack fnCallBack
 * @param {object} objModifiedReturnData ModifiedReturnData
 * @param {object} objReturnDataParams ReturnDataParams
 * @param {object} objReturnDataParams IsModifyReturnData
 * @summary Manipulates the response and adds into Cache(Redux) based on Action Type
 */
export const CacheEntityResponse = (objJsonResponse, objAPI, fnCallBack, blnIsGetRequest, objModifiedReturnData, objReturnDataParams, blnIsModifyReturnData) => {
    let strEntity = objReturnDataParams?.Entity ? objReturnDataParams?.Entity : getProcessUrl(objAPI.URL, objAPI.MethodType, objAPI.UseFullName);
    let strFilters = objReturnDataParams?.Filter ? objReturnDataParams?.Filter : ArcadixCacheData.fnGetFilters(strEntity, objAPI.Params);    
    //Checking if the response is successful before adding into Cache
    if (objJsonResponse.StatusCode[strFilters] === 200 || objJsonResponse.StatusCode[strFilters] === 304) {
        if (objJsonResponse.Data[strFilters]) {
            let strAction = objJsonResponse.ActionType[strFilters];
            let objResponseData = {
                Data: objJsonResponse.Data[strFilters],
                TimeStamp: objJsonResponse.TimeStamp[strFilters],
                PrimaryKeyName: objJsonResponse.PrimaryKeyName[strFilters],
                Count: objJsonResponse.Count[strFilters],
                ContentLength: objJsonResponse.ContentLength
            }
            //Performing Redux operation based on ActionType
            switch (strAction.toUpperCase()) {
                case "REPLACE": {
                    if (objAPI.Params.Timestamp == undefined || objResponseData.TimeStamp != objAPI.Params.Timestamp) {
                        if (objAPI.Params && ShouldAddFilters(objAPI.Params)) {
                            ArcadixCacheData.ReplaceData(strEntity, { Filter: strFilters, Value: objResponseData });
                        }
                        else {
                            ArcadixCacheData.ReplaceData(strEntity, { Value: objResponseData }, fnCallBack);
                        }
                    }
                    if (blnIsModifyReturnData)
                        objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, blnIsGetRequest);
                    break;
                }
                case "ADD": {
                    if (objAPI.Params && ShouldAddFilters(objAPI.Params)) {
                        ArcadixCacheData.AddData(strEntity, { Filter: strFilters, Value: objResponseData });
                    }
                    else {
                        ArcadixCacheData.AddData(strEntity, { Value: objResponseData }, fnCallBack);
                    }
                    if (blnIsModifyReturnData)
                        objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, blnIsGetRequest);
                    break;
                }
                case "EDIT": {
                    if (objAPI.Params && ShouldAddFilters(objAPI.Params)) {
                        ArcadixCacheData.EditData(strEntity, { Filter: strFilters, Value: objResponseData });
                    }
                    else {
                        ArcadixCacheData.EditData(strEntity, { Value: objResponseData }, fnCallBack);
                    }
                    if (blnIsModifyReturnData)
                        objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, blnIsGetRequest);
                    break;
                }
                case "DELETE": {
                    if (objAPI.Params && ShouldAddFilters(objAPI.Params)) {
                        ArcadixCacheData.DeleteData(strEntity, { Filter: strFilters, Value: objResponseData });
                        objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, blnIsGetRequest);
                    }
                    else {
                        ArcadixCacheData.DeleteData(strEntity, { Value: objResponseData }, fnCallBack);
                        objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, blnIsGetRequest);
                    }
                    if (blnIsModifyReturnData)
                        objModifiedReturnData.Data = UpdateReturnData(objReturnDataParams, blnIsGetRequest);
                    break;
                }
                default:
                    fnCallBack(objJsonResponse, true);
                    break;
            }
        }
        else {
            Logger.Log("Entity " + strEntity + " not found");
        }
    }
    else {
        if (!strEntity.includes("Object_Framework_Services_DynamicStyle")) {
            if (objJsonResponse.Error[strFilters])
                console.error("Server Error:", objJsonResponse.Error[strFilters]);
            else
                console.error("Entity " + strEntity + " not found");
        }
    }
}

/**
 * @name UpdateReturnData
 * @param {object} objReturnDataParams
 */
const UpdateReturnData = (objReturnDataParams, isGetRequest) => {
    if (isGetRequest) {
        if (!objReturnDataParams.ModifiedReturnData.Data[objReturnDataParams.Filter]) {
            objReturnDataParams.ModifiedReturnData.Data[objReturnDataParams.Filter] = { 
                ["Data"]: [...objReturnDataParams.Response], 
                ["Count"]: objReturnDataParams.Count
            };
        }
        else {
            objReturnDataParams.ModifiedReturnData.Data[objReturnDataParams.Filter] = { 
                ["Data"]: [...objReturnDataParams.Response], 
                ["Count"]: objReturnDataParams.Count
            };
        }
        if (objReturnDataParams.TotalLength == objReturnDataParams.Index && objReturnDataParams.FnCallBack) {
            objReturnDataParams.FnCallBack(objReturnDataParams.ModifiedReturnData.Data, true);
        }
        return objReturnDataParams.ModifiedReturnData.Data;
    }
    else {
        if (objReturnDataParams.FnCallBack) {
            objReturnDataParams.FnCallBack(objReturnDataParams.Response, true)
        }
    }
};

/**
 * returns data from the given object based on the filter. returns false if data is not found
 * @param {*} objData object name --> store data passed from module
 * @param {*} strFilter filter string 
 * @param {*} blnForMapping denotes whether it is used for mapping for for simply getting data
 * @returns {*} Mapped Object
 */
export const DataRef = (objData, strFilter = "", blnForMapping = false) => {
    if (blnForMapping) {
        return objData[strFilter];
    }
    else {
        if (!objData) {
            return false; //objData not found (entity is not on store yet)
        }
        else {
            if (strFilter !== "") {
                if (!objData[strFilter]) {
                    return false; //entity present, but the filter value is undefined
                }
                else {
                    return objData ? objData[strFilter] : objData; //filter value is loaded 
                }
            }
            else {
                return objData; //entity is present and it has not filter keys
            }
        }
    }
};

/**
 * allows easy modification of object in an immutable manner
 * @param {*} state => object you what to modify
 * @param {*} fnCallback => callback to return the object
 * @returns {*} Object
 */
export const DataImmutable = (state, fnCallback) => {
    setAutoFreeze(false);
    return produce(state, fnCallback);
};

export default ArcadixFetchAndCacheData;