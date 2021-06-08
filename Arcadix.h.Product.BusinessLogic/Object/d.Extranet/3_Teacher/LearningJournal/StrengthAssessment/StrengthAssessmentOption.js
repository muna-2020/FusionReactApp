//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_Teacher_StrengthAssessmentOption
* @summary Object_Extranet_Teacher_StrengthAssessmentOption object
*/
var Object_Extranet_Teacher_StrengthAssessmentOption = {

    URL: "API/Object/Extranet/Teacher/StrengthAssessmentOption",
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the StrengthAssessmentOption object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_Teacher_StrengthAssessmentOption.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_Teacher_StrengthAssessmentOption", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_StrengthAssessmentOption", Object_Extranet_Teacher_StrengthAssessmentOption);
        });
    },


    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for StrengthAssessmentOption
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": "API/Object/Extranet/Teacher/StrengthAssessmentOption",
            "Params": Object_Extranet_Teacher_StrengthAssessmentOption.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for StrengthAssessmentOption;
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_TimeTableClassTime.URL, objParams, "Get", fnCallback);
    },
    
    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for StrengthAssessmentOption;
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_TimeTableClassTime.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for StrengthAssessmentOption;
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_TimeTableClassTime.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for StrengthAssessmentOption;
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_TimeTableClassTime.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_Teacher_StrengthAssessmentOption;