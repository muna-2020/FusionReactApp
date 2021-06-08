//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Intranet_Cycle_Cycle
 * @summary Cycle object
 */
var Object_Intranet_Cycle_Cycle = {

    /**
     * @summary URL
     */
    URL: "API/Object/Intranet/Cycle/Cycle",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the Cycle object to store
     */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Intranet_Cycle_Cycle.InitialDataCallParam = objParam;
        Object_Intranet_Cycle_Cycle.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Intranet_Cycle_Cycle", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Cycle_Cycle", Object_Intranet_Cycle_Cycle);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for Cycle
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Cycle_Cycle.URL,
            "Params": Object_Intranet_Cycle_Cycle.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            //"IsInMemoryCache":"Y"
            "ReturnDataOnServerRender": Object_Intranet_Cycle_Cycle.ReturnDataOnServerRender
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for Cycle
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Cycle_Cycle.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for Cycle
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Cycle_Cycle.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for Cycle
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Cycle_Cycle.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for Cycle
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Cycle_Cycle.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Cycle_Cycle;