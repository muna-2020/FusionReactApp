/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vClientName",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Client",
            "vTextResourceKey": "ClientName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iClientConfigurationId",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Client",
            "vTextResourceKey": "ClientConfiguration",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iApplicationTypeId",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Client",
            "vTextResourceKey": "ApplicationType",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];

    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: { "cIsDeleted": "N" },
        PrimaryKey: "iClientId"
    };
    return objMeta;
};