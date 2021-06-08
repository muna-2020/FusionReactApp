
/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetSchoolYearMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iSchoolYear",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "SchoolYear",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Member_Class_SchoolYear_Data.vSchoolYearName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "SchoolYearName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "DisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": "N"
        }

    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iSchoolYearId"
    };
    return objMeta;
};



