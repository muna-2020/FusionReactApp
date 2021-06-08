/**
* @name GetAddEditMetaData
* @summary it returns the array of AddEdit MetaData
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "t_PathFinder_JobField_JobLevel_Data.vJobLevelName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "JobLevel"
        },
        {
            "vColumnName": "uJobFieldId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "JobLevel"
        }
    ];
};