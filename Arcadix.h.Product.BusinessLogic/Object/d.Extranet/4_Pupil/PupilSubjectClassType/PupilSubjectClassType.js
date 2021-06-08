//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_Pupil_PupilSubjectClassType
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_Extranet_Pupil_PupilSubjectClassType = {

    /**
     * @summary URL
    */
    URL: "API/Object/Extranet/Pupil/PupilSubjectClassType",

    /**
     * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the object to store
    */
    Initialize: function (objParam) {
        Object_Extranet_Pupil_PupilSubjectClassType.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_Pupil_PupilSubjectClassType", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Pupil_PupilSubjectClassType", Object_Extranet_Pupil_PupilSubjectClassType);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for Subject
     * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Pupil_PupilSubjectClassType.URL,
            "Params": Object_Extranet_Pupil_PupilSubjectClassType.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData method
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Pupil_PupilSubjectClassType.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary AddData method
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Pupil_PupilSubjectClassType.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData method
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Pupil_PupilSubjectClassType.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary DeleteData method
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Pupil_PupilSubjectClassType.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_Pupil_PupilSubjectClassType;
