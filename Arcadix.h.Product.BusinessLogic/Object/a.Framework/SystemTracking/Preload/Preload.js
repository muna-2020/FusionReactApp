import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Framework_SystemTracking_Preload
* @summary Preload object
*/
var Object_Framework_SystemTracking_Preload = {

    /**
     * @summary URL
     */
    URL: "API/Object/Framework/SystemTracking/Preload",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: {},

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the Preload object to store
     */
    Initialize: function (objParam) {
        Object_Framework_SystemTracking_Preload.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Framework_SystemTracking_Preload", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Framework_SystemTracking_Preload", Object_Framework_SystemTracking_Preload);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Preload
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Framework_SystemTracking_Preload.URL,
            "Params": Object_Framework_SystemTracking_Preload.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "Cockpit"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets data for Preload
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchData()).ExecuteSingle(Object_Framework_SystemTracking_Preload.URL, objParams, "Get", fnCallback);
    },

    /**
  * @name GetGetPreloadConfigData
  * @param {objParams} objParams Passes objParams
  * @param {callback} fnCallback Callback function
  * @summary Gets data for GetGetPreloadConfigData
  */
    GetPreloadConfig: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom(Object_Framework_SystemTracking_Preload.URL, "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },


};

export default Object_Framework_SystemTracking_Preload;
