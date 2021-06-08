/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditSchoolYearMetaData = () => {
    return [
        {
            "vColumnName": "iSchoolYear",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "SchoolYear"
        },
        {
            "vColumnName": "t_TestDrive_Member_Class_SchoolYear_Data.vSchoolYearName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "SchoolYear"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "SchoolYear"
        }
    ];
};