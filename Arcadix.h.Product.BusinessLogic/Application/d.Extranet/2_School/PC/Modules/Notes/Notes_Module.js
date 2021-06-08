//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Object_Extranet_School_Notes
* @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
*/
var Object_Extranet_School_Notes = {

    /**
     * @summary API URL 
     */
    URL: "API/Object/Extranet/School/Notes",

    /**
     * @summary Initializes Data 
     */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

   /**
    * @name Initialize
    * @param {objParam} objParam passes objParam
    * @summary Initialize initial data call param and then adds the Notes object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_School_Notes.InitialDataCallParam = objParam;
        Object_Extranet_School_Notes.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.AddEntityObject("Object_Extranet_School_Notes", Object_Extranet_School_Notes);
    },

    /**
     * @summary Gets Initial data
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Extranet_School_Notes.URL,
            "Params": Object_Extranet_School_Notes.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "ReturnDataOnServerRender": Object_Extranet_School_Notes.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for Notes
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_Notes.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary AddData for Notes
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_Notes.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for Notes
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_Notes.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary DeleteData for Notes
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_Notes.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Extranet_School_Notes;
