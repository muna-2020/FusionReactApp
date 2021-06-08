//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Test_InputStatus
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Intranet_Test_InputStatus = {
    /**
    * @summary API URL
    **/
    URL: "API/Object/Intranet/Test/InputStatus",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the InputStatus object to store
     */
    Initialize: function (objParam) {
        Object_Intranet_Test_InputStatus.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Test_InputStatus", Object_Intranet_Test_InputStatus);
    },
    
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for InputStatus
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_InputStatus.URL,
            "Params": Object_Intranet_Test_InputStatus.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },
    
    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for InputStatus
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_InputStatus.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Intranet_Test_InputStatus;