/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vMainClientIdentifier",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "vManagerName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "t_Framework_MainClient_Data.vMainClientName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "t_Framework_MainClient_Data.vTitle",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "vStreet",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "vTown",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "vPhone",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "vEmail",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "email",
            "vValidationKey": "EmailValidationMessage",
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "iFusionMainClientConfigurationId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "MainClient"
        },
        {
            "vColumnName": "iMainClientThemeConfigurationId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "MainClient"
        }
    ];
};