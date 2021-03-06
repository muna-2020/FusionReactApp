import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Extranet_Pupil_PupilNews_Module = {

    /**
     * @name URL
     * @summary Path to Server Side Pupil News  object.
     */
    URL: "API/Extranet/Pupil/PupilNews_Module",

    /**
     * @name InitialDataCallParam
     * @summary Holds the initial search params.
     */
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @summary Sets the InitialDataCallParam by Recieved Params and puts the object into store.
     * @param {any} objParam
     */
    Initialize: function (objParam) {
        Extranet_Pupil_PupilNews_Module.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Extranet_Pupil_PupilNews_Module", Extranet_Pupil_PupilNews_Module);
    },

    /**
     * @name GetInitialDataCall
     * @summary returns initial request object
     * @returns {Object}
     * */
    GetInitialDataCall: function () {
        return {
            "URL": Extranet_Pupil_PupilNews_Module.URL,
            "Params": Extranet_Pupil_PupilNews_Module.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    /**
     * @name GetData
     * @summary To make get request.
     * */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Pupil_PupilNews_Module.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @summary To make add request.
     * */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Pupil_PupilNews_Module.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @summary To  save data.
     * */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Pupil_PupilNews_Module.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @summary To make delete request.
     * */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Extranet_Pupil_PupilNews_Module.URL, objParams, "Delete", fnCallback);
    }
};

export default Extranet_Pupil_PupilNews_Module;
