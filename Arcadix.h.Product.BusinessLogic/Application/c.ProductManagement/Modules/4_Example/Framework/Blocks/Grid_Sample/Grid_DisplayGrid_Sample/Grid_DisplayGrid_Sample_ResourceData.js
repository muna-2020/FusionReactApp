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
        "FooterText:1": "1 Row",
        "FooterText:n":"{n} Rows"
    };

    //Will hold the path for the image and the image will be taken from the DATA having vControlType as image.It is not a mandatory props.
    let ImagePath = JConfiguration.IntranetSkinPath + "/Images/Common/Icons/";

    //Will hold the path for the image and the image will be taken from the DATA having vControlType as image.It is not a mandatory props.
    let SkinPath = JConfiguration.IntranetSkinPath;

    let ImagePathDetails = {
        "test.svg": ImagePath + "/test.svg"
    }


    return {
        Text,
        ImagePath,
        SkinPath,
        ImagePathDetails
    };
};