/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vLanguageCultureInfo",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Language"
        },
        {
            "vColumnName": "vLanguageIdentifier",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Language"
        },
        {
            "vColumnName": "cIsActive",
            "vControlType": "checkbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "Language"
        },
        {
            "vColumnName": "t_Framework_Language_Data.vLanguageName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Language"
        }
    ];
};