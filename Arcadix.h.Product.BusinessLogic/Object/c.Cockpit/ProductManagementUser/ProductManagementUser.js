//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Object_DevServer_ProductManagement_ProductManagementUser
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_DevServer_ProductManagement_ProductManagementUser = {

    /**
     * @summary URL
     */
    URL: "API/Object_DevServer/ProductManagement/ProductManagementUser",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the ProductManagementUser object to store
     */
    Initialize: function (objParam) {
        Object_DevServer_ProductManagement_ProductManagementUser.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_DevServer_ProductManagement_ProductManagementUser", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_DevServer_ProductManagement_ProductManagementUser", Object_DevServer_ProductManagement_ProductManagementUser);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for ProductManagementUser
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_DevServer_ProductManagement_ProductManagementUser.URL,
            "Params": Object_DevServer_ProductManagement_ProductManagementUser.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for ProductManagementUser
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ProductManagementUser.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData for ProductManagementUser
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ProductManagementUser.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for ProductManagementUser
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ProductManagementUser.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for ProductManagementUser
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_DevServer_ProductManagement_ProductManagementUser.URL, objParams, "Delete", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @summary SendLogins for ProductManagementUser
     */
    SendLogins: (objParams) => {
        let arrRequest = [
            {
                "URL": "API/Object_DevServer/ProductManagement/ProductManagementUser/SendProductManagementUserLogin",
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, () => ({}));
    }
};

export default Object_DevServer_ProductManagement_ProductManagementUser;