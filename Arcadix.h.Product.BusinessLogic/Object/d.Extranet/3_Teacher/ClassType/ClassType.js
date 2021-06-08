//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_Teacher_ClassType
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_Extranet_Teacher_ClassType = {

    /**
     * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/ClassType",

    /**
     * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_Teacher_ClassType.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_Teacher_ClassType", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_ClassType", Object_Extranet_Teacher_ClassType);
        })
        
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for Subject
     * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_ClassType.URL,
            "Params": Object_Extranet_Teacher_ClassType.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsInMemoryCache": "Y"
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData method
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_ClassType.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData method
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_ClassType.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData method
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_ClassType.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData method
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_ClassType.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_Teacher_ClassType;
