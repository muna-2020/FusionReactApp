//ArcadixCacheData service import
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

//ArcadixFetchAndCacheData service import
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Editor_TaskContent_CMSWiki
 * @summary module object for CMSWiki element.
 */
let Object_Editor_TaskContent_CMSWiki = {

    URL: "API/Object/Editor/TaskContent/CMSWiki",

    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Editor_TaskContent_CMSWiki.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Editor_TaskContent_CMSWiki", Object_Editor_TaskContent_CMSWiki);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_TaskContent_CMSWiki.URL,
            "Params": Object_Editor_TaskContent_CMSWiki.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSWiki.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSWiki.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSWiki.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_TaskContent_CMSWiki.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Editor_TaskContent_CMSWiki;
