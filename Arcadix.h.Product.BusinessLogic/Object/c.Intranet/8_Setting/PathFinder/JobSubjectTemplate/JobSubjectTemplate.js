//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Setting_PathFinder_JobSubjectTemplate
* @summary JobSubjectTemplate object
*/
var Object_Intranet_Setting_PathFinder_JobSubjectTemplate = {

    /**
    * @summary URL
    */
    URL: "API/Object/Intranet/Setting/PathFinder/JobSubjectTemplate",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the JobSubjectTemplate object to store
    */
    Initialize: function (objParam) {
        Object_Intranet_Setting_PathFinder_JobSubjectTemplate.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_PathFinder_JobSubjectTemplate", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_PathFinder_JobSubjectTemplate", Object_Intranet_Setting_PathFinder_JobSubjectTemplate);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for JobSubjectTemplate
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_PathFinder_JobSubjectTemplate.URL,
            "Params": Object_Intranet_Setting_PathFinder_JobSubjectTemplate.InitialDataCallParam,
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
    * @summary GetData for JobSubjectTemplate
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobSubjectTemplate.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for JobSubjectTemplate
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobSubjectTemplate.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for JobSubjectTemplate
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobSubjectTemplate.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for JobSubjectTemplate
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_PathFinder_JobSubjectTemplate.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Setting_PathFinder_JobSubjectTemplate;