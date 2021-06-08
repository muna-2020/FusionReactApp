import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Taxonomy_Category = {
    URL: "API/Object/Intranet/Taxonomy/Category",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Taxonomy_Category.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Taxonomy_Category", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Taxonomy_Category", Object_Intranet_Taxonomy_Category);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Taxonomy_Category.URL,
            "Params": Object_Intranet_Taxonomy_Category.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y"
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Category.URL, objParams, "Get", fnCallback); 
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Category.URL, objParams, "Post", fnCallback); 
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Category.URL, objParams, "Put", fnCallback); 
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_Category.URL, objParams, "Delete", fnCallback); 
    }
};

export default Object_Intranet_Taxonomy_Category;
