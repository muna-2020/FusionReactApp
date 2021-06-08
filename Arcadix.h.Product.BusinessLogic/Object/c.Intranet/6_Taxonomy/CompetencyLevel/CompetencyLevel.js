import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Taxonomy_CompetencyLevel = {
    URL: "API/Object/Intranet/Taxonomy/CompetencyLevel",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Taxonomy_CompetencyLevel.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Taxonomy_CompetencyLevel", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Taxonomy_CompetencyLevel", Object_Intranet_Taxonomy_CompetencyLevel);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Taxonomy_CompetencyLevel.URL,
            "Params": Object_Intranet_Taxonomy_CompetencyLevel.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CompetencyLevel.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CompetencyLevel.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CompetencyLevel.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CompetencyLevel.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Taxonomy_CompetencyLevel;
