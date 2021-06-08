/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {
    //Will hold the skin path.
    let SkinPath = JConfiguration.ExtranetSkinPath;

    //Will hold the full path for the image.
    //let ImagePath = JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/angle_down.svg";

    //Will hold the text required for dropdown.
    let Text = {
        "DefaultOptionText": "Default_Text", //will show this text as the DefaultOptionText in the Dropdown.
        "DefaultOptionTextKey_Text": "Default_Key_Text" //If DefaultOptionTextKey(in meta) is passed with the value "DefaultOptionTextKey_Text", then Dropdown will show "Default_Key_Text" as the default text insted of the value from "Default_Text"
    };
    return {
        SkinPath,
        Text
        //ImagePath
    };
};