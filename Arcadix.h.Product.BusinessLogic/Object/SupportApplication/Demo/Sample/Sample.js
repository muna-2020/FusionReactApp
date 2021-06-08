import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Demo_Sample = {

    URL: "API/Object/Demo/Sample",

    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Demo_Sample.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Demo_Sample", Object_Demo_Sample);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Demo_Sample.URL,
            "Params": Object_Demo_Sample.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Demo_Sample.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Demo_Sample.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Demo_Sample.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Demo_Sample.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Demo_Sample;
