/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return [
        {
            "vColumnName": "TextBoxColumn",
            "vDataType": "string",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vTextResourceKey": "TextBoxColumn",
            "iWidth": 150
        },
        {
            "vColumnName": "LabelColumn",
            "vDataType": "string",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vTextResourceKey": "LabelColumn",
            "iWidth": 150
        },
        {
            "vColumnName": "DateColumn",
            "vDataType": "string",
            "vControlType": "date",
            "IsMandatory": "Y",
            "vTextResourceKey": "DateColumn",
            "iWidth": 150
        },
        {
            "vColumnName": "DateTimeColumn",
            "vDataType": "string",
            "vControlType": "datetime",
            "IsMandatory": "Y",
            "vTextResourceKey": "DateTimeColumn",
            "iWidth": 150
        },
        {
            "vColumnName": "ImageColumn",
            "vDataType": "image",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vTextResourceKey": "ImageColumn",
            "iWidth": 150
        },
        {
            "vColumnName": "ImageColumn_CheckBox",
            "vDataType": "boolean",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vTextResourceKey": "ImageColumn_CheckBox",
            "iWidth": 150
        },
        {
            "vColumnName": "DropDownTableName.DropDownValueColumnName",
            "vDataType": "array",
            "vControlType": "dropdown",
            "vTextResourceKey": "DropDownColumn",
            "iWidth": 150
        },        
        //{
        //    "vColumnName": "vEmail",
        //    "vDataType": "string",
        //    "vControlType": "textbox",
        //    "IsMandatory": "Y",
        //    "vValidationType": "email",
        //    "vTextResourceKey": "Email",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "t_TestDrive_Member_State_Data.vShortStateName",
        //    "vDataType": "string",
        //    "vControlType": "textbox",
        //    "vTextResourceKey": "ShortStateName",
        //    "cShowMultiLanguage": "Y",
        //    "iWidth": 150
        //},

        //{
        //    "vColumnName": "vPassword",
        //    "vDataType": "string",
        //    "vControlType": "label",
        //    "IsMandatory": "Y",
        //    "vValidationType": "password",
        //    "vTextResourceKey": "Password",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "t_TestDrive_Member_Class_Teacher.uTeacherId",
        //    "vDataType": "array",
        //    "vControlType": "dropdown",
        //    "vTextResourceKey": "TeacherId",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "t_TestDrive_Member_School_Data.vShortStateName",
        //    "vDataType": "string",
        //    "vControlType": "textbox",
        //    "vTextResourceKey": "School",
        //    "cShowMultiLanguage": "Y",
        //    "iWidth": 150
        //},

    ];
};