/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vServerName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "iTabId": "ApplicationServer"
        },
        {
            "vColumnName": "vHostName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "iTabId": "ApplicationServer"
        },
        {
            "vColumnName": "iNumberOfTimeToBeShown",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iWidth": null,
            "iTabId": "ApplicationServer"
        },
        {
            "vColumnName": "iOrder",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iWidth": null,
            "iTabId": "ApplicationServer"
        },
        {
            "vColumnName": "cIsActive",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "ApplicationServer"
        },
        {
            "vColumnName": "vQueryString",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null,
            "iTabId": "ApplicationServer"
        },
        {
            "vColumnName": "vApplicationName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null,
            "iTabId": "ApplicationServer"
        },
        {
            "vColumnName": "iLanguageId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "ApplicationServer"
        },
        {
            "vColumnName": "vGroup",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "ApplicationServer"
        }

    ];
};

