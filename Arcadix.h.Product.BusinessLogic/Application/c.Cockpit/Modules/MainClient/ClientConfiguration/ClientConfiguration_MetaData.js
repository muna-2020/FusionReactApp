/**
 * @name GetAddEditMetaData
 * @summary it returns the array of add edit metadata
 * @returns {array} MetaData
 */
export const GetMetaData = () => {

    let arrHeaderData = [
        
        {
            "vColumnName": "vClientConfigurationName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClientConfig",
            "vTextResourceKey": "ClientConfigurationName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vClientIdentifier",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClientConfig",
            "vTextResourceKey": "ClientIdentifier",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vSecretKeyForToken",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClientConfig",
            "vTextResourceKey": "SecretKeyForToken",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vSecretKeyForEncryption",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClientConfig",
            "vTextResourceKey": "SecretKeyForEncryption",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: { "cIsDeleted": "N" },
        PrimaryKey: "iClientConfigurationId"    }

    return objMeta;

};