//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Extranet_School_Billing_Module
* @summary Billing object
*/
var Extranet_School_Billing_Module = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/School/Billing_Module",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Billing object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Extranet_School_Billing_Module.InitialDataCallParam = objParam;
        Extranet_School_Billing_Module.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.AddEntityObject("Extranet_School_Billing_Module", Extranet_School_Billing_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Billing
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_School_Billing_Module.URL,
            "Params": Extranet_School_Billing_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "ReturnDataOnServerRender": Extranet_School_Billing_Module.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Billing
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_School_Billing_Module.URL, objParams, "Get", fnCallback, true);
    },

    /**
      * @name PrintToPDF
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Prints to pdf
      */
    PrintToPDF: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Extranet/Billing", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }
};

export default Extranet_School_Billing_Module;