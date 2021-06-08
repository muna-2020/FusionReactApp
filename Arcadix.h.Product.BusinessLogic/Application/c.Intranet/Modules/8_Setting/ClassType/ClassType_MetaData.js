/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iClassTypeId",
            "vDataType": "int",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClassType",
            "vTextResourceKey": "ClassType",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iStateId",
            "vDataType": "int",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClassType",
            "vTextResourceKey": "OrganizationalUnit",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "t_TestDrive_Member_ClassType_Data.vClassTypeName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClassType",
            "vTextResourceKey": "ClassTypeName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_Member_ClassType_Data.vLongClassTypeName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClassType",
            "vTextResourceKey": "LongClassTypeName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "int",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ClassType",
            "vTextResourceKey": "Sequence",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iClassTypeId",
    };
    return objMeta;
};
