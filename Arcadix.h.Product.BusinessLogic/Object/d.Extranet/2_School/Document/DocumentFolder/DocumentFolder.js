//Helper classes.
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Object_Extranet_School_DocumentFolder
* @summary DocumentFolder object
*/
var Object_Extranet_School_DocumentFolder = {

    /**
     * @name URL
     * @summary Path to Server Side School DocumentFolder  object.
     */
    URL: "API/Object/Extranet/School/DocumentFolder",

    /**
    * @name InitialDataCallParam
    * @summary Holds the initial search params.
    */
    InitialDataCallParam: null,
    ReturnDataOnServerRender: "N",

    /**
    * @name Initialize
    * @param {objParam} objParam Passes objParam
    * @summary Initialize initial data call param and then adds the ExtranetTest object to store
    */
    Initialize: function (objParam, strReturnDataOnServerRender) {
        Object_Extranet_School_DocumentFolder.InitialDataCallParam = objParam;
        Object_Extranet_School_DocumentFolder.ReturnDataOnServerRender = strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N";
        ArcadixCacheData.GetData("Object_Extranet_School_DocumentFolder", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Extranet_School_DocumentFolder", Object_Extranet_School_DocumentFolder);
        });
    },

    /**
    * @name GetInitialDataCall
    * @summary GetInitialDataCall for DocumentFolder
    * @returns {object} InitialDataCall data object
    */
    GetInitialDataCall: function () {
        return {
            "URL": "API/Object/Extranet/School/DocumentFolder",
            "Params": Object_Extranet_School_DocumentFolder.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true,
            "IsMultiIndexData": "N",
            "ReturnDataOnServerRender": Object_Extranet_School_DocumentFolder.ReturnDataOnServerRender
        };
    },

    /**
    * @name GetData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary GetData for DocumentFolder
    */
    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_DocumentFolder.URL, objParams, "Get", fnCallback);
    },

    /**
    * @name AddData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary AddData for DocumentFolder
    */
    AddData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_DocumentFolder.URL, objParams, "Post", fnCallback);
    },

    /**
    * @name EditData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary EditData for DocumentFolder
    */
    EditData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_DocumentFolder.URL, objParams, "Put", fnCallback);
    },

    /**
    * @name DeleteData
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary DeleteData for DocumentFolder
    */
    DeleteData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Extranet_School_DocumentFolder.URL, objParams, "Delete", fnCallback);
    },

    /**
    * @name CopyPasteFolders
    * @param {objParams} objParams passes objParams
    * @param {callback} fnCallback callback function
    * @summary forms request object calls api using ArcadixFetchData.     
    */
    CopyPasteFolders: (objParams, fnCallback) => {
        let arrRequest = [
            {
                "URL": Object_Extranet_School_DocumentFolder.URL + '/CopyPasteFolders',
                "Params": objParams
            }
        ];

        ArcadixFetchData.Execute(arrRequest, fnCallback);
    }
};

export default Object_Extranet_School_DocumentFolder;