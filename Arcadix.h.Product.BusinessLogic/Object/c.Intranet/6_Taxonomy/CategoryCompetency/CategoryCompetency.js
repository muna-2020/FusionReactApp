import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Taxonomy_CategoryCompetency = {
    URL: "API/Object/Intranet/Taxonomy/CategoryCompetency",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Taxonomy_CategoryCompetency.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Taxonomy_CategoryCompetency", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Taxonomy_CategoryCompetency", Object_Intranet_Taxonomy_CategoryCompetency);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Taxonomy_CategoryCompetency.URL,
            "Params": Object_Intranet_Taxonomy_CategoryCompetency.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CategoryCompetency.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CategoryCompetency.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CategoryCompetency.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CategoryCompetency.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Taxonomy_CategoryCompetency;
