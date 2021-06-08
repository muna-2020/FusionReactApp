/**
 * @name GetMetaData
 * @summary it returns the array of Meta Data
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iCountryId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Country",
            "vTextResourceKey": "CountryId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_Framework_Country_Data.vCountryName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "Country",
            "vTextResourceKey": "CountryName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "vCountryCultureInfo",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Country",
            "vTextResourceKey": "CountryCultureInfo",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vCurrency",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Country",
            "vTextResourceKey": "Currency",
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
        PrimaryKey: "iCountryId"
    }

    return objMeta;
};