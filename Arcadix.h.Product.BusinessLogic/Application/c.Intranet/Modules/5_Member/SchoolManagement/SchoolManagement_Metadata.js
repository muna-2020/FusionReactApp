/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iStateId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "StateName",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vSchoolName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "SchoolName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iTitleId",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "TitleId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFirstName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "FirstName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "Name",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iSchoolTypeId",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "SchoolType",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vStreet",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "Street",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vPhone",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "Phone",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iZIPCode",
            "vDataType": "int",
            "iDisplayOrder": 9,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "ZIPCode",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vEmail",
            "vDataType": "string",
            "iDisplayOrder": 10,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "E-Mail",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": "email",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTown",
            "vDataType": "string",
            "iDisplayOrder": 11,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "Town",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsTestSchool",
            "vDataType": "boolean",
            "iDisplayOrder": 11,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "IsTestSchool",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsStellwerk",
            "vDataType": "boolean",
            "iDisplayOrder": 11,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "IsStellwerk",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtWhenLoginlEmailSent",
            "vDataType": "date",
            "iDisplayOrder": 11,
            "vTextResourcePage": "SchoolManagement",
            "vTextResourceKey": "EMailSentText",
            "vControlType": "date",
            "IsMandatory": "Y",
            "vValidationType": "date",
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uSchoolId",
        Filter: {},
        AllowPaging: "Y"
    };
    return objMeta;
};
