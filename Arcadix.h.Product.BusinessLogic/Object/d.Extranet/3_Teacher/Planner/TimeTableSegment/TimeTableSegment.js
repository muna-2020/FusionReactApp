//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_Teacher_TimeTableSegment
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_Extranet_Teacher_TimeTableSegment = {

    /**
    * @summary API URL
    **/
    URL: "API/Object/Extranet/Teacher/TimeTableSegment",

    /**
     * @summary Initializes Data
     **/
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam passes objParam
    * @summary Initialize initial data call param and then adds the TimeTableSegment object to store
    **/
    Initialize: function (objParam) {
        Object_Extranet_Teacher_TimeTableSegment.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Extranet_Teacher_TimeTableSegment", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_TimeTableSegment", Object_Extranet_Teacher_TimeTableSegment);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_TimeTableSegment.URL,
            "Params": Object_Extranet_Teacher_TimeTableSegment.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for TimeTableSegment
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_TimeTableSegment.URL, objParams, "Get", fnCallback);
    },  

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for TimeTableSegment
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_TimeTableSegment.URL, objParams, "Put", fnCallback);
    }
};

export default Object_Extranet_Teacher_TimeTableSegment;