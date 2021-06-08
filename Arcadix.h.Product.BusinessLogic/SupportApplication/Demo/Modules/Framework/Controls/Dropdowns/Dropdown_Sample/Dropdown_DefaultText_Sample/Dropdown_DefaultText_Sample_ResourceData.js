/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {
    //Will hold the text required for dropdown. This is not a madatory prop.
    let Text = {
        "DefaultOptionText": "Default_Text", //will show this text as the DefaultOptionText in the Dropdown.
        "DefaultOptionTextKey_Text": "Default_Key_Text" //If DefaultOptionTextKey(in meta) is passed with the value "DefaultOptionTextKey_Text", then Dropdown will show "Default_Key_Text" as the default text insted of the value from "Default_Text"
    };

    //Will hold the full path for the image. This is not a madatory prop.
    //let ImagePath = JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/angle_down.svg";

    //Will hold the skin path. This is not a madatory prop.
    let SkinPath = JConfiguration.ExtranetSkinPath;

    return {
        Text,
        //ImagePath,
        SkinPath
    };
};