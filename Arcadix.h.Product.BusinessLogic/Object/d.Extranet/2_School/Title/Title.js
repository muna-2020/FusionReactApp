//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Extranet_School_Title = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/School/Title",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name GetInitialDataCall
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Title object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_School_Title.InitialDataCallParam = objParam;
        Object_Extranet_School_Title.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_School_Title", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_School_Title", Object_Extranet_School_Title);
        })
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Title
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_School_Title.URL,
            "Params": Object_Extranet_School_Title.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "IsInMemoryCache": "N",
            "ReturnDataOnServerRender": Object_Extranet_School_Title.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Title
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_Title.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for Title
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_Title.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for Title
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_Title.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for Title
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_Title.URL, objParams, "Delete", fnCallback);
    }    
};

export default Object_Extranet_School_Title;