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
            "vDataType": "int",
            "iDisplayOrder": 1,
            "vTextResourcePage": "CompetencyLevel",
            "vTextResourceKey": "DisplayUpdate",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_testdrive_Category_Competency_CompetencyLevel_Data.cCompetencyLevel",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "CompetencyLevel",
            "vTextResourceKey": "Cycle",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iCompetencyLevelId",
    };
    return objMeta;
};
