import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name Object_Intranet_Taxonomy_FeedbackThresholdTopic
 * @summary This object consists of storing,initializing the params in store and have get,add,edit and delete function.
 * */
var Object_Intranet_Taxonomy_FeedbackThresholdTopic = {

    /**
     * @summary API URL
    **/
    URL: "API/Object/Intranet/Taxonomy/FeedbackThresholdTopic",

    /**
     * @summary Initializes Data
    **/
    InitialDataCallParam: null,

    /**
     * @name Initialize
     * @param {objParam} objParam passes objParam
     * @summary Initialize initial data call param and then adds the Class object to store
    **/
    Initialize: function (objParam) {
        Object_Intranet_Taxonomy_FeedbackThresholdTopic.InitialDataCallParam = objParam;
        ArcadixCacheData.GetData("Object_Intranet_Taxonomy_FeedbackThresholdTopic", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Intranet_Taxonomy_FeedbackThresholdTopic", Object_Intranet_Taxonomy_FeedbackThresholdTopic);
        });
    },

    /**
     * @name GetInitialDataCall
     * @summary Gets Initial data
     * @returns {object} Consists url,params,methodtype,usefullname
    **/
    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Taxonomy_FeedbackThresholdTopic.URL,
            "Params": Object_Intranet_Taxonomy_FeedbackThresholdTopic.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },


    /**
     * @name GetData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary GetData for Class
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_FeedbackThresholdTopic.URL, objParams, "Get", fnCallback);
    },

    /**
     * @name AddData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary AddData for Class
     */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_FeedbackThresholdTopic.URL, objParams, "Post", fnCallback);
    },

    /**
     * @name EditData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary EditData for Class
     */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_FeedbackThresholdTopic.URL, objParams, "Put", fnCallback);
    },

    /**
     * @name DeleteData
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary DeleteData for Class
     */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Taxonomy_FeedbackThresholdTopic.URL, objParams, "Delete", fnCallback);
    }
};

export default Object_Intranet_Taxonomy_FeedbackThresholdTopic;