import { LoadDynamicStyles_API } from '@shared/Framework/Services/CssLoader/CssLoader';

/**
* @name Intranet_LoginAndMaster_IntranetLogin
* @summary Module object for intranet login.
* @returns {object} Json with required Methods
*/
var Intranet_LoginAndMaster_IntranetLogin = {
    URL: "API/Intranet/LoginAndMaster/IntranetLogin",
    InitialDataCallParam: null,

    /**
    * @name ValidateUser
    * @param {object} params to the method(user name/password).
    * @param {function} callback method with return data.
    * @summary This method is used validate user.
    */
    ValidateUser: (objParams, fnCallback) => {
        var objHeaderData = {};
        let objCustomHeaders = {};
        if (JConfiguration.IsPrefetchEnabled) {
            objCustomHeaders = {
                "Device": "ServiceWorker"
            };
        }
        let objRequestParams = {
            URL: Intranet_LoginAndMaster_IntranetLogin.URL + "/ValidateUser",
            Params: objParams
        };
        ArcadixFetchData.ExecuteCustom(Intranet_LoginAndMaster_IntranetLogin.URL + "/ValidateUser", "POST", objRequestParams, objCustomHeaders)
            .then(objResponse => {
                if (objResponse.status === 200) {
                    for (var arrPair of objResponse.headers.entries()) {
                        objHeaderData[arrPair[0]] = arrPair[1];
                    }
                    return objResponse.json();
                }
            })
            .then(objJSON => {
                if (objHeaderData["timestamp"] != undefined) {
                    if (objJSON.Data && JSON.stringify(objJSON.Data) !== "{}") {
                        let objReformattedData = ArcadixFetchData.GetMappedColumns(objJSON["Data"])
                        let objTimeStamp = JSON.parse(objHeaderData["timestamp"]);
                        var arrDataKeys = Object.keys(objReformattedData);
                        arrDataKeys.forEach(strDataKey => {
                            if (strDataKey == "Object_Framework_Services_DynamicStyleReactJs") {
                                LoadDynamicStyles_API(objReformattedData["Object_Framework_Services_DynamicStyleReactJs"]);
                            }
                            else {
                                let objAddJson = strDataKey.split(';').length > 1 ? { Filter: strDataKey, Value: { Data: objReformattedData[strDataKey], TimeStamp: objTimeStamp[strDataKey] } } : { Value: { Data: objReformattedData[strDataKey], TimeStamp: objTimeStamp[strDataKey] } };
                                ArcadixCacheData.AddData(strDataKey.split(';')[0], objAddJson, (objResult) => { });
                            }
                        });
                    }
                }
                if (objHeaderData["token"]) {
                    ApplicationState.SetProperty("PrefetchToken", objHeaderData["token"]);
                }
                fnCallback(objJSON);
            });
    },

    /**
    * @name TwoFactorAuthenticate
    * @param {object} params to the method(Authentication code).
    * @param {function} callback method with return data.
    * @summary This method is used validate user.
    */
    TwoFactorAuthenticate: (objParams, fnCallback) => {
        let objRequestParams = {
            URL: Intranet_LoginAndMaster_IntranetLogin.URL + "/TwoFactorAuthenticate",
            Params: objParams
        };
        ArcadixFetchData.ExecuteCustom(Intranet_LoginAndMaster_IntranetLogin.URL + "/TwoFactorAuthenticate", "POST", objRequestParams)
            .then(response => response.json())
            .then(objResponse => {
                fnCallback(objResponse);
            });
    }
};

export default Intranet_LoginAndMaster_IntranetLogin;
