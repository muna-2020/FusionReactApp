
/**
* @name Extranet_Teacher_Tip_Module
* @summary Teacher object
*/
var Extranet_Teacher_Tip_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/Tip_Module",

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
        Extranet_Teacher_Tip_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_Tip_Module", Extranet_Teacher_Tip_Module);
    },

    /**
     * @name GetInitialDataCall
     * @summary returns initial request object
     * @returns {Object}
     * */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Teacher_Tip_Module.URL,
            "Params": Extranet_Teacher_Tip_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @summary To make get request.
     * */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Teacher_Tip_Module.URL, objParams, "Get", fnCallback);
    }
};

export default Extranet_Teacher_Tip_Module;