//Common functionality imports
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Extranet_School_SchoolDataComparison_Module = {

    /**
     * @name URL
     * @summary Path for server object.
     */
    URL: "API/Extranet/School/SchoolDataComparison_Module",

    /**
     * @name InitialDataCallParam
     * @summary To hold the initial search params.
     * */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {any} objParam objParam
     * @summary Sets the InitialDataCallParam by Recieved Params and puts the object into store.
     */
    Initialize: function (objParam) {
        Extranet_School_SchoolDataComparison_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_School_SchoolDataComparison_Module", Extranet_School_SchoolDataComparison_Module);
    },

    /**
     * @name GetInitialDataCall
     * @summary returns initial request object
     * @returns {object} object
     * */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_School_SchoolDataComparison_Module.URL,
            "Params": Extranet_School_SchoolDataComparison_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @sumamry Gets the data without caching
     * @param {any} objParams objParams
     * @param {any} fnCallback fnCallback
     * */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_School_SchoolDataComparison_Module.URL, objParams, "Get", fnCallback, true);
    },

    /**
      * @name PrintToPDF
      * @summary Calls the End generate the Pdf.
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      */   
    PrintToPDF: (objParams, fnCallback) => {       
        ArcadixFetchData.ExecuteCustom("API/Extranet/SchoolDataComparison", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }
};

export default Extranet_School_SchoolDataComparison_Module;
