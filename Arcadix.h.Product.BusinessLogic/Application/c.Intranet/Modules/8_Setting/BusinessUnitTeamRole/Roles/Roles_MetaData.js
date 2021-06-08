/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [        
        {
            "vColumnName": "t_Framework_MainClient_UserRole_Data.vUserRoleName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Roles",
            "vTextResourceKey": "UserRoleName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "cIsSystemRole",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Roles",
            "vTextResourceKey": "IsSystemRole",
            "vControlType": "label",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        } 
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uUserRoleId",
        Filter: {"cIsDeleted" : "N"},
    };
    return objMeta;
};
