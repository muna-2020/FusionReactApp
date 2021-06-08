/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "inewOrderId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "vValidationKey": null,
            "iTabId": "Time"
        },
        {
            "vColumnName": "PageName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "vValidationKey": null,
            "iTabId": "Time"
        },
        {
            "vColumnName": "PageType",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "vValidationKey": null,
            "iTabId": "Time"
        },
        {
            "vColumnName": "iMinimumTaskTime",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "Time"
        },
        {
            "vColumnName": "iTaskTimeLimit",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "Time"
        },
        {
            "vColumnName": "iTaskGroupTimeLimit",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "Time"
        },
        {
            "vColumnName": "iTestProgressDisplayId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "vValidationKey": null,
            "iTabId": "Time"
        }
    ];
};