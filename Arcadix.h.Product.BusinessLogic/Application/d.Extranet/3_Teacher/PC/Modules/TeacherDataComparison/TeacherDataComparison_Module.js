//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Extranet_Teacher_TeacherDataComparison_Module
* @summary Teacher object
*/
var Extranet_Teacher_TeacherDataComparison_Module = {

    /**
    * @summary API URL
    */
    URL: "API/Extranet/Teacher/TeacherDataComparison_Module",

    /**
     * @summary Initializes Data
     */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Teacher Data comparison object to store
    */
    Initialize: function (objParam) {
        Extranet_Teacher_TeacherDataComparison_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Teacher_TeacherDataComparison_Module", Extranet_Teacher_TeacherDataComparison_Module);
    },

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Teacher_TeacherDataComparison_Module.URL,
            "Params": Extranet_Teacher_TeacherDataComparison_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for Data comparison
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Teacher_TeacherDataComparison_Module.URL, objParams, "Get", fnCallback);
    }
};

export default Extranet_Teacher_TeacherDataComparison_Module;