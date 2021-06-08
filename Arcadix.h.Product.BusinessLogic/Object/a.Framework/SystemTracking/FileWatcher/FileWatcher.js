import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Framework_SystemTracking_FileWatcher
* @summary FileWatcher object
*/
var Object_Framework_SystemTracking_FileWatcher = {

    /**
     * @summary URL
     */
    URL: "API/Object/Framework/SystemTracking/FileWatcher",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: {},

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the FileWatcher object to store
     */
    Initialize: function (objParam) {
        Object_Framework_SystemTracking_FileWatcher.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Framework_SystemTracking_Translate", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Framework_SystemTracking_FileWatcher", Object_Framework_SystemTracking_FileWatcher);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for FileWatcher
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Framework_SystemTracking_FileWatcher.URL,
            "Params": Object_Framework_SystemTracking_FileWatcher.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "Cockpit"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary Gets data for FileWatcher
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchData()).ExecuteSingle(Object_Framework_SystemTracking_FileWatcher.URL, objParams, "Get", fnCallback);
    }


};

export default Object_Framework_SystemTracking_FileWatcher;
