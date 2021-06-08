/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iApplicationTypeId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "OnlineHelp"
        },
        {
            "vColumnName": "vHelpKey",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "OnlineHelp"
        },
        {
            "vColumnName": "iMainClientId",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "OnlineHelp"
        },
        {
            "vColumnName": "vDisplayPosition",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "OnlineHelp"
        },
        {
            "vColumnName": "uHelpGroupId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "OnlineHelp"
        },
        //{
        //    "vColumnName": "iOrder",
        //    "vControlType": "textbox",
        //    "IsMandatory": null,
        //    "vValidationType": "number",
        //    "iTabId": "OnlineHelp"
        //}
    ];
};