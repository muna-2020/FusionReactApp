/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "IntranetAdministrator",
            "vTextResourceKey": "Name",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFirstName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "IntranetAdministrator",
            "vTextResourceKey": "FirstName",
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
            "vTextResourcePage": "IntranetAdministrator",
            "vTextResourceKey": "Email",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vIPRestriction",
            "vDataType": "int",
            "iDisplayOrder": 7,
            "vTextResourcePage": "IntranetAdministrator",
            "vTextResourceKey": "IPRestriction",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "uBusinessUnitId",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "IntranetAdministrator",
            "vTextResourceKey": "BusinessUnit",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Role",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourcePage": "IntranetAdministrator",
            "vTextResourceKey": "Role",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Team",
            "vDataType": "string",
            "iDisplayOrder": 10,
            "vTextResourcePage": "IntranetAdministrator",
            "vTextResourceKey": "Team",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vWindowUserName",
            "vDataType": "string",
            "iDisplayOrder": 11,
            "vTextResourcePage": "IntranetAdministrator",
            "vTextResourceKey": "WindowUserName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uMainClientUserId",
    };
    return objMeta;
};
