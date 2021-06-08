
/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetSchoolTypeMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "t_TestDrive_Member_School_SchoolType_Data.vSchoolTypeName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "SchoolTypeName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iSchoolTypeId"
    };
    return objMeta;
};



