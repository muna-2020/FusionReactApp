/**
 * @name GetSampleMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetSampleMetaData = () => {
    return [
        {
            "vColumnName": "Name",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "Age",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "1"
        },
        {
            "vColumnName": "Email",
            "vControlType": "checkbox",
            "IsMandatory": "N",
            "vValidationType": "email",
            "vValidationKey": "EmailValidationMessage",
            "iTabId": "1"
        }
       
    ];
};