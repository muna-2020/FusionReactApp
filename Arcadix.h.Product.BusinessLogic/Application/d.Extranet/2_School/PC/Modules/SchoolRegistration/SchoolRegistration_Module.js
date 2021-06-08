
/**
* @name SchoolRegistration_Module
* @summary ImportData object
*/
var SchoolRegistration_Module = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/School/SchoolRegistration_Module",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name InitialDataCallParam
    * @summary Holds the initial search params.
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Document object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_School_Document.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("SchoolRegistration_Module", Object_Extranet_School_Document);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Document
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": SchoolRegistration_Module.URL,
            "Params": SchoolRegistration_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for Document
    */
    GetData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Extranet/School/SchoolRegistration", "Get", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary AddData for Document
    */
    AddData: (objParams, fnCallback) => {
        //(new ArcadixFetchAndCacheData()).ExecuteSingle(SchoolRegistration_Module.URL, objParams, "Post", fnCallback);
        ArcadixFetchData.ExecuteCustom("API/Extranet/School/SchoolRegistration", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });

    }
};

export default SchoolRegistration_Module;