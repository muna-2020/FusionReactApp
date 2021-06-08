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
    let ResourceText = "Please Select";

    return {
        SkinPath,
        Text: ResourceText
        //ImagePath
    };
};