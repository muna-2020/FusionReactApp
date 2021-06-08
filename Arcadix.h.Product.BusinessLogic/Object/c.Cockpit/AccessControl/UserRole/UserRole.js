//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Cockpit_UserRole
* @summary UserRole object
*/
var Object_Cockpit_UserRole = {

    /**
     * @summary URL
     */
    URL: "API/Object/Cockpit/UserRole",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the UserRole object to store
     */
    Initialize: function (objParam) {
        Object_Cockpit_UserRole.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Cockpit_UserRole", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Cockpit_UserRole", Object_Cockpit_UserRole);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for UserRole
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function(){
        return {
            "URL": Object_Cockpit_UserRole.URL,
            "Params": Object_Cockpit_UserRole.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },


    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for UserRole
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserRole.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData for UserRole
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserRole.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for UserRole
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserRole.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for UserRole
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Cockpit_UserRole.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Cockpit_UserRole;
