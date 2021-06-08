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
            "iTabId": "CompetencyRange"
        },
        {
            "vColumnName": "t_testdrive_Category_Competency_CompetencyRange_Data.vCompetencyRange",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "CompetencyRange"
        },
        {
            "vColumnName": "cIspreselect",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "CompetencyRange"
        }
    ];
};