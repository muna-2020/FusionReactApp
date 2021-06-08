import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Setting_ElementFormulaAttribute = {
    URL: "API/Object/Intranet/Setting/ElementFormulaAttribute",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Setting_ElementFormulaAttribute.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Setting_ElementFormulaAttribute", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_ElementFormulaAttribute", Object_Intranet_Setting_ElementFormulaAttribute);
        })
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_ElementFormulaAttribute.URL,
            "Params": Object_Intranet_Setting_ElementFormulaAttribute.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_ElementFormulaAttribute.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_ElementFormulaAttribute.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_ElementFormulaAttribute.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_ElementFormulaAttribute.URL, objParams, "Delete", fnCallback);
    }

    
};

export default Object_Intranet_Setting_ElementFormulaAttribute;
