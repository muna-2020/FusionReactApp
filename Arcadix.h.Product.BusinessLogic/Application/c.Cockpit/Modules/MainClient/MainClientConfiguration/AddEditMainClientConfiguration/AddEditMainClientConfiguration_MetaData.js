/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iMainClientConfigurationId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vMainClientConfigurationName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vBasePhysicalPath",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "iTabId": "1"
        },
        {
            "vColumnName": "vPhysicalDataPath",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vPhysicalFileStreamingPath",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vApplicationCachingProvider",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "iTabId": "1"
        },
        {
            "vColumnName": "vCryptographyProvider",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "iApplicationCacheObjectResetInMinutes",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "1"
        },
        {
            "vColumnName": "vExtranetConnectionString",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vIntranetConnectionString",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        
        {
            "vColumnName": "vExtranetDatabaseName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vIntranetDatabaseName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vFrameworkServicesDatabaseName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "vFileHandlerProvider",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vTemplateResourcePath",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vProductManagementDatabaseName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vProductManagementConnectionString",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        }
    ];
};