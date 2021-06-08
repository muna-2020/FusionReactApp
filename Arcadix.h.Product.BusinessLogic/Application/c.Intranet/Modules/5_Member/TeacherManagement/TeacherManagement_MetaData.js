/**
 * @name GetMetaData
 * @param {*} vColumnName
 * @param {*} props
 * @summary return the respective object of the Meta data which matches the vColumnName
 */
export const GetMetaData = () => {
    var arrHeaderData = [
        {
            "vColumnName": "State-School",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Teacher",
            "vTextResourceKey": "StateSchoolName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iTitleId",
            "vDataType": "int",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Teacher",
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
            "vTextResourcePage": "Teacher",
            "vTextResourceKey": "FirstName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "Teacher",
            "vTextResourceKey": "Name",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vEmail",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourcePage": "Teacher",
            "vTextResourceKey": "E-Mail",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "email",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vPhonePrivate",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "Teacher",
            "vTextResourceKey": "Phone",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vPhoneSchool",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "Teacher",
            "vTextResourceKey": "SchoolPhone",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsExternal",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Teacher",
            "vTextResourceKey": "Keycloak",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uTeacherId",
        Filter: {},
        AllowPaging: "Y"
    };
    return objMeta;
};