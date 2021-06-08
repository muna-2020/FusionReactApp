//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Teacher_SchoolYearPeriod
* @summary SchoolYearPeriod object
*/
var Object_Extranet_Teacher_SchoolYearPeriod = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/SchoolYearPeriod",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: 'N',

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the SchoolYearPeriod object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_Teacher_SchoolYearPeriod.InitialDataCallParam = objParam;
        Object_Extranet_Teacher_SchoolYearPeriod.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_Teacher_SchoolYearPeriod", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_SchoolYearPeriod", Object_Extranet_Teacher_SchoolYearPeriod);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Teacher
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_SchoolYearPeriod.URL,
            "Params": Object_Extranet_Teacher_SchoolYearPeriod.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "N",
            "IsInMemoryCache": "N",
            "ReturnDataOnServerRender": Object_Extranet_Teacher_SchoolYearPeriod.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for SchoolYearPeriod
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_SchoolYearPeriod.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Extranet_Teacher_SchoolYearPeriod;