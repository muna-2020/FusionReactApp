/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return [
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "School",
            "vTextResourceKey": "TeacherGrid_ColumnName_Name",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vFirstName",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "School",
            "vTextResourceKey": "TeacherGrid_ColumnName_FirstName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vShortCut",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "School",
            "vTextResourceKey": "TeacherGrid_ColumnName_ShortCut",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": 100,
            "cShowMultiLanguage": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vEmail",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "School",
            "vTextResourceKey": "TeacherGrid_ColumnName_Email",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "Email",
            "iWidth": null,
            "cShowMultiLanguage": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vPhonePrivate",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourcePage": "School",
            "vTextResourceKey": "TeacherGrid_ColumnName_Mobile",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vPhoneSchool",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "School",
            "vTextResourceKey": "TeacherGrid_ColumnName_Phone",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "ActiveImageIcon",
            "vDataType": "image",
            "iDisplayOrder": 11,
            "vTextResourcePage": "School",
            "vTextResourceKey": "Status",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": 44,
            "cShowMultiLanguage": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "cIsSubjectExpertTeacherMarkedBySchool",
            "vDataType": "boolean",
            "iDisplayOrder": 12,
            "vTextResourcePage": "School",
            "vTextResourceKey": "TeacherGrid_ColumnName_SubjectExpertTeacherMarkedBySchool",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": 44,
            "cShowMultiLanguage": null,
            "vValidationKey": null
        }
    ];
};