//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_School_SchoolType
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_Extranet_School_SchoolType = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/Extranet/School/SchoolType",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
     * @name Initialize
     * @param {objParam} objParam passes objParam
     * @summary Initialize initial data call param and then adds the School object to store
     **/
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_School_SchoolType.InitialDataCallParam = objParam;
        Object_Extranet_School_SchoolType.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_School_SchoolType", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_School_SchoolType", Object_Extranet_School_SchoolType);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_School_SchoolType.URL,
            "Params": Object_Extranet_School_SchoolType.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "IsInMemoryCache": "Y",
            "ReturnDataOnServerRender": Object_Extranet_School_SchoolType.ReturnDataOnServerRender

        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for SchoolType
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_SchoolType.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary AddData for SchoolType
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_SchoolType.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for SchoolType
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_SchoolType.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary DeleteData for SchoolType
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_SchoolType.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_School_SchoolType;