/**
* @name GetAddEditMetaData
* @summary it returns the array of AddEdit MetaData
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "t_PathFinder_Jobs_Data.vJobName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Job"
        },
        {
            "vColumnName": "iStateId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "Job"
        },
        {
            "vColumnName": "cIsAnchorJob",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "Job"
        },
    ];
};