import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

var Object_Framework_Services_DynamicStyleReactNative = {

    /**
    * @summary URL
   */
    URL: "API/Object/Framework/Services/DynamicStyleReactNative",

    /**
     * @name GetData
     * @param {objParams} objParams Passes objParams
     * @param {fnCallback} fnCallback Callback function
     * @summary Gets data for DynamicStyleReactNative
     */
    GetData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom(Object_Framework_Services_DynamicStyleReactNative.URL, "Post", objParams)
            .then(objResponse => objResponse.json())
            .then(objJson => fnCallback(objJson)
        );
    }
};

export default Object_Framework_Services_DynamicStyleReactNative;
