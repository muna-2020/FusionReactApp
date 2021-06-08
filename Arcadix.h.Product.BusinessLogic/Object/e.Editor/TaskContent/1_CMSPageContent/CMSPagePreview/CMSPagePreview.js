//ArcadixCacheData service import
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

//ArcadixFetchAndCacheData service import
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Editor_TaskContent_CMSPagePreview
 * @summary Object_Editor_TaskContent_CMSPagePreview
 * */
let Object_Editor_TaskContent_CMSPagePreview = {

    URL: "API/Object/Editor/TaskContent/CMSPagePreview",

    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Editor_TaskContent_CMSPagePreview.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Editor_TaskContent_CMSPagePreview", Object_Editor_TaskContent_CMSPagePreview);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_TaskContent_CMSPagePreview.URL,
            "Params": Object_Editor_TaskContent_CMSPagePreview.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to get page preview details.
     * @returns {any} Promise
     */
    GetData: (objParams, fnCallback) => {
        let iLanguageId = objParams["SearchQuery"]["must"][0]["match"]["iLanguageId"];
        let vPreviewKey = objParams["SearchQuery"]["must"][1]["match"]["vPreviewKey"];
        return new Promise((resolve, reject) => {
            new ArcadixFetchAndCacheData().ExecuteSingle(Object_Editor_TaskContent_CMSPagePreview.URL, objParams, "Get", (objReturn) => { 
                if (objReturn["Object_Editor_TaskContent_CMSPagePreview;iLanguageId;" + iLanguageId + ";vPreviewKey;" + vPreviewKey]["Data"].length > 0) {
                    resolve(objReturn["Object_Editor_TaskContent_CMSPagePreview;iLanguageId;" + iLanguageId + ";vPreviewKey;" + vPreviewKey]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            }, true);
        });
    },

    /**
     * @name AddData
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to add a new page preview.
     * @returns {any} Promise
     */
    AddData: (objParams, fnCallback) => {
        return new Promise((resolve, reject) => {
            new ArcadixFetchAndCacheData().ExecuteSingle(Object_Editor_TaskContent_CMSPagePreview.URL, objParams, "Post", (arrReturn) => {
                if (arrReturn.length > 0) {
                    resolve(arrReturn[0]);
                }
                else {
                    resolve(null);
                }
            }, true);
        });
    }
};

export default Object_Editor_TaskContent_CMSPagePreview;
