//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Extranet_Teacher_Interpretation_Module
* @summary Teacher object
*/
var Extranet_Teacher_Interpretation_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/Interpretation_Module",

    /**
     * @name InitialDataCallParam
     * @summary Holds the initial search params.
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @summary Sets the InitialDataCallParam by Recieved Params and puts the object into store.
     * @param {any} objParam
     */
    Initialize: function (objParam) {
        Extranet_Teacher_Interpretation_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_Interpretation_Module", Extranet_Teacher_Interpretation_Module);
    },

    /**
     * @name GetInitialDataCall
     * @summary returns initial request object
     * @returns {Object}
     * */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Teacher_Interpretation_Module.URL,
            "Params": Extranet_Teacher_Interpretation_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @summary To make get request.
     * */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Teacher_Interpretation_Module.URL, objParams, "Get", fnCallback);
    }
};

export default Extranet_Teacher_Interpretation_Module;