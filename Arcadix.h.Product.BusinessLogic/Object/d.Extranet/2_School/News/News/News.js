//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Extranet_School_News = {

    /**
    * @name URL
    * @summary Path to Server Side School DocumentFolder  object.
    */
    URL: "API/Object/Extranet/School/News",

    /**
    * @name InitialDataCallParam
    * @summary Holds the initial search params.
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the News object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_School_News.InitialDataCallParam = objParam;
        Object_Extranet_School_News.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_School_News", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_School_News", Object_Extranet_School_News);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for News
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_School_News.URL,
            "Params": Object_Extranet_School_News.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "ReturnDataOnServerRender": Object_Extranet_School_News.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for News
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_News.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name GetMultipleData
    * @param {arrParams} arrParams Passes arrParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for News
    */
    GetMultipleData: (arrParams, fnCallback) => {        
        let arrReturn = arrParams.map(objCall => {
            return {
                "URL": Object_Extranet_School_News.URL,
                "Params": objCall,
                "MethodType": "Get",
                "UseFullName": true
            };
        });
        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.Execute(arrReturn, fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for News
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_News.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for News
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_News.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_School_News;