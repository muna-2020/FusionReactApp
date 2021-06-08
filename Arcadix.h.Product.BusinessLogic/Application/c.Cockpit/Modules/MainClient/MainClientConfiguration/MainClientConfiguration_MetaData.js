/**
 * @name GetMetaData
 * @summary it returns the array of Meta Data
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vMainClientConfigurationName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "MainClientConfigurationName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vBasePhysicalPath",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "BasePhysicalPath",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vPhysicalDataPath",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "PhysicalDataPath",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vPhysicalFileStreamingPath",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "PhysicalFileStreamingPath",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vApplicationCachingProvider",
            "vDataType": "number",
            "iDisplayOrder": 6,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "ApplicationCachingProvider",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vCryptographyProvider",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "CryptographyProvider",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iApplicationCacheObjectResetInMinutes",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "ApplicationCacheObjectResetInMinutes",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vExtranetConnectionString",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "ExtranetConnectionString",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vIntranetConnectionString",
            "vDataType": "string",
            "iDisplayOrder": 10,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "IntranetConnectionString",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vExtranetDatabaseName",
            "vDataType": "string",
            "iDisplayOrder": 12,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "ExtranetDatabaseName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vIntranetDatabaseName",
            "vDataType": "string",
            "iDisplayOrder": 13,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "IntranetDatabaseName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFrameworkServicesDatabaseName",
            "vDataType": "string",
            "iDisplayOrder": 14,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "FrameworkServicesDatabaseName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFileHandlerProvider",
            "vDataType": "string",
            "iDisplayOrder": 25,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "FileHandlerProvider",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTemplateResourcePath",
            "vDataType": "string",
            "iDisplayOrder": 26,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "TemplateResourcePath",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vProductManagementDatabaseName",
            "vDataType": "string",
            "iDisplayOrder": 20,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "ProductManagementDatabaseName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vProductManagementConnectionString",
            "vDataType": "string",
            "iDisplayOrder": 20,
            "vTextResourcePage": "MainClientConfiguration",
            "vTextResourceKey": "ProductManagementConnectionString",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: { "cIsDeleted": "N" },
        PrimaryKey: "iMainClientConfigurationId"
    };
    return objMeta;
};