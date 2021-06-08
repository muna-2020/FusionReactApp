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
            "iWidth": 150
        },
        {
            "vColumnName": "TextBoxMultiLanguageTable.TextBoxMultiLanguageColumn",
            "vDataType": "string",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vTextResourceKey": "TextBoxColumn_MultiLanguage",
            "cShowMultiLanguage": "N",
            "iWidth": 150
        },
        {
            "vColumnName": "TextBoxMultiLanguageTable.TextBoxMultiLanguageColumn",
            "vDataType": "string",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vTextResourceKey": "TextBoxColumn_MultiLanguage_ShowMultiLanguage",
            "cShowMultiLanguage": "Y",
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
        //{
        //    "vColumnName": "ImageColumn_CheckBox",
        //    "vDataType": "boolean",
        //    "vControlType": "image",
        //    "IsMandatory": "Y",
        //    "vTextResourceKey": "ImageColumn_CheckBox",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "DropDownTableName.DropDownValueColumnName",
        //    "vDataType": "array",
        //    "vControlType": "dropdown",
        //    "vTextResourceKey": "DropDownColumn",
        //    "iWidth": 150
        //},
        //{
        //    "vColumnName": "LanguageDependentDropDownTableName.LanguageDependentDropDownValueColumnName",
        //    "vDataType": "array",
        //    "vControlType": "dropdown",
        //    "vTextResourceKey": "LanguageDependentDropDownColumn",
        //    "iWidth": 150
        //}
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: null
    };
    return objMeta;
};