//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Extranet_MemberFtpSync
* @summary MemberFtpSync object
*/
var Object_Extranet_MemberFtpSync = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/MemberFtpSync",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the MemberFtpSync object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_MemberFtpSync.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_MemberFtpSync", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_MemberFtpSync", Object_Extranet_MemberFtpSync);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for MemberFtpSync
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_MemberFtpSync.URL,
            "Params": Object_Extranet_MemberFtpSync.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            //"IsInMemoryCache":"Y"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for MemberFtpSync
    */
    GetData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_MemberFtpSync.URL, objParams, "Get", fnCallback, blnNoCache);
    },

    /**
   * @name GetData
   * @param {objParams} objParams Passes objParams
   * @param {callback} fnCallback Callback function
   * @summary GetData for MemberFtpSync
   */
    GetFileDisplayData: (objParams, fnCallback, blnNoCache = false) => {
        ArcadixFetchData.ExecuteCustom(Object_Extranet_MemberFtpSync.URL, "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }

};

export default Object_Extranet_MemberFtpSync;