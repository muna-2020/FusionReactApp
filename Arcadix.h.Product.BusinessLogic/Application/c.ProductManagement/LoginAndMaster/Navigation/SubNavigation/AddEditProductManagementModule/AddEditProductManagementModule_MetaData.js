/**
* @name GetAddEditProductManagementModuleMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetAddEditProductManagementModuleMetaData = () => {
    return [
        {
            "vColumnName": "vModuleName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        },        
        {
            "vColumnName": "vDescription",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
        },
    ];
};