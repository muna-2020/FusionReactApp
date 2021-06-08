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
            "vTextResourcePage": "CompetencyRange",
            "vTextResourceKey": "DisplayUpdate",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_testdrive_Category_Competency_CompetencyRange_Data.vCompetencyRange",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "CompetencyRange",
            "vTextResourceKey": "Cycle",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },

        {
            "vColumnName": "cIspreselect",
            "vDataType": "boolean",
            "iDisplayOrder": 3,
            "vTextResourcePage": "CompetencyRange",
            "vTextResourceKey": "IsPreselect",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iCompetencyRangeId",
    };
    return objMeta;
};
