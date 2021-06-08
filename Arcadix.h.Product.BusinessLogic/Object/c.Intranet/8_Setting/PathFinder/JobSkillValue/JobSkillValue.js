//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Setting_PathFinder_JobSkillValue
* @summary JobSkillValue object
*/
var Object_Intranet_Setting_PathFinder_JobSkillValue = {

    /**
    * @summary URL
    */
    URL: "API/Object/Intranet/Setting/PathFinder/JobSkillValue",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the JobSkillValue object to store
    */
    Initialize: function (objParam) {
        Object_Intranet_Setting_PathFinder_JobSkillValue.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_PathFinder_JobSkillValue", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_PathFinder_JobSkillValue", Object_Intranet_Setting_PathFinder_JobSkillValue);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for JobSkillValue
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_PathFinder_JobSkillValue.URL,
            "Params": Object_Intranet_Setting_PathFinder_JobSkillValue.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            //"IsMultiIndex":"Y",
            //"IsInMemoryCache":"Y"
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for JobSkillValue
    */
    GetData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobSkillValue.URL, objParams, "Get", fnCallback, blnNoCache);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for JobSkillValue
    */
    EditData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobSkillValue.URL, objParams, "Put", fnCallback, blnNoCache);
    }
};

export default Object_Intranet_Setting_PathFinder_JobSkillValue;