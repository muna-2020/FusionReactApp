//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Editor_TaskContent_CMSColorFill
 * @summary CMSColorFill object
 */
var Object_Editor_TaskContent_CMSColorFill = {

    /**
     * @summary URL
     */
    URL: "API/Object/Editor/TaskContent/CMSColorFill",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the CMSColorFill object to store
     */
    Initialize: function (objParam) {
        Object_Editor_TaskContent_CMSColorFill.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Editor_TaskContent_CMSColorFill", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Editor_TaskContent_CMSColorFill", Object_Editor_TaskContent_CMSColorFill);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for CMSColorFill
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_TaskContent_CMSColorFill.URL,
            "Params": Object_Editor_TaskContent_CMSColorFill.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for CMSColorFill
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSColorFill.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for CMSColorFill
     */
    AddData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSColorFill.URL, objParams, "Post", fnCallback, blnNoCache);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for CMSColorFill
     */
    EditData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSColorFill.URL, objParams, "Put", fnCallback, blnNoCache);
    }
};

export default Object_Editor_TaskContent_CMSColorFill;