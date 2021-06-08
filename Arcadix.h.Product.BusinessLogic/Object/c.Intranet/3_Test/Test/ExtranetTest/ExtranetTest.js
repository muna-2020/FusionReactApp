//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Intranet_Test_ExtranetTest
* @summary ExtranetTest object
*/
var Object_Intranet_Test_ExtranetTest = {

    /**
    * @summary URL
    */
    URL: "API/Object/Intranet/Test/ExtranetTest",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the ExtranetTest object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Intranet_Test_ExtranetTest.InitialDataCallParam = objParam;
        Object_Intranet_Test_ExtranetTest.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Intranet_Test_ExtranetTest", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Test_ExtranetTest", Object_Intranet_Test_ExtranetTest);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for ExtranetTest
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_ExtranetTest.URL,
            "Params": Object_Intranet_Test_ExtranetTest.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "ReturnDataOnServerRender": Object_Intranet_Test_ExtranetTest.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for ExtranetTest
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_ExtranetTest.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for ExtranetTest
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_ExtranetTest.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for ExtranetTest
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_ExtranetTest.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for ExtranetTest
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_ExtranetTest.URL, objParams, "Delete", fnCallback);
    },

    /**
    * @name FetchData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary FetchData for ExtranetTest
    */
    FetchData: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Object_Intranet_Test_ExtranetTest.URL,
                "Params": objParams,
                "MethodType": "Get"
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    }
};

export default Object_Intranet_Test_ExtranetTest;