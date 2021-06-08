//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Teacher_LearningTestPupilGroup
* @summary LearningTestPupilGroup object
*/
var Object_Extranet_Teacher_LearningTestPupilGroup = {

    /**
    * @summary URL
    */
    URL: "API/Object/Extranet/Teacher/LearningTestPupilGroup",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the LearningTestPupilGroup object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_Teacher_LearningTestPupilGroup.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_LearningTestPupilGroup", Object_Extranet_Teacher_LearningTestPupilGroup);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for LearningTestPupilGroup
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_LearningTestPupilGroup.URL,
            "Params": Object_Extranet_Teacher_LearningTestPupilGroup.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for 
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_LearningTestPupilGroup.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for LearningTestPupilGroup
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_LearningTestPupilGroup.URL, objParams, "Post", fnCallback);
    }
};

export default Object_Extranet_Teacher_LearningTestPupilGroup;