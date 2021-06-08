/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vIPRestriction",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
        },
        {
            "vColumnName": "vEmail",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "email",
            "vValidationKey": "EmailValidationMessage"
        },
        {
            "vColumnName": "vName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
         {
             "vColumnName": "vFirstName",
             "vControlType": "textbox",
             "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "vWindowUserName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "uBusinessUnitId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null
        }        
    ];
};