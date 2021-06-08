
/**
* @name Extranet_Teacher_Certificate_Module
* @summary Teacher object
*/
var Extranet_Teacher_Certificate_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/Certificate_Module",

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
        return Extranet_Teacher_Certificate_Module.DataCallParams;
    },

    GenerateCertificate: (objParams, fnCallback) => {
        let arrRequest = [ // need to create controller for this.
            {
                "URL": Extranet_Teacher_Certificate_Module.URL + '/GenerateCertificate',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    }
};

export default Extranet_Teacher_Certificate_Module;