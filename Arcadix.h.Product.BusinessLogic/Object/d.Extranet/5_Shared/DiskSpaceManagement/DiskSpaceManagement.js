//Common functionality imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Extranet_Shared_DiskSpaceManagement
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
**/
var Object_Extranet_Shared_DiskSpaceManagement = {

    /**
    * @summary API URL
    **/
    URL: "API/Object/Extranet/Shared/DiskSpaceManagement",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam passes objParam
    * @summary Initialize initial data call param and then adds the School object to store
    **/
    Initialize: function (objParam) {
        Object_Extranet_Shared_DiskSpaceManagement.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Extranet_Shared_DiskSpaceManagement", Object_Extranet_Shared_DiskSpaceManagement);
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Shared_DiskSpaceManagement.URL,
            "Params": Object_Extranet_Shared_DiskSpaceManagement.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    GetDiskSpaceInfoForClass: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Object_Extranet_Shared_DiskSpaceManagement.URL + '/GetDiskSpaceInfoForClass',
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, fnCallback);
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for State
    */
    GetRealTimeInfo: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Object_Extranet_Shared_DiskSpaceManagement.URL + '/GetRealTimeInfo',
                "Params": objParams
            }
        ];
       ArcadixFetchData.Execute(arrRequest, fnCallback);
    }

};

export default Object_Extranet_Shared_DiskSpaceManagement;