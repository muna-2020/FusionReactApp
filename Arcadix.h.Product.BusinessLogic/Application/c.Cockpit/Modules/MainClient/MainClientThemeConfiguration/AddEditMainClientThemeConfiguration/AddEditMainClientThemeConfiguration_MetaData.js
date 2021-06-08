/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iCountryId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "iLanguageId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "cIsSSL",
            "vControlType": "checkbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vEmailServer",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "iTargetGroupId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vTheme",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "vThemeConfigurationName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        }
    ];
};