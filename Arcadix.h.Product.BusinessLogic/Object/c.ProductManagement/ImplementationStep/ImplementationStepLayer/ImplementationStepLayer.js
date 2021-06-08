//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer = {

    /**
    * @summary URL
    */
    URL: "API/Object_DevServer/ProductManagement/ImplementationStep/ImplementationStepLayer",

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
        Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer", Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for TestCase
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer.URL,
            "Params": Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer.InitialDataCallParam,
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
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer.URL, objParams, "Get", fnCallback);
    }

};

export default Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer;