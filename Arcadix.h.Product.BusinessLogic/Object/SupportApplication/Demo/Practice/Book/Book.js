import TestDriveCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import TestDriveFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_SupportApplication_Demo_Book = {

    URL: "API/Object/SupportApplication/Demo/Book",

    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_SupportApplication_Demo_Book.InitialDataCallParam = objParam;
        TestDriveCacheData.AddEntityObject("Object_SupportApplication_Demo_Book", Object_SupportApplication_Demo_Book);    
    },

    GetInitialDataCall: function(){
        return {
            "URL": Object_SupportApplication_Demo_Book.URL,
            "Params": Object_SupportApplication_Demo_Book.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {        
        (new TestDriveFetchAndCacheData()).ExecuteSingle(Object_SupportApplication_Demo_Book.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        (new TestDriveFetchAndCacheData()).ExecuteSingle(Object_SupportApplication_Demo_Book.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        (new TestDriveFetchAndCacheData()).ExecuteSingle(Object_SupportApplication_Demo_Book.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {       
        (new TestDriveFetchAndCacheData()).ExecuteSingle(Object_SupportApplication_Demo_Book.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_SupportApplication_Demo_Book;
