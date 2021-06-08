//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name Editor_TaskContent_CMSColorFillAddEdit_Module
* @summary CMSColorFillAddEdit_Module object
*/
var Editor_TaskContent_CMSColorFillAddEdit_Module = {

    /**
    * @summary URL
    */
    URL: "API/Editor/TaskContent/CMSColorFillAddEdit_Module",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the ColorFill add edit object to store
    */
    Initialize: function (objParam) {
        Editor_TaskContent_CMSColorFillAddEdit_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Editor_TaskContent_CMSColorFillAddEdit_Module", Editor_TaskContent_CMSColorFillAddEdit_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for ColorFilladdedit
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Editor_TaskContent_CMSColorFillAddEdit_Module.URL,
            "Params": Editor_TaskContent_CMSColorFillAddEdit_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for ColorFillAddEdit
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixCacheData()).ExecuteSingle(Editor_TaskContent_CMSColorFillAddEdit_Module.URL, objParams, "Get", fnCallback, true);
    },
    SaveData: () => {

    },

    SaveColorFillDetails: (objColorFillDetails) => {
        const URL = "API/Editor/TaskContent/SaveColorFill"
        return ArcadixFetchData.ExecuteCustom(URL, "POST", objColorFillDetails);
    }
};

export default Editor_TaskContent_CMSColorFillAddEdit_Module;