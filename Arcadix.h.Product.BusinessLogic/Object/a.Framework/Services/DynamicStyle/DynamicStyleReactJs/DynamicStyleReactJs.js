import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

var Object_Framework_Services_DynamicStyleReactJs = {

    /**
     * @summary URL
     */
    URL: "API/Object/Framework/Services/DynamicStyleReactJs",
    
    /**
     * @summary InitialDataCallParam
     */
    InitialDataCallParam: null,
        
    /**
     * @name Initialize
     * @param {objParam} objParam Passes objParam
     * @summary Initialize initial data call param and then adds the DynamicStyleReactJs object to store
     */
    Initialize: function (arrResourceParams) {
        if (arrResourceParams.length > 0 && JConfiguration.IsLoadDynamicCssLinks !== "Y") {
            let arrQueries = arrResourceParams.map(objFilePath => {
                return {
                    "match": {
                        "_id": objFilePath.substring(objFilePath.indexOf("Theme") + 7)
                    }
                }
            });

            let objParam = {
                "SearchQuery": {
                    "should": arrQueries
                }
            };

            Object_Framework_Services_DynamicStyleReactJs.InitialDataCallParam = objParam;
            ArcadixCacheData.GetData("Object_Framework_Services_DynamicStyleReactJs", (objDataObject) => {
                if (!objDataObject.Initialize)
                    ArcadixCacheData.AddEntityObject("Object_Framework_Services_DynamicStyleReactJs", Object_Framework_Services_DynamicStyleReactJs);
            })
        }
    },
        
    /**
     * @name GetInitialDataCall
     * @summary GetInitialDataCall for DynamicStyleReactJs
     * @returns {object} InitialDataCall data object
     */
    GetInitialDataCall: function () {       
        return {
            "URL": Object_Framework_Services_DynamicStyleReactJs.URL,
            "Params": Object_Framework_Services_DynamicStyleReactJs.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "blnSyncData": false,
            "IsMultiIndexData": "N",
            "ReturnDataOnServerRender": "N"
        };
    },
};

export default Object_Framework_Services_DynamicStyleReactJs;
