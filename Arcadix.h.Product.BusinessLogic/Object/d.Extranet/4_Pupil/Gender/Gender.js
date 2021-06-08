//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_Pupil_Gender
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_Extranet_Pupil_Gender = {
    /**
    * @summary API URL
    **/
    URL: "API/Object/Extranet/Pupil/Gender",

    /**
     * @summary Initializes Data
     **/
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam passes objParam
    * @summary Initialize initial data call param and then adds the Pupil object to store
    **/
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_Pupil_Gender.InitialDataCallParam = objParam;
        Object_Extranet_Pupil_Gender.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_Pupil_Gender", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Pupil_Gender", Object_Extranet_Pupil_Gender);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Pupil_Gender.URL,
            "Params": Object_Extranet_Pupil_Gender.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "IsInMemoryCache": "Y",
            "ReturnDataOnServerRender": Object_Extranet_Pupil_Gender.ReturnDataOnServerRender
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for Class
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Pupil_Gender.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Extranet_Pupil_Gender;
