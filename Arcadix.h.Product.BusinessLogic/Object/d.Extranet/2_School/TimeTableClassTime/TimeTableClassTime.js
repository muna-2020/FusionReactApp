//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_School_TimeTableClassTime
* @summary TimeTableClassTime object
*/
var Object_Extranet_School_TimeTableClassTime = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/School/TimeTableClassTime",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the TimeTableClassTime object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_School_TimeTableClassTime.InitialDataCallParam = objParam;
        Object_Extranet_School_TimeTableClassTime.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_School_TimeTableClassTime", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_School_TimeTableClassTime", Object_Extranet_School_TimeTableClassTime);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for TimeTableClassTime
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_School_TimeTableClassTime.URL,
            "Params": Object_Extranet_School_TimeTableClassTime.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "ReturnDataOnServerRender": Object_Extranet_School_TimeTableClassTime.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for TimeTableClassTime
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_TimeTableClassTime.URL, objParams, "Get", fnCallback);
    },


    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for TimeTableClassTime
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_TimeTableClassTime.URL, objParams, "Put", fnCallback);
    }
};

export default Object_Extranet_School_TimeTableClassTime;