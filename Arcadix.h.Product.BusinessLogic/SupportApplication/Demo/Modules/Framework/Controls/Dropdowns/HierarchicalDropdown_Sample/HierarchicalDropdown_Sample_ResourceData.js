/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetResourceData = () => {
       
    let SkinPath = JConfiguration.ExtranetSkinPath;
    let ResourceText = "Please Select";
    //Resource data consists of skinpath,textresource and imagePath

    return {
        SkinPath,
        ImagePath: '/Images/Common/Icons/angle_down.svg', 
        Text: ResourceText
    };
};