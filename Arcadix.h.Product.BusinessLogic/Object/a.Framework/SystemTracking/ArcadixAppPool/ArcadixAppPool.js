//Helper classes.
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Framework_SystemTracking_ArcadixAppPool
* @summary ArcadixAppPool object
*/
var Object_Framework_SystemTracking_ArcadixAppPool = {

    /**
     * @summary URL
     */
    URL: "API/Object/Framework/SystemTracking/ArcadixAppPool",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: {},

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the ArcadixAppPool object to store
     */
    Initialize: function (objParam) {
        Object_Framework_SystemTracking_ArcadixAppPool.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Framework_SystemTracking_ArcadixAppPool", Object_Framework_SystemTracking_ArcadixAppPool);
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for ArcadixAppPool
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Framework_SystemTracking_ArcadixAppPool.URL,
            "Params": Object_Framework_SystemTracking_ArcadixAppPool.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "Cockpit"
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for ArcadixAppPool
     */
    GetData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle(Object_Framework_SystemTracking_ArcadixAppPool.URL, objParams, "Get", fnCallback);
    }      
};

export default Object_Framework_SystemTracking_ArcadixAppPool;
