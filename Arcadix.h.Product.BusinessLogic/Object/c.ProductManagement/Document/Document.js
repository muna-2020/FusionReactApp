//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/** @CodeTracerStart Teacher Edit1_UseCaseTest_Amit_14 */
/**
 * @name Object_DevServer_ProductManagement_ProductDocument
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_DevServer_ProductManagement_ProductDocument = {

    /**
    * @summary URL
    */
    URL: "API/Object_DevServer/ProductManagement/ProductDocument",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Document object to store
    */
    Initialize: function (objParam) {
        Object_DevServer_ProductManagement_ProductDocument.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_DevServer_ProductManagement_ProductDocument", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_DevServer_ProductManagement_ProductDocument", Object_DevServer_ProductManagement_ProductDocument);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Document
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_DevServer_ProductManagement_ProductDocument.URL,
            "Params": Object_DevServer_ProductManagement_ProductDocument.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Document
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ProductDocument.URL, objParams, "Get", fnCallback);
    },

/** @CodeTracerEnd Teacher Edit1_UseCaseTest_Amit_14 */
    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for Document
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ProductDocument.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for Document
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ProductDocument.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for Document
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ProductDocument.URL, objParams, "Delete", fnCallback);
    },

    /**
     * @name CheckOut
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    CheckOut: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("Object/ProductManagement/ProductDocument/CheckOut", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }

};

export default Object_DevServer_ProductManagement_ProductDocument;