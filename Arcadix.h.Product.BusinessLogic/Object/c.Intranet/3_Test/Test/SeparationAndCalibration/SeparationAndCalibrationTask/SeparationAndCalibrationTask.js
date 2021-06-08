//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Intranet_Test_SeparationAndCalibrationTask
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Intranet_Test_SeparationAndCalibrationTask = {
    /**
    * @summary API URL
    **/
    URL: "API/Object/Intranet/Test/SeparationAndCalibrationTask",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the SeparationAndCalibrationTask object to store
     */
    Initialize: function (objParam) {
        Object_Intranet_Test_SeparationAndCalibrationTask.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Test_SeparationAndCalibrationTask", Object_Intranet_Test_SeparationAndCalibrationTask);
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for SeparationAndCalibrationTask
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Test_SeparationAndCalibrationTask.URL,
            "Params": Object_Intranet_Test_SeparationAndCalibrationTask.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for SeparationAndCalibrationTask
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_SeparationAndCalibrationTask.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData for SeparationAndCalibrationTask
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_SeparationAndCalibrationTask.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for SeparationAndCalibrationTask
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Test_SeparationAndCalibrationTask.URL, objParams, "Put", fnCallback);
    }   
};

export default Object_Intranet_Test_SeparationAndCalibrationTask;