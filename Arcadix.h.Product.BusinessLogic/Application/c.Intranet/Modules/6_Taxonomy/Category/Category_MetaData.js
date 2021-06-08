/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "t_TestDrive_Category_Data.vCategoryName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Category",
            "vTextResourceKey": "CategoryName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Category",
            "vTextResourceKey": "DisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Category_Data.tConceptAndSkills",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Category",
            "vTextResourceKey": "ConceptAndSkills",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_Category_Data.tClarificationNotes",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "Category",
            "vTextResourceKey": "ClarificationNotes",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "vCategoryKeyword",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "Category",
            "vTextResourceKey": "CategoryKeyword",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iCategoryId",
    };
    return objMeta;
};
