/**
* @name GetAddEditRolesMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditRolesMetaData = () => {
    return [
        {
            "vColumnName": "t_Framework_MainClient_UserRole_Data.vUserRoleName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "BaseData"
        },
        {
            "vColumnName": "cIsSystemRole",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "vValidationKey": "BaseData"
        }  
    ];
};

