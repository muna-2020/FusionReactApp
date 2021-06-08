
/**
* @name Extranet_ExtranetLogin
* @summary Extranet_ExtranetLogin object to check the user and to send the email
*/
var Extranet_ExtranetLogin = {

    /**
       * @name ValidateUser
       * @param {objParams} objParams Passes objParams
       * @param {callback} fnCallback Callback function
       * @summary Validates the user if email id exists or no
       */
    ValidateUser: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/ValidateUser", "POST", objParams).then(response => response.json()).then(json => {
            LoadDynamicStyles_API(json["Data"]?.["Object_Framework_Services_DynamicStyleReactJs"]);
            fnCallback(json);
        });
    },

    /**
     * @name SendLoginDetails
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Sends login details
     */
    SendLoginDetails: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/SendExtranetLogin", "POST", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }
};

export default Extranet_ExtranetLogin;