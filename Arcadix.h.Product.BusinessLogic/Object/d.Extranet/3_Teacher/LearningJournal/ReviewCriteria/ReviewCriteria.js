//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Teacher_ReviewCriteria
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
*/
var Object_Extranet_Teacher_ReviewCriteria = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/ReviewCriteria",

/**
* @summary InitialDataCallParam
*/
    InitialDataCallParam: null,

/**
* @name Initialize
* @param {objParam} objParam Passes objParam
* @summary Initialize initial data call param and then adds the SchoolSubject object to store
*/
    Initialize: function (objParam) {
        Object_Extranet_Teacher_ReviewCriteria.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_Teacher_ReviewCriteria", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_ReviewCriteria", Object_Extranet_Teacher_ReviewCriteria);
        });
    },

/**
* @name GetInitialDataCall
* @summary GetInitialDataCall for ReviewCriteria
* @returns {object} InitialDataCall data object
*/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_ReviewCriteria.URL,
            "Params": Object_Extranet_Teacher_ReviewCriteria.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for ReviewCriteria
    */
    GetData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_ReviewCriteria.MethodCall(objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for ReviewCriteria
    */
    AddData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_ReviewCriteria.MethodCall(objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for ReviewCriteria
    */
    EditData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_ReviewCriteria.MethodCall(objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for ReviewCriteria
    */
    DeleteData: (objParams, fnCallback) => {
        Object_Extranet_Teacher_ReviewCriteria.MethodCall(objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_Teacher_ReviewCriteria;
