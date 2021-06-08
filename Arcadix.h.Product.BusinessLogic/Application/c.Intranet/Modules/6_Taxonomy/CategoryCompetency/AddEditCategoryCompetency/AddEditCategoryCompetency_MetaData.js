/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "CategoryCompetency"
        },
        {
            "vColumnName": "vCompetencykeyword",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "CategoryCompetency"
        },
        {
            "vColumnName": "t_TestDrive_Category_Competency_Data.tCompetencyText",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "CategoryCompetency"
        }
    ];
};
