/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vClientName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Client"
        },
        {
            "vColumnName": "iApplicationTypeId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "Client"
        },
        {
            "vColumnName": "iClientConfigurationId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Client"
        }
    ];
};