//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType = {

    /**
    * @summary URL
    */
    URL: "API/Object_DevServer/ProductManagement/ImplementationStep/ImplementationStepLayerTaskType",

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
        Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType", Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for TestCase
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType.URL,
            "Params": Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType.InitialDataCallParam,
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
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType.URL, objParams, "Get", fnCallback);
    }
    
};

export default Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType;