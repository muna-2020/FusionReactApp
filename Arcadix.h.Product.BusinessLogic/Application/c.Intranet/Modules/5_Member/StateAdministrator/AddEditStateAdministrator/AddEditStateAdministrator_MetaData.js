/**
 * @name GetAddEditClassTypeMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditStateAdministratorMetaData = () => {
    return [
       
        {
            "vColumnName": "iStateId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "StateAdministrator"
        },
        {
            "vColumnName": "vName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "StateAdministrator"
        },
        {
            "vColumnName": "vFirstName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "StateAdministrator"
        },
        {
            "vColumnName": "vEmail",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "email",
            "vValidationKey": "EmailValidationMessage",
            "iTabId": "StateAdministrator"
        }

    ];
};