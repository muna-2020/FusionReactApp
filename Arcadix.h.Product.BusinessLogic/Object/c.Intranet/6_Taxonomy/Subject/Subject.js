//Common functionality imports
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/** @CodeTracerStart Subject_SubjectGrid_78 */
/**
 * @name Object_Intranet_Taxonomy_Subject
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_Intranet_Taxonomy_Subject = {

    /**
    * @summary URL
    */
    URL: "API/Object/Intranet/Taxonomy/Subject",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender:"N",
    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the Subject object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Intranet_Taxonomy_Subject.InitialDataCallParam = objParam;
        Object_Intranet_Taxonomy_Subject.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Intranet_Taxonomy_Subject", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Taxonomy_Subject", Object_Intranet_Taxonomy_Subject);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Subject
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Taxonomy_Subject.URL,
            "Params": Object_Intranet_Taxonomy_Subject.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y",
            //"IsInMemoryCache": "Y",
            "ReturnDataOnServerRender": Object_Intranet_Taxonomy_Subject.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for Subject
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Subject.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary AddData for Subject
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Subject.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary EditData for Subject
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Subject.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary DeleteData for Subject
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Subject.URL, objParams, "Delete", fnCallback);
    },
    
    /**
    * @name GetData_Custom
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData is a custom method which returns the data in the promise.
    * @returns {promise} promise
    */
    GetData_Custom: (objParams, fnCallback) => {
        return new Promise((resolve, reject) => {
            new ArcadixFetchAndCacheData().ExecuteSingle(Object_Intranet_Taxonomy_Subject.URL, objParams, "Get", (objReturn) => {
                if(objReturn["Object_Intranet_Taxonomy_Subject"]["Count"] > 1)
                {
                    resolve(objReturn["Object_Intranet_Taxonomy_Subject"]["Data"]);
                }
                else
                {
                    resolve(null);
                }
            }, true);
        });
    }
};
/** @CodeTracerEnd Subject_SubjectGrid_78 */

export default Object_Intranet_Taxonomy_Subject;