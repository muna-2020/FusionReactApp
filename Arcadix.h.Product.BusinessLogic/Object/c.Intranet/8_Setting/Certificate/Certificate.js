//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Intranet_Setting_Certificate
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_Intranet_Setting_Certificate = {

    /**
    * @summary URL
    */
    URL: "API/Object/Intranet/Setting/Certificate",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Subject object to store
    */
    Initialize: function (objParam) {
        Object_Intranet_Setting_Certificate.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_Certificate", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_Certificate", Object_Intranet_Setting_Certificate);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Subject
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_Certificate.URL,
            "Params": Object_Intranet_Setting_Certificate.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Subject
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_Certificate.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Intranet_Setting_Certificate;