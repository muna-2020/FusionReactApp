/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "TextBoxColumn",
            "vDataType": "string",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vTextResourceKey": "TextBoxColumn",
            "iWidth": 150,
            "vValidationKey":"TextBoxColumn_ValMessage"
        },
        //{
        //    "vColumnName": "TextBoxMultiLanguageTable.TextBoxMultiLanguageColumn",
        //    "vDataType": "string",
        //    "vControlType": "textbox",
        //    "IsMandatory": "Y",
        //    "vTextResourceKey": "TextBoxColumn_MultiLanguage",
        //    "cShowMultiLanguage": "N",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "TextBoxMultiLanguageTable.TextBoxMultiLanguageColumn",
        //    "vDataType": "string",
        //    "vControlType": "textbox",
        //    "IsMandatory": "Y",
        //    "vTextResourceKey": "TextBoxColumn_MultiLanguage_ShowMultiLanguage",
        //    "cShowMultiLanguage": "Y",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "LabelColumn",
        //    "vDataType": "string",
        //    "vControlType": "label",
        //    "IsMandatory": "Y",
        //    "vTextResourceKey": "LabelColumn",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "DateColumn",
        //    "vDataType": "string",
        //    "vControlType": "date",
        //    "IsMandatory": "Y",
        //    "vTextResourceKey": "DateColumn",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "DateTimeColumn",
        //    "vDataType": "string",
        //    "vControlType": "datetime",
        //    "IsMandatory": "Y",
        //    "vTextResourceKey": "DateTimeColumn",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "ImageColumn",
        //    "vDataType": "image",
        //    "vControlType": "image",
        //    "IsMandatory": "Y",
        //    "vTextResourceKey": "ImageColumn",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "ImageColumn_CheckBox",
        //    "vDataType": "boolean",
        //    "vControlType": "image",
        //    "IsMandatory": "Y",
        //    "vTextResourceKey": "ImageColumn_CheckBox",
        //    "iWidth": 150
        //},
        {
            "vColumnName": "DropDownTableName.DropDownValueColumnName",
            "vDataType": "array",
            "vControlType": "dropdown",
            "vTextResourceKey": "DropDownColumn",
            "iWidth": 150
        },
        //{
        //    "vColumnName": "LanguageDependentDropDownTableName.LanguageDependentDropDownValueColumnName",
        //    "vDataType": "array",
        //    "vControlType": "dropdown",
        //    "vTextResourceKey": "LanguageDependentDropDownColumn",
        //    "iWidth": 150
        //}
    ];

    let arrActionButtons = [
        {
            "Key": "Activate",
            "Text": "Activate...",
            "ClassName": "button",
            "Action": (objAction) => {
                console.log("Activate", objAction);
            }
        },
        {
            "Key": "Deactivate",
            "Text": "Deactivate...",
            "ClassName": "button",
            "Action": (objAction) => {
                console.log("Deactivate", objAction);
            }
        },
        {
            "Key": "ExtraButton",
            "Text": "ExtraButton...",
            "ClassName": "button",
            "Image": "Themes/Default/d.Extranet/Skin2018/Images/Common/Icons/GridUpload.svg",
            "Action": (ActionObject) => { }
        }
    ];

    let objMeta = {
        HeaderData: arrHeaderData, //Contains the Array of Configuration objects that tell the format of each column.
        Filter: {"FilterId" : 1}, //Filter is an object that contains keys(ColumnName) and values(Value from the Data) to check whether to show the row or not. 
        EditableGrid: true, //To specify if the grid is Editable or not.
        RowActionButtons: arrActionButtons //An array to contain the major actions  like Activate and Deactivate.
    };
    return objMeta;
};