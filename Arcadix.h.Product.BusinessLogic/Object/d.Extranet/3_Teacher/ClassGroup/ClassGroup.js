//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Extranet_Teacher_Class
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 **/
var Object_Extranet_Teacher_ClassGroup = {

    /**
    * @summary API URL
    **/
    URL: "API/Object/Extranet/Teacher/ClassGroup",

    /**
    * @summary Initializes Data
    **/
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
     * @name Initialize
     * @param {objParam} objParam passes objParam
     * @summary Initialize initial data call param and then adds the Class object to store
     **/
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_Teacher_ClassGroup.InitialDataCallParam = objParam;
        Object_Extranet_Teacher_ClassGroup.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_Teacher_ClassGroup", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_Teacher_ClassGroup", Object_Extranet_Teacher_ClassGroup);
        });
    },


    /**
    * @name GetInitialDataCall
    * @summary Gets Initial data
    * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_Teacher_ClassGroup.URL,
            "Params": Object_Extranet_Teacher_ClassGroup.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            "IsInMemoryCache": "Y",
            "ReturnDataOnServerRender": Object_Extranet_Teacher_ClassGroup.ReturnDataOnServerRender
        };
    },
    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for ClassGroup
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_ClassGroup.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary AddData for ClassGroup
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_ClassGroup.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for ClassGroup
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_Teacher_ClassGroup.URL, objParams, "Put", fnCallback);
    }
};

export default Object_Extranet_Teacher_ClassGroup;
