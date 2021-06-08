
/**
* @name Extranet_Teacher_TestLogins_Module
* @summary Teacher object
*/
var Extranet_Teacher_TestLogins_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/TestLogins_Module",

    /**
     * @summary Initializes Data
     */
    DataCallParams: null,

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     */
    GetInitialDataCall: function () {
        return Extranet_Teacher_TestLogins_Module.DataCallParams;
    },

    /**
     * @name GetOptionalAdditionFileDetails
     * @summary calls the GetOptionalAdditionFileDetails method in server side for loading pdf files path.
     * */
    GetOptionalAdditionFileDetails: (objParams, fnCallback) => {
        let arrRequest = [ // need to create controller for this.
            {
                "URL": Extranet_Teacher_TestLogins_Module.URL + '/GetOptionalAdditionFileDetails',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
     * @name GetServerDate
     * @summary Gets the server time.
     * @param {any} objParam
     */
    GetServerDate: function (objParam) {
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_TestLogins_Module", Extranet_Teacher_TestLogins_Module);
        Extranet_Teacher_TestLogins_Module.DataCallParams = {
            "URL": Extranet_Teacher_TestLogins_Module.URL + "/GetServerDate",
            "Params": objParam,
            "UseFullName": true,
            "ActionType": "Replace"
        };
    }
};

export default Extranet_Teacher_TestLogins_Module;