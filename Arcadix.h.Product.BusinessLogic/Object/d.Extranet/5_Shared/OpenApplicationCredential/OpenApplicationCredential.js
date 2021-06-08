//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Extranet_Shared_OpenApplicationCredential
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Extranet_Shared_OpenApplicationCredential = {

    /**
    * @summary API URL
    **/
    URL: "API/Object/Extranet/Shared/OpenApplicationCredential",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam passes objParam
    * @summary Initialize initial data call param and then adds the School object to store
    **/
    Initialize: function (objParam) {
        Object_Extranet_Shared_OpenApplicationCredential.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Extranet_Shared_OpenApplicationCredential", Object_Extranet_Shared_OpenApplicationCredential);
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Shared_OpenApplicationCredential.URL,
            "Params": Object_Extranet_Shared_OpenApplicationCredential.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Shared_OpenApplicationCredential.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Shared_OpenApplicationCredential.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    GetGateKeeperUrl: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Extranet/Shared/OpenApplicationCredential/GetGateKeeperUrl", "Post", objParams).then(response => response.json()).then(json => {
            let strEnityKey = objParams ? objParams["vTargetType"] : "GetGateKeeperUrl";
            let objData = {
                Filter: strEnityKey,
                Value: {
                    Data: json["GetGateKeeperUrl"],
                    TimeStamp: "",
                    PrimaryKeyName: "vCurrentURL",
                    Count: json["GetGateKeeperUrl"].length
                }
            };
            ArcadixCacheData.AddData("Object_Extranet_Shared_OpenApplicationCredential", objData, () => {
            });
            if(fnCallback)
            fnCallback(json);
        });
    }

};

export default Object_Extranet_Shared_OpenApplicationCredential;