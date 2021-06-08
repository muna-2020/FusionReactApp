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
            "iTabId": "Tip"
        },
        {
            "vColumnName": "iMainClientId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Tip"
        },
        {
            "vColumnName": "t_TestDrive_Tip_Data.vTipTitle",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Tip"
        },
        {
            "vColumnName": "dtTipDate",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "date",
            "iTabId": "Tip"
        }
    ];
};