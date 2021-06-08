import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Taxonomy_CompetencyRange = {
    URL: "API/Object/Intranet/Taxonomy/CompetencyRange",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Taxonomy_CompetencyRange.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Taxonomy_CompetencyRange", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Taxonomy_CompetencyRange", Object_Intranet_Taxonomy_CompetencyRange);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Taxonomy_CompetencyRange.URL,
            "Params": Object_Intranet_Taxonomy_CompetencyRange.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "Y" 
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CompetencyRange.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CompetencyRange.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CompetencyRange.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_CompetencyRange.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Taxonomy_CompetencyRange;
