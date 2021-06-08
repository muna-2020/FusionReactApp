//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Test_SeparationAndCalibrationGroup
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Intranet_Test_SeparationAndCalibrationGroup = {
/**
* @summary API URL
**/
    URL: "API/Object/Intranet/Test/SeparationAndCalibrationGroup",

/**
* @summary Initializes Data
**/
    InitialDataCallParam: null,
    
    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the SeparationAndCalibrationGroup object to store
     */
    Initialize: function (objParam) {
        Object_Intranet_Test_SeparationAndCalibrationGroup.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Test_SeparationAndCalibrationGroup", Object_Intranet_Test_SeparationAndCalibrationGroup);
    },
    
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for SeparationAndCalibrationGroup
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_SeparationAndCalibrationGroup.URL,
            "Params": Object_Intranet_Test_SeparationAndCalibrationGroup.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },
    
    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for SeparationAndCalibrationGroup
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_SeparationAndCalibrationGroup.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData for SeparationAndCalibrationGroup
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_SeparationAndCalibrationGroup.URL, objParams, "Post", fnCallback);
    },
    
    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for SeparationAndCalibrationGroup
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_SeparationAndCalibrationGroup.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData for SeparationAndCalibrationGroup
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_SeparationAndCalibrationGroup.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Test_SeparationAndCalibrationGroup;
