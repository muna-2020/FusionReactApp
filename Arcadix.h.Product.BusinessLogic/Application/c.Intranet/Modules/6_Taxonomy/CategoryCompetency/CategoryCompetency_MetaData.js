/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "CategoryCompetency",
            "vTextResourceKey": "DisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vCompetencykeyword",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "CategoryCompetency",
            "vTextResourceKey": "Id",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Category_Competency_Data.tCompetencyText",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "CategoryCompetency",
            "vTextResourceKey": "Competency",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iCategoryCompetencyId",
    };
    return objMeta;
};