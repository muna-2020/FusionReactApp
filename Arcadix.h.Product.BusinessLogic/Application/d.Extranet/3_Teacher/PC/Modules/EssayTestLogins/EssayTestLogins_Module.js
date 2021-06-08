
/**
* @name Extranet_Teacher_EssayTestLogins_Module
* @summary Teacher object
*/
var Extranet_Teacher_EssayTestLogins_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/EssayTestLogins_Module",

    /**
     * @name GenerateToken
     * @summary Generates the token
     * @param {any} objParam
     */
    GenerateToken: function (objParams, fnCallback) {
        let arrRequest = [
            {
                "URL": Extranet_Teacher_EssayTestLogins_Module.URL + '/GenerateToken',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    }
};

export default Extranet_Teacher_EssayTestLogins_Module;