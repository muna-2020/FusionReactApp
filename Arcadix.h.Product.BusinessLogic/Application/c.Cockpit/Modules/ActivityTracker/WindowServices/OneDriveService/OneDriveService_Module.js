var Framework_Services_FileHandler_OneDriveFileMapping = {

    /**
     * @summary URL
     */
    URL: "API/Framework/Services/FileHandler/OneDriveFileMapping",

    /**
      * @name GetData
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for ArcadixAppPool
      */
    GetData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle(Framework_Services_FileHandler_OneDriveFileMapping.URL, objParams, "Get", fnCallback);
    }
};

export default Framework_Services_FileHandler_OneDriveFileMapping;