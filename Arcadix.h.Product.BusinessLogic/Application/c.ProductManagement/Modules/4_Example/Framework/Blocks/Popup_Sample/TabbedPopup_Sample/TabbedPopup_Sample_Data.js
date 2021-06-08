/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    let arrRowData = 
        {
            "TextBoxColumn": "TextBox_Value",
            "TextBoxMultiLanguageTable": [
                {
                    "iLanguageId": "3",
                    "TextBoxMultiLanguageColumn": "Language_de"
                },
                {
                    "iLanguageId": "2",
                    "TextBoxMultiLanguageColumn": "Language_fr"
                },
                {
                    "iLanguageId": "4",
                    "TextBoxMultiLanguageColumn": "Language_it"
                },
                {
                    "iLanguageId": "1",
                    "TextBoxMultiLanguageColumn": "Language_en"
                }
            ],
            "LabelColumn": "LabelColumn_Value",
            "DateColumn": "11.11.1994",
            "DateTimeColumn": "12.11.1994",
            "ImageColumn": "test.svg",
            "ImageColumn_CheckBox": "Y",
            "DropDownValueColumnName": 1,
            "LanguageDependentDropDownValueColumnName": 1
        };

    return {
        PageData: arrRowData,
    };
};