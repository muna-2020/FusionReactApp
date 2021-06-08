//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Teacher_Semester
* @summary SchoolYearPeriod object
*/
var Object_Extranet_Teacher_Semester = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/Semester",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Semester object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_Teacher_Semester.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_Semester", Object_Extranet_Teacher_Semester);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Semester
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_Semester.URL,
            "Params": Object_Extranet_Teacher_Semester.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsInMemoryCache": "Y"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Semester
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_Semester.URL, objParams, "Get", fnCallback);

    }
};

export default Object_Extranet_Teacher_Semester;
