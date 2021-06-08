/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vHostURL",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "HostURL",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iClientId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "Client",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsActive",
            "vDataType": "boolean",
            "iDisplayOrder": 7,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "IsActive",
            "vControlType": "image",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vStartPage",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "StartPage",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsForTesting",
            "vDataType": "boolean",
            "iDisplayOrder": 9,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "IsForTesting",
            "vControlType": "image",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        //{
        //    "vColumnName": "vMobileStartPage",
        //    "vDataType": "string",
        //    "iDisplayOrder": 10,
        //    "vTextResourcePage": "ClientHostUrl",
        //    "vTextResourceKey": "MobileStartPage",
        //    "vControlType": "textbox",
        //    "IsMandatory": "N",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        //{
        //    "vColumnName": "vTabletStartPage",
        //    "vDataType": "string",
        //    "iDisplayOrder": 11,
        //    "vTextResourcePage": "ClientHostUrl",
        //    "vTextResourceKey": "TabletStartPage",
        //    "vControlType": "textbox",
        //    "IsMandatory": null,
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        //{
        //    "vColumnName": "vImageHostURL",
        //    "vDataType": "string",
        //    "iDisplayOrder": 12,
        //    "vTextResourcePage": "ClientHostUrl",
        //    "vTextResourceKey": "ImageHostURL",
        //    "vControlType": "textbox",
        //    "IsMandatory": null,
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        //{
        //    "vColumnName": "vCssHostURL",
        //    "vDataType": "string",
        //    "iDisplayOrder": 13,
        //    "vTextResourcePage": "ClientHostUrl",
        //    "vTextResourceKey": "CssHostURL",
        //    "vControlType": "textbox",
        //    "IsMandatory": null,
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        //{
        //    "vColumnName": "vDataHostURL",
        //    "vDataType": "string",
        //    "iDisplayOrder": 14,
        //    "vTextResourcePage": "ClientHostUrl",
        //    "vTextResourceKey": "DataHostURL",
        //    "vControlType": "textbox",
        //    "IsMandatory": null,
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        {
            "vColumnName": "iTargetGroupId",
            "vDataType": "string",
            "iDisplayOrder": 15,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "TargetGroup",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsAngularApplication",
            "vDataType": "boolean",
            "iDisplayOrder": 16,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "IsAngularApplication",
            "vControlType": "image",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iTargetDeviceId",
            "vDataType": "string",
            "iDisplayOrder": 17,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "TargetDeviceId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vPrefetchURL",
            "vDataType": "string",
            "iDisplayOrder": 18,
            "vTextResourcePage": "ClientHostUrl",
            "vTextResourceKey": "PrefetchURL",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iHostURLId"
    };
    return objMeta;
};