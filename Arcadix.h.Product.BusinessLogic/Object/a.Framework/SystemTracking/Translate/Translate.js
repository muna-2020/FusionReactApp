import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Framework_SystemTracking_Translate
* @summary Translate object
*/
var Object_Framework_SystemTracking_Translate = {

    /**
     * @summary URL
     */
    URL: "API/Object/Framework/SystemTracking/Translate",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: {},

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the Translate object to store
     */
    Initialize: function (objParam) {
        Object_Framework_SystemTracking_Translate.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Framework_SystemTracking_Translate", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Framework_SystemTracking_Translate", Object_Framework_SystemTracking_Translate);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Translate
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Framework_SystemTracking_Translate.URL,
            "Params": Object_Framework_SystemTracking_Translate.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "Cockpit"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets data for Translate
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchData()).ExecuteSingle(Object_Framework_SystemTracking_Translate.URL, objParams, "Get", fnCallback);
    },

    /**
* @name GetGetPreloadConfigData
* @param {objParams} objParams Passes objParams
* @param {callback} fnCallback Callback function
* @summary Gets data for Preloadconfig
*/
    GetTranslateJsonFile: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Object/Framework/SystemTracking/Translate/TranslateJsonFile", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },


};
export default Object_Framework_SystemTracking_Translate;
