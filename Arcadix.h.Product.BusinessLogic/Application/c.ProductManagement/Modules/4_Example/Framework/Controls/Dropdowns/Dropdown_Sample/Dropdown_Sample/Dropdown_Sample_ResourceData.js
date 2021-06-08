/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {

    //Will hold the full path for the image. This is not a mandatory prop.
    //let ImagePath = JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/angle_down.svg";

    //Will hold the skin path. This is not a mandatory prop.
    let SkinPath = JConfiguration.ExtranetSkinPath;

    return {
        //ImagePath,
        SkinPath
    };
};