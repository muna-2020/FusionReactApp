/**
 * @name GetMetaData
 * @summary it returns the array of Meta Data
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vThemeConfigurationName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "MainClientThemeConfiguration",
            "vTextResourceKey": "ThemeConfigurationName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vLanguageName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "MainClientThemeConfiguration",
            "vTextResourceKey": "LanguageName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iCountryId",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "MainClientThemeConfiguration",
            "vTextResourceKey": "Country",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsSSL",
            "vDataType": "boolean",
            "iDisplayOrder": 6,
            "vTextResourcePage": "MainClientThemeConfiguration",
            "vTextResourceKey": "IsSSL",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vEmailServer",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "MainClientThemeConfiguration",
            "vTextResourceKey": "EmailServer",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iTargetGroupId",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "MainClientThemeConfiguration",
            "vTextResourceKey": "TargetGroup",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTheme",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourcePage": "MainClientThemeConfiguration",
            "vTextResourceKey": "Theme",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vDefaultLanguageName",
            "vDataType": "string",
            "iDisplayOrder": 20,
            "vTextResourcePage": "MainClientThemeConfiguration",
            "vTextResourceKey": "DefaultLanguageName",
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
        PrimaryKey: "iMainClientThemeConfigurationId"
    };
    return objMeta;
};