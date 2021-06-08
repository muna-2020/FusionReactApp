//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Shared_Survey
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Extranet_Shared_Survey = {

    /**
    * @summary API URL
    **/
    URL: "API/Object/Extranet/Shared/Survey",

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
        Object_Extranet_Shared_Survey.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Extranet_Shared_Survey", Object_Extranet_Shared_Survey);
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Shared_Survey.URL,
            "Params": Object_Extranet_Shared_Survey.InitialDataCallParam,
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
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Shared_Survey.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Shared_Survey.URL, objParams, "Post", fnCallback);
    }
};

export default Object_Extranet_Shared_Survey;