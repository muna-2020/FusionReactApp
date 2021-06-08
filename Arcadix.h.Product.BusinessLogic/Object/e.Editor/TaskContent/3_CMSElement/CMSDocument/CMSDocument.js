//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Editor_TaskContent_CMSDocument
 * @summary CMSDocument object
 */
var Object_Editor_TaskContent_CMSDocument = {

    /**
     * @summary URL
     */
    URL: "API/Object/Editor/TaskContent/CMSDocument",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the CMSDocument object to store
     */
    Initialize: function (objParam) {
        Object_Editor_TaskContent_CMSDocument.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Editor_TaskContent_CMSDocument", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Editor_TaskContent_CMSDocument", Object_Editor_TaskContent_CMSDocument);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for CMSDocument
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_TaskContent_CMSDocument.URL,
            "Params": Object_Editor_TaskContent_CMSDocument.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for CMSDocument
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSDocument.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for CMSDocument
     */
    AddData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSDocument.URL, objParams, "Post", fnCallback, blnNoCache);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for CMSDocument
     */
    EditData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSDocument.URL, objParams, "Put", fnCallback, blnNoCache);
    }
};

export default Object_Editor_TaskContent_CMSDocument;