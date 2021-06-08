//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Editor_TaskContent_CMSVideo
 * @summary CMSVideo object
 */
var Object_Editor_TaskContent_CMSVideo = {

    /**
     * @summary URL
     */
    URL: "API/Object/Editor/TaskContent/CMSVideo",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the CMSVideo object to store
     */
    Initialize: function (objParam) {
        Object_Editor_TaskContent_CMSVideo.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Editor_TaskContent_CMSVideo", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Editor_TaskContent_CMSVideo", Object_Editor_TaskContent_CMSVideo);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for CMSVideo
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_TaskContent_CMSVideo.URL,
            "Params": Object_Editor_TaskContent_CMSVideo.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for CMSVideo
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSVideo.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for CMSVideo
     */
    AddData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSVideo.URL, objParams, "Post", fnCallback, blnNoCache);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for CMSVideo
     */
    EditData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSVideo.URL, objParams, "Put", fnCallback, blnNoCache);
    }
};

export default Object_Editor_TaskContent_CMSVideo;