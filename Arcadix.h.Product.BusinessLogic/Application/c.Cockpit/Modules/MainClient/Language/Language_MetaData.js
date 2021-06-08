/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of Meta Data
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iFrameworkLanguageId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Language",
            "vTextResourceKey": "FrameworkLanguageId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vLanguageIdentifier",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Language",
            "vTextResourceKey": "LanguageIdentifier",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_Framework_Language_Data.vLanguageName",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourcePage": "Language",
            "vTextResourceKey": "LanguageName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "vLanguageCultureInfo",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Language",
            "vTextResourceKey": "LanguageCultureInfo",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsActive",
            "vDataType": "boolean",
            "iDisplayOrder": 4,
            "vTextResourcePage": "Language",
            "vTextResourceKey": "IsActive",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vDefaultLanguageCountryInfo",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "Language",
            "vTextResourceKey": "DefaultLanguageCountryInfo",
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
        PrimaryKey: "iFrameworkLanguageId"
    };
    return objMeta;
};