//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep = {

    /**
    * @summary URL
    */
    URL: "API/Object_DevServer/ProductManagement/ImplementationStep/ImplementationStep",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the TestCase object to store
    */
    Initialize: function (objParam) {
        Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep", Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for TestCase
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.URL,
            "Params": Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for TestCase
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for TestCase
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for TestCase
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for TestCase
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep;