//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Editor_TaskContent_CMSAudio
 * @summary CMSAudio object
 */
var Object_Editor_TaskContent_CMSAudio = {

    /**
     * @summary URL
     */
    URL: "API/Object/Editor/TaskContent/CMSAudio",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the CMSAudio object to store
     */
    Initialize: function (objParam) {
        Object_Editor_TaskContent_CMSAudio.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Editor_TaskContent_CMSAudio", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Editor_TaskContent_CMSAudio", Object_Editor_TaskContent_CMSAudio);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for CMSAudio
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_TaskContent_CMSAudio.URL,
            "Params": Object_Editor_TaskContent_CMSAudio.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for CMSAudio
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSAudio.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for CMSAudio
     */
    AddData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSAudio.URL, objParams, "Post", fnCallback, blnNoCache);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for CMSAudio
     */
    EditData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSAudio.URL, objParams, "Put", fnCallback, blnNoCache);
    }
};

export default Object_Editor_TaskContent_CMSAudio;