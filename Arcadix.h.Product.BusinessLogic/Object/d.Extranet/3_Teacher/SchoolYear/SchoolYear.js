//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_Teacher_SchoolYear
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 */
var Object_Extranet_Teacher_SchoolYear = {

    /**
     * @summary API URL
     **/
    URL: "API/Object/Extranet/Teacher/SchoolYear",
    
    /**
     * @summary Initializes Data
     **/
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
     * @name Initialize
     * @param {objParam} objParam passes objParam
     * @summary Initialize initial data call param and then adds the SchoolYear object to store
     */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_Teacher_SchoolYear.InitialDataCallParam = objParam;
        Object_Extranet_Teacher_SchoolYear.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_Teacher_SchoolYear", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_SchoolYear", Object_Extranet_Teacher_SchoolYear);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_SchoolYear.URL,
            "Params": Object_Extranet_Teacher_SchoolYear.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            //"IsInMemoryCache": "Y",
            "ReturnDataOnServerRender": Object_Extranet_Teacher_SchoolYear.ReturnDataOnServerRender
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for SchoolYear
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_SchoolYear.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary AddData for SchoolYear
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_SchoolYear.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for SchoolYear
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_SchoolYear.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for SchoolYear
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_SchoolYear.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_Teacher_SchoolYear;
