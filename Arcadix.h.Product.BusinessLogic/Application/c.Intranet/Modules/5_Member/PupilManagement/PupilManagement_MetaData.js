/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadata
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "StateName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "StateName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "SchoolName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "SchoolName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "TeacherName",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "TeacherName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "ClassName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "ClassName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iGenderId",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "Gender",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vStreet",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "Street",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "Name",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iZip",
            "vDataType": "int",
            "iDisplayOrder": 8,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "ZipCode",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFirstName",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "FirstName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTown",
            "vDataType": "string",
            "iDisplayOrder": 10,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "Town",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iLanguageId",
            "vDataType": "int",
            "iDisplayOrder": 11,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "Language",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vEmail",
            "vDataType": "string",
            "iDisplayOrder": 12,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "EMail",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": "email",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vBirthdate",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "PupilManagement",
            "vTextResourceKey": "BirthDate",
            "vControlType": "date",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsStellwerk",
            "vDataType": "boolean",
            "iDisplayOrder": 11,
            "vTextResourcePage": "PupilManagement",
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
        PrimaryKey: "uPupilId",
        Filter: {}
    };
    return objMeta;
};
