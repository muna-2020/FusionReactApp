/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadata
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ProductManagementUser",
            "vTextResourceKey": "Name",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFirstName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "ProductManagementUser",
            "vTextResourceKey": "FirstName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vEmail",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourcePage": "ProductManagementUser",
            "vTextResourceKey": "Email",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsTwoFactorAuthenticationRequired",
            "vDataType": "boolean",
            "iDisplayOrder": 7,
            "vTextResourcePage": "ProductManagementUser",
            "vTextResourceKey": "IsTwoFactorAuthenticationRequired",
            "vControlType": "image",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vWindowUserName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ProductManagementUser",
            "vTextResourceKey": "WindowUserName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uProductManagementUserId",
        Filter: { "cIsDeleted": "N" }
    };
    return objMeta;
};
