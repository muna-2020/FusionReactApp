/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {

    //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
    let Text = {
        "TextBoxColumn": "TextBoxColumn_Text",
        "TextBoxColumn_MultiLanguage": "TextBoxColumn_MultiLanguage",
        "TextBoxColumn_MultiLanguage_ShowMultiLanguage":"TextBoxColumn_MultiLanguage_ShowMultiLanguage",
        "LabelColumn": "LabelColumn_Text",
        "DateColumn": "DateColumn_Text",
        "DateTimeColumn": "DateTimeColumn_Text",
        "ImageColumn": "ImageColumn_Text",
        "ImageColumn_CheckBox": "ImageColumn_CheckBox_Text",
        "DropDownColumn": "DropDownColumn_Text",
        "LanguageDependentDropDownColumn": "LanguageDependentDropDownColumn_Text",
        "Detail:1": "1 Row",
        "Detail:n": "{n} Rows",
        "TextBoxColumn_RequireValidationMessage": "TextBoxColumn_ValMessage",
        "RequireValidationMessage":"RequireValidationMessage"
    };

    //Will hold the path for the image and the image will be taken from the DATA having vControlType as image.It is not a mandatory props.
    let SkinPath = JConfiguration.ExtranetSkinPath;

    return {
        Text, //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
        SkinPath //Will hold the path for the image and the image will be taken from the DATA having vControlType as image.It is not a mandatory props.
    };
};