//ArcadixCacheData service import
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

//ArcadixFetchAndCacheData service import
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Editor_TaskContent_MultiMediaManagement_Module
 * @summary Editor_TaskContent_MultiMediaManagement_Module object
 */
let Editor_TaskContent_MultiMediaManagement_Module = {

    URL: null,

    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @param {string} MediaType Audio/Video/Image/Document
     * @summary Initialize initial data call param and then adds the respective media tree object to store
     */
    Initialize: function (objParam, MediaType) {
        Editor_TaskContent_MultiMediaManagement_Module.InitialDataCallParam = objParam;
        Editor_TaskContent_MultiMediaManagement_Module.URL = `API/Editor/TaskContent/CMS${MediaType}AddEdit_Module`;
        ArcadixCacheData.AddEntityObject(`Editor_TaskContent_CMS${MediaType}AddEdit_Module`, Editor_TaskContent_MultiMediaManagement_Module);
    },

    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall 
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {
        return {
            "URL": Editor_TaskContent_MultiMediaManagement_Module.URL,
            "Params": Editor_TaskContent_MultiMediaManagement_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @param {object} objParams Call params
     * @param {string} strMediaType Media Type
     * @param {function} fnCallback callback for the result
     * @summary Makes an API call to get tree data.
     */
    GetData: (objParams, strMediaType, fnCallback) => {
        let strUrl = `API/Editor/TaskContent/CMS${strMediaType}AddEdit_Module`;
        new ArcadixFetchAndCacheData().ExecuteSingle(strUrl, objParams, "Get", fnCallback);
    },

    /**
     * @name GetData_Custom
     * @param {object} objParams Call params
     * @param {string} strMediaType Media Type
     * @param {function} fnCallback callback for the result
     * @summary Makes an API call to get tree data.
     * @returns {any} Promise
     */
    GetData_Custom: (objParams, strMediaType, fnCallback) => {
        let strUrl = `API/Editor/TaskContent/CMS${strMediaType}AddEdit_Module`;
        let strKey = `Editor_TaskContent_CMS${strMediaType}AddEdit_Module`;
        return new Promise((resolve, reject) => {
            new ArcadixFetchAndCacheData().ExecuteSingle(strUrl, objParams, "Get", (objReturn) => { 
                if(objReturn[strKey]["Count"] > 0)
                {
                    resolve(objReturn[strKey]["Data"]);
                }
                else
                {
                    resolve(null);
                }
            }, true);
        });
    }
};

export default Editor_TaskContent_MultiMediaManagement_Module;
