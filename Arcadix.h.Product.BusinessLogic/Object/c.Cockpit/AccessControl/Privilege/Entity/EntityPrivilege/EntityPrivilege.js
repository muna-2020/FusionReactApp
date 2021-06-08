//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Cockpit_EntityPrivilege
* @summary EntityPrivilege object
*/
var Object_Cockpit_EntityPrivilege = {

    /**
     * @summary URL
     */
    URL: "API/Object/Cockpit/EntityPrivilege",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the EntityPrivilege object to store
     */
    Initialize: function (objParam) {
        Object_Cockpit_EntityPrivilege.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_EntityPrivilege", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_EntityPrivilege", Object_Cockpit_EntityPrivilege);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for EntityPrivilege
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_EntityPrivilege.URL,
            "Params": Object_Cockpit_EntityPrivilege.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for EntityPrivilege
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_EntityPrivilege.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Cockpit_EntityPrivilege;
