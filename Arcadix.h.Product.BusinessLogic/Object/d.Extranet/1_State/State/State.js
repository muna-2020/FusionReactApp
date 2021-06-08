//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_State_State
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_Extranet_State_State = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/Extranet/State/State",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam passes objParam
    * @summary Initialize initial data call param and then adds the School object to store
    **/
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_State_State.InitialDataCallParam = objParam;
        Object_Extranet_State_State.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_State_State", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_State_State", Object_Extranet_State_State);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_State_State.URL,
            "Params": Object_Extranet_State_State.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsInMemoryCache":"Y",
            //"IsMultiIndexData": "Y"
            "ReturnDataOnServerRender": Object_Extranet_State_State.ReturnDataOnServerRender
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for State
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_State_State.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_State_State.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_State_State.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_State_State.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_State_State;