//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_DevServer_ProductManagement_Module
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_DevServer_ProductManagement_Module = {

    /**
    * @summary URL
    */
    URL: "API/Object_DevServer/ProductManagement/Module",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Module object to store
    */
    Initialize: function (objParam) {
        Object_DevServer_ProductManagement_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_DevServer_ProductManagement_Module", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_DevServer_ProductManagement_Module", Object_DevServer_ProductManagement_Module);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Module
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_DevServer_ProductManagement_Module.URL,
            "Params": Object_DevServer_ProductManagement_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Module
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_Module.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for Module
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_Module.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for Module
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_Module.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for Module
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_Module.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_DevServer_ProductManagement_Module;