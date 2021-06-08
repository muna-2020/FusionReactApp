//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_DevServer_ProductManagement_ApplicationType
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_DevServer_ProductManagement_ApplicationType = {

    /**
    * @summary URL
    */
    URL: "API/Object_DevServer/ProductManagement/ApplicationType",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Subject object to store
    */
    Initialize: function (objParam) {
        Object_DevServer_ProductManagement_ApplicationType.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_DevServer_ProductManagement_ApplicationType", Object_DevServer_ProductManagement_ApplicationType);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Subject
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_DevServer_ProductManagement_ApplicationType.URL,
            "Params": Object_DevServer_ProductManagement_ApplicationType.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsInMemoryCache": "Y"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Subject
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ApplicationType.URL, objParams, "Get", fnCallback);
    },

};

export default Object_DevServer_ProductManagement_ApplicationType;