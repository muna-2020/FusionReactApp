//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Cockpit_EntityAccessLevel
* @summary EntityAccessLevel object
*/
var Object_Cockpit_EntityAccessLevel = {

    /**
     * @summary URL
     */
    URL: "API/Object/Cockpit/EntityAccessLevel",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the EntityAccessLevel object to store
     */
    Initialize: function (objParam) {
        Object_Cockpit_EntityAccessLevel.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_EntityAccessLevel", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_EntityAccessLevel", Object_Cockpit_EntityAccessLevel);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for EntityAccessLevel
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Cockpit_EntityAccessLevel.URL,
            "Params": Object_Cockpit_EntityAccessLevel.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for EntityAccessLevel
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_EntityAccessLevel.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Cockpit_EntityAccessLevel;
