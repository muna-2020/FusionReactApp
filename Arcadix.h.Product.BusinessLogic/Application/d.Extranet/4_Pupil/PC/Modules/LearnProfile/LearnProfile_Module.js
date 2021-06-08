//Common functionality imports
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Extranet_Pupil_LearnProfile_Module = {

    /**
    * @name URL
    * @summary Path for server object.
    */
    URL: "API/Extranet/Pupil/LearnProfile_Module",

    /**
    * @name InitialDataCallParam
    * @summary To hold the initial search params.
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {any} objParam objParam
    * @summary Sets the InitialDataCallParam by Recieved Params and puts the object into store.
    */
    Initialize: function (objParam) {
        Extranet_Pupil_LearnProfile_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Pupil_LearnProfile_Module", Extranet_Pupil_LearnProfile_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary returns initial request object
    * @returns {object} object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Pupil_LearnProfile_Module.URL,
            "Params": Extranet_Pupil_LearnProfile_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @sumamry Gets the data without caching
    * @param {any} objParams objParams
    * @param {any} fnCallback fnCallback
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Pupil_LearnProfile_Module.URL, objParams, "Get", fnCallback, true);
    }
};

export default Extranet_Pupil_LearnProfile_Module;