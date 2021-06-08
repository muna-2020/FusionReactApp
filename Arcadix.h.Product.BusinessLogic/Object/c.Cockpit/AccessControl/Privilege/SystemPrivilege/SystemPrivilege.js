//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Cockpit_SystemPrivilege
* @summary Privilege object
*/
var Object_Cockpit_SystemPrivilege = {

    /**
     * @summary URL
     */
    URL: "API/Object/Cockpit/SystemPrivilege",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the SystemPrivilege object to store
     */
    Initialize: function (objParam) {
        Object_Cockpit_SystemPrivilege.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_SystemPrivilege", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_SystemPrivilege", Object_Cockpit_SystemPrivilege);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for SystemPrivilege
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_SystemPrivilege.URL,
            "Params": Object_Cockpit_SystemPrivilege.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for SystemPrivilege
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_SystemPrivilege.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Cockpit_SystemPrivilege;
