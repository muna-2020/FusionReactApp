/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "t_TestDrive_Category_Data.vCategoryName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage"
        },
        {
            "vColumnName": "t_TestDrive_Category_Data.tConceptAndSkills",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "t_TestDrive_Category_Data.tClarificationNotes",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vCategoryKeyword",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
};

