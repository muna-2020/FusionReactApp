/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "t_PathFinder_JobField_Data.vJobFieldName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "JobField"
        },
        {
            "vColumnName": "iStateId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "JobField"
        }
    ];
};