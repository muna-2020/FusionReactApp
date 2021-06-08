//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Teacher_TimeTableColor
* @summary Object_Extranet_Teacher_TimeTableColor object
*/
var Object_Extranet_Teacher_TimeTableColor = {


    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/TimeTableColor",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the TimeTableColor object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_Teacher_TimeTableColor.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_Teacher_TimeTableColor", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_TimeTableColor", Object_Extranet_Teacher_TimeTableColor);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for TimeTableColor
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_TimeTableColor.URL,
            "Params": Object_Extranet_Teacher_TimeTableColor.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsInMemoryCache": "Y"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for TimeTableColor
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_TimeTableColor.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Extranet_Teacher_TimeTableColor;