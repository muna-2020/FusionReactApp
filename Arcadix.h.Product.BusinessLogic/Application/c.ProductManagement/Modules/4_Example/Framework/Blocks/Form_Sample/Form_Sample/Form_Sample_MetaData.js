/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iStateId",
            "vDataType": "int",
            "iDisplayOrder": 1,
            "vTextResourcePage": "School",
            "vTextResourceKey": "StateName",
            "vControlType": "label",
            "IsMandatory": null,
            "vValidationType": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vSchoolName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "School",
            "vTextResourceKey": "SchoolName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vEmail",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "School",
            "vTextResourceKey": "EMail",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "email",
            "vValidationKey": "Email_val_msg"
        },
        {
            "vColumnName": "vPhone",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "School",
            "vTextResourceKey": "Phone",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": "number",
            "vValidationKey": "Phone_val_msg"
        },
        {
            "vColumnName": "iSchoolTypeId",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "School",
            "vTextResourceKey": "SchoolType",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "iZIPCode",
            "vDataType": "int",
            "iDisplayOrder": 6,
            "vTextResourcePage": "School",
            "vTextResourceKey": "ZIPCode",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": null
        },
        {
            "vColumnName": "iTitleId",
            "vDataType": "int",
            "iDisplayOrder": 7,
            "vTextResourcePage": "School",
            "vTextResourceKey": "TitleId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vStreet",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "School",
            "vTextResourceKey": "Street",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vFirstName",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "School",
            "vTextResourceKey": "FirstName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourcePage": "School",
            "vTextResourceKey": "Name",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "vTown",
            "vDataType": "string",
            "iDisplayOrder": 11,
            "vTextResourcePage": "School",
            "vTextResourceKey": "Town",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "vValidationKey": null
        },
        {
            "vColumnName": "uSchoolId",
            "vDataType": "uniqueidentifier",
            "iDisplayOrder": 14,
            "vTextResourcePage": "School",
            "vTextResourceKey": "SchoolId",
            "vControlType": "hidden",
            "IsMandatory": null,
            "vValidationType": null,
            "vValidationKey": null
        },
        {                       
            "vColumnName": "vPassword",                    
            "vDataType": "string",
            "iDisplayOrder": 14,
            "vTextResourcePage": "School",
            "vTextResourceKey": "Password",
            "TextResourceValue": "Password",            
            "vControlType": "password",
            "IsMandatory": null,
            "vValidationType": "",
            "vValidationKey": "Password_Val_msg"
        }
    ];

    let objMeta = {
        HeaderData: arrHeaderData, //would be an array to contain all the info about each data to displayed.
        ValidationDivName: "ValMessageDiv", //This is html div element name, that gets the validation details filled from the Validation method.
        //AddForm : true //Given true in case of AddForm, false in case of Edit form.
    };
    return objMeta;
};