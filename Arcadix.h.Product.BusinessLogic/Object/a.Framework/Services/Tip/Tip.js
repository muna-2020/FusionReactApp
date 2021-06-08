//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Framework_Services_Tip
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_Framework_Services_Tip = {

    /**
    * @summary API URL
    */
    URL: "API/Object/Framework/Services/Tip",

    /**
    * @summary Initializes Data
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam passes objParam
    * @summary Initialize initial data call param and then adds the Class object to store
    */
    Initialize: function (objParam) {
        Object_Framework_Services_Tip.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Framework_Services_Tip", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Framework_Services_Tip", Object_Framework_Services_Tip);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Framework_Services_Tip.URL,
            "Params": Object_Framework_Services_Tip.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for Help
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_Tip.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary AddData for Help
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_Tip.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for Help
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_Tip.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for Teacher
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_Tip.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Framework_Services_Tip;
