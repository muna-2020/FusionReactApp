//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Framework_Services_Help
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_Framework_Services_Help = {

    /**
    * @summary API URL
    **/
    URL: "API/Object/Framework/Services/Help",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam passes objParam
     * @summary Initialize initial data call param and then adds the Class object to store
     **/
    Initialize: function (objParam) {
        Object_Framework_Services_Help.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Framework_Services_Help", Object_Framework_Services_Help);
    },


    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Framework_Services_Help.URL,
            "Params": Object_Framework_Services_Help.InitialDataCallParam,
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
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Framework_Services_Help.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Framework_Services_Help;
