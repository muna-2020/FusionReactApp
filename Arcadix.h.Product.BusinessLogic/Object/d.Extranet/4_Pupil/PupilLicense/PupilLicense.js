//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_Pupil_PupilLicense
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_Extranet_Pupil_PupilLicense = {

    /**
     * @summary URL
    */
    URL: "API/Object/Extranet/Pupil/PupilLicense",

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
        Object_Extranet_Pupil_PupilLicense.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_Pupil_PupilLicense", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Pupil_PupilLicense", Object_Extranet_Pupil_PupilLicense);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for Subject
     * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Pupil_PupilLicense.URL,
            "Params": Object_Extranet_Pupil_PupilLicense.InitialDataCallParam,
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
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Pupil_PupilLicense.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Extranet_Pupil_PupilLicense;
