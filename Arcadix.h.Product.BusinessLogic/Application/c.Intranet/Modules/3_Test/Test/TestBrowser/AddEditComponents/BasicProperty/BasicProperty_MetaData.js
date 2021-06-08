/**
* @name GetBasicPropertyMetaData
* @summary it returns the array of BasicProperty metadatas
* @returns {array} MetaData
*/
export const GetBasicPropertyMetaData = () => {
    return [
        {
            "vColumnName": "vTestName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "General",
            "vValidationKey": "RequiredValidationMessage",
        },
        {
            "vColumnName": "iSubjectId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "General",
            "vValidationKey": "RequiredValidationMessage",
        },        
        {
            "vColumnName": "iCategoryId",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "General"
        },        
        {
            "vColumnName": "iCategoryCompetencyId",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "General"
        }
    ];
};