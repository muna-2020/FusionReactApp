/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vStateName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Class",
            "vTextResourceKey": "StateName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vSchoolName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Class",
            "vTextResourceKey": "SchoolName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTeacherName",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Class",
            "vTextResourceKey": "TeacherName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vClassName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "Class",
            "vTextResourceKey": "ClassName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vSchoolYearName",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "Class",
            "vTextResourceKey": "SchoolYear",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsStellwerk",
            "vDataType": "boolean",
            "iDisplayOrder": 11,
            "vTextResourcePage": "Class",
            "vTextResourceKey": "IsStellwerk",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uClassId",
        Filter: {},
        AllowPaging: "Y"
    };
    return objMeta;
};
