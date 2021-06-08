/**
 * @name GetTaxonomyMetaData
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetTaxonomyMetaData = (objEvent) => {
    return [
        {
            "vColumnName": "iParentSubjectId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "iSubjectId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "iCategoryId",
            "vControlType": "dropdown",
            "IsMandatory": objEvent.IsTheDropDownToShow("HasCategory") ? "Y" : "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "iCategoryCompetencyId",
            "vControlType": "dropdown",
            "IsMandatory": objEvent.IsTheDropDownToShow("HasCompetency") ? "Y" : "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "iCategoryCompetencyRangeId",
            "vControlType": "dropdown",
            "IsMandatory": objEvent.IsTheDropDownToShow("HasCanDo") ? "Y" : "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "iCategoryCompetencyLevelId",
            "vControlType": "dropdown",
            "IsMandatory": objEvent.IsTheDropDownToShow("HasCanDo") ? "Y" : "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "iIntermediateId",
            "vControlType": "dropdown",
            "IsMandatory": objEvent.IsTheDropDownToShow("HasCanDo") ? "Y" : "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        }
    ];
};