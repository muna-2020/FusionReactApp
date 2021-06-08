//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Teacher_TimeTableDay
* @summary Object_Extranet_Teacher_TimeTableDay object
*/
var Object_Extranet_Teacher_TimeTableDay = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/TimeTableDay",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the TimeTableDay object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_Teacher_TimeTableDay.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_Teacher_TimeTableDay", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_TimeTableDay", Object_Extranet_Teacher_TimeTableDay);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for TimeTableDay
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": "API/Object/Extranet/Teacher/TimeTableDay",
            "Params": Object_Extranet_Teacher_TimeTableDay.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsInMemoryCache": "Y"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for TimeTableDay
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_TimeTableClassTime.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Extranet_Teacher_TimeTableDay;