/**
* @name GetMetaData
* @summary it returns the array of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData =  [        
        {
            "vColumnName": "dtDateTime",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "RedisDataLogs",
            "vTextResourceKey": "DateTime",
            "vControlType": "datetime",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": 25,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vUrl",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "RedisDataLogs",
            "vTextResourceKey": "Url",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": 50,
            //"cShowLess":"Y",
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vBrowser",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "RedisDataLogs",
            "vTextResourceKey": "Browser",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": 50,
            //"cShowLess": "Y",
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vMessage",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "RedisDataLogs",
            "vTextResourceKey": "Message",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": 50,
            "cShowLess": "Y",
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "vDescription",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "RedisDataLogs",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": 50,
            "cShowLess": "Y",
            "cShowMultiLanguage": "N"
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uLogGuid",
    };
    return objMeta;
};