import { LoadDynamicStyles_API } from '@shared/Framework/Services/CssLoader/CssLoader';
//Helper classes.
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
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
        var objHeaderData = {};
        let objCustomHeaders = {};
        if (global.JConfiguration.ApplicationTypeId === "6") {
            objCustomHeaders = {
                "Device": "ServiceWorker"
            }
        }            
        ArcadixFetchData.ExecuteCustom("API/Extranet/ExtranetLogin/ValidateUser", "POST", objParams, objCustomHeaders)
            .then(objResponse => {
                if (objResponse.status === 200) {
                    for (var arrPair of objResponse.headers.entries()) {
                        objHeaderData[arrPair[0]] = arrPair[1];
                    }
                    return objResponse.json();
                }
            }
        ).then(objJSON => {
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