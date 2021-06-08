//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';


/**
* @name Editor_TaskContent_CMSAudioAddEdit_Module
* @summary CMSAudioAddEdit_Module object
*/
var Editor_TaskContent_CMSAudioAddEdit_Module = {

    /**
    * @summary URL
    */
    URL: "API/Editor/TaskContent/CMSAudioAddEdit_Module",

    /**
    * @summary InitialDataCallParam
    */
    InitialDataCallParam: null,

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the audioaddedit object to store
    */
    Initialize: function (objParam) {
        Editor_TaskContent_CMSAudioAddEdit_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Editor_TaskContent_CMSAudioAddEdit_Module", Editor_TaskContent_CMSAudioAddEdit_Module);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for audioaddedit
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Editor_TaskContent_CMSAudioAddEdit_Module.URL,
            "Params": Editor_TaskContent_CMSAudioAddEdit_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary GetData for audioaddedit
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Editor_TaskContent_CMSAudioAddEdit_Module.URL, objParams, "Get", fnCallback, true);
    }
};

export default Editor_TaskContent_CMSAudioAddEdit_Module;