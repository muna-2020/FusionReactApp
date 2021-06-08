/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vFirstName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "vEmail",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "email",
            "vValidationKey": "EmailValidationMessage"
        },
        {
            "vColumnName": "cIsTwoFactorAuthenticationRequired",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
        },
        {
            "vColumnName": "vWindowUserName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
};