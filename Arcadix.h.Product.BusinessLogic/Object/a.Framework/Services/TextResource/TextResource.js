import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Framework_Services_TextResource = {

    /**
     * @summary URL
     */
    URL: "API/Object/Framework/Services/TextResource",

    InitialDataCallParam: null,
    Initialize: function (arrResourceParams, strReturnDataOnServerRender) {
     
        let arrInitialCalls = arrResourceParams.map(objFilePath => {
            let objResourceParams = {
                "SearchQuery": {
                    "must": [{
                        "match": {
                            "Id": JConfiguration.LanguageCultureInfo + objFilePath
                        }
                    }]
                }
            }
            return { SearchParams: objResourceParams, ReturnDataOnServerRender: strReturnDataOnServerRender != undefined ? strReturnDataOnServerRender : "N" }
        });

        Object_Framework_Services_TextResource.InitialDataCallParam = arrInitialCalls;
        ArcadixCacheData.GetData("Object_Framework_Services_TextResource", (objDataObject) => {
            if (!objDataObject.Initialize)
                ArcadixCacheData.AddEntityObject("Object_Framework_Services_TextResource", Object_Framework_Services_TextResource);
        }) 
        
    },

    InitializeDataReturnWithSSR: function (arrResourceParams) {
        let arrInitialCalls = arrResourceParams.map(objFile => {
            let objResourceParams = {
                SearchParams: {
                    "SearchQuery": {
                        "must": [{
                            "match": {
                                "Id": JConfiguration.LanguageCultureInfo + objFile.FilePath
                            }
                        }]
                    }
                },
                ReturnDataOnServerRender: objFile.ReturnDataOnServerRender
            }
            return objResourceParams
        });

        Object_Framework_Services_TextResource.InitialDataCallParam = arrInitialCalls;
        ArcadixCacheData.AddEntityObject("Object_Framework_Services_TextResource", Object_Framework_Services_TextResource);
    },

    GetInitialDataCall: function () {
        let arrReturn = Object_Framework_Services_TextResource.InitialDataCallParam.map(objCall => {
            return {
                "URL": Object_Framework_Services_TextResource.URL,
                "Params": objCall.SearchParams != undefined ? objCall.SearchParams : objCall,
                "MethodType": "Get",
                "UseFullName": true,
                "blnSyncData": false,
                "IsMultiIndexData": "N",
                "IsInMemoryCache":"Y",
                "ReturnDataOnServerRender": objCall.ReturnDataOnServerRender != undefined ? objCall.ReturnDataOnServerRender : "N"
            }
        });
        return arrReturn;
    },

    GetData: (strParams, props) => {
        let strModuleName = strParams.split("/")[strParams.split("/").length - 1];
        if (props.Object_Framework_Services_TextResource) {
            return DataRef(props.Object_Framework_Services_TextResource, "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + strParams) ?
                DataRef(props.Object_Framework_Services_TextResource, "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + strParams).Data["0"][strModuleName]
                : null;
        }
        else {
            return props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + strParams] ?
                props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + strParams].Data["0"][strModuleName]
                : null;
        }
    }
};

export default Object_Framework_Services_TextResource;
