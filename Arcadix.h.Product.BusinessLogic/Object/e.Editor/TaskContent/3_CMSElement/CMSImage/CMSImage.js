//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_TaskContent_CMSElement_CMSImage
 * @summary CMSImage object
 */
var Object_TaskContent_CMSElement_CMSImage = {

    /**
     * @summary URL
     */
    URL: "API/Object/Editor/TaskContent/CMSImage",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the CMSImage object to store
     */
    Initialize: function (objParam) {
        Object_TaskContent_CMSElement_CMSImage.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_TaskContent_CMSElement_CMSImage", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_TaskContent_CMSElement_CMSImage", Object_TaskContent_CMSElement_CMSImage);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for CMSImage
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Object_TaskContent_CMSElement_CMSImage.URL,
            "Params": Object_TaskContent_CMSElement_CMSImage.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for CMSImage
     */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_TaskContent_CMSElement_CMSImage.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
     * @summary AddData for CMSImage
     */
    AddData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_TaskContent_CMSElement_CMSImage.URL, objParams, "Post", fnCallback, blnNoCache);
    },

    /**
     * @name EditData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary EditData for CMSImage
     */
    EditData: (objParams, fnCallback, blnNoCache = false) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_TaskContent_CMSElement_CMSImage.URL, objParams, "Put", fnCallback, blnNoCache);
    }
};

export default Object_TaskContent_CMSElement_CMSImage;