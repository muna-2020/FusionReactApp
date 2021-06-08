//ArcadixCacheData service import
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

//ArcadixFetchAndCacheData service import
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//ArcadixFetchData imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Editor_TaskContent_MultiMediaManagement_Module
 * @summary Editor_TaskContent_MultiMediaManagement_Module object
 */
let Object_Editor_TaskContent_CMSElement = {

    URL: "API/Object/Editor/TaskContent/CMSElement",

    InitialDataCallParam: null,

    Initialize: function (objParam) {
        Object_Editor_TaskContent_CMSElement.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Editor_TaskContent_CMSElement", Object_Editor_TaskContent_CMSElement);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_TaskContent_CMSElement.URL,
            "Params": Object_Editor_TaskContent_CMSElement.InitialDataCallParam,
            "MethodType": "Get"
        };
    },

    GetData: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteSingle(Object_Editor_TaskContent_CMSElement.URL, objParams, "Get", fnCallback);
    },

    AddData: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteSingle(Object_Editor_TaskContent_CMSElement.URL, objParams, "Post", fnCallback);
    },

    EditData: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteSingle(Object_Editor_TaskContent_CMSElement.URL, objParams, "Put", fnCallback);
    },

    DeleteData: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteSingle(Object_Editor_TaskContent_CMSElement.URL, objParams, "Delete", fnCallback);
    },

    GetElements: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteCustom(Object_Editor_TaskContent_CMSElement.URL + "/GetElements", objParams, "Get", fnCallback);
    },

    GetElementFolderDetails: (objParams, fnCallback) => {
        new ArcadixFetchAndCacheData().ExecuteCustom(Object_Editor_TaskContent_CMSElement.URL + "/GetElementFolderDetails_New", objParams, "Get", fnCallback);
    },

    SaveElementFolderDetails: (objParams, fnCallback) => {
        let arrParams = [
            {
                "URL": Object_Editor_TaskContent_CMSElement.URL + "/SaveElementFolderDetails",
                "Params": objParams
            }
        ];
        return new Promise((resolve, reject) => {
            ArcadixFetchData.Execute(arrParams, (objReturn) => {
                if (objReturn["cmselementfolder"]["Data"].length > 0) {
                    resolve(objReturn["cmselementfolder"]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            });
        });
    },

    GetLinkedElementPageDetails: (objParams, fnCallback) => {
        let arrParams = [
            {
                "URL": Object_Editor_TaskContent_CMSElement.URL + "/GetLinkedPageDetails",
                "Params": objParams
            }
        ];
        return new Promise((resolve, reject) => {
            ArcadixFetchData.Execute(arrParams, (objReturn) => {
                if (objReturn["LinkedPageDetails"]["Data"]) {
                    resolve(objReturn["LinkedPageDetails"]["Data"]);
                    ArcadixCacheData.AddEntityObject(`Object_Editor_TaskContent_CMSElement_LinkedPageDetails;ielementid;${objParams["iElementId"]}`, objReturn["LinkedPageDetails"]);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
};

export default Object_Editor_TaskContent_CMSElement;
