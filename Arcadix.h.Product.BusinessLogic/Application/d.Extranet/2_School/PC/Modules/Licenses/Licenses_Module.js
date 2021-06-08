//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Extranet_School_Licenses
* @summary Licenses object
*/
var Extranet_School_Licenses = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/School/Licenses_Module",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Licenses object to store
    */
    Initialize: function (objParam) {
        Extranet_School_Licenses.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_School_Licenses", Extranet_School_Licenses);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Licenses
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_School_Licenses.URL,
            "Params": Extranet_School_Licenses.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Licenses
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_School_Licenses.URL, objParams, "Get", fnCallback);
    }
};

export default Extranet_School_Licenses;