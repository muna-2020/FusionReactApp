//ArcadixCacheData service import
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

//ArcadixFetchAndCacheData service import
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Editor_OfficeRibbon_Clipart
 * @summary Entity object for clipart
 * */
let Object_Editor_OfficeRibbon_Clipart = {

    /**
     * @summary URL
     */
    URL: "API/Object/Editor/OfficeRibbon/Clipart",

    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the Subject object to store
     */
    Initialize: function (objParam) {
        Object_Editor_OfficeRibbon_Clipart.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Editor_OfficeRibbon_Clipart", Object_Editor_OfficeRibbon_Clipart);
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for Subject
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": Object_Editor_OfficeRibbon_Clipart.URL,
            "Params": Object_Editor_OfficeRibbon_Clipart.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
        };
    },

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary GetData for Subject
     */
    GetData: function () {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Editor_OfficeRibbon_Clipart.URL, objParams, "Get");
    }
};

export default Object_Editor_OfficeRibbon_Clipart;
