import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Taxonomy_Intermediate = {
    URL: "API/Object/Intranet/Taxonomy/Intermediate",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Taxonomy_Intermediate.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Taxonomy_Intermediate", Object_Intranet_Taxonomy_Intermediate);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Taxonomy_Intermediate.URL,
            "Params": Object_Intranet_Taxonomy_Intermediate.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Intermediate.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Intermediate.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Intermediate.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Intermediate.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Taxonomy_Intermediate;
