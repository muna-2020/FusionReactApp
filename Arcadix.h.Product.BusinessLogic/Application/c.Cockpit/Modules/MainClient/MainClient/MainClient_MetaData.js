/**
 * @name GetMetaData
 * @summary it returns the array of Meta Data
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iMainClientId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "MainClientId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vMainClientIdentifier",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "MainClientIdentifier",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_Framework_MainClient_Data.vMainClientName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "MainClientName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "vManagerName",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "ManagerName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },        
        {
            "vColumnName": "t_Framework_MainClient_Data.vTitle",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "Title",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }, 
        {
            "vColumnName": "vStreet",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "Street",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTown",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "Town",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vPhone",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "Phone",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vEmail",
            "vDataType": "string",
            "iDisplayOrder": 10,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "Email",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iFusionMainClientConfigurationId",
            "vDataType": "string",
            "iDisplayOrder": 11,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "MainClientConfiguration",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iMainClientThemeConfigurationId",
            "vDataType": "string",
            "iDisplayOrder": 12,
            "vTextResourcePage": "MainClient",
            "vTextResourceKey": "MainClientThemeConfiguration",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: { "cIsDeleted": "N" },
        PrimaryKey: "iMainClientId"
    };
    return objMeta;
};